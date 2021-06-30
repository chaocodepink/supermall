<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in tabtitle"
      class="tab-title"
      :class="{ active: index === curindex }"
      @click="tabitemclick(index)"
    >
      <span> {{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curindex: 0,
    };
  },
  props: {
    tabtitle: {
      type: Array,
    },
  },
  methods: {
    tabitemclick(index) {
      this.curindex = index;
      this.$emit("tabclick", index);
    },
  },
};
</script>

<style>
.tab-control {
  text-align: center;
  display: flex;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
  z-index: 8;
}
.tab-title {
  flex: 1;
}
.tab-title span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.tab-control .active span {
  border-bottom: 2px solid var(--color-high-text);
}
</style>