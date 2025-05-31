'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Despacho {
  id: string;
  medicamento: string;
  fechaDespacho: string;
  cantidad: number;
  estado: string;
}

// Datos iniciales
const initialDespachos: Despacho[] = [
  {
    id: 'D1',
    medicamento: 'Paracetamol 500 mg',
    fechaDespacho: '2025-05-30',
    cantidad: 20,
    estado: 'Entregado',
  },
  {
    id: 'D2',
    medicamento: 'Ibuprofeno 400 mg',
    fechaDespacho: '2025-05-28',
    cantidad: 15,
    estado: 'Pendiente',
  },
  {
    id: 'D3',
    medicamento: 'Amoxicilina 500 mg',
    fechaDespacho: '2025-05-26',
    cantidad: 10,
    estado: 'Entregado',
  },
];

export default function DespachosPage() {
  // Estado de la lista
  const [despachos, setDespachos] = useState<Despacho[]>(initialDespachos);

  // Estado del formulario
  const [form, setForm] = useState({
    medicamento: '',
    fechaDespacho: '',
    cantidad: '',
    estado: '',
  });

  // Maneja cambios en inputs y select
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Al enviar el formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newDespacho: Despacho = {
      id: `D${despachos.length + 1}`,
      medicamento: form.medicamento,
      fechaDespacho: form.fechaDespacho,
      cantidad: Number(form.cantidad),
      estado: form.estado,
    };
    setDespachos([...despachos, newDespacho]);
    setForm({ medicamento: '', fechaDespacho: '', cantidad: '', estado: '' });
  };

  return (
    <div>
      <h1>Despachos</h1>

      {/* Formulario de creación */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          name="medicamento"
          placeholder="Medicamento"
          value={form.medicamento}
          onChange={handleChange}
          required
          style={{ marginRight: '0.5rem' }}
        />
        <input
          name="fechaDespacho"
          type="date"
          value={form.fechaDespacho}
          onChange={handleChange}
          required
          style={{ marginRight: '0.5rem' }}
        />
        <input
          name="cantidad"
          type="number"
          placeholder="Cantidad"
          value={form.cantidad}
          onChange={handleChange}
          required
          style={{ width: '5rem', marginRight: '0.5rem' }}
        />
        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          required
          style={{ marginRight: '0.5rem' }}
        >
          <option value="" disabled>Selecciona estado</option>
          <option value="Entregado">Entregado</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Cancelado">Cancelado</option>
        </select>
        <button type="submit">Agregar Despacho</button>
      </form>

      {/* Tabla de despachos */}
      <table border={1} cellPadding={8} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Medicamento</th>
            <th>Fecha de Despacho</th>
            <th>Cantidad</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {despachos.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.medicamento}</td>
              <td>{d.fechaDespacho}</td>
              <td>{d.cantidad}</td>
              <td>{d.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
);
}