<template>
  <div class="scroll" ref="scroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      bscroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.bscroll = new BScroll(this.$refs.scroll, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad,
    });
    if (this.probeType === 2 || this.probeType === 3) {
      this.bscroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }
    if (this.pullUpLoad) {
      this.bscroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.bscroll && this.bscroll.scrollTo(x, y, time);
    },
    refresh() {
      this.bscroll && this.bscroll.refresh();
    },
    finishPullUp() {
      this.bscroll && this.bscroll.finishPullUp();
    },
    Lscroll() {
      return this.bscroll.y;
    },
  },
};
</script>

<style scoped>
.scroll {
  overflow: hidden;
}
</style>