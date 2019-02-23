import React from 'react';
import {connect} from 'react-redux';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { TabView, TabBar } from 'react-native-tab-view';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { updateMenu, updateStations } from './AllAction.js';
import AddInformer from './AddInformer.js';
import QueryInformer from './QueryInformer.js';
import MenuOptions from './MenuOptions/MenuOptions.js';
import firebase from 'firebase';
import 'firebase/database';

const statusBarHeight = getStatusBarHeight()

const initialLayout = {
	height: 0,
	width: Dimensions.get('window').width,
};

class ShowOption extends React.PureComponent {
	render() {
		return (
			<TouchableOpacity
				style={{display: 'flex', justifyContent: 'center', height: '100%', paddingLeft: 10, paddingRight: 20}}
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
			<View
				style={{display: 'flex', justifyContent: 'center', height: '100%'}}
			>
				<Text style={{ fontSize: 22, color: '#fff', textAlign: 'center'}}>Informer App</Text>
			
			</View>
		);
	}
}

class Tabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0
		}
		let stationsDb = firebase.database().ref().child('stations')
		this.stationsDb = stationsDb
	}

	componentWillMount(){
		let self = this
		this.stationsDb.on("value", function(snapshot) {
			let stations = snapshot.val() 
			self.props.updateStations(stations)
		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
	}

	toggleMenu = (state) => {
		this.props.updateMenu(state)
	}

	_handleIndexChange = index => {
		this.setState({index})
	}

	_renderScene = ({ route }) => {
		switch (route.key) {
			case 'first':
				return <AddInformer />
			case 'second':
				return <QueryInformer navigation={this.props.navigation}/>
			default:
				return null;
		}
	}

	_renderTabBar= props => {
		return <TabBar
			{...props}
			style={{ backgroundColor: "#ff0f0f" }}
		/>
	}

	render() {
		let {index} = this.state
		const routes = {
			index: index,
			routes: [
				{ key: 'first', title: 'Add Informer', style: {color: "#000000"} },//is color required?
				{ key: 'second', title: 'Search Informer' }
			]
		}
		return (
			<View style={{flex: 1}}>
				<Header
					centerComponent={<HeaderView/>}
					rightComponent={<ShowOption toggleMenu={this.toggleMenu}/>}
					outerContainerStyles={{borderBottomWidth: 0, height: 75, backgroundColor: "#ff0f0f", paddingBottom: 0, paddingTop: statusBarHeight}}
				/>
				<TabView
					style={{flex: 1}}
					navigationState={routes}
					renderScene={this._renderScene}
					onIndexChange={this._handleIndexChange}
					initialLayout={initialLayout}
					renderTabBar={this._renderTabBar}
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
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateMenu: (menu) => {
			dispatch(updateMenu(menu))
		},
		updateStations: (stations) => {
			dispatch(updateStations(stations))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);