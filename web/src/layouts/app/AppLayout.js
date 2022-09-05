import styles from './AppLayout.module.less';

const AppLayout = ({ children }) => {
  return <div className={`${styles.appLayout}`}>{children}</div>;
};

export { AppLayout };
