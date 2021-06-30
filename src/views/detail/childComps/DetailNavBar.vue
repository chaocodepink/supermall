<template>
  <div>
    <nar-bar>
      <div slot="left" @click="backimg">
        <img class="Limg" src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="center">
        <div
          v-for="(item, index) in navdata"
          class="centeritem"
          @click="centeritems(index)"
          :class="{ getcolor: index === curindex }"
        >
          {{ item }}
        </div>
      </div>
    </nar-bar>
  </div>
</template>

<script>
import NarBar from "components/common/navbar/NavBar.vue";
export default {
  data() {
    return {
      navdata: ["商品", "参数", "评论", "推荐"],
      curindex: 0,
    };
  },
  components: {
    NarBar,
  },

  methods: {
    centeritems(index) {
      this.curindex = index;
      this.$emit("titleclick", index);
    },
    backimg() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.center {
  display: flex;
}
.centeritem {
  flex: 1;
}
.getcolor {
  color: var(--color-high-text);
}
.Limg {
  margin-top: 10px;
  margin-left: 10px;
}
</style>