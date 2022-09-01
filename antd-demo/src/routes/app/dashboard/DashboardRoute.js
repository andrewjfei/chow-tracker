import { RankingWidget } from './components';

import styles from './DashboardRoute.module.less';

const data = [
  {
    ranking: 1,
    itemName: 'Burger King',
    hasBeen: 25,
  },
  {
    ranking: 2,
    itemName: 'Taco Bell',
    hasBeen: 19,
  },
  {
    ranking: 3,
    itemName: "Nando's",
    hasBeen: 6,
  },
];

const DashboardRoute = () => {
  return (
    <div className={`${styles.dashboardRouteContainer}`}>
      <RankingWidget title='Popularity' data={data} />
      <RankingWidget title='Cuisine' data={data} />
      <RankingWidget title='Price Range' data={data} />
      <RankingWidget title='Area' data={data} />
    </div>
  );
};

export { DashboardRoute };
