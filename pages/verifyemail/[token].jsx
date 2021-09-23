/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import {Fragment} from 'react';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Head from 'next/head';
import styles from '../../styles/verifyEmail.module.css'
import appLogo from '../../assets/logos/app-logo.png'
import swal from 'sweetalert';

const VerifyEmail = () => {
  const {push, query} = useRouter();
  const [statusActivation, setstatusActivation] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.API_SERVER}/user/activation/${query.token}`)
      .then(() => {
        setstatusActivation(true);
      })
      .catch((err) => {
        console.log(err.response);
        setstatusActivation(false);
      });
  }, [query.token]);

  const redirectLogin = () => {
    push('/auth/login')
  }

  const TryAgain = () => {
    console.log(query.email);
  }
  return (
    <Fragment>
      <Head>
        <title>Zembrani | User Activation</title>
      </Head>
      {statusActivation ? 
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <img className={styles.appLogo} src={appLogo.src} alt="" />
          <span className={styles.tittle}>Activation Success</span>
          <span className={styles.msg}>
          Your account has been successfully activated, please login for further access
          </span>
          <button onClick={redirectLogin} className={`bg-orange ${styles.btnLogin}`}>Login Now !</button>
        </div>
      </div>
      :
      <div className={styles.wrapper}>
        <div className={styles.contentFailed}>
          <img className={styles.appLogo} src={appLogo.src} alt="" />
          <span className={styles.tittleFailed}>Activation Failed!</span>
          <span className={styles.msg}>
          your account activation failed, please wait a moment or try again.
          </span>
          <button onClick={TryAgain} className={`bg-orange ${styles.btnLogin}`}>Try activation again</button>
        </div>
      </div>
    }
    </Fragment>
  );
};

export default VerifyEmail;
