import Geolocation from '@react-native-community/geolocation';
import { Alert, Dimensions } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { put } from 'redux-saga/effects';
import {
    hideLoading,
    showLoading
} from '../../components/customLoader/action';
import config from '../../config';
import { dispatch } from '../../store';
import { currentLocation } from '../../store/modules/home/actions';


// back-end API call function with base URL to make complete URL link

export const makeURL = (endpoint) => {
    return `INPUT_BASE_URL_HERE${endpoint}`;
}

// These toast are used to show the message to replace alert message and for in app notification tray

export const errorToast = (description, msg, position) => {
    showMessage({
        message: msg ? msg : 'Error',
        description: description ? description : 'Oops! something went wrong',
        type: 'danger',
        position: position ? position : 'bottom',
        icon: 'auto',
    });
};

export const successToast = (description, msg, position) => {
    showMessage({
        message: msg ? msg : 'Success',
        description: description ? description : '',
        type: 'success',
        position: position ? position : 'bottom',
        icon: 'auto',
    });
};

// Custom common Alert popup for events handling

export const customAlert = (
    title,
    msg,
    accept,
    reject,
    { onAccept }
) => {
    Alert.alert(
        title,
        msg,
        [
            {
                text: accept,
                onPress: () => onAccept()
            },
            {
                text: reject,
            },
        ],
        {
            cancelable: false
        }
    )
}

// Coverting object data into form data

export const convertToFormData = payload => {
    let formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value);
    });
    console.log('Converted formData', formData);
    return formData;

}

// Loading components methods

export function* hideLoader(isError, errorMessage) {
    yield put(hideLoading(isError, errorMessage));
}

export function* showLoader(silentFetch) {
    if (!silentFetch) {
        yield put(showLoading());
    }
}

// Get Current Location with address Global Function

export const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(info => {
        const { latitude, longitude } = info?.coords;
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${config.GOOGLE_MAPS_APIKEY}`)
            .then((response) => response.json())
            .then((responseJson) => {
                const newItem = {
                    name: responseJson.results[0].formatted_address,
                    location: {
                        latitude,
                        longitude
                    }
                }
                console.log('Current Location', newItem)
                dispatch(currentLocation(newItem))
            }).catch(error => { errorToast(error.message) })
    },
        e => {
            console.log('Geolocation Error', e)
            const newItem = {
                name: '',
                location: {
                    latitude: 37.78825,
                    longitude: -122.4324,
                }
            }
            console.log('false Location', newItem)
            dispatch(currentLocation(newItem))
        },
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
}

// Get Device Height in percentage with Dimensions

export const myDeviceHeight = (value) => {
    // value must be b/w 1-100 ===> this function takes value as percentage
    return (Dimensions.get('screen').height / 100) * value
}

export const myDeviceWidth = (value) => {
    // value must be b/w 1-100 ===> this function takes value as percentage
    return (Dimensions.get('screen').width / 100) * value
}