import 'reset-css'
import './assets/css/index.scss'
import './assets/js/swiper-bundle.min.css'
// import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'
import Swiper from './assets/js/swiper-bundle.min.js'
var mySwiper = new Swiper('.swiper', {
  direction: 'horizontal', // 垂直切换选项
  loop: true, // 循环模式选项
  autoplay: false, //可选选项，自动滑动
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination'
  },

  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },

  // 如果需要滚动条
  // scrollbar: {
  //   el: '.swiper-scrollbar'
  // }
})
var html = require('../public/index.html')
