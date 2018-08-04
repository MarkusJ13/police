import React from 'react';
import {connect} from 'react-redux'
import { Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Button, CheckBox, Icon } from 'react-native-elements';
import Style from './MenuOptionsStyle.js';

import {updateBadge, updatePhone} from '../AllAction.js';

class MenuOptions extends React.PureComponent {
	constructor(props) {
        super(props);
    }

    logout = () => {//sync
    	this.props.updateBadge('')
    	this.props.updatePhone('')
    	this.props.navigation.popToTop()
    }

	render() {
		let {showMenu} = this.props
		let menuComponent = showMenu?<View style={Style.rootContainer}>
				<TouchableWithoutFeedback
					style={{backgroundColor: "#fff000"}}
					onPress={function(){this.props.toggleMenu(false)}.bind(this)}
				>
					<View style={{height: '100%'}}>
						<View style={Style.optionsContainer}>
							<TouchableOpacity
								style={Style.optionButton}
								onPress={this.logout}
							>
								<Text style={Style.optionText}>Logout</Text>
							</TouchableOpacity>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</View>:null
		return (
			menuComponent
		);
	}
}

const mapStateToProps = (state) => {
	return {
		showMenu: state.showMenu,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateBadge: (badge) => {
			dispatch(updateBadge(badge))
		},
		updatePhone: (phone) => {
			dispatch(updatePhone(phone))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuOptions);