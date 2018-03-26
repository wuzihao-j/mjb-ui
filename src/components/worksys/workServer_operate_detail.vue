<!-- 2018/1/24 by DKZ -->
<template>
    <div>       
        <div class="con">
            
            <div>
                <el-row>
                    <el-col>
                        <el-table :data="tableData">
                            <el-table-column prop="jobName" label="作业名称">
                            </el-table-column>
                            <el-table-column prop="instanceCount" label="运行实例数">
                            </el-table-column>                            
                            <el-table-column label="状态">
                                <template slot-scope="scope">
                                    <i class="el-icon-success color-green" v-show="scope.row.status=='OK'"></i>
                                    <i class="el-icon-error color-red" v-show="scope.row.status!=='OK'"></i>
                                    <span>{{ scope.row.status }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" fixed="right" width="282">
                                <template slot-scope="scope">
                                    <el-button type="warning" @click="disableRow(scope.row)" size="mini" v-show="scope.row.instanceCount!=0 && scope.row.status=='OK'">失效</el-button>
                                    <el-button type="success" @click="enableRow(scope.row)" size="mini" v-show="scope.row.instanceCount!=0 && scope.row.status=='DISABLED'">生效</el-button>
                                    <el-button type="danger" @click="terminate(scope.row)" size="mini" v-show="scope.row.instanceCount!=0">终止</el-button>
                                    <el-button type="danger" plain @click="deleteServer(scope.row)" size="mini" v-show="scope.row.instanceCount==0">删除</el-button>
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
            tableData: [],
            serverIp:'',
            isfromrouter: true
        }
    },
    watch: {

    },
    computed: {

    },
    methods: {
        main() {

        },
        reqDetailList(serverIp) {
            this.$store.dispatch('jobServer_detail_sharding', serverIp).then((resp) => {
                console.log('job_detail_sharding resp', resp);
                if (resp.code == '0000') {
                    this.tableData = resp.data;
                } else {
                    this.$message.error(resp.msg)
                }
            })
        },
        disableRow(row){
            var req={'serverIp':this.serverIp,'item':row.jobName}
            console.log('##',req)            
            this.$store.dispatch('jobServer_detail_disable',req).then((resp) => {
                console.log('jobServer_detail_disable resp', resp);
                if (resp.code == '0000') {
                    this.$message({
                        message:'失效成功',
                        type:'success'
                    })
                } else {
                    this.$message.error(resp.msg)
                }
                this.reqDetailList(this.serverIp)
            })
        },
        enableRow(row){
            var req={'serverIp':this.serverIp,'item':row.jobName}
            console.log('##',req)            
            this.$store.dispatch('jobServer_detail_enable',req).then((resp) => {
                console.log('jobServer_detail_enable resp', resp);
                if (resp.code == '0000') {
                    this.$message({
                        message:'生效成功',
                        type:'success'
                    })
                } else {
                    this.$message.error(resp.msg)
                }
                this.reqDetailList(this.serverIp)
            })
        },
        terminate(row){
            var req={'serverIp':this.serverIp,'item':row.jobName}
            console.log('##',req)            
            this.$store.dispatch('jobServer_detail_terminate',req).then((resp) => {
                console.log('jobServer_detail_terminate resp', resp);
                if (resp.code == '0000') {
                    this.$message({
                        message:'终止成功',
                        type:'success'
                    })
                } else {
                    this.$message.error(resp.msg)
                }
                this.reqDetailList(this.serverIp)
            })
        },
        deleteServer(row){
            var req={'serverIp':this.serverIp,'item':row.jobName}
            console.log('##',req)            
            this.$store.dispatch('jobServer_detail_delete',req).then((resp) => {
                console.log('jobServer_detail_delete resp', resp);
                if (resp.code == '0000') {
                    this.$message({
                        message:'删除成功',
                        type:'success'
                    })
                } else {
                    this.$message.error(resp.msg)
                }
                this.reqDetailList(this.serverIp)
            })
        }
    },
    mounted() {        
        console.log('serverIp', this.row);
        if (this.row) {
            this.serverIp = this.row.serverIp;
            this.isfromrouter = false;
        } else {
            this.serverIp = this.$route.params.row.serverIp;
            this.isfromrouter = true;
        }
        // this.reqDetailList(this.serverIp)
        // console.log('params', this.$route.params);       
        // this.serverIp=this.$route.params.serverIp
        this.reqDetailList(this.serverIp)
    },
    destroyed() {

    }
}
</script>
<style>
</style>
