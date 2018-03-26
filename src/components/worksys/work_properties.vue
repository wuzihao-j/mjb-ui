<!-- 2018/1/25 by DKZ -->
<template>
    <div>
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>全局配置</el-breadcrumb-item>
                <el-breadcrumb-item>作业属性列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="con">
            <h3>作业属性列表</h3>
            <div>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div>
                            <div>作业名称:</div>
                            <el-input v-model="reqdata.jobName" placeholder="请输入内容"></el-input>
                        </div>
                    </el-col>     
                    
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                        <div>
                            <div>作业路径:</div>
                            <el-input v-model="reqdata.path" placeholder="请输入内容"></el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" :gutter="20" class="float_right">
                    <el-col>
                        <el-button type="primary" @click="paginate(nowpage)">查询</el-button>
                        <el-button @click="reset()">重置</el-button>
                    </el-col>
                </el-row>
                <div style="clear:both"></div>
            </div>
            <div>
                <el-row>
                    <el-col>
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="jobName" label="作业名称">
                            </el-table-column>
                            <el-table-column prop="path" label="配置路径">
                            </el-table-column>
                            <el-table-column prop="cron" label="cron">
                            </el-table-column>
                            <el-table-column prop="shardingTotalCount" label="分片数">
                            </el-table-column> 
                             <el-table-column label="操作" fixed="right" width="100">
                                <template slot-scope="scope">
                                    <el-button type="primary" @click="load(scope.row)" size="mini">载入</el-button> 
                                </template>
                            </el-table-column>                        
                        </el-table>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-pagination background layout="prev, pager, next" @current-change="paginate" :total="total" :page-size="page_size" class="float_right">
                        </el-pagination>
                    </el-col>
                </el-row>
            </div>
        </div>

        <!-- <div>
            <el-dialog title="查看详情" :visible.sync="dialogVisible" width="80%">
                <workoperateedit :jobName="jobName"></workoperateedit>
            </el-dialog>
        </div> -->

    </div>
</template>
<script>
export default {
    name: 'index',
    components: {

    },
    props: {

    },
    data() {
        return {
            timedata: [null,null],
            reqdata: {                
                'jobName': '',
                'state': ''                          
            },            
            page_size: 10,
            tableData: [],
            nowpage: 1,
            total: 0,
        }
    },
    watch: {

    },
    computed: {

    },
    methods: {
        main() {

        },
        paginate(page) {
            console.log(page);
            this.nowpage = page;          
            var req = {
                'page': page,
                'pagesize': this.page_size,
                'extentData': this.reqdata
            }
            this.$store.dispatch('work_properties_list', req).then((resp) => {
                console.log('work_properties_list resp', resp);
                if (resp.code == '0000') {
                    this.tableData = resp.data.list;
                    this.total = resp.data.totalRow;
                } else {
                    this.$message.error(resp.msg)
                }
            })
        },
        reset() {
            this.reqdata = {                
                'jobName': '',
                'path': ''                               
            }
            this.timedata=[null,null];
        },
        dateFormat: function(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return this.$wtf.dateFormat(new Date(date), 'yyyy-MM-dd hh:mm:ss');
        },
        load(row){            
            this.$store.dispatch('work_properties_load', row
                ).then((resp) => {
                console.log('work_properties_load resp', resp);
                if (resp.code == '0000') {
                    this.$message({
                        message: '载入成功',
                        type: 'success'
                    });                    
                }else{
                    this.$message.error(resp.msg)
                }
                })
        }
    },
    mounted() {
        this.paginate(this.nowpage);
    },
    destroyed() {

    }
}
</script>
<style>
.el-row {
    margin: 10px;
}
</style>
