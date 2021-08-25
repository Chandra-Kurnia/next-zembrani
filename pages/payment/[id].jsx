/* eslint-disable @next/next/no-img-element */
import {Fragment} from 'react';
import Layout from '../../components/Layout';
import Image from 'next/image';
import ButtonPay from '../../components/base/ButtonPay';
import Back from '../../assets/icons/blackBack.png';
import styles from '../../styles/payment.module.css';
import {useRouter} from 'next/router';
import axios from 'axios';
import swal from 'sweetalert';

export const getServerSideProps = async (context) => {
  const rental_id = context.query.id;
  const resRental = await axios(`${process.env.API_SERVER}/history/${rental_id}`);
  const rental = resRental.data.data;
  return {
    props: {
      data: {rental},
    },
  };
};

const Payment = (props) => {
  const {back, push, query} = useRouter();
  const {rental} = props.data;
  const admin = false;
  const rentalStatus = rental.status;
  const start_date = rental.start_date.substr(0, 10);
  const return_date = rental.return_date.substr(0, 10);
  const day = rental.cost / rental.price / rental.quantity;
  console.log(day);
  const vehicle_count = [];
  for (let i = 0; i < rental.quantity; i++) {
    vehicle_count.push(i);
  }

  const handlePayment = () => {
    axios
      .post(`${process.env.API_SERVER}/rental/updaterental`, {rental_id: rental.rental_id, status: 'pending'})
      .then(() => {
        swal('Success', 'Payment finished', 'success').then(() => {
          push(`/payment/${query.id}`);
        });
      })
      .catch((err) => {
        swal('Error', 'Payment failed, please try again later', 'error');
      });
  };

  const handleApprovePayment = () => {
    axios
      .post(`${process.env.API_SERVER}/rental/updaterental`, {rental_id: rental.rental_id, status: 'approved'})
      .then(() => {
        swal('Success', 'Payment finished', 'success').then(() => {
          push(`/payment/${query.id}`);
        });
      })
      .catch((err) => {
        swal('Error', 'Payment failed, please try again later', 'error');
      });
  };

  const handleReturnedVehicle = () => {
    axios
      .post(`${process.env.API_SERVER}/rental/updaterental`, {rental_id: rental.rental_id, status: 'returned'})
      .then(() => {
        swal('Success', 'Confirmation success', 'success').then(() => {
          push(`/payment/${query.id}`);
        });
      })
      .catch((err) => {
        swal('Error', 'Payment failed, please try again later', 'error');
      });
  };

  const handleCancelRental = () => {
    swal({
      title: 'Are you sure?',
      text: 'you cannot restore data after deletion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post(`${process.env.API_SERVER}/rental/updaterental`, {rental_id: rental.rental_id, status: 'canceled'})
          .then(() => {
            swal('Success', 'Rental successfully deleted', 'success').then(() => {
              push(`/payment/${query.id}`);
            });
          })
          .catch((err) => {
            swal('Error', 'Payment failed, please try again later', 'error');
          });
      }
    });
  };
  return (
    <Fragment>
      <Layout title="Zembrani | Payment">
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
                <img src={`${process.env.API_SERVER}${rental.image}`} alt="imgVechile" />
              </div>
              <div className={`${styles.rightItem} col-12 col-md-6 col-lg-6`}>
                <span className={`d-block ${styles.itemTitle}`}>{rental.vehicle_name}</span>
                <span className={`d-block ${styles.itemLoc}`}>{rental.location_name}</span>
                <span className={`d-block ${styles.itemPay}`}>{rental.status}</span>
                <span className={`d-block ${styles.bookingCode}`}>#FG1209878YZS</span>
                <button className={`${styles.btnCopy} bg-orange`}>Copy Booking Code</button>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12 col-md-6 col-lg-4">
                <div className={styles.box}>
                  <span className={styles.boxtitle}>Quantity : {`${rental.quantity} ${rental.vehicle_type}`}</span>
                </div>
                <div className={styles.box}>
                  <span className={`${styles.boxtitle} mb-3 d-block`}>Order details : </span>
                  {vehicle_count.map((index) => (
                    <span key={index} className="d-block">
                      1 Bike : Rp. {rental.price} x {day} day
                    </span>
                  ))}
                  <span className={`mt-3 d-block ${styles.boxtitle}`}>Total : Rp. {rental.cost}</span>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <div className={styles.boxRes}>
                  <span className={styles.boxtitle}>Reservation Date :</span>
                  <span className="d-inline-block ms-0 ms-md-0 ms-lg-5">{`${start_date} to ${return_date}`}</span>
                </div>
                <div className={styles.box}>
                  <span className={styles.boxtitle}>Identity : </span>
                  <span className="d-block">
                    {rental.name} ({rental.phone_number})
                  </span>
                  <span className="d-block">{rental.email}</span>
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
            {admin === true ? (
              rentalStatus === 'pending' ? (
                <>
                  <ButtonPay onClick={handleApprovePayment} text="Approve payment" className="w-100 mt-lg-3 bg-black" />
                  <ButtonPay
                    onClick={handleCancelRental}
                    text="Cancel this rental"
                    className="w-100 mt-lg-3 bg-orange"
                  />
                </>
              ) : rentalStatus === 'approved' ? (
                <>
                  <ButtonPay
                    onClick={handleReturnedVehicle}
                    text="Return confirmation"
                    className="w-100 mt-lg-3 bg-black"
                  />
                </>
              ) : rentalStatus === 'canceled' ? (
                <>
                  <ButtonPay
                    onClick={() => swal('Canceled', 'This transaction has been canceled', 'info')}
                    text="Canceled"
                    className="w-100 mt-lg-3 bg-danger"
                  />
                </>
              ) : rentalStatus === 'returned' ? (
                <>
                  <ButtonPay
                    onClick={() => swal('Returned vehicle', 'This transaction has been completed', 'info')}
                    text="Vehicle returned"
                    className="w-100 mt-lg-3 bg-black"
                  />
                </>
              ) : (
                <>
                  <ButtonPay
                    onClick={() => swal('Not Paid Yet', 'This transaction not paid yet, waiting for user', 'info')}
                    text="Not Paid Yet"
                    className="w-100 mt-lg-3 bg-danger"
                  />
                </>
              )
            ) : rentalStatus === 'pending' ? (
              <>
                <ButtonPay
                  onClick={() =>
                    swal('Already Paid', 'This transaction has been paid, waiting for admin to approve', 'info')
                  }
                  text="Waiting for approve"
                  className="w-100 mt-lg-3 bg-black"
                />
              </>
            ) : rentalStatus === 'approved' ? (
              <>
                <ButtonPay
                  onClick={() => swal('Approved', 'This transaction has been approved', 'info')}
                  text="Waiting for approve"
                  className="w-100 mt-lg-3 bg-black"
                />
              </>
            ) : rentalStatus === 'canceled' ? (
              <>
                <ButtonPay
                  onClick={() => swal('Canceled', 'This transaction has been canceled', 'info')}
                  text="Canceled"
                  className="w-100 mt-lg-3 bg-danger"
                />
              </>
            ) : (
              <>
                <ButtonPay onClick={handlePayment} text="Finish Payment" className="w-100 mt-lg-3 bg-black" />
                <ButtonPay onClick={handleCancelRental} text="Cancel rental" className="w-100 mt-lg-3 bg-orange" />
              </>
            )}
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Payment;
