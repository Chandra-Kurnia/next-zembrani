/* eslint-disable @next/next/no-img-element */
import {Fragment} from 'react';
import Layout from '../../../components/Layout';
import {useRouter} from 'next/router';
import styles from '../../../styles/reservation.module.css';
import {useState} from 'react';
import Image from 'next/image';
import ButtonCount from '../../../components/base/ButtonCount';
import Back from '../../../assets/icons/blackBack.png';
import InputOpt from '../../../components/base/InputOpt';
import ButtonPay from '../../../components/base/ButtonPay';
import axios from 'axios';
import swal from 'sweetalert';

export const getServerSideProps = async (context) => {
  try {
    const vehicle_id = context.query.id;
    const result = await axios.get(`${process.env.API_SERVER}/vehicle/${vehicle_id}`);
    const vehicle = result.data.data;
    const image = `${process.env.API_SERVER}${result.data.data.image}`;
    return {
      props: {vehicle, image},
    };
  } catch (error) {
    console.log(error);
  }
};

const Reservation = (props) => {
  const {vehicle, image} = props;
  const {back, push} = useRouter();
  let [amount, setamount] = useState(1);
  const [date, setdate] = useState('Select date');
  const [day, setday] = useState(1);
  const [rental, setrental] = useState({
    user_id: 20,
    vehicle_id: vehicle.vehicle_id,
    cost: vehicle.price,
    start_date: '',
    return_date: '',
    quantity: 1,
  });

  const handlePlus = () => {
    if (amount >= vehicle.remain) {
      setamount(vehicle.remain);
    } else {
      setamount((amount += 1));
    }
    setrental({...rental, cost: vehicle.price * amount * day, quantity: amount});
  };

  const handleMinus = () => {
    if (amount <= 1) {
      setamount(1);
    } else {
      setamount((amount -= 1));
    }
    setrental({...rental, cost: vehicle.price * amount * day, quantity: amount});
  };

  const handleDay = (e) => {
    setday(e.target.value);
    const sliceDateOnly = parseInt(date.slice(-2)) + parseInt(e.target.value, 36);
    const dateReturn = `${date.substring(0, 8)}${sliceDateOnly}`;
    setrental({...rental, cost: vehicle.price * amount * e.target.value, return_date: dateReturn});
  };

  const handleStartDate = (e) => {
    setrental({...rental, start_date: e.target.value});
    const startdate = e.target.value;
    setdate(startdate);
  };

  const handlePay = () => {
    console.log(rental);
    axios.post(`${process.env.API_SERVER}/vehicle/R/rental`, rental)
    .then(() => {
      swal('Success', 'Rental Success, please finish the payment', 'success')
      .then(() => {
        push('/history')
      })
    })
    .catch((err) => {
      swal('Error', 'Rental failed, please check vehicle info', 'error')
      console.log(err);
    })
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
                onClick={() => back()}
              />
              <span className="fw-bold d-block ms-3">Detail</span>
            </div>
            <div className="row">
              <div className={`${styles.imgwrapper} col-12 col-md-6 col-lg-6 position-relative`}>
                {/* <Image src={imgDetail} alt="imgVechile" /> */}
                <img src={image} className={styles.vehicleImg} alt="imgVechile" />
              </div>
              <div className={`${styles.rightItem} col-12 col-md-6 col-lg-6 pe-lg-5 ps-lg-5`}>
                <span className={`d-block ${styles.itemTitle}`}>{vehicle.vehicle_name}</span>
                <span className={`d-block ${styles.itemLoc}`}>{vehicle.location_name}</span>
                <span className={`d-block ${styles.itemPay}`}>Vehicle rented : {vehicle.rented}</span>
                <span className={`d-block ${styles.itemavaiable}`}>Available vehicle : {vehicle.remain}</span>
                <div className="d-flex justify-content-between w-100 mt-5 align-items-center">
                  <div>
                    <ButtonCount text="-" onClick={() => handleMinus()} />
                  </div>
                  <span className={styles.count}>{amount}</span>
                  <div>
                    <ButtonCount text="+" bg="bg-orange" onClick={() => handlePlus()} />
                  </div>
                </div>
                <span className={styles.resdate}>Reservation Date : </span>
                <div className="row">
                  <div className="col-12 col-md-12 col-lg-6">
                    <label htmlFor="date">
                      <span className={styles.inputDate}>{date}</span>
                    </label>
                    <input type="date" name="" id="date" className="d-none" onChange={(e) => handleStartDate(e)} />
                  </div>
                  <div className="col-12 col-md-12 col-lg-6 pt-3 pt-md-3 pt-lg-0">
                    <InputOpt
                      name="day"
                      placeholder="Day"
                      data={[
                        {id: 1, text: '1 Day'},
                        {id: 2, text: '2 Day'},
                        {id: 3, text: '3 Day'},
                      ]}
                      onChange={(e) => handleDay(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <ButtonPay onClick={handlePay} className="bg-orange w-100 mt-2" text={`Pay now : Rp. ${rental.cost}`} />
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Reservation;
