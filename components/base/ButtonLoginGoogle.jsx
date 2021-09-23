import { Fragment } from "react";
import styles from '../../styles/ButtonAuth.module.css'
import google from '../../assets/icons/google.png'

const ButtonLoginGoogle = (props) => {
    return (
        <Fragment>
            <button className={`mt-3 ${styles.buttonGoogle}`}>
                {/* <Image src={google} alt='google-logo' width='20px' height='20px' className='m-auto' /> */}
                <img src={google.src} className={styles.googleLogo} alt="" />
                {props.text}
            </button>
        </Fragment>
    );
}

export default ButtonLoginGoogle;