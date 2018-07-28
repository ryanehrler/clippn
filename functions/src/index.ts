import * as functions from 'firebase-functions';
import { AuthKeyFunction } from './authKey/auth-key.function';
import * as c from 'cors';

// Firebase
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// CORS
const whitelist = ['http://localhost:4200'];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
const cors = c(corsOptions);

// exports.addMessage = functions.https.onRequest((req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into the Realtime Database using the Firebase Admin SDK.
//   return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
//     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//     return res.redirect(303, snapshot.ref.toString());
//   });
// });

const BAD_REQUEST_MESSAGE = 'Bad Request';
const UNAUTHORIZED_MESSAGE = 'Unauthorized';

/*
    AuthenticateKey
*/
export const authenticateKey = functions.https.onRequest((req, res) => {
  const body = req.body;
  if (body.key === undefined || body.key === '') {
    sendBadRequest(res);
  }

  const akf = new AuthKeyFunction(admin);
  return akf.ValidateKey(body.key).then(v => {
    cors(req, res, () => {
      res.status(200).send(v);
    });
  });
});

/*
    RegisterKey
*/
export const registerKey = functions.https.onRequest((req, res) => {
  const body = req.body;
  if (body.id === undefined || body.id === '') {
    sendBadRequest(res);
  }

  const akf = new AuthKeyFunction(admin);
  return akf.RegisterKey(body.id).then(v => {
    cors(req, res, () => {
      if (v) {
        res.status(200).send(true);
      } else {
        sendUnauthorized(res);
      }
    });
  });
});

function sendBadRequest(res: any) {
  res.status(400).send(BAD_REQUEST_MESSAGE);
}

function sendUnauthorized(res: any) {
  res.status(401).send(UNAUTHORIZED_MESSAGE);
}
