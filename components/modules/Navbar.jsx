import {Fragment} from 'react';
import styles from './../../styles/Navbar.module.css';
import logo from '../../assets/logos/app-logo.png';
import Image from 'next/image';
import Link from 'next/link';
import coll from '../../assets/icons/collapse.png';

const Navbar = (props) => {
  return (
    <Fragment>
      <div className={`navbar navbar-expand-lg pt-lg-4 pb-lg-3${styles.content}`}>
        <div className="container">
          <Link href="/">
            <a className="navbar-brand">
              <Image src={logo} alt="appLogo" width="50px" height="50px"></Image>
            </a>
          </Link>
          <button
            className={styles.navTogler}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <Image src={coll} alt="collapse" />
            </span>
          </button>
          <div className={`collapse navbar-collapse ${styles.navbarItem}`} id="navbarText">
            <ul className={`navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center ${styles.navbarSubItem}`}>
              <li className="nav-item ms-lg-5 mt-lg-0 mt-md-2 mt-2">
                <Link href="/">
                  <a className={`text-decoration-none ${props.home} ${styles.navigation}`}>Home</a>
                </Link>
              </li>
              <li className="nav-item ms-lg-5 mt-lg-0 mt-md-3 mt-3">
                <Link href="/vechiles">
                  <a className={`text-decoration-none ${props.vechileType} ${styles.navigation}`}>Vechile Type</a>
                </Link>
              </li>
              <li className="nav-item ms-lg-5 mt-lg-0 mt-md-3 mt-3">
                <Link href="/history">
                  <a className={`text-decoration-none ${props.history} ${styles.navigation}`}>History</a>
                </Link>
              </li>
              <li className="nav-item ms-lg-5 mt-lg-0 mt-md-3 mt-3">
                <Link href="">
                  <a className={`text-decoration-none ${props.about} ${styles.navigation}`}>About</a>
                </Link>
              </li>
              <li className="nav-item ms-lg-5 text-center">
                <Link href="/auth/login">
                  <a>
                    <button className={`btn m-1 ${styles.btnOutline}`}>Login</button>
                  </a>
                </Link>
                <Link href='/auth/signUp'>
                  <a>
                    <button className={`btn m-1 ${styles.btnFull}`}>Register</button>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
