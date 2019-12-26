<template>
  <div>
    <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':mdShow}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title"><slot name="title"></slot></div>
          <button class="md-close" @click="closeModal">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <slot name="message"></slot>
          </div>
          <div class="btn-wrap">
            <slot name="btnGroup"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
  </div>
</template>
<script>
  import '@/assets/css/login.css'
  import axios from 'axios'
  export default {
    props:["mdShow"], //这个变量只能从父组件传递
    data(){
      return{

      }
    },
    methods:{
      closeModal(){
        this.$emit("close")
      }
    }
  }
</script>
