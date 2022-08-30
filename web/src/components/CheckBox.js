const CheckBox = ({ label }) => {
  return (
    <div className='flex items-center'>
      <input
        type='checkbox'
        className='p-2 mr-2 text-orange-400 bg-white border-2 border-gray-200 rounded-md outline-none focus:ring-transparent focus:border-orange-500'
      />
      <p className='text-sm text-neutral-500'>{label}</p>
    </div>
  );
};

export { CheckBox };
