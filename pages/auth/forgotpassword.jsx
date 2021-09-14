import {Fragment, useState} from 'react';
import Footer from '../../components/modules/Footer';
import styles from '../../styles/forgotpassword.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';
import back from '../../assets/icons/back.png';
import Image from 'next/image';
import InputAuth from '../../components/base/InputAuth';
import ButtonAuth from '../../components/base/ButtonAuth';
import Head from 'next/head';
import axios from 'axios';
import swal from 'sweetalert';
import {useRouter} from 'next/router';
import { useSelector } from 'react-redux';

const ForgotPassword = () => {
  const {user} = useSelector(state => state.user)
  const {push} = useRouter();
  if(Object.keys(user).length > 0){
    push('/')
  }
  const [email, setemail] = useState({
    email: '',
  });
  const handleSend = () => {
    axios
      .post(`${process.env.API_SERVER}/user/forgotpassword`, email)
      .then(() => {
        swal('Success', 'We send email reset password for you, check it :D', 'success').then(() => {
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default ForgotPassword;
