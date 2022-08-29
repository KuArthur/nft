export const state = () => ({
    showCalendar: false,
});

export const mutations = {
    CLOSE_CALENDAR: (state, show) => (state.showCalendar = show),
};

export const actions = {
    closeCalendar({ commit }, { show }) {
        commit('CLOSE_CALENDAR', show);
    },
};

// export const getters = {

// };
