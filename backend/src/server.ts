import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import pacienteRoutes from "./routes/PacienteRoutes";
import familiaRoutes from "./routes/FamiliaRoutes";
import fichaClinicaRoutes from "./routes/FichaClinicaRoutes";
import authRoutes from "./routes/AuthRoutes";
import rolRoutes from "./routes/RolRoutes";
import centroSaludRoutes from "./routes/CentroSaludRoutes";

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/familias", familiaRoutes);
app.use("/api/fichas-clinicas", fichaClinicaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/roles", rolRoutes);
app.use("/api/centros-salud", centroSaludRoutes);

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to database", error);
  });