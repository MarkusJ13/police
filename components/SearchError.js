import React from 'react';
import {connect} from 'react-redux';
import { Text, View } from 'react-native';

class SearchError extends React.PureComponent {
	render() {
		return (
		<View style={{flex: 1}}>
			<Text style={{color: this.props.searchError.msgColor, textAlign: 'center'}}>{this.props.searchError.msg}</Text>
		</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		searchError: state.searchError,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchError);