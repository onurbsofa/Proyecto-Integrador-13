-- phpMyAdmin SQL Dump
-- version 5.1.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql-tostao.alwaysdata.net
-- Generation Time: Nov 23, 2022 at 08:51 AM
-- Server version: 10.6.7-MariaDB
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tostao_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cuerpo`
--

CREATE TABLE `cuerpo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cuerpo`
--

INSERT INTO `cuerpo` (`id`, `nombre`) VALUES
(1, 'simple'),
(2, 'medio'),
(3, 'complejo');

-- --------------------------------------------------------

--
-- Table structure for table `detalle_venta`
--

CREATE TABLE `detalle_venta` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `monto_total` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `intensidad`
--

CREATE TABLE `intensidad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `intensidad`
--

INSERT INTO `intensidad` (`id`, `nombre`) VALUES
(1, 'suave'),
(2, 'medio'),
(3, 'intenso');

-- --------------------------------------------------------

--
-- Table structure for table `pais`
--

CREATE TABLE `pais` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pais`
--

INSERT INTO `pais` (`id`, `nombre`) VALUES
(1, 'colombia'),
(2, 'mexico'),
(3, 'brasil');

-- --------------------------------------------------------

--
-- Table structure for table `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `imagen` varchar(45) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `pais_id` int(11) NOT NULL,
  `cuerpo_id` int(11) NOT NULL,
  `intensidad_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `precio`, `imagen`, `descripcion`, `pais_id`, `cuerpo_id`, `intensidad_id`) VALUES
(12, 'Cafe rico', '220', '1668995465646.png', 'cafe rico', 1, 1, 1),
(13, 'Cafe 2.1', '300', '1669001443311.png', 'cafe 2.0', 1, 1, 1),
(16, 'BRASIL suave', '200', '1669080910271.png', 'BRASIL suave', 3, 1, 1),
(17, 'MEXICO intenso', '250', '1669080946747.png', 'MEXICO intenso', 2, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `clave` varchar(100) NOT NULL,
  `imagen` varchar(45) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `email`, `clave`, `imagen`, `admin`) VALUES
(1, 'martin', 'martinleibo@gmail.com', 'clavePrueba', 'prueba.jpg', 1),
(2, 'pepepe', 'pepepe@gmail.com', 'asdasd', 'img.png', 1),
(3, 'asfdasdasdasdadasd', 'asdas@fasfa.com', 'asdasdasdlsadklas', '.', 1),
(4, 'asfdasdasdasdadasd', 'asdas@fasfa.com', 'asdasdasdlsadklas', 'dasdasd.jpg', 1),
(5, 'gdfhfhfghghfghfghfghDDDDDDDD', 'martinleibsdsdo@gmail.com', '$2a$10$LoXFzGB0PUqwpsYWdUdKA.C0Y1Fwf9MrAQAIjm', '1668556429170.JPG', 1),
(6, 'martin', 'martin@gmail.com', '$2a$10$fIBGULuh.VHvsj9Qv8M75e7HUE.TVvSncrjerI', '1668557399953.JPG', 1),
(7, 'martin2', 'martin2@gmail.com', '$2a$10$vOXQzdT3XBTozoAk3nBuCuog2w1fWFG6pCw/cp', '1668558306845.JPG', 1),
(8, 'martin3', 'martin3@gmail.com', '$2a$10$48uf10Xpk2Eb.j5e1M98auaXxoEmSEmtnyVEXrF6oLG8sdFk7J6Li', '1668558442718.JPG', 1),
(9, 'martin4', 'martin4@gmail.com', '$2a$10$7O0EZn3t.Gd8KiSdAkFVjOwmv.lkOVwBRH2F1IjA3X9nzmgQ8GiE.', '1668560440518.jpg', 1),
(10, 'martin5', 'martin5@gmail.com', '$2a$10$R8rsHviqtMV60SGzJ8jjkuT163wOjQRhYj5V49al/f2UpixcS9LQ.', '1668561270681.jpg', 1),
(11, 'Isabel Valencia', 'cristinavalencia918@gmail.com', '$2a$10$H02HpgKnje.gUVMQsMmZRudwOl2Oc2.1ubVDoQ6fexd8hX0Yj8Ojm', '1668648202219.png', 1),
(12, 'bruno', 'brunoF@gmail.com', '$2a$10$V0tz0iUFJG.LMH7SOb0SC.0EIi8HZmUOb3DTqmtDhm9ffjVA/be4y', '1668797963335.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `venta`
--

CREATE TABLE `venta` (
  `id` int(11) NOT NULL,
  `monto_unitario` decimal(10,0) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `detalle_venta_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cuerpo`
--
ALTER TABLE `cuerpo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `intensidad`
--
ALTER TABLE `intensidad`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pais`
--
ALTER TABLE `pais`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pais_id` (`pais_id`),
  ADD KEY `cuerpo_id` (`cuerpo_id`),
  ADD KEY `intensidad_id` (`intensidad_id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `detalle_venta_id` (`detalle_venta_id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cuerpo`
--
ALTER TABLE `cuerpo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `detalle_venta`
--
ALTER TABLE `detalle_venta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `intensidad`
--
ALTER TABLE `intensidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pais`
--
ALTER TABLE `pais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `venta`
--
ALTER TABLE `venta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`pais_id`) REFERENCES `pais` (`id`),
  ADD CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`cuerpo_id`) REFERENCES `cuerpo` (`id`),
  ADD CONSTRAINT `producto_ibfk_3` FOREIGN KEY (`intensidad_id`) REFERENCES `intensidad` (`id`);

--
-- Constraints for table `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`detalle_venta_id`) REFERENCES `detalle_venta` (`id`),
  ADD CONSTRAINT `venta_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `venta_ibfk_3` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
