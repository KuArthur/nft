<template>
    <div class="default-layout">
        <app-header></app-header>
        <analytics-cards />
        <nuxt />
        <app-footer></app-footer>
    </div>
</template>

<script>
import AppHeader from '~/components/layout/AppHeader.vue';
import AppFooter from '~/components/layout/AppFooter.vue';
import AnalyticsCards from '~/components/AnalyticsCards.vue';

export default {
    components: {
        AppHeader,
        AppFooter,
        AnalyticsCards,
    },
};
</script>

<style lang="scss" src="~/assets/scss/layouts/default.scss" scoped></style>
