const styles = {
  verticalDivider: 'h-10 border border-stone-100',
};

const VerticalDivider = ({ className }) => {
  return <div className={`${className} ${styles.verticalDivider}`} />;
};

export { VerticalDivider };
