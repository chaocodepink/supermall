<template>
  <swiper class="detailsw">
    <swiper-item v-for="item in topimage">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";
export default {
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topimage: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.detailsw {
  height: 300px;
  overflow: hidden;
}
</style>