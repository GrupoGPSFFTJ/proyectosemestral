'use client';

import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {apiService} from '@/services/ApiService';

// Interfaces
interface Paciente {
    id_paciente: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    rut: string;
}

interface Usuario {
    id_usuario: number;
    nombre: string;
    apellido_paterno?: string;
    apellido_materno?: string;
}

interface Medicamento {
    id_medicamento: number;
    nombre: string;
    descripcion: string;
}

interface RecetaMedicamentoForm {
    id_medicamento: string;
    dosis_cantidad: string;
    dosis_unidad: string;
    frecuencia_horas: string;
    duracion_dias: string;
}

const UNIDADES_DOSIS = ['tableta(s)', 'ml', 'mg', 'gota(s)', 'cucharada(s)', 'capsula(s)'];

export default function RecetasPage() {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
    const [recetas, setRecetas] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [detalleReceta, setDetalleReceta] = useState<any[] | null>(null);
    const [showDetalle, setShowDetalle] = useState(false);
    const [detalleTitulo, setDetalleTitulo] = useState('');

    const [form, setForm] = useState({
        id_paciente: '',
        id_medico: '',
        indicacion: '',
        items: [] as RecetaMedicamentoForm[],
    });

    // Modal handlers
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        apiService.getPacientes().then(setPacientes);
        apiService.getUsuarios().then(setUsuarios);
        apiService.getMedicamentos().then(setMedicamentos);
        apiService.getRecetas().then(setRecetas);
    }, []);

    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleItemChange = (
        idx: number,
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const items = [...form.items];
        items[idx] = {...items[idx], [e.target.name]: e.target.value};
        setForm({...form, items});
    };

    const handleAddItem = () => {
        setForm({
            ...form,
            items: [
                ...form.items,
                {
                    id_medicamento: '',
                    dosis_cantidad: '',
                    dosis_unidad: '',
                    frecuencia_horas: '',
                    duracion_dias: '',
                },
            ],
        });
    };

    const handleRemoveItem = (idx: number) => {
        const items = [...form.items];
        items.splice(idx, 1);
        setForm({...form, items});
    };

    // Calcula la cantidad a despachar
    function calcularCantidadDespachada(
        dosis_cantidad: string,
        frecuencia_horas: string,
        duracion_dias: string,
        dosis_unidad: string
    ) {
        const dosisNum = parseFloat(dosis_cantidad || '1');
        const frecuenciaNum = parseFloat(frecuencia_horas || '1');
        const diasNum = parseInt(duracion_dias || '1', 10);

        const vecesPorDia = frecuenciaNum > 0 ? 24 / frecuenciaNum : 1;
        const total = Math.ceil(dosisNum * vecesPorDia * diasNum);
        return `${total} ${dosis_unidad}`;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // 1. Crear receta
        const recetaPayload = {
            id_paciente: Number(form.id_paciente),
            id_medico: Number(form.id_medico),
            fecha_emision: new Date().toISOString().slice(0, 19).replace('T', ' '), // now()
            indicacion: form.indicacion,
        };
        const receta = await apiService.createReceta(recetaPayload);

        // 2. Crear ítems de receta y despachos
        for (const item of form.items) {
            const recetaMedPayload = {
                id_receta: receta.id_receta,
                id_medicamento: Number(item.id_medicamento),
                dosis: `${item.dosis_cantidad} ${item.dosis_unidad}`,
                frecuencia: `${item.frecuencia_horas} hora(s)`,
                duracion_dias: Number(item.duracion_dias),
            };
            const recetaMed = await apiService.createRecetaMedicamento(recetaMedPayload);

            // Despacho automático (now + 1 hora)
            const fecha_despacho = new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
            const cantidad_despachada = calcularCantidadDespachada(
                item.dosis_cantidad,
                item.frecuencia_horas,
                item.duracion_dias,
                item.dosis_unidad
            );
            await apiService.createDespachoMedicamento({
                id_receta_med: recetaMed.id_receta_medicamento,
                fecha_despacho,
                cantidad_despachada,
                id_farmacia: 1, // puedes ajustar según tu lógica
            });
        }

        setForm({
            id_paciente: '',
            id_medico: '',
            indicacion: '',
            items: [],
        });
        apiService.getRecetas().then(setRecetas);
        setShowModal(false);
        alert('Receta creada y despachos generados');
    };

    const handleVerDetalle = async (receta: any) => {
        const response = await apiService.getRecMedByReceta(receta.id_receta);
        const items = Array.isArray(response) ? response : [response];
        setDetalleReceta(items);
        setDetalleTitulo(`Detalle de receta #${receta.id_receta}`);
        setShowDetalle(true);
    };

    const handleCerrarDetalle = () => {
        setShowDetalle(false);
        setDetalleReceta(null);
        setDetalleTitulo('');
    };

    return (
        <div>
            <h1>Recetas</h1>
            <button onClick={handleOpenModal} style={{marginBottom: '1rem'}}>
                Crear receta
            </button>
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10
                }}>
                    <div
                        style={{
                            background: '#fff',
                            padding: 32,
                            borderRadius: 12,
                            minWidth: 700,
                            maxWidth: 900,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            position: 'relative'
                        }}
                    >
                        <button
                            onClick={handleCloseModal}
                            style={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                background: 'transparent',
                                border: 'none',
                                fontSize: 22,
                                cursor: 'pointer',
                                color: '#888'
                            }}
                            title="Cerrar"
                        >
                            ×
                        </button>
                        <h2 style={{margin: 0, textAlign: 'center'}}>Nueva Receta</h2>
                        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1.2rem'}}>
                            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                                <div style={{flex: 1, minWidth: 220}}>
                                    <label style={{fontWeight: 500}}>Paciente</label>
                                    <select
                                        name="id_paciente"
                                        value={form.id_paciente}
                                        onChange={handleChange}
                                        required
                                        style={{width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc'}}
                                    >
                                        <option value="">Selecciona paciente</option>
                                        {pacientes.map((p) => (
                                            <option key={p.id_paciente} value={p.id_paciente}>
                                                {`${p.nombre} ${p.apellido_paterno ?? ''} ${p.apellido_materno ?? ''}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div style={{flex: 1, minWidth: 220}}>
                                    <label style={{fontWeight: 500}}>Médico</label>
                                    <select
                                        name="id_medico"
                                        value={form.id_medico}
                                        onChange={handleChange}
                                        required
                                        style={{width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc'}}
                                    >
                                        <option value="">Selecciona médico</option>
                                        {usuarios.map((u) => (
                                            <option key={u.id_usuario} value={u.id_usuario}>
                                                {`${u.nombre} ${u.apellido_paterno ?? ''} ${u.apellido_materno ?? ''}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label style={{fontWeight: 500}}>Indicaciones generales</label>
                                <textarea
                                    name="indicacion"
                                    placeholder="Indicaciones generales"
                                    value={form.indicacion}
                                    onChange={handleChange}
                                    rows={2}
                                    style={{
                                        width: '100%',
                                        padding: 8,
                                        borderRadius: 6,
                                        border: '1px solid #ccc',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>
                            <div>
                                <h3 style={{margin: '0 0 0.5rem 0'}}>Medicamentos</h3>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '0.7rem'}}>
                                    {form.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns: '2fr 1fr 1.2fr 1fr 1fr 40px',
                                                gap: '0.7rem',
                                                alignItems: 'center',
                                                background: '#f7f7fa',
                                                padding: '0.7rem 0.5rem',
                                                borderRadius: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <select
                                                name="id_medicamento"
                                                value={item.id_medicamento}
                                                onChange={e => handleItemChange(idx, e)}
                                                required
                                                style={{
                                                    width: '100%',
                                                    padding: 6,
                                                    borderRadius: 6,
                                                    border: '1px solid #ccc'
                                                }}
                                            >
                                                <option value="">Medicamento</option>
                                                {medicamentos.map(m => (
                                                    <option key={m.id_medicamento} value={m.id_medicamento}>
                                                        {m.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                name="dosis_cantidad"
                                                type="number"
                                                min={1}
                                                placeholder="Dosis"
                                                value={item.dosis_cantidad}
                                                onChange={e => handleItemChange(idx, e)}
                                                required
                                                style={{
                                                    width: '100%',
                                                    padding: 6,
                                                    borderRadius: 6,
                                                    border: '1px solid #ccc'
                                                }}
                                            />
                                            <select
                                                name="dosis_unidad"
                                                value={item.dosis_unidad}
                                                onChange={e => handleItemChange(idx, e)}
                                                required
                                                style={{
                                                    width: '100%',
                                                    padding: 6,
                                                    borderRadius: 6,
                                                    border: '1px solid #ccc'
                                                }}
                                            >
                                                <option value="">Unidad</option>
                                                {UNIDADES_DOSIS.map(u => (
                                                    <option key={u} value={u}>{u}</option>
                                                ))}
                                            </select>
                                            <input
                                                name="frecuencia_horas"
                                                type="number"
                                                min={1}
                                                placeholder="Cada (hora)"
                                                value={item.frecuencia_horas}
                                                onChange={e => handleItemChange(idx, e)}
                                                required
                                                style={{
                                                    width: '100%',
                                                    padding: 6,
                                                    borderRadius: 6,
                                                    border: '1px solid #ccc'
                                                }}
                                            />
                                            <input
                                                name="duracion_dias"
                                                type="number"
                                                min={1}
                                                placeholder="Días"
                                                value={item.duracion_dias}
                                                onChange={e => handleItemChange(idx, e)}
                                                required
                                                style={{
                                                    width: '100%',
                                                    padding: 6,
                                                    borderRadius: 6,
                                                    border: '1px solid #ccc'
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveItem(idx)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#fff',
                                                    background: '#e74c3c',
                                                    border: 'none',
                                                    borderRadius: 6,
                                                    width: 32,
                                                    height: 32,
                                                    fontWeight: 'bold',
                                                    fontSize: 18,
                                                    cursor: 'pointer',
                                                    padding: 0,
                                                }}
                                                title="Eliminar"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAddItem}
                                    style={{
                                        marginTop: 12,
                                        padding: '8px 18px',
                                        background: '#3498db',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: 6,
                                        fontWeight: 500,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Agregar medicamento
                                </button>
                            </div>
                            <div style={{display: 'flex', gap: '0.5rem', marginTop: 8, justifyContent: 'flex-end'}}>
                                <button
                                    type="submit"
                                    style={{
                                        padding: '10px 28px',
                                        background: '#27ae60',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: 6,
                                        fontWeight: 600,
                                        fontSize: 16,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Crear receta
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    style={{
                                        padding: '10px 18px',
                                        background: '#eee',
                                        color: '#444',
                                        border: 'none',
                                        borderRadius: 6,
                                        fontWeight: 500,
                                        fontSize: 16,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <table style={{width: '100%', borderCollapse: 'collapse', marginTop: 32}}>
                <thead>
                <tr>
                    <th style={{textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem'}}>ID</th>
                    <th style={{textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem'}}>Paciente</th>
                    <th style={{textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem'}}>Médico</th>
                    <th style={{textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem'}}>Fecha Emisión
                    </th>
                    <th style={{textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem'}}>Indicaciones</th>
                    <th style={{textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem'}}>Medicamentos</th>
                </tr>
                </thead>
                <tbody>
                {recetas.map((r: any) => (
                    <tr key={r.id_receta}>
                        <td style={{padding: '0.5rem', borderBottom: '1px solid #eee'}}>{r.id_receta}</td>
                        <td style={{padding: '0.5rem', borderBottom: '1px solid #eee'}}>
                            {
                                pacientes.find(p => p.id_paciente === r.id_paciente)
                                    ? `${pacientes.find(p => p.id_paciente === r.id_paciente)?.nombre} ${pacientes.find(p => p.id_paciente === r.id_paciente)?.apellido_paterno ?? ''} ${pacientes.find(p => p.id_paciente === r.id_paciente)?.apellido_materno ?? ''}`
                                    : ''
                            }
                        </td>
                        <td style={{padding: '0.5rem', borderBottom: '1px solid #eee'}}>
                            {
                                usuarios.find(u => u.id_usuario === r.id_medico)
                                    ? `${usuarios.find(u => u.id_usuario === r.id_medico)?.nombre} ${usuarios.find(u => u.id_usuario === r.id_medico)?.apellido_paterno ?? ''} ${usuarios.find(u => u.id_usuario === r.id_medico)?.apellido_materno ?? ''}`
                                    : ''
                            }
                        </td>
                        <td style={{padding: '0.5rem', borderBottom: '1px solid #eee'}}>{r.fecha_emision}</td>
                        <td style={{padding: '0.5rem', borderBottom: '1px solid #eee'}}>{r.indicacion}</td>
                        <td style={{padding: '0.5rem', borderBottom: '1px solid #eee'}}>
                            <button
                                style={{
                                    padding: '6px 14px',
                                    background: '#3498db',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 6,
                                    fontWeight: 500,
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleVerDetalle(r)}
                            >
                                Ver detalle
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal de detalle de receta */}
            {showDetalle && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 20
                }}>
                    <div style={{
                        background: '#fff',
                        padding: 32,
                        borderRadius: 12,
                        minWidth: 400,
                        maxWidth: 500,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                        position: 'relative'
                    }}>
                        <button
                            onClick={handleCerrarDetalle}
                            style={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                background: 'transparent',
                                border: 'none',
                                fontSize: 22,
                                cursor: 'pointer',
                                color: '#888'
                            }}
                            title="Cerrar"
                        >
                            ×
                        </button>
                        <h2 style={{margin: '0 0 1rem 0', textAlign: 'center'}}>{detalleTitulo}</h2>
                        <table style={{width: '100%', borderCollapse: 'collapse'}}>
                            <thead>
                            <tr>
                                <th style={{
                                    textAlign: 'left',
                                    borderBottom: '2px solid #ccc',
                                    padding: '0.5rem'
                                }}>Nombre
                                </th>
                                <th style={{
                                    textAlign: 'left',
                                    borderBottom: '2px solid #ccc',
                                    padding: '0.5rem'
                                }}>Dosis
                                </th>
                                <th style={{
                                    textAlign: 'left',
                                    borderBottom: '2px solid #ccc',
                                    padding: '0.5rem'
                                }}>Frecuencia
                                </th>
                                <th style={{
                                    textAlign: 'left',
                                    borderBottom: '2px solid #ccc',
                                    padding: '0.5rem'
                                }}>Duración (días)
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {detalleReceta?.map((item, idx) => {
                                const med = medicamentos.find(m => m.id_medicamento === item.id_medicamento);
                                return (
                                    <tr key={idx}>
                                        <td style={{
                                            padding: '0.5rem',
                                            borderBottom: '1px solid #eee'
                                        }}>{med ? med.nombre : item.id_medicamento}</td>
                                        <td style={{
                                            padding: '0.5rem',
                                            borderBottom: '1px solid #eee'
                                        }}>{item.dosis}</td>
                                        <td style={{
                                            padding: '0.5rem',
                                            borderBottom: '1px solid #eee'
                                        }}>{item.frecuencia}</td>
                                        <td style={{
                                            padding: '0.5rem',
                                            borderBottom: '1px solid #eee'
                                        }}>{item.duracion_dias}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}