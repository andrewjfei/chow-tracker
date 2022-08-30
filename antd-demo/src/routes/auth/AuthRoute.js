import Card from 'antd/lib/card/Card';

import { AuthLayout } from '../../layouts';
import { LogoHeader } from '../../components';
import { LoginForm, RegisterForm } from './components';

import styles from './AuthRoute.module.less';
import { useState } from 'react';

const AuthRoute = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const onRegisterHereClick = () => {
    setShowLoginForm(false);
  };

  const onLoginHereClick = () => {
    setShowLoginForm(true);
  };

  return (
    <AuthLayout>
      <Card
        title={<LogoHeader />}
        className={`${styles.authCard}`}
        headStyle={{ display: 'flex', justifyContent: 'center' }}
        bodyStyle={{ display: 'flex', flexDirection: 'column' }}
      >
        {showLoginForm ? (
          <LoginForm onRegisterHereClick={onRegisterHereClick} />
        ) : (
          <RegisterForm onLoginHereClick={onLoginHereClick} />
        )}
      </Card>
    </AuthLayout>
  );
};

export { AuthRoute };
