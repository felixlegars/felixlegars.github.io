import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    icon: '📘',
    title: '1NSI',
    description: (
      <>
        Les cours de première NSI expliqués pas à pas.
      </>
    ),
  },
  {
    icon: '🌐',
    title: 'SNT',
    description: (
      <>
        Les sciences numériques et technologie au programme.
      </>
    ),
  },
  {
    icon: '🚀',
    title: 'TNSI',
    description: (
      <>
        Les cours de terminale NSI et leurs futurs chapitres.
      </>
    ),
  },
];

function Feature({icon, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon} aria-hidden="true">
          {icon}
        </div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
