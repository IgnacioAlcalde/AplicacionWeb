
INSERT INTO usuarios_usuario 
(id, nombre, apellido, fecha_nacimiento, run, correo, contraseña, rol, first_session, created, updated)
VALUES
(1, 'Administrador', 'Test', '2001-01-01', '1234567-0', 'administrador@correo.cl', 'admin123', 'Administrador', 'Si', '2024-11-18 19:41:58.201381-03', '2024-11-18 19:41:58.201381-03'),
(2, 'Municipalidad', 'Test', '2001-01-01', '1234567-1', 'municipalidad@correo.cl', 'municipalidad123', 'Director municipalidad', 'Si', '2024-11-18 19:43:27.460682-03', '2024-11-18 19:43:27.460682-03'),
(3, 'Obras', 'Test', '2001-01-01', '1234567-2', 'obras@correo.cl', 'obras123', 'Director de obras', 'Si', '2024-11-18 19:44:01.469879-03', '2024-11-18 19:44:01.469879-03'),
(5, 'Cuadrilla', 'Test', '2001-01-01', '1234567-4', 'cuadrilla@correo.cl', 'cuadrilla123', 'Cuadrilla', 'Si', '2024-11-18 19:44:46.625863-03', '2024-11-18 19:44:46.625863-03'),
(4, 'Gestor', 'Test', '2001-01-01', '1234567-3', 'gestor@correo.cl', 'gestor123', 'Gestor territorial', 'Si', '2024-11-18 19:44:23.438486-03', '2024-11-18 20:44:46.988916-03');


INSERT INTO usuarios_rol
(id, nombre)
VALUES
(1, 'Administrador'),
(2, 'Director municipalidad'),
(3, 'Director de obras'),
(4, 'Gestor territorial'),
(5, 'Cuadrilla');


	
