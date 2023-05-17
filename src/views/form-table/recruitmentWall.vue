<template>
	<div>
		<el-button size="small" type="primary" icon="el-icon-plus" @click="createRecruit" v-show="isStudent">
			发布/修改招募
		</el-button>
		<!-- <el-button size="small" type="primary" icon="el-icon-thumb" @click="sortSimilar()" v-show="isStudent">
			按推荐程度排序
		</el-button>
		<el-button size="small" type="primary" icon="el-icon-timer" @click="sortRId()" v-show="isStudent">
			按发布时间排序
		</el-button> -->
		<el-button style="float: right;" size="small" type="danger" icon="el-icon-s-custom" @click="createTeam"
			v-show="isStudent">
			创建/修改小组
		</el-button>
		<el-dialog :visible.sync="dialogForm">
			<el-form :model="Recruit" ref="dataForm" label-position="left" label-width="90px"
				style="width: 400px; margin-left:50px;">
				<el-form-item label="招募宣言" prop="name">
					<el-input type="textarea" :rows="2" v-model="Recruit.recruitManifesto"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogForm = false">取消</el-button>
				<el-button type="primary" @click=" submitRecruit() ">确定</el-button>
			</div>
		</el-dialog>

		<el-row>
			<el-col :span="5" v-for="(model,index) in dataList" :key="index" :offset="1">
				<el-card shadow="hover">
					<div slot="header" class="clearfix">
						<span style="float: left;">{{model.teamName}}</span>
						<el-button style="float: right; padding: 3px 0" type="text" @click="handleClick(model)">查看详情
						</el-button>
					</div>
					<div style="font-size: 14px;margin-bottom: 18px;">
						{{model.recruitManifesto}}
					</div>
					<div style="font-size: 14px;margin-bottom: 18px;" v-show="model.recommend">
						<img style='max-width:10%;height:auto;float: right;' src="@/assets/img/recommend.jpg"
							class="image">
					</div>
				</el-card>
			</el-col>
		</el-row>

		<el-dialog title="小组详情" :visible.sync="teamFormVisible">
			<el-form :model="team" ref="dataForm" label-position="left" label-width="90px"
				style="width: 400px; margin-left:50px;">
				<el-form-item label="小组名称" prop="score">
					<el-input rows="2" v-model="team.teamName"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="teamFormVisible = false">取消</el-button>
				<el-button type="primary" @click=" submitTeam() ">确定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="招募详情" :visible.sync="dialogFormVisible">
			<el-descriptions :column="1">
				<el-descriptions-item label="小组名称">{{questionForm.teamName}}</el-descriptions-item>
			</el-descriptions>
			<el-descriptions :column="1">
				<el-descriptions-item label="招募宣言">{{questionForm.recruitManifesto}}</el-descriptions-item>
			</el-descriptions>
			<el-descriptions :column="2" v-for="(student,index) in studentList" :key="index">
				<el-descriptions-item label="小组成员">{{student.studentName}}</el-descriptions-item>
				<el-descriptions-item label="擅长">{{student.studentSkill}}</el-descriptions-item>
			</el-descriptions>
			<el-form :model="application" ref="dataForm" label-position="left" label-width="90px" style="width: 400px;"
				v-show="isStudent">
				<el-form-item label="申请理由" prop="name">
					<el-input type="textarea" style="width: 170%;" :rows="2" v-model="application.manifesto"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click=" submitApplication() " v-show="isStudent">提出申请</el-button>
				<el-button @click="dialogFormVisible = false" v-show="!isStudent">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		add,
		updateRecruit,
		queryByIdRecruit,
		queryByTidRecruit
	} from '@/api/getRecruit'
	import {
		addTeam,
		updateTeam
	} from '@/api/getTeam'
	import {
		setStorage,
		getStorage
	} from '@/utils/localStorage'
	import {
		queryByteamId,
		queryCidSid,
		addTeamStudent
	} from '@/api/getTeamStudent'
	import {
		queryById
	} from '@/api/getStudent'
	import {
		addApplication
	} from '@/api/getApplication'
	import {
		textCompare
	} from '@/api/getTextSimilar'
	export default {
		data() {
			return {
				questionForm: {
					teamName: "",
					recruitManifesto: "",
				},
				team: {
					teamName: "",
				},
				Recruit: {
					recruitManifesto: "",
				},
				application: {
					recruitId: "",
					manifesto: "",
				},
				dialogFormVisible: false,
				teamFormVisible: false,
				dialogForm: false,
				dataList: [],
				courseId: [],
				studentList: [],
				teamId: [],
				isStudent: true,
				// recruitSimilar:{
				// 	recruitId : [],
				// 	Similar : [],
				// }

			}
		},

		methods: {
			initRecruit() {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				this.radio = JSON.parse(getStorage("radio"))
				if (this.radio == 1) {
					this.isStudent = true
				} else {
					this.isStudent = false
				}
				const data = {
					courseId: this.courseId
				}
				if (data) {
					queryByIdRecruit(data).then(res => {

						this.dataList = res.datas
						if (this.radio == 1) {
							let t = this
							for (let i in t.dataList) {

								const datas = {
									str1: JSON.parse(getStorage("userInfo")).studentSkill,
									str2: t.dataList[i].recruitManifesto
								}
								// console.log(datas)
								if (datas) {
									textCompare(datas).then(ress => {
										// t.$set(t.dataList, i, {
										// 		recruitId: t.dataList[i].recruitId,
										// 		recruitManifesto : t.dataList[i].recruitManifesto,
										// 		teamName: t.dataList[i].teamName,
										// 		teamId: t.dataList[i].teamId,
										// 		similar: ress.datas,
										// 	});

										this.$set(this.dataList[i], 'similar', ress.datas);
										// return Promise.resolve(this.dataList); 
										this.dataList.sort(this.compareSimilar('similar'))
										for (let i in this.dataList) {
											if (i == 0) {
												this.$set(this.dataList[i], 'recommend', true);
											} else {
												this.$set(this.dataList[i], 'recommend', false);
											}
										}
										// this.dataList[i].similar = ress.datas
									})
								}
							}

						}


						// console.log( this.dataList,"this.dataList")
					})
				}

				//this.dataList.sort((a, b) => Number(a.Similar) - Number(b.Similar))
				//this.dataList.sort(this.compare('recruitId')) 
				// console.log(this.dataList,"this.dataList")
				// console.log( this.dataList,"this.dataList[0].similar")
				// console.log(typeof this.dataList[0].recruitId,"this.dataList[0].recruitId")
			},
			compareSimilar(key) {
				return function(a, b) {
					var val1 = a.similar;
					var val2 = b.similar;
					return val2 - val1;
				}
			},
			compareRId(key) {
				return function(a, b) {
					var val1 = a.recruitId;
					var val2 = b.recruitId;
					return -(val2 - val1);
				}
			},
			sortSimilar() {
				// var map = await this.initRecruit();
				this.dataList.sort(this.compareSimilar('similar'))
				for (let i in this.dataList) {
					if (i == 0) {
						this.$set(this.dataList[i], 'recommend', true);
					} else {
						this.$set(this.dataList[i], 'recommend', false);
					}
				}

			},
			sortRId() {
				this.dataList.sort(this.compareRId('recruitId'))
			},
			createRecruit() {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				this.studentId = JSON.parse(getStorage("userInfo")).studentId

				const data = {
					courseId: this.courseId,
					studentId: this.studentId
				}
				if (data) {
					queryCidSid(data).then(res => {
						if(res.datas.length != 0){
							this.dialogForm = true
							var teamId = res.datas[0].teamId
							const datas = {
								teamId: teamId,
							}
							if(datas){
								queryByTidRecruit(datas).then(ress =>{
									this.Recruit.recruitManifesto = ress.datas[0].recruitManifesto
								})
							}
							
						}else{
							this.$message.error('您还没有加入任何一个小组，请先加入一个小组，或者自行创建一个小组');
						}
						
						
					})
				}
				
			},
			submitRecruit() {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				this.studentId = JSON.parse(getStorage("userInfo")).studentId

				const datas = {
					courseId: this.courseId,
					studentId: this.studentId
				}
				if (datas) {
					queryCidSid(datas).then(res => {
						var teamId = res.datas[0].teamId
						const data = {
							teamId: teamId,
							recruitManifesto: this.Recruit.recruitManifesto
						}
						const team = {
							teamId: teamId,
						}
						if(team) {
							queryByTidRecruit(team).then(ress =>{
								if(ress.datas.length != 0){
									const rec = {
										recruitId : ress.datas[0].recruitId,
										recruitManifesto: this.Recruit.recruitManifesto
									}
									if(rec){
										updateRecruit(rec).then(resss =>{
											this.initRecruit()
											this.$message({
												message: '招募修改成功，敬请期待',
												type: 'success'
											});
										})
									}
									
								}else{
									if (data) {
										add(data).then(res => {
											const teamup = {
												teamId: teamId,
												recruitId: res.datas.recruitId
											}
											if (teamup) {
												updateTeam(teamup).then(res => {
													this.initRecruit()
													this.$message({
														message: '招募发布成功，敬请期待',
														type: 'success'
													});
												})
											}
									
									
										}).catch(() => {
											this.$message.error('您还没有加入任何一个小组，请先加入一个小组，或者自行创建一个小组');
										})
									}
								}
								
							})
						}
						
					}).catch(() => {
						this.$message.error('您还没有加入任何一个小组，请先加入一个小组，或者自行创建一个小组');
					})
				}


				this.dialogForm = false
			},
			handleClick(model) {
				this.dialogFormVisible = true //控制弹窗显示
				this.application.recruitId = model.recruitId
				this.questionForm.teamName = model.teamName
				this.questionForm.recruitManifesto = model.recruitManifesto
				const team = {
					teamId: model.teamId
				}
				if (team) {
					queryByteamId(team).then(res => {
						this.studentList = res.datas
					}).catch(() => {
						this.$message.error('失败了');
					})
				}
			},
			createTeam() {
				this.teamFormVisible = true
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				this.studentId = JSON.parse(getStorage("userInfo")).studentId

				const datas = {
					courseId: this.courseId,
					studentId: this.studentId
				}
				queryCidSid(datas).then(res => {
					this.team.teamName = res.datas[0].teamName
				})
			},
			submitTeam() {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				this.studentId = JSON.parse(getStorage("userInfo")).studentId

				const datas = {
					courseId: this.courseId,
					studentId: this.studentId
				}
				if (datas) {
					queryCidSid(datas).then(res => {
						if (res.datas.length == 0) {
							const data = {
								courseId: this.courseId,
								teamName: this.team.teamName
							}

							if (data) {
								addTeam(data).then(ress => {
									var teamId = ress.datas.teamId
									const Ts = {
										studentId: this.studentId,
										teamId: teamId
									}
									if (Ts) {
										addTeamStudent(Ts).then(ressss => {
											this.$message({
												message: '恭喜，成功创建小组',
												type: 'success'
											});
										})
									}


								})
							}

						} else {
							const data = {
								teamId: res.datas[0].teamId,
								teamName: this.team.teamName
							}
							if (data) {
								updateTeam(data).then(res => {
									this.initRecruit();
									this.$message({
										message: '恭喜，成功修改小组名称',
										type: 'success'
									});
								})
							}
							// this.$message.error('您已经是一个小组的成员了，无法再创建小组了');
						}
					})
				}


				this.teamFormVisible = false
			},

			submitApplication() {
				this.studentId = JSON.parse(getStorage("userInfo")).studentId
				const data = {
					studentId: this.studentId,
					recruitId: this.application.recruitId,
					applicationManifesto: this.application.manifesto
				}
				if (data) {
					addApplication(data).then(res => {
						this.$message({
							message: '成功提交申请',
							type: 'success'
						});
					})
				}
				this.dialogFormVisible = false
			},
		},

		mounted() {

			this.$nextTick(() => {
				this.initRecruit();

			})
		},

	}
</script>

<style>
	.time {
		font-size: 13px;
		color: #999;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}

	.button {
		padding: 0;
		float: right;
	}

	.image {
		width: 100%;
		display: block;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.el-card {
		margin-bottom: 20px;
		margin-top: 30px;
		min-height: 190px;
	}

	.box {
		height: 80%;
		/*overflow-y: auto;*/
		display: flex;
		flex-direction: column;
		/* //起作用的是这个，没有的话会变成下图的样子，卡片跑到右边去了 */
	}
</style>



</style>
