<template>
  <div class="login-wrapper" :style="'background-image:url('+ Background +')'">
    <div class="form-box">
      <div class="form-title">
        <!-- <img src="../assets/img/logo2.png" alt="icon"> -->
        <p>请选择课程</p>
      </div>
      <div class="date-row">
        <div v-for="(item, index) in cardInfoData" :key="index" class="data-col">
          <el-card shadow="always" :body-style="{padding: '0px'}">
            <div class="date-block">
              <i :class="[ item.icon ]" :style="{ background: item.color }" class="icon-box" />
              <div class="date-cont">
       <!--         <CountTo class="count" :start-val="0" :end-val="item.count" :duration="3000" /> -->
                <p class="title">{{ item.title }}</p>
              </div>
            </div>
			
          </el-card>
		  <el-button :loading="loading" size="small" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
		    <span v-if="!loading">登 录</span>
		    <span v-else>登 录 中...</span>
		  </el-button> 
        </div>
      	 
      </div>
        <el-form-item>
          
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login'
import { setToken } from '@/utils/cookie'
import Background from '../assets/img/login-background.jpg'

export default {
  name: 'Login',
  data() {
    return {
		cardInfoData: [
		  { title: '算法分析与设计', icon: 'el-icon-monitor', color: '#2d8cf0' },
		  { title: '计算机网络', icon: 'el-icon-monitor', color: '#19be6b' },
		  { title: '计算机体系结构', icon: 'el-icon-monitor', color: '#ff9900' },
		  { title: '智能系统', icon: 'el-icon-monitor', color: '#e46cbb' },
		  { title: 'java企业级应用', icon: 'el-icon-monitor', color: '#9a66e4' }
		],
      Background,
      loginForm: {
        username: 'admin',
        password: 'admin123',
        rememberMe: true
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.$router.push({ path:  '/home' })
    }
  }
}
</script>

<style lang="less">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-size: cover;
  .form-box {
    width: 320px;
    padding: 15px 30px 20px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 1, .1);
    .form-title {
      margin: 0 auto 35px;
      text-align: center;
      color: #707070;
      font-size: 18px;
      letter-spacing: 2px;
    }
  }
}
</style>
