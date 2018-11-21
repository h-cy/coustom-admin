var express = require('express');
var router = express.Router();
const {query} = require('../models/db')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect("admin/open-course");
});
// 公开课更新路由
router.get('/open-course-update/:id',async (req,res)=>{
  try{
    const courses =await query('select * from open_course where id=?',req.params.id);
    console.log(courses)
    if(courses.length>0){
      const course = courses[0];
      course.time=course.time.toISOString().substr(0,16);
      res.render('admin/open-course-update', {
         nav:'open-course',
         course:courses[0]
      })
    }else{
      res.render('admin/admin-result', {
        message:"查询失败"
      })
    }
  }catch(e){
    res.render('admin/admin-result', {
      message:'更新失败'
    })
  }
})
// 公开课删除
router.get('/open-course-delete/:id', async (req, res) => {
  try {
     await query('delete from open_course where id=?', req.params.id);
    res.render('admin/admin-result', {
      message: '删除成功'
    })
  } catch (e) {
    res.render('admin/admin-result', {
      message: '删除失败'
    })
  }
})
// 公开课新增路由
router.get('/open-course-add', async (req, res) => {
  res.render('admin/open-course-add', { nav: 'open-course' });
})
router.get('/open-course',async(req,res)=>{
  try {
      const course =await query('SELECT * FROM open_course')
      console.log(course);
      res.render('admin/open-course', {
        nav: 'open-course',
        course
      });
  } catch (error) {
     res.render('admin/admin-result', {
       message:'查询公开课失败'
     });
  }
})
/* 处理新增公开课 */
const multer = require("multer");
const fs = require("fs");
// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
const storage = multer.diskStorage({
    destination:function(req,file,cb){
      // 接收到文件后输出的保存路径
      cb(null,'public/images');
    },
    filename:function(req,file,cb){
      // 将保存文件设置为时间戳+文件原始名
      let extname = "";
      switch(file.mimetype){
        case 'image/jpeg':
            extname=".jpeg";
        break;
        case 'image/png':
          extname = ".png";
          break;
        case 'image/gif':
          extname = ".gif";
        break;
      }
      cb(null,Date.now()+extname);
    }
})


/* 设置如果没有输出保存的路径就创建 */
const createFolder = function(FolderName){
  try{
    fs.accessSync(FolderName);
  }catch(e){
    fs.mkdirSync(FolderName);
  }
}
const FolderName ='public/images';

/* 设置上传参数 */
const upload = multer({
  storage,
  limits:{fileSize:2*1024*1024},//设置文件上传大小限制
  fileFilter:function(req,file,cb){
    // 过滤文件
    if (file.mimetype === 'image/gif' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
      cb(null,true);
    }else{
      cb(new Error("请上传正确的文件名"),false)
    }
  }
})
const {body,validationResult} =require('express-validator/check');
const validations = [
  body('name').not().isEmpty().withMessage('名称必填'),
  body("description").not().isEmpty().withMessage('描述信息必填'),
  body('time').not().isEmpty().withMessage('时间必填')

]

const mysql = require("mysql");

router.post('/open-courses',[upload.single('file'),...validations],async (req,res,next)=>{
  //使用隐藏域接收poster参数然后使用file参数替换poster
  if (req.file) {
    req.body.poster = req.file.filename;
  }
  let errors = validationResult(req);
  errors = errors.formatWith((error)=> error.msg);

  if(errors.isEmpty()){
    try{
      let sql,open;
      if(req.body.id){
        const id = req.body.id;
        delete req.body.id;
        sql = mysql.format('UPDATE open_course SET ? WHERE id=?', [req.body,id]);
        open='更新'
      }else{
        sql = mysql.format('INSERT INTO open_course SET ?',req.body);
        open='新增'
      }
      const result = await query(sql);
      const message = result.affectedRows >0 ? `${open}成功`:`${open}失败`;
      res.render('admin/admin-result', {
        message
      })
    }catch(e){
      res.render('admin/admin-result', {
        message:'操作失败'
      })
    }
  }else{
    res.render('admin/admin-result',{
      message:'操作失败',
      errors:errors.array()
    })
  }
})
createFolder(FolderName);
router.get('/vip-course', async (req, res) => {
  res.render('admin/vip-course', {
    nav: 'vip-course'
  });
})
module.exports = router;
