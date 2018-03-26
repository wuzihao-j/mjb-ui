<template>
    <div>
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>作业操作</el-breadcrumb-item>
                <el-breadcrumb-item>服务器维度</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="con">
            <h3>服务器维度</h3>
            <div>
                <el-row>
                    <el-col>
                        <el-table :data="tableData">

                             <el-table-column type="expand">
                                <template slot-scope="props">
                                <workserveroperatedetail :row="props.row"></workserveroperatedetail>
                                </template>
                            </el-table-column>
                            <el-table-column prop="serverIp" label="服务器IP">
                            </el-table-column>
                            <el-table-column prop="instancesNum" label="运行实例数">
                            </el-table-column>
                            <el-table-column prop="jobsNum" label="作业总数">
                            </el-table-column>
                            <el-table-column prop="disabledJobsNum" label="禁用作业数">
                            </el-table-column>                          
                            <el-table-column label="操作" fixed="right" width="350">
                                <template slot-scope="scope">                              
                                    <!-- <el-button type="success" plain @click="detail(scope.row)" size="mini" v-show="scope.row.instances.length!=0">详情</el-button> -->
                                    <el-button type="success" @click="trigger(scope.row)" size="mini" v-show="scope.row.instances.length!=0 && scope.row.disabledJobsNum!=0">生效</el-button>
                                    <el-button type="warning" @click="disable(scope.row)" size="mini" v-show="scope.row.instances.length!=0 && scope.row.disabledJobsNum==0">失效</el-button>
                                    <el-button type="danger" @click="terminate(scope.row)" size="mini" v-show="scope.row.instances.length!=0">终止</el-button>
                                     <el-button type="danger" plain @click="deleteServer(scope.row)" size="mini" v-show="scope.row.instances.length==0">删除</el-button>
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
import workserveroperatedetail from './workServer_operate_detail'
export default {
    name: 'index',
    components: {
        workserveroperatedetail,
    },
    props: {
    },
    data() {
        return {            
            'tableData': [],           
            'jobName':''
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


            this.$store.dispatch('jobServer_list', {}).then((resp) => { 
                console.log('jobServer_list resp', resp);
                if (resp.code == '0000') {                  
                    this.tableData = resp.data;
                } else {
                    this.$message.error(resp.msg)
                }
            })
        },
        detail(row){            
            this.$router.push({'name':'workServer_operate_detail','params':row})
        },
        trigger(row){
            this.$store.dispatch('jobServer_trigger',row.serverIp ).then((resp) => {
                console.log('jobServer_trigger resp', resp);
                if (resp.code == '0000') {
                    this.$message({
                        message:'生效成功',
                        type:'success'
                    })                   
                } else {
                    this.$message.error(resp.msg)
                }
                this.paginate(1);
            })
        },
        disable(row){
            this.$store.dispatch('jobServer_disable',row.serverIp ).then((resp) => {
                console.log('jobServer_disable resp', resp);
                if (resp.code == '0000') {
                    this.$message({
                        message:'失效成功',
                        type:'success'
                    })                     
                } else {
                    this.$message.error(resp.msg)
                }
                this.paginate(1);
            })
        },
        terminate(row){
            this.$store.dispatch('jobServer_terminate',row.serverIp ).then((resp) => {
                console.log('jobServer_terminate resp', resp);
                if (resp.code == '0000') {
                    this.$message({
                        message:'终止成功',
                        type:'success'
                    })                     
                } else {
                    this.$message.error(resp.msg)
                }
                this.paginate(1);
            })
        },
        deleteServer(row){
            this.$store.dispatch('jobServer_delete',row.serverIp ).then((resp) => {
                console.log('jobServer_delete resp', resp);
                if (resp.code == '0000') {
                    this.$message({
                        message:'删除成功',
                        type:'success'
                    })                     
                } else {
                    this.$message.error(resp.msg)
                }
                this.paginate(1);
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
<style>
</style>
