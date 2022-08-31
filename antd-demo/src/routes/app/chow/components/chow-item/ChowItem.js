import { Button, Card, Tag, Typography, Space } from 'antd';
import DollarOutlined from '@ant-design/icons/DollarOutlined';

import styles from './ChowItem.module.less';

const PRICE_RANGE_MAP = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
};

const ChowItem = ({ chowItem }) => {
  return (
    <Card className={`${styles.chowItemCard}`} bodyStyle={{ padding: '0rem' }}>
      <div className={`${styles.cardBody}`}>
        <div className={`${styles.infoContainer}`}>
          <Space direction='horizontal' size='small'>
            <Typography.Title level={5} className={`${styles.name}`}>
              {chowItem.name}
            </Typography.Title>
            <Space
              direction='horizontal'
              size={3}
              className={`${styles.priceRangeContainer}`}
            >
              {Array(PRICE_RANGE_MAP[chowItem.priceRange])
                .fill()
                .map((item, index) => (
                  <DollarOutlined key={`${chowItem.name}-dollar-${index}`} />
                ))}
            </Space>
            <Tag color='volcano' className={`${styles.cuisine}`}>
              {chowItem.cuisine}
            </Tag>
            <Tag className={`${styles.area}`}>
              {chowItem.area.replace('_', ' ')}
            </Tag>
          </Space>
        </div>
        <div className={`${styles.actionButtonRow}`}>
          <Space direction='horizontal' size='middle'>
            <Button className={`${styles.updateButton}`}>Update</Button>
            <Button type='primary' danger className={`${styles.deleteButton}`}>
              Delete
            </Button>
          </Space>
        </div>
      </div>
    </Card>
  );
};

export { ChowItem };
