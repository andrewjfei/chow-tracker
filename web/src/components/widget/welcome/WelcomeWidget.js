import { useSelector } from 'react-redux';

import { Card } from '../../Card';

const styles = {
  welcomeWidget: 'p-7',
  welcomeTitle: 'text-2xl text-stone-700',
  welcomeDescriptionContainer: 'mt-5 w-4/6',
  welcomeDescription: 'text-base text-stone-700',
};

const WelcomeWidget = ({ className }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Card className={`${className} ${styles.welcomeWidget}`}>
      <p
        className={`${styles.welcomeTitle}`}
      >{`Welcome, ${user?.firstName} ${user?.lastName}!`}</p>
      <div className={`${styles.welcomeDescriptionContainer}`}>
        <p className={`${styles.welcomeDescription}`}>
          Having Trouble deciding what to eat?
        </p>
        <p className={`${styles.welcomeDescription}`}>
          We've gone ahead and done the dirty work for you have have ranked all
          the chow destinations you have been to in the past.
        </p>
        <p className={`${styles.welcomeDescription}`}>
          Hopefully this can help you decide your next meal.
        </p>
      </div>
    </Card>
  );
};

export { WelcomeWidget };
