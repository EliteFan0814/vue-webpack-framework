import 'reset-css'
import './assets/css/index.scss'
import './assets/js/swiper-bundle.min.css'
import Swiper from './assets/js/swiper-bundle.min.js'
var html = require('../public/index.html')
const $ = require('jquery')

var searchCountryValue = '' // 免费核名国家
var searchCompanyName = '' // 免费核名搜索内容
var submitValuePhone = '' // 免费核名电话
var universalSelectCountryValue = '' // 全球热门国家/地区公司注册 所选国家
var overseaSelectCountryValue = '' // 海外企业服务，一站式解决方案 所选国家
var overseaCheckboxValue = [] // 海外企业服务，一站式解决方案 多选
var problemText = '' // 在线答疑问题描述
// 验证手机号
const isPoneAvailable = function (pone) {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (!myreg.test(pone)) {
    return false
  } else {
    return true
  }
}

$(function () {
  // 重置 搜索框上方单选
  function resetSelectRadio() {
    $('#select-radio')
      .children()
      .each(function (index) {
        if (index <= 0) {
          $(this).addClass('selected')
        } else {
          $(this).removeClass('selected')
        }
      })
  }
  // 处理多选结果
  function handleChexoboxValue() {
    overseaCheckboxValue = []
    $('#oversea-checkbox')
      .children()
      .each(function () {
        if ($(this).hasClass('selected')) {
          overseaCheckboxValue.push($(this).find('input').val())
        }
      })
  }
  // 清空 更多海外服务多选列表 和 电话
  function resetOverseaCheckbox() {
    $('#oversea-checkbox')
      .children()
      .each(function () {
        $(this).removeClass('selected')
      })
    $('input[name="access-valuation-phone"]').val('')
    overseaCheckboxValue = []
  }
  // 清空 在线答疑
  function resetProblem() {
    problemText = ''
    $('#your-problem').val('')
    $('input[name="online-value-phone"]').val('')
  }
  // 关闭弹框
  $('.dialog-close').on('click', function () {
    searchCountryValue = '美国'
    searchCompanyName = ''
    submitValuePhone = ''
    resetSelectRadio()
    $('input[name="free-charge-input"]').val('')
    $('input[name="free-charge-value"]').val('')
    $('input[name="free-charge-value-phone"]').val('')
    $('input[name="universal-value-phone"]').val('')
    $('input[name="oversea-comp-value"]').val('')
    $('input[name="oversea-value-phone"]').val('')
    $('.free-charge').hide()
    $('.universal-charge').hide()
    $('.oversea-charge').hide()
    $('.error').hide()
    $('.mask').hide()
  })
  // 关闭成功窗口
  $('.success-close').on('click', function () {
    searchCountryValue = '美国'
    $('input[name="free-charge-input"]').val('')
    $('input[name="free-charge-value"]').val('')
    $('input[name="free-charge-value-phone"]').val('')
    $('input[name="universal-value-phone"]').val('')
    $('input[name="oversea-comp-value"]').val('')
    $('input[name="oversea-value-phone"]').val('')
    resetSelectRadio()
    resetOverseaCheckbox()
    resetProblem()
    // 清空主界面更多海外公司服务的值
    $('.submit-success').hide()
    $('.mask').hide()
  })
  // ----- 免费核名 -----
  // 处理搜索框上方单选效果和单选值
  $('#select-radio')
    .children()
    .each(function () {
      $(this).on('click', function (e) {
        e.preventDefault()
        if (!$(this).hasClass('selected')) {
          $('#select-radio')
            .children()
            .each(function () {
              $(this).removeClass('selected')
            })
          $(this).addClass('selected')
          searchCountryValue = $(this).children('input').val()
        }
      })
    })
  // 弹框 点击显示弹框
  $('#verification-name').on('click', function () {
    $('.mask').show()
    // 传递选择的国家
    $('#free-charge-select').val(searchCountryValue)
    // 传递公司名称
    searchCompanyName = $('input[name="free-charge-input"]').val()
    $('input[name="free-charge-value"]').val(searchCompanyName)
    // 显示弹框
    $('.free-charge').show()
  })
  // 弹框里 点击发送免费核名服务
  $('#free-charge-submit').on('click', function () {
    searchCountryValue = $('#free-charge-select').val()
    searchCompanyName = $('input[name="free-charge-value"]').val()
    submitValuePhone = $('input[name="free-charge-value-phone"]').val()
    const isPhone = isPoneAvailable(submitValuePhone)
    if (isPhone) {
      $('.error').hide()
      $('.free-charge').hide()
      $('.submit-success').show()
    } else {
      $('.error').show()
    }
  })

  // ----- 全球热门国家/地区公司注册 -----
  // 点击打开弹窗
  $('.regist-btn').each(function () {
    $(this).on('click', function () {
      $('.mask').show()
      $('.universal-charge').show()
      $('#universal-select').val($(this).attr('data-value'))
    })
  })
  // 点击发送全球费用咨询
  $('#universal-submit').on('click', function () {
    universalSelectCountryValue = $('#universal-select').val()
    submitValuePhone = $('input[name="universal-value-phone"]').val()
    const isPhone = isPoneAvailable(submitValuePhone)
    if (isPhone) {
      $('.error').hide()
      $('.universal-charge').hide()
      $('.submit-success').show()
    } else {
      $('.error').show()
    }
  })
  // 其他国家咨询
  $('.universal-other').on('click', function () {
    $('.mask').show()
    $('.universal-charge').show()
    $('#universal-select').val('')
  })

  // ----- 海外企业服务，一站式解决方案 -----
  $('.oversea-wrap .handle-l .handle-item')
    .children()
    .each(function () {
      $(this)
        .find('a')
        .on('click', function (e) {
          e.preventDefault()
          const type = $(this).attr('data-type')
          const title = $(this).parent().parent().find('.title-wrap .title').text()
          // 如果 type = 1 则没有公司名称
          if (type === '1') {
            $('.oversea-charge').find('.comp-name').hide()
            $('.oversea-charge').find('.oversea-input-hold').attr('placeholder', '用于接收查询结果')
          } else {
            $('.oversea-charge').find('.oversea-input-hold').attr('placeholder', '用于接收核名结果')
            $('.oversea-charge').find('.comp-name').show()
          }
          $('.oversea-charge').find('.slogan').text(title)
          $('.mask').show()
          $('.oversea-charge').show()
        })
    })
  // 海外提交
  $('#oversea-submit').on('click', function () {
    overseaSelectCountryValue = $('#oversea-select').val()
    searchCompanyName = $('input[name="oversea-comp-value"]').val()
    submitValuePhone = $('input[name="oversea-value-phone"]').val()
    const isPhone = isPoneAvailable(submitValuePhone)
    if (isPhone) {
      $('.error').hide()
      $('.oversea-charge').hide()
      $('.submit-success').show()
    } else {
      $('.error').show()
    }
  })

  // 更多海外服务多选列表
  $('#oversea-checkbox')
    .children()
    .each(function () {
      // 控制多选样式选择
      $(this).on('click', function (e) {
        e.preventDefault()
        if ($(this).hasClass('selected')) {
          $(this).removeClass('selected')
        } else {
          $(this).addClass('selected')
        }
      })
    })

  // 更多海外服务电话提交
  $('#access-valuation').on('click', function () {
    submitValuePhone = $('input[name="access-valuation-phone"]').val()
    handleChexoboxValue()
    const isPhone = isPoneAvailable(submitValuePhone)
    if (isPhone) {
      $('.mask').show()
      $('.submit-success').show()
      $('.access-error').hide()
    } else {
      $('.access-error').show()
    }
  })

  // 海外公司注册常见问题电话提交
  $('#make-question').on('click', function () {
    problemText = $('#your-problem').val()
    submitValuePhone = $('input[name="online-value-phone"]').val()
    const isPhone = isPoneAvailable(submitValuePhone)
    if (isPhone) {
      $('.mask').show()
      $('.submit-success').show()
      $('.online-error').hide()
    } else {
      $('.online-error').show()
    }
  })
  // 成功案例切换显示
  $('.success-tab').each(function () {
    $(this).on('click', function () {
      $('.success-tab').each(function () {
        $(this).removeClass('tab-active')
      })
      $(this).addClass('tab-active')
    })
  })
  $('.inter-tab').on('click', function () {
    $('.inter-imgs').attr('style', 'display:flex')
    $('.oversea-imgs').hide()
  })
  $('.oversea-tab').on('click', function () {
    $('.oversea-imgs').attr('style', 'display:flex')
    $('.inter-imgs').hide()
  })
})
// 轮播图
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
  }
  // 如果需要滚动条
  // scrollbar: {
  //   el: '.swiper-scrollbar'
  // }
})
