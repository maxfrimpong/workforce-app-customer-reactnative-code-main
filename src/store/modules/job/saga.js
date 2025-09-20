import { takeEvery, put, call, select } from 'redux-saga/effects';
import {
  ACCEPT_REQUEST_START,
  JOB_BID_START,
  JOB_DETAILS_START,
  JOB_MATCHED_START,
  JOB_POSTED_START,
  RATE_START,
  SERVICE_PROVIDER_START
} from './types';
import {
  acceptRequestFailure,
  acceptRequestSuccess,
  jobBidFailure,
  jobBidSuccess,
  jobDetailsFailure,
  jobDetailsSuccess,
  jobMatchedFailure,
  jobMatchedSuccess,
  jobPostedFailure,
  jobPostedSuccess,
  rateFailure,
  rateSuccess,
  serviceProviderFailure,
  serviceProviderSuccess
} from './actions';
import { Request } from "../../../services";
import {
  apiConfig,
  apiSuccess,
  convertToFormData,
  errorToast,
  hideLoader,
  screenName,
  showLoader,
  successToast
} from '../../../utils';
import { navigate } from '../../../navigation/RootNavigation';

/******************** Job Saga Actions *******************/

function* jobPosted() {
  yield* showLoader(false);
  try {
    const response = yield Request.get(
      apiConfig.jobPosted,
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(jobPostedSuccess(response.data))
    } else {
      yield* hideLoader(false, '');
      yield put(jobPostedFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(jobPostedFailure());
  }
}

function* jobBids() {
  yield* showLoader(false);
  try {
    const response = yield Request.get(
      apiConfig.jobBids,
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(jobBidSuccess(response.data))
    } else {
      yield* hideLoader(false, '');
      yield put(jobBidFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(jobBidFailure());
  }
}

function* jobMatched() {
  yield* showLoader(false);
  try {
    const response = yield Request.get(
      apiConfig.jobMatched,
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(jobMatchedSuccess(response.data))
    } else {
      yield* hideLoader(false, '');
      yield put(jobMatchedFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(jobMatchedFailure());
  }
}

/******************** Service Provider Saga Actions *******************/

function* getServiceProviders({ payload }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      apiConfig.serviceProvider,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(serviceProviderSuccess(response.data))
    } else {
      yield* hideLoader(false, '');
      yield put(serviceProviderFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(serviceProviderFailure());
  }
}

/******************** Job minor fun Saga Actions *******************/

function* jobDetails({ id, fromSocket }) {
  yield* showLoader(false);
  try {
    const response = yield Request.get(
      `${apiConfig.jobDetails}${id}`,
    );
    console.log(fromSocket, 'Job Details response', response)
    if (response.status == apiSuccess) {
      // Accessing global state
      const reduxState = yield select();
      const {
        jobPostData,
        bidsData,
        jobMatchedData,
        jobDetails,
      } = reduxState?.jobReducer
      // Destructured response data
      const {
        data
      } = response;
      // Condition checking for jobs tab
      if (!fromSocket) { //Checking API hit done from Socket||Tracking screen
        yield put(jobDetailsSuccess(response.data))
      } else {
        if (data?.tripStatus == 'approvedByAdmin' && jobDetails?._id === data?._id) {
          yield put(jobDetailsSuccess(response.data))
        } else if (data?.tripStatus == 'bidPlacedByDriver') {
          const newJobPostArray = jobPostData.filter(item => item?._id !== data?._id)
          const newBidArray = [data, ...bidsData]
          yield put(jobPostedSuccess(newJobPostArray))
          yield put(jobBidSuccess(newBidArray))
        } else if (data?.tripStatus == 'completed') {
          const newBidArray = bidsData.filter(item => item?._id !== data?._id)
          const newJobMatchArray = [data, ...jobMatchedData]
          yield put(jobBidSuccess(newBidArray))
          yield put(jobMatchedSuccess(newJobMatchArray))
          jobDetails?._id === id ? yield put(jobDetailsSuccess(response.data)) : null
        }
      }
      yield* hideLoader(false, '');

    } else {
      yield* hideLoader(false, '');
      yield put(jobDetailsFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(jobDetailsFailure());
  }
}

function* acceptRequest({ payload }) {
  yield* showLoader(false);
  console.log('data', payload)
  try {
    const response = yield Request.post(
      apiConfig.acceptRequest,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(acceptRequestSuccess(response.data))
      navigate(screenName.thankYou, { jobFlow: true, payload })
    } else {
      yield* hideLoader(false, '');
      yield put(acceptRequestFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(acceptRequestFailure());
  }
}

function* rateService({ payload }) {
  yield* showLoader(false);
  console.log('data', payload)
  try {
    const response = yield Request.post(
      apiConfig.rateService,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(rateSuccess(response.data))
      navigate(screenName.mainHome)
    } else {
      yield* hideLoader(false, '');
      yield put(rateFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(rateFailure());
  }
}

function* sagaJob() {
  yield takeEvery(JOB_POSTED_START, jobPosted);
  yield takeEvery(JOB_BID_START, jobBids);
  yield takeEvery(JOB_MATCHED_START, jobMatched);

  yield takeEvery(SERVICE_PROVIDER_START, getServiceProviders)

  yield takeEvery(JOB_DETAILS_START, jobDetails)
  yield takeEvery(ACCEPT_REQUEST_START, acceptRequest)
  yield takeEvery(RATE_START, rateService)

}

export default sagaJob;
