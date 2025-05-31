// frontend/app/api/pacientes/route.ts
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { rows } = await pool.query(`
      SELECT
        id_paciente    AS id,
        nombre,
        rut,
        fecha_nacimiento AS "fechaNacimiento",
        direccion,
        apellido_paterno   AS "apellidoPaterno",
        apellido_materno   AS "apellidoMaterno",
        genero,
        telefono
      FROM paciente
      ORDER BY id_paciente
    `);
    return NextResponse.json({ pacientes: rows });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const {
      nombre,
      rut,
      fechaNacimiento,
      direccion,
      apellidoPaterno,
      apellidoMaterno,
      genero,
      telefono,
    } = await req.json();

    const { rows } = await pool.query(
      `
      INSERT INTO paciente
        (nombre, rut, fecha_nacimiento,
         direccion, apellido_paterno, apellido_materno,
         genero, telefono)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING
        id_paciente        AS id,
        nombre,
        rut,
        fecha_nacimiento  AS "fechaNacimiento",
        direccion,
        apellido_paterno   AS "apellidoPaterno",
        apellido_materno   AS "apellidoMaterno",
        genero,
        telefono
      `,
      [
        nombre,
        rut,
        fechaNacimiento,
        direccion,
        apellidoPaterno,
        apellidoMaterno,
        genero,
        telefono,
      ]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
