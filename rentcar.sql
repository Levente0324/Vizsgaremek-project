-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 14. 17:04
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `rentcar`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `carId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `startDate` datetime(3) NOT NULL,
  `endDate` datetime(3) NOT NULL,
  `totalPrice` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `bookings`
--

INSERT INTO `bookings` (`id`, `carId`, `userId`, `startDate`, `endDate`, `totalPrice`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, '2025-04-15 14:36:06.160', '2025-04-20 14:36:06.160', 30000, '2025-04-14 15:03:06.789', '2025-04-14 15:03:06.789'),
(2, 2, 2, '2025-04-18 14:55:26.204', '2025-04-20 14:55:26.204', 18000, '2025-04-14 15:03:06.940', '2025-04-14 15:03:06.940'),
(3, 3, 1, '2025-04-18 17:30:51.022', '2025-04-21 17:30:51.022', 33000, '2025-04-14 15:03:07.290', '2025-04-14 15:03:07.290');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `manufacturer` varchar(191) NOT NULL,
  `model` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `number_of_seats` int(11) NOT NULL,
  `number_of_suitcases` int(11) NOT NULL,
  `fuel_type` varchar(191) NOT NULL,
  `clutch_type` varchar(191) NOT NULL,
  `price_for_one_day` double NOT NULL,
  `is_available` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `cars`
--

INSERT INTO `cars` (`id`, `manufacturer`, `model`, `type`, `number_of_seats`, `number_of_suitcases`, `fuel_type`, `clutch_type`, `price_for_one_day`, `is_available`) VALUES
(1, 'Toyota', 'Aygo', 'Economical', 5, 2, 'Petrol', 'Manual', 5000, 1),
(2, 'Opel', 'Corsa', 'Economical', 5, 1, 'Petrol', 'Automatic', 6500, 1),
(3, 'Citroen', 'C2', 'Economical', 4, 1, 'Petrol', 'Manual', 7000, 1),
(4, 'Volkswagen', 'Polo', 'Economical', 5, 1, 'Petrol', 'Automatic', 9000, 1),
(5, 'Hyundai', 'i10', 'Economical', 4, 1, 'Petrol', 'Manual', 5500, 1),
(6, 'Fiat', 'Panda', 'Economical', 5, 1, 'Petrol', 'Manual', 6000, 1),
(7, 'Skoda', 'Scala', 'Standard', 5, 2, 'Petrol', 'Manual', 12000, 1),
(8, 'Peugeot', '308', 'Standard', 5, 2, 'Diesel', 'Automatic', 15000, 1),
(9, 'Toyota', 'Corolla', 'Standard', 5, 3, 'Petrol', 'Manual', 14000, 1),
(10, 'Audi', 'A3', 'Standard', 5, 2, 'Petrol', 'Manual', 18000, 1),
(11, 'Hyundai', 'Elantra', 'Standard', 5, 3, 'Petrol', 'Manual', 15500, 1),
(12, 'Volkswagen', 'Jetta', 'Standard', 5, 2, 'Diesel', 'Manual', 16500, 1),
(13, 'Toyota', 'RAV4', 'SUV', 5, 3, 'Petrol', 'Automatic', 19000, 1),
(14, 'Ford', 'Escape', 'SUV', 5, 3, 'Petrol', 'Manual', 21000, 1),
(15, 'Jeep', 'Grand Cherokee', 'SUV', 5, 4, 'Petrol', 'Automatic', 24000, 1),
(16, 'Mazda', 'CX-60', 'SUV', 5, 3, 'Diesel', 'Automatic', 18000, 1),
(17, 'Opel', 'Mokka', 'SUV', 5, 3, 'Petrol', 'Manual', 15500, 1),
(18, 'Suzuki', 'SX4 S-Cross', 'SUV', 5, 2, 'Petrol', 'Manual', 15000, 1),
(19, 'Dodge', 'Grand Caravan', 'Small bus', 7, 4, 'Diesel', 'Automatic', 31000, 1),
(20, 'Ford', 'Galaxy', 'Small bus', 7, 4, 'Diesel', 'Manual', 29500, 1),
(21, 'Volkswagen', 'Touran', 'Small bus', 7, 4, 'Petrol', 'Manual', 30000, 1),
(22, 'Chrysler', 'Pacifica', 'Small bus', 7, 5, 'Petrol', 'Automatic', 35000, 1),
(23, 'Opel', 'Zafira', 'Small bus', 7, 3, 'Diesel', 'Manual', 27000, 1),
(24, 'Mercedes', 'Vito', 'Small bus', 7, 4, 'Diesel', 'Automatic', 38500, 1),
(25, 'Ford', 'Mustang Convertible', 'Cabrio', 4, 2, 'Petrol', 'Automatic', 30000, 1),
(26, 'Chrysler', 'Sebring Cabrio', 'Cabrio', 4, 2, 'Petrol', 'Manual', 21000, 1),
(27, 'Fiat', '500 Cabrio', 'Cabrio', 4, 1, 'Petrol', 'Manual', 18000, 1),
(28, 'Audi', 'A3 Cabrio', 'Cabrio', 4, 2, 'Petrol', 'Automatic', 22500, 1),
(29, 'Honda', 'S2000', 'Cabrio', 4, 2, 'Petrol', 'Manual', 33500, 1),
(30, 'Volkswagen', 'T-ROC Cabrio', 'Cabrio', 5, 2, 'Petrol', 'Manual', 24500, 1),
(31, 'Mercedes', 'E-class', 'Comfort', 5, 3, 'Petrol', 'Automatic', 34500, 1),
(32, 'Audi', 'A6', 'Comfort', 5, 3, 'Petrol', 'Manual', 32000, 1),
(33, 'BMW', '5 Series', 'Comfort', 5, 3, 'Petrol', 'Automatic', 35000, 1),
(34, 'Honda', 'Accord', 'Comfort', 5, 4, 'Petrol', 'Manual', 28500, 1),
(35, 'Mercedes', 'C-Class CLA 63', 'Comfort', 5, 3, 'Petrol', 'Automatic', 41000, 1),
(36, 'Ford', 'Mondeo', 'Comfort', 5, 4, 'Diesel', 'Automatic', 29000, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `extras`
--

CREATE TABLE `extras` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `price` double NOT NULL,
  `description` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `extras`
--

INSERT INTO `extras` (`id`, `name`, `price`, `description`) VALUES
(1, 'GPS Navigation', 2000, 'Built-in GPS navigation system'),
(2, 'Child Seat', 3000, 'Safe and comfortable child seat'),
(3, 'Additional Driver', 5000, 'Register an additional driver'),
(4, 'Airport Pickup', 8000, 'Pickup service from airport');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `extra_on_bookings`
--

CREATE TABLE `extra_on_bookings` (
  `bookingId` int(11) NOT NULL,
  `extraId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `extra_on_bookings`
