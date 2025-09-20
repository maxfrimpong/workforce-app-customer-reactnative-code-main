import {
    UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_IMAGE, UPDATE_PROFILE_IMAGE_SUCCESS, UPDATE_PROFILE_IMAGE_FAIL,
    CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL,
} from './types';

const INITIAL_STATE = {
    profileData: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_PROFILE:
            return {
                ...state,
            };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                profileData: action.data
            };
        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
            };

        case UPDATE_PROFILE_IMAGE:
            return {
                ...state,
            };
        case UPDATE_PROFILE_IMAGE_SUCCESS:
            return {
                ...state,
            };
        case UPDATE_PROFILE_IMAGE_FAIL:
            return {
                ...state,
            };

        case CHANGE_PASSWORD:
            return {
                ...state,
            };
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
            };
        case CHANGE_PASSWORD_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
};
