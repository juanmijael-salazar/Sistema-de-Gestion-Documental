-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3308
-- Tiempo de generación: 19-12-2022 a las 18:04:58
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.0.19

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

CREATE TABLE `carpetas` (
  `id` int(11) NOT NULL,
  `fk_carpeta` int(11) DEFAULT 0,
  `titulo` varchar(50) DEFAULT NULL,
  `creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `propietario_usuarioFK` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `carpetas`
--

INSERT INTO `carpetas` (`id`, `fk_carpeta`, `titulo`, `creado`, `propietario_usuarioFK`) VALUES
(60, NULL, 'RAIZ UNIDADES', '2022-12-17 01:25:21', 1),
(61, NULL, 'RAIZ OFICIALES', '2022-12-17 01:25:21', 1),
(62, NULL, 'RAIZ LOCAL', '2022-12-17 01:25:21', 1),
(70, 61, 'ACTAS', '2022-12-19 13:01:45', 1),
(82, 61, 'CARTAS', '2022-12-19 16:04:11', 1),
(83, 61, 'CERTIFICADOS', '2022-12-19 16:04:31', 1),
(84, 61, 'DECRETOS', '2022-12-19 16:04:40', 1),
(85, 61, 'OFICIOS', '2022-12-19 16:04:46', 1),
(86, 61, 'RESOLUCIONES', '2022-12-19 16:04:54', 1),
(87, 61, 'REGLAMENTOS', '2022-12-19 16:05:01', 1),
(90, 62, 'CARPETA DIRECTOR', '2022-12-19 16:07:11', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos`
--

CREATE TABLE `documentos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(200) DEFAULT 'titulo-def',
  `path_documento` varchar(50) NOT NULL,
  `creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `validado` tinyint(1) NOT NULL DEFAULT 0,
  `oficial` tinyint(1) NOT NULL DEFAULT 0,
  `propietario_usuarioFK` int(11) NOT NULL DEFAULT 1,
  `fk_carpeta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id` int(10) NOT NULL,
  `titulo` varchar(50) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `emisor_usuarioFK` int(10) NOT NULL,
  `receptor_usuarioFK` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(30) NOT NULL,
  `tipo_usuario` int(1) NOT NULL DEFAULT 5,
  `fullname` varchar(100) NOT NULL,
  `correo` varchar(40) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `rut` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `password`, `tipo_usuario`, `fullname`, `correo`, `telefono`, `rut`) VALUES
(1, 'javier', 'contra1', 1, 'Javier Nicolas Mamani Lovera', 'javier.mamani.lovera@alumnos.uta.cl', '+56973727016', '20.707.935-9'),
(3, 'director1', 'contradirector1', 2, 'director1 apellido1', 'director1@gmail.com', '+56934123212', '10.000.000-1'),
(4, 'secretaria1', 'contrasecretaria1', 3, 'secretaria1 apellido1', 'secretaria1@gmail.com', '+56911223344', '18.206.445-4'),
(5, 'test1', 'contra1', 1, 'test 11', 'test1@gmail.com', '+569 72312142', '121231231231-2'),
(18, 'Diego', 'diegocontra', 3, 'Diego Aracena', 'd.aracena@academicos.uta.cl', '1111111111', '11111111-1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_carpeta`
--

CREATE TABLE `usuario_carpeta` (
  `id` int(10) NOT NULL,
  `fk_carpeta` int(10) NOT NULL,
  `fk_usuario` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carpetas`
--
ALTER TABLE `carpetas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_carpeta` (`fk_carpeta`),
  ADD KEY `propietario_usuarioFK` (`propietario_usuarioFK`);

--
-- Indices de la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `propietario_usuarioFK` (`propietario_usuarioFK`),
  ADD KEY `carpeta_FK` (`fk_carpeta`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario_emisor` (`emisor_usuarioFK`),
  ADD KEY `receptor_usuarioFK` (`receptor_usuarioFK`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario_carpeta`
--
ALTER TABLE `usuario_carpeta`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carpetas`
--
ALTER TABLE `carpetas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT de la tabla `documentos`
--
ALTER TABLE `documentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `usuario_carpeta`
--
ALTER TABLE `usuario_carpeta`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=248;

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
