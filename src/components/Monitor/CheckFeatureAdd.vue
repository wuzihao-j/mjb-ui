<template>
    <div>
            <span>检查项类型：</span>
            <el-input v-model="req_para.checkTypeName" style="width:70%; margin-bottom: 10px"></el-input>
            <el-button type="success" @click="confirm('configAdd')">确定</el-button>
            <el-button type="danger" @click="cancel('configAdd')">取消</el-button>
    </div>
</template>
<script>
    import Global from './Global.vue'

    export default {
        components: {Global},
        data() {
            return {
                dto: {},
                req_para: {
                    checkTypeName: ''
                }
            }
        },
        methods: {
          confirm(url) {
            this.$http.post(Global.PATH + '/kettle/checkType/save', this.req_para).then(function (res) {
              res.headers.set("Content-Type", "application/json")
              this.options = res.data.data;
              this.$router.replace({path: url})
            })
          },
          cancel(url) {
            this.$router.replace({path: url})
          }
        }
    }
</script>
