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
import withAuth from './utils/Auth';
import {useEffect, useState} from 'react';
import moment from 'moment';

const History = (props) => {
  const {push} = useRouter();
  const [histories, sethistories] = useState();
  useEffect(() => {
    axios.get(`${process.env.API_SERVER}/history/getAll`, {
      withCredentials: true,
    }).then((result) => {
      sethistories(result.data.data);
    })
    .catch(err => {
      console.log(err.response);
    })
  }, []);
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
          .post(`${process.env.API_SERVER}/history/deletehistory`, {rental_id}, {withCredentials: true})
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
      <Layout history="navActive" title="Zembrani | History" {...props}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.flexLeft}>
              <SearhHistory />
              <div className={styles.mainContent}>
                {histories && histories.length > 0 ? (
                  histories.map((history, index) => (
                    <CardHistory
                      key={index}
                      idHistory={history.rental_id}
                      imgsrc={history.image}
                      title={history.vehicle_name}
                      time={`${moment(history.start_date).format('ll')}  to  ${moment(history.return_date).format('ll')}`}
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
              {histories && histories[0] && (
                <div className={styles.arrival}>
                  <span className={styles.titleSpan}>New Arrival</span>
                  <Card imgsrc={histories[0].image} title={histories[0].vehicle_name} id={histories[0].vehicle_id} subtitle="Yogyakarta" />
                  {histories[1] && (
                    <Card imgsrc={histories[1].image} title={histories[1].vehicle_name} id={histories[1].vehicle_id} subtitle="South Jakarta" />
                  )}
                </div>
              )}
              {/* <SideCardHistory/> */}
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default withAuth(History);
// export default History;
