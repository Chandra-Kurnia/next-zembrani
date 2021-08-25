/* eslint-disable @next/next/no-sync-scripts */
import {Fragment, useEffect} from 'react';
import Navbar from './modules/Navbar';
import NavbarLogin from './modules/NavbarLogin';
import Footer from './modules/Footer';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

// export const getServerSideProps = async(context) => {
//   try{
//     console.log('1');
//     const cookie = context.req.headers.cookie;
//     const dataUser = await axios.get(`${process.env.API_SERVER}/user/checktoken`, {
//       withCredentials: true,
//       headers: {cookie},
//     });
//     return {
//       props:{
//         dataUser
//       }
//     }
//   }catch(error){
//     console.log(2);
//     return{
//       props:{
//         dataUser: {}
//       }
//     }
//   }
// }

const Layout = (props) => {
  let auth = true;
  // if (props.dataUser) {
  //   auth = true;
  // }
  // console.log(props);

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
        <NavbarLogin home={props.home} vechileType={props.vechileType} history={props.history} about={props.about} />
      ) : (
        <Navbar home={props.home} vechileType={props.vechileType} history={props.history} about={props.about} />
      )}
      {props.children}
      <Footer />
    </Fragment>
  );
};

export default Layout;
