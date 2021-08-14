import { Fragment } from "react";
import styles from '../../styles/InputAuth.module.css'

const InputAuth = (props) => {
    return (
        <Fragment>
            <div className="mt-2 fw-bold">
            <input name={props.name} type={props.type} placeholder={props.placeholder} className={styles.input} />
            </div>
        </Fragment>
    );
}

export default InputAuth;