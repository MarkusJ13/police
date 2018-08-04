import React from 'react';
import {connect} from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import { TextField } from 'react-native-material-textfield';
import {updateSearchError, updateThana, updateChauki, updateBeet} from './AllAction.js';

class SelectChauki extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectChauki: false
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		if(nextProps.chauki !== this.props.chauki) return true
		else if(nextProps.stations !== this.props.stations) return true
		else if(nextState !== this.state) return true
		else if(nextProps.thana !== this.props.thana && nextProps.chauki) return true
		else return false
	}

	handleChauki = (chauki) => {//dont update if value is same as prev value
		this.props.updateSearchError({msg: '', msgColor: '#000000'})
		this.props.updateThana(chauki.thana)
		this.props.updateChauki(chauki.chauki)
		this.props.updateBeet('')
		this.setState({ selectChauki: false })
	}

	selectChauki = () => {
		this.setState({selectChauki: !this.state.selectChauki})
	}

	getChauki = () => {
		let {stations} = this.props
		let Chauki = []
		for(key1 in stations){
			if(stations[key1].child){
				for(key2 in stations[key1].child){
					Chauki.push({key: {thana: key1, chauki: key2}, label: stations[key1].child[key2].name + " (" + stations[key1].name + ")"})
				}
			}
		}
		return Chauki
	}

	render() {
		let Chauki = this.getChauki()
		let {stations, thana, chauki} = this.props
		let chaukiName = stations[thana] && stations[thana].child[chauki]?stations[thana].child[chauki].name:''
		return (
		<View>
			<TouchableOpacity onPress={this.selectChauki}>
				<TextField
					label='Chauki'
					value={chaukiName}
					editable={false}
					/>
			</TouchableOpacity>
			<ModalFilterPicker
				visible={this.state.selectChauki}
				onSelect={this.handleChauki}
				onCancel={this.selectChauki}
				options={Chauki}
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectChauki);