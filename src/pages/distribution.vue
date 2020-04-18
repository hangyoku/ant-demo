<template>
    <a-form :form="form" @submit="handleSubmit">
        <div style="margin:20px;">
            <a-button type="primary" @click="addParent">新增</a-button>
        </div>
        <a-table :columns="columns" :dataSource="data" :pagination="false" :expandedRowKeys="expandedRowKeys"
                 :expandRowByClick="expandRowByClick" :expandIcon="expandIcon" @expandedRowsChange="expandedRowsChange">
            <div slot="action" slot-scope="item">
                <a-button type="primary" @click="changeItem(item)">修改</a-button>
                <a-button type="primary" @click="deleteItem(item)">删除</a-button>
            </div>
            <template slot="startDate" slot-scope="record">
                <a-form-item :validate-status="record.startErrorStatus" :help="record.startErrorMsg">
                    <a-date-picker v-model="record.startDate" @change="startDateChange($event, record)"
                                   format="YYYY-MM-DD" placeholder="选择起始日期"/>
                </a-form-item>
            </template>
            <template slot="endDate" slot-scope="record">
                <a-form-item :validate-status="record.endErrorStatus" :help="record.endErrorMsg">
                    <a-date-picker v-model="record.endDate" @change="endDateChange($event, record)" format="YYYY-MM-DD"
                                   placeholder="选择结束日期"/>
                </a-form-item>
            </template>
            <template slot="expandedRowRender" slot-scope="record" style="margin: 0">
                <a-form-item v-for="(item,index) in record.personList" :key="index">
                    <a-row type="flex" justify="start">
                        <a-col :span="6">
                            <a-form-item label="成员" :label-col="labelCol" :wrapper-col="wrapperCol"
                                         :validate-status="item.personErrorStatus" :help="item.personErrorMsg">
                                <person-ctrl v-model="item.staffUm" @change="getStaffUm($event, item, record)"
                                             :personValue="item.staffUm"></person-ctrl>
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="比例" :label-col="labelCol" :wrapper-col="wrapperCol"
                                         :validate-status="record.rateErrorStatus || item.errorStatus"
                                         :help="record.rateErrorMsg || item.msg">
                                <a-input v-model="item.rate" @change="rateChange($event, item, record)"
                                         style="width:210px;"></a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :offset="1" :span="5">
                            <a-form-item>
                                <a-icon type="delete" @deleteChild="deleteChild(item, record)"></a-icon>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form-item>
                <a-row type="flex" justify="start">
                    <a-col :span="24">
                        <a-button type="primary" ghost @click="addPerson(record)">添加成员</a-button>
                    </a-col>
                </a-row>
            </template>
        </a-table>
        <div style="margin-top:50px;display:flex;justify-content:center;">
            <a-button type="primary" html-type="submit">提交</a-button>
        </div>
    </a-form>
