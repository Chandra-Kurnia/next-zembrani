/* eslint-disable @next/next/no-sync-scripts */
import {Fragment} from 'react';
import Navbar from './modules/Navbar';
import Footer from './modules/Footer';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';

const Layout = (props) => {
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
      <Navbar />
      {props.children}
      <Footer />
    </Fragment>
  );
};

export default Layout;
