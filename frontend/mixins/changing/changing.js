export default {
    methods: {
        checkChanging(value) {
            return value < 0 ? 'down' : 'up';
            // return value[0] === '+' ? 'up' : 'down';
        },
        checkChangingIcon(value) {
            return value < 0 ? 'down' : !value ? 'disable' : 'up';
            // return value[0] === '+' ? 'up' : 'down';
        },
        change(value) {
            return value !== null
                ? value.toFixed(2) < 0
                    ? value.toFixed(2) + '%'
                    : '+' + value.toFixed(2) + '%'
                : '---';
        },
    },
};
