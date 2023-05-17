import Layout from '../layout'

/**
 * hidden: true                  如果设置为 true，该项菜单将不会显示在菜单栏中(默认为 false)
 * meta : {
    title: 'title'               菜单名
    icon: 'icon-name'            图标名
    fixed: true                  如果设置为 true，该项 tag 将一直存在 tag 栏中(默认为 false)
  }
 * */

export const asyncRoutes = [{
		path: '/form-table',
		name: 'FormTable',
		component: Layout,
		redirect: '/form-table/table-classic',
		meta: {
			title: '小组',
			icon: 'vue-dsn-icon-biaoge',

		},
		children: [

			{
				path: 'table-inline-edit',
				name: 'TableInlineEdit',
				hidden: false,
				component: () => import('../views/form-table/TableInlineEdit'),
				meta: {
					title: '成员',
					
				}
			},
			{
				path: 'recruitment-wall',
				name: 'recruitmentWall',
				component: () => import('../views/form-table/recruitmentWall'),
				meta: {
					title: '招募墙'
				}
			}
		]
	},
	{
		path: '/file',
		name: 'File',
		component: Layout,
		redirect: '/file',
		meta: {
			title: '文件处理',
			icon: 'vue-dsn-icon-picture'
		},
		children: [{
				path: 'file-upload',
				name: 'Fileupload',
				component: () => import('../views/file/FileUpload'),
				meta: {
					title: '资源'
				}
			},
			{
				path: 'file-homework',
				name: 'Filehomework',
				hidden: true,
				component: () => import('../views/file/FileHomework'),
				meta: {
					title: '作业',
					roles : 1,
				}
			},
			{
				path: 'file-homeworkTeacher',
				name: 'Filehomeworkteacher',
				hidden: true,
				component: () => import('../views/file/FileHomeworkTeacher'),
				meta: {
					title: '作业',
					roles : 2,
				}
			},
			{
				path: 'file-homeworkTeacherDetail',
				name: 'Filehomeworkteacherdetail',
				hidden: true,
				component: () => import('../views/file/FileHomeworkTeacherDetail'),
				meta: {
					title: '作业详情'
				}
			},
		]
	},
	{
		path: '/video',
		name: 'Video',
		component: Layout,
		redirect: '/video/video-player',
		meta: {
			title: '答辩',
			icon: 'vue-dsn-icon-video'
		},
		children: [{
				path: 'ReplyStudent',
				name: 'ReplyStudent',
				hidden: true,
				component: () => import('../views/video/ReplyStudent'),
				meta: {
					title: '答辩',
					roles : 1,
				}
			},
			{
				path: 'ReplyTeacher',
				name: 'ReplyTeacher',
				hidden: true,
				component: () => import('../views/video/ReplyTeacher'),
				meta: {
					title: '答辩',
					roles : 2,
				}
			}
		]
	},
	{
		path: '/score',
		name: 'Score',
		component: Layout,
		redirect: '/score',
		meta: {
			title: '评分',
			icon: 'vue-dsn-icon-zujian'
		},
		children: [{
				path: 'ScoreStudent',
				name: 'ScoreStudent',
				hidden: true,
				component: () => import('../views/score/ScoreStudent'),
				meta: {
					title: '评分',
					roles : 1,
				}
			},
			{
				path: 'ScoreTeacher',
				name: 'ScoreTeacher',
				hidden: true,
				component: () => import('../views/score/ScoreTeacher'),
				meta: {
					title: '评分',
					roles : 2,
				}
			}
		]
	}

]
