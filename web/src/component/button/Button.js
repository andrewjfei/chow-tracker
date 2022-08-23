// import styles from './Button.module.css';

const Button = ({
  className,
  text,
  type,
  variant = 'filled',
  colour = 'primary',
  onClick,
}) => {
  const styles = {
    button: {
      base: 'px-4 py-2 border-2 rounded-lg text-base font-regular transition-colors hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-600',
      filled: {
        default:
          'bg-stone-500 border-stone-500 text-white hover:bg-stone-600 hover:border-stone-600',
        primary:
          'bg-orange-400 border-orange-400 text-white hover:bg-orange-500 hover:border-orange-500',
      },
      outline: {
        default:
          'bg-stone-100 border-stone-300 text-stone-500 hover:bg-stone-200 hover:border-stone-400',
        primary:
          'bg-orange-50 border-orange-300 text-orange-500 hover:bg-orange-100 hover:border-orange-400',
      },
      text: {
        default:
          'bg-transparent border-transparent text-stone-500 hover:bg-stone-300/10 hover:border-stone-50/10',
        primary:
          'bg-transparent border-transparent text-orange-500 hover:bg-orange-300/10 hover:border-orange-50/10',
      },
    },
  };

  return (
    <button
      className={`${styles.button.base} ${styles.button[variant][colour]}`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { Button };
