const initialState = {
  vehicles: [],
  vehicle: [],
};

const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'getPopularVehicles':
      return {
        ...state,
        vehicles: action.payload,
      };

    default:
      return state;
  }
};

export default vehicleReducer