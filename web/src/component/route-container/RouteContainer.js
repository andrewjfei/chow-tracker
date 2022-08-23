// import styles from './RouteContainer.module.css';

const RouteContainer = ({ children }) => {
  return (
    <div className='grid grid-cols-layout gap-8 h-screen p-8 bg-stone-100'>
      {children}
    </div>
  );
};

export { RouteContainer };
