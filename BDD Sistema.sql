CREATE TABLE IF NOT EXISTS paciente
(
    id_paciente      SERIAL PRIMARY KEY,
    direccion        VARCHAR(100) NOT NULL,
    rut              VARCHAR(12)  NOT NULL,
    nombre           VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(50)  NOT NULL,
    apellido_materno VARCHAR(50)  NOT NULL,
    fecha_nacimiento DATE         NOT NULL,
    genero           CHAR(1)      NOT NULL,
    telefono         VARCHAR(15)  NOT NULL
);

CREATE TABLE IF NOT EXISTS programa_control
(
    id_programa_control SERIAL PRIMARY KEY,
    nombre              VARCHAR(100) NOT NULL,
    descripcion         VARCHAR(255),
    activo              CHAR(1)      NOT NULL,
    codigo              VARCHAR(10)  NOT NULL,
    UNIQUE (codigo)
);

CREATE TABLE IF NOT EXISTS familia
(
    id_familia     SERIAL PRIMARY KEY,
    nombre         VARCHAR(100) NOT NULL,
    fecha_creacion DATE         NOT NULL
);

CREATE TABLE IF NOT EXISTS tipo_relacion
(
    id_tipo_relacion SERIAL PRIMARY KEY,
    descripcion      VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS plan_intervencion
(
    id_plan_intervencion SERIAL PRIMARY KEY,
    nombre               VARCHAR(100) NOT NULL,
    descripcion          VARCHAR(255),
    fecha_inicio         DATE,
    fecha_fin            DATE,
    id_familia           INT          NOT NULL,
    FOREIGN KEY (id_familia) REFERENCES familia (id_familia) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS factor_riesgo
(
    id_factor_riesgo SERIAL PRIMARY KEY,
    descripcion      VARCHAR(255) NOT NULL,
    id_familia       INT          NOT NULL,
    FOREIGN KEY (id_familia) REFERENCES familia (id_familia) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS factor_protector
(
    id_factor_protector SERIAL PRIMARY KEY,
    descripcion         VARCHAR(255) NOT NULL,
    id_familia          INT          NOT NULL,
    FOREIGN KEY (id_familia) REFERENCES familia (id_familia) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS programa_salud_oral
(
    id_programa_salud_oral SERIAL PRIMARY KEY,
    codigo                 VARCHAR(10)  NOT NULL,
    nombre                 VARCHAR(100) NOT NULL,
    descripcion            VARCHAR(255),
    activo                 CHAR(1)      NOT NULL,
    UNIQUE (codigo)
);

CREATE TABLE IF NOT EXISTS vacuna
(
    id_vacuna   SERIAL PRIMARY KEY,
    codigo      VARCHAR(10)  NOT NULL,
    nombre      VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS calendario_vacuna
(
    id_calendario_vacuna SERIAL PRIMARY KEY,
    edad_recomendada     INT NOT NULL,
    dosis                INT NOT NULL,
    etapa                VARCHAR(50),
    id_vacuna            INT NOT NULL,
    FOREIGN KEY (id_vacuna) REFERENCES vacuna (id_vacuna) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS programa_nutricional
(
    id_programa_nutricional SERIAL PRIMARY KEY,
    codigo                  VARCHAR(10)  NOT NULL,
    nombre                  VARCHAR(100) NOT NULL,
    descripcion             VARCHAR(255) NOT NULL,
    activo                  CHAR(1)      NOT NULL,
    UNIQUE (codigo)
);

CREATE TABLE IF NOT EXISTS informe_pacam
(
    id_informe_pacam        SERIAL PRIMARY KEY,
    fecha_informe           DATE           NOT NULL,
    total_beneficiario      INT            NOT NULL,
    total_desembolso        NUMERIC(10, 2) NOT NULL,
    id_programa_nutricional INT            NOT NULL,
    FOREIGN KEY (id_programa_nutricional) REFERENCES programa_nutricional (id_programa_nutricional) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS centro_salud
(
    id_centro_salud SERIAL PRIMARY KEY,
    nombre          VARCHAR(100) NOT NULL,
    direccion       VARCHAR(255) NOT NULL,
    telefono        VARCHAR(15)  NOT NULL
);

CREATE TABLE IF NOT EXISTS usuario
(
    id_usuario      SERIAL PRIMARY KEY,
    username        VARCHAR(50)  NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    nombre          VARCHAR(100) NOT NULL,
    email           VARCHAR(100) NOT NULL,
    estado          CHAR(1)      NOT NULL,
    id_centro_salud INT          NOT NULL,
    FOREIGN KEY (id_centro_salud) REFERENCES centro_salud (id_centro_salud) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS rol
(
    id_rol      SERIAL PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS usuario_rol
(
    id_usuario INT NOT NULL,
    id_rol     INT NOT NULL,
    PRIMARY KEY (id_usuario, id_rol),
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_rol) REFERENCES rol (id_rol) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS cita
(
    id_cita         SERIAL PRIMARY KEY,
    fecha_hora      DATE        NOT NULL,
    tipo_cita       VARCHAR(20) NOT NULL,
    estado          VARCHAR(20) NOT NULL,
    observacion     TEXT        NOT NULL,
    id_paciente     INT         NOT NULL,
    id_usuario      INT         NOT NULL,
    id_centro_salud INT         NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES paciente (id_paciente) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_centro_salud) REFERENCES centro_salud (id_centro_salud) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ficha_control
(
    id_ficha_control       SERIAL PRIMARY KEY,
    fecha_control          DATE NOT NULL,
    observacion            TEXT,
    id_paciente            INT  NOT NULL,
    id_programa_control    INT  NOT NULL,
    id_centro_salud        INT  NOT NULL,
    id_usuario_responsable INT  NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES paciente (id_paciente) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_programa_control) REFERENCES programa_control (id_programa_control) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_centro_salud) REFERENCES centro_salud (id_centro_salud) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_usuario_responsable) REFERENCES usuario (id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS historial_resultado
(
    id_historial_resultado SERIAL PRIMARY KEY,
    fecha_registro         DATE NOT NULL,
    presion_sistolica      INT,
    presion_diastolica     INT,
    frecuencia_cardiaca    INT,
    glicemia               NUMERIC(5, 2),
    peso                   NUMERIC(5, 2),
    talla                  NUMERIC(4, 2),
    imc                    NUMERIC(4, 2),
    observacion            TEXT,
    id_ficha_control       INT  NOT NULL,
    FOREIGN KEY (id_ficha_control) REFERENCES ficha_control (id_ficha_control) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS estratificacion_riesgo
(
    id_estratificacion_riesgo SERIAL PRIMARY KEY,
    nivel_riesgo              VARCHAR(20)  NOT NULL,
    motivo                    VARCHAR(255) NOT NULL,
    fecha_asignacion          DATE         NOT NULL,
    id_paciente               INT          NOT NULL,
    usuario_responsable       INT          NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES paciente (id_paciente) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (usuario_responsable) REFERENCES usuario (id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS miembro_familiar
(
    id_miembro_familiar SERIAL PRIMARY KEY,
    nombre              VARCHAR(100) NOT NULL,
    fecha_nacimiento    DATE,
    genero              CHAR(1),
    id_familia          INT          NOT NULL,
    id_tipo_relacion    INT          NOT NULL,
    id_paciente         INT,
    FOREIGN KEY (id_familia) REFERENCES familia (id_familia) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_tipo_relacion) REFERENCES tipo_relacion (id_tipo_relacion) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_paciente) REFERENCES paciente (id_paciente) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ficha_odontologica
(
    id_ficha_odontologica  SERIAL PRIMARY KEY,
    fecha_control          DATE NOT NULL,
    observacion            TEXT,
    id_paciente            INT  NOT NULL,
    id_programa_salud_oral INT  NOT NULL,
    id_centro_salud        INT  NOT NULL,
    id_usuario_responsable INT  NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES paciente (id_paciente) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_programa_salud_oral) REFERENCES programa_salud_oral (id_programa_salud_oral) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_centro_salud) REFERENCES centro_salud (id_centro_salud) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_usuario_responsable) REFERENCES usuario (id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS odontograma
(
    id_odontograma        SERIAL PRIMARY KEY,
    pieza_dental          VARCHAR(5)  NOT NULL,
    estado                VARCHAR(50) NOT NULL,
    observacion           TEXT,
    id_ficha_odontologica INT         NOT NULL,
    FOREIGN KEY (id_ficha_odontologica) REFERENCES ficha_odontologica (id_ficha_odontologica) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS radiografia
(
    id_radiografia        SERIAL PRIMARY KEY,
    path                  VARCHAR(255) NOT NULL,
    fecha_toma            DATE,
    id_ficha_odontologica INT          NOT NULL,
    FOREIGN KEY (id_ficha_odontologica) REFERENCES ficha_odontologica (id_ficha_odontologica) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS registro_vacunacion
(
    id_registro_vacunacion SERIAL PRIMARY KEY,
    fecha_aplicacion       DATE NOT NULL,
    lote                   VARCHAR(50),
    id_paciente            INT  NOT NULL,
    id_vacuna              INT  NOT NULL,
    id_calendario_vacuna   INT,
    id_centro_salud        INT  NOT NULL,
    id_usuario_responsable INT  NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES paciente (id_paciente) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_vacuna) REFERENCES vacuna (id_vacuna) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_calendario_vacuna) REFERENCES calendario_vacuna (id_calendario_vacuna) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_centro_salud) REFERENCES centro_salud (id_centro_salud) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_usuario_responsable) REFERENCES usuario (id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS alerta_inasistencia
(
    id_alerta_inasistencia SERIAL PRIMARY KEY,
    fecha_alerta           DATE         NOT NULL,
    motivo                 VARCHAR(255) NOT NULL,
    id_registro_vacunacion INT          NOT NULL,
    FOREIGN KEY (id_registro_vacunacion) REFERENCES registro_vacunacion (id_registro_vacunacion) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS inscripcion_pacam
(
    id_inscripcion_pacam    SERIAL PRIMARY KEY,
    fecha_inscripcion       DATE    NOT NULL,
    estado                  CHAR(1) NOT NULL,
    id_paciente             INT,
    id_programa_nutricional INT     NOT NULL,
    id_centro_salud         INT     NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES paciente (id_paciente) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_programa_nutricional) REFERENCES programa_nutricional (id_programa_nutricional) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_centro_salud) REFERENCES centro_salud (id_centro_salud) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS control_desembolso
(
    id_control_desembolso SERIAL PRIMARY KEY,
    fecha_entrega         DATE          NOT NULL,
    cantidad_entregada    NUMERIC(8, 2) NOT NULL,
    id_inscripcion_pacam  INT           NOT NULL,
    FOREIGN KEY (id_inscripcion_pacam) REFERENCES inscripcion_pacam (id_inscripcion_pacam) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS medicamento
(
    id_medicamento SERIAL PRIMARY KEY,
    nombre         VARCHAR(100) NOT NULL,
    presentacion   VARCHAR(50),
    descripcion    TEXT
);

CREATE TABLE IF NOT EXISTS receta
(
    id_receta     SERIAL PRIMARY KEY,
    id_paciente   INT  NOT NULL,
    id_medico     INT  NOT NULL,
    fecha_emision DATE NOT NULL,
    validez_dias  INT  NOT NULL DEFAULT 30,
    indicacion    TEXT,
    FOREIGN KEY (id_paciente) REFERENCES paciente (id_paciente) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_medico) REFERENCES usuario (id_usuario) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS receta_medicamento
(
    id_receta_medicamento SERIAL PRIMARY KEY,
    id_receta             INT         NOT NULL,
    id_medicamento        INT         NOT NULL,
    dosis                 VARCHAR(50) NOT NULL,
    frecuencia            VARCHAR(50) NOT NULL,
    duracion_dias         INT         NOT NULL,
    FOREIGN KEY (id_receta) REFERENCES receta (id_receta) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_medicamento) REFERENCES medicamento (id_medicamento) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS despacho_medicamento
(
    id_despacho         SERIAL PRIMARY KEY,
    id_receta_med       INT         NOT NULL,
    fecha_despacho      TIMESTAMP   NOT NULL DEFAULT now(),
    cantidad_despachada VARCHAR(50) NOT NULL,
    id_farmacia         INT,
    FOREIGN KEY (id_receta_med) REFERENCES receta_medicamento (id_receta_medicamento) ON DELETE RESTRICT ON UPDATE CASCADE
);
