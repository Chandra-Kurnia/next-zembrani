import {Fragment} from 'react';
import Layout from '../../../components/Layout';
import {useRouter} from 'next/router';
import styles from '../../../styles/reservation.module.css';
import {useState} from 'react';
import Image from 'next/image';
import ButtonCount from '../../../components/base/ButtonCount';
import Back from '../../../assets/icons/blackBack.png';
import imgDetail from '../../../assets/img/vechiles/detail.png';
import InputOpt from '../../../components/base/InputOpt';
import ButtonPay from '../../../components/base/ButtonPay';

const Reservation = () => {
  const {query, back, push} = useRouter();
  let [amount, setamount] = useState(0);
  const [date, setdate] = useState('Select date')

  const handlePlus = () => {
    setamount((amount += 1));
  };
  const handleMinus = () => {
    if (amount === 0) {
      setamount(0);
    } else {
      setamount(amount - 1);
    }
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
              </div>
              <div className={`${styles.rightItem} col-12 col-md-6 col-lg-6 pe-lg-5 ps-lg-5`}>
                <span className={`d-block ${styles.itemTitle}`}>Fixie - Gray Only</span>
                <span className={`d-block ${styles.itemLoc}`}>Yogyakarta</span>
                <span className={`d-block ${styles.itemPay}`}>No prepayment</span>
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
                    <input
                      type="date"
                      name=""
                      id="date"
                      className="d-none"
                      onChange={(e) => setdate(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-md-12 col-lg-6 pt-3 pt-md-3 pt-lg-0">
                      <InputOpt name='day' placeholder='Day' data={['1 Day', '2 Day', '3 Day', '4 Day']}/>
                  </div>
                </div>
              </div>
            </div>
            <ButtonPay className='bg-orange w-100 mt-2' text='Pay now : Rp. 178.000'/>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Reservation;
