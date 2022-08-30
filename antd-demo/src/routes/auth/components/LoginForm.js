import { Form, Checkbox, Input, Button, Space } from 'antd';

import styles from './LoginForm.module.less';

const LoginForm = () => {
  const onLogin = (values) => {
    console.log('Success:', values);
  };

  const onLoginFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name='login-form'
      initialValues={{
        checkbox: true,
      }}
      onFinish={onLogin}
      onFinishFailed={onLoginFailed}
      autoComplete='off'
      className={`${styles.loginForm}`}
    >
      <Space
        direction='vertical'
        size='middle'
        className={`${styles.formItem}`}
      >
        <Form.Item name='username' noStyle={true}>
          <Input placeholder='Username/Email' type='text' />
        </Form.Item>
        <Form.Item name='password' noStyle={true}>
          <Input placeholder='Password' type='password' />
        </Form.Item>
        <Form.Item name='checkbox' valuePropName='checked' noStyle={true}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item name='login-button' noStyle={true}>
          <Button
            type='primary'
            htmlType='submit'
            className={`${styles.loginButton}`}
          >
            Login
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export { LoginForm };
