<template>
    <main class="index">
        <login-modal v-show="showLoginModal" />
        <help-modal v-show="showHelpModal" />
        <Table />
    </main>
</template>

<script>
import Table from '@/components/Table.vue';
import LoginModal from '@/components/blanks/loginModal/LoginModal.vue';
import HelpModal from '@/components/blanks/helpModal/HelpModal.vue';

export default {
    components: { Table, LoginModal, HelpModal },

    computed: {
        showLoginModal() {
            return this.$store.state.modals.showLoginModal;
        },
        showHelpModal() {
            return this.$store.state.modals.showHelpModal;
        },
    },
};
</script>

<style lang="scss" src="~/assets/scss/pages/index.scss" scoped></style>
