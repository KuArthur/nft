<template>
    <div v-click-outside="hideCalendar" class="datepicker">
        <div class="datepicker__top">
            <v-date-picker
                v-model="range"
                is-range
                :locale="{ id: 'en', masks: { weekdays: 'WW' } }"
                @input="selectRange"
            />
            <div class="datepicker__predefined-dates">
                <p class="datepicker__predefined-dates-title">
                    Predefined dates
                </p>

                <label class="datepicker__predefined-dates-label">
                    <input
                        v-model="value"
                        class="datepicker__predefined-dates-date"
                        type="radio"
                        name="filter"
                        value="7"
                        @change="selectDate"
                    />
                    <span class="datepicker__predefined-dates-text"
                        >Last 7 days</span
                    >
                </label>
                <label class="datepicker__predefined-dates-label">
                    <input
                        v-model="value"
                        class="datepicker__predefined-dates-date"
                        type="radio"
                        name="filter"
                        value="30"
                        @change="selectDate"
                    />
                    <span class="datepicker__predefined-dates-text"
                        >Last 30 days</span
                    >
                </label>
                <label class="datepicker__predefined-dates-label">
                    <input
                        v-model="value"
                        class="datepicker__predefined-dates-date"
                        type="radio"
                        name="filter"
                        value="90"
                        @change="selectDate"
                    />
                    <span class="datepicker__predefined-dates-text"
                        >Last 90 days</span
                    >
                </label>
                <label class="datepicker__predefined-dates-label">
                    <input
                        v-model="value"
                        class="datepicker__predefined-dates-date"
                        type="radio"
                        name="filter"
                        value="180"
                        @change="selectDate"
                    />
                    <span class="datepicker__predefined-dates-text"
                        >Last 180 days</span
                    >
                </label>

                <label class="datepicker__predefined-dates-label">
                    <input
                        v-model="value"
                        class="datepicker__predefined-dates-date"
                        type="radio"
                        name="filter"
                        value="365"
                        @change="selectDate"
                    />
                    <span class="datepicker__predefined-dates-text"
                        >Last 365 days</span
                    >
                </label>
            </div>
        </div>
        <div class="datepicker__bottom">
            <button class="datepicker__cancel" @click="closeCalendar">
                Cancel
            </button>
            <div class="datepicker__bottom-right">
                <p class="datepicker__selected">
                    Selected:
                    <span class="datepicker__selected-date">{{
                        selectedDates
                    }}</span>
                </p>
                <button
                    :class="[
                        'datepicker__continue',
                        {
                            'datepicker__continue--disable': !range,
                        },
                    ]"
                    @click="setPeriod"
                >
                    Continue
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

import vClickOutside from 'v-click-outside';

export default {
    directives: {
        clickOutside: vClickOutside.directive,
    },
    data() {
        return {
            range: null,
            value: '',
        };
    },

    computed: {
        selectedDates() {
            if (this.range) {
                let numberDays =
                    (moment(this.range.end) - moment(this.range.start)) /
                        (60 * 60 * 24 * 1000) +
                    1;
                return (
                    numberDays.toFixed() +
                    (numberDays.toFixed() === '1' ? ' day' : ' days')
                );
            }

            return '';
        },
    },

    mounted() {
        this.$nuxt.$on('hideCalendar', () => {
            this.hideCalendar();
        });
    },

    beforeDestroy() {
        this.$nuxt.$off('hideCalendar');
    },

    updated() {
        console.log(this.range);
    },

    methods: {
        closeCalendar() {
            this.$nuxt.$emit('hideCalendar');
        },

        selectDate() {
            this.range = {
                end: moment(new Date()).subtract(1, 'd').format('YYYY-MM-DD'),
                start: moment(new Date())
                    .subtract(this.value, 'd')
                    .format('YYYY-MM-DD'),
            };

            console.log(this.range);
        },
        selectRange() {
            console.log(this.range);
            this.value = false;
        },

        async setPeriod() {
            this.$store.dispatch('params/resetPage');

            await this.$store.dispatch('params/setPeriod', {
                period: {
                    start: moment(this.range.start).format('YYYY-MM-DD'),
                    end: moment(this.range.end).format('YYYY-MM-DD'),
                },
            });

            await this.$store.dispatch('collections/setCollectionsList');
        },

        hideCalendar() {
            this.$store.dispatch('datefilter/closeCalendar', { show: false });
        },
    },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/datepicker/datepicker.scss"
></style>
