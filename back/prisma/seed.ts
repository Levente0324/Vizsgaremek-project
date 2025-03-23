import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as argon2 from 'argon2';
const prisma = new PrismaClient();

async function cleanDatabase() {
  await prisma.extraOnBookings.deleteMany({});
  await prisma.protection.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.extra.deleteMany({});
  await prisma.token.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.car.deleteMany({});

  console.log('Database cleaned');
}

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

  for (const extra of extras) {
    await prisma.extra.create({ data: extra });
  }

  console.log('Extras seeded');
}

async function seedProtections() {
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

  global.protectionOptions = protections;

  console.log('Protections prepared (will be created with bookings)');
}

async function main() {
  try {
    await cleanDatabase();

    await seedCars();
    await seedExtras();
    await seedProtections();

    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: await argon2.hash('adminpass'),
        isAdmin: true,
      },
    });

    console.log('Admin user created:', adminUser.email);

    const regularUser = await prisma.user.create({
      data: {
        email: 'user@example.com',
        password: await argon2.hash('userpass'),
        isAdmin: false,
      },
    });

    console.log('Regular user created:', regularUser.email);

    const cars = await prisma.car.findMany({ take: 5 });
    const extras = await prisma.extra.findMany();

    for (let i = 0; i < 3; i++) {
      const car = cars[i % cars.length];
      const user = i % 2 === 0 ? adminUser : regularUser;

      const startDate = faker.date.soon({ days: 5 });
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + faker.number.int({ min: 1, max: 7 }));

      const days = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      const selectedProtection =
        global.protectionOptions[
          faker.number.int({ min: 0, max: global.protectionOptions.length - 1 })
        ];

      const booking = await prisma.booking.create({
        data: {
          startDate,
          endDate,
          carId: car.id,
          userId: user.id,
          totalPrice: car.priceForOneDay * days + selectedProtection.price,
          protection: {
            create: {
              name: selectedProtection.name,
              price: selectedProtection.price,
              description: selectedProtection.description,
            },
          },
        },
      });

      const numberOfExtras = faker.number.int({ min: 0, max: 2 });
      const selectedExtras = new Set();
      for (let j = 0; j < numberOfExtras; j++) {
        const randomIndex = faker.number.int({
          min: 0,
          max: extras.length - 1,
        });
        const randomExtra = extras[randomIndex];

        if (!selectedExtras.has(randomExtra.id)) {
          selectedExtras.add(randomExtra.id);
          await prisma.extraOnBookings.create({
            data: {
              bookingId: booking.id,
              extraId: randomExtra.id,
            },
          });
        }
      }

      console.log(
        `Created booking #${booking.id} for car ${car.manufacturer} ${car.model}`,
      );
    }

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
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
