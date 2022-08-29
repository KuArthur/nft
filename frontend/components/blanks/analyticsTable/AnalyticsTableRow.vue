<template>
    <tr class="analytics-table__row">
        <td class="analytics-table__item analytics-table__item--month">
            {{ date }}
        </td>
        <td class="analytics-table__item">
            <i
                v-if="data.total_volume.eth"
                class="table__icon table__icon--ethereum icon-eth"
            />
            {{
                data.total_volume.eth
                    ? Math.floor(data.total_volume.eth * 100) / 100
                    : '---'
            }}
        </td>

        <td class="analytics-table__item">
            <span :class="`table__item--${checkChanging(data.volume_change)}`"
                >{{ data.volume_change }}%</span
            >
            <i
                :class="`table__icon table__icon--${checkChanging(
                    data.volume_change
                )} icon-arrow-${checkChangingIcon(data.volume_change)}`"
            />
        </td>
        <td class="analytics-table__item">
            <i
                v-if="data.listing"
                class="table__icon table__icon--ethereum icon-eth"
            />

            {{ data.floor_price.eth ? data.floor_price.eth : '---' }}
        </td>
        <td
            class="analytics-table__item"
            :class="[
                data.floor_change
                    ? `table__item--${checkChanging(data.floor_change)}`
                    : '',
            ]"
        >
            {{ data.floor_change ? change(data.floor_change) : '---' }}
            <i
                :class="`table__icon table__icon--${checkChanging(
                    data.floor_change
                )} icon-arrow-${checkChangingIcon(data.floor_change)}`"
            />
        </td>
        <td class="analytics-table__item">{{ data.num_owners }}</td>

        <!-- <td class="analytics-table__item">
            <span class="analytics-table__item--volume">{{
                data.listing
            }}</span>
        </td> -->
    </tr>
</template>

<script>
import moment from 'moment';

import changing from '~/mixins/changing/changing.js';

export default {
    mixins: [changing],

    props: {
        data: {
            type: Object,
            required: true,
        },
    },

    computed: {
        date() {
            return moment(this.data.created_at).format('MMMM YYYY');
        },
    },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/analyticsTable/analytics-table-row.scss"
></style>
