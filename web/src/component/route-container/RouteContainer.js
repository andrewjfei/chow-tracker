import styles from './RouteContainer.module.css';

const RouteContainer = ({ children }) => {
  return <div className={styles.routeContainer}>{children}</div>;
};

export { RouteContainer };
