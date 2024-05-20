"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
  if (isFirefox) {
    $('.popup__table').addClass('firefox');
  }

  // -------------Mobile-menu--------------------------

  var burgers = document.querySelectorAll('.header-menu__btn');
  burgers.forEach(function (el) {
    el.addEventListener("click", function () {
      el.classList.toggle('active');
      el.previousElementSibling.classList.toggle('hide');
      el.closest('.mobile-menu__container').classList.toggle('active');
      document.body.classList.toggle('show');
    });
  });
  var stickyHeader = document.querySelector('.header-sticky');
  function showHeader() {
    var height = $('.header').height();
    if (window.scrollY > height) {
      $(stickyHeader).fadeIn();
    } else {
      $(stickyHeader).fadeOut();
    }
  }
  ;
  if (stickyHeader) {
    showHeader();
    window.addEventListener('scroll', showHeader);
  }
  ;

  // -------------Sliders--------------------------

  $(".hero-steps").slick({
    infinite: false,
    speed: 300,
    cssEase: "linear",
    slidesToShow: 4,
    adaptiveHeight: true,
    arrows: false,
    responsive: [{
      breakpoint: 1291,
      settings: {
        slidesToShow: 3.6
      }
    }, {
      breakpoint: 1091,
      settings: {
        slidesToShow: 3.1
      }
    }, {
      breakpoint: 891,
      settings: {
        slidesToShow: 2.2
      }
    }, {
      breakpoint: 741,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 621,
      settings: {
        slidesToShow: 1.6
      }
    }, {
      breakpoint: 521,
      settings: {
        slidesToShow: 1.4
      }
    }, {
      breakpoint: 421,
      settings: {
        slidesToShow: 1.2
      }
    }, {
      breakpoint: 351,
      settings: {
        slidesToShow: 1.1
      }
    }]
  });
  $(".examples__wrapper").slick({
    infinite: true,
    speed: 300,
    cssEase: "linear",
    slidesToShow: 1,
    adaptiveHeight: true,
    fade: true,
    prevArrow: $('.examples__prev'),
    nextArrow: $('.examples__next')
  });
  function number_format(number, decimals, thousands_sep) {
    var i, j, kw, kd, km;
    if (isNaN(decimals = Math.abs(decimals))) {
      decimals = 2;
    }
    if (thousands_sep == undefined) {
      thousands_sep = " ";
    }
    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";
    if ((j = i.length) > 3) {
      j = j % 3;
    } else {
      j = 0;
    }
    km = j ? i.substr(0, j) + thousands_sep : "";
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    kd = decimals ? Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(4) : "";
    return km + kw + kd;
  }

  // -------------Calculator--------------------------

  var priceResult = document.querySelector('#price-result');
  var monthsResult = document.querySelector('#months-result');
  var paymentResult = document.querySelector('#payment-result');
  var percentagesResult = document.querySelector('#percentages-result');
  var summResult = document.querySelector('#summ-result');
  var monthsPopup = $('.popup__months');
  var percentagesPopup = $('.popup__percentages');
  var summPopup = $('.popup__summ');
  if (priceResult) {
    var getNumber = function getNumber(value) {
      return value.replace(/[^+\d]/g, '').replace(/^0+/, '');
    };
    var months = function months(value) {
      if (value < 1) {
        return 1 + ' месяц';
      } else if (value == 1 || value == 21) {
        return value + ' месяц';
      } else if (value > 36) {
        return 36 + ' месяцев';
      } else if (value > 1 && value < 5 || value > 21 && value < 25) {
        return value + ' месяца';
      } else if (value > 4 && value < 21 || value > 24) {
        return value + ' месяцев';
      }
      ;
    };
    priceResult.addEventListener('focus', function () {
      var value = getNumber(this.value);
      this.value = value;
    });
    priceResult.addEventListener('blur', function () {
      var value = getNumber(this.value);
      this.value = number_format(value) + ' ₽';
      priceResult.classList.add('active');
      percentagesResult.value = number_format(value * 0.033) + ' ₽';
      summResult.value = number_format(parseInt(value * 0.033) + parseInt(value)) + ' ₽';
      summPopup.html = number_format(parseInt(value * 0.033) + parseInt(value)) + ' ₽';
      percentagesPopup.text(number_format(value) + ' ₽');
    });
    priceResult.addEventListener('change', function (e) {
      var value = getNumber(this.value);
      if (value < 350000) {
        this.value = 350000;
      }
      ;
      if (value % 1000 != 0) {
        var length = this.value.length - 3;
        this.value = this.value.substring(0, length) + '000';
      }
      if (value > 3000000) {
        this.value = 3000000;
      }
      this.value = number_format(this.value) + ' ₽';
      this.blur();
    });
    monthsResult.addEventListener('focus', function () {
      var value = getNumber(this.value);
      this.value = value;
    });
    monthsResult.addEventListener('blur', function () {
      var value = getNumber(this.value);
      this.value = months(value);
      monthsResult.classList.add('active');
      monthsPopup.text(months(value));
    });
    paymentResult.addEventListener('focus', function () {
      var value = getNumber(this.value);
      this.value = value;
    });
    paymentResult.addEventListener('blur', function () {
      var value = getNumber(this.value);
      this.value = number_format(value) + ' ₽';
      paymentResult.classList.add('active');
    });
    $("#price").slider({
      animate: "slow",
      range: "min",
      max: 3000000,
      min: 350000,
      step: 1000,
      value: 350000,
      slide: function slide(event, ui) {
        $("#price-result").val(number_format(ui.value) + ' ₽');
        priceResult.classList.add('active');
        percentagesResult.value = number_format(ui.value * 0.033) + ' ₽';
        summResult.value = number_format(ui.value * 0.033 + ui.value) + ' ₽';
        summPopup.text(summResult.value);
        percentagesPopup.text(number_format(ui.value * 0.033) + ' ₽');
      }
    });
    $("#months").slider({
      animate: "slow",
      range: "min",
      max: 36,
      min: 1,
      step: 1,
      value: 1,
      slide: function slide(event, ui) {
        $("#months-result").val(months(ui.value));
        monthsResult.classList.add('active');
        monthsPopup.text(months(ui.value));
      }
    });
    $("#payment").slider({
      animate: "slow",
      range: "min",
      max: 3000000,
      min: 50000,
      step: 1000,
      value: 50000,
      slide: function slide(event, ui) {
        $("#payment-result").val(number_format(ui.value) + ' ₽');
        paymentResult.classList.add('active');
      }
    });
  }

  // -------------Popup----------------------------

  var div = document.createElement('div');
  var root = document.documentElement;
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  document.body.append(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  var buttonsModal = document.querySelectorAll('[data-target]');
  var overlay = document.querySelector('.overlay');
  var btnsClose = document.querySelectorAll('.popup__close');
  function togglePopup() {
    var burger = document.querySelector('.header-menu__btn.active');
    if (burger) {
      overlay.classList.toggle('show');
    } else {
      document.body.classList.toggle('show');
      root.classList.toggle('show');
      overlay.classList.toggle('show');
    }
    if (document.body.classList.contains("show")) {
      document.body.style.paddingRight = "".concat(scrollWidth, "px");
      stickyHeader.style.marginRight = "".concat(scrollWidth, "px");
    } else {
      document.body.style.paddingRight = '0px';
      stickyHeader.style.marginRight = '0px';
    }
  }
  buttonsModal.forEach(function (item) {
    item.addEventListener('click', function () {
      var target = this.getAttribute('data-target');
      document.querySelector("#".concat(target)).classList.add('show');
      togglePopup();
    });
  });
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      togglePopup();
      $('.popup').removeClass('show');
    }
    ;
  });
  btnsClose.forEach(function (item) {
    item.addEventListener("click", function () {
      togglePopup();
      $('.popup').removeClass('show');
    });
  });
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.mobile-menu__container').forEach(function (el) {
        el.classList.remove('active');
        document.body.classList.remove('show');
      });
      burgers.forEach(function (el) {
        el.classList.remove('active');
        el.previousElementSibling.classList.remove('hide');
      });
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});