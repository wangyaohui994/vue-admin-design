<template>
	<div>
		<el-table :data="List" style="width: 100%;">
			<el-table-column type="expand" >
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand" >
						<el-form-item label="名称" style="width : 500px">

							<span v-for="item in props">
								<span v-for="items in item.hs">
									{{ items.hsName }}<br>
								</span>
							</span>

						</el-form-item>
						<el-form-item label="提交时间" style="width : 320px">
							<span v-for="item in props">
								<span v-for="items in item.hs">
									{{ items.hsTime }}<br>
									<!-- 	{{this.$moment(items.hsTime).format(
										'YYYY-MM-DD HH:mm:ss')}} -->
								</span>
							</span>
						</el-form-item>
						<el-form-item style="width : 90px">
							<span v-for="item in props">
								<span v-for="items in item.hs">
									<el-button @click="look(items)" type="text" size="small">查看</el-button>
									<el-button type="text" size="small" @click="downLoad(items)">下载</el-button>
									<br>
								</span>
							</span>


						</el-form-item>
					</el-form>
				</template>
				
			</el-table-column>
			<el-table-column label="小组名称" >
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
	</div>
</template>



<script>
	import {
		queryCidSid
	} from '@/api/getTeamStudent'
	import {
		setStorage,
		getStorage
	} from '@/utils/localStorage'
	import {
		queryByCourseIdTeam
	} from '@/api/getTeam'
	import {
		addGroupReply,
		updateGroupReply,
		queryByIdGroupReply
	} from '@/api/getGroupReply'
	import {
		queryteam
	} from '@/api/getStudent'
	import {
		addHS,
		updateHS,
		queryByIdHS,
		queryByHTIdHS,
		deleteByIdHS,
		uploadHS,
		downloadFileHS,
		downloadHS,
		exportLogDataHS,
		showDataHS
	} from '@/api/getHS'
	export default {
		data() {
			return {
				tableData: [],

				List: [],
			}
		},
		methods: {
			initList() {
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
								teamId: res.datas[i].teamId,
								homeworkId: JSON.parse(getStorage("homeworkId"))
							}

							queryByHTIdHS(datass).then(hs => {
								// this.plantime = time.datas[0].grTime
								// this.plantime = this.$moment(time.datas[0].grTime).format(
								// 	'YYYY-MM-DD HH:mm:ss');

								queryteam(datas).then(ress => {
									this.$set(this.List, i, {
										courseId: this.List[i].courseId,
										teamId: this.List[i].teamId,
										recruitId: this.List[i].recruitId,
										teamName: this.List[i].teamName,
										student: ress.datas,
										hs: hs.datas,
									});
									for (let h in this.List) {
										for (let f in this.List[h].hs) {
											this.List[h].hs[f].hsTime = this.$moment(this.List[h]
												.hs[f].hsTime).format(
												'YYYY-MM-DD HH:mm:ss');
										}
									}
								})

							})

						}
					})
				}


			},

			downLoad(scoperow) {
				// var data = new FormData(); //获取上传表单（文件）
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId


				const data = {
					fileName: scoperow.hsName,
					courseId: this.courseId,
					homeworkId: scoperow.homeworkId,
					teamId: scoperow.teamId
				}
				if (data) {
					exportLogDataHS(data, scoperow)
				}
				console.log(scoperow)


			},
			look(scoperow){
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				
				
				const data = {
					fileName: scoperow.hsName,
					courseId: this.courseId,
					homeworkId: scoperow.homeworkId,
					teamId: scoperow.teamId
				}
				if (data) {
					showDataHS(data, scoperow)
				}
						
				
			},

		},

		mounted() {
			this.$nextTick(() => {
				this.initList();
			})
		},
	}
</script>

<style>
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
