import React from 'react';
import {connect} from 'react-redux';
import { View } from 'react-native';
import { Button, Header } from 'react-native-elements';
import firebase from 'firebase';
import 'firebase/database';

import BadgeNumber from './BadgeNumber.js';
import PhoneNumber from './PhoneNumber.js';
import SearchError from './SearchError.js';

import {updateSearchError, updateSession} from './AllAction.js';

class Login extends React.PureComponent {
	constructor(props) {
		super(props);
		let usersDb = firebase.database().ref().child('users')
		this.usersDb = usersDb
	}

	verifyNumber = () => {
		if(!this.props.badge){
			this.props.updateSearchError({msg: 'Please enter badge number', msgColor: '#ff0000'})
		}else if(!this.props.phone){
			this.props.updateSearchError({msg: 'Please enter phone number', msgColor: '#ff0000'})
		}else{
			this.verifyUser()
		}
	}

	verifyUser = () => {
		let {badge, phone} = this.props
		let self = this
		const usersRef = this.usersDb.orderByChild("badge").equalTo(badge);
		usersRef.on("value", function(snapshot) {
			let users = snapshot.val()
			let found = false
			for(var key in users) {
				if(found){
					continue
				}
				if(users[key].badge && users[key].badge === badge && users[key].phone && users[key].phone === phone){
					found = true
				}
			}
			if(found){
				// console.log('url', 'https://2factor.in/API/V1/0d8e811c-98cf-11e8-a895-0200cd936042/SMS/' + phone + '/AUTOGEN')
				fetch('https://2factor.in/API/V1/0d8e811c-98cf-11e8-a895-0200cd936042/SMS/' + phone + '/AUTOGEN')
				.then((response) => response.json())
				.then((responseJson) => {
					if(responseJson.Status !== 'Error'){
						self.props.updateSession(responseJson.Details)
						responseJson.Details
						self.props.navigation.navigate('Verification')
					}
				})
				.catch((error) => {
					console.error(error);
				});
				self.props.navigation.navigate('Verification')
			}
			else{
				self.props.updateSearchError({msg: 'user not found!', msgColor: '#ff0000'})
			}
		}, function (errorObject) {
			self.props.updateSearchError({msg: 'user not found! Error', msgColor: '#ff0000'})
			console.log("The read failed: " + errorObject.code);
		});
	}

	_onFulfill = (code) => {

	}

	render() {
		return (
			<View style={{flex: 1, backgroundColor: 'white'}}>
				<Header
					centerComponent={{ text: 'Login', style: { fontSize: 20, color: '#fff'}}}
					outerContainerStyles={{borderBottomWidth: 0, height: 85, backgroundColor: "#ff0f0f"}}
				/>
				<View style={{margin: 10}}>
					<BadgeNumber />
					<PhoneNumber />
					<View style={{top: 10}}>
						<Button
							title='LOGIN'
							backgroundColor="#ff0f0f"
							onPress={this.verifyNumber}
						/>
						<SearchError />
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		badge: state.badge,
		phone: state.phone
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