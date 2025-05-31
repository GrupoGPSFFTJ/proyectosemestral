// frontend/app/pacientes/PacienteForm.tsx
'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function PacienteForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    rut: '',
    fechaNacimiento: '',
    direccion: '',
    genero: '',
    telefono: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/pacientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Error al crear paciente');
      }

      setForm({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        rut: '',
        fechaNacimiento: '',
        direccion: '',
        genero: '',
        telefono: '',
      });

      router.refresh();
    } catch (err: any) {
      console.error(err);
      alert('Error al crear paciente: ' + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1rem',
      }}
    >
      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        name="apellidoPaterno"
        placeholder="Apellido Paterno"
        value={form.apellidoPaterno}
        onChange={handleChange}
        required
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        name="apellidoMaterno"
        placeholder="Apellido Materno"
        value={form.apellidoMaterno}
        onChange={handleChange}
        required
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        name="rut"
        placeholder="RUT"
        value={form.rut}
        onChange={handleChange}
        required
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        name="fechaNacimiento"
        type="date"
        value={form.fechaNacimiento}
        onChange={handleChange}
        required
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        name="direccion"
        placeholder="Dirección"
        value={form.direccion}
        onChange={handleChange}
        required
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <select
        name="genero"
        value={form.genero}
        onChange={handleChange}
        required
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option value="">Género</option>
        <option value="M">Masculino</option>
        <option value="F">Femenino</option>
      </select>
      <input
        name="telefono"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={handleChange}
        required
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button
        type="submit"
        style={{
          gridColumn: '1 / -1',
          padding: '0.75rem',
          background: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '0.5rem',
        }}
      >
        Agregar Paciente
      </button>
    </form>
  );
}
