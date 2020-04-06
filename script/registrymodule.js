// 注册模块
define([], function() {
  let $nickname = $('#exampleInputnickname');
  let $email = $('#exampleInputEmail1');
  let $password = $('#exampleInputPassword1');
  let $repass = $('#exampleInputPassword2');
  let $checkbox = $('.checkbox input');
  let $submit = $('#oform');
  // 设置开关 若flag变为true后方可提交
  let flag1 = false;
  let flag2 = false;
  let flag3 = false;
  let flag4 = false;
  // 失去焦点事件
  $nickname.on('blur', function() {
      if ($nickname.val().trim() == '') {
        $nickname.next('span').html('昵称不能为空');
        $nickname.next('span').css('color', '#ff0036');
        flag1 = false;
      } else {
        let $value = $nickname.val();
        let reg = /^([\u4e00-\u9fa5]{2,4}|[a-zA-Z]{6,12})$/;
        $.ajax({
          type: 'post',
          url: 'http://localhost/src/php/registry.php',
          data: {
            username: $value
          }
        }).done(function(response) {
          //   console.log(response)
          if (response === '1') {
            $nickname.next('span').html('该昵称已被注册');
            $nickname.next('span').css('color', '#ff0036');
          } else {
            if (reg.test($nickname.val())) {
              $nickname.next('span').html('昵称正确');
              $nickname.next('span').css('color', 'green');
              flag1 = true;
            } else {
              $nickname.next('span').html('昵称只能为中文或者字符，中文长度2-4位，英文6-12');
              $nickname.next('span').css('color', '#ff0036');
              flag1 = false;
            }
          }
        })
      }
    })
    //   $email.on('focus', function() {
    //   })
  $email.on('blur', function() {
    if ($email.val().trim() == '') {
      $email.next('span').html('昵称不能为空');
      $email.next('span').css('color', '#ff0036');
      flag2 = false;
    } else {
      $value = $email.val();
      let reg = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
      if (reg.test($email.val())) {
        $email.next('span').html('邮箱正确');
        $email.next('span').css('color', 'green');
        flag2 = true;
      } else {
        $email.next('span').html('邮箱格式不正确');
        $email.next('span').css('color', '#ff0036');
        flag2 = false;
      }
    }
  })
  $password.on('blur', function() {
    if ($password.val().trim() == '') {
      $password.next('span').html('密码不能为空');
      $password.next('span').css('color', '#ff0036');
      flag3 = false;
    } else {
      $value = $password.val();
      let reg = /^[a-zA-Z0-9]{6,12}$/;
      if (reg.test($password.val())) {
        $password.next('span').html('密码正确');
        $password.next('span').css('color', 'green');
        flag3 = true;
        if ($repass.val() !== '') {
          $repass.trigger('blur');
        }
      } else {
        $password.next('span').html('密码格式不正确');
        $password.next('span').css('color', '#ff0036');
        flag3 = false;
      }
    }
  })
  $repass.on('blur', function() {
      if ($repass.val().trim() == '') {
        $repass.next('span').html('密码不能为空');
        $repass.next('span').css('color', '#ff0036');
        flag4 = false;
      } else {
        $value = $repass.val();
        if ($repass.val() === $password.val()) {
          $repass.next('span').html('两次密码一致');
          $repass.next('span').css('color', 'green');
          flag4 = true;
        } else {
          $repass.next('span').html('两次密码输入不一致');
          $repass.next('span').css('color', '#ff0036');
          flag4 = false;
        }
      }
    })
    // 提交注册信息
  $submit.on('submit', function(e) {

    let ev = e || window.event;
    ev.preventDefault();
    $nickname.trigger('blur');
    $email.trigger('blur');
    $password.trigger('blur');
    $repass.trigger('blur');
    if (flag1 && flag2 && flag3 && flag4 && $checkbox.prop('checked')) {
      $.ajax({
        type: 'post',
        url: 'http://localhost/src/php/registry.php',
        data: {
          nickname: $nickname.val(),
          email: $email.val(),
          password: $password.val()
        }
      }).done(function(response) {
        if (response === 'success') {
          window.location.replace('http://localhost/src/html/login.html');
        }
      })
    }
  })
})