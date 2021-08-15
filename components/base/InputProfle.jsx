import {Fragment} from 'react';
import styles from '../../styles/InputProfile.module.css';

const InputProfle = (props) => {
  return (
    <Fragment>
      <div className={props.className}>
        <span className={styles.title}>{props.title}</span>
        <input className={styles.input} type="text" name={props.name} id="" defaultValue={props.value} />
      </div>
    </Fragment>
  );
};

export default InputProfle;
