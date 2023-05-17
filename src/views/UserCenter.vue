<template>
	<div class="user-center-wrapper clear-fix">
		<el-card shadow="always" :body-style="{padding: '50px'}">
			<div class="user-avatar">
				<img src="../assets/img/avatar.png" alt="avatar">
			</div>
			<el-button @click="edit"  type="primary" style="float: right;">修改个人信息</el-button>
			<ul class="user-info">
				<li>
					<label>用户名：</label>
					<span>{{ userInfo.teacherName }}</span>
					<span>{{ userInfo.studentName }}</span>
				</li>
				<li>
					<label>角色：</label>
					<span><p v-if = "show">学生</p></span>
					<span><p v-if = "reshow">老师</p></span>
				</li>
				<li>
					<label>电话号码：</label>
					<span>{{ userInfo.teacherNumber }}</span>
					<span>{{ userInfo.studentNumber }}</span>
				</li>
				<li>
					<label>邮箱：</label>
					<span>{{ userInfo.teacherEmail }}</span>
					<span>{{ userInfo.studentEmail }}</span>
				</li>
				<li>
					<label>所属学校：</label>
					<span>{{ userInfo.teacherSchool }}</span>
					<span>{{ userInfo.studentSchool }}</span>
				</li>
				<li>
					<label>所属学院：</label>
					<span>{{ userInfo.teacherAcademy }}</span>
					<span>{{ userInfo.studentAcademy }}</span>
				</li>
				<li v-if = "show">
					<label>擅长：</label>
					<span><p v-if = "show">{{ userInfo.studentSkill }}</p></span>
				</li>
			</ul>
		</el-card>
		
		<el-dialog
		  title="修改用户"
		  :visible.sync="editDialogVisible"
		  width="50%"
		  @close="editDialogClosed"
		>
		  <el-form
		    ref="editFormRef"
		    :model="userInfo"
		    label-width="70px"
		  >
		    <el-form-item label="用户名" prop="Name">
		      <el-input v-if = "reshow" v-model="userInfo.teacherName" disabled></el-input>
			  <el-input v-if = "show" v-model="userInfo.studentName" disabled></el-input>
		    </el-form-item>
			<el-form-item label="电话号码" prop="Number">
			  <el-input v-if = "reshow" v-model="userInfo.teacherNumber" ></el-input>
			  <el-input v-if = "show" v-model="userInfo.studentNumber" ></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="Email">
			  <el-input v-if = "reshow" v-model="userInfo.teacherEmail" ></el-input>
			  <el-input v-if = "show" v-model="userInfo.studentEmail" ></el-input>
			</el-form-item>
			<el-form-item label="所属学校" prop="School">
			  <el-input v-if = "reshow" v-model="userInfo.teacherSchool" ></el-input>
			  <el-input v-if = "show" v-model="userInfo.studentSchool"></el-input>
			</el-form-item>
			<el-form-item label="所属学院" prop="Academy">
			  <el-input v-if = "reshow" v-model="userInfo.teacherAcademy" ></el-input>
			  <el-input v-if = "show" v-model="userInfo.studentAcademy" ></el-input>
			</el-form-item>
			<el-form-item label="擅长" prop="Skill" v-if = "show">
			  <el-input v-if = "show" v-model="userInfo.studentSkill" ></el-input>
			</el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <!-- 点击 取消 或 确定 都 隐藏 对话框 -->
		    <el-button @click="editDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="editUserInfo">确 定</el-button>
		  </span>
		</el-dialog>

	</div>
</template>

<script>
	import {
		getUserInfo
	} from '@/api/login'
	import {
		setStorage,
		getStorage
	} from '@/utils/localStorage'
	import {
		update
	} from '@/api/getStudent'
	import {
		updateTeacher
	} from '@/api/getTeacher'
	export default {
		name: 'UserCenter',
		data() {
			return {
				userInfo: {},
				radio : "",
				show : true,
				reshow: false,
				editDialogVisible: false,
			}
		},
		methods :{
			edit(){
				this.editDialogVisible= true
			},
			editUserInfo(){
				
				this.radio = JSON.parse(getStorage("radio"))
				if(this.radio == 1){
					const data = {
						studentId : this.userInfo.studentId,
						studentNumber : this.userInfo.studentNumber,
						studentEmail : this.userInfo.studentEmail,
						studentSchool : this.userInfo.studentSchool,
						studentAcademy : this.userInfo.studentAcademy,
						studentSkill : this.userInfo.studentSkill,
					}
					update(data).then(res =>{
						this.$message({
							message: '修改成功',
							type: 'success'
						});
					})
						
					
				}else{
					const data = {
						teacherId : this.userInfo.teacherId,
						teacherNumber : this.userInfo.teacherNumber,
						teacherEmail : this.userInfo.teacherEmail,
						teacherSchool : this.userInfo.teacherSchool,
						teacherAcademy : this.userInfo.teacherAcademy,
					}
					updateTeacher(data).then(res =>{
						this.$message({
							message: '修改成功',
							type: 'success'
						});
					})
				}
				this.editDialogVisible= false
			},
		},
		created() {
			this.userInfo = JSON.parse(getStorage("userInfo"))
			this.radio = JSON.parse(getStorage("radio"))
			if(this.radio == 1){
				this.show = true
				this.reshow = !this.show
			}else{
				this.show = false
				this.reshow = !this.show
			}
		}
	}
</script>

<style lang="less">
	.user-center-wrapper {
		.user-avatar {
			float: left;
			width: 150px;
			height: 150px;
		}

		.user-info {
			float: left;
			width: 800px;
			margin-left: 50px;
			margin-bottom: 50px;

			li {
				height: 34px;
				line-height: 34px;

				label,
				span {
					display: inline-block;
					vertical-align: middle;
				}

				label {
					width: 80px;
					margin-right: 12px;
					text-align: right;
				}
			}
		}
	}
</style>
