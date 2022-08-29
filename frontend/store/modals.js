export const state = () => ({
    showLoginModal: false,
    showHelpModal: false,
});

export const mutations = {
    SHOW_LOGIN_MODAL(state) {
        state.showLoginModal = true;
    },

    HIDE_MODAL(state) {
        state.showLoginModal === true
            ? (state.showLoginModal = false)
            : (state.showHelpModal = false);
    },

    SHOW_HELP_MODAL(state) {
        state.showHelpModal = true;
    },

    // HIDE_FAQ_MODAL(state) {
    //     state.showFaqModal = false;
    // },
};

export const actions = {
    showLoginModal({ commit }) {
        commit('SHOW_LOGIN_MODAL');
    },

    hideModal({ commit }) {
        commit('HIDE_MODAL');
    },

    showHelpModal({ commit }) {
        commit('SHOW_HELP_MODAL');
    },

    // hideFaqModal({ commit }) {
    //     commit('HIDE_LOGIN_MODAL');
    // },
};
