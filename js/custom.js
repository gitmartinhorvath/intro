$(document).ready(function () {

    "use strict";

    /* _____________________________________

     Preloader
     _____________________________________ */

    if ($(".loader").length) {
      // show Preloader until the website ist loaded
      $(window).on("load", function () {
        $(".loader").fadeOut("slow");
      });
    }


    /* _____________________________________

     Smooth Scroll
     _____________________________________ */

    $("a.smooth-scroll").on("click", function (event) {
      var $anchor = $(this);
      $("html, body").stop().animate({
        scrollTop: $($anchor.attr("href")).offset().top
      }, {
        duration: 1000,
        specialEasing: {
          width: "linear",
          height: "easeInOutCubic"
        }
      });
      event.preventDefault();
    });


    /* _____________________________________

     Link Div-Box
     _____________________________________ */

    $(".linkDiv").click(function () {
      window.location = $(this).find("a").attr("href");
      return false;
    });


    /* _____________________________________

     Header Navigation
     _____________________________________ */

    function navigation() {
      var a = $(window).scrollTop(),
        b = $('#hero').outerHeight() - 40;
      if (a > b) {
        $('.header-animated').addClass('scroll');
      } else {
        $('.header-animated').removeClass('scroll');
      }
      ;
    }

    navigation();
    $(window).on("scroll", navigation);
    $(window).on("resize", navigation);
    $('.navbar-button').on("click", function () {
      if ($('#sidebar').is(':hidden')) {
        $('#sidebar').slideDown();
        $('.navbar-button').addClass('open');
      } else {
        $('#sidebar').slideUp();
        $('.navbar-button').removeClass('open');
      }
    });


    /* _____________________________________

     Hero Slider
     _____________________________________ */

    if ($("#hero-slider").length) {
      $("#hero-slider").owlCarousel({
        loop: true,
        items: 1,
        autoplay: true,
        animateOut: 'fadeOut',
        smartSpeed: 1000,
        mouseDrag: false
      });
    }


    /* _____________________________________

     Background Youtube
     _____________________________________ */

    // shows Video only for Desktop
    if ($('#hero-youtube').length) {
      $('#hero-youtube').YTPlayer({
        fitToBackground: false,
        videoId: $('#hero-youtube').data("video-id"),
        playerVars: {
          modestbranding: 1,
          autoplay: 1,
          controls: 0,
          showinfo: 0,
          branding: 0,
          rel: 0,
          autohide: 0,
          start: 0
        }
      });
    }


    /* _____________________________________

     Typewriter
     _____________________________________ */

    if ($(".element").length) {
      $(function () {
        $(".element").typed({
          strings: [" Ahoj, <br>môj nový web " , " sa práve píše."],
          typeSpeed: 100,
          loop: true,
          backDelay: 2000
        });
      });
    }

    /* _____________________________________

     Progressbar
     _____________________________________ */


    if ($('.progress-bar').length) {
      var o = $('.progress-bar');

      $(window).on('scroll', function () {
        var elemPos = o.offset().top,
          elemPosBottom = o.offset().top + o.height(),
          winHeight = $(window).height(),
          scrollToElem = elemPos - winHeight,
          winScrollTop = $(this).scrollTop();

        if (winScrollTop > scrollToElem) {
          if (elemPosBottom > winScrollTop) {
            $('.progress-bar').css("width",
              function () {
                return $(this).attr("aria-valuenow") + "%";
              }
            )
          }
        } else {
          $('.progress-bar').css("width", "0%")
        }
      });
    }

    /* _____________________________________

     Counter
     _____________________________________ */

    if ($(".timer").length) {
      var p = $('#counter'),
        cc = 1;

      $(window).on('scroll', function () {
        var elemPos = p.offset().top,
          elemPosBottom = p.offset().top + p.height(),
          winHeight = $(window).height(),
          scrollToElem = elemPos - winHeight,
          winScrollTop = $(this).scrollTop();

        if (winScrollTop > scrollToElem) {
          if (elemPosBottom > winScrollTop) {
            if (cc < 2) {
              cc = 2;
              $('.timer').countTo({
                formatter: function (value, options) {
                  value = value.toFixed(options.decimals);
                  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                  return value;
                }
              });
            }
          }
        }
      });
    }

    /* _____________________________________

     Twitter
     _____________________________________ */

    function handleTweets(tweets) {
      var x = tweets.length,
        n = 0,
        element = document.getElementById('twitter-post'),
        html = '<div id="twitter-slider" class="owl-carousel owl-theme">';
      while (n < x) {
        html += '<div>' + tweets[n] + '</div>';
        n++;
      }
      html += '</div>';
      element.innerHTML = html;

      if ($("#twitter-slider").length) {
        /* Twits attached to owl-carousel */
        $("#twitter-slider").owlCarousel({
          loop: true,
          margin: 30,
          responsiveClass: true,
          autoplay: true,
          autoplayTimeout: 7000,
          autoplayHoverPause: true,
          items: 1,
          smartSpeed: 3000
        });
      }
    }


    function dateFormatter(date) {
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

      return "Posted on " + monthNames[date.getMonth()] + " " + date.getDate() + "., " + date.getFullYear();
    }

    if ($("#twitter-post").length) {
      var widgetProfile = $('#twitter-post').attr('data-widget-profile');

      var config_feed = {
        "profile": {"screenName": widgetProfile},
        "domId": 'exampleProfile',
        "maxTweets": 5,
        "enableLinks": true,
        "showUser": false,
        "showTime": true,
        "dateFunction": dateFormatter,
        "showRetweet": false,
        "customCallback": handleTweets,
        "showInteraction": false
      };

      twitterFetcher.fetch(config_feed);
    }

    /* _____________________________________

     Bootstrap Fix: IE10 in Win 8 & Win Phone 8
     _____________________________________ */


    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement("style")
      msViewportStyle.appendChild(
        document.createTextNode(
          "@-ms-viewport{width:auto!important}"
        )
      )
      document.querySelector("head").appendChild(msViewportStyle)
    }

  }
);
