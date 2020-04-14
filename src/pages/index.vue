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
import {
  initLiff,
  isLineLoggedIn,
  getLineProfile,
  liffLogin
} from '~/plugins/liff'
import { BotUser, Item, Order } from '~/types'
import { getItems } from '~/utils/item'
import { setOrder, getOrder } from '~/utils/order'

@Component({
  components: {
    ItemList: () => import('@/components/ItemList.vue')
  }
})
export default class Index extends Vue {
  profile: Profile | null = null
  liffInitialized: boolean = false
  componentKey: number = 0
  async asyncData(): Promise<object> {
    await console.log('LIFF_ID', process.env.LIFF_ID)
    await console.log('BASE_URL', process.env.BASE_URL)
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
    if (this.liffInitialized === true && this.loggedIn() === true) {
      this.profile = await getLineProfile()
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

  async purchaseItem(item: Item) {
    console.log(`purchase item: ${item}`)
    // TODO remove dummy data
    const u: BotUser = {
      id: 'dummyUser',
      displayName: 'dummyName',
      active: true
    }
    const order: Order = new Order('dummyOrderId', u, item, item.name)
    await setOrder(order)

    // dummy
    try {
      const storedOrder = await getOrder(order.id)
      console.log(`stored order ${storedOrder.title}`)
    } catch (error) {
      console.warn(`Got error... ${error}`)
    }
  }
}
</script>

<style lang="stylus">
.bg_red
  background-color #FF0000
</style>
