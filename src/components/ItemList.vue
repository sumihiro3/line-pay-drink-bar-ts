<template lang="pug">
  v-container(fluid)
    v-row(dense)
      v-col(
        v-for="(item) in items"
        :key="item.id"
        cols="12"
      )
        v-card(color="#f4f4f4")
          div.d-flex.flex-no-wrap
            v-avatar.ma-1.mt-6(
              tile
              size="100"
            )
              v-img(
                :src="item.thumbnailUrl"
              )
            div
              v-card-title.title.pl-0
                | {{ item.name }}
              v-card-subtitle.pb-0.pl-1
                | {{ item.description }}
              v-card-actions
                div.pl-2.mb-6.mt-4
                  v-btn(
                    color="info"
                    large
                    @click="purchaseItem(item)"
                  )
                    | 購入する（{{ item.unitPrice }} 円）
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Item } from '~/types'

@Component
export default class ItemList extends Vue {
  @Prop({ type: Array, required: true }) readonly items!: Array<Item>

  purchaseItem(item: Item) {
    this.$emit('purchaseItem', item)
  }
}
</script>

<style>
.v-card {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0),
    0px 0px 0px 0px rgba(0, 0, 0, 0);
}
</style>
