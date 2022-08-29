export default {
    data() {
        return {
            currentSort: 'total_volume',
            currentSortDir: 'desc',
            sortIcon: 'down',
        };
    },

    computed: {
        sort() {
            return this.$store.state.params.sort;
        },
    },

    created() {
        this.currentSort = this.sort.sortBy;
    },

    methods: {
        async sortCollections(prop) {
            this.currentSort = prop;

            this.$store.dispatch('params/resetPage');

            await this.$store.dispatch('params/setSort', {
                sort: {
                    sortBy: this.currentSort,
                    sortDir: this.currentSortDir,
                },
            });

            await this.$store.dispatch('collections/setCollectionsList');

            this.currentSortDir = this.sort.sortDir;
        },

        changeSortIcon(prop) {
            return this.currentSort !== prop
                ? 'up'
                : this.currentSortDir === 'desc'
                ? 'down table__header-sort-icon--enabled'
                : 'up table__header-sort-icon--enabled';
        },
    },
};
