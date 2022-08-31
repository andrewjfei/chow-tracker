import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Empty } from 'antd';

import {
  useRetrieveChowListMutation,
  setChowList,
} from '../../../redux/slices';
import { ChowList, ChowActionRow, ChowFilter } from './components';

import styles from './ChowRoute.module.less';

const ChowRoute = () => {
  const dispatch = useDispatch();

  const { chowListFilter, chowList } = useSelector((state) => state.chow);

  const [retrieveChowList] = useRetrieveChowListMutation();

  useEffect(() => {
    retrieveChowList(chowListFilter).then(({ data, error }) => {
      if (error) {
        // TODO: Logout user and display error modal
        console.log(error);
        return;
      }

      dispatch(setChowList(data));
    });
  }, [chowListFilter]);

  return (
    <Card
      title={<ChowFilter />}
      className={`${styles.chowCard}`}
      headStyle={{ display: 'flex', justifyContent: 'space-between' }}
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0rem',
      }}
    >
      <ChowActionRow />
      <div className={`${styles.chowListContainer}`}>
        {chowList.length !== 0 ? (
          <ChowList chowListData={chowList} />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description='No chows found'
          />
        )}
      </div>
    </Card>
  );
};

export { ChowRoute };
