import Layout from '../components/Layout';
import InputOpt from '../components/base/InputOpt';
import styles from '../styles/Home.module.css';
import SmallButton from '../components/base/SmallButton';
import CardWrapper from '../components/modules/CardWrapper';
import testimonial from '../assets/img/Home/testimonial.png';
import Image from 'next/image';
import Card from '../components/modules/Card';
import merapi from '../assets/img/Home/merapi.png';
import telukBogam from '../assets/img/Home/teluk-bogam.png';
import bromo from '../assets/img/Home/bromo.png';
import malioboro from '../assets/img/Home/malioboro.png';

const index = () => {
  return (
    <Layout title="Zembrani | Home" home="navActive">
      <div className={`mb-2 mb-md-4 mb-lg-5 ${styles.cover}`}>
        <div className="container pt-5">
          <div className={styles.explore}>
            <span className={styles.title}>Explore And Travel</span>
            <span className={styles.spanFinder}>Vechile Finder</span>
            <hr className={styles.hrWrap} />
            <br />
            <div className="row">
              <div className="col-6 col-lg-5">
                <InputOpt
                  name="location"
                  placeholder="Location"
                  data={['jakarta', 'Trenggalek', 'Surabaya', 'jogja']}
                />{' '}
                <br />
                <InputOpt name="payment" placeholder="Payment" data={['jakarta', 'Trenggalek', 'Surabaya', 'jogja']} />
              </div>
              <div className="col-6 col-lg-5">
                <InputOpt name="type" placeholder="Type" data={['jakarta', 'Trenggalek', 'Surabaya', 'jogja']} /> <br />
                <InputOpt name="date" placeholder="Date" data={['jakarta', 'Trenggalek', 'Surabaya', 'jogja']} />
              </div>
              <br />
              <SmallButton text="explore" />
            </div>
          </div>
        </div>
      </div>
      <CardWrapper title="Popular in town" category='popular'>
        <Card imgsrc={merapi} title="Merapi" subtitle="Yogyakarta" />
        <Card imgsrc={telukBogam} title="Teluk bogam" subtitle="Kalimantan" />
        <Card imgsrc={bromo} title="Bromo" subtitle="Malang" />
        <Card imgsrc={malioboro} title="Malioboro" subtitle="Yogyakarta" />
      </CardWrapper>
      <div className="container mt-5">
        <span className={styles.testimonial}>Testimonials</span>
        <div className="row ms-1 mt-3">
          <div className={`col-7 ${styles.leftTesti}`}>
            <div className="row">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam id quo iure, minima quam nesciunt dolorum
              sunt repudiandae laudantium nulla, odit maiores tempore iste possimus pariatur! Doloremque earum
              repellendus sequi saepe, autem praesentium ipsam, veritatis suscipit inventore, repudiandae quisquam quae.
            </div>
            <div className="row pt-5">
              <span className="ps-0 fw-bold">Edward Newgate</span>
              <span className="ps-0">Founder Circle</span>
            </div>
          </div>
          <div className="col-5">
            <Image className={styles.imgTesti} src={testimonial} alt="testimonial" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default index;
