import { RouteContainer } from '../../component/route-container/RouteContainer';
import { Auth } from './auth/Auth';
import styles from './AuthRoute.module.css';

const AuthRoute = () => {
  return (
    <RouteContainer>
      <div className={styles.authColumn}>
        <Auth className={styles.auth} />
      </div>
      <div className={styles.imageColumn}>
        <div className={styles.image} style={{ border: 'solid 3px orange' }}>
          Image
        </div>
      </div>
    </RouteContainer>
  );
};

export { AuthRoute };
