// CODE ========================

var wH = $(window).height(),
  wW = $(window).width(),
  ua = navigator.userAgent,
  touchendOrClick = (ua.match(/iPad|iPhone|iPad/i)) ? "touchend" : "click",

  deviceAgent = navigator.userAgent.toLowerCase(),
  isMobile = deviceAgent.match(/(iphone|ipod|ipad)/);

function initEventsOnClick() {
  $('[data-control="select"] ._value').text($(this).siblings('select').val());
  $('[data-control="select"] select').on('change', function() {
    $(this).siblings('.select__value').find('._value').text(this.value);
  });

  $('.action_follow').on('click', function() {
    $(this).toggleClass('active')
  })
}

function initOnScroll() {
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
}

// Tabs
function initTabs() {
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
}

// Header

function initHeader() {
  $('.btn_menu').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    $('body').addClass('body--menu_opened');
    $('.sidebar_menu').addClass('sidebar_menu--open');
  });

  $('.sidebar_menu, .header_search, .header').on('click', function(e) {
    e.stopPropagation();
  });

  $('body, .btn_close_menu, .menu_overlay, .btn_close_header').on('click', function() {
    $('body').removeClass('body--menu_opened body--search_showed');
    $('.sidebar_menu').removeClass('sidebar_menu--open');
    $('.header_search').removeClass('header_search--show');
  });

  $('.btn_open_search').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    $('body').addClass('body--search_showed');
    $('.header_search').addClass('header_search--show');
  });
}

// Collapse

function initCollapse() {
  $('.panel_collapse').on('show.bs.collapse', function () {
    $(this).siblings('.panel_heading').addClass('panel_heading--active');
  });

  $('.panel_collapse').on('hide.bs.collapse', function () {
    $(this).siblings('.panel_heading').removeClass('panel_heading--active');
  });
}


// Smooth scroll

function initSmoothScroll() {
  $('.smooth_scroll').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
}


// Affix

function initAffix() {
  $('.btn_affix').affix({
    offset: {
      top: function () {
        return (this.top =  $('.site_nav').offset().top - $('.header_container').outerHeight())
      }
    }
  });

  $(window).resize(function() {
    $('.btn_affix').css({
      right: $('.header .container').offset().left + 15
    })
  }).trigger('resize')
}

// Init

$(document).ready(function() {
  initEventsOnClick();
  initOnScroll();
  initTabs();
  initHeader();
  initCollapse();
  initSmoothScroll();
  initAffix();
});

