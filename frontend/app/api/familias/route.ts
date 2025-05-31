// frontend/app/api/familias/route.ts
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { rows } = await pool.query(`
      SELECT
        id_familia    AS id,
        nombre,
        fecha_creacion AS "fechaCreacion"
      FROM familia
      ORDER BY id_familia
    `);
    return NextResponse.json({ familias: rows });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { nombre, fechaCreacion } = await req.json();
    const { rows } = await pool.query(
      `
      INSERT INTO familia (nombre, fecha_creacion)
      VALUES ($1, $2)
      RETURNING
        id_familia    AS id,
        nombre,
        fecha_creacion AS "fechaCreacion"
      `,
      [nombre, fechaCreacion]
    );
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
