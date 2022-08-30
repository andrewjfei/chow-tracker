import { InputField, Button, Spacer, CheckBox } from '../../../components';
import { updateAuthUser } from '../../../redux/slice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useLoginMutation } from '../../../redux/slice/ApiSlice';
import { isValidEmail } from '../../../utils';

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
    <>
      <InputField
        type='text'
        placeholder='Username/Email'
        value={usernameOrEmailValue}
        onChange={setUsernameOrEmailValue}
      />
      <Spacer size='sm' />
      <InputField
        type='password'
        placeholder='Password'
        value={passwordValue}
        onChange={setPasswordValue}
      />
      <Spacer size='sm' />
      <CheckBox label='Remember me' />
      <Spacer size='md' />
      <Button variant='filled' colour='primary' type='button' onClick={onLogin}>
        Login
      </Button>
    </>
  );
};

export { LoginForm };
