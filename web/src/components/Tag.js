const styles = {
  tag: {
    base: 'flex items-center px-2 py-1 rounded-md text-tag font-regular',
    outline: {
      primary: 'bg-orange-50 border border-orange-300 text-orange-500',
    },
  },
};

const Tag = ({ className, text, variant = 'outline', colour = 'primary' }) => {
  return (
    <div
      className={`${className} ${styles.tag.base} ${styles.tag[variant][colour]}`}
    >
      {text}
    </div>
  );
};

export { Tag };
