<template>
  <div class="tab-container">
    <div class="div_card">
      <div class="div_card_top" style="background:#FFF;">
        <div class="f2">
          <p>
            <span>产品名称:{{ product.productName }}</span>
            <span>产品ID:{{ product.productId }}</span>
            <span>产品类型:{{ product.productTypeName }}</span>
          </p>
          <p>
            <span>制作状态:{{ product.typeEditName }}</span>
            <span>发布状态:{{ product.typePublishName }}</span>
          </p>
        </div>
        <div class="fr">
          <!-- <el-button type="primary">提交</el-button> -->
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <component :is="activeName" v-if="activeName==item.key" :product-id="product.productId" :product-type="product.productType" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import assResources from './components/assResources'
import distribution from './components/distribution'

export default {
  name: 'ProductManageListDetail',
  components: { assResources, distribution },
  data() {
    return {
      tabMapOptions: [
        { label: '关联资源', key: 'assResources' },
        { label: '分销组设置', key: 'distribution' }
      ],
      activeName: 'assResources',
      product: {}
    }
  },
  watch: {
    // activeName(val) {
    //   this.$router.push(`${this.$route.path}?tab=${val}`)
    // }
  },
  created() {
    this.product = JSON.parse(this.$route.query.detail)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.f2{
  span{
    color:#232728;
    margin-right:20px;
  }
}
</style>
