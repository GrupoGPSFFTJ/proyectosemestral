'use client';

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

interface FichaClinica {
  id: number;
  fechaControl: string;
  observacion: string;
  idPaciente: number;
  idProgramaControl: number;
  idCentroSalud: number;
  idUsuarioResponsable: number;
}

export default function FichasClinicaPage() {
  const [fichas, setFichas] = useState<FichaClinica[]>([]);
  const [form, setForm] = useState({
    fechaControl: '',
    observacion: '',
    idPaciente: '',
    idProgramaControl: '',
    idCentroSalud: '',
    idUsuarioResponsable: '',
  });

  // 1) Carga inicial de fichas
  useEffect(() => {
    fetch('/api/fichas-clinica')
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => {
        if (data?.fichas) {
          setFichas(data.fichas);
        }
      })
      .catch((err) => console.error('GET fichas error:', err));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      fechaControl: form.fechaControl,
      observacion: form.observacion,
      idPaciente: Number(form.idPaciente),
      idProgramaControl: Number(form.idProgramaControl),
      idCentroSalud: Number(form.idCentroSalud),
      idUsuarioResponsable: Number(form.idUsuarioResponsable),
    };

    const res = await fetch('/api/fichas-clinica', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const nueva: FichaClinica = await res.json();
      setFichas([...fichas, nueva]);
      setForm({
        fechaControl: '',
        observacion: '',
        idPaciente: '',
        idProgramaControl: '',
        idCentroSalud: '',
        idUsuarioResponsable: '',
      });
    } else {
      console.error('POST fichas error:', await res.text());
    }
  };

  return (
    <div>
      <h1>Fichas Clínicas</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}
      >
        <input
          name="fechaControl"
          type="date"
          placeholder="Fecha Control"
          value={form.fechaControl}
          onChange={handleChange}
          required
          style={{ flex: '1 1 150px', padding: '0.5rem' }}
        />
        <input
          name="observacion"
          placeholder="Observación"
          value={form.observacion}
          onChange={handleChange}
          required
          style={{ flex: '2 1 300px', padding: '0.5rem' }}
        />
        <input
          name="idPaciente"
          type="number"
          placeholder="ID Paciente"
          value={form.idPaciente}
          onChange={handleChange}
          required
          style={{ flex: '1 1 120px', padding: '0.5rem' }}
        />
        <input
          name="idProgramaControl"
          type="number"
          placeholder="ID Programa"
          value={form.idProgramaControl}
          onChange={handleChange}
          required
          style={{ flex: '1 1 120px', padding: '0.5rem' }}
        />
        <input
          name="idCentroSalud"
          type="number"
          placeholder="ID Centro Salud"
          value={form.idCentroSalud}
          onChange={handleChange}
          required
          style={{ flex: '1 1 120px', padding: '0.5rem' }}
        />
        <input
          name="idUsuarioResponsable"
          type="number"
          placeholder="ID Usuario Resp."
          value={form.idUsuarioResponsable}
          onChange={handleChange}
          required
          style={{ flex: '1 1 140px', padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Agregar
        </button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem' }}>
              ID
            </th>
            <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem' }}>
              Fecha Control
            </th>
            <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem' }}>
              Observación
            </th>
            <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem' }}>
              ID Paciente
            </th>
            <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem' }}>
              ID Programa
            </th>
            <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem' }}>
              ID Centro
            </th>
            <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc', padding: '0.5rem' }}>
              ID Usuario Resp.
            </th>
          </tr>
        </thead>
        <tbody>
          {fichas.map((f) => (
            <tr key={f.id}>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{f.id}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                {new Date(f.fechaControl).toLocaleDateString('es-CL')}
              </td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{f.observacion}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{f.idPaciente}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{f.idProgramaControl}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{f.idCentroSalud}</td>
              <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{f.idUsuarioResponsable}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
