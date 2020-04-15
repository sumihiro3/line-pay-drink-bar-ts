import axios from 'axios'
import { Order } from '~/types'

export function getOrder(orderId: string): Promise<Order> {
  return new Promise(resolve => {
    axios
      .get(`${process.env.API_BASE_URL}/api/order/get?o=${orderId}`)
      .then(result => {
        // console.log('API Result', result)
        const order: Order = result.data
        resolve(order)
      })
  })
}

export function setOrder(order: Order): Promise<void> {
  return new Promise(resolve => {
    console.log('Add order', order)
    const orderJson = Object.assign({}, order)
    axios.post(`${process.env.API_BASE_URL}/api/order/set`, orderJson)
    resolve()
  })
}
