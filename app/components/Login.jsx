import React from 'react'

import firebase from 'APP/fire'
import {browserHistory} from 'react-router'

const google = new firebase.auth.GoogleAuthProvider()

export default ({ userId, auth }) => (

  <div>
    <button type="button" className='google-login btn btn-warning' type="submit" value="google-login"
        onClick={() => {
          auth.signInWithPopup(google)
        }}>Login with Google</button>
  </div>
)
