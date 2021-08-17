import {Fragment} from 'react';
import styles from '../../styles/NotifWrapper.module.css';

const NotifWrapper = (props) => {
  return (
    <Fragment>
      <div className={styles.wrapper}>
        <div className={styles.left}>{props.msg}</div>
        <div className={styles.right}></div>
      </div>
    </Fragment>
  );
};

export default NotifWrapper;
