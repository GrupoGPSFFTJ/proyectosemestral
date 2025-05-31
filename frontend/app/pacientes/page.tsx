'use client';

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

interface Paciente {
  id: number;
  nombre: string;
  rut: string;
  fechaNacimiento: string;
  direccion: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  genero: string;
  telefono: string;
}

const capitalizeWords = (str: string) =>
  str.replace(/\b\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
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

  useEffect(() => {
    fetch('/api/pacientes')
      .then(async (res) => {
        if (!res.ok) {
          console.error('API error:', res.status, await res.text());
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.pacientes) {
          setPacientes(data.pacientes);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/pacientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const nuevo: Paciente = await res.json();
      setPacientes([...pacientes, nuevo]);
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
    } else {
      console.error('Create failed:', await res.text());
    }
  };

  return (
    <div>
      <h1>Pacientes</h1>

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
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          style={{ flex: '1 1 200px', padding: '0.5rem' }}
        />
        <input
          name="apellidoPaterno"
          placeholder="Apellido Paterno"
          value={form.apellidoPaterno}
          onChange={handleChange}
          required
          style={{ flex: '1 1 150px', padding: '0.5rem' }}
        />
        <input
          name="apellidoMaterno"
          placeholder="Apellido Materno"
          value={form.apellidoMaterno}
          onChange={handleChange}
          required
          style={{ flex: '1 1 150px', padding: '0.5rem' }}
        />
        <input
          name="rut"
          placeholder="RUT"
          value={form.rut}
          onChange={handleChange}
          required
          style={{ flex: '1 1 150px', padding: '0.5rem' }}
        />
        <input
          name="fechaNacimiento"
          type="date"
          value={form.fechaNacimiento}
          onChange={handleChange}
          required
          style={{ flex: '1 1 150px', padding: '0.5rem' }}
        />
        <input
          name="direccion"
          placeholder="Dirección"
          value={form.direccion}
          onChange={handleChange}
          required
          style={{ flex: '1 1 200px', padding: '0.5rem' }}
        />
        <select
          name="genero"
          value={form.genero}
          onChange={handleChange}
          required
          style={{ flex: '1 1 100px', padding: '0.5rem' }}
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
          style={{ flex: '1 1 150px', padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Agregar
        </button>
      </form>

      <div className="pacientes-grid">
        {pacientes.map((p) => (
          <div key={p.id} className="patient-card">
            <h3>
              {capitalizeWords(p.nombre)}{' '}
              <small>
                {capitalizeWords(p.apellidoPaterno)}{' '}
                {capitalizeWords(p.apellidoMaterno)}
              </small>
            </h3>
            <p>
              <strong>RUT:</strong> {p.rut}
            </p>
            <p>
              <strong>F. Nac.:</strong>{' '}
              {new Date(p.fechaNacimiento).toLocaleDateString('es-CL')}
            </p>
            <p>
              <strong>Género:</strong>{' '}
              {p.genero === 'M' ? 'Masculino' : 'Femenino'}
            </p>
            <p>
              <strong>Teléfono:</strong> {p.telefono}
            </p>
            <p>
              <strong>Dirección:</strong> {capitalizeWords(p.direccion)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
