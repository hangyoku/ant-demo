<template>
  <div>

    <a-button type="primary" @click="add">新增</a-button>
    <a-form :form="form" @submit="handleSubmit">
    <a-row v-for="(items, index) in rowData" :key="index">
      <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <a-form-item v-bind="formItemLayout" label="系统模块">
          <a-select @change="handleChange(index)" v-decorator="[`names[${index}]`, 
                {
                  rules: [{
                    required: true, message: 'Please input your E-mail!',
                  }]
                }
              ]"
              style="width: 200px"
          >
            <a-select-option v-for="(item, index) in roleMenuList" :key="item.key">{{item.title}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <a-form-item v-bind="formItemLayout" label="权限列表">
            <a-tree-select
              :treeData="treeData[inner]"
              @change="onChange"
              treeCheckable
              :showCheckedStrategy="SHOW_PARENT"
              searchPlaceholder='Please select'
              v-decorator="[`section[${index}]`, 
              {
                rules: [ {
                  required: true, message: 'Please input your E-mail!',
                }]
              }
            ]"
            style="width: 200px"
            />
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary" html-type="submit">保存</a-button>
    </a-form-item>
  </a-form>
  </div>
</template>

<script>
import { TreeSelect } from 'ant-design-vue'
const SHOW_PARENT = TreeSelect.SHOW_PARENT
export default {
  name: 'HelloWorld',
  data () {
    return {
      SHOW_PARENT,
      msg: 'Welcome to Your Vue.js App',
      roleMenuList:[
          {"key":0,"title": "首页1","value":"M0001","children":[
              {"key":"01","title": "首页1-0","value":"M0001-0","children":[
                {"key":"010","title": "首页1-0-0","value":"M0001-0-0","children":[]}
              ]},
              {"key":"02","title": "首页1-1","value":"M0002-0","children":[]},
              {"key":"03","title": "首页1-2","value":"M0003-0","children":[]},
              {"key":"04","title": "首页1-3","value":"M0004-0","children":[]}
          ]},
          {"key":1,"title": "首页2","value":"M0002","children":[
            {"key":"011","title": "首页2-0","value":"M0002-1-0","children":[
                {"key":"0111","title": "首页2-0-0","value":"M0002-0-0","children":[]}
              ]},
              {"key":"0112","title": "首页2-1","value":"M0002-1","children":[]},
              {"key":"0113","title": "首页2-2","value":"M0002-2","children":[]},
              {"key":"0114","title": "首页2-3","value":"M0002-3","children":[]}
          ]},
          {"key":2,"title": "首页3","value":"M0003","children":[]},
          {"key":3,"title": "首页4","value":"M0004","children":[]},
          {"key":4,"title": "首页5","value":"M0005","children":[]}
      ],
      formItemLayout: {
        labelCol: {
          xs: { span: 12,offset: 0 },
          sm: { span: 8,offset: 0},
        },
        wrapperCol: {
          xs: { span: 12 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        }
      },
      rowData:[{name: "", section: ""}],
      treeData:[[{
        title: '',
        value: '',
        key: '',
      }]],
      inner: 0
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },  
  methods: {
    handleSubmit  (e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleChange(val) {
      console.log(val)
      this.inner = val;
      this.treeData[val] = this.roleMenuList[val].children;
    },
    onChange() {

    },
    add() {
      this.rowData.push({name: "", section: ""});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
