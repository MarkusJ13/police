import React from 'react';
import {connect} from 'react-redux';
import { View } from 'react-native';
import { Button, Header } from 'react-native-elements';
import CodeInput from 'react-native-code-input';

import NewPassword from './NewPassword.js';
import ReenterPassword from './ReenterPassword.js';
import SearchError from './SearchError.js';
import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

import { updateSearchError } from './AllAction.js';

class VerifyPhone extends React.PureComponent {
	constructor(props) {
		super(props);
		this.code = ''
	}

	login = () => {
		let self = this
		let {session, phone} = this.props
		let code = this.code
		let {newpassword, reenterpassword} = this.props
		if(newpassword !== reenterpassword){
			this.props.updateSearchError({msg: 'Passwords do not match!', msgColor: '#ff0000'})
		}
		else{
		fetch('https://2factor.in/API/V1/0d8e811c-98cf-11e8-a895-0200cd936042/SMS/VERIFY/' + session + '/' + code)
		.then((response) => response.json())
		.then((responseJson) => {
			if(responseJson.Details === 'OTP Matched'){
				let auth = firebase.auth()
				let email = phone + '@informer.com'
				auth.createUserWithEmailAndPassword(email, newpassword).then(function(user) {
					self.props.navigation.popToTop()
				}).catch(function(error) {
					if(error.message === 'The email address is already in use by another account.'){
						self.props.updateSearchError({msg: 'Update password not handled yet', msgColor: '#ff0000'})
					}else{
						self.props.updateSearchError({msg: error.message, msgColor: '#ff0000'})
					}
				})
			}else if(responseJson.Details === 'OTP Mismatch'){
				self.props.updateSearchError({msg: 'Token Mismatch', msgColor: '#ff0000'})
			}else if(responseJson.Details === 'OTP Expired'){
				self.props.updateSearchError({msg: 'Token Expired', msgColor: '#ff0000'})
			}
		})
		.catch((error) => {
			console.error(error);
		});
			
		}
	}

	_onFulfill = code => {
		this.code = code
		this.props.updateSearchError({msg: '', msgColor: '#000000'})
	}

	render() {
		return (
			<View style={{flex: 1, backgroundColor: 'white'}}>
				<Header
					centerComponent={{ text: 'Reset Password', style: { fontSize: 20, color: '#fff'}}}
					outerContainerStyles={{borderBottomWidth: 0, height: 85, backgroundColor: "#ff0f0f"}}
				/>
				<View style={{margin: 10}}>
					<View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 50}}>
						<CodeInput
							ref="codeInputRef1"
							secureTextEntry
							borderType={'underline'}
							space={10}
							size={40}
							codeLength={6}
							inputPosition='left'
							activeColor='rgba(49, 180, 4, 1)'
	      					inactiveColor='rgba(49, 180, 4, 1.3)'
	      					compareWithCode='AsDW2'
							codeInputStyle={{}}
							onFulfill={(code) => this._onFulfill(code)}
						/>
					</View>
					<NewPassword />
					<ReenterPassword />
					<View style={{top: 10}}>
						<Button
							title='Submit'
							backgroundColor="#ff0f0f"
							onPress={this.login}
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
		phone: state.phone,
		newpassword: state.newpassword,
		reenterpassword: state.reenterpassword,
		session: state.session
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateSearchError: (error) => {
			dispatch(updateSearchError(error))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPhone);