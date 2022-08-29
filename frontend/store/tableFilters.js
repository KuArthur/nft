export const state = () => ({
    filters: [],
});

export const mutations = {
    TOGGLE_FILTER: (state, newFilter) => {
        state.filters.includes(newFilter)
            ? (state.filters = state.filters.filter(
                  (filter) => filter !== newFilter
              ))
            : state.filters.push(newFilter);
    },

    CLEAR_FILTERS: (state) => (state.filters = []),

    ADD_FILTERS: (state, filters) => (state.filters = filters),
};

export const actions = {
    toggleFilter({ commit, state }, { filter }) {
        commit('TOGGLE_FILTER', filter);

        this.$cookies.set('nft-analytics.tableFilters', state.filters);
    },
    clearFilters({ commit, state }) {
        commit('CLEAR_FILTERS');

        this.$cookies.set('nft-analytics.tableFilters', state.filters);
    },

    addFilters({ commit, rootState }) {
        commit('ADD_FILTERS', rootState.params.filters);
    },
};
