<template>
    <table class="schedule">
        <tr v-for="date in schedule" v-if="day[__date(date.date).split(' ')[1]] && date.show">
            <td class="date">
                <div class="font-xs">{{__date(date.date).split(' ', 2).join(' ')}}</div>
                <div class="font-xxs">{{__date(date.date).split(' ')[2]}}</div>
                <div class="hb"></div>
            </td>
            <td class="times">
                <div
                        v-for="time in date.times"
                        v-if="time.show"
                        :class="'font-l time' + (time.discount ? ' discount' : '')"
                        @click="updateSelected({date: date.date, time: time.time})">{{time.time}}</div>
            </td>
        </tr>
    </table>
</template>

<script>
    import {mapGetters, mapMutations} from 'Vuex';

    export default {
        name: "schedule",
        created() {
            this.getSchedule();
        },
        watch: {
            dayTime: {
                handler: function(dayTime) {
                    this.dayTimeHandler({dayTime: dayTime});
                },
                deep: true
            }
        },
        computed: {
            ...mapGetters('filter', ['day', 'dayTime']),
            ...mapGetters('general', ['role', 'phone']),
            ...mapGetters('schedule', ['schedule']),
        },
        methods: {
            ...mapMutations('schedule', ['updateSchedule', 'updateSelected', 'dayTimeHandler']),

            getSchedule() {
                let request = new XMLHttpRequest();
                request.open('GET', '/schedule/get/' + this.role + '/' + this.phone, true);
                request.send();

                request.onreadystatechange = () => {
                    if (request.readyState === 4) {
                        if (request.status === 200) {
                            const response = JSON.parse(request.response);

                            if (response.data) {
                                this.updateSchedule(response.data[0]);

                                this.dayTimeHandler({dayTime: this.dayTime});
                            }
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import (reference) "../../../css/less/public.less";


    .schedule {
        tr {
            border-bottom: 12px solid @background;

            .date {
                position: relative;
                vertical-align: top;
                border-right: @border-width solid @main-color;

                div {
                    text-align: right;
                    color: @main-color;
                    padding: 0 5px 0 0;
                }

                .hb {
                    position: absolute;
                    right: -@border-width;
                    bottom: 0;
                    width: @border-width;
                    height: @space;
                    background: @background;
                    padding: 0;
                }
            }

            .times {
                .clearfix();

                .time {
                    margin: 0 0 @space @space;
                    padding: 6px 12px;
                    float: left;
                    color: #ffffff;
                    background-image: url(/images/bgmessage1.png);
                    background-position: 0 0;
                    background-size: 100% 100%;

                    &.discount {
                        background-image: url(/images/bgmessage2.png);
                    }
                }
            }
        }
    }
</style>