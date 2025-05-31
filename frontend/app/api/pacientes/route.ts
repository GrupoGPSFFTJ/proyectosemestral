import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ pacientes: [] });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: filas, error } = await supabase
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const pacientes = (filas || []).map((p: any) => ({
    id: p.id_paciente,
    nombre: p.nombre,
    rut: p.rut,
    fechaNacimiento: p.fecha_nacimiento,
    direccion: p.direccion,
    apellidoPaterno: p.apellido_paterno,
    apellidoMaterno: p.apellido_materno,
    genero: p.genero,
    telefono: p.telefono,
  }));

  return NextResponse.json({ pacientes });
}

export async function POST(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Variables de entorno no definidas' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      rut,
      fechaNacimiento,
      direccion,
      genero,
      telefono,
    } = await req.json();

    const { data: created, error } = await supabase
      .from('paciente')
      .insert({
        nombre,
        apellido_paterno: apellidoPaterno,
        apellido_materno: apellidoMaterno,
        rut,
        fecha_nacimiento: fechaNacimiento,
        direccion,
        genero,
        telefono,
      })
      .select('*')
      .single();

    if (error) throw error;

    return NextResponse.json(
      {
        id: (created as any).id_paciente,
        nombre: (created as any).nombre,
        rut: (created as any).rut,
        fechaNacimiento: (created as any).fecha_nacimiento,
        direccion: (created as any).direccion,
        apellidoPaterno: (created as any).apellido_paterno,
        apellidoMaterno: (created as any).apellido_materno,
        genero: (created as any).genero,
        telefono: (created as any).telefono,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
