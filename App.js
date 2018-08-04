import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Main from './Main.js';

export default class App extends React.Component {
	render() {
		console.disableYellowBox = true;
		return (
			<Provider store={store}>
				<Main />
			</Provider>
		);
	}
}