define([], function() {
  let $sid = location.search.substring(1).split('=')[1];
  $.ajax({
    type: 'get',
    url: 'http://localhost/src/php/detail.php',
    data: {
      sid: $sid
    },
    dataType: 'json'
  }).done(function(data) {
    //   渲染detail页面
    let $small = $('.small');
    let $smallpic = $('.small-pic');
    let $big = $('.big');
    let $bigpic = $('.big-pic');
    let $speclist = $('.spec-list');
    let $mark = $('.mark');
    let $arrowl = $('.arrow-l');
    let $arrowr = $('.arrow-r');
    let $detailInfo = $('.detail-info-title');
    let $detailpri = $('.detail-pri');
    let $carInto = $('.car-Into');
    let $numcar = $('.buy-num');
    let num = 5;
    $smallpic.attr('src', `${data[0].url}`);
    $bigpic.attr('src', $smallpic.attr('src'));
    let $specdata = data[0].smurl.split(',');
    let specstr = '';
    $.each($specdata, function(index, value) {
      specstr += `
        <li>
        <img src="${value}" alt="">
        </li>
        `
    })
    $carInto.attr('sid', `${data[0].sid}`)
    $detailInfo.html(`${data[0].title}`);
    $detailpri.html(`￥${data[0].price}`);
    $speclist.html(specstr);
    $speclist.on('click', 'li', function() {
      let $src = $(this).find('img').attr('src');
      $smallpic.attr('src', $src);
      $bigpic.attr('src', $smallpic.attr('src'));
    })
    let $lis = $('.spec-list li');
    //右击事件
    $arrowr.on('click', function() {
        if (num < $lis.length) {
          num++;
          $arrowl.css('color', '#ccc')
          $speclist.css({
            left: -(num - 5) * $lis.eq(0).outerWidth(true)
          })
          if (num == $lis.length) {
            $arrowr.css('color', '#f5f5f5')
          }
        }
      })
      //左击事件
    $arrowl.on('click', function() {
        if (num > 5) {
          num--;
          $arrowr.css('color', '#ccc')
          $speclist.css({
            left: -(num - 5) * $lis.eq(0).outerWidth(true)
          })
          console.log(num)
          if (num == 5) {
            $arrowl.css('color', '#f5f5f5')
          }
        }
      })
      // 输入数量
    $numcar.on('keyup', function() {
      if (isNaN($(this).val()) || $(this).val() < 0) {
        $(this).val(1);
      } else if ($(this).val() == 0) {
        $(this).val(1);
      } else {
        $(this).val(parseInt($(this).val()));
      }
    })
    let $localsid = [];
    let $localnum = [];
    if (localStorage.getItem('localsid') && localStorage.getItem('localnum')) {
      $localsid = localStorage.getItem('localsid').split(',');
      $localnum = localStorage.getItem('localnum').split(',');
    } else {
      $localsid = [];
      $localnum = [];
    }
    let username = jscookie.getCookie('username');
    let password = jscookie.getCookie('password');
    $carInto.on('click', function() {
        if (username && password) {
          let $sid = $(this).attr('sid');
          if ($localsid.indexOf($sid) === -1) {
            $localsid.push($sid);
            $localnum.push($numcar.val());
            localStorage.setItem('localsid', $localsid);
            localStorage.setItem('localnum', $localnum);
          } else {
            let $index = $localsid.indexOf($sid);
            let $value = $localnum[$index];
            $localnum[$index] = parseInt($value) + parseInt($numcar.val());
            localStorage.setItem('localnum', $localnum);
          }
          let $message = $('.message');
          $message.fadeIn(1000).delay(2000).fadeOut();
        } else {
          window.location.replace('http://localhost/src/html/login.html');
        }
      })
      // 鼠标移入小盒子 显示mark和大图片盒子
    $small.on('mouseover', function() {
      $mark.css('display', 'block');
      $big.css('display', 'block');
      let $smwidth = $small.width();
      let $smheight = $small.height();
      let $bigwidth = $big.width();
      let $bigheight = $big.height();
      let $bigpicwidth = $bigpic.width();
      let $bigpicheight = $bigpic.height();
      //   mark盒子的宽高
      let $markwidth = $smwidth * $bigwidth / $bigpicwidth;
      let $markheight = $smheight * $bigheight / $bigpicheight;
      $mark.css({
          width: $markwidth,
          height: $markheight
        })
        //   鼠标移动事件
      $(document).on('mousemove', function(e) {
        let ev = e || window.event;
        // mark盒子的偏移量
        let $leftvalue = ev.pageX - $small.offset().left - $mark.width() / 2;
        $leftvalue = $leftvalue < 0 ? 0 : $leftvalue;
        $leftvalue = $leftvalue > ($smwidth - $mark.width()) ? ($smwidth - $mark.width()) : $leftvalue;
        let $topvalue = ev.pageY - $small.offset().top - $mark.height() / 2;
        $topvalue = $topvalue < 0 ? 0 : $topvalue;
        $topvalue = $topvalue > ($smheight - $mark.height()) ? ($smheight - $mark.height()) : $topvalue;
        $mark.css({
            left: $leftvalue,
            top: $topvalue
          })
          //mark移动的距离/大图移动距离=mark最大移动距离/大图最大移动距离
        let $scale = ($bigpicwidth - $bigwidth) / ($smwidth - $mark.width());
        $bigpic.css({
          left: -$leftvalue * $scale,
          top: -$topvalue * $scale
        })
      })
    }).on('mouseout', function() {
      $mark.css('display', 'none');
      $big.css('display', 'none');
    })
  })
})