<template>
    <div :class="['table-menu', { disable: loading }]">
        <div class="table-menu__wrapper">
            <div class="table-menu__left">
                <div class="table-menu__item">
                    <table-menu-item
                        icon="star"
                        type="watchlist"
                        @handle-click="toggleWatchlist()"
                    >
                        Watchlist
                    </table-menu-item>
                </div>
                <table-menu-item
                    icon="filter"
                    @click.native="toggleFilterList()"
                >
                    Filters
                </table-menu-item>
                <div
                    :class="[
                        'table-menu__item',
                        {
                            'table-menu__item--active': activeFilter == '1',
                        },
                    ]"
                >
                    <table-menu-item
                        icon="filter"
                        type="filter"
                        @click.native="setFilter('1')"
                    >
                        AB Curated
                    </table-menu-item>
                </div>
                <div
                    :class="[
                        'table-menu__item',
                        {
                            'table-menu__item--active': activeFilter == '2',
                        },
                    ]"
                >
                    <table-menu-item
                        icon="filter"
                        type="filter"
                        @click.native="setFilter('2')"
                    >
                        AB Playground
                    </table-menu-item>
                </div>
                <div
                    :class="[
                        'table-menu__item',
                        {
                            'table-menu__item--active': activeFilter == '3',
                        },
                    ]"
                >
                    <table-menu-item
                        icon="filter"
                        type="filter"
                        @click.native="setFilter('3')"
                    >
                        AB Factory
                    </table-menu-item>
                </div>
            </div>
            <div class="table-menu__right">
                <div class="table-menu__searchbar">
                    <search-bar />
                </div>
                <div class="table-menu__currency-filter">
                    <currency-filter />
                </div>
                <div class="table-menu__table-filter">
                    <date-filter />
                </div>
            </div>
        </div>
        <div v-if="filterListVisible" class="table-menu__filters">
            <table-menu-filter value="items">Items</table-menu-filter>
            <!-- <table-menu-filter value="mint">Mint Price</table-menu-filter> -->
            <table-menu-filter value="uniqb">Holders Change</table-menu-filter>
            <table-menu-filter value="vol, psc">Volume, PSC</table-menu-filter>
            <table-menu-filter value="avg">AVG</table-menu-filter>
            <!-- <table-menu-filter value="f/mp %"
                >Change Floor/Mint Price, %</table-menu-filter
            > -->
            <i
                class="table-menu__icon table-menu__icon--filter"
                @click="clearAllFilters"
            ></i>
        </div>
    </div>
</template>

<script>
import DateFilter from '@/components/blanks/dateFilter/DateFilter.vue';
import SearchBar from '@/components/blanks/searchBar/SearchBar.vue';
import TableMenuItem from '@/components/blanks/table/TableMenuItem.vue';
import TableMenuFilter from '@/components/blanks/table/TableMenuFilter.vue';
import CurrencyFilter from '@/components/blanks/currencyFilter/CurrencyFilter.vue';

export default {
    components: {
        TableMenuItem,
        SearchBar,
        DateFilter,
        TableMenuFilter,
        CurrencyFilter,
    },

    data() {
        return {
            filter: '',
            active: false,
            filterListVisible: false,
        };
    },

    computed: {
        loading() {
            return this.$store.state.collections.loading;
        },

        setWatchlist() {
            return this.$store.state.params.setWatchlist;
        },

        activeFilter() {
            return this.$store.state.params.activeArtBlock;
        },
    },

    created() {
        this.filter = this.activeFilter;
    },

    methods: {
        async setFilter(filter) {
            this.filter = filter;
            this.active = true;

            this.$store.dispatch('params/resetPage');

            if (this.filter == this.activeFilter) {
                await this.$store.dispatch('params/setArtBlock', {
                    artBlock: '',
                });

                this.active = false;
            } else {
                await this.$store.dispatch('params/setArtBlock', {
                    artBlock: this.filter,
                });
            }

            await this.$store.dispatch('collections/setCollectionsList');
        },

        clearAllFilters() {
            this.$store.dispatch('tableFilters/clearFilters');
        },

        toggleFilterList() {
            this.filterListVisible = !this.filterListVisible;
            this.filterListVisible
                ? (this.active = true)
                : (this.active = false);
        },

        async toggleWatchlist() {
            this.$store.dispatch('params/resetPage');

            await this.$store.dispatch('params/setWatchlist', {
                set: !this.setWatchlist,
            });

            await this.$store.dispatch('collections/setCollectionsList');
        },
    },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/table/table-menu.scss"
></style>
