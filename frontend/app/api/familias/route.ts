import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ familias: [] });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data: filas, error } = await supabase
      .from('familia')
      .select('id_familia, nombre, fecha_creacion')
      .order('id_familia', { ascending: true });

    if (error) throw error;

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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Variables de entorno no definidas' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

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
