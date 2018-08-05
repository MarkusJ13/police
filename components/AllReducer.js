const AllReducer = (state = {
	badge: '',
	phone: '',
	searchError: {msg: '', msgColor: '#000000'},
	showMenu: false,
	thana: '',
	chauki: '',
	beet: '',
	stations: {},
	informerName: '',
	informerPhone: '',
	session: ''
},action) => {
	switch (action.type) {
		case "UPDATE_SEARCH_ERROR":
			return Object.assign({}, state, {searchError: action.error});

		case "UPDATE_MENU":
			return Object.assign({}, state, {showMenu: action.menu});

		case "UPDATE_THANA":
			return Object.assign({}, state, {thana: action.thana});

		case "UPDATE_CHAUKI":
			return Object.assign({}, state, {chauki: action.chauki});

		case "UPDATE_BEET":
			return Object.assign({}, state, {beet: action.beet});

		case "UPDATE_STATIONS":
			return Object.assign({}, state, {stations: action.stations});

		case "UPDATE_BADGE":
			return Object.assign({}, state, {badge: action.badge});

		case "UPDATE_PHONE":
			return Object.assign({}, state, {phone: action.phone});

		case "UPDATE_INFORMER_NAME":
			return Object.assign({}, state, {informerName: action.name});

		case "UPDATE_INFORMER_PHONE":
			return Object.assign({}, state, {informerPhone: action.phone});

		case "UPDATE_SESSION":
			return Object.assign({}, state, {session: action.session});

		default:
			return state;
	}
};

export default AllReducer;