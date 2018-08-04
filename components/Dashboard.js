import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from './Login.js';
import VerifyPhone from './VerifyPhone.js';
import AddInformer from './AddInformer.js';

const RootStack = createStackNavigator(
	{
		Login: {
			screen: Login,
			navigationOptions: {
				header: null,
			}
		},
		Verification: {
			screen: VerifyPhone,
			navigationOptions: {
				header: null,
			}
		},
		AddInformer: {
			screen: AddInformer,
			navigationOptions: {
				header: null,
			}
		},
	},
	{
	initialRouteName: 'Login',
	},
	{ 
	headerMode: 'screen' 
	}
);

export default class Dashboard extends React.Component {
	render() {
		return <RootStack />;
	}
}