const styles = {
  inputField: {
    base: 'px-3 py-2 bg-white border-2 border-gray-200 rounded-md text-sm text-stone-700 font-regular placeholder:text-stone-500 hover:cursor-text focus:ring-0 focus:outline-none focus:border-orange-600',
    dropShadow: 'drop-shadow-sm',
  },
};

const InputField = ({
  className,
  type = 'text',
  placeholder,
  value,
  onChange,
  dropShadow = false,
}) => {
  return (
    <input
      type={type}
      className={`${className} ${styles.inputField.base} ${
        dropShadow ? styles.inputField.dropShadow : null
      }`}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export { InputField };
