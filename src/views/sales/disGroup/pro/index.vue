<template>
  <div class="flex_div">
    <!-- <div class="div_card">
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
      <el-collapse-transition>
        <div>
          我是乱七八糟
        </div>
      </el-collapse-transition>
    </div> -->
    <div class="flex_auto div_card flex_div">
      <div class="div_card_top">
        <div class="f2">
          <el-button type="primary" @click="openDialog(null,3)">创建分销组</el-button>

        </div>
        <!-- <div class="fr">
          右边
        </div> -->
      </div>
      <el-table ref="table" row-key="agentId" :data="list" :tree-props="{children: 'drpPolicyAgentDTOS'}" tooltip-effect="dark">
        <el-table-column label="分组/成员" align="left" show-overflow-tooltip min-width="150">
          <template slot-scope="{row}">
            <span v-if="row.groupName">{{ row.groupName }}</span>
            <span v-if="row.companyName">{{ row.companyName }}</span>

          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="200">
          <template slot-scope="{row}">
            <el-button v-if="row.drpPolicyAgentDTOS" type="text" @click="openDialog(row,2)">分组重命名</el-button>

            <el-popover
              v-if="row.drpPolicyAgentDTOS"
              :ref="row.groupId"
              placement="bottom"
              width="200"
              trigger="click"
            >
              <p>确认要删除分销组吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="$refs[row.groupId].doClose()">取消</el-button>
                <el-button type="primary" size="mini" @click="delgroup(row.groupId)">确定</el-button>
              </div>
              <el-button slot="reference" type="text">删除分销组</el-button>
            </el-popover>

            <el-button v-if="row.companyName" type="text" @click="openDialog(row,1)">更换分销组</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <Pagination class="div_pagination" layout="total, sizes, prev, pager, next, jumper" /> -->
    <el-dialog
      :title="type==1?'请选择分组':'组名称'"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-select v-if="type==1" v-model="changeGroup" placeholder="请选择">
        <el-option
          v-for="item in Grouping"
          :key="item.groupId"
          :label="item.groupName"
          :value="item.groupId"
        />
      </el-select>
      <el-input v-else v-model="changeGroup" placeholder="请输入组名称" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="determine">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { getGrop, rename, changeGroupReq, deleteGropu, createGropu } from '@/api/sales'

// import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: '',
  // components: { Pagination },
  props: {},
  data() {
    return {
      type: 1,
      list: [],
      dialogVisible: false,
      visible: false,
      Grouping: [],
      changeGroup: '',
      changeId: null,
      changeGroupObj: {

      }
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
    openDialog(row, num) {
      this.type = num
      switch (num) {
        case 1:
          this.changeGroupObj = {
            'agentId': row.agentId,
            'sourceGroupId': row.groupId,
            'targetGroupId': 0
          }
          break
        case 2:
          this.changeId = row.groupId
          break
      }
      this.dialogVisible = true
    },
    handleClose() {
      this.changeGroup = ''
      this.dialogVisible = false
    },
    check(tit) {
      if (this.changeGroup === '') {
        this.$message({
          message: tit,
          type: 'warning'
        })
        return true
      }
    },
    reLoad(msg) {
      this.$message({
        message: msg,
        type: 'success'
      })
      this.getList()
      this.changeGroup = ''
      this.dialogVisible = false
    },
    /** 以下为接口 **/
    determine() {
      switch (this.type) {
        case 1:
          this.changeGroupObj.targetGroupId = this.changeGroup
          if (this.check('请选择分组')) break
          changeGroupReq(this.changeGroupObj).then(res => {
            if (!res.hasError) {
              this.reLoad(res.message)
            }
          })
          break
        case 2:
          if (this.check('请输入组名')) break
          rename({
            groupId: this.changeId,
            groupName: this.changeGroup
          }).then(res => {
            if (!res.hasError) {
              this.reLoad(res.message)
            }
          })
          break
        case 3:
          if (this.check('请输入组名')) break
          createGropu({
            groupName: this.changeGroup
          }).then(res => {
            if (!res.hasError) {
              this.reLoad(res.message)
            }
          })
      }
    },
    getList() {
      getGrop().then(res => {
        if (!res.hasError) {
          this.Grouping = []
          const newList = res.data || []
          newList.map(item => {
            this.Grouping.push({ groupName: item.groupName, groupId: item.groupId })
            if (item.drpPolicyAgentDTOS.length !== 0) {
              item.drpPolicyAgentDTOS.map(val => {
                val.groupId = item.groupId
              })
              item.children = item.drpPolicyAgentDTOS
            }
            item.agentId = item.groupId
          })
          console.log('获取到数据了')
          this.list = newList || []
          console.log(newList)
        }
      })
    },
    delgroup(id) {
      deleteGropu(id).then(res => {
        if (!res.hasError) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.getList()
          this.$refs[id].doClose()
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.el-alert__content{
  width:100%;
}
</style>
