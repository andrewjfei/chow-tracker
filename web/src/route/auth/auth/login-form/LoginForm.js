import { InputField, Button } from '../../../../component';
import { UserCircleIcon } from '../../../../asset';

const LoginForm = ({ onLogin }) => {
  return (
    <div className='flex flex-col'>
      <InputField
        className='mt-3'
        label='Username/Email'
        prefixIcon={<UserCircleIcon />}
        placeholder='Enter username or email address'
      />
      <InputField
        className='mt-3'
        label='Password'
        type='password'
        prefixIcon={<UserCircleIcon />}
        placeholder='Enter password'
      />
      <Button
        className='mt-10'
        variant='filled'
        colour='primary'
        type='button'
        onClick={onLogin}
      >
        Login
      </Button>
    </div>
  );
};

export { LoginForm };
