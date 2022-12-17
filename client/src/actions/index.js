import axios from 'axios';
import { 
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from './types';
const ROOT_URL = process.env.API_URI || 'http://localhost:8000';

axios.defaults.baseURL = ROOT_URL;
if (localStorage.getItem('auth_jwt_token')) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function signUserIn(data) {
    return function (dispatch) {
        // Submit email/password to server
        axios
            .post(`/signin`, data)
            .then(res => {
                dispatch({type: AUTH_USER, payload:res.data.auth_type})
                localStorage.setItem('auth_jwt_token', res.data.token);
                localStorage.setItem('auth_type', res.data.auth_type);
                if(res.data.auth_type == 'admin')
                    window.location = '/#venue';
                else if(res.data.auth_type == 'user')
                    window.location = '/';
                else if(res.data.auth_type == 'serviceprovider')
                    window.location = '/#service';
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
            })
            .catch(error => {
                console.log(error);
                if(error.response.data.error == "User Not Found")
                    alert("Login details are incorrect")
                dispatch({type: AUTH_ERROR, payload: 'Server Error, try later.'})
            });
    }
}

export function signUserUp(userObj) {
    return function (dispatch) {
        // Submit email/password to server
        axios
            .post(`/signup`, userObj)
            .then(res => {
                dispatch({type: AUTH_USER , payload:res.data.auth_type})
                localStorage.setItem('auth_jwt_token', res.data.token);
                localStorage.setItem('auth_type', res.data.auth_type);
                if(res.data.auth_type == 'admin')
                    window.location = '/#venue';
                else if(res.data.auth_type == 'user')
                    window.location = '/';
                else if(res.data.auth_type == 'serviceprovider')
                    window.location = '/#service';
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
            })
            .catch(error => {
                console.log(error);
                dispatch({type: AUTH_ERROR, payload: 'Server Error, try later.'})
                alert(error.response.data.error)
            });
    }
}

export function signUserOut() {
    return function (dispatch) {
        dispatch({type: UNAUTH_USER})
        localStorage.removeItem('auth_jwt_token');
        localStorage.removeItem('auth_type');
    }
}

export async function venueAdd( data ) {
    const resp =  axios.post("/venue", data)
    return resp
}

export async function venueEdit( data ) {
    const resp =  axios.put(`/venue/${data.venue_id}`, data)
    return resp
}

export async function venueGet( venue_id ) {
    const resp =  await axios.get(`/venue/${venue_id}`)
    return resp
}

export async function venueGetAll( ) {
    const resp =  await axios.get(`/venue/all`)
    return resp
}

export async function venueDelete(venue_id) {
    const resp =  await axios.delete(`/venue/${venue_id}`)
    return resp
}

export async function serviceGet(service_id) {
    const resp =  await axios.get(`/venue/service/${service_id}`)
    return resp
}

export async function serviceGetAll( ) {
    const resp =  await axios.get(`/venue/service/all`)
    return resp
}
export async function serviceReallyGetAll( ) {
    const resp =  await axios.get(`/venue/service/all/all`)
    return resp
}

export async function serviceAdd( data ) {
    const resp = await axios.post(`/venue/service`, data)
    return resp
}

export async function serviceDelete(service_id) {
    const resp =  await axios.delete(`/venue/service/${service_id}`)
    return resp
}

export async function serviceEdit( data ) {
    const resp = await axios.put(`/venue/service/${data.service_id}`, data)
    return resp
}

export async function eventAdd( data ) {
    const resp = await axios.post(`/event`, data)
    return resp
}


export async function eventGetAll( ) {
    const resp = await axios.get(`/event/all`)
    return resp
}

export async function eventGetUser( ) {
    const resp = await axios.get(`/event/user`)
    return resp
}
const request = axios;
export { request };