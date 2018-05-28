$(document).ready(function() {

  var $scope = $('body');
  var $siteHeader = $scope.find('.header');
  var $siteNavigation = $scope.find('.navbar');
  var $mobileNavigation = $scope.find('#navbarNav');
  var $siteScrollHomepage = $scope.find('.js-hero-scroll-content');
  var $siteLogo = $scope.find('.js-logo');
  var $siteInitialLogo = $scope.find('.js-initial-logo');
  var windowPositionOnLoad = $(window).scrollTop();
  var preserveScrollPos = $(window).scrollTop();

  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $siteNavigation.outerHeight();

  var isHomepage = (window.location.pathname === '/' || window.location.pathname === '/sites/morrisfinance/');

  var agent = navigator.userAgent||navigator.vendor||window.opera;
  var isIos = /ip(ad|od|hone)/i.test(agent); // No iOS in the Car support yet ;-)
  var isAndroid = /android/i.test(agent);

  invertHeaderDynamically(windowPositionOnLoad);

  //Top Bar Hover Events

  var $topBarDropDown = $scope.find('.js-top-bar-dropdown-menu');

  if(isIos) {
    $scope.addClass('is-ios');
  }

  $topBarDropDown.each(function() {

    var $closestSubMenu =  $(this).find('.js-top-bar-sub-menu');

    $(this).on('mouseout', function() {
      $closestSubMenu.removeClass('is-expanded');
    });

  });

  $siteScrollHomepage.on('click', function() {
    removeScrollHomepage();
    scrollTo('.homepage-heading');
  });

  // Toggle Mobile Menu Behaviours

  $('.js-toggle-mobile-menu').on('click', function() {
    toggleMobileState($(this))
  });

  function toggleMobileState($el) {

    $el.toggleClass('is-active');

    if (!$scope.hasClass('mobile-navigation-open')) {
      preserveScrollPos = $(window).scrollTop();
      $mobileNavigation.addClass('show');
      $('.js-mobile-navigation-footer').removeClass('is-hidden');
      $siteNavigation.addClass('mobile-navigation-active');
      $scope.addClass('mobile-navigation-open');
    } else {
      $('.js-mobile-navigation-footer').addClass('is-hidden');
      $mobileNavigation.removeClass('show');
      $siteNavigation.removeClass('mobile-navigation-active');
      $scope.removeClass('mobile-navigation-open');
      $(window).scrollTop(preserveScrollPos);
    }

  }

  // Mobile Navigation Accordion

  $('.nav-link').on('click', function(e) {

    var $subMenu = $(this).siblings('.sub-menu');
    var $parentNavItem = $(this).parent('.nav-item');

    if ((isMobileWidth() === true) && ($parentNavItem.hasClass('nav-dropdown-menu'))) {
      e.preventDefault();
    }

    if ($parentNavItem.hasClass('is-active')) {
      $parentNavItem.removeClass('is-active');
      $subMenu.slideUp();
    } else {
      $parentNavItem.addClass('is-active');
/*      $subMenu.slideDown(500, function() {
        $subMenu.css('display', 'flex');
      });*/
      $subMenu.slideDown();
    }

  });

  // Functions

  function scrollTo($el) {
    $('html, body').animate({
      scrollTop: $($el).offset().top
    }, 1000);
  }

  function removeScrollHomepage() {
    $siteScrollHomepage.remove();
    $('.js-initial-logo').remove();
    if(isMobileWidth() !== true) {
      $('.hero-links').addClass('hero-links--fill-to-height');
    }
  }

  function invertHeaderDynamically($windowScope) {
    if(isMobileWidth() === true) {
      if ($windowScope === 0) {
        $siteNavigation.addClass('invert-navigation');
        $siteLogo.addClass('navbar-logo--inverted');
      } else {
        $siteNavigation.removeClass('invert-navigation');
        $siteLogo.removeClass('navbar-logo--inverted');
      }
    } else {
      $siteNavigation.removeClass('invert-navigation');
      $siteLogo.removeClass('navbar-logo--inverted');
    }
  }

  function isMobileWidth() {
    return $('.is-mobile-indicator').is(':visible');
  }


  $(window).resize(function() {
    var $windowPosition = $(window).scrollTop();
    if(isMobileWidth() === true) {
      invertHeaderDynamically($windowPosition);
    } else {
      invertHeaderDynamically($windowPosition);
      if($scope.hasClass('mobile-navigation-open')) {
        toggleMobileState($('.js-toggle-mobile-menu'));
      }
    }
  });

  $(window).scroll(function() {

    var $windowPosition = $(this).scrollTop();

    invertHeaderDynamically($windowPosition);

    if (isHomepage) {
      removeScrollHomepage();
    }

    if($siteHeader.hasClass('is-hidden')) {
      $siteHeader.removeClass('is-hidden');
      $siteHeader.animate({
        opacity : 1
      },200);
    }
    if($siteNavigation.hasClass('is-hidden')) {
      $siteNavigation.removeClass('is-hidden');
      $siteNavigation.animate({
        opacity : 1
      },200);
    }

    if(isMobileWidth() === true) {

      if(!$scope.hasClass('mobile-navigation-open')) {
        if ($windowPosition > lastScrollTop && $windowPosition > navbarHeight) {
          $siteNavigation.removeClass('navbar-down').addClass('navbar-up');
        } else {
          if ($windowPosition + $(window).height() < $(document).height()) {
            $siteNavigation.removeClass('navbar-up').addClass('navbar-down');
          }
        }
      }
    }

    lastScrollTop = $windowPosition;

  });

  //Tabs Behaviours

  $('.js-tabs li').on('click', function(){

    var tabId = $(this).attr('data-tab');

    $('.js-tabs li').removeClass('tabs__current');
    $('.tabs__content').removeClass('tabs__current');

    $(this).addClass('tabs__current');
    $("#"+tabId).addClass('tabs__current');
  });

  // Owl Carousel

  $('.icon-slider').owlCarousel({
    responsive:{
      0:{
        items:3,
        nav:true
      },
      600:{
        items:3,
        nav:true
      },
      980:{
        items:6,
        nav: true,
        loop:false
      }
    }
  });

  // Twitter Behaviours

/*  var $twitterFeedEl = $('.js-twitter-feed');

  $twitterFeedEl.twittie({
    dateFormat: '%b. %d, %Y',
    template: '{{tweet}} <div class="date">{{date}}</div> <a href="{{url}}" target="_blank">Details</a>',
    count: 2,
    hideReplies: true
  });*/

});
