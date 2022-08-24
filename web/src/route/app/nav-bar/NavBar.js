import {
  ArrowRightOnRectangleIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import { Card, Button } from '../../../component';

const NavBar = ({ className }) => {
  return (
    <Card
      className={`${className} flex flex-col justify-between p-2 bg-orange-500 shadow-orange-400 shadow-sm`}
    >
      <Button className='px-2 py-2' variant='text'>
        <HomeIcon className='w-full stroke-2 stroke-orange-100' />
      </Button>
      <Button className='px-2 py-2' variant='text'>
        <ArrowRightOnRectangleIcon className='w-full rotate-180 stroke-2 stroke-orange-100' />
      </Button>
    </Card>
  );
};

export { NavBar };
