<template>
    <div class="select-wallet">
        <i class="icon-plus select-wallet__icon" />
        <div class="select-wallet__item">
            <wallet-item />
        </div>
        <div class="select-wallet__item">
            <wallet-item />
        </div>
        <div class="select-wallet__item">
            <wallet-item />
        </div>
    </div>
</template>

<script>
import WalletItem from '@/components/blanks/walletItem/WalletItem.vue';
export default {
    components: { WalletItem },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/selectWallet/select-wallet.scss"
/>
