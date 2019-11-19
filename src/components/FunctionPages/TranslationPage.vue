<template>
    <el-container direction="vertical">
        <el-row>
            <el-select v-model="language_from" filterable placeholder="请选择" style="width: 20%">
                <el-option-group
                        v-for="group in options"
                        :key="group.label"
                        :label="group.label">
                    <el-option
                            v-for="item in group.options"
                            :key="item.language"
                            :label="item.language"
                            :value="item.language">
                    </el-option>
                </el-option-group>
            </el-select>
            <el-button icon="el-icon-refresh" circle style="border: 0;background: white" v-on:click="Reverse"></el-button>
            <el-select v-model="language_to" filterable placeholder="请选择" style="width: 20%">
                <el-option-group
                        v-for="group in options"
                        :key="group.label"
                        :label="group.label"
                        style="font-size: 1rem;font-weight: bolder">
                    <el-option
                            v-for="item in group.options"
                            :key="item.language"
                            :label="item.language"
                            :value="item.language">
                    </el-option>
                </el-option-group>
            </el-select>
            <el-button size="medium" type="primary" :loading="loading" style="margin-left: 5.5%" v-on:click="translation"><span style="font-weight: bolder">{{loadmessage}}</span></el-button>
        </el-row>
        <el-row style="margin-top: 3%">
            <el-col :span=11 style="background: #eeeeee">
                <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="content_from"
                        :autosize="{ minRows: 12}"
                        maxlength="2000"
                        show-word-limit
                        style="font-size: 1.2rem;font-weight: bolder"
                >
                </el-input>
            </el-col>
            <el-col :span=11 :offset=2 style="margin-left: 3%">
                <el-input
                        type="textarea"
                        placeholder="等待翻译结果"
                        :readonly="true"
                        v-model="content_to"
                        :autosize="{ minRows: 12}"
                        maxlength="200"
                        style="font-size: 1.2rem;font-weight: bolder"
                        show-word-limit>
                </el-input>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
    export default {
        name: "TranslationPage",
        data(){
            return{
                loadmessage: "翻译",
                loading: false,
                options: [{
                    label: '稀缺语种',
                    options: []
                }, {
                    label: '常用语种',
                    options: []
                }],
                language_dict:{},
                language_from: '中文',
                language_to: '英语',
                content_from: '',
                content_to:'',
            }
        },
        created(){
            this.$axios.get('/getlanglist').then((res)=>{
                let langlist = res.data;
                for(let i=0; i<res.data.length; i++){
                    let langdata = langlist[i];
                    this.language_dict[langdata.language] = langdata.abbreviation;
                    if (langdata.scarce === "1"){
                        this.options[0].options.push(langdata);
                    } else {
                        this.options[1].options.push(langdata);
                    }
                }
            })
        },
        methods:{
            Reverse(){
                let language_temp = this.language_from;
                this.language_from = this.language_to;
                this.language_to = language_temp;
            },
            loadingevent(){
                this.loading = true;
                this.loadmessage = "翻译中";
            },
            translation(){
                this.loadingevent();
                let param = {
                    content:this.content_from,
                    src:this.language_dict[this.language_from],
                    tgt:this.language_dict[this.language_to],
                };
                this.$axios.post('/translate',param).then((res)=>{
                    if (res.data.result === "无权访问"){
                        this.content_to = "无权访问";
                        this.$message('无权访问');
                        this.$store.commit("logout");
                        this.$router.push("/login")
                    } else{
                        this.content_to = res.data.result;
                    }
                    this.loading = false;
                    this.loadmessage = "翻译";
                }).catch((res)=>{
                    this.content_to = "";
                    this.$message('翻译错误');
                    this.loading = false;
                    this.loadmessage = "翻译";
                })
            }
        }
    }
</script>

<style scoped>

</style>
