<template>
  <div class="main_center flex_div">
    <div class="flex_auto div_card flex_div">
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
    </div>
    <pagination v-show="listTotal>0" :total="listTotal" :page.sync="listPageNum" :limit.sync="listPageSize" @pagination="getList" />

    <el-dialog :visible.sync="dialogTableVisible">
      <span slot="title" class="dialog-footer">
        <div class="x-flex-container between">
          <h3 style="font-size:18px;color:#303133;">分销价格</h3>
          <el-button style="min-width:100px;" class="m-r-30" type="primary" plain @click="batch">批量调整分销价格</el-button>
        </div>
      </span>
      <el-table tooltip-effect="dark" :data="gridData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="分组/成员" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.groupName }}</span>
            <el-button v-if="scope.row.groupId !=1" type="text" @click="openMemberList(scope.row)">查看成员</el-button>
          </template>
        </el-table-column>
        <el-table-column label="分销价" width="200">
          <template slot-scope="scope">
            <span>{{ !scope.row.num?'--':scope.row.type==1?scope.row.num+'元': scope.row.num+'%' }}</span>
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
            <el-checkbox :label="1">固定金额</el-checkbox>
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
            <el-checkbox :label="2">百分比</el-checkbox>
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
          <el-button style="min-width:200px;" type="primary" @click="saveForm">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog title="查看成员" width="30%" :visible.sync="memberState" append-to-body>
        <el-table :data="memberList">
          <el-table-column property="agentId" label="ID" min-width="150" />
          <el-table-column property="companyName" label="代理商成员" min-width="200" show-overflow-tooltip />
        </el-table>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { queryTheSingleSegment, queryPslDrpPolicy, updatePslDrpPolicyStatus, savePslDrpPolicy, batchSavePslDrpPolicy } from '@/api/list'
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
      memberList: [],
      listTotal: 0,
      listPageNum: 1,
      listPageSize: 20,
      dialogTableVisible: false, // 最大弹框状态
      innerVisible: false, // 嵌套弹窗状态
      memberState: false, // 查看成员弹窗状态
      checkList: [],
      checkListParams: {
        type: null,
        type1: null,
        amount: null,
        amount1: null
      },
      openType: '', // 打开方式 单个为1 批量为2
      selectList: [{ id: '1', name: '增加' }, { id: '2', name: '减少' }],
      batchAdjustPrice: '', // 批量调整分销对象包含代理商合集
      adjustPrice: {}, // 调整分销价格对象
      distributionPriceList: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    saveForm() {
      if (this.checkList.length === 0) {
        this.$message('请选择调整方式')
        return false
      }
      switch (this.checkList[0]) {
        case 1:// 固定金额
          if (this.isNull(this.checkListParams.type) || this.isNull(this.checkListParams.amount)) {
            this.$message({
              message: '请输入规则',
              type: 'warning'
            })
            return false
          }
          this.openType === 1 ? this.sendPsl(1) : this.batchSendPsl(1)
          break
        case 2:// 比例
          if (this.isNull(this.checkListParams.type1) || this.isNull(this.checkListParams.amount1)) {
            this.$message({
              message: '请输入规则',
              type: 'warning'
            })
            return false
          }
          this.openType === 1 ? this.sendPsl(2) : this.batchSendPsl(2)
          break
      }
    },
    // 查看成员
    openMemberList(row) {
      this.memberList = row.drpPolicyAgentDTOS
      this.memberState = true
    },
    /** 验证是否为null **/
    isNull(val) {
      if (val === null || val === undefined || val === '' || val === 'null' || val === 'undefined') {
        return true
      } return false
    },
    // 调整分销价格
    reviseDisPri(row) {
      this.openType = 1
      this.adjustPrice = row
      this.innerVisible = true
    },
    // 列表选择框变动
    handleSelectionChange(val) {
      console.log(val)
      var agentIds = val.map(item => item.drpPolicyAgentDTOS.map(v2 => v2.agentId).join(',')).join(',')
      this.batchAdjustPrice = {
        'reqDtos': {
          'agentIds': agentIds,
          'num': '',
          'productId': this.distributionPriceList.productId,
          'resourceId': this.distributionPriceList.resourceId,
          'segmentId': this.distributionPriceList.segmentLnkId,
          'type': ''
        }
      }
      console.log(this.batchAdjustPrice)
    },
    // 打开批量调整分销价格
    batch() {
      if (this.batchAdjustPrice.reqDtos && this.batchAdjustPrice.reqDtos.agentIds) {
        this.openType = 2
        this.innerVisible = true
      } else {
        this.$message('请选择分组')
      }
    },
    getmodifyNum(type) {
      var num
      if (type === 1) {
        num = this.checkListParams.type === '1' ? (this.checkListParams.amount * 1) : -(this.checkListParams.amount * 1)
      } else if (type === 2) {
        num = this.checkListParams.type1 === '1' ? (this.checkListParams.amount1 * 1) : -(this.checkListParams.amount1 * 1)
        // 由于过滤器有问题 ui正常 e.target.value也是正确的 但是v-model值错误 手动更新
        if (num > 100)num = 100
        if (num < -100)num = -100
      }
      return num
    },
    /** 以下为调接口 **/
    getList() {
      if (this.productId) {
        queryTheSingleSegment({
          paginationDTO: { pageSize: 20, pageNumber: 1 },
          reqDtos: { sortType: '', sortValue: '', productId: this.productId }
        }).then(res => {
          if (!res.hasError) {
            this.list = res.data || []
            this.listTotal = res.paginationDTO.totalCount
          }
        })
      }
    },
    // 单个发起修改请求
    sendPsl(type) {
      console.log(this.adjustPrice)
      var agentIds = this.adjustPrice.drpPolicyAgentDTOS.map(item => item.agentId).join(',')
      var { groupId, productId, resourceId, segmentId, status } = this.adjustPrice
      var num = this.getmodifyNum(type)
      var params = {
        reqDtos: {
          agentIds,
          groupId,
          num,
          productId,
          resourceId,
          segmentId,
          status,
          type
        }
      }
      savePslDrpPolicy(params).then(res => {
        console.log(res)
        if (!res.hasError) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.distributionPrice(this.distributionPriceList)
          this.innerVisible = false
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      })
    },
    // 批量发起修改请求
    batchSendPsl(type) {
      var num = this.getmodifyNum(type)
      this.batchAdjustPrice.reqDtos.num = num
      this.batchAdjustPrice.reqDtos.type = type
      console.log(this.batchAdjustPrice)
      batchSavePslDrpPolicy(this.batchAdjustPrice).then(res => {
        if (!res.hasError) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.distributionPrice(this.distributionPriceList)
          this.innerVisible = false
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      })
    },
    // 获取行程分销政策列表
    distributionPrice(row) {
      this.distributionPriceList = row
      this.dialogTableVisible = true
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
    // 设置有无效
    setInvalid(row) {
      const { groupId, num, status, type, productId, resourceId, segmentId } = row
      const agentIds = row.drpPolicyAgentDTOS.map(item => item.agentId).join(',')
      const changeSte = status === 1 ? 0 : 1
      const params = {
        reqDtos: {
          agentIds,
          productId,
          resourceId,
          segmentId,
          groupId,
          num,
          status: changeSte,
          type
        }
      }
      updatePslDrpPolicyStatus(params).then(res => {
        if (!res.hasError) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          // 刷新列表
          this.distributionPrice({
            productId,
            resourceId,
            segmentLnkId: segmentId
          })
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-checkbox-group{
  .el-checkbox{
    width:100px;
  }
}
.center{
  text-align: center;
}
.flex{
    display:flex;
    align-items: center;
    justify-content: space-around;
  }
</style>
