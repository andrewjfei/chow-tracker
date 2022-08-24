import { Card } from '../../card/Card';

const WelcomeWidget = ({ className }) => {
  return (
    <Card className={`${className} p-7`}>
      <p className='text-2xl text-stone-700'>Welcome, Joe Bloggs!</p>
      <div className='mt-5 w-4/6'>
        <p className='text-base text-stone-700'>
          Having Trouble deciding what to eat?
        </p>
        <p className='text-base text-stone-700'>
          We've gone ahead and done the dirty work for you have have ranked all
          the chow destinations you have been to in the past.
        </p>
        <p className='text-base text-stone-700'>
          Hopefully this can help you decide your next meal.
        </p>
      </div>
    </Card>
  );
};

export { WelcomeWidget };
