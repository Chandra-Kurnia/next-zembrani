/* eslint-disable @next/next/no-img-element */
import {Fragment} from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Profile.module.css';
import Image from 'next/image';
import pencil from '../assets/icons/pencil.png';
import InputProfle from '../components/base/InputProfle';
import SmallButton from '../components/base/SmallButton';
import {useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';

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
  const [form, setform] = useState({
    email: dataUser.email,
    address: dataUser.address,
    phone_number: dataUser.phone_number,
    name: dataUser.name,
    date_of_birth: dataUser.date_of_birth,
    avatar: '',
  });
  // console.log(form);
  const yearJoin = dataUser.created_at.substr(0, 4);
  const [avatar, setavatar] = useState(`${process.env.API_SERVER}${dataUser.avatar}`);
  const handleFile = (e) => {
    const [file] = e.target.files;
    const urlImage = URL.createObjectURL(file);
    setavatar(urlImage);
    setform({...form, avatar: e.target.files[0]});
  };

  const handleForm = (e) => {
    setform({...form, [e.target.name]: e.target.value});
  };
  const handleSave = () => {
    const formData = new FormData();
    formData.append('email', form.email);
    formData.append('address', form.address);
    formData.append('phone_number', form.phone_number);
    formData.append('name', form.name);
    formData.append('date_of_birth', form.date_of_birth);
    formData.append('avatar', form.avatar);
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    axios
      .post(`${process.env.API_SERVER}/user/updateprofile`, formData, {withCredentials: true})
      .then(() => {
        swal('Success', 'update data success', 'success');
      })
      .catch((err) => {
        swal('Error', 'Error updated data, try again later', 'error');
      });
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
            <InputProfle onChange={(e) => handleForm(e)} title="Email address :" name="email" value={dataUser.email} />
            <InputProfle
              onChange={(e) => handleForm(e)}
              className="mt-3"
              title="Address :"
              name="address"
              value={dataUser.address}
            />
            <InputProfle
              onChange={(e) => handleForm(e)}
              className="mt-3"
              title="Mobile Number :"
              name="phone_number"
              value={dataUser.phone_number}
            />
            <span className={`mt-5 d-block ${styles.formtitle}`}>Identity</span> <br />
            <div className="row mb-3">
              <div className="col-12 col-md-6 col-lg-6">
                <InputProfle
                  onChange={(e) => handleForm(e)}
                  className="mt-3"
                  title="Display name :"
                  name="name"
                  value={dataUser.name}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <InputProfle
                  onChange={(e) => handleForm(e)}
                  className="mt-3"
                  title="DD/MM/YY"
                  name="date_of_birth"
                  value={dataUser.date_of_birth}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between justify-content-lg-start flex-wrap ps-2 ps-lg-0">
              <SmallButton onClick={handleSave} text="Save changes" className="fw-bold mb-3 bg-orange" />
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
