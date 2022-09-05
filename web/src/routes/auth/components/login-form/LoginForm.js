import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Checkbox, Input, Button, Space, Alert } from 'antd';

import {
  useLoginUserMutation,
  setUser,
  setAuthError,
} from '../../../../redux/slices';
import { FormTextButtonRow } from '../form-text-button-row/FormTextButtonRow';
import { isEmail } from '../../../../utils/inputUtil';
import { constants } from '../../../../constants';

import styles from './LoginForm.module.less';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authError } = useSelector((state) => state.auth);

  const [loginUser] = useLoginUserMutation();

  const onAlertClose = () => {
    dispatch(setAuthError(null));
  };

  const onRegisterHereClick = () => {
    navigate('/auth/register');
  };

  const onLogin = (values) => {
    const authCredentials = {
      password: values.password,
    };

    if (isEmail(values.usernameOrEmail)) {
      authCredentials.email = values.usernameOrEmail;
    } else {
      authCredentials.username = values.usernameOrEmail;
    }

    loginUser(authCredentials).then(({ data, error }) => {
      if (error) {
        // TODO: Logout user and display error modal
        console.log(error);
        dispatch(setAuthError(error.data));
        return;
      }

      dispatch(setUser(data));
      localStorage.setItem(constants.localStorage.tokenKey, data.token);
      navigate('/app');
      dispatch(setAuthError(null));
    });
  };

  return (
    <Form
      name='login-form'
      initialValues={{
        checkbox: true,
      }}
      onFinish={onLogin}
      autoComplete='off'
      className={`${styles.loginForm}`}
    >
      <Space
        direction='vertical'
        size='middle'
        className={`${styles.formItem}`}
      >
        {authError && (
          <Alert
            type='error'
            afterClose={onAlertClose}
            showIcon
            message={authError.description}
            closable
          />
        )}
        <Form.Item name='usernameOrEmail' noStyle={true}>
          <Input placeholder='Username/Email' type='text' />
        </Form.Item>
        <Form.Item name='password' noStyle={true}>
          <Input placeholder='Password' type='password' />
        </Form.Item>
        <Form.Item name='checkbox' valuePropName='checked' noStyle={true}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className={`${styles.loginButton}`}
        >
          Login
        </Button>
        <FormTextButtonRow
          text='Dont have an account?'
          buttonText='Register here'
          onClick={onRegisterHereClick}
        />
      </Space>
    </Form>
  );
};

export { LoginForm };
