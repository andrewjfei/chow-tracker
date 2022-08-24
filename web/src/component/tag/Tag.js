const Tag = ({ className, text }) => {
  return (
    <div
      className={`${className} flex items-center px-2 py-1 bg-orange-50 border border-orange-300 rounded-md text-tag text-orange-500 font-regular`}
    >
      {text}
    </div>
  );
};

export { Tag };
