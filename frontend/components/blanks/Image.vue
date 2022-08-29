<template>
    <div class="image">
        <picture>
            <source :srcset="`${path}.webp`" type="image/webp" />
            <source :srcset="fallbackSrc" :type="`image/${fallbackExt}`" />
            <source :key="'image'" :src="fallbackSrc" :alt="alt" />
        </picture>
    </div>
</template>

<script>
export default {
    props: {
        path: {
            type: String,
            required: true,
        },
        fallbackExt: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            required: true,
        },
    },
    computed: {
        fallbackSrc() {
            return `${this.path}.${this.fallbackExt}`;
        },
    },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/image.scss"
    scoped
></style>
