import Swiper from './assets/js/swiper-bundle.min.js'
const $ = require('jquery')

export default function init() {
  let freeChargeValue = undefined // 免费核名搜索内容
  let freeChargeValuePhone = undefined // 免费核名电话
  let freeChargeCountryValue = '' // 免费核名国家
  let universalValuePhone = '' // 免费全球注册电话
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
    // ----- 免费核名 -----
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
            freeChargeCountryValue = $(this).children('input').val()
          }
        })
      })
    // 免费核名服务点击事件
    $('#verification-name').on('click', function () {
      $('.mask').show()
      $('#free-charge-select').val(freeChargeCountryValue)
      freeChargeValue = $('input[name="free-charge-input"]').val()
      $('input[name="free-charge-value"]').val(freeChargeValue)
      $('.free-charge').show()
    })
    // 点击发送免费核名服务
    $('#free-charge-submit').on('click', function () {
      freeChargeValuePhone = $('input[name="free-charge-value-phone"]').val()
      const isPhone = isPoneAvailable(freeChargeValuePhone)
      if (isPhone) {
        $('.error').hide()
        $('.free-charge').hide()
        $('.submit-success').show()
      } else {
        $('.error').show()
      }
    })
    // 关闭弹框
    $('.dialog-close').on('click', function () {
      freeChargeValue = undefined
      freeChargeValuePhone = undefined
      $('input[name="free-charge-value"]').val('')
      $('input[name="free-charge-value-phone"]').val('')
      $('input[name="universal-value-phone"]').val('')
      $('input[name="oversea-value-phone"]').val('')
      $('.free-charge').hide()
      $('.universal-charge').hide()
      $('.oversea-charge').hide()
      $('.error').hide()
      $('.mask').hide()
    })
    // 关闭成功窗口
    $('.success-close').on('click', function () {
      $('input[name="free-charge-value"]').val('')
      $('input[name="free-charge-value-phone"]').val('')
      $('input[name="universal-value-phone"]').val('')
      $('input[name="oversea-value-phone"]').val('')
      $('.submit-success').hide()
      $('.mask').hide()
    })

    // ----- 全球热门国家/地区公司注册 -----
    // 点击发送海外注册费用咨询
    $('.regist-btn').each(function () {
      $(this).on('click', function () {
        $('.mask').show()
        $('.universal-charge').show()
        $('#universal-select').val($(this).attr('data-value'))
      })
    })
    // 点击发送全球费用咨询
    $('#universal-submit').on('click', function () {
      universalValuePhone = $('input[name="universal-value-phone"]').val()
      const isPhone = isPoneAvailable(universalValuePhone)
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
            const title = $(this).parent().parent().find('.title-wrap .title').text()
            $('.oversea-charge').find('.slogan').text(title)
            $('.mask').show()
            $('.oversea-charge').show()
          })
      })
    // 海外提交
    $('#oversea-submit').on('click', function () {
      universalValuePhone = $('input[name="oversea-value-phone"]').val()
      const isPhone = isPoneAvailable(universalValuePhone)
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
        $(this).on('click', function (e) {
          e.preventDefault()
          if ($(this).hasClass('selected')) {
            $(this).removeClass('selected')
          } else {
            $(this).addClass('selected')
          }
        })
      })
    $('#access-valuation').on('click', function () {
      freeChargeValuePhone = $('#access-valuation-phone').val()
      const isPhone = isPoneAvailable(freeChargeValuePhone)
      if (isPhone) {
        $('.mask').show()
        $('.submit-success').show()
      } else {
        alert('请输入正确手机号')
      }
    })
    $('#make-question').on('click', function () {
      freeChargeValuePhone = $('input[name="online-value-phone"]').val()
      const isPhone = isPoneAvailable(freeChargeValuePhone)
      if (isPhone) {
        $('.mask').show()
        $('.submit-success').show()
      } else {
        alert('请输入正确手机号')
      }
      // console.log($('#your-problem').val())
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
}
