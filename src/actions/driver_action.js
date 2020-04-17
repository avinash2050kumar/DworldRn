import { SET_DRIVER_EARNING_VALUE, RESET_DRIVER } from "./type";

export const resetDriver = () => dispatch => {
	dispatch({ type: RESET_DRIVER });
};

export const setDriverEarning = () => async dispatch => {
	const res = {
		data: [
			{
				id: 1,
				jobName: "Job Name",
				vehicleType: "SUV",
				ownerName: "Rohan Singh",
				salary: 12000,
				joinDate: "10 Jan 2019", // or utc format
				endDate: "10 Feb 2022"
			},
			{
				id: 1,
				jobName: "Job Name 2",
				vehicleType: "Suden",
				ownerName: "Raju",
				salary: 12000,
				joinDate: "10 Jan 2019", // or utc format
				endDate: "10 Feb 2022"
			},
			{
				id: 1,
				jobName: "Job Name 3",
				vehicleType: "Nano",
				ownerName: "Punam",
				salary: 12000,
				joinDate: "10 Jan 2019", // or utc format
				endDate: "10 Feb 2022"
			},
			{
				id: 1,
				jobName: "Job Name 4",
				vehicleType: "Ritu",
				ownerName: "Rohan Singh",
				salary: 12000,
				joinDate: "10 Jan 2019", // or utc format
				endDate: "10 Feb 2022"
			},
			{
				id: 1,
				jobName: "Job Name 5",
				vehicleType: "Swati",
				ownerName: "Rohan Singh",
				salary: 12000,
				joinDate: "10 Jan 2019", // or utc format
				endDate: "10 Feb 2022"
			},
			{
				id: 1,
				jobName: "Job Name 6",
				vehicleType: "SUV",
				ownerName: "Abhishek",
				salary: 12000,
				joinDate: "10 Jan 2019", // or utc format
				endDate: "10 Feb 2022"
			},
			{
				id: 1,
				jobName: "Job Name 7",
				vehicleType: "SUV",
				ownerName: "Komal",
				salary: 12000,
				joinDate: "10 Jan 2019", // or utc format
				endDate: "10 Feb 2022"
			}
		]
	};
	dispatch({
		type: SET_DRIVER_EARNING_VALUE,
		payload: res.data
	});
};
