<template>
    <div class="collection-info">
        <div class="collection-info__wrapper">
            <div class="collection-info__main">
                <img
                    :src="collection.image_url"
                    alt="icon"
                    class="collection-info__img"
                />
                <span class="collection-info__id">{{ collection.name }}</span>

                <a
                    :href="collection.link_opensea"
                    target="_blank"
                    class="collection-info__link collection-info__link--opensea"
                >
                    <i
                        class="icon-opensea collection-info__icon collection-info__icon--opensea"
                    />
                </a>
            </div>
            <hr class="collection-info__line" />
            <div class="collection-info__bottom">
                <span class="collection-info__bottom-text">Links</span>
                <div class="collection-info__social-links">
                    <a
                        :href="collection.link_twitter"
                        target="_blank"
                        class="collection-info__link"
                    >
                        <i
                            class="collection-info__icon collection-info__icon--twitter icon-twitter"
                        />
                    </a>

                    <a
                        :href="collection.link_discord"
                        target="_blank"
                        class="collection-info__link"
                    >
                        <i
                            class="collection-info__icon collection-info__icon--discord icon-discord"
                        />
                    </a>

                    <a
                        :href="collection.link_website"
                        target="_blank"
                        class="collection-info__link"
                    >
                        <i
                            class="collection-info__icon collection-info__icon--market icon-market"
                        />
                    </a>
                </div>
            </div>
        </div>
        <div class="collection-info__props">
            <div class="collection-info__prop">
                <span class="collection-info__prop-text">Items</span>
                <span class="collection-info__prop-volume">{{ 9999 }}</span>
            </div>

            <div class="collection-info__prop">
                <span class="collection-info__prop-text">Mint Price</span>
                <div class="collection-info__volume-with-icon">
                    <i
                        class="icon-eth collection-info__icon collection-info__icon--eth"
                    />
                    <span class="collection-info__prop-volume">{{
                        collection.mint ? collection.mint : '---'
                    }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        collection: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/collectionInfo/collection-info.scss"
/>
