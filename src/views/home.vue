<template>
  <div class="home-wrapper">
	<el-row>
		<el-col :span="5" v-for="(item,index) in cardInfoData" :key="index" :offset="1">
			<div>
				<el-card shadow="always" :body-style="{padding: '0px'}">
				  <div class="date-block">
					<i :class="['el-icon-monitor']"  class="icon-box" />
					<div class="date-cont">
			 <!--         <CountTo class="count" :start-val="0" :end-val="item.count" :duration="3000" /> -->
					  <p class="courseName">{{ item.courseName }}</p>
					</div>
				  </div>
				  <el-button type="primary" @click.native.prevent="changeCourse(item)">进入</el-button>
				</el-card>
			  
			</div>
		</el-col>
	</el-row>
	
     <el-row class="date-box" :gutter="20">
     <!-- <el-col :span="12">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsPie :title="text" type="pie" :data="chartsPieData" class="data-desc" />
        </el-card>
      </el-col> -->
      <el-col :span="12">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <div class="data-desc data-lang-box">
            <div class="data-lang-title">项目语言构成</div>
            <div v-for="(item, index) in langsData" :key="index" class="data-lang-item">
              <label>{{ item.name }}</label>
              <el-progress :percentage="item.value" :stroke-width="16" :color="item.color" />
            </div>
          </div>
        </el-card>
      </el-col>
	  <el-col :span="12">
	    <el-card shadow="always" :body-style="{padding: '0px'}">
	      <ChartsBar :title="title" :data="commonChartsData" class="data-chart" />
	    </el-card>
	  </el-col>
     <!-- <el-col :span="8">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsPie :title="text" type="ring" :data="chartsPieData" class="data-desc" />
        </el-card>
      </el-col> -->
    </el-row>
    <el-row class="date-box" :gutter="20">
      
      <!-- <el-col :span="12">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsLine :title="title" :data="commonChartsData" class="data-chart" />
        </el-card>
      </el-col> -->
    </el-row>
  </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import {add,queryById} from '@/api/getCourse'
import { getStorage , setStorage} from '@/utils/localStorage'
import ChartsPie from '@/components/Charts/ChartsPie'
import ChartsBar from '@/components/Charts/ChartsBar'
import ChartsLine from '@/components/Charts/ChartsLine'
export default {
  name: 'Home',
  components: { CountTo, ChartsPie, ChartsBar, ChartsLine },
  data() {
    return {
      text: '代办事项',
      title: '近七天用户访问量条形图',
      langsData: [
        { name: 'VUE', value: 45, color: '#2d8cf0' },
        { name: 'ES6', value: 32, color: '#19be6b' },
        { name: 'TS', value: 4, color: '#ff9900' },
        { name: 'LESS', value: 13, color: '#e46cbb' },
        { name: 'HTML', value: 6, color: '#9a66e4' }
      ],
      cardInfoData: [],
      chartsPieData: [
        { value: 1920, name: '直接访问' },
        { value: 1169, name: '邮件营销' },
        { value: 986, name: '联盟广告' },
        { value: 621, name: '视频广告' },
        { value: 3256, name: '搜索引擎' }
      ],
      commonChartsData: {
        Mon: 7,
        Tue: 9,
        Wed: 1,
        Thu: 8,
        Fri: 3,
        Sat: 2,
        Sun: 10
      },
	  fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    }
  },
  methods: {
	  initCourse(){
	  	this.teacherId = JSON.parse(getStorage("userInfo")).teacherId
	  	const data = {
	  		teacherId : this.teacherId,
	  	}
	  	if(data){
	  		queryById(data).then(res =>{
	  			this.cardInfoData = res.datas;
	  			console.log(this.cardInfoData);
	  			console.log("加载成功");
	  		}).catch(()=>{
	  			console.log("加载失败");
	  			
	  		})
	  	}
	  	
	  },
	  changeCourse(item){
		setStorage("courseInfo", JSON.stringify(item))
		this.$message({
		          message: '成功进入',
		          type: 'success'
		        });
	  },
        submitUpload() {
          this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        }
      },
	  mounted() {
	  	this.$nextTick(() => {
	  		this.initCourse();
	  	})
	  },
		created() {
			this.initCourse();
		}
}
</script>

<style lang="less">
@import "../assets/less/home";
</style>
