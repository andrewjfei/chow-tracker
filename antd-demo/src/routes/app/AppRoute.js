import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useAutoLoginUserMutation, setUser } from '../../redux/slices';
import { AppLayout } from '../../layouts';
import { NavBar } from './components';
import { ChowRoute, DashboardRoute } from '.';
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

      console.log(data);
      dispatch(setUser(data));
      navigate('/app');
    });
  }, []);

  return (
    <AppLayout>
      <NavBar />
      <div className={`${styles.routeContainer}`}>
        <DashboardRoute />
        <div className={`${styles.rowGap}`} />
        <ChowRoute />
      </div>
    </AppLayout>
  );
};

export { AppRoute };
