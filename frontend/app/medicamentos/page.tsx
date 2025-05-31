'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Medicamento {
  id: string;
  nombre: string;
  presentacion: string;
  stock: number;
}

// Datos iniciales
const initialMedicamentos: Medicamento[] = [
  { id: 'M1', nombre: 'Paracetamol 500 mg', presentacion: 'Tabletas', stock: 120 },
  { id: 'M2', nombre: 'Ibuprofeno 400 mg', presentacion: 'Tabletas', stock: 85 },
  { id: 'M3', nombre: 'Amoxicilina 500 mg', presentacion: 'Cápsulas', stock: 50 },
];

export default function MedicamentosPage() {
  // Estado de la lista
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>(initialMedicamentos);

  // Estado del formulario
  const [form, setForm] = useState({
    nombre: '',
    presentacion: '',
    stock: '',
  });

  // Maneja cambios en los inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Al enviar el formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newMedicamento: Medicamento = {
      id: `M${medicamentos.length + 1}`,
      nombre: form.nombre,
      presentacion: form.presentacion,
      stock: Number(form.stock),
    };
    setMedicamentos([...medicamentos, newMedicamento]);
    setForm({ nombre: '', presentacion: '', stock: '' });
  };

  return (
    <div>
      <h1>Medicamentos</h1>

      {/* Formulario de creación */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          name="nombre"
          placeholder="Nombre del medicamento"
          value={form.nombre}
          onChange={handleChange}
          required
          style={{ marginRight: '0.5rem' }}
        />
        <input
          name="presentacion"
          placeholder="Presentación"
          value={form.presentacion}
          onChange={handleChange}
          required
          style={{ marginRight: '0.5rem' }}
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
          style={{ width: '5rem', marginRight: '0.5rem' }}
        />
        <button type="submit">Agregar Medicamento</button>
      </form>

      {/* Tabla de medicamentos */}
      <table border={1} cellPadding={8} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Presentación</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.nombre}</td>
              <td>{m.presentacion}</td>
              <td>{m.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}