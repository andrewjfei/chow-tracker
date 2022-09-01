import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Button, Drawer, Form, Input, Select, Space } from 'antd';

import {
  formatAreaOption,
  formatAreaOptionForKey,
} from '../../../../../utils/formatUtil';

import styles from './ChowDrawer.module.less';

const ChowDrawer = ({
  title,
  onClose,
  visible,
  chow,
  formSubmitText = 'Save',
  onSubmit,
}) => {
  const { chowCategoryOptions } = useSelector((state) => state.chow);

  const [showError, setShowError] = useState(false);
  const [chowName, setChowName] = useState(chow ? chow.name : '');
  const [chowCuisine, setChowCuisine] = useState(chow ? chow.cuisine : null);
  const [chowPriceRange, setChowPriceRange] = useState(
    chow ? chow.priceRange : null
  );
  const [chowArea, setChowArea] = useState(chow ? chow.area : null);

  // useEffect(() => {
  //   resetValues();
  // }, [chow]);

  // const resetValues = () => {
  //   if (!chow) return;

  //   console.log('Setting Chow Values');
  //   console.log(chow);
  //   setShowError(false);
  //   setChowName(chow.name);
  //   setChowCuisine(chow.cuisine);
  //   setChowPriceRange(chow.priceRange);
  //   setChowArea(chow.area);
  // };

  const onAlertClose = () => {
    setShowError(false);
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
      setShowError(true);
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
      bodyStyle={{ paddingBottom: 80 }}
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
          {showError && (
            <Alert
              type='error'
              afterClose={onAlertClose}
              showIcon
              message='All fields are required.'
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
