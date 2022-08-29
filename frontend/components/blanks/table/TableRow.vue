<template>
    <tr class="table__row">
        <td class="table__item">
            <i
                class="table__icon"
                :class="[
                    favorite
                        ? 'table__icon--star-fullcolor icon-star-fullcolor'
                        : 'table__icon--star icon-star',
                ]"
                @click="updateWatchlist"
            />
        </td>
        <td class="table__item">{{ index }}</td>
        <td class="table__item table__item--collection">
            <nuxt-link
                class="table__link table__link--collection"
                :to="{
                    name: 'collection-slug',
                    params: { slug: collection.slug },
                }"
            >
                <div class="table__link table__link--collection">
                    <img
                        :src="collection.image_url"
                        class="table__collection-img"
                    />
                    <span
                        class="table__collection-name"
                        :title="
                            !collection.sub_group_name
                                ? collection.name
                                : collection.sub_group_name
                        "
                    >
                        <!-- stylelint-disable -->
                        {{
                            !collection.sub_group_name
                                ? collection.name
                                : collection.sub_group_name
                        }}
                    </span>
                </div>
            </nuxt-link>
        </td>
        <td class="table__item">
            <a
                :href="`https://opensea.io/collection/${collection.slug}`"
                target="_blank"
                class="table__link-opensea"
            >
                <i class="table__icon table__icon--opensea icon-opensea" />
            </a>
        </td>
        <td class="table__item">
            <!-- <nuxt-link
                class="table__link-graph"
                :to="{
                    name: 'collection-slug',
                    params: { id: collection.slug },
                }"
            > -->
            <i class="table__icon table__icon--graph icon-graph" />
            <!-- </nuxt-link> -->
        </td>
        <!-- MINT -->
        <td
            v-if="filters.includes('mint')"
            class="table__item table__item--mint"
        >
            <i
                v-if="collection.data.mint[currency]"
                :class="[
                    'table__icon',
                    currency === 'eth'
                        ? 'table__icon--ethereum icon-eth'
                        : 'table__icon--usd icon-dollar',
                ]"
            />
            {{ changingData(collection.data.mint[currency]) }}
            <!-- <p v-else>---</p> -->
        </td>

        <td class="table__item table__item--volume">
            <i
                v-if="collection.data.total_volume[currency]"
                :class="[
                    'table__icon',
                    currency === 'eth'
                        ? 'table__icon--ethereum icon-eth'
                        : 'table__icon--usd icon-dollar',
                ]"
            />
            {{ changingData(collection.data.total_volume[currency]) }}
            <!-- <p v-else>---</p> -->
        </td>
        <td
            class="table__item"
            :class="[
                collection.data.volume_change
                    ? `table__item--${checkChanging(
                          collection.data.volume_change
                      )}`
                    : '',
            ]"
        >
            {{
                collection.data.volume_change === 0
                    ? 0
                    : collection.data.volume_change !== null
                    ? change(collection.data.volume_change)
                    : '---'
            }}

            <i
                :class="`table__icon table__icon--${checkChanging(
                    collection.data.volume_change
                )} icon-arrow-${checkChangingIcon(
                    collection.data.volume_change
                )}`"
            />
        </td>
        <!-- VOL,PSC -->
        <td
            v-if="filters.includes('vol, psc')"
            class="table__item table__item-vol-psc"
        >
            {{
                collection.data.total_sales === 0
                    ? 0
                    : collection.data.total_sales !== null
                    ? collection.data.total_sales
                    : '---'
            }}
        </td>
        <td class="table__item table__item--floor">
            <i
                v-if="collection.data.floor_price[currency]"
                :class="[
                    'table__icon',
                    currency === 'eth'
                        ? 'table__icon--ethereum icon-eth'
                        : 'table__icon--usd icon-dollar',
                ]"
            />

            {{ changingData(collection.data.floor_price[currency]) }}
        </td>
        <td
            :class="[
                'table__item',
                collection.data.floor_change
                    ? `table__item--${checkChanging(
                          collection.data.floor_change
                      )}`
                    : '',
            ]"
        >
            {{
                collection.data.floor_change === 0
                    ? 0
                    : collection.data.floor_change !== null
                    ? change(collection.data.floor_change)
                    : '---'
            }}
            <i
                :class="`table__icon table__icon--${checkChanging(
                    collection.data.floor_change
                )} icon-arrow-${checkChangingIcon(
                    collection.data.floor_change
                )}`"
            />
        </td>
        <td class="table__item">
            {{ collection.data.num_owners }}
        </td>
        <td v-if="filters.includes('items')" class="table__item">
            {{ collection.data.total_supply }}
        </td>
        <!-- F/MP % -->
        <td v-if="filters.includes('f/mp %')" class="table__item">
            {{ changingData(collection.data.floor_to_mint) }}
        </td>
        <!-- <td class="table__item">
            {{ collection.data.listing }}
        </td> -->
        <!-- AVG -->
        <td
            v-if="filters.includes('avg')"
            class="table__item table__item--floor"
        >
            <i
                v-if="collection.data.average_price[currency]"
                :class="[
                    'table__icon',
                    currency === 'eth'
                        ? 'table__icon--ethereum icon-eth'
                        : 'table__icon--usd icon-dollar',
                ]"
            />
            {{ changingData(collection.data.average_price[currency]) }}
        </td>
        <!-- LISTED,% -->
        <!-- <td
            class="table__item"
            :class="`table__item--${checkChanging(
                collection.data.volume_change
            )}`"
        >
            {{ change(collection.data.volume_change) }}

            <i
                :class="`table__icon table__icon--${checkChanging(
                    collection.data.volume_change
                )} icon-arrow-${checkChangingIcon(
                    collection.data.volume_change
                )}`"
            />
        </td> -->
        <!-- UNIQB -->
        <td v-if="filters.includes('uniqb')" class="table__item">
            {{
                collection.data.unique_buyers === 0
                    ? 0
                    : collection.data.unique_buyers !== null
                    ? collection.data.unique_buyers
                    : '---'
            }}
        </td>
    </tr>
</template>

<script>
import changing from '~/mixins/changing/changing.js';

export default {
    mixins: [changing],
    props: {
        collection: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            favorite: false,
        };
    },
    computed: {
        filters() {
            return this.$store.state.tableFilters.filters;
        },

        watchlist() {
            return this.$store.state.params.watchlist;
        },

        currency() {
            return this.$store.state.params.currency;
        },
    },

    created() {
        this.watchlist.includes(this.collection.collection_id)
            ? (this.favorite = true)
            : (this.favorite = false);
    },

    methods: {
        updateWatchlist() {
            this.favorite = !this.favorite;
            this.$store.dispatch('params/updateWatchlist', {
                item: this.collection.collection_id,
            });
        },

        changingData(value) {
            return value === 0 ? 0 : value !== null ? value.toFixed(2) : '---';
        },
    },
};
</script>

<style lang="scss" src="~/assets/scss/components/blanks/table/table-row.scss" />
