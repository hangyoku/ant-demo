<template>
  <div>
    <search-module :createMessage="createMessage" @searchSend="searchSend">
      <template slot="person">
        <person-ctrl v-decorator="['person']" :personValue="defaultValue" :disabled="disabled"></person-ctrl>
      </template>
    </search-module>
    <a-table :columns="columns" bordered :dataSource="data" :scroll="{ x: 2100, y: 600 }"
             :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
      <a slot="action" slot-scope="text" href="javascript:;">action</a>
    </a-table>

    <div>
      <person-ctrl @change="change" :personValue="defaultValue" :disabled="disabled"></person-ctrl>
    </div>
  </div>
</template>
<script>
    import SearchModule from "@/components/SearchModules.vue"
    import PersonCtrl from "@/components/PersonCtrl.vue"

    const columns = [
        {title: '客户号', width: 124, dataIndex: 'name', key: 'name', fixed: 'left'},
        {title: '客户名称', width: 150, dataIndex: 'age', key: 'age', fixed: 'left'},
        {title: '客户标识', dataIndex: 'address', key: '1', width: 150},
        {title: '开户日期', dataIndex: 'address', key: '2', width: 150},
        {title: '开户机构', dataIndex: 'address', key: '3', width: 150},
        {title: '分配状态1', dataIndex: 'address', key: '4', width: 150},
        {title: '分配状态2', dataIndex: 'address', key: '5', width: 150},
        {title: '分配状态3', dataIndex: 'address', key: '6', width: 150},
        {title: '分配状态4', dataIndex: 'address', key: '7', width: 150},
        {title: '分配状态5', dataIndex: 'address', key: '8', width: 150},
        {title: '分配状态6', dataIndex: 'address', key: '9', width: 150},
        {title: '分配状态7', dataIndex: 'address', key: '10'},
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 217,
            scopedSlots: {customRender: 'action'},
        },
    ];

    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `Edrward ${i}`,
            age: 32,
            address: `London Park no. ${i}`,
        });
    }

    export default {
        data() {
            return {
                data,
                columns,
                createMessage: [
                    {title: "账号", key: "account", type: "input", placeholder: "请输入", value: '14646446'},
                    {title: "人员", key: "person", type: "slot", slotName: "person"},
                ],
                selectedRowKeys: [],
                defaultValue: 'SZBA03',
                disabled: false
            }
        },
        components: {SearchModule, PersonCtrl},
        methods: {
            searchSend(val) {
            },
            onSelectChange() {

            },
            change(val) {
            }
        },
        mounted() {
            this.$api.getUserInfo().then(res=> {
                console.log(res);
            })
        }
    }
</script>
