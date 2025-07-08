"use client";

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
            setPacientes(data || []); // Si Data es undefined, usa un arreglo vacío
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
        <main
            style={{padding: "2rem", background: "#f8fafc", minHeight: "100vh"}}
        >
            <div
                className="patients-header"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1.5rem",
                }}
            >
                <h1 style={{margin: 0}}>Pacientes</h1>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        flex: 1,
                        justifyContent: "flex-end",
                    }}
                >
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar paciente"
                        style={{
                            flex: 1,
                            minWidth: 320,
                            maxWidth: 420,
                            padding: "0.7rem 1.2rem",
                            borderRadius: "999px",
                            border: "1.5px solid #e5e7eb",
                            fontSize: "1rem",
                            outline: "none",
                            background: "#f4f6fa",
                            boxShadow: "0 2px 8px rgba(59,130,246,0.04)",
                            transition: "border-color 0.2s",
                        }}
                        autoComplete="off"
                    />
                    <div
                        style={{
                            background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                            color: "white",
                            padding: "0.5rem 1rem",
                            borderRadius: "8px",
                            fontSize: "0.9rem",
                            fontWeight: "600",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Total: {filteredPacientes.length}
                    </div>
                </div>
            </div>
            <button
                className="add-patient-btn"
                style={{
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    padding: "0.75rem 1.5rem",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 16px rgba(16, 185, 129, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "1.5rem",
                }}
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
                <div
                    style={{
                        color: "#dc2626",
                        background: "#fef2f2",
                        padding: "1.5rem",
                        borderRadius: "12px",
                        border: "1px solid #fecaca",
                        marginTop: "2rem",
                    }}
                >
                    <h2 style={{margin: "0 0 0.5rem 0", fontSize: "1.25rem"}}>
                        ⚠️ Error cargando pacientes
                    </h2>
                    <p style={{margin: 0}}>{error}</p>
                </div>
            ) : (
                <div className="pacientes-list">
                    {filteredPacientes.length > 0 ? (
                        filteredPacientes.map((p) => {
                            const initials = `${p.nombre?.[0] || ""}${
                                p.apellido_paterno?.[0] || ""
                            }`.toUpperCase();
                            return (
                                <div
                                    key={p.id_paciente}
                                    className="patient-card patient-card-list"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        minWidth: "1100px", // puedes ajustar este valor según tu preferencia
                                        maxWidth: "100%",
                                        width: "auto",
                                        padding: "1.5rem",
                                        margin: "1rem 0",
                                        borderRadius: "18px",
                                        boxShadow: "0 2px 16px rgba(59,130,246,0.07)",
                                        background: "white",
                                        gap: "2rem",
                                    }}
                                >
                                    <div
                                        className="patient-avatar"
                                        title={`Avatar de ${p.nombre}`}
                                        style={{minWidth: 56, minHeight: 56, fontSize: 28}}
                                    >
                                        {initials}
                                    </div>
                                    <div className="patient-info-list" style={{flex: 1}}>
                                        <h3
                                            style={{
                                                margin: 0,
                                                fontSize: "1.25rem",
                                                fontWeight: 700,
                                            }}
                                        >
                                            {capitalizeWords(p.nombre)}{" "}
                                            {capitalizeWords(p.apellido_paterno)}{" "}
                                            {capitalizeWords(p.apellido_materno)}
                                        </h3>
                                        <div
                                            className="patient-meta-list"
                                            style={{
                                                display: "flex",
                                                flexWrap: "nowrap",
                                                gap: "2.5rem",
                                                alignItems: "center",
                                            }}
                                        >
                                            <p style={{margin: 0}}>
                                                <strong>RUT:</strong> {p.rut}
                                            </p>
                                            <p style={{margin: 0}}>
                                                <strong>F. Nac.:</strong>{" "}
                                                {new Date(p.fecha_nacimiento).toLocaleDateString(
                                                    "es-CL"
                                                )}
                                            </p>
                                            <p style={{margin: 0}}>
                                                <strong>Género:</strong> {capitalizeWords(p.genero)}
                                            </p>
                                            <p style={{margin: 0}}>
                                                <strong>Teléfono:</strong> {p.telefono}
                                            </p>
                                            <p style={{margin: 0}}>
                                                <strong>Dirección:</strong>{" "}
                                                {capitalizeWords(p.direccion)}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="patient-actions patient-actions-list"
                                        style={{display: "flex", flexDirection: "column", gap: 8}}
                                    >
                                        <button onClick={() => handleEdit(p)}>Editar</button>
                                        <button
                                            onClick={() => handleDelete(p.id_paciente)}
                                            style={{marginLeft: 0, color: "red"}}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="empty-state">
                            <h3 style={{fontSize: "1.5rem", margin: "0 0 0.5rem 0"}}>
                                No hay pacientes registrados
                            </h3>
                            <p style={{margin: 0, fontSize: "1rem"}}>
                                Comienza agregando tu primer paciente usando el botón de arriba
                            </p>
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}