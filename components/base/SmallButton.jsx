import { Fragment } from "react";
import styles from '../../styles/SmallButton.module.css'

const SmallButton = (props) => {
    return (
        <Fragment>
            <button className={`${props.className} ${styles.button}`}>
                {props.text}
            </button>
        </Fragment>
    );
}

export default SmallButton;