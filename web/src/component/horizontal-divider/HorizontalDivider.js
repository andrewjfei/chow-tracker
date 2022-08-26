const styles = {
  horizontalDivider: 'w-full border border-stone-100',
};

const HorizontalDivider = ({ className }) => {
  return <div className={`${className} ${styles.horizontalDivider}`} />;
};

export { HorizontalDivider };
