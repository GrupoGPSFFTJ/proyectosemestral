'use client';

import './styles.css';

import React, {useEffect, useState} from 'react';
import {apiService} from '@/services/ApiService';

interface Despacho {
    id_despacho_medicamento: number;
    id_receta_med: number;
    fecha_despacho: string;
    cantidad_despachada: string;
    id_farmacia: number;
}

interface RecetaMedicamento {
    id_receta_medicamento: number;
    id_medicamento: number;
}

interface Medicamento {
    id_medicamento: number;
    nombre: string;
}

export default function DespachosPage() {
    const [despachos, setDespachos] = useState<Despacho[]>([]);
    const [recetaMedicamentos, setRecetaMedicamentos] = useState<RecetaMedicamento[]>([]);
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);

    useEffect(() => {
        apiService.getDespachos()
            .then((data) => {
                if (Array.isArray(data)) setDespachos(data);
            })
            .catch(() => alert('Error al cargar despachos'));
        apiService.getMedicamentos()
            .then((data) => {
                if (Array.isArray(data)) setMedicamentos(data);
            })
            .catch(() => alert('Error al cargar medicamentos'));
        apiService.getRecetaMedicamentos()
            .then((data: any[]) => {
                if (Array.isArray(data)) setRecetaMedicamentos(data);
            })
            .catch(() => {
            });
    }, []);

    // Relacionar id_receta_med con id_medicamento y luego con nombre
    const getNombreMedicamento = (id_receta_med: number) => {
        const recetaMed = recetaMedicamentos.find(rm => rm.id_receta_medicamento === id_receta_med);
        if (!recetaMed) return '';
        const medicamento = medicamentos.find(m => m.id_medicamento === recetaMed.id_medicamento);
        return medicamento ? medicamento.nombre : '';
    };

    return (
        <div>
            <h1>Despachos</h1>
            <table className="despachos-table">
                <thead>
                <tr>
                    <th className="despachos-th">Medicamento</th>
                    <th className="despachos-th">Cantidad despachada</th>
                    <th className="despachos-th">Fecha de despacho</th>
                </tr>
                </thead>
                <tbody>
                {despachos.map((d, idx) => (
                    <tr key={d.id_despacho_medicamento ?? `${d.id_receta_med}-${idx}`}>
                        <td className="despachos-td">
                            {getNombreMedicamento(d.id_receta_med)}
                        </td>
                        <td className="despachos-td">
                            {d.cantidad_despachada}
                        </td>
                        <td className="despachos-td">
                            {d.fecha_despacho ? new Date(d.fecha_despacho).toLocaleDateString('es-CL') : ''}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}