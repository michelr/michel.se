!function(n){function a(t){if(e[t])return e[t].exports;var i=e[t]={i:t,l:!1,exports:{}};return n[t].call(i.exports,i,i.exports,a),i.l=!0,i.exports}var e={};a.m=n,a.c=e,a.d=function(n,e,t){a.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:t})},a.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return a.d(e,"a",e),e},a.o=function(n,a){return Object.prototype.hasOwnProperty.call(n,a)},a.p="",a(a.s=0)}([function(n,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=e(1);e.n(t);!function(n){var a=(n(window),n(document),n("body")),e=(n("html, body"),!1),t="cubic-bezier(0.77, 0, 0.175, 1)",i=n(".section-home"),s=n(".section-about"),o=n(".section-services"),r=n(".section-contact"),c=n("<div/>",{class:"$onLoadTrigger",css:{display:"none"}});window.addEventListener("load",function(){var t=n(".preloader-container"),i=t.find(".loader");i.addClass("loader-anim-start"),window.setTimeout(function(){i.addClass("loader-anim-end")},1e3),window.setTimeout(function(){t.addClass("preloader-container-left")},2e3),window.setTimeout(function(){t.hide(),a.addClass("loaded"),e=!0,c.trigger("click")},3e3)},!1);!function(){var a=n(".slide-anim"),e=n(".fadeIn-anim");a.css("opacity",0),e.css("opacity",0),a.each(function(){var a=n(this),e=a.data("anim-delay")||1,i=a.data("anim-duration")||500,s=n("<div/>",{class:"anim-container"});a.wrap(s);var o=i/1e3+e/10,r="right "+i/1e3+"s "+t+" "+e/10+"s, left "+i/1e3+"s "+t+" "+o+"s",c=n("<div/>",{class:"anim-mask",css:{transition:r}});a.css("transition","opacity 0s linear "+o+"s"),c.insertAfter(a)})}();var d=function(a){var e=n(".section-"+a);if(e.hasClass("animated"))return!1;e.find(".slide-anim").each(function(){n(this).parent(".anim-container").addClass("animm")}),e.find(".fadeIn-anim").each(function(){var a=n(this),e=a.data("anim-delay")||1,i=a.data("anim-duration")||500,s="all .5s ease, transform "+i/1e3+"s "+t+" "+e/10+"s, opacity "+i/1e3+"s "+t+" "+e/10+"s";a.css({transition:s,opacity:1})}),e.addClass("animated")};n("#main").fullpage({anchors:["home","about","services","contact"],responsiveWidth:function(){var n=[];return n.push(i.width()),n.push(s.width()),n.push(o.width()),n.push(r.width()),Math.max.apply(Math,n)}(),responsiveHeight:function(){var n=[];return n.push(i.height()),n.push(s.height()),n.push(o.height()),n.push(r.height()),Math.max.apply(Math,n)}(),navigation:!0,afterLoad:function(n,a){e?d(a):c.on("click",function(){d(a)})}});var u=n(".menu"),l=n(".show-menu-button"),f=n(".menu-mask"),h=n("#fp-nav"),m=function(){a.addClass("showMenu"),n.fn.fullpage.setAllowScrolling(!1),l.addClass("active"),f.addClass("mask-center"),u.addClass("show"),window.setTimeout(function(){h.hide(),f.addClass("mask-right")},600)},p=function(){a.removeClass("showMenu"),n.fn.fullpage.setAllowScrolling(!0),l.removeClass("active"),f.removeClass("mask-right"),window.setTimeout(function(){u.removeClass("show"),f.removeClass("mask-center"),h.show()},600)};l.on("click",function(){a.hasClass("showMenu")?p():m()}),u.find(".menu-links-ul").on("click","a",function(a){a.stopPropagation(),a.preventDefault();var e=n(this).attr("href").split("#")[1];n.fn.fullpage.silentMoveTo(e),p()})}(jQuery)},function(n,a){}]);
//# sourceMappingURL=bundle.js.map