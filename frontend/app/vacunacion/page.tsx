'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Vacuna {
  id: string;
  paciente: string;
  nombreVacuna: string;
  fechaAplicacion: string;
  dosis: string;
}

// Datos iniciales
const initialVacunas: Vacuna[] = [
  {
    id: 'V1',
    paciente: 'Juan Pérez',
    nombreVacuna: 'B-CG (Tuberculosis)',
    fechaAplicacion: '2025-01-10',
    dosis: 'Única',
  },
  {
    id: 'V2',
    paciente: 'María González',
    nombreVacuna: 'DTPa (Difteria/Tétanos/Tosferina)',
    fechaAplicacion: '2025-03-15',
    dosis: 'Refuerzo',
  },
  {
    id: 'V3',
    paciente: 'Luis Martínez',
    nombreVacuna: 'SRP (Sarampión/Rubéola/Parotiditis)',
    fechaAplicacion: '2025-04-05',
    dosis: 'Primera',
  },
];

export default function VacunacionPage() {
  // Estado de la lista
  const [vacunas, setVacunas] = useState<Vacuna[]>(initialVacunas);

  // Estado del formulario
  const [form, setForm] = useState({
    paciente: '',
    nombreVacuna: '',
    fechaAplicacion: '',
    dosis: '',
  });

  // Maneja cambios en inputs y selects
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Al enviar el formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newVacuna: Vacuna = {
      id: `V${vacunas.length + 1}`,
      paciente: form.paciente,
      nombreVacuna: form.nombreVacuna,
      fechaAplicacion: form.fechaAplicacion,
      dosis: form.dosis,
    };
    setVacunas([...vacunas, newVacuna]);
    setForm({ paciente: '', nombreVacuna: '', fechaAplicacion: '', dosis: '' });
  };

  return (
    <div>
      <h1>Vacunación</h1>

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
          name="nombreVacuna"
          placeholder="Nombre de la vacuna"
          value={form.nombreVacuna}
          onChange={handleChange}
          required
          style={{ marginRight: '0.5rem' }}
        />
        <input
          name="fechaAplicacion"
          type="date"
          value={form.fechaAplicacion}
          onChange={handleChange}
          required
          style={{ marginRight: '0.5rem' }}
        />
        <select
          name="dosis"
          value={form.dosis}
          onChange={handleChange}
          required
          style={{ marginRight: '0.5rem' }}
        >
          <option value="" disabled>Selecciona dosis</option>
          <option value="Primera">Primera</option>
          <option value="Refuerzo">Refuerzo</option>
          <option value="Única">Única</option>
        </select>
        <button type="submit">Agregar Vacuna</button>
      </form>

      {/* Tabla de vacunación */}
      <table border={1} cellPadding={8} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Vacuna</th>
            <th>Fecha de Aplicación</th>
            <th>Dosis</th>
          </tr>
        </thead>
        <tbody>
          {vacunas.map(v => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.paciente}</td>
              <td>{v.nombreVacuna}</td>
              <td>{v.fechaAplicacion}</td>
              <td>{v.dosis}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}