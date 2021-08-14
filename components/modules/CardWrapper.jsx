import {Fragment} from 'react';
import styles from '../../styles/CardWrapper.module.css';
import Link from 'next/link';
import Card from './Card';
import merapi from '../../assets/img/Home/merapi.png'
import telukBogam from '../../assets/img/Home/teluk-bogam.png'
import bromo from '../../assets/img/Home/bromo.png'
import malioboro from '../../assets/img/Home/malioboro.png'

const CardWrapper = (props) => {
  return (
    <Fragment>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center ">
          <span className={styles.wrapperTitle}>{props.title}</span>
          <Link href='/'>
            <a className='text-decoration-none'>
              <span className={styles.seeMore}>View all</span>
            </a>
          </Link>
        </div>
        <div className="d-flex justify-content-lg-between flex-wrap justify-content-md-evenly justify-content-center">
            <Card imgsrc={merapi} title='Merapi' subtitle='Yogyakarta'/>
            <Card imgsrc={telukBogam} title='Teluk bogam' subtitle='Kalimantan'/>
            <Card imgsrc={bromo} title='Bromo' subtitle='Malang'/>
            <Card imgsrc={malioboro} title='Malioboro' subtitle='Yogyakarta'/>
        </div>
      </div>
    </Fragment>
  );
};

export default CardWrapper;
