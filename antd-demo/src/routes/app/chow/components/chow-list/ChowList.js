import { List } from 'antd';

import { ChowItem } from '..';

import styles from './ChowList.module.less';

const ChowList = ({ chowListData }) => {
  const renderChowListItem = (item) => {
    return <ChowItem chowItem={item} />;
  };

  return (
    <List
      className={`${styles.chowList}`}
      grid={{ column: 1 }}
      dataSource={chowListData}
      renderItem={renderChowListItem}
    />
  );
};

export { ChowList };
