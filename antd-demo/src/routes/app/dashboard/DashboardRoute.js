import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TrophyOutlined from '@ant-design/icons/TrophyOutlined';

import {
  useRetrieveChowRankingsMutation,
  setChowRankings,
} from '../../../redux/slices';
import { RankingWidget } from './components';

import styles from './DashboardRoute.module.less';

const DashboardRoute = () => {
  const dispatch = useDispatch();

  const { chowList } = useSelector((state) => state.chow);
  const { chowRankings } = useSelector((state) => state.dashboard);

  const [retrieveChowRankings] = useRetrieveChowRankingsMutation();

  useEffect(() => {
    retrieveChowRankings().then(({ data, error }) => {
      if (error) {
        // TODO: Logout user and display error modal
        console.log(error);
        return;
      }
      dispatch(setChowRankings(data));
    });
  }, [chowList]);

  return (
    <div className={`${styles.dashboardRouteContainer}`}>
      {chowRankings && (
        <>
          <RankingWidget
            title='Popularity'
            data={chowRankings.popularity}
            titleIcon={<TrophyOutlined />}
          />
          <RankingWidget
            title='Cuisine'
            data={chowRankings.cuisine}
            titleIcon={<TrophyOutlined />}
          />
          <RankingWidget
            title='Price Range'
            data={chowRankings.priceRange}
            titleIcon={<TrophyOutlined />}
          />
          <RankingWidget
            title='Area'
            data={chowRankings.area}
            titleIcon={<TrophyOutlined />}
          />
        </>
      )}
    </div>
  );
};

export { DashboardRoute };
