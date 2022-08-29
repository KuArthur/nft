<template>
    <div class="wallet">
        <div class="wallet__select">
            <select-wallet />
        </div>
        <div class="wallet__wrapper">
            <div class="wallet__info">
                <wallet-info />
            </div>
            <div class="wallet__chart">
                <wallet-chart />
            </div>
        </div>
        <div class="wallet__table">
            <wallet-table />
        </div>
    </div>
</template>

<script>
import SelectWallet from '@/components/blanks/selectWallet/SelectWallet.vue';
import WalletInfo from '@/components/blanks/walletInfo/WalletInfo.vue';
import WalletChart from '@/components/blanks/walletChart/WalletChart.vue';
import WalletTable from '../components/blanks/walletTable/WalletTable.vue';

export default {
    components: { SelectWallet, WalletInfo, WalletChart, WalletTable },
};
</script>

<style lang="scss" src="~/assets/scss/pages/wallet/wallet.scss" />
