import { Fragment } from "react";
import styles from '../../styles/ButtonCount.module.css'

const ButtonCount = (props) => {
    return (
        <Fragment>
            <button className={`${props.bg} ${styles.btncount}`} onClick={props.onClick}> {props.text} </button>
        </Fragment>
    );
}

export default ButtonCount;