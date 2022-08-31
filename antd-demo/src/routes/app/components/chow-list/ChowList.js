import { List } from 'antd';
import { ChowListItem } from '../';

import styles from './ChowList.module.less';

const chowListData = [
  {
    name: "Pakuranga McDonald's",
    cuisine: 'AMERICAN',
    priceRange: 'LOW',
    area: 'EAST_AUCKLAND',
  },
  {
    name: 'Twelve',
    cuisine: 'KOREAN',
    priceRange: 'MEDIUM',
    area: 'CENTRAL_AUCKLAND',
  },
  {
    name: 'Pocha',
    cuisine: 'KOREAN',
    priceRange: 'MEDIUM',
    area: 'CENTRAL_AUCKLAND',
  },
  {
    name: 'Porterhouse Grill',
    cuisine: 'AMERICAN',
    priceRange: 'MEDIUM',
    area: 'EAST_AUCKLAND',
  },
];

const ChowList = () => {
  const renderChowListItem = (item) => <ChowListItem chowItem={item} />;
  return (
    <List
      grid={{ column: 1 }}
      dataSource={chowListData}
      renderItem={renderChowListItem}
      style={{
        height: '250px',
        overflow: 'auto',
        padding: '1.5rem',
        paddingBottom: '0rem',
      }}
    />
  );
};

export { ChowList };
