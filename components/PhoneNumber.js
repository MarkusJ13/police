import React from 'react';
import {connect} from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import {updateSearchError, updatePhone} from './AllAction.js';
import { AsyncStorage } from "react-native";

class PhoneNumber extends React.PureComponent {
	constructor(){
		super()
		let self = this
		AsyncStorage.getItem('phone', (err, result) => {
			if(result) self.props.updatePhone(result)
		});
	}

	handlePhone = (p) => {
		this.props.updatePhone(p)
		this.props.updateSearchError({msg: '', msgColor: '#000000'})
	}

	render() {
		let {phone} = this.props
		return (
			<TextField
				label='Phone Number'
				editable={true}
				value={phone}
				keyboardType = 'numeric'
				onChangeText={this.handlePhone}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		phone: state.phone
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateSearchError: (error) => {
			dispatch(updateSearchError(error))
		},
		updatePhone: (phone) => {
			dispatch(updatePhone(phone))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumber);