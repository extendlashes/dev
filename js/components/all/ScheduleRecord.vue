<template>
    <div>
        <div @click="updateSelected({date: '', time: ''})">Назад</div>
        <br>
        <div>{{__date(selected.date)}} {{selected.time}}</div>
        <br>
        <div v-if="status === 'form'">
            <input type="text" v-model="clientName">
            <input type="text" v-model="clientPhone">
            <br>
            <br>
            <div v-if="clientName && clientPhone.length === 12" @click="submit()">Записаться</div>
        </div>
        <div v-if="status === 'submiting'" class="submiting">Идет отправка...</div>
        <div v-if="status === 'success'" class="success">Вы успешно записались!</div>
        <div v-if="status === 'error'" class="error">{{error}}</div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'Vuex';

    export default {
        name: "schedule-record",
        data() {
            return {
                clientName: '',
                clientPhone: '+79',

                status: 'form',
                error: ''
            };
        },
        watch: {
            clientName: function(v) {
                this.clientName = v.trim() ? v.replace(/[\d_]+/ug, '').replace(/\s+/ug, ' ').replace(/[^\w\s\u0430-\u044f\u0451]/ugi, '').substr(0, 32) : '';
            },
            clientPhone: function(v) {
                this.clientPhone = v.length > 3 && v.substr(0, 3) === '+79' ? '+79' + v.substr(3).replace(/\D/ug, '').substr(0, 9) : '+79';
            }
        },
        computed: {
            ...mapGetters('general', ['role', 'phone']),
            ...mapGetters('schedule', ['selected'])
        },
        methods: {
            ...mapMutations('schedule', ['updateSelected', 'deleteSelectedFromSchedule']),

            submit() {
                this.status = 'submiting';

                let request = new XMLHttpRequest();
                request.open('GET', '/record/insert/' + this.role + '/' + this.phone + '/' + this.selected.date + '/' + this.selected.time + '/' + this.clientName.trim() + '/' + this.clientPhone.substr(1), true);
                request.send();

                request.onreadystatechange = () => {
                    if (request.readyState === 4) {
                        try {
                            if (request.status === 200) {
                                const response = JSON.parse(request.response);

                                if (response.data) {
                                    this.deleteSelectedFromSchedule();
                                    this.status = 'success';
                                } else if (response.errors) {
                                    const error = response.errors[0];

                                    if (error) {
                                        throw new Error(error.detail);
                                    } else {
                                        throw new Error('error');
                                    }
                                } else {
                                    throw new Error('error');
                                }
                            } else {
                                throw new Error('error');
                            }
                        } catch (e) {
                            if (e.message === 'time not found') {
                                this.deleteSelectedFromSchedule();
                                this.error = 'Ошибка! Это время только что заняли!';
                            } else {
                                this.error = 'Во время записи произошла ошибка. Попробуйте еще раз позже или позвоните мастеру ' + this.__phone(this.phone);
                            }
                            this.status = 'error';
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import (reference) "../../../css/less/public.less";



    input {
        padding: 5px;
    }
    .submiting {
        color: gray;
    }
    .success {
        color: green;
    }
    .error {
        color: red;
    }
</style>