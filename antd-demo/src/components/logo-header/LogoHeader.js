import BugTwoTone from '@ant-design/icons/BugTwoTone';

import styles from './LogoHeader.module.less';

const LogoHeader = () => {
  return (
    <div className={`${styles.logoHeaderContainer}`}>
      <BugTwoTone className={`${styles.icon}`} twoToneColor='#ff7b33' />
      <p className={`${styles.text}`}>Chow Tracker</p>
    </div>
  );
};

export { LogoHeader };
