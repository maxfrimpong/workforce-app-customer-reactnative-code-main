import {
    ACCEPT_REQUEST_FAILURE,
    ACCEPT_REQUEST_START,
    ACCEPT_REQUEST_SUCCESS,
    BID_STATUS,
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
    MATCHED_STATUS,
    RATE_FAILURE,
    RATE_START,
    RATE_SUCCESS,
    SERVICE_PROVIDER_FAILURE,
    SERVICE_PROVIDER_START,
    SERVICE_PROVIDER_SUCCESS
} from './types';

export const jobPostedStart = () => ({
    type: JOB_POSTED_START,
});
export const jobPostedSuccess = payload => (
    {
        type: JOB_POSTED_SUCCESS,
        payload
    }
);
export const jobPostedFailure = () => (
    {
        type: JOB_POSTED_FAILURE,
    }
);

export const jobBidStart = () => ({
    type: JOB_BID_START,
});
export const jobBidSuccess = payload => (
    {
        type: JOB_BID_SUCCESS,
        payload
    }
);
export const jobBidFailure = () => (
    {
        type: JOB_BID_FAILURE,
    }
);

export const jobMatchedStart = () => ({
    type: JOB_MATCHED_START,
});
export const jobMatchedSuccess = payload => (
    {
        type: JOB_MATCHED_SUCCESS,
        payload
    }
);
export const jobMatchedFailure = () => (
    {
        type: JOB_MATCHED_FAILURE,
    }
);

export const serviceProviderStart = (payload) => (
    {
        type: SERVICE_PROVIDER_START,
        payload
    }
);
export const serviceProviderSuccess = payload => (
    {
        type: SERVICE_PROVIDER_SUCCESS,
        payload
    }
);
export const serviceProviderFailure = () => (
    {
        type: SERVICE_PROVIDER_FAILURE,
    }
);

export const jobDetailsStart = (id, fromSocket) => (
    {
        type: JOB_DETAILS_START,
        id,
        fromSocket
    }
);
export const jobDetailsSuccess = payload => (
    {
        type: JOB_DETAILS_SUCCESS,
        payload
    }
);
export const jobDetailsFailure = () => (
    {
        type: JOB_DETAILS_FAILURE,
    }
);

export const acceptRequestStart = (payload) => (
    {
        type: ACCEPT_REQUEST_START,
        payload
    }
);
export const acceptRequestSuccess = payload => (
    {
        type: ACCEPT_REQUEST_SUCCESS,
        payload
    }
);
export const acceptRequestFailure = () => (
    {
        type: ACCEPT_REQUEST_FAILURE,
    }
);

export const rateStart = (payload) => (
    {
        type: RATE_START,
        payload
    }
);
export const rateSuccess = payload => (
    {
        type: RATE_SUCCESS,
        payload
    }
);
export const rateFailure = () => (
    {
        type: RATE_FAILURE,
    }
);

export const bidStatus = (payload) => (
    {
        type: BID_STATUS,
        payload
    }
);
export const matchedStatus = (payload) => (
    {
        type: MATCHED_STATUS,
        payload
    }
);