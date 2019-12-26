<template>
  <footer class="footer">
    <div id="map" class="container">
        <div class="map_info">
            <a href="#"><i class="iconfont iconbuoumaotubiao46"></i>预约维修服务</a><span>|</span>
            <a href="#"><i class="iconfont icontian"></i>7天无理由退货</a><span>|</span>
            <a href="#"><i class="iconfont icontian1"></i>15天免费换货</a><span>|</span>
            <a href="#"><i class="iconfont iconlipin"></i>满150元包邮</a><span>|</span>
            <a href="#"><i class="iconfont iconlocation"></i>520余家售后网点</a>
        </div>
        <div class="map_list clear">
            <ul class="l">
                <li>
                    <h3>帮助中心</h3>
                    <p><a href="#">账户管理</a></p>
                    <p><a href="#">购物指南</a></p>
                </li>
                <li>
                    <h3>服务支持</h3>
                    <p><a href="#">售后政策</a></p>
                    <p><a href="#">自助服务</a></p>
                </li>
                <li>
                    <h3>线下门店</h3>
                    <p><a href="#">兜糖之家</a></p>
                    <p><a href="#">服务网点</a></p>
                </li>
                <li>
                    <h3>关于一兜糖</h3>
                    <p><a href="#">了解一兜糖</a></p>
                    <p><a href="#">加入一兜糖</a></p>
                </li>
                <li>
                    <h3>关于我们</h3>
                    <p><a href="#">新浪微博</a></p>
                    <p><a href="#">官方微信</a></p>
                </li>
                <li>
                    <h3>特色服务</h3>
                    <p><a href="#">防伪查询</a></p>
                    <p><a href="#">优惠卷</a></p>
                </li>
            </ul>
            <div class="map_list_phone l">
                <h2>800-820-8820</h2>
                <p>周一至周日 8:00-18:00</p>
                <button><i class="iconfont iconliuyan"></i> 联系客服</button>
            </div>
        </div>
    </div>
    <div class="footer__wrap">
      <div class="footer__secondary">
        <div class="footer__inner">
          <div class="footer__secondary__nav">
            <span>Copyright © 2019 一兜糖 All Rights Reserved</span>
            <a href="javascript:;">
              About Us
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
   data(){
     return{

     }
   }
  }
</script>
<style>

*{ margin:0; padding:0;}
ul , ol{ list-style: none;}
a{ text-decoration: none; color:#333333;}
h1,h2,h3{ font-size: 100%; font-weight: normal;}
body{ font-family: Arial;}

.l{ float:left;}
.r{ float:right;}
.clear:after{ content:""; display: block; clear: both;}
.container{ width:1226px; margin:0 auto; position: relative;}
.container-fluid{ width:100%; position: relative;}

.footer{
  background-color: white;
}
#map{ margin-bottom: 31px;}
#map .map_info{ font-size:0; height:79px; border-bottom:1px #e0e0e0 solid; text-align: center; line-height: 79px;}
#map .map_info a{ font-size:16px; transition: .5s;}
#map .map_info a:hover{ color:#ff6700;}
#map .map_info i{ margin-right:6px; font-size:26px; position: relative; top:3px;}
#map .map_info span{ font-size:26px; margin:0 57px; color:#e0e0e0;}
#map .map_list{ margin-top:40px;}
#map .map_list li{ float:left; width:160px;}
#map .map_list li h3{ font-size:14px; color:#424242; height:14px; margin-bottom: 23px;}
#map .map_list li p{ font-size:12px; line-height: 28px;}
#map .map_list li a{ color:#757575;}
#map .map_list_phone{ height:112px; width:210px; border-left:1px #e0e0e0 solid; margin-left: 14px; text-align: center;}
#map .map_list_phone h2{ font-size:20px; color:#ff6700; height:20px; margin-bottom: 9px;}
#map .map_list_phone p{ font-size:12px; line-height: 18px;}
#map .map_list_phone button{ width:118px; height:28px; border:1px #ff6700 solid; background:white; color:#ff6700; margin-top:16px; cursor: pointer;}
#map .map_list_phone button:hover{ background:#ff6700; color:white;}
</style>
