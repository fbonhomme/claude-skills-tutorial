import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Apprentissage Progressif',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Partez des bases avec des exemples simples, puis progressez vers des
        skills avancés. Chaque concept est expliqué de manière claire et pratique.
      </>
    ),
  },
  {
    title: 'Exemples Concrets',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Plus de 20 exemples de skills prêts à l&apos;emploi : Git, tests, documentation,
        sécurité, DevOps. Copiez-les et adaptez-les à vos besoins.
      </>
    ),
  },
  {
    title: 'Techniques Avancées',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Maîtrisez les patterns avancés, l&apos;optimisation des prompts,
        la gestion d&apos;erreurs et créez des workflows sophistiqués.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
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
