<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="操作日志" type="success">
      <router-view />
    </el-alert>
  </div>
</template>
