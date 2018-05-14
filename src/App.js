import React from 'react';
import Nav from './config/routes';
import { Provider } from 'react-redux';
import store from './config/store';

export default () => (
  <Provider store={store} >
    	<Nav />
  </Provider>
);