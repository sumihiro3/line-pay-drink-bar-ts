import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { Item } from '~/types'

const database: firebase.firestore.Firestore = firebase.firestore()
const itemsRef: firebase.firestore.CollectionReference = database.collection(
  'items'
)

export function getItems(): Promise<Array<Item>> {
  return new Promise(resolve => {
    const items: Array<Item> = []
    itemsRef
      .where('active', '==', true)
      .get()
      .then(query => {
        query.forEach(doc => {
          items.push(doc.data() as Item)
        })
        resolve(items)
      })
  })
}

export function addItem(item: Item): void {
  console.log('Add item', item)
  itemsRef.doc(item.id).set(item)
}
