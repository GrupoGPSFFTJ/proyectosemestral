'use client';
import './styles.css';

import React, {useEffect, useState} from "react";
import PacienteForm from "./PacienteForm";
import {apiService} from "@/services/ApiService";

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
    const [editingPaciente, setEditingPaciente] = useState<Paciente | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState("");

    // Filtrado profesional y minimalista
    const filteredPacientes = pacientes.filter((p) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;
        return (
            p.nombre.toLowerCase().includes(q) ||
            p.apellido_paterno.toLowerCase().includes(q) ||
            p.apellido_materno.toLowerCase().includes(q) ||
            p.rut.toLowerCase().includes(q) ||
            p.telefono.toLowerCase().includes(q) ||
            p.direccion.toLowerCase().includes(q)
        );
    });

    const fetchPacientes = async () => {
        try {
            const data = await apiService.getPacientes();
            setPacientes(data);
            setError(null);
        } catch (err: any) {
            setError(err?.message || "Error desconocido");
            setPacientes([]);
        }
    };

    useEffect(() => {
        fetchPacientes();
    }, []);

    const handleEdit = (paciente: Paciente) => {
        setEditingPaciente(paciente);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("¿Seguro que deseas eliminar este paciente?")) return;
        try {
            await apiService.deletePaciente(id);
            setPacientes((prev) => prev.filter((p) => p.id_paciente !== id));
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleFormClose = (updated?: boolean) => {
        setEditingPaciente(null);
        setShowForm(false);
        if (updated) fetchPacientes();
    };

    return (
        <main className="pacientes-main">
            <div
                className="patients-header"
            >
                <h1 className="patients-header-title">Pacientes</h1>
                <div
                    className="patients-header-search"
                >
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar paciente"
                        className="patients-search-input"
                        autoComplete="off"
                    />
                    <div className="patients-total">
                        Total: {filteredPacientes.length}
                    </div>
                </div>
            </div>
            <button
                className="add-patient-btn"
                onClick={() => {
                    setEditingPaciente(null);
                    setShowForm(true);
                }}
            >
                {" "}
                Agregar Paciente{" "}
            </button>
            <PacienteForm
                paciente={editingPaciente}
                show={showForm}
                onClose={handleFormClose}
            />
            {error ? (
                <div className="pacientes-error">
                    <h2 className="pacientes-error-title">
                        ⚠️ Error cargando pacientes
                    </h2>
                    <p>{error}</p>
                </div>
            ) : (
                <div className="pacientes-list">
                    {filteredPacientes.length > 0 ? (
                        filteredPacientes.map((p) => {
                            const initials = `${p.nombre?.[0] || ""}${p.apellido_paterno?.[0] || ""
                            }`.toUpperCase();
                            return (
                                <div
                                    key={p.id_paciente}
                                    className="patient-card patient-card-list"
                                >
                                    <div
                                        className="patient-avatar"
                                        title={`Avatar de ${p.nombre}`}
                                    >
                                        {initials}
                                    </div>
                                    <div className="patient-info-list">
                                        <h3>
                                            {capitalizeWords(p.nombre)}{" "}
                                            {capitalizeWords(p.apellido_paterno)}{" "}
                                            {capitalizeWords(p.apellido_materno)}
                                        </h3>
                                        <div
                                            className="patient-meta-list"
                                        >
                                            <p>
                                                <strong>RUT:</strong> {p.rut}
                                            </p>
                                            <p>
                                                <strong>F. Nac.:</strong>{" "}
                                                {new Date(p.fecha_nacimiento).toLocaleDateString(
                                                    "es-CL"
                                                )}
                                            </p>
                                            <p>
                                                <strong>Género:</strong> {capitalizeWords(p.genero)}
                                            </p>
                                            <p>
                                                <strong>Teléfono:</strong> {p.telefono}
                                            </p>
                                            <p>
                                                <strong>Dirección:</strong>{" "}
                                                {capitalizeWords(p.direccion)}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="patient-actions patient-actions-list"
                                    >
                                        <button onClick={() => handleEdit(p)}>Editar</button>
                                        <button
                                            onClick={() => handleDelete(p.id_paciente)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="empty-state">
                            <h3>No hay pacientes registrados</h3>
                            <p>
                                Comienza agregando tu primer paciente usando el botón de arriba
                            </p>
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}