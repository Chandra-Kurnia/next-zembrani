/* eslint-disable @next/next/no-img-element */
import {Fragment} from 'react';
import styles from '../../styles/Card.module.css';
import Image from 'next/image';
import Link from 'next/link';
import fixie from '../../assets/img/vechiles/bike/Fixie.png';
import gambar from '../../assets/img/Auth/forgotpw.png';

const Card = (props) => {
  return (
    <Fragment>
      <Link href={`/vechiles/detail/${props.id}`}>
        <a>
          <div className={`position-relative  mt-3 mt-lg-5 ${styles.cardWrapper}`}>
            {/* <Image className={styles.cardImage} src={props.imgsrc} alt="vechile-img" width="290px"/> */}
            <img src={`${process.env.API_SERVER}${props.imgsrc}`} className={styles.cardImage} alt="vehicle" />
            <div className={styles.cardTittleWrapper}>
              <span className={styles.cardTittle}>{props.title}</span> <br />
              <span className={styles.cardSubTittle}>{props.subtitle}</span>
            </div>
          </div>
        </a>
      </Link>
    </Fragment>
  );
};

export default Card;
