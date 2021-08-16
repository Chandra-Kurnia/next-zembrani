import {Fragment} from 'react';
import Footer from '../../components/modules/Footer';
import styles from '../../styles/login.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import InputAuth from '../../components/base/InputAuth';
import Link from 'next/link';
import ButtonAuth from '../../components/base/ButtonAuth';
import ButtonLoginGoogle from '../../components/base/ButtonLoginGoogle';
import Line from '../../assets/img/line.png';
import Image from 'next/image';
import Head from 'next/head';

const login = () => {
  return (
    <Fragment>
      <Head>
        <title>Zembrani | Login</title>
      </Head>
      <div className={styles.cover}>
        <div className={`${styles.content} container`}>
          <div className="row">
            <div className="col-lg-5 col-12 col-md-12">
              <span className={styles.titleCover}>Le’ts Explore The World</span>
              <br />
              <div className={styles.signupbtn}>
                <span className={`${styles.question} d-inline-block mt-4`}>Dont have account ?</span>
                <Link href='/auth/signUp'>
                  <a>
                    <ButtonAuth text="Sign Up" bgcolor="bg-black" />
                  </a>
                </Link>
              </div>
              <br />
            </div>
            <div className="col-2 text-center d-none d-lg-block d-md-none">
              <Image src={Line} alt="line" className="mt-5" />
            </div>
            <div className={`col-lg-5 col-12 ${styles.rightAuth}`}>
              <InputAuth type="text" placeholder="Email" /> <br />
              <InputAuth type="password" placeholder="Password" />
              <Link href="forgotpassword">
                <a>Forgot Password ?</a>
              </Link>{' '}
              <br />
              <ButtonAuth text="Login" bgcolor="bg-orange" />
              <ButtonLoginGoogle text="Login With Google" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default login;
