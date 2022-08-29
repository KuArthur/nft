<template>
    <div class="card">
        <div class="card__data">
            <span class="card__title">{{ title }}</span>
            <div class="card__currency">
                <div class="card__price-wrapper">
                    <i
                        v-if="type === 'eth'"
                        class="card__icon-price card__icon-price--ethereum icon-eth"
                    />
                    <i
                        v-if="type === 'usd'"
                        class="card__icon-price card__icon-price--usd icon-dollar"
                    />
                    <span class="card__price">{{
                        icon === 'gas' ? price + ' Gwei' : price
                    }}</span>
                </div>
                <!-- <div class="card__changing">
                    <span
                        :class="`card__changing-value card__changing-value--${checkChanging(
                            changing
                        )}`"
                        >{{ changing }}</span
                    >
                    <i
                        :class="`icon-arrow-${checkChanging(
                            changing
                        )} card__changing-icon card__changing-icon--${checkChanging(
                            changing
                        )}`"
                    ></i>
                </div> -->
            </div>
        </div>
        <div class="card__icon-wrapper">
            <i :class="`icon-${icon} card__icon card__icon--${icon}`"></i>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        type: {
            type: String,
            default: 'default',
        },

        // changing: {
        //     type: String,
        //     required: true,
        // },

        icon: {
            type: String,
            required: true,
        },
    },

    methods: {
        checkChanging(value) {
            return value[0] === '+' ? 'up' : 'down';
        },
    },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/analyticsCards/card.scss"
></style>
