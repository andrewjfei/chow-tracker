import styles from './Button.module.css';

const Button = ({ className, text, type, variant, colour, onClick }) => {
  return (
    <button
      className={`
        ${className} 
        ${styles.button} 
        ${styles[variant]} 
        ${styles[colour]} 
        p2
      `}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { Button };
