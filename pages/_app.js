import '../styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import {Fragment} from 'react';

function MyApp({Component, pageProps}) {
  return (
    <Fragment>
      <NextNProgress
        color="#FFCD61"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
        showOnShallow={true}
        options={{easing: 'ease', speed: 100}}
      />
      <Component {...pageProps} />;
    </Fragment>
  );
}

// MyApp.getInitialProps = async ({ctx}) => {
//   try {
//     // console.log(ctx.req.headers.cookie);
//     const cookie = ctx.req.headers.cookie;
//     return {
//       props: cookie,
//     };
//   } catch (error) {
//     return {
//       props: [],
//     };
//   }
// };

export default MyApp;
