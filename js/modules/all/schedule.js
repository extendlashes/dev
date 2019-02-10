export default {
    namespaced: true,

    state: {
        schedule: [],

        selected: {
            date: '',
            time: ''
        }
    },

    getters: {
        schedule(state) {
            return state.schedule;
        },
        selected(state) {
            return state.selected;
        }
    },

    mutations: {
        updateSchedule(state, payload) {
            state.schedule = payload;
        },
        updateSelected(state, payload) {
            state.selected = payload;
        },
        dayTimeHandler(state, payload) {
            state.schedule.forEach(function(eD, iD) {
                let showD = false;

                eD.times.forEach(function(eT, iT) {
                    let showT = false;

                    eT.dayTime.forEach(function(eP) {//поменять может на eDate  eTime  eDayTime или eDT
                        if(payload.dayTime[eP]) {
                            showD = true;
                            showT = true;
                        }
                    });

                    state.schedule[iD].times[iT].show = showT;
                });

                state.schedule[iD].show = showD;
            });
        },
        deleteSelectedFromSchedule(state) {
            state.schedule.forEach(function(date, d) {
                if (state.selected.date === date.date) {
                    date.times.forEach(function(time, t) {
                        if (state.selected.time === time.time) {
                            if (state.schedule[d].times.length > 1) {
                                state.schedule[d].times.splice(t, 1);
                            } else {
                                state.schedule.splice(d, 1);
                            }
                        }
                    });
                }
            });
        }
    }
};