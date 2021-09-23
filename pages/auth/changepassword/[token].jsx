/* eslint-disable react-hooks/exhaustive-deps */
import {Fragment, useState, useEffect} from 'react';
import Footer from '../../../components/modules/Footer';
import styles from '../../../styles/forgotpassword.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';
import back from '../../../assets/icons/back.png';
import Image from 'next/image';
import InputAuth from '../../../components/base/InputAuth';
import ButtonAuth from '../../../components/base/ButtonAuth';
import Head from 'next/head';
import axios from 'axios';
import swal from 'sweetalert';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';

const ForgotPassword = () => {
  const {user} = useSelector((state) => state.user);
  const [newPassword, setnewPassword] = useState({
    password: '',
    password2: '',
  });
  const {push, query} = useRouter();
  if (Object.keys(user).length > 0) {
    push('/');
  }

  useEffect(() => {
    axios
      .get(`${process.env.API_SERVER}/user/checktokenforgotpassword/${query.token}`)
      .then((res) => {
        swal('Success', 'Password reset success, now you can create new password');
      })
      .catch((err) => {
        try {
          swal('Error', err.response.data.message, 'error').then(() => {
            push('/auth/login');
          });
        } catch {
          swal('Error', 'Unknown Error, Please try again later');
        }
      });
  }, [query.token]);

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
        try {
          if (err.response.data.error[0] === undefined) {
            swal('Error', err.response.data.message, 'error');
          } else {
            swal('Error', err.response.data.error[0].msg, 'error');
          }
        } catch {
          swal('Error', 'Unknown error, please try again later', 'error');
        }
      });
  };
  return (
    <Fragment>
      <Head>
        <title>Zembrani | Reset Password</title>
      </Head>
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
              <span>Please change your password, with a strong word and easy to remember.</span>
            </div>
            <div className="mt-5 pt-lg-5 pt-md-5 pt-2">
              <InputAuth
                onChange={(e) => handleNewPassword(e)}
                name="password"
                placeholder="Insert your new password"
              />
              <InputAuth
                onChange={(e) => handleNewPassword(e)}
                name="password2"
                placeholder="Compare your new password"
              />
              <ButtonAuth text="Change Password" bgcolor="bg-orange" onClick={() => handleChangePassword()} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default ForgotPassword;
