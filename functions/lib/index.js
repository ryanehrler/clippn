"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const auth_key_function_1 = require("./authKey/auth-key.function");
const c = require("cors");
// Firebase
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// CORS
const whitelist = ['http://localhost:4200'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
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
/*
    AuthenticateKey
*/
exports.authenticateKey = functions.https.onRequest((req, res) => {
    const body = req.body;
    console.log(body);
    if (body.key === undefined || body.key === '') {
        return sendBadRequest(res);
    }
    const akf = new auth_key_function_1.AuthKeyFunction(admin);
    const isKeyValid = akf.ValidateKey(body.key).then(v => {
        cors(req, res, () => {
            res.status(200).send(v);
        });
    });
});
function sendBadRequest(res) {
    return res.status(400).send(BAD_REQUEST_MESSAGE);
}
//# sourceMappingURL=index.js.map