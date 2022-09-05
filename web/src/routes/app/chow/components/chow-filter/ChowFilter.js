import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Select } from 'antd';
import SearchOutlined from '@ant-design/icons/SearchOutlined';

import {
  useRetrieveChowCategoryOptionsMutation,
  setChowCategoryOptions,
  resetFilters,
  setSearchFilter,
  setCuisineFilter,
  setPriceRangeFilter,
  setAreaFilter,
} from '../../../../../redux/slices';
import {
  formatAreaOption,
  formatAreaOptionForKey,
} from '../../../../../utils/formatUtil';

import styles from './ChowFilter.module.less';

const ChowFilter = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { chowCategoryOptions } = useSelector((state) => state.chow);

  const [retrieveChowCategoryOptions] =
    useRetrieveChowCategoryOptionsMutation();

  const [searchString, setSearchString] = useState('');
  const [selectedCuisineOptions, setSelectedCuisineOptions] = useState([]);
  const [selectedPriceRangeOptions, setSelectedPriceRangeOptions] = useState(
    []
  );
  const [selectedAreaOptions, setSelectedAreaOptions] = useState([]);

  useEffect(() => {
    retrieveChowCategoryOptions().then(({ data, error }) => {
      if (error) {
        console.log(error);
        return;
      }

      dispatch(setChowCategoryOptions(data));
    });
  }, [user]);

  // Updating Filters
  const onSearchFilterChange = (value) => {
    setSearchString(value);
    dispatch(setSearchFilter(value));
  };

  const onCuisineFilterChange = (value) => {
    setSelectedCuisineOptions(value);
    dispatch(setCuisineFilter(value));
  };

  const onPriceRangeFilterChange = (value) => {
    setSelectedPriceRangeOptions(value);
    dispatch(setPriceRangeFilter(value));
  };

  const onAreaFilterChange = (value) => {
    setSelectedAreaOptions(value);
    dispatch(setAreaFilter(value));
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
          {chowCategoryOptions &&
            chowCategoryOptions.cuisineOptions.map((option) => (
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
          {chowCategoryOptions &&
            chowCategoryOptions.priceRangeOptions.map((option) => (
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
          {chowCategoryOptions &&
            chowCategoryOptions.areaOptions.map((option) => (
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
