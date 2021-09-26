import {Fragment} from 'react';
import styles from '../../styles/InputProfile.module.css';

const InputProfle = (props) => {
  return (
    <Fragment>
      <div className={props.className}>
        <span className={styles.title}>{props.title}</span>
        <input className={styles.input} type={props.type || 'text'} onChange={(e) => props.onChange(e)} name={props.name} id="" value={props.value} />
      </div>
    </Fragment>
  );
};

export default InputProfle;
