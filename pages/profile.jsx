/* eslint-disable @next/next/no-img-element */
import {Fragment} from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Profile.module.css';
import Image from 'next/image';
import profile from '../assets/img/profile.png';
import pencil from '../assets/icons/pencil.png';
import InputProfle from '../components/base/InputProfle';
import SmallButton from '../components/base/SmallButton';
import {useState} from 'react';
import axios from 'axios';

export const getServerSideProps = async (context) => {
  try {
    const cookie = context.req.headers.cookie;
    // console.log(cookie);
    const ResdataUser = await axios.get(`${process.env.API_SERVER}/user/checktoken`, {
      withCredentials: true,
      headers: {cookie},
    });
    // console.log(dataUser.data.data);
    const dataUser = ResdataUser.data.data;
    return {
      props: {dataUser},
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};

const Profile = (props) => {
  const {dataUser} = props;
  // console.log(dataUser);
  const yearJoin = dataUser.created_at.substr(0, 4);
  const [avatar, setavatar] = useState(profile.src);
  const handleFile = (e) => {
    const [file] = e.target.files;
    const urlImage = URL.createObjectURL(file);
    setavatar(urlImage);
    console.log(urlImage);
  };
  return (
    <Fragment>
      <Layout title="Zembrani - Profile">
        <div className="container">
          <span className={styles.title}>Profile</span>
          <div className="text-center">
            <div className="w-100 d-flex justify-content-center mb-4">
              <div className={styles.imgWrapper}>
                <img src={avatar} alt="imgProfile" className={styles.imgProfile} />
                <label htmlFor="avatar">
                  <div className={styles.edit}>
                    <Image src={pencil} alt="pencil" />
                  </div>
                </label>
                <input className="d-none" type="file" name="avatar" id="avatar" onChange={(e) => handleFile(e)} />
              </div>
            </div>
            <span className={`${styles.desc} ${styles.name}`}>{dataUser.name}</span>
            <span className={`${styles.desc}`}>{dataUser.email}</span>
            <span className={`${styles.desc}`}>{dataUser.phone_number}</span>
            <span className={`${styles.desc}`}>Has been active since {yearJoin}</span>
            <div className="row mt-3">
              <div className={`col ${styles.male}`}>
                <input className="me-1" type="radio" name="gender" id="male" />
                <label htmlFor="male">Male</label>
              </div>
              <div className={`col ${styles.female}`}>
                <input className="me-1" type="radio" name="gender" id="female" />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>
          <div className="form mt-4">
            <span className={styles.formtitle}>Contact</span> <br />
            <InputProfle title="Email address :" name="email" value={dataUser.email} />
            <InputProfle className="mt-3" title="Address :" name="address" value={dataUser.address} />
            <InputProfle className="mt-3" title="Mobile Number :" name="phone" value={dataUser.phone_number} />
            <span className={`mt-5 d-block ${styles.formtitle}`}>Identity</span> <br />
            <div className="row mb-3">
              <div className="col-12 col-md-6 col-lg-6">
                <InputProfle className="mt-3" title="Display name :" name="displayName" value={dataUser.name} />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <InputProfle className="mt-3" title="DD/MM/YY" name="birth" value={dataUser.date_of_birth} />
              </div>
            </div>
            <div className="d-flex justify-content-between justify-content-lg-start flex-wrap ps-2 ps-lg-0">
              <SmallButton text="Save changes" className="fw-bold mb-3 bg-orange" />
              <SmallButton text="Edit password" className="fw-bold mb-3 bg-black" />
              <SmallButton text="Cancel" className="fw-bold mb-3" />
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Profile;
