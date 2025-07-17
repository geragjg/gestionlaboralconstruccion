USE mijornalera_base;

CREATE TABLE Rol (
    RolID INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(255) UNIQUE NOT NULL,
    Descripcion VARCHAR(255) UNIQUE NOT NULL,
    CONSTRAINT PK_Rol PRIMARY KEY (RolID)
);

CREATE TABLE Usuario (
    UsuarioID INT NOT NULL AUTO_INCREMENT,
    NombreUsuario VARCHAR(100) NOT NULL,
    Nombre VARCHAR(255) NOT NULL,
    Apellido VARCHAR(255) NOT NULL,
    Cedula VARCHAR(20) UNIQUE NOT NULL,
    Contrasenha VARCHAR(255) NOT NULL,
    Correo VARCHAR(255) UNIQUE NOT NULL,
    RolID INT NOT NULL,
    EsAdmin BOOLEAN NOT NULL,
    CONSTRAINT PK_Usuario PRIMARY KEY (UsuarioID),
    CONSTRAINT FK_Usuario_Rol FOREIGN KEY (RolID) REFERENCES Rol(RolID) ON DELETE CASCADE
);

CREATE TABLE Hora (
    HoraID INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(255) NOT NULL,
    Descripccion VARCHAR(255),
    MaximoDiario INT,
    Categoria VARCHAR(255),
    MaximoSemanal INT,
    Orden INT,
    Predefinido BOOLEAN,
    Archivado BOOLEAN,
    CONSTRAINT PK_Hora PRIMARY KEY (HoraID)
);

CREATE TABLE Ausencia (
    AusenciaID INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(255) NOT NULL,
    Descripcion VARCHAR(255),
    MaximoAnual INT,
    Archivado BOOLEAN,
    CONSTRAINT PK_Ausencia PRIMARY KEY (AusenciaID)
);

CREATE TABLE Obra (
    ObraID INT NOT NULL AUTO_INCREMENT,
    FechaInicio DATE NOT NULL,
    Nombre VARCHAR(255) NOT NULL,
    Descripcion VARCHAR(255),
    Estado VARCHAR(50),
    FechaFin DATE,
    Cliente VARCHAR(255),
    CONSTRAINT PK_Obra PRIMARY KEY (ObraID)
);

CREATE TABLE Operario (
    OperarioID INT NOT NULL AUTO_INCREMENT,
    NumFuncionario VARCHAR(50) NOT NULL,
    FechaIngreso DATE NOT NULL,
    Nombre VARCHAR(255) NOT NULL,
    Apellido VARCHAR(255) NOT NULL,
    TipoContratacion VARCHAR(100),
    TareaDeObra VARCHAR(255),
    NCedula VARCHAR(20) NOT NULL,
    Departamento VARCHAR(100),
    Archivado BOOLEAN,
    CONSTRAINT PK_Operario PRIMARY KEY (OperarioID)
);

CREATE TABLE DiaQuincena (
    DiaQuincenaID INT NOT NULL AUTO_INCREMENT,
    Dia INT NOT NULL,
    NumeroQuincena INT NOT NULL,
    Fecha DATE NOT NULL,
    Anho INT NOT NULL,
    OperarioID INT NOT NULL,
    ObraID INT NOT NULL,
    CONSTRAINT PK_DiaQuincena PRIMARY KEY (DiaQuincenaID),
    CONSTRAINT FK_DiaQuincena_Operario FOREIGN KEY (OperarioID) REFERENCES Operario(OperarioID) ON DELETE CASCADE,
    CONSTRAINT FK_DiaQuincena_Obra FOREIGN KEY (ObraID) REFERENCES Obra(ObraID) ON DELETE CASCADE
);

