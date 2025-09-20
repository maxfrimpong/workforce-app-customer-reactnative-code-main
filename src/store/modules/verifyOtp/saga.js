import { takeEvery, put, call } from 'redux-saga/effects';
import { VERIFY_OTP } from './types';
import { verifyOtpFail, verifyOtpSuccess } from './actions';
import { apiConfig, apiSuccess, errorToast, hideLoader, screenName, showLoader } from '../../../utils';
import { registerRequest } from '../register/actions';
import { Request } from '../../../services';

var qs = require('qs');


function* onVerifyOtpRequested({ payload, flow, data, navigation }) {
  console.log('verify intiate check for register Data', flow, data,)
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      apiConfig.verifyOtp,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      if (flow === 'register') {
        console.log('register flow initiated', data)
        yield put(registerRequest(data, navigation))
      } else if (flow === 'forgot') {
        navigation.navigate(screenName.forgot, data)
      }
    } else {
      yield put(verifyOtpFail());
      yield* hideLoader(false, '');
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    errorToast(error.message)
    yield put(verifyOtpFail());
  }
}

function* sagaVerifyOtp() {
  yield takeEvery(VERIFY_OTP, onVerifyOtpRequested);
}
export default sagaVerifyOtp;
