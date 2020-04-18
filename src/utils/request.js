import axios from "axios";
import router from "@/router";

const service = axios.create({
    timeout: 20000,
});
service.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response) => {
        console.log(response);
        if (response.headers &&
            (response.headers["content-type"] === "application/x-msdownload" ||
                response.headers["content-type"] === "application/msexcel")) {
            downloadUrl(response);
            return Promise.resolve(response.data);
        }
        return Promise.resolve(response.data);
    },
    (error) => {
        return Promise.reject(error);
    }
);
//使用iframe框架下载文件
const downloadUrl = (res) => {
    const content = res.data;
    const blob = new Blob([content]);
    const dis = res.headers['attache-disposition']||'';
    let fm = /filename=[^;]*/.exec(dis);
    let filename = decodeURIComponent(
        res.headers["attachment-name"] || "undefined"
    );
    if ("download" in document.createElement("a")) {
        // 非IE下载
        const elink = document.createElement("a");
        elink.download = filename;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
    } else {
        // IE10+下载
        navigator.msSaveBlob(blob, filename);
    }
};

export default service;
