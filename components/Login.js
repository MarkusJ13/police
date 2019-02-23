import React from 'react';
import {connect} from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native';
import { Button, Header } from 'react-native-elements';
import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

import Password from './Password.js';
import PhoneNumber from './PhoneNumber.js';
import SearchError from './SearchError.js';

import {updateSearchError, updateSession} from './AllAction.js';
import { AsyncStorage } from "react-native";

class Login extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			buttonText: 'LOGIN'
		}
		let usersDb = firebase.database().ref().child('users')
		this.usersDb = usersDb
	}

	login = () => {
		let {phone, password} = this.props
		if(password === ''){
			this.props.updateSearchError({msg: 'Please enter password', msgColor: '#ff0000'})
		}else{
			let email = phone + '@informer.com'
			let self = this
			let auth = firebase.auth()
			this.setState({buttonText: "LOGGING IN..."})
			self.props.updateSearchError({msg: '', msgColor: '#ffffff'})
			auth.signInWithEmailAndPassword(email, password).then(function(user) {
				self.setState({buttonText: "LOGIN"})
				self.props.navigation.navigate('Tabs')
				AsyncStorage.setItem('phone', phone);
			}).catch(function(error) {
				self.props.updateSearchError({msg: 'Password incorrect or not set', msgColor: '#ff0000'})
				self.setState({buttonText: "LOGIN"})
			})
		}
	}

	render() {
		let {buttonText} = this.state
		return (
			<View style={{flex: 1, backgroundColor: 'white'}}>
				<Header
					centerComponent={{ text: 'Login', style: { fontSize: 20, color: '#fff'}}}
					outerContainerStyles={{borderBottomWidth: 0, height: 85, backgroundColor: "#ff0f0f"}}
				/>
				<View style={{margin: 10}}>
					<PhoneNumber />
					<Password />
					<View style={{top: 10}}>
						<Button
							title={buttonText}
							backgroundColor="#ff0f0f"
							onPress={this.login}
						/>
						<SearchError />
					</View>
				</View>
				<View style={{position: 'absolute', bottom: 10, width: '100%'}}>
				<TouchableOpacity style={{margin: 20, padding: 15}} onPress={() => {this.props.navigation.navigate('ResetPassword')}}>
					<Text style={{textAlign: 'center', textDecorationLine: 'underline'}}>Reset Password</Text>
				</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		phone: state.phone,
		password: state.password
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateSearchError: (error) => {
			dispatch(updateSearchError(error))
		},
		updateSession: (session) => {
			dispatch(updateSession(session))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);