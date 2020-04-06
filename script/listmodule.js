define([], function() {
  listmodule: (function() {
    let $prov = $('#prov');
    let $city = $('#city');
    let $country = $('#country');
    let $cityItem = null;
    let $countryItem = null;

    // 三级联动
    $.ajax({
      type: 'get',
      url: 'http://localhost/src/json/city.json',
      dataType: 'json'
    }).done(function(response) {
      $.each(response, function(index, value) {
        $prov.append(`<option value="${index}">${value.name}</option>`)
      })
      $prov.on('change', function() {
        $city.html('<option value="">==选择城市==</option>');
        $country.html('<option value="">==选择区县==</option>');
        $cityItem = response[$(this).val()]['city'];
        $.each($cityItem, function(index, value) {
          $city.append(`<option value="${index}">${value.name}</option>`);
        })
      })
      $city.on('change', function() {
        $country.html('<option value="">==选择区县==</option>');
        $countryItem = $cityItem[$(this).val()]['districtAndCounty'];
        $.each($countryItem, function(index, value) {
          $country.append(`<option value="${index}">${value}</option>`);
        })
      })
    })
  })();
  listrender: (function() {
    switchPage()

    function switchPage(page) {
      var p = page || 1;
      $.ajax({
        type: "POST",
        url: "http://localhost/src/php/listrender.php",
        data: {
          page: p,
          pageSize: 10
        },
        dataType: "json",
        success: function(data) {
          //数据处理  分页插件
          let $oUl = $('.list-item ul');
          let liststr = '';
          $.each(data, function(index, value) {
            liststr += `<li>
            <a href="./detail.html?sid=${value.sid}">
            <img class="lazy"  data-original="${value.url}" alt="">
            <span class="price">￥${value.price}</span>
            <p>${value.title}</p>
            <span class="sail">月成交: <em>${value.sail}</em> 笔</span>
            </a>
            </li>`
          })
          $oUl.html(liststr);
          $('img.lazy').lazyload({ effect: 'fadeIn' });
          let defaultBtn = $('.list-item h3 a').eq(0); //默认排序
          let popularBtn = $('.list-item h3 a').eq(1);
          let priceBtn = $('.list-item h3 a').eq(2); //按价格排序
          let sailBtn = $('.list-item h3 a').eq(3); //按销量排序
          let numprice = 0;
          let numsail = 0;
          let listArray = []; //设置一个数组 用来接收 页面元素
          let default_array = []; //设置一个数组 用来接收 页面元素
          let lists = $oUl.children();
          lists.each(function(index, value) {
              listArray[index] = value;
              default_array.push(value);
            })
            // 默认排序
          defaultBtn.on('click', function() {
            $oUl.empty();
            default_array.forEach(function(value, index) {
              $oUl.append(value);
            })
            $('img.lazy').lazyload({ effect: 'fadeIn' });
          })
          priceBtn.on('click', function() {
            numprice++; //设置一个变量 单数/双数  降序升序
            sorts('.price', numprice);

          })
          sailBtn.on('click', function() {
            numsail++; //设置一个变量 单数/双数  降序升序
            sorts('.sail', numsail);
          })


          // 排序 按照价格或者销量
          function sorts(ways, numprice) {

            for (let i = 0; i < listArray.length - 1; i++) {
              for (let j = 0; j < listArray.length - i - 1; j++) {
                // 获取前一个数的价格
                let prev = parseFloat($(listArray[j]).find(ways).html().substring(1));
                // 获取后一个数的价格
                let next = parseFloat($(listArray[j + 1]).find(ways).html().substring(1));
                if ($(listArray[j]).find(ways).children().length > 0) {
                  prev = parseFloat($(listArray[j]).find(ways).children().html());
                  next = parseFloat($(listArray[j + 1]).find(ways).children().html());
                }
                // 如果点击的是单数 降序
                if (numprice % 2 != 0) {
                  if (prev < next) {
                    let temp = listArray[j];
                    listArray[j] = listArray[j + 1];
                    listArray[j + 1] = temp;
                  }
                } else {
                  // 升序
                  if (prev > next) {
                    let temp = listArray[j];
                    listArray[j] = listArray[j + 1];
                    listArray[j + 1] = temp;
                  }
                }

              }
            }
            $oUl.empty();
            listArray.forEach(function(value, index) {
              $oUl.append(value);
            })
            $('img.lazy').lazyload({ effect: 'fadeIn' });
          }
          // 调用分页插件          
          $("#myPage").sPage({
            page: p, //当前页码，必填
            total: 30, //数据总条数，必填
            pageSize: 10, //每页显示多少条数据，默认10条
            totalTxt: "共{total}条", //数据总条数文字描述，{total}为占位符，默认"共{total}条"
            showTotal: true, //是否显示总条数，默认关闭：false
            showSkip: true, //是否显示跳页，默认关闭：false
            showPN: true, //是否显示上下翻页，默认开启：true
            prevPage: "上一页", //上翻页文字描述，默认“上一页”
            nextPage: "下一页", //下翻页文字描述，默认“下一页”
            backFun: function(page) {
              //点击分页按钮回调函数，返回当前页码
              switchPage(page);
            }
          });
        },
        error: function(e) {
          console.log(e);
        }
      });
    }
  })();
})