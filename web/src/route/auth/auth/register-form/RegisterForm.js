import { InputField, Button } from '../../../../component';
import { UserCircleIcon } from '../../../../asset';

import styles from './RegisterForm.module.css';

const RegisterForm = () => {
  return (
    <div className={styles.registerForm}>
      <InputField
        label='Username'
        prefixIcon={<UserCircleIcon />}
        placeholder='Enter username or email address'
      />
      <InputField
        label='Full Name'
        prefixIcon={<UserCircleIcon />}
        placeholder='Enter username or email address'
      />
      <InputField
        label='Email'
        prefixIcon={<UserCircleIcon />}
        placeholder='Enter username or email address'
      />
      <InputField
        label='Password'
        type='password'
        prefixIcon={<UserCircleIcon />}
        placeholder='Enter password'
      />
      <InputField
        label='Confirm Password'
        type='password'
        prefixIcon={<UserCircleIcon />}
        placeholder='Confirm password'
      />
      <Button
        className={styles.registerButton}
        variant='filled'
        colour='primary'
        text='Register'
        type='button'
        onClick={() => {}}
      />
    </div>
  );
};

export { RegisterForm };
