import BugTwoTone from '@ant-design/icons/BugTwoTone';

import styles from './LogoHeader.module.less';

const LogoHeader = () => {
  return (
    <div className={`${styles.logoHeaderContainer}`}>
      <BugTwoTone className={`${styles.icon}`} twoToneColor='#FF7B33' />
      <p className={`${styles.text}`}>Ant Design Demo</p>
    </div>
  );
};

export { LogoHeader };
