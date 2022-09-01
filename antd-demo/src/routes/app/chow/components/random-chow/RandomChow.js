import { Alert, Space, Tag, Typography } from 'antd';
import DollarOutlined from '@ant-design/icons/DollarOutlined';

import { PRICE_RANGE_MAP } from '../../../../../utils/mapUtil';
import { formatAreaOption } from '../../../../../utils/formatUtil';

import styles from './RandomChow.module.less';

const RandomChow = ({ chow }) => {
  const renderRandomChow = () => {
    return (
      <div className={`${styles.randomChowContainer}`}>
        <Space direction='horizontal' className={`${styles.infoTopContainer}`}>
          <Typography.Title level={4} className={`${styles.name}`}>
            {chow.name}
          </Typography.Title>
          <Space
            direction='horizontal'
            size={3}
            className={`${styles.priceRangeContainer}`}
          >
            {Array(PRICE_RANGE_MAP[chow.priceRange])
              .fill()
              .map((item, index) => (
                <DollarOutlined
                  key={`${chow.name}-dollar-${index}`}
                  className={`${styles.icon}`}
                />
              ))}
          </Space>
        </Space>
        <Space
          direction='horizontal'
          size={3}
          className={`${styles.infoBottomContainer}`}
        >
          <Tag color='#ff7b33' className={`${styles.cuisine}`}>
            {chow.cuisine}
          </Tag>
          <Tag className={`${styles.area}`}>{formatAreaOption(chow.area)}</Tag>
        </Space>
        <Space direction='horizontal'></Space>
      </div>
    );
  };

  return (
    <Alert
      description={renderRandomChow()}
      type='info'
      className={`${styles.alertContainer}`}
    />
  );
};

export { RandomChow };
