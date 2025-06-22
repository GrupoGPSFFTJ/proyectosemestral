'use client';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/services/ApiService';

export default function PacienteForm() {
    const router = useRouter();
    const [generos, setGeneros] = useState<string[]>([]);

    useEffect(() => {
        apiService.getGeneros()
            .then(data => setGeneros(data))
            .catch(err => console.error('Error al cargar géneros:', err));
    }, []);


    const [form, setForm] = useState({
        direccion: '',
        rut: '',
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        fecha_nacimiento: '',
        genero: '',
        telefono: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await apiService.createPaciente(form);

            setForm({
                direccion: '',
                rut: '',
                nombre: '',
                apellido_paterno: '',
                apellido_materno: '',
                fecha_nacimiento: '',
                genero: '',
                telefono: ''
            });

            router.refresh();
        } catch (err: any) {
            console.error(err);
            alert('Error al crear paciente: ' + err.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.75rem',
                marginBottom: '1rem',
            }}
        >
            <input
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
                name="apellido_paterno"
                placeholder="Apellido Paterno"
                value={form.apellido_paterno}
                onChange={handleChange}
                required
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
                name="apellido_materno"
                placeholder="Apellido Materno"
                value={form.apellido_materno}
                onChange={handleChange}
                required
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
                name="rut"
                placeholder="RUT"
                value={form.rut}
                onChange={handleChange}
                required
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
                name="fecha_nacimiento"
                type="date"
                value={form.fecha_nacimiento}
                onChange={handleChange}
                required
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
                name="direccion"
                placeholder="Dirección"
                value={form.direccion}
                onChange={handleChange}
                required
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <select
                name="genero"
                value={form.genero}
                onChange={handleChange}
                required
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            >
                <option value="">Seleccione género</option>
                {generos.map(genero => (
                    <option key={genero} value={genero}>
                        {genero}
                    </option>
                ))}
            </select>

            <input
                name="telefono"
                placeholder="Teléfono"
                value={form.telefono}
                onChange={handleChange}
                required
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button
                type="submit"
                style={{
                    gridColumn: '1 / -1',
                    padding: '0.5rem 1.4rem',
                    fontSize: '0.95rem',
                    background: '#0070f3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '0.5rem',
                    width: 'fit-content',
                    justifySelf: 'end',
                }}
            >
                Agregar Paciente
            </button>
        </form>
    );
}