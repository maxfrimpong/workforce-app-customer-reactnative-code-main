import { createReducer } from '../../../utils';
import {
    ADMIN_DATA_FAILURE,
    ADMIN_DATA_START,
    ADMIN_DATA_SUCCESS,
    CURRENT_LOCATION,
    GET_ALL_SERVICES_LIST_FAILURE,
    GET_ALL_SERVICES_LIST_START,
    GET_ALL_SERVICES_LIST_SUCCESS,
    GET_CATEGORY_LIST_FAILURE,
    GET_CATEGORY_LIST_START,
    GET_CATEGORY_LIST_SUCCESS,
    GET_PROVIDER_LIST_FAILURE,
    GET_PROVIDER_LIST_START,
    GET_PROVIDER_LIST_SUCCESS,
    GET_REGIONS_FAILURE,
    GET_REGIONS_START,
    GET_REGIONS_SUCCESS,
    POST_JOB_FAILURE,
    POST_JOB_START,
    POST_JOB_SUCCESS,
    REFRESH_ALL_SERVICES_LIST_START,
    REFRESH_CATEGORY_LIST_START,
    REFRESH_PROVIDER_LIST_START
} from './types';

const initialState = {
    isRefreshing: false,
    categoryList: [],
    allServicesList: [],
    providerList: [],
    currentLocation: {},
    postJob: {},
    adminSettings: {},
    regionList: [],
    serviceSupported: true,
};


// ************* Current Location ************** //

const currentLocation = (state, data) => {
    return {
        ...state,
        currentLocation: data
    }
}

const getCategoryListStart = (state) => {
    return {
        ...state,
        categoryList: [],
        serviceSupported: true,
    }
}
const getCategoryListSuccess = (state, data) => {
    return {
        ...state,
        categoryList: data,
        isRefreshing: false,
        serviceSupported: true,
    }
}
const getCategoryListFailure = (state) => {
    return {
        ...state,
        categoryList: [],
        serviceSupported: false,
        isRefreshing: false,
    }
}

const refreshCategoryListStart = (state) => {
    return {
        ...state,
        isRefreshing: true,
    }
}

const getAllServicesListStart = (state) => {
    return {
        ...state,
        allServicesList: [],
    }
}
const getAllServicesListSuccess = (state, data) => {
    return {
        ...state,
        allServicesList: data,
        isRefreshing: false,
    }
}
const getAllServicesListFailure = (state) => {
    return {
        ...state,
        isRefreshing: false,
    }
}

const refreshAllServicesListStart = (state) => {
    return {
        ...state,
        isRefreshing: true,
    }
}

const getProviderListStart = (state) => {
    return {
        ...state,
        allServicesList: [],
    }
}
const getProviderListSuccess = (state, data) => {
    return {
        ...state,
        allServicesList: data,
        isRefreshing: false,
    }
}
const getProviderListFailure = (state) => {
    return {
        ...state,
        isRefreshing: false,
    }
}

const refreshProviderListStart = (state) => {
    return {
        ...state,
        isRefreshing: true,
    }
}

const postJobStart = (state) => {
    return {
        ...state,
        postJob: {},
    }
}
const postJobSuccess = (state, data) => {
    return {
        ...state,
        postJob: data
    }
}
const postJobFailure = (state) => {
    return {
        ...state,
    }
}

const adminDataStart = (state) => {
    return {
        ...state,
        adminSettings: {},
    }
}
const adminDataSuccess = (state, data) => {
    return {
        ...state,
        adminSettings: data
    }
}
const adminDataFailure = (state) => {
    return {
        ...state,
    }
}

const getRegionsStart = (state) => {
    return {
        ...state,
        regionList: [],
    }
}
const getRegionsSuccess = (state, data) => {
    return {
        ...state,
        regionList: data
    }
}
const getRegionsFailure = (state) => {
    return {
        ...state,
    }
}

export default createReducer(initialState, {
    [CURRENT_LOCATION]: currentLocation,

    [GET_CATEGORY_LIST_START]: getCategoryListStart,
    [GET_CATEGORY_LIST_SUCCESS]: getCategoryListSuccess,
    [GET_CATEGORY_LIST_FAILURE]: getCategoryListFailure,
    [REFRESH_CATEGORY_LIST_START]: refreshCategoryListStart,

    [GET_ALL_SERVICES_LIST_START]: getAllServicesListStart,
    [GET_ALL_SERVICES_LIST_SUCCESS]: getAllServicesListSuccess,
    [GET_ALL_SERVICES_LIST_FAILURE]: getAllServicesListFailure,
    [REFRESH_ALL_SERVICES_LIST_START]: refreshAllServicesListStart,

    [GET_PROVIDER_LIST_START]: getProviderListStart,
    [GET_PROVIDER_LIST_SUCCESS]: getProviderListSuccess,
    [GET_PROVIDER_LIST_FAILURE]: getProviderListFailure,
    [REFRESH_PROVIDER_LIST_START]: refreshProviderListStart,

    [POST_JOB_START]: postJobStart,
    [POST_JOB_SUCCESS]: postJobSuccess,
    [POST_JOB_FAILURE]: postJobFailure,

    [ADMIN_DATA_START]: adminDataStart,
    [ADMIN_DATA_SUCCESS]: adminDataSuccess,
    [ADMIN_DATA_FAILURE]: adminDataFailure,

    [GET_REGIONS_START]: getRegionsStart,
    [GET_REGIONS_SUCCESS]: getRegionsSuccess,
    [GET_REGIONS_FAILURE]: getRegionsFailure,
})
