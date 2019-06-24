<template>
  <div style="height:100%">
    <el-alert :closable="false" title="分销组设置">
      <router-view />
    </el-alert>
  </div>
</template>
<style>
.el-alert__content{
  width:100%;
}
</style>
