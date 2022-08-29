<template lang="pug">
include ../../tools/mixins.pug
<div>
    +b.loader(
        :class="{ active: !active }"
    )
        +e.inner
            +e.wrap
                +e.P.text Подождите, <br /> идёт загрузка...
    template(
        v-if="images != null"
    )
        +e.IMG.hide(
            v-for="(img, index) in images"
            :key="`image-${index}`"
            :src="img"
        )
</div>
</template>
<script>
export default {
    name: 'Loader',
    props: {
        images: { type: Array, default: null },
    },
    data() {
        return {
            active: true,
        };
    },
    mounted() {
        document.onreadystatechange = () => {
            if (document.readyState == 'complete') {
                this.$nextTick(() => {
                    this.active = false;
                }, 1000);
            }
        };
    },
};
</script>

<style
    lang="scss"
    src="~/assets/scss/components/blanks/loader.scss"
    scoped
></style>
