import React from 'react';
import {connect} from 'react-redux';
import { View } from 'react-native';
import { Button, Header } from 'react-native-elements';
import CodeInput from 'react-native-code-input';
import SearchError from './SearchError.js';

class VerifyPhone extends React.PureComponent {
	login = () => {
		this.props.navigation.navigate('AddInformer')
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
					<View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
						<CodeInput
							ref="codeInputRef1"
							secureTextEntry
							borderType={'underline'}
							space={10}
							size={50}
							codeLength={4}
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

export default VerifyPhone;