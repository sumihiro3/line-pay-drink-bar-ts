<template lang="pug">
  v-layout(
    column
    justify-center
    align-center
  )
    v-flex(
      xs12
      sm12
      md12
      lg12
      xl12
    )
      item-list(
        :items="items"
        @purchaseItem="purchaseItem"
      )
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Profile } from '@line/bot-sdk'
import { nanoid } from 'nanoid'
import {
  initLiff,
  isLineLoggedIn,
  getLineProfile,
  liffLogin
} from '~/plugins/liff'
import { Item, BotUser, Order, DataNotFoundError } from '~/types'
import { getItems } from '~/utils/item'
import { setOrder } from '~/utils/order'
import { getBotUser, setBotUser } from '~/utils/user'

@Component({
  components: {
    ItemList: () => import('@/components/ItemList.vue')
  }
})
export default class Index extends Vue {
  profile: Profile | null = null
  user: BotUser | null = null
  liffInitialized: boolean = false
  componentKey: number = 0
  async asyncData(): Promise<object> {
    await console.log('LIFF_ID', process.env.LIFF_ID)
    await console.log('BASE_URL', process.env.BASE_URL)
    await console.log('API_BASE_URL', process.env.API_BASE_URL)
    // get items
    const items = await getItems()
    console.log('items', items)
    return {
      items
    }
  }

  async mounted() {
    if (this.liffInitialized === false) {
      await this.initializeLiff()
    }
    if (this.loggedIn() === false) {
      await this.doLogin()
    } else {
      this.profile = await getLineProfile()
      const userId = this.profile.userId
      const user = await this.getUser(userId)
      if (user) {
        this.user = user
      } else {
        console.log(`Add new user[${userId}]`)
        const newUser: BotUser = {
          id: userId,
          displayName: this.profile.displayName,
          pictureUrl: this.profile.pictureUrl,
          active: true
        }
        await setBotUser(newUser)
        this.user = newUser
      }
    }
  }

  async initializeLiff() {
    const pageLiffId = process.env.LIFF_ID || ''
    this.liffInitialized = await initLiff(pageLiffId)
  }

  loggedIn(): boolean {
    return isLineLoggedIn()
  }

  async doLogin() {
    await liffLogin()
    this.profile = await getLineProfile()
    this.componentKey += 1
  }

  getUser(userId: string): Promise<BotUser | null> {
    return new Promise(resolve => {
      getBotUser(userId)
        .then((user: BotUser) => {
          resolve(user)
        })
        .catch((error: DataNotFoundError) => {
          console.warn(`User[${userId}] does not exists`, error)
          resolve(null)
        })
    })
  }

  async purchaseItem(item: Item) {
    console.log(`purchase item: ${item}`)
    if (this.user) {
      console.log('do purchase!', this.user)
      const orderId = nanoid()
      const order: Order = new Order(orderId, this.user, item, item.name)
      await setOrder(order)
    }
    // TODO remove dummy data
    // const u: BotUser = {
    //   id: 'dummyUser',
    //   displayName: 'dummyName',
    //   active: true
    // }
    // const orderId = 'dummyOrderId999'
  }
}
</script>

<style lang="stylus">
.bg_red
  background-color #FF0000
</style>
