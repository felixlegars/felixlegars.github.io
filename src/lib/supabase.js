import {createClient} from '@supabase/supabase-js';

export function createSupabaseClient(url, anonKey) {
  if (!url || !anonKey) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return null;
    }
  } catch {
    return null;
  }

  return createClient(url, anonKey);
}