</template>
<script>
    import moment from 'moment';

    const columns = [
        {title: "起始日期", key: "startDate", scopedSlots: {customRender: "startDate"}},
        {title: "结束日期", key: "endDate", scopedSlots: {customRender: "endDate"}},
        {title: "录入时间", dataIndex: "time", key: "time"},
        {title: "录入人", dataIndex: "name", key: "name"},
        {
            title: "操作",
            dataIndex: "",
            key: "x",
            scopedSlots: {customRender: "action"}
        }
    ];
    const data = [
        {
            key: 1,
            startDate: moment("2020-04-01"),
            endDate: moment("2020-05-30"),
            name: "张三",
            time: "2020-04-01 23:25:52",
            startErrorStatus: '',
            startErrorMsg: '',
            endErrorStatus: '',
            endErrorMsg: '',
            rateErrorStatus: '', // 比例错误状态
            rateErrorMsg: '', // 比例错误信息
            personList: [
                {
                    staffUm: "V-SZFT02",
                    rate: 45,
                    key: 1,
                    personErrorStatus: '',
                    personErrorMsg: '',
                    errorStatus: '',
                    msg: ''
                },
                {
                    staffUm: "V-SZFT01", rate: 55, key: 2,
                    personErrorStatus: '',
                    personErrorMsg: '',
                    errorStatus: '',
                    msg: ''
                }
            ]
        },
        {
            key: 2,
            startDate: moment("2010-02-01"),
            endDate: moment("2010-05-30"),
            name: "李四",
            time: "2020-04-01 08:09:05",
            startErrorStatus: '',
            startErrorMsg: '',
            endErrorStatus: '',
            endErrorMsg: '',
            rateErrorStatus: '', // 比例错误状态
            rateErrorMsg: '', // 比例错误信息
            personList: []
        },
        {
            key: 3,
            startDate: moment("1999-04-01"),
            endDate: moment("2000-05-30"),
            name: "赵六",
            time: "2020-04-01 11:15:30",
            startErrorStatus: '',
            startErrorMsg: '',
            endErrorStatus: '',
            endErrorMsg: '',
            rateErrorStatus: '', // 比例错误状态
            rateErrorMsg: '', // 比例错误信息
            personList: []
        }
    ];
    import PersonCtrl from "@/components/PersonCtrl.vue";

    export default {
        name: "index",
        components: {PersonCtrl},
        data() {
            return {
                data,
                columns,
                index: 4,
                expandedRowKeys: [],
                expandRowByClick: false,
                labelCol: {span: 6},
                wrapperCol: {span: 18}
            };
        },
        beforeCreate() {
            this.form = this.$form.createForm(this);
        },
        methods: {
            /**
             * <a-icon type = "up" onClick = {onExpand}/>
             * <a-icon type = "down" onClick = {onExpand}/>
             * @param props
             */
            expandIcon(props) {
                const {onExpand, expanded} = props;
                if (expanded) {
                    return <a-icon type = "up" onClick = {onExpand}/>
                } else {
                    return <a-icon type = "down" onClick = {onExpand}/>
                }
            },
            expandedRowsChange(expandedRows) {
                this.expandedRowKeys = expandedRows;
            },
            startDateChange(value, record) {
                if (!value) {
                    record.startErrorStatus = 'error';
                    record.startErrorMsg = '请选择起始时间';
                    return;
                } else {
                    record.startErrorStatus = '';
                    record.startErrorMsg = '';
                }
                if (moment(value).format('YYYY-MM-DD') != moment(value).startOf('month').format('YYYY-MM-DD')) {
                    record.startErrorStatus = 'error';
                    record.startErrorMsg = '起始日期必须为月初';
                } else if (moment(value).valueOf() > moment(record.endDate).valueOf()) {
                    record.startErrorStatus = 'error';
                    record.startErrorMsg = '起始日期必须小于结束日期';
                } else {
                    record.startErrorStatus = '';
                    record.startErrorMsg = '';
                    record.endErrorStatus = '';
                    record.endErrorMsg = '';
                    record.startErrorStatus = '';
                    record.startErrorMsg = '';
                }
            },
            endDateChange(value, record) {
                if (!value) {
                    record.endErrorStatus = 'error';
                    record.endErrorMsg = '请选择结束时间';
                    return;
                } else {
                    record.endErrorStatus = '';
                    record.endErrorMsg = '';
                }
                if (moment(value).format('YYYY-MM-DD') != moment(value).endOf('month').format('YYYY-MM-DD')) {
                    record.endErrorStatus = 'error';
                    record.endErrorMsg = '结束日期必须为月末';
                } else if (moment(value).valueOf() < moment(record.startDate).valueOf()) {
                    record.endErrorStatus = 'error';
                    record.endErrorMsg = '结束日期必须大于起始日期';
                } else {
                    record.endErrorStatus = '';
                    record.endErrorMsg = '';
                    record.startErrorStatus = '';
                    record.startErrorMsg = '';
                }
            },
            addParent() {
                this.index = this.index + 1;
                this.data.push({
                    key: this.index,
                    startDate: moment(),
                    endDate: moment("2099-12-31"),
                    name: "",
                    time: moment().format('YYYY-MM-DD HH:mm:ss'),
                    startErrorStatus: '',
                    startErrorMsg: '',
                    endErrorStatus: '',
                    endErrorMsg: '',
                    rateErrorStatus: '', // 比例错误状态
                    rateErrorMsg: '', // 比例错误信息
                    personList: []
                });
                this.expandedRowKeys.push(this.index);
            },
            deleteItem(item) {
            },
            deleteChild(item, record) {

            },
            changeItem(item) {
            },
            addPerson(record) {
                record.personList.push({
                    staffUm: "",
                    rate: "",
                    personErrorStatus: '',
                    personErrorMsg: '',
                    errorStatus: '',
                    msg: ''
                });
            },
            getStaffUm(value, item, record) {
                item.staffUm = value;
                if (!value) {
                    item.personErrorStatus = 'error';
                    item.personErrorMsg = '请选择人员';
                    return;
                } else {
                    item.personErrorStatus = '';
                    item.personErrorMsg = '';
                }
                let obj = {};
                // 人员计数
                record.personList.forEach(function (innerItem, innerIndex) {
                    if (innerItem.staffUm) {
                        if (!obj[innerItem.staffUm]) {
                            obj[innerItem.staffUm] = 1;
                        } else {
                            obj[innerItem.staffUm]++
                        }
                    }
                });
                for (let key in obj) {
                    record.personList.forEach(function (innerItem, innerIndex) {
                        if (innerItem.staffUm == key) {
                            if (obj[key] > 1) {
                                innerItem.personErrorStatus = 'error';
                                innerItem.personErrorMsg = '人员选择重复';
                            } else {
                                innerItem.personErrorStatus = '';
                                innerItem.personErrorMsg = '';
                            }
                        }
                    });
                }
            },
            /**
             *
             * @param e
             * @param item
             * @param record
             */
            rateChange(e, item, record) {
                let reg = /^(([1-9][0-9]|[1-9])(\.\d{1,6})?|0\.\d{1,6}|100)$/;
                if (!reg.test(e.target.value)) {
                    console.log(1);
                    item.errorStatus = 'error';
                    item.msg = '请输入正确的分配比例';
                    return;
                } else {
                    item.errorStatus = '';
                    item.msg = '';
                }
                record.personList.forEach(function (value, index) {
                    if (value.rate != '' && !reg.test(value.rate)) {
                        value.errorStatus = 'error';
                        value.msg = '请输入正确的分配比例';
                    }
                });
                // 时间段比例求和
                let sumRate = 0;
                record.personList.forEach(function (value, index) {
                    sumRate = sumRate + Number(value.rate);
                });
                if (sumRate > 100) {
                    record.rateErrorStatus = 'error';
                    record.rateErrorMsg = '该时间段分配比例超过100';
                } else {
                    record.rateErrorStatus = '';
                    record.rateErrorMsg = '';
                }
            },
            isOverlap(array) {
                let flag = true;
                let sortArray = _.orderBy(array, ['start'], ['asc']);
                for (let i = 0; i < sortArray.length-1; i++) {
                    if (sortArray[i].end > sortArray[i+1].start) {
                        flag = false;
                        break;
                    }
                }
                return flag;
            },
            handleSubmit(e) {
                e.preventDefault();
                let timeArr = [];
                this.form.validateFields((err, values) => {
                    values.list.forEach(function (outterItem, outterIndex) {
                        timeArr.push({
                            start: moment(outterItem.startDate).valueOf(),
                            end: moment(outterItem.endDate).valueOf()
                        });


                        outterItem.personList.forEach(function (innerItem, innerIndex) {
                            if (innerItem.rate == '') {
                                innerItem.errorStatus = 'error';
                                innerItem.msg = '分配比例不能为空';
                            }
                            if (innerItem.staffUm == '') {
                                innerItem.personErrorStatus = 'error';
                                innerItem.personErrorMsg = '请选择人员';
                            }
                        })
                    });
                    let hasError = false;
                    // 时间段重复校验
                    if (timeArr.length > 1) {
                        let isOverlapFlag = this.isOverlap(timeArr);
                        if (!isOverlapFlag) { // 时间段重叠
                            this.$message.warning('时间段重复！');
                            hasError = true;
                        } else {
                            hasError = false;
                        }
                    }
                    // 错误收集器
                    for (let i = 0; i < values.list.length; i++) {
                        let item = values.list[i];
                        if (item.startErrorStatus || item.endErrorStatus || item.rateErrorStatus) {
                            hasError = true;
                            break;
                        }
                        for (let j = 0; j < item.personList.length; j++) {
                            let innerItem = item.personList[j];
                            if (innerItem.personErrorStatus || innerItem.errorStatus) {
                                hasError = true;
                                break;
                            }
                        }
                    }
                    if (hasError) {
                        this.$message.warning('表单数据有错误，无法提交！');
                    }
                    if (!err && !hasError) {
                        console.log("Received values of form: ", values);
                    }
                });
            },
        },
        mounted() {
            console.log(_);
            this.form.getFieldDecorator("list", {
                initialValue: this.data,
                preserve: true
            });
        }
    };
</script>
<style scoped lang="less">
    /deep/ .ant-form-item {
        margin-top: 24px;
    }
</style>

