import React from 'react';
import {connect} from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import {updateSearchError, updateBadge} from './AllAction.js';

class BadgeNumber extends React.PureComponent {
	handleBadge = (b) => {
		this.props.updateBadge(b)
		this.props.updateSearchError({msg: '', msgColor: '#000000'})
	}

	render() {
		let {badge} = this.props
		return (
			<TextField
				label='Badge Number'
				editable={true}
				value={badge}
				keyboardType = 'numeric'
				onChangeText={this.handleBadge}
			/> 
		);
	}
}

const mapStateToProps = (state) => {
	return {
		badge: state.badge
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateSearchError: (error) => {
			dispatch(updateSearchError(error))
		},
		updateBadge: (badge) => {
			dispatch(updateBadge(badge))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(BadgeNumber);