'use client';

import React, { useEffect, useState } from 'react';
import PacienteForm from './PacienteForm';
import { apiService } from '@/services/ApiService';

interface Paciente {
    id_paciente: number;
    nombre: string;
    rut: string;
    fecha_nacimiento: string;
    direccion: string;
    apellido_paterno: string;
    apellido_materno: string;
    genero: string;
    telefono: string;
}

const capitalizeWords = (str: string) =>
    str.replace(/\b\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());

export default function Page() {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchPacientes = async () => {
        try {
            const data = await apiService.getPacientes();
            setPacientes(data as Paciente[]);
            setError(null);
        } catch (err: any) {
            setError(err?.message || 'Error desconocido');
            setPacientes([]);
        }
    };

    useEffect(() => {
        fetchPacientes();
    }, []);

    return (
        <main style={{ padding: '2rem' }}>
            <h1>Pacientes</h1>
            <PacienteForm />

            {error ? (
                <div style={{ color: 'red', marginTop: '1rem' }}>
                    <h2>Error cargando pacientes:</h2>
                    <p>{error}</p>
                </div>
            ) : (
                <div className="pacientes-grid" style={{ marginTop: '1rem' }}>
                    {pacientes.length > 0 ? (
                        pacientes.map((p) => (
                            <div key={p.id_paciente} className="patient-card">
                                <h3 style={{ margin: '0 0 0.5rem' }}>
                                    {capitalizeWords(p.nombre)} {capitalizeWords(p.apellido_paterno)} {capitalizeWords(p.apellido_materno)}
                                </h3>
                                <p>
                                    <strong>RUT:</strong> {p.rut}
                                </p>
                                <p>
                                    <strong>F. Nac.:</strong>{' '}
                                    {new Date(p.fecha_nacimiento).toLocaleDateString('es-CL')}
                                </p>
                                <p>
                                    <strong>Género:</strong>{' '}
                                    {p.genero}
                                </p>
                                <p>
                                    <strong>Teléfono:</strong> {p.telefono}
                                </p>
                                <p>
                                    <strong>Dirección:</strong> {capitalizeWords(p.direccion)}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No hay pacientes aún.</p>
                    )}
                </div>
            )}
        </main>
    );
}