import { Fragment } from "react";
import styles from '../../styles/InputOpt.module.css'

const InputOpt = (props) => {
    return (
        <Fragment>
            <select name={props.name} id="" className={styles.opt}>
                <option value="" id='default-opt-value'>{props.placeholder}</option>
                {props.data && props.data.map((item) => (
                    <option value={item} key={item}>{item}</option>
                ))}
            </select>
        </Fragment>
    );
}

export default InputOpt;