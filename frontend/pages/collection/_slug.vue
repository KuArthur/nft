<template>
    <div class="collection">
        <div class="collection__top">
            <chart :dataChart="dataChart" />
            <div class="collection__info">
                <collection-info :collection="collection" />
                <div v-show="false" class="collection__info-filter">
                    <filter-list />
                </div>
            </div>
        </div>
        <div v-show="false" class="collection__bottom">
            <!-- <analytics-table :analytics="collection.collection_stats" /> -->
        </div>
    </div>
</template>

<script>
// import AnalyticsTable from '@/components/blanks/analyticsTable/AnalyticsTable.vue';
import Chart from '@/components/blanks/chart/Chart.vue';
import CollectionInfo from '@/components/blanks/collectionInfo/CollectionInfo.vue';
import FilterList from '@/components/blanks/filter/FilterList.vue';

export default {
    components: {
        Chart,
        CollectionInfo,
        FilterList,
        // AnalyticsTable,
    },

    async asyncData({ store, route }) {
        await store.dispatch('chart/setSlug', route.params.slug);

        await store.dispatch('collections/setCollection', {
            slug: route.params.slug,
        });

        await store.dispatch('chart/loadChartParams');

        await store.dispatch('chart/setDataChart', {
            slug: route.params.slug,
        });
    },

    computed: {
        collection() {
            return this.$store.state.collections.collection;
        },

        dataChart() {
            console.log('updateChart', this.$store.state.chart.dataChart);
            return this.$store.state.chart.dataChart;
        },
    },
};
</script>

<style lang="scss" src="~/assets/scss/pages/collection/collection.scss" />
