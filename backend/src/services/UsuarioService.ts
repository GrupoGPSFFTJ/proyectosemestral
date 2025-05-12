import { AppDataSource } from "../config/data-source";
import { Usuario } from "../entities/Usuario";
import { Rol } from "../entities/Rol";
import { CentroSalud } from "../entities/CentroSalud";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UsuarioService {
    private usuarioRepository = AppDataSource.getRepository(Usuario);
    private rolRepository = AppDataSource.getRepository(Rol);
    private centroRepository = AppDataSource.getRepository(CentroSalud);

    async createUsuario(usuarioData: {
        username: string;
        password: string;
        nombre: string;
        email: string;
        estado?: string;
        id_centro_salud: number;
        roles?: number[];
    }) {
        const { password, roles, ...rest } = usuarioData;
    
        // Validar centro de salud
        const centro = await this.centroRepository.findOneBy({ 
            id_centro_salud: rest.id_centro_salud 
        });
        if (!centro) throw new Error("Centro de salud no encontrado");
    
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Crear usuario con tipo explícito
        const usuario = this.usuarioRepository.create({
            ...rest,
            password_hash: hashedPassword,
            estado: rest.estado || 'A',
            centro_salud: centro,
            roles: [] // Inicializar array vacío
        }) as Usuario; // Aserción de tipo explícita
    
        // Asignar roles
        if (roles && roles.length > 0) {
            usuario.roles = await this.rolRepository.findByIds(roles);
        }
    
        return await this.usuarioRepository.save(usuario);
    }

    async login(username: string, password: string) {
        const usuario = await this.usuarioRepository.findOne({ 
            where: { username },
            relations: ["roles", "centro_salud"]
        });
        if (!usuario) throw new Error("Autenticación fallida");

        const passwordMatch = await bcrypt.compare(password, usuario.password_hash);
        if (!passwordMatch) throw new Error("Autenticación fallida");

        const token = jwt.sign(
            { 
                userId: usuario.id_usuario, 
                username: usuario.username, 
                roles: usuario.roles.map(r => r.nombre) 
            },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "1h" }
        );

        return { token, usuario };
    }

    async assignRoles(usuarioId: number, roleIds: number[]) {
        const usuario = await this.usuarioRepository.findOne({ 
            where: { id_usuario: usuarioId },
            relations: ["roles"]
        });
        if (!usuario) throw new Error("Usuario no encontrado");

        usuario.roles = await this.rolRepository.findByIds(roleIds);
        return await this.usuarioRepository.save(usuario);
    }

    async getUsuarioById(id: number) {
        return await this.usuarioRepository.findOne({ 
            where: { id_usuario: id },
            relations: ["roles", "centro_salud"]
        });
    }
}