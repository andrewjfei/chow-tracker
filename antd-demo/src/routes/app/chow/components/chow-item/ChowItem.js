import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Tag, Typography, Space, Modal, Divider } from 'antd';
import DollarOutlined from '@ant-design/icons/DollarOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import ShopOutlined from '@ant-design/icons/ShopOutlined';

import {
  useUpdateChowMutation,
  useDeleteChowMutation,
  useVisitChowMutation,
  modifyChow,
  removeChow,
  setChowError,
  modifyChowHasBeen,
} from '../../../../../redux/slices';
import { PRICE_RANGE_MAP } from '../../../../../utils/mapUtil';
import { formatAreaOption } from '../../../../../utils/formatUtil';
import { ChowDrawer } from '../';

import styles from './ChowItem.module.less';

const ChowItem = ({ chowItem, index }) => {
  const dispatch = useDispatch();

  const [updateChow] = useUpdateChowMutation();
  const [deleteChow] = useDeleteChowMutation();
  const [visitChow] = useVisitChowMutation();

  const [isUpdateDrawerVisible, setIsUpdateDrawerVisible] = useState(false);

  const onUpdateButtonClick = () => {
    setIsUpdateDrawerVisible(true);
  };

  const onDrawerCloseClick = () => {
    setIsUpdateDrawerVisible(false);
  };

  const onVisitClick = () => {
    visitChow({ id: chowItem.id }).then(({ data, error }) => {
      if (error) {
        // TODO: Call error method to handle error
        dispatch(setChowError(error.data));
        console.log(error);
        return;
      }

      dispatch(modifyChowHasBeen(index));
    });
  };

  const onSaveClick = (updatedChow) => {
    updateChow({ id: chowItem.id, ...updatedChow }).then(({ data, error }) => {
      if (error) {
        // TODO: Call error method to handle error
        dispatch(setChowError(error.data));
        console.log(error);
        return;
      }

      console.log(index);
      dispatch(modifyChow({ index, modifedChow: data }));
      onDrawerCloseClick();
    });
  };

  const onDeleteClick = () => {
    deleteChow({ id: chowItem.id }).then(({ data, error }) => {
      if (error) {
        // TODO: Call error method to handle error
        dispatch(setChowError(error.data));
        console.log(error);
        return;
      }
      dispatch(removeChow(index));
    });
  };

  const showVisitModal = () => {
    Modal.confirm({
      title: 'Visit Chow',
      icon: <ShopOutlined />,
      content: 'Are you sure you have visited this chow?',
      okText: 'Visit',
      okType: 'primary',
      onOk: onVisitClick,
    });
  };

  const showDeleteModal = () => {
    Modal.confirm({
      title: 'Delete Chow',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this chow?',
      okText: 'Delete',
      okType: 'danger',
      onOk: onDeleteClick,
    });
  };

  return (
    <>
      <ChowDrawer
        title='Update Chow'
        visible={isUpdateDrawerVisible}
        onClose={onDrawerCloseClick}
        chow={chowItem}
        onSubmit={onSaveClick}
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
              <Divider type='vertical' className={`${styles.divider}`} />
              <Tag className={`${styles.hasBeen}`}>{`${chowItem.hasBeen}`}</Tag>
            </Space>
          </div>
          <div className={`${styles.actionButtonRow}`}>
            <Space direction='horizontal' size='middle'>
              <Button
                type='primary'
                icon={<ShopOutlined />}
                onClick={showVisitModal}
                className={`${styles.visitButton}`}
              >
                Visit Chow
              </Button>
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
