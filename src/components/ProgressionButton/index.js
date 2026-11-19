import {useState} from 'react';
import Link from '@docusaurus/Link';
import {useAuth} from '@site/src/contexts/AuthContext';
import styles from './styles.module.css';

export default function ProgressionButton({lessonSlug}) {
  const {configured, user, saveProgress} = useAuth();
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');

  async function handleClick() {
    setError('');
    const {error: saveError} = await saveProgress(lessonSlug);
    if (saveError) {
      setError(saveError.message);
      return;
    }
    setCompleted(true);
  }

  if (!configured) {
    return null;
  }

  if (!user) {
    return (
      <p className={styles.loginMessage}>
        <Link to="/connexion">Connecte-toi</Link> pour enregistrer ta progression.
      </p>
    );
  }

  return (
    <div className={styles.wrapper}>
      <button type="button" onClick={handleClick} disabled={completed}>
        {completed ? '✅ Leçon terminée' : '✅ Marquer comme terminé'}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
