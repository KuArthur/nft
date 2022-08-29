<template>
    <transition name="modal">
        <div class="modal" @click="hideModal">
            <div class="modal__content" @click.stop>
                <i class="icon-close modal__icon" @click="hideModal" />

                <slot />
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    methods: {
        hideModal() {
            this.$store.dispatch('modals/hideModal');
        },
    },
};
</script>

<style lang="scss" src="~/assets/scss/components/ui/modal.scss"></style>
