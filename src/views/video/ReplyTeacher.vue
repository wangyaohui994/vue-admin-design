<template>
	<div>
		<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
			@click="handleCreate">设置答辩信息</el-button>
		<el-dialog :visible.sync="dialogFormVisible">
			<el-form :model="questionForm" ref="dataForm" label-position="left" label-width="100px"
				style="width: 400px; margin-left:50px;">
				<el-form-item label="主题" prop="riTopic">
					<el-input type="textarea" :rows="2" v-model="questionForm.riTopic"></el-input>
				</el-form-item>

				<el-form-item label="答辩开始时间">
					<el-date-picker v-model="questionForm.riTime" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
				</el-form-item>

				<el-form-item label="每组答辩时间(分钟)" prop="riGrouptime">
					<el-input v-model="questionForm.riGrouptime" />
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click=" createReply() ">确定</el-button>
			</div>
		</el-dialog>


		<el-table :data="List" tooltip-effect="dark" style="width: 100%" size="medium">

			<!-- <el-table-column label="顺序" width="120" align="center">
				<template slot-scope="{row}">
					{{ row.order }}
				</template>
			</el-table-column> -->
			<el-table-column label="组名" width="120" align="center">
				<template slot-scope="{row}">
					{{ row.teamName }}
				</template>
			</el-table-column>
			<el-table-column label="小组成员" width="200" align="center">
				<template slot-scope="{row}">
					<span v-for="item in row.student">{{ item.studentName }}&nbsp</span>
				</template>
			</el-table-column>
			<el-table-column label="预计答辩时间" width="180" align="center">
				<template slot-scope="{row}">
					{{ row.grTime}}
				</template>
			</el-table-column>
			<el-table-column label="答辩状态" width="120" align="center">
				<template slot-scope="{row}">
					{{ row.grType}}
				</template>
			</el-table-column>
			<el-table-column label="实际答辩开始时间" width="180" align="center">
				<template slot-scope="{row}">
					{{ row.grStarttime}}
				</template>
			</el-table-column>
			<el-table-column label="实际答辩结束时间" width="180" align="center">
				<template slot-scope="{row}">
					{{ row.grEndtime}}
				</template>
			</el-table-column>

			<el-table-column fixed="right" label="操作" width="150">
				<template slot-scope="{row}">
					<el-button @click="start(row)" type="primary" style="margin-left: 16px;">
						开始答辩
					</el-button>
					<!-- <el-button type="primary" :disabled="disable" :class="{ codeGeting:isGeting }"
						@click="getVerifyCode(row)">{{getCode}}</el-button>
					<el-button type="warning" size="small" @click="getVerifyTime(row)">答辩结束</el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
			<el-card v-for="(model,index) in team" :key="index" shadow="hover" style="width: 100%;">

				<div slot="header" class="clearfix">
					<span>{{model.teamName}}</span>
					<el-button style="float: right; padding: 3px 0" type="text" @click="quit">取消</el-button>
				</div>
				<div style="font-size: 18px;text-align: center; ">
					<span v-for="item in model.student">{{ item.studentName }}&nbsp</span>
				</div>
				<div style="margin-top: 40px;"></div>
				<el-statistic ref="statistic" @finish="hilarity" format="HH:mm:ss" :value="deadline4" title="距离答辩结束："
					time-indices>
				</el-statistic>
				<el-button type="warning" size="small" @click="end()">答辩结束</el-button>

			</el-card>
		</el-drawer>
		<audio controls="controls" hidden src="@/assets/sound/sound.mp3" ref="audio"></audio>

	</div>

</template>

