<template>
    <div class="filter-list">
        <p class="filter-list__title">Filters</p>
        <div class="filter-list__wrapper">
            <filter-item> Unique Buyers </filter-item>
            <filter-item> Volume, PSC </filter-item>
            <filter-item> AVG </filter-item>
            <filter-item> Floor/Mint Price, % </filter-item>
        </div>
    </div>
</template>

<script>
import FilterItem from '@/components/blanks/filter/FilterItem.vue';
export default {
    components: { FilterItem },
};
</script>
<style
    lang="scss"
    src="~/assets/scss/components/blanks/filter/filter-list.scss"
></style>
