'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Cita {
  id: string;
  paciente: string;
  fecha: string;
  hora: string;
  tipo: string;
}

// Datos iniciales
const initialCitas: Cita[] = [
  {
    id: 'C1',
    paciente: 'Juan Pérez',
    fecha: '2025-06-01',
    hora: '10:00',
    tipo: 'Control médico',
  },
  {
    id: 'C2',
    paciente: 'María González',
    fecha: '2025-06-02',
    hora: '11:30',
    tipo: 'Odontología',
  },
  {
    id: 'C3',
    paciente: 'Luis Martínez',
    fecha: '2025-06-03',
    hora: '09:15',
    tipo: 'Vacunación',
  },
];

export default function CitasPage() {
  // Estado de la lista
  const [citas, setCitas] = useState<Cita[]>(initialCitas);

  // Estado del formulario
  const [form, setForm] = useState({
    paciente: '',
    fecha: '',
    hora: '',
    tipo: '',
  });

  // Maneja cambios en inputs y select
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Al enviar el formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newCita: Cita = {
      id: `C${citas.length + 1}`,
      paciente: form.paciente,
      fecha: form.fecha,
      hora: form.hora,
      tipo: form.tipo,
    };
    setCitas([...citas, newCita]);
    setForm({ paciente: '', fecha: '', hora: '', tipo: '' });
  };

  return (
    <div>
      <h1>Citas</h1>

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
          name="fecha"
          type="date"
          value={form.fecha}
          onChange={handleChange}
          required
          style={{ marginRight: '0.5rem' }}
        />
        <input
          name="hora"
          type="time"
          value={form.hora}
          onChange={handleChange}
          required
          style={{ marginRight: '0.5rem' }}
        />
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          required
          style={{ marginRight: '0.5rem' }}
        >
          <option value="" disabled>Selecciona tipo</option>
          <option value="Control médico">Control médico</option>
          <option value="Odontología">Odontología</option>
          <option value="Vacunación">Vacunación</option>
          <option value="Nutrición">Nutrición</option>
        </select>
        <button type="submit">Agregar Cita</button>
      </form>

      {/* Tabla de citas */}
      <table border={1} cellPadding={8} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {citas.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.paciente}</td>
              <td>{c.fecha}</td>
              <td>{c.hora}</td>
              <td>{c.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
);
}