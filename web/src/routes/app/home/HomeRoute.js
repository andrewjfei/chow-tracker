import { ChowRoute, DashboardRoute } from '../';

import styles from './HomeRoute.module.less';

const HomeRoute = () => {
  return (
    <>
      <DashboardRoute />
      <div className={`${styles.rowGap}`} />
      <ChowRoute />
    </>
  );
};

export { HomeRoute };
