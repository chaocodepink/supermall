<template>
  <div class="nav-bar">
    <div class="nav-left"><slot name="left" class="left"> </slot></div>
    <div class="nav-center"><slot name="center"></slot></div>
    <div class="nav-right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.nav-bar {
  display: flex;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
}
.nav-left {
  width: 60px;
}
.nav-right {
  width: 60px;
}
.nav-center {
  flex: 1;
  line-height: 44px;
  height: 44px;
  text-align: center;
}
</style>