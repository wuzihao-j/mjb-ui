<!-- 2018/1/24 by DKZ -->
<template>
    <div>
        <div v-if="isfromrouter" class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>作业操作</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/worksys/work_operate'}">作业维度</el-breadcrumb-item>
                <el-breadcrumb-item>详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div :class="{'con':isfromrouter}">
            <h3 v-if="isfromrouter">作业维度详情</h3>
            <div>
                <el-row>
                    <el-col>
                        <el-table :data="tableData">
                            <el-table-column prop="item" label="分片项">
                            </el-table-column>
                            <el-table-column prop="serverIp" label="服务器IP">
                            </el-table-column>
                            <el-table-column prop="instanceId" label="进程ID">
                            </el-table-column>
                            <el-table-column label="支持自动失效转移">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.failover?'支持':'不支持'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="状态">
                                <template slot-scope="scope">
                                    <i class="el-icon-success color-green" v-show="scope.row.status!=='DISABLED'"></i>
                                    <i class="el-icon-error color-red" v-show="scope.row.status=='DISABLED'"></i>
                                    <span>{{ scope.row.status }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" fixed="right" width="250">
                                <template slot-scope="scope">
                                    <el-button type="warning" v-show="scope.row.status!=='DISABLED'" @click="disableRow(scope.row)" size="mini">失效</el-button>
                                    <el-button type="success" v-show="scope.row.status=='DISABLED'" @click="ableRow(scope.row)" size="mini">生效</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'index',
    components: {

    },
    props: {
        'row': {}
    },
    data() {
        return {
            isfromrouter: true,
            tableData: [],
            jobName: '',
        }
    },
    watch: {

    },
    computed: {

    },
    methods: {
        main() {

        },
        reqDetailList(jobName) {
            this.$store.dispatch('job_detail_sharding', jobName).then((resp) => {
                console.log('job_detail_sharding resp', resp);
                if (resp.code == '0000') {
                    this.tableData = resp.data;
                } else {
                    this.$message.error(resp.msg)
                }
            })
        },
        disableRow(row) {
            var req = {
                'jobName': this.jobName,
                'item': row.item
            }
            this.$store.dispatch('job_detail_disable', req).then((resp) => {
                console.log('job_detail_disable resp', resp);
                if (resp.code == '0000') {
                    this.$message({
                        message: '失效成功',
                        type: 'success'
                    })
                    this.reqDetailList(this.jobName);
                } else {
                    this.$message.error(resp.msg)
                }
            })
        },
        ableRow(row) {
            var req = {
                'jobName': this.jobName,
                'item': row.item
            }
            this.$store.dispatch('job_detail_able', req).then((resp) => {
                console.log('job_detail_disable resp', resp);
                if (resp.code == '0000') {
                    this.$message({
                        message: '生效成功',
                        type: 'success'
                    })
                    this.reqDetailList(this.jobName);
                } else {
                    this.$message.error(resp.msg)
                }
            })
        }
    },
    mounted() {
        console.log('jobName', this.row);
        if (this.row) {
            this.jobName = this.row.jobName;
            this.isfromrouter = false;
        } else {
            this.jobName = this.$route.params.row.jobName;
            this.isfromrouter = true;
        }
        this.reqDetailList(this.jobName)
    },
    destroyed() {

    }
}
</script>
<style>
</style>
