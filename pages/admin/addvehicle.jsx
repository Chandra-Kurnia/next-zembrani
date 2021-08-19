import {Fragment} from 'react';
import Layout from '../../components/Layout';
import Image from 'next/image';
import Back from '../../assets/icons/blackBack.png';
import {useRouter} from 'next/router';
import InputVehicle from '../../components/base/InputVehicle';
import InputVehicle2 from '../../components/base/InputVehicle2';
import styles from '../../styles/AddVehicle.module.css';
import {useState} from 'react';
import cam from '../../assets/icons/cam.png';
import addmore from '../../assets/icons/addMore.png';
import vehicle from '../../assets/img/vechiles/detail.png';
import ButtonPay from '../../components/base/ButtonPay';
import axios from 'axios';

const AddVehicle = () => {
  const {push} = useRouter()
  const [form, setform] = useState({
    location_id: '',
    type_id: 1,
    vehicle_name: '',
    price: '',
    status: '',
    stock: '',
    description: '',
    vehicle_img: {},
  });
  const [dropdown, setdropdown] = useState(0);
  const [status, setstatus] = useState('Select status');
  const [vehicle_img, setvehicle_img] = useState();
  const handleForm = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
      status,
      vehicle_img,
    });
  };

  const handleImg = (e) => {
    setvehicle_img(e.target.files[0]);
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('location_id', form.location_id);
    formData.append('type_id', form.type_id);
    formData.append('vehicle_name', form.vehicle_name);
    formData.append('price', form.price);
    formData.append('status', form.status);
    formData.append('stock', form.stock);
    formData.append('description', form.description);
    formData.append('vehicle_img', form.vehicle_img);
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    axios
      .post('http://localhost:8080/vehicle/', formData)
      .then(() => {
        alert('data successfully inserted');
        push('/vechiles')
      })
      .catch((err) => {
        alert(err.response.data.error[0].msg);
      });
  };

  const {back} = useRouter();
  const handleDrop = () => {
    if (dropdown === 0) {
      setdropdown(1);
    } else {
      setdropdown(0);
    }
  };

  const changeStatus = (e) => {
    setstatus(e.target.id);
    setdropdown(0);
  };
  return (
    <Fragment>
      <Layout title="Zembrani | Add Vehicle">
        <div className="container mb-5 pb-5">
          <div className="d-flex align-items-center mt-3 mb-lg-5 mb-md-4 mb-4">
            <Image
              src={Back}
              alt="back Icon"
              width="20px"
              height="30px"
              style={{cursor: 'pointer'}}
              onClick={() => back()}
            />
            <span className="fw-bold d-block ms-3">Add new item</span>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-7">
              <InputVehicle
                onChange={(e) => handleForm(e)}
                name="vehicle_name"
                placeholder="Name (max up to 50 words)"
              />
              <label htmlFor="img1" className={styles.cam}>
                <div className={styles.cam}>
                  <Image src={cam} alt="cam" />
                </div>
              </label>
              <div className="row mt-3">
                <div className="col-12 col-md-12 col-lg-6">
                  <label htmlFor="img2" className={styles.subcam}>
                    <div className={styles.subcam}>
                      <Image src={cam} alt="cam" />
                    </div>
                  </label>
                </div>
                <div className="col-12 col-md-12 col-lg-6 mt-3 mt-md-3 mt-lg-0">
                  <label htmlFor="img3" className={styles.subcam}>
                    <div className={styles.subcam}>
                      <Image src={addmore} alt="cam" />
                    </div>
                  </label>
                </div>
              </div>
              <input onChange={(e) => handleImg(e)} className="d-none" type="file" name="vehicle_img" id="img1" />
              <input className="d-none" type="file" name="" id="img2" />
              <input className="d-none" type="file" name="" id="img3" />
            </div>
            <div className="col-12 col-md-6 col-lg-5">
              <InputVehicle onChange={(e) => handleForm(e)} name="location_id" placeholder="Location" />
              <InputVehicle
                onChange={(e) => handleForm(e)}
                name="description"
                placeholder="Description (max up to 150 words)"
              />
              <InputVehicle2
                onChange={(e) => handleForm(e)}
                name="price"
                placeholder="Type the price"
                title="Price : "
              />
              <span className={styles.inputTitle}>Status : </span>
              <span onClick={() => handleDrop()} className={styles.status}>
                {status}
              </span>
              {dropdown === 1 && (
                <div className={styles.dropdown}>
                  <div onClick={(e) => changeStatus(e)} className={styles.dropmenu}>
                    <span id='avaiable' className={styles.avaiable}>Avaiable</span>
                  </div>
                  <div onClick={(e) => changeStatus(e)} className={styles.dropmenu}>
                    <span id='fullBooked' className={styles.full}>Full Booked</span>
                  </div>
                </div>
              )}
              <InputVehicle2 onChange={(e) => handleForm(e)} name="stock" placeholder="Insert stock" title="Stock : " />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 col-md-6 col-lg-6">
              <ButtonPay text="category" className="w-100 bg-black" />
            </div>
            <div className="col-12 col-md-6 col-lg-6 mt-3 mt-md-0 mt-lg-0">
              <ButtonPay onClick={() => handleSave()} text="Save" className="w-100 bg-orange" />
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default AddVehicle;
