(function($) {
  let $search = $('.search-in');
  let $list = $('.search-ul');
  $search.on('input', function() {
      let $data = $(this).val();
      // 获取淘宝搜索数据 并渲染
      $.ajax({
        type: 'get',
        async: 'true',
        url: `https://suggest.taobao.com/sug?code=utf-8&_ksTS=1583481520693_813&callback=taobao&k=1&area=c2c&bucketid=9`,
        data: {
          //把搜索的数据传入 获取相应的值
          q: $data
        },
        // 设置 数据类型
        dataType: 'jsonp',
        success: function(data) {
          let $arrdata = data.result;
          if ($arrdata.length > 0) {
            $list.css('border', '1px solid #ccc');
            let str = '';
            for (let value of $arrdata) {
              str += ` <li>
              <a href="#">${value[0]}</a>
              </li>`;
            }
            $list.html(str);
          } else {
            $list.css('border', '1px solid transparent');
            $list.html('');
          }
        }
      })
    })
    // 搜索展示框  输入信息后展示搜索信息
  $list.on('mouseover', 'li', function() {
    $(this).find('a').css({
      background: '#ff0036',
      color: '#fff'
    }).end().siblings().find('a').css({
      background: '#fff',
      color: '#000'
    })
  })
})($);
(function() {
  let $meanItem = $('.mean_item');
  let $meanItemCon = $('.mean_item_content');
  let $meanItemodule = $('.mean_item_module');
  // 鼠标移动到商品分类上面
  $meanItem.on('mouseover', function() {
    // 对应的模块展示出来
    $meanItemodule.eq($(this).index()).css({
      visibility: 'visible'
    });
    // 鼠标移除事件
  }).on('mouseout', function() {
    $meanItemodule.eq($(this).index()).css({
      visibility: 'hidden'
    });
  })
  $meanItemodule.on('mouseover', function() {
    $(this).css({
      visibility: 'visible'
    })
  }).on('mouseout', function() {
    $(this).css({
      visibility: 'hidden'
    })
  })
})();
// 轮播图渲染
(function() {
  let $banner = $('#banner');
  let $banUl = $('.banner ul');
  let $switchBtn = $('.banner ol');
  // 从数据库获取轮播图片数据
  $.ajax({
    type: 'get',
    url: 'http://localhost/src/php/render.php',
    data: {
      talk: 'banner'
    },
    dataType: 'json'
  }).done(function(response) {
    console.log(response);
    let $bannerStr = '';
    for (let i = 0; i < response.length; i++) {
      // 创建小条块 用于轮播图切换
      let $oli = `<li data="${response[i].background}"></li>`;
      $switchBtn.append($oli);
      $('.banner ol').children().eq(0).addClass('bkColor');
      $banner.css('background', $('ol li:eq(0)').attr('data'));
      $bannerStr += `<li>
    <a href="#">
      <img src="${response[i].banner}" class="ban_img" alt="">
    </a>`;
      if (response[i].ad1 && response[i].ad2) {
        $bannerStr += `
      <a href="#">
      <img src="${response[i].ad1}" class="ad1" alt="">
      </a>
      <a href="#">
      <img src="${response[i].ad2}" class="ad2" alt="">
      </a>`
      }
      $bannerStr += `</li>`;
    }
    $banUl.html($bannerStr);
    let $cloneEle = $banUl.children().eq(0).clone(true);
    $banUl.append($cloneEle);
    // console.log($banUl.children().eq(0).find('img').attr('src'))
    let arrL = $('.arr-left');
    let arrR = $('.arr-right');
    let num = 0;
    // 轮播图下方的小条，移动到上面改变轮播图页
    $switchBtn.on('mouseover', 'li', function() {
        $(this).addClass('bkColor').siblings().removeClass('bkColor');
        num = $(this).index();
        let $leftwidth = num * $('.ban_img').width();
        $banUl.stop().animate({
          left: -$leftwidth
        });
        $banner.css('background', $(this).attr('data'));
      })
      //点击右箭头事件，点击后banner图片左移
    arrR.on('click', function() {
        if (num == $banUl.children().length - 1) {
          num = 0;
          $banUl.css('left', 0);
        }
        num++;
        $switchBtn.children().eq(num).addClass('bkColor').siblings().removeClass('bkColor');
        let $leftwidth = num * $('.ban_img').width();
        $banUl.stop().animate({
          left: -$leftwidth
        });
        if (num == $banUl.children().length - 1) {
          $switchBtn.children().eq(0).addClass('bkColor').siblings().removeClass('bkColor');
          $banner.css('background', $switchBtn.find('li').eq(0).attr('data'));
        }
        $banner.css('background', $switchBtn.find('li').eq(num).attr('data'));
      })
      // 自动触发点击右箭头
    let timer = setInterval(function() {
        arrR.trigger('click');
      }, 3000)
      // 鼠标移入banner，清除定时器
    $('.banner').on('mouseover', function() {
      clearInterval(timer);
    }).on('mouseout', function() {
      timer = setInterval(function() {
        arrR.trigger('click');
      }, 3000)
    })
  }).fail(function(err) {
    console.log(err);
  })
})();


