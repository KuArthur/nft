<template>
    <!-- @mouseenter="showTooltip = true"
        @mouseleave="showTooltip = false" -->
    <label class="date-filter__label">
        <input
            v-if="type === 'calendar'"
            class="date-filter__filter"
            type="radio"
            name="filter"
            @click="toggle"
        />

        <input
            v-else
            v-model="datefilter"
            :value="value"
            class="date-filter__filter"
            type="radio"
            name="filter"
            @click="closeCalendar"
        />
        <i
            v-if="type === 'calendar'"
            class="icon-datepicker date-filter__datepicker"
        />
        <span v-else class="date-filter__text">{{ value }}</span>

        <div v-if="showTooltip" class="date-filter__tooltip">
            <tooltip />
        </div>
    </label>
</template>

<script>
import Tooltip from '@/components/blanks/tooltip/Tooltip.vue';

export default {
    components: { Tooltip },
    props: {
        value: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'button',
        },
    },
    data() {
        return {
            showTooltip: false,
        };
    },

    computed: {
        showCalendar: {
            get() {
                return this.$store.state.datefilter.showCalendar;
            },

            set(newValue) {
                this.$store.dispatch('datefilter/closeCalendar', {
                    show: newValue,
                });
            },
        },

        datefilter: {
            get() {
                let result;
                switch (this.$route.name) {
                    case 'index':
                        result = this.$store.state.params.dateFilter;
                        break;
                    case 'collection-slug':
                        result = this.$store.state.chart.datefilter;
                        break;
                }

                return result;
            },

            set(newValue) {
                $nuxt.$emit('change-datefilter', newValue);
            },
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
