import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Typography, Space, Spin } from 'antd';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

import {
  useCreateNewChowMutation,
  useRetrieveRandomChowMutation,
  addNewChow,
  setChowError,
  setRandomChow,
} from '../../../../../redux/slices';
import { ChowDrawer, RandomChow } from '../';

import styles from './ChowActionRow.module.less';

const ChowActionRow = () => {
  const dispatch = useDispatch();

  const { chowList, randomChow } = useSelector((state) => state.chow);

  const [retrieveRandomChow] = useRetrieveRandomChowMutation();
  const [createNewChow] = useCreateNewChowMutation();

  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);
  const [isRandomModalVisible, setIsRandomModalVisible] = useState(false);

  const onCreateButtonClick = () => {
    setIsCreateDrawerVisible(true);
  };

  const onDrawerCloseClick = () => {
    setIsCreateDrawerVisible(false);
  };

  const showRandomModal = () => {
    setIsRandomModalVisible(true);
  };

  const onOkClick = () => {
    setIsRandomModalVisible(false);
    dispatch(setRandomChow(null));
  };

  const onRandomiseClick = () => {
    showRandomModal();

    setTimeout(() => {
      retrieveRandomChow(chowList).then(({ data, error }) => {
        if (error) {
          // TODO: Call error method to handle error
          dispatch(setChowError(error.data));
          console.log(error);
          return;
        }

        console.log(data);
        dispatch(setRandomChow(data));
      });
    }, 1000);
  };

  const onCreateClick = (newChow) => {
    createNewChow(newChow).then(({ data, error }) => {
      if (error) {
        // TODO: Call error method to handle error
        dispatch(setChowError(error.data));
        console.log(error);
        return;
      }

      console.log(data);
      dispatch(addNewChow(newChow));
      onDrawerCloseClick();
    });
  };

  return (
    <>
      <ChowDrawer
        title='Create New Chow'
        visible={isCreateDrawerVisible}
        onClose={onDrawerCloseClick}
        formSubmitText='Create'
        onSubmit={onCreateClick}
      />
      <Modal
        title={randomChow ? 'Your Selected Chow' : 'Selecting A Random Chow'}
        visible={isRandomModalVisible}
        closable={false}
        onOk={onOkClick}
        cancelButtonProps={{ style: { display: 'none' } }}
        bodyStyle={{ display: 'flex', justifyContent: 'center' }}
      >
        {randomChow ? <RandomChow chow={randomChow} /> : <Spin />}
      </Modal>
      <div className={`${styles.chowActionRowContainer}`}>
        <Space
          className={`${styles.randomiseChowContainer}`}
          direction='horizontal'
          size='middle'
        >
          <Typography.Text className={`${styles.text}`}>
            Having trouble deciding what to eat? Let us decide for you!
          </Typography.Text>
          <Button
            type='primary'
            className={`${styles.button}`}
            onClick={onRandomiseClick}
          >
            Randomise Chow
          </Button>
        </Space>
        <Button
          icon={<PlusOutlined />}
          className={`${styles.createNewChowButton}`}
          onClick={onCreateButtonClick}
        >
          Create New Chow
        </Button>
      </div>
    </>
  );
};

export { ChowActionRow };
