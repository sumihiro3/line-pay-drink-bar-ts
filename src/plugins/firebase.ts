import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { User } from '~/types'

if (!firebase.apps.length) {
  console.log('Firebase Configs')
  console.log('FIREBASE_API_KEY', process.env.FIREBASE_API_KEY)
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  }
  firebase.initializeApp(config)
}

export default firebase

export function getUsers(): Promise<Array<User>> {
  return new Promise(resolve => {
    const users: Array<User> = []
    const db = firebase.firestore()
    db.collection('users')
      .get()
      .then(query => {
        query.forEach(doc => {
          users.push(doc.data() as User)
        })
        resolve(users)
      })
  })
}
