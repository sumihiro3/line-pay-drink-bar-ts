import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { Order, DataNotFoundError } from '~/types'

const database: firebase.firestore.Firestore = firebase.firestore()
const ordersRef: firebase.firestore.CollectionReference = database.collection(
  'orders'
)

export function getOrder(orderId: string): Promise<Order> {
  return new Promise(resolve => {
    const orderRef = ordersRef.doc(orderId)
    orderRef.get().then(doc => {
      if (!doc.exists) {
        const errorMessage = `Order[${orderId} does not exists]`
        console.error(errorMessage)
        throw new DataNotFoundError(errorMessage)
      } else {
        resolve(doc.data() as Order)
      }
    })
  })
}

export function setOrder(order: Order): Promise<void> {
  return new Promise(resolve => {
    console.log('Add order', order)
    ordersRef.doc(order.id).set(Object.assign({}, order))
    resolve()
  })
}
