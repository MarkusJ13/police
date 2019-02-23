import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from './Login.js';
import VerifyPhone from './VerifyPhone.js';
import Tabs from './Tabs.js';
import SearchResults from './SearchResult/SearchResult.js';
import ResetPassword from './ResetPassword.js';

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
		Tabs: {
			screen: Tabs,
			navigationOptions: {
				header: null,
			}
		},
		Results: {
			screen: SearchResults,
			navigationOptions: {
				header: null,
			}
		},
		ResetPassword: {
			screen: ResetPassword,
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