import {
	SET_MAIN_SCREEN_WORK_SCHEDULE,
	SET_MAIN_SCREEN_DRIVER_HOURLY_PAY,
	SET_MAIN_SCREEN_DRIVER_WEEKLY_PAY,
	SET_MAIN_SCREEN_DRIVER_MONTHLY_PAY,
	SET_MAIN_SCREEN_DRIVER_KM_PAY,
	SET_MAIN_SCREEN_DRIVER_TRIP_PAY,
	SET_MAIN_SCREEN_EXPERIENCE,
	SET_MAIN_SCREEN_DRIVER_VEHICLE_PREFERENCE,
	SET_MAIN_SCREEN_OWNER_VEHICLE_PREFERENCE,
	SAVE_MAIN_SCREEN_OWNER_VEHICLE_PREFERENCE,
	SAVE_MAIN_SCREEN_OWNER_DRIVER_QUALIFICATION,
	SAVE_MAIN_SCREEN_OWNER_WORK_SCHEDULE,
	SET_MAIN_SCREEN_PERSONAL_DETAILS,
	SAVE_MAIN_SCREEN_OWNER_DRIVER_PAY_SCALE,
	RESET_OWNER_JOB_POST,
	SET_OWNER_ADS_INDEX,
	SET_OWNER_DASHBOARD,
	SAVE_LEASE_FIRM_VEHICLE_DETAILS,
	SAVE_LEASE_CONTRACT_DETAILS,
	SAVE_LEASE_PAY_SCALE,SAVE_DRIVER_EXPERIENCE
} from "../actions/type";

import Store from "../store";

const initialState = {
	personalDetails: {},
	experiences: {},
	workSchedules: {},

	payScale: {
		hourlyPay: {},
		weeklyPay: {},
		monthlyPay: {},
		tripPay: {},
		kmPay: {}
	},

	lease: {
		postLeaseDummy: {},
		postLeaseFirmRequirement: {
			FirmVehicle: {
				ClientId: 8,
				Company: "HUNDAI",
				Location: "BLR",
				VehicleCount: 3,
				IsWithDriver: false,
				VehicleCategory: {
					Id: 2,
					Name: "Bus",
					VehicleType: []
				},

				VehicleType: {
					Id: 2,
					Name: "Mini"
				},

				PaymentType: {
					Id: 5,
					Name: "Trip"
				}
			},
			FirmPay: {
				VehicleType: {
					Id: 2,
					Name: "Mini"
				},

				PayType: {
					Id: 5,
					Name: "Trip"
				},
				CLientId: 8,
				Price: 342,
				night: 500
			}
		}
	},

	owner: {
		dashboard: {},
		adsIndex: 0,
		postAdsDriverDummy: {},
		postAdsDriver: {
			isVehicleDetailFilled: false,
			isDriverQualificationFilled: false,
			isWorkScheduleFilled: false,
			isPayScaleFilled: false,
			ClientId: 0,
			vehicle: {
				vehicleCategory: {
					VehicleCategoryId: 1,
					VehicleCategoryName: "Choose",
					VehicleType: [
						{
							Id: 0,
							Name: "Choose"
						}
					],
					ClientId: 7
				},
				vehicleCompany: "Vehicle Company Name",
				MFGYear: "2000",
				StatusDropDown: [
					{ value: "Available", name: true },
					{ value: "Not Available", name: false }
				],
				Status: true,
				FromDate: "2000-01-01",
				Todate: "2000-10-10",
				Location: "Bangalore",
				VehicleCount: 3,
				IsWithDriver: true,
				PaymentType: { Id: 1, Name: "Hourly" }
			},
			work: {
				ShitType: {
					Id: 1,
					Name: "Both"
				},
				JobType: {
					Id: 1,
					Name: "FullTime"
				},
				PreferDays: "SUN,MON",
				IsSun: false,
				IsMon: false,
				IsTue: false,
				ISWed: false,
				IsThu: false,
				IsFri: false,
				IsSat: false
			},
			DL: {
				LicenseType: { Id: 1, Name: "MC 50cc" },
				ExperienceYear: 0
			},
			price: {
				price: "0",
				Extra: "0",
				Night: "0",
				NightExtra: "0",
				VehicleType: {
					Id: 0,
					Name: "Choose"
				}
			}
		}
	},

	vehiclePreferences: {}
};

