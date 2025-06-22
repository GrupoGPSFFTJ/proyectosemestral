'use client';

import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {apiService} from '@/services/ApiService';

interface Cita {
    id_cita: number;
    observacion: string;
    id_paciente: number;
    id_usuario: number;
    id_centro_salud: number;
    estado: string;
    fecha_hora: string;
    tipo_cita: string;
}

interface Paciente {
    id_paciente: number;
    rut: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
}

interface CentroSalud {
    id_centro_salud: number;
    nombre: string;
}

interface Usuario {
    id_usuario: number;
    nombre: string;
    apellido_paterno?: string;
    apellido_materno?: string;
}

interface CitaEstado {
    value: string;
    label: string;
}

interface TipoCita {
    value: string;
    label: string;
}

export default function CitasPage() {
    const [citas, setCitas] = useState<Cita[]>([]);
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [centros, setCentros] = useState<CentroSalud[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [citaEstados, setCitaEstados] = useState<CitaEstado[]>([]);
    const [tiposCita, setTiposCita] = useState<TipoCita[]>([]);
    const [form, setForm] = useState({
        observacion: '',
        id_paciente: '',
        id_usuario: '',
        id_centro_salud: '',
        fecha: '',
        hora: '',
        tipo_cita: '',
    });

    useEffect(() => {
        apiService.getCitass().then(setCitas);
        apiService.getPacientes().then(setPacientes);
        apiService.getCentrosSalud().then(setCentros);
        apiService.getUsuarios().then(setUsuarios);
        apiService.getCitaEstado().then((data) => {
            setCitaEstados(data.map((e: any) => ({value: e, label: e})));
        });
        apiService.getTipoCita().then((data) => {
            setTiposCita(data.map((e: any) => ({value: e, label: e})));
        });
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const fecha_hora = `${form.fecha}T${form.hora}`;
        const payload = {
            observacion: form.observacion,
            id_paciente: Number(form.id_paciente),
            id_usuario: Number(form.id_usuario),
            id_centro_salud: Number(form.id_centro_salud),
            fecha_hora,
            tipo_cita: form.tipo_cita,
        };
        try {
            const nueva: Cita = await apiService.createCita(payload);
            setCitas([...citas, nueva]);
            setForm({
                observacion: '',
                id_paciente: '',
                id_usuario: '',
                id_centro_salud: '',
                fecha: '',
                hora: '',
                tipo_cita: '',
            });
        } catch (err: any) {
            alert('Error al crear cita' + err.message);
        }
    };

    if (!pacientes.length || !centros.length || !tiposCita.length || !usuarios.length || !citaEstados.length) {
        return <div>Cargando datos...</div>;
    }

    return (
        <div>
            <h1>Citas</h1>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                }}
            >
                <select
                    name="id_paciente"
                    value={form.id_paciente}
                    onChange={handleChange}
                    required
                    style={{flex: '2 1 300px', padding: '0.5rem'}}
                >
                    <option value="">Selecciona paciente</option>
                    {pacientes.map((p) => (
                        <option key={`paciente-${p.id_paciente}`} value={p.id_paciente}>
                            {`${p.rut}, ${p.nombre} ${p.apellido_paterno} ${p.apellido_materno}`}
                        </option>
                    ))}
                </select>
                <select
                    name="id_usuario"
                    value={form.id_usuario}
                    onChange={handleChange}
                    required
                    style={{flex: '2 1 300px', padding: '0.5rem'}}
                >
                    <option value="">Selecciona médico</option>
                    {usuarios
                        .filter((u) => u.id_usuario !== undefined && u.id_usuario !== null)
                        .map((u) => (
                            <option key={`usuario-${u.id_usuario}`} value={u.id_usuario}>
                                {`${u.nombre} ${u.apellido_paterno ?? ''} ${u.apellido_materno ?? ''}`}
                            </option>
                        ))}
                </select>
                <input
                    name="fecha"
                    type="date"
                    value={form.fecha}
                    onChange={handleChange}
                    required
                    style={{flex: '1 1 120px', padding: '0.5rem'}}
                />
                <input
                    name="hora"
                    type="time"
                    value={form.hora}
                    onChange={handleChange}
                    required
                    style={{flex: '1 1 100px', padding: '0.5rem'}}
                />
                <select
                    name="tipo_cita"
                    value={form.tipo_cita}
                    onChange={handleChange}
                    required
                    style={{flex: '1 1 180px', padding: '0.5rem'}}
                >
                    <option value="">Selecciona tipo de cita</option>
                    {tiposCita.map((t) => (
                        <option key={`tipo-${t.value}`} value={t.value}>
                            {t.label}
                        </option>
                    ))}
                </select>
                <select
                    name="id_centro_salud"
                    value={form.id_centro_salud}
                    onChange={handleChange}
                    required
                    style={{flex: '1 1 180px', padding: '0.5rem'}}
                >
                    <option value="">Selecciona centro de salud</option>
                    {centros.map((c) => (
                        <option key={`centro-${c.id_centro_salud}`} value={c.id_centro_salud}>
                            {c.nombre}
                        </option>
                    ))}
                </select>
                <input
                    name="observacion"
                    placeholder="Observación"
                    value={form.observacion}
                    onChange={handleChange}
                    required
                    style={{flex: '2 1 300px', padding: '0.5rem'}}
                />
                <button type="submit" style={{padding: '0.5rem 1rem'}}>
                    Agregar
                </button>
            </form>

            <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                <tr>
                    <th style={{textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem'}}>ID</th>
                    <th style={{textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem'}}>Paciente</th>
                    <th style={{textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem'}}>Médico</th>
                    <th style={{textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem'}}>Fecha</th>
                    <th style={{textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem'}}>Hora</th>
                    <th style={{textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem'}}>Tipo de Cita</th>
                    <th style={{textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem'}}>Centro Salud</th>
                    <th style={{textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem'}}>Observación</th>
                    <th style={{textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem'}}>Estado</th>
                </tr>
                </thead>
                <tbody>
                {citas.map((c) => {
                    const paciente = pacientes.find((p) => Number(p.id_paciente) === Number(c.id_paciente));
                    const centro = centros.find((cs) => Number(cs.id_centro_salud) === Number(c.id_centro_salud));
                    const usuario = usuarios.find((u) => Number(u.id_usuario) === Number(c.id_usuario));
                    const tipo = tiposCita.find((t) => t.value === c.tipo_cita);
                    const estado = citaEstados.find((e) => e.value === c.estado);

                    const fechaObj = new Date(c.fecha_hora);
                    const fecha = fechaObj.toLocaleDateString('es-CL');
                    const hora = fechaObj.toLocaleTimeString('es-CL', {hour: '2-digit', minute: '2-digit'});

                    return (
                        <tr key={c.id_cita}>
                            <td style={{padding: '0.5rem', borderBottom: '1px solid #eee'}}>{c.id_cita}</td>
                            <td style={{padding: '0.5rem', borderBottom: '1px solid #eee'}}>
                                {paciente
                                    ? `${paciente.nombre} ${paciente.apellido_paterno} ${paciente.apellido_materno}`
                                    : c.id_paciente}
                            </td>
                            <td style={{padding: '0.5rem', borderBottom: '1px solid #eee'}}>
                                {usuario
                                    ? `${usuario.nombre} ${usuario.apellido_paterno ?? ''} ${usuario.apellido_materno ?? ''}`
                                    : c.id_usuario}
                            </td>
                            <td style={{padding: '0.5rem', borderBottom: '1px solid #eee'}}>{fecha}</td>
                            <td style={{padding: '0.5rem', borderBottom: '1px solid #eee'}}>{hora}</td>
                            <td style={{padding: '0.5rem', borderBottom: '1px solid #eee'}}>
                                {tipo ? tipo.label : c.tipo_cita}
                            </td>
                            <td style={{padding: '0.5rem', borderBottom: '1px solid #eee'}}>
                                {centro ? centro.nombre : c.id_centro_salud}
                            </td>
                            <td style={{padding: '0.5rem', borderBottom: '1px solid #eee'}}>{c.observacion}</td>
                            <td style={{padding: '0.5rem', borderBottom: '1px solid #eee'}}>
                                {estado ? estado.label : c.estado}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}