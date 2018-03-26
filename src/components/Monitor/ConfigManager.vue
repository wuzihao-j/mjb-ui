<template>
    <el-form>
        <span style="font-size: 14px;">运维配置：</span>
        <el-form-item :inline="true" style="text-align: center; margin-top: 50px">
            <span style="font-size: 14px;">检查项类型：</span>
            <el-select v-model="formObj.extentData.checkTypeId" placeholder="请选择" style="width: 25%" @click="select">
                <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.checkTypeName"
                        :value="item.id">
                </el-option>
            </el-select>
            <span style="font-size: 14px;">检查项特征：</span>
            <el-input v-model="formObj.extentData.checkFeatureKey"  style="width:25%"></el-input>
        </el-form-item>
        <el-form-item :inline="true" style="text-align: center; margin-top: 50px">
            <el-button type="primary" @click="drawTable">搜索</el-button>
            <el-button @click="reset" >重置</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="add('configAdd')" style="float: right; margin-right: 100px;">新增</el-button>
        </el-form-item>
        <el-form-item style="margin-top: 50px">
            <el-table
                    :data="tableData.list"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="id"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="checkFeatureKey"
                        label="检查项类型"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="checkFeatureKey"
                        sortable
                        label="检查项特征">
                </el-table-column>
                <el-table-column
                        prop="checkFeatureDesc"
                        sortable
                        label="检查项描述">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.$index, tableData)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item style="text-align: center; margin-top: 30px">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="tableData.pageNumber"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="tableData.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.totalRow"
            >
            </el-pagination>
        </el-form-item>
    </el-form>
</template>

<style>


</style>

<script>
    import Global from './Global.vue'


    export default {
        components: {Global},
        data() {
            return {
                formObj: {
                    page: '1',
                    pagesize: '10',
                    extentData: {
                        checkTypeId: '',
                        checkFeatureKey: ''
                    }
                },
                tableData: {},
                options: []
            };
        },
        methods: {
            reset(){
                this.formObj.extentData.checkFeatureKey = ''
                this.formObj.extentData.checkTypeId = ''
            },
            handleClick(index, rows){
                var obj = rows.list[index]
                this.$router.replace({path: '/mjb-monitor/configAdd', query: {id: obj.id}})
            },
            add(url){
                this.$router.replace({path: url})
            },
            select(){
                this.$http.get(Global.PATH + '/kettle/checkType/list').then(function (res) {
                    this.options = res.data.data;
                    console.log(this.options)
                })
            },
            drawTable(){
                this.$http.post(Global.PATH + '/kettle/info/list', this.formObj).then(function (res) {
                    res.headers.set("Content-Type", "application/json")
                    this.tableData = res.data.data;
                    console.log(this.tableData)
                })
            },
            handleCurrentChange(val) {
                this.formObj.page = val;
                this.drawTable();
            },
            handleSizeChange(val) {
                this.formObj.pagesize = val;
                this.drawTable();
            }
        },
        mounted(){
            this.select();
            this.drawTable();
        }
    }
</script>
