import { useNavigate } from 'react-router-dom';
import { Button, Card, Tooltip } from 'antd';
import BugTwoTone from '@ant-design/icons/BugTwoTone';
import HomeOutlined from '@ant-design/icons/HomeOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';

import styles from './NavBar.module.less';
import { constants } from '../../../../constants';

const NavBar = () => {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    localStorage.removeItem(constants.localStorage.tokenKey);
    navigate('/auth');
  };

  return (
    <Card
      className={`${styles.navBarContainer}`}
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
        height: '100%',
      }}
    >
      <div className={`${styles.logo}`}>
        <BugTwoTone className={`${styles.icon}`} twoToneColor='#ff7b33' />
      </div>
      <div className={`${styles.navContainer}`}>
        <Tooltip placement='right' title='Home'>
          <Button
            type='text'
            icon={<HomeOutlined className={`${styles.icon}`} />}
            size='large'
            className={`${styles.button}`}
          />
        </Tooltip>
        <Tooltip placement='right' title='Logout'>
          <Button
            type='text'
            icon={<LogoutOutlined rotate={180} className={`${styles.icon}`} />}
            className={`${styles.button}`}
            onClick={onLogoutClick}
          />
        </Tooltip>
      </div>
    </Card>
  );
};

export { NavBar };
