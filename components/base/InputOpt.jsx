import { Fragment } from "react";
import styles from '../../styles/InputOpt.module.css'

const InputOpt = (props) => {
    return (
        <Fragment>
            <select name={props.name} id="" className={styles.opt} onChange={props.onChange}>
                <option value="1" id='default-opt-value'>{props.placeholder}</option>
                {props.data && props.data.map((item, index) => (
                    <option value={item.id} key={index}>{item.text}</option>
                ))}
            </select>
        </Fragment>
    );
}

export default InputOpt;