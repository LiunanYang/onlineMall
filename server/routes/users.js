var express = require('express');
var router = express.Router();
let Users = require("../models/users")
let util = require("../util/util")


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 登陆
router.post('/login',(req,res,next)=>{
  let loginname = req.body.loginname
  let password = req.body.password

  Users.findOne({userName:loginname},(err1,userDoc)=>{
    if(err1){
      res.json({
        status:"1",
        msg:err1.message
      })
    }else{
      if(userDoc){
        if(userDoc.userPwd==password){
          res.cookie("userId",userDoc.userId,{
            path:'/',
            maxAge:1000*60*60
          })
          res.cookie("userName",userDoc.userName,{
            path:'/',
            maxAge:1000*60*60
          })
          res.json({
            status:"0",
            msg:"success",
            result:{
              nickName:userDoc.userName
            }
          })
        }else{
          res.json({
            status:"1",
            msg:"password error"
          })
        }
      }
    }
  })


})
// 登出
router.post("/logout",(req,res,next)=>{
  res.cookie("userId","",{
    path:'/',
    maxAge:-1
  })
  res.json({
    status:"0",
    msg:"",
    result:""
  })
})
// 校验
router.get('/checklogin',(req,res,next)=>{
  if(req.cookies.userId){
    res.json({
      status:"0",
      msg:"",
      result:{
        nickName:req.cookies.userName
      }
    })
  }else{
    res.json({
      status:"1",
      msg:"未登录",
      result:""
    })
  }
})
// 查询当前用户的购物车数据
router.get("/cartList",(req,res,next)=>{
  let userId = req.cookies.userId
  Users.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:''
      })
    }else{
      if(doc){
        res.json({
          status:"0",
          msg:"",
          result:doc.cartList
        })
      }
    }
  })
})
// 购物车删除
router.post("/cart/del",(req,res,next)=>{
  let userId = req.cookies.userId,
    productId = req.body.productId
  Users.update({userId:userId},{
    $pull:{
      'cartList':{
        'productId':productId
      }
    }
  },(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:"",
        result:""
      })
    }else{
      res.json({
        status:"0",
        msg:"",
        result:"suc"
      })
    }
  })
})
//修改商品数量
router.post("/cartEdit",(req,res,next)=>{
  let userId = req.cookies.userId
  let productId = req.body.productId
  let productNum = req.body.productNum
  let checked = req.body.checked
  Users.update({"userId":userId,"cartList.productId":productId},{
    "cartList.$.productNum":productNum,
    "cartList.$.checked":checked
  },(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:"",
        result:""
      })
    }else{
      res.json({
        status:"0",
        msg:"",
        result:"suc"
      })
    }
  })
})
// 查询用户地址列表
router.get("/addressList",(req,res,next)=>{
  let userId = req.cookies.userId
  Users.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:""
      })
    }else{
      if(doc){
        res.json({
          status:"0",
          msg:"",
          result:doc.addressList
        })
      }
    }
  })
})
// 设置默认地址接口
router.post("/setDefault",(req,res,next)=>{
  let userId = req.cookies.userId,
    addressId=req.body.addressId
  Users.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:""
      })
    }else{
      if(doc){
        let addressList = doc.addressList
        addressList.forEach(item => {
          if(item.addressId==addressId){
            item.isDefault = true
          }else{
            item.isDefault = false
          }
        });
        doc.save((err1,doc1)=>{
          if(err1){
            res.json({
              status:"1",
              msg:err1.message,
              result:""
            })
          }else{
            res.json({
              status:"0",
              msg:"",
              result:""
            })
          }
        })
      }
    }
  })
})
// 删除地址
router.post("/address/del",(req,res,next)=>{
  let userId = req.cookies.userId,
    addressId=req.body.addressId
  Users.update({userId:userId},{
    $pull:{
      'addressList':{
        'addressId':addressId
      }
    }
  },(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:"0",
        msg:"",
        result:''
      })
    }
  })
})
// 新增地址---?
router.post("/address/add",(req,res,next)=>{
  let userId = req.cookies.userId,
    userName=req.body.userName,
    streetName=req.body.streetName,
    postCode=req.body.postCode,
    tel=req.body.tel
  Users.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:""
      })
    }else{
      let r1 = Math.floor(Math.random()*10)
      let sysDate = new Date().Format('yyyyMMddhhmmss')
      let addressId = r1+sysDate

      let address={
        addressId:addressId,
        userName:userName,
        streetName:streetName,
        postCode:postCode,
        tel:tel
      }
      doc.addressList.push(address)
      doc.save((err1,doc1)=>{
        if(err){
          res.json({
            status:"1",
            msg:err1.message,
            result:""
          })
        }else{
          res.json({
            status:"0",
            msg:"",
            result:""
          })
        }
      })

    }
  })


})
// 订单支付页面
router.post("/payMent",(req,res,next)=>{
  let userId = req.cookies.userId,
    addressId = req.body.addressId
    orderTotal = req.body.orderTotal,
  Users.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:""
      })
    }else{
      let address='',goodsList=[]
      // 获取当前用户的地址信息
      doc.addressList.forEach(item=>{
        if(addressId==item.addressId){
          address=item
        }
      })
      // 获取用户订单商品信息
      doc.cartList.filter(item=>{
        if(item.checked=='1'){
          goodsList.push(item)
        }
      })
      // 创建订单ID
      let platform = '622'
      let r1 = Math.floor(Math.random()*10)
      let r2 = Math.floor(Math.random()*10)
      let sysDate = new Date().Format('yyyyMMddhhmmss')
      let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
      let orderId = platform+r1+sysDate+r2

      // 订单
      let order = {
        orderId:orderId,
        orderTotal:orderTotal,
        addressInfo:address,
        goodsList:goodsList,
        orderStatus:'1',
        createDate:createDate
      }
      doc.orderList.push(order)
      doc.save((err1,doc1)=>{
        if(err){
          res.json({
            status:"1",
            msg:err1.message,
            result:""
          })
        }else{
          res.json({
            status:"0",
            msg:"",
            result:{
              orderId:order.orderId,
              orderTotal:orderTotal
            }
          })
        }
      })
    }
  })
})
// 根据订单Id查询订单信息
router.get("/orderDetail",(req,res,next)=>{
  let userId = req.cookies.userId,orderId = req.param("orderId")
  Users.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:''
      })
    }else{
      let orderList = doc.orderList
      if(orderList.length>0){
        let orderTotal=0
        orderList.forEach(item=>{
          if(item.orderId==orderId){
            orderTotal=item.orderTotal
          }
        })
        if(orderTotal>0){
          res.json({
            status:"0",
            msg:"",
            result:{
              orderTotal:orderTotal
            }
          })
        }else{
          res.json({
            status:"102",
            msg:"当前用户未创建订单",
            result:""
          })
        }

      }else{
        res.json({
          status:"101",
          msg:"无此订单号",
          result:''
        })
      }
    }
  })
})
//
router.get("/getCartCount",(req,res,next)=>{
  if(req.cookies && req.cookies.userId){
    let userId = req.cookies.userId
    Users.findOne({userId:userId},(err,doc)=>{
      if(err){
        res.json({
          status:"1",
          msg:err.message,
          result:""
        })
      }else{
        let cartList = doc.cartList
        let cartCount = 0
        cartList.map(item=>{
          cartCount+=parseInt(item.productNum)
        })
        res.json({
          status:"0",
          msg:"",
          result:cartCount,
          req2:req.cookies,
          req1:req.cookies.userId
        })
      }
    })
  }
})
module.exports = router;
