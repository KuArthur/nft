<template>
    <button class="btn" :class="type" :type="isSubmit ? 'submit' : false">
        <slot />
    </button>
</template>

<script>
import Vue from 'vue';

const buttonTypes = ['primary', 'secondary', 'success', 'alert', 'warning'];

export default Vue.extend({
    props: {
        type: {
            type: String,
            default: 'primary',
            validator(value) {
                return !!buttonTypes.find((e) => e === value);
            },
        },
        isSubmit: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            message: 'This is a message',
        };
    },
});
</script>

<style
    lang="scss"
    src="~/assets/scss/components/ui/app-buttons.scss"
    scoped
></style>
