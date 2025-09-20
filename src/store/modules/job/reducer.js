import { createReducer } from '../../../utils';
import {
    ACCEPT_REQUEST_FAILURE,
    ACCEPT_REQUEST_START,
    ACCEPT_REQUEST_SUCCESS,
    JOB_BID_FAILURE,
    JOB_BID_START,
    JOB_BID_SUCCESS,
    JOB_DETAILS_FAILURE,
    JOB_DETAILS_START,
    JOB_DETAILS_SUCCESS,
    JOB_MATCHED_FAILURE,
    JOB_MATCHED_START,
    JOB_MATCHED_SUCCESS,
    JOB_POSTED_FAILURE,
    JOB_POSTED_START,
    JOB_POSTED_SUCCESS,
    RATE_FAILURE,
    RATE_START,
    RATE_SUCCESS,
    SERVICE_PROVIDER_FAILURE,
    SERVICE_PROVIDER_START,
    SERVICE_PROVIDER_SUCCESS
} from './types';

const initialState = {
    jobPostData: [],
    bidsData: [],
    jobMatchedData: [],
    providerData: [],
    jobDetails: {},
};

const jobPostedStart = (state) => {
    return {
        ...state,
        jobPostData: [],
    }
}
const jobPostedSuccess = (state, data) => {
    return {
        ...state,
        jobPostData: data,
    }
}
const jobPostedFailure = (state) => {
    return {
        ...state,
    }
}

const jobBidStart = (state) => {
    return {
        ...state,
        bidsData: [],
    }
}
const jobBidSuccess = (state, data) => {
    return {
        ...state,
        bidsData: data,
    }
}
const jobBidFailure = (state) => {
    return {
        ...state,
    }
}

const jobMatchedStart = (state) => {
    return {
        ...state,
        jobMatchedData: [],
    }
}
const jobMatchedSuccess = (state, data) => {
    return {
        ...state,
        jobMatchedData: data,
    }
}
const jobMatchedFailure = (state) => {
    return {
        ...state,
    }
}

const serviceProviderStart = (state) => {
    return {
        ...state,
        providerData: [],
    }
}
const serviceProviderSuccess = (state, data) => {
    return {
        ...state,
        providerData: data,
    }
}
const serviceProviderFailure = (state) => {
    return {
        ...state,
    }
}

const jobDetailsStart = (state) => {
    return {
        ...state,
    }
}
const jobDetailsSuccess = (state, data) => {
    return {
        ...state,
        jobDetails: data,
    }
}
const jobDetalsFailure = (state) => {
    return {
        ...state,
        jobDetails: {},
    }
}

const acceptRequestStart = (state) => {
    return {
        ...state,
    }
}
const acceptRequestSuccess = (state, data) => {
    return {
        ...state,
    }
}
const acceptRequestFailure = (state) => {
    return {
        ...state,
    }
}

const rateStart = (state) => {
    return {
        ...state,
    }
}
const rateSuccess = (state, data) => {
    return {
        ...state,
    }
}
const rateFailure = (state) => {
    return {
        ...state,
    }
}

export default createReducer(initialState, {
    [JOB_POSTED_START]: jobPostedStart,
    [JOB_POSTED_SUCCESS]: jobPostedSuccess,
    [JOB_POSTED_FAILURE]: jobPostedFailure,

    [JOB_BID_START]: jobBidStart,
    [JOB_BID_SUCCESS]: jobBidSuccess,
    [JOB_BID_FAILURE]: jobBidFailure,

    [JOB_MATCHED_START]: jobMatchedStart,
    [JOB_MATCHED_SUCCESS]: jobMatchedSuccess,
    [JOB_MATCHED_FAILURE]: jobMatchedFailure,

    [SERVICE_PROVIDER_START]: serviceProviderStart,
    [SERVICE_PROVIDER_SUCCESS]: serviceProviderSuccess,
    [SERVICE_PROVIDER_FAILURE]: serviceProviderFailure,

    [JOB_DETAILS_START]: jobDetailsStart,
    [JOB_DETAILS_SUCCESS]: jobDetailsSuccess,
    [JOB_DETAILS_FAILURE]: jobDetalsFailure,

    [ACCEPT_REQUEST_START]: acceptRequestStart,
    [ACCEPT_REQUEST_SUCCESS]: acceptRequestSuccess,
    [ACCEPT_REQUEST_FAILURE]: acceptRequestFailure,

    [RATE_START]: rateStart,
    [RATE_SUCCESS]: rateSuccess,
    [RATE_FAILURE]: rateFailure,
})
