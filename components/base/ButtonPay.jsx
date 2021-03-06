import { Fragment } from "react";
import styles from '../../styles/ButtonPay.module.css'

const ButtonPay = (props) => {
    return (
        <Fragment>
            <button onClick={props.onClick} className={`${props.className} ${styles.btn}`}>{props.text}</button>
        </Fragment>
    );
}

export default ButtonPay;