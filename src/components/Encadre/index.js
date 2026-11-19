import clsx from 'clsx';
import styles from './styles.module.css';

const encadreConfig = {
  objectifs: {
    icon: '🎯',
    title: 'Objectifs',
  },
  vocabulaire: {
    icon: '📖',
    title: 'Vocabulaire',
  },
  attention: {
    icon: '⚠️',
    title: 'Attention',
  },
  exercice: {
    icon: '💡',
    title: 'Exercice',
  },
};

export default function Encadre({type, children}) {
  const config = encadreConfig[type] ?? encadreConfig.attention;

  return (
    <aside className={clsx(styles.encadre, styles[`encadre--${type}`])}>
      <div className={styles.header}>
        <span className={styles.icon} aria-hidden="true">
          {config.icon}
        </span>
        <strong>{config.title}</strong>
      </div>
      <div className={styles.content}>{children}</div>
    </aside>
  );
}
