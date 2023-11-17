const router = require('express').Router();
const quickEncrypt = require('quick-encrypt');
const keys = require('../keys/keys.json');
const Database = require('../services/database');

async function decrypt(encrypted, key) {
  return new Promise((resolve, reject) => {
    try {
      const result = quickEncrypt.decrypt(encrypted, key);
      resolve([result, null]);
    } catch (error) {
      resolve([null, error]);
    }
  });
}

function tryParseCredentials(credentials) {
  try {
    const { username, password } = JSON.parse(credentials);
    return [{ username, password }, null];
  } catch (error) {
    return [null, error];
  }
}

router.post('/api/video-auth', async (req, res, next) => {
  try {
    const { downloadId, credentials } = req.body;
    if (!downloadId || !credentials) {
      throw { code: 400, message: 'Missing required parameters', errorCode: 4001 };
    }

    const [credString, errorDecrypt] = await decrypt(credentials, keys.private);
    if (errorDecrypt) {
      throw { code: 400, message: 'Something went wrong with decryption', errorCode: 4002 };
    }

    const [credentialsObj, errorParse] = tryParseCredentials(credString);
    if (errorParse) {
      throw { code: 400, message: 'Invalid credentials', errorCode: 4003 };
    }

    const { username, password } = credentialsObj;

    const database = new Database();
    const resultAuth = await database.loginSecureVideoDownload(username, password);

    res.json({ ...resultAuth, downloadId });
  } catch (error) {
    next(error);
  }
});

router.post('/api/video-authorization', async (req, res, next) => {
  try {
    const sessionId = req.get('sessionid');
    const { downloadId } = req.query;
    if (!sessionId || !downloadId) {
      throw { code: 400, message: 'Missing required parameters', errorCode: 400 };
    }

    const database = new Database();
    const resultAuthorization = await database.evidenceDownloadIdAuthorization(sessionId, downloadId);
    return res.json(resultAuthorization);
  } catch (error) {
    return next(error);
  }
});

router.get('/video-auth/public', async (req, res, next) => {
  res.json({ public: keys.public });
});

module.exports = router;

/********************* Propiedad de Métrica Móvil SA de CV **************************/