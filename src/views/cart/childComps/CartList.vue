<template>
  <div class="cartlist">
    <scroll class="scroll" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartlist"
        :item-info="item"
        :key="index"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Scroll from "components/common/scroll/Scroll.vue";

import CartListItem from "./CartListItem";
export default {
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartlist"]),
  },

  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cartlist {
  height: calc(100% - 44px - 49px - 44px);
  overflow: hidden;
}
.scroll {
  height: 100%;
}
</style>