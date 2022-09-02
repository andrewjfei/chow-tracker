import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TrophyOutlined from '@ant-design/icons/TrophyOutlined';

import {
  useRetrieveChowPopularityRankingQuery,
  setChowRanking,
} from '../../../redux/slices';
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
  const dispatch = useDispatch();

  const { chowRankings } = useSelector((state) => state.dashboard);

  const { data: chowPopularityData, isSuccess: isChowPopularitySuccess } =
    useRetrieveChowPopularityRankingQuery();

  useEffect(() => {
    if (isChowPopularitySuccess) {
      dispatch(
        setChowRanking({ type: 'popularity', data: chowPopularityData })
      );
    }
  }, [isChowPopularitySuccess]);

  return (
    <div className={`${styles.dashboardRouteContainer}`}>
      {chowRankings.popularity.length > 0 && (
        <RankingWidget
          title='Popularity'
          data={chowPopularityData}
          titleIcon={<TrophyOutlined />}
        />
      )}
      {chowRankings.popularity.length > 0 && (
        <RankingWidget
          title='Cuisine'
          data={data}
          titleIcon={<TrophyOutlined />}
        />
      )}
      {chowRankings.popularity.length > 0 && (
        <RankingWidget
          title='Price Range'
          data={data}
          titleIcon={<TrophyOutlined />}
        />
      )}
      {chowRankings.popularity.length > 0 && (
        <RankingWidget
          title='Area'
          data={data}
          titleIcon={<TrophyOutlined />}
        />
      )}
    </div>
  );
};

export { DashboardRoute };
