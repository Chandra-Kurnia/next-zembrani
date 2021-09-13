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
import ButtonPay from '../../../components/base/ButtonPay'
import {useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export const getServerSideProps = async (context) => {
  try {
    const vehicleId = context.query.id;
    const res = await axios.get(`${process.env.API_SERVER}/vehicle/${vehicleId}`);
    const popularvehicle = await axios.get(`${process.env.API_SERVER}/vehicle/4/popular`);
    const vehicle = res.data.data || null;
    const populars = popularvehicle.data.data;
    if(vehicle === null){
      return{
        notFound: true
      }
    }
    return {
      props: {vehicle, populars},
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};

const Show = (props) => {
  const vehicle = props.vehicle;
  const populars = props.populars;
  const dataUser = props.user;
  let admin = false;
  // console.log(dataUser);
  if (dataUser) {
    if (dataUser.roles === 'admin') {
      admin = true;
    }
  }
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
      <Layout title="Zembrani | vechiles" {...props}>
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
              </div>
            </div>
            <div className="d-flex flex-wrap justify-content-lg-start">
              {admin === true ? (
                <>
                  {populars[0].vehicle_id === vehicle.vehicle_id ||
                  populars[1].vehicle_id === vehicle.vehicle_id ||
                  populars[2].vehicle_id === vehicle.vehicle_id ||
                  populars[3].vehicle_id === vehicle.vehicle_id ? (
                    <ButtonPay onClick={() => removefromhomepage()} className='bg-black w-100' text="Remove from home page" />
                  ) : (
                    <ButtonPay onClick={() => addtohomepage()} className='bg-black w-100' text="Add to home page" />
                  )}
                  <ButtonPay
                    onClick={() => push({pathname: `/admin/update/${vehicle?.vehicle_id}`})}
                    className='bg-orange w-100 mt-2'
                    text="Edit Vehicle"
                  />
                </>
              ) : (
                <>
                  <ButtonPay className='bg-black w-100' text="Chat Admin" />
                  {Object.keys(dataUser).length > 0 ? (
                    <ButtonPay
                      onClick={() => push({pathname: `/vechiles/reservation/${vehicle.vehicle_id}`})}
                      bgcolor="bg-orange"
                      text="Reservation"
                      className='bg-orange w-100 mt-2'
                    />
                  ) : ""}
                  <ButtonPay
                    text="Like"
                    className="bg-black w-100 mt-2"
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
