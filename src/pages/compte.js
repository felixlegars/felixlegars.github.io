import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {useAuth} from '@site/src/contexts/AuthContext';
import styles from './auth.module.css';

export default function Compte() {
  const {configured, loading, user, profile, signOut} = useAuth();

  return (
    <Layout title="Mon compte" description="Gestion de ton compte élève">
      <main className="container margin-vert--lg">
        <div className={styles.card}>
          <span className={styles.icon} aria-hidden="true">
            👤
          </span>
          <h1>Mon compte</h1>
          {!configured && <p>Le service de comptes n’est pas configuré.</p>}
          {loading && <p>Chargement de la session…</p>}
          {!loading && !user && (
            <p>
              <Link to="/connexion">Connecte-toi</Link> pour accéder à ton
              espace personnel.
            </p>
          )}
          {user && (
            <>
              <p>
                Bienvenue {profile?.identifiant || 'élève'} !
              </p>
              <p>
                Rôle : <strong>{profile?.role || 'élève'}</strong>
              </p>
              <p>Ta progression sera sauvegardée ici au fil des cours.</p>
              <button type="button" onClick={signOut}>
                Se déconnecter
              </button>
            </>
          )}
        </div>
      </main>
    </Layout>
  );
}
