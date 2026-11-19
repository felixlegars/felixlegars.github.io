import {useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {useAuth} from '@site/src/contexts/AuthContext';
import styles from './auth.module.css';

export default function Connexion() {
  const {configured, loading, user, signIn} = useAuth();
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setMessage('');

    const result = await signIn(identifiant, password);

    if (result.error) {
      setError(result.error.message);
    } else {
      setMessage('Connexion réussie.');
    }
  }

  return (
    <Layout title="Connexion" description="Connexion à ton espace élève">
      <main className="container margin-vert--lg">
        <div className={styles.card}>
          <span className={styles.icon} aria-hidden="true">
            🔐
          </span>
          <h1>Se connecter</h1>
          {!configured && (
            <p className={styles.notice}>
              Supabase n’est pas encore configuré. Ajoute `SUPABASE_URL` et
              `SUPABASE_ANON_KEY` dans `.env.local`.
            </p>
          )}
          {user ? (
            <p>
              Tu es déjà connecté. Consulte ton <Link to="/compte">compte</Link>.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>
                Identifiant
                <input
                  type="text"
                  value={identifiant}
                  onChange={(event) => setIdentifiant(event.target.value)}
                  autoComplete="username"
                  required
                />
              </label>
              <label>
                Mot de passe
                <input
                  type="password"
                  minLength={6}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>
              <button type="submit" disabled={!configured || loading}>
                Se connecter
              </button>
              {error && <p className={styles.error}>{error}</p>}
              {message && <p className={styles.success}>{message}</p>}
            </form>
          )}
          <p className={styles.notice}>
            Les comptes sont créés par un professeur ou un administrateur.
          </p>
        </div>
      </main>
    </Layout>
  );
}
