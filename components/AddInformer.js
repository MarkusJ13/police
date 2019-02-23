import React from 'react';
import {connect} from 'react-redux';
import { Text, ScrollView, View, TextInput, TouchableHighlight, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import MenuOptions from './MenuOptions/MenuOptions.js';
import Style from './AddInformerStyle.js';
import { TextField } from 'react-native-material-textfield';
import ModalFilterPicker from 'react-native-modal-filter-picker';

import InformerName from './InformerName.js';
import InformerPhone from './InformerPhone.js';
import SelectThana from './SelectThana.js';
import SelectChauki from './SelectChauki.js';
import SelectBeet from './SelectBeet.js';
import SearchError from './SearchError.js';

import firebase from 'firebase';
import 'firebase/database';

import {updateSearchError, updateMenu, updateInformerName, updateInformerPhone, updateThana, updateChauki, updateBeet} from './AllAction.js';

class ShowOption extends React.PureComponent {
	render() {
		return (
			<TouchableOpacity
				style={{top: 14, padding: 20}}
				onPress={function(){this.props.toggleMenu(true)}.bind(this)}
			>
				<Icon
					name='dots-three-vertical'
					type="entypo"
					color='#ffffff'
					size={16}
				/>
			</TouchableOpacity>
		);
	}
}

class HeaderView extends React.PureComponent {
	render() {
		return (
			<View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
				<Text style={{ fontSize: 22, color: '#fff', width: '70%', textAlign: 'center'}}>Add Informer</Text>
			</View>
		);
	}
}

class AddInformer extends React.Component {
	constructor(props) {
		super(props);
		let informersDb = firebase.database().ref().child('informers')
		this.informersDb = informersDb
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !(nextState === this.state)
	}

	toggleMenu = (state) => {
		this.props.updateMenu(state)
	}

	addInformer = () => {
		let {informerName, informerPhone, thana, chauki, beet} = this.props
		if(informerName && informerPhone && beet){
			this.informersDb.push().set({
				name: informerName,
				phone: informerPhone,
				thana,
				chauki,
				beet
			})
			this.props.updateInformerName('')
			this.props.updateInformerPhone('')
			this.props.updateThana('')
			this.props.updateChauki('')
			this.props.updateBeet('')
			this.props.updateSearchError({msg: 'Added', msgColor: '#2dcc8d'})
		}
		else if(!informerName){
			this.props.updateSearchError({msg: "Please add name", msgColor: '#cc2d8d'})
		}
		else if(!informerPhone){
			this.props.updateSearchError({msg: "Please add phone number", msgColor: '#cc2d8d'})
		}
		else if(!thana){
			this.props.updateSearchError({msg: "Please select thana", msgColor: '#cc2d8d'})
		}
		else if(!chauki){
			this.props.updateSearchError({msg: "Please select chauki", msgColor: '#cc2d8d'})
		}
		else if(!beet){
			this.props.updateSearchError({msg: "Please select beet", msgColor: '#cc2d8d'})
		}
	}

	render() {
		return (
			<KeyboardAvoidingView style={{flex: 1, height: '100%'}}>
				<ScrollView style={Style.formHeader} keyboardShouldPersistTaps="always">
					<InformerName />
					<InformerPhone />
					<Text style={Style.formHeaderText}>Select Region</Text>
					<SelectBeet />
					<SelectChauki />
					<SelectThana />

					<View style={{}}>
						<Button
							title='ADD'
							backgroundColor='#ff0f0f'
							onPress={this.addInformer}
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
		informerName: state.informerName,
		informerPhone: state.informerPhone,
		thana: state.thana,
		chauki: state.chauki,
		beet: state.beet,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateSearchError: (error) => {
			dispatch(updateSearchError(error))
		},
		updateInformerName: (name) => {
			dispatch(updateInformerName(name))
		},
		updateInformerPhone: (phone) => {
			dispatch(updateInformerPhone(phone))
		},
		updateThana: (thana) => {
			dispatch(updateThana(thana))
		},
		updateChauki: (chauki) => {
			dispatch(updateChauki(chauki))
		},
		updateBeet: (beet) => {
			dispatch(updateBeet(beet))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(AddInformer);