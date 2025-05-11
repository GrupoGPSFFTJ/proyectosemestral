import { DataSource } from "typeorm";
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
});
