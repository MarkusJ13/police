import React from 'react';
import { Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Button, CheckBox, Icon } from 'react-native-elements';

import Style from './MenuOptionsStyle.js';

export default class MenuOptions extends React.Component {
	constructor(props) {
        super(props);
    }

	render() {
		return (
			<View style={Style.rootContainer}>
				<TouchableWithoutFeedback
					style={{backgroundColor: "#fff000"}}
					onPress={function(){this.props.toggleMenu(false)}.bind(this)}
				>
					<View style={{height: '100%'}}>
						<View style={Style.optionsContainer}>
							<TouchableOpacity
								style={Style.optionButton}
								onPress={this.props.updateLogout}
							>
								<Text style={Style.optionText}>Logout</Text>
							</TouchableOpacity>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</View>
		);
	}
}