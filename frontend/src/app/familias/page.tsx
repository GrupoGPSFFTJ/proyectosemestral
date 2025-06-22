'use client';

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
                style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                    marginBottom: '1rem',
                }}
            >
                <input
                    name="nombre"
                    placeholder="Nombre de la familia"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    style={{flex: '1 1 250px', padding: '0.5rem'}}
                />
                <input
                    name="fecha_creacion"
                    type="date"
                    value={form.fecha_creacion}
                    onChange={handleChange}
                    required
                    style={{flex: '1 1 150px', padding: '0.5rem'}}
                />
                <button type="submit" style={{padding: '0.5rem 1rem'}}>
                    Agregar Familia
                </button>
            </form>

            <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                <tr>
                    <th style={{textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem'}}>
                        ID
                    </th>
                    <th style={{textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem'}}>
                        Nombre
                    </th>
                    <th style={{textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem'}}>
                        Fecha Creación
                    </th>
                </tr>
                </thead>
                <tbody>
                {familias.map((f) => (
                    <tr key={f.id_familia}>
                        <td style={{padding: '0.5rem', borderBottom: '1px solid #eee'}}>{f.id_familia}</td>
                        <td style={{padding: '0.5rem', borderBottom: '1px solid #eee'}}>{f.nombre}</td>
                        <td style={{padding: '0.5rem', borderBottom: '1px solid #eee'}}>
                            {new Date(f.fecha_creacion).toLocaleDateString('es-CL')}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}