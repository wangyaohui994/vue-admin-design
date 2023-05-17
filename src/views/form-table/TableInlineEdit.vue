<template>
	<el-container>
		<el-main>
			<div class="table-inline-edit">

				<el-select v-model="value1" placeholder="请选择">
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
						全部成员
					</el-button>
					<el-button size="small" type="danger" icon="el-icon-s-custom" @click="meinTeam" v-show="isStudent">
						我的小组成员
					</el-button>
				</el-button-group>
				<el-table v-loading="listLoading" :data="List" tooltip-effect="dark" style="width: 100%" size="medium">
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
				</el-table>



			</div>
		</el-main>
		<el-aside width="200px">
			<div class= "button" v-for="(model,index) in team" :key="index">
				<el-button  size="small" type="warning" icon="el-icon-s-custom" @click="everyTeam(model)">
					{{model.teamName}}
				</el-button>
			</div>
			<!-- <div class= "button">
				<el-button size="small" type="danger" icon="el-icon-s-custom" @click="meinTeam" v-show="isStudent">
					我的小组成员
				</el-button>
			</div>
			<div class= "button">
				<el-button size="small" type="danger" icon="el-icon-s-custom" @click="meinTeam" v-show="isStudent">
					我的小组成员
				</el-button>
			</div> -->
		</el-aside>

	</el-container>

</template>

<script>
	import {
		getTableList
	} from '@/api'
	import {
		querybycourseid,
		querybycondition,
		queryteam,
		queryById
	} from '@/api/getStudent'
	import {
		setStorage,
		getStorage
	} from '@/utils/localStorage'
	import{
		queryByCourseIdTeam
	} from '@/api/getTeam'
	
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
				courseId: [],
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
				}],
				value1: [],
				value2: [],
				isStudent: true,
				team : [],
			}
		},

		methods: {
			// 获取数据列表
			initStudent() {
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
			all() {
				this.initStudent()
			},
			meinTeam() {
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
							courseId: this.courseId,
							teamId: teamId
						}
						if (data) {
							queryteam(data).then(res => {
								this.List = res.datas
								this.listLoading = false
							}).catch(() => {
								this.$message.error('没有获取到学生id');
							})
						}
					}).catch(() => {
						this.$message.error('您还没有加入任何一个小组，去招募墙看看吧');
					})
				}
			},
			everyTeam(model){
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
			}

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
			font-weight: 500;

			th {
				padding: 16px 0 15px !important;
				background-color: #f2f3f7;
			}
		}
	}
	.button{
		width: 200px;
		margin-right: 0px;
		margin-left: 0px;
		margin-top: 50px;
		margin-bottom: 20px;
		
	}
</style>
