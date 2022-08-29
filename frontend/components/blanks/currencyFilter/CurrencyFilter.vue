<template>
    <div class="currency-filter">
        <label class="currency-filter__label">
            <input
                v-model="currency"
                class="currency-filter__filter"
                type="radio"
                name="currency-filter"
                value="usd"
            />
            <span class="currency-filter__text">USD</span>
        </label>
        <label class="currency-filter__label">
            <input
                v-model="currency"
                class="currency-filter__filter"
                type="radio"
                name="currency-filter"
                value="eth"
            />
            <span class="currency-filter__text">ETH</span>
        </label>
    </div>
</template>

<script>
export default {
    computed: {
        currency: {
            get() {
                return this.$store.state.params.currency;
            },

            set(newValue) {
                this.$store.dispatch('params/setCurrency', {
                    currency: newValue,
                });

                this.$emit('change-chart', newValue);
            },
        },
    },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/currencyFilter/currency-filter.scss"
></style>
