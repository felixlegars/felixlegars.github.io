import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {createSupabaseClient} from '@site/src/lib/supabase';

const AuthContext = createContext(null);

function toAuthEmail(identifiant) {
  return `${identifiant.trim().toLowerCase()}@comptes.local`;
}

export function AuthProvider({children}) {
  const {siteConfig} = useDocusaurusContext();
  const {supabaseUrl, supabaseAnonKey} = siteConfig.customFields ?? {};
  const supabase = useMemo(
    () => createSupabaseClient(supabaseUrl, supabaseAnonKey),
    [supabaseAnonKey, supabaseUrl],
  );
  const isSupabaseConfigured = Boolean(supabase);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) {
      return undefined;
    }

    let active = true;

    async function loadSession() {
      const {data, error} = await supabase.auth.getSession();
      if (error) {
        console.error('Impossible de récupérer la session Supabase.', error);
      }
      if (active) {
        setSession(data.session);
        setLoading(false);
      }
    }

    loadSession();

    const {data: listener} = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession);
        setLoading(false);
      },
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!supabase || !session?.user) {
      setProfile(null);
      return undefined;
    }

    let active = true;

    async function loadProfile() {
      const {data, error} = await supabase
        .from('profiles')
        .select('id, identifiant, role')
        .eq('id', session.user.id)
        .maybeSingle();

      if (error) {
        console.error('Impossible de récupérer le profil utilisateur.', error);
      }
      if (active) {
        setProfile(data);
      }
    }

    loadProfile();
    return () => {
      active = false;
    };
  }, [session]);

  const value = useMemo(
    () => ({
      configured: isSupabaseConfigured,
      loading,
      session,
      user: session?.user ?? null,
      profile,
      signIn: (identifiant, password) =>
        supabase.auth.signInWithPassword({
          email: toAuthEmail(identifiant),
          password,
        }),
      signOut: () => supabase.auth.signOut(),
      saveProgress: async (lessonSlug, completed = true) => {
        if (!session?.user) {
          throw new Error('Une session est nécessaire pour sauvegarder la progression.');
        }
        return supabase.from('progress').upsert(
          {
            user_id: session.user.id,
            lesson_slug: lessonSlug,
            completed,
            updated_at: new Date().toISOString(),
          },
          {onConflict: 'user_id,lesson_slug'},
        );
      },
    }),
    [loading, profile, session, supabase],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider.');
  }
  return context;
}
