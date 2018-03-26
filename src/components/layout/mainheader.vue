<!-- 2018/1/9 by DKZ -->
<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="/">首页</el-menu-item>
            <el-submenu index="/example">
                <template slot="title">示例</template>
                <el-menu-item index="/example/search">查询页</el-menu-item>
            </el-submenu>
        </el-menu>

    </div>
</template>
<script>
export default {
    data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                this.$router.push(key);
            }
        }
}
</script>
