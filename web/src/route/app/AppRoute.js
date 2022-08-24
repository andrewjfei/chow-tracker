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

const AppRoute = () => {
  const rankingData = [
    {
      ranking: 1,
      name: "Pakuranga McDonald's",
      count: 25,
    },
    {
      ranking: 2,
      name: 'Fish & Chips',
      count: 21,
    },
    {
      ranking: 3,
      name: 'Porterhouse Grill',
      count: 18,
    },
  ];
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
          <RankingWidget title='Popularity' data={rankingData} />
          <RankingWidget title='Cuisine' data={rankingData} />
          <RankingWidget title='Price Range' data={rankingData} />
          <RankingWidget title='Area' data={rankingData} />
        </div>
      </div>
      <div className='flex flex-col col-start-[12] col-end-[19]'>
        <InputField placeholder='Text' />
        <div className='flex flex-col flex-auto'>
          <div className='flex flex-row justify-between items-end mt-5 mb-3'>
            <p className='text-xl text-stone-700'>Chow List</p>
            <Button variant='outline'>
              <PlusIcon className='h-5 mr-3 stroke- stroke-orange-400' />
              Add New Chow
            </Button>
          </div>
          <CardListWidget className='flex flex-auto h-0'>
            <ChowList />
          </CardListWidget>
        </div>
      </div>
    </RouteContainer>
  );
};

export { AppRoute };
