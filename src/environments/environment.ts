// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCAc95r8cCchoT5hDnPY4uTx2nak0ft5L0',
    authDomain: 'clippn-qa.firebaseapp.com',
    databaseURL: 'https://clippn-qa.firebaseio.com',
    projectId: 'clippn-qa',
    storageBucket: 'clippn-qa.appspot.com',
    messagingSenderId: '401605255023'
  }
};
