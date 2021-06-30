<template>
  <div id="cart">
    <nav-bar class="nav">
      <div slot="center">购物车({{ cartlength }})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import NavBar from "components/common/navbar/NavBar.vue";

import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
export default {
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    ...mapGetters(["cartlength"]),
  },
};
</script>

<style scoped>
#cart {
  height: 100vh;
}
.nav {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
