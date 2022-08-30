import { useState } from 'react';
import { Card, Button } from '../../../components';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

const Auth = ({ className }) => {
  const [isLoginFormSelected, setIsLoginFormSelected] = useState(true);

  return (
    <Card variant='outline' className={`${className} flex flex-col`}>
      <div className='mt-20 flex flex-row justify-center'>Logo</div>
      <div className='mt-10'>
        <div className='flex flex-row justify-around'>
          <Button
            variant='text'
            colour='default'
            onClick={() => setIsLoginFormSelected(true)}
          >
            Login
          </Button>
          <Button
            variant='text'
            colour='default'
            onClick={() => setIsLoginFormSelected(false)}
          >
            Register
          </Button>
        </div>
        {isLoginFormSelected ? <LoginForm /> : <RegisterForm />}
      </div>
    </Card>
  );
};

export { Auth };
