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

  var isHomepage = window.location.pathname === '/';

  if(isMobileWidth() !== true && isHomepage) {
    $siteNavigation.addClass('is-hidden');
    $siteHeader.addClass('is-hidden');
    $siteHeader.css('opacity', '0');
    $siteNavigation.css('opacity', '0');
    if(windowPositionOnLoad === 0) {
      $siteInitialLogo.removeClass('is-hidden');
    }

  }

  invertHeaderDynamically(windowPositionOnLoad);

  //Top Bar Hover Events

  var $topBarDropDown = $scope.find('.js-top-bar-dropdown-menu');

  $topBarDropDown.each(function() {

    var $closestSubMenu =  $(this).find('.js-top-bar-sub-menu');

    $(this).on('mouseover', function() {
        var closestSubMenuHeight = $closestSubMenu.height();
        $('.navbar').css('top', closestSubMenuHeight + 39);
    });

    $(this).on('mouseout', function() {
      $closestSubMenu.removeClass('is-expanded');
      $('.navbar').css('top', 40);
    });

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

  $('.nav-link').on('click', function() {

    var $subMenu = $(this).siblings('.sub-menu');
    var $parentNavItem = $(this).closest('.nav-item');

    if ($parentNavItem.hasClass('is-active')) {
      $parentNavItem.removeClass('is-active');
      $subMenu.slideUp();
    } else {
      $parentNavItem.addClass('is-active');
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
        items:1,
        nav:true
      },
      600:{
        items:3,
        nav:true
      },
      980:{
        items:5,
        nav: true,
        loop:false
      }
    }
  });

});
