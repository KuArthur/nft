<template>
    <modal>
        <div class="login-modal">
            <h3 class="login-modal__title">Login with</h3>
            <div class="login-modal__wallets">
                <div class="login-modal__wallet">
                    <div class="login-modal__wallet-icon" />
                </div>
                <div class="login-modal__wallet">
                    <div class="login-modal__wallet-icon" />
                </div>
                <div class="login-modal__wallet">
                    <div class="login-modal__wallet-icon" />
                </div>
            </div>
            <span class="login-modal__text login-modal__text--or">or</span>
            <p class="login-modal__text login-modal__text--main">
                Please connect your Ethereum wallet (MetaMask, Coinbase,
                Trustwallet) with an NFT KEY in it in order to get access to the
                premium features of our platform.
            </p>
            <p class="login-modal__text login-modal__text--about-key">
                NFT Analytics KEYs can be acquired on OpenSea.
            </p>
            <div class="login-modal__btn">
                <app-button>BUY NFT ANALYTICS KEY</app-button>
            </div>
        </div>
    </modal>
</template>

<script>
import Modal from '@/components/ui/Modal.vue';
import AppButton from '@/components/ui/AppButton.vue';
export default {
    components: { Modal, AppButton },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/loginModal/login-modal.scss"
></style>
