import { takeEvery, put, call } from 'redux-saga/effects';
import {
  ADMIN_DATA_START,
  GET_ALL_SERVICES_LIST_START,
  GET_CATEGORY_LIST_START,
  GET_PROVIDER_LIST_START,
  GET_REGIONS_START,
  POST_JOB_START,
  REFRESH_ALL_SERVICES_LIST_START,
  REFRESH_CATEGORY_LIST_START,
  REFRESH_PROVIDER_LIST_START,
} from './types';
import {
  adminDataFailure,
  adminDataSuccess,
  getAllServicesListFailure,
  getAllServicesListSuccess,
  getCategoryListFailure,
  getCategoryListSuccess,
  getProviderListFailure,
  getProviderListSuccess,
  getRegionsFailure,
  getRegionsSuccess,
  postJobFailure,
  postJobSuccess,
} from './actions';
import { Request } from '../../../services';
import {
  apiConfig,
  apiSuccess,
  convertToFormData,
  errorToast,
  hideLoader,
  screenName,
  showLoader,
  successToast,
} from '../../../utils';

/******************** Category List Saga Actions *******************/

function* getCategoryList({ payload }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(apiConfig.getCategory, payload);
    console.log('response', response);
    if (response.status == apiSuccess) {
      yield put(getCategoryListSuccess(response.data));
      yield* hideLoader(false, '');
    } else {
      yield* hideLoader(false, '');
      yield put(getCategoryListFailure());
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getCategoryListFailure());
  }
}
function* refreshCategoryList({ payload, navigation }) {
  const formData = convertToFormData(payload);
  console.log('data', payload, formData);
  try {
    const response = yield Request.post(apiConfig.getCategory, payload);
    console.log('response', response);
    if (response.status == apiSuccess) {
      yield put(getCategoryListSuccess(response.data));
    } else {
      yield put(getCategoryListFailure());
      errorToast(response.message);
    }
  } catch (error) {
    yield put(getCategoryListFailure());
  }
}

/******************** All Services List Saga Actions *******************/

function* getAllServicesList({ payload, navigation }) {
  yield* showLoader(false);
  console.log('payload', payload)
  try {
    const response = yield Request.post(apiConfig.allServices, { ...payload, limit: 50 });
    console.log('response', response);
    if (response.status == apiSuccess) {
      yield put(getAllServicesListSuccess(response.data));
      yield* hideLoader(false, '');
    } else {
      yield* hideLoader(false, '');
      yield put(getAllServicesListFailure());
      errorToast(response.message);
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getAllServicesListFailure());
  }
}
function* refreshAllServicesList({ payload, navigation }) {
  const formData = convertToFormData(payload);
  console.log('data', payload, formData);
  try {
    const response = yield Request.post(apiConfig.allServices, payload);
    console.log('response', response);
    if (response.status == apiSuccess) {
      yield put(getAllServicesListSuccess(response.data));
    } else {
      yield put(getAllServicesListFailure());
      errorToast(response.message);
    }
  } catch (error) {
    yield put(getAllServicesListFailure());
  }
}

/******************** Provider List Saga Actions *******************/

function* getProviderList({ payload, navigation }) {
  yield* showLoader(false);
  const formData = convertToFormData(payload);
  console.log('data', payload, formData);
  try {
    const response = yield Request.post(apiConfig.allServices, payload);
    console.log('response', response);
    if (response.status == apiSuccess) {
      yield put(getProviderListSuccess(response.data));
      yield* hideLoader(false, '');
    } else {
      yield* hideLoader(false, '');
      yield put(getProviderListFailure());
      errorToast(response.message);
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getProviderListFailure());
  }
}
function* refreshProviderList({ payload, navigation }) {
  const formData = convertToFormData(payload);
  console.log('data', payload, formData);
  try {
    const response = yield Request.post(apiConfig.allServices, payload);
    console.log('response', response);
    if (response.status == apiSuccess) {
      yield put(getProviderListSuccess(response.data));
    } else {
      yield put(getProviderListFailure());
      errorToast(response.message);
    }
  } catch (error) {
    yield put(getProviderListFailure());
  }
}

/******************** Post Job Saga Actions *******************/

function* postJob({ payload, navigation }) {
  yield* showLoader(false);
  const formData = convertToFormData(payload);
  console.log('data', payload, formData);
  try {
    const response = yield Request.post(apiConfig.postJob, formData);
    console.log('response', response);
    if (response.status == apiSuccess) {
      yield put(postJobSuccess(response.data));
      navigation.navigate(screenName.thankYou);
      yield* hideLoader(false, '');
    } else {
      yield* hideLoader(false, '');
      yield put(postJobFailure());
      errorToast(response.message);
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(postJobFailure());
  }
}

/******************** Admin Settings Saga Actions *******************/

function* adminData() {
  yield* showLoader(false);
  try {
    const response = yield Request.get(apiConfig.adminData);
    console.log('response adminData', response);
    if (response.status == apiSuccess) {
      yield put(adminDataSuccess(response.data));
      yield* hideLoader(false, '');
    } else {
      yield* hideLoader(false, '');
      yield put(adminDataFailure());
      errorToast(response.message);
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(adminDataFailure());
  }
}

/******************** Region Data Saga Actions *******************/

function* getRegions() {
  yield* showLoader(false);
  try {
    const response = yield Request.get(apiConfig.getRegions);
    console.log('getRegions response===>', response);
    if (response.status == apiSuccess) {
      const newArray = response?.data.map(item => ({
        label: item?.regionName,
        value: item?.regionName,
      }));
      yield put(getRegionsSuccess(newArray));
      yield* hideLoader(false, '');
    } else {
      yield* hideLoader(false, '');
      yield put(getRegionsFailure());
      errorToast(response.message);
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getRegionsFailure());
  }
}

function* sagaHome() {
  yield takeEvery(GET_CATEGORY_LIST_START, getCategoryList);
  yield takeEvery(REFRESH_CATEGORY_LIST_START, refreshCategoryList);

  yield takeEvery(GET_ALL_SERVICES_LIST_START, getAllServicesList);
  yield takeEvery(REFRESH_ALL_SERVICES_LIST_START, refreshAllServicesList);

  yield takeEvery(GET_PROVIDER_LIST_START, getProviderList);
  yield takeEvery(REFRESH_PROVIDER_LIST_START, refreshProviderList);

  yield takeEvery(POST_JOB_START, postJob);

  yield takeEvery(ADMIN_DATA_START, adminData);

  yield takeEvery(GET_REGIONS_START, getRegions);
}

export default sagaHome;
