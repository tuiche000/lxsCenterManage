<template>
  <div class="app-container">
    <div class="filter-container" style="display:flex;">
      <div style="width:90%;margin-right:2%;">
        <el-row :gutter="5">
          <el-col :span="4" class="right">
            <span>产品ID:</span>
            <el-input v-model="params.reqDtos.productId" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-col>
          <el-col :span="4" class="right">
            <span>产品名称:</span>
            <el-input v-model="params.reqDtos.productName" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-col>
          <el-col :span="4" class="right">
            <span>产品类型:*</span>
            <el-select v-model="params.reqDtos.type" clearable style="width: 110px" class="filter-item">
              <el-option v-for="item in productChildType" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-col>
          <el-col :span="4" class="right">
            <span>产品范围:</span>
            <el-select v-model="params.reqDtos.typeArea" clearable style="width: 110px" class="filter-item">
              <el-option v-for="item in productRange" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-col>
          <el-col :span="4" class="right">
            <span>所含资源ID:</span>
            <el-input v-model="params.reqDtos.resourceId" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-col>
          <el-col :span="4" class="right">
            <span>出发城市:*</span>
            <!-- <el-input v-model="params.reqDtos.title" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" /> -->
            <el-autocomplete
              v-model="params.reqDtos.title"
              style="width: 110px;"
              class="inline-input"
              :fetch-suggestions="querySearch()"
              placeholder="请输入出发城市"
              select-when-unmatched
              @select="handleSelect"
            />
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="4" class="right">
            <span>目的城市:*</span>
            <el-input v-model="params.reqDtos.title" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-col>
          <el-col :span="4" class="right">
            <span>售卖城市:*</span>
            <el-input v-model="params.reqDtos.title" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-col>
          <el-col :span="4" class="right">
            <span>产品副标题:</span>
            <el-input v-model="params.reqDtos.title" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-col>
          <el-col :span="4" class="right">
            <span>产品经理:*</span>
            <el-input v-model="params.reqDtos.title" style="width: 110px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-col>
          <el-col :span="4" class="right">
            <span>制作状态:</span>
            <el-select v-model="params.reqDtos.typeEdit" clearable style="width: 110px" class="filter-item">
              <el-option v-for="item in typeEdit" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-col>
          <el-col :span="4" class="right">
            <span>发布状态:</span>
            <el-select v-model="params.reqDtos.typePublish" clearable style="width: 110px" class="filter-item">
              <el-option v-for="item in typePublish" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-col>
        </el-row>
      </div>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" />
      <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button> -->
      <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button> -->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @row-dblclick="rowDbclick"
    >
      <el-table-column label="产品ID" prop="productId" align="center" width="80" />
      <el-table-column label="产品名称" prop="productName" align="center" width="150" show-overflow-tooltip />
      <el-table-column label="产品副标题" prop="title" align="center" width="150" show-overflow-tooltip />
      <el-table-column label="产品类型" min-width="60" align="center" prop="productTypeName">
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="出发城市" min-width="80" align="center" prop="departuretCityList">
        <!-- <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.reviewer }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="目的城市" min-width="100" align="center" prop="arrivalCityList">
        <!-- <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template> -->
      </el-table-column>
      <el-table-column label="售卖城市" align="center" min-width="95" prop="saleCityList">
        <!-- <template slot-scope="{row}">
          <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{ row.pageviews }}</span>
          <span v-else>0</span>
        </template> -->
      </el-table-column>
      <el-table-column label="产品经理" class-name="status-col" align="center" min-width="100" prop="employeeOwner">
        <!-- <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template> -->
      </el-table-column>
      <el-table-column label="制作状态" min-width="100" align="center" prop="typeEditName" />
      <el-table-column label="发布状态" min-width="100" align="center" prop="typePublishName" />
      <el-table-column label="创建时间" min-width="150" align="center" prop="createTime" />
      <!-- <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
            Publish
          </el-button>
          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            Draft
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(row,'deleted')">
            Delete
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- <el-pagination class="div_pagination" layout="total, sizes, prev, pager, next, jumper" /> -->

    <pagination v-show="total>0" :total="total" :page.sync="params.paginationDTO.pageNumber" :limit.sync="params.paginationDTO.pageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

// import { getQueryInfoList, getQueryProductChildType, getCity } from '@/api/list'
import { getQueryInfoList, getQueryProductChildType } from '@/api/list'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      params: {
        paginationDTO: {
          pageNumber: 1,
          pageSize: 20
        },
        reqDtos: {
          departureCity: '',
          destinationCity: '',
          employeeOwner: '',
          productId: '',
          productName: '',
          resourceId: '',
          sellingCity: '',
          sortType: '',
          sortValue: '',
          title: '',
          type: '',
          typeArea: '',
          typeEdit: '',
          typePublish: ''
        }
      },
      city: [],
      productChildType: [],
      productRange: [{ id: '', name: '全部' }, { id: '1', name: '国内' }, { id: '2', name: '出境' }, { id: '3', name: '入境' }],
      typeEdit: [{ id: '', name: '全部' }, { id: '1', name: '制作中' }, { id: '2', name: '制作完成' }],
      typePublish: [{ id: '', name: '全部' }, { id: '1', name: '发布成功' }, { id: '2', name: '未发布' }, { id: '3', name: '已下线' }, { id: '4', name: '发布中' }, { id: '5', name: '发布失败' }],
      restaurants: [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' }
      ]
    }
  },
  created() {
    this.getList()
    this.queryProductChildType()
  },
  methods: {
    // 测试用
    handleSelect(item) {
      console.log(item)
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      if (results.length === 0) {
        console.log('没有符合项')
      }
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 结束
    getList() {
      this.listLoading = true
      getQueryInfoList(this.params).then(response => {
        this.list = response.data
        this.total = response.paginationDTO.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      // this.listQuery.page = 1
      this.params.paginationDTO.pageNumber = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    /**
     * 以下是新增函数
     * @Date: 2019-06-19 11:06:24
     */
    rowDbclick(row) {
      console.log(row)
      this.$router.push({ path: 'listDetail', query: { detail: JSON.stringify(row) }})
    },
    queryProductChildType() {
      getQueryProductChildType().then(res => {
        if (!res.hasError) {
          this.productChildType = res.data
        }
      })
    }
    // getcity() {
    //   getCity().then(res => {
    //     if (!res.hasError) {
    //       this.city = res.data
    //     }
    //   })
    // }
  }
}
</script>
<style lang='scss'>
  .right{
    text-align: right;
  }
</style>

