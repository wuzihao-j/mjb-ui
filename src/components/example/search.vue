<!-- 2018/1/15 by DKZ -->
<template>
    <div>
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>示例</el-breadcrumb-item>
                <el-breadcrumb-item>查询页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="con">
            <h3>Search Example</h3>
            <div>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div>
                            <div>input:</div>
                            <el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div>
                            <div>radio:</div>
                            <div>
                                <el-radio v-model="radio" label="1">备选项</el-radio>
                                <el-radio v-model="radio" label="2">备选项</el-radio>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div>
                            <div>checkbox:</div>
                            <div>
                                <el-checkbox v-model="checked">备选项</el-checkbox>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div>
                            <div>input number:</div>
                            <div>
                                <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div>
                            <div>select:</div>
                            <div>
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div>
                            <div>switch:</div>
                            <div>
                                <el-switch v-model="value3" active-text="按月付费" inactive-text="按年付费">
                                </el-switch>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div>
                            <div>date picker:</div>
                            <el-date-picker v-model="value1" type="date" placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <div>
                            <div>textarea:</div>
                            <div>
                                <el-input type="textarea" v-model="desc" rows="1"></el-input>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" :gutter="20" class="float_right">
                    <el-col>
                            <el-button type="primary">查询</el-button>
                            <el-button>重置</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="date" label="日期" width="180">
                            </el-table-column>
                            <el-table-column prop="name" label="姓名" width="180">
                            </el-table-column>
                            <el-table-column prop="address" label="地址">
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-pagination background layout="prev, pager, next" :total="100" class="float_right">
                        </el-pagination>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'search',
    props: {

    },
    data() {
        return {
            input: '',
            radio: '1',
            checked: true,
            num1: 0,
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: '',
            value1:new Date(),
            value3: true,
            desc: '',
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
        }
    },
    watch: {

    },
    computed: {

    },
    methods: {
        main() {

        },
        handleChange(value) {
            console.log(value);
        },
    },
    mounted() {

    },
    destroyed() {

    }
}
</script>
<style scoped>
.el-row {
    margin: 10px;
}
</style>
