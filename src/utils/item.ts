import axios from 'axios'
import { Item } from '~/types'

export function getItems(): Promise<Array<Item>> {
  return new Promise(resolve => {
    axios.get(`${process.env.API_BASE_URL}/api/item/items`).then(result => {
      // console.log('API Result', result)
      const items: Array<Item> = result.data
      resolve(items)
    })
  })
}
