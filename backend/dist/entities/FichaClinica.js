"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FichaControl = void 0;
const typeorm_1 = require("typeorm");
const Paciente_1 = require("./Paciente");
const ProgramaControl_1 = require("./ProgramaControl");
const CentroSalud_1 = require("./CentroSalud");
const Usuario_1 = require("./Usuario");
const HistorialResultado_1 = require("./HistorialResultado");
const EstratificacionRiesgo_1 = require("./EstratificacionRiesgo");
let FichaControl = class FichaControl {
};
exports.FichaControl = FichaControl;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FichaControl.prototype, "id_ficha_control", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], FichaControl.prototype, "fecha_control", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], FichaControl.prototype, "observacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Paciente_1.Paciente, (paciente) => paciente.fichas_control),
    (0, typeorm_1.JoinColumn)({ name: "id_paciente" }),
    __metadata("design:type", Paciente_1.Paciente)
], FichaControl.prototype, "paciente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProgramaControl_1.ProgramaControl),
    (0, typeorm_1.JoinColumn)({ name: "id_programa_control" }),
    __metadata("design:type", ProgramaControl_1.ProgramaControl)
], FichaControl.prototype, "programa_control", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CentroSalud_1.CentroSalud),
    (0, typeorm_1.JoinColumn)({ name: "id_centro_salud" }),
    __metadata("design:type", CentroSalud_1.CentroSalud)
], FichaControl.prototype, "centro_salud", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuario_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: "id_usuario_responsable" }),
    __metadata("design:type", Usuario_1.Usuario)
], FichaControl.prototype, "usuario_responsable", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => HistorialResultado_1.HistorialResultado, (historial) => historial.ficha_control),
    __metadata("design:type", Array)
], FichaControl.prototype, "historiales", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EstratificacionRiesgo_1.EstratificacionRiesgo, (estratificacion) => estratificacion.ficha_control),
    __metadata("design:type", Array)
], FichaControl.prototype, "estratificaciones_riesgo", void 0);
exports.FichaControl = FichaControl = __decorate([
    (0, typeorm_1.Entity)()
], FichaControl);
