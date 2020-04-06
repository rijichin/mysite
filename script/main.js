require.config({
  // baseUrl: '',
  paths: {
    'jquery': 'https://cdn.bootcss.com/jquery/1.12.4/jquery.min',
    'jquery_lazyload': 'https://cdn.bootcss.com/jquery_lazyload/1.9.7/jquery.lazyload.min',
    'pages': './jquery.sPage',
    'cookie': './addremovecookie',
    'common': './common',
    'sha1': './sha1'

  },
  shim: {
    'jquery_lazyload': {
      deps: ['jquery']
    },
    'pages': {
      deps: ['jquery']
    },
    'common': {
      deps: ['cookie', 'jquery']
    }
  }
});
// require(['tmmodule']);
require(['jquery', 'jquery_lazyload', 'pages', 'cookie', 'common', 'sha1'], function() {
  let $targetpage = $('#currentpage').attr('targetpage');
  require([$targetpage]);
})