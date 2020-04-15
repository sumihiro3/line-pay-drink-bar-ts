import { Router, Request, Response } from 'express'
import * as firebase from 'firebase-admin'
import { Item } from '~/types'

const router = Router()

const db = firebase.firestore()
const itemsRef = db.collection('items')

router.get('/items', async (req: Request, res: Response) => {
  console.debug(req.url, 'called!')
  const items: Array<Item> = await getItems()
  const result: Array<object> = []
  items.forEach((item: Item) => {
    // Convert to Item object to JSON
    result.push(Object.assign({}, item))
  })
  console.log('Return result', result)
  res.json(result)
})

function getItems(): Promise<Array<Item>> {
  return new Promise(resolve => {
    const items: Array<Item> = []
    // get Items from firestore
    itemsRef
      .where('active', '==', true)
      .get()
      .then(query => {
        query.forEach(doc => {
          const item: Item = doc.data() as Item
          items.push(item)
        })
        resolve(items)
      })
  })
}

export default router
