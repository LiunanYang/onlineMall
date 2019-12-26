<template>
  <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>商品</span>
      </nav-bread>
      <swiper></swiper>

      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:" class="price" @click="sortGoods">
              Price
              <svg class="icon icon-arrow-short">
                <use xlink:href="#icon-arrow-short"></use>
              </svg>
            </a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>

          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}" >
              <dl class="filter-price">
                <dt>价格:</dt>
                <dd>
                  <a href="javascript:void(0)" :class="{'cur':priceChecked=='all'}"  @click="clickAll">
                    所有
                  </a>
                </dd>
                <dd v-for="(price,index) in priceFilter">
                  <a href="javascript:;"  :class="{'cur':priceChecked==index}" @click="setPriceFilter(index)">
                    {{price.startPrice | currency('￥')}}-{{price.endPrice| currency('￥')}}
                  </a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="item in goodsList">
                    <div class="pic">
                      <a href="#"><img  v-lazy="'static/'+item.productImage" alt="" :key="'static/'+item.productImage"></a>

                    </div>
                    <div class="main">
                      <div class="name">{{ item.productName }}</div>
                      <div class="price">{{ item.productPrice | currency('￥')}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
                  <img src="../../static/loading-svg/loading-bars.svg" alt="" v-show="loading">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
      <!-- 未登录时 addCart 弹出框 -->
      <modal :mdShow="mdShow" @close="closeModal">
        <p slot="message">
          请先登陆，否则无法加入到购物车中！
        </p>
        <div slot="btnGroup">
          <a class="btn btn-m" href="javascript:;" @click="mdShow=false">关闭</a>
        </div>
      </modal>
      <!-- 已登录时 addCart弹出框 -->
      <modal :mdShow="mdShowCart" @close="closeModal">
        <p slot="message">
          <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
          </svg>
          <span>加入购物车成功!</span>
        </p>
        <div slot="btnGroup">
          <a class="btn btn-m" href="javascript:;" @click="mdShowCart=false">继续购物</a>
          <router-link class="btn btn-m" href="javascript:;" to="/cart">查看购物车</router-link>
        </div>
      </modal>

      <nav-footer></nav-footer>
  </div>
</template>
<script>
  import '@/assets/css/base.css'
  import '@/assets/css/checkout.css'
  import '@/assets/css/login.css'
  import '@/assets/css/product.css'
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'
  import Modal from '@/components/Modal'
  import Swiper from '@/components/Swiper'
  import axios from 'axios'  //默认到node_modules中遍历
  import {currency} from '@/util/currency'
  export default {
   data(){
     return {
       goodsList:[],
       priceFilter:[
         {
           startPrice:"0.00",
           endPrice:"500.00"
         },
         {
           startPrice:"500.00",
           endPrice:"1000.00"
         },
         {
           startPrice:"1000.00",
           endPrice:"3000.00"
         },
         {
           startPrice:"3000.00",
           endPrice:"5000.00"
         }
       ],
       priceChecked:"all",
       filterBy:false,
       overLayFlag:false,
       sortFlag:true,
       page:1,
       pageSize:8,
       busy:true,
       loading:false,
       mdShow:false,
       mdShowCart:false

     }
   },
   components:{
     NavHeader:NavHeader,
     NavFooter,
     NavBread,
     Modal,
     Swiper
   },
   filters:{
    currency:currency
  },
   mounted(){
     this.getGoodsList()
   },
   methods:{
     getGoodsList(flag){
      let param = {
        page:this.page,
        pageSize:this.pageSize,
        sort:this.sortFlag?1:-1,
        priceLevel:this.priceChecked
      }
      this.loading = true
      axios.get("/goods/list",{
        params:param
      }).then(res=>{
        let data = res.data
        clearInterval(loadingTime)
        var loadingTime=setInterval(()=>{
          this.loading=false
        },1000)
        if(data.status =="0"){
          if(flag){
            this.goodsList = this.goodsList.concat(data.result.list)
            if(data.result.count==0){
              this.busy=true
            }else{
              this.busy=false
            }
          }else{
            this.goodsList = data.result.list
            this.busy=false
          }
        }else{
          this.goodsList = []
        }
      })
     },
     clickAll(){
       this.priceChecked='all'
       this.getGoodsList()
     },
     sortGoods(){
       this.sortFlag = !this.sortFlag
       this.page=1
       this.getGoodsList()
     },
     showFilterPop(){
       this.filterBy = true
       this.overLayFlag = true
       this.page=1
     },
     setPriceFilter(index){
       this.priceChecked = index
       this.closePop()
       this.page=1
       this.getGoodsList()
     },
     closePop(){
       this.filterBy = false,
       this.overLayFlag = false
     },
     loadMore(){
      this.busy=true
      setTimeout(() => {
        this.page++
        this.getGoodsList(true)
      },1000);
     },
     addCart(productId){
       axios.post("/goods/addCart",{
         productId:productId
       }).then(res=>{
         if(res.data.status==0){
           this.mdShowCart = true
           this.$store.commit('updateCartCount',1)
         }else{
           this.mdShow=true
         }
       })
     },
     closeModal(){
       this.mdShow = false
       this.mdShowCart = false
     }
   }
  }
</script>
