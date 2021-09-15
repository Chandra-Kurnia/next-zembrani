import {default as axios} from '../../configs/axios.js';
import swal from 'sweetalert';

export const userLogin = (form, push) => async (dispatch) => {
  try {
      // const user = await axios.post('http://localhost:3000/api/login', form, {withCredentials: true})
      const user = await axios.post('https://next-zembrani.vercel.app/api/login', form, {withCredentials: true})
      // console.log(user);
      dispatch({type: 'LOGIN', payload: user.data.data})
      swal('Login Success', 'Now you can explore vehicle!', 'success')
      .then(() => {
          push('/')
      })
  } catch (err) {
    console.log(err.response.data.error);
    // swal('Error', 'Login Failed, please check your info', 'error')
    if (err.response.data.error.error.length < 1) {
      swal('Error', err.response.data.error.message, 'error');
    } else {
      swal('Error', err.response.data.error.error[0].msg, 'error');
    }
  }
};

export const userLogout = (push) => async(dispatch) => {
  try{
    await axios.get(`${process.env.API_SERVER}/user/logout`)
    dispatch({type: 'LOGOUT', payload: {}})
    push('/auth/login')
  }catch(err){
    console.log(err.response);
    swal('Error', 'Logout failed', 'error')
  }
}

export const getProfile = async(dispatch) => {
  try {
    const user = await axios.get(`${process.env.API_SERVER}/user/checktoken`)
    dispatch({type: 'LOGIN', payload: user.data.data})
  } catch (err) {
    console.log(err.response);
  }
}