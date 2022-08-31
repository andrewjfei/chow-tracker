import { Button, Input, Select } from 'antd';
import SearchOutlined from '@ant-design/icons/SearchOutlined';

import styles from './ChowListFilter.module.less';

const cuisineOptions = [
  'CHINESE',
  'KOREAN',
  'AMERICAN',
  'ITALIAN',
  'GREEK',
  'JAPANESE',
];

const priceRangeOptions = ['LOW', 'MEDIUM', 'HIGH'];

const areaOptions = [
  'CENTRAL_AUCKLAND',
  'EAST_AUCKLAND',
  'WEST_AUCKLAND',
  'SOUTH_AUCKLAND',
  'NORTH_AUCKLAND',
  'HAMILTON',
  'CHRISTCHURCH',
];

const ChowListFilter = () => {
  const formatAreaOption = (option) => {
    return option.replace('_', ' ');
  };

  const formatAreaOptionForKey = (option) => {
    return option.replace('_', '-');
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className={`${styles.chowListFilterContainer}`}>
      <div className={`${styles.filterGroupContainer}`}>
        <Input
          prefix={<SearchOutlined />}
          placeholder='Search chow'
          type='text'
          style={{ width: '25%' }}
        />
        <Select
          mode='multiple'
          allowClear
          style={{ width: '20%' }}
          placeholder='Select cuisines'
          onChange={handleChange}
          maxTagCount={1}
          // value={['CHINESE', 'JAPANESE']}
        >
          {cuisineOptions.map((option) => (
            <Select.Option key={option.toLocaleLowerCase()} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
        <Select
          mode='multiple'
          allowClear
          style={{ width: '20%' }}
          placeholder='Select price ranges'
          onChange={handleChange}
          maxTagCount={1}
        >
          {priceRangeOptions.map((option) => (
            <Select.Option key={option.toLocaleLowerCase()} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
        <Select
          mode='multiple'
          allowClear
          style={{ width: '30%' }}
          placeholder='Select areas'
          onChange={handleChange}
          maxTagCount={1}
        >
          {areaOptions.map((option) => (
            <Select.Option
              key={formatAreaOptionForKey(option.toLocaleLowerCase())}
              value={option}
            >
              {formatAreaOption(option)}
            </Select.Option>
          ))}
        </Select>
      </div>

      <Button type='primary' danger>
        Reset Filters
      </Button>
    </div>
  );
};

export { ChowListFilter };
