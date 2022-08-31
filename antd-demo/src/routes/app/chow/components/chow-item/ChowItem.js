import { useState } from 'react';
import { Button, Card, Tag, Typography, Space, Modal } from 'antd';
import DollarOutlined from '@ant-design/icons/DollarOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';

import { formatAreaOption } from '../../../../../utils/formatUtil';
import { ChowDrawer } from '../';

import styles from './ChowItem.module.less';

const PRICE_RANGE_MAP = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
};

const ChowItem = ({ chowItem }) => {
  const [isUpdateDrawerVisible, setIsUpdateDrawerVisible] = useState(false);

  const onUpdateButtonClick = () => {
    setIsUpdateDrawerVisible(true);
  };

  const onDrawerCloseClick = () => {
    setIsUpdateDrawerVisible(false);
  };

  const showDeleteModal = () => {
    Modal.confirm({
      title: 'Delete Chow',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this chow?',
      okText: 'Delete',
      okType: 'danger',
      onOk() {
        console.log('OK');
      },
    });
  };

  return (
    <>
      <ChowDrawer
        title='Update Chow'
        visible={isUpdateDrawerVisible}
        onClose={onDrawerCloseClick}
        chow={chowItem}
      />
      <Card
        className={`${styles.chowItemCard}`}
        bodyStyle={{ padding: '0rem' }}
      >
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
                {formatAreaOption(chowItem.area)}
              </Tag>
            </Space>
          </div>
          <div className={`${styles.actionButtonRow}`}>
            <Space direction='horizontal' size='middle'>
              <Button
                onClick={onUpdateButtonClick}
                className={`${styles.updateButton}`}
              >
                Update
              </Button>
              <Button
                type='primary'
                danger
                onClick={showDeleteModal}
                className={`${styles.deleteButton}`}
              >
                Delete
              </Button>
            </Space>
          </div>
        </div>
      </Card>
    </>
  );
};

export { ChowItem };
