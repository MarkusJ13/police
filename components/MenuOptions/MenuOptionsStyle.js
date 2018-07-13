import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

var Style = StyleSheet.create({
    rootContainer: {
        position: 'absolute',
        top: 0,
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        height: '100%',
        width: '100%'
    },

    optionsContainer: {
        display: 'flex',
        alignSelf: 'flex-end',
        backgroundColor: '#ffffff',
        top: getStatusBarHeight() + 3,//make this function of config
        width: '52%',
        marginRight: 3
    },

    optionButton: {
        padding: 15
    },

    optionText: {

    }
});

export default Style;