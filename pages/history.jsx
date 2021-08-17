import {Fragment} from 'react';
import SearhHistory from '../components/base/SearhHistory';
import Layout from '../components/Layout';
import styles from '../styles/history.module.css';
import Card from '../components/modules/Card'
import NotifWrapper from '../components/base/NotifWrapper';
import CardHistory from '../components/modules/CardHistory';
import lambhorghini from '../assets/img/vechiles/cars/lambhorghini.png'

const History = () => {
  return (
    <Fragment>
      <Layout history='navActive' title='Zembrani | History'>
        <div className="container">
          <div className={styles.content}>
              <div className={styles.flexLeft}>
                <SearhHistory/>
                <div className={styles.mainContent}>
                  <span className={styles.historyTitle}>Today</span>
                  <NotifWrapper msg='Please finish your payment for vespa for Vespa Rental Jogja'/>
                  <NotifWrapper msg='Your payment has been confirmed!'/>
                  <span className={styles.historyTitle}>A Week ago</span>
                  <CardHistory imgsrc={lambhorghini} title='Lambhorghini' time='Jan 18 to 21 2021' prepay='240.000'/>
                  <CardHistory imgsrc={lambhorghini} title='Lambhorghini' time='Jan 18 to 21 2021' prepay='240.000'/>
                  <CardHistory imgsrc={lambhorghini} title='Lambhorghini' time='Jan 18 to 21 2021' prepay='240.000'/>
                </div>
              </div>
              <div className={styles.flexRight}>
                <div className={styles.arrival}>
                  <span className={styles.titleSpan}>New Arrival</span>
                  <Card imgsrc={lambhorghini} title='Lambhorghini' subtitle='South Jakarta'/>
                  <Card imgsrc={lambhorghini} title='Lambhorghini' subtitle='South Jakarta'/>
                </div>
              </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default History;
