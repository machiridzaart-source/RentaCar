import { getUsersWithDetails } from "@/lib/admin-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Car, CheckCircle, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage() {
    const users = await getUsersWithDetails()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                    <p className="text-muted-foreground">Monitor users, verification status, and rentals.</p>
                </div>
            </div>

            <Card className="border-none shadow-sm">
                <CardHeader className="bg-white rounded-t-xl pb-4">
                    <CardTitle>Registered Users</CardTitle>
                </CardHeader>
                <CardContent className="bg-white rounded-b-xl p-0">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">User</th>
                                    <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">Status</th>
                                    <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">Documents</th>
                                    <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">Active Rental</th>
                                    {/* <th className="h-12 px-6 text-right align-middle font-medium text-muted-foreground">Actions</th> */}
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {users.map((user) => {
                                    const activeReservation = user.reservations[0]
                                    const hasDocs = user.idDocument && user.licenseDocument

                                    return (
                                        <tr key={user.id} className="border-b transition-colors hover:bg-zinc-50 cursor-pointer group">
                                            <td className="p-6 align-middle">
                                                <Link href={`/admin/users/${user.id}`} className="flex items-center gap-4 group-hover:opacity-80 transition-opacity">
                                                    <Avatar className="h-9 w-9">
                                                        <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`} alt={user.name} />
                                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="grid gap-0.5">
                                                        <span className="font-medium text-base text-blue-600 group-hover:underline">{user.name}</span>
                                                        <span className="text-xs text-zinc-500">{user.email}</span>
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="p-6 align-middle">
                                                <Badge
                                                    variant="secondary"
                                                    className={`
                                                        ${user.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : ''}
                                                        ${user.status === 'PENDING' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' : ''}
                                                    `}
                                                >
                                                    {user.status === 'APPROVED' && <CheckCircle className="mr-1 h-3 w-3" />}
                                                    {user.status === 'PENDING' && <Clock className="mr-1 h-3 w-3" />}
                                                    {user.status}
                                                </Badge>
                                            </td>
                                            <td className="p-6 align-middle">
                                                <div className="flex gap-2">
                                                    {user.idDocument ? (
                                                        <Link href={user.idDocument} target="_blank" className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-zinc-100">
                                                            <FileText className="h-3 w-3 text-blue-500" /> ID
                                                        </Link>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground italic">No ID</span>
                                                    )}
                                                    {user.licenseDocument ? (
                                                        <Link href={user.licenseDocument} target="_blank" className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-zinc-100">
                                                            <FileText className="h-3 w-3 text-purple-500" /> DL
                                                        </Link>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground italic">No DL</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-6 align-middle">
                                                {activeReservation ? (
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-12 overflow-hidden rounded bg-gray-100">
                                                            <img src={activeReservation.car.image} className="h-full w-full object-cover" />
                                                        </div>
                                                        <div className="grid gap-0.5">
                                                            <span className="text-sm font-medium">{activeReservation.car.name}</span>
                                                            <span className="text-xs text-muted-foreground">
                                                                Until {activeReservation.returnDate.toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-zinc-400 text-sm">-</span>
                                                )}
                                            </td>
                                            {/* <td className="p-6 align-middle text-right">
                                                <Button variant="ghost" size="sm">Edit</Button>
                                            </td> */}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
