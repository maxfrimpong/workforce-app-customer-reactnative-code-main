import {
    GET_CATEGORY_LIST_START,
    GET_CATEGORY_LIST_SUCCESS,
    GET_CATEGORY_LIST_FAILURE,
    REFRESH_CATEGORY_LIST_START,
    GET_ALL_SERVICES_LIST_START,
    GET_ALL_SERVICES_LIST_SUCCESS,
    GET_ALL_SERVICES_LIST_FAILURE,
    REFRESH_ALL_SERVICES_LIST_START,
    GET_PROVIDER_LIST_START,
    GET_PROVIDER_LIST_SUCCESS,
    GET_PROVIDER_LIST_FAILURE,
    REFRESH_PROVIDER_LIST_START,
    CURRENT_LOCATION,
    POST_JOB_START,
    POST_JOB_SUCCESS,
    POST_JOB_FAILURE,
    ADMIN_DATA_START,
    ADMIN_DATA_SUCCESS,
    ADMIN_DATA_FAILURE,
    GET_REGIONS_START,
    GET_REGIONS_SUCCESS,
    GET_REGIONS_FAILURE
} from './types';

// ************** Current location ***************** //

export const currentLocation = (payload) => ({
    type: CURRENT_LOCATION,
    payload
});

// ************** Home Category ****************** //

export const getCategoryListStart = (payload) => ({
    type: GET_CATEGORY_LIST_START,
    payload
});
export const getCategoryListSuccess = payload => (
    {
        type: GET_CATEGORY_LIST_SUCCESS,
        payload
    }
);
export const getCategoryListFailure = () => (
    {
        type: GET_CATEGORY_LIST_FAILURE
    }
);

export const refreshCategoryListStart = (payload, navigation) => ({
    type: REFRESH_CATEGORY_LIST_START,
    payload,
    navigation,
});

// ************ Service list ************* //

export const getAllServicesListStart = (payload, navigation) => ({
    type: GET_ALL_SERVICES_LIST_START,
    payload,
    navigation,
});
export const getAllServicesListSuccess = payload => (
    {
        type: GET_ALL_SERVICES_LIST_SUCCESS,
        payload
    }
);
export const getAllServicesListFailure = () => (
    {
        type: GET_ALL_SERVICES_LIST_FAILURE
    }
);

export const refreshAllServicesListStart = (payload, navigation) => ({
    type: REFRESH_ALL_SERVICES_LIST_START,
    payload,
    navigation,
});

export const getProviderListStart = (payload, navigation) => ({
    type: GET_PROVIDER_LIST_START,
    payload,
    navigation,
});
export const getProviderListSuccess = payload => (
    {
        type: GET_PROVIDER_LIST_SUCCESS,
        payload
    }
);
export const getProviderListFailure = () => (
    {
        type: GET_PROVIDER_LIST_FAILURE
    }
);

export const refreshProviderListStart = (payload, navigation) => ({
    type: REFRESH_PROVIDER_LIST_START,
    payload,
    navigation,
});

export const postJobStart = (payload, navigation) => ({
    type: POST_JOB_START,
    payload,
    navigation,
});
export const postJobSuccess = payload => (
    {
        type: POST_JOB_SUCCESS,
        payload
    }
);
export const postJobFailure = () => (
    {
        type: POST_JOB_FAILURE
    }
);

export const adminDataStart = () => ({
    type: ADMIN_DATA_START,
});
export const adminDataSuccess = payload => (
    {
        type: ADMIN_DATA_SUCCESS,
        payload
    }
);
export const adminDataFailure = () => (
    {
        type: ADMIN_DATA_FAILURE
    }
);

export const getRegionsStart = () => (
    {
        type: GET_REGIONS_START,
    }
);
export const getRegionsSuccess = payload => (
    {
        type: GET_REGIONS_SUCCESS,
        payload
    }
);
export const getRegionsFailure = () => (
    {
        type: GET_REGIONS_FAILURE
    }
);