const apiConfig = {

    /******* Auth *******/
    register: 'user/register',
    checkNumber: 'user/login',
    login: 'user/password',
    newPassword: 'user/resetpassword',
    updateProfile: 'user/updateprofile',
    uploadDP: 'user/upload',
    changePassword: 'user/changepassword',
    socialLogin: 'user/acknowledgeSocialRegistration',
    logout: 'user/logout',

    /********* OTP verifcation **********/
    sendOtp: 'user/sendResendOtp',
    verifyOtp: 'user/verifyOTP',
    server: 'staging',
    productId: '615306844c1b670e3b1cda6d',

    /******* Home *******/
    adminData: 'adminSetting/getBasicSettingInfo',
    getCategory: 'category',
    allServices: 'category/getAllSubCatByCategoryId',
    postJob: 'trip/addtrip',
    getRegions: 'admin/getAdminAddedRegions',

    /******* job *******/
    jobPosted: 'trip/user/jobListing',
    jobBids: 'trip/user/getJobsListingWhichContainsBids',
    jobMatched: 'trip/user/matchedJobs',
    serviceProvider: 'trip/user/getDriversInfoWhoHavePlacedBids',
    acceptRequest: 'trip/user/bidAcceptedByCustomer',
    jobDetails: 'trip/tripdetails/',
    rateService: 'trip/feedbackcustomer',

    /******* Chat *******/
    getChat: 'user/chathistory',
    uploadMedia: 'adminSetting/uploadMedia',

    /******* Settings & Help *******/
    support: 'user/support',
    notification: 'user/turnOnOffAppNotifications',
    aboutUs: 'admin/aboutus',
    privacyPolicy: 'admin/privacypolicy',
    terms: 'admin/termsandconditions',
    faq: 'admin/helpandsupport',

    /******* Payment *******/
    addCard: 'payment/addpos',
    getCards: 'payment/poslist',
    removeCard: 'payment/deletepos',
    paypal: 'paypal'
}

export const apiSuccess = 'success'
export const apiFailure = 'failure'

export default apiConfig