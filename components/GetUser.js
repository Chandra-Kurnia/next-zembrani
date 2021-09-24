/* eslint-disable react-hooks/exhaustive-deps */
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {getProfile} from '../redux/actions/userAction';

const GetUser = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile);
  }, []);
  return <>{props.children}</>;
};

export default GetUser;
