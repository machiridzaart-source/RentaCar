import { prisma } from "@/lib/db"
import { getCurrentUser, approveUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, CheckCircle, XCircle, Calendar, CreditCard } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const dynamic = 'force-dynamic'

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const admin = await getCurrentUser()
    if (!admin || admin.role !== 'ADMIN') redirect('/login')

    const { id } = await params

    // Fetch user with all details
    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            reservations: {
                include: { car: true },
                orderBy: { createdAt: 'desc' }
            }
        }
    })

    if (!user) {
        return <div>User not found</div>
    }

    // Bind approval action
    const approveAction = approveUser.bind(null, user.id)

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <Button variant="ghost" asChild className="mb-4 pl-0 gap-2">
                    <Link href="/admin/users">
                        <ArrowLeft className="h-4 w-4" /> Back to Users
                    </Link>
                </Button>
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
                        <p className="text-muted-foreground">{user.email}</p>
                        <div className="mt-2 flex items-center gap-2">
                            <span className="text-sm text-zinc-500">Status:</span>
                            <Badge
                                variant={user.status === 'APPROVED' ? 'default' : 'secondary'}
                                className={user.status === 'APPROVED' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-amber-100 text-amber-700 hover:bg-amber-100'}
                            >
                                {user.status}
                            </Badge>
                        </div>
                    </div>
                    {user.status !== 'APPROVED' && (
                        <form action={approveAction}>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                                <CheckCircle className="h-4 w-4" /> Approve User
                            </Button>
                        </form>
                    )}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Documents Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Verification Documents</CardTitle>
                        <CardDescription>Submitted identity documents</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="mb-2 font-medium flex items-center gap-2">
                                <FileText className="h-4 w-4 text-blue-500" /> Identity Document
                            </h3>
                            {user.idDocument ? (
                                <div className="rounded-lg border bg-muted/50 p-2">
                                    <div className="relative aspect-video w-full overflow-hidden rounded bg-white">
                                        {user.idDocument.endsWith('.pdf') ? (
                                            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">PDF Document</div>
                                        ) : (
                                            <img src={user.idDocument} alt="ID" className="h-full w-full object-contain" />
                                        )}
                                    </div>
                                    <Button variant="link" asChild className="mt-2 h-auto p-0 text-xs">
                                        <a href={user.idDocument} target="_blank">View Full Size</a>
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex h-24 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                                    No document uploaded
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className="mb-2 font-medium flex items-center gap-2">
                                <FileText className="h-4 w-4 text-purple-500" /> Driver's License
                            </h3>
                            {user.licenseDocument ? (
                                <div className="rounded-lg border bg-muted/50 p-2">
                                    <div className="relative aspect-video w-full overflow-hidden rounded bg-white">
                                        {user.licenseDocument.endsWith('.pdf') ? (
                                            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">PDF Document</div>
                                        ) : (
                                            <img src={user.licenseDocument} alt="License" className="h-full w-full object-contain" />
                                        )}
                                    </div>
                                    <Button variant="link" asChild className="mt-2 h-auto p-0 text-xs">
                                        <a href={user.licenseDocument} target="_blank">View Full Size</a>
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex h-24 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                                    No document uploaded
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Rental History */}
                <Card>
                    <CardHeader>
                        <CardTitle>Rental History</CardTitle>
                        <CardDescription>Past and upcoming bookings</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {user.reservations.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No reservations found.</p>
                            ) : (
                                user.reservations.map(res => (
                                    <div key={res.id} className="flex items-center gap-4 rounded-lg border p-3">
                                        <div className="h-12 w-16 overflow-hidden rounded bg-muted">
                                            <img src={res.car.image} alt={res.car.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium">{res.car.name}</div>
                                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(res.pickupDate).toLocaleDateString()} - {new Date(res.returnDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold">${res.totalPrice}</div>
                                            <Badge variant="outline" className="text-xs">{res.status}</Badge>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
