/* eslint-disable @next/next/no-img-element */
import {Fragment} from 'react';
import Layout from '../../components/Layout';
import Image from 'next/image';
import Back from '../../assets/icons/blackBack.png';
import {useRouter} from 'next/router';
import InputVehicle from '../../components/base/InputVehicle';
import InputVehicle2 from '../../components/base/InputVehicle2';
import styles from '../../styles/AddVehicle.module.css';
import {useState, useEffect} from 'react';
import cam from '../../assets/icons/cam.png';
import addmore from '../../assets/icons/addMore.png';
import ButtonPay from '../../components/base/ButtonPay';
import axios from 'axios';
import swal from 'sweetalert';

const AddVehicle = () => {
  const {push, back} = useRouter();
  const [form, setform] = useState({
    location_id: '',
    type_id: '',
    vehicle_name: '',
    price: '',
    status: '',
    stock: '',
    description: '',
    vehicle_img: {},
  });
  const [types, settypes] = useState();
  const [locations, setlocations] = useState();
  const [searchLocations, setsearchLocations] = useState('');
  const [dropdown, setdropdown] = useState(0);
  const [dropdowncategory, setdropdowncategory] = useState(0);
  const [textCategory, settextCategory] = useState();
  const [textLocation, settextLocation] = useState();
  const [status, setstatus] = useState('Select status');
  const [urlImage, seturlImage] = useState(cam.src);
  const [urlImage2, seturlImage2] = useState(cam.src);
  const [urlImage3, seturlImage3] = useState(addmore.src);

  useEffect(() => {
    getTypes();
    getLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchLocations]);

  const getTypes = () => {
    axios
      .get(`${process.env.API_SERVER}/types/`)
      .then((result) => {
        settypes(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLocations = () => {
    axios
      .get(`${process.env.API_SERVER}/locations/?keyword=${searchLocations}`)
      .then((result) => {
        setlocations(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleForm = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImg = (e) => {
    const urlImg = URL.createObjectURL(e.target.files[0]);
    const inputId = e.target.id;
    if (inputId === 'img1') {
      setform({
        ...form,
        vehicle_img: e.target.files[0],
      });
      seturlImage(urlImg);
    } else if (inputId === 'img2') {
      seturlImage2(urlImg);
    } else {
      seturlImage3(urlImg);
    }
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
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    axios
      .post(`${process.env.API_SERVER}/vehicle/`, formData)
      .then((res) => {
        swal('Success', res.data.message, 'success').then(() => {
          push('/vechiles');
        });
      })
      .catch((err) => {
        swal('Error', err.response.data.error[0].msg, 'error');
      });
  };

  const handleDrop = () => {
    if (dropdown === 0) {
      setdropdown(1);
    } else {
      setdropdown(0);
    }
  };

  const handleCategory = () => {
    if (dropdowncategory === 0) {
      setdropdowncategory(1);
    } else {
      setdropdowncategory(0);
    }
  };

  const handleLocations = (e) => {
    setsearchLocations(e.target.value);
    settextLocation(e.target.value);
  };

  const changeStatus = (e) => {
    setstatus(e.target.textContent);
    setform({
      ...form,
      status: e.target.id,
    });
    setdropdown(0);
  };

  const changetype = (e) => {
    setform({
      ...form,
      type_id: e.target.id,
    });
    settextCategory(e.target.textContent);
    setdropdowncategory(0);
  };

  const changeLocations = (e) => {
    setform({
      ...form,
      location_id: e.target.id,
    });
    settextLocation(e.target.textContent);
    setsearchLocations('');
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
                  <img src={urlImage} alt="" />
                </div>
              </label>
              <div className="row mt-3">
                <div className="col-12 col-md-12 col-lg-6">
                  <label htmlFor="img2" className={styles.subcam}>
                    <div className={styles.subcam}>
                      <img src={urlImage2} alt="" />
                    </div>
                  </label>
                </div>
                <div className="col-12 col-md-12 col-lg-6 mt-3 mt-md-3 mt-lg-0">
                  <label htmlFor="img3" className={styles.subcam}>
                    <div className={styles.subcam}>
                      <img src={urlImage3} alt="" />
                    </div>
                  </label>
                </div>
              </div>
              <input onChange={(e) => handleImg(e)} className="d-none" type="file" name="vehicle_img" id="img1" />
              <input onChange={(e) => handleImg(e)} className="d-none" type="file" name="vehicle_img2" id="img2" />
              <input onChange={(e) => handleImg(e)} className="d-none" type="file" name="vehicle_img3" id="img3" />
            </div>
            <div className="col-12 col-md-6 col-lg-5">
              <InputVehicle
                value={textLocation}
                onChange={(e) => handleLocations(e)}
                name="location_id"
                placeholder="Locations"
              />
              {searchLocations !== '' && (
                <div className={styles.dropdownlocations}>
                  <div className={styles.dropmenu} onClick={() => setsearchLocations('')}>
                    <span className={styles.category}>
                      <b>{locations ? 'Choose location' : 'Locations not found'}</b>
                    </span>
                  </div>
                  {locations &&
                    locations.map((location, index) => (
                      <div key={index} className={styles.dropmenu} onClick={(e) => changeLocations(e)}>
                        <span id={location.location_id} className={styles.category}>
                          {location.location_name}
                        </span>
                      </div>
                    ))}
                </div>
              )}
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
                    <span id="avaiable" className={styles.avaiable}>
                      Avaiable
                    </span>
                  </div>
                  <div onClick={(e) => changeStatus(e)} className={styles.dropmenu}>
                    <span id="fullBooked" className={styles.full}>
                      Full Booked
                    </span>
                  </div>
                </div>
              )}
              <InputVehicle2 onChange={(e) => handleForm(e)} name="stock" placeholder="Insert stock" title="Stock : " />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 col-md-6 col-lg-6">
              <ButtonPay
                onClick={() => handleCategory()}
                text={textCategory ? textCategory : 'Add item to'}
                className="w-100 bg-black"
              />
              {dropdowncategory === 1 && (
                <div className={styles.dropdowncategory}>
                  <div className={styles.dropmenu} onClick={() => setdropdowncategory(0)}>
                    <span className={styles.category}>
                      <b>Choose Category</b>
                    </span>
                  </div>
                  {types &&
                    types.map((type, index) => (
                      <div key={index} onClick={(e) => changetype(e)} className={styles.dropmenu}>
                        <span id={type.type_id} className={styles.category}>
                          {type.type_name}
                        </span>
                      </div>
                    ))}
                </div>
              )}
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
