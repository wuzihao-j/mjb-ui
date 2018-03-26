<!-- 2018/1/25 by DKZ -->
<template>
    <div>
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>全局配置</el-breadcrumb-item>
                <el-breadcrumb-item>历史状态</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="con">
            <h3>历史状态</h3>
            <div>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div>
                            <div>作业名称:</div>
                            <el-input v-model="reqdata.jobName" placeholder="请输入内容"></el-input>
                        </div>
                    </el-col>
                   
                    <el-col :span="8">
                        <div>
                            <div>状态:</div>
                            <div>
                                <el-select v-model="reqdata.state" placeholder="请选择">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="16">
                        <div>时间范围:</div>
                        <el-date-picker v-model="timedata" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="8">
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
                            <el-table-column prop="slaveId" label="服务器IP">
                            </el-table-column>
                            <el-table-column prop="shardingItems" label="分片项">
                            </el-table-column>
                            <el-table-column prop="state" label="状态">
                            </el-table-column>
                            <el-table-column prop="message" label="备注">
                            </el-table-column>
                            <el-table-column prop="creationTime" label="开始时间" :formatter="dateFormat">
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
                'ip': '',
                'jobName': '',
                'state': '',
                'startTime': '',
                'endTime': ''             
            },
            options: [{
                value: '',
                label: '全部'
            }, {
                value: 'TASK_STAGING',
                label: '等待运行'
            }, {
                value: 'TASK_FAILED',
                label: '运行失败'
            }, {
                value: 'TASK_FINISHED',
                label: '已完成'
            }, {
                value: 'TASK_RUNNING',
                label: '运行中'
            }, {
                value: 'TASK_ERROR',
                label: '启动失败'
            }, {
                value: 'TASK_KILLED',
                label: '主动终止'
            }],
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
             this.reqdata.startTime =this.timedata[0]? this.$wtf.dateFormat(this.timedata[0], 'yyyy-MM-dd hh:mm:ss'):'';
            this.reqdata.endTime = this.timedata[1]?this.$wtf.dateFormat(this.timedata[1], 'yyyy-MM-dd hh:mm:ss'):'';
            var req = {
                'page': page,
                'pagesize': this.page_size,
                'extentData': this.reqdata
            }
            this.$store.dispatch('history_status_list', req).then((resp) => {
                console.log('history_list resp', resp);
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
                'ip': '',
                'jobName': '',
                'state': '',
                'startTime': '',
                'endTime': ''                
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
