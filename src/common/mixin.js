


import { formatDate } from "common/utils.js";
import BackTop from "components/content/backTop/BackTop.vue";




export const imagefresh = {
  data() {
    return {
      refresh: null
    }
  },
  mounted() {
    this.refresh = formatDate(this.$refs.scroll.refresh, 50);
    this.imageloads = () => {
      this.refresh()
    };
    this.$bus.$on("imgLoad", this.imageloads);
  }
}

export const backtop = {
  components: {
    BackTop
  },
  data() {
    return {
      Lescroll: false,
    }
  },
  methods: {
    backtop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
  }
}