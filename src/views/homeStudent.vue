<template>
	<div class="home-wrapper">
		<el-input style="width: 250px;height: 50px;" v-model="courseJoinId" placeholder="输入课程编号" v-show="isStudent">
			<template #suffix>
				<el-button type="primary" style="height: 30px;" @click="joinClass()">加入课程</el-button>
			</template>
		</el-input>
		<el-input style="width: 250px;height: 50px;" v-model="courseSetName" placeholder="输入课程名称" v-show="!isStudent">
			<template #suffix>
				<el-button type="primary" style="height: 30px;" @click="setClass()">创建课程</el-button>
			</template>
		</el-input>
		<el-row>
			<el-col :span="5" v-for="(item,index) in cardInfoData" :key="index" :offset="1">
				<div>
					<el-card shadow="always" :body-style="{padding: '0px'}">
						<div>
							<img src="@/assets/img/course.jpg" class="image">
							<div style="padding: 14px;">
								<p class="courseName">{{ item.courseName }}</p>
							</div>
						</div>
						<el-button type="text" @click="copy(item.courseId)" >复制编号</el-button>
						<el-button type="primary" style="float: right;" @click.native.prevent="changeCourse(item)">进入
						</el-button>
					</el-card>

				</div>
			</el-col>
		</el-row>

		<!-- <el-row class="date-box" :gutter="20" v-show="isStudent">
			<el-col :span="16">
				<el-card shadow="always" :body-style="{padding: '0px'}">
					<template>
						<el-table :data="applyData" style="width: 100%">
							<el-table-column label="姓名" width="180">
								<template slot-scope="scope">
									<el-popover trigger="hover" placement="top">
										<p>姓名: {{ scope.row.studentName }}</p>
										<p>擅长: {{ scope.row.studentSkill }}</p>
										<div slot="reference" class="name-wrapper">
											<el-tag size="medium">{{ scope.row.studentName }}</el-tag>
										</div>
									</el-popover>
								</template>
							</el-table-column>
							<el-table-column label="申请宣言" width="180">
								<template slot-scope="scope">
									
									<span style="margin-left: 10px">{{ scope.row.applicationManifesto }}</span>
								</template>
							</el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<el-button size="mini" type="primary" @click="accept(scope.$index, scope.row)">同意
									</el-button>
									<el-button size="mini" type="danger" @click="refuse(scope.$index, scope.row)">拒绝
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
				</el-card>
			</el-col>
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
			</el-col> -->

			
		<!-- <el-row class="date-box" :gutter="20">
      <el-col :span="12">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsBar :title="title" :data="commonChartsData" class="data-chart" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsLine :title="title" :data="commonChartsData" class="data-chart" />
        </el-card>
      </el-col>
    </el-row> -->
	</div>
	</div>
</template>

