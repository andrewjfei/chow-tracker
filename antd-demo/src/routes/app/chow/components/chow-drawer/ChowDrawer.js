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

  const { chowCategoryOptions, chowError } = useSelector((state) => state.chow);

  const [showError, setShowError] = useState(false);
  const [chowName, setChowName] = useState(chow ? chow.name : '');
  const [chowCuisine, setChowCuisine] = useState(chow ? chow.cuisine : null);
  const [chowPriceRange, setChowPriceRange] = useState(
    chow ? chow.priceRange : null
  );
  const [chowArea, setChowArea] = useState(chow ? chow.area : null);

  // useEffect(() => {
  //   resetValues();
  // });

  // const resetValues = () => {
  //   if (!chow) return;

  //   setShowError(false);
  //   setChowName(chow.name);
  //   setChowCuisine(chow.cuisine);
  //   setChowPriceRange(chow.priceRange);
  //   setChowArea(chow.area);
  // };

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
    onClose();
  };

  const onSubmitClick = () => {
    // TODO: Call update api on success update item in list

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
    };

    onSubmit(chow);
  };

  return (
    <Drawer
      title={title}
      width={420}
      onClose={onCloseClick}
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
          name: chowName,
          cuisine: chowCuisine,
          priceRange: chowPriceRange,
          area: chowArea,
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
              onChange={(event) => onNameChange(event.target.value)}
            />
          </Form.Item>
          <Form.Item name='cuisine' noStyle={true}>
            <Select
              placeholder='Select chow cuisine'
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
