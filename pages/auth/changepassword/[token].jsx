/* eslint-disable react-hooks/exhaustive-deps */
import {Fragment} from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import swal from 'sweetalert';
import Head from 'next/head';

const Changepassword = () => {
  const {query, push} = useRouter();
  const [newPassword, setnewPassword] = useState({
    password: '',
    password2: '',
  });
  const handleNewPassword = (e) => {
    setnewPassword({
      ...newPassword,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword = () => {
    axios
      .post(`${process.env.API_SERVER}/user/changepassword/${query.token}`, newPassword)
      .then(() => {
        swal('Success', 'Change password sucessfull, now you can login with your new password', 'success').then(() => {
          push('/auth/login');
        });
      })
      .catch((err) => {
        if (err.response.data.error[0] === undefined) {
          swal('Error', err.response.data.message, 'error');
        } else {
          swal('Error', err.response.data.error[0].msg, 'error');
        }
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.API_SERVER}/user/checktokenforgotpassword/${query.token}`)
      .then((res) => {
        swal('Success', 'Sucessfully reset password, now you can create new password');
      })
      .catch((err) => {
        swal('Error', err.response.data.message, 'error').then(() => {
          push('/auth/login');
        });
      });
  }, [query.token]);
  return (
    <Fragment>
      <Head>
        <title>Zembrani | Change password</title>
      </Head>
      <input onChange={(e) => handleNewPassword(e)} type="password" name="password" />
      <input onChange={(e) => handleNewPassword(e)} type="password" name="password2" />
      <button onClick={() => handleChangePassword()}>reset password</button>
    </Fragment>
  );
};

export default Changepassword;
