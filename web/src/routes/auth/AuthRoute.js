import { Button, Card, InputField, Spacer, CheckBox } from '../../components';
import { RouteContainer } from '../../components/RouteContainer';
import { Auth } from './components/Auth';
import RamenDiningRoundedIcon from '@mui/icons-material/RamenDiningRounded';
import { LoginForm } from './components/LoginForm';

const AuthRoute = () => {
  return (
    <RouteContainer className='items-center'>
      <Card className='col-start-7 col-end-13 p-10'>
        <Spacer size='sm' />
        <div className='flex justify-center items-center'>
          <RamenDiningRoundedIcon
            color='primary'
            fontSize='large'
            sx={{
              fill: 'rgb(249 115 22)',
              marginRight: '0.5rem',
            }}
          />
          <p className='text-xl text-orange-500 font-semibold uppercase'>
            Chow Tracker
          </p>
        </div>
        <Spacer size='lg' />
        <LoginForm />
      </Card>
    </RouteContainer>
  );
};

export { AuthRoute };
