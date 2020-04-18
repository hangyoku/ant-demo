<template>
  <div>
    <a-tree-select
        showSearch
        style="width:210px;"
        allowClear
        placeholder="请选择人员"
        :disabled="disabled"
        :treeData="treeData"
        :value="personValue"
        treeNodeFilterProp="title"
        @change="onChange"
        @select="onSelect"
        @search="onSearch"
        :dropdownStyle="{maxHeight: '400px', overflow:'auto', width: '210px'}">
    </a-tree-select>
  </div>
</template>

<script>
export default {
    name: 'index',
    props:{
        disabled:{
            type: Boolean,
            default: false
        },
        personValue: {
            type: String,
            default: ''
        }
    },
    data() {
        return{
            value: '',
            treeData: [
                {"key":"SZ01","title": "深圳分行","value":"V-SZ01","children":[
                    {"key":"SZBA","title": "宝安支行","value":"V-SZBA","children":[
                        {"key":"SZBA01","title": "张三","value":"V-SZBA01"},
                        {"key":"SZBA02","title": "李四","value":"V-SZBA02"},
                        {"key":"SZBA03","title": "王五","value":"V-SZBA03"}
                    ]},
                    {"key":"SZFT","title": "福田支行","value":"V-SZFT","children":[
                        {"key":"SZFT01","title": "福中福","value":"V-SZFT01"},
                        {"key":"SZFT02","title": "周大福","value":"V-SZFT02"},
                        {"key":"SZFT03","title": "金六福","value":"V-SZFT03"}
                    ]},
                    {"key":"SZNS","title": "南山支行","value":"V-SZNS","children":[
                        {"key":"SZNS01","title": "南山南","value":"V-SZNS01"},
                        {"key":"SZNS02","title": "南天门","value":"V-SZNS02"},
                        {"key":"SZNS03","title": "南一隅","value":"V-SZNS03"}
                    ]},
                    {"key":"SZLH","title": "罗湖支行","value":"V-SZLH","children":[
                        {"key":"SZLH01","title": "罗大佑","value":"V-SZLHS01"},
                        {"key":"SZLH02","title": "罗生门","value":"V-SZLH02"},
                        {"key":"SZLH03","title": "罗西奥","value":"V-SZLH03"}
                    ]}
                ]},
                {"key":"WU01","title": "武汉分行","value":"V-WU01","children":[
                    {"key":"WUWC","title": "武昌支行","value":"V-WUWC","children":[
                        {"key":"WUWC01","title": "武松","value":"V-WUWC01"},
                        {"key":"WUWC02","title": "武动乾坤","value":"V-WUWC02"},
                        {"key":"WUWC03","title": "武则天","value":"V-WUWC03"},
                        {"key":"WUWC04","title": "武功高","value":"V-WUWC04"}
                    ]},
                    {"key":"WUHY","title": "汉阳支行","value":"V-WUHY","children":[
                        {"key":"WUHY01","title": "汉高祖","value":"V-WUHY01"}
                    ]}
                ]}
            ],
            key: '',
        }
    },
    mounted() {
    },
    methods: {
        onChange(value) {
            this.value = value;
        },
        onSelect(value, node, extra) {
            this.$emit("change", value)
        },
        onSearch() {

        },
        fun01 (arr) {
            let self = this;
            arr.forEach(function (item,index) {
                // 互换操作
                [item.value, item.key] = [item.key, item.value];
                if (item.children && item.children.length > 0){
                    self.fun01(item.children);
                }
            });

            return arr;
        }
    }
}
</script>

<style scoped>

</style>
