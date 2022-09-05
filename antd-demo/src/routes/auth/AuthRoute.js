import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Card from 'antd/lib/card/Card';

import { useAutoLoginUserMutation, setUser } from '../../redux/slices';
import { AuthLayout } from '../../layouts';
import { LogoHeader } from '../../components';
import { LoginForm, RegisterForm } from './components';
import { constants } from '../../constants';

import styles from './AuthRoute.module.less';

const AuthRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [autoLoginUser] = useAutoLoginUserMutation();

  useEffect(() => {
    const token = localStorage.getItem(constants.localStorage.tokenKey);

    if (token) {
      autoLoginUser(token).then(({ data, error }) => {
        if (error) {
          return;
        }

        dispatch(setUser(data));
        navigate('/app');
      });
    }
  }, []);

  return (
    <AuthLayout>
      <Card
        title={<LogoHeader />}
        className={`${styles.authCard}`}
        headStyle={{ display: 'flex', justifyContent: 'center' }}
        bodyStyle={{ display: 'flex', flexDirection: 'column' }}
      >
        {/* {showLoginForm ? (
          <LoginForm onRegisterHereClick={onRegisterHereClick} />
        ) : (
          <RegisterForm onLoginHereClick={onLoginHereClick} />
        )} */}
        <Routes>
          <Route index element={<Navigate replace to='/auth/login' />} />
          <Route path='login' element={<LoginForm />} />
          <Route path='register' element={<RegisterForm />} />
        </Routes>
      </Card>
    </AuthLayout>
  );
};

export { AuthRoute };
