require('dotenv').config();

const Joi = require('joi');

const envSchema = Joi.object({
  // SERVER
  PORT: Joi.number().required(),
  TIMEOUT: Joi.number().required(),
  LIMIT: Joi.string().required(),
  EXTENDED: Joi.boolean().required(),
  ENVIRONMENT: Joi.string().required(),
  CORS_ALLOWED: Joi.string().required(),
  OPTIONS_SUCCESS_STATUS: Joi.number().required(),
  API_KEY_NAME: Joi.string().required(),
  API_KEY_VALUE: Joi.string().required(),
  API_BASE_MAX_REQUEST: Joi.number().required(),
  API_BASE_INTERVAL_MIN: Joi.number().required(),
  API_AUTH_MAX_REQUEST: Joi.number().required(),
  API_AUTH_INTERVAL_MIN: Joi.number().required(),
  // DATABASE
  DBUSER: Joi.string().required(),
  DBHOST: Joi.string().required(),
  DBNAME: Joi.string().required(),
  DBPASS: Joi.string().required(),
  DBPORT: Joi.number().required(),
  MAX: Joi.number().required(),
  IDLE_TIMEOUT: Joi.number().optional().default(1000),
  CONNECTION_TIMEOUT: Joi.number().optional().default(10000),
  // EMAIL
  EMAIL: Joi.string().required(),
  EMAILNAME: Joi.string().required(),
  EMAILPASS: Joi.string().required(),
  // ALARM COLLECTOR API SERVICE
  ALARM_COLLECTOR_API_KEY_NAME: Joi.string().required(),
  ALARM_COLLECTOR_API_KEY_VALUE: Joi.string().required(),
  ALARM_COLLECTOR_AMOUNT: Joi.number().required(),
  ALARM_COLLECTOR_UNIT: Joi.string().required(),
  ALARM_COLLECTOR_BASE_URL: Joi.string().required(),
  ALARM_COLLECTOR_GET_URL: Joi.string().required(),
  LAST_POSITION_GET_URL: Joi.string().required(),
  GET_DASHBOARD_ANALYTICS: Joi.string().required(),
  // GEOTAB
  GEOTAB_USER: Joi.string().required(),
  GEOTAB_PASSWORD: Joi.string().required(),
  GEOTAB_SERVER: Joi.string().required(),
  GEOTAB_DB: Joi.string().required(),
  // MDVR API SERVICE
  MDVR_SERVICE_API_KEY: Joi.string().required(),
  MDVR_SERVICE_BASE_URL: Joi.string().required(),
  MDVR_SERVICE_LOGIN: Joi.string().required(),
  MDVR_SERVICE_GET_OFFSET: Joi.string().required(),
  // TIMEZONE
  TZ_LOCALE: Joi.number().optional().default(-6),
  TZ_GO: Joi.number().optional().default(-6),
  TZ_FT: Joi.string().optional().default('-6:00'),
  // BUCKET API SERVICE
  BUCKET_SERVICE_API_KEY: Joi.string().required(),
  BUCKET_SERVICE_TOKEN: Joi.string().required(),
  BUCKET_SERVICE_BASE_URL: Joi.string().required(),
  BUCKET_SERVICE_UPLOAD: Joi.string().required(),
  BUCKET_SERVICE_GET: Joi.string().required(),
  BUCKET_SERVICE_DELETE: Joi.string().required(),
  BUCKET_SERVICE_UPLOAD_PROFILE: Joi.string().required(),
  BUCKET_SERVICE_DELETE_PROFILE: Joi.string().required(),
  // FACIAL RECOGNITION API SERVICE
  API_CODES_FACIAL_RECOGNITION_URL: Joi.string().required(),
  API_CODES_FACIAL_RECOGNITION_API_KEY_NAME: Joi.string().required(),
  API_CODES_FACIAL_RECOGNITION_API_KEY_VALUE: Joi.string().required(),
  API_CODES_FACIAL_RECOGNITION_GENERATE_CODES: Joi.string().required(),
  API_CODES_FACIAL_RECOGNITION_GET_CODES: Joi.string().required(),
  API_CODES_FACIAL_RECOGNITION_DELETE_CODES: Joi.string().required(),
  API_CODES_FACIAL_RECOGNITION_DRIVER_NSS: Joi.string().required(),
  API_CODES_FACIAL_RECOGNITION_DELETE_DRIVER: Joi.string().required(),
  // SURFSIGHT API SERVICE
  SURFSIGHT_API_BASE_URL: Joi.string().required(),
  SURFSIGHT_API_EMAIL: Joi.string().required(),
  SURFSIGHT_API_PASS: Joi.string().required(),
  SURFSIGHT_API_LOGIN: Joi.string().required(),
  SURFSIGHT_API_DEVICES_DATA_USAGE: Joi.string().required(),
  // FT API SERVICE
  FT_API_BASE_URL: Joi.string().required(),
  FT_API_LOGIN_URL: Joi.string().required(),
  FT_API_ADD_DEVICES_URL: Joi.string().required(),
  FT_API_EDIT_DEVICE_URL: Joi.string().required(),
  FT_API_GET_LIST_DEVICES_URL: Joi.string().required(),
  FT_API_GET_DEVICE_ONLINE_RECORDS_URL: Joi.string().required(),
  FT_API_DELETE_DEVICE_URL: Joi.string().required(),
  FT_API_GET_SIM_CARD_IMSI_URL: Joi.string().required(),
  FT_API_GET_LATEST_GPS_RECORD_URL: Joi.string().required(),
  FT_API_QUERY_GPS_RECORDS_URL: Joi.string().required(),
  FT_API_GET_ALARM_INFORMATION_URL: Joi.string().required(),
  FT_API_ALARM_PROCESSION_URL: Joi.string().required(),
  FT_API_CREATE_ALARM_FILES_DOWNLOAD_TASK_URL: Joi.string().required(),
  FT_API_CREATE_FILE_DOWNLOAD_TASK_URL: Joi.string().required(),
  FT_API_QUERY_TASK_DOWNLOAD_STATUS_URL: Joi.string().required(),
  FT_API_QUERY_DOWNLOAD_TASK_DETAIL_URL: Joi.string().required(),
  FT_API_GET_FILE_DOWNLOAD_LINK_URL: Joi.string().required(),
  FT_API_DELETE_FILE_DOWNLOAD_LINK_URL: Joi.string().required(),
  FT_API_DELETE_FILE_URL: Joi.string().required(),
  FT_API_GET_DEVICE_LIVE_VIEW_URL_URL: Joi.string().required(),
  FT_API_GET_THE_MAINTENANCE_PLATFORM_LINK_URL: Joi.string().required(),
  FT_API_INQUIRE_MONTHLY_CALENDAR_URL: Joi.string().required(),
  FT_API_INQUIRE_DAILY_CALENDAR_URL: Joi.string().required(),
  FT_API_INQUIRE_MINUTE_CALENDAR_URL: Joi.string().required(),
  FT_API_SUBSCRIPTION_URL: Joi.string().required(),
  FT_API_CANCEL_SUBSCRIPTION_URL: Joi.string().required(),
  FT_API_GET_REALTIME_GPS_URL: Joi.string().required(),
  FT_API_GET_REALTIME_ALARM_URL: Joi.string().required(),
  FT_API_TTS_ISSUE_URL: Joi.string().required(),
  FT_API_TTS_ISSUE_RESULT_QUERY_URL: Joi.string().required(),
  FT_API_FACE_PARAMETER_CONFIG_URL: Joi.string().required(),
  FT_API_GET_FACE_COMPARISON_PARAMETER_URL: Joi.string().required(),
  FT_API_GET_COMPARISON_RESULT_URL: Joi.string().required(),
  FT_API_ISSUE_FACE_PHOTO_URL: Joi.string().required(),
  FT_API_GET_ISSUE_RESULT_URL: Joi.string().required(),
  FT_API_SIGN: Joi.string().required(),
  FT_API_TENANTID: Joi.string().required(),
  FT_API_CREATE_DRIVER_URL: Joi.string().required(),
  FT_API_DELETE_DRIVER_URL: Joi.string().required(),
  FT_API_UPLOAD_DRIVER_FACE_URL: Joi.string().required(),
  FT_API_DELETE_DRIVER_FACE_URL: Joi.string().required(),
  FT_API_GET_DRIVER_FACE_LIST_URL: Joi.string().required(),
  FT_API_GET_DRIVER_PAGE_URL: Joi.string().required(),
  FT_API_CAPTURE_REAL_TIME: Joi.string().required(),
  FT_API_CREATE_FLEET: Joi.string().required(),
  FT_API_DELETE_FLEET: Joi.string().required(),
  FT_API_UPDATE_FLEET: Joi.string().required(),
  FT_API_GET_FLEET_LIST: Joi.string().required(),
  FT_API_CHANGE_DEVICE_FLEET: Joi.string().required(),
}).options({
  allowUnknown: true,
  stripUnknown: false
});

