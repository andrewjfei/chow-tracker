import { Card } from 'antd';
import styles from './AppRoute.module.less';
import { ChowList, ChowListActionRow, ChowListFilter } from './components';

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
      <Card
        title={<ChowListFilter />}
        className={`${styles.chowListCard}`}
        headStyle={{ display: 'flex', justifyContent: 'space-between' }}
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0rem',
        }}
      >
        <ChowListActionRow />
        <ChowList />
      </Card>
    </div>
  );
};

export { AppRoute };
