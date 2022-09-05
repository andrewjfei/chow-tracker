import { Card, List, Space, Typography } from 'antd';
import { cloneElement } from 'react';
import { RankingItem } from '../';

import styles from './RankingWidget.module.less';

const RankingWidget = ({ title, data, titleIcon }) => {
  const getStyledTitleIcon = () => {
    return cloneElement(titleIcon, { className: styles.icon });
  };

  const renderRankingListItem = (item, index) => {
    return <RankingItem rankingItem={item} index={index} />;
  };

  return (
    <Card
      className={`${styles.rankingWidgetContainer}`}
      bodyStyle={{ paddingBottom: '0.75rem' }}
    >
      <Space size='middle' className={`${styles.titleContainer}`}>
        {titleIcon && getStyledTitleIcon()}
        <Typography.Title level={4} className={`${styles.title}`}>
          {title}
        </Typography.Title>
      </Space>
      <List
        className={`${styles.rankingList}`}
        dataSource={data}
        renderItem={renderRankingListItem}
      />
    </Card>
  );
};

export { RankingWidget };
