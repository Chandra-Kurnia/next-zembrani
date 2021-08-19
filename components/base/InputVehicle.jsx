import { Fragment } from "react";
import styles from '../../styles/InputVehicle.module.css'

const InputVehicle = (props) => {
    return (
        <Fragment>
            <input onChange={(e) => props.onChange(e)} name={props.name} type="text" placeholder={props.placeholder} className={`${props.className} ${styles.input}`} />
        </Fragment>
    );
}

export default InputVehicle;