<template>
    <div class="image">
        <picture>
            <source type="image/webp" :data-srcset="`${path}.webp`" />
            <source :type="`image/${fallbackExt}`" :data-srcset="fallbackSrc" />
            <source
                :key="'image'"
                :data-src="fallbackSrc"
                :data-lowsrc="blur"
                :alt="alt"
            />
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
        blur: {
            type: String,
            required: false,
            default: '',
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
