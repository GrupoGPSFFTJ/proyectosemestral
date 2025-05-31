// frontend/app/api/fichas-clinica/route.ts
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { rows } = await pool.query(`
      SELECT
        id_ficha_control     AS id,
        fecha_control        AS "fechaControl",
        observacion,
        id_paciente          AS "idPaciente",
        id_programa_control  AS "idProgramaControl",
        id_centro_salud      AS "idCentroSalud",
        id_usuario_responsable AS "idUsuarioResponsable"
      FROM ficha_control
      ORDER BY id_ficha_control
    `);
    return NextResponse.json({ fichas: rows });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const {
      fechaControl,
      observacion,
      idPaciente,
      idProgramaControl,
      idCentroSalud,
      idUsuarioResponsable,
    } = await req.json();

    const { rows } = await pool.query(
      `
      INSERT INTO ficha_control
        (fecha_control, observacion, id_paciente,
         id_programa_control, id_centro_salud, id_usuario_responsable)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING
        id_ficha_control     AS id,
        fecha_control        AS "fechaControl",
        observacion,
        id_paciente          AS "idPaciente",
        id_programa_control  AS "idProgramaControl",
        id_centro_salud      AS "idCentroSalud",
        id_usuario_responsable AS "idUsuarioResponsable"
      `,
      [
        fechaControl,
        observacion,
        idPaciente,
        idProgramaControl,
        idCentroSalud,
        idUsuarioResponsable,
      ]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
