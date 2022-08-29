<template>
    <div class="analytics-cards">
        <card
            title="Ethereum Today’s"
            :price="ethData.ethUsd"
            type="usd"
            icon="eth"
        />

        <card title="ETH Gas" :price="ethData.ethGas" icon="gas" />

        <card
            title="Total Sales, PSC"
            :price="ethData.total_sales_psc"
            icon="file"
        />

        <card
            :title="'Total Sales, ' + currency.toUpperCase()"
            :price="
                ethData.total_sales[currency]
                    ? +ethData.total_sales[currency].toFixed(2)
                    : '---'
            "
            :type="currency"
            icon="basket"
        />
    </div>
</template>

<script>
import Card from '~/components/blanks/analyticsCards/Card';
export default {
    components: { Card },

    computed: {
        currency() {
            return this.$store.state.params.currency;
        },
        ethData() {
            return this.$store.state.collections.ethData;
        },
    },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/analyticsCards/analytics-cards.scss"
></style>
