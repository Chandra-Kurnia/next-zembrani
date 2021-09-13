import {Fragment, useState, useEffect} from 'react';
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
import axios from 'axios';
import {useRouter} from 'next/router';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/actions/userAction';

const Login = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`${process.env.API_SERVER}/user/logout`, {withCredentials: true});
  }, []);
  const {push} = useRouter();
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

  // const handleLogin = () => {
  //   axios
  //     .post(`${process.env.API_SERVER}/user/login`, form, {withCredentials: true})
  //     .then((res) => {
  //       swal('Login Success', 'Now you can explore vehicle!', 'success').then(() => {
  //         push('/');
  //       });
  //       // console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //       // swal('Login Failed', 'Check Your Info', 'error');
  //       if (err.response.data.error.length < 1) {
  //         swal('Error', err.response.data.message, 'error');
  //       } else {
  //         swal('Error', err.response.data.error[0].msg, 'error');
  //       }
  //     });
  // };

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
