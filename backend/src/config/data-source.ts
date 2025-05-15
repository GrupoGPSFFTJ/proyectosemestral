/*import { DataSource } from "typeorm";
import { join } from "path";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "secret",
  database: "clinico_db_dev",
  synchronize: true,
  logging: false,
  entities: [join(__dirname, "../entities/*.js")],
  migrations: [],
  subscribers: [],
});*/

import { DataSource } from "typeorm";
import { join } from "path";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: "proyectogpsserver.database.windows.net",
  port: 1433,
  username: "gpsproject@proyectogpsserver", // ¡Formato crucial para Azure!
  password: "15Mayo*2025",
  database: "proyectogps",
  options: {
    encrypt: true, // Obligatorio para Azure
    trustServerCertificate: false // Debe ser false en producción
  },
  extra: {
    authentication: {
      type: "default"
    },
    validateConnection: true
  },
  synchronize: false, // Desactiva esto en producción
  entities: [join(__dirname, "../entities/*.js")],
  logging: true // Habilita logging para diagnóstico
});
