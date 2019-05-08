(function($) {
  skel.breakpoints({
    xlarge: "(max-width: 1680px)",
    large: "(max-width: 1280px)",
    medium: "(max-width: 980px)",
    small: "(max-width: 736px)",
    xsmall: "(max-width: 480px)"
  });

  $(function() {
    var $window = $(window),
      $body = $("body"),
      $header = $("#header"),
      $footer = $("#footer");

    // Disable animations/transitions until the page has loaded.
    $body.addClass("is-loading");

    $window.on("load", function() {
      window.setTimeout(function() {
        $body.removeClass("is-loading");
      }, 100);
    });

    // Fix: Placeholder polyfill.
    $("form").placeholder();

    // Prioritize "important" elements on medium.
    skel.on("+medium -medium", function() {
      $.prioritize(
        ".important\\28 medium\\29",
        skel.breakpoint("medium").active
      );
    });

    // Header.
    $header.each(function() {
      var t = jQuery(this),
        button = t.find(".button");

      button.click(function(e) {
        t.toggleClass("hide");

        if (t.hasClass("preview")) {
          return true;
        } else {
          e.preventDefault();
        }
      });
    });
    window.addEventListener("scroll", function(e) {
      function getOffset(el) {
        let _x = 0;
        let _y = 0;
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
          _x += el.offsetLeft - el.scrollLeft;
          _y += el.offsetTop - el.scrollTop;
          el = el.offsetParent;
        }
        return { top: _y, left: _x };
      }

      const projectsTop = getOffset(document.getElementById("top")).top;
      const header = document.getElementById("header");

      console.log(projectsTop, document.documentElement.scrollTop);

      if (document.documentElement.scrollTop < projectsTop) {
        header.style.display = "flex";
      } else {
        header.style.display = "none";
      }
    });

    // Footer.
    $footer.each(function() {
      var t = jQuery(this),
        inner = t.find(".inner"),
        button = t.find(".info");

      button.click(function(e) {
        t.toggleClass("show");
        e.preventDefault();
      });
    });
  });
})(jQuery);
