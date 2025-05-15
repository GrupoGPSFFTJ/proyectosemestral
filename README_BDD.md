# Documentación del Modelo de Base de Datos

### Tabla: paciente

Almacena información personal y de contacto de cada paciente.

### Tabla: programa\_control

Registra programas de salud preventiva o de control sanitario.

### Tabla: familia

Agrupa pacientes según núcleo familiar.

### Tabla: tipo\_relacion

Tipos de relaciones familiares (padre, madre, hermano, etc.).

### Tabla: plan\_intervencion

Planes específicos diseñados para intervenir y mejorar la salud familiar.

### Tabla: factor\_riesgo

Factores que pueden afectar negativamente la salud de la familia.

### Tabla: factor\_protector

Factores que promueven o protegen la salud de la familia.

### Tabla: programa\_salud\_oral

Programas específicos dedicados a la salud oral y dental.

### Tabla: vacuna

Catálogo de vacunas disponibles para aplicación.

### Tabla: calendario\_vacuna

Esquema que indica cuándo deben administrarse las vacunas según edad.

### Tabla: programa\_nutricional

Programas nutricionales disponibles (por ejemplo, PNAC/PACAM).

### Tabla: informe\_pacam

Informes estadísticos de beneficiarios y desembolsos del programa nutricional PACAM.

### Tabla: centro\_salud

Información sobre los centros de atención donde se realiza la prestación sanitaria.

### Tabla: usuario

Usuarios autorizados del sistema (médicos, administrativos, etc.).

### Tabla: rol

Roles que definen niveles de acceso y permisos de usuarios en el sistema.

### Tabla: usuario\_rol

Tabla intermedia para asociar usuarios con roles específicos.

### Tabla: cita

Citas agendadas con pacientes en centros de salud por personal sanitario.

### Tabla: ficha\_control

Registros detallados de controles sanitarios periódicos realizados a los pacientes.

### Tabla: historial\_resultado

Histórico de resultados clínicos asociados a una ficha de control específica.

### Tabla: estratificacion\_riesgo

Clasificación del nivel de riesgo sanitario asignado a cada paciente.

### Tabla: miembro\_familiar

Datos específicos de cada miembro de un núcleo familiar.

### Tabla: ficha\_odontologica

Ficha especializada para el seguimiento odontológico de los pacientes.

### Tabla: odontograma

Registro del estado dental pieza por pieza, asociado a fichas odontológicas.

### Tabla: radiografia

Almacena referencias a radiografías dentales asociadas a la ficha odontológica.

### Tabla: registro\_vacunacion

Registro detallado de las vacunas administradas a los pacientes.

### Tabla: alerta\_inasistencia

Notificaciones de alertas generadas cuando pacientes no asisten a vacunaciones programadas.

### Tabla: inscripcion\_pacam

Registro de inscripción de pacientes en programas nutricionales PACAM.

### Tabla: control\_desembolso

Control y seguimiento de desembolsos y entregas efectuadas bajo el programa PACAM.

### Tabla: medicamento

Información de medicamentos disponibles para prescripción.

### Tabla: receta

Prescripciones médicas emitidas por profesionales sanitarios a los pacientes.

### Tabla: receta\_medicamento

Detalle de medicamentos específicos prescritos en cada receta.

### Tabla: despacho\_medicamento

Registros detallados de entregas de medicamentos prescritos en farmacias.
