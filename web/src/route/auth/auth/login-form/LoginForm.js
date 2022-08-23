import { InputField, Button } from '../../../../component';
import { UserCircleIcon } from '../../../../asset';

import styles from './LoginForm.module.css';

const LoginForm = () => {
  return (
    <div className={styles.loginForm}>
      <InputField
        label='Username/Email'
        prefixIcon={<UserCircleIcon />}
        placeholder='Enter username or email address'
      />
      <InputField
        label='Password'
        type='password'
        prefixIcon={<UserCircleIcon />}
        placeholder='Enter password'
      />
      <Button
        className={styles.loginButton}
        variant='filled'
        colour='primary'
        text='Login'
        type='button'
        onClick={() => {}}
      />
    </div>
  );
};

export { LoginForm };
