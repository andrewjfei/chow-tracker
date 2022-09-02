import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Checkbox, Input, Button, Space, Alert } from 'antd';

import { FormTextButtonRow } from '../form-text-button-row/FormTextButtonRow';

import styles from './LoginForm.module.less';

const LoginForm = ({ onRegisterHereClick }) => {
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);

  const onAlertClose = () => {
    setShowError(false);
  };

  const onLogin = (values) => {
    console.log('Success:', values);
    setShowError(true);
    navigate('/app');
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
        {showError && (
          <Alert
            type='error'
            afterClose={onAlertClose}
            showIcon
            message='Invalid credentials'
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
