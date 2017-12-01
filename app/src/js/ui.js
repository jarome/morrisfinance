$(document).ready(function() {

  var $scope = $('body');
  var $siteHeader = $scope.find('.header');
  var $siteNavigation = $scope.find('.navbar');


  $siteHeader.css('opacity', '0');
  $siteNavigation.css('opacity', '0');
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


  $(document).on('scroll', function() {
    if($siteHeader.hasClass('is-hidden')) {
      $siteHeader.removeClass('is-hidden');
      $siteHeader.animate({
        opacity : 1
      },400);
    }
    if($siteNavigation.hasClass('is-hidden')) {
      $siteNavigation.removeClass('is-hidden');
      $siteNavigation.animate({
        opacity : 1
      },400);

    }
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
