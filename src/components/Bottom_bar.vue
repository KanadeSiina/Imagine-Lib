<template>
  <div class="bottom_bar">
    <div class="developer">Developer：@compute</div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.bottom_bar {
  position: absolute;
  bottom: 0;
  height: 40px;
  right: 0;
  left: 0;
  background-color: #000;
}

.developer {
  color: #fff;
  transform: translate(0, 50%);
}
</style>
