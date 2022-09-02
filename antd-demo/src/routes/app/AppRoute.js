import { AppLayout } from '../../layouts';
import { ChowRoute, DashboardRoute } from '.';

import styles from './AppRoute.module.less';
import { NavBar } from './components';

const AppRoute = () => {
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
