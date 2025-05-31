'use client';

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

interface Familia {
  id: number;
  nombre: string;
  fechaCreacion: string;
}

export default function FamiliasPage() {
  const [familias, setFamilias] = useState<Familia[]>([]);
  const [form, setForm] = useState({ nombre: '', fechaCreacion: '' });

  // 1) Cargar listado de familias al montar
  useEffect(() => {
    fetch('/api/familias')
      .then(async (res) => {
        if (!res.ok) {
          console.error('API familias GET error:', res.status, await res.text());
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.familias) {
          setFamilias(data.familias);
        }
      })
      .catch((err) => console.error('Fetch familias failed:', err));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/familias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const nueva: Familia = await res.json();
      setFamilias([...familias, nueva]);
      setForm({ nombre: '', fechaCreacion: '' });
    } else {
      console.error('API familias POST error:', res.status, await res.text());
    }
  };

  return (
    <div>
      <h1>Familias</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '1rem',
        }}
      >
        <input
          name="nombre"
          placeholder="Nombre de la familia"
          value={form.nombre}
          onChange={handleChange}
          required
          style={{ flex: '1 1 250px', padding: '0.5rem' }}
        />
        <input
          name="fechaCreacion"
          type="date"
          value={form.fechaCreacion}
          onChange={handleChange}
          required
          style={{ flex: '1 1 150px', padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Agregar Familia
        </button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem' }}>
              ID
            </th>
            <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem' }}>
              Nombre
            </th>
            <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem' }}>
              Fecha Creación
            </th>
          </tr>
        </thead>
        <tbody>
          {familias.map((f) => (
            <tr key={f.id}>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{f.id}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{f.nombre}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                {new Date(f.fechaCreacion).toLocaleDateString('es-CL')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}