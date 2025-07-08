'use client';

import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {apiService} from '@/services/ApiService';
import './styles.css';

// Interfaces
interface Paciente {
    id_paciente: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    rut: string;
}

interface Usuario {
    id_usuario: number;
    nombre: string;
    apellido_paterno?: string;
    apellido_materno?: string;
}

interface Medicamento {
    id_medicamento: number;
    nombre: string;
    descripcion: string;
}

interface RecetaMedicamentoForm {
    id_medicamento: string;
    dosis_cantidad: string;
    dosis_unidad: string;
    frecuencia_horas: string;
    duracion_dias: string;
}

const UNIDADES_DOSIS = ['tableta(s)', 'ml', 'mg', 'gota(s)', 'cucharada(s)', 'capsula(s)'];

export default function RecetasPage() {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
    const [recetas, setRecetas] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [detalleReceta, setDetalleReceta] = useState<any[] | null>(null);
    const [showDetalle, setShowDetalle] = useState(false);
    const [detalleTitulo, setDetalleTitulo] = useState('');

    const [form, setForm] = useState({
        id_paciente: '',
        id_medico: '',
        indicacion: '',
        items: [] as RecetaMedicamentoForm[],
    });

    // Modal handlers
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        apiService.getPacientes().then(data => setPacientes(data));
        apiService.getUsuarios().then(data => setUsuarios(data));
        apiService.getMedicamentos().then(data => setMedicamentos(data));
        apiService.getRecetas().then(data => setRecetas(data));
    }, []);

    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleItemChange = (
        idx: number,
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const items = [...form.items];
        items[idx] = {...items[idx], [e.target.name]: e.target.value};
        setForm({...form, items});
    };

    const handleAddItem = () => {
        setForm({
            ...form,
            items: [
                ...form.items,
                {
                    id_medicamento: '',
                    dosis_cantidad: '',
                    dosis_unidad: '',
                    frecuencia_horas: '',
                    duracion_dias: '',
                },
            ],
        });
    };

    const handleRemoveItem = (idx: number) => {
        const items = [...form.items];
        items.splice(idx, 1);
        setForm({...form, items});
    };

    // Calcula la cantidad a despachar
    function calcularCantidadDespachada(
        dosis_cantidad: string,
        frecuencia_horas: string,
        duracion_dias: string,
        dosis_unidad: string
    ) {
        const dosisNum = parseFloat(dosis_cantidad || '1');
        const frecuenciaNum = parseFloat(frecuencia_horas || '1');
        const diasNum = parseInt(duracion_dias || '1', 10);

        const vecesPorDia = frecuenciaNum > 0 ? 24 / frecuenciaNum : 1;
        const total = Math.ceil(dosisNum * vecesPorDia * diasNum);
        return `${total} ${dosis_unidad}`;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // 1. Crear receta
        const recetaPayload = {
            id_paciente: Number(form.id_paciente),
            id_medico: Number(form.id_medico),
            fecha_emision: new Date().toISOString().slice(0, 19).replace('T', ' '), // now()
            indicacion: form.indicacion,
        };
        const receta = await apiService.createReceta(recetaPayload);

        // 2. Crear ítems de receta y despachos
        for (const item of form.items) {
            const recetaMedPayload = {
                id_receta: receta.id_receta,
                id_medicamento: Number(item.id_medicamento),
                dosis: `${item.dosis_cantidad} ${item.dosis_unidad}`,
                frecuencia: `${item.frecuencia_horas} hora(s)`,
                duracion_dias: Number(item.duracion_dias),
            };
            const recetaMed = await apiService.createRecetaMedicamento(recetaMedPayload);

            // Despacho automático (now + 1 hora)
            const fecha_despacho = new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
            const cantidad_despachada = calcularCantidadDespachada(
                item.dosis_cantidad,
                item.frecuencia_horas,
                item.duracion_dias,
                item.dosis_unidad
            );
            await apiService.createDespachoMedicamento({
                id_receta_med: recetaMed.id_receta_medicamento,
                fecha_despacho,
                cantidad_despachada,
                id_farmacia: 1, // puedes ajustar según tu lógica
            });
        }

        setForm({
            id_paciente: '',
            id_medico: '',
            indicacion: '',
            items: [],
        });
        apiService.getRecetas().then(setRecetas);
        setShowModal(false);
        alert('Receta creada y despachos generados');
    };

    const handleVerDetalle = async (receta: any) => {
        const response = await apiService.getRecMedByReceta(receta.id_receta);
        const items = Array.isArray(response) ? response : [response];
        setDetalleReceta(items);
        setDetalleTitulo(`Detalle de receta #${receta.id_receta}`);
        setShowDetalle(true);
    };

    const handleCerrarDetalle = () => {
        setShowDetalle(false);
        setDetalleReceta(null);
        setDetalleTitulo('');
    };

    return (
        <div>
            <h1>Recetas</h1>
            <button onClick={handleOpenModal} className="recetas-btn-crear">
                Crear receta
            </button>
            {showModal && (
                <div className="recetas-modal-bg">
                    <div className="recetas-modal">
                        <button
                            onClick={handleCloseModal}
                            className="recetas-modal-close"
                            title="Cerrar"
                        >
                            ×
                        </button>
                        <h2 className="recetas-modal-title">Nueva Receta</h2>
                        <form onSubmit={handleSubmit} className="recetas-form">
                            <div className="recetas-form-row">
                                <div className="recetas-form-col">
                                    <label className="recetas-label">Paciente</label>
                                    <select
                                        name="id_paciente"
                                        value={form.id_paciente}
                                        onChange={handleChange}
                                        required
                                        className="recetas-select"
                                    >
                                        <option value="">Selecciona paciente</option>
                                        {pacientes.map((p) => (
                                            <option key={p.id_paciente} value={p.id_paciente}>
                                                {`${p.nombre} ${p.apellido_paterno ?? ''} ${p.apellido_materno ?? ''}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="recetas-form-col">
                                    <label className="recetas-label">Médico</label>
                                    <select
                                        name="id_medico"
                                        value={form.id_medico}
                                        onChange={handleChange}
                                        required
                                        className="recetas-select"
                                    >
                                        <option value="">Selecciona médico</option>
                                        {usuarios.map((u) => (
                                            <option key={u.id_usuario} value={u.id_usuario}>
                                                {`${u.nombre} ${u.apellido_paterno ?? ''} ${u.apellido_materno ?? ''}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="recetas-label">Indicaciones generales</label>
                                <textarea
                                    name="indicacion"
                                    placeholder="Indicaciones generales"
                                    value={form.indicacion}
                                    onChange={handleChange}
                                    rows={2}
                                    className="recetas-textarea"
                                />
                            </div>
                            <div>
                                <h3 style={{margin: '0 0 0.5rem 0'}}>Medicamentos</h3>
                                <div className="recetas-medicamentos-list">
                                    {form.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="recetas-medicamento-item"
                                        >
                                            <select
                                                name="id_medicamento"
                                                value={item.id_medicamento}
                                                onChange={e => handleItemChange(idx, e)}
                                                required
                                                className="recetas-select"
                                            >
                                                <option value="">Medicamento</option>
                                                {medicamentos.map(m => (
                                                    <option key={m.id_medicamento} value={m.id_medicamento}>
                                                        {m.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                name="dosis_cantidad"
                                                type="number"
                                                min={1}
                                                placeholder="Dosis"
                                                value={item.dosis_cantidad}
                                                onChange={e => handleItemChange(idx, e)}
                                                required
                                                className="recetas-input"
                                            />
                                            <select
                                                name="dosis_unidad"
                                                value={item.dosis_unidad}
                                                onChange={e => handleItemChange(idx, e)}
                                                required
                                                className="recetas-select"
                                            >
                                                <option value="">Unidad</option>
                                                {UNIDADES_DOSIS.map(u => (
                                                    <option key={u} value={u}>{u}</option>
                                                ))}
                                            </select>
                                            <input
                                                name="frecuencia_horas"
                                                type="number"
                                                min={1}
                                                placeholder="Cada (hora)"
                                                value={item.frecuencia_horas}
                                                onChange={e => handleItemChange(idx, e)}
                                                required
                                                className="recetas-input"
                                            />
                                            <input
                                                name="duracion_dias"
                                                type="number"
                                                min={1}
                                                placeholder="Días"
                                                value={item.duracion_dias}
                                                onChange={e => handleItemChange(idx, e)}
                                                required
                                                className="recetas-input"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveItem(idx)}
                                                className="recetas-medicamento-remove"
                                                title="Eliminar"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAddItem}
                                    className="recetas-medicamento-add"
                                >
                                    Agregar medicamento
                                </button>
                            </div>
                            <div className="recetas-form-actions">
                                <button
                                    type="submit"
                                    className="recetas-form-submit"
                                >
                                    Crear receta
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="recetas-form-cancel"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <table className="recetas-table">
                <thead>
                <tr>
                    <th className="recetas-th">ID</th>
                    <th className="recetas-th">Paciente</th>
                    <th className="recetas-th">Médico</th>
                    <th className="recetas-th">Fecha Emisión</th>
                    <th className="recetas-th">Indicaciones</th>
                    <th className="recetas-th">Medicamentos</th>
                </tr>
                </thead>
                <tbody>
                {recetas.map((r: any) => (
                    <tr key={r.id_receta}>
                        <td className="recetas-td">{r.id_receta}</td>
                        <td className="recetas-td">
                            {
                                pacientes.find(p => p.id_paciente === r.id_paciente)
                                    ? `${pacientes.find(p => p.id_paciente === r.id_paciente)?.nombre} ${pacientes.find(p => p.id_paciente === r.id_paciente)?.apellido_paterno ?? ''} ${pacientes.find(p => p.id_paciente === r.id_paciente)?.apellido_materno ?? ''}`
                                    : ''
                            }
                        </td>
                        <td className="recetas-td">
                            {
                                usuarios.find(u => u.id_usuario === r.id_medico)
                                    ? `${usuarios.find(u => u.id_usuario === r.id_medico)?.nombre} ${usuarios.find(u => u.id_usuario === r.id_medico)?.apellido_paterno ?? ''} ${usuarios.find(u => u.id_usuario === r.id_medico)?.apellido_materno ?? ''}`
                                    : ''
                            }
                        </td>
                        <td className="recetas-td">{r.fecha_emision}</td>
                        <td className="recetas-td">{r.indicacion}</td>
                        <td className="recetas-td">
                            <button
                                className="recetas-verdetalle-btn"
                                onClick={() => handleVerDetalle(r)}
                            >
                                Ver detalle
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal de detalle de receta */}
            {showDetalle && (
                <div className="recetas-detalle-modal-bg">
                    <div className="recetas-detalle-modal">
                        <button
                            onClick={handleCerrarDetalle}
                            className="recetas-detalle-close"
                            title="Cerrar"
                        >
                            ×
                        </button>
                        <h2 className="recetas-detalle-title">{detalleTitulo}</h2>
                        <table className="recetas-detalle-table">
                            <thead>
                            <tr>
                                <th className="recetas-detalle-th">Nombre</th>
                                <th className="recetas-detalle-th">Dosis</th>
                                <th className="recetas-detalle-th">Frecuencia</th>
                                <th className="recetas-detalle-th">Duración (días)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {detalleReceta?.map((item, idx) => {
                                const med = medicamentos.find(m => m.id_medicamento === item.id_medicamento);
                                return (
                                    <tr key={idx}>
                                        <td className="recetas-detalle-td">{med ? med.nombre : item.id_medicamento}</td>
                                        <td className="recetas-detalle-td">{item.dosis}</td>
                                        <td className="recetas-detalle-td">{item.frecuencia}</td>
                                        <td className="recetas-detalle-td">{item.duracion_dias}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}