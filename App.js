import React from 'react';
import { Text, View } from 'react-native';
import Dashboard from './components/Dashboard.js';

export default class App extends React.Component {
	render() {
		return (
			<View style={{flex: 1}}>
				<Dashboard />
			</View>
		);
	}
}