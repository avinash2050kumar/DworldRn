import {
	SET_HOME_SCREEN_VISIBLE,
	SET_HOME_SCREEN_NO_OF_WORK,
	SET_DEVICE_LOCATION,
	SET_OWNER_DASHBOARD,
	SET_FILTERED_HOME_WORK_DATA,
	SET_DRIVER_JOB_OFFERS_FOR_DRIVER,
	SET_LEASE_DASHBOARD,RESET_HOME
} from "../actions/type";
import update from "immutability-helper";

const initialState={
	isHomeScreenVisible: false,
	work: {
		title: "",
		type: "",
		data: [
			{ type: "", number: 0 },
			{ type: "", number: 0 },
			{ type: "", number: 0 },
			{ type: "", number: 0 },
			{ type: "", number: 0 },
			{ type: "", number: 0 }
		],
		location: {},
		address: {}
	},
	ownerDashBoard: {},
	driverJobOffer: [],
	leaseDashBoard: []
}

const homeReducerInitialState = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case SET_LEASE_DASHBOARD:
			return { ...state, leaseDashBoard: action.payload };

		case SET_HOME_SCREEN_VISIBLE:
			return {
				...state,
				isHomeScreenVisible: action.payload
			};

		case RESET_HOME:
			return {...initialState}

		case SET_OWNER_DASHBOARD:
			return {
				...state,
				ownerDashBoard: action.payload
			};

		case SET_HOME_SCREEN_NO_OF_WORK:
			return {
				...state,
				work: {
					data: [
						{
							type: "Part Time",
							number: action.payload.PartTimeJob.length,
							dataList: action.payload.PartTimeJob,
							filteredData: action.payload.PartTimeJob
						},
						{
							type: "Full time",
							number: action.payload.FullTimeJob.length,
							dataList: action.payload.FullTimeJob,
							filteredData: action.payload.FullTimeJob
						}
					]
				}
			};

		case SET_FILTERED_HOME_WORK_DATA:
			console.log('state', state)
			const { filterObj, dataIndex } = action.payload;
			let filteredData = state.work.data[dataIndex].dataList;
			//vehicleTypes
			filteredData = filteredData.filter(work =>
				filterObj.vehicleTypes.filter(
					vehicleType =>work.vehicleType === vehicleType
				).length>0
			);
			const updateFilter= update(state.work,{data:
					{[dataIndex]:{filteredData:{$set:filteredData}}}})
			return { ...state,work: updateFilter};

		case SET_DEVICE_LOCATION:
			const { location, formattedAddress } = action.payload;
			return {
				...state,
				location: location,
				address: formattedAddress
			};

		case SET_DRIVER_JOB_OFFERS_FOR_DRIVER:
			return { ...state, driverJobOffer: action.payload };

		default:
			return state;
	}
};

export default homeReducerInitialState;
