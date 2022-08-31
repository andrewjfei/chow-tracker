import { useDispatch } from 'react-redux';
import { Button, Input, Select } from 'antd';
import SearchOutlined from '@ant-design/icons/SearchOutlined';

import {
  updateSearchFilter,
  updateCuisineFilter,
  updatePriceRangeFilter,
  updateAreaFilter,
} from '../../../../../redux/slices';

import styles from './ChowFilter.module.less';

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

const ChowFilter = () => {
  const dispatch = useDispatch();

  const formatAreaOption = (option) => {
    return option.replace('_', ' ');
  };

  const formatAreaOptionForKey = (option) => {
    return option.replace('_', '-');
  };

  const onSearchFilterChange = (value) => {
    dispatch(updateSearchFilter(value));
  };

  const onCuisineFilterChange = (value) => {
    dispatch(updateCuisineFilter(value));
  };

  const onPriceRangeFilterChange = (value) => {
    dispatch(updatePriceRangeFilter(value));
  };

  const onAreaFilterChange = (value) => {
    dispatch(updateAreaFilter(value));
  };

  return (
    <div className={`${styles.chowFilterContainer}`}>
      <div className={`${styles.filterGroupContainer}`}>
        <Input
          prefix={<SearchOutlined />}
          placeholder='Search chow'
          type='text'
          style={{ width: '25%' }}
          onChange={(event) => onSearchFilterChange(event.target.value)}
        />
        <Select
          mode='multiple'
          allowClear
          style={{ width: '20%' }}
          placeholder='Select cuisines'
          onChange={onCuisineFilterChange}
          maxTagCount={1}
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
          onChange={onPriceRangeFilterChange}
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
          onChange={onAreaFilterChange}
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

export { ChowFilter };
