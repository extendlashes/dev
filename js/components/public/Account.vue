<template>
    <div>
        <div class="wrapper">
            <schedule-filter v-if="!selected.date"></schedule-filter>
            <keep-alive>
                <schedule v-if="!selected.date"></schedule>
            </keep-alive>
            <schedule-record v-if="selected.date"></schedule-record>
        </div>
        <footer>
            <div>2019 © <a href="/">dev.extendlashes</a></div>
            <div>Бесплатный сервис онлайн записи</div>
        </footer>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'Vuex';
    import ScheduleFilter             from '../all/ScheduleFilter.vue';
    import Schedule                   from '../all/Schedule.vue';
    import ScheduleRecord             from '../all/ScheduleRecord.vue';

    export default {
        name: "account",
        components: {ScheduleFilter, Schedule, ScheduleRecord},
        props: ['phone'],
        created() {
            this.updateRole('public');
            this.updatePhone(this.phone);
        },
        computed: {
            ...mapGetters('schedule', ['selected'])
        },
        methods: {
            ...mapMutations('general', ['updateRole', 'updatePhone'])
        }
    }
</script>

<style lang="less">
    @import "../../../css/less/public.less";
</style>

<style lang="less" scoped>
    @import (reference) "../../../css/less/public.less";

    footer {
        padding: 30px 0 10px 0;

        div {
            width: 100%;
            text-align: center;
            color: @main-color;

            .font-xxs();

            a {
                .font-xxs();
            }
        }
    }
</style>