// types/express.d.ts
import { Usuario } from "../entities/Usuario";

declare global {
  namespace Express {
    interface Request {
      user?: Usuario;
    }
  }
}