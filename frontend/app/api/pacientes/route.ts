import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    const { data: pacientes, error } = await supabase
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

    if (error) throw error;

    const mapped = (pacientes || []).map((p) => ({
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

    return NextResponse.json({ pacientes: mapped });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
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

    const { data: created, error } = await supabase
      .from('paciente')
      .insert({
        nombre,
        rut,
        fecha_nacimiento: fechaNacimiento,
        direccion,
        apellido_paterno: apellidoPaterno,
        apellido_materno: apellidoMaterno,
        genero,
        telefono,
      })
      .select()
      .single(); 

    if (error) throw error;

    const nuevoPaciente = {
      id: (created as any).id_paciente,
      nombre: (created as any).nombre,
      rut: (created as any).rut,
      fechaNacimiento: (created as any).fecha_nacimiento,
      direccion: (created as any).direccion,
      apellidoPaterno: (created as any).apellido_paterno,
      apellidoMaterno: (created as any).apellido_materno,
      genero: (created as any).genero,
      telefono: (created as any).telefono,
    };

    return NextResponse.json(nuevoPaciente, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
