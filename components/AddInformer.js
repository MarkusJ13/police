import React from 'react';
import { Text, ScrollView, View, TextInput, TouchableHighlight, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import Dropdown from './dropdown/index.js';//react-native-material-dropdown';
import MenuOptions from './MenuOptions/MenuOptions.js';
import Style from './AddInformerStyle.js';
import { TextField } from 'react-native-material-textfield';
import ModalFilterPicker from 'react-native-modal-filter-picker';

class ShowOption extends React.Component {
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

class HeaderView extends React.Component {
	render() {
		return (
			<View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
				<Text style={{ fontSize: 22, color: '#fff', width: '70%', textAlign: 'center'}}>Add Informer</Text>
			</View>
		);
	}
}

export default class AddInformer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showMenu: false,
			name: "",
			phone: "",
			thana: "",
			chauki: "",
			halka: "",
			beet: "",
			msg: "",
			msgColor: '#2dcc8d',
			selectThana: false,
			selectChauki: false,
			selectHalka: false,
			selectBeet: false
		}
	}

	selectThana = () => {
		this.setState({selectThana: !this.state.selectThana})
	}

	selectChauki = () => {
		if(this.state.thana){
			this.setState({selectChauki: !this.state.selectChauki})
		}else{
			this.setState({msg: "Please choose thana", msgColor: '#cc2d8d'})
		}
	}

	selectHalka = () => {
		if(this.state.thana && this.state.chauki){
			this.setState({selectHalka: !this.state.selectHalka})
		}
		else if(!this.state.thana){
			this.setState({msg: "Please choose thana", msgColor: '#cc2d8d'})
		}
		else{
			this.setState({msg: "Please choose chauki", msgColor: '#cc2d8d'})
		}
	}

	selectBeet = () => {
		if(this.state.thana && this.state.chauki && this.state.halka){
			this.setState({selectBeet: !this.state.selectBeet})
		}else if(!this.state.thana){
			this.setState({msg: "Please choose thana", msgColor: '#cc2d8d'})
		}
		else if(!this.state.chauki){
			this.setState({msg: "Please choose chauki", msgColor: '#cc2d8d'})
		}
		else{
			this.setState({msg: "Please choose halka", msgColor: '#cc2d8d'})
		}
	}

	toggleMenu = (state) => {
		this.setState({ showMenu: state })
	}

	handleName = (name) => {
		this.setState({name: name, msg: "", msgColor: '#2dcc8d'})
	}

	handlePhone = (phone) => {
		this.setState({phone: phone, msg: "", msgColor: '#2dcc8d'})
	}

	handleThana = (thana) => {
		this.setState({thana: thana,
			msg: "",
			msgColor: '#2dcc8d',
			selectThana: false,
			chauki: "",
			halka: "",
			beet: ""
		})
	}

	handleChauki = (chauki) => {
		this.setState({chauki: chauki,
			msg: "",
			msgColor: '#2dcc8d',
			selectChauki: false,
			halka: "",
			beet: ""
		})
	}

	handleHalka = (halka) => {
		this.setState({halka: halka,
			msg: "",
			msgColor: '#2dcc8d',
			selectHalka: false,
			beet: ""
		})
	}

	handleBeet = (beet) => {
		this.setState({beet: beet,
			msg: "",
			msgColor: '#2dcc8d',
			selectBeet: false
		})
	}

	addInformer = () => {
		let {name, phone, thana, chauki, halka, beet} = this.state
		if(name && phone && chauki && halka && beet){
			this.setState({name: "", phone: "", thana: "", chauki: "", halka: "", beet: "", msg: "Added", msgColor: '#2dcc8d'})
		}
		else if(!name){
			this.setState({msg: "Please add name", msgColor: '#cc2d8d'})
		}
		else if(!phone){
			this.setState({msg: "Please add phone number", msgColor: '#cc2d8d'})
		}
		else if(!thana){
			this.setState({msg: "Please select thana", msgColor: '#cc2d8d'})
		}
		else if(!chauki){
			this.setState({msg: "Please select chauki", msgColor: '#cc2d8d'})
		}
		else if(!halka){
			this.setState({msg: "Please select halka", msgColor: '#cc2d8d'})
		}
		else if(!beet){
			this.setState({msg: "Please select beet", msgColor: '#cc2d8d'})
		}
	}

	render() {//log out on going back 
		console.log("check state", this.state.thana, this.state.chuki, this.state.halka)

		let Thana = [{key: 'Thana 1', label: 'Thana 1'}, {key: 'Thana 2', label: 'Thana 2'}]

		let Chauki = {
			'Thana 1': [{key: 'Chauki 1 (T1)', label: 'Chauki 1 (T1)'}, {key: 'Chauki 2 (T1)', label: 'Chauki 2 (T1)'}],
			'Thana 2': [{key: 'Chauki 1 (T2)', label: 'Chauki 1 (T2)'}, {key: 'Chauki 2 (T2)', label: 'Chauki 2 (T2)'}, {key: 'Chauki 3 (T2)', label: 'Chauki 3 (T2)'}]
		}

		Chauki = this.state.thana?Chauki[this.state.thana]:[]
		console.log("check chauki", Chauki)
		let Halka = {
			'Chauki 1 (T1)': [{key: 'Halka 1 (C1 T1)', label: 'Halka 1 (C1 T1)'}],
			'Chauki 2 (T1)': [{key: 'Halka 1 (C2 T1)', label: 'Halka 1 (C2 T1)'}, {key: 'Halka 2 (C2 T1)', label: 'Halka 2 (C2 T1)'}],
			'Chauki 1 (T2)': [{key: 'Halka 1 (C1 T2)', label: 'Halka 1 (C1 T2)'}, {key: 'Halka 2 (C1 T2)', label: 'Halka 2 (C1 T2)'}],
			'Chauki 2 (T2)': [{key: 'Halka 1 (C2 T2)', label: 'Halka 1 (C2 T2)'}],
			'Chauki 3 (T2)': [{key: 'Halka 1 (C3 T2)', label: 'Halka 1 (C3 T2)'}, {key: 'Halka 2 (C3 T2)', label: 'Halka 2 (C3 T2)'}]
		}

		Halka = this.state.chauki?Halka[this.state.chauki]:[]

		let Beet = {
			'Halka 1 (C1 T1)': [{key: 'Beet 1 (H1 C1 T1)', label: 'Beet 1 (H1 C1 T1)'}],
			'Halka 1 (C2 T1)': [{key: 'Beet 1 (H1 C2 T1)', label: 'Beet 1 (H1 C2 T1)'}],
			'Halka 2 (C2 T1)': [{key: 'Beet 1 (H2 C2 T2)', label: 'Beet 1 (H2 C2 T2)'}, {key: 'Beet 2 (H2 C2 T2)', label: 'Beet 2 (H2 C2 T2)'}],
			'Halka 1 (C1 T2)': [{key: 'Beet 1 (H1 C1 T2)', label: 'Beet 1 (H1 C1 T2)'}],
			'Halka 2 (C1 T2)': [{key: 'Beet 1 (H2 C1 T2)', label: 'Beet 1 (H2 C1 T2)'}],
			'Halka 1 (C2 T2)': [{key: 'Beet 1 (H1 C2 T2)', label: 'Beet 1 (H1 C2 T2)'}, {key: 'Beet 2 (H2 C2 T2)', label: 'Beet 2 (H2 C2 T2)'}],
			'Halka 1 (C3 T2)': [{key: 'Beet 1 (H1 C3 T2)', label: 'Beet 1 (H1 C3 T2)'}],
			'Halka 2 (C3 T2)': [{key: 'Beet 1 (H2 C3 T2)', label: 'Beet 1 (H2 C3 T2)'}, {key: 'Beet 2 (H2 C3 T2)', label: 'Beet 2 (H2 C3 T2)'}]
		}

		Beet = this.state.halka?Beet[this.state.halka]:[]

		return (//TextInput for stock changes to View + Text on selecting a stock
			<KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
			<ScrollView keyboardShouldPersistTaps="always">
				<Header
					centerComponent={<HeaderView />}
					rightComponent={<ShowOption toggleMenu={this.toggleMenu}/>}
					outerContainerStyles={{borderBottomWidth: 0, height: 85, backgroundColor: "#ff0f0f"}}
				/>
				
				<ScrollView style={Style.formHeader} keyboardShouldPersistTaps="always">
					
					<TextField
						label='Name'
						value={this.state.name}
						editable={true}
						onChangeText={this.handleName}
					/>
					<TextField
						label='Phone number'
						value={this.state.phone}
						editable={true}
						keyboardType = 'numeric'
						onChangeText={this.handlePhone}
					/>
					<Text style={Style.formHeaderText}>Select Address</Text>
					<TouchableOpacity onPress={this.selectThana}>
						<TextField
							label='Thana'
							value={this.state.thana}
							editable={false}
						/>
					</TouchableOpacity>
					<ModalFilterPicker
			          visible={this.state.selectThana}
			          onSelect={this.handleThana}
			          onCancel={this.selectThana}
			          options={Thana}
			        />
			        <TouchableOpacity onPress={this.selectChauki}>
						<TextField
							label='Chauki'
							value={this.state.chauki}
							editable={false}
						/>
					</TouchableOpacity>
					<ModalFilterPicker
			          visible={this.state.selectChauki}
			          onSelect={this.handleChauki}
			          onCancel={this.selectChauki}
			          options={Chauki}
			        />
			        <TouchableOpacity onPress={this.selectHalka}>
						<TextField
							label='Halka'
							value={this.state.halka}
							editable={false}
						/>
					</TouchableOpacity>
					<ModalFilterPicker
			          visible={this.state.selectHalka}
			          onSelect={this.handleHalka}
			          onCancel={this.selectHalka}
			          options={Halka}
			        />
			        <TouchableOpacity onPress={this.selectBeet}>
						<TextField
							label='Beet'
							value={this.state.beet}
							editable={false}
						/>
					</TouchableOpacity>
					<ModalFilterPicker
			          visible={this.state.selectBeet}
			          onSelect={this.handleBeet}
			          onCancel={this.selectBeet}
			          options={Beet}
			        />

					<View style={{}}>
						<Button
							title='ADD'
							backgroundColor='#ff0f0f'
							onPress={this.addInformer}
						/>
						{this.state.msg?<Text style={{color: this.state.msgColor, textAlign: 'center'}}>{this.state.msg}</Text>:null}
					</View>
				</ScrollView>
				{this.state.showMenu?<MenuOptions toggleMenu={this.toggleMenu} updateLogout={this.props.updateLogout}/>:null}
      		</ScrollView>
      		</KeyboardAvoidingView>
		);
	}
}