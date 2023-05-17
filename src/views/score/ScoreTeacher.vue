<template>

	<div class="table-inline-edit">
		<el-card shadow="always">
			<!-- <el-select v-model="value1" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>

			<el-input style="width: 190px;margin-right: 40px;margin-top: 20px;margin-bottom: 20px;" v-model="value2"
				size="small" placeholder="请输入" clearable class="filter-item" />
			<el-button-group style="margin-right: 20px;margin-top: 20px;margin-bottom: 20px;" class="filter-item">
				<el-button :loading="searchloading" size="small" type="primary" icon="el-icon-search"
					@click.native.prevent="search">
					搜索
				</el-button>
				<el-button size="small" type="primary" icon="el-icon-refresh" @click="all">
					刷新
				</el-button>

			</el-button-group> -->


			<el-table :data="List2" style="width: 100%;">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-form-item label="名称" style="width : 150px">

								<span v-for="item in props">
									<span v-for="items in item.student">
										{{ items.studentName }}<br>
									</span>
								</span>

							</el-form-item>
							<el-form-item label="性别" style="width : 150px">

								<span v-for="item in props">
									<span v-for="items in item.student">
										{{ items.studentSex }}<br>
									</span>
								</span>

							</el-form-item>
							<el-form-item label="联系方式" style="width : 200px">
							
								<span v-for="item in props">
									<span v-for="items in item.student">
										{{ items.studentNumber }}<br>
									</span>
								</span>
							
							</el-form-item>
							<el-form-item label="擅长" style="width : 250px">

								<span v-for="item in props">
									<span v-for="items in item.student">
										{{ items.studentSkill }}<br>
									</span>
								</span>

							</el-form-item>
							
							<el-form-item style="width : 90px">
								<span v-for="item in props">
									<span v-for="items in item.student">
										<el-button @click="score(items)" type="text" size="small">评分</el-button>

										<br>
									</span>
								</span>


							</el-form-item>


						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="小组名称">
					<template slot-scope="{row}">
						{{ row.teamName }}
					</template>
				</el-table-column>
				<el-table-column label="小组成员">
					<template slot-scope="{row}">
						<span v-for="item in row.student">{{ item.studentName }}&nbsp</span>
					</template>
				</el-table-column>
			</el-table>



			<!-- <el-table v-loading="listLoading" :data="List" tooltip-effect="dark" style="width: 100%" size="medium">
				<el-table-column label="姓名" width="120" align="center">
					<template slot-scope="{row}">
						{{ row.studentName }}
					</template>
				</el-table-column>

				<el-table-column label="性别" width="120" align="center">
					<template slot-scope="{row}">
						{{ row.studentSex }}
					</template>
				</el-table-column>
				<el-table-column label="擅长" width="200" align="center">
					<template slot-scope="{row}">
						{{ row.studentSkill }}
					</template>
				</el-table-column>
				<el-table-column label="联系电话" width="200" align="center">
					<template slot-scope="{row}">
						{{ row.studentNumber }}
					</template>
				</el-table-column>
				<el-table-column label="所属小组" width="120" align="center">
					<template slot-scope="{row}">
						{{ row.teamName}}
					</template>
				</el-table-column>
				<el-table-column label="评分" width="120" align="center">
					<template slot-scope="{row}">
						<el-button type="primary" @click="score(row)" class="detailed">评分</el-button>
					</template>
				</el-table-column>
			</el-table> -->
		</el-card>

		<el-dialog :visible.sync="dialogFormVisible">
			<el-form :model="questionForm" ref="dataForm" label-position="left" label-width="120px"
				style="width: 400px; margin-left:50px;">

				<el-form-item label="姓名" prop="name">
					<el-input rows="2" v-model="questionForm.Name" disabled></el-input>
				</el-form-item>
				<!-- <el-descriptions :column="1">
					<el-descriptions-item label="其他学生对其评分情况">{{questionForm.scoreSituation}}</el-descriptions-item>
				</el-descriptions> -->
				<!-- <el-form-item label="其他学生对其评分情况" prop="score">
					<span v-for="item in questionForm.scoreSituation">
						<el-input column="3" v-model="item.studentName" disabled></el-input>
						<el-input column="3" v-model="item.ssscoreScore" disabled></el-input>
						<el-input column="3" v-model="item.ssscoreReason" disabled></el-input>
					</span>
					
				</el-form-item> -->

				<el-form-item label="分数(满分100)" prop="score">
					<el-input rows="2" v-model="questionForm.score"></el-input>
				</el-form-item>
				<el-form-item label="评分理由" prop="reason">
					<el-input type="textarea" :rows="2" v-model="questionForm.reason" />
				</el-form-item>
				<el-form-item label="组内评价" prop="score" style="width: 300%;">
					
				</el-form-item>
				<div v-for="(item, index) in questionForm.scoreSituation" :key="index" class="data-lang-item">
					<label>
					<el-popover trigger="hover" placement="right">
					    <p >打分原因: {{ item.ssscoreReason }}</p>
					    <div slot="reference" class="name-wrapper">
					        {{ item.studentName }}
					    </div>
					</el-popover></label>
					<el-progress :percentage="item.ssscoreScore" :stroke-width="16" :color="item.color" />
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click=" createReply() ">确定</el-button>
			</div>
		</el-dialog>

	</div>


	<!-- <el-aside width="200px">
			<div class= "button" v-for="(model,index) in team" :key="index">
				<el-button  size="small" type="warning" icon="el-icon-s-custom" @click="everyTeam(model)">
					{{model.teamName}}
				</el-button>
			</div>
			
		</el-aside> -->


