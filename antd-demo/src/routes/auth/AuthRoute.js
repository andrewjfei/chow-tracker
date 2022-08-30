import Card from 'antd/lib/card/Card';

import { AuthLayout } from '../../layouts';
import { LogoHeader } from '../../components';
import { LoginForm } from './components';

import styles from './AuthRoute.module.less';

const AuthRoute = () => {
  return (
    <AuthLayout>
      <Card
        title={<LogoHeader />}
        className={`${styles.authCard}`}
        headStyle={{ display: 'flex', justifyContent: 'center' }}
        bodyStyle={{ display: 'flex', flexDirection: 'column' }}
      >
        <LoginForm />
      </Card>
    </AuthLayout>
  );
};

export { AuthRoute };
