import React from 'react';
import {connect} from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import {updateSearchError, updateInformerName} from './AllAction.js';

class InformerName extends React.PureComponent {
	handleName = name => {
		this.props.updateInformerName(name)
		this.props.updateSearchError({msg: '', msgColor: '#000000'})
	}

	render() {
		let {informerName} = this.props
		return <TextField
			label='Name'
			value={informerName}
			editable={true}
			onChangeText={this.handleName}
		/>;
	}
}

const mapStateToProps = (state) => {
	return {
		informerName: state.informerName
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateSearchError: (error) => {
			dispatch(updateSearchError(error))
		},
		updateInformerName: (name) => {
			dispatch(updateInformerName(name))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(InformerName);