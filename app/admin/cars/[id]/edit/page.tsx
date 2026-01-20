import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { updateCar } from "@/lib/admin-actions"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { prisma } from "@/lib/db"

export default async function EditCarPage({ params }: { params: Promise<{ id: string }> }) {
    const user = await getCurrentUser()
    if (!user || user.role !== 'ADMIN') redirect('/login')

    const { id } = await params
    const carId = parseInt(id)
    if (isNaN(carId)) redirect('/admin')

    const car = await prisma.car.findUnique({ where: { id: carId } })
    if (!car) redirect('/admin')

    // Create a bound update action
    const updateCarWithId = updateCar.bind(null, car.id)

    return (
        <div className="min-h-screen bg-background">
            <Header user={user} />
            <main className="container max-w-2xl mx-auto p-6">
                <div className="mb-6">
                    <Button variant="ghost" asChild className="mb-4 pl-0 gap-2">
                        <Link href="/admin">
                            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Car</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Edit {car.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action={updateCarWithId} className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Car Name</Label>
                                    <Input id="name" name="name" required defaultValue={car.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select name="category" required defaultValue={car.category}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Sedan">Sedan</SelectItem>
                                            <SelectItem value="SUV">SUV</SelectItem>
                                            <SelectItem value="Luxury">Luxury</SelectItem>
                                            <SelectItem value="Sports">Sports</SelectItem>
                                            <SelectItem value="Electric">Electric</SelectItem>
                                            <SelectItem value="Economy">Economy</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price per Day ($)</Label>
                                    <Input id="price" name="price" type="number" required min="1" defaultValue={car.price} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="seats">Seats</Label>
                                    <Input id="seats" name="seats" type="number" required min="1" max="9" defaultValue={car.seats} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="transmission">Transmission</Label>
                                    <Select name="transmission" required defaultValue={car.transmission}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select transmission" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Automatic">Automatic</SelectItem>
                                            <SelectItem value="Manual">Manual</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="fuel">Fuel Type</Label>
                                    <Select name="fuel" required defaultValue={car.fuel}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select fuel type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Gasoline">Gasoline</SelectItem>
                                            <SelectItem value="Electric">Electric</SelectItem>
                                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                                            <SelectItem value="Diesel">Diesel</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="features">Features (JSON Array)</Label>
                                <Textarea
                                    id="features"
                                    name="features"
                                    required
                                    className="font-mono text-sm"
                                    defaultValue={car.features}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">Image URL</Label>
                                <Input id="image" name="image" defaultValue={car.image} />
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button variant="outline" asChild>
                                    <Link href="/admin">Cancel</Link>
                                </Button>
                                <Button type="submit">save Changes</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
