// Cliente de Supabase: la conexión a la base de datos compartida en la nube.
// Las dos variables de entorno vienen del archivo .env.local (no se sube a
// GitHub — ver .gitignore) y, en producción, de las variables de entorno
// configuradas en Vercel.
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // No lanzamos un error duro para no romper el build si faltan por un
  // instante; en cambio, se ve claro en la consola del navegador qué falta.
  // eslint-disable-next-line no-console
  console.error(
    'Faltan las variables de entorno de Supabase (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). ' +
      'Revisa tu archivo .env.local (en local) o las variables de entorno del proyecto en Vercel (en producción).'
  );
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
