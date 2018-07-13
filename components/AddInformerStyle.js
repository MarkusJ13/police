import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: "#ffffff"
    },

    formHeader: {
    	marginTop: 10,
        marginLeft: 20,
        marginRight: 20
    },

    formHeaderText: {
    	marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },

    formEntryText: {
        fontSize: 16,
        paddingBottom: 5,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dadada'
    },
});

export default Style;