import React from 'react';
import { View, Text } from 'react-native';
import Login from './Login.js';
import AddInformer from './AddInformer.js';
import Style from './DashboardStyle.js';
import { DB_CONFIG } from './config/FirebaseConfig.js';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: true
		}
	}

    login = () => {
    	this.setState({isLoggedIn: true})
    }

    logout = () => {
    	this.setState({isLoggedIn: false})
    }

	render() {
		let {isLoggedIn} = this.state
		return (
			<View style={Style.rootContainer}>
				{isLoggedIn?<AddInformer updateLogout={this.logout}/>:<Login updateLogin={this.login}/>}
			</View>
		);
	}
}