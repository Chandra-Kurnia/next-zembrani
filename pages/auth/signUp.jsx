import {Fragment, useState} from 'react';
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
import swal from 'sweetalert';
import { useRouter } from 'next/router';

const SignUp = () => {
  const router = useRouter()
  const [form, setform] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleForm = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    axios
      .post(`${process.env.API_SERVER}/user/register`, form)
      .then((res) => {
        swal('Success', res.data.message, 'success')
        router.push('/auth/login')
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
        <title>Zembrani | Sign Up</title>
      </Head>
      <div className={styles.cover}>
        <div className={`${styles.content} container`}>
          <div className="row">
            <div className="col-lg-5 col-12 col-md-12">
              <span className={styles.titleCover}>Le’ts Explore The World</span>
              <br />
              <div className={styles.signupbtn}>
                <span className={`${styles.question} d-inline-block mt-4`}>Already have account ?</span>
                <Link href="/auth/login">
                  <a>
                    <ButtonAuth text="Login" bgcolor="bg-black" />
                  </a>
                </Link>
              </div>
              <br />
            </div>
            <div className="col-2 text-center d-none d-lg-block d-md-none">
              <Image src={Line} alt="line" className="mt-5" />
            </div>
            <div className={`col-lg-5 col-12 ${styles.rightAuth}`}>
              <InputAuth onChange={(e) => handleForm(e)} name="name" type="text" placeholder="Name" /> <br />
              <InputAuth onChange={(e) => handleForm(e)} name="email" type="text" placeholder="Email" /> <br />
              <InputAuth onChange={(e) => handleForm(e)} name="password" type="password" placeholder="Password" />
              <br />
              <ButtonAuth onClick={(e) => handleRegister(e)} text="Sign up" bgcolor="bg-orange" />
              <ButtonLoginGoogle text="Sign up With Google" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default SignUp;
