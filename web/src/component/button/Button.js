const styles = {
  button: {
    base: 'flex flex-row justify-center items-center px-4 py-2 border-2 rounded-lg text-sm font-regular transition-colors hover:cursor-pointer focus:outline-none focus:border-orange-600',
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
        'bg-transparent border-transparent text-stone-500 hover:bg-stone-300/30 focus:border-transparent focus:bg-stone-300/30',
      primary:
        'bg-transparent border-transparent text-orange-500 hover:bg-orange-300/30 focus:border-transparent focus:bg-orange-300/30',
    },
  },
};

const Button = ({
  className,
  children,
  type,
  variant = 'filled',
  colour = 'primary',
  onClick,
}) => {
  return (
    <button
      className={`${className} ${styles.button.base} ${styles.button[variant][colour]}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