<script>
	import CountTo from 'vue-count-to'
	import {
		add,
		queryById,
		querybystudentid
	} from '@/api/getCourse'
	import {
		addCS
	} from '@/api/getCourseStudent'
	import {
		getStorage,
		setStorage
	} from '@/utils/localStorage'
	import {
		queryCidSid,
		addTeamStudent
	} from '@/api/getTeamStudent'

	import {
		deleteByIdApplication,
		queryByRidApplication,
		queryByRSidApplication
	} from '@/api/getApplication'

	import ChartsPie from '@/components/Charts/ChartsPie'
	import ChartsBar from '@/components/Charts/ChartsBar'
	import ChartsLine from '@/components/Charts/ChartsLine'
	export default {
		name: 'Home',
		components: {
			CountTo,
			ChartsPie,
			ChartsBar,
			ChartsLine
		},
		data() {
			return {
				courseJoinId: "",
				courseSetName: "",
				studentId: "",
				text: '代办事项',
				cardInfoData: [],
				applyData: [],
				isStudent: true,
			}
		},
		inject: ['reload'],
		methods: {
			initCourse() {
				this.studentId = JSON.parse(getStorage("userInfo")).studentId
				this.radio = JSON.parse(getStorage("radio"))
				this.teacherId = JSON.parse(getStorage("userInfo")).teacherId

				if (this.radio == 1) {
					this.isStudent = true
				} else {
					this.isStudent = false
				}
				const data = {
					studentId: this.studentId,
				}
				const datas = {
					teacherId: this.teacherId,
				}
				if(this.isStudent == true){
					if (data) {
						querybystudentid(data).then(res => {
							this.cardInfoData = res.datas;			
						}).catch(() => {
						})
					}
				}else{
					if (datas) {
						queryById(datas).then(res => {
							this.cardInfoData = res.datas;	
						}).catch(() => {
						})
					}
				}
				
				

			},
			ininApply() {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				this.studentId = JSON.parse(getStorage("userInfo")).studentId
				var teamId = 1
				const datas = {
					courseId: this.courseId,
					studentId: this.studentId
				}
				if (datas) {
					queryCidSid(datas).then(res => {
						var recruitId = res.datas[0].recruitId
						const data = {
							recruitId: recruitId
						}
						if (data) {
							queryByRSidApplication(data).then(res => {
								this.applyData = res.datas

							}).catch(() => {
								// this.$message.error('出现错误');
							})
						}
					}).catch(() => {
						// this.$message.error('出现错误');
					})
				}
			},
			refuse(index, row) {
				const data = {
					applicationId: row.applicationId,
				}
				if (data) {
					deleteByIdApplication(data).then(res => {
						this.$message({
							message: '成功拒绝该同学的申请',
							type: 'success'
						});
					}).catch(() => {
						this.$message.error('没有获取到学生id');
					})
				}
				this.initCourse();
				this.ininApply();
			},
			accept(index, row) {
				console.log(index, row);
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				this.studentId = JSON.parse(getStorage("userInfo")).studentId
				var teamId = 1
				const datas = {
					courseId: this.courseId,
					studentId: this.studentId
				}
				if (datas) {
					queryCidSid(datas).then(res => {
						teamId = res.datas[0].teamId
						const data = {
							applicationId: row.applicationId,
						}
						if (data) {
							deleteByIdApplication(data).then(res => {
								const Ts = {
									studentId: row.studentId,
									teamId: teamId
								}
								if (Ts) {
									addTeamStudent(Ts).then(ressss => {
										this.$message({
											message: '已经将该同学添加至您的小组',
											type: 'success'
										});
									})
								}
							}).catch(() => {
								this.$message.error('没有获取到学生id');
							})
						}
					}).catch(() => {
						this.$message.error('您还没有加入任何一个小组，去招募墙看看吧');
					})
				}
				this.initCourse();
				this.ininApply();
			},
			changeCourse(item) {
				setStorage("courseInfo", JSON.stringify(item))
				this.$message({
					message: '成功进入',
					type: 'success'
				});
				this.reload()
			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			joinClass() {
				this.studentId = JSON.parse(getStorage("userInfo")).studentId
				const data = {
					courseId: this.courseJoinId,
					studentId: this.studentId
				}
				if (data) {
					addCS(data).then(res => {
						this.$message({
							message: '成功添加该课程',
							type: 'success'
						});
						this.initCourse()
					})
				}

			},
			setClass() {
				this.teacherId = JSON.parse(getStorage("userInfo")).teacherId
				const data = {
					teacherId: this.teacherId,
					courseName: this.courseSetName
				}
				if (data) {
					add(data).then(res => {
						this.$message({
							message: '成功添加',
							type: 'success'
						});
						this.dialogFormVisible = false;
						this.courseSetName = "";
						this.initCourse();
					}).catch(() => {
						this.$message.error('添加失败');
						this.dialogFormVisible = false;
					})
				}
			},
			 copy(data) {
			 
			                let url = data;
			                let oInput = document.createElement('input');
			                oInput.value = url;
			                document.body.appendChild(oInput);
			                oInput.select(); // 选择对象;
			                console.log(oInput.value)
			                document.execCommand("Copy"); // 执行浏览器复制命令
			                this.$message({
			                    message: '课程编号复制成功',
			                    type: 'success'
			                });
			                oInput.remove()
			            }
		},


		mounted() {
			this.$nextTick(() => {
				this.initCourse();
				this.ininApply();
				console.log("展示")
			})
		},
		created(){
			this.$nextTick(() => {
				this.initCourse();
				this.ininApply();
				console.log("创建")
			})
		}
	}
</script>

<style lang="less">
	@import "../assets/less/home";
</style>
