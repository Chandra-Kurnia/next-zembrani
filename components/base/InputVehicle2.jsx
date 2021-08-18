import { Fragment } from "react";
import styles from '../../styles/InputVehicle2.module.css'

const InputVehicle2 = (props) => {
    return (
        <Fragment>
            <span className={styles.inputTitle}>{props.title}</span>
            <input name={props.name} type="text" placeholder={props.placeholder} className={`${props.className} ${styles.input}`} />
        </Fragment>
    );
}

export default InputVehicle2;