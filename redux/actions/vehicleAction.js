import {default as axios} from '../../configs/axios.js';
import swal from 'sweetalert';

export const getPopularVehicle = async (dispatch) => {
  try {
    const {data} = await axios.get('vehicle/4/popular');
    const popularVehicles = data.data;
    dispatch({type: 'getPopularVehicles', payload: popularVehicles});
  } catch (err) {
    dispatch({type: 'getPopularVehicles', payload: []});
  }
};

export const addVehicle = (data, push) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append('location_id', data.location_id);
    formData.append('type_id', data.type_id);
    formData.append('vehicle_name', data.vehicle_name);
    formData.append('price', data.price);
    formData.append('status', data.status);
    formData.append('stock', data.stock);
    formData.append('description', data.description);
    formData.append('vehicle_img', data.vehicle_img);
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    await axios.post(`${process.env.APP_SERVER}/vehicle/`, formData)
    push('/vehicles')
  } catch (err) {
    if (err.response.data.error.error.length < 1) {
      swal('Error', err.response.data.error.message, 'error');
    } else {
      swal('Error', err.response.data.error.error[0].msg, 'error');
    }
  }
};
