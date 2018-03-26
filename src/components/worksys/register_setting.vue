<!-- 2018/1/22 by DKZ -->
<template>
    <div>
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>全局配置</el-breadcrumb-item>
                <el-breadcrumb-item>注册中心配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="con">
            <h3>注册中心配置</h3>
            <div>
                <el-row>
                    <el-button type="primary" @click="dialogVisible=true">添加</el-button>
                    <el-dialog title="添加注册信息" :visible.sync="dialogVisible" width="30%">
                        <div>
                            <div>
                                <div>注册中心名称:</div>
                                <el-input v-model="addreq.name" placeholder="请输入内容"></el-input>
                            </div>
                            <div class="mt-10">
                                <div>注册中心地址:</div>
                                <el-input v-model="addreq.zkaddresslist" placeholder="请输入内容"></el-input>
                            </div>
                            <div class="mt-10">
                                <div>命名空间:</div>
                                <el-input v-model="addreq.namespace" placeholder="请输入内容"></el-input>
                            </div>
                            <div class="mt-10">
                                <div>登录凭证:</div>
                                <el-input v-model="addreq.digest" placeholder="请输入内容"></el-input>
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
                            <el-table-column prop="name" label="注册中心名称">
                            </el-table-column>
                            <el-table-column prop="zkaddresslist" label="注册中心地址">
                            </el-table-column>
                            <el-table-column prop="namespace" label="命名空间">
                            </el-table-column>
                             <el-table-column label="操作" fixed="right" width="250">
                                <template slot-scope="scope">
                                    <el-button disabled v-show="scope.row.activated" type="info" size="mini">已连</el-button>                                   
                                    <el-button @click="connectRow(scope.row)" v-show="!scope.row.activated" type="primary" size="mini">链接</el-button>
                                    <el-button @click="deleteRow(scope.row)" type="danger" size="mini">删除</el-button>
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
                'zkAddressList':'',
                'namespace':'',
                'digest':''
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
            this.$store.dispatch('register_center').then((resp) => {
                console.log('register_center resp', resp);
                if (resp.code == '0000') {
                    this.tableData = resp.data;
                }else{
                    this.$message.error(resp.msg)
                }
            })
        },
        connectRow(row) {
            this.$store.dispatch('register_center_connect', {
                'name': row.name
            }).then((resp) => {
                console.log('register_center_connect resp', resp);
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
            this.$store.dispatch('register_center_delete', {
                'name': row.name
            }).then((resp) => {
                console.log('register_center_delete resp', resp);
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
            this.$store.dispatch('register_center_add', this.addreq).then((resp) => {
                console.log('register_center_add resp', resp);
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
