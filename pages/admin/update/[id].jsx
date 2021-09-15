/* eslint-disable @next/next/no-img-element */
import {Fragment} from 'react';
import Layout from '../../../components/Layout';
import Image from 'next/image';
import Back from '../../../assets/icons/blackBack.png';
import {useRouter} from 'next/router';
import InputVehicle from '../../../components/base/InputVehicle';
import InputVehicle2 from '../../../components/base/InputVehicle2';
import styles from '../../../styles/AddVehicle.module.css';
import {useState, useEffect} from 'react';
import ButtonPay from '../../../components/base/ButtonPay';
import axios from 'axios';
import swal from 'sweetalert';
import withAuth from '../../utils/Auth';
import { useSelector } from 'react-redux';

export const getServerSideProps = async (context) => {
  try {
    const vehicle_id = context.query.id;
    const result = await axios.get(`${process.env.API_SERVER}/vehicle/${vehicle_id}`);
    const typesResult = await axios.get(`${process.env.API_SERVER}/types/`);
    const locResult = await axios.get(`${process.env.API_SERVER}/locations/`);
    const vehicle = result.data.data;
    const image = `${process.env.API_SERVER}${result.data.data.image}`;
    delete vehicle.image;
    const types = typesResult.data.data;
    const locations = locResult.data.data;
    return {
      props: {vehicle, image, types, locations},
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const UpdateVehicle = (props) => {
  const {user} = useSelector(state => state.user)
  const {query, push, back} = useRouter();
  useEffect(() => {
    if (user.roles !== 'admin') {
      swal('Error', 'Only admin', 'error').then(() => {
        push('/');
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const types = props.types;
  const [dropdowncategory, setdropdowncategory] = useState(0);
  const [textcategory, settextCategory] = useState(props.vehicle.type_name);
  const [textlocation, settextlocation] = useState();
  const [locations, setlocations] = useState();
  const [searchLocations, setsearchLocations] = useState('');
  const [dropdown, setdropdown] = useState(0);
  const [status, setstatus] = useState(props.vehicle.status);
  const [image, setimage] = useState(props.image);
  const [image2, setimage2] = useState(props.image);
  const [image3, setimage3] = useState(props.image);
  const [form, setform] = useState({
    location_id: props.vehicle.location_id,
    type_id: props.vehicle.type_id,
    vehicle_name: props.vehicle.vehicle_name,
    price: props.vehicle.price,
    status: props.vehicle.status,
    stock: props.vehicle.stock,
    description: props.vehicle.description,
    image: '',
  });

  const handleForm = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
      status,
    });
  };

  const handleImg = (e) => {
    const urlImg = URL.createObjectURL(e.target.files[0]);
    const inputId = e.target.id;
    if (inputId === 'img1') {
      setform({...form, image: e.target.files[0]});
      setimage(urlImg);
      console.log(form);
    } else if (inputId === 'img2') {
      setimage2(urlImg);
    } else {
      setimage3(urlImg);
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
    formData.append('vehicle_img', form.image);
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    axios
      .post(`${process.env.API_SERVER}/vehicle/${query.id}`, formData, {withCredentials: true})
      .then((res) => {
        swal('Success', res.data.message, 'success').then(() => {
          push(`/vechiles/detail/${query.id}`);
        });
      })
      .catch((err) => {
        if (err.response.data.error[0] === undefined) {
          swal('Error', err.response.data.message, 'error');
        } else {
          swal('Error', err.response.data.error[0].msg, 'error');
        }
      });
  };

  const handleDelete = () => {
    swal({
      title: 'Are you sure?',
      text: 'you cannot restore vehicle data after deletion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`${process.env.API_SERVER}/vehicle/${query.id}`, {withCredentials: true})
          .then((res) => {
            swal('Success', res.data.message, 'success').then(() => {
              push(`/vechiles/`);
            });
          })
          .catch((err) => {
            console.log(err.response);
            if (err.response.data.error[0] === undefined) {
              swal('Error', err.response.data.message, 'error');
            } else {
              swal('Error', err.response.data.error[0].msg, 'error');
            }
          });
      }
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

  const handleLocation = (e) => {
    axios
      .get(`${process.env.API_SERVER}/locations/?keyword=${e.target.value}`)
      .then((result) => {
        setlocations(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setsearchLocations(e.target.value);
    settextlocation(e.target.value);
  };

  const changeStatus = (e) => {
    setstatus(e.target.id);
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
    settextlocation(e.target.textContent);
    setsearchLocations('');
  };

  return (
    <Fragment>
      <Layout title="Zembrani | Add Vehicle" {...props}>
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
            <span className="fw-bold d-block ms-3">Update item</span>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-7">
              <InputVehicle
                defaultValue={form.vehicle_name}
                onChange={(e) => handleForm(e)}
                name="vehicle_name"
                placeholder="Name (max up to 50 words)"
              />
              <label htmlFor="img1" className={styles.cam}>
                <div className={styles.cam}>
                  <img src={image} alt="cam" />
                </div>
              </label>
              <div className="row mt-3">
                <div className="col-12 col-md-12 col-lg-6">
                  <label htmlFor="img2" className={styles.subcam}>
                    <div className={styles.subcam}>
                      <img src={image2} alt="cam" />
                    </div>
                  </label>
                </div>
                <div className="col-12 col-md-12 col-lg-6 mt-3 mt-md-3 mt-lg-0">
                  <label htmlFor="img3" className={styles.subcam}>
                    <div className={styles.subcam}>
                      <img src={image3} alt="cam" />
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
                value={textlocation}
                defaultValue={props.vehicle.location_name}
                onChange={(e) => handleLocation(e)}
                name="location_id"
                placeholder="Location"
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
                defaultValue={form.description}
                name="description"
                placeholder="Description (max up to 150 words)"
              />
              <InputVehicle2
                defaultValue={form.price}
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
              <InputVehicle2
                defaultValue={form.stock}
                onChange={(e) => handleForm(e)}
                name="stock"
                placeholder="Insert stock"
                title="Stock : "
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 col-md-4 col-lg-4">
              <ButtonPay onClick={() => handleCategory()} text={textcategory} className="w-100 bg-black" />
            </div>
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
            <div className="col-12 col-md-4 col-lg-4 mt-3 mt-md-0 mt-lg-0">
              <ButtonPay onClick={() => handleSave()} text="Update" className="w-100 bg-orange" />
            </div>
            <div className="col-12 col-md-4 col-lg-4 mt-3 mt-md-0 mt-lg-0">
              <ButtonPay onClick={() => handleDelete()} text="Delete" className="w-100 bg-black" />
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default withAuth(UpdateVehicle);
