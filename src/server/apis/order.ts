import { Router, Request, Response } from 'express'
import * as firebase from 'firebase-admin'
import { Order } from '~/types'

const router = Router()

const db = firebase.firestore()
const ordersRef = db.collection('orders')

router.post('/set', async (req: Request, res: Response) => {
  await console.debug(req.url, 'called!')
  const body = req.body
  console.log('Request Body', body)
  const order: Order = body as Order
  console.log('Parsed Order', order)
  await setOrder(order)
  res.json(body)
})

function setOrder(order: Order): Promise<void> {
  return new Promise(resolve => {
    console.log('Add order', order)
    ordersRef.doc(order.id).set(Object.assign({}, order))
    resolve()
  })
}

router.get('/get', async (req: Request, res: Response) => {
  await console.debug(req.url, 'called!')
  const orderId: string = req.query.o
  console.log('Requested orderId', orderId)
  const order: Order = await getOrder(orderId)
  console.log('Got Order', order)
  const orderJson = Object.assign({}, order)
  res.json(orderJson)
})

function getOrder(orderId: string): Promise<Order> {
  return new Promise(resolve => {
    const orderRef = ordersRef.doc(orderId)
    orderRef.get().then(doc => {
      if (!doc.exists) {
        const errorMessage = `Order[${orderId} does not exists]`
        console.error(errorMessage)
        // throw new DataNotFoundError(errorMessage)
      } else {
        resolve(doc.data() as Order)
      }
    })
  })
}

export default router
