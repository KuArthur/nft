export const state = () => ({
    page: 1,
    search: '',
    activeArtBlock: null,
    url: 'collections/get-all?page=1&period=15M',
    dateFilter: '15M',
    period: null,
    sort: {
        sortBy: '',
        sortDir: 'desc',
    },
    watchlist: [],
    setWatchlist: false,
    currency: 'eth',
    filters: [],
});

export const mutations = {
    SET_PAGE: (state) => state.page++,

    RESET_PAGE: (state) => (state.page = 1),

    SET_SEARCH: (state, search) => (state.search = search),

    SET_ART_BLOCK: (state, artBlock) => (state.activeArtBlock = artBlock),

    SET_DATEFILTER: (state, dateFilter) => {
        state.dateFilter = dateFilter;
        state.period = null;
    },
    SET_PERIOD: (state, period) => {
        state.period = period;
        state.dateFilter = null;
    },

    SET_SORT_BY: (state, sortBy) => (state.sortBy = sortBy),

    SET_SORT_DIR: (state, sortDir) => (state.sortDir = sortDir),

    SET_SORT: (state, sort) => {
        state.sort.sortBy === sort.sortBy
            ? (state.sort = {
                  sortBy: sort.sortBy,
                  sortDir: state.sort.sortDir === 'asc' ? 'desc' : 'asc',
              })
            : (state.sort = { sortBy: sort.sortBy, sortDir: 'desc' });
    },
    UPDATE_WATCHLIST: (state, item) => {
        state.watchlist.includes(item)
            ? (state.watchlist = state.watchlist.filter(
                  (favorite) => favorite !== item
              ))
            : (state.watchlist = state.watchlist.concat(item));
    },

    SET_WATCHLIST: (state, set) => (state.setWatchlist = set),

    SET_CURRENCY: (state, currency) => {
        state.currency = currency;
    },

    RESET_DATEFILTER: (state) => (state.dateFilter = '1M'),

    SET_FILTERS: (state, filters) => {
        state.filters = filters;
        console.log('filt', state.filters);
    },

    SET_URL: (state) => {
        state.url = `collections/get-all?${'page=' + state.page}${
            state.period
                ? '&period_from=' +
                  state.period.start +
                  '&period_to=' +
                  state.period.end
                : ''
        }${state.dateFilter ? '&period=' + state.dateFilter : ''}${
            state.sort
                ? '&sort_by=' +
                  state.sort.sortBy +
                  '&sort_direction=' +
                  state.sort.sortDir
                : ''
        }${state.setWatchlist ? '&watchlist=[' + state.watchlist + ']' : ''}${
            state.activeArtBlock ? '&art_blocks=' + state.activeArtBlock : ''
        }`;
    },
};

export const actions = {
    setPage({ commit }) {
        commit('SET_PAGE');
    },

    resetPage({ commit }) {
        commit('RESET_PAGE');
    },

    async setArtBlock({ commit, state }, { artBlock }) {
        commit('SET_ART_BLOCK', artBlock);

        this.$cookies.set('nft-analytics.artBlock', state.activeArtBlock);
    },

    async setDatefilter({ commit, state }, { datefilter }) {
        commit('SET_DATEFILTER', datefilter);

        this.$cookies.set('nft-analytics.period', state.dateFilter);
    },

    async setPeriod({ commit }, { period }) {
        commit('SET_PERIOD', period);
    },

    async setSort({ commit, state }, { sort }) {
        commit('SET_SORT', sort);

        this.$cookies.set('nft-analytics.sortBy', state.sort.sortBy);
        this.$cookies.set('nft-analytics.sortDir', state.sort.sortDir);
    },

    updateWatchlist({ commit, state }, { item }) {
        commit('UPDATE_WATCHLIST', item);

        this.$cookies.set('nft-analytics.watchlist', state.watchlist);
    },

    async setWatchlist({ commit, state }, { set }) {
        commit('SET_WATCHLIST', set);

        this.$cookies.set('nft-analytics.setWatchlist', state.setWatchlist);
    },

    setCurrency({ commit, state }, { currency }) {
        commit('SET_CURRENCY', currency);

        this.$cookies.set('nft-analytics.currency', state.currency);
    },

    loadParams({ commit }) {
        commit(
            'SET_ART_BLOCK',
            this.$cookies.get('nft-analytics.artBlock') || null
        );
        commit(
            'SET_DATEFILTER',
            this.$cookies.get('nft-analytics.period') || '15M'
        );
        commit('SET_SORT', {
            sortBy: this.$cookies.get('nft-analytics.sortBy') || 'total_volume',
            sortDir: this.$cookies.get('nft-analytics.sortDir') || 'desc',
        });
        commit(
            'UPDATE_WATCHLIST',
            this.$cookies.get('nft-analytics.watchlist') || []
        );
        commit(
            'SET_WATCHLIST',
            this.$cookies.get('nft-analytics.setWatchlist') || false
        );
        commit(
            'SET_CURRENCY',
            this.$cookies.get('nft-analytics.currency') || 'eth'
        );
        commit(
            'SET_FILTERS',
            this.$cookies.get('nft-analytics.tableFilters') || []
        );
    },
};

export const getters = {
    getUrl(state) {
        return `collections/get-all?${'page=' + state.page}${
            state.period
                ? '&period_from=' +
                  state.period.start +
                  '&period_to=' +
                  state.period.end
                : ''
        }${state.dateFilter ? '&period=' + state.dateFilter : ''}${
            state.sort
                ? '&sort_by=' +
                  state.sort.sortBy +
                  '&sort_direction=' +
                  state.sort.sortDir
                : ''
        }${state.setWatchlist ? '&watchlist=[' + state.watchlist + ']' : ''}${
            state.activeArtBlock ? '&art_blocks=' + state.activeArtBlock : ''
        }${state.search ? '&search=' + state.search : ''}`;
    },
};
