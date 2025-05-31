import React from 'react';
import { supabaseServer } from '@/utils/supabase/server'; 
import PacienteForm from './PacienteForm'; 

interface Paciente {
  id_paciente: number;
  nombre: string;
  rut: string;
  fecha_nacimiento: string;
  direccion: string;
  apellido_paterno: string;
  apellido_materno: string;
  genero: string;
  telefono: string;
}

const capitalizeWords = (str: string) =>
  str.replace(/\b\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());

export default async function Page() {
  const { data: filas, error } = await supabaseServer
    .from('paciente')
    .select(`
      id_paciente,
      nombre,
      rut,
      fecha_nacimiento,
      direccion,
      apellido_paterno,
      apellido_materno,
      genero,
      telefono
    `)
    .order('id_paciente', { ascending: true });

  if (error) {
    return (
      <div style={{ padding: '2rem', color: 'red' }}>
        <h1>Error cargando pacientes:</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  const pacientes: Paciente[] = (filas || []) as Paciente[];

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Pacientes</h1>
      <PacienteForm />
      <div className="pacientes-grid" style={{ marginTop: '1rem' }}>
        {pacientes.length > 0 ? (
          pacientes.map((p) => (
            <div key={p.id_paciente} className="patient-card">
              <h3>
                {capitalizeWords(p.nombre)}{' '}
                <small>
                  {capitalizeWords(p.apellido_paterno)}{' '}
                  {capitalizeWords(p.apellido_materno)}
                </small>
              </h3>
              <p>
                <strong>RUT:</strong> {p.rut}
              </p>
              <p>
                <strong>F. Nac.:</strong>{' '}
                {new Date(p.fecha_nacimiento).toLocaleDateString('es-CL')}
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
          ))
        ) : (
          <p>No hay pacientes aún.</p>
        )}
      </div>
    </main>
  );
}
