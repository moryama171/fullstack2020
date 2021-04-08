import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';


export const useNotification = (message, error) => {
  const dispatch = useDispatch();

  const show = (message, error = false) => {
    dispatch(setNotification(message, error));
  };

  return {
    show
  };
};


export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    value,
    type,
    onChange,
    reset
  };
};
