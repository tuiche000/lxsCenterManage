<template>
  <div>
    <el-alert style="width:100%;" :closable="false" title="产品管理">
      <router-view />
    </el-alert>
  </div>
</template>
<style>
.el-alert__content{
  width:100%;
}
</style>