const { error, value: validateEnv } = envSchema.validate(process.env);

if (error) {
  console.error(error.details[0].message);
  process.exit(1);
};

module.exports = {
  server: {
    port: validateEnv.PORT,
    timeout: validateEnv.TIMEOUT,
    limit: validateEnv.LIMIT,
    extended: validateEnv.EXTENDED,
    environment: validateEnv.ENVIRONMENT,
    corsAllowed: validateEnv.CORS_ALLOWED,
    optionsSuccessStatus: validateEnv.OPTIONS_SUCCESS_STATUS,
    apiKeyName: validateEnv.API_KEY_NAME.toLowerCase(),
    apiKeyValue: validateEnv.API_KEY_VALUE,
    baseMaxRequest: validateEnv.API_BASE_MAX_REQUEST,
    baseIntervalMin: validateEnv.API_BASE_INTERVAL_MIN,
    authMaxRequest: validateEnv.API_AUTH_MAX_REQUEST,
    authIntervalMin: validateEnv.API_AUTH_INTERVAL_MIN,
  },
  db: {
    host: validateEnv.DBHOST,
    user: validateEnv.DBUSER,
    password: validateEnv.DBPASS,
    database: validateEnv.DBNAME,
    port: validateEnv.DBPORT,
    max: validateEnv.MAX,
    idleTimeoutMillis: validateEnv.IDLE_TIMEOUT,
    connectionTimeoutMillis: validateEnv.CONNECTION_TIMEOUT,
  },
  email: {
    user: validateEnv.EMAIL,
    password: validateEnv.EMAILPASS,
    name: validateEnv.EMAILNAME,
  },
  geotab: {
    username: validateEnv.GEOTAB_USER,
    password: validateEnv.GEOTAB_PASSWORD,
    server: validateEnv.GEOTAB_SERVER,
    database: validateEnv.GEOTAB_DB,
  },
  alarmCollector: {
    apiKeyName: validateEnv.ALARM_COLLECTOR_API_KEY_NAME,
    apiKeyValue: validateEnv.ALARM_COLLECTOR_API_KEY_VALUE,
    amount: validateEnv.ALARM_COLLECTOR_AMOUNT,
    unit: validateEnv.ALARM_COLLECTOR_UNIT,
    baseURL: validateEnv.ALARM_COLLECTOR_BASE_URL,
    getAlarmsURL: validateEnv.ALARM_COLLECTOR_GET_URL,
    getLastPositionURL: validateEnv.LAST_POSITION_GET_URL,
    getDashboardAnalytics: validateEnv.GET_DASHBOARD_ANALYTICS,
  },
  mdvrApiSevice: {
    apiKey: validateEnv.MDVR_SERVICE_API_KEY,
    baseURL: validateEnv.MDVR_SERVICE_BASE_URL,
    login: validateEnv.MDVR_SERVICE_LOGIN,
    offset: validateEnv.MDVR_SERVICE_GET_OFFSET,
  },
  tz: {
    locale: validateEnv.TZ_LOCALE,
    go: validateEnv.TZ_GO,
    ftAPI: validateEnv.TZ_FT,
  },
  bucketService: {
    apiKey: validateEnv.BUCKET_SERVICE_API_KEY,
    token: validateEnv.BUCKET_SERVICE_TOKEN,
    baseURL: validateEnv.BUCKET_SERVICE_BASE_URL,
    upload: validateEnv.BUCKET_SERVICE_UPLOAD,
    get: validateEnv.BUCKET_SERVICE_GET,
    delete: validateEnv.BUCKET_SERVICE_DELETE,
    uploadProfile: validateEnv.BUCKET_SERVICE_UPLOAD_PROFILE,
    deleteProfile: validateEnv.BUCKET_SERVICE_DELETE_PROFILE,
  },
  facialRecService: {
    baseURL: validateEnv.API_CODES_FACIAL_RECOGNITION_URL,
    apiKeyName: validateEnv.API_CODES_FACIAL_RECOGNITION_API_KEY_NAME,
    apiKeyValue: validateEnv.API_CODES_FACIAL_RECOGNITION_API_KEY_VALUE,
    generateCodes: validateEnv.API_CODES_FACIAL_RECOGNITION_GENERATE_CODES,
    getCodes: validateEnv.API_CODES_FACIAL_RECOGNITION_GET_CODES,
    deleteCodes: validateEnv.API_CODES_FACIAL_RECOGNITION_DELETE_CODES,
    driverCode: validateEnv.API_CODES_FACIAL_RECOGNITION_DRIVER_NSS,
    deleteDriverCode: validateEnv.API_CODES_FACIAL_RECOGNITION_DELETE_DRIVER,
  },
  surfsight: {
    baseURL: validateEnv.SURFSIGHT_API_BASE_URL,
    credentials: {
      email: validateEnv.SURFSIGHT_API_EMAIL,
      password: validateEnv.SURFSIGHT_API_PASS,
    },
    login: validateEnv.SURFSIGHT_API_LOGIN,
    devicesDataUsage: validateEnv.SURFSIGHT_API_DEVICES_DATA_USAGE,
  },
  ftAPI: {
    baseURL: validateEnv.FT_API_BASE_URL,
    loginURL: validateEnv.FT_API_LOGIN_URL,
    addDevicesURL: validateEnv.FT_API_ADD_DEVICES_URL,
    editDeviceURL: validateEnv.FT_API_EDIT_DEVICE_URL,
    getListDevicesURL: validateEnv.FT_API_GET_LIST_DEVICES_URL,
    getDeviceOnlineRecordsURL: validateEnv.FT_API_GET_DEVICE_ONLINE_RECORDS_URL,
    deleteDeviceURL: validateEnv.FT_API_DELETE_DEVICE_URL,
    getSimCardImsiURL: validateEnv.FT_API_GET_SIM_CARD_IMSI_URL,
    getLatestGpsRecordURL: validateEnv.FT_API_GET_LATEST_GPS_RECORD_URL,
    queryGpsRecordsURL: validateEnv.FT_API_QUERY_GPS_RECORDS_URL,
    getAlarmInformationURL: validateEnv.FT_API_GET_ALARM_INFORMATION_URL,
    alarmProcessionURL: validateEnv.FT_API_ALARM_PROCESSION_URL,
    createAlarmFilesDownloadTaskURL: validateEnv.FT_API_CREATE_ALARM_FILES_DOWNLOAD_TASK_URL,
    createFileDownloadTaskURL: validateEnv.FT_API_CREATE_FILE_DOWNLOAD_TASK_URL,
    queryTaskDownloadStatusURL: validateEnv.FT_API_QUERY_TASK_DOWNLOAD_STATUS_URL,
    queryDownloadTaskDetailURL: validateEnv.FT_API_QUERY_DOWNLOAD_TASK_DETAIL_URL,
    getFileDownloadLinkURL: validateEnv.FT_API_GET_FILE_DOWNLOAD_LINK_URL,
    deleteFileDownloadLinkURL: validateEnv.FT_API_DELETE_FILE_DOWNLOAD_LINK_URL,
    deleteFileURL: validateEnv.FT_API_DELETE_FILE_URL,
    getDeviceLiveViewUrlURL: validateEnv.FT_API_GET_DEVICE_LIVE_VIEW_URL_URL,
    getTheMaintenancePlatformLinkURL: validateEnv.FT_API_GET_THE_MAINTENANCE_PLATFORM_LINK_URL,
    inquireMonthlyCalendarURL: validateEnv.FT_API_INQUIRE_MONTHLY_CALENDAR_URL,
    inquireDailyCalendarURL: validateEnv.FT_API_INQUIRE_DAILY_CALENDAR_URL,
    inquireMinuteCalendarURL: validateEnv.FT_API_INQUIRE_MINUTE_CALENDAR_URL,
    subscriptionURL: validateEnv.FT_API_SUBSCRIPTION_URL,
    cancelSubscriptionURL: validateEnv.FT_API_CANCEL_SUBSCRIPTION_URL,
    getRealtimeGpsURL: validateEnv.FT_API_GET_REALTIME_GPS_URL,
    getRealtimeAlarmURL: validateEnv.FT_API_GET_REALTIME_ALARM_URL,
    ttsIssueURL: validateEnv.FT_API_TTS_ISSUE_URL,
    ttsIssueResultQueryURL: validateEnv.FT_API_TTS_ISSUE_RESULT_QUERY_URL,
    faceParameterConfigURL: validateEnv.FT_API_FACE_PARAMETER_CONFIG_URL,
    getFaceComparisonParameterURL: validateEnv.FT_API_GET_FACE_COMPARISON_PARAMETER_URL,
    getComparisonResultURL: validateEnv.FT_API_GET_COMPARISON_RESULT_URL,
    issueFacePhotoURL: validateEnv.FT_API_ISSUE_FACE_PHOTO_URL,
    getIssueResultURL: validateEnv.FT_API_GET_ISSUE_RESULT_URL,
    credentials: {
      effectiveTime: 0,
      _sign: validateEnv.FT_API_SIGN,
      _tenantid: validateEnv.FT_API_TENANTID,
    },
    createDriver: validateEnv.FT_API_CREATE_DRIVER_URL,
    deleteDriver: validateEnv.FT_API_DELETE_DRIVER_URL,
    uploadDriverFace: validateEnv.FT_API_UPLOAD_DRIVER_FACE_URL,
    deleteDriverFace: validateEnv.FT_API_DELETE_DRIVER_FACE_URL,
    getDriverFaceList: validateEnv.FT_API_GET_DRIVER_FACE_LIST_URL,
    getDriverPage: validateEnv.FT_API_GET_DRIVER_PAGE_URL,
    captureRealTime: validateEnv.FT_API_CAPTURE_REAL_TIME,
    createFleet: validateEnv.FT_API_CREATE_FLEET,
    deleteFleet: validateEnv.FT_API_DELETE_FLEET,
    updateFleet: validateEnv.FT_API_UPDATE_FLEET,
    getFleetList: validateEnv.FT_API_GET_FLEET_LIST,
    changeDeviceFleet: validateEnv.FT_API_CHANGE_DEVICE_FLEET,
  },
};