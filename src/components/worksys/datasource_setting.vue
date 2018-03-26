<!-- 2018/1/22 by DKZ -->
<template>
    <div>
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>全局配置</el-breadcrumb-item>
                <el-breadcrumb-item>作业日志数据源</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="con">
            <h3>作业日志数据源</h3>
            <div>
                <el-row>
                    <el-button type="primary" @click="dialogVisible=true">添加</el-button>
                    <el-dialog title="添加作业日志数据源" :visible.sync="dialogVisible" width="30%">
                        <div>
                            <div>
                                <div>名称:</div>
                                <el-input v-model="addreq.name" placeholder="请输入内容"></el-input>
                            </div>
                            <div class="mt-10">
                                <div>驱动:</div>
                                <el-input :disabled="true" v-model="addreq.driver" placeholder="请输入内容"></el-input>
                            </div>
                            <div class="mt-10">
                                <div>url:</div>
                                <el-input v-model="addreq.url" placeholder="请输入内容"></el-input>
                            </div>
                            <div class="mt-10">
                                <div>用户名:</div>
                                <el-input v-model="addreq.username" placeholder="请输入内容"></el-input>
                            </div>
                            <div class="mt-10">
                                <div>密码:</div>
                                <el-input v-model="addreq.password" placeholder="请输入内容"></el-input>
                            </div>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="add()">确 定</el-button>
                        </span>
                    </el-dialog>
                </el-row>
                <el-row>
                    <el-col>
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="name" label="名称" >
                            </el-table-column>
                            <el-table-column prop="driver" label="数据源驱动">
                            </el-table-column>
                            <el-table-column prop="url" label="数据源地址">
                            </el-table-column>
                            <el-table-column prop="username" label="数据源用户名">
                            </el-table-column>
                            <el-table-column prop="address" label="操作" fixed="right" width="250">
                                <template slot-scope="scope">
                                    <el-button disabled v-show="scope.row.activated" type="info" size="mini">已连</el-button>                         
                                    <el-button @click="connectRow(scope.row)" v-show="!scope.row.activated" type="primary" size="mini">链接</el-button>
                                    <el-button @click="deleteRow(scope.row)" type="danger" size="mini">删除</el-button>
                                    <el-button @click="setDefault(scope.row)"  type="warning" size="mini">默认</el-button>
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
    props: {

    },
    data() {
        return {
            'tableData': [],
            'dialogVisible': false,
            'addreq':{
                'name':'',
                'driver':'com.mysql.jdbc.Driver',
                'url':'',
                'username':'',
                'passeord':''
            }
        }
    },
    watch: {

    },
    computed: {

    },
    methods: {
        main() {

        },
        reqRegisterList() {
            this.$store.dispatch('datasource_list').then((resp) => {
                console.log('datasource_list resp', resp);
                if (resp.code == '0000') {
                    this.tableData = resp.data;
                }else{
                    this.$message.error(resp.msg)
                }
            })
        },
        connectRow(row) {
            this.$store.dispatch('datasource_connect', row
            ).then((resp) => {
                console.log('datasource_connect resp', resp);
                if (resp.code == '0000') {
                    this.$message({
                        message: '链接成功',
                        type: 'success'
                    });
                    this.reqRegisterList();
                }else{
                    this.$message.error(resp.msg)
                }
            })
        },
        deleteRow(row) {         
            this.$store.dispatch('datasource_delete', row
            ).then((resp) => {
                console.log('datasource_delete resp', resp);
                if (resp.code == '0000') {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.reqRegisterList();
                }else{
                    this.$message.error(resp.msg)
                }
            })
        },
        add() {
            this.$store.dispatch('datasource_add', this.addreq).then((resp) => {
                console.log('datasource_add resp', resp);
                if (resp.code == '0000') {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.dialogVisible=false;
                    this.reqRegisterList();
                }else{
                    this.$message.error(resp.msg)
                }
            })
        },
        setDefault(row) {
            this.$store.dispatch('datasource_setDefault', row
            ).then((resp) => {
                console.log('datasource_setDefault resp', resp);
                if (resp.code == '0000') {
                    this.$message({
                        message: '设置成功',
                        type: 'success'
                    });                    
                }else{
                    this.$message.error(resp.msg)
                }
            })
        }
    },
    mounted() {
        this.reqRegisterList();
    },
    destroyed() {

    }
}
</script>
<style>
</style>
