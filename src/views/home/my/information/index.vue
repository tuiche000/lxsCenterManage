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
  computed() {},
  watch: {},
  created() {},
  mounted() {},
  activated() {},
  methods: {}
}
</script>
<style>
</style>

