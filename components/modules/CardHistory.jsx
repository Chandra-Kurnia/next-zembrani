import { Fragment } from "react";
import Image from 'next/image'
import styles from '../../styles/CardHistory.module.css'

const CardHistory = (props) => {
    return (
        <Fragment>
            <div className={`${styles.wrapper} d-lg-flex d-md-flex position-relative mb-5 mb-md-0 mb-lg-0`}>
                <div className={styles.imgWrapper}>
                    <Image className={styles.img} src={props.imgsrc} alt='imgVehicle'/>
                </div>
                <div className={styles.content}>
                    <span className={styles.title}>{props.title}</span>
                    <span className={styles.time}>{props.time}</span>
                    <span className={styles.prepay}>Prepayment : Rp. {props.prepay}</span>
                    <span className={styles.status}>Has been returned</span>
                </div>
                <button className={`${styles.btn} bg-orange`}>Delete</button>
            </div>
            <hr className={styles.line}/>
        </Fragment>
    );
}

export default CardHistory;