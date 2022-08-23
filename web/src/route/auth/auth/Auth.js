import { Card } from '../../../component';
import styles from './Auth.module.css';
import { LoginForm } from './login-form/LoginForm';

const Auth = ({ className }) => {
  return (
    <Card className={`${className} ${styles.authContainer}`}>
      <div className={styles.logoContainer}>Logo</div>
      <div className={styles.authFormContainer}>
        <div className={styles.authFormButtonRow}>Button Row</div>
        <LoginForm />
      </div>
    </Card>
  );
};

export { Auth };
