define([], function() {
  let tbody = $('.t_body');
  let $localsid = [];
  let $localnum = [];
  // 从localStorage中获取数据 sid和商品件数 判断是否存在
  if (localStorage.getItem('localsid') && localStorage.getItem('localnum')) {
    let $localsid = localStorage.getItem('localsid').split(',');
    let $localnum = localStorage.getItem('localnum').split(',');
    $.each($localsid, function(index, value) {
      // 通过sid数据从数据库获取商品详情并渲染
      $.ajax({
        type: 'get',
        url: 'http://localhost/src/php/shopcar.php',
        data: {
          sid: value
        },
        dataType: 'json'
      }).done(function(data) {
        // 渲染购物车页面 
        let response = data[0];
        // console.log(data[0]);
        let carstr = `
        <tr sid="${response.sid}">
          <td><input type="checkbox" class="cks"></td>
          <td>
          <img src="${response.url}" alt="">
          <sapn>${response.title}<span>
          </td>
          <td><span class="single">￥${response.price}</span></td>
          <td>
          <button class="sub">-</button>
          <input type="text" class="count" value="${$localnum[index]}">
          <button class="add">+</button>
          </td>
          <td class="total">￥${(response.price*$localnum[index]).toFixed(2)}</td>
          <td>
          <a class="del" href="javascript:;">删除</a>
          </td>
        </tr>
        `;
        // 把元素添加到body中
        tbody.append(carstr);
      })
    })
    let ckAll = $('.ckAll'); //全选
    let count = $('.brance-count em');
    let total = $('.bar-right strong');
    let delAll = $('.delAll'); //删除所有勾选的

    //全选
    ckAll.on('click', function() {
        $('.cks').prop('checked', $(this).prop('checked'));
        ckAll.prop('checked', $(this).prop('checked'));
        cale();
      })
      //单选
    tbody.on('click', '.cks', function() {
        let $num = 0;
        let flag = true;
        let $total = 0;
        let cks = $('.cks');
        let totalprice = 0;
        cks.each(function(index, value) {
          //判断是否所有选项都勾选了
          if ($(value).prop('checked') == false) {
            flag = false;
          } else {
            let trElement = $(value).parent().parent();
            $num += parseFloat(trElement.find('.count').val());
            totalprice = trElement.find('.total').html().substring(1);
            $total += +totalprice;
          }
        })
        total.html(`￥` + $total.toFixed(2));
        count.html($num);
        if (flag) {
          ckAll.prop('checked', true);
        } else {
          ckAll.prop('checked', false);
        }
      })
      // 删除
    tbody.on('click', '.del', function() {
        let $sid = $(this).parent().parent().attr('sid');
        $(this).parent().parent().remove();
        cale();
        let $index = $localsid.indexOf($sid);
        $localsid.splice($index, 1);
        $localnum.splice($index, 1);
        localStorage.setItem('localsid', $localsid);
        localStorage.setItem('localnum', $localnum);
        console.log($('.cks'));
        if ($('.cks').length == 0) {
          window.location.reload();
        }
      })
      // 删除所有勾选项
    delAll.on('click', function() {
      $('.cks').each(function(index, value) {
        if ($(value).prop('checked') === true) {
          $(value).parent().parent().remove();
          let $sid = $(value).parent().parent();
          let $index = $localsid.indexOf($sid);
          $localsid.splice($index, 1);
          $localnum.splice($index, 1);
          localStorage.setItem('localsid', $localsid);
          localStorage.setItem('localnum', $localnum);
        }
      })
      cale();
      if ($('.cks').length == 0) {
        console.log(111);
        window.location.reload();
      }
    })

    // 点击按钮增加数量
    tbody.on('click', '.add', function() {
        let totalonetr = $(this).parent().parent().find('.total');
        let singlepri = $(this).parent().parent().find('.single').html().substring(1);
        let counts = parseInt($(this).prev().val());
        $(this).prev().val(++counts);
        let $sid = $(this).parent().parent().attr('sid');
        let $index = $localsid.indexOf($sid);
        $localnum[$index] = counts;
        localStorage.setItem('localnum', $localnum);
        totalonetr.html(`￥${(counts*singlepri).toFixed(2)}`);
        cale();
      })
      // 点击按钮减少数量
    tbody.on('click', '.sub', function() {
      let totalonetr = $(this).parent().parent().find('.total');
      let singlepri = $(this).parent().parent().find('.single').html().substring(1);
      let counts = parseInt($(this).next().val());
      if (counts < 2) {
        return false;
      }
      $(this).next().val(--counts);
      let $sid = $(this).parent().parent().attr('sid');
      let $index = $localsid.indexOf($sid);
      $localnum[$index] = counts;
      localStorage.setItem('localnum', $localnum);
      // 每一类商品的总价格 既每一行的小计
      totalonetr.html(`￥${(counts*singlepri).toFixed(2)}`);
      cale();
    })

    // 输入数量
    tbody.on('keyup', '.count', function() {
        if (isNaN($(this).val()) || $(this).val() <= 0) {
          $(this).val(1);
        } else {
          // $(this).val(parseInt($(this).val()));
        }
        let totalonetr = $(this).parent().parent().find('.total');
        let singlepri = $(this).parent().parent().find('.single').html().substring(1);
        let $sid = $(this).parent().parent().attr('sid');
        let counts = parseInt($(this).val());
        let $index = $localsid.indexOf($sid);
        $localnum[$index] = counts;
        localStorage.setItem('localnum', $localnum);
        // 每一类商品的总价格
        totalonetr.html(`￥${(counts*singlepri).toFixed(2)}`);
        cale();

      })
      // 计算  总件数 总价格
    function cale() {
      let $num = 0;
      let flag = true;
      let $total = 0;
      let cks = $('.cks');
      let totalprice = 0;
      cks.each(function(index, value) {
        if ($(value).prop('checked') == false) {
          flag = false;
        } else {
          let trElement = $(value).parent().parent();
          $num += parseFloat(trElement.find('.count').val());
          totalprice = trElement.find('.total').html().substring(1);
          $total += +totalprice;
        }
      })
      total.html(`￥` + $total.toFixed(2));
      count.html($num);
      if (flag) {
        ckAll.prop('checked', true);
      } else {
        ckAll.prop('checked', false);
      }
    }
  } else {
    tbody.html(`<tr><td></td><td>
    购物车为空,<a href="http://localhost/src/index1.html">去添加</a>
    </td><td></td><td></td><td></td><td></td></tr>`);
    tbody.find('td').css({
      textAlign: 'right',
      fontSize: '16px',
    })
  }
})