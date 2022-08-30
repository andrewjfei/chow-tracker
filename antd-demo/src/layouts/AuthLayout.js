import styles from './AuthLayout.module.less';

const AuthLayout = ({ className, children }) => {
  return <div className={`${styles.authLayout}`}>{children}</div>;
};

export { AuthLayout };
