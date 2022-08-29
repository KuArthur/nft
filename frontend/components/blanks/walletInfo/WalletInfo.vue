<template>
    <div class="wallet-info">
        <div class="wallet-info__top">
            <div class="wallet-info__wrapper">
                <div class="wallet-info__img" />
                <div class="wallet-info__info">
                    <span class="wallet-info__name">Wallet Name</span>
                    <span class="wallet-info__key"
                        >4x790rererq673.............................c9v4</span
                    >
                </div>
            </div>

            <div class="wallet-info__balance">
                <span class="wallet-info__balance-title">Balance</span>
                <div class="wallet-info__value-with-icon">
                    <i
                        class="icon-eth wallet-info__icon wallet-info__icon--eth"
                    />
                    <span class="wallet-info__balance-value">0.05</span>
                </div>
            </div>
        </div>
        <div class="wallet-info__line" />
        <div class="wallet-info__bottom">
            <div class="wallet-info__collection-title">
                <span class="wallet-info__collection-text">NFT collection</span>
                <span class="wallet-info__collection-volume">230</span>
            </div>
            <ul class="wallet-info__collections">
                <li class="wallet-info__item">
                    <img
                        src="http://placehold.it/70x70"
                        class="wallet-info__collection-img"
                    />
                    <div class="wallet-info__item-value-with-icon">
                        <i
                            class="icon-eth wallet-info__icon wallet-info__icon--item-eth"
                        />
                        <span class="wallet-info__item-value">10.28</span>
                    </div>
                </li>
                <li class="wallet-info__item">
                    <img
                        src="http://placehold.it/65x65"
                        class="wallet-info__collection-img"
                    />
                    <div class="wallet-info__item-value-with-icon">
                        <i
                            class="icon-eth wallet-info__icon wallet-info__icon--item-eth"
                        />
                        <span class="wallet-info__item-value">8</span>
                    </div>
                </li>
                <li class="wallet-info__item">
                    <img
                        src="http://placehold.it/65x65"
                        class="wallet-info__collection-img"
                    />
                    <div class="wallet-info__item-value-with-icon">
                        <i
                            class="icon-eth wallet-info__icon wallet-info__icon--item-eth"
                        />
                        <span class="wallet-info__item-value">2</span>
                    </div>
                </li>
                <li class="wallet-info__item">
                    <img
                        src="http://placehold.it/65x65"
                        class="wallet-info__collection-img"
                    />
                    <div class="wallet-info__item-value-with-icon">
                        <i
                            class="icon-eth wallet-info__icon wallet-info__icon--item-eth"
                        />
                        <span class="wallet-info__item-value">2</span>
                    </div>
                </li>
                <li class="wallet-info__item">
                    <img
                        src="http://placehold.it/65x65"
                        class="wallet-info__collection-img"
                    />
                    <div class="wallet-info__item-value-with-icon">
                        <i
                            class="icon-eth wallet-info__icon wallet-info__icon--item-eth"
                        />
                        <span class="wallet-info__item-value">2</span>
                    </div>
                </li>
            </ul>
            <div class="wallet-info__btn">
                <app-button>Portfolio Value</app-button>
            </div>
        </div>
    </div>
</template>

<script>
import AppButton from '@/components/ui/AppButton.vue';
export default {
    components: { AppButton },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/walletInfo/wallet-info.scss"
/>
