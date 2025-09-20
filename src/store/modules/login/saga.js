import {takeEvery, put, call} from 'redux-saga/effects';
import {LOGIN_CHECK, LOGIN, LOGOUT_REQUESTED, SOCIAL_LOGIN} from './types';
import {
  LoginCheckFail,
  LoginCheckSuccess,
  loginFail,
  loginSuccess,
  logoutFail,
  logoutSuccess,
  socialLoginFail,
  socialLoginSuccess,
} from './actions';
import {Request} from '../../../services';
import {
  apiConfig,
  apiSuccess,
  errorToast,
  hideLoader,
  screenName,
  showLoader,
  successToast,
} from '../../../utils';
import {navigate} from '../../../navigation/RootNavigation';

function* onLoginCheckRequested({payload}) {
  yield* showLoader(false);
  console.log('onLoginCheckRequested data', payload);
  try {
    const response = yield Request.post(apiConfig.checkNumber, payload);
    if (response.status == apiSuccess) {
      const {firebaseToken} = response.data;
      console.log('firebaseToken', firebaseToken);
      console.log(response);
      yield put(LoginCheckSuccess(payload));
      yield* hideLoader(false, '');
      if (response?.exist === true) {
        successToast('Please input your password!');
        navigate(screenName.password, payload);
      } else {
        errorToast('Please signup your account first!');
      }
    } else {
      yield* hideLoader(false, '');
      yield put(LoginCheckFail());
      errorToast(response?.message);
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(LoginCheckFail());
  }
}

function* onLoginRequested({data, navigation}) {
  yield* showLoader(false);
  console.log('data', data);
  try {
    const response = yield Request.post(apiConfig.login, data);
    if (response.status == apiSuccess) {
      successToast(response?.message);
      yield put(loginSuccess(response?.data));
      yield* hideLoader(false, '');
    } else {
      errorToast(response?.message);
      yield* hideLoader(false, '');
      yield put(loginFail());
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(loginFail());
  }
}

function* onLogoutRequested({authError, id, navigation}) {
  yield* showLoader(false);
  if (authError) {
    yield put(loginSuccess(null));
    yield put(logoutSuccess(null));
    yield* hideLoader(false, '');
  } else {
    try {
      const response = yield Request.get(`${apiConfig.logout}/${id}`);
      if (response.status == apiSuccess) {
        yield put(loginSuccess(null));
        yield put(logoutSuccess(null));
      } else {
        errorToast(response.message);
        yield put(loginFail());
      }
      yield* hideLoader(false, '');
    } catch (error) {
      yield put(logoutFail());
      yield* hideLoader(false, '');
      showToast(error.message, 'danger');
    }
  }
}

function* onSocialLoginRequested({payload, data, navigation}) {
  yield* showLoader(false);
  console.log('data', data);
  try {
    const response = yield Request.post(apiConfig.socialLogin, payload);
    console.log('modified res', response);
    if (response?.status == apiSuccess && response?.exist === true) {
      successToast(response.message);
      yield put(loginSuccess(response.data));
      yield* hideLoader(false, '');
    } else if (response?.status == apiSuccess && response?.exist === false) {
      errorToast(`${response.message} Please sign up first.`);
      navigation.navigate(screenName.signUp, {...data, ...payload});
      yield* hideLoader(false, '');
    } else {
      errorToast(response.message);
      yield* hideLoader(false, '');
      yield put(socialLoginFail());
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(socialLoginFail());
  }
}

function* sagaLogin() {
  yield takeEvery(LOGIN_CHECK, onLoginCheckRequested);
  yield takeEvery(LOGIN, onLoginRequested);
  yield takeEvery(LOGOUT_REQUESTED, onLogoutRequested);
  yield takeEvery(SOCIAL_LOGIN, onSocialLoginRequested);
}
export default sagaLogin;
