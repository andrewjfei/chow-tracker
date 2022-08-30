const styles = {
  routeContainer: 'grid grid-cols-layout gap-5 h-screen p-5 bg-gray-100',
};

const RouteContainer = ({ className, children }) => {
  return (
    <div className={`${className} ${styles.routeContainer}`}>{children}</div>
  );
};

export { RouteContainer };
