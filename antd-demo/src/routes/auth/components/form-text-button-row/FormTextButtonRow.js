import { Button } from 'antd';

import styles from './FormTextButtonRow.module.less';

const FormTextButtonRow = ({ text, buttonText, onClick }) => {
  return (
    <div className={`${styles.formTextButtonRowContainer}`}>
      <p className={`${styles.text}`}>{text}</p>
      <Button type='link' onClick={onClick} className={`${styles.button}`}>
        {buttonText}
      </Button>
    </div>
  );
};

export { FormTextButtonRow };
