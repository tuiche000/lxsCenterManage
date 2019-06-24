<template>
  <div class=" flex_div">
    <tourism v-if="productType==22" :product-id="productId" :product-type="productType" />
    <hotelAssociatedResources v-if="productType == 23" :product-id="productId" :product-type="productType" />
  </div>
</template>

<script>

import hotelAssociatedResources from './hotelAssociatedResources'
import tourism from './tourism'

export default {
  components: { hotelAssociatedResources, tourism },
  filters: {},
  props: {
    productId: {
      type: String,
      default: '0'
    },
    productType: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
