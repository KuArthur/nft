export const state = () => ({
    lastPage: null,
    collections: [],
    ethData: {},
    collection: null,
    loading: false,
    search: '',
});

export const mutations = {
    SET_COLLECTIONS_LIST: (state, collections) => {
        state.collections = collections;
    },

    UPDATE_COLLECTIONS_LIST: (state, items) => {
        state.collections = items;
    },

    SET_ETH_DATA: (state, data) => (state.ethData = data),

    SET_COLLECTION: (state, collection) => (state.collection = collection),

    CHANGE_LOADING: (state, loading) => (state.loading = loading),

    SET_LAST_PAGE: (state, page) => (state.lastPage = page),
};

export const actions = {
    async setCollectionsList({ commit, rootGetters, rootState }) {
        console.log('url', rootGetters['params/getUrl']);
        console.log('counter');
        commit('CHANGE_LOADING', true);

        await this.$axios
            .$get(rootGetters['params/getUrl'])
            .then((res) => {
                if (rootState.params.page > 1) {
                    commit('UPDATE_COLLECTIONS_LIST', res.collections);
                } else {
                    commit('SET_COLLECTIONS_LIST', res.collections);
                    commit('SET_LAST_PAGE', res.last_page);
                }

                commit('CHANGE_LOADING', false);
                commit('SET_ETH_DATA', res.ethData);
            })
            .catch((err) => {
                console.log({ err }, ' err');
            });
    },

    async setCollection({ commit }, { slug }) {
        const collection = await this.$axios.$get(`/collections/${slug}`);
        commit('SET_COLLECTION', collection.collection);
    },
};

export const getters = {
    getFilteredCollections: (state) => {
        return state.collections.filter((collection) =>
            collection.name.toLowerCase().includes(state.search.toLowerCase())
        );
    },
};
