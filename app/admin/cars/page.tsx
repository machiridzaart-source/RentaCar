import { getCars } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Plus, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { deleteCar } from "@/lib/admin-actions"

export const dynamic = 'force-dynamic'

export default async function AdminCarsPage() {
    // Layout handles Auth check
    const cars = await getCars()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Fleet Management</h1>
                    <p className="text-muted-foreground">Manage your vehicles and pricing</p>
                </div>
                <Button asChild className="bg-black text-white hover:bg-zinc-800">
                    <Link href="/admin/cars/new" className="gap-2">
                        <Plus className="h-4 w-4" /> Add Car
                    </Link>
                </Button>
            </div>

            <Card className="border-none shadow-sm">
                <CardHeader className="bg-white rounded-t-xl pb-4">
                    <CardTitle>All Cars</CardTitle>
                    <CardDescription>View and manage your entire fleet.</CardDescription>
                </CardHeader>
                <CardContent className="bg-white rounded-b-xl p-0">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">Image</th>
                                    <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">Name</th>
                                    <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">Category</th>
                                    <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">Price/Day</th>
                                    <th className="h-12 px-6 text-right align-middle font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {cars.map((car) => (
                                    <tr key={car.id} className="border-b transition-colors hover:bg-zinc-50">
                                        <td className="p-6 align-middle">
                                            <div className="h-12 w-20 overflow-hidden rounded-lg bg-gray-100">
                                                <img src={car.image} alt={car.name} className="h-full w-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="p-6 align-middle font-medium text-base">{car.name}</td>
                                        <td className="p-6 align-middle">
                                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                                {car.category}
                                            </span>
                                        </td>
                                        <td className="p-6 align-middle text-zinc-600 font-medium">${car.price}</td>
                                        <td className="p-6 align-middle text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:bg-zinc-100">
                                                    <Link href={`/admin/cars/${car.id}/edit`}>
                                                        <Pencil className="h-4 w-4 text-zinc-500" />
                                                    </Link>
                                                </Button>
                                                <form action={deleteCar.bind(null, car.id)}>
                                                    <Button variant="ghost" size="icon" type="submit" className="h-8 w-8 hover:bg-red-50 hover:text-red-500 text-zinc-400">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
