import {Fragment} from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Profile.module.css';
import Image from 'next/image';
import profile from '../assets/img/profile.png';
import pencil from '../assets/icons/pencil.png';
import InputProfle from '../components/base/InputProfle';
import SmallButton from '../components/base/SmallButton';
import {useState} from 'react';
import Head from 'next/head';

const Profile = () => {
  const [avatar, setavatar] = useState(profile);
  const handleFile = (e) => {
    const [file] = e.target.files;
    const urlImage = URL.createObjectURL(file);
    setavatar({...profile});
    console.log(urlImage);
  };
  return (
    <Fragment>
      <Layout title='Zembrani - Profile'>
        <div className="container">
          <span className={styles.title}>Profile</span>
          <div className="text-center">
            <div className="w-100 d-flex justify-content-center mb-4">
              <div className={styles.imgWrapper}>
                <Image src={avatar} alt="imgProfile" className="rounded-circle" />
                <label htmlFor="avatar">
                  <div className={styles.edit}>
                    <Image src={pencil} alt="pencil" />
                  </div>
                </label>
                <input className="d-none" type="file" name="avatar" id="avatar" onChange={(e) => handleFile(e)} />
              </div>
            </div>
            <span className={`${styles.desc} ${styles.name}`}>Samantha Doe</span>
            <span className={`${styles.desc}`}>samanthadoe@mail.com</span>
            <span className={`${styles.desc}`}>+62833467823</span>
            <span className={`${styles.desc}`}>Has been active since 2013</span>
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
            <InputProfle title="Email address :" name="email" value="zulaikha17@gmail.com" />
            <InputProfle
              className="mt-3"
              title="Address :"
              name="address"
              value="Iskandar Street no. 67 Block A Near Bus Stop"
            />
            <InputProfle className="mt-3" title="Mobile Number :" name="phone" value="(+62)813456782" />
            <span className={`mt-5 d-block ${styles.formtitle}`}>Identity</span> <br />
            <div className="row mb-3">
              <div className="col-12 col-md-6 col-lg-6">
                <InputProfle className="mt-3" title="Display name :" name="displayName" value="zulaikha" />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <InputProfle className="mt-3" title="DD/MM/YY" name="birth" value="03/09/2003" />
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
