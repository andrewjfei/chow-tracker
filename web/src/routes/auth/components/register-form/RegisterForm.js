import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Space, Alert } from 'antd';

import {
  useRegisterUserMutation,
  setUser,
  setAuthError,
} from '../../../../redux/slices';
import { FormTextButtonRow } from '../form-text-button-row/FormTextButtonRow';
import { isEmail, splitBy } from '../../../../utils/inputUtil';
import { constants } from '../../../../constants';

import styles from './RegisterForm.module.less';

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authError } = useSelector((state) => state.auth);

  const [registerUser] = useRegisterUserMutation();

  const onAlertClose = () => {
    dispatch(setAuthError(null));
  };

  const onLoginHereClick = () => {
    navigate('/auth/login');
  };

  const onRegister = (values) => {
    if (
      !values.username ||
      !values.fullName ||
      !values.email ||
      !values.password ||
      !values.confirmedPassword
    ) {
      dispatch(
        setAuthError({ code: -1, description: 'All fields are required.' })
      );
      return;
    }

    const [firstName, lastName] = splitBy(values.fullName, ' ');

    if (!firstName || !lastName) {
      dispatch(
        setAuthError({ code: -1, description: 'Full name must be provided.' })
      );
      return;
    }

    if (!isEmail(values.email)) {
      dispatch(
        setAuthError({
          code: -1,
          description: 'Email provided is not a valid email address.',
        })
      );
      return;
    }

    if (values.password !== values.confirmedPassword) {
      dispatch(
        setAuthError({
          code: -1,
          description: 'Passwords provided do not match.',
        })
      );
      return;
    }

    const newUser = {
      username: values.username,
      firstName,
      lastName,
      email: values.email,
      password: values.password,
      confirmedPassword: values.confirmedPassword,
    };

    registerUser(newUser).then(({ data, error }) => {
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
      name='register-form'
      initialValues={{
        checkbox: true,
      }}
      onFinish={onRegister}
      autoComplete='off'
      className={`${styles.registerForm}`}
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
        <Form.Item name='username' noStyle={true}>
          <Input placeholder='Username' type='text' />
        </Form.Item>
        <Form.Item name='fullName' noStyle={true}>
          <Input placeholder='Full name' type='text' />
        </Form.Item>
        <Form.Item name='email' noStyle={true}>
          <Input placeholder='Email address' type='email' />
        </Form.Item>
        <Form.Item name='password' noStyle={true}>
          <Input placeholder='Password' type='password' />
        </Form.Item>
        <Form.Item name='confirmedPassword' noStyle={true}>
          <Input placeholder='Confirm password' type='password' />
        </Form.Item>

        <Button
          type='primary'
          htmlType='submit'
          className={`${styles.registerButton}`}
        >
          Register
        </Button>
        <FormTextButtonRow
          text='Already have an account?'
          buttonText='Login here'
          onClick={onLoginHereClick}
        />
      </Space>
    </Form>
  );
};

export { RegisterForm };
