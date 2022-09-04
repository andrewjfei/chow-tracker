import { AppLayout } from '../../layouts';
import { NavBar } from './components';
import { ChowRoute, DashboardRoute } from '.';

import styles from './AppRoute.module.less';

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
