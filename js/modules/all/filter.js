export default {
    namespaced: true,

    state: {
        day: {
            'ПН': true,
            'ВТ': true,
            'СР': true,
            'ЧТ': true,
            'ПТ': true,
            'СБ': true,
            'ВС': true
        },
        dayTime: {
            'Утро': true,
            'День': true,
            'Вечер': true,
            'Ночь': true
        }
    },

    getters: {
        day(state) {
            return state.day;
        },
        dayTime(state) {
            return state.dayTime;
        }
    },

    mutations: {
        updateDay(state, payload) {
            state.day[payload.key] = payload.value;
        },
        updateDayTime(state, payload) {
            state.dayTime[payload.key] = payload.value;
        }
    }
};