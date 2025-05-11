import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Usuario } from "../entities/Usuario";
import { Rol } from "../entities/Rol";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CentroSalud } from "../entities/CentroSalud";

const usuarioRepository = AppDataSource.getRepository(Usuario);
const rolRepository = AppDataSource.getRepository(Rol);

export const createUsuario = async (req: Request, res: Response) => {
    try {
        const { password, roles, ...usuarioData } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Find centro_salud
        const centro = await AppDataSource.getRepository(CentroSalud).findOneBy({
            id_centro_salud: usuarioData.id_centro_salud
        });
        if (!centro) return res.status(400).json({ message: "Centro de salud not found" });

        // Crear usuario con asignación explícita de tipos
        const usuario = usuarioRepository.create({
            username: usuarioData.username,
            password_hash: hashedPassword,
            nombre: usuarioData.nombre,
            email: usuarioData.email,
            estado: usuarioData.estado || 'A', // Valor por defecto
            centro_salud: centro
        }) as Usuario; // <-- Cast explícito

        // Asignar roles
        if (roles && roles.length > 0) {
            const foundRoles = await rolRepository.findByIds(roles);
            usuario.roles = foundRoles; // Ahora TypeScript sabe que usuario.roles existe
        }

        await usuarioRepository.save(usuario);
        res.status(201).json(usuario);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const loginUsuario = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const usuario = await usuarioRepository.findOne({
            where: { username },
            relations: ["roles", "centro_salud"]
        });

        if (!usuario) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        const passwordMatch = await bcrypt.compare(password, usuario.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        const token = jwt.sign(
            { userId: usuario.id_usuario, username: usuario.username, roles: usuario.roles.map(r => r.nombre) },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "1h" }
        );

        res.json({ token, usuario });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const assignRolesToUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = await usuarioRepository.findOne({
            where: { id_usuario: parseInt(req.params.id) },
            relations: ["roles"]
        });
        if (!usuario) return res.status(404).json({ message: "Usuario not found" });

        const roles = await rolRepository.findByIds(req.body.roleIds);
        usuario.roles = roles;
        await usuarioRepository.save(usuario);
        res.json(usuario);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getUsuarioById = async (req: Request, res: Response) => {
    try {
        const usuario = await usuarioRepository.findOne({
            where: { id_usuario: parseInt(req.params.id) },
            relations: ["roles", "centro_salud"]
        });
        usuario ? res.json(usuario) : res.status(404).json({ message: "Usuario not found" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

