// cookie的方法
let jscookie = {
  add: function(key, value, day) {
    let date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = `${key}=${encodeURIComponent(value)};expires=${date};path=/src`;
  },
  getCookie: function(key) {
    let cookiearr = decodeURIComponent(document.cookie).split('; ');
    for (let i = 0; i < cookiearr.length; i++) {
      let newarr = cookiearr[i].split('=');
      if (key === newarr[0]) {
        return newarr[1];
      }
    }
  },
  remove: function(key) {
    this.add(key, '', -1);
  }
}