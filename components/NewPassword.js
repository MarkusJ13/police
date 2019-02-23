import React from 'react';
import {connect} from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import {updateSearchError, updateNewPassword} from './AllAction.js';

class Password extends React.PureComponent {
	handlePassword = (p) => {
		this.props.updateNewPassword(p)
		this.props.updateSearchError({msg: '', msgColor: '#000000'})
	}

	render() {
		let {newpassword} = this.props
		return (
			<TextField
				label='New Password'
				editable={true}
				value={newpassword}
				onChangeText={this.handlePassword}
				secureTextEntry={true}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		newpassword: state.newpassword
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateSearchError: (error) => {
			dispatch(updateSearchError(error))
		},
		updateNewPassword: (password) => {
			dispatch(updateNewPassword(password))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Password);