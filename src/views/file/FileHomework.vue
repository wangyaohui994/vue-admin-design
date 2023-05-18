<template>
	<div>
		<el-card>
			<el-table :data="List" tooltip-effect="dark" style="width: 100%" size="medium">
				<el-table-column label="名称" width="220" align="center">
					<template slot-scope="{row}">
						{{ row.homeworkName }}
					</template>
				</el-table-column>
				<el-table-column label="作业具体要求" width="220" align="center">
					<template slot-scope="{row}">
						{{ row.homeworkContent }}
					</template>
				</el-table-column>
				<el-table-column label="截止时间" width="220" align="center">
					<template slot-scope="{row}">
						{{ row.homeworkDeadline }}
					</template>
				</el-table-column>
				<el-table-column>
					<template slot-scope="scope">
						<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-document"
							@click="handleClick(scope.row)">查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-dialog title="作业详情" :visible.sync="dialogFormVisible">
			<div class="formStar">
				<el-descriptions :column="1">
					<el-descriptions-item label="名称" >{{questionForm.homeworkName}}
					</el-descriptions-item>
				</el-descriptions>
			
				<el-descriptions :column="1">
					<el-descriptions-item label="具体要求" class="formStar">{{questionForm.homeworkContent}}
					</el-descriptions-item>
				</el-descriptions>
				<el-descriptions :column="1">
					<el-descriptions-item label="截止时间" class="formStar">{{questionForm.homeworkDeadline}}
					</el-descriptions-item>
				</el-descriptions>
			
				<el-form :model="questionForm" ref="dataForm" label-position="left" label-width="50px">

					<el-form-item prop="correctAnswer">
						<el-upload class="upload-demo" ref="upload" action :on-preview="handlePreview"
							:on-remove="handleRemove" :http-request="UploadSubmit" :file-list="fileList"
							:auto-upload="false" :before-upload="beforeAvatarUpload">
							<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
							<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传
							</el-button>
							<div slot="tip" class="el-upload__tip">能够上传的文件类型有：jpeg,jpg,png,bmp,ppt,pdf,doc,docx,xls,zip，且单个文件不超过10MB</div>
						</el-upload>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click="refresh(questionForm)">确定</el-button>
			</div>
		</el-dialog>

		<el-card>
			<el-table :data="Homework" tooltip-effect="dark" style="width: 100%" size="medium">
				<el-table-column label="名称" width="500" align="center">
					<template slot-scope="{row}">
						{{ row.hsName }}
					</template>
				</el-table-column>
				<el-table-column label="提交时间" width="220" align="center">
					<template slot-scope="{row}">
						{{ row.hsTime }}
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="200">
					<template slot-scope="scope">
						<el-button @click="look(scope.row)" type="text" size="small">查看</el-button>
						<el-button type="text" size="small" @click="downLoad(scope.row)">下载</el-button>
						<el-button type="text" style="color: crimson;" @click="delet(scope.row)">删除</el-button>
					</template>
				</el-table-column>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
	import {
		setStorage,
		getStorage
	} from '@/utils/localStorage'
	import {
		queryByCourseIdTeam
	} from '@/api/getTeam'
	import {
		add,
		update,
		queryById,
		deleteById,
		upload,
	} from '@/api/getHomework'
	import {
		addHsTeam,
		updateHsTeam,
		queryByIdHsTeam,
		deleteByIdHsTeam,
	} from '@/api/getHsTeam'
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

	import {
		queryCidSid
	} from '@/api/getTeamStudent'

	export default {
		name: 'FileHomework',
		data() {
			return {
				List: [],
				questionForm: {
					homeworkId: "",
					homeworkName: "",
					homeworkContent: "",
					homeworkDeadline: "",
				},
				Homework: [],
				fileList: [],
				dialogFormVisible: false,
			}
		},
		methods: {
			initHomeworkList() {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				this.studentId = JSON.parse(getStorage("userInfo")).studentId

				const data = {
					courseId: this.courseId
				}
				let cs = {
					courseId: this.courseId,
					studentId: this.studentId,
				}
				if (data) {
					queryById(data).then(res => {
						this.List = res.datas
						for(let i in this.List){
							this.List[i].homeworkDeadline = this.$moment(this.List[i].homeworkDeadline).format(
							'YYYY-MM-DD HH:mm:ss')
						}
						queryCidSid(cs).then(ress => {
							var teamId = ress.datas[0].teamId
							const datas = {
								homeworkId: this.List[0].homeworkId,
								teamId: teamId,
							}
							// console.log(datas,"datas")
							if (datas) {
								queryByHTIdHS(datas).then(ress => {
									this.Homework = ress.datas
									for (let i in this.Homework) {
										this.Homework[i].hsTime = this.$moment(this.Homework[i]
											.hsTime).format(
											'YYYY-MM-DD HH:mm:ss')
									}

									console.log(this.Homework)
								})
							}
						})

					})
				}
			},
			changeHomeworkList(row) {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				this.studentId = JSON.parse(getStorage("userInfo")).studentId

				const data = {
					courseId: this.courseId
				}
				let cs = {
					courseId: this.courseId,
					studentId: this.studentId,
				}
				if (data) {
					queryById(data).then(res => {
						this.List = res.datas
						queryCidSid(cs).then(ress => {
							var teamId = ress.datas[0].teamId
							const datas = {
								homeworkId: row.homeworkId,
								teamId: teamId,
							}
							// console.log(datas,"datas")
							if (datas) {
								queryByHTIdHS(datas).then(ress => {
									this.Homework = ress.datas
									for (let i in this.Homework) {
										this.Homework[i].hsTime = this.$moment(this.Homework[i]
											.hsTime).format(
											'YYYY-MM-DD HH:mm:ss')
									}
								})
							}
						})

					})
				}
			},
			refresh(row) {
				this.dialogFormVisible = false
				this.changeHomeworkList(row)
				// this.initHomeworkList()
			},
			handleClick(row) {
				this.dialogFormVisible = true //控制弹窗显示
				this.questionForm.homeworkId = row.homeworkId
				this.questionForm.homeworkName = row.homeworkName
				this.questionForm.homeworkContent = row.homeworkContent
				this.questionForm.homeworkDeadline = row.homeworkDeadline
			},
			downLoad(scoperow) {
				// var data = new FormData(); //获取上传表单（文件）
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
							fileName: scoperow.hsName,
							courseId: this.courseId,
							homeworkId: scoperow.homeworkId,
							teamId: teamId
						}
						exportLogDataHS(data, scoperow)
					})
				}

			},
			delet(scoperow) {
				const data = {
					hsId: scoperow.hsId
				}
				console.log(data)
				if (data) {
					deleteByIdHsTeam(data).then(res => {
						deleteByIdHS(data).then(res => {
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.initHomeworkList()
						})
					})

				}
			},
			UploadSubmit(param) {
				var file = param.file;
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				this.studentId = JSON.parse(getStorage("userInfo")).studentId

				const datas = {
					courseId: this.courseId,
					studentId: this.studentId
				}
				if (datas) {
					queryCidSid(datas).then(res => {
						var teamId = res.datas[0].teamId

						var file_form = new FormData(); //获取上传表单（文件）
						file_form.append("file", file);
						file_form.append('courseId', this.courseId)
						file_form.append('teamId', teamId)
						file_form.append('homeworkId', this.questionForm.homeworkId)
						console.log(file_form)
						if (file_form) {
							uploadHS(file_form).then(res => {
									let aData = new Date();
									aData = this.$moment(aData).utcOffset(480)._d
									const data = {
										homeworkId: this.questionForm.homeworkId,
										hsName: file.name,
										hsType: file.type,
										hsUrl: "D://ideaWork//design//SystemData//" + this.courseId +
											"//" + this.questionForm
											.homeworkId + "//" + teamId + "//" + file.name,
										hsTime: aData
									}
									if (data) {
										addHS(data).then(res => {
											const HsTeam = {
												hsId: res.datas.hsId,
												teamId: teamId
											}
											if (HsTeam) {
												addHsTeam(HsTeam).then(resss => {
													this.$message({
														message: '上传成功',
														type: 'success'
													});
												})
											}


										}).catch(() => {
											this.$message.error('失败');
										})
									}
								})
								.catch((err) => {
									console.log(err);
								});
						}

					})
				}
				//console.log(param.file);

				// console.log(file)
				// const data = {
				// 	courseId: this.courseId,
				// 	fileName: file.name,
				// 	fileType: file.type,
				// 	fileUrl: "E://file//" + this.courseId + "//" + file.name,
				// }
				// if (data) {
				// 	add(data).then(res => {
				// 		this.$message({
				// 			message: '上传成功',
				// 			type: 'success'
				// 		});
				// 	}).catch(() => {
				// 		this.$message.error('失败');
				// 	})
				// }
				// console.log(data)
			},

			submitUpload() {
				this.$refs.upload.submit();
			},
			look(scoperow) {
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
							fileName: scoperow.hsName,
							courseId: this.courseId,
							homeworkId: scoperow.homeworkId,
							teamId: teamId
						}
						showDataHS(data, scoperow)
					})
				}
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			beforeAvatarUpload(file) {
				// const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 10;
			
			
				if (!isLt2M) {
			 	this.$message.error('上传文件大小不能超过 10MB!');
				}
				// return isJPG && isLt2M;
				return isLt2M;
			}
		},

		mounted() {
			this.$nextTick(() => {
				this.initHomeworkList();
			})
		},
	}
</script>

<style>
	.formStar {
		font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC",
			sans-serif;
		font-weight: 200;
		font-style: normal;
		font-size: 12px;
		color: #ffff00;
		padding: 5px;
	}
</style>
