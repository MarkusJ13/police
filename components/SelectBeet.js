import React from 'react';
import {connect} from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import { TextField } from 'react-native-material-textfield';
import {updateSearchError, updateThana, updateChauki, updateBeet} from './AllAction.js';

class SelectBeet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectBeet: false
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		return true
		if(nextProps.chauki !== this.props.chauki) return true
		else if(nextProps.stations !== this.props.stations) return true
		else if(nextState !== this.state) return true
		else if(nextProps.thana !== this.props.thana && nextProps.chauki) return true
		else return false
	}

	handleBeet = (beet) => {//dont update if value is same as prev value. same for every action
		this.props.updateSearchError({msg: '', msgColor: '#000000'})
		this.props.updateThana(beet.thana)
		this.props.updateChauki(beet.chauki)
		this.props.updateBeet(beet.beet)
		this.setState({ selectBeet: false })
	}

	selectBeet = () => {
		this.setState({selectBeet: !this.state.selectBeet})
	}

	getBeet = () => {
		let {stations} = this.props
		let Beet = []
		for(key1 in stations){
			if(stations[key1].child){
				for(key2 in stations[key1].child){
					if(stations[key1].child[key2].child){
						for(key3 in stations[key1].child[key2].child){
							Beet.push({key: {thana: key1, chauki: key2, beet: key3}, label: stations[key1].child[key2].child[key3].name + " (" + stations[key1].child[key2].name + ")"})
						}
					}
				}
			}
		}
		return Beet
	}

	render() {
		let Beet = this.getBeet()
		let {stations, thana, chauki, beet} = this.props
		let beetName = stations[thana] && stations[thana].child[chauki] && stations[thana].child[chauki].child[beet]?stations[thana].child[chauki].child[beet].name:''
		return (
		<View>
			<TouchableOpacity onPress={this.selectBeet}>
			<TextField
				label='Beet'
				value={beetName}
				editable={false}
				/>
			</TouchableOpacity>
			<ModalFilterPicker
				visible={this.state.selectBeet}
				onSelect={this.handleBeet}
				onCancel={this.selectBeet}
				options={Beet}
				optionTextStyle={{fontSize: 14}}
			/>
		</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		thana: state.thana,
		chauki: state.chauki,
		beet: state.beet,
		stations: state.stations
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateSearchError: (error) => {
			dispatch(updateSearchError(error))
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectBeet);