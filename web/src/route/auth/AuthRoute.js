import { Button, Card, InputField } from '../../component';
import { RouteContainer } from '../../component/route-container/RouteContainer';
import { Auth } from './auth/Auth';

const AuthRoute = ({ onLogin }) => {
  return (
    <RouteContainer>
      <div className='flex col-start-[1] col-end-[6]'>
        <Auth className='flex-auto' onLogin={onLogin} />
      </div>
      <div className='flex col-start-[6] col-end-[19]'>
        <Card className='flex-auto'>
          <p className='text-9xl'>Text 9XL</p>
          <p className='text-8xl'>Text 8XL</p>
          <p className='text-7xl'>Text 7XL</p>
          <p className='text-6xl'>Text 6XL</p>
          <p className='text-5xl'>Text 5XL</p>
          <p className='text-4xl'>Text 4XL</p>
          <p className='text-3xl'>Text 3XL</p>
          <p className='text-2xl'>Text 2XL</p>
          <p className='text-xl'>Text XL</p>
          <p className='text-lg'>Text LG</p>
          <p className='text-base'>Text Base</p>
          <p className='text-sm'>Text SM</p>
          <p className='text-xs'>Text XS</p>
          <InputField placeholder='Placeholder' />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button>Default</Button>
            <Button variant='filled' colour='default'>
              Filled Default
            </Button>
            <Button variant='filled' colour='primary'>
              Filled Primary
            </Button>
            <Button variant='outline' colour='default'>
              Outline Default
            </Button>
            <Button variant='outline' colour='primary'>
              Outline Primary
            </Button>
            <Button variant='text' colour='default'>
              Text Default
            </Button>
            <Button variant='text' colour='primary'>
              Text Primary
            </Button>
          </div>
        </Card>
      </div>
    </RouteContainer>
  );
};

export { AuthRoute };
