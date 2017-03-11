// CODE ========================

var wH = $(window).height(),
  wW = $(window).width(),
  ua = navigator.userAgent,
  touchendOrClick = (ua.match(/iPad|iPhone|iPad/i)) ? "touchend" : "click",

  deviceAgent = navigator.userAgent.toLowerCase(),
  isMobile = deviceAgent.match(/(iphone|ipod|ipad)/);


$('[data-control="select"] ._value').text($(this).siblings('select').val());
$('[data-control="select"] select').on('change', function() {
  $(this).siblings('.select__value').find('._value').text(this.value);
});

$('.action_follow').on('click', function() {
  $(this).toggleClass('active')
})

$(window).scroll(function() {
  if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
    $('body').find('#launcher, .btn_feedback').css({
      bottom: $('.footer').outerHeight()
    })
  }

  else {
    $('body').find('#launcher, .btn_feedback').css({
      bottom: 0
    })
  }
});


// Tabs
$('._go_to_tab').on('shown.bs.tab', function (e) {
  var href = $(this).attr('href');

  $('.nav-tabs a[href="'+href+'"]').tab('show') ;
});

var url = document.location.toString();
var prefix = '#tab_';

if (url.match('#')) {
  $('.nav-tabs a[href="#' + url.split(prefix)[1] + '"]').tab('show');
}

$('.nav-tabs a').on('shown.bs.tab', function (e) {
  window.location.hash = prefix + e.target.hash.split('#')[1] ;
});

$('.btn_menu').on('click', function(e) {
  e.preventDefault();
  e.stopPropagation();

  $('body').addClass('body--menu_opened');
  $('.sidebar_menu').addClass('sidebar_menu--open');
});

$('.sidebar_menu').on('click', function(e) {
  e.stopPropagation();
});

$('body, .btn_close_menu, .menu_overlay').on('click', function() {
  $('body').removeClass('body--menu_opened');
  $('.sidebar_menu').removeClass('sidebar_menu--open');
});