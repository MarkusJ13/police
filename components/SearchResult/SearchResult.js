import React from 'react';
import {connect} from 'react-redux';
import { Text, View, TouchableOpacity, FlatList, Image} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import SearchBar from 'react-native-searchbar';
import { Header, Icon } from 'react-native-elements';
import MenuOptions from '../MenuOptions/MenuOptions.js';
import Style from './SearchResultStyle.js';
import firebase from 'firebase';
import 'firebase/database';

import {updateMenu, updateProfile} from '../AllAction.js';

const Dimensions = require('Dimensions');
const screenWidth = Dimensions.get('window').width

const statusBarHeight = getStatusBarHeight()

class ShowOption extends React.PureComponent {
	render() {
		return (
			<View style={{display: 'flex', height: '100%', flexDirection: 'row'}}>
				<TouchableOpacity
					style={{display: 'flex', justifyContent: 'center', paddingLeft: 20, paddingRight: 10}}
					onPress={this.props.showSearchBar}
				>
					<Icon
						name='search'
						type="feather"
						color='#ffffff'
						size={16}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={{display: 'flex', justifyContent: 'center', paddingLeft: 10, paddingRight: 20}}
					onPress={function(){this.props.toggleMenu(true)}.bind(this)}
				>
					<Icon
						name='dots-three-vertical'
						type="entypo"
						color='#ffffff'
						size={16}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

class ShowMenu extends React.PureComponent {
	render() {
		return (
			<TouchableOpacity
				style={{height: '100%', display: 'flex', justifyContent: 'center', paddingLeft: 20, paddingRight: 20}}
				onPress={() => this.props.navigation.goBack()}
			>
				<Icon
					name='arrow-left'
					type="material-community"
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
			<View
				style={{display: 'flex', justifyContent: 'center', height: '100%'}}
			>
				<Text style={{ fontSize: 22, color: '#fff', textAlign: 'center'}}>Results</Text>
			
			</View>
		);
	}
}

class SearchResult extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			informers: [],
			filteredInformers: [],
			showSearchBar: false
		}
		let informersDb = firebase.database().ref().child('informers')
		this.informersDb = informersDb
	}

	componentWillMount(){
		let self = this
		this.informersDb.on("value", function(snapshot) {
			let informers = self.getInformers(snapshot.val())
			self.setState({informers: informers})
			self.setState({filteredInformers: informers})
		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
	}

	showProfile = profile => {
		this.props.updateProfile(profile)
		this.props.navigation.navigate('Profile')
	} 

	renderList(item){
		return <View>
				<View style={Style.resultItemContainer}>
				<View style={Style.iconContainerGreen}>
					{item.image_url?<Image
						style={{width: screenWidth/6, height: screenWidth/6}}
						source={{uri: item.image_url}}
					/>:<Icon
						name='user'
						type="entypo"
						color="#000000"
						size={screenWidth/6}
					/>}
				</View>
				<View style={Style.infoContainer}>
					<Text style={Style.searchListText1}>{item.name?item.name:'Name not found'}</Text>
					<Text style={Style.searchListText2}>{item.phone?item.phone:'Phone number not found'}</Text>
					<Text style={Style.searchListText3}>{item.beet?item.beet:'Beet not found'}</Text>
				</View>
				</View>
			</View>
	}

	_keyExtractor = item => item.key;

	toggleMenu = (state) => {//can be put in ShowOption
		this.props.updateMenu(state)
	}

	matchBeet = b => {
		if(!b) return false
		let{stations, thana, chauki, beet} = this.props
		if(beet && beet === b) return true
		else if(beet) return false
		if(stations && thana && chauki && stations[thana].child[chauki].child){
			for(key3 in stations[thana].child[chauki].child){
				if(key3 === b) return true
			}
			return false
		}
		if(stations && thana && stations[thana].child){
			for(key2 in stations[thana].child){
				if(stations[thana].child[key2].child){
					for(key3 in stations[thana].child[key2].child){
						if(key3 === b) return true
					}
				}
			}
			return false
		}
		return false
	}

	getInformers = (informers) => {
		let {thana, chauki, beet} = this.props
		let Informers = []
		for(key in informers){
			if(this.matchBeet(informers[key].beet)){
				Informers.push({key: key, ...informers[key]})
			}
		}
		return Informers
	}

	showSearchBar = () => {
		this.searchBar.show()
		this.setState({showSearchBar: true})
	}

	_handleResults = (results) => {
		this.setState({filteredInformers: results})
	}

	render() {//show loader while data is being fetched!
		let {informers, filteredInformers} = this.state
		return (
			<View style={Style.rootContainer}>
				<Header
					leftComponent={<ShowMenu navigation={this.props.navigation}/>}
					centerComponent={<HeaderView/>}
					rightComponent={<ShowOption toggleMenu={this.toggleMenu} showSearchBar={this.showSearchBar}/>}
					outerContainerStyles={{borderBottomWidth: 0, height: 85, backgroundColor: "#ff0f0f", paddingBottom: 0, paddingTop: statusBarHeight}}
				/>
				<View style={{position: 'absolute', top: getStatusBarHeight()}}>
					<SearchBar
						ref={(ref) => this.searchBar = ref}
						data={informers}
						handleResults={this._handleResults}
						onHide={() => {
							this.setState({filteredInformers: informers, showSearchBar: false})
						}}
						showOnLoad={false}
					/>
				</View>
				<FlatList
					data={filteredInformers}
					renderItem={({item}) => (this.renderList(item))}
					keyExtractor={this._keyExtractor}
				/>
				<MenuOptions
					toggleMenu={this.toggleMenu}
					updateLogout={this.props.updateLogout}
					navigation={this.props.navigation}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		stations: state.stations,
		thana: state.thana,
		chauki: state.chauki,
		beet: state.beet
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateMenu: (menu) => {
			dispatch(updateMenu(menu))
		},
		updateProfile: (profile) => {
			dispatch(updateProfile(profile))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);