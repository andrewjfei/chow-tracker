import { Auth } from './auth/Auth';
import styles from './AuthRoute.module.css';

const AuthRoute = () => {
  return (
    <div className={styles.routeContainer}>
      <div className={styles.authColumn}>
        <Auth className={styles.auth} />
      </div>
      <div className={styles.imageColumn}>
        <div className={styles.image} style={{ border: 'solid 3px orange' }}>
          Image
        </div>
      </div>
    </div>
  );
};

export { AuthRoute };
