import {default as axios} from '../../configs/axios.js'
import swal from 'sweetalert'

export const getPopularVehicle = async(dispatch) => {
    try{
        const {data} = await axios.get('vehicle/4/popular')
        const popularVehicles = data.data
        dispatch({type: 'getPopularVehicles', payload: popularVehicles})
    }catch(err){
        dispatch({type: 'getPopularVehicles', payload: []})
    }
}