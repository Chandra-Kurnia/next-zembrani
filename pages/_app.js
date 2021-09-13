import '../styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import {Fragment} from 'react';
import {store} from '../redux/store'
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist';

function MyApp({Component, pageProps}) {
  return (
    <Fragment>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <NextNProgress
          color="#FFCD61"
          startPosition={0.3}
          stopDelayMs={200}
          height={5}
          showOnShallow={true}
          options={{easing: 'ease', speed: 100}}
        />
        <Component {...pageProps} user={store.getState().user.user}/>;
        {/* </PersistGate> */}
      </Provider>
    </Fragment>
  );
}

export default MyApp;
