/* eslint-disable react-hooks/exhaustive-deps */
import Layout from '../components/Layout';
import InputOpt from '../components/base/InputOpt';
import styles from '../styles/Home.module.css';
import SmallButton from '../components/base/SmallButton';
import CardWrapper from '../components/modules/CardWrapper';
import testimonial from '../assets/img/Home/testimonial.png';
import Image from 'next/image';
import Card from '../components/modules/Card';
import Link from 'next/link';
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { getPopularVehicle } from '../redux/actions/vehicleAction';
import swal from 'sweetalert';

const Index = (props) => {
  const dispatch = useDispatch()
  const {vehicles} = useSelector(state => state.vehicle)
  const {user} = useSelector(state => state.user)

  let admin = false
  if(user){
    if(user.roles === 'admin')
    admin = true;
  }

useEffect(() => {
 dispatch(getPopularVehicle)
}, [])


  return (
    <Layout title="Zembrani | Home" home="navActive" {...props}>
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
                  data={[
                    {id: 1, text: 'Jakarta'},
                    {id: 2, text: 'Trenggalek'},
                    {id: 2, text: 'Semarang'},
                    {id: 2, text: 'Solo'},
                  ]}
                />{' '}
              </div>
              <div className="col-6 col-lg-5">
                <InputOpt
                  name="type"
                  placeholder="Type"
                  data={[
                    {id: 1, text: 'Motor'},
                    {id: 2, text: 'Mobil'},
                    {id: 2, text: 'Vespa'},
                    {id: 2, text: 'Matic'},
                  ]}
                />{' '}
              </div>
              <br />
              <SmallButton text="explore" className="bg-orange" onClick={() => swal('Info', 'Feature in development', 'info')} />
            </div>
          </div>
        </div>
      </div>
      <CardWrapper title="Popular in town" category="">
        {vehicles.length > 0
          ? vehicles.map((vehicle, index) => (
              <Card
                key={index}
                imgsrc={vehicle.image}
                title={vehicle.vehicle_name}
                subtitle={vehicle.location_name}
                id={vehicle.vehicle_id}
              />
            ))
          : 'Data Is Loading'}
        {admin && (
          <Link href="/admin/addvehicle">
            <a>
              <SmallButton text="Add Vehicle" className="bg-black mt-5" />
            </a>
          </Link>
        )}
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

export default Index;
