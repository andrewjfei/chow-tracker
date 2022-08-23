import { useState } from 'react';
import { Card, Button } from '../../../component';
import styles from './Auth.module.css';
import { LoginForm } from './login-form/LoginForm';
import { RegisterForm } from './register-form/RegisterForm';

const Auth = ({ className }) => {
  const [isLoginFormSelected, setIsLoginFormSelected] = useState(true);

  return (
    <Card className={`${className} ${styles.authContainer}`}>
      <div className={styles.logoContainer}>Logo</div>
      <div className={styles.authFormContainer}>
        <div className={styles.authFormButtonRow}>
          <Button
            text='Login'
            variant='text'
            colour='default'
            onClick={() => setIsLoginFormSelected(true)}
          />
          <Button
            text='Register'
            variant='text'
            colour='default'
            onClick={() => setIsLoginFormSelected(false)}
          />
        </div>
        {isLoginFormSelected ? <LoginForm /> : <RegisterForm />}
      </div>
    </Card>
  );
};

export { Auth };
