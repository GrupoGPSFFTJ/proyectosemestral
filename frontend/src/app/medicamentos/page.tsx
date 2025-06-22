'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { apiService } from '@/services/ApiService';

interface Medicamento {
  id_medicamento: number;
  nombre: string;
  descripcion: string;
}

export default function MedicamentosPage() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
  });

  useEffect(() => {
    apiService.getMedicamentos().then(setMedicamentos);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const nuevo = await apiService.createMedicamento(form);
      setMedicamentos([...medicamentos, nuevo]);
      setForm({ nombre: '', descripcion: '' });
    } catch {
      alert('Error al crear medicamento');
    }
  };

  return (
    <div>
      <h1>Medicamentos</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <input
          name="nombre"
          placeholder="Nombre del medicamento"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          required
        />
        <button type="submit">Agregar Medicamento</button>
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem' }}>ID</th>
            <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem' }}>Nombre</th>
            <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem' }}>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map(m => (
            <tr key={m.id_medicamento}>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{m.id_medicamento}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{m.nombre}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{m.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}