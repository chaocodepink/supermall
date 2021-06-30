<template>
  <div id="home">
    <nar-bar class="home-nav">
      <div slot="center">购物街</div>
    </nar-bar>
    <tab-control
      ref="tabc1"
      :tabtitle="['流行', '新款', '精选']"
      @tabclick="tabclick"
      v-show="isshow"
    ></tab-control>
    <!--  </nar-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view> -->
    <scroll
      class="scroll2"
      ref="scroll"
      :probe-type="3"
      @scroll="Hscroll"
      :pull-up-load="true"
      @pullingUp="loadmore"
    >
      <home-swiper @swipimagload="swipload" :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        ref="tabc2"
        :tabtitle="['流行', '新款', '精选']"
        @tabclick="tabclick"
      ></tab-control>
      <good-list :goods="Goodsshuju"></good-list>
    </scroll>
    <back-top @click.native="backtop" v-show="Lescroll"></back-top>
  </div>
</template>

<script>
import { imagefresh, backtop } from "common/mixin.js";

import NarBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";

import { getMultiData, getProductData } from "network/home.js";

import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import { formatDate } from "common/utils.js";

export default {
  mixins: [imagefresh, backtop],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] },
      },
      degoods: "pop",

      swiptop: 0,
      isshow: false,
      Lscroll: 0,
      imageloads: null,
    };
  },
  computed: {
    Goodsshuju() {
      return this.goods[this.degoods].list;
    },
  },
  components: {
    NarBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.Lscroll, 0);
    this.$refs.scroll.bscroll.refresh();
  },
  deactivated() {
    this.Lscroll = this.$refs.scroll.Lscroll();
    this.$bus.$off("imgLoad", this.imageloads);
  },

  created() {
    getMultiData().then((res) => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });

    // 请求商品数据
    this.HgetProductData("pop");
    this.HgetProductData("new");
    this.HgetProductData("sell");
  },
  mounted() {},
  // 网络请求方法
  methods: {
    HgetProductData(type) {
      const page = this.goods[type].page;
      getProductData(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page++;

        this.$refs.scroll.finishPullUp();
      });
    },
    tabclick(index) {
      switch (index) {
        case 0:
          this.degoods = "pop";
          break;
        case 1:
          this.degoods = "new";
          break;
        case 2:
          this.degoods = "sell";
          break;
      }
      this.$refs.tabc1.curindex = index;
      this.$refs.tabc2.curindex = index;
    },

    Hscroll(position) {
      this.Lescroll = -position.y > 800;
      let le = -position.y;
      this.isshow = le > this.swiptop;
    },
    loadmore() {
      this.HgetProductData(this.degoods);
    },
    swipload() {
      this.swiptop = this.$refs.tabc2.$el.offsetTop;
    },
  },
};
</script>

<style scoped>
.scroll2 {
  position: absolute;
  top: 37px;
  bottom: 49px;
  left: 0;
  right: 0;
}
#home {
  padding-top: 40px;
}
.home-nav {
  background-color: #ff8198;
  color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
}
.tab-control {
  position: relative;
}
</style>