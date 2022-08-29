<template>
    <table class="analytics-table">
        <thead class="analytics-table__header">
            <tr class="analytics-table__header-row">
                <th
                    class="analytics-table__header-item analytics-table__header-item--month"
                    @click="sortCollections('created_at')"
                >
                    <span class="analytics-table__header-text">Months</span>
                    <i
                        :class="`icon-sort-${changeSortIcon(
                            'created_at'
                        )} analytics-table__header-sort-icon`"
                    ></i>
                </th>

                <th
                    class="analytics-table__header-item"
                    @click="sortCollections('total_volume')"
                >
                    <span class="analytics-table__header-text">volume</span>
                    <i
                        :class="`icon-sort-${changeSortIcon(
                            'total_volume'
                        )} analytics-table__header-sort-icon`"
                    ></i>
                </th>
                <th
                    class="analytics-table__header-item"
                    @click="sortCollections('volume_change')"
                >
                    <span class="analytics-table__header-text">volume, %</span>
                    <i
                        :class="`icon-sort-${changeSortIcon(
                            'volume_change'
                        )} analytics-table__header-sort-icon`"
                    ></i>
                </th>
                <th
                    class="analytics-table__header-item"
                    @click="sortCollections('floor_price')"
                >
                    <span class="analytics-table__header-text">floor</span>
                    <i
                        :class="`icon-sort-${changeSortIcon(
                            'floor_price'
                        )} analytics-table__header-sort-icon`"
                    ></i>
                </th>
                <th
                    class="analytics-table__header-item"
                    @click="sortCollections('floor_change')"
                >
                    <span class="analytics-table__header-text">floor, %</span>
                    <i
                        :class="`icon-sort-${changeSortIcon(
                            'floor_change'
                        )} analytics-table__header-sort-icon`"
                    ></i>
                </th>
                <th
                    class="analytics-table__header-item"
                    @click="sortCollections('owners_count')"
                >
                    <span class="analytics-table__header-text">holders</span>
                    <i
                        :class="`icon-sort-${changeSortIcon(
                            'owners_count'
                        )} analytics-table__header-sort-icon`"
                    ></i>
                </th>
                <!-- <th
                    class="analytics-table__header-item"
                    @click="sortCollections('listing')"
                >
                    <span class="analytics-table__header-text">listed</span>
                    <i
                        :class="`icon-sort-${changeSortIcon(
                            'listing'
                        )} analytics-table__header-sort-icon`"
                    ></i>
                </th> -->
            </tr>
        </thead>
        <tbody>
            <analytics-table-row
                v-for="(data, idx) in analytics"
                :key="idx"
                :data="data"
            />

            <!-- <tr class="analytics-table__row">
                <td class="analytics-table__item analytics-table__item--month">
                    Total
                </td>
                <td class="analytics-table__item">
                    <i class="table__icon table__icon--ethereum icon-eth" />
                    {{ totalVolume }}
                </td>

                <td class="analytics-table__item"></td>
                <td class="analytics-table__item"></td>
                <td class="analytics-table__item"></td>
                <td class="analytics-table__item"></td>

                <td class="analytics-table__item"></td>
            </tr> -->
        </tbody>
    </table>
</template>

<script>
import AnalyticsTableRow from '@/components/blanks/analyticsTable/AnalyticsTableRow.vue';
import sorting from '~/mixins/sorting/sorting.js';

export default {
    components: { AnalyticsTableRow },
    mixins: [sorting],
    props: {
        analytics: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/analyticsTable/analytics-table.scss"
></style>
