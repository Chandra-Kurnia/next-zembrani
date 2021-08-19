import {Fragment} from 'react';
import {useRouter} from 'next/router';
import Layout from '../../../components/Layout';
import Back from '../../../assets/icons/blackBack.png';
import Image from 'next/image';
import imgDetail from '../../../assets/img/vechiles/detail.png';
import styles from '../../../styles/detail.module.css';
import ButtonCount from '../../../components/base/ButtonCount';
import {useState} from 'react';
import ButtonAuth from '../../../components/base/ButtonAuth';
import {useEffect} from 'react';
import axios from 'axios';

const Show = () => {
  const {query, back, push} = useRouter();
  const [vehicle, setvehicle] = useState('');
  let [amount, setamount] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/vehicle/${query.id}`)
      .then((result) => setvehicle(result.data.data))
      .catch((err) => alert(err.response.data.error[0].msg));
  }, []);
  const handlePlus = () => {
    if (amount >= vehicle.stock) {
      setamount(vehicle.stock);
    } else {
      setamount((amount += 1));
    }
  };
  const handleMinus = () => {
    if (amount === 0) {
      setamount(0);
    } else {
      setamount(amount - 1);
    }
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/vehicle/${query.id}`)
      .then(() => {
        alert('Data successfully deleted');
        back();
      })
      .catch((err) => {
        alert(err.response.data.message);
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
                onClick={() => back()}
              />
              <span className="fw-bold d-block ms-3">Detail</span>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <Image src={imgDetail} alt="imgVechile" />
                <div className="d-flex justify-content-start">
                  <div className={styles.imgSub}>
                    <Image src={imgDetail} alt="imgdetail" />
                  </div>
                  <div className={styles.imgSub}>
                    <Image src={imgDetail} alt="imgdetail" />
                  </div>
                  <div className={styles.imgSub}>
                    <Image src={imgDetail} alt="imgdetail" />
                  </div>
                </div>
              </div>
              <div className={`${styles.rightItem} col-12 col-md-6 col-lg-6`}>
                <span className={`d-block ${styles.itemTitle}`}>{vehicle && vehicle.vehicle_name}</span>
                <span className={`d-block ${styles.itemLoc}`}>Yogyakarta</span>
                <span className={`d-block ${styles.itemStatus}`}>{vehicle && vehicle.status}</span>
                <span className={`d-block ${styles.itemPay}`}>No prepayment</span>
                <span className={`d-block ${styles.itemDesc}`}>{vehicle && vehicle.description}</span>
                <span className={`d-block ${styles.itemDesc}`}>Type : Bike</span>
                <span className={`d-block ${styles.itemDesc}`}>Reservation before 2 PM</span>
                <span className={`d-block ${styles.itemPrice}`}>Rp. {vehicle && vehicle.price}/day</span>
                <div className="d-flex justify-content-between w-100 mt-5 align-items-center">
                  <div>
                    <ButtonCount text="-" onClick={() => handleMinus()} />
                  </div>
                  <span className={styles.count}>{amount}</span>
                  <div>
                    <ButtonCount text="+" bg="bg-orange" onClick={() => handlePlus()} />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-wrap justify-content-lg-start">
              <ButtonAuth bgcolor="bg-black" text="Chat Admin" />
              <ButtonAuth
                onClick={() => push({pathname: '/vechiles/reservation/20'})}
                bgcolor="bg-orange"
                text="Reservation"
                className="ms-0 ms-lg-5 ms-md-3"
              />
              <ButtonAuth
                onClick={() => handleDelete()}
                bgcolor="bg-black"
                text="Delete Vehicle"
                className="ms-0 ms-lg-5 ms-md-0"
              />
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Show;
