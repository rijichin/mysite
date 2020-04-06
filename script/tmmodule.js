define([], function() {
  tmmodule: (function() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost/src/php/render.php?talk2=tm', true);
    xhr.send(null);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          let data = JSON.parse(xhr.responseText);
          let tmGuoji = document.querySelectorAll('.tm_guoji');
          let tmstr = '<ul>';
          data.forEach(element => {
            //   console.log(element);
            tmstr += `
          <li>
          <a href="#">
          <img class="lazy" data-original="${element.imgurl}" alt="">
          <p>${element.title}</p>
          <span>￥${element.price}</span>
          </a>  
        </li>
          `
          });
          tmstr += '</ul>';
          for (let i = 0; i < tmGuoji.length; i++) {
            tmGuoji[i].innerHTML = tmstr;
          }
          $('img.lazy').lazyload({
            effect: 'fadeIn'
          })
        }
      }
    }
  })()
})