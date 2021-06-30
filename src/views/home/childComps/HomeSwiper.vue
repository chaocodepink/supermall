<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img @load="swipimage" :src="item.image" alt="" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";
export default {
  data() {
    return {
      imageload: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners: {
      type: Array,
      required: true,
    },
  },
  methods: {
    swipimage() {
      if (!this.imageload) {
        this.$emit("swipimagload");
        this.imageload = true;
      }
    },
  },
};
</script>

<style>
</style>