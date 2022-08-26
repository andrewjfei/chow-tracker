import {
  QrCodeIcon,
  EllipsisVerticalIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

import { Card, Button, Tag } from '../../../../component';

const PRICE_RANGE_MAP = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
};

const ChowListItem = ({ chowVenue }) => {
  const formatArea = (area) => {
    return area.replace('_', ' ');
  };

  const createPiceRangeObject = (priceRange) => {
    return Array(PRICE_RANGE_MAP[priceRange]).fill();
  };

  return (
    <Card variant='outline' className='flex flex-row justify-between p-2'>
      <div className='flex flex-row items-center'>
        <Card variant='outline' className='p-2'>
          <QrCodeIcon className='h-8' />
        </Card>
        <div className='flex flex-col ml-3'>
          <div className='flex flex-row items-center'>
            <p className='text-base'>{chowVenue.name}</p>
            <div className='flex flex-row ml-2'>
              {createPiceRangeObject(chowVenue.priceRange).map((i) => (
                <CurrencyDollarIcon className='h-5' />
              ))}
            </div>
          </div>
          <div className='inline-flex mt-1'>
            <Tag text={formatArea(chowVenue.area)} />
          </div>
        </div>
      </div>
      <Button className='px-2 py-2' variant='text' colour='default'>
        <EllipsisVerticalIcon className='h-8' />
      </Button>
    </Card>
  );
};

export { ChowListItem };
