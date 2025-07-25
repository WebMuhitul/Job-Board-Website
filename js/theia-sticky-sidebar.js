/*!
 * Theia Sticky Sidebar v1.7.0
 * https://github.com/WeCodePixels/theia-sticky-sidebar
 *
 * Glues your website's sidebars, making them permanently visible while scrolling.
 *
 * Copyright 2013-2016 WeCodePixels and other contributors
 * Released under the MIT license
 */

! function(i) {
    i.fn.theiaStickySidebar = function(t) {
        function e(t, e) {
            return !0 === t.initialized || !(i("body").width() < t.minWidth) && (function(t, e) {
                t.initialized = !0, 0 === i("#theia-sticky-sidebar-stylesheet-" + t.namespace).length && i("head").append(i('<style id="theia-sticky-sidebar-stylesheet-' + t.namespace + '">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'));
                e.each(function() {
                    var e = {};
                    if (e.sidebar = i(this), e.options = t || {}, e.container = i(e.options.containerSelector), 0 == e.container.length && (e.container = e.sidebar.parent()), e.sidebar.parents().css("-webkit-transform", "none"), e.sidebar.css({
                            position: e.options.defaultPosition,
                            overflow: "visible",
                            "-webkit-box-sizing": "border-box",
                            "-moz-box-sizing": "border-box",
                            "box-sizing": "border-box"
                        }), e.stickySidebar = e.sidebar.find(".theiaStickySidebar"), 0 == e.stickySidebar.length) {
                        var a = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
                        e.sidebar.find("script").filter(function(i, t) {
                            return 0 === t.type.length || t.type.match(a)
                        }).remove(), e.stickySidebar = i("<div>").addClass("theiaStickySidebar").append(e.sidebar.children()), e.sidebar.append(e.stickySidebar)
                    }
                    e.marginBottom = parseInt(e.sidebar.css("margin-bottom")), e.paddingTop = parseInt(e.sidebar.css("padding-top")), e.paddingBottom = parseInt(e.sidebar.css("padding-bottom"));
                    var n = e.stickySidebar.offset().top,
                        s = e.stickySidebar.outerHeight();

                    function d() {
                        e.fixedScrollTop = 0, e.sidebar.css({
                            "min-height": "1px"
                        }), e.stickySidebar.css({
                            position: "static",
                            width: "",
                            transform: "none"
                        })
                    }
                    e.stickySidebar.css("padding-top", 1), e.stickySidebar.css("padding-bottom", 1), n -= e.stickySidebar.offset().top, s = e.stickySidebar.outerHeight() - s - n, 0 == n ? (e.stickySidebar.css("padding-top", 0), e.stickySidebarPaddingTop = 0) : e.stickySidebarPaddingTop = 1, 0 == s ? (e.stickySidebar.css("padding-bottom", 0), e.stickySidebarPaddingBottom = 0) : e.stickySidebarPaddingBottom = 1, e.previousScrollTop = null, e.fixedScrollTop = 0, d(), e.onScroll = function(e) {
                        if (e.stickySidebar.is(":visible"))
                            if (i("body").width() < e.options.minWidth) d();
                            else {
                                if (e.options.disableOnResponsiveLayouts) {
                                    var a = e.sidebar.outerWidth("none" == e.sidebar.css("float"));
                                    if (a + 50 > e.container.width()) return void d()
                                }
                                var n, s, r = i(document).scrollTop(),
                                    c = "static";
                                if (r >= e.sidebar.offset().top + (e.paddingTop - e.options.additionalMarginTop)) {
                                    var p, b = e.paddingTop + t.additionalMarginTop,
                                        l = e.paddingBottom + e.marginBottom + t.additionalMarginBottom,
                                        f = e.sidebar.offset().top,
                                        h = e.sidebar.offset().top + (n = e.container, s = n.height(), n.children().each(function() {
                                            s = Math.max(s, i(this).height())
                                        }), s),
                                        g = 0 + t.additionalMarginTop,
                                        S = e.stickySidebar.outerHeight() + b + l < i(window).height();
                                    p = S ? g + e.stickySidebar.outerHeight() : i(window).height() - e.marginBottom - e.paddingBottom - t.additionalMarginBottom;
                                    var u = f - r + e.paddingTop,
                                        m = h - r - e.paddingBottom - e.marginBottom,
                                        y = e.stickySidebar.offset().top - r,
                                        k = e.previousScrollTop - r;
                                    "fixed" == e.stickySidebar.css("position") && "modern" == e.options.sidebarBehavior && (y += k), "stick-to-top" == e.options.sidebarBehavior && (y = t.additionalMarginTop), "stick-to-bottom" == e.options.sidebarBehavior && (y = p - e.stickySidebar.outerHeight()), y = k > 0 ? Math.min(y, g) : Math.max(y, p - e.stickySidebar.outerHeight()), y = Math.max(y, u), y = Math.min(y, m - e.stickySidebar.outerHeight());
                                    var v = e.container.height() == e.stickySidebar.outerHeight();
                                    c = (v || y != g) && (v || y != p - e.stickySidebar.outerHeight()) ? r + y - e.sidebar.offset().top - e.paddingTop <= t.additionalMarginTop ? "static" : "absolute" : "fixed"
                                }
                                if ("fixed" == c) {
                                    var x = i(document).scrollLeft();
                                    e.stickySidebar.css({
                                        position: "fixed",
                                        width: o(e.stickySidebar) + "px",
                                        transform: "translateY(" + y + "px)",
                                        left: e.sidebar.offset().left + parseInt(e.sidebar.css("padding-left")) - x + "px",
                                        top: "0px"
                                    })
                                } else if ("absolute" == c) {
                                    var T = {};
                                    "absolute" != e.stickySidebar.css("position") && (T.position = "absolute", T.transform = "translateY(" + (r + y - e.sidebar.offset().top - e.stickySidebarPaddingTop - e.stickySidebarPaddingBottom) + "px)", T.top = "0px"), T.width = o(e.stickySidebar) + "px", T.left = "", e.stickySidebar.css(T)
                                } else "static" == c && d();
                                "static" != c && 1 == e.options.updateSidebarHeight && e.sidebar.css({
                                    "min-height": e.stickySidebar.outerHeight() + e.stickySidebar.offset().top - e.sidebar.offset().top + e.paddingBottom
                                }), e.previousScrollTop = r
                            }
                    }, e.onScroll(e), i(document).on("scroll." + e.options.namespace, function(i) {
                        return function() {
                            i.onScroll(i)
                        }
                    }(e)), i(window).on("resize." + e.options.namespace, function(i) {
                        return function() {
                            i.stickySidebar.css({
                                position: "static"
                            }), i.onScroll(i)
                        }
                    }(e)), "undefined" != typeof ResizeSensor && new ResizeSensor(e.stickySidebar[0], function(i) {
                        return function() {
                            i.onScroll(i)
                        }
                    }(e))
                })
            }(t, e), !0)
        }

        function o(i) {
            var t;
            try {
                t = i[0].getBoundingClientRect().width
            } catch (i) {}
            return void 0 === t && (t = i.width()), t
        }
        return (t = i.extend({
                containerSelector: "",
                additionalMarginTop: 0,
                additionalMarginBottom: 0,
                updateSidebarHeight: !0,
                minWidth: 0,
                disableOnResponsiveLayouts: !0,
                sidebarBehavior: "modern",
                defaultPosition: "relative",
                namespace: "TSS"
            }, t)).additionalMarginTop = parseInt(t.additionalMarginTop) || 0, t.additionalMarginBottom = parseInt(t.additionalMarginBottom) || 0,
            function(t, o) {
                e(t, o) || (console.log("TSS: Body width smaller than options.minWidth. Init is delayed."), i(document).on("scroll." + t.namespace, function(t, o) {
                    return function(a) {
                        var n = e(t, o);
                        n && i(this).unbind(a)
                    }
                }(t, o)), i(window).on("resize." + t.namespace, function(t, o) {
                    return function(a) {
                        var n = e(t, o);
                        n && i(this).unbind(a)
                    }
                }(t, o)))
            }(t, this), this
    }
}(jQuery);