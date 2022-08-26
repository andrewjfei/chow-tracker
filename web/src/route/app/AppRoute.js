import { PlusIcon } from '@heroicons/react/24/solid';
import {
  WelcomeWidget,
  RankingWidget,
  RouteContainer,
  CardListWidget,
  InputField,
  Button,
} from '../../component';
import { ChowList } from './chow-list/ChowList';
import { NavBar } from './nav-bar/NavBar';
import {
  updateChowList,
  useGetChowListMutation,
  useGetPopularityChowRankingQuery,
  useGetCuisineChowRankingQuery,
  useGetPriceRangeChowRankingQuery,
  useGetAreaChowRankingQuery,
  updateChowListFilter,
} from '../../redux/slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { SuggestionsInput } from '../../component/suggestions-input/SuggestionsInput';
import { ChowsSearchBar } from './chow-search-bar/ChowSearchBar';

const AppRoute = () => {
  const dispatch = useDispatch();
  // const { data: chowList, isSuccess } = useGetChowListQuery();
  const { data: popularityData, isSuccess: isPopularityDataSuccess } =
    useGetPopularityChowRankingQuery();
  const { data: cuisineData, isSuccess: isCuisineDataSuccess } =
    useGetCuisineChowRankingQuery();
  const { data: priceRangeData, isSuccess: isPriceRangeDataSuccess } =
    useGetPriceRangeChowRankingQuery();
  const { data: areaData, isSuccess: isAreaDataSuccess } =
    useGetAreaChowRankingQuery();

  const [getChowList] = useGetChowListMutation();
  const { filter } = useSelector((state) => state.chowListFilter);

  useEffect(() => {
    getChowList(filter).then(({ data, error }) => {
      // console.log(result);
      if (error) {
        console.log(error);
      }
      console.log(data);
      dispatch(updateChowList(data));
    });
  }, []);

  // const rankingData = [
  //   {
  //     ranking: 1,
  //     itemName: "Pakuranga McDonald's",
  //     hasBeen: 25,
  //   },
  //   {
  //     ranking: 2,
  //     name: 'Fish & Chips',
  //     count: 21,
  //   },
  //   {
  //     ranking: 3,
  //     name: 'Porterhouse Grill',
  //     count: 18,
  //   },
  // ];

  return (
    <RouteContainer>
      <div className='flex col-start-[1] col-end-[2]'>
        <NavBar className='flex-auto' />
      </div>
      <div className='flex flex-col col-start-[2] col-end-[12]'>
        <WelcomeWidget />
        <div className='flex mt-5 mb-10'>
          <div className='flex flex-row justify-between items-end'>
            <p className='text-xl text-stone-700'>Chow Rankings</p>
          </div>
        </div>
        <div className='flex-auto grid grid-cols-2 gap-x-5 gap-y-10'>
          {isPopularityDataSuccess && (
            <RankingWidget title='Popularity' data={popularityData} />
          )}
          {isCuisineDataSuccess && (
            <RankingWidget title='Cuisine' data={cuisineData} />
          )}
          {isPriceRangeDataSuccess && (
            <RankingWidget title='Price Range' data={priceRangeData} />
          )}
          {isAreaDataSuccess && <RankingWidget title='Area' data={areaData} />}
        </div>
      </div>
      <div className='flex flex-col col-start-[12] col-end-[19]'>
        <ChowsSearchBar placeholder='Search Chow' />
        {/* <InputField placeholder='Search Chow' onChange={onSearch} /> */}
        <div className='flex flex-col flex-auto'>
          <div className='flex flex-row justify-between items-end mt-5 mb-3'>
            <p className='text-xl text-stone-700'>Chow List</p>
            <Button variant='outline' onClick={() => {}}>
              <PlusIcon className='h-5 mr-3 stroke- stroke-orange-400' />
              Add New Chow
            </Button>
          </div>
          <CardListWidget className='flex justify-center flex-auto h-0'>
            <ChowList />
          </CardListWidget>
        </div>
      </div>
    </RouteContainer>
  );
};

export { AppRoute };
