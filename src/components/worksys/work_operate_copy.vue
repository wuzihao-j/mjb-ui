<!-- 2018/1/23 by DKZ -->
<template>
    <div>
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>作业操作</el-breadcrumb-item>
                <el-breadcrumb-item>作业维度</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="con">
            <h3>作业维度</h3>
            <div>
                <el-row>
                    <el-col>
                        <el-table :data="tableData">
                            <el-table-column prop="jobName" label="作业名称">
                            </el-table-column>
                            <el-table-column prop="shardingTotalCount" label="作业分片总数">
                            </el-table-column>
                            <el-table-column prop="cron" label="Cron表达式">
                            </el-table-column>
                            <el-table-column prop="description" label="作业描述信息">
                            </el-table-column>
                            <el-table-column label="状态">
                                <template slot-scope="scope">
                                    <div> 
                                        <i class="el-icon-success color-green" v-show="scope.row.status=='OK'"></i>
                                        <i class="el-icon-error color-red" v-show="scope.row.status!=='OK'"></i>
                                        <span>{{ scope.row.status }}</span>
                                    </div>
                                   
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" fixed="right" width="400">
                                <template slot-scope="scope">
                                    <el-button type="primary" @click="edit(scope.row)" size="mini">修改</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <!--         <el-row>
                    <el-col>
                        <el-pagination background layout="prev, pager, next" @current-change="paginate" :total="total" :page-size="page_size" class="float_right">
                        </el-pagination>
                    </el-col>
                </el-row> -->
            </div>
        </div>
        <div>
            <el-dialog title="修改作业" :visible.sync="dialogVisible" width="80%">
                <workoperateedit :jobName="jobName"></workoperateedit>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import workoperateedit from './work_operate_edit'
export default {
    name: 'index',
    components: {
        workoperateedit,
    },
    props: {},
    data() {
        return {
            'page_size': 10,
            'total': 100,
            'tableData': [],
            'dialogVisible': false,
            'jobName': ''
        }
    },
    watch: {

    },
    computed: {

    },
    methods: {
        main() {

        },
        paginate(currentPage) {
            console.log(currentPage);
            // var req = {
            //     'offset': (currentPage - 1) * this.page_size,
            //     'limit': this.page_size,
            // }
            this.$store.dispatch('job_list', {}).then((resp) => {
                console.log('job_list resp', resp);
                if (resp.code == '0000') {
                    this.tableData = resp.data;
                } else {
                    this.$message.error(resp.msg)
                }
            })
        },
        edit(row) {
            this.jobName = row.jobName;
            this.dialogVisible = true;
        },
    },
    mounted() {
        this.paginate(1);
    },
    destroyed() {
        
    }
}
</script>
<style scoped>
.OK {  
    background-color: #00a65a !important;
    color: #fff !important;
}
.DISABLED {  
    background-color: #f0ad4e !important;
    color: #fff !important;
}
</style>
