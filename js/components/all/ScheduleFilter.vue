<template>
    <div class="filter">
        <table>
            <tr>
                <td v-for="(i, v) in day" @click="updateDay({key: v, value: !i})">
                    <div :class="day[v] ? 'on' : 'off'">{{v}}</div>
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <td v-for="(i, v) in dayTime" @click="updateDayTime({key: v, value: !i})">
                    <div :class="dayTime[v] ? 'on' : 'off'">{{v}}</div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'Vuex';

    export default {
        name: "schedule-filter",
        computed: {
            ...mapGetters('filter', ['day', 'dayTime'])
        },
        methods: {
            ...mapMutations('filter', ['updateDay', 'updateDayTime'])
        }
    }
</script>

<style lang="less" scoped>
    @import (reference) "../../../css/less/public.less";

    .filter {
        margin-bottom: 30px;

        table {
            margin-bottom: 10px;

            td {
                padding: 0 @space 0 0;

                div {
                    padding: 2px 4px;
                    border: @border-width solid @main-color;
                    cursor: pointer;

                    .font-s();

                    &.on {
                        background: @main-color;
                        color: #ffffff;
                    }

                    &.off {
                        background: none;
                        color: @main-color;
                    }
                }
            }
        }
    }
</style>