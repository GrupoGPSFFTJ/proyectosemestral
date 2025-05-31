'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FichaOdontologica {
  id: string;
  paciente: string;
  fechaControl: string;
  diagnostico: string;
}

// Datos iniciales
const initialOdontologias: FichaOdontologica[] = [
  {
    id: 'FO1',
    paciente: 'Juan Pérez',
    fechaControl: '2025-05-21',
    diagnostico: 'Caries en molar M2, se programa obturación.',
  },
  {
    id: 'FO2',
    paciente: 'María González',
    fechaControl: '2025-05-23',
    diagnostico: 'Gingivitis leve, higiene y control en 3 semanas.',
  },
  {
    id: 'FO3',
    paciente: 'Luis Martínez',
    fechaControl: '2025-05-26',
    diagnostico: 'Extracción de tercer molar indicada.',
  },
];

export default function FichasOdontologicaPage() {
  // Estado de la lista
  const [odontologias, setOdontologias] = useState<FichaOdontologica[]>(initialOdontologias);

  // Estado del formulario
  const [form, setForm] = useState({
    paciente: '',
    fechaControl: '',
    diagnostico: '',
  });

  // Maneja cambios en inputs y textarea
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Al enviar el formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newFicha: FichaOdontologica = {
      id: `FO${odontologias.length + 1}`,
      paciente: form.paciente,
      fechaControl: form.fechaControl,
      diagnostico: form.diagnostico,
    };
    setOdontologias([...odontologias, newFicha]);
    setForm({ paciente: '', fechaControl: '', diagnostico: '' });
  };

  return (
    <div>
      <h1>Fichas Odontológicas</h1>

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
          name="fechaControl"
          type="date"
          value={form.fechaControl}
          onChange={handleChange}
          required
          style={{ marginRight: '0.5rem' }}
        />
        <textarea
          name="diagnostico"
          placeholder="Diagnóstico"
          value={form.diagnostico}
          onChange={handleChange}
          required
          rows={1}
          style={{ verticalAlign: 'top', marginRight: '0.5rem' }}
        />
        <button type="submit">Agregar Ficha</button>
      </form>

      {/* Tabla de fichas */}
      <table border={1} cellPadding={8} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Fecha de Control</th>
            <th>Diagnóstico</th>
          </tr>
        </thead>
        <tbody>
          {odontologias.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.paciente}</td>
              <td>{o.fechaControl}</td>
              <td>{o.diagnostico}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}