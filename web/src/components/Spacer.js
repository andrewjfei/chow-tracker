const styles = {
  sm: 'm-2',
  md: 'm-4',
  lg: 'm-6',
};

const Spacer = ({ size }) => {
  return <div className={`${styles[size]}`} />;
};

export { Spacer };