CREATE TABLE DiaQuincenaAusencia (
    DiaQuincenaAusenciaID INT NOT NULL AUTO_INCREMENT,
    DiaQuincenaID INT NOT NULL,
    AusenciaID INT NOT NULL,
    UsuarioID INT NOT NULL,
    FechaCambio DATETIME NOT NULL,
    CONSTRAINT PK_DiaQuincenaAusencia PRIMARY KEY (DiaQuincenaAusenciaID),
    CONSTRAINT FK_DQAusencia_DiaQuincena FOREIGN KEY (DiaQuincenaID) REFERENCES DiaQuincena(DiaQuincenaID) ON DELETE CASCADE,
    CONSTRAINT FK_DQAusencia_Ausencia FOREIGN KEY (AusenciaID) REFERENCES Ausencia(AusenciaID),
    CONSTRAINT FK_DQAusencia_Usuario FOREIGN KEY (UsuarioID) REFERENCES Usuario(UsuarioID)
);

CREATE TABLE DiaQuincenaCertificado (
    DiaQuincenaCertificadoID INT NOT NULL AUTO_INCREMENT,
    DiaQuincenaID INT NOT NULL,
    Adjunto VARCHAR(255),
    CONSTRAINT PK_DiaQuincenaCertificado PRIMARY KEY (DiaQuincenaCertificadoID),
    CONSTRAINT FK_DQCertificado_DiaQuincena FOREIGN KEY (DiaQuincenaID) REFERENCES DiaQuincena(DiaQuincenaID) ON DELETE CASCADE
);

CREATE TABLE DiaQuincenaHistoria (
    DiaQuincenaHistoriaID INT NOT NULL AUTO_INCREMENT,
    DiaQuincenaID INT NOT NULL,
    AusenciaID INT,
    HoraID INT,
    ValorHora DECIMAL(10, 2),
    UsuarioID INT NOT NULL,
    FechaCambio DATETIME NOT NULL,
    CONSTRAINT PK_DiaQuincenaHistoria PRIMARY KEY (DiaQuincenaHistoriaID),
    CONSTRAINT FK_DQHistoria_DiaQuincena FOREIGN KEY (DiaQuincenaID) REFERENCES DiaQuincena(DiaQuincenaID) ON DELETE CASCADE,
    CONSTRAINT FK_DQHistoria_Ausencia FOREIGN KEY (AusenciaID) REFERENCES Ausencia(AusenciaID),
    CONSTRAINT FK_DQHistoria_Hora FOREIGN KEY (HoraID) REFERENCES Hora(HoraID),
    CONSTRAINT FK_DQHistoria_Usuario FOREIGN KEY (UsuarioID) REFERENCES Usuario(UsuarioID)
);

CREATE TABLE DiaQuincenaHora (
    DiaQuincenaHoraID INT NOT NULL AUTO_INCREMENT,
    DiaQuincenaID INT NOT NULL,
    HoraID INT NOT NULL,
    ValorHora DECIMAL(10, 2),
    UsuarioID INT NOT NULL,
    FechaCambio DATETIME NOT NULL,
    CONSTRAINT PK_DiaQuincenaHora PRIMARY KEY (DiaQuincenaHoraID),
    CONSTRAINT FK_DQHora_DiaQuincena FOREIGN KEY (DiaQuincenaID) REFERENCES DiaQuincena(DiaQuincenaID) ON DELETE CASCADE,
    CONSTRAINT FK_DQHora_Hora FOREIGN KEY (HoraID) REFERENCES Hora(HoraID),
    CONSTRAINT FK_DQHora_Usuario FOREIGN KEY (UsuarioID) REFERENCES Usuario(UsuarioID)
);

CREATE TABLE Accion (
    AccionID INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(255) NOT NULL,
    Descripcion VARCHAR(255),
    CONSTRAINT PK_Accion PRIMARY KEY (AccionID)
);

CREATE TABLE DiaQuincenaAccion (
    DiaQuincenaAccionID INT NOT NULL AUTO_INCREMENT,
    DiaQuincenaID INT NOT NULL,
    AccionID INT NOT NULL,
    CONSTRAINT PK_DiaQuincenaAccion PRIMARY KEY (DiaQuincenaAccionID),
    CONSTRAINT FK_DQAccion_DiaQuincena FOREIGN KEY (DiaQuincenaID) REFERENCES DiaQuincena(DiaQuincenaID) ON DELETE CASCADE,
    CONSTRAINT FK_DQAccion_Accion FOREIGN KEY (AccionID) REFERENCES Accion(AccionID)
);
