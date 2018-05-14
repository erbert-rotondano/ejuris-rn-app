import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const middleware = [];
if (process.env.NODE_ENV === 'development') {
	middleware.push(logger);
}
middleware.push(thunk);

export default createStore(reducers, compose(applyMiddleware(...middleware)));