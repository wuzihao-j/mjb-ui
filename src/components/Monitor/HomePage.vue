<template>
 <el-container class="root" >
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
   <el-menu :default-openeds="['1']">
    <el-submenu index="1">
     <template slot="title"><i class="el-icon-message"></i>业务检测</template>
      <el-menu-item index="1-1" @click="rootFunction('/mjb-monitor/configAdd')">
          运维配置新增
      </el-menu-item>
        <el-menu-item index="1-1" @click="rootFunction('/mjb-monitor/configManager')">
            运维配置管理
        </el-menu-item>
     </el-submenu>
   </el-menu>
  </el-aside>
  <el-container>
   <el-main>
    <router-view></router-view>
   </el-main>
  </el-container>
 </el-container>
</template>
<style>
 .el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
 }

 .el-aside {
  color: #333;
 }

 .root{
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
  border: 1px solid #eee;
  overflow:hidden; word-break:break-all;
 }

</style>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            rootFunction: function (url) {
                this.$router.replace({path: url})
            }
        },
    };
</script>