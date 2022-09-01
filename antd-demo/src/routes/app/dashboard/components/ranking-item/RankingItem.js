import { List, Space, Tag, Typography } from 'antd';
import styles from './RankingItem.module.less';

const RankingItem = ({ rankingItem, index }) => {
  return (
    <List.Item className={`${styles.rankingItemContainer}`}>
      <Space size='middle' className={`${styles.rankingAndItemNameContainer}`}>
        <Tag color={index === 0 ? '#ff7b33' : null}>{rankingItem.ranking}</Tag>
        <Typography.Text strong={index === 0}>
          {rankingItem.itemName}
        </Typography.Text>
      </Space>
      <Typography.Text
        strong={true}
        className={`${index === 0 ? styles.text : null}`}
      >
        {rankingItem.hasBeen}
      </Typography.Text>
    </List.Item>
  );
};

export { RankingItem };
