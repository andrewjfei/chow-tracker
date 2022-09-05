import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Empty } from 'antd';

import {
  useRetrieveChowListMutation,
  setChowList,
  setChowError,
} from '../../../redux/slices';
import { ChowList, ChowActionRow, ChowFilter } from './components';

import styles from './ChowRoute.module.less';

const ChowRoute = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { chowListFilter, chowList } = useSelector((state) => state.chow);

  const [retrieveChowList] = useRetrieveChowListMutation();

  useEffect(() => {
    retrieveChowList(chowListFilter).then(({ data, error }) => {
      if (error) {
        // TODO: Logout user and display error modal
        console.log(error);
        setChowError(error.data);
        return;
      }

      dispatch(setChowList(data));
    });
  }, [user, chowListFilter]);

  return (
    <Card
      className={`${styles.chowRouteContainer}`}
      headStyle={{ display: 'flex', justifyContent: 'space-between' }}
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0rem',
        height: '100%',
      }}
    >
      <ChowFilter />
      <ChowActionRow />
      <div className={`${styles.chowListContainer}`}>
        {chowList.length > 0 ? (
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
