import { Card, Empty } from 'antd';
import { useSelector } from 'react-redux';

import { ChowRoute } from '.';

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
      <ChowRoute />
    </div>
  );
};

export { AppRoute };
