<template>
    <header class="header">
        <nuxt-link :to="{ name: 'index' }">
            <div class="header__logo">
                <img
                    class="header__logo-img"
                    src="/images/default-layout/logo.gif"
                />
                <img
                    class="header__logo-text"
                    src="/images/default-layout/logo-text.svg"
                />
            </div>
        </nuxt-link>

        <nav class="header__nav">
            <nuxt-link class="header__nav-link" :to="{ name: 'index' }">
                <nav-button icon="homepage" text="Collections" />
            </nuxt-link>
            <nav-button icon="marketplace" text="Marketplace" />
            <nuxt-link class="header__nav-link" :to="{ name: 'wallet' }">
                <nav-button icon="wallet" text="Wallet" />
            </nuxt-link>
            <nav-button icon="calendar" text="Calendar" />
        </nav>
        <div class="header__social">
            <a
                class="header__social-link"
                href="https://twitter.com/analytics_nft"
                target="_blank"
            >
                <i class="header__icon header__icon--twitter icon-twitter"></i>
            </a>
            <a
                class="header__social-link"
                href="mailto:info@nft-analytics.io"
                target="_blank"
            >
                <i class="header__icon header__icon--mail icon-mail"></i>
            </a>
            <a
                class="header__social-link"
                href="https://discord.gg/nftanalytics"
                target="_blank"
            >
                <i class="header__icon header__icon--discord icon-discord"></i>
            </a>
            <div class="header__wrapper">
                <!-- <i
                    class="header__icon header__icon--premium icon-premium"
                    @mouseenter="showTooltip = true"
                    @mouseleave="showTooltip = false"
                    @click="showLoginModal"
                /> -->

                <div v-if="showTooltip" class="header__tooltip">
                    <tooltip-premium />
                </div>
            </div>

            <!-- <i
                class="header__icon header__icon--profile"
                @click="showLoginModal"
            /> -->
            <!-- <i class="header__icon header__icon--help" @click="showHelpModal" /> -->
        </div>
    </header>
</template>

<script>
import NavButton from '@/components/blanks/header/NavButton.vue';
import TooltipPremium from '@/components/blanks/tooltip/TooltipPremium.vue';
export default {
    components: { NavButton, TooltipPremium },

    data() {
        return {
            showTooltip: false,
        };
    },

    methods: {
        showLoginModal() {
            this.$store.dispatch('modals/showLoginModal');
        },

        showHelpModal() {
            this.$store.dispatch('modals/showHelpModal');
        },
    },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/layout/header.scss"
    scoped
></style>
