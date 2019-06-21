<template>
  <div>
    我是关联资源
    <isTravel v-if="isTravel" :product-id="productId" :product-type="productType" />
  </div>
</template>

<script>
import isTravel from './isTravel'
export default {
  components: { isTravel },
  filters: {

  },
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
  computed: {
    isTravel() {
      if (this.productType === '22' || this.productType === '60' || this.productType === '64') {
        return true
      } else {
        return false
      }
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

