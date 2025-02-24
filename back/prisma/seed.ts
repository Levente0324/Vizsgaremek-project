import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as argon2 from 'argon2';
const prisma = new PrismaClient();

async function seedCars() {
  await prisma.car.createMany({
    data: [
      {
        manufacturer: 'Toyota',
        model: 'Aygo',
        type: 'Economical',
        numberOfSeats: 5,
        numberOfSuitcases: 2,
        fuelType: 'Petrol',
        clutchType: 'Manual',
        priceForOneDay: 5000,
        isAvailable: true,
      },
      {
        manufacturer: 'Opel',
        model: 'Corsa',
        type: 'Economical',
        numberOfSeats: 5,
        numberOfSuitcases: 1,
        fuelType: 'Petrol',
        clutchType: 'Automatic',
        priceForOneDay: 6500,
        isAvailable: true,
      },
      {
        manufacturer: 'Citroen',
        model: 'C2',
        type: 'Economical',
        numberOfSeats: 4,
        numberOfSuitcases: 1,
        fuelType: 'Petrol',
        clutchType: 'Manual',
        priceForOneDay: 7000,
        isAvailable: true,
      },
      {
        manufacturer: 'Volkswagen',
        model: 'Polo',
        type: 'Economical',
        numberOfSeats: 5,
        numberOfSuitcases: 1,
        fuelType: 'Petrol',
        clutchType: 'Automatic',
        priceForOneDay: 9000,
        isAvailable: true,
      },
      {
        manufacturer: 'Hyundai',
        model: 'i10',
        type: 'Economical',
        numberOfSeats: 4,
        numberOfSuitcases: 1,
        fuelType: 'Petrol',
        clutchType: 'Manual',
        priceForOneDay: 5500,
        isAvailable: true,
      },
      {
        manufacturer: 'Fiat',
        model: 'Panda',
        type: 'Economical',
        numberOfSeats: 5,
        numberOfSuitcases: 1,
        fuelType: 'Petrol',
        clutchType: 'Manual',
        priceForOneDay: 6000,
        isAvailable: true,
      },
      {
        manufacturer: 'Skoda',
        model: 'Scala',
        type: 'Standard',
        numberOfSeats: 5,
        numberOfSuitcases: 2,
        fuelType: 'Petrol',
        clutchType: 'Manual',
        priceForOneDay: 12000,
        isAvailable: true,
      },
      {
        manufacturer: 'Peugeot',
        model: '308',
        type: 'Standard',
        numberOfSeats: 5,
        numberOfSuitcases: 2,
        fuelType: 'Diesel',
        clutchType: 'Automatic',
        priceForOneDay: 15000,
        isAvailable: true,
      },
      {
        manufacturer: 'Toyota',
        model: 'Corolla',
        type: 'Standard',
        numberOfSeats: 5,
        numberOfSuitcases: 3,
        fuelType: 'Petrol',
        clutchType: 'Manual',
        priceForOneDay: 14000,
        isAvailable: true,
      },
      {
        manufacturer: 'Audi',
        model: 'A3',
        type: 'Standard',
        numberOfSeats: 5,
        numberOfSuitcases: 2,
        fuelType: 'Petrol',
        clutchType: 'Manual',
        priceForOneDay: 18000,
        isAvailable: true,
      },
      {
        manufacturer: 'Hyundai',
        model: 'Elantra',
        type: 'Standard',
        numberOfSeats: 5,
        numberOfSuitcases: 3,
        fuelType: 'Petrol',
        clutchType: 'Manual',
        priceForOneDay: 15500,
        isAvailable: true,
      },
      {
        manufacturer: 'Volkswagen',
        model: 'Jetta',
        type: 'Standard',
        numberOfSeats: 5,
        numberOfSuitcases: 2,
        fuelType: 'Diesel',
        clutchType: 'Manual',
        priceForOneDay: 16500,
        isAvailable: true,
      },
      {
        manufacturer: 'Toyota',
        model: 'RAV4',
        type: 'SUV',
        numberOfSeats: 5,
        numberOfSuitcases: 3,
        fuelType: 'Petrol',
        clutchType: 'Automatic',
        priceForOneDay: 19000,
        isAvailable: true,
      },
      {
        manufacturer: 'Ford',
        model: 'Escape',
        type: 'SUV',
        numberOfSeats: 5,
        numberOfSuitcases: 3,
        fuelType: 'Petrol',
        clutchType: 'Manual',
        priceForOneDay: 21000,
        isAvailable: true,
      },
      {
        manufacturer: 'Jeep',
        model: 'Grand Cherokee',
        type: 'SUV',
        numberOfSeats: 5,
        numberOfSuitcases: 4,
        fuelType: 'Petrol',
        clutchType: 'Automatic',
        priceForOneDay: 24000,
        isAvailable: true,
      },
      {
        manufacturer: 'Mazda',
        model: 'CX-60',
        type: 'SUV',
        numberOfSeats: 5,
        numberOfSuitcases: 3,
        fuelType: 'Diesel',
        clutchType: 'Automatic',
        priceForOneDay: 18000,
        isAvailable: true,
      },
      {
        manufacturer: 'Opel',
        model: 'Mokka',
        type: 'SUV',
        numberOfSeats: 5,
        numberOfSuitcases: 3,
        fuelType: 'Petrol',
        clutchType: 'Manual',
        priceForOneDay: 15500,
        isAvailable: true,
      },
      {
        manufacturer: 'Suzuki',
        model: 'SX4 S-Cross',
        type: 'SUV',
        numberOfSeats: 5,
        numberOfSuitcases: 2,
        fuelType: 'Petrol',
        clutchType: 'Manual',
        priceForOneDay: 15000,
        isAvailable: true,
      },
      {
        manufacturer: 'Dodge',
        model: 'Grand Caravan',
        type: 'Small bus',
        numberOfSeats: 7,
        numberOfSuitcases: 4,
        fuelType: 'Diesel',
        clutchType: 'Automatic',
        priceForOneDay: 31000,
        isAvailable: true,
      },
      {
        manufacturer: 'Ford',
        model: 'Galaxy',
        type: 'Small bus',
        numberOfSeats: 7,
        numberOfSuitcases: 4,
        fuelType: 'Diesel',
        clutchType: 'Manual',
        priceForOneDay: 29500,
        isAvailable: true,
      },
      {
        manufacturer: 'Volkswagen',
        model: 'Touran',
        type: 'Small bus',
        numberOfSeats: 7,
        numberOfSuitcases: 4,
        fuelType: 'Petrol',
        clutchType: 'Manual',
        priceForOneDay: 30000,
        isAvailable: true,
      },
      {
        manufacturer: 'Chrysler',
        model: 'Pacifica',
        type: 'Small bus',
        numberOfSeats: 7,
        numberOfSuitcases: 5,
        fuelType: 'Petrol',
        clutchType: 'Automatic',
        priceForOneDay: 35000,
        isAvailable: true,
      },
      {
        manufacturer: 'Opel',
        model: 'Zafira',
        type: 'Small bus',
        numberOfSeats: 7,
        numberOfSuitcases: 3,
        fuelType: 'Diesel',
        clutchType: 'Manual',
        priceForOneDay: 27000,
        isAvailable: true,
      },
      {
        manufacturer: 'Mercedes',
        model: 'Vito',
        type: 'Small bus',
        numberOfSeats: 7,
        numberOfSuitcases: 4,
        fuelType: 'Diesel',
        clutchType: 'Automatic',
        priceForOneDay: 38500,
        isAvailable: true,
      },
      {
        manufacturer: 'Ford',
        model: 'Mustang Convertible',
        type: 'Cabrio',
        numberOfSeats: 4,
        numberOfSuitcases: 2,
        fuelType: 'Petrol',
        clutchType: 'Automatic',
        priceForOneDay: 30000,
        isAvailable: true,
      },
      {
        manufacturer: 'Chrysler',
        model: 'Sebring Cabrio',
        type: 'Cabrio',
        numberOfSeats: 4,
        numberOfSuitcases: 2,
        fuelType: 'Petrol',
        clutchType: 'Manual',
        priceForOneDay: 21000,
        isAvailable: true,
      },
      {
        manufacturer: 'Fiat',
        model: '500 Cabrio',
        type: 'Cabrio',
        numberOfSeats: 4,
        numberOfSuitcases: 1,
        fuelType: 'Petrol',
        clutchType: 'Manual',
        priceForOneDay: 18000,
        isAvailable: true,
      },
      {
        manufacturer: 'Audi',
        model: 'A3 Cabrio',
        type: 'Cabrio',
        numberOfSeats: 4,
        numberOfSuitcases: 2,
        fuelType: 'Petrol',
        clutchType: 'Automatic',
        priceForOneDay: 22500,
        isAvailable: true,
      },
      {
        manufacturer: 'Honda',
        model: 'S2000',
        type: 'Cabrio',
        numberOfSeats: 4,
        numberOfSuitcases: 2,
        fuelType: 'Petrol',
        clutchType: 'Manual',
        priceForOneDay: 33500,
        isAvailable: true,
      },
      {
        manufacturer: 'Volkswagen',
        model: 'T-ROC Cabrio',
        type: 'Cabrio',
        numberOfSeats: 5,
        numberOfSuitcases: 2,
        fuelType: 'Petrol',
        clutchType: 'Manual',
        priceForOneDay: 24500,
        isAvailable: true,
      },
      {
        manufacturer: 'Mercedes',
        model: 'E-class',
        type: 'Comfort',
        numberOfSeats: 5,
        numberOfSuitcases: 3,
        fuelType: 'Petrol',
        clutchType: 'Automatic',
        priceForOneDay: 34500,
        isAvailable: true,
      },
      {
        manufacturer: 'Audi',
        model: 'A6',
        type: 'Comfort',
        numberOfSeats: 5,
        numberOfSuitcases: 3,
        fuelType: 'Petrol',
        clutchType: 'Manual',
        priceForOneDay: 32000,
        isAvailable: true,
      },
      {
        manufacturer: 'BMW',
        model: '5 Series',
        type: 'Comfort',
        numberOfSeats: 5,
        numberOfSuitcases: 3,
        fuelType: 'Petrol',
        clutchType: 'Automatic',
        priceForOneDay: 35000,
        isAvailable: true,
      },
      {
        manufacturer: 'Honda',
        model: 'Accord',
        type: 'Comfort',
        numberOfSeats: 5,
        numberOfSuitcases: 4,
        fuelType: 'Petrol',
        clutchType: 'Manual',
        priceForOneDay: 28500,
        isAvailable: true,
      },
      {
        manufacturer: 'Mercedes',
        model: 'C-Class CLA 63',
        type: 'Comfort',
        numberOfSeats: 5,
        numberOfSuitcases: 3,
        fuelType: 'Petrol',
        clutchType: 'Automatic',
        priceForOneDay: 41000,
        isAvailable: true,
      },
      {
        manufacturer: 'Ford',
        model: 'Mondeo',
        type: 'Comfort',
        numberOfSeats: 5,
        numberOfSuitcases: 4,
        fuelType: 'Diesel',
        clutchType: 'Automatic',
        priceForOneDay: 29000,
        isAvailable: true,
      },
    ],
  });
}

