<template>
	<div class="image-compress">
		<el-upload class="upload-demo" ref="upload" action :on-preview="handlePreview" :on-remove="handleRemove"
			:http-request="UploadSubmit" :file-list="fileList" :auto-upload="false" :before-upload="beforeAvatarUpload">
			<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
			<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
		</el-upload>

		<el-card>
			<el-table :data="file" tooltip-effect="dark" style="width: 100%" size="medium">
				<el-table-column label="名称" width="700" align="center">
					<template slot-scope="{row}">
						{{ row.fileName }}
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="300">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						<el-button type="text" size="small" @click="downLoad(scope.row)">下载</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>

		<!-- <materials-dialog
		   :title="matPrintDialog.title"
		   :visible="matPrintDialog.visible"
		   :height="matPrintDialog.height"
		   :width="matPrintDialog.width"
		   @onClose="matClose()"
		   @onConfirm="matConfirm()">
		   <el-main slot="content">
		     <div style="padding: 50px;">
		       <el-image
		         :src="imgUrl"
		         style="position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:85%;margin:auto;"
		         fit="contain"></el-image>
		     </div>
		   </el-main>
		 </materials-dialog>
		 <!-- pdf预览 -->
		<!-- <materials-dialog
		   :title="picPrintDialog.title"
		   :visible="picPrintDialog.visible"
		   :height="picPrintDialog.height"
		   :width="picPrintDialog.width"
		   @onClose="printClose()"
		   @onConfirm="printConfirm()">
		   <el-main slot="content">
		     <pdf ref="pdf" :src="pdfUrl"></pdf>
		   </el-main>
		 </materials-dialog> -->

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
		upload,
		downloadFile,
		download,
		exportLogData,
		showData
	} from '@/api/getFile'

	export default {
		name: 'ImageUpload',
		data() {
			return {
				file: [],
				fileList: [],
				courseId: [],
				content: [],
			}
		},
		methods: {
			handleClick(row) {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				const data = {
					fileName: row.fileName,
					courseId: this.courseId
				}
				showData(data, row);
			},
			initFile() {
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				const data = {
					courseId: this.courseId,
				}
				if (data) {
					queryById(data).then(res => {
						this.file = res.datas
					})
				}
			},

			downLoad(scoperow) {
				// var data = new FormData(); //获取上传表单（文件）
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				// data.append("fileName", scoperow.fileName);
				// data.append('courseId', this.courseId);
				const data = {
					fileName: scoperow.fileName,
					courseId: this.courseId
				}
				exportLogData(data, scoperow)

			},

			UploadSubmit(param) {
				var file = param.file;
				this.courseId = JSON.parse(getStorage("courseInfo")).courseId
				//console.log(param.file);
				var file_form = new FormData(); //获取上传表单（文件）
				file_form.append("file", file);
				file_form.append('courseId', this.courseId)
				if (file_form) {
					upload(file_form).then((res) => {
							console.log(res);
						})
						.catch((err) => {
							console.log(err);
						});
				}
				console.log(file)
				const data = {
					courseId: this.courseId,
					fileName: file.name,
					fileType: file.type,
					fileUrl: "D://ideaWork//design//SystemData//" + this.courseId + "//" + file.name,
				}
				if (data) {
					add(data).then(res => {
						this.$message({
							message: '上传成功',
							type: 'success'
						});
						this.initFile();
					}).catch(() => {
						this.$message.error('失败');
					})
				}
				console.log(data)
			},

			submitUpload() {
				this.$refs.upload.submit();

			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
				// window.open(file.response.url);
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
				this.initFile();
			})
		},
	}
</script>

<style>
</style>
