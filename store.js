import { createStore } from 'redux';

import AllReducer from './components/AllReducer.js';

const store = createStore(
	AllReducer,
);

export default store;