// 商品展示部分渲染
// 品牌闪购 聚名牌
(function() {
  $.ajax({
    type: 'get',
    url: 'http://localhost/src/php/render.php',
    data: {
      talk1: 'brands'
    },
    dataType: 'json'
  }).done(function(response) {
    // console.log(response);
    let $brand = $(".brand");
    $brandstr = '';
    $.each(response, function(index, value) {
      $brandstr += `
      <div class="brand_con">
      <div class="brand_hd">
      <span>${value.bd_title}</span>
      <span>${value.en_brand}</span>
      <a href="#" class="more">更多</a>
      </div>
      <a href="#">
      <img class="lazy" data-original="${value.url}" alt="">
      </a>
      </div>
      `;
    })
    $brand.html($brandstr);
  })
})();


// 侧边楼梯导航
(function() {
  let $stairs = $('.stairs'); //楼梯
  let $stairli = $('.stairs li');
  let $brandItem = $('.brand-item'); //楼层
  // console.log($brandItem);
  let $tops = $(window).scrollTop();
  if ($tops > 1000) {
    $stairs.css('display', 'block');
  } else {
    $stairs.css('display', 'none');
  }
  scrolls();
  $(window).on('scroll', function() {
    scrolls();
  })
  $stairli.on('click', function() {
    $(window).off('scroll');
    //跳转对应楼层的时候取消滚动事件
    $(this).css('backgroundColor', $(this).attr('data-col')).siblings().css('backgroundColor', '');
    let $index = $(this).index();
    $('html,body').animate({
      scrollTop: $brandItem.eq($index).offset().top
    }, 1000, function() {
      // 跳转结束后开启滚动事件
      $(window).on('scroll', function() {
        scrolls();
      })
    })
  })

  function scrolls() {
    $stairli.css('background', '');
    $tops = $(window).scrollTop();
    if ($tops > 1000) {
      $stairs.fadeIn(1000);
    } else {
      $stairs.fadeOut(1000);
    }
    //遍历楼层
    //思想： 当scrollTop的值小于楼层的offset().top+楼层的height()/2时
    //设置楼梯的背景颜色
    $brandItem.each(function(index, value) {
      // console.log(index, value)
      if ($tops < $(value).offset().top + $(value).height() / 2) {
        $stairli.eq(index).css('background', $stairli.eq(index).attr('data-col'))
          // return false;一个楼梯设置背景色
        return false;
      }
    })
  }
  // 点击侧边栏 跳转到对应楼层
  $('.stair_top').on('click', function() {
    $('html,body').animate({
      scrollTop: 0
    });
  })
})();