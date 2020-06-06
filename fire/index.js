const firebase = require('firebase')

// -- // -- // -- // Firebase Config // -- // -- // -- //

export const config = {
  apiKey: 'AIzaSyDPbpa99tEDgIAx2M3bfVvWDJ9dlAIY80U',
  authDomain: 'todo-list-cc93c.firebaseapp.com',
  databaseURL: 'https://todo-list-cc93c.firebaseio.com',
  projectId: 'todo-list-cc93c',
  storageBucket: '',
  messagingSenderId: '777678174053'
}

// -- // -- // -- // -- // -- // -- // -- // -- // -- //

// Initialize the app, but make sure to do it only once.
//   (We need this for the tests. The test runner busts the require
//   cache when in watch mode; this will cause us to evaluate this
//   file multiple times. Without this protection, we would try to
//   initialize the app again, which causes Firebase to throw.
//
//   This is why global state makes a sad panda.)
firebase.__bonesApp || (firebase.__bonesApp = firebase.initializeApp(config))

module.exports = firebase