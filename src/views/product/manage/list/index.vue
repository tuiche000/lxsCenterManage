<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="产品列表" type="success">
      <router-view />
    </el-alert>
  </div>
</template>
