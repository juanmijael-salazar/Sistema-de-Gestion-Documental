-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 04-01-2023 a las 22:30:04
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
-- Estructura de tabla para la tabla `carpetas`
--

DROP TABLE IF EXISTS `carpetas`;
CREATE TABLE IF NOT EXISTS `carpetas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_carpeta` int(11) DEFAULT '0',
  `titulo` varchar(50) DEFAULT NULL,
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `propietario_usuarioFK` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_carpeta` (`fk_carpeta`),
  KEY `propietario_usuarioFK` (`propietario_usuarioFK`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `carpetas`
--

INSERT INTO `carpetas` (`id`, `fk_carpeta`, `titulo`, `creado`, `propietario_usuarioFK`) VALUES
(60, NULL, 'RAIZ UNIDADES', '2022-12-17 01:25:21', 1),
(61, NULL, 'RAIZ OFICIALES', '2022-12-17 01:25:21', 1),
(62, NULL, 'RAIZ LOCAL', '2022-12-17 01:25:21', 1),
(70, 61, 'ACTAS', '2022-12-19 13:01:45', 1),
(83, 61, 'CERTIFICADOS', '2022-12-19 16:04:31', 1),
(84, 61, 'DECRETOS', '2022-12-19 16:04:40', 1),
(85, 61, 'OFICIOS', '2022-12-19 16:04:46', 1),
(86, 61, 'RESOLUCIONES', '2022-12-19 16:04:54', 1),
(87, 61, 'REGLAMENTOS', '2022-12-19 16:05:01', 1),
(90, 62, 'CARPETA DIRECTOR', '2022-12-19 16:07:11', 3),
(93, 61, 'REPORTES', '2023-01-04 20:57:30', 21),
(95, 61, 'Carpeta 1', '2023-01-04 21:01:30', 21),
(96, 60, 'Unidad 1', '2023-01-04 21:06:47', 21),
(98, 60, 'Unidad 2', '2023-01-04 21:08:49', 21);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos`
--

DROP TABLE IF EXISTS `documentos`;
CREATE TABLE IF NOT EXISTS `documentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) DEFAULT 'titulo-def',
  `path_documento` varchar(50) NOT NULL,
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `validado` tinyint(1) NOT NULL DEFAULT '0',
  `oficial` tinyint(1) NOT NULL DEFAULT '0',
  `propietario_usuarioFK` int(11) NOT NULL DEFAULT '1',
  `fk_carpeta` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `propietario_usuarioFK` (`propietario_usuarioFK`),
  KEY `carpeta_FK` (`fk_carpeta`)
) ENGINE=InnoDB AUTO_INCREMENT=178 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `documentos`
--

INSERT INTO `documentos` (`id`, `titulo`, `path_documento`, `creado`, `validado`, `oficial`, `propietario_usuarioFK`, `fk_carpeta`) VALUES
(172, 'Charla Bantotal.pdf', 'server\\subido\\db2fe51a94e289d9b9c0d5fb13780a06', '2022-12-30 00:04:29', 0, 0, 1, 83),
(173, 'Acta de seguimiento.pdf', 'server\\subido\\1ae1a326fdd7669ce0ca650f97cae7f8', '2023-01-04 20:56:17', 0, 0, 21, 70);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

DROP TABLE IF EXISTS `notificaciones`;
CREATE TABLE IF NOT EXISTS `notificaciones` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `emisor_usuarioFK` int(10) NOT NULL,
  `receptor_usuarioFK` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usuario_emisor` (`emisor_usuarioFK`),
  KEY `receptor_usuarioFK` (`receptor_usuarioFK`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_carpeta`
--

DROP TABLE IF EXISTS `usuario_carpeta`;
CREATE TABLE IF NOT EXISTS `usuario_carpeta` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `fk_carpeta` int(10) NOT NULL,
  `fk_usuario` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario_carpeta`
--

INSERT INTO `usuario_carpeta` (`id`, `fk_carpeta`, `fk_usuario`) VALUES
(5, 96, 1),
(6, 96, 3),
(7, 96, 21),
(11, 98, 1),
(12, 98, 3),
(13, 98, 20);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carpetas`
--
ALTER TABLE `carpetas`
  ADD CONSTRAINT `carpetas_ibfk_1` FOREIGN KEY (`fk_carpeta`) REFERENCES `carpetas` (`id`),
  ADD CONSTRAINT `carpetas_ibfk_2` FOREIGN KEY (`propietario_usuarioFK`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD CONSTRAINT `documentos_ibfk_1` FOREIGN KEY (`propietario_usuarioFK`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `documentos_ibfk_2` FOREIGN KEY (`fk_carpeta`) REFERENCES `carpetas` (`id`);

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`emisor_usuarioFK`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `notificaciones_ibfk_2` FOREIGN KEY (`receptor_usuarioFK`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
