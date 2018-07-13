import React from 'react';
import { Text, View, TextInput, TouchableHighlight, TouchableOpacity} from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import MenuOptions from './MenuOptions/MenuOptions.js';
import Style from './AddInformerStyle.js';

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
			beat: "",
			added: false
		}
	}

	toggleMenu = (state) => {
		this.setState({ showMenu: state })
	}

	handleName = (name) => {
		this.setState({name: name, added: false})
	}

	handlePhone = (phone) => {
		this.setState({phone: phone, added: false})
	}

	handleThana = (thana) => {
		this.setState({thana: thana, added: false})
	}

	handleChauki = (chauki) => {
		this.setState({chauki: chauki, added: false})
	}

	handleHalka = (halka) => {
		this.setState({halka: halka, added: false})
	}

	handleBeat = (beat) => {
		this.setState({beat: beat, added: false})
	}

	addInformer = () => {
		this.setState({name: "", phone: "", thana: "", chauki: "", halka: "", beat: "", added: true})
	}

	render() {//log out on going back 
		let data = [
			{
				value: 'Banana',
			},
			{
				value: 'Mango',
			},
			{
				value: 'Pear',
			}
		];

		let Thana = [{value: 'Thana 1'}, {value: 'Thana 2'}]

		let Chauki = {
			'Thana 1': [{value: 'Chauki 1 (T1)'}, {value: 'Chauki 2 (T1)'}],
			'Thana 2': [{value: 'Chauki 1 (T2)'}, {value: 'Chauki 2 (T2)'}, {value: 'Chauki 3 (T2)'}]
		}

		let Halka = {
			'Chauki 1 (T1)': [{value: 'Halka 1 (C1 T1)'}],
			'Chauki 2 (T1)': [{value: 'Halka 1 (C2 T1)'}, {value: 'Halka 2 (C2 T1)'}],
			'Chauki 1 (T2)': [{value: 'Halka 1 (C1 T2)'}, {value: 'Halka 2 (C1 T2)'}],
			'Chauki 2 (T2)': [{value: 'Halka 1 (C2 T2)'}],
			'Chauki 3 (T2)': [{value: 'Halka 1 (C3 T2)'}, {value: 'Halka 2 (C3 T2)'}]
		}

		let Beat = {
			'Halka 1 (C1 T1)': [{value: 'Beat 1 (H1 C1 T1)'}],
			'Halka 1 (C2 T1)': [{value: 'Beat 1 (H1 C2 T1)'}],
			'Halka 2 (C2 T1)': [{value: 'Beat 1 (H2 C2 T2)'}, {value: 'Beat 2 (H2 C2 T2)'}],
			'Halka 1 (C1 T2)': [{value: 'Beat 1 (H1 C1 T2)'}],
			'Halka 2 (C1 T2)': [{value: 'Beat 1 (H2 C1 T2)'}],
			'Halka 1 (C2 T2)': [{value: 'Beat 1 (H1 C2 T2)'}, {value: 'Beat 2 (H2 C2 T2)'}],
			'Halka 1 (C3 T2)': [{value: 'Beat 1 (H1 C3 T2)'}],
			'Halka 2 (C3 T2)': [{value: 'Beat 1 (H2 C3 T2)'}, {value: 'Beat 2 (H2 C3 T2)'}]
		}

		return (//TextInput for stock changes to View + Text on selecting a stock
			<View style={Style.rootContainer}>
				<Header
					centerComponent={<HeaderView />}
					rightComponent={<ShowOption toggleMenu={this.toggleMenu}/>}
					outerContainerStyles={{borderBottomWidth: 0, height: 85, backgroundColor: "#ff0f0f"}}
				/>
				<View style={Style.formHeader}>
					<Text style={Style.formHeaderText}>Name</Text>
					<View>
						<TextInput
							style={Style.formEntryText}
							value={this.state.name}
							onChangeText={this.handleName}
						/>
					</View>
					<Text style={Style.formHeaderText}>Phone number</Text>
					<View>
						<TextInput
							style={Style.formEntryText}
							value={this.state.phone}
							keyboardType = 'numeric'
							onChangeText={this.handlePhone}
						/>
					</View>
					<Text style={Style.formHeaderText}>Select Address</Text>

					<Dropdown
						label='Thana'
						data={Thana}
						value={this.state.thana}
						onChangeText={this.handleThana}
					/>
					<Dropdown
						label='Chawki'
						data={this.state.thana?Chauki[this.state.thana]:[]}
						value={this.state.chauki}
						onChangeText={this.handleChauki}
					/>
					<Dropdown
						label='Halka'
						data={this.state.chauki?Halka[this.state.chauki]:[]}
						value={this.state.halka}
						onChangeText={this.handleHalka}
					/>
					<Dropdown
						label='Beat'
						data={this.state.halka?Beat[this.state.halka]:[]}
						value={this.state.beat}
						onChangeText={this.handleBeat}
					/>

					<View style={{top: 10}}>
						<Button
							title='ADD'
							backgroundColor='#ff0f0f'
							onPress={this.addInformer}
						/>
						{this.state.added?<Text style={{color: '#2dcc8d', textAlign: 'center'}}>Added</Text>:null}
					</View>


				</View>
				{this.state.showMenu?<MenuOptions toggleMenu={this.toggleMenu} updateLogout={this.props.updateLogout}/>:null}
			</View>
		);
	}
}