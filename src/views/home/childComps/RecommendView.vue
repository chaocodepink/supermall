<template>
  <div class="home-recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <span>{{ item.title }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.home-recommend {
  display: flex;
  font-size: 14px;
  border-bottom: 10px solid #eee;
  padding-bottom: 15px;
}
.recommend-item {
  padding: 10px 0 20px;
  text-align: center;
  flex: 1;
}
.recommend-item img {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}
</style>