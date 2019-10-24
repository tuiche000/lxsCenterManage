<!--
 * @Description:
 * @Author: Ryan.HH
 * @Date: 2019-10-24 12:09:01
 * @LastEditors: Ryan.HH
 * @LastEditTime: 2019-10-24 12:09:01
 -->
<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="information" type="success">
      <router-view />
    </el-alert>
    <MyTable :value="arr" />
  </div>
</template>

<template>
</template>
<script>
import MyTable from '@/components/Table'

export default {
  name: '',
  components: { MyTable },
  props: {},
  data() {
    return {
      arr: [12, 5]
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
<style>
</style>

