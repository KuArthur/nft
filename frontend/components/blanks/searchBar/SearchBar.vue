<template>
    <!-- <div
        v-click-outside="closeSearchBar"
        :class="['search-bar', active ? 'search-bar--active' : '']"
    > -->

    <!-- for field:
    :class="[
            'search-bar__field',
            active ? 'search-bar__field--active' : '',
        ]"
     -->
    <div v-click-outside="focusInput" class="search-bar__field">
        <i
            :class="[
                'icon-search search-bar__icon search-bar__icon--search',
                { 'search-bar__icon--search--focus': onInput },
            ]"
        ></i>
        <!-- for input:
            @change="clearFocus"
            @click="openSearchBar"
            @keydown="switchItem"
            @keydown.enter="setFocusItem"
         -->
        <input
            ref="searchbar"
            v-model="search"
            :class="[
                'search-bar__input',
                { 'search-bar__input--focus': onInput },
            ]"
            type="text"
            placeholder="Search collection"
            @keyup="getSearch"
            @focus="onInput = true"
            @blur="loading ? (onInput = true) : (onInput = false)"
        />
        <!-- <i
            v-if="active"
            class="icon-circle-close search-bar__icon search-bar__icon--close"
            @click="closeSearchBar"
        /> -->
    </div>
    <!-- <ul v-if="active" ref="list" class="search-bar__list">
            <li
                v-for="(collection, idx) in filteredCollections"
                ref="filteredCollections"
                :key="collection.top_id"
                class="search-bar__collection"
                :class="{
                    'search-bar__collection--focus': idx === focus,
                }"
                @keyup="switchItem"
            >
                <div class="search-bar__collection-wrapper">
                    <img
                        class="search-bar__collection-img"
                        :src="collection.image_url"
                    />
                    <span class="search-bar__collection-name">{{
                        collection.name
                    }}</span>
                </div>
                <span class="search-bar__collection-rating"
                    >#{{ collection.top_id }}</span
                >
            </li>
        </ul> -->
    <!-- </div> -->
</template>

<script>
import vClickOutside from 'v-click-outside';
import calcRem from '@/tools/calcRem.js';
export default {
    directives: {
        clickOutside: vClickOutside.directive,
    },
    data() {
        return {
            active: false,
            focus: 0,
            onInput: false,
        };
    },
    computed: {
        search: {
            get() {
                return this.$store.state.params.search;
            },
            async set(newValue) {
                this.$store.commit('params/SET_SEARCH', newValue);
                this.$store.dispatch('params/resetPage');
            },
        },
        filteredCollections() {
            return this.$store.getters['collections/getFilteredCollections'];
        },
        loading() {
            return this.$store.state.collections.loading;
        },
    },
    mounted() {
        // this.$nuxt.$on('hideSelects', () => {
        //     this.hideSelect();
        // });
    },
    beforeDestroy() {
        this.$store.commit('params/SET_SEARCH', '');
        // this.$nuxt.$off('hideSelects');
    },
    methods: {
        getSearch() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                this.$store.dispatch('collections/setCollectionsList');
            }, 700);
        },

        // inInput() {
        //     this.onInput = true;
        //     this.$refs.searchbar.focus();
        // },
        // outInput() {
        //     if (this.loading) this.inInput();

        //     this.onInput = false;
        // },
        focusInput() {
            if (this.loading && this.onInput) {
                this.$refs.searchbar.focus();
            } else {
                this.onInput = false;
            }
        },

        openSearchBar() {
            this.active = true;
        },
        closeSearchBar() {
            this.active = false;
        },
        switchItem(event) {
            switch (event.keyCode) {
                case 38:
                    if (this.focus > 0) {
                        this.focus--;
                        if (this.focus % 8 === 0) {
                            this.$refs.list.scrollBy(0, -calcRem(22.3125));
                        }
                    }
                    break;
                case 40:
                    if (this.focus < this.filteredCollections.length - 1) {
                        this.focus++;
                        if (this.focus % 9 === 0) {
                            this.$refs.list.scrollBy(0, calcRem(22.3125));
                        }
                    }
                    break;
            }
        },
        setFocusItem() {
            this.$refs.filteredCollections[this.focus].focus();
            this.$router.push(
                `/collection/${this.filteredCollections[this.focus].id}`
            );
        },
        clearFocus() {
            this.focus = 0;
        },
    },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/searchBar/search-bar.scss"
/>
