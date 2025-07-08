'use client';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/services/ApiService';

interface PacienteFormProps {
    paciente?: any | null;
    show?: boolean;
    onClose?: (updated?: boolean) => void;
}

export default function PacienteForm({ paciente, show, onClose }: PacienteFormProps) {
    useRouter();
    const [generos, setGeneros] = useState<string[]>([]);
    const [, setShowModal] = useState(false);

    useEffect(() => {
        apiService.getGeneros()
            .then(data => setGeneros(data)) // Ya no es necesario '|| []'
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

    useEffect(() => {
        if (paciente) {
            setForm({
                direccion: paciente.direccion || '',
                rut: paciente.rut || '',
                nombre: paciente.nombre || '',
                apellido_paterno: paciente.apellido_paterno || '',
                apellido_materno: paciente.apellido_materno || '',
                fecha_nacimiento: paciente.fecha_nacimiento ? paciente.fecha_nacimiento.slice(0, 10) : '',
                genero: paciente.genero || '',
                telefono: paciente.telefono || ''
            });
        } else {
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
        }
    }, [paciente, show]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (paciente && paciente.id_paciente) {
                await apiService.updatePaciente(paciente.id_paciente, form);
                alert('Paciente actualizado correctamente');
            } else {
                await apiService.createPaciente(form);
                alert('Paciente creado correctamente');
            }
            if (onClose) onClose(true);
            setShowModal(false);
        } catch (err: any) {
            console.error(err);
            alert('Error al guardar paciente: ' + err.message);
        }
    };
    const handleCloseModal = () => {
        if (onClose) onClose();
        setShowModal(false);
    };

    if (!show) return null;
    return (
        <div>
            {show && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(4px)'
                }}>
                    <div
                        style={{
                            background: '#fff',
                            padding: '2rem',
                            borderRadius: '16px',
                            minWidth: '500px',
                            maxWidth: '700px',
                            boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            position: 'relative',
                            maxHeight: '90vh',
                            overflowY: 'auto'
                        }}
                    >
                        <button
                            onClick={handleCloseModal}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: '#f3f4f6',
                                border: 'none',
                                borderRadius: '8px',
                                width: '32px',
                                height: '32px',
                                fontSize: '18px',
                                cursor: 'pointer',
                                color: '#6b7280',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = '#e5e7eb';
                                e.currentTarget.style.color = '#374151';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = '#f3f4f6';
                                e.currentTarget.style.color = '#6b7280';
                            }}
                            title="Cerrar"
                        >
                            ×
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                            <div style={{
                                fontSize: '2rem',
                                marginBottom: '0.5rem',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem auto',
                                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)'
                            }}>
                                👤
                            </div>
                            <h2 style={{
                                margin: 0,
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#0f172a'
                            }}>
                                Nuevo Paciente
                            </h2>
                            <p style={{
                                margin: '0.5rem 0 0 0',
                                color: '#64748b',
                                fontSize: '0.95rem'
                            }}>
                                Completa la información del paciente
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                gap: '1rem',
                                marginBottom: '1rem',
                            }}
                        >
                            <input
                                name="nombre"
                                placeholder="Nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                required
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '2px solid #e2e8f0',
                                    fontSize: '0.95rem',
                                    transition: 'border-color 0.2s ease',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                            />
                            <input
                                name="apellido_paterno"
                                placeholder="Apellido Paterno"
                                value={form.apellido_paterno}
                                onChange={handleChange}
                                required
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '2px solid #e2e8f0',
                                    fontSize: '0.95rem',
                                    transition: 'border-color 0.2s ease',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                            />
                            <input
                                name="apellido_materno"
                                placeholder="Apellido Materno"
                                value={form.apellido_materno}
                                onChange={handleChange}
                                required
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '2px solid #e2e8f0',
                                    fontSize: '0.95rem',
                                    transition: 'border-color 0.2s ease',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                            />
                            <input
                                name="rut"
                                placeholder="RUT (ej: 12345678-9)"
                                value={form.rut}
                                onChange={handleChange}
                                required
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '2px solid #e2e8f0',
                                    fontSize: '0.95rem',
                                    transition: 'border-color 0.2s ease',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                            />
                            <input
                                name="fecha_nacimiento"
                                type="date"
                                value={form.fecha_nacimiento}
                                onChange={handleChange}
                                required
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '2px solid #e2e8f0',
                                    fontSize: '0.95rem',
                                    transition: 'border-color 0.2s ease',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                            />
                            <select
                                name="genero"
                                value={form.genero}
                                onChange={handleChange}
                                required
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '2px solid #e2e8f0',
                                    fontSize: '0.95rem',
                                    transition: 'border-color 0.2s ease',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
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
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '2px solid #e2e8f0',
                                    fontSize: '0.95rem',
                                    transition: 'border-color 0.2s ease',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                            />
                            <input
                                name="direccion"
                                placeholder="Dirección"
                                value={form.direccion}
                                onChange={handleChange}
                                required
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '2px solid #e2e8f0',
                                    fontSize: '0.95rem',
                                    transition: 'border-color 0.2s ease',
                                    outline: 'none',
                                    gridColumn: '1 / -1'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                            />
                            <div style={{
                                gridColumn: '1 / -1',
                                display: 'flex',
                                gap: '1rem',
                                justifyContent: 'flex-end',
                                marginTop: '1rem',
                                paddingTop: '1rem',
                                borderTop: '1px solid #e2e8f0'
                            }}>
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        background: '#f3f4f6',
                                        color: '#374151',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        fontSize: '0.95rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = '#e5e7eb';
                                        e.currentTarget.style.borderColor = '#d1d5db';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = '#f3f4f6';
                                        e.currentTarget.style.borderColor = '#e5e7eb';
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        fontSize: '0.95rem',
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.13)',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                                    }}
                                >
                                    {paciente && paciente.id_paciente ? 'Actualizar Paciente' : 'Crear Paciente'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}