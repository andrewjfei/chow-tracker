import {
  Button,
  HorizontalDivider,
  VerticalDivider,
  Tag,
  ToggleButton,
} from '../../../component';

import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateChowListFilter,
  useGetChowListMutation,
  updateChowList,
} from '../../../redux/slice';

const cuisineList = [
  'KOREAN',
  'AMERICAN',
  'GREEK',
  'CHINESE',
  'JAPANESE',
  'ITALIAN',
];

const priceRangeList = ['LOW', 'MEDIUM', 'HIGH'];

const areaList = [
  'EAST_AUCKLAND',
  'SOUTH_AUCKLAND',
  'WEST_AUCKLAND',
  'NORTH_AUCKLAND',
  'CENTRAL_AUCKLAND',
  'HAMILTON',
  'CHRISTCHURCH',
];

const ChowsSearchBar = ({ className, onChange, placeholder }) => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const { filter } = useSelector((state) => state.chowListFilter);
  const dispatch = useDispatch();
  const [getChowList] = useGetChowListMutation();
  const [searchString, setSearchString] = useState('');
  const [isToggleReset, setIsToggleReset] = useState(false);
  const [hasFilterSelected, setHasFilterSelected] = useState(false);

  const hasFiltersActive = ({
    searchString,
    cuisineList,
    priceRangeList,
    areaList,
  }) => {
    console.log(cuisineList);
    if (
      searchString.length === 0 &&
      cuisineList.length === 0 &&
      priceRangeList.length === 0 &&
      areaList.length === 0
    ) {
      console.log('Filter Active: false');
      return false;
    }
    console.log('Filter Active: true');
    return true;
  };

  useState(() => {
    console.log(filter);

    if (hasFiltersActive(filter)) {
      console.log('Setting Filter: true');
      setHasFilterSelected(true);
    } else {
      console.log('Setting Filter: false');
      setHasFilterSelected(false);
    }
  }, [filter]);

  const formatArea = (area) => {
    return area.replace('_', ' ');
  };

  const onSearch = (string) => {
    setSearchString(string);
    const updatedFilter = { ...filter };
    updatedFilter.searchString = string;
    getChowList(updatedFilter).then(({ data, error }) => {
      // console.log(result);
      if (error) {
        console.log(error);
      }
      console.log(data);
      dispatch(updateChowList(data));
    });
    dispatch(updateChowListFilter(updatedFilter));
  };

  const onFilterToggleOn = (category, value) => {
    const updatedFilter = { ...filter };
    updatedFilter[category] = [...filter[category], value];
    getChowList(updatedFilter).then(({ data, error }) => {
      if (error) {
        console.log(error);
      }
      console.log(data);
      dispatch(updateChowList(data));
    });
    dispatch(updateChowListFilter(updatedFilter));
  };

  const onFilterToggleOff = (category, value) => {
    const updatedFilter = { ...filter };

    updatedFilter[category] = filter[category].filter(
      (categoryValue) => categoryValue !== value
    );

    getChowList(updatedFilter).then(({ data, error }) => {
      if (error) {
        console.log(error);
      }
      console.log(data);
      dispatch(updateChowList(data));
    });

    dispatch(updateChowListFilter(updatedFilter));
  };

  const onFilterReset = () => {
    setSearchString('');
    setIsToggleReset(true);
    // setHasFilterSelected(false);

    const updatedFilter = {
      searchString: '',
      cuisineList: [],
      priceRangeList: [],
      areaList: [],
    };

    getChowList(updatedFilter).then(({ data, error }) => {
      if (error) {
        console.log(error);
      }
      console.log(data);
      dispatch(updateChowList(data));
    });

    dispatch(updateChowListFilter(updatedFilter));
  };

  return (
    <div className='p-2 bg-white rounded-lg transition-[height] duration-500'>
      <div className='flex flex-row justify-between items-center'>
        <MagnifyingGlassIcon className='p-1 h-8 stroke-2 stroke-stone-500' />
        <input
          type='text'
          placeholder={placeholder}
          value={searchString}
          onChange={(event) => onSearch(event.target.value)}
          className='flex-auto bg-transparent mx-2 text-stone-700 focus:outline-none'
        />
        {hasFilterSelected && (
          <div className='flex flex-row'>
            <Button
              className='px-2 py-1'
              variant='text'
              colour='default'
              onClick={onFilterReset}
            >
              RESET
            </Button>
            <VerticalDivider className='mx-2' />
          </div>
        )}
        <button onClick={() => setIsFilterExpanded(!isFilterExpanded)}>
          {isFilterExpanded ? (
            <ChevronUpIcon className='p-1 h-8 stroke-2 stroke-stone-500' />
          ) : (
            <AdjustmentsHorizontalIcon className='p-1 h-8 stroke-2 stroke-stone-500' />
          )}
        </button>
      </div>
      {isFilterExpanded && (
        <div className='mt-2'>
          <HorizontalDivider />
          <div>
            <div className='mt-2'>
              <p className='text-base text-stone-700'>Cuisine</p>
              <div className=''>
                {cuisineList.map((cuisine) => (
                  <ToggleButton
                    text={cuisine}
                    value={cuisine}
                    key={cuisine}
                    isReset={isToggleReset}
                    clearReset={() => setIsToggleReset(false)}
                    className='inline-block mt-1 mr-1 last:mr-0'
                    onToggleOn={(value) =>
                      onFilterToggleOn('cuisineList', value)
                    }
                    onToggleOff={(value) =>
                      onFilterToggleOff('cuisineList', value)
                    }
                  />
                ))}
              </div>
            </div>
            <div className='mt-3'>
              <p className='text-base text-stone-700'>Price Range</p>
              <div className=''>
                {priceRangeList.map((priceRange) => (
                  <ToggleButton
                    text={priceRange}
                    value={priceRange}
                    key={priceRange}
                    isReset={isToggleReset}
                    clearReset={() => setIsToggleReset(false)}
                    className='inline-block mt-1 mr-1 last:mr-0'
                    onToggleOn={(value) =>
                      onFilterToggleOn('priceRangeList', value)
                    }
                    onToggleOff={(value) =>
                      onFilterToggleOff('priceRangeList', value)
                    }
                  />
                ))}
              </div>
            </div>
            <div className='mt-3'>
              <p className='text-base text-stone-700'>Area</p>
              <div className=''>
                {areaList.map((area) => (
                  <ToggleButton
                    text={formatArea(area)}
                    value={area}
                    key={area}
                    isReset={isToggleReset}
                    clearReset={() => setIsToggleReset(false)}
                    className='inline-block mt-1 mr-1 last:mr-0'
                    onToggleOn={(value) => onFilterToggleOn('areaList', value)}
                    onToggleOff={(value) =>
                      onFilterToggleOff('areaList', value)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { ChowsSearchBar };
