import styles from '../sass/style.sass';
/*
 * Project:        NOISE - HTML5 Template
 * Version:        1.0
 * Author:         Neon Unicorns
 * Author ulr:     https://themeforest.net/user/neonunicorns
 */

(function ($) {

    "use strict";

    /* -----------------------
     * Predefined Variables
     * --------------------- */
    var $window = $(window),
        $document = $(document),
        $body = $("body"),
        $html = $("html, body");

    // Variables
    var siteLoad = false;

    // Animation easing
    // ease-in-out-quart http://cubic-bezier.com/#.77,0,.17,1
    var animEasing = "cubic-bezier(0.77, 0, 0.175, 1)";

    // Sections
    var $sectionHome = $(".section-home"),
        $sectionAbout = $(".section-about"),
        $sectionServices = $(".section-services"),
        $sectionContact = $(".section-contact");

    var $onLoadTrigger = $("<div/>", {
        "class": "$onLoadTrigger",
        css: {"display": "none"}
    });

    /* -----------------------------
     * Preloader
     * ---------------------------*/
    // makes sure the whole site is loaded
    // and add native js event listener for window
    window.addEventListener("load", function () {
        var $preloader = $(".preloader-container");
        var $loader = $preloader.find(".loader");
        $loader.addClass("loader-anim-start");
        window.setTimeout(function () {
            $loader.addClass("loader-anim-end");
        }, 1000);
        window.setTimeout(function () {
            $preloader.addClass("preloader-container-left");
        }, 2000);
        window.setTimeout(function () {
            $preloader.hide();
            $body.addClass("loaded");
            siteLoad = true;
            $onLoadTrigger.trigger("click");
        }, 3000);
    }, false);


    /* -----------------------
     * Functions
     * --------------------- */
    // Helper functions
    var maxH = function () {
        var allH = [];
        allH.push($sectionHome.height());
        allH.push($sectionAbout.height());
        allH.push($sectionServices.height());
        allH.push($sectionContact.height());
        return Math.max.apply(Math, allH);
    };
    var maxW = function () {
        var allW = [];
        allW.push($sectionHome.width());
        allW.push($sectionAbout.width());
        allW.push($sectionServices.width());
        allW.push($sectionContact.width());
        return Math.max.apply(Math, allW);
    };

    // Prepare page for animation
    var prepareAnimation = function () {
        // Find all elements to animate
        var $slideAnim = $(".slide-anim"),
            $fadeInAnim = $(".fadeIn-anim");
        // Hide all elements
        $slideAnim.css("opacity", 0);
        $fadeInAnim.css("opacity", 0);


        $slideAnim.each(function () {
            var $this = $(this),
                animationDelay = $this.data("anim-delay") || 1,
                animationDuration = $this.data("anim-duration") || 500;
            // Wrap in container
            var animContainer = $("<div/>", {
                "class": "anim-container"
            });
            $this.wrap(animContainer);
            // Calculate delay
            var delay = (animationDuration / 1000) + (animationDelay / 10);
            // Prepare transition
            var transitions =
                "right " + animationDuration / 1000 + "s " + animEasing + " " + animationDelay / 10 + "s, " +
                "left " + animationDuration / 1000 + "s " + animEasing + " " + delay + "s";
            // Create mask
            var animMask = $("<div/>", {
                "class": "anim-mask",
                css: {
                    "transition": transitions
                }
            });
            $this.css("transition", "opacity 0s linear " + delay + "s");
            // Insert mask
            animMask.insertAfter($this);
        });
    };
    prepareAnimation();

    var animateSection = function (index) {
        var $section = $(".section-" + index);
        if (!$section.hasClass("animated")) {
            // Slide animation
            var $slideAnim = $section.find(".slide-anim");
            $slideAnim.each(function () {
                var $this = $(this);
                $this.parent(".anim-container").addClass("animm");
            });
            // FadeInLeft animation
            var $fadeInAnim = $section.find(".fadeIn-anim");
            $fadeInAnim.each(function () {
                var $this = $(this);
                var animationDelay = $this.data("anim-delay") || 1;
                var animationDuration = $this.data("anim-duration") || 500;
                var transitions = "all .5s ease, " +
                    "transform " + animationDuration / 1000 + "s " + animEasing + " " + animationDelay / 10 + "s, " +
                    "opacity " + animationDuration / 1000 + "s " + animEasing + " " + animationDelay / 10 + "s";
                $this.css({
                    "transition": transitions,
                    "opacity": 1
                });
            });
            $section.addClass("animated");
        } else {
            return false;
        }
    };


    /* -----------------------
     * Fullpage.js
     * --------------------- */
    $('#main').fullpage({
        anchors: ['home', 'about', 'services', 'contact'],
        responsiveWidth: maxW(),
        responsiveHeight: maxH(),
        navigation: true,
        afterLoad: function (anchorLink, index) {
            if (!siteLoad) {
                $onLoadTrigger.on("click", function () {
                    animateSection(index);
                });
            } else {
                animateSection(index);
            }
        }
    });


    /* ---------------------------------------------
     Menu
     --------------------------------------------- */
    // Caching selectors
    var $menu = $(".menu"),
        $showMenuButton = $(".show-menu-button"),
        $menuMask = $(".menu-mask"),
        $fpNav = $("#fp-nav");

    // Variables
    var menuAnimTime = 600;

    // Show menu function
    var showMenu = function () {
        $body.addClass("showMenu");
        // disable fullpage.js scrolling
        $.fn.fullpage.setAllowScrolling(false);
        $showMenuButton.addClass("active");
        $menuMask.addClass("mask-center");
        $menu.addClass("show");
        window.setTimeout(function () {
            $fpNav.hide();
            $menuMask.addClass("mask-right");
        }, menuAnimTime);
    };

    // Hide menu function
    var hideMenu = function () {
        $body.removeClass("showMenu");
        // enable fullpage.js scrolling
        $.fn.fullpage.setAllowScrolling(true);
        $showMenuButton.removeClass("active");
        $menuMask.removeClass("mask-right");
        window.setTimeout(function () {
            $menu.removeClass("show");
            $menuMask.removeClass("mask-center");
            $fpNav.show();
        }, menuAnimTime);
    };

    /* Add event listener */
    $showMenuButton.on("click", function () {
        if (!$body.hasClass("showMenu")) {
            showMenu();
        } else {
            hideMenu();
        }
    });

    /* Menu links */
    var $menuLinksUl = $menu.find(".menu-links-ul");
    $menuLinksUl.on("click", "a", function (e) {
        e.stopPropagation();
        e.preventDefault();
        var target = $(this).attr("href").split("#")[1];
        $.fn.fullpage.silentMoveTo(target);
        hideMenu();
    });

})(jQuery);