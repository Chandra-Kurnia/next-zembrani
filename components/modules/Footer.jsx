import {Fragment} from 'react';
import styles from '../../styles/footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/logos/app-logo.png';
import tweet from '../../assets/logos/tweet-logos.png';
import fb from '../../assets/logos/fb-logos.png';
import ig from '../../assets/logos/ig-logos.png';
import linked from '../../assets/logos/li-logo.png';
import yt from '../../assets/logos/yt-logo.png';

const Footer = () => {
  return (
    <Fragment>
      <div className={`mt-4 ${styles.wrapper}`}>
        <div className="container-fluid ps-lg-5 ps-2 pt-3 pb-3 pe-2 pe-lg-5">
          <div className="row">
            <div className={`col-12 col-lg-5 ${styles.footerLeft}`}>
              <Image src={logo} alt="applogo" width="50px" height="50px"></Image> <br />
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates inventore quos numquam. Fugit,
                officia amet! In quasi inventore facilis impedit.
              </span>{' '}
              <br /> <br />
              <span>©2020 Zembrani Rental Center. All rights reserved</span>
            </div>
            <div className="col-12 col-lg-7">
              <div className="row pt-3">
                <div className="col-12 col-lg-4 col-md-4">
                  <span className={styles.footerItem}>Destinations</span>
                  <ul className={styles.footerSubItem}>
                    <li>Bali</li>
                    <li>Yogyakarta</li>
                    <li>Jakarta</li>
                    <li>Kalimantan</li>
                    <li>Malang</li>
                  </ul>
                </div>
                <div className="col-12 col-lg-4 col-md-4">
                  <span className={styles.footerItem}>Vechiles</span>
                  <ul className={styles.footerSubItem}>
                    <li>Bike</li>
                    <li>Car</li>
                    <li>MotorBike</li>
                    <li>Return Times</li>
                    <li>FAQs</li>
                  </ul>
                </div>
                <div className="col-12 col-lg-4 col-md-4">
                  <span className={styles.footerItem}>Interest</span>
                  <ul className={styles.footerSubItem}>
                    <li>Adventure Travel</li>
                    <li>Art And Culture</li>
                    <li>Wildlife And Nature</li>
                    <li>Family Holidays</li>
                    <li>Culinary Trip</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className={styles.social}>
            <div className={styles.socialItem}>
              <Link href="/">
                <a>
                  <Image src={tweet} alt="tweet-logo" />
                </a>
              </Link>
              <Link href="/">
                <a>
                  <Image src={fb} alt="fb-logo" />
                </a>
              </Link>
              <Link href="/">
                <a>
                  <Image src={ig} alt="fb-logo" />
                </a>
              </Link>
              <Link href="/">
                <a>
                  <Image src={linked} alt="fb-logo" />
                </a>
              </Link>
              <Link href="/">
                <a>
                  <Image src={yt} alt="fb-logo" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
