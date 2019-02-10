export default {
    namespaced: true,

    state: {
        role: '',
        phone: ''
    },

    getters: {
        role(state) {
            return state.role;
        },
        phone(state) {
            return state.phone;
        }
    },

    mutations: {
        updateRole(state, payload) {
            state.role = payload;
        },
        updatePhone(state, payload) {
            state.phone = payload;
        }
    }
};