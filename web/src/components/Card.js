const styles = {
  card: {
    base: 'flex flex-col p-5 border-2 rounded-lg',
    filled: {
      default: 'bg-white border-transparent drop-shadow-sm',
      primary: 'bg-white border-transparent drop-shadow-md',
    },
    outline: {
      default: 'bg-stone-50 border-stone-300',
      primary: 'bg-orange-50 border-orange-200',
    },
  },
};

const Card = ({
  className,
  children,
  variant = 'filled',
  colour = 'primary',
}) => {
  return (
    <div
      className={`${className} ${styles.card.base} ${styles.card[variant][colour]}`}
    >
      {children}
    </div>
  );
};

export { Card };