const intro = (state = initialState, action) => {
	switch (action.type) {
		case SET_MAIN_SCREEN_PERSONAL_DETAILS:
			return { ...state, personalDetails: action.payload };

		case SET_MAIN_SCREEN_DRIVER_VEHICLE_PREFERENCE:
			return { ...state, vehiclePreferences: action.payload };

		case SET_MAIN_SCREEN_WORK_SCHEDULE:
			return {
				...state,
				workSchedules: action.payload
			};

		case SET_MAIN_SCREEN_EXPERIENCE:
			return {
				...state,
				experiences: action.payload
			};

		case SAVE_DRIVER_EXPERIENCE:
			return {
				...state,
				experiences:{...state.experiences,license:action.payload}
			}

		case SET_MAIN_SCREEN_DRIVER_HOURLY_PAY:
			return {
				...state,
				payScale: { ...state.payScale, hourlyPay: action.payload }
			};

		case SAVE_LEASE_FIRM_VEHICLE_DETAILS:
			return {
				...state,
				lease: {
					...state.lease,
					postLeaseFirmRequirement: Object.assign(
						{},
						state.lease.postLeaseFirmRequirement,
						action.payload
					)
				}
			};

		case SAVE_LEASE_CONTRACT_DETAILS:
			const data = Object.assign({}, action.payload, {
				FirmPay: {
					...action.payload.FirmPay,
					PayType: action.payload.FirmVehicle.PaymentType
				}
			});
			return {
				...state,
				lease: {
					...state.lease,
					postLeaseFirmRequirement: Object.assign(
						{},
						state.lease.postLeaseFirmRequirement,
						data
					)
				}
			};

		case SAVE_LEASE_PAY_SCALE:
			return {
				...state,
				lease: {
					...state.lease,
					postLeaseFirmRequirement: {
						...state.lease.postLeaseFirmRequirement,
						FirmPay: action.payload
					}
				}
			};

		case SET_MAIN_SCREEN_DRIVER_KM_PAY:
			return {
				...state,
				payScale: { ...state.payScale, kmPay: action.payload }
			};

		case SET_MAIN_SCREEN_DRIVER_MONTHLY_PAY:
			const noOfHolidaysInMonth = [
				{ id: 0, No: 0, Name: "0 Day" },
				{ id: 1, No: 1, Name: "1 Day" },
				{ id: 2, No: 2, Name: "2 Days" },
				{ id: 3, No: 3, Name: "3 Days" },
				{ id: 4, No: 4, Name: "4 Days" },
				{ id: 5, No: 5, Name: "5 Days" },
				{ id: 6, No: 6, Name: "6 Days" },
				{ id: 7, No: 7, Name: "7 Days" },
				{ id: 8, No: 8, Name: "8 Days" },
				{ id: 9, No: 9, Name: "9 Days" },
				{ id: 10, No: 10, Name: "10 Days" },
				{ id: 11, No: 11, Name: "11 Days" },
				{ id: 12, No: 12, Name: "12 Days" },
				{ id: 13, No: 13, Name: "13 Days" },
				{ id: 14, No: 14, Name: "14 Days" },
				{ id: 15, No: 15, Name: "15 Days" },
				{ id: 16, No: 16, Name: "16 Days" },
				{ id: 17, No: 17, Name: "17 Days" },
				{ id: 18, No: 18, Name: "18 Days" },
				{ id: 19, No: 19, Name: "19 Days" },
				{ id: 20, No: 20, Name: "20 Days" },
				{ id: 21, No: 21, Name: "21 Days" },
				{ id: 22, No: 22, Name: "22 Days" },
				{ id: 23, No: 23, Name: "23 Days" },
				{ id: 24, No: 24, Name: "24 Days" },
				{ id: 25, No: 25, Name: "25 Days" },
				{ id: 26, No: 26, Name: "26 Days" },
				{ id: 27, No: 27, Name: "27 Days" },
				{ id: 28, No: 28, Name: "28 Days" }
			];
			return {
				...state,
				payScale: {
					...state.payScale,
					monthlyPay: Object.assign({}, action.payload, {
						Holiday: noOfHolidaysInMonth
					})
				}
			};

		case SET_MAIN_SCREEN_DRIVER_TRIP_PAY:
			return {
				...state,
				payScale: { ...state.payScale, tripPay: action.payload }
			};

		case SET_MAIN_SCREEN_DRIVER_WEEKLY_PAY:
			const noOfHolidays = [
				{ id: 0, No: 0, Name: "0 Day" },
				{ id: 1, No: 1, Name: "1 Day" },
				{ id: 2, No: 2, Name: "2 Days" },
				{ id: 3, No: 3, Name: "3 Days" },
				{ id: 4, No: 4, Name: "4 Days" },
				{ id: 5, No: 5, Name: "5 Days" },
				{ id: 6, No: 6, Name: "6 Days" }
			];
			return {
				...state,
				payScale: {
					...state.payScale,
					weeklyPay: Object.assign({}, action.payload, {
						Holiday: noOfHolidays
					})
				}
			};

		/*============================ Owner ================================*/
		case SET_MAIN_SCREEN_OWNER_VEHICLE_PREFERENCE:
			return {
				...state,
				owner: { ...state.owner, postAdsDriverDummy: action.payload },
				lease: {
					...state.lease,
					postLeaseDummy: action.payload,
					postLeaseFirmRequirement: {
						...state.lease.postLeaseFirmRequirement,
						FirmVehicle: {
							...state.lease.postLeaseFirmRequirement.FirmVehicle,
							VehicleCategory: Object.assign(
								{},
								{
									Id:
										action.payload.vehicleCategories[0]
											.VehicleCategoryId,
									Name:
										action.payload.vehicleCategories[0]
											.VehicleCategoryName,
									VehicleType:
										action.payload.vehicleCategories[0]
											.VehicleType
								}
							)
						}
					}
				}
			};

		case RESET_OWNER_JOB_POST:
			return {
				...state,
				owner: {
					...state.owner,
					postAdsDriver: { ...initialState.owner.postAdsDriver }
				}
			};

		case SAVE_MAIN_SCREEN_OWNER_VEHICLE_PREFERENCE:
			return {
				...state,
				owner: {
					...state.owner,

					postAdsDriver: {
						...state.owner.postAdsDriver,
						...action.payload,
						isVehicleDetailFilled: true
					}
				}
			};

		case SAVE_MAIN_SCREEN_OWNER_DRIVER_PAY_SCALE:
			return {
				...state,
				owner: {
					...state.owner,
					postAdsDriver: {
						...state.owner.postAdsDriver,
						...action.payload,
						isPayScaleFilled: true
					}
				}
			};

		case SAVE_MAIN_SCREEN_OWNER_DRIVER_QUALIFICATION:
			return {
				...state,
				owner: {
					...state.owner,
					postAdsDriver: {
						...state.owner.postAdsDriver,
						...action.payload,
						isDriverQualificationFilled: true
					}
				}
			};

		case SAVE_MAIN_SCREEN_OWNER_WORK_SCHEDULE:
			return {
				...state,
				owner: {
					...state.owner,
					postAdsDriver: {
						...state.owner.postAdsDriver,
						...action.payload,
						isWorkScheduleFilled: true
					}
				}
			};

		case SET_OWNER_ADS_INDEX:
			return {
				...state,
				owner: { ...state.owner, adsIndex: action.payload }
			};

		default:
			return state;
	}
};

export default intro;
