<template>
    <!-- @mouseenter="showTooltip = true"
        @mouseleave="showTooltip = false" -->
    <div
        :class="[
            'table-menu-item',
            type === 'button' ? '' : 'table-menu-item--filter',
            (enabled && type !== 'filter') ||
            (setWatchlist && type === 'watchlist')
                ? 'table-menu-item--enabled'
                : '',
        ]"
        @click="handleClick"
    >
        <i
            v-if="type === 'button' || type === 'watchlist'"
            :class="[
                icon === 'star' && setWatchlist
                    ? `icon-${icon}-fullcolor table-menu-item__icon--star-fullcolor`
                    : `icon-${icon}`,
                `table-menu-item__icon table-menu-item__icon--${icon}`,
                enabled ? `table-menu-item__icon--${icon}--enabled` : '',
            ]"
        />
        <img
            v-else
            class="table-menu-item__img"
            src="/images/artblock.png"
            alt=""
        />
        <span class="table-menu-item__text">
            <slot></slot>
        </span>
        <div
            v-if="showTooltip"
            :class="[
                'table-menu-item__tooltip',
                type === 'button' ? 'table-menu-item__tooltip--button' : '',
            ]"
        >
            <tooltip />
        </div>
    </div>
</template>

<script>
import Tooltip from '@/components/blanks/tooltip/Tooltip.vue';
export default {
    components: { Tooltip },
    props: {
        type: {
            type: String,
            default: 'button',
        },
        icon: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            enabled: false,
            showTooltip: false,
        };
    },

    computed: {
        setWatchlist() {
            return this.$store.state.params.setWatchlist;
        },
    },

    methods: {
        handleClick() {
            this.enabled = !this.enabled;

            return this.$emit('handle-click');
        },
    },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/table/table-menu-item.scss"
></style>
