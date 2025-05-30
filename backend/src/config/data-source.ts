import { DataSource } from "typeorm";
import { join } from "path";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: "proyectogpsserver.database.windows.net",
  port: 1433,
  username: "gpsproject@proyectogpsserver",
  password: "15Mayo*2025",
  database: "proyectogps",
  options: {
    encrypt: true,
    trustServerCertificate: false
  },
  synchronize: false, // IMPORTANTE: false cuando usas migraciones
  logging: true,
  entities: [join(__dirname, "../entities/*.js")], // Cambiado a .ts para desarrollo
  migrations: [join(__dirname, "../migrations/*.js")], // Migraciones en TypeScript
  migrationsTableName: "typeorm_migrations", // Tabla que registrará las migraciones ejecutadas
  extra: {
    authentication: {
      type: "default"
    },
    validateConnection: true
  }
});
