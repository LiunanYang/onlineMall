<template>
    <div>
      <nav-header></nav-header>
      <div class="container">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>订单信息</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>选择</span>地址</li>
            <li class="cur"><span>检查</span>订单</li>
            <li class="cur"><span>付</span>款</li>
            <li class="cur"><span>订单</span>确认</li>
          </ul>
        </div>

        <div class="order-create">
          <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
          <div class="order-create-main">
            <h3>下单成功！<br>您的订单正在处理中！</h3>
            <p>
              <span>订单编号：{{orderId}}</span>
              <span>订单总价：{{orderTotal | currency("￥")}}</span>
            </p>
            <div class="order-create-btn-wrap">
              <div class="btn-l-wrap">
                <router-link class="btn btn--m" to="/cart">购物车</router-link>
              </div>
              <div class="btn-r-wrap">
                <router-link class="btn btn--m" to="/">商品列表</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav-footer></nav-footer>
    </div>
</template>
<script>
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter'
  import Modal from '@/components/Modal'
  import {currency} from '@/util/currency'
  import axios from 'axios'
    export default{
      data(){
          return{
            orderId:'',
            orderTotal:0
          }
      },
      components:{
        NavHeader,
        NavFooter
      },
      mounted(){
        this.init()
      },
      filters:{
        currency
      },
      methods:{
        init(){
          this.orderId = this.$route.query.orderId
          if(!this.orderId){
            return;
          }
          axios.get("/users/orderDetail",{
            params:{
              orderId:this.orderId
            }
          }).then(res=>{
            if(res.data.status=='0'){
              this.orderTotal = res.data.result.orderTotal
            }
          })
        }
      }
    }
</script>
