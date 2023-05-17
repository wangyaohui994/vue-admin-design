<template>
	<div class="login-wrapper" :style="'background-image:url('+ Background +')'">
		<div class="form-box">
			<div class="form-title">
				<!-- <img src="../assets/img/logo2.png" alt="icon"> -->
				<p>请选择课程</p>
			</div>
			<el-input style="width: 250px;height: 50px;" v-model="courseJoinId" placeholder="输入课程编号">
				<template #suffix>
					<el-button type="primary" style="height: 30px;" @click="joinClass()">加入课程</el-button>
				</template>
			</el-input>
			
			<div class="form-new">
				<el-dialog :visible.sync="dialogFormVisible">
					<el-form :model="course" ref="dataForm" label-position="left" label-width="90px"
						style="width: 400px; margin-left:50px;">
						<el-form-item label="课程名称" prop="courseName">
							<el-input type="textarea" :rows="2" v-model="course.courseName"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取消</el-button>
						<el-button type="primary" @click=" newCourse() ">确定</el-button>
					</div>
				</el-dialog>
			</div>
			<div class="date-row">
				<el-col :span="5" v-for="(item,index) in cardInfoData" :key="index" :offset="1">
					<div>
						<el-card shadow="always" :body-style="{padding: '0px'}">
							<div>
								<img src="@/assets/img/course.jpg" class="image">
								<div style="padding: 14px;">
									<p class="courseName">{{ item.courseName }}</p>
								</div>
							</div>
							<el-button type="primary"  @click.native.prevent="handleLogin(item)">进入
							</el-button>
						</el-card>
				
					</div>
				</el-col>		
			</div>
			<el-form-item>

			</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {
		login
	} from '@/api/login'
	import {
		setToken
	} from '@/utils/cookie'
	import {
		add,
		queryById,
		deleteById,
		querybystudentid
	} from '@/api/getCourse'
	import {
		getStorage,
		setStorage
	} from '@/utils/localStorage'
	import {
		addCS
	} from '@/api/getCourseStudent'
	import Background from '../assets/img/login-background.jpg'

	export default {
		name: 'Login',
		data() {
			return {
				teacherId: {},
				cardInfoData: [],
				course: {
					courseName: "",
				},
				dialogFormVisible: false,
				Background,
				loading: false,
				redirect: undefined,
				courseJoinId : [],


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
			initCourse() {
				this.studentId = JSON.parse(getStorage("userInfo")).studentId
				const data = {
					studentId: this.studentId,
				}
				if (data) {
					querybystudentid(data).then(res => {
						this.cardInfoData = res.datas;
						console.log(this.cardInfoData);
						console.log("加载成功");
					}).catch(() => {
						console.log("加载失败");

					})
				}

			},
			handleLogin(item) {
				setStorage("courseInfo", JSON.stringify(item))
				this.$router.push({
					path: '/homeStudent'
				})
			},
			deletebyId(item) {
				const data = {
					courseId: item.courseId
				}
				if (data) {
					deleteById(data).then(res => {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.initCourse();
					}).catch(() => {
						this.$message.error('删除失败');
					})
				}
			},
			handleCreate() {
				this.course = {
					courseName: "",
				};
				this.dialogFormVisible = true;
			},
			newCourse() {
				this.teacherId = JSON.parse(getStorage("userInfo")).teacherId
				const data = {
					teacherId: this.teacherId,
					courseName: this.course.courseName
				}
				console.log("12345")
				if (data) {
					add(data).then(res => {
						this.$message({
							message: '成功添加',
							type: 'success'
						});
						this.dialogFormVisible = false;
						this.initCourse();
					}).catch(() => {
						this.$message.error('添加失败');
						this.dialogFormVisible = false;
					})
				}
			},
			joinClass() {
				this.studentId = JSON.parse(getStorage("userInfo")).studentId
				const data = {
					courseId : this.courseJoinId,
					studentId : this.studentId
				}
				if(data){
					addCS(data).then(res =>{
						this.$message({
							message: '成功添加该课程',
							type: 'success'
						});
						this.initCourse()
					})
				}
				
			},
		},
		mounted() {
			this.$nextTick(() => {
				this.initCourse();
			})
		},

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
			width: 800px;
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
