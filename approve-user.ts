import { prisma } from './lib/db'

async function main() {
    const email = 'testapproval@example.com'
    try {
        const user = await prisma.user.update({
            where: { email },
            data: { status: 'APPROVED' }
        })
        console.log(`User ${email} approved successfully:`, user)
    } catch (e) {
        console.error(`Failed to approve user ${email}:`, e)
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
