<template>
	<div>
		<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
			@click="handleCreate">查看答辩信息</el-button>
		<el-dialog :visible.sync="dialogFormVisible">
			<el-form :model="questionForm" ref="dataForm" label-position="left" label-width="100px"
				style="width: 400px; margin-left:50px;">
				<el-form-item label="主题" prop="riTopic">
					<el-input type="textarea" :rows="2" v-model="questionForm.riTopic" disabled></el-input>
				</el-form-item>

				<el-form-item label="答辩开始时间">
					<el-date-picker v-model="questionForm.riTime" type="datetime" placeholder="选择日期时间" disabled>
					</el-date-picker>
				</el-form-item>

				<el-form-item label="每组答辩时间(分钟)" prop="riGrouptime">
					<el-input v-model="questionForm.riGrouptime" disabled/>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click=" dialogFormVisible = false ">确定</el-button>
			</div>
		</el-dialog>


		<el-table v-loading="listLoading" :data="List" tooltip-effect="dark" style="width: 100%" size="medium">

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

			<!-- <el-table-column fixed="right" label="操作" width="200">
				<template slot-scope="{row}">
					<el-button type="primary" :disabled="disable" :class="{ codeGeting:isGeting }"
						@click="getVerifyCode(row)">{{getCode}}</el-button>
					<el-button type="warning" size="small" @click="getVerifyTime(row)">答辩结束</el-button>
				</template>
			</el-table-column> -->
		</el-table>
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
								this.plantime = this.$moment(time.datas[0].grTime).format(
									'YYYY-MM-DD HH:mm:ss');
								
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
			getVerifyTime(row) {
				let aData = new Date();
				aData = this.$moment(aData).utcOffset(480)._d
				// console.log(aData, "Date")
				const data = {
					teamId : row.teamId,
					grEndtime : aData,
					grType: "已答辩"
				}
				if (data) {
					updateGroupReply(data).then(res => {
						this.initGroupTeam();
					})
				}
				for(let i in this.List){
					if(i > row.order){
						const datas = {
							teamId : this.List[i].teamId,
							grTime : (this.$moment(aData).add((i-row.order) * this.questionForm.riGrouptime, 'm'))._d
						}
						console.log(datas,"datassss")
						updateGroupReply(datas).then(res =>{
							this.initGroupTeam();
						})
					}else{
						
					}
				}
				this.isGeting = false
				this.disable = false
				this.getCode = '答辩开始'
				this.count = 0
				clearInterval(countDown)
				
			},
			getVerifyCode(row) {
				console.log(row)
				let aData = new Date();
				aData = this.$moment(aData).utcOffset(480)._d
				
				const data = {
					teamId : row.teamId,
					grStarttime : aData
				}
				if (data) {
					updateGroupReply(data).then(res => {
						this.initGroupTeam();
					})
				}
				this.count = this.questionForm.riGrouptime * 60
				var countDown = setInterval(() => {
					if (this.count < 1) {
						this.isGeting = false
						this.disable = false
						this.getCode = '答辩开始'
						this.count = this.questionForm.riGrouptime
						// this.count = 120
						clearInterval(countDown)
					} else {	
						this.isGeting = true
						this.disable = true
						this.getCode = this.count-- + 's后答辩结束'
					}
				}, 1000)
			},
			handleCreate() {
				console.log("21312434")
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
						if (res.total == 0) { //新增
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
								// console.log(groupReply,"groupReply")
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
									}
									// console.log(groupReply)
									updateGroupReply(groupReply).then(res => {
										this.initGroupTeam();
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