</template>

<script>
	import {
		getTableList
	} from '@/api'
	import {
		querybycourseid,
		queryteam,
		querybycondition
	} from '@/api/getStudent'
	import {
		queryByIdSsscore,
		updateSsscore,
		deleteByIdSsscore,
		addSsscore
	} from '@/api/getSsscore'
	import {
		queryByIdTsscore,
		updateTsscore,
		deleteByIdTsscore,
		addTsscore
	} from '@/api/getTsscore'
	import {
		setStorage,
		getStorage
	} from '@/utils/localStorage'
	import {
		queryById
	} from '@/api/getStudent'
	import {
		queryCidSid
	} from '@/api/getTeamStudent'
	import {
		queryByCourseIdTeam
	} from '@/api/getTeam'
	import Hints from '@/components/Hints'

	export default {
		name: 'TableInlineEdit',
		components: {
			Hints
		},
		data() {
			return {
				listLoading: true,
				tableList: [],

				List: [],
				List2: [],
				listQuery: {
					currentPage: 1,
					pageSize: 10
				},

				options: [{
					value: 'studentName',
					label: '姓名'
				}, {
					value: 'studentSex',
					label: '性别'
				}, {
					value: 'studentSkill',
					label: '擅长'
				}],
				value1: [],
				value2: [],


				questionForm: {
					Name: "",
					scoreSituation: "",
					score: "",
					reason: "",
				},
				dialogFormVisible: false,
				showClass: true,
				courseId: [],
				teacherId: [],
				studentId: [],
			}
		},

		methods: {
			// 获取数据列表
			initStudent() {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				const data = {
					courseId: this.courseId
				}
				if (data) {
					querybycourseid(data).then(res => {
						this.List = res.datas
						this.listLoading = false
						for (let i in this.List) {
							const datas = {
								courseId: this.courseId,
								studentId: this.List[i].studentId
							}
							if (datas) {
								queryCidSid(datas).then(team => {
									this.$set(this.List[i], 'teamName', team.datas[0].teamName)
								})
							}
						}
					}).catch(() => {
						this.$message.error('没有获取到学生id');
					})
					queryByCourseIdTeam(data).then(res => {
						this.team = res.datas
					})
				}
			},
			initList2() {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				const data = {
					courseId: this.courseId,
				}

				if (data) {
					queryByCourseIdTeam(data).then(res => {
						this.List2 = res.datas
						// console.log(this.List,"this.List")
						for (let i in this.List2) {
							const datas = {
								courseId: this.courseId,
								teamId: res.datas[i].teamId
							}
							queryteam(datas).then(ress => {
								this.$set(this.List2, i, {
									courseId: this.List2[i].courseId,
									teamId: this.List2[i].teamId,
									recruitId: this.List2[i].recruitId,
									teamName: this.List2[i].teamName,
									student: ress.datas,
								});
								console.log(this.List2, "this.List2")
							})
							// 			const datass = {
							// 				teamId: res.datas[i].teamId,
							// 				homeworkId: JSON.parse(getStorage("homeworkId"))
							// 			}



						}

					})
				}
			},
			all() {
				this.initStudent()
			},
			search() {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				const data = {
					courseId: this.courseId,
					[this.value1]: this.value2
				}
				if (data) {
					querybycondition(data).then(res => {
						this.List = res.datas
						this.listLoading = false

					}).catch(() => {
						this.$message.error('抱歉，没有获取到符合该类型的学生');
					})
				}
				console.log(this.List)
			},

			score(row) {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				this.teacherId = JSON.parse(getStorage("userInfo")).teacherId
				this.questionForm.Name = row.studentName
				this.studentId = row.studentId
				this.dialogFormVisible = true
				const data = {
					courseId: this.courseId,
					teacherId: this.teacherId,
					studentId: this.studentId,
				}
				const datas = {
					courseId: this.courseId,
					stuStudentId: this.studentId,
				}
				if (data) {
					queryByIdTsscore(data).then(res => {
						if (res.total !== 0) {
							this.questionForm.score = res.datas[0].tsscoreScore
							this.questionForm.reason = res.datas[0].tsscoreReason

						} else {
							this.questionForm.score = ""
							this.questionForm.reason = ""
						}
						queryByIdSsscore(datas).then(ress => {
							this.questionForm.scoreSituation = ress.datas
							console.log(this.questionForm.scoreSituation, "scoreSituation")
						})
					}).catch(() => {
						console.log("加载失败");
					})
				}
			},
			createReply() {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				this.teacherId = JSON.parse(getStorage("userInfo")).teacherId
				const data = {
					courseId: this.courseId,
					teacherId: this.teacherId,
					studentId: this.studentId,
					tsscoreScore: this.questionForm.score,
					tsscoreReason: this.questionForm.reason
				}
				if (data) {
					queryByIdTsscore(data).then(res => {
						if (res.total == 0) {
							addTsscore(data).then(ress => {
								this.$message({
									message: '评分完成',
									type: 'success'
								});
							})
						} else {
							updateTsscore(data).then(ress => {
								this.$message({
									message: '评分更新完成',
									type: 'success'
								});
							})
						}

					}).catch(() => {
						console.log("加载失败");
					})
				}
				this.dialogFormVisible = false
			},
			everyTeam(model) {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId

				const data = {
					courseId: this.courseId,
					teamId: model.teamId
				}

				if (data) {
					queryteam(data).then(res => {
						this.List = res.datas
						this.listLoading = false
					}).catch(() => {
						this.$message.error('没有获取到学生id');
					})
				}
			},
		},

		mounted() {
			this.$nextTick(() => {
				this.initStudent();
				this.initList2();
			})
		},

	}
</script>

<style lang="less">
	.table-inline-edit {
		.el-table thead {
			font-weight: 600;

			th {
				padding: 16px 0 15px !important;
				background-color: #f2f3f7;
			}
		}
	}

	.button {
		width: 200px;
		margin-right: 0px;
		margin-left: 0px;
		margin-top: 50px;
		margin-bottom: 20px;

	}

	.demo-table-expand {
		font-size: 20px;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;

	}
</style>
