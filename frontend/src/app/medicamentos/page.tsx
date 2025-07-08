'use client';

import './styles.css';

import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {apiService} from '@/services/ApiService';

interface Medicamento {
    id_medicamento: number;
    nombre: string;
    descripcion: string;
}

export default function MedicamentosPage() {
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
    const [form, setForm] = useState({
        nombre: '',
        descripcion: '',
    });

    useEffect(() => {
        apiService.getMedicamentos().then((data) => setMedicamentos(data));
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const nuevo = await apiService.createMedicamento(form);
            setMedicamentos([...medicamentos, nuevo]);
            setForm({nombre: '', descripcion: ''});
        } catch {
            alert('Error al crear medicamento');
        }
    };

    return (
        <div>
            <h1>Medicamentos</h1>
            <form onSubmit={handleSubmit} className="medicamentos-form">
                <input
                    name="nombre"
                    placeholder="Nombre del medicamento"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                />
                <input
                    name="descripcion"
                    placeholder="Descripción"
                    value={form.descripcion}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Agregar Medicamento</button>
            </form>
            <table className="medicamentos-table">
                <thead>
                <tr>
                    <th className="medicamentos-th">ID</th>
                    <th className="medicamentos-th">Nombre</th>
                    <th className="medicamentos-th">Descripción</th>
                </tr>
                </thead>
                <tbody>
                {medicamentos.map(m => (
                    <tr key={m.id_medicamento}>
                        <td className="medicamentos-td">{m.id_medicamento}</td>
                        <td className="medicamentos-td">{m.nombre}</td>
                        <td className="medicamentos-td">{m.descripcion}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}