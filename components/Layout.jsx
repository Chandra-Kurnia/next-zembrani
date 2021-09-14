/* eslint-disable @next/next/no-sync-scripts */
import {Fragment, useEffect} from 'react';
import Navbar from './modules/Navbar';
import NavbarLogin from './modules/NavbarLogin';
import Footer from './modules/Footer';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import { useSelector } from 'react-redux';

const Layout = (props) => {
  const {user} = useSelector(state => state.user)
  let auth = false;
  if(props.user){
    if(Object.keys(user).length > 0){
      auth = true;
    }
  }
  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj"
          crossOrigin="anonymous"
        ></script>
      </Head>
      {auth ? (
        <NavbarLogin
          home={props.home}
          vechileType={props.vechileType}
          history={props.history}
          about={props.about}
          avatar={`${process.env.API_SERVER}${user.avatar}`}
        />
      ) : (
        <Navbar home={props.home} vechileType={props.vechileType} history={props.history} about={props.about} />
      )}
      {props.children}
      <Footer />
    </Fragment>
  );
};

export default Layout;
