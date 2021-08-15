import {Fragment} from 'react';
import styles from '../../styles/CardWrapper.module.css';
import Link from 'next/link';

const CardWrapper = (props) => {
  return (
    <Fragment>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center ">
          <span className={styles.wrapperTitle}>{props.title}</span>
          <Link href={`/vechiles/${props.category}`}>
            <a className='text-decoration-none'>
              <span className={`${props.textSee} ${styles.seeMore}`}>View all</span>
            </a>
          </Link>
        </div>
        <div className="d-flex justify-content-lg-between flex-wrap justify-content-md-evenly justify-content-center">
            {props.children}
        </div>
      </div>
    </Fragment>
  );
};

export default CardWrapper;
