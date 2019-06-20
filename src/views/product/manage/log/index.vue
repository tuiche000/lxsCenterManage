<template>
  <div class="main_center flex_div">
    <div class="div_card">
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
    </div>
    <div class="flex_auto div_card flex_div">
      <div class="div_card_top">
        <div class="f2">
          左边
        </div>
        <div class="fr">
          右边
        </div>
      </div>
      <el-table ref="multipleTable" stripe height="100%" class="div_card_mid flex_auto table_left_2 table_left_3" tooltip-effect="dark">
        <el-table-column type="selection" width="55" :selectable="selectable" />
        <el-table-column prop="storeId" label="门店编码" show-overflow-tooltip />
        <el-table-column prop="storeName" label="门店名称" width="130" show-overflow-tooltip />
        <el-table-column prop="storeName" label="门店营业段" width="200" />
        <el-table-column label="门店类型" width="120" />
        <el-table-column prop="address" label="地址" show-overflow-tooltip width="200" />
        <el-table-column prop="contactorTel" label="联系电话" width="120" />
        <el-table-column label="门店状态" />
        <el-table-column fixed="right" label="操作" width="100" />
      </el-table>
    </div>
    <el-pagination class="div_pagination" layout="total, sizes, prev, pager, next, jumper" />
  </div>
