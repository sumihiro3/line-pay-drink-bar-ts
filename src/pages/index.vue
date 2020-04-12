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
import { getItems } from '~/utils/item'

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
}
</script>

<style lang="stylus">
.bg_red
  background-color #FF0000
</style>
