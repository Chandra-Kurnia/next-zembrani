import {Fragment, useState, useEffect} from 'react';
import Footer from '../../components/modules/Footer';
import styles from '../../styles/login.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import InputAuth from '../../components/base/InputAuth';
import Link from 'next/link';
import ButtonAuth from '../../components/base/ButtonAuth';
import ButtonLoginGoogle from '../../components/base/ButtonLoginGoogle';
import Line from '../../assets/img/line.svg';
import Image from 'next/image';
import Head from 'next/head';
import axios from 'axios';
import {useRouter} from 'next/router';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/actions/userAction';
import { useSelector } from 'react-redux';

const Login = (props) => {
  const dispatch = useDispatch()
  const {push} = useRouter();

  const {user} = useSelector(state => state.user)
  if(Object.keys(user).length > 0){
    push('/')
  }
  const [form, setform] = useState({
    email: '',
    password: '',
  });

  const handleForm = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    dispatch(userLogin(form, push))
  }

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
                <Link href="/auth/signUp">
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
              <InputAuth name="email" onChange={handleForm} type="text" placeholder="Email" /> <br />
              <InputAuth name="password" onChange={handleForm} type="password" placeholder="Password" />
              <Link href="forgotpassword">
                <a>Forgot Password ?</a>
              </Link>{' '}
              <br />
              <ButtonAuth onClick={handleLogin} text="Login" bgcolor="bg-orange" />
              <ButtonLoginGoogle text="Login With Google" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Login;
