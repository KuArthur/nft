<template>
    <div class="wallet-table">
        <table class="wallet-table__table">
            <thead class="wallet-table__header">
                <tr class="wallet-table__header-row">
                    <th
                        class="wallet-table__header-item wallet-table__header-item--arrow"
                    ></th>

                    <th
                        class="wallet-table__header-item wallet-table__header-item--collection"
                        @click="sortCollections('created_at')"
                    >
                        <span class="wallet-table__header-text"
                            >Collection</span
                        >
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'created_at'
                            )} wallet-table__header-sort-icon`"
                        ></i>
                    </th>

                    <th
                        class="wallet-table__header-item"
                        @click="sortCollections('total_volume')"
                    >
                        <span class="wallet-table__header-text">Token</span>
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'total_volume'
                            )} wallet-table__header-sort-icon`"
                        ></i>
                    </th>
                    <th
                        class="wallet-table__header-item"
                        @click="sortCollections('volume_change')"
                    >
                        <span class="wallet-table__header-text">Price</span>
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'volume_change'
                            )} wallet-table__header-sort-icon`"
                        ></i>
                    </th>
                    <th
                        class="wallet-table__header-item"
                        @click="sortCollections('floor_price')"
                    >
                        <span class="wallet-table__header-text">GAS</span>
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'floor_price'
                            )} wallet-table__header-sort-icon`"
                        ></i>
                    </th>
                    <th
                        class="wallet-table__header-item"
                        @click="sortCollections('floor_change')"
                    >
                        <span class="wallet-table__header-text">Total</span>
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'floor_change'
                            )} wallet-table__header-sort-icon`"
                        ></i>
                    </th>
                    <th
                        class="wallet-table__header-item"
                        @click="sortCollections('owners_count')"
                    >
                        <span class="wallet-table__header-text">Date</span>
                        <i
                            :class="`icon-sort-${changeSortIcon(
                                'owners_count'
                            )} wallet-table__header-sort-icon`"
                        ></i>
                    </th>
                    <th class="wallet-table__header-item"></th>
                </tr>
            </thead>
            <tbody>
                <wallet-table-row></wallet-table-row>
                <wallet-table-row></wallet-table-row>
                <wallet-table-row></wallet-table-row>
                <wallet-table-row></wallet-table-row>
                <wallet-table-row></wallet-table-row>
                <wallet-table-row></wallet-table-row>
            </tbody>
        </table>
    </div>
</template>

<script>
import WalletTableRow from '@/components/blanks/walletTable/WalletTableRow.vue';
import sorting from '~/mixins/sorting/sorting.js';

export default {
    components: { WalletTableRow },
    mixins: [sorting],
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/walletTable/wallet-table.scss"
/>
