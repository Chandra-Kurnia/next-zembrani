import {Fragment} from 'react';
import styles from '../../styles/ButtonAuth.module.css'

const ButtonAuth = (props) => {
  return (
    <Fragment>
      <div className={`${styles.buttonWrapper}`}>
        <button className={`${props.bgcolor} ${styles.button}`} onClick={props.onClick}>{props.text}</button>
      </div>
    </Fragment>
  );
};

export default ButtonAuth;
