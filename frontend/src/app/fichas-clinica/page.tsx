'use client';
import './styles.css';

import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {apiService} from '@/services/ApiService';
import {useAuth} from '@/components/AuthContext';

interface FichaClinica {
    id_ficha_control: number;
    fecha_control: string;
    observacion: string;
    id_paciente: number;
    id_programa_control: number;
    id_centro_salud: number;
    id_usuario_responsable: number;
}

interface Paciente {
    id_paciente: number;
    rut: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
}

interface Programa {
    id_programa_control: number;
    codigo: string;
    nombre: string;
}

interface CentroSalud {
    id_centro_salud: number;
    nombre: string;
}

export default function FichasClinicaPage() {
    const {user} = useAuth();
    const [fichas, setFichas] = useState<FichaClinica[]>([]);
    const [centros, setCentros] = useState<CentroSalud[]>([]);
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [programas, setProgramas] = useState<Programa[]>([]);
    const [form, setForm] = useState({
        fecha_control: '',
        observacion: '',
        id_paciente: '',
        id_programa_control: '',
        id_centro_salud: '',
    });

    useEffect(() => {
        apiService.getFichasControl()
            .then((data) => setFichas(data))
            .catch((err) => console.error('ApiService fichas GET error:', err));

        apiService.getCentrosSalud()
            .then((data) => setCentros(data))
            .catch(() => alert('Error al cargar centros de salud'));

        apiService.getPacientes()
            .then((data) => setPacientes(data))
            .catch(() => alert('Error al cargar pacientes'));

        apiService.getProgramaControl()
            .then((data) => setProgramas(data))
            .catch(() => alert('Error al cargar programas de control'));
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!user) return;
        const payload = {
            fecha_control: form.fecha_control,
            observacion: form.observacion,
            id_paciente: Number(form.id_paciente),
            id_programa_control: Number(form.id_programa_control),
            id_centro_salud: Number(form.id_centro_salud),
            id_usuario_responsable: user.id,
        };
        try {
            const nueva: FichaClinica = await apiService.createFichaControl(payload);
            setFichas([...fichas, nueva]);
            setForm({
                fecha_control: '',
                observacion: '',
                id_paciente: '',
                id_programa_control: '',
                id_centro_salud: '',
            });
        } catch (err) {
            console.error('ApiService fichas POST error:', err);
        }
    };

    if (!pacientes.length || !programas.length || !centros.length) {
        return <div>Cargando datos...</div>;
    }

    return (
        <div>
            <h1>Fichas Clínicas</h1>
            <form
                onSubmit={handleSubmit}
                className="fichas-form"
            >
                <input
                    name="fecha_control"
                    type="date"
                    placeholder="Fecha Control"
                    value={form.fecha_control}
                    onChange={handleChange}
                    required
                    className="fichas-input-fecha"
                />
                <input
                    name="observacion"
                    placeholder="Observación"
                    value={form.observacion}
                    onChange={handleChange}
                    required
                    className="fichas-input-observacion"
                />
                <select
                    name="id_paciente"
                    value={form.id_paciente}
                    onChange={handleChange}
                    required
                    className="fichas-select-paciente"
                >
                    <option value="">Selecciona paciente</option>
                    {pacientes.map((p) => (
                        <option
                            key={`paciente-${p.id_paciente}`}
                            value={p.id_paciente}
                        >
                            {`${p.rut}, ${p.nombre} ${p.apellido_paterno} ${p.apellido_materno}`}
                        </option>
                    ))}
                </select>
                <select
                    name="id_programa_control"
                    value={form.id_programa_control}
                    onChange={handleChange}
                    required
                    className="fichas-select-programa"
                >
                    <option value="">Selecciona programa</option>
                    {programas.map((pr) => (
                        <option
                            key={`programa-${pr.id_programa_control}`}
                            value={pr.id_programa_control}
                        >
                            {`${pr.codigo}, ${pr.nombre}`}
                        </option>
                    ))}
                </select>
                <select
                    name="id_centro_salud"
                    value={form.id_centro_salud}
                    onChange={handleChange}
                    required
                    className="fichas-select-centro"
                >
                    <option value="">Selecciona centro de salud</option>
                    {centros.map((c) => (
                        <option
                            key={`centro-${c.id_centro_salud}`}
                            value={c.id_centro_salud}
                        >
                            {c.nombre}
                        </option>
                    ))}
                </select>
                <button type="submit" className="fichas-btn">
                    Agregar
                </button>
            </form>

            <table className="fichas-table">
                <thead>
                <tr>
                    <th className="fichas-th">ID</th>
                    <th className="fichas-th">Fecha Control</th>
                    <th className="fichas-th">Observación</th>
                    <th className="fichas-th">Paciente</th>
                    <th className="fichas-th">Programa</th>
                    <th className="fichas-th">Centro Salud</th>
                    <th className="fichas-th">Usuario Resp.</th>
                </tr>
                </thead>
                <tbody>
                {fichas.map((f) => {
                    const paciente = pacientes.find(
                        (p) => Number(p.id_paciente) === Number(f.id_paciente)
                    );
                    const programa = programas.find(
                        (pr) => Number(pr.id_programa_control) === Number(f.id_programa_control)
                    );
                    const centro = centros.find(
                        (c) => Number(c.id_centro_salud) === Number(f.id_centro_salud)
                    );
                    return (
                        <tr key={f.id_ficha_control}>
                            <td className="fichas-td">{f.id_ficha_control}</td>
                            <td className="fichas-td">{new Date(f.fecha_control).toLocaleDateString('es-CL')}</td>
                            <td className="fichas-td">{f.observacion}</td>
                            <td className="fichas-td">
                                {paciente
                                    ? `${paciente.nombre} ${paciente.apellido_paterno} ${paciente.apellido_materno}`
                                    : f.id_paciente}
                            </td>
                            <td className="fichas-td">
                                {programa
                                    ? `${programa.nombre}`
                                    : f.id_programa_control}
                            </td>
                            <td className="fichas-td">{centro ? centro.nombre : f.id_centro_salud}</td>
                            <td className="fichas-td">{user?.nombre ?? f.id_usuario_responsable}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}