import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useAutoLoginUserMutation, setUser } from '../../redux/slices';
import { AppLayout } from '../../layouts';
import { NavBar } from './components';
import { HomeRoute } from '.';
import { constants } from '../../constants';

import styles from './AppRoute.module.less';

const AppRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [autoLoginUser] = useAutoLoginUserMutation();

  useEffect(() => {
    const token = localStorage.getItem(constants.localStorage.tokenKey);

    if (!token) {
      localStorage.removeItem(constants.localStorage.tokenKey);
      navigate('/auth');
      return;
    }

    autoLoginUser(token).then(({ data, error }) => {
      if (error) {
        localStorage.removeItem(constants.localStorage.tokenKey);
        navigate('/auth');
        return;
      }

      dispatch(setUser(data));
      navigate('/app');
    });
  }, []);

  return (
    <AppLayout>
      <NavBar />
      <div className={`${styles.routeContainer}`}>
        <Routes>
          <Route index element={<Navigate replace to='/app/home' />} />
          <Route path='home' element={<HomeRoute />} />
        </Routes>
      </div>
    </AppLayout>
  );
};

export { AppRoute };
