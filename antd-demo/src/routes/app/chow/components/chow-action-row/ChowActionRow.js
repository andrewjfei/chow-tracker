import { Button, Typography, Space } from 'antd';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

import styles from './ChowActionRow.module.less';

const ChowActionRow = () => {
  return (
    <div className={`${styles.chowActionRowContainer}`}>
      <Space
        className={`${styles.randomiseChowContainer}`}
        direction='horizontal'
        size='middle'
      >
        <Typography.Text className={`${styles.text}`}>
          Having trouble deciding what to eat? Let us decide for you!
        </Typography.Text>
        <Button type='primary' className={`${styles.button}`}>
          Randomise Chow
        </Button>
      </Space>
      <Button
        icon={<PlusOutlined />}
        className={`${styles.createNewChowButton}`}
      >
        Create New Chow
      </Button>
    </div>
  );
};

export { ChowActionRow };
