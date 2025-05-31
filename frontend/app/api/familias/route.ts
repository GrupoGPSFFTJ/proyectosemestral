import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    // Traer todas las filas de la tabla 'familia'
    const { data: filas, error } = await supabase
      .from('familia')
      .select(`
        id_familia,
        nombre,
        fecha_creacion
      `)
      .order('id_familia', { ascending: true });

    if (error) throw error;

    // Mapear la respuesta a { id, nombre, fechaCreacion }
    const familias = (filas || []).map((f: any) => ({
      id: f.id_familia,
      nombre: f.nombre,
      fechaCreacion: f.fecha_creacion,
    }));

    return NextResponse.json({ familias });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { nombre, fechaCreacion } = await req.json();

    const { data: created, error } = await supabase
      .from('familia')
      .insert({
        nombre,
        fecha_creacion: fechaCreacion,
      })
      .select('*')
      .single();

    if (error) throw error;

    // Mapear la fila recién creada
    const nuevaFamilia = {
      id: (created as any).id_familia,
      nombre: (created as any).nombre,
      fechaCreacion: (created as any).fecha_creacion,
    };

    return NextResponse.json(nuevaFamilia, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}