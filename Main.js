import React from 'react';
import { View } from 'react-native';
import Dashboard from './components/Dashboard.js';
import firebase from 'firebase';
import { DB_CONFIG } from './components/config/FirebaseConfig.js';

const firebaseApp = firebase.initializeApp(DB_CONFIG)

export default class Main extends React.PureComponent {
	render() {
		return (
			<View style={{flex: 1}}>
				<Dashboard/>
			</View>
		);
	}
}