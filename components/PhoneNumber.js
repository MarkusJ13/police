import React from 'react';
import {connect} from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import {updateSearchError, updatePhone} from './AllAction.js';

class PhoneNumber extends React.PureComponent {
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