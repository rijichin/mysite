define([], function() { //登录模块
  let $nickname = $('#exampleInputnickname');
  let $password = $('#exampleInputPassword1');
  let $submit = $('#oform');
  let flag1 = true;
  let flag2 = true;
  // 失去焦点
  $nickname.on('blur', function() {
    if ($nickname.val().trim() == '') {
      $nickname.next('span').html('昵称不能为空');
      $nickname.next('span').css('color', '#ff0036');
      flag1 = false;
    } else {
      flag1 = true;
    }
  })
  $password.on('blur', function() {
      if ($password.val().trim() == '') {
        $password.next('span').html('密码不能为空');
        $password.next('span').css('color', '#ff0036');
        flag2 = false;
      } else {
        flag2 = true;
      }
    })
    // 提交
  $submit.on('submit', function(e) {
    let ev = e || window.event;
    ev.preventDefault();
    $nickname.trigger('blur');
    $password.trigger('blur');
    if (flag1 && flag2) {
      $.ajax({
        type: 'post',
        url: 'http://localhost/src/php/login.php',
        data: {
          nickname: $nickname.val(),
          password: $password.val()
        }
      }).done(function(response) {
        // console.log(response)
        if (response === 'exist') { //如果查找到 添加经cookie 
          jscookie.add('username', $nickname.val(), 7);
          jscookie.add('password', hex_sha1($password.val()), 7);
          window.location.replace('http://localhost/src/index1.html');

        }
      })
    }
  })
})