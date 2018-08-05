import React from 'react';
import {connect} from 'react-redux';
import { View } from 'react-native';
import { Button, Header } from 'react-native-elements';
import CodeInput from 'react-native-code-input';
import SearchError from './SearchError.js';

import { updateSearchError } from './AllAction.js';

class VerifyPhone extends React.PureComponent {
	constructor(props) {
		super(props);
		this.code = ''
	}

	login = () => {
		let {session} = this.props
		let code = this.code
		console.log("check session", this.props.session)
		console.log('url', 'https://2factor.in/API/V1/0d8e811c-98cf-11e8-a895-0200cd936042/SMS/VERIFY/' + session + '/' + code)
		fetch('https://2factor.in/API/V1/0d8e811c-98cf-11e8-a895-0200cd936042/SMS/VERIFY/' + session + '/' + code)
		.then((response) => response.json())
		.then((responseJson) => {
			console.log("check out", responseJson)
			if(responseJson.Details === 'OTP Matched'){
				this.props.navigation.navigate('AddInformer')
			}else if(responseJson.Details === 'OTP Mismatch'){
				this.props.updateSearchError({msg: 'Token Mismatch', msgColor: '#ff0000'})
			}else if(responseJson.Details === 'OTP Expired'){
				this.props.updateSearchError({msg: 'Token Expired', msgColor: '#ff0000'})
			}
		})
		.catch((error) => {
			console.error(error);
		});
		//this.props.navigation.navigate('AddInformer')
	}

	_onFulfill = code => {
		this.code = code
		this.props.updateSearchError({msg: '', msgColor: '#000000'})
	}

	render() {
		return (
			<View style={{flex: 1, backgroundColor: 'white'}}>
				<Header
					centerComponent={{ text: 'Login', style: { fontSize: 20, color: '#fff'}}}
					outerContainerStyles={{borderBottomWidth: 0, height: 85, backgroundColor: "#ff0f0f"}}
				/>
				<View style={{margin: 10}}>
					<View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
					<View style={{top: 100}}>
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