</template>
<script>
export default {
  name: 'ProductManageLog',
  components: {},
  props: {},
  data() {
    return {
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
// <style lang='scss'>
// // 全局配色相关
// $body_bg: #4A90E2;
// $grey: #999999;
// $light_grey: #eaedf1;
// $e4e4: #ebeef5;
// $form: #333333;
// $white: #ffffff;
// $dark_grey: #464C5B;
// $min_width: 1000px;
// $e2ea3: #55b6ff;
// $ea: #9ea7b4;
// $f9: #f9faff;
// $red: #f56c6c;
// $border_color: #D8DCE6;
// $error_color: #FF6060;
// $label_color: #83858e;
// $table_color: #303343;
// $table_bg: #f3f3f3;
// $new_btn_color: #6CA62D;
// $form_bg: #f4f4f4;
// $div_card_top_error: #787878;
// $div_card_top_edit: #787878;
// $div_card_top_color: #333;

// //结束
// body,
// button,
// h1,
// h2,
// h3,
// h4,
// h5,
// h6,
// html,
// img,
// input,
// li,
// ol,
// p,
// textarea,
// ul {
//   padding: 0;
//   margin: 0;
// }

// li,
// ol,
// ul {
//   list-style: none;
// }

// i {
//   font-style: inherit;
// }

// #app,
// html {
//   font-family: "Microsoft YaHei", "微软雅黑", Helvetica, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", Arial, sans-serif;
//   height: 100%;
//   min-width: $min_width;
// }

// body {
//   background: $white;
//   font-size: 12px;
//   color: #333;
//   height: 100%;
//   width: 100%;
// }

// button,
// input,
// textarea {
//   border: none;
//   outline: none;
// }

// .icon {
//   width: 20px;
//   height: 20px;
//   vertical-align: -0.45em;
//   fill: currentColor;
//   overflow: hidden;
// }

// b {
//   font-weight: normal;
//   font-size: 12px;
// }
// //
// //#app {
// //  font-family: "Helvetica Neue","Hiragino Sans GB","Microsoft YaHei","\9ED1\4F53",Arial,sans-serif;
// //  -webkit-font-smoothing: antialiased;
// //  -moz-osx-font-smoothing: grayscale;
// //  color: #2c3e50;
// //}
// .show_line1, .show_line2 {
//   overflow: hidden;
//   display: -webkit-box !important;
//   -webkit-line-clamp: 1;
//   /* autoprefixer: off */
//   -webkit-box-orient: vertical;
//   /* autoprefixer: on */
// }

// .show_line2 {
//   -webkit-line-clamp: 2;
// }
// .el-popover{
//   top:0;
//   padding: 8px 6px !important;
// }
// .my_loading{
//   position: fixed !important;
//   z-index: 10000;
//   width: 100%;
//   top:0;
//   left:0;
//   .el-progress-bar__outer{
//     height:2px !important;
//   }
// }
// .main_css {
//   overflow-y: hidden;
//   display: flex;
//   height: 100vh;
//   flex-direction: column;
// }

// .main_csas {
//   height: 100%;
//   display: flex;
//   flex-wrap: nowrap;
// }

// .main_asc {
//   height: 100%;
//   overflow-x: auto;
//   flex-direction: column;
//   display: flex;
//   padding-bottom: 0;
//   width: 100%;
//   position: relative;
//   box-sizing: border-box;
//   >div:nth-child(2){
//     overflow: auto;
//     flex:1;
//   }
// }

// .main_center {
//   padding: 0 20px;
// }

// .page_css {
//   text-align: center;
// }

// .clearfix:after {
//   content: "";
//   display: block;
//   clear: both;
// }

// .fl {
//   float: left !important;
// }

// .fr {
//   float: right !important;
// }

// .te_center {
//   text-align: center;
// }

// .bg_button {
//   min-width: 100px;
//   background-color: $body_bg;
//   color: $white;
//   border: none;
// }

// .buttons {
//   text-align: center;
//   margin-top: 20px;
//   margin-bottom: 30px;
// }

// .el-checkbox__input.is-checked .el-checkbox__inner {
//   background-color: $body_bg !important;
//   border-color: $body_bg !important;
// }

// .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
//   border-color: $white;
// }

// .screen_table {
//   border: 1px solid $e4e4;
//   border-top: none;
//   margin-bottom: 20px;
//   text-align: left;
// }

// .screen {
//   height: 50px;
//   line-height: 48px;
//   background: inherit;
//   background-color: rgba(243, 243, 243, 1);
//   box-sizing: border-box;
//   border-top: 1px solid $e4e4;
//   border-radius: 0;
//   -moz-box-shadow: none;
//   -webkit-box-shadow: none;
//   box-shadow: none;
//   text-align: left;
//   padding: 0 20px;

//   .screen_title {
//   }

//   .screen_query {
//     display: inline-block;
//     margin-right: 20px;
//     color: $grey;
//   }

//   .screen_type {
//     display: inline-block;
//     width: 100px;
//   }
// }

// .screen_select {
//   padding: 20px 20px 0;
// }

// .cell {
//   text-align: center;
// }

// .postListDetail {
//   width: 400px;
//   padding: 30px;
//   margin: 0 auto;
//   .el-input {
//     width: 200px;
//   }
// }
// // 删除 禁用等 敏感 popover 样式
// .del_popover{
//   p{text-align: center !important;margin-bottom:10px !important;color:$error_color !important}
//   div{text-align: center !important}
//   .del_popover_btn{background:$error_color !important;color:#fff !important;border:none !important;}
// }
// // 禁用和删除按钮颜色
// .error_text{color: $error_color !important}
// .new_btn_text{color: $new_btn_color !important}
// // 对话框样式
// .el-dialog__body {
//   padding: 5px 10px;
// }
// .detail_css {
//   margin: 16px;
//   label {
//     padding-bottom: 0 !important;
//   }
//   .input_css {
//     width: 300px;
//   }
// }
// // flex 布局
// .flex_div{
//   display: flex;
//   flex-direction: column;
//   >.flex_auto{ flex: 1; overflow: auto;}
//   /****修复底部按钮不显示问题****/
//   >.flex_auto2{ flex: .15; overflow: auto;}
// }

// // 分页样式
// .div_pagination{
//   text-align: right;
//   padding-bottom: 10px;
// }
// // div 样式
// .div_card{
//   margin-bottom:10px;
//   border-radius: 4px; border:1px solid $e4e4;
//   .el-form{
//     padding:10px 10px 0;font-size: 12px;
//     label{font-size: 12px;}
//   }
//   .width200{width:200px}
//   .width150{width:150px}
//   .width25{width:25px}
//   .width75{width:75px}
//   .width100{width:100px}
//   .div_card_top{
//     color:$div_card_top_color; background: $table_bg;padding:8px 15px;
//     &:after{content: '';display:block;clear:both;}
//     >.fl>*{margin: 0;margin-right: 2px;}
//     >.fr>.el-icon-close{font-size: 18px;color:$ea}
//     >.f2>*{margin: 0;margin-right: 2px;float: left;line-height: 14px;display: inline-block;}
//     .el-button{color: #606266}
//     .el-select input::-webkit-input-placeholder,.el-cascader input::-webkit-input-placeholder{color:#606266;font-weight: normal;}
//     .el-icon-delete{color:$div_card_top_error}
//     .el-icon-edit{color:$div_card_top_edit}
//   }
//   .el-table .el-icon-delete{color:#A9A9A9}
//   .el-table .el-icon-edit{color:#A9A9A9}
//   .el-table .el-icon-view{color:#A9A9A9}
//   .el-table:before{ height:0px; }
//   .el-table__fixed-right:before{height:0px;}
//   .el-table tbody td {border:none}
//   .el-table .cell{
//     text-align: center;
//     .is-disabled{opacity: .6;}
//   }
//   .table_left_1 tr>td:nth-child(1)>.cell{text-align: left}
//   .table_left_1 tr>th:nth-child(1)>.cell{text-align: left}
//   .table_left_2 tr>th:nth-child(2)>.cell{text-align: left}
//   .table_left_2 tr>td:nth-child(2)>.cell{text-align: left}
//   .table_left_3 tr>th:nth-child(3)>.cell{text-align: left}
//   .table_left_3 tr>td:nth-child(3)>.cell{text-align: left}
//   .table_left_4 tr>th:nth-child(4)>.cell{text-align: left}
//   .table_left_4 tr>td:nth-child(4)>.cell{text-align: left}
//   .div_card_mid_img{
//     img{width:40px;height:40px;border-radius: 4px;}
//     >div{
//       float:right;width: calc(100% - 60px);
//       p{line-height: 40px;height:40px}
//       .text_btn{
//         position: relative;
//         overflow: hidden;
//         margin-top: 3px;
//         margin-left: 0px;
//         margin-right: 5px;
//         padding: 5px 12px;
//         .el-icon-check{
//           display: none;
//         }
//       }
//       .text_btn.is_check{
//         background: rgba($body_bg,.06);
//         border: 1px solid $body_bg;
//         color: $body_bg;
//         .el-icon-check{
//           display: block;
//           position: absolute;
//           bottom:-1px;
//           right:-1px;
//           color:#fff;
//           z-index: 1
//         }
//         :after{
//           content: '';
//           display: block;
//           position: absolute;
//           border: 14px solid $body_bg;
//           transform: rotate(45deg);
//           bottom:-14px;
//           right:-14px;
//           z-index: -1;
//         }
//       }
//     }
//   }
// }

// .text_cue{color:#9b9b9b !important;margin-left: 10px}
// .form_card{
//   font-size: 12px;
//   label{color: $table_color;font-size: 12px;}
//   >.el-form-item:last-child{margin-bottom: 0;}
//   .width220 .el-form-item__content{ width:220px; }
//   .width100 .el-form-item__content{
//     width:100px;
//     .el-date-editor{ width:100px; }
//   }
//   .width400 .el-form-item__content{ width:400px; }
//   .width600 .el-form-item__content{ width:600px; }
// }
// .take_out_dishes{
//   padding:0 20px;
// }
// .el-table .caret-wrapper{
//   height: 23px !important;
//   .sort-caret{
//     border-width: 4px;
//     &.ascending{
//       top: 2px;
//     }
//     &.descending{
//       bottom: 4px;
//     }
//   }
// }

// </style>
