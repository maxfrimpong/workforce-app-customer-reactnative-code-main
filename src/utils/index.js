import screenName from './constants/screenName'
import { colors } from "./colors";
import { fonts } from "./fonts";
import { images } from "./images";
import { validation } from './validation'
import apiConfig, { apiFailure, apiSuccess } from './constants/apiConfig';
import {
    convertToFormData, customAlert, errorToast, getCurrentLocation, hideLoader, makeURL, myDeviceHeight, myDeviceWidth, notificationToast,
    showLoader, successToast
} from './genricUtils';
import { createReducer } from './reducerUtils';
import { socketConfig } from './constants/socketConfig';
import socketServices from './socket';

export {
    screenName,
    colors,
    fonts,
    images,
    validation,
    apiConfig,
    apiSuccess,
    apiFailure,
    successToast,
    errorToast,
    convertToFormData,
    notificationToast,
    makeURL,
    hideLoader,
    showLoader,
    createReducer,
    getCurrentLocation,
    myDeviceHeight,
    myDeviceWidth,
    socketConfig,
    socketServices,
    customAlert,

}


