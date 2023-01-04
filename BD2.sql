-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 04-01-2023 a las 22:13:25
-- Versión del servidor: 5.7.36
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_documentos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(30) NOT NULL,
  `tipo_usuario` int(1) NOT NULL DEFAULT '5',
  `fullname` varchar(100) NOT NULL,
  `correo` varchar(40) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `rut` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `password`, `tipo_usuario`, `fullname`, `correo`, `telefono`, `rut`) VALUES
(1, 'usuario1', '123', 4, 'usuario1', 'usuario1@alumnos.uta.cl', '+56973727016', '20.707.935-9'),
(3, 'director1', 'contradirector1', 2, 'director1 apellido1', 'director1@gmail.com', '+56934123212', '10.000.000-1'),
(20, 'abraham', '123', 3, 'abraham', 'abraham@gmail.com', '789456123', '12.125.125-12'),
(21, 'mijael', '1234', 1, 'Juan Mijael Salazar', 'juanmijaelsc@gmail.com', '456123789', '45.782.456-5');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
