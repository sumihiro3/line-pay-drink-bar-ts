// import * as firebase from 'firebase/app'
// import 'firebase/firestore'
// import { User } from '~/types'

// const database: firebase.firestore.Firestore = firebase.firestore()
// const usersRef: firebase.firestore.CollectionReference = database.collection(
//   'users'
// )

// export function getUsers(): Promise<Array<User>> {
//   return new Promise(resolve => {
//     const users: Array<User> = []
//     usersRef.get().then(query => {
//       query.forEach(doc => {
//         users.push(doc.data() as User)
//       })
//       resolve(users)
//     })
//   })
// }

// export function addUser(user: User): void {
//   console.log('Add user', user)
//   usersRef.doc(user.id).set(user)
// }
