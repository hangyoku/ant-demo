const person = {
    namespaced: true,
    state: {
        userInfo: {
            name: 'zhangsan',
            age: 100
        }
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo;
        }
    },
    mutations: {
        changeUserName(state, name) {
            state.userInfo.name = name
        },
        changeUserAge(state, age) {
            state.userInfo.age = age
        }
    },
    actions: {
        _changeUserName(content, name) {
            content.commit('changeUserName', name);
        },
        _changeUserAge(content, age) {
            content.commit('changeUserAge', age);
        }
    }
};


export default person