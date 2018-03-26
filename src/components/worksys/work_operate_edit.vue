<!-- 2018/1/10 by DKZ -->
<template>
    <div>
        <el-row :gutter="20" class="mb-10">
            <el-col :span="8">
                <div>
                    <div>作业名称:</div>
                    <el-input v-model="editdata.jobName" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
            <el-col :span="8">
                <div>
                    <div>作业类型:</div>
                    <el-input v-model="editdata.jobType" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
            <el-col :span="8">
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mb-10">
            <el-col :span="24">
                <div>
                    <div>作业实现类:</div>
                    <el-input v-model="editdata.jobClass" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mb-10">
            <el-col :span="8">
                <div>
                    <div>Cron表达式:</div>
                    <el-input v-model="editdata.cron" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
            <el-col :span="8">
                <div>作业分片总数:</div>
                <div>
                    <el-input-number v-model="editdata.shardingTotalCount" :min="1" :max="10" label="描述文字"></el-input-number>
                </div>
            </el-col>
            <el-col :span="8">
                <div>
                    <div>自定义参数:</div>
                    <el-input v-model="editdata.jobParameter" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mb-10">
            <el-col :span="8">
                <div>最大容忍本机与注册中心的时间误差秒数:</div>
                <div>
                    <el-input-number v-model="editdata.maxTimeDiffSeconds" label="描述文字"></el-input-number>
                </div>
            </el-col>
            <el-col :span="8">
                <div>监听作业端口:</div>
                <div>
                    <el-input-number v-model="editdata.monitorPort" label="描述文字"></el-input-number>
                </div>
            </el-col>
            <el-col :span="8">
                <div>作业服务器状态修复周期:</div>
                <div>
                    <el-input-number v-model="editdata.reconcileIntervalMinutes" label="描述文字"></el-input-number>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mb-10">
            <el-col :span="8">
                <div>
                    <div>监控作业执行时状态:</div>
                    <div>
                        <el-checkbox v-model="editdata.monitorExecution"></el-checkbox>
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div>
                    <div>支持自动失效转移:</div>
                    <div>
                        <el-checkbox v-model="editdata.failover"></el-checkbox>
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div>
                    <div>支持错过重执行:</div>
                    <div>
                        <el-checkbox v-model="editdata.misfire"></el-checkbox>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mb-10">
            <el-col :span="24">
                <div>
                    <div>分片序列号/参数对照表:</div>
                    <div>
                        <el-input type="textarea" v-model="editdata.shardingItemParameters" rows="1"></el-input>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mb-10">
            <el-col :span="24">
                <div>
                    <div>作业分片策略实现类全路径:</div>
                    <el-input v-model="editdata.jobShardingStrategyClass" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mb-10">
            <el-col :span="24">
                <div>
                    <div>定制异常处理类全路径:</div>
                    <el-input v-model="editdata.jobProperties.job_exception_handler" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mb-10">
            <el-col :span="24">
                <div>
                    <div>定制线程池全路径:</div>
                    <el-input v-model="editdata.jobProperties.executor_service_handler" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mb-10">
            <el-col :span="24">
                <div>
                    <div>作业描述信息:</div>
                    <div>
                        <el-input type="textarea" v-model="editdata.description" rows="1"></el-input>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" :gutter="20" class="mb-10 float_right">
            <el-col>
                <el-button type="primary" @click="submit()">提交</el-button>
                <el-button @click="reset()">重置</el-button>
            </el-col>
        </el-row>
        <div style="clear:both;"></div>
    </div>
</template>
<script>
export default {
    name: 'index',
    props: {
        jobName: String,
    },
    data() {
        return {
            'editdata': {
                cron: "0/5 * * * * ?",
                description: "",
                failover: false,
                jobClass: "com.dangdang.ddframe.job.example.job.simple.JavaSimpleJob",
                jobName: "javaSimpleJob",
                jobParameter: "",
                jobProperties: {
                    executor_service_handler: '',
                    job_exception_handler: ''
                },
                jobShardingStrategyClass: "",
                jobType: "SIMPLE",
                maxTimeDiffSeconds:
                    -1,
                misfire: true,
                monitorExecution: true,
                monitorPort:
                    -1,
                reconcileIntervalMinutes: 10,
                scriptCommandLine: null,
                shardingItemParameters: "0=Beijing,1=Shanghai,2=Guangzhou",
                shardingTotalCount: 3,
                streamingProcess: false
            },
        }
    },
    watch: {

    },
    computed: {

    },
    methods: {
        main() {

        },
        reqJobConfig(jobName) {
            this.$store.dispatch('job_config', jobName).then((resp) => {
                console.log('job_config resp', resp);
                if (resp.code == '0000') {
                    this.editdata = resp.data;
                } else {
                    this.$message.error(resp.msg)
                }
            })
        },
        reset() {
            this.reqJobConfig(this.jobName);
        },
        submit() {
            this.$store.dispatch('job_config_update', this.editdata).then((resp) => {
                console.log('job_config_update resp', resp);
                if (resp.code == '0000') {
                    this.editdata = resp.data;
                    this.$message({
                        message: '提交成功',
                        type: 'success'
                    })
                } else {
                    this.$message.error(resp.msg)
                }
            })
        }
    },
    mounted() {
        console.log('### jobName:', this.jobName);
        this.reqJobConfig(this.jobName)
    },
    destroyed() {}
}
</script>
<style>
</style>
