import { useState } from 'react';
import { Form, Input, Button, Space, Alert } from 'antd';

import { FormTextButtonRow } from '../form-text-button-row/FormTextButtonRow';

import styles from './RegisterForm.module.less';

const RegisterForm = ({ onLoginHereClick }) => {
  const [showError, setShowError] = useState(false);

  const onAlertClose = () => {
    setShowError(false);
  };

  const onRegister = (values) => {
    console.log('Success:', values);
    setShowError(true);
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
        {showError && (
          <Alert
            type='error'
            afterClose={onAlertClose}
            showIcon
            message='Passwords do not match'
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
        <Form.Item name='confirmPassword' noStyle={true}>
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
