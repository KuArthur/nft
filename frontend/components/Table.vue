<template>
    <div class="table">
        <div v-if="loading" class="table__loader">
            <div class="table__loader-icon" />
        </div>
        <div class="table__menu">
            <table-menu />
        </div>
        <table ref="table" :class="{ disable: loading }" class="table__table">
            <thead class="table__header">
                <tr class="table__header-row">
                    <th
                        class="table__header-item table__header-item--star"
                    ></th>
                    <th class="table__header-item table__header-item--number">
                        <span
                            class="table__header-text table__header-text--number"
                            >#</span
                        >
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'collection_id'
                            )} table__header-sort-icon`"
                        ></i>
                    </th>
                    <th class="table__header-item table__header-item--name">
                        <span class="table__header-text">Collection</span>
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'name'
                            )} table__header-sort-icon`"
                        ></i>
                    </th>
                    <th
                        class="table__header-item table__header-item--opensea"
                    ></th>
                    <th
                        class="table__header-item table__header-item--graph"
                    ></th>

                    <th
                        v-if="filters.includes('mint')"
                        class="table__header-item"
                        @click="sortCollections('mint')"
                    >
                        <span class="table__header-text">Mint</span>
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'mint'
                            )} table__header-sort-icon`"
                        ></i>
                    </th>

                    <th
                        class="table__header-item table__header-item--volume"
                        @click="sortCollections('total_volume')"
                    >
                        <span class="table__header-text">Volume</span>
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'total_volume'
                            )} table__header-sort-icon`"
                        ></i>
                    </th>
                    <th
                        class="table__header-item table__header-item--volume-change"
                        @click="sortCollections('volume_change')"
                    >
                        <span class="table__header-text">Volume, %</span>
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'volume_change'
                            )} table__header-sort-icon`"
                        ></i>
                    </th>
                    <th
                        v-if="filters.includes('vol, psc')"
                        class="table__header-item"
                        @click="sortCollections('total_sales')"
                    >
                        <span class="table__header-text">Vol, psc</span>
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'total_sales'
                            )} table__header-sort-icon`"
                        ></i>
                    </th>
                    <th
                        class="table__header-item table__header-item--floor"
                        @click="sortCollections('floor_price')"
                    >
                        <span class="table__header-text">Floor</span>
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'floor_price'
                            )} table__header-sort-icon`"
                        ></i>
                    </th>
                    <th
                        class="table__header-item table__header-item--floor-change"
                        @click="sortCollections('floor_change')"
                    >
                        <span class="table__header-text">Floor, %</span>
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'floor_change'
                            )} table__header-sort-icon`"
                        ></i>
                    </th>
                    <th
                        class="table__header-item table__header-item--holders"
                        @click="sortCollections('num_owners')"
                    >
                        <span class="table__header-text">Holders</span>
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'num_owners'
                            )} table__header-sort-icon`"
                        ></i>
                    </th>
                    <th
                        v-if="filters.includes('items')"
                        class="table__header-item"
                        @click="sortCollections('total_supply')"
                    >
                        <span class="table__header-text">Items</span>
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'total_supply'
                            )} table__header-sort-icon`"
                        ></i>
                    </th>
                    <th
                        v-if="filters.includes('f/mp %')"
                        class="table__header-item"
                        @click="sortCollections('floor_to_mint')"
                    >
                        <span class="table__header-text">F/MP %</span>
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'floor_to_mint'
                            )} table__header-sort-icon`"
                        ></i>
                    </th>
                    <!-- <th
                        
                        :class="{'disable': loading}"
                        class="table__header-item table__header-item--listed"
                        @click="sortCollections('listing')"
                    >
                        <span class="table__header-text">Listed</span>
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'listing'
                            )} table__header-sort-icon`"
                        ></i>
                    </th> -->
                    <th
                        v-if="filters.includes('avg')"
                        class="table__header-item"
                        @click="sortCollections('average_price')"
                    >
                        <span class="table__header-text">AVG</span>
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'average_price'
                            )} table__header-sort-icon`"
                        ></i>
                    </th>

                    <!-- <th
                        
                        :class="{'disable': loading}"
                        class="table__header-item table__header-item--listed-change"
                        @click="sortCollections('listing')"
                    >
                        <span class="table__header-text">Listed, %</span>
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'listing'
                            )} table__header-sort-icon`"
                        ></i>
                    </th> -->

                    <th
                        v-if="filters.includes('uniqb')"
                        class="table__header-item"
                        @click="sortCollections('unique_buyers')"
                    >
                        <span class="table__header-text">Hldrs chng</span>
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'unique_buyers'
                            )} table__header-sort-icon`"
                        ></i>
                    </th>
                </tr>
            </thead>
            <tbody>
                <table-row
                    v-for="(collection, idx) in filteredCollections"
                    :key="collection.collection_id"
                    :index="idx + 1"
                    :collection="collection"
                />
            </tbody>
        </table>
    </div>
</template>

<script>
import TableMenu from '@/components/blanks/table/TableMenu.vue';
import TableRow from '@/components/blanks/table/TableRow.vue';

import sorting from '~/mixins/sorting/sorting.js';

export default {
    components: { TableRow, TableMenu },
    mixins: [sorting],

    data() {
        return {
            scrollLoad: true,
            isLoading: false,
            lastScrollTop: 0,
            currentScrollTop: 0,
        };
    },

    computed: {
        page() {
            return this.$store.state.params.page;
        },

        lastPage() {
            return this.$store.state.collections.lastPage;
        },

        activeBlockFilter() {
            return this.$store.state.collections.activeFilter;
        },

        filters() {
            return this.$store.state.tableFilters.filters;
        },

        filteredCollections() {
            return this.$store.getters['collections/getFilteredCollections'];
        },

        loading() {
            return this.$store.state.collections.loading;
        },

        datefilter() {
            return this.$store.state.params.dateFilter;
        },
        scrollDown() {
            return this.currentScrollTop > this.lastScrollTop ? true : false;
        },
    },

    created() {
        //removed later
        this.$store.dispatch('tableFilters/addFilters');

        this.$nuxt.$on('change-datefilter', async (datefilter) => {
            this.$store.dispatch('params/resetPage');

            await this.$store.dispatch('params/setDatefilter', {
                datefilter: datefilter,
            });

            await this.$store.dispatch('collections/setCollectionsList');
        });
    },

    beforeDestroy() {
        this.$nuxt.$off('change-datefilter');
    },

    mounted() {
        if (process.client) {
            this.currentScrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            this.lastScrollTop =
                window.pageYOffset || document.documentElement.scrollTop;

            console.log('start', this.currentScrollTop);
            window?.addEventListener?.('scroll', () => this.handleScroll());
        }
    },
    destroyed() {
        window?.removeEventListener?.('scroll', () => this.handleScroll());
    },

    methods: {
        handleScroll() {
            if (this.page === this.lastPage) return;

            this.lastScrollTop = this.currentScrollTop;

            this.currentScrollTop =
                window.pageYOffset || document.documentElement.scrollTop;

            let collectionListWrapperBottomOffset = this.$refs.table?.getBoundingClientRect()
                .bottom;

            if (
                collectionListWrapperBottomOffset - 50 <= window.innerHeight &&
                this.scrollDown &&
                this.scrollLoad &&
                !this.isLoading
            ) {
                this.scrollLoad = false;
                this.loadMoreCollections();
            }
        },
        async loadMoreCollections() {
            this.isLoading = true;
            await this.$store.dispatch('params/setPage');
            await this.$store
                .dispatch('collections/setCollectionsList')
                .then(() => {
                    this.isLoading = false;
                    this.scrollLoad = true;
                });
        },
    },
};
</script>

<style lang="scss" src="~/assets/scss/components/table.scss" />
