import React from 'react';
import {connect} from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import {updateSearchError, updateInformerPhone} from './AllAction.js';

class SelectThana extends React.PureComponent {
	handlePhone = phone => {
		this.props.updateInformerPhone(phone)
		this.props.updateSearchError({msg: '', msgColor: '#000000'})
	}

	render() {
		let {informerPhone} = this.props
		return <TextField
			label='Phone number'
			value={informerPhone}
			editable={true}
			keyboardType = 'numeric'
			onChangeText={this.handlePhone}
		/>;
	}
}

const mapStateToProps = (state) => {
	return {
		informerPhone: state.informerPhone
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateSearchError: (error) => {
			dispatch(updateSearchError(error))
		},
		updateInformerPhone: (phone) => {
			dispatch(updateInformerPhone(phone))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectThana);