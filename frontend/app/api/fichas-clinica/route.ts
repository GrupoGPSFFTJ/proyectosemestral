import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ fichas: [] });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data: filas, error } = await supabase
      .from('ficha_control')
      .select(`
        id_ficha_control,
        fecha_control,
        observacion,
        id_paciente,
        id_programa_control,
        id_centro_salud,
        id_usuario_responsable
      `)
      .order('id_ficha_control', { ascending: true });

    if (error) throw error;

    const fichas = (filas || []).map((f: any) => ({
      id: f.id_ficha_control,
      fechaControl: f.fecha_control,
      observacion: f.observacion,
      idPaciente: f.id_paciente,
      idProgramaControl: f.id_programa_control,
      idCentroSalud: f.id_centro_salud,
      idUsuarioResponsable: f.id_usuario_responsable,
    }));

    return NextResponse.json({ fichas });
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
    const {
      fechaControl,
      observacion,
      idPaciente,
      idProgramaControl,
      idCentroSalud,
      idUsuarioResponsable,
    } = await req.json();

    const { data: created, error } = await supabase
      .from('ficha_control')
      .insert({
        fecha_control: fechaControl,
        observacion,
        id_paciente: idPaciente,
        id_programa_control: idProgramaControl,
        id_centro_salud: idCentroSalud,
        id_usuario_responsable: idUsuarioResponsable,
      })
      .select('*')
      .single();

    if (error) throw error;

    const nuevaFicha = {
      id: (created as any).id_ficha_control,
      fechaControl: (created as any).fecha_control,
      observacion: (created as any).observacion,
      idPaciente: (created as any).id_paciente,
      idProgramaControl: (created as any).id_programa_control,
      idCentroSalud: (created as any).id_centro_salud,
      idUsuarioResponsable: (created as any).id_usuario_responsable,
    };

    return NextResponse.json(nuevaFicha, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
