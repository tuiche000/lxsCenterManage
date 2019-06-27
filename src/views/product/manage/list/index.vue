<template>
  <div class="app-container">
    <el-form ref="form" class="flex_around" :rules="formRules" :model="params.reqDtos" label-width="80px">
      <div style="width:94%;display:flex;flex-direction:column;">
        <div class="flex_around">
          <el-form-item label="产品ID:">
            <el-input v-model="params.reqDtos.productId" style="width: 110px;" class="filter-item" @keyup.enter.native="submitForm('form')" />
          </el-form-item>
          <el-form-item label="产品名称:">
            <el-input v-model="params.reqDtos.productName" style="width: 110px;" class="filter-item" @keyup.enter.native="submitForm('form')" />
          </el-form-item>
          <el-form-item label="产品类型:">
            <el-select v-model="params.reqDtos.type" clearable style="width: 110px" class="filter-item">
              <el-option v-for="item in productChildType" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="产品范围:">
            <el-select v-model="params.reqDtos.typeArea" clearable style="width: 110px" class="filter-item">
              <el-option v-for="item in productRange" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="所含资源ID:">
            <el-input v-model="params.reqDtos.resourceId" style="width: 110px;" class="filter-item" @keyup.enter.native="submitForm('form')" />
          </el-form-item>
          <el-form-item label="出发城市:" prop="departureCityTxt">
            <el-autocomplete
              v-model="params.reqDtos.departureCityTxt"
              style="width: 110px;"
              class="inline-input"
              :fetch-suggestions="querySearch"
              value-key="name"
              value="id"
              @select="((item)=>{handleSelect(item, 'departureCity')})"
            />
          </el-form-item>
        </div>
        <div class="flex_around">
          <el-form-item label="目的城市:" prop="destinationCityTxt">
            <el-autocomplete
              v-model="params.reqDtos.destinationCityTxt"
              style="width: 110px;"
              class="inline-input"
              :fetch-suggestions="querySearch"
              value-key="name"
              @select="((item)=>{handleSelect(item, 'destinationCity')})"
            />
          </el-form-item>
          <el-form-item label="售卖城市:" prop="sellingCityTxt">
            <el-autocomplete
              v-model="params.reqDtos.sellingCityTxt"
              style="width: 110px;"
              class="inline-input"
              :fetch-suggestions="querySearch"
              value-key="name"
              @select="((item)=>{handleSelect(item, 'sellingCity')})"
            />
          </el-form-item>
          <el-form-item label="产品副标题:">
            <el-input v-model="params.reqDtos.title" style="width: 110px;" class="filter-item" @keyup.enter.native="submitForm('form')" />
          </el-form-item>
          <el-form-item label="产品经理:" prop="employeeOwnerTxt">
            <el-autocomplete
              v-model="params.reqDtos.employeeOwnerTxt"
              style="width: 110px;"
              class="inline-input"
              :fetch-suggestions="nameSearch"
              value-key="name"
              @select="((item)=>{handleSelect(item, 'employeeOwner')})"
            />
          </el-form-item>
          <el-form-item label="制作状态:">
            <el-select v-model="params.reqDtos.typeEdit" clearable style="width: 110px" class="filter-item">
              <el-option v-for="item in typeEdit" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态:">
            <el-select v-model="params.reqDtos.typePublish" clearable style="width: 110px" class="filter-item">
              <el-option v-for="item in typePublish" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </div>
      </div>
      <el-button class="m-b-20" type="primary" icon="el-icon-search" @click="submitForm('form')" />
    </el-form>
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
      <el-table-column class="pointer" label="产品ID" prop="productId" align="center" width="80" />
      <el-table-column class="pointer" label="产品名称" prop="productName" align="center" width="150" show-overflow-tooltip />
      <el-table-column class="pointer" label="产品副标题" prop="title" align="center" width="150" show-overflow-tooltip />
      <el-table-column class="pointer" label="产品类型" min-width="60" align="center" prop="productTypeName" />
      <el-table-column class="pointer" label="出发城市" min-width="80" align="center" prop="departuretCityList" />
      <el-table-column class="pointer" label="目的城市" min-width="100" align="center" prop="arrivalCityList" />
      <el-table-column class="pointer" label="售卖城市" align="center" min-width="95" prop="saleCityList" />
      <el-table-column class="pointer" label="产品经理" class-name="status-col" align="center" min-width="100" prop="employeeOwner" />
      <el-table-column class="pointer" label="制作状态" min-width="100" align="center" prop="typeEditName" />
      <el-table-column class="pointer" label="发布状态" min-width="100" align="center" prop="typePublishName" />
      <el-table-column class="pointer" label="创建时间" min-width="150" align="center" prop="createTime" />
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="params.paginationDTO.pageNumber" :limit.sync="params.paginationDTO.pageSize" @pagination="getList" />

  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { getQueryInfoList, getQueryProductChildType, getCity, getNameQuery } from '@/api/list'

