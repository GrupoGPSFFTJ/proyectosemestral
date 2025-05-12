"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const data_source_1 = require("../config/data-source");
const Usuario_1 = require("../entities/Usuario");
const Rol_1 = require("../entities/Rol");
const CentroSalud_1 = require("../entities/CentroSalud");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UsuarioService {
    constructor() {
        this.usuarioRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
        this.rolRepository = data_source_1.AppDataSource.getRepository(Rol_1.Rol);
        this.centroRepository = data_source_1.AppDataSource.getRepository(CentroSalud_1.CentroSalud);
    }
    async createUsuario(usuarioData) {
        const { password, roles, ...rest } = usuarioData;
        // Validar centro de salud
        const centro = await this.centroRepository.findOneBy({
            id_centro_salud: rest.id_centro_salud
        });
        if (!centro)
            throw new Error("Centro de salud no encontrado");
        // Hash password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Crear usuario con tipo explícito
        const usuario = this.usuarioRepository.create({
            ...rest,
            password_hash: hashedPassword,
            estado: rest.estado || 'A',
            centro_salud: centro,
            roles: [] // Inicializar array vacío
        }); // Aserción de tipo explícita
        // Asignar roles
        if (roles && roles.length > 0) {
            usuario.roles = await this.rolRepository.findByIds(roles);
        }
        return await this.usuarioRepository.save(usuario);
    }
    async login(username, password) {
        const usuario = await this.usuarioRepository.findOne({
            where: { username },
            relations: ["roles", "centro_salud"]
        });
        if (!usuario)
            throw new Error("Autenticación fallida");
        const passwordMatch = await bcrypt_1.default.compare(password, usuario.password_hash);
        if (!passwordMatch)
            throw new Error("Autenticación fallida");
        const token = jsonwebtoken_1.default.sign({
            userId: usuario.id_usuario,
            username: usuario.username,
            roles: usuario.roles.map(r => r.nombre)
        }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
        return { token, usuario };
    }
    async assignRoles(usuarioId, roleIds) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id_usuario: usuarioId },
            relations: ["roles"]
        });
        if (!usuario)
            throw new Error("Usuario no encontrado");
        usuario.roles = await this.rolRepository.findByIds(roleIds);
        return await this.usuarioRepository.save(usuario);
    }
    async getUsuarioById(id) {
        return await this.usuarioRepository.findOne({
            where: { id_usuario: id },
            relations: ["roles", "centro_salud"]
        });
    }
}
exports.UsuarioService = UsuarioService;
