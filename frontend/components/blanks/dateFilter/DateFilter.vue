<template>
    <div class="date-filter">
        <date-filter-item v-if="type !== 'walletChart'" value="15M" />
        <date-filter-item v-if="type !== 'walletChart'" value="1H" />
        <date-filter-item v-if="type !== 'walletChart'" value="3H" />
        <date-filter-item value="1D" />
        <date-filter-item value="7D" />
        <date-filter-item value="1M" />
        <!-- <date-filter-item value="3M" /> -->
        <date-filter-item v-if="type === 'walletChart'" value="1Y" />
        <date-filter-item v-if="type === 'walletChart'" value="YTD" />
        <date-filter-item
            v-if="type === 'chart' || type === 'walletChart'"
            value="ALL"
        />

        <!-- <date-filter-item type="calendar" />
        <div v-if="showCalendar" class="date-filter__calendar">
            <datepicker />
        </div> -->
    </div>
</template>

<script>
// import Datepicker from '@/components/blanks/datepicker/Datepicker.vue';
import DateFilterItem from '@/components/blanks/dateFilter/DateFilterItem.vue';

export default {
    components: { DateFilterItem },
    props: {
        type: {
            type: String,
            default: 'default',
        },
    },
    data() {
        return {
            showTooltip: false,
        };
    },
    computed: {
        showCalendar() {
            return this.$store.state.datefilter.showCalendar;
        },
    },

    methods: {
        closeCalendar() {
            if (this.showCalendar === true) {
                this.$store.dispatch('datefilter/closeCalendar', {
                    show: false,
                });
            }
        },
        toggle() {
            this.$store.dispatch('datefilter/closeCalendar', {
                show: this.showCalendar === false ? true : false,
            });
        },
    },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/dateFilter/date-filter.scss"
></style>
