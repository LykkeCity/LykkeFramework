(function ($) {

  function checkSection (index, nextIndex) {
    switch (nextIndex) {
      case 2:
        sections.eq(1).addClass('adv_promo_section--animated');
        break;

      case 3:
        clearTimeout(animatedTimeout);
        sections.eq(2).addClass('adv_promo_section--animated');
        break;

      case 4:
        initVarietyCarousel();
        break;

      case 6:
        sections.eq(5).addClass('adv_promo_section--animated');
        initTimeCarousel();
        break;
    }

    if (index === 3) {
      animatedTimeout = setTimeout(function () {
        sections.eq(2).removeClass('adv_promo_section--animated');
      }, 1000);
    }

    if (index === 4) {
      stopVarietyCarousel();
    }
  }

  function onLeave (index, nextIndex, direction) {
    if (direction === 'down' && nextIndex === sectionsCount) {
      scrollDownButton.addClass('adv_promo_arrow_down--hide');
    } else {
      scrollDownButton.removeClass('adv_promo_arrow_down--hide');
    }

    if (isSafari) {
      $.fn.fullpage.setAllowScrolling(false);

      setTimeout(function () {
        checkSection(index, nextIndex);

        setTimeout(function () {
          $.fn.fullpage.setAllowScrolling(true);
        }, 1000);
      }, 100);
    } else {
      checkSection(index, nextIndex);
    }
  }

  function initTimeCarousel () {
    if (timeSliderInited) {
      return;
    }

    timeSliderInited = true;

    timeTimeout = setTimeout(
      switchTimeCarouselSlide,
      timeSliderInterval
    );
  }

  function switchTimeCarouselSlide (useCurrent) {
    var slide;

    clearTimeout(timeTimeout);

    if (!useCurrent) {
      timeCurrent = (timeCurrent < timeSliderCount - 1) ? timeCurrent + 1 : 0;
    }

    slide = timeButtons.eq(timeCurrent);

    if (slide && slide.length) {
      setTimeSlide(timeCurrent);
      timeTimeout = setTimeout(
        switchTimeCarouselSlide,
        timeSliderInterval
      );
    }
  }

  function setTimeSlide (slideIndex) {
    var button = timeButtons.eq(slideIndex);
    var block = timeBlocks.eq(slideIndex);

    timeBlocks.removeClass('active');
    block.addClass('active');

    timeButtons.removeClass('adv_promo_bullet--active');
    button.addClass('adv_promo_bullet--active');
  }

  function timeButtonsClick () {
    var button = $(this);
    var slideIndex = timeButtons.index(button);

    clearTimeout(timeTimeout);

    timeCurrent = slideIndex;

    switchTimeCarouselSlide(true);
  }

  function timeButtonNextClick () {
    clearTimeout(timeTimeout);

    timeCurrent = (timeCurrent < timeSliderCount - 1) ? timeCurrent + 1 : 0;

    switchTimeCarouselSlide(true);
  }

  function timeButtonPrevClick () {
    clearTimeout(timeTimeout);

    timeCurrent = (timeCurrent > 0) ? timeCurrent - 1 : (timeSliderCount - 1);

    switchTimeCarouselSlide(true);
  }

  function initVarietyCarousel () {
    if (varietySliderInited) {
      return;
    }

    varietySliderInited = true;

    varietyTimeout = setTimeout(
      switchVarietyCarouselSlide,
      varietySliderInterval
    );
  }

  function stopVarietyCarousel () {
    clearTimeout(varietyTimeout);
    varietySliderInited = false;
  }

  function switchVarietyCarouselSlide () {
    var slide;

    clearTimeout(varietyTimeout);

    varietyCurrent = (varietyCurrent < varietySliderCount - 1) ? varietyCurrent + 1 : 0;
    slide = varietyButtons.eq(varietyCurrent);

    if (slide && slide.length) {
      setVarietySlide(varietyCurrent);
      varietyTimeout = setTimeout(
        switchVarietyCarouselSlide,
        varietySliderInterval
      );
    }
  }

  function setVarietySlide (slideIndex) {
    var mobileSliderOffset = varietySliderMobileHeight * slideIndex * -1;
    var desktopSliderOffset = varietySliderDesktopHeight * slideIndex * -1;
    var button = varietyButtons.eq(slideIndex);

    varietyButtons.closest('.adv_promo_nav__item').removeClass('adv_promo_nav__item--active');
    button.closest('.adv_promo_nav__item').addClass('adv_promo_nav__item--active');

    varietySliderMobile.css({
      '-webkit-transform': 'translate3d(0, ' + mobileSliderOffset + 'px, 0)',
      '-moz-transform': 'translate3d(0, ' + mobileSliderOffset + 'px, 0)',
      '-ms-transform': 'translate3d(0, ' + mobileSliderOffset + 'px, 0)',
      'transform': 'translate3d(0, ' + mobileSliderOffset + 'px, 0)'
    });

    varietySliderDesktop.css({
      '-webkit-transform': 'translate3d(0, ' + desktopSliderOffset + 'px, 0)',
      '-moz-transform': 'translate3d(0, ' + desktopSliderOffset + 'px, 0)',
      '-ms-transform': 'translate3d(0, ' + desktopSliderOffset + 'px, 0)',
      'transform': 'translate3d(0, ' + desktopSliderOffset + 'px, 0)'
    });
  }

  function varietyButtonsClick () {
    var button = $(this);
    var slideIndex = varietyButtons.index(button);

    clearTimeout(varietyTimeout);

    setVarietySlide(slideIndex);

    varietyCurrent = slideIndex;

    varietyTimeout = setTimeout(
      switchVarietyCarouselSlide,
      (varietySliderInterval * 4)
    );
  }

  function calcCarietySliderImgHeight () {
    varietySliderMobileHeight = varietySliderMobile.find('img')
      .first()
      .height();

    varietySliderDesktopHeight = varietySliderDesktop
      .find('img')
      .first()
      .outerHeight();
  }

  function scrollDownButtonClick () {
    $.fn.fullpage.moveSectionDown();
  }

  var isSafari = (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) ? true : false;

  var fullpageConf = {
    css3: true,
    sectionSelector: '._adv_promo_section',
    responsiveWidth: 1100,
    onLeave: onLeave,
    afterResize: function () {
      calcCarietySliderImgHeight();
    }
  };

  var main = $('._adv_promo');

  var sections = main.find('._adv_promo_section');
  var sectionsCount = sections.length;
  var scrollDownButton = $('._adv_promo_down');

  var varietyButtons = main.find('._adv_promo_variety_button');
  var varietySliderMobile = main.find('._adv_promo_variety_slider_mobile');
  var varietySliderDesktop = main.find('._adv_promo_variety_slider_desktop');
  var varietySliderMobileHeight;
  var varietySliderDesktopHeight;
  var varietySliderInited = false;
  var varietySliderInterval = 4000;
  var varietySliderCount = varietyButtons.length;
  var varietyTimeout;
  var varietyCurrent = 0;

  var timeBlocks = main.find('._adv_promo_time_block');
  var timeButtons = main.find('._adv_promo_time_button');
  var timeButtonPrev = main.find('._adv_promo_time_prev');
  var timeButtonNext = main.find('._adv_promo_time_next');
  var timeSliderInited = false;
  var timeSliderInterval = 10000;
  var timeSliderCount = 4;
  var timeTimeout;
  var timeCurrent = 0;

  var animatedTimeout;

  $(function () {
    main.fullpage(fullpageConf);

    calcCarietySliderImgHeight();

    scrollDownButton.on('click', scrollDownButtonClick);
    varietyButtons.on('click', varietyButtonsClick);
    timeButtons.on('click', timeButtonsClick);
    timeButtonPrev.on('click', timeButtonPrevClick);
    timeButtonNext.on('click', timeButtonNextClick);
  });

})(window.jQuery);
