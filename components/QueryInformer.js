import React from 'react';
import {connect} from 'react-redux';
import { Text, ScrollView, View, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import Style from './AddInformerStyle.js';

import SelectThana from './SelectThana.js';
import SelectChauki from './SelectChauki.js';
import SelectBeet from './SelectBeet.js';
import SearchError from './SearchError.js';

import {updateSearchError} from './AllAction.js';

class QueryInformer extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		return !(nextState === this.state)
	}

	toggleMenu = (state) => {
		this.props.updateMenu(state)
	}

	searchResult = () => {
		let {thana, chauki, beet} = this.props
		if(thana || chauki || beet){
			this.props.navigation.navigate('Results')
		}
		else{
			this.props.updateSearchError({msg: 'Please select atleast one region', msgColor: '#cc2d8d'})
		}
	}

	render() {
		return (
			<KeyboardAvoidingView style={{flex: 1, height: '100%'}}>
				<ScrollView style={Style.formHeader} keyboardShouldPersistTaps="always">
					<Text style={Style.formHeaderText}>Select Region</Text>
					<SelectBeet />
					<SelectChauki />
					<SelectThana />

					<View style={{}}>
						<Button
							title='Search'
							backgroundColor='#ff0f0f'
							onPress={this.searchResult}
						/>
						<SearchError />
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		thana: state.thana,
		chauki: state.chauki,
		beet: state.beet,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateSearchError: (error) => {
			dispatch(updateSearchError(error))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(QueryInformer);