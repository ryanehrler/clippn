import * as functions from 'firebase-functions';
import { AuthKeyFunction } from './authKey/auth-key.function';
import * as c from 'cors';

// Firebase
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);

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

/*
    AuthenticateKey
*/
export const authenticateKey = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    res.status(200).send(true);
  });

  // const akf = new AuthKeyFunction(admin);
  // const isKeyValid = akf.ValidateKey('fuck_off').then(v => {
  //   cors(req, res, () => {
  //     res.status(200).send(v.val());
  //   });
  // });
});