--

INSERT INTO `extra_on_bookings` (`bookingId`, `extraId`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `protections`
--

CREATE TABLE `protections` (
  `id` int(11) NOT NULL,
  `bookingId` int(11) NOT NULL,
  `protectionPlanId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `protections`
--

INSERT INTO `protections` (`id`, `bookingId`, `protectionPlanId`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `protection_plans`
--

CREATE TABLE `protection_plans` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `price` double NOT NULL,
  `description` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `protection_plans`
--

INSERT INTO `protection_plans` (`id`, `name`, `price`, `description`) VALUES
(1, 'Basic', 5000, 'Basic coverage for minor damages'),
(2, 'Premium', 8000, 'Extended coverage including tire and glass'),
(3, 'Full', 12000, 'Complete coverage with zero deductible'),
(4, 'None', 0, 'No additional protection');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(191) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `expiresAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `isAdmin`) VALUES
(1, 'admin@example.com', '$argon2id$v=19$m=65536,t=3,p=4$BA8sCeqJlybkbpihhKYjwA$XatB4V/Ay4KQNt8uCt+4Pd87VXDapZzU1zucgW8Yz30', 1),
(2, 'user@example.com', '$argon2id$v=19$m=65536,t=3,p=4$2ETdLQ1STgvH5cZZoga68A$4ezBjHC1iCU14/4lSu8VUfnvORB8wGxbPV8XqtgV5oI', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('8362378f-34f9-4199-b4b8-3bf3dd6fbb16', '5812ffb4b8adc3d605c26e155ac51efae37f2937f34a9b549a97a29ae7b1a379', '2025-04-14 15:02:44.051', '20250414150238_init', NULL, NULL, '2025-04-14 15:02:38.460', 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookings_carId_fkey` (`carId`),
  ADD KEY `bookings_userId_fkey` (`userId`);

--
-- A tábla indexei `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `extras`
--
ALTER TABLE `extras`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `extra_on_bookings`
--
ALTER TABLE `extra_on_bookings`
  ADD PRIMARY KEY (`bookingId`,`extraId`),
  ADD KEY `extra_on_bookings_extraId_fkey` (`extraId`);

--
-- A tábla indexei `protections`
--
ALTER TABLE `protections`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `protections_bookingId_key` (`bookingId`),
  ADD KEY `protections_protectionPlanId_fkey` (`protectionPlanId`);

--
-- A tábla indexei `protection_plans`
--
ALTER TABLE `protection_plans`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tokens_token_key` (`token`),
  ADD KEY `tokens_userId_fkey` (`userId`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`);

--
-- A tábla indexei `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT a táblához `extras`
--
ALTER TABLE `extras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `protections`
--
ALTER TABLE `protections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `protection_plans`
--
ALTER TABLE `protection_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `cars` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `extra_on_bookings`
--
ALTER TABLE `extra_on_bookings`
  ADD CONSTRAINT `extra_on_bookings_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `extra_on_bookings_extraId_fkey` FOREIGN KEY (`extraId`) REFERENCES `extras` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `protections`
--
ALTER TABLE `protections`
  ADD CONSTRAINT `protections_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `protections_protectionPlanId_fkey` FOREIGN KEY (`protectionPlanId`) REFERENCES `protection_plans` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
