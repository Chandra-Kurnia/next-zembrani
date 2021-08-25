/* eslint-disable @next/next/no-img-element */
import {Fragment} from 'react';
import styles from '../../styles/CardHistory.module.css';
import Link from 'next/link';

const CardHistory = (props) => {
  return (
    <Fragment>
      <div className={`${styles.wrapper} d-lg-flex d-md-flex position-relative mb-5 mb-md-0 mb-lg-0`}>
        <div className={styles.imgWrapper}>
          <img className={styles.img} src={`${process.env.API_SERVER}${props.imgsrc}`} alt="imgVehicle" />
        </div>
        <Link href={`/payment/${props.idHistory}`}>
          <a className={styles.a}>
            <div className={styles.content}>
              <span className={styles.title}>{props.title}</span>
              <span className={styles.time}>{props.time}</span>
              <span className={styles.prepay}>Cost : Rp. {props.prepay}</span>
              <span className={styles.status}>{props.status}</span>
            </div>
          </a>
        </Link>
        <button onClick={() => props.onClick()} className={`${styles.btn} bg-orange`}>Delete</button>
      </div>
      <hr className={styles.line} />
    </Fragment>
  );
};

export default CardHistory;
