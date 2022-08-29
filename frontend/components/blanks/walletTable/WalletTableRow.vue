<template>
    <tr class="wallet-table__row">
        <td class="wallet-table__item">ar</td>
        <td class="wallet-table__item wallet-table__item--collection">
            <img
                src="http://placehold.it/45x45"
                class="wallet-table__collection-img"
            />
            <span class="wallet-table__collection-name">
                Pumpkinhead’s Pumpkin Patch
            </span>
        </td>
        <td class="wallet-table__item wallet-table__item--token">Token</td>

        <td class="wallet-table__item">
            <i class="table__icon table__icon--ethereum icon-eth" />
            {{ 0.04 }}
        </td>

        <td class="wallet-table__item">
            <i class="table__icon table__icon--ethereum icon-eth" />
            {{ 0.01 }}
        </td>

        <td class="wallet-table__item">
            <i class="table__icon table__icon--ethereum icon-eth" />
            {{ 0.05 }}
        </td>

        <td class="wallet-table__item wallet-table__item--date">
            Oct 09, 2021 15:30 PM
        </td>
        <td class="wallet-table__item wallet-table__item--link">s</td>
    </tr>
</template>

<script>
export default {
    // props: {
    //     data: {
    //         type: Object,
    //         required: true,
    //     },
    // },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/walletTable/wallet-table-row.scss"
></style>
