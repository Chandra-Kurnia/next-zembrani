import {Fragment} from 'react';
import SearhHistory from '../components/base/SearhHistory';
import Layout from '../components/Layout';
import styles from '../styles/history.module.css';
import Card from '../components/modules/Card';
import NotifWrapper from '../components/base/NotifWrapper';
import CardHistory from '../components/modules/CardHistory';
import swal from 'sweetalert';
import axios from 'axios';
import {useRouter} from 'next/router';

export const getServerSideProps = async () => {
  try {
    const resHistory = await axios.get(`${process.env.API_SERVER}/history/getAll`);
    const histories = resHistory.data.data || [];
    return {
      props: {
        histories,
      },
    };
  } catch (error) {
    swal('Error', 'Failed laod history, please try again later', 'error');
    return {
      props: {
        histories: [],
      },
    };
  }
};

const History = (props) => {
  const {push} = useRouter();
  // console.log(props.histories);
  const histories = props.histories;
  const handleDelete = (rental_id) => {
    swal({
      title: 'Are you sure?',
      text: 'you cannot restore data after deletion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post(`${process.env.API_SERVER}/history/deletehistory`, {rental_id})
          .then((res) => {
            swal('Success', res.data.message, 'success').then(() => {
              push(`/history`);
            });
          })
          .catch((err) => {
            // swal('Error', err.response.data.error[0].msg, 'error');
            swal('Error', err.response.data.message, 'error');
          });
      }
    });
  };
  return (
    <Fragment>
      <Layout history="navActive" title="Zembrani | History">
        <div className="container">
          <div className={styles.content}>
            <div className={styles.flexLeft}>
              <SearhHistory />
              <div className={styles.mainContent}>
                <span className={styles.historyTitle}>Today</span>
                <NotifWrapper msg="Please finish your payment for vespa for Vespa Rental Jogja" />
                <NotifWrapper msg="Your payment has been confirmed!" />
                <span className={styles.historyTitle}>A Week ago</span>
                {histories.length > 0 ? (
                  histories.map((history, index) => (
                    <CardHistory
                      key={index}
                      idHistory={history.rental_id}
                      imgsrc={history.image}
                      title={history.vehicle_name}
                      time={`${history.start_date} to ${history.return_date}`}
                      prepay={history.cost}
                      status={history.status}
                      onClick={() => handleDelete(history.rental_id)}
                    />
                  ))
                ) : (
                  <h1>No History Found</h1>
                )}
              </div>
            </div>
            <div className={styles.flexRight}>
              {histories[0] && (
                <div className={styles.arrival}>
                  <span className={styles.titleSpan}>New Arrival</span>
                  <Card imgsrc={histories[0].image} title="Lambhorghini" subtitle="South Jakarta" />
                  {histories[1] && <Card imgsrc={histories[1].image} title="Lambhorghini" subtitle="South Jakarta" />}
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default History;
