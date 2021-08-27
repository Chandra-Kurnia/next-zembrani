import '../styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import {Fragment} from 'react';
import store from '../redux/store';
import {Provider} from 'react-redux';

function MyApp({Component, pageProps}) {
  return (
    <Fragment>
      <Provider store={store}>
        <NextNProgress
          color="#FFCD61"
          startPosition={0.3}
          stopDelayMs={200}
          height={5}
          showOnShallow={true}
          options={{easing: 'ease', speed: 100}}
        />
        <Component {...pageProps} />;
      </Provider>
    </Fragment>
  );
}

// export const getServerSideProps = async ({ctx}) => {
//   try {
//     // console.log(ctx.req.headers.cookie);
//     const cookie = ctx.req.headers.cookie;
//     const dataUser = await axios.get(`${process.env.API_SERVER}/user/checktoken`, {
//       withCredentials: true,
//       headers: {cookie},
//     });
//     return {
//       props: cookie,
//       dataUser: dataUser.data.data
//     };
//   } catch (error) {
//     return {
//       props: [],
//     };
//   }
// };

export default MyApp;
