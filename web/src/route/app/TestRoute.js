import { WelcomeWidget, RankingWidget } from '../../component';
import { ChowList } from './chow-list/ChowList';
import { ChowsSearchBar } from './chow-search-bar/ChowSearchBar';
import { NavBar } from './nav-bar/NavBar';

import styles from './AppRoute.module.css';

const TestRoute = () => {
  return (
    <div className={styles.routeContainer}>
      <div className={styles.navBarColumn}>
        <NavBar className={styles.navBar} />
      </div>
      <div className={styles.dashboardColumn}>
        <WelcomeWidget />
        <div className={styles.chowRankingContainer}>
          <RankingWidget />
          <RankingWidget />
          <RankingWidget />
          <RankingWidget />
        </div>
      </div>
      <div className={styles.chowListColumn}>
        <ChowsSearchBar />
        <ChowList className={styles.chowList} />
      </div>
    </div>
  );
};

export { TestRoute };
