import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Typography, Space } from 'antd';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

import {
  useCreateNewChowMutation,
  addNewChow,
} from '../../../../../redux/slices';
import { ChowDrawer } from '../';

import styles from './ChowActionRow.module.less';

const ChowActionRow = () => {
  const dispatch = useDispatch();

  const [createNewChow] = useCreateNewChowMutation();

  const [isCreateDrawerVisible, setIsCreateDrawerVisible] = useState(false);

  const onCreateButtonClick = () => {
    setIsCreateDrawerVisible(true);
  };

  const onDrawerCloseClick = () => {
    setIsCreateDrawerVisible(false);
  };

  const onSubmitClick = (newChow) => {
    createNewChow(newChow).then(({ data, error }) => {
      if (error) {
        // TODO: Call error method to handle error
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
        onSubmit={onSubmitClick}
      />
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
          onClick={onCreateButtonClick}
        >
          Create New Chow
        </Button>
      </div>
    </>
  );
};

export { ChowActionRow };
