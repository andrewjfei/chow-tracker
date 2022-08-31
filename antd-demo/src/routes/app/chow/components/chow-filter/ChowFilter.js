import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, Select } from 'antd';
import SearchOutlined from '@ant-design/icons/SearchOutlined';

import {
  useRetrieveChowFilterOptionsQuery,
  resetFilters,
  updateSearchFilter,
  updateCuisineFilter,
  updatePriceRangeFilter,
  updateAreaFilter,
} from '../../../../../redux/slices';

import styles from './ChowFilter.module.less';

const ChowFilter = () => {
  const dispatch = useDispatch();

  const { data: chowFilterOptions } = useRetrieveChowFilterOptionsQuery();

  const [searchString, setSearchString] = useState('');
  const [selectedCuisineOptions, setSelectedCuisineOptions] = useState([]);
  const [selectedPriceRangeOptions, setSelectedPriceRangeOptions] = useState(
    []
  );
  const [selectedAreaOptions, setSelectedAreaOptions] = useState([]);

  const formatAreaOption = (option) => {
    return option.replace('_', ' ');
  };

  const formatAreaOptionForKey = (option) => {
    return option.replace('_', '-');
  };

  // Updating Filters
  const onSearchFilterChange = (value) => {
    setSearchString(value);
    dispatch(updateSearchFilter(value));
  };

  const onCuisineFilterChange = (value) => {
    setSelectedCuisineOptions(value);
    dispatch(updateCuisineFilter(value));
  };

  const onPriceRangeFilterChange = (value) => {
    setSelectedPriceRangeOptions(value);
    dispatch(updatePriceRangeFilter(value));
  };

  const onAreaFilterChange = (value) => {
    setSelectedAreaOptions(value);
    dispatch(updateAreaFilter(value));
  };

  // Reset Filters
  const onResetFiltersClick = () => {
    setSearchString('');
    setSelectedCuisineOptions([]);
    setSelectedPriceRangeOptions([]);
    setSelectedAreaOptions([]);
    dispatch(resetFilters());
  };

  return (
    <div className={`${styles.chowFilterContainer}`}>
      <div className={`${styles.filterGroupContainer}`}>
        <Input
          prefix={<SearchOutlined />}
          placeholder='Search chow'
          type='text'
          style={{ width: '25%' }}
          value={searchString}
          onChange={(event) => onSearchFilterChange(event.target.value)}
        />
        <Select
          mode='multiple'
          allowClear
          style={{ width: '20%' }}
          placeholder='Select cuisines'
          onChange={onCuisineFilterChange}
          maxTagCount={1}
          value={selectedCuisineOptions}
        >
          {chowFilterOptions &&
            chowFilterOptions.cuisineOptions.map((option) => (
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
          value={selectedPriceRangeOptions}
        >
          {chowFilterOptions &&
            chowFilterOptions.priceRangeOptions.map((option) => (
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
          value={selectedAreaOptions}
        >
          {chowFilterOptions &&
            chowFilterOptions.areaOptions.map((option) => (
              <Select.Option
                key={formatAreaOptionForKey(option.toLocaleLowerCase())}
                value={option}
              >
                {formatAreaOption(option)}
              </Select.Option>
            ))}
        </Select>
      </div>

      <Button type='primary' danger onClick={onResetFiltersClick}>
        Reset Filters
      </Button>
    </div>
  );
};

export { ChowFilter };
