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
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                <workoperatedetail :row="props.row"></workoperatedetail>
                                </template>
                            </el-table-column>
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
                            <el-table-column label="操作" fixed="right" width="300">
                                <template slot-scope="scope">
                                    <el-button type="primary" @click="edit(scope.row)" size="mini">修改</el-button>
                                    <el-button type="success" plain v-show="scope.row.status!='CRASHED'" @click="detail(scope.row)" size="mini">详情</el-button>
                                    <el-button type="primary" plain v-show="scope.row.status!='CRASHED' && scope.row.status =='OK'" @click="trigger(scope.row)" size="mini">触发</el-button>
                                    <el-button type="success" v-show="scope.row.status=='DISABLED'" @click="able(scope.row)" size="mini">生效</el-button>
                                    <el-button type="warning" v-show="scope.row.status=='OK'" @click="disable(scope.row)" size="mini">失效</el-button>
                                    <el-button type="danger" v-show="scope.row.status!='CRASHED'" @click="terminate(scope.row)" size="mini">终止</el-button>
                                    <el-button type="danger" v-show="scope.row.status=='CRASHED'" @click="deleteRow(scope.row)" size="mini">删除</el-button>
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
import workoperatedetail from './work_operate_detail'
export default {
    name: 'index',
    components: {
        workoperateedit,
        workoperatedetail,
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
        detail(row) {
            this.$router.push({
                'name': 'work_operate_detail',
                'params': {
                    'row': row
                }
            })
        },
        trigger(row) {
            this.$store.dispatch('job_trigger', row.jobName).then((resp) => {
                console.log('job_trigger resp', resp);
                if (resp.code == '0000') {
                    this.$message({
                        message: '触发成功',
                        type: 'success'
                    })
                    this.paginate(1);
                } else {
                    this.$message.error(resp.msg)
                }
            })
        },
        disable(row) {
            this.$store.dispatch('job_disable', row.jobName).then((resp) => {
                console.log('job_disable resp', resp);
                if (resp.code == '0000') {
                    this.$message({
                        message: '失效成功',
                        type: 'success'
                    })
                    this.paginate(1);
                } else {
                    this.$message.error(resp.msg)
                }
            })
        },
        able(row) {
            this.$store.dispatch('job_able', row.jobName).then((resp) => {
                console.log('job_able resp', resp);
                if (resp.code == '0000') {
                    this.$message({
                        message: '生效成功',
                        type: 'success'
                    })
                    this.paginate(1);
                } else {
                    this.$message.error(resp.msg)
                }
            })
        },
        terminate(row) {
            this.$store.dispatch('job_shutdown', row.jobName).then((resp) => {
                console.log('job_shutdown resp', resp);
                if (resp.code == '0000') {
                    this.$message({
                        message: '终止成功',
                        type: 'success'
                    })
                    this.paginate(1);
                } else {
                    this.$message.error(resp.msg)
                }
            })
        },deleteRow(row){
            this.$store.dispatch('job_config_delete', row.jobName).then((resp) => {
                console.log('job_config_delete resp', resp);
                if (resp.code == '0000') {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.paginate(1);
                } else {
                    this.$message.error(resp.msg)
                }
            })
        }
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
