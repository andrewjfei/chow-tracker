import { Button } from '../../component';
import { RouteContainer } from '../../component/route-container/RouteContainer';
import { Auth } from './auth/Auth';
import styles from './AuthRoute.module.css';

const AuthRoute = () => {
  return (
    <RouteContainer>
      <div className={styles.authColumn}>
        <Auth className={styles.auth} />
      </div>
      <div className={styles.imageColumn}>
        <div className={styles.image} style={{ border: 'solid 3px orange' }}>
          <p className='h1'>Heading 1</p>
          <p className='h2'>Heading 2</p>
          <p className='h3'>Heading 3</p>
          <p className='h4'>Heading 4</p>
          <p className='h5'>Heading 5</p>
          <p className='h6'>Heading 6</p>
          <p className='s1'>Subtitle 1</p>
          <p className='s2'>Subtitle 2</p>
          <p className='p1'>Paragraph 1</p>
          <p className='p2'>Paragraph 2</p>
          <p className='c1'>Caption 1</p>
          <p className='c2'>Caption 2</p>
          <p className='l1'>Label 1</p>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button text='Default' />
            <Button text='Filled Default' variant='filled' colour='default' />
            <Button text='Filled Primary' variant='filled' colour='primary' />
            <Button text='Outline Default' variant='outline' colour='default' />
            <Button text='Outline Primary' variant='outline' colour='primary' />
          </div>
        </div>
      </div>
    </RouteContainer>
  );
};

export { AuthRoute };
