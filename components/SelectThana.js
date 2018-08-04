import React from 'react';
import {connect} from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import { TextField } from 'react-native-material-textfield';
import {updateSearchError, updateThana, updateChauki, updateBeet} from './AllAction.js';

class SelectThana extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			selectThana: false
		}
	}

	handleThana = (thana) => {//dont update if value is same as prev value
		let {stations} = this.props
		this.props.updateSearchError({msg: '', msgColor: '#000000'})
		this.props.updateThana(thana)
		this.props.updateChauki('')
		this.props.updateBeet('')
		this.setState({ selectThana: false })
	}

	selectThana = () => {
		this.setState({selectThana: !this.state.selectThana})
	}

	getThana = () => {
		let {stations} = this.props
		let Thana = []
		for(key in stations){
			Thana.push({key: key, label: stations[key].name})
		}
		return Thana
	}

	render() {
		let Thana = this.getThana()
		let {stations, thana} = this.props
		let thanaName = stations[thana]?stations[thana].name:''
		return (
		<View>
			<TouchableOpacity onPress={this.selectThana}>
			<TextField
				label='Thana'
				value={thanaName}
				editable={false}
				/>
			</TouchableOpacity>
			<ModalFilterPicker
				visible={this.state.selectThana}
				onSelect={this.handleThana}
				onCancel={this.selectThana}
				options={Thana}
				optionTextStyle={{fontSize: 14}}
			/>
		</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		thana: state.thana,
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectThana);