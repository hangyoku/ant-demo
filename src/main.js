// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from "vue-router";
import createRouter from './router'
import Vuex from "vuex"
import store from "./store"
import "./style/app.css"
import 'ant-design-vue/dist/antd.css'
import api from "./service/api";
import _ from "lodash"
import {DatePicker, Button, Select, Form, Input, Row, Col, TreeSelect, Table, Modal, Card, Icon, message} from 'ant-design-vue';

Vue.use(DatePicker).use(Button).use(Select).use(Form).use(Input).use(Row).use(Col).use(TreeSelect).use(Table).use(Modal).use(Card).use(Icon);

Vue.prototype.$message = message;
Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueRouter);

Vue.prototype.$store = store;
Vue.prototype.$api = api;

const router = createRouter();
/* eslint-disable no-new*/
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount("#app");
