import { useEffect, useState } from 'react';

const styles = {
  toggleButton: {
    base: 'px-2 py-1 border-2 rounded-md text-sm select-none hover:cursor-pointer',
    off: 'bg-blue-50 border-blue-200 text-blue-300',
    on: 'bg-blue-100 border-blue-400 text-blue-500',
  },
};

const ToggleButton = ({
  className,
  text,
  value,
  onToggleOn,
  onToggleOff,
  isReset = false,
  clearReset,
}) => {
  const [isToggledOn, setIsToggledOn] = useState(false);

  useEffect(() => {
    if (isReset) {
      setIsToggledOn(false);
      clearReset();
    }
  }, [isReset, clearReset]);

  const onButtonClick = () => {
    isToggledOn ? onToggleOff(value) : onToggleOn(value);
    setIsToggledOn(!isToggledOn);
  };

  return (
    <div
      onClick={onButtonClick}
      className={`${className} ${styles.toggleButton.base} ${
        isToggledOn ? styles.toggleButton.on : styles.toggleButton.off
      }`}
    >
      {text}
    </div>
  );
};

export { ToggleButton };
