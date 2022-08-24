const RouteContainer = ({ children }) => {
  return (
    <div className='grid grid-cols-layout gap-5 h-screen p-5 bg-stone-100'>
      {children}
    </div>
  );
};

export { RouteContainer };
