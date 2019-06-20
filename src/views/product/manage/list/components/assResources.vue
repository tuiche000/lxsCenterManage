<template>
  <div class="main_center flex_div">
    <div class="flex_auto div_card flex_div">
      <!-- 2019-06-19先通过产品type条件渲染 后期优化 -->
      <el-table v-if="productType==22" ref="multipleTable" :data="list" stripe height="100%" class="div_card_mid flex_auto table_left_2 table_left_3" tooltip-effect="dark">
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
        <!-- <el-table-column label="已绑定资源" /> -->
        <el-table-column fixed="right" align="center" label="操作" />
      </el-table>

      <el-table v-if="productType==23" ref="multipleTable" :data="list" stripe height="100%" class="div_card_mid flex_auto table_left_2 table_left_3" tooltip-effect="dark">
        <el-table-column type="index" label="序号" align="center" />
        <el-table-column prop="resourceId" label="资源ID" align="center" />
        <el-table-column prop="resourceId" label="别名" align="center" show-overflow-tooltip />

        <el-table-column prop="resourceName" align="center" label="资源名称" />
        <el-table-column prop="supplierName" align="center" label="供应商" show-overflow-tooltip />
        <el-table-column prop="employeeOwner" align="center" label="产品经理" show-overflow-tooltip />
        <el-table-column align="center" label="人群类型">
          <template slot-scope="scope">
            <span v-for="(item,index) in scope.row.peopleTypeName" :key="index">{{ item }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="已绑定资源" /> -->
        <el-table-column fixed="right" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="distributionPrice(scope.row)">分销价格</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="listTotal>0" :total="listTotal" :page.sync="listPageNum" :limit.sync="listPageSize" @pagination="getList" />

    </div>
    <el-dialog title="行程分销政策" :visible.sync="dialogTableVisible">
      <el-table tooltip-effect="dark" :data="gridData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="分组/成员" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.groupName }}</span>
            <el-button v-if="scope.row.groupId !=1" type="text">查看成员</el-button>
          </template>
        </el-table-column>
        <el-table-column label="分销价" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.num?scope.row.num:'--' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否有效">
          <template slot-scope="scope">
            <span>{{ scope.row.status?'有效':'无效' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="reviseDisPri(scope.row)">调整分销价格</el-button>
            <el-button type="text" @click="setInvalid(scope.row)">{{ scope.row.status?'设置为无效':'设置为有效' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        width="50%"
        title="调整分销价格"
        center
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-checkbox-group
          v-model="checkList"
          :min="0"
          :max="1"
        >
          <div class="flex m-b-20">
            <el-checkbox label="固定金额" />
            <el-select v-model="checkListParams.type" style="width:200px;" size="small" placeholder="请选择">
              <el-option
                v-for="item in selectList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
            <el-input v-model="checkListParams.amount" v-enterNumber style="width:200px;margin-left:10px;" size="small" placeholder="请输入内容" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))">
              <template slot="append">元</template>
            </el-input>
          </div>
          <div class="flex m-b-20">
            <el-checkbox label="百分比" />
            <el-select v-model="checkListParams.type1" style="width:200px;" size="small" placeholder="请选择">
              <el-option
                v-for="item in selectList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
            <el-input v-model="checkListParams.amount1" v-only-number="{max:100,min:0,precision:0}" style="width:200px;margin-left:10px;" size="small" placeholder="请输入内容">
              <template slot="append">%</template>
            </el-input>
          </div>
        </el-checkbox-group>
        <ul>
          <li class="center">选择固定金额：分销价=商品原价+固定金额       （固定金额可以为负值）</li>
          <li class="center">选择百分比：   分销价=商品原价*（1+百分比）（百分比可以为负值）</li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button style="min-width:200px;" type="primary" @click="innerVisible = false">保 存</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { productsegment, queryTheSingleSegment, queryPslDrpPolicy, updatePslDrpPolicyStatus } from '@/api/list'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  directives: {
    'enterNumber': {
      inserted: function(el) {
        el.addEventListener('keypress', function(e) {
          e = e || window.event
          const charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode
          const re = /\d/
          if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
            if (e.preventDefault) {
              e.preventDefault()
            } else {
              e.returnValue = false
            }
          }
        })
      }
    }
  },
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
      list: [],
      gridData: [],
      listTotal: 0,
      listPageNum: 1,
      listPageSize: 20,
      dialogTableVisible: false,
      innerVisible: false,
      checkList: [],
      checkListParams: {
        type: null,
        type1: null,
        amount: null,
        amount1: null
      },
      selectList: [{ id: '1', name: '增加' }, { id: '2', name: '减少' }]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      if (this.productId) {
        switch (this.productType) {
          case '22': // 自由行
            productsegment({
              reqDtos: {
                productId: this.productId
              }
            }).then(res => {
              if (!res.hasError) {
                this.list = res.data
              }
            })
            break
          case '23':// 酒店
            queryTheSingleSegment({
              paginationDTO: { pageSize: 20, pageNumber: 1 },
              reqDtos: { sortType: '', sortValue: '', productId: this.productId }
            }).then(res => {
              if (!res.hasError) {
                this.list = res.data || []
                this.listTotal = res.paginationDTO.totalCount
              }
            })
            break
          default:
            break
        }
      }
    },
    distributionPrice(row) {
      this.dialogTableVisible = true
      console.log(row)
      queryPslDrpPolicy({
        reqDtos: {
          productId: row.productId,
          resourceId: row.resourceId,
          segmentId: row.segmentLnkId
        }
      }).then(res => {
        console.log(res)
        this.gridData = res.data || []
      })
    },
    // 调整分销价格
    reviseDisPri(row) {
      this.innerVisible = true
    },
    // 设置有无效
    setInvalid(row) {
      console.log(row)
      const { groupId, num, status, type, productId, resourceId, segmentId } = row
      const agentIds = row.drpPolicyAgentDTOS.map(item => item.agentId).join(',')
      const params = {
        reqDtos: {
          agentIds,
          productId,
          resourceId,
          segmentId,
          groupId,
          num,
          status,
          type
        }
      }
      updatePslDrpPolicyStatus(params).then(res => {
        if (!res.hasError) {
          this.$message({
            message: res.message,
            type: 'success'
          })
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      })
    },
    handleSelectionChange(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-checkbox-group{
  .flex{
    display:flex;
    align-items: center;
    justify-content: space-around;
  }
  .el-checkbox{
    width:100px;
  }
}
.center{
  text-align: center;
}

</style>
