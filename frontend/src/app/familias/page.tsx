'use client';
import './styles.css';

import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {apiService} from '@/services/ApiService';

interface Familia {
    id_familia: number;
    nombre: string;
    fecha_creacion: string;
}

export default function FamiliasPage() {
    const [familias, setFamilias] = useState<Familia[]>([]);
    const [form, setForm] = useState({nombre: '', fecha_creacion: ''});

    useEffect(() => {
        apiService
            .getFamilias()
            .then((data) => {
                if (Array.isArray(data)) {
                    setFamilias(data);
                }
            })
            .catch((err) => console.error('ApiService familias GET error:', err));
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const nueva: Familia = await apiService.createFamilia(form);
            setFamilias([...familias, nueva]);
            setForm({nombre: '', fecha_creacion: ''});
        } catch (err) {
            console.error('ApiService familias POST error:', err);
        }
    };

    return (
        <div>
            <h1>Familias</h1>

            <form
                onSubmit={handleSubmit}
                className="familias-form"
            >
                <input
                    name="nombre"
                    placeholder="Nombre de la familia"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    className="familias-input-nombre"
                />
                <input
                    name="fecha_creacion"
                    type="date"
                    value={form.fecha_creacion}
                    onChange={handleChange}
                    required
                    className="familias-input-fecha"
                />
                <button type="submit" className="familias-btn">
                    Agregar Familia
                </button>
            </form>

            <table className="familias-table">
                <thead>
                <tr>
                    <th className="familias-th">ID</th>
                    <th className="familias-th">Nombre</th>
                    <th className="familias-th">Fecha Creación</th>
                </tr>
                </thead>
                <tbody>
                {familias.map((f) => (
                    <tr key={f.id_familia}>
                        <td className="familias-td">{f.id_familia}</td>
                        <td className="familias-td">{f.nombre}</td>
                        <td className="familias-td">{new Date(f.fecha_creacion).toLocaleDateString('es-CL')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}