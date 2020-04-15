import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { BotUser, DataNotFoundError } from '~/types'

const database: firebase.firestore.Firestore = firebase.firestore()
const usersRef: firebase.firestore.CollectionReference = database.collection(
  'users'
)

export function getBotUser(userId: string): Promise<BotUser> {
  return new Promise(resolve => {
    const userRef = usersRef.doc(userId)
    userRef.get().then(doc => {
      if (!doc.exists) {
        const errorMessage = `BotUser[${userId} does not exists]`
        console.error(errorMessage)
        throw new DataNotFoundError(errorMessage)
      } else {
        resolve(doc.data() as BotUser)
      }
    })
  })
}

export function setBotUser(user: BotUser): Promise<void> {
  return new Promise(resolve => {
    console.log('Add user', user)
    usersRef.doc(user.id).set(Object.assign({}, user))
    resolve()
  })
}
