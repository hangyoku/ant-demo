<template>
	<div>
		<div v-for="(item,index) in arr" :key="index">
			<a-date-picker @change="onChange($event,item)" />
		</div>
		<a-button type="primary" @click="clickBtn">修改</a-button>
		<a-modal title="表单校验" :visible="visible" :footer="null" @cancel="handleCancel">
			<a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
				<a-form-item label="姓名">
					<a-input
						v-decorator="['name', { rules: [{ required: true, message: '请输入姓名！' }] }]"
						placeholder="请输入您的姓名"
					/>
				</a-form-item>
				<a-form-item label="性别">
					<a-select
						v-decorator="['gender',{ rules: [{ required: true, message: '请选择性别！' }]}]"
						placeholder="请选择性别"
					>
						<a-select-option value="male">男</a-select-option>
						<a-select-option value="female">女</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item :wrapper-col="{ span: 12, offset: 10 }">
					<a-button type="primary" html-type="submit">确定</a-button>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "DropDownList",
	data() {
		return {
			arr: [
				{ key: 1, name: "zhangsan" },
				{ key: 2, name: "lisi" }
			],
			visible: false,
			formLayout: "horizontal",
			form: this.$form.createForm(this)
		};
	},
	computed: {
		...mapState({
			name: state => state.person.userInfo.name,
			age: state => state.person.userInfo.age
		})
	},
	methods: {
		onChange(date, dateString) {
			console.log(date, dateString);
		},
		handleSubmit(e) {
			e.preventDefault();
			this.form.validateFields((err, values) => {
				console.log(values);
				if (!err) {
					console.log("Received values of form: ", values);
				}
			});
		},
		handleCancel(e) {
			this.visible = false;
		},
		clickBtn() {
			this.visible = true;
			this.$store.dispatch("person/_changeUserAge", 108);
			console.log(this.age);
		}
	},
	mounted() {
		console.log(this.age);
	}
};
</script>

