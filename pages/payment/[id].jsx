import {Fragment} from 'react';
import Layout from '../../components/Layout';
import Image from 'next/image';
import ButtonPay from '../../components/base/ButtonPay';
import imgDetail from '../../assets/img/vechiles/detail.png';
import Back from '../../assets/icons/blackBack.png';
import styles from '../../styles/payment.module.css';

const Payment = () => {
  return (
    <Fragment>
      <Layout title='Zembrani | Payment'>
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
              <span className="fw-bold d-block ms-3">Payment</span>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4">
                <Image src={imgDetail} alt="imgVechile" />
              </div>
              <div className={`${styles.rightItem} col-12 col-md-6 col-lg-6`}>
                <span className={`d-block ${styles.itemTitle}`}>Fixie - Gray Only</span>
                <span className={`d-block ${styles.itemLoc}`}>Yogyakarta</span>
                <span className={`d-block ${styles.itemPay}`}>No prepayment</span>
                <span className={`d-block ${styles.bookingCode}`}>#FG1209878YZS</span>
                <button className={`${styles.btnCopy} bg-orange`}>Copy Booking Code</button>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12 col-md-6 col-lg-4">
                <div className={styles.box}>
                  <span className={styles.boxtitle}>Quantity : 2 bikes</span>
                </div>
                <div className={styles.box}>
                  <span className={`${styles.boxtitle} mb-3 d-block`}>Order details : </span>
                  <span className="d-block">1 Bike : Rp. 78.000</span>
                  <span className="d-block">1 Bike : Rp. 78.000</span>
                  <span className="d-block">1 Bike : Rp. 78.000</span>
                  <span className="d-block">1 Bike : Rp. 78.000</span>
                  <span className="d-block">1 Bike : Rp. 78.000</span>
                  <span className="d-block">1 Bike : Rp. 78.000</span>
                  <span className={`mt-3 d-block ${styles.boxtitle}`}>Total : Rp. 178.000</span>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <div className={styles.boxRes}>
                  <span className={styles.boxtitle}>Reservation Date :</span>
                  <span className="d-inline-block ms-0 ms-md-0 ms-lg-5">Jan 18 - 20 2021</span>
                </div>
                <div className={styles.box}>
                  <span className={styles.boxtitle}>Identity : </span>
                  <span className="d-block">Samantha Doe (+6290987682)</span>
                  <span className='d-block'>samanthadoe@mail.com</span>
                </div>
              </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-8 col-lg-7 position-relative">
                    <span className={styles.paytitle}>Payment Code : </span>
                    <span className={`${styles.box} ${styles.boxPay} mt-3 mb-3 d-inline-block`}>
                    <span className={`d-block ${styles.bookingCodeCpy}`}>#FG1209878YZS</span>
                    <button className={`${styles.btncpy} bg-black`}>Copy</button>
                    </span>
                </div>
                <div className={`${styles.boxPayRight} col-12 col-md-4 col-lg-4`}>
                    <span className={`${styles.box} ${styles.boxPay} mb-3 d-inline-block`}>Select payment method</span>
                </div>
            </div>
            <ButtonPay text="Finish Payment" className="w-100 mt-lg-3 bg-orange" />
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Payment;
