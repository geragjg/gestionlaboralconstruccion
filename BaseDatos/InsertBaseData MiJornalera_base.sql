USE mijornalera_base;

INSERT INTO Rol (RolID, Nombre, Descripcion) VALUES
(1, 'Recursos Humanos', 'Recursos Humanos'),
(2, 'Apuntador', 'Apuntador'),
(3, 'Jefe de Obras', 'Jefe de Obras'),
(4, 'Supervisor', 'Supervisor'),
(5, 'Usuario', 'Usuario');


insert into Usuario (NombreUsuario, Nombre, Apellido, Cedula, Contrasenha, Correo, RolID, EsAdmin)
values ('master', 'jose', 'garcia', '1234567-1', 'asdasdasd', 'josegarcia@mail.com',1, TRUE )

 