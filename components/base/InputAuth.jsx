import { Fragment } from "react";
import styles from '../../styles/InputAuth.module.css'

const InputAuth = (props) => {
    return (
        <Fragment>
            <div className="mt-2 fw-bold">
            <input onChange={props.onChange} name={props.name} type={props.type} placeholder={props.placeholder} className={`${props.className} ${styles.input}`} autoComplete="off"/>
            </div>
        </Fragment>
    );
}

export default InputAuth;