async function seedExtras() {
  const extras = [
    {
      name: 'GPS Navigation',
      price: 2000,
      description: 'Built-in GPS navigation system',
    },
    {
      name: 'Child Seat',
      price: 3000,
      description: 'Safe and comfortable child seat',
    },
    {
      name: 'Additional Driver',
      price: 5000,
      description: 'Register an additional driver',
    },
    {
      name: 'Airport Pickup',
      price: 8000,
      description: 'Pickup service from airport',
    },
  ];

  const protections = [
    {
      name: 'Basic',
      price: 5000,
      description: 'Basic coverage for minor damages',
    },
    {
      name: 'Premium',
      price: 8000,
      description: 'Extended coverage including tire and glass',
    },
    {
      name: 'Full',
      price: 12000,
      description: 'Complete coverage with zero deductible',
    },
  ];

  for (const extra of extras) {
    await prisma.extra.create({ data: extra });
  }

  console.log('Extras seeded');
}

async function main() {
  await seedCars();
  await seedExtras();

  const user1 = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      password: await argon2.hash('adminpass'),
      isAdmin: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      password: await argon2.hash('userpass'),
      isAdmin: false,
    },
  });

  const randomCar = await prisma.car.findFirst({
    where: {
      id: faker.number.int({ min: 1, max: 36 }),
    },
  });

  if (randomCar) {
    const startDate = faker.date.recent();
    const endDate = faker.date.future();
    const days = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    const booking = await prisma.booking.create({
      data: {
        startDate: startDate,
        endDate: endDate,
        carId: randomCar.id,
        userId: user1.id,
        totalPrice: randomCar.priceForOneDay * days, // Calculate total price based on days
        protection: {
          create: {
            name: 'Basic',
            price: 5000,
            description: 'Basic coverage for minor damages',
          },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
