<!--
 * @Description:
 * @Author: Ryan.HH
 * @Date: 2019-10-24 13:30:45
 * @LastEditors: Ryan.HH
 * @LastEditTime: 2019-10-24 13:30:45
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang='scss'>
  @import 'colorManage';
  @import './common';
  // 某些浏览器下table 表头错位
  body .el-table th.gutter{
    display: table-cell!important;
}
</style>
