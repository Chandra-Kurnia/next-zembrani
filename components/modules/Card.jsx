import { Fragment } from "react";
import styles from '../../styles/Card.module.css'
import Image from 'next/image'

const Card = (props) => {
    return (
        <Fragment>
            <div className={`position-relative  mt-3 mt-lg-5 ${styles.cardWrapper}`}>
                <Image className={styles.cardImage} src={props.imgsrc} alt='vechile-img' width='290px'/>
                <div className={styles.cardTittleWrapper}>
                    <span className={styles.cardTittle}>{props.title}</span> <br />
                    <span className={styles.cardSubTittle}>{props.subtitle}</span>
                </div>
            </div>
        </Fragment>
    );
}

export default Card;