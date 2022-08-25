import {
  ArrowRightOnRectangleIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import { Card, Button } from '../../../component';
import { useDispatch } from 'react-redux';
import { updateAuthUser } from '../../../redux/slice';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem('accessToken');
    dispatch(updateAuthUser(null));
    navigate('/auth');
  };

  return (
    <Card
      className={`${className} flex flex-col justify-between p-2 bg-orange-500 shadow-orange-400 shadow-sm`}
    >
      <Button className='px-2 py-2' variant='text'>
        <HomeIcon className='w-full stroke-2 stroke-orange-100' />
      </Button>
      <Button className='px-2 py-2' variant='text' onClick={onLogout}>
        <ArrowRightOnRectangleIcon className='w-full rotate-180 stroke-2 stroke-orange-100' />
      </Button>
    </Card>
  );
};

export { NavBar };
