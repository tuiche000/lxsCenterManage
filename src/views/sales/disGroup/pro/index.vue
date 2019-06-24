<template>
  <div class="flex_div">
    <div class="div_card">
      <div class="div_card_top">
        <div class="f2">
          <p>
            <span>筛选查询</span>
          </p>
        </div>
        <div class="fr">
          <span>筛选查询</span>
        </div>
      </div>
      <!-- <el-collapse-transition>
        <div>
          我是乱七八糟
        </div>
      </el-collapse-transition> -->
    </div>
    <div class="flex_auto div_card flex_div">
      <!-- <div class="div_card_top">
        <div class="f2">
          左边
        </div>
        <div class="fr">
          右边
        </div>
      </div> -->
      <el-table ref="multipleTable" stripe height="100%" class="div_card_mid flex_auto table_left_2 table_left_3" tooltip-effect="dark">
        <el-table-column type="selection" width="55" :selectable="selectable" />
        <el-table-column prop="storeId" label="门店编码" show-overflow-tooltip />
        <el-table-column prop="storeName" label="门店名称" width="130" show-overflow-tooltip />
        <el-table-column prop="storeName" label="门店营业段" width="200" />
        <el-table-column label="门店类型" width="120" />
        <el-table-column prop="address" label="地址" show-overflow-tooltip width="200" />
        <el-table-column prop="contactorTel" label="联系电话" width="120" />
        <el-table-column label="门店状态" />
        <el-table-column fixed="right" label="操作" width="100" />
      </el-table>
    </div>
    <el-pagination class="div_pagination" layout="total, sizes, prev, pager, next, jumper" />
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  activated() {},
  methods: {}
}
</script>
<style lang='scss' scoped>
</style>

<style lang='scss' scoped>
.el-alert__content{
  width:100%;
}
</style>
