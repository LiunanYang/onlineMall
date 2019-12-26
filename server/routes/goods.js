let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let Goods = require('../models/goods')
let Users = require('../models/users')

// 连接mongodb数据库
mongoose.connect('mongodb://localhost:27017/mall')
mongoose.connection.on('connected',()=>{
  console.log("MongooDB connected success")
})
mongoose.connection.on('error',()=>{
  console.log("MongooDB connected fail")
})
mongoose.connection.on('disconnected',()=>{
  console.log("MongooDB connected disconnected")
})

// 查询商品列表数据
router.get("/list",(req,res,next)=>{
  // 商品列表分页和排序
  let page = parseInt(req.param("page"))
  let pageSize = parseInt(req.param("pageSize"))
  let sort = req.param("sort")  //1：升序
  let priceLevel = req.param("priceLevel")
  let skip = (page-1)*pageSize
  let params = {}
  var priceGt='',priceLte=''
  if(priceLevel!="all"){
    switch (priceLevel){
      case '0':priceGt=0;priceLte=500;break;
      case '1':priceGt=500;priceLte=1000;break;
      case '2':priceGt=1000;priceLte=3000;break;
      case '3':priceGt=3000;priceLte=5000;break;
    }
    params={
      productPrice:{
        $gt:priceGt,
        $lte:priceLte
      }
    }
  }
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
  goodsModel.sort({'productPrice':sort})
  goodsModel.exec((err,doc)=>{
  // Goods.find({},(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message
      })
    }else{
      res.json({
        status:"0",
        msg:"",
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
})

// 加入到购物车
router.post("/addCart",(req,res,next)=>{
  let userId = req.cookies.userId,productId=req.body.productId
  Users.findOne({userId:userId},(err,userDoc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message
      })
    }else{
      // console.log("userDoc:"+userDoc)
      if(userDoc){
        let goodsItem = ''
        userDoc.cartList.forEach((item)=>{
          if(item.productId==productId){
            goodsItem = item
            item.productNum++
          }
        })
        if(goodsItem){
          userDoc.save((err2,doc2)=>{
            if(err2){
              res.json({
                status:"1",
                msg:err2.message
              })
            }else{
              res.json({
                status:"0",
                msg:"",
                result:'suc'
              })
            }
          })
        }else{
          Goods.findOne({productId:productId},(err1,doc)=>{
            if(err1){
              res.json({
                status:"1",
                msg:err1.message
              })
            }else{
              if(doc){
                // console.log(doc)
                doc.productNum=1
                doc.checked=1
                userDoc.cartList.push(doc)
                userDoc.save((err2,doc2)=>{
                  if(err2){
                    res.json({
                      status:"1",
                      msg:err2.message
                    })
                  }else{
                    res.json({
                      status:"0",
                      msg:"",
                      result:'suc'
                    })
                  }
                })
              }
            }
          })
        }

      }
    }
  })

})


module.exports = router
