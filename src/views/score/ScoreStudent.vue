<template>
	<div class="table-inline-edit">
		<el-card shadow="always">
			<el-table v-loading="listLoading" :data="List" tooltip-effect="dark" style="width: 100%" size="medium">
				<el-table-column label="姓名" width="140" align="center">
					<template slot-scope="{row}">
						{{ row.studentName }}
					</template>
				</el-table-column>

				<el-table-column label="性别" width="100" align="center">
					<template slot-scope="{row}">
						{{ row.studentSex }}
					</template>
				</el-table-column>
				<el-table-column label="擅长" width="300" align="center">
					<template slot-scope="{row}">
						{{ row.studentSkill }}
					</template>
				</el-table-column>
				<el-table-column label="联系电话" width="150" align="center">
					<template slot-scope="{row}">
						{{ row.studentNumber }}
					</template>
				</el-table-column>
				<el-table-column label="所属小组" width="200" align="center">
					<template slot-scope="{row}">
						{{ row.teamName}}
					</template>
				</el-table-column>
				<el-table-column label="评分" width="200" align="center">
					<template slot-scope="{row}">
						<el-button type="primary" @click="score(row)" class="detailed">评分</el-button>
					</template>
				</el-table-column>
			</el-table>
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
				<el-form-item label="分数(满分100)" prop="score">
					<el-input rows="2" v-model="questionForm.score"></el-input>
				</el-form-item>
				<el-form-item label="评分理由" prop="reason">
					<el-input type="textarea" :rows="2" v-model="questionForm.reason" />
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click=" createReply() ">确定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import {
		getTableList
	} from '@/api'
	import {
		querybycourseid,
		querybycondition,
		queryById,
		queryinscore
	} from '@/api/getStudent'
	import {
		queryByIdSsscore,
		updateSsscore,
		deleteByIdSsscore,
		addSsscore
	} from '@/api/getSsscore'
	import {
		setStorage,
		getStorage
	} from '@/utils/localStorage'
	import {
		queryCidSid
	} from '@/api/getTeamStudent'
	
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
				}, {
					value: 'teamName',
					label: '所属小组'
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
				stuStudentId :[],
			}
		},

		methods: {
			// 获取数据列表
			initStudent() {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				this.studentId = JSON.parse(getStorage("userInfo")).studentId
				var teamId = 1
				const datas = {
					courseId: this.courseId,
					studentId:this.studentId
				}
				if(datas){
					queryCidSid(datas).then(res=>{
						teamId = res.datas[0].teamId
						const data = {
							courseId: this.courseId,
							studentId:this.studentId,
							teamId : teamId
						}
						if (data) {
							queryinscore(data).then(res => {
								this.List = res.datas
								this.listLoading = false
							}).catch(() => {
								this.$message.error('没有获取到学生id');
							})
						}
					})
				}
				
				
				

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
				this.studentId = JSON.parse(getStorage("userInfo")).studentId
				this.questionForm.Name = row.studentName
				this.stuStudentId = row.studentId
				this.dialogFormVisible = true
				const data = {
					courseId: this.courseId,
					studentId: this.studentId,
					stuStudentId : this.stuStudentId,
				}
				if (data) {
					queryByIdSsscore(data).then(res => {
						if (res.total !== 0) {
							this.questionForm.score = res.datas[0].ssscoreScore
							this.questionForm.reason = res.datas[0].ssscoreReason

						} else {
							this.questionForm.score = ""
							this.questionForm.reason = ""
						}

					}).catch(() => {
						console.log("加载失败");
					})
				}
			},
			createReply() {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				this.studentId = JSON.parse(getStorage("userInfo")).studentId
				const data = {
					courseId: this.courseId,
					studentId: this.studentId,
					stuStudentId : this.stuStudentId,
					ssscoreScore: this.questionForm.score,
					ssscoreReason: this.questionForm.reason
				}
				if (data) {
					queryByIdSsscore(data).then(res => {
						if (res.total == 0) {
							addSsscore(data).then(ress => {
								this.$message({
									message: '评分完成',
									type: 'success'
								});
							})
						} else {
							updateSsscore(data).then(ress => {
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
		},

		mounted() {
			this.$nextTick(() => {
				this.initStudent();
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
</style>
