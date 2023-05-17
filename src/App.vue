<template>
  <div id="app">
    <!-- <router-view /> -->
		<router-view v-if="showRouter"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
	provide (){
	    return {
	      reload: this.reload
	    }
	  },
	  data (){
	    return {
	      showRouter: true
	    }
	  },
	  methods: {
	    reload (){
	      this.showRouter = false
	      this.$nextTick(()=>{
	        this.showRouter = true
	      })
	    }
	  }

}
</script>

<style lang="less">
@import "assets/less/index.less";
@import "assets/less/reset";
</style>
