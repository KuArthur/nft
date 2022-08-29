export const actions = {
    // eslint-disable-next-line no-unused-vars
    async nuxtServerInit({ dispatch }) {
        dispatch('params/loadParams');

        await dispatch('collections/setCollectionsList');
    },
};
