import { InputField, Button } from '../../../../component';
import { UserCircleIcon } from '../../../../asset';
import { updateAuthUser } from '../../../../redux/slice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useLoginMutation } from '../../../../redux/slice/ApiSlice';
import { isValidEmail } from '../../../../util';

const LoginForm = () => {
  const [usernameOrEmailValue, setUsernameOrEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updatePost] = useLoginMutation();

  const onLogin = () => {
    const loginBody = {};
    if (isValidEmail(usernameOrEmailValue)) {
      loginBody.email = usernameOrEmailValue;
    } else {
      loginBody.username = usernameOrEmailValue;
    }
    loginBody.password = passwordValue;
    updatePost(loginBody).then(({ error, data, status }) => {
      if (error) {
        console.log(error);
        return;
      }

      localStorage.setItem('accessToken', data.token);
      dispatch(updateAuthUser(data));
      navigate('/app');
    });
  };

  return (
    <div className='flex flex-col'>
      <InputField
        className='mt-3'
        label='Username/Email'
        prefixIcon={<UserCircleIcon />}
        placeholder='Enter username or email address'
        value={usernameOrEmailValue}
        onChange={setUsernameOrEmailValue}
      />
      <InputField
        className='mt-3'
        label='Password'
        type='password'
        prefixIcon={<UserCircleIcon />}
        placeholder='Enter password'
        value={passwordValue}
        onChange={setPasswordValue}
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
