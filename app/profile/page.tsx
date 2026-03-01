import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser, uploadDocument, deleteDocument } from '@/lib/auth'
import { getReservations } from '@/lib/actions'
import { Header } from "@/components/header"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge' // Assuming access or I'll use standard tailwind
import { Upload, CheckCircle, Clock, AlertCircle, Trash2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ClientBookingCheck } from '@/components/client-booking-check'
import { ProfileReservations } from '@/components/profile-reservations'

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
    const user = await getCurrentUser()
    if (!user) {
        redirect('/login')
    }

    if (user.role === 'ADMIN') {
        redirect('/admin')
    }

    const reservations = await getReservations(user.id)

    const stats = {
        totalBookings: reservations.length,
        upcoming: reservations.filter(r => r.status === 'upcoming').length,
        totalSpent: reservations.reduce((acc, r) => acc + r.totalPrice, 0)
    }

    // Handle upload actions - using imported server action directly


    return (
        <div className="min-h-screen bg-background">
            <ClientBookingCheck />
            <Header user={user} />
            <div className="container mx-auto max-w-5xl p-6 py-10">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
                        <p className="text-muted-foreground">Manage your documents and view your bookings</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <div className="font-medium flex items-center justify-end gap-2">
                                {user.name}
                                {user.isPremium && (
                                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                                        PRO
                                    </span>
                                )}
                            </div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                        <div className={cn("flex h-10 w-10 items-center justify-center rounded-full font-bold", user.isPremium ? "bg-amber-100 text-amber-600 ring-2 ring-amber-500 ring-offset-2" : "bg-primary/10 text-primary")}>
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Verification Status Card */}
                    <Card className="col-span-full md:col-span-1">
                        <CardHeader>
                            <CardTitle>Account Status</CardTitle>
                            <CardDescription>Your verification status</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center space-y-4 py-4 text-center">
                                {user.status === 'APPROVED' ? (
                                    <>
                                        <div className="rounded-full bg-green-100 p-3 text-green-600">
                                            <CheckCircle className="h-8 w-8" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-green-600">Approved</h3>
                                            <p className="text-sm text-muted-foreground">You can now book cars instantly.</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="rounded-full bg-amber-100 p-3 text-amber-600">
                                            <Clock className="h-8 w-8" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-amber-600">Pending Review</h3>
                                            <p className="text-sm text-muted-foreground">Please upload your documents for approval.</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Cards */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalBookings}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${stats.totalSpent}</div>
                        </CardContent>
                    </Card>

                    {/* Uploaded Documents Display */}
                    {(user.idDocument || user.licenseDocument) && (
                        <Card className="col-span-full">
                            <CardHeader>
                                <CardTitle>Uploaded Documents</CardTitle>
                                <CardDescription>Your currently submitted documents</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6 md:grid-cols-2">
                                {user.idDocument && (
                                    <div className="rounded-xl border p-4 relative group">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-medium">Identity Document</h3>
                                            <form action={deleteDocument}>
                                                <input type="hidden" name="type" value="id" />
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        </div>
                                        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
                                            {/* We use a simple img tag here. In production, consider Next.js Image with a loader or security checks */}
                                            {user.idDocument.endsWith('.pdf') ? (
                                                <div className="flex h-full items-center justify-center text-muted-foreground">
                                                    PDF Document
                                                </div>
                                            ) : (
                                                <img src={user.idDocument} alt="ID Document" className="h-full w-full object-cover" />
                                            )}
                                        </div>
                                        <a href={user.idDocument} target="_blank" rel="noopener noreferrer" className="mt-2 block text-center text-sm text-primary hover:underline">
                                            View Full Size
                                        </a>
                                    </div>
                                )}
                                {user.licenseDocument && (
                                    <div className="rounded-xl border p-4 relative group">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-medium">Driver's License</h3>
                                            <form action={deleteDocument}>
                                                <input type="hidden" name="type" value="license" />
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        </div>
                                        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
                                            {user.licenseDocument.endsWith('.pdf') ? (
                                                <div className="flex h-full items-center justify-center text-muted-foreground">
                                                    PDF Document
                                                </div>
                                            ) : (
                                                <img src={user.licenseDocument} alt="Driver's License" className="h-full w-full object-cover" />
                                            )}
                                        </div>
                                        <a href={user.licenseDocument} target="_blank" rel="noopener noreferrer" className="mt-2 block text-center text-sm text-primary hover:underline">
                                            View Full Size
                                        </a>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Document Upload Section */}
                    <Card className="col-span-full">
                        <CardHeader>
                            <CardTitle>Documents</CardTitle>
                            <CardDescription>Upload your ID and Driver's License for verification</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-dashed p-6 text-center">
                                <h3 className="mb-2 font-medium">Identity Document</h3>
                                <p className="mb-4 text-sm text-muted-foreground">Passport or National ID</p>
                                <form action={uploadDocument}>
                                    <input type="hidden" name="type" value="id" />
                                    <div className="mb-4">
                                        <input
                                            type="file"
                                            name="file"
                                            accept="image/*,.pdf"
                                            className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                                            required
                                        />
                                    </div>
                                    <Button variant="outline" type="submit" className="w-full gap-2">
                                        <Upload className="h-4 w-4" /> Upload Document
                                    </Button>
                                </form>
                            </div>
                            <div className="rounded-xl border border-dashed p-6 text-center">
                                <h3 className="mb-2 font-medium">Driver's License</h3>
                                <p className="mb-4 text-sm text-muted-foreground">Valid Driver's License</p>
                                <form action={uploadDocument}>
                                    <input type="hidden" name="type" value="license" />
                                    <div className="mb-4">
                                        <input
                                            type="file"
                                            name="file"
                                            accept="image/*,.pdf"
                                            className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                                            required
                                        />
                                    </div>
                                    <Button variant="outline" type="submit" className="w-full gap-2">
                                        <Upload className="h-4 w-4" /> Upload License
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bookings List */}
                    <Card className="col-span-full">
                        <CardHeader>
                            <CardTitle>Recent Bookings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ProfileReservations reservations={reservations} userStatus={user.status} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
