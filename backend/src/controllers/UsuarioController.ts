import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";

export class UsuarioController {
    constructor(private usuarioService: UsuarioService) {}

    async createUsuario(req: Request, res: Response) {
        try {
            const usuario = await this.usuarioService.createUsuario(req.body);
            res.status(201).json(usuario);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const result = await this.usuarioService.login(username, password);
            res.json(result);
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }

    async assignRoles(req: Request, res: Response) {
        try {
            const usuario = await this.usuarioService.assignRoles(
                parseInt(req.params.id),
                req.body.roleIds
            );
            res.json(usuario);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getUsuarioById(req: Request, res: Response) {
        try {
            const usuario = await this.usuarioService.getUsuarioById(parseInt(req.params.id));
            usuario ? res.json(usuario) : res.status(404).json({ message: "Usuario no encontrado" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}