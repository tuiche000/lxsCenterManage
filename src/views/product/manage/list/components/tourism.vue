<template>
  <div class="main_center flex_div">
    <div class="flex_auto div_card flex_div">
      <el-table ref="multipleTable" :data="list" stripe max-height="100%" class="div_card_mid flex_auto table_left_2 table_left_3" tooltip-effect="dark">
        <el-table-column type="index" label="序号" align="center" show-overflow-tooltip />
        <el-table-column prop="storeName" label="编号" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>第{{ scope.row.segmentNoName }}程</span>
          </template>
        </el-table-column>
        <el-table-column prop="storeName" align="center" label="开始时间">
          <template slot-scope="scope">
            <span>第{{ scope.row.dayNo }}天</span>
          </template>
        </el-table-column>
        <el-table-column label="天数" align="center">
          <template slot-scope="scope">
            <span>第{{ scope.row.durationDays }}天</span>
          </template>
        </el-table-column>
        <el-table-column prop="departureCityName" align="center" label="出发城市" show-overflow-tooltip />
        <el-table-column prop="arrivalCityName" align="center" label="目的城市" />
        <el-table-column fixed="right" align="center" label="操作" />
      </el-table>
    </div>
  </div>
</template>
<script>
import { productsegment } from '@/api/list'

export default {
  name: '',
  components: {},
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
      list: []
      // listTotal: 0

    }
  },
  computed: {},
  watch: {},
  created() {
    this.getList()
  },
  mounted() {},
  activated() {},
  methods: {
    getList() {
      if (this.productId) {
        productsegment({
          reqDtos: {
            productId: this.productId
          }
        }).then(res => {
          if (!res.hasError) {
            this.list = res.data
            // this.listTotal = res.paginationDTO.totalCount
          }
        })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
