<template>
    <div class="nav-button">
        <i :class="`nav-button__icon icon-${icon}`" />
        <span class="nav-button__text">{{ text }}</span>
    </div>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/header/nav-button.scss"
/>
