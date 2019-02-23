import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
        height: '100%'
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

    infoContainer: {
        flex: 4,//make it 3
        paddingLeft: 10,
        paddingTop: 5
    },

    resultItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 5,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        // borderBottom: '1px solid #000000'
    },

    iconContainerGreen: {
        flex: 1,
        paddingTop: 8,
        // backgroundColor: '#5B965B',
        borderRadius: 5
    },

    searchListText1: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    searchListText2: {
        fontSize: 14
    },

    searchListText3: {
        fontSize: 14
    }
});

export default Style;