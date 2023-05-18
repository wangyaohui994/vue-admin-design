<template>
	<div>
		<el-button size="small" type="primary" icon="el-icon-plus" @click="createHomework">
			添加作业
		</el-button>
		<el-dialog :visible.sync="dialogFormVisible">
			<el-form :model="questionForm" ref="dataForm" label-position="left" label-width="100px"
				style="width: 400px; margin-left:50px;">
				<el-form-item label="作业主题" prop="name">
					<el-input v-model="questionForm.homeworkName"></el-input>
				</el-form-item>
				<el-form-item label="作业具体内容" prop="content">
					<el-input type="textarea" :rows="2" v-model="questionForm.homeworkContent" />
				</el-form-item>
				<el-form-item label="截至时间">
					<el-date-picker v-model="questionForm.homeworkDeadline" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
				</el-form-item>



			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click=" createReply() ">确定</el-button>
			</div>
		</el-dialog>
		
		<el-dialog :visible.sync="editVisible">
			<el-form :model="editForm" ref="dataForm" label-position="left" label-width="100px"
				style="width: 400px; margin-left:50px;">
				<el-form-item label="作业主题" prop="name">
					<el-input v-model="editForm.homeworkName"></el-input>
				</el-form-item>
				<el-form-item label="作业具体内容" prop="content">
					<el-input type="textarea" :rows="2" v-model="editForm.homeworkContent" />
				</el-form-item>
				<el-form-item label="截至时间">
					<el-date-picker v-model="editForm.homeworkDeadline" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
				</el-form-item>		
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取消</el-button>
				<el-button type="primary" @click=" updateReply() ">确定</el-button>
			</div>
		</el-dialog>

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
			<el-table-column fixed="right" width="320">
				<template slot-scope="{row}">
					<el-button type="primary" @click="jump(row)" class="detailed">查看详情</el-button>
					<el-button type="primary" @click="edit(row)" class="detailed">编辑</el-button>
					<el-button type="danger" @click="deleteHomework(row)" class="detailed">删除</el-button>
				</template>
			</el-table-column>

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
		queryById,
		queryByHId,
		deleteById
	} from '@/api/getHomework'
	import{
		deleteByhwIdHS,
		queryByIdHS
	} from '@/api/getHS'
	import{
		deleteByIdHsTeam
	} from '@/api/getHsTeam'
	
	export default {
		name: 'FileHomework',
		data() {
			return {
				List: [],
				questionForm: {
					homeworkName: "",
					homeworkContent: "",
					homeworkDeadline: "",
				},
				editForm: {
					homeworkName: "",
					homeworkContent: "",
					homeworkDeadline: "",
				},
				dialogFormVisible: false,
				editVisible :false,
				homeworkId : "",
			}
		},
		inject: ['reload'],
		methods: {
			initHomeworkList() {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				const data = {
					courseId: this.courseId
				}
				if (data) {
					queryById(data).then(res => {
						
						this.List = res.datas
						for(let i in this.List){
							this.List[i].homeworkDeadline = this.$moment(this.List[i].homeworkDeadline).format(
							'YYYY-MM-DD HH:mm:ss')
						}
						
					})
				}

			},
			createHomework() {
				this.dialogFormVisible = true;
			},
			createReply() {

				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				const data = {
					courseId: this.courseId,
					homeworkName: this.questionForm.homeworkName,
					homeworkContent: this.questionForm.homeworkContent,
					homeworkDeadline:this.$moment( this.questionForm.homeworkDeadline).utcOffset(480)._d,
					
				}
				console.log(data)
				if (data) {
					add(data).then(res => {

						this.List = res.datas
						this.$message({
							message: '作业布置成功',
							type: 'success'
						});
						this.initHomeworkList();
					})
				}
				this.dialogFormVisible = false
			},
			handleCreate() {
				this.questionForm = {
					questionContent: this.name,
					correctAnswer: "",
				};
				this.dialogFormVisible = true;
			},
			jump(row) {
				console.log(row)
				setStorage("homeworkId", JSON.stringify(row.homeworkId))
				this.reload()
				this.$router.push('/file/file-homeworkTeacherDetail')
			},
			edit(row) {
				this.editVisible = true
				this.homeworkId = row.homeworkId
				const data = {
					homeworkId : row.homeworkId
				}
				if(data){
					queryByHId(data).then(res => {
						this.editForm.homeworkName = res.datas[0].homeworkName
						this.editForm.homeworkContent = res.datas[0].homeworkContent
						this.editForm.homeworkDeadline = res.datas[0].homeworkDeadline
					})
				}
				
				console.log(row)
			},
			updateReply(){
				const data = {
					homeworkId : this.homeworkId,
					homeworkName : this.editForm.homeworkName ,
					homeworkContent : this.editForm.homeworkContent ,
					 homeworkDeadline : this.$moment( this.editForm.homeworkDeadline).utcOffset(480)._d
					// homeworkDeadline : this.$moment( this.questionForm.homeworkDeadline).utcOffset(480)._d
				}
				if(data){
					update(data).then(res =>{
						this.$message({
							message: '作业更新成功',
							type: 'success'
						});
						this.editVisible = false
						this.initHomeworkList();
					})
				}
				
			},
			// 
			
			deleteHomework(row) {
				const data = {
					homeworkId : row.homeworkId
				}
				
				if(data){
					queryByIdHS(data).then(resss =>{
						if(resss.datas.length != 0){
							for (let i in resss.datas){
								const datas = {
									hsId : resss.datas[i].hsId
								}
								if(datas){
									deleteByIdHsTeam(datas).then(h =>{
										deleteByhwIdHS(data).then(ress =>{
											deleteById(data).then(res =>{
												this.$message({
													message: '作业删除成功',
													type: 'success'
												});
												this.initHomeworkList();
											})
										})
									})
								}
								
							} 
						}else{
							deleteById(data).then(res =>{
								this.$message({
									message: '作业删除成功',
									type: 'success'
								});
								this.initHomeworkList();
							})
						}
						
						
					})
			
					
				}
			},
		},

		mounted() {
			this.$nextTick(() => {
				this.initHomeworkList();
			})
		},
	}
</script>

<style>
</style>
