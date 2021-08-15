import {useRouter} from 'next/router';
import {Fragment} from 'react';
import CardWrapper from '../../components/modules/CardWrapper';
import Card from '../../components/modules/Card';
import Layout from '../../components/Layout';
import merapi from '../../assets/img/Home/merapi.png';
import telukBogam from '../../assets/img/Home/teluk-bogam.png';
import bromo from '../../assets/img/Home/bromo.png';
import malioboro from '../../assets/img/Home/malioboro.png';
import van from '../../assets/img/vechiles/cars/van.png';
import lambhorghini from '../../assets/img/vechiles/cars/lambhorghini.png';
import jeep from '../../assets/img/vechiles/cars/jeep.png';
import whitejeep from '../../assets/img/vechiles/cars/white-jeep.png';
import vespa from '../../assets/img/vechiles/motorbike/vespa.png';
import Klx from '../../assets/img/vechiles/motorbike/KLX.png';
import honda from '../../assets/img/vechiles/motorbike/honda.png';
import matic from '../../assets/img/vechiles/motorbike/matic.png';
import fixie from '../../assets/img/vechiles/bike/Fixie.png';
import sport from '../../assets/img/vechiles/bike/sport.png';
import onthel from '../../assets/img/vechiles/bike/Onthel.png';
import fixiegrey from '../../assets/img/vechiles/bike/Fixie-grey.png';

const Category = () => {
  const {query} = useRouter();
  return (
    <Fragment>
      <Layout vechileType="navActive" title={`Zembrani | ${query.category}`}>
        <CardWrapper title={query.category} textSee="d-none">
          <Card imgsrc={merapi} title="Merapi" subtitle="Yogyakarta" id="20" />
          <Card imgsrc={telukBogam} title="Teluk bogam" subtitle="Kalimantan" />
          <Card imgsrc={bromo} title="Bromo" subtitle="Malang" />
          <Card imgsrc={malioboro} title="Malioboro" subtitle="Yogyakarta" />
          <Card imgsrc={van} title="Van" subtitle="Yogyakarta" />
          <Card imgsrc={lambhorghini} title="Lamborghini" subtitle="South jakarta" />
          <Card imgsrc={jeep} title="Jeep" subtitle="Malang" />
          <Card imgsrc={whitejeep} title="White jeep" subtitle="Kalimantan" />
          <Card imgsrc={vespa} title="Vespa" subtitle="Yogyakarta" />
          <Card imgsrc={Klx} title="Honda KLX" subtitle="Kalimantan" />
          <Card imgsrc={honda} title="Honda" subtitle="Malang" />
          <Card imgsrc={matic} title="Matic bike" subtitle="Yogyakarta" />
          <Card imgsrc={fixie} title="Fixie" subtitle="Yogyakarta" />
          <Card imgsrc={sport} title="Sport Bike" subtitle="Kalimantan" />
          <Card imgsrc={onthel} title="Onthel" subtitle="Malang" />
          <Card imgsrc={fixiegrey} title="Fixie Grey" subtitle="Yogyakarta" />
        </CardWrapper>
      </Layout>
    </Fragment>
  );
};

export default Category;
