<!-- 2018/1/9 by DKZ -->
<template>
    <div id="mainnav">
        <!-- <img src="../../assets/logo.png" :class="{'logo_collapse':isCollapse,'logo_origin':!isCollapse}"> -->
        <el-menu style="border-right:none;" default-active="1-1" background-color="#2E4053" active-text-color="#ffffff" text-color="#cccccc" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"  @select="handleSelect">
            <el-menu-item index="0" @click="collapseSwitch()">
                <i :class="{'el-icon-caret-right':isCollapse,'el-icon-caret-left':!isCollapse}"></i>
                <span slot="title">{{isCollapse?'展开菜单':'收起菜单'}}</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                     <span>作业系统</span>
                </template>
                <el-submenu index="1-1">
                    <template slot="title">全局配置</template>
                    <el-menu-item index="/worksys/register_setting">注册中心配置</el-menu-item>
                    <el-menu-item index="/worksys/datasource_setting">事件追踪数据源配置</el-menu-item>
                    <el-menu-item index="/worksys/work_properties">作业属性详情</el-menu-item>
                </el-submenu>
                <el-submenu index="1-2">
                    <template slot="title">作业操作</template>
                    <el-menu-item index="/worksys/work_operate">作业维度</el-menu-item>
                    <el-menu-item index="/worksys/workServer_operate">服务器维度</el-menu-item>
                </el-submenu>
                <el-submenu index="1-3">
                    <template slot="title">作业历史</template>
                    <el-menu-item index="/worksys/history_path">历史轨迹</el-menu-item>
                    <el-menu-item index="/worksys/history_status">历史状态</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-message"></i>业务检测</template>
              <el-menu-item index="/mjb-monitor/configAdd">
                运维配置新增
              </el-menu-item>
              <el-menu-item index="/mjb-monitor/configManager">
                运维配置管理
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
                <i class="el-icon-setting"></i>
                <span slot="title">设置</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<style>
/*.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}*/

#mainnav {
    z-index: 999;
}

.logo_collapse {
    width: 60px;
    height: 60px;
}

.logo_origin {
    width: 60px;
    height: 60px;
}
</style>
<script>
export default {
    name: 'mainnav',
    data() {
        return {};
    },
    computed: {
        isCollapse: {
            get: function() {
                return this.$store.state.is_mainnav_collapse;
            },
            set: function(val) {
                this.$store.commit('mainNavSwitch', val);
            }
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        collapseSwitch() {
            this.isCollapse = !this.isCollapse;
        },
        handleSelect(path){
            console.log(path);
            path!=0&&this.$router.push(path);
        }
    }
}
</script>
