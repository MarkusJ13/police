import React from 'react';
import { Text, View, TextInput, TouchableHighlight, TouchableOpacity} from 'react-native';
import { Button, Header } from 'react-native-elements';
import CodeInput from 'react-native-code-input';
import Style from './LoginStyle.js';

export default class Out extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			verifyMode: false
		}
	}

	handleChange = () => {

	}

	verifyNumber = () => {
		this.setState({verifyMode: true})
	}

	login = () => {
		this.props.updateLogin()
	}

	_onFulfill = (code) => {

	}

	render() {//log out on going back 
		return (//TextInput for stock changes to View + Text on selecting a stock
			<View style={Style.rootContainer}>
				<Header
					centerComponent={{ text: 'Login', style: { fontSize: 20, color: '#fff'}}}
					outerContainerStyles={{borderBottomWidth: 0, height: 85, backgroundColor: "#ff0f0f"}}
				/>
				{!this.state.verifyMode?<View style={{margin: 10}}>
					<Text style={Style.formHeaderText}>Badge number</Text>
					<TextInput
						style={Style.formEntryText}
						placeholder="Your badge number"
						onChangeText={this.handleChange}
						keyboardType = 'numeric'
					/>
					<Text style={Style.formHeaderText}>Phone number</Text>
					<TextInput
						style={Style.formEntryText}
						placeholder="Mobile numberr"
						onChangeText={this.handleChange}
						keyboardType = 'numeric'
					/>
					<View style={{top: 10}}>
						<Button
							title='LOGIN'
							backgroundColor="#ff0f0f"
							onPress={this.verifyNumber}
						/>
					</View>
				</View>:<View style={{margin: 10}}>
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
					</View>
				</View>}
			</View>
		);
	}
}