<template>
    <div
        :class="[
            'table-menu-filter',
            filters.includes(value) ? 'table-menu-filter--checked' : '',
        ]"
        @click="toggleFilter"
    >
        <slot />
    </div>
    <!-- <label class="table-menu-filter">
        <input
            class="table-menu-filter__checkbox"
            type="checkbox"
            name="table-filter"
            :value="value"
        />
        <slot />
    </label> -->
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            required: true,
        },
    },

    computed: {
        filters() {
            return this.$store.state.tableFilters.filters;
        },
    },

    methods: {
        toggleFilter() {
            this.$store.dispatch('tableFilters/toggleFilter', {
                filter: this.value,
            });
        },
    },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/table/table-menu-filter.scss"
></style>
