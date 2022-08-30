import { InputField, Button } from '../../../components';

const RegisterForm = () => {
  return (
    <div className='flex flex-col'>
      <InputField
        className='mt-3'
        label='Username'
        placeholder='Enter a username'
      />
      <InputField
        className='mt-3'
        label='Full Name'
        placeholder='Enter your full name'
      />
      <InputField
        className='mt-3'
        label='Email'
        placeholder='Enter your email address'
      />
      <InputField
        className='mt-3'
        label='Password'
        type='password'
        placeholder='Enter password'
      />
      <InputField
        className='mt-3'
        label='Confirm Password'
        type='password'
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
