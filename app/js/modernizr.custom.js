/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-cssanimations-prefixed-setclasses !*/
!(function(e, n, t) {
    function r(e, n) {
        return typeof e === n;
    }
    function o() {
        var e, n, t, o, i, s, a;
        for (var l in S)
            if (S.hasOwnProperty(l)) {
                if (
                    ((e = []),
                    (n = S[l]),
                    n.name &&
                        (e.push(n.name.toLowerCase()),
                        n.options &&
                            n.options.aliases &&
                            n.options.aliases.length))
                )
                    for (t = 0; t < n.options.aliases.length; t++)
                        e.push(n.options.aliases[t].toLowerCase());
                for (
                    o = r(n.fn, "function") ? n.fn() : n.fn, i = 0;
                    i < e.length;
                    i++
                )
                    (s = e[i]),
                        (a = s.split(".")),
                        1 === a.length
                            ? (Modernizr[a[0]] = o)
                            : (!Modernizr[a[0]] ||
                                  Modernizr[a[0]] instanceof Boolean ||
                                  (Modernizr[a[0]] = new Boolean(
                                      Modernizr[a[0]]
                                  )),
                              (Modernizr[a[0]][a[1]] = o)),
                        C.push((o ? "" : "no-") + a.join("-"));
            }
    }
    function i(e) {
        var n = w.className,
            t = Modernizr._config.classPrefix || "";
        if ((x && (n = n.baseVal), Modernizr._config.enableJSClass)) {
            var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
            n = n.replace(r, "$1" + t + "js$2");
        }
        Modernizr._config.enableClasses &&
            ((n += " " + t + e.join(" " + t)),
            x ? (w.className.baseVal = n) : (w.className = n));
    }
    function s(e) {
        return e
            .replace(/([a-z])-([a-z])/g, function(e, n, t) {
                return n + t.toUpperCase();
            })
            .replace(/^-/, "");
    }
    function a(e, n) {
        return function() {
            return e.apply(n, arguments);
        };
    }
    function l(e, n, t) {
        var o;
        for (var i in e)
            if (e[i] in n)
                return t === !1
                    ? e[i]
                    : ((o = n[e[i]]), r(o, "function") ? a(o, t || n) : o);
        return !1;
    }
    function f(e, n) {
        return !!~("" + e).indexOf(n);
    }
    function u() {
        return "function" != typeof n.createElement
            ? n.createElement(arguments[0])
            : x
            ? n.createElementNS.call(
                  n,
                  "http://www.w3.org/2000/svg",
                  arguments[0]
              )
            : n.createElement.apply(n, arguments);
    }
    function p(e) {
        return e
            .replace(/([A-Z])/g, function(e, n) {
                return "-" + n.toLowerCase();
            })
            .replace(/^ms-/, "-ms-");
    }
    function c(n, t, r) {
        var o;
        if ("getComputedStyle" in e) {
            o = getComputedStyle.call(e, n, t);
            var i = e.console;
            if (null !== o) r && (o = o.getPropertyValue(r));
            else if (i) {
                var s = i.error ? "error" : "log";
                i[s].call(
                    i,
                    "getComputedStyle returning null, its possible modernizr test results are inaccurate"
                );
            }
        } else o = !t && n.currentStyle && n.currentStyle[r];
        return o;
    }
    function d() {
        var e = n.body;
        return e || ((e = u(x ? "svg" : "body")), (e.fake = !0)), e;
    }
    function m(e, t, r, o) {
        var i,
            s,
            a,
            l,
            f = "modernizr",
            p = u("div"),
            c = d();
        if (parseInt(r, 10))
            for (; r--; )
                (a = u("div")),
                    (a.id = o ? o[r] : f + (r + 1)),
                    p.appendChild(a);
        return (
            (i = u("style")),
            (i.type = "text/css"),
            (i.id = "s" + f),
            (c.fake ? c : p).appendChild(i),
            c.appendChild(p),
            i.styleSheet
                ? (i.styleSheet.cssText = e)
                : i.appendChild(n.createTextNode(e)),
            (p.id = f),
            c.fake &&
                ((c.style.background = ""),
                (c.style.overflow = "hidden"),
                (l = w.style.overflow),
                (w.style.overflow = "hidden"),
                w.appendChild(c)),
            (s = t(p, e)),
            c.fake
                ? (c.parentNode.removeChild(c),
                  (w.style.overflow = l),
                  w.offsetHeight)
                : p.parentNode.removeChild(p),
            !!s
        );
    }
    function v(n, r) {
        var o = n.length;
        if ("CSS" in e && "supports" in e.CSS) {
            for (; o--; ) if (e.CSS.supports(p(n[o]), r)) return !0;
            return !1;
        }
        if ("CSSSupportsRule" in e) {
            for (var i = []; o--; ) i.push("(" + p(n[o]) + ":" + r + ")");
            return (
                (i = i.join(" or ")),
                m(
                    "@supports (" +
                        i +
                        ") { #modernizr { position: absolute; } }",
                    function(e) {
                        return "absolute" == c(e, null, "position");
                    }
                )
            );
        }
        return t;
    }
    function y(e, n, o, i) {
        function a() {
            p && (delete T.style, delete T.modElem);
        }
        if (((i = r(i, "undefined") ? !1 : i), !r(o, "undefined"))) {
            var l = v(e, o);
            if (!r(l, "undefined")) return l;
        }
        for (
            var p, c, d, m, y, g = ["modernizr", "tspan", "samp"];
            !T.style && g.length;

        )
            (p = !0), (T.modElem = u(g.shift())), (T.style = T.modElem.style);
        for (d = e.length, c = 0; d > c; c++)
            if (
                ((m = e[c]),
                (y = T.style[m]),
                f(m, "-") && (m = s(m)),
                T.style[m] !== t)
            ) {
                if (i || r(o, "undefined")) return a(), "pfx" == n ? m : !0;
                try {
                    T.style[m] = o;
                } catch (h) {}
                if (T.style[m] != y) return a(), "pfx" == n ? m : !0;
            }
        return a(), !1;
    }
    function g(e, n, t, o, i) {
        var s = e.charAt(0).toUpperCase() + e.slice(1),
            a = (e + " " + E.join(s + " ") + s).split(" ");
        return r(n, "string") || r(n, "undefined")
            ? y(a, n, o, i)
            : ((a = (e + " " + z.join(s + " ") + s).split(" ")), l(a, n, t));
    }
    function h(e, n, r) {
        return g(e, t, t, n, r);
    }
    var C = [],
        S = [],
        _ = {
            _version: "3.6.0",
            _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0
            },
            _q: [],
            on: function(e, n) {
                var t = this;
                setTimeout(function() {
                    n(t[e]);
                }, 0);
            },
            addTest: function(e, n, t) {
                S.push({ name: e, fn: n, options: t });
            },
            addAsyncTest: function(e) {
                S.push({ name: null, fn: e });
            }
        },
        Modernizr = function() {};
    (Modernizr.prototype = _), (Modernizr = new Modernizr());
    var w = n.documentElement,
        x = "svg" === w.nodeName.toLowerCase(),
        b = "Moz O ms Webkit",
        E = _._config.usePrefixes ? b.split(" ") : [];
    _._cssomPrefixes = E;
    var P = function(n) {
        var r,
            o = prefixes.length,
            i = e.CSSRule;
        if ("undefined" == typeof i) return t;
        if (!n) return !1;
        if (
            ((n = n.replace(/^@/, "")),
            (r = n.replace(/-/g, "_").toUpperCase() + "_RULE"),
            r in i)
        )
            return "@" + n;
        for (var s = 0; o > s; s++) {
            var a = prefixes[s],
                l = a.toUpperCase() + "_" + r;
            if (l in i) return "@-" + a.toLowerCase() + "-" + n;
        }
        return !1;
    };
    _.atRule = P;
    var z = _._config.usePrefixes ? b.toLowerCase().split(" ") : [];
    _._domPrefixes = z;
    var N = { elem: u("modernizr") };
    Modernizr._q.push(function() {
        delete N.elem;
    });
    var T = { style: N.elem.style };
    Modernizr._q.unshift(function() {
        delete T.style;
    }),
        (_.testAllProps = g);
    _.prefixed = function(e, n, t) {
        return 0 === e.indexOf("@")
            ? P(e)
            : (-1 != e.indexOf("-") && (e = s(e)),
              n ? g(e, n, t) : g(e, "pfx"));
    };
    (_.testAllProps = h),
        Modernizr.addTest("cssanimations", h("animationName", "a", !0)),
        o(),
        i(C),
        delete _.addTest,
        delete _.addAsyncTest;
    for (var j = 0; j < Modernizr._q.length; j++) Modernizr._q[j]();
    e.Modernizr = Modernizr;
})(window, document);
