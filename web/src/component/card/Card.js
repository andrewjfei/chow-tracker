import styles from './Card.module.css';

const Card = ({ className, children, primary }) => {
  return (
    <div className={`${className} ${styles.card} ${primary && styles.primary}`}>
      {children}
    </div>
  );
};

export { Card };
