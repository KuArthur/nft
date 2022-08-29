<template>
    <div v-click-outside="hideSelect" class="select-chart">
        <div
            :class="`select-chart__selected select-chart__selected--${chart}`"
            @click="toggleList"
        >
            <span class="select-chart__selected-text">{{ selected }}</span>
            <i class="select-chart__icon icon-sort-down"></i>
        </div>
        <ul
            :class="[
                'select-chart__list',
                visible ? 'select-chart__list--visible' : '',
            ]"
        >
            <li
                v-for="(option, idx) in options"
                :key="idx"
                class="select-chart__item"
                @click="selectOption(option)"
            >
                {{ option.name }}
            </li>
        </ul>
    </div>
</template>

<script>
import vClickOutside from 'v-click-outside';

export default {
    directives: {
        clickOutside: vClickOutside.directive,
    },
    props: {
        chart: {
            type: String,
            required: true,
        },

        defaultOption: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            visible: false,
            selected: this.defaultOption,
        };
    },

    computed: {
        options() {
            return this.$store.state.chart.options;
        },
    },

    created() {
        switch (this.chart) {
            case 'green':
                this.selected =
                    this.$cookies.get('nft-analytics.greenSelect')?.name ||
                    this.defaultOption;
                break;
            case 'black':
                this.selected =
                    this.$cookies.get('nft-analytics.blackSelect')?.name ||
                    this.defaultOption;
                break;
        }
    },

    mounted() {
        this.$nuxt.$on('hideSelects', () => {
            this.hideSelect();
        });
    },

    beforeDestroy() {
        this.$nuxt.$off('hideSelects');
    },

    methods: {
        toggleList() {
            this.$nuxt.$emit('hideSelect');
            !this.visible ? (this.visible = true) : (this.visible = false);
        },

        selectOption(option) {
            this.selected = option.name;
            this.visible = false;
            this.$emit('select-value', option);
        },

        hideSelect() {
            this.visible = false;
        },
    },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/chart/selectChart/select-chart.scss"
></style>
