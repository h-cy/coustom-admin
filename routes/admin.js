var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect("admin/open-course");
});
router.get('/open-course-update',async(req,res)=>{
  res.render('admin/open-course-update',{message:'123'});
})
router.get('/open-course',async(req,res)=>{
  res.render('admin/open-course',{message:'123'});
})
module.exports = router;
