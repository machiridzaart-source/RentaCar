import 'dotenv/config'
import { prisma } from "../lib/db"


// const prisma = new PrismaClient() <-- already imported instantiated client


const cars = [
    {
        name: "Toyota Camry",
        category: "Sedan",
        image: "/silver-toyota-camry-sedan-car.jpg",
        price: 45,
        seats: 5,
        transmission: "Automatic",
        fuel: "Gasoline",
        rating: 4.8,
        reviews: 234,
        features: JSON.stringify(["Bluetooth", "Backup Camera", "Cruise Control"]),
    },
    {
        name: "Honda CR-V",
        category: "SUV",
        image: "/black-honda-crv-suv-car.jpg",
        price: 62,
        seats: 5,
        transmission: "Automatic",
        fuel: "Gasoline",
        rating: 4.9,
        reviews: 412,
        features: JSON.stringify(["AWD", "Apple CarPlay", "Lane Assist"]),
    },
    {
        name: "BMW 3 Series",
        category: "Luxury",
        image: "/blue-bmw-3-series-luxury-sedan.jpg",
        price: 89,
        seats: 5,
        transmission: "Automatic",
        fuel: "Gasoline",
        rating: 4.7,
        reviews: 156,
        features: JSON.stringify(["Leather Seats", "Navigation", "Premium Sound"]),
    },
    {
        name: "Ford Mustang",
        category: "Sports",
        image: "/red-ford-mustang-sports-car.jpg",
        price: 95,
        seats: 4,
        transmission: "Manual",
        fuel: "Gasoline",
        rating: 4.9,
        reviews: 89,
        features: JSON.stringify(["V8 Engine", "Convertible", "Sport Mode"]),
    },
    {
        name: "Tesla Model 3",
        category: "Electric",
        image: "/white-tesla-model-3.png",
        price: 75,
        seats: 5,
        transmission: "Automatic",
        fuel: "Electric",
        rating: 4.8,
        reviews: 567,
        features: JSON.stringify(["Autopilot", "Supercharging", "Glass Roof"]),
    },
    {
        name: "Jeep Wrangler",
        category: "SUV",
        image: "/green-jeep-wrangler-offroad-suv.jpg",
        price: 78,
        seats: 5,
        transmission: "Automatic",
        fuel: "Gasoline",
        rating: 4.6,
        reviews: 321,
        features: JSON.stringify(["4x4", "Removable Top", "Off-Road Package"]),
    },
    {
        name: "Volkswagen Golf",
        category: "Economy",
        image: "/white-volkswagen-golf-hatchback.jpg",
        price: 35,
        seats: 5,
        transmission: "Automatic",
        fuel: "Gasoline",
        rating: 4.5,
        reviews: 198,
        features: JSON.stringify(["Fuel Efficient", "Compact", "Easy Parking"]),
    },
    {
        name: "Mercedes-Benz E-Class",
        category: "Luxury",
        image: "/black-mercedes-benz-e-class-sedan-luxury.jpg",
        price: 120,
        seats: 5,
        transmission: "Automatic",
        fuel: "Gasoline",
        rating: 4.9,
        reviews: 234,
        features: JSON.stringify(["Massage Seats", "Ambient Lighting", "MBUX"]),
    },
]

import { hash } from 'bcryptjs'

async function main() {
    console.log("Start seeding ...")

    // Create Admin User
    const adminPassword = await hash("Admin", 10)
    const admin = await prisma.user.upsert({
        where: { email: "Admin" },
        update: {},
        create: {
            email: "Admin",
            name: "Admin User",
            password: adminPassword,
            role: "ADMIN",
            status: "APPROVED"
        }
    })
    console.log(`Created admin user with id: ${admin.id}`)

    for (const car of cars) {
        const existingCar = await prisma.car.findFirst({
            where: { name: car.name }
        })
        if (!existingCar) {
            const c = await prisma.car.create({
                data: car,
            })
            console.log(`Created car with id: ${c.id}`)
        } else {
            console.log(`Car ${car.name} already exists.`)
        }
    }
    console.log("Seeding finished.")
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
