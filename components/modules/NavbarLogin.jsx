import {Fragment} from 'react';
import styles from './../../styles/Navbar.module.css';
import logo from '../../assets/logos/app-logo.png';
import Image from 'next/image';
import Link from 'next/link';
import coll from '../../assets/icons/collapse.png';
import email from '../../assets/icons/email.png';
import profile from '../../assets/img/profile.png';
import {useState} from 'react';

const NavbarLogin = (props) => {
  const [dropdown, setdropdown] = useState(0);
  const drop = () => {
    if (dropdown === 1) {
      setdropdown(0);
    } else {
      setdropdown(1);
    }
  };
  return (
    <Fragment>
      <div className={`navbar navbar-expand-lg pt-lg-4 pb-lg-3 ${styles.content}`}>
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
                <Link href="">
                  <a className={`text-decoration-none ${props.history} ${styles.navigation}`}>History</a>
                </Link>
              </li>
              <li className="nav-item ms-lg-5 mt-lg-0 mt-md-3 mt-3">
                <Link href="">
                  <a className={`text-decoration-none ${props.about} ${styles.navigation}`}>About</a>
                </Link>
              </li>
              <li className="nav-item ms-lg-5 text-center d-flex align-items-center mt-3 mt-lg-0 ms-3 ms-lg-0">
                <Link href="/chat">
                  <a>
                    <Image src={email} alt="emailLogo" width="30px" height="27px" />
                  </a>
                </Link>
                <section className="ms-4"></section>
                <label htmlFor="dropdown">
                  <Image src={profile} alt="avatar" className="rounded-circle" width="35px" height="35px" />
                </label>
                <button className="d-none" id="dropdown" onClick={() => drop()}></button>
                {dropdown === 1 && (
                  <div className={styles.dropdown}>
                    <div className={styles.dropmenu}>
                      <Link href='/profile'>
                        <a className='text-decoration-none text-dark'>Edit Profile</a>
                      </Link>
                    </div>
                    <div className={styles.dropmenu}>
                      <Link href='/help'>
                        <a className='text-decoration-none text-dark'>Help</a>
                      </Link>
                    </div>
                    <div className={styles.dropmenu}>
                      <Link href='/logout'>
                        <a className='text-decoration-none text-dark'>Log Out</a>
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NavbarLogin;