<script>
	import {
		setStorage,
		getStorage
	} from '@/utils/localStorage'
	import {
		add,
		update,
		queryById
	} from '@/api/getReplyinf'
	import {
		queryByCourseIdTeam
	} from '@/api/getTeam'

	import {
		queryteam
	} from '@/api/getStudent'
	import {
		addGroupReply,
		updateGroupReply,
		queryByIdGroupReply
	} from '@/api/getGroupReply'

	export default {
		data() {
			return {
				// listLoading: true,
				// tableList: [],
				//答辩开始，倒数计
				getCode: '答辩开始',
				isGeting: false,
				count: 120,
				disable: false,
				//表单
				value1: '',
				//数据列表
				List: [],
				newsList: [],
				plantime: [],
				listQuery: {
					currentPage: 1,
					pageSize: 10
				},

				questionForm: {
					riTopic: "",
					riTime: "",
					riGrouptime: "",
				},
				dialogFormVisible: false,
				showClass: true,
				drawer: false,
				stop: true,
				deadline4: 0,
				startTime: "",
				team: [],
			}
		},
		methods: {
			initReply() {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				const data = {
					courseId: this.courseId,
				}
				if (data) {
					queryById(data).then(res => {
						this.questionForm.riTopic = res.datas[0].riTopic
						this.questionForm.riTime = res.datas[0].riTime
						this.questionForm.riGrouptime = res.datas[0].riGrouptime
					})
					// console.log(this.questionForm)
				}

			},
			initGroupTeam() {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				const data = {
					courseId: this.courseId,
				}

				if (data) {
					queryByCourseIdTeam(data).then(res => {
						this.List = res.datas
						// console.log(this.List,"this.List")
						for (let i in this.List) {
							const datas = {
								courseId: this.courseId,
								teamId: res.datas[i].teamId
							}
							const datass = {
								teamId: res.datas[i].teamId
							}

							queryByIdGroupReply(datass).then(time => {
								// this.plantime = time.datas[0].grTime
								// this.plantime = this.$moment(time.datas[0].grTime).format(
								// 	'YYYY-MM-DD HH:mm:ss');

								queryteam(datas).then(ress => {
									if(time.datas[0].grStarttime != null){
										this.$set(this.List, i, {
											order: i,
											courseId: this.List[i].courseId,
											teamId: this.List[i].teamId,
											recruitId: this.List[i].recruitId,
											teamName: this.List[i].teamName,
											student: ress.datas,
											grTime: this.$moment(time.datas[0].grTime).format(
												'YYYY-MM-DD HH:mm:ss'),
											grType: time.datas[0].grType,
											grStarttime: this.$moment(time.datas[0]
												.grStarttime).format(
												'YYYY-MM-DD HH:mm:ss'),
											grEndtime: this.$moment(time.datas[0]
												.grEndtime).format(
												'YYYY-MM-DD HH:mm:ss'),
										});
									}else{
										this.$set(this.List, i, {
											order: i,
											courseId: this.List[i].courseId,
											teamId: this.List[i].teamId,
											recruitId: this.List[i].recruitId,
											teamName: this.List[i].teamName,
											student: ress.datas,
											grTime: this.$moment(time.datas[0].grTime).format(
												'YYYY-MM-DD HH:mm:ss'),
											grType: time.datas[0].grType,
										});
									}
									
									

								})

							})

						}
					})
				}
			},
			handleCreate() {

				// console.log(this.List)
				// console.log(this.questionForm)
				this.dialogFormVisible = true;
			},

			//新增答辩信息
			createReply() {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				const data = {
					courseId: this.courseId,
					riTopic: this.questionForm.riTopic,
					// riTime: this.questionForm.riTime,
					riTime: this.$moment(this.questionForm.riTime).utcOffset(480)._d,
					riGrouptime: this.questionForm.riGrouptime
				}
				const datas = {
					courseId: this.courseId,
				}

				if (datas) {
					queryById(datas).then(res => {
						console.log(res, "res")
						if (res.datas.length == 0) { //新增
							add(data).then(resss => {
								this.$message({
									message: '答辩信息设置完成',
									type: 'success'
								});
							})
							for (let i in this.List) {
								const groupReply = {
									teamId: this.List[i].teamId,
									grTime: (this.$moment(this.$moment(this.questionForm.riTime).utcOffset(480)
										._d).add(i * this.questionForm.riGrouptime, 'm'))._d, //简写
									grType: "未答辩"
								}
								console.log(groupReply, "groupReply")
								addGroupReply(groupReply).then(res => {
									this.initGroupTeam();
								})
							}

							this.dialogFormVisible = false;
						} else { //更新
							update(data).then(ress => {
								for (let i in this.List) {
									const groupReply = {
										teamId: this.List[i].teamId,
										grTime: (this.$moment(this.$moment(this.questionForm.riTime)
											.utcOffset(480)._d).add(i * this.questionForm
											.riGrouptime, 'm'))._d, //简写
										grType: "未答辩",
										grEndtime :null,
										grStarttime :null,
									}
									// console.log(groupReply)
									queryByIdGroupReply(groupReply).then(group =>{
										
										if(group.datas.length != 0){
											updateGroupReply(groupReply).then(res => {
												this.initGroupTeam();
											})
										}else{
											addGroupReply(groupReply).then(res => {
												this.initGroupTeam();
											})
										}
									})
									
									// addGroupReply()
								}
								this.$message({
									message: '答辩信息成功更新',
									type: 'success'
								});
							})
							this.dialogFormVisible = false;
						}
					}).catch(() => {
						this.$message.error('失败了');
					})

				}


			},

			hilarity() {
				this.$refs.audio.currentTime = 0; //从头开始播放提示音
				this.$refs.audio.play(); //播放

				this.$notify({
					title: '提示',
					message: '时间已到，答辩结束',
					duration: 0,
				});
			},
			quit() {
				this.deadline4 = 0
				this.drawer = false
			},
			start(row) {
				this.drawer = true
				if (this.deadline4 == 0) {
					this.deadline4 = Date.now() + new Date().setHours(0, this.questionForm.riGrouptime, 0) - new Date()
						.setHours(0, 0, 0)
					this.startTime = new Date();
					this.startTime = this.$moment(this.startTime).utcOffset(480)._d
					this.order = row.order
				}

				this.$set(this.team, 0, {
					courseId: row.courseId,
					teamId: row.teamId,
					recruitId: row.recruitId,
					teamName: row.teamName,
					student: row.student,
					grTime: row.grTime,
					grType: row.grType,
					grStarttime: row.grStarttime,
					grEndtime: row.grEndtime,
				});

			},
			end() {
				this.deadline4 = 0
				this.drawer = false
				let endTime = new Date();
				endTime = this.$moment(endTime).utcOffset(480)._d

				const data = {
					teamId: this.team[0].teamId,
					grStarttime: this.startTime,
					grEndtime: endTime,
					grType: "已答辩"
				}
				console.log(data, "data")
				if (data) {
					updateGroupReply(data).then(res => {
						this.initGroupTeam();
					})
				}
				for (let i in this.List) {
					if (i > this.order) {
						const datas = {
							teamId: this.List[i].teamId,
							grTime: (this.$moment(endTime).add((i - this.order - 1) * this.questionForm.riGrouptime,
									'm'))
								._d
						}

						updateGroupReply(datas).then(res => {
							this.initGroupTeam();
						})
					} else {

					}
				}
			}
		},


		mounted() {
			this.$nextTick(() => {
				this.initReply();
				this.initGroupTeam();
			})
		},
	}
</script>

<style>
</style>
