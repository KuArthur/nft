export const state = () => ({
    options: [
        {
            name: 'None',
            property: 'none',
        },

        {
            name: 'Volume',
            property: 'total_volume',
        },

        {
            name: 'Holders',
            property: 'holders',
        },

        {
            name: 'Floor',
            property: 'floor_price',
        },

        {
            name: 'Volume, psc',
            property: 'total_sales',
        },
    ],
    dataChart: {},
    slug: '',
    dataGreenChart: 'total_volume',
    dataBlackChart: 'floor_price',
    datefilter: '1M',
    loading: false,
});

export const mutations = {
    CLOSE_CALENDAR: (state, show) => (state.showCalendar = show),

    SET_DATA_CHART: (state, dataChart) => (state.dataChart = dataChart),

    SET_DATA_GREEN_CHART: (state, data) => (state.dataGreenChart = data),

    SET_DATA_BLACK_CHART: (state, data) => (state.dataBlackChart = data),

    SET_DATEFILTER: (state, datefilter) => (state.datefilter = datefilter),

    SET_SLUG: (state, slug) => (state.slug = slug),

    CHANGE_LOADING: (state, loading) => (state.loading = loading),
};

export const actions = {
    async setDataChart({ commit, getters }) {
        console.log('ChartUrl', getters.getUrl);
        commit('CHANGE_LOADING', true);

        await this.$axios.$get(getters.getUrl).then((res) => {
            commit('SET_DATA_CHART', res);
            commit('CHANGE_LOADING', false);
        });
    },

    setSlug({ commit }, slug) {
        commit('SET_SLUG', slug);
    },

    async setDataGreenChart({ dispatch, commit }, dataGreenChart) {
        // let greenCookies = this.$cookies.get('nft-analytics.greenSelect');

        commit('SET_DATA_GREEN_CHART', dataGreenChart.property);

        this.$cookies.set('nft-analytics.greenSelect', dataGreenChart);

        // greenCookies?.property ||
        await dispatch('setDataChart');
    },

    async setDataBlackChart({ dispatch, commit }, dataBlackChart) {
        // let blackCookies = this.$cookies.get('nft-analytics.blackSelect');

        commit('SET_DATA_BLACK_CHART', dataBlackChart.property);

        this.$cookies.set('nft-analytics.blackSelect', dataBlackChart);

        console.log(
            'blaaaack',
            this.$cookies.get('nft-analytics.blackSelect').property
        );

        // blackCookies?.property ||
        await dispatch('setDataChart');
    },

    async setDatefilter({ commit, state }, datefilter) {
        commit('SET_DATEFILTER', datefilter);

        this.$cookies.set('nft-analytics.chartDatefilter', state.datefilter);
    },

    closeCalendar({ commit }, { show }) {
        commit('CLOSE_CALENDAR', show);
    },

    loadChartParams({ commit }) {
        let black = this.$cookies.get('nft-analytics.blackSelect');
        let green = this.$cookies.get('nft-analytics.greenSelect');

        console.log('green', green);
        console.log('black', black);

        commit(
            'SET_DATEFILTER',
            this.$cookies.get('nft-analytics.chartDatefilter') || '1M'
        );

        commit('SET_DATA_GREEN_CHART', green?.property || 'total_volume');

        commit('SET_DATA_BLACK_CHART', black?.property || 'floor_price');
    },
};

export const getters = {
    getUrl: (state) => {
        return `collections/${state.slug}/graph?period=${state.datefilter}&L1=${state.dataGreenChart}&L2=${state.dataBlackChart}`;
    },
};
