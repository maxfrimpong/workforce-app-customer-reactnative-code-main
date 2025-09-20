import {
    LOGIN_CHECK, LOGIN_CHECK_SUCCESS, LOGIN_CHECK_FAIL,
    LOGIN, LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT_REQUEST_SUCCESS,
    LOGOUT_REQUESTED,
    LOGOUT_REQUEST_FAIL,
    SOCIAL_LOGIN, SOCIAL_LOGIN_SUCCESS, SOCIAL_LOGIN_FAIL,
} from './types';

export const LoginCheckRequest = (payload) => ({
    type: LOGIN_CHECK,
    payload,
});
export const LoginCheckSuccess = data => (
    {
        type: LOGIN_CHECK_SUCCESS,
        data
    }
);
export const LoginCheckFail = () => (
    {
        type: LOGIN_CHECK_FAIL
    }
);

export const loginRequest = (data, navigation) => ({
    type: LOGIN,
    data,
    navigation,
});
export const loginSuccess = data => (
    {
        type: LOGIN_SUCCESS,
        data
    }
);
export const loginFail = () => (
    {
        type: LOGIN_FAIL
    }
);

export const logoutRequest = (authError, id, navigation) => ({
    type: LOGOUT_REQUESTED,
    authError,
    id,
    navigation,
});

export const logoutSuccess = data => ({
    type: LOGOUT_REQUEST_SUCCESS,
    data,
});
export const logoutFail = () => ({
    type: LOGOUT_REQUEST_FAIL,
});

export const socialLoginRequest = (payload, data, navigation) => ({
    type: SOCIAL_LOGIN,
    payload,
    data,
    navigation,
});
export const socialLoginSuccess = data => (
    {
        type: SOCIAL_LOGIN_SUCCESS,
        data
    }
);
export const socialLoginFail = () => (
    {
        type: SOCIAL_LOGIN_FAIL
    }
);