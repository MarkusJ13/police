import React from 'react';
import {connect} from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import {updateSearchError, updatePassword} from './AllAction.js';

class Password extends React.PureComponent {
	handlePassword = (p) => {
		this.props.updatePassword(p)
		this.props.updateSearchError({msg: '', msgColor: '#000000'})
	}

	render() {
		let {password} = this.props
		return (
			<TextField
				label='Password'
				editable={true}
				value={password}
				onChangeText={this.handlePassword}
				secureTextEntry={true}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		password: state.password
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateSearchError: (error) => {
			dispatch(updateSearchError(error))
		},
		updatePassword: (password) => {
			dispatch(updatePassword(password))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Password);