export default {
  name: 'ComplexTable',
  components: {
    Pagination
  },
  filters: {
  },
  data() {
    function isInArray(arr, value) {
      for (let i = 0; i < arr.length; i++) {
        if (value === arr[i].name) {
          return true
        }
      }
      return false
    }
    const validator1 = (rule, value, callback) => {
      if (!value)callback()
      if (isInArray(this.city, value)) {
        callback()
      } else {
        callback(new Error('请选择列表中已有选项'))
      }
    }
    const validator2 = (rule, value, callback) => {
      if (!value)callback()
      if (isInArray(this.name, value)) {
        callback()
      } else {
        callback(new Error('请选择列表中已有选项'))
      }
    }
    return {
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
      name: [],
      productChildType: [],
      productRange: [{ id: '', name: '全部' }, { id: '1', name: '国内' }, { id: '2', name: '出境' }, { id: '3', name: '入境' }],
      typeEdit: [{ id: '', name: '全部' }, { id: '1', name: '制作中' }, { id: '2', name: '制作完成' }],
      typePublish: [{ id: '', name: '全部' }, { id: '1', name: '发布成功' }, { id: '2', name: '未发布' }, { id: '3', name: '已下线' }, { id: '4', name: '发布中' }, { id: '5', name: '发布失败' }],
      formRules: {
        departureCityTxt: [
          { trigger: 'blur', validator: validator1 }
        ],
        destinationCityTxt: [
          { trigger: 'blur', validator: validator1 }
        ],
        sellingCityTxt: [
          { trigger: 'blur', validator: validator1 }
        ],
        employeeOwnerTxt: [
          { trigger: 'blur', validator: validator2 }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getcity()
    this.getName()
    this.queryProductChildType()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onSubmit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSelect(company, txt) {
      if (txt === 'employeeOwner') {
        this.params.reqDtos[txt] = this.name.find(item => item.name === company.name).id
      } else {
        console.log(this.params.reqDtos[txt + 'Txt'])
        this.params.reqDtos[txt] = this.city.find(item => item.name === company.name).id
      }
    },
    querySearch(queryString, cb) {
      var restaurants = this.city
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    nameSearch(queryString, cb) {
      var restaurants = this.name
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      if (results.length === 0) {
        console.log('没有符合项')
      }
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.name.indexOf(queryString) === 0)
      }
    },
    onSubmit() {
      this.params.paginationDTO.pageNumber = 1
      const { reqDtos } = this.params
      // 如果用户不点击输入建议 直接搜索 会导致没有对应的ID 所以需要便利一下 由于employeeOwner是产品经理id 所以对应的通过namefind
      const array = ['departureCity', 'destinationCity', 'sellingCity', 'employeeOwner']
      array.map((item, index) => {
        if (reqDtos[item + 'Txt'] && !item) {
          if (index === array.length) {
            reqDtos[item] = this.name.find(val => val.name === reqDtos.name).id
          } else {
            reqDtos[item] = this.city.find(val => val.name === reqDtos.name).id
          }
        }
      })
      this.getList()
    },
    rowDbclick(row) {
      console.log(row)
      this.$router.push({ path: 'listDetail', query: { detail: JSON.stringify(row) }})
    },
    /** 以下函数为请求接口函数 **/
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
    queryProductChildType() {
      getQueryProductChildType().then(res => {
        if (!res.hasError) {
          this.productChildType = res.data
        }
      })
    },
    getcity() {
      getCity({}).then(res => {
        if (!res.hasError) {
          this.city = res.data
        }
      })
    },
    getName() {
      getNameQuery({}).then(res => {
        if (!res.hasError) {
          this.name = res.data
        }
      })
    }
  }
}
</script>
<style lang='scss'>
  .right{
    text-align: right;
  }
  .flex_around{
    display: flex;
    justify-content: space-around;
  }
</style>

