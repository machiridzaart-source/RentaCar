import { getAdminStats } from "@/lib/admin-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Users, Car, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function AdminDashboardPage() {
    const stats = await getAdminStats()

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-[#09090b]">Business Performance</h1>
                    <p className="mt-2 text-zinc-500">Overview of your rental business.</p>
                </div>
                {/* Optional Action Button */}
            </div>

            {/* Metrics Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="rounded-2xl border-none bg-[#F5F5F7] shadow-none hover:bg-white hover:shadow-sm transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-500">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-zinc-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold tracking-tighter">${stats.totalRevenue.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground mt-1 text-emerald-600 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl border-none bg-[#D4F476] shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-[#1A2E05]">Active Rentals</CardTitle>
                        <Car className="h-4 w-4 text-[#1A2E05]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold tracking-tighter text-[#1A2E05]">{stats.activeBookings}</div>
                        <p className="text-xs text-[#2A430A] mt-1 opacity-80 flex items-center gap-1">
                            Vehicles currently on the road
                        </p>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl border-none bg-white shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-500">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-zinc-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold tracking-tighter text-[#09090b]">{stats.totalUsers}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Registered customers
                        </p>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl border-none bg-white shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-500">Fleet Size</CardTitle>
                        <Car className="h-4 w-4 text-zinc-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold tracking-tighter text-[#09090b]">{stats.totalCars}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Total vehicles in inventory
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-7">
                <Card className="col-span-4 rounded-2xl border-none bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle>Revenue Insight</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {/* Placeholder for Chart */}
                        <div className="h-[200px] w-full flex items-end justify-between px-4 gap-2">
                            {[40, 60, 45, 70, 50, 80, 65].map((h, i) => (
                                <div key={i} className="group relative w-full flex-1 bg-[#F1F3F5] rounded-t-lg hover:bg-[#D4F476] transition-colors overflow-hidden">
                                    <div className="absolute bottom-0 w-full bg-[#E4E4E7] group-hover:bg-[#C3E465] transition-colors" style={{ height: `${h}%` }}></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-xs text-zinc-400 px-4">
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 rounded-2xl border-none bg-[#111113] text-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="h-2 w-2 rounded-full bg-[#D4F476]" />
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">New Reservation</p>
                                    <p className="text-xs text-zinc-400">Elon Musk booked Tesla Model 3</p>
                                </div>
                                <div className="text-xs text-zinc-500">2m ago</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-2 w-2 rounded-full bg-blue-400" />
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">New User</p>
                                    <p className="text-xs text-zinc-400">Jeff Bezos joined RentCar</p>
                                </div>
                                <div className="text-xs text-zinc-500">1h ago</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">Payment Received</p>
                                    <p className="text-xs text-zinc-400">+$250.00 from booking #1234</p>
                                </div>
                                <div className="text-xs text-zinc-500">3h ago</div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Button variant="outline" className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">View All Activity</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
