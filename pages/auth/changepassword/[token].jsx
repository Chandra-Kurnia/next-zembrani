/* eslint-disable react-hooks/exhaustive-deps */
import {Fragment} from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import swal from 'sweetalert';
import Head from 'next/head';
import Link from 'next/link'
import back from '../../../assets/icons/back.png';
import Image from 'next/image';
import InputAuth from '../../../components/base/InputAuth';
import ButtonAuth from '../../../components/base/ButtonAuth';
import styles from '../../../styles/forgotpassword.module.css';

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
    // axios
    //   .get(`${process.env.API_SERVER}/user/checktokenforgotpassword/${query.token}`)
    //   .then((res) => {
    //     swal('Success', 'Sucessfully reset password, now you can create new password');
    //   })
    //   .catch((err) => {
    //     swal('Error', err.response.data.message, 'error').then(() => {
    //       push('/auth/login');
    //     });
    //   });
  }, [query.token]);
  return (
    <Fragment>
      <Head>
        <title>Zembrani | Change password</title>
      </Head>
      <input onChange={(e) => handleNewPassword(e)} type="password" name="password" />
      <input onChange={(e) => handleNewPassword(e)} type="password" name="password2" />
      <button onClick={() => handleChangePassword()}>reset password</button>
      <div className={styles.cover}>
        <div className={styles.content}>
          <div className="container pt-5">
            <Link href="login">
              <a className="text-decoration-none">
                <div className="d-flex align-content-center">
                  <Image src={back} alt="back" width="20px" height="5px" />
                  <span className="d-inline-block ps-4">Back</span>
                </div>
              </a>
            </Link>
          </div>
          <div className="text-center">
            <span className={styles.title}>Don’t worry, we got your back!</span> <br />
            <div className={styles.msg}>
              <span>
                You will receive a link to reset your password. If you haven’t received any link, click resend link
              </span>
            </div>
            <div className="mt-5 pt-lg-5 pt-md-5 pt-2">
              <InputAuth
                onChange={(e) =>
                  setemail({
                    [e.target.name]: e.target.value,
                  })
                }
                name="email"
                placeholder="Enter your email address"
              />
              <ButtonAuth text="Send Link" bgcolor="bg-orange" onClick={() => handleSend()} />
              <ButtonAuth text="Resend Link" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Changepassword;
