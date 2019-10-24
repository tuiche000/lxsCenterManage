
<template>
  <div>
    我是分销组设置
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
    // 自由行 跟团游 等相关业务
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

