import React from 'react';
import {connect} from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import {updateSearchError, updateReenterPassword} from './AllAction.js';

class Password extends React.PureComponent {
	handlePassword = (p) => {
		this.props.updateReenterPassword(p)
		this.props.updateSearchError({msg: '', msgColor: '#000000'})
	}

	render() {
		let {reenterpassword} = this.props
		return (
			<TextField
				label='New Password'
				editable={true}
				value={reenterpassword}
				onChangeText={this.handlePassword}
				secureTextEntry={true}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		reenterpassword: state.reenterpassword
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateSearchError: (error) => {
			dispatch(updateSearchError(error))
		},
		updateReenterPassword: (password) => {
			dispatch(updateReenterPassword(password))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Password);