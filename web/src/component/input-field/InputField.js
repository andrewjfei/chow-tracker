import { useState } from 'react';

const styles = {
  inputFieldContainer: 'flex flex-col',
  inputFieldLabel: 'py-1 text-sm text-stone-700 font-medium',
  inputField:
    'px-4 py-2 bg-white border-2 border-stone-300 rounded-lg text-sm text-stone-700 font-regular placeholder:text-stone-400 hover:cursor-text focus:outline-none focus:border-orange-600',
};

const InputField = ({ className, type = 'text', label, placeholder }) => {
  const [value, setValue] = useState('');

  const onInputFieldChange = (value) => setValue(value);

  return (
    <div className={styles.inputFieldContainer}>
      {label && <p className={styles.inputFieldLabel}>{label}</p>}
      <input
        type={type}
        className={`${className} ${styles.inputField}`}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onInputFieldChange(event.target.value)}
      />
    </div>
  );
};

export { InputField };
