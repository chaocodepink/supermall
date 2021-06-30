<template>
  <div id="detail">
    <nar-bar class="detail-nav" @titleclick="titleclick" ref="nav"></nar-bar>
    <scroll @scroll="scrolllength" :probe-type="3" ref="scroll" class="content">
      <detail-swiper :topimage="topimage" ref="swiper"></detail-swiper>
      <detail-base :goods="goods"></detail-base>
      <detail-shop :shop="shop"></detail-shop>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list :goods="recommend" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCarts"></detail-bottom-bar>
    <back-top @click.native="backtop" v-show="Lescroll"></back-top>
  </div>
</template>

<script>
import { imagefresh, backtop } from "common/mixin.js";

import { formatDate } from "common/utils.js";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList.vue";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";

import NarBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailShop from "./childComps/DetailShopInfo";
import DetailBase from "./childComps/DetailBaseInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

export default {
  name: "Detail",
  mixins: [imagefresh, backtop],
  data() {
    return {
      iid: null,
      topimage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      imageloads: null,
      titleTop: [],
      titleTops: [],
    };
  },
  methods: {
    addToCarts() {
      // 2.将商品信息添加到Store中
      const obj = {};
      obj.iid = this.iid;
      obj.imgURL = this.topimage[0];
      obj.title = this.goods.title;
      obj.desc = this.goods.desc;
      obj.price = this.goods.realPrice;

      this.$store.dispatch("addCart", obj).then((res) => {
        this.$toast.show(res);
        console.log(res);
      });
      // this.$store.dispatch('addToCart', obj).then(() => {
      //  this.$toast({message: '加入购物车成功'})
      // })
      /*  this.addCart(obj).then(() => {
        this.$toast({ message: "加入购物车成功" });
      }); */
    },
    scrolllength(position) {
      let y = -position.y;
      this.Lescroll = -position.y > 800;

      let tlength = this.titleTop.length;
      for (let i = 0; i < tlength; i++) {
        if (
          this.curindex !== i &&
          ((i < tlength - 1 &&
            y >= this.titleTop[i] &&
            y < this.titleTop[i + 1]) ||
            (i === tlength - 1 && y >= this.titleTop[i]))
        ) {
          this.$refs.nav.curindex = i;
        }
      }
    },
    imageLoad() {
      // this.$refs.scroll.refresh();
      this.refresh();
      // 获取对应的offsetTop

      this.titleTop = [];
      this.titleTop.push(0);
      this.titleTop.push(this.$refs.param.$el.offsetTop);
      this.titleTop.push(this.$refs.comment.$el.offsetTop);
      this.titleTop.push(this.$refs.recommend.$el.offsetTop);
      // this.titleTop.push(Number.MAX_VALUE);

      // this.titleTops = formatDate(gettitleTop, 500);

      // this.titleTops();
    },
    titleclick(index) {
      this.$refs.scroll.scrollTo(0, -this.titleTop[index]);
    },
  },
  components: {
    NarBar,
    DetailSwiper,
    DetailShop,
    DetailBase,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("imgLoad", this.imageloads);
  },
  created() {
    this.iid = this.$route.query.iid;
    getDetail(this.iid).then((res) => {
      // 获取顶部轮播图
      const data = res.result;
      this.topimage = res.result.itemInfo.topImages;

      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 5.保存评论数据
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
      // 6.下面商品图片的请求
      getRecommend().then((res) => {
        this.recommend = res.data.list;
      });
    });
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  height: 100vh;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 59px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
