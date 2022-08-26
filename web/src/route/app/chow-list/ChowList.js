import { ChowListItem } from './chow-list-item/ChowListItem';
import { useSelector } from 'react-redux';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useGetChowListMutation } from '../../../redux/slice';
import { Loading } from '../../../component';

const ChowList = ({ className }) => {
  // const { data: chowList, isSuccess, isLoading } = useGetChowListQuery();
  const { chowList } = useSelector((state) => state.chowList);

  console.log(chowList);

  if (chowList === undefined) {
    return null;
  }

  return chowList === null ? (
    <Loading />
  ) : chowList.length === 0 ? (
    <div className='flex flex-col justify-center'>
      <ExclamationCircleIcon className='h-8 stroke-stone-700' />
      <p className='text-sm text-stone-700 font-base mt-2'>
        No Chow Items Found
      </p>
    </div>
  ) : (
    <ul className={`${className} flex-auto overflow-auto px-3 pt-3`}>
      {chowList.map((chowVenue) => (
        <li className='mb-2 last:mb-3'>
          <ChowListItem chowVenue={chowVenue} />
        </li>
      ))}
    </ul>
  );
};

export { ChowList };
