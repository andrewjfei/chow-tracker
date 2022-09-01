import { Card, List, Typography } from 'antd';
import { RankingItem } from '../';

import styles from './RankingWidget.module.less';

const RankingWidget = ({ title, data }) => {
  const renderRankingListItem = (item, index) => {
    return <RankingItem rankingItem={item} index={index} />;
  };

  return (
    <Card
      className={`${styles.rankingWidgetContainer}`}
      bodyStyle={{ paddingBottom: '0.75rem' }}
    >
      <Typography.Title level={4}>{title}</Typography.Title>
      <List
        className={`${styles.rankingList}`}
        dataSource={data}
        renderItem={renderRankingListItem}
      />
    </Card>
  );
};

export { RankingWidget };
