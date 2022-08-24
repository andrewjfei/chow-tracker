const styles = {
  card: {
    base: 'p-5 border-2 rounded-lg',
    filled: 'bg-white border-transparent drop-shadow-sm',
    outline: 'bg-stone-50 border-stone-300',
  },
};

const Card = ({ className, children, variant = 'filled' }) => {
  return (
    <div className={`${className} ${styles.card.base} ${styles.card[variant]}`}>
      {children}
    </div>
  );
};

export { Card };
