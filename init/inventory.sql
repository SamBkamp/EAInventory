-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Apr 09, 2025 at 10:46 PM
-- Server version: 9.2.0
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

CREATE TABLE `config` (
  `name` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `config`
--

INSERT INTO `config` (`name`, `value`) VALUES
('lastupdated', '1743578408936');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `email`, `name`, `school`) VALUES
(6, 'test@test.com', 'sam', 'sam'),
(7, 'sage_william@yahoo.com', 'Will', 'South Island School'),
(8, 'sage_william@yahoo.com', 'Will', 'South Island School');

-- --------------------------------------------------------

--
-- Table structure for table `FM_products`
--

CREATE TABLE `FM_products` (
  `id` int NOT NULL,
  `code` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `cost` decimal(6,2) NOT NULL COMMENT 'price we purchase at (no VAT)',
  `markup` decimal(4,2) NOT NULL COMMENT 'markup (multiplier)',
  `stock` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `FM_products`
--

INSERT INTO `FM_products` (`id`, `code`, `name`, `cost`, `markup`, `stock`) VALUES
(1, '14290V', 'DINO X 250ml', 109.10, 2.15, 3),
(2, '14295V', 'DINO X 500ml', 165.38, 2.15, 0),
(3, '14300V', 'DINO X 1000ml', 258.08, 2.15, 0),
(4, '14317V', 'AEFW X 500m', 158.71, 2.15, 0),
(5, '14318V', 'AEFW X 1000ml', 264.68, 2.15, 0),
(6, '19108V', 'Cili Dip 250m', 49.53, 2.15, 5),
(7, '19106V', 'Cili Dip 500ml', 89.24, 2.15, 0),
(8, '19107V', 'Cili Dip 1000m', 132.26, 2.15, 0),
(9, '14321V', 'RECON X 500ml', 155.41, 2.15, 6),
(10, '14322V', 'RECON X 1000m', 261.38, 2.15, 0),
(11, '14305V', 'RED X 250ml', 99.13, 2.15, 4),
(12, '14310V', 'RED X 500ml', 162.09, 2.15, 0),
(13, '14315V', 'RED X 1000ml', 258.08, 2.15, 0),
(14, '14302V', 'RTN/STN X 500ml', 158.71, 2.15, 0),
(15, '14303V', 'RTN/STN X 1000ml', 258.08, 2.15, 3),
(16, '19100V', 'The Dip 250ml', 89.24, 2.15, 0),
(17, '19105V', 'The Dip 500ml', 132.26, 2.15, 0),
(18, '12055V', 'Phos 0.04 475g', 95.84, 2.15, 0),
(19, '12060V', 'Phos 0.04 950g', 155.41, 2.15, 0),
(20, '12030V', 'Power Phos 400g', 66.01, 2.15, 0),
(21, '12035V', 'Power Phos 800g', 89.24, 2.15, 0),
(22, '12037V', 'Power Phos 1.6kg', 128.96, 2.15, 0),
(23, '12045V', 'Power Phos 4.4kg', 251.41, 2.15, 0),
(24, '12005V', 'Ultra Phos 365g', 75.98, 2.15, 0),
(25, '12010V', 'Ultra Phos 730g', 115.70, 2.15, 0),
(26, '12015V', 'Ultra Phos 1.5kg', 198.51, 2.15, 0),
(27, '12020V', 'Ultra Phos 4015g', 463.35, 2.15, 0),
(28, '70100V', 'NPO Redu Pellets 350g', 99.13, 2.15, 0),
(29, '70101V', 'NPO Redu Pellets 700g', 165.38, 2.15, 0),
(30, '20500V', 'Coral Balance 180g', 66.01, 2.15, 0),
(31, '20505V', 'Coral Balance 360g', 118.99, 2.15, 0),
(32, '13025V', 'ZEO Light 1kg', 46.15, 2.15, 0),
(33, '13030V', 'ZEO Light 2kg', 75.98, 2.15, 0),
(34, '13035V', 'ZEO Light 5.5kg', 171.98, 2.15, 0),
(35, '20396V', 'Reef ICP 6er-Set (set of 6)', 420.00, 2.15, 0),
(36, '14145V', 'Bacto Blend 250ml', 99.13, 2.15, 0),
(37, '14150V', 'Bacto Blend 500ml', 132.26, 2.35, 0),
(38, '14155V', 'Bacto Blend 1000ml', 231.55, 2.15, 0),
(39, '14405V', 'Bacto Balls 100ml', 66.01, 2.15, 0),
(40, '14410V', 'Bacto Balls 250ml', 115.70, 2.15, 0),
(41, '14415V', 'Bacto Balls 500ml', 191.83, 2.15, 0),
(42, '11200V', 'Bacto Energy 100ml', 75.98, 2.15, 0),
(43, '11205V', 'Bacto Energy 250ml', 125.67, 2.15, 0),
(44, '11210V', 'Bacto Energy 500ml', 198.51, 2.15, 0),
(45, '11215V', 'Bacto Energy 1000ml', 261.38, 2.15, 0),
(46, '14175V', 'Bacto Therapy 250ml', 85.95, 2.15, 0),
(47, '14180V', 'Bacto Therapy 500ml', 132.26, 2.15, 0),
(48, '14185V', 'Bacto Therapy 1000ml', 231.55, 2.15, 0),
(49, '14200V', 'Coral Vitality 50ml', 118.99, 2.15, 13),
(50, '14420V', 'ReBiotic 100% natural 50g', 109.10, 2.15, 0),
(51, '14425V', 'ReBiotic 100% natural 125g', 231.55, 2.15, 0),
(52, '14430V', 'ReBiotic 100% natural 250g', 397.10, 2.15, 0),
(53, '12171V', 'Reef Start Pro Bac 60ml', 49.53, 2.15, 0),
(54, '14282V', 'VIB X Marine 140g', 82.57, 2.15, 5),
(55, '14283V', 'VIB X Marine 350g', 181.95, 2.15, 0),
(56, '14284V', 'VIB X Marine 700g', 327.55, 2.15, 0),
(57, '13100V', 'Kalkwasser 250', 36.26, 2.15, 0),
(58, '13101V', 'Kalkwasser 500g', 66.01, 2.15, 0),
(59, '13102V', 'Kalkwasser 1000', 118.99, 2.15, 2),
(60, '13103V', 'Kalkwasser 2.75kg', 294.51, 2.15, 2),
(61, '19203V', 'Ready2Reef 250ml', 56.12, 2.15, 0),
(62, '19204V', 'Ready2Reef 500ml', 75.98, 2.15, 7),
(63, '19206V', 'Ready2Reef 1000ml', 118.99, 2.15, 2),
(64, '14205V', 'Balling Light Calcium-Mix Ca 1kg', 56.12, 2.15, 0),
(65, '14230V', 'Balling Light Calcium-Mix Ca 2kg', 95.84, 2.15, 0),
(66, '14235V', 'Balling Light Calcium-Mix Ca 4kg', 132.26, 2.15, 0),
(67, '14220V', 'Balling Light Carbonate-Mix KH 1kg', 56.12, 2.15, 0),
(68, '14225V', 'Balling Light Carbonate-Mix KH 2k', 95.84, 2.15, 0),
(69, '14250V', 'Balling Light Carbonate-Mix KH 4kg', 132.26, 2.15, 0),
(70, '14210V', 'Balling Light Magnesium-Mix Mg 1kg', 56.12, 2.15, 0),
(71, '14215V', 'Balling Light Magnesium-Mix Mg 2kg', 95.84, 2.15, 0),
(72, '14240V', 'Balling Light Magnesium-Mix Mg 4kg', 132.26, 2.15, 0),
(73, '14005V', 'Balling Light Trace 1 Color & Grow 250ml', 56.12, 2.15, 0),
(74, '14025V', 'Balling Light Trace 1 Color & Grow 500ml', 79.27, 2.15, 0),
(75, '14010V', 'Balling Light Trace 2 Metabolic 250ml', 56.12, 2.15, 0),
(76, '14030V', 'Balling Light Trace 2 Metabolic 500ml', 79.27, 2.15, 0),
(77, '14015V', 'Balling Light Trace 3 Health 250ml', 56.12, 2.15, 0),
(78, '14035V', 'Balling Light Trace 3 Health 500ml', 79.27, 2.15, 0),
(79, '19200V', 'Balling Light Set', 363.97, 2.15, 0),
(80, '18412V', 'Coral Dust 50g', 73.49, 2.15, 0),
(81, '18413V', 'Coral Dust 130g', 165.46, 2.15, 0),
(82, '20500V', 'Coral Balance 180g', 66.01, 2.15, 0),
(83, '20505V', 'Coral Balance 360g', 118.99, 2.15, 0),
(84, '14199V', 'Coral Plankton 100ml', 52.82, 2.15, 0),
(85, '14203V', 'Coral Plankton 250ml', 82.57, 2.15, 0),
(86, '12260V', 'Coral Sprint 70g', 84.50, 2.15, 0),
(87, '12265V', 'Coral Sprint 175g', 158.15, 2.15, 0),
(88, '12270V', 'Coral Sprint 350g', 239.11, 2.15, 0),
(89, '14204V', 'Fish Plankton 250ml', 79.27, 2.15, 0),
(90, '18407V', 'LPS Grow + Color M 60g', 73.49, 2.15, 0),
(91, '18408V', 'LPS Grow + Color L 60g', 73.49, 2.15, 0),
(92, '18410V', 'LPS Grow + Color M 145g', 158.15, 2.15, 0),
(93, '18411V', 'LPS Grow + Color L 145g', 158.15, 2.15, 0),
(94, '14202V', 'Ocean Plankton 100% natural 100ml', 52.82, 2.15, 0),
(95, '14201V', 'Ocean Plankton 100% natural 250ml', 82.57, 2.15, 0),
(96, '14190V', 'Arctic Plankton 100% natural 250ml', 79.27, 2.15, 0),
(97, '10470V', 'Soft MultiMix 60g', 55.07, 2.15, 2),
(98, '10480V', 'Soft MultiMix 150g', 110.31, 2.15, 0),
(99, '10250V', 'Soft Protein Superfood M 60g', 36.66, 2.15, 0),
(100, '10255V', 'Soft Protein Superfood L 60g', 36.66, 2.15, 0),
(101, '10270V', 'Soft Protein Superfood M 150g', 73.49, 2.15, 0),
(102, '10275V', 'Soft Protein Superfood L 150g', 73.49, 2.15, 0),
(103, '11100V', 'Min S 100ml', 66.01, 2.15, 0),
(104, '11105V', 'Min S 250ml', 118.99, 2.15, 0),
(105, '11110V', 'Min S 500ml', 198.51, 2.15, 0),
(106, '11115V', 'Min S 1000ml', 258.08, 2.15, 0),
(107, '11225V', 'Organic 250ml', 72.68, 2.15, 0),
(108, '11230V', 'Organic 500ml', 122.29, 2.15, 0),
(109, '11235V', 'Organic 1000ml', 211.69, 2.15, 0),
(110, '11125V', 'Amin 250ml', 125.67, 2.15, 0),
(111, '11130V', 'Amin 500ml', 198.51, 2.15, 0),
(112, '11135V', 'Amin 1000ml', 264.68, 2.15, 0),
(113, '10335V', 'Food Energizer 100ml', 62.71, 2.15, 5),
(114, '30009V', 'Coral Mount 4cm', 60.62, 2.15, 0),
(115, '20397V', 'Reef ICP 3er-Set (set of 3)', 231.00, 2.15, 0),
(116, '20392V', 'Reef ICP 1er-Set (set of 1)', 88.80, 2.15, 0),
(117, '15025V', 'Elementals Trace Mn', 75.60, 2.15, 0),
(118, '18110V', 'Garlic Essence 100ml', 49.28, 2.15, 0),
(119, '17030V', 'Coral Kit 114g', 50.00, 2.15, 1),
(120, '10215V', 'Soft Spirulina M 63g', 231.18, 2.15, 0),
(121, '70205V', 'Multi Elements A 500ml', 90.20, 2.15, 0),
(122, '70209V', 'Multi Elements B 500ml', 90.20, 2.15, 0);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `model` int NOT NULL,
  `quantity` int NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notes` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `model`, `quantity`, `date`, `notes`) VALUES
(24, 3, 5, '2025-01-21 08:07:29', 'Initial stock'),
(25, 1, 2, '2025-01-21 08:08:14', 'Initial stock'),
(26, 2, 1, '2025-01-21 08:08:26', 'Initial stock'),
(27, 4, 2, '2025-01-21 08:08:39', 'Initial stock'),
(28, 5, 4, '2025-01-21 08:08:49', 'Initial stock'),
(29, 6, 4, '2025-01-21 08:09:03', 'Initial stock'),
(30, 22, 6, '2025-01-21 08:09:19', 'Initial stock'),
(31, 3, 20, '2025-03-13 04:43:59', ''),
(32, 4, 20, '2025-03-13 04:44:06', ''),
(33, 5, 10, '2025-03-13 04:44:17', ''),
(34, 2, 10, '2025-03-13 04:44:23', '');

-- --------------------------------------------------------

--
-- Table structure for table `sent`
--

CREATE TABLE `sent` (
  `id` int NOT NULL,
  `model` int NOT NULL,
  `quantity` int NOT NULL,
  `date` datetime NOT NULL,
  `notes` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sent`
--

INSERT INTO `sent` (`id`, `model`, `quantity`, `date`, `notes`) VALUES
(5, 2, 2, '2025-03-13 06:45:34', ''),
(6, 3, 4, '2025-03-13 06:45:46', ''),
(7, 4, 4, '2025-03-13 06:45:51', ''),
(8, 5, 2, '2025-03-13 06:45:58', '');

-- --------------------------------------------------------

--
-- Table structure for table `tanks`
--

CREATE TABLE `tanks` (
  `id` int NOT NULL,
  `model` varchar(255) NOT NULL,
  `orders` int NOT NULL,
  `sent` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tanks`
--

INSERT INTO `tanks` (`id`, `model`, `orders`, `sent`) VALUES
(1, 'JCT-35', 2, 0),
(2, 'JCT-17', 11, 2),
(3, 'EPT-S', 25, 4),
(4, 'EPT-M', 22, 4),
(5, 'EPT-L', 14, 2),
(6, 'JHT-35', 4, 0),
(20, 'AIO-S', 0, 0),
(21, 'AIO-M', 0, 0),
(22, 'AIO-L', 6, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `FM_products`
--
ALTER TABLE `FM_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `model` (`model`);

--
-- Indexes for table `sent`
--
ALTER TABLE `sent`
  ADD PRIMARY KEY (`id`),
  ADD KEY `model` (`model`);

--
-- Indexes for table `tanks`
--
ALTER TABLE `tanks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `FM_products`
--
ALTER TABLE `FM_products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `sent`
--
ALTER TABLE `sent`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tanks`
--
ALTER TABLE `tanks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`model`) REFERENCES `tanks` (`id`);

--
-- Constraints for table `sent`
--
ALTER TABLE `sent`
  ADD CONSTRAINT `sent_ibfk_1` FOREIGN KEY (`model`) REFERENCES `tanks` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
