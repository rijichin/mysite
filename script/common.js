define([], function() {
  // 获取cookie的值
  let username = jscookie.getCookie('username');
  let password = jscookie.getCookie('password');
  let $login = $('.login-registry');
  let $personal = $('.personal');
  let $exit = $('.person-exit');
  console.log(username, password);
  // 如果cookie中username和password存在，那么显示个人中心
  if (username && password) {
    $login.css('display', 'none');
    $personal.css('display', 'block');
    $('.person-top').html(`您好！${username}`);
    $('.personal').on('mouseover', function() {
      $('.person-detail').css('display', 'block');
    }).on('mouseout', function() {
      $('.person-detail').css('display', 'none');
    })
  }
  $exit.on('click', function() {
    jscookie.remove('username');
    jscookie.remove('password');
    window.location.reload();
  })
})