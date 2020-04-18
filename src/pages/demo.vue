<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item v-for="(k, index) in form.getFieldValue('keys')" :key="k" :label="index === 0 ? '姓名' : ''" :required="false">
        <a-row type="flex" justify="start">
            <a-col :span="8">
                <a-input v-decorator="[`names[${k}]`,{rules: [{required: true,message: '请输入姓名'}]}]" placeholder="姓名" style="width: 210px;"/>
            </a-col>
            <a-col :span="8">
                <a-input v-decorator="[`age[${k}]`,{rules: [{required: true,message: '请输入年龄'}]}]" placeholder="年龄" style="width: 210px;"/>
            </a-col>
            <a-col :span="8">
                <a-icon v-if="form.getFieldValue('keys').length > 1" class="dynamic-delete-button" type="minus-circle-o" :disabled="form.getFieldValue('keys').length === 1" @click="remove(k)"/>
            </a-col>
        </a-row>
    </a-form-item>

    <a-form-item >
        <a-button type="dashed" @click="add">添加成员</a-button>
    </a-form-item>

    <a-form-item>
        <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
let id = 0;
export default {
  data() {
    return {};
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'dynamic_form_item' });
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true });
  },
  methods: {
    remove(k) {
      // can use data-binding to get
      const keys = this.form.getFieldValue('keys');
      if (keys.length === 1) {
        return;
      }
      // can use data-binding to set
      this.form.setFieldsValue({
        keys: keys.filter(key => key !== k),
      });
    },

    add() {
      const keys = this.form.getFieldValue('keys');
      console.log(keys);
      const nextKeys = keys.concat(id++);
      this.form.setFieldsValue({
        keys: nextKeys,
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
          console.log(values);
        if (!err) {
          const { keys, names } = values;
          console.log('Received values of form: ', values);
          console.log(
            'Merged values:',
            keys.map(key => names[key]),
          );
        }
      });
    },
  },
};
</script>
<style>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>