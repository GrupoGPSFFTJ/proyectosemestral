'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Receta {
  id: string;
  paciente: string;
  fechaEmision: string;
  medicamentos: string;
}

// Datos iniciales
const initialRecetas: Receta[] = [
  {
    id: 'R1',
    paciente: 'Juan Pérez',
    fechaEmision: '2025-05-15',
    medicamentos: 'Paracetamol 500 mg, Ibuprofeno 400 mg',
  },
  {
    id: 'R2',
    paciente: 'María González',
    fechaEmision: '2025-05-18',
    medicamentos: 'Amoxicilina 500 mg',
  },
  {
    id: 'R3',
    paciente: 'Luis Martínez',
    fechaEmision: '2025-05-20',
    medicamentos: 'Omeprazol 20 mg',
  },
];

export default function RecetasPage() {
  // Estado de la lista
  const [recetas, setRecetas] = useState<Receta[]>(initialRecetas);

  // Estado del formulario
  const [form, setForm] = useState({
    paciente: '',
    fechaEmision: '',
    medicamentos: '',
  });

  // Maneja cambios en inputs y textarea
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Envía el formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newReceta: Receta = {
      id: `R${recetas.length + 1}`,
      paciente: form.paciente,
      fechaEmision: form.fechaEmision,
      medicamentos: form.medicamentos,
    };
    setRecetas([...recetas, newReceta]);
    setForm({ paciente: '', fechaEmision: '', medicamentos: '' });
  };

  return (
    <div>
      <h1>Recetas</h1>

      {/* Formulario de creación */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          name="paciente"
          placeholder="Nombre del paciente"
          value={form.paciente}
          onChange={handleChange}
          required
          style={{ marginRight: '0.5rem' }}
        />
        <input
          name="fechaEmision"
          type="date"
          value={form.fechaEmision}
          onChange={handleChange}
          required
          style={{ marginRight: '0.5rem' }}
        />
        <textarea
          name="medicamentos"
          placeholder="Medicamentos (separa con comas)"
          value={form.medicamentos}
          onChange={handleChange}
          required
          rows={1}
          style={{ verticalAlign: 'top', marginRight: '0.5rem' }}
        />
        <button type="submit">Agregar Receta</button>
      </form>

      {/* Tabla de recetas */}
      <table border={1} cellPadding={8} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Fecha Emisión</th>
            <th>Medicamentos</th>
          </tr>
        </thead>
        <tbody>
          {recetas.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.paciente}</td>
              <td>{r.fechaEmision}</td>
              <td>{r.medicamentos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}