-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Vært: 127.0.0.1
-- Genereringstid: 19. 06 2019 kl. 08:41:59
-- Serverversion: 5.6.24
-- PHP-version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `praktiskweb`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `ads`
--

CREATE TABLE IF NOT EXISTS `ads` (
  `id` int(11) NOT NULL,
  `ads_img` varchar(78) COLLATE utf8_bin NOT NULL,
  `ads_title` varchar(45) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Data dump for tabellen `ads`
--

INSERT INTO `ads` (`id`, `ads_img`, `ads_title`) VALUES
(1, '1557839079930567639.png', 'Weeb'),
(3, '1557839090378a4ab6a3d564e41fc1184b3c75b08365c.png', 'Tis'),
(4, '1557839107220aoi-ogata-doalow2.jpg', 'Love'),
(5, '1557839123040thumb-1920-626752.jpg', 'Megusta'),
(6, '1557839133226697775.png', 'Hahaha'),
(7, '1557839146667DVGjDImU0AATZP_.jpg', 'Lol'),
(8, '1557917689620nm.jpg', 'Oliver'),
(9, '1557924699290zhMiJmPuX2o2bbXWWZNUgVbw3OM.jpg', 'Kage'),
(10, '1557924714914a4ab6a3d564e41fc1184b3c75b08365c.png', 'Sweet love');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `booking`
--

CREATE TABLE IF NOT EXISTS `booking` (
  `id` int(11) NOT NULL,
  `user_name` varchar(45) COLLATE utf8_bin NOT NULL,
  `user_phone` int(11) NOT NULL,
  `room_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Data dump for tabellen `booking`
--

INSERT INTO `booking` (`id`, `user_name`, `user_phone`, `room_id`) VALUES
(14, 'sadasdaasdfa', 192879172, 5),
(15, 'sadasda', 12801243, 7),
(16, 'olnadsihasd', 122143, 1),
(17, 'Mah gurl', 12345678, 8),
(18, 'sadasdaasdfa', 234567890, 6);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `gallery`
--

CREATE TABLE IF NOT EXISTS `gallery` (
  `id` int(11) NOT NULL,
  `img_name` varchar(45) COLLATE utf8_bin NOT NULL,
  `img` varchar(128) COLLATE utf8_bin NOT NULL,
  `img_desc` varchar(45) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `page`
--

CREATE TABLE IF NOT EXISTS `page` (
  `id` int(11) NOT NULL,
  `title` varchar(48) COLLATE utf8_bin NOT NULL,
  `text` text COLLATE utf8_bin NOT NULL,
  `img` varchar(126) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Data dump for tabellen `page`
--

INSERT INTO `page` (`id`, `title`, `text`, `img`) VALUES
(1, 'WeebNation', 'Konichiwa MothaFuka', '1557838804814maxresdefault.jpg');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(45) COLLATE utf8_bin NOT NULL,
  `product_desc` varchar(45) COLLATE utf8_bin NOT NULL,
  `product_img` varchar(108) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Data dump for tabellen `products`
--

INSERT INTO `products` (`id`, `product_name`, `product_desc`, `product_img`) VALUES
(3, 'Kartoff', 'De grønne', '1552296364512Logo.png'),
(7, 'Agurk', 'Yes', '1551361868434ehhhmm.jpg'),
(8, 'sadopom', 'dawwads', '1551361868434ehhhmm.jpg');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(45) COLLATE utf8_bin NOT NULL,
  `level` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Data dump for tabellen `roles`
--

INSERT INTO `roles` (`id`, `name`, `level`) VALUES
(1, 'admin', 1),
(2, 'peasant', 6);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `rooms`
--

CREATE TABLE IF NOT EXISTS `rooms` (
  `id` int(11) NOT NULL,
  `room_name` varchar(45) COLLATE utf8_bin NOT NULL,
  `room_img` varchar(77) COLLATE utf8_bin NOT NULL,
  `reserved` int(11) NOT NULL,
  `room_price` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Data dump for tabellen `rooms`
--

INSERT INTO `rooms` (`id`, `room_name`, `room_img`, `reserved`, `room_price`) VALUES
(4, 'Do not enter', '1557917642763DVGjDImU0AATZP_.jpg', 0, 150);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) COLLATE utf8_bin NOT NULL,
  `password` varchar(76) COLLATE utf8_bin NOT NULL,
  `roles_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Data dump for tabellen `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `roles_id`) VALUES
(1, 'admin', '$2a$10$B3HYxgax.IJHklRIrjvG.u2HgaKn9TWbi9F5yTBoyhMofkm1M3KcC', 1),
(2, 'daniel', '$2a$10$UHVUUEhXXdNxuAkHFIE62uPvaPGLswsEAzqzP6y94q.zDRpepDQ6m', 6),
(3, 'fisse123', '$2a$10$RLh3D/blfSpjQWvdqCEgWeym20wcZrRNkQx2qHo5QpoY../EZYTZ6', 6),
(4, 'bob', '$2a$10$4ErSbKIWF7z008hphDreDeCx824QPOqhTebaFrgxbaLg9zYqlaGo.', 6),
(5, 'lisa', '$2a$10$9K42QgFEvATlYGrIrRaJ7.eEk6UScGiuZ65zTyKSBcI32/eBBzAlK', 6),
(6, 'jannick', '$2a$10$EEHrSJM1koCcNibjtsTS9uKmsoTCFyrzIjz63mp3.Loih0xg2g/Ji', 1);

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `ads`
--
ALTER TABLE `ads`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `ads`
--
ALTER TABLE `ads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- Tilføj AUTO_INCREMENT i tabel `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- Tilføj AUTO_INCREMENT i tabel `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Tilføj AUTO_INCREMENT i tabel `page`
--
ALTER TABLE `page`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Tilføj AUTO_INCREMENT i tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- Tilføj AUTO_INCREMENT i tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- Tilføj AUTO_INCREMENT i tabel `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- Tilføj AUTO_INCREMENT i tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
