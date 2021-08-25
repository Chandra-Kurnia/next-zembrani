/* eslint-disable @next/next/no-img-element */
import {Fragment} from 'react';
import {useRouter} from 'next/router';
import Layout from '../../../components/Layout';
import Back from '../../../assets/icons/blackBack.png';
import Image from 'next/image';
import styles from '../../../styles/detail.module.css';
import ButtonCount from '../../../components/base/ButtonCount';
import {useState} from 'react';
import ButtonAuth from '../../../components/base/ButtonAuth';
import {useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export const getServerSideProps = async (context) => {
  try {
    const vehicleId = context.query.id;
    const res = await axios.get(`${process.env.API_SERVER}/vehicle/${vehicleId}`);
    const popularvehicle = await axios.get(`${process.env.API_SERVER}/vehicle/4/popular`);
    const vehicle = res.data.data;
    const populars = popularvehicle.data.data;
    return {
      props: {vehicle, populars},
    };
  } catch (error) {
    swal('Error', 'Error during get data from server', 'error');
  }
};

const Show = (props) => {
  const vehicle = props.vehicle;
  const populars = props.populars;
  const admin = true;
  const {query, back, push} = useRouter();
  let [amount, setamount] = useState(0);
  useEffect(() => {
    axios.get(`${process.env.API_SERVER}/vehicle/${query.id}`);
    // .then((result) => setvehicle(result.data.data))
    // .catch((err) => alert(err.response.data.error[0].msg));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addtohomepage = () => {
    axios
      .get(`${process.env.API_SERVER}/vehicle/addtohomepage/${query.id}`)
      .then(() => {
        swal('Success', 'Successfully add vehicle to homepage', 'success').then(() => {
          push('/');
        });
      })
      .catch(() => {
        swal('Error!', 'Failed to add vehicle to home page, please try again later', 'error');
      });
  };

  const removefromhomepage = () => {
    axios
      .get(`${process.env.API_SERVER}/vehicle/removefromhomepage/${query.id}`)
      .then(() => {
        swal('Success', 'Successfully remvoe vehicle from homepage', 'success').then(() => {
          push('/');
        });
      })
      .catch(() => {
        swal('Error!', 'Failed to add vehicle to home page, please try again later', 'error');
      });
  };

  return (
    <Fragment>
      <Layout title="Zembrani | vechiles">
        <div className="">
          <div className="container">
            <div className="d-flex align-items-center mt-3 mb-lg-5 mb-md-4 mb-4">
              <Image
                src={Back}
                alt="back Icon"
                width="20px"
                height="30px"
                style={{cursor: 'pointer'}}
                onClick={() => push(`/vechiles/${vehicle.type_name}`)}
              />
              <span className="fw-bold d-block ms-3">Detail</span>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <div className={styles.primaryImg}>
                  <img className={styles.img} src={`${process.env.API_SERVER}${vehicle.image}`} alt="vehicle_img" />
                </div>
                <div className="container">
                  <div className="row">
                    <div className={`col-12 col-md-6 col-lg-6 ${styles.subimg}`}>
                      <img className={styles.img} src={`${process.env.API_SERVER}${vehicle.image}`} alt="vehicle_img" />
                    </div>
                    <div className={`col-12 col-md-6 col-lg-6 ${styles.subimg}`}>
                      <img className={styles.img} src={`${process.env.API_SERVER}${vehicle.image}`} alt="vehicle_img" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.rightItem} col-12 col-md-6 col-lg-6`}>
                <span className={`d-block ${styles.itemTitle}`}>{vehicle && vehicle.vehicle_name}</span>
                <span className={`d-block ${styles.itemLoc}`}>{vehicle && vehicle.location_name}</span>
                <span className={`d-block ${styles.itemStatus}`}>{vehicle && vehicle.status}</span>
                <span className={`d-block ${styles.itemDesc}`}>{vehicle && vehicle.description}</span>
                <span className={`d-block ${styles.itemDesc}`}>Type : {vehicle && vehicle.type_name}</span>
                <span className={`d-block ${styles.itemDesc}`}>Reservation before 2 PM</span>
                <span className={`d-block ${styles.itemPrice}`}>Rp. {vehicle && vehicle.price}/day</span>
                {/* {admin === true ? (
                  <>
                  <h2>Stock : {vehicle.stock}</h2>
                  </>
                ) : (
                  <>
                    <div className="d-flex justify-content-between w-100 mt-5 align-items-center">
                      <div>
                        <ButtonCount text="-" onClick={() => handleMinus()} />
                      </div>
                      <span className={styles.count}>{amount}</span>
                      <div>
                        <ButtonCount text="+" bg="bg-orange" onClick={() => handlePlus()} />
                      </div>
                    </div>
                  </>
                )} */}
              </div>
            </div>
            <div className="d-flex flex-wrap justify-content-lg-start">
              {admin === true ? (
                <>
                  {populars[0].vehicle_id === vehicle.vehicle_id ||
                  populars[1].vehicle_id === vehicle.vehicle_id ||
                  populars[2].vehicle_id === vehicle.vehicle_id ||
                  populars[3].vehicle_id === vehicle.vehicle_id ? (
                    <ButtonAuth onClick={() => removefromhomepage()} bgcolor="bg-black" text="Remove from home page" />
                  ) : (
                    <ButtonAuth onClick={() => addtohomepage()} bgcolor="bg-black" text="Add to home page" />
                  )}
                  <ButtonAuth
                    onClick={() => push({pathname: `/admin/update/${vehicle?.vehicle_id}`})}
                    bgcolor="bg-orange"
                    text="Edit Vehicle"
                    className="ms-0 ms-lg-1 ms-md-3"
                  />
                </>
              ) : (
                <>
                  <ButtonAuth bgcolor="bg-black" text="Chat Admin" />
                  <ButtonAuth
                    onClick={() => push({pathname: `/vechiles/reservation/${vehicle.vehicle_id}`})}
                    bgcolor="bg-orange"
                    text="Reservation"
                    className="ms-0 ms-lg-5 ms-md-3"
                  />
                  <ButtonAuth
                    // onClick={() => handleDelete()}
                    bgcolor="bg-black"
                    text="Like"
                    className="ms-0 ms-lg-5 ms-md-0"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Show;
