'use server'

import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'
import { hash, compare } from 'bcryptjs'
import { prisma } from './db'
import { redirect } from 'next/navigation'

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'secret-key-change-me')

export async function register(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string

    if (!email || !password || !name) {
        throw new Error('Missing fields')
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
        throw new Error('User already exists')
    }

    const hashedPassword = await hash(password, 10)
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    })

    await createSession(user.id)
    redirect('/profile')
}

export async function login(formData: FormData) {
    const identifier = formData.get('email') as string
    const password = formData.get('password') as string

    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email: identifier },
                { name: identifier }
            ]
        }
    })
    if (!user) {
        throw new Error('Invalid credentials')
    }

    const isValid = await compare(password, user.password)
    if (!isValid) {
        throw new Error('Invalid credentials')
    }

    await createSession(user.id)
    if (user.role === 'ADMIN') {
        redirect('/admin')
    }
    redirect('/profile')
}

export async function logout() {
    (await cookies()).delete('session')
    redirect('/login')
}

export async function getSession() {
    const session = (await cookies()).get('session')?.value
    if (!session) return null

    try {
        const { payload } = await jwtVerify(session, SECRET_KEY)
        if (!payload.userId) return null
        return payload as { userId: string }
    } catch (error) {
        return null
    }
}

export async function getCurrentUser() {
    const session = await getSession()
    if (!session) return null

    const user = await prisma.user.findUnique({
        where: { id: session.userId },
    })

    if (!user) return null
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status as "PENDING" | "APPROVED",
        role: user.role, // "ADMIN" or "USER"
        idDocument: user.idDocument,
        licenseDocument: user.licenseDocument,
        isPremium: user.isPremium,
    }
}

async function createSession(userId: string) {
    const session = await new SignJWT({ userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1d')
        .sign(SECRET_KEY)

        ; (await cookies()).set('session', session, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400, // 1 day
            path: '/',
        })
}

// Simulated document upload approval
// Actual document upload implementation
export async function uploadDocument(formData: FormData) {
    const session = await getSession()
    if (!session?.userId) {
        redirect('/login')
    }
    const userId = session.userId

    const type = formData.get('type') as 'id' | 'license'
    const file = formData.get('file') as File

    if (!file || file.size === 0) {
        throw new Error('No file provided')
    }

    // Create unique filename
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const filename = `user-${userId}-${type}-${timestamp}.${extension}`
    const publicPath = `/uploads/${filename}`

    // Save to disk
    // Note: We need to import 'fs' and 'path'
    const fs = await import('fs/promises')
    const path = await import('path')
    const savedPath = path.join(process.cwd(), 'public', 'uploads', filename)

    await fs.writeFile(savedPath, buffer)

    await prisma.user.update({
        where: { id: userId },
        data: {
            [type === 'id' ? 'idDocument' : 'licenseDocument']: publicPath,
        }
    })

    // Check if both are uploaded to potentially auto-approve for demo
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (user?.idDocument && user?.licenseDocument) {
        // Simulate "Review" process - user remains PENDING until "Approval" (manual or delayed)
    }

    redirect('/profile')
}

// Function to approve user (for testing/admin usage)
import { revalidatePath } from 'next/cache'

export async function approveUser(userId: string) {
    const session = await getSession()
    // Ideally check admin role here too by fetching user if session doesn't have it, 
    // or just trusting session if we added role to payload (we didn't yet, we query DB in checkAdmin usually)
    // We'll query DB
    const admin = await prisma.user.findUnique({ where: { id: session?.userId } })
    if (admin?.role !== 'ADMIN') {
        throw new Error('Unauthorized')
    }

    await prisma.user.update({
        where: { id: userId },
        data: { status: 'APPROVED' }
    })

    revalidatePath('/admin/users')
    revalidatePath(`/admin/users/${userId}`)
}

export async function deleteDocument(formData: FormData) {
    const session = await getSession()
    if (!session?.userId) {
        redirect('/login')
    }
    const userId = session.userId
    const type = formData.get('type') as 'id' | 'license'

    // Get current file path from DB
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return

    const filePath = type === 'id' ? user.idDocument : user.licenseDocument

    if (filePath) {
        try {
            // Remove /uploads/ prefix to get filename
            const filename = filePath.replace('/uploads/', '')
            const fs = await import('fs/promises')
            const path = await import('path')
            const absolutePath = path.join(process.cwd(), 'public', 'uploads', filename)

            // Allow deletion to fail if file doesn't exist (just clean DB)
            await fs.unlink(absolutePath).catch(() => { })
        } catch (e) {
            console.error("Error deleting file:", e)
        }
    }

    await prisma.user.update({
        where: { id: userId },
        data: {
            [type === 'id' ? 'idDocument' : 'licenseDocument']: null
        }
    })

    redirect('/profile')
}
