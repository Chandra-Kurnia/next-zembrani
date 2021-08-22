/* eslint-disable react-hooks/exhaustive-deps */
import {Fragment} from 'react';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Head from 'next/head'

const VerifyEmail = () => {
  const {push, query} = useRouter();
  const [msg, setmsg] = useState('')
  useEffect(() => {
    axios.get(`${process.env.API_SERVER}/user/activation/${query.token}`)
    .then(() => {
        setmsg('Email succesfully verified, now you can login with your Zembrani account')
    })
    .catch((err) => {
        setmsg('Verify email failed, please try again later')
        console.log(err.response);
    })
  }, [query.token]);
  return (
    <Fragment>
        <Head>
            <title>Zembrani | User Activation</title>
        </Head>
      <h1>{msg}</h1>
      <button className="btn btn-secondary" onClick={() => push('/auth/login')}>
        Back to login
      </button>
    </Fragment>
  );
};

export default VerifyEmail;
