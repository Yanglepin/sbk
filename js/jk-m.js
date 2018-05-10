var top_scroll = new Swiper('.swiper-container', {
  loop: true,
  pagination: '.swiper-pagination',
  autoplay: 4000
});
var scms = new Swiper('.scroll-ms', {
  slidesPerView: 3.3,
  roundLengths: true,
  onReachEnd: function() { // move to last slide
      window.location.href = "http://m.jianke.com/zhuanti/qianggou2/";
    }
    //autoplay:4000     
});
var jk_ads = new Swiper('.jk-ads', {
  loop: true,
  pagination: '.swiper-pagination',
  autoplay: 4000
});
var login;


function openkf() {
  var ref = document.referrer;
  window.open("http://kf.jianke.com/LR/Chatpre.aspx?id=PFB31671888&lng=cn&r=" + ref + "&p=" + window.location.toString());
}

$(function() {
  var feedback = {
    init: function() {
      var self = this;
      var close = $(".close");
      var userfeed = $(".user-feedback");
      var obj = $(".jk-user-feedback");
      var allBg = $(".jk-cover-bg");
      self.hideWin(obj, close, userfeed, allBg);
    },
    hideWin: function(obj, btn, ufeed, bg) {
      ufeed.on("click", function() {
        bg.show(0, function() {
          obj.removeClass("fadeOutDown").addClass("animated fadeInDown").show();
        })
      })
      btn.on("click", function() {
        bg.hide(0, function() {
          obj.removeClass("fadeInDown").addClass("fadeOutDown");
        })

      })
      $(".suggest").on("click", function() {
        var vSuggestContent = $("#txtaSuggest").val();
        if ($.trim(vSuggestContent) == "") {
          alert("请填写内容！");
          return false;
        }
        var postdata = 'strContent=' + vSuggestContent;
        $.post("/ajax/advice", postdata, function(returnDate) {
          $("#txtaSuggest").val("");
          alert(returnDate);
          bg.hide(0,function(){
          obj.removeClass("fadeInDown").addClass("fadeOutDown");            
          })
        });
      })
    }
  }
  feedback.init();
  var search = {
    init: function() {
      var self = this;
      var log = $(".jk-logo");
      var input = $(".jk-search-text");
      var jkall = $("#jk-scroll");
      var bgcolor = $(".jk-search-box-cover");
      var button = $(".jk-login");
      var del_ico = $(".jk-search-del-icon");
      self.focus(input, jkall, log, bgcolor, button, del_ico);
      self.cancel(input, button, jkall, log, bgcolor, del_ico);
    },
    focus: function(obj, jk, logo, bg, btn, cut) {
      obj.focus(function() {
        sTop = $(window).scrollTop();
        login = $('#login').html();
        opt = bg.css("opacity");
        $(".bottom-to-top").hide();
        bg.css("opacity", 1);
        jk.hide();
        $("body").removeClass("hide-landing").addClass("show-landing");
        logo.hide(0, function() {
          $(this).next().addClass("no-lefgmag");
          btn.find("a").attr("href", "javascript:;").removeClass("login-state").addClass("cancel").text("取消");
        })
        $(this).keyup(function() {
          if ($.trim($(this).val()) != "") {
            cut.show(0, function() {
              btn.find("a").removeClass("cancel").addClass("search").text("搜索");
              $(".search_land_wrap").show();
            });
          } else {
            cut.hide(0, function() {
              $(".search_land_wrap").hide();
              btn.find("a").removeClass("search").addClass("cancel").text("取消");
            });

          }
        })
      })
    },
    cancel: function(obj, btn, jk, logo, bg, cut) {
      btn.on("click", ".cancel", function() {

        logo.show(100, function() {
          $(this).next().removeClass("no-lefgmag");
          bg.css("opacity", opt);
          jk.show();
          window.scrollTo(0, sTop);
          $("body").removeClass("show-landing").addClass("hide-landing");
          $('#login').html(login)
        })
      });
      btn.on("click", ".search", function() {
        SearchSubmit(obj.val(), event)
      });
      cut.click(function() {
        $(this).hide(0, function() {
          obj.val("");
          $(".search_land_wrap").hide();
          btn.find("a").removeClass("search").addClass("cancel").text("取消");
        })
      })
    }
  };
 /* $(window).scroll(function() {
    var top = $(window).scrollTop();
    var top2 = $(".jk-nav").offset().top;
    var x = 0;
    if (top / top2 >= 0.85) {
      x = 0.85;
      $("#mhome-backtoTop").show()
    } else {
      x = top / top2;
      $("#mhome-backtoTop").hide();
    }
    $(".jk-search-box-cover").css("opacity", x);
    if ($(".jk-search-text").is(":focus")) {
      $(".jk-search-box-cover").css({
        "opacity": 1
      });
    };
  });*/
  search.init();

  (function($) {
    $.fn.picLazyLoad = function(settings) {
      var $this = $(this),
        _winScrollTop = 0,
        _winHeight = $(window).height();
      settings = $.extend({
        threshold: 0,
        placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC'
      }, settings || {});
      lazyLoadPic();
      $(window).on('scroll load', function() {
        _winScrollTop = $(window).scrollTop();
        lazyLoadPic();
      });

      function lazyLoadPic() {
        $this.each(function() {
          var $self = $(this);
          if ($self.is('img')) {
            if ($self.attr('data-original')) {
              var _offsetTop = $self.offset().top;
              if ((_offsetTop - settings.threshold) <= (_winHeight + _winScrollTop)) {
                $self.attr('src', $self.attr('data-original'));
                $self.removeAttr('data-original');
              }
            }
          } else {
            if ($self.attr('data-original')) {
              if ($self.css('background-image') == 'none') {
                $self.css('background-image', 'url(' + settings.placeholder + ')');
              }
              var _offsetTop = $self.offset().top;
              if ((_offsetTop - settings.threshold) <= (_winHeight + _winScrollTop)) {
                $self.css('background-image', 'url(' + $self.attr('data-original') + ')');
                $self.removeAttr('data-original');
              }
            }
          }
        });
      }
    }
  })($);
  $('img').picLazyLoad();
})