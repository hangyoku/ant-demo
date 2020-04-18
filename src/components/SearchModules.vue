<template>
  <div class="search-module">
    <a-card title="筛选条件">
        <div slot="extra" class="close-icon">
            <a-icon type="down" @close="close()"/>
        </div>
        <a-form :form="form" @submit="handleSearch" v-if="showForm">
            <a-row type="flex" justify="start">
                <a-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" :xxl="6" v-for="(item, index) in searchArray" :key="index">
                    <a-form-item :label="item.title" :label-col="{span: 6}" :wrapper-col="{span: 18}" style="margin-bottom: 15px;">
                        <a-input-group>
                            <a-input v-decorator="[item.key, {initialValue:item.value || ''}]" v-if="item.type=='input'" :style="{width: item.width || '210px'}" :placeholder="item.placeholder"/>

                            <a-select v-decorator="[item.key, {initialValue: item.source[0]?item.source[0].key:''}]" v-if="item.type=='select'" :style="{width: item.width || '210px'}" :placeholder="item.placeholder">
                                <a-select-option v-for="(i,g) in item.source" :key="g" :value="i.key">{{i.value}}</a-select-option>
                            </a-select>

                            <a-date-picker v-decorator="[item.key, {initialValue:''}]" format="YYYY-MM-DD"  v-if="item.type=='date'" :style="{width: item.width || '210px'}" />

                            <slot v-else-if="item.type=='slot'" :name="item.slotName"/>
                        </a-input-group>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row type="flex" justify="start">
                <a-col>
                    <a-button style="width:82px;height:32px;" ghost type="primary" html-type="submit">查询</a-button>
                    <a-button style="width:82px;height:32px;" @click="handleReset">重置</a-button>
                </a-col>
            </a-row>
        </a-form>
    </a-card>
  </div>
</template>

<script>

export default {
  name: 'SearchModules',
  props: {
      createMessage: {
          type: Array,
          default: ()=>[]
      }
  },
  computed: {
      searchArray() {
          return this.createMessage;
      }
  },
  data () {
    return {
      showForm: true,
      form: this.$form.createForm(this),
    }
  },
  methods: {
      close() {
          console.log('1123123')
          this.showForm = !this.showForm;
      },
      handleSearch(e) {
          e.preventDefault();
          this.form.validateFields((error, values) => {
              this.$emit("searchSend", values)
          })
      },
      handleReset() {
          this.form.resetFields();
          this.$emit("resetForm")
      }
  },
  mounted(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .close-icon{
        color: #c9c9c9;
        cursor: pointer;
    }
</style>
