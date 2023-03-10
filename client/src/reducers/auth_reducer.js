import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
} from '../actions/types';

export default function(state={}, action) {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, error: '', authenticated: true, auth_type: action.payload }
        case UNAUTH_USER:
            return { ...state, authenticated: false, auth_type:null }
        case AUTH_ERROR:
            return { ...state, error: action.payload }
        default:
            return state
    }
}