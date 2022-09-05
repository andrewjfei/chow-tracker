import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Drawer, Form, Input, Select, Space } from 'antd';

import {
  formatAreaOption,
  formatAreaOptionForKey,
} from '../../../../../utils/formatUtil';
import { setChowError } from '../../../../../redux/slices';

import styles from './ChowDrawer.module.less';

const ChowDrawer = ({
  title,
  onClose,
  visible,
  chow,
  formSubmitText = 'Save',
  onSubmit,
}) => {
  const dispatch = useDispatch();

  const { chowCategoryOptions, chowList, chowError } = useSelector(
    (state) => state.chow
  );

  const [chowName, setChowName] = useState(chow ? chow.name : '');
  const [chowCuisine, setChowCuisine] = useState(chow ? chow.cuisine : null);
  const [chowPriceRange, setChowPriceRange] = useState(
    chow ? chow.priceRange : null
  );
  const [chowArea, setChowArea] = useState(chow ? chow.area : null);
  const [chowHasBeen, setChowHasBeen] = useState(chow ? chow.hasBeen : 0);

  useEffect(() => {
    resetValues();
  }, [chowList]);

  const resetValues = () => {
    onAlertClose();
    setChowName(chow ? chow.name : '');
    setChowCuisine(chow ? chow.cuisine : null);
    setChowPriceRange(chow ? chow.priceRange : null);
    setChowArea(chow ? chow.area : null);
    setChowHasBeen(chow ? chow.hasBeen : 0);
  };

  const onAlertClose = () => {
    dispatch(setChowError(null));
  };

  const onNameChange = (value) => {
    setChowName(value);
  };

  const onCuisineCategoryChange = (value) => {
    setChowCuisine(value);
  };

  const onPriceRangeCategoryChange = (value) => {
    setChowPriceRange(value);
  };

  const onAreaCategoryChange = (value) => {
    setChowArea(value);
  };

  const onCloseClick = () => {
    resetValues();
    onClose();
  };

  const onSubmitClick = () => {
    if (chowName.length === 0 || !chowCuisine || !chowPriceRange || !chowArea) {
      dispatch(
        setChowError({ code: -1, description: 'All fields are required.' })
      );
      return;
    }

    const chow = {
      name: chowName,
      cuisine: chowCuisine,
      priceRange: chowPriceRange,
      area: chowArea,
      hasBeen: chowHasBeen,
    };

    resetValues();
    onSubmit(chow);
  };

  return (
    <Drawer
      title={title}
      width={420}
      onClose={onCloseClick}
      destroyOnClose={true}
      visible={visible}
      extra={
        <Button onClick={onSubmitClick} type='primary' htmlType='submit'>
          {formSubmitText}
        </Button>
      }
    >
      <Form
        name='chow-form'
        initialValues={{
          name: chow ? chow.name : '',
          cuisine: chow ? chow.cuisine : null,
          priceRange: chow ? chow.priceRange : null,
          area: chow ? chow.area : null,
        }}
        autoComplete='off'
        className={`${styles.chowForm}`}
      >
        <Space
          direction='vertical'
          size='middle'
          className={`${styles.formItem}`}
        >
          {chowError && (
            <Alert
              type='error'
              afterClose={onAlertClose}
              showIcon
              message={chowError.description}
              closable
            />
          )}
          <Form.Item name='name' noStyle={true}>
            <Input
              placeholder='Enter chow name'
              type='text'
              value={chowName}
              onChange={(event) => onNameChange(event.target.value)}
            />
          </Form.Item>
          <Form.Item name='cuisine' noStyle={true}>
            <Select
              placeholder='Select chow cuisine'
              value={chowCuisine}
              onChange={onCuisineCategoryChange}
              className={`${styles.select}`}
            >
              {chowCategoryOptions &&
                chowCategoryOptions.cuisineOptions.map((option) => (
                  <Select.Option
                    key={option.toLocaleLowerCase()}
                    value={option}
                  >
                    {option}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name='priceRange' noStyle={true}>
            <Select
              placeholder='Select chow price range'
              value={chowPriceRange}
              onChange={onPriceRangeCategoryChange}
              className={`${styles.select}`}
            >
              {chowCategoryOptions &&
                chowCategoryOptions.priceRangeOptions.map((option) => (
                  <Select.Option
                    key={option.toLocaleLowerCase()}
                    value={option}
                  >
                    {option}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name='area' noStyle={true}>
            <Select
              placeholder='Select chow area'
              value={chowArea}
              onChange={onAreaCategoryChange}
              className={`${styles.select}`}
            >
              {chowCategoryOptions &&
                chowCategoryOptions.areaOptions.map((option) => (
                  <Select.Option
                    key={formatAreaOptionForKey(option.toLocaleLowerCase())}
                    value={option}
                  >
                    {formatAreaOption(option)}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Space>
      </Form>
    </Drawer>
  );
};

export { ChowDrawer };
