/* eslint-disable react-hooks/exhaustive-deps */
import {Fragment} from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/vechiles.module.css';
import search from '../../assets/icons/search.png';
import Image from 'next/image';
import CardWrapper from '../../components/modules/CardWrapper';
import Card from '../../components/modules/Card';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.API_SERVER}/vehicle/4/popular`);
  const popular = res.data.data;
  return {
    props: {popular},
  };
};

const Index = (props) => {
  const popular = props.popular;
  const [cars, setcars] = useState([]);
  const [motorbikes, setmotorbike] = useState();
  const [bikes, setbike] = useState();
  const [keyword, setkeyword] = useState('');
  const {vehicles} = useSelector((state) => state.vehicle);

  const getCars = () => {
    axios
      .get(`${process.env.API_SERVER}/vehicle/?type=cars&limit=4&keyword=${keyword}`)
      .then((data) => {
        // console.log(data.data.data);
        setcars(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMotorBike = () => {
    axios
      .get(`${process.env.API_SERVER}/vehicle/?type=motorbike&limit=4&keyword=${keyword}`)
      .then((data) => {
        // console.log(data.data.data);
        setmotorbike(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getBike = () => {
    axios
      .get(`${process.env.API_SERVER}/vehicle/?type=bike&limit=4&keyword=${keyword}`)
      .then((data) => {
        // console.log(data.data.data);
        setbike(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCars();
    getMotorBike();
    getBike();
  }, [keyword]);
  return (
    <Fragment>
      <Layout title="Zembrani | Vechiles" vechileType="navActive" {...props}>
        <div className="container pt-3">
          <div className="input-group ms-0 ms-md-2">
            <input
              onChange={(e) => setkeyword(e.target.value)}
              type="text"
              placeholder="Search vehicle (ex. cars, cars name)"
              className={styles.search}
              aria-describedby="search"
            />
            <button className={styles.btnSearch} id="basic-addon2" itemID="search">
              <Image src={search} alt="search-logo" width="15px" height="15px" />
            </button>
          </div>
          <div className="pt-4">
            <CardWrapper title="Popular in town" category="">
              {popular
                ? popular.map((vehicle, index) => (
                    <Card
                      imgsrc={vehicle.image}
                      title={vehicle.vehicle_name}
                      subtitle={vehicle.location_name}
                      id={vehicle.vehicle_id}
                      key={index}
                    />
                  ))
                : 'Data not found'}
            </CardWrapper>
            <section className="mt-5"></section>
            <CardWrapper title="Cars" category="cars">
              {cars
                ? cars.map((car) => (
                    <Card
                      key={car.vehicle_id}
                      id={car.vehicle_id}
                      imgsrc={car.image}
                      title={car.vehicle_name}
                      subtitle={car.location_name}
                    />
                  ))
                : 'Data Not Found'}
            </CardWrapper>
            <section className="mt-5"></section>
            <CardWrapper title="MotorBike" category="motorbike">
              {motorbikes
                ? motorbikes.map((motorbike) => (
                    <Card
                      key={motorbike.vehicle_id}
                      id={motorbike.vehicle_id}
                      imgsrc={motorbike.image}
                      title={motorbike.vehicle_name}
                      subtitle={motorbike.location_name}
                    />
                  ))
                : 'Data not found'}
            </CardWrapper>
            <section className="mt-5"></section>
            <CardWrapper title="Bike" category="bike">
              {bikes
                ? bikes.map((bike) => (
                    <Card
                      key={bike.vehicle_id}
                      id={bike.vehicle_id}
                      imgsrc={bike.image}
                      title={bike.vehicle_name}
                      subtitle={bike.location_name}
                    />
                  ))
                : 'Data not found'}
            </CardWrapper>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Index;
