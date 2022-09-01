import { ChowRoute, DashboardRoute } from '.';

import styles from './AppRoute.module.less';

const AppRoute = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
      }}
    >
      <DashboardRoute />
      <ChowRoute />
    </div>
  );
};

export { AppRoute };
