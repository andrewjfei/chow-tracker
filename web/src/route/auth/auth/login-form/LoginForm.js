import { InputField, Button } from '../../../../component';
import { UserCircleIcon } from '../../../../asset';

const LoginForm = () => {
  return (
    <div style={{ border: 'solid 3px orange' }}>
      <p className='s2'>Login Form</p>
      <InputField label='Username/Email' prefixIcon={<UserCircleIcon />} />
      <InputField
        label='Password'
        prefixIcon={<UserCircleIcon />}
        suffixIcon={<UserCircleIcon />}
      />
      <Button text='Login' type='button' onClick={() => {}} />
    </div>
  );
};

export { LoginForm };
