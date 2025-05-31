import { createClient } from '@supabase/supabase-js';

// Extraemos las variables de entorno UNA SOLA VEZ
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Creamos el cliente
export const supabaseServer = createClient(supabaseUrl, supabaseKey);
