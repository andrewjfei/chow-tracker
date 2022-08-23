import { useState, cloneElement } from 'react';

import styles from './InputField.module.css';

const InputField = ({
  className,
  label,
  placeholder,
  prefixIcon,
  suffixIcon,
}) => {
  const [value, setValue] = useState('');

  const onInputFieldChange = (value) => setValue(value);

  const getStyledIcon = (icon) => {
    return cloneElement(icon, {
      className: `${icon.props.className} ${styles.icon}`,
    });
  };

  return (
    <div className={`${className} ${styles.inputFieldContainer}`}>
      {label && <p className={`${styles.inputFieldLabel} p2`}>{label}</p>}

      <div className={styles.inputFieldNestedContainer}>
        {prefixIcon && (
          <div className={`${styles.iconContainer} icon-sm`}>
            {getStyledIcon(prefixIcon)}
          </div>
        )}
        <input
          type='text'
          className={`${styles.inputField} p2`}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onInputFieldChange(event.target.value)}
        />
        {suffixIcon && (
          <div className={`${styles.iconContainer} icon-sm`}>
            {getStyledIcon(suffixIcon)}
          </div>
        )}
      </div>
    </div>
  );
};

export { InputField };
