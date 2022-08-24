import { InputField, Button } from '../../../../component';
import { UserCircleIcon } from '../../../../asset';

const RegisterForm = () => {
  return (
    <div className='flex flex-col'>
      <InputField
        className='mt-3'
        label='Username'
        prefixIcon={<UserCircleIcon />}
        placeholder='Enter a username'
      />
      <InputField
        className='mt-3'
        label='Full Name'
        prefixIcon={<UserCircleIcon />}
        placeholder='Enter your full name'
      />
      <InputField
        className='mt-3'
        label='Email'
        prefixIcon={<UserCircleIcon />}
        placeholder='Enter your email address'
      />
      <InputField
        className='mt-3'
        label='Password'
        type='password'
        prefixIcon={<UserCircleIcon />}
        placeholder='Enter password'
      />
      <InputField
        className='mt-3'
        label='Confirm Password'
        type='password'
        prefixIcon={<UserCircleIcon />}
        placeholder='Confirm password'
      />
      <Button
        className='mt-10'
        variant='filled'
        colour='primary'
        type='button'
        onClick={() => {}}
      >
        Register
      </Button>
    </div>
  );
};

export { RegisterForm };
