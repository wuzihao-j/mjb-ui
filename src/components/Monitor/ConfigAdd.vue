<template>
  <el-form label-width="160px" id="myForm">

   <el-form-item label="运维配置新增:"></el-form-item>
   <el-form-item  style="margin-right: 40px">
    <el-form-item label="作业名称:">
     <el-input v-model="formObj.jobName" style="width:70%; margin-bottom: 10px"></el-input>
    </el-form-item>
   <el-form-item label="检查项类型:">
    <el-select v-model="formObj.checkTypeName" placeholder="请选择" style="margin-bottom: 10px; width: 50%" @click="">
     <el-option
             v-for="item in options"
             :key="item.id"
             :label="item.checkTypeName"
             :value="item.checkTypeName">
     </el-option>
    </el-select>
     <!--<el-input v-model="formObj.checkType" style="width:70%; margin-bottom: 10px"></el-input>-->
    <!--<el-button type="primary" style="margin-left: 20px" @click="router('checkFeatureAdd')">新增</el-button>-->
     <template>
       <el-button type="text" @click="open3">新增</el-button>
     </template>
   </el-form-item>
    <el-form-item label="检查项特征:">
     <el-input v-model="formObj.checkFeatureKey"  style="width:70%; margin-bottom: 10px"></el-input>
    </el-form-item>
    <el-form-item label="检查项描述:">
     <el-input v-model="formObj.checkFeatureDesc"  style="width:70%; margin-bottom: 10px"></el-input>
    </el-form-item>
    <el-form-item label="上传Kettle文件:">
     <el-form-item label="文件上传" prop="pic">
      <input type="file" @change="getFile($event)"></input>
     </el-form-item>
    </el-form-item>
   </el-form-item>

   <el-form-item label="输出模板配置:"></el-form-item>
   <el-form-item
           v-for="item in formObj.dynamicList"
           :key="item.key"
   >
    <el-form-item :inline="true" >
     <span style="width:8%">输出标准参数{{item.index}}</span>
     <el-input style="width:30%" v-model="item.outputStardardKey"></el-input>
     <span style="width:8%">输出标准值{{item.index}}</span>
     <el-input style="width:30%" v-model="item.outputStandardValue"></el-input>
     <el-button @click.prevent="removeDomain(item)" style="width:8%">删除</el-button>
    </el-form-item>
   </el-form-item>
   <el-form-item>
    <el-button type="primary" @click="submitForm($event)">提交</el-button>
    <el-button @click="addDomain">新增</el-button>
   </el-form-item>
  </el-form>
</template>

<style>
.el-input--suffix{
 display: inline;
 width:50%;
}

</style>

<script>
    import Global from './Global.vue'

    export default {
        components: {Global},
        data() {
            return {
                options: [],
                selectd: '',
                fileList: [],
                formObj: {
                    jobName: '',
                    checkTypeName: '',
                    checkFeatureKey: '',
                    checkFeatureDesc: '',
                    kettle_file: '',
                    dynamicList: [{
                        outputStardardKey: '',
                        outputStandardValue: ''
                    }],
                },
                reqPara: {
                  checkTypeName: ''
                },
                currentIndex: 1
            }
        },
        methods: {
            getFile(event) {
                this.formObj.kettle_file = event.target.files[0];
            },
            submitForm(event) {
                event.preventDefault();
                let formData = new FormData();
                formData.append('jobName', this.formObj.jobName);
                formData.append('checkTypeName', this.formObj.checkTypeName);
                formData.append('checkFeatureKey', this.formObj.checkFeatureKey);
                formData.append('checkFeatureDesc', this.formObj.checkFeatureDesc);
//                formData.append('dynamicList', this.formObj.dynamicList);
                formData.append('file', this.formObj.kettle_file);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data;application/json'
                    }
                }
                this.$http.post(Global.PATH + '/kettle/info/save', formData, config).then(function (res) {
                    if (res.status === 2000) {
                        /*这里做处理*/
                    }
                })
            },
            removeDomain(item) {
                var index = this.formObj.dynamicList.indexOf(item)
                if (index !== -1) {
                    this.currentIndex -= 1;
                    this.formObj.dynamicList.splice(index, 1)
                }
            },
            addDomain() {
                this.currentIndex += 1;
                this.formObj.dynamicList.push({
                    key: Date.now(),
                    outputStardardKey: '',
                    outputStandardValue: '',
                    index: this.currentIndex
                });
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            router(url){
                this.$router.replace({path: url})
            },
          showList(){
            this.$http.get(Global.PATH + '/kettle/checkType/list').then(function (res) {
              this.options = res.data.data;
            })
          },
          open3() {
            this.$prompt('新增检查类型', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /[\S]*/,
              inputErrorMessage: '新增检查类型格式错误'
            }).then(({ value }) => {
              this.$message({
                type: 'success',
                message: '新增检查类型为: ' + value
              });
              this.reqPara.checkTypeName  = value
              this.$http.post(Global.PATH + '/kettle/checkType/save', this.reqPara).then(function (res) {
                res.headers.set("Content-Type", "application/json")
                this.showList()
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              });
            });
          }
        },
        mounted(){
            var changeItemId = this.$route.query.id;
            console.log(changeItemId)
            if(changeItemId != null){
                this.$http.get(Global.PATH + '/kettle/info/detail/'+ changeItemId).then(function (res) {
                    this.formObj = res.data.data;
                    console.log(this.formObj)
                    console.log(res.data.data)
                })
            }
            this.showList()
        }
    }
</script>
