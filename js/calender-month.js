if (typeof DayPilot === 'undefined') {
    var DayPilot = {};
};
if (typeof DayPilot.Global === 'undefined') {
    DayPilot.Global = {};
};
(function() {
    if (typeof DayPilot.$ !== 'undefined') {
        return;
    };
    DayPilot.$ = function(id) {
        return document.getElementById(id);
    };
    DayPilot.mo = function(t, ev) {
        ev = ev || window.event;
        if (ev.layerX) {
            var $a = {
                x: ev.layerX,
                y: ev.layerY
            };
            if (!t) {
                return $a;
            };
            return $a;
        };
        if (ev.offsetX) {
            return {
                x: ev.offsetX,
                y: ev.offsetY
            };
        };
        return null;
    };
    DayPilot.isKhtml = (navigator && navigator.userAgent && navigator.userAgent.indexOf("KHTML") !== -1);
    DayPilot.isIE = (navigator && navigator.userAgent && navigator.userAgent.indexOf("MSIE") !== -1);
    DayPilot.isIE7 = (navigator && navigator.userAgent && navigator.userAgent.indexOf("MSIE 7") !== -1);
    DayPilot.isIEQuirks = DayPilot.isIE && (document.compatMode && document.compatMode === "BackCompat");
    DayPilot.browser = {};
    DayPilot.browser.ie9 = (navigator && navigator.userAgent && navigator.userAgent.indexOf("MSIE 9") !== -1);
    DayPilot.browser.ielt9 = (function() {
        var $b = document.createElement("div");
        $b.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
        var $c = ($b.getElementsByTagName("i").length === 1);
        return $c;
    })();
    DayPilot.mo2 = function($d, ev) {
        ev = ev || window.event;
        if (typeof(ev.offsetX) !== 'undefined') {
            var $a = {
                x: ev.offsetX + 1,
                y: ev.offsetY + 1
            };
            if (!$d) {
                return $a;
            };
            var $e = ev.srcElement;
            while ($e && $e !== $d) {
                if ($e.tagName !== 'SPAN') {
                    $a.x += $e.offsetLeft;
                    if ($e.offsetTop > 0) {
                        $a.y += $e.offsetTop - $e.scrollTop;
                    }
                };
                $e = $e.offsetParent;
            };
            if ($e) {
                return $a;
            };
            return null;
        };
        if (typeof(ev.layerX) !== 'undefined') {
            var $a = {
                x: ev.layerX,
                y: ev.layerY,
                $f: ev.target
            };
            if (!$d) {
                return $a;
            };
            var $e = ev.target;
            while ($e && $e.style.position !== 'absolute' && $e.style.position !== 'relative') {
                $e = $e.parentNode;
                if (DayPilot.isKhtml) {
                    $a.y += $e.scrollTop;
                }
            }
            while ($e && $e !== $d) {
                $a.x += $e.offsetLeft;
                $a.y += $e.offsetTop - $e.scrollTop;
                $e = $e.offsetParent;
            };
            if ($e) {
                return $a;
            };
            return null;
        };
        return null;
    };
    DayPilot.mo3 = function($d, ev) {
        ev = ev || window.event;
        var $g = DayPilot.page(ev);
        if ($g) {
            var $h = DayPilot.abs($d);
            return {
                x: $g.x - $h.x,
                y: $g.y - $h.y
            };
        };
        return DayPilot.mo2($d, ev);
    };
    DayPilot.mc = function(ev) {
        if (ev.pageX || ev.pageY) {
            return {
                x: ev.pageX,
                y: ev.pageY
            };
        };
        return {
            x: ev.clientX + document.documentElement.scrollLeft,
            y: ev.clientY + document.documentElement.scrollTop
        };
    };
    DayPilot.complete = function(f) {
        if (document.readyState === "complete") {
            f();
            return;
        };
        if (!DayPilot.complete.list) {
            DayPilot.complete.list = [];
            DayPilot.re(document, "readystatechange", function() {
                if (document.readyState === "complete") {
                    for (var i = 0; i < DayPilot.complete.list.length; i++) {
                        var d = DayPilot.complete.list[i];
                        d();
                    };
                    DayPilot.complete.list = [];
                }
            });
        };
        DayPilot.complete.list.push(f);
    };
    DayPilot.page = function(ev) {
        ev = ev || window.event;
        if (typeof ev.pageX !== 'undefined') {
            return {
                x: ev.pageX,
                y: ev.pageY
            };
        };
        if (typeof ev.clientX !== 'undefined') {
            return {
                x: ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
                y: ev.clientY + document.body.scrollTop + document.documentElement.scrollTop
            };
        };
        return null;
    };
    DayPilot.abs = function(element, $i) {
        if (!element) {
            return null;
        };
        var r = {
            x: element.offsetLeft,
            y: element.offsetTop,
            w: element.clientWidth,
            h: element.clientHeight,
            toString: function() {
                return "x:" + this.x + " y:" + this.y + " w:" + this.w + " h:" + this.h;
            }
        };
        if (element.getBoundingClientRect) {
            var b = null;
            try {
                b = element.getBoundingClientRect();
            } catch (e) {
                b = {
                    top: element.offsetTop,
                    $j: element.offsetLeft
                };
            };
            r.x = b.left;
            r.y = b.top;
            var d = DayPilot.doc();
            r.x -= d.clientLeft || 0;
            r.y -= d.clientTop || 0;
            var $k = DayPilot.pageOffset();
            r.x += $k.x;
            r.y += $k.y;
            if ($i) {
                var $l = DayPilot.absOffsetBased(element, false);
                var $i = DayPilot.absOffsetBased(element, true);
                r.x += $i.x - $l.x;
                r.y += $i.y - $l.y;
                r.w = $i.w;
                r.h = $i.h;
            };
            return r;
        } else {
            return DayPilot.absOffsetBased(element, $i);
        }
    };
    DayPilot.isArray = function(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    };
    DayPilot.absOffsetBased = function(element, $i) {
        var r = {
            x: element.offsetLeft,
            y: element.offsetTop,
            w: element.clientWidth,
            h: element.clientHeight,
            toString: function() {
                return "x:" + this.x + " y:" + this.y + " w:" + this.w + " h:" + this.h;
            }
        };
        while (DayPilot.op(element)) {
            element = DayPilot.op(element);
            r.x -= element.scrollLeft;
            r.y -= element.scrollTop;
            if ($i) {
                if (r.x < 0) {
                    r.w += r.x;
                    r.x = 0;
                };
                if (r.y < 0) {
                    r.h += r.y;
                    r.y = 0;
                };
                if (element.scrollLeft > 0 && r.x + r.w > element.clientWidth) {
                    r.w -= r.x + r.w - element.clientWidth;
                };
                if (element.scrollTop && r.y + r.h > element.clientHeight) {
                    r.h -= r.y + r.h - element.clientHeight;
                }
            };
            r.x += element.offsetLeft;
            r.y += element.offsetTop;
        };
        var $k = DayPilot.pageOffset();
        r.x += $k.x;
        r.y += $k.y;
        return r;
    };
    DayPilot.wd = function() {
        var $m = DayPilot.isIEQuirks;
        var $n = document.documentElement.clientHeight;
        if ($m) {
            $n = document.body.clientHeight;
        };
        var $o = document.documentElement.clientWidth;
        if ($m) {
            $o = document.body.clientWidth;
        };
        var $p = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var $q = (document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft;
        var $r = {};
        $r.width = $o;
        $r.height = $n;
        $r.scrollTop = $p;
        $r.scrollLeft = $q;
        return $r;
    };
    DayPilot.op = function(element) {
        try {
            return element.offsetParent;
        } catch (e) {
            return document.body;
        }
    };
    DayPilot.distance = function($s, $t) {
        return Math.sqrt(Math.pow($s.x - $t.x, 2) + Math.pow($s.y - $t.y, 2));
    };
    DayPilot.doc = function() {
        var de = document.documentElement;
        return (de && de.clientHeight) ? de : document.body;
    };
    DayPilot.pageOffset = function() {
        if (typeof pageXOffset !== 'undefined') {
            return {
                x: pageXOffset,
                y: pageYOffset
            };
        };
        var d = DayPilot.doc();
        return {
            x: d.scrollLeft,
            y: d.scrollTop
        };
    };
    DayPilot.ac = function(e, $u) {
        if (!$u) {
            var $u = [];
        };
        for (var i = 0; e.children && i < e.children.length; i++) {
            $u.push(e.children[i]);
            DayPilot.ac(e.children[i], $u);
        };
        return $u;
    };
    DayPilot.indexOf = function($v, $w) {
        if (!$v || !$v.length) {
            return -1;
        };
        for (var i = 0; i < $v.length; i++) {
            if ($v[i] === $w) {
                return i;
            }
        };
        return -1;
    };
    DayPilot.rfa = function($v, $w) {
        var i = DayPilot.indexOf($v, $w);
        if (i === -1) {
            return;
        };
        $v.splice(i, 1);
    };
    DayPilot.sheet = function() {
        var style = document.createElement("style");
        style.setAttribute("type", "text/css");
        if (!style.styleSheet) {
            style.appendChild(document.createTextNode(""));
        };
        var h = document.head || document.getElementsByTagName('head')[0];
        h.appendChild(style);
        var $x = !!style.styleSheet;
        var $y = {};
        $y.rules = [];
        $y.commit = function() {
            if ($x) {
                style.styleSheet.cssText = this.rules.join("\n");
            }
        };
        $y.add = function($z, $A, $B) {
            if ($x) {
                this.rules.push($z + "{" + $A + "\u007d");
                return;
            };
            if (style.sheet.insertRule) {
                style.sheet.insertRule($z + "{" + $A + "\u007d", $B);
            } else if (style.sheet.addRule) {
                style.sheet.addRule($z, $A, $B);
            }
        };
        return $y;
    };
    DayPilot.Debug = function($C) {
        var debug = this;
        this.printToBrowserConsole = false;
        this.messages = [];
        this.$22 = null;
        this.clear = function() {
            this.messages = [];
            if (debug.$22) {
                debug.$22.innerHTML = '';
            }
        };
        this.hide = function() {
            DayPilot.de(debug.$22);
            debug.$22 = null;
        };
        this.show = function() {
            if (debug.$22) {
                debug.hide();
            };
            var $D = $C.nav.top;
            var $b = document.createElement("div");
            $b.style.position = "absolute";
            $b.style.top = "0px";
            $b.style.bottom = "0px";
            $b.style.left = "0px";
            $b.style.right = "0px";
            $b.style.backgroundColor = "black";
            $b.style.color = "#ccc";
            $b.style.overflow = "auto";
            $b.style.webkitUserSelect = 'auto';
            $b.style.MozUserSelect = 'all';
            $b.onclick = function() {
                debug.hide();
            };
            for (var i = 0; i < this.messages.length; i++) {
                var $E = debug.messages[i];
                var $F = $E.$23();
                $b.appendChild($F);
            };
            this.$22 = $b;
            $D.appendChild($b);
        };
        this.message = function($G, $H) {
            var $E = {};
            $E.time = new DayPilot.Date();
            $E.level = $H || "debug";
            $E.text = $G;
            $E.$23 = function() {
                var $F = document.createElement("div");
                $F.innerHTML = $E.time + " (" + $E.level + "): " + $E.text;
                switch ($E.level) {
                    case "error":
                        $F.style.color = "red";
                        break;
                    case "warning":
                        $F.style.color = "orange";
                        break;
                    case "info":
                        $F.style.color = "white";
                        break;
                    case "debug":
                        break;
                };
                return $F;
            };
            this.messages.push($E);
            if (this.printToBrowserConsole && typeof console !== 'undefined') {
                console.log($E);
            }
        };
    };
    DayPilot.re = function(el, ev, $I) {
        if (el.addEventListener) {
            el.addEventListener(ev, $I, false);
        } else if (el.attachEvent) {
            el.attachEvent("on" + ev, $I);
        }
    };
    DayPilot.ue = function(el, ev, $I) {
        if (el.removeEventListener) {
            el.removeEventListener(ev, $I, false);
        } else if (el.detachEvent) {
            el.detachEvent("on" + ev, $I);
        }
    };
    DayPilot.tr = function($J) {
        if (!$J) return '';
        return $J.replace(/^\s+|\s+$/g, "");
    };
    DayPilot.ds = function(d) {
        return DayPilot.Date.toStringSortable(d);
    };
    DayPilot.gs = function(el, $K) {
        var x = el;
        if (x.currentStyle) var y = x.currentStyle[$K];
        else if (window.getComputedStyle) var y = document.defaultView.getComputedStyle(x, null).getPropertyValue($K);
        if (typeof(y) === 'undefined') y = '';
        return y;
    };
    DayPilot.ea = function(a) {
        var $L = "";
        for (var i = 0; i < a.length; i++) {
            if (a[i] || typeof(a[i]) === 'number') {
                if (a[i].isDayPilotDate) {
                    a[i] = a[i].toStringSortable();
                } else if (a[i].getFullYear) {
                    a[i] = DayPilot.ds(a[i]);
                };
                $L += encodeURIComponent(a[i]);
            };
            if (i + 1 < a.length) {
                $L += '&';
            }
        };
        return $L;
    };
    DayPilot.he = function(str) {
        var $r = str.replace(/&/g, "&amp;");
        $r = $r.replace(/</g, "&lt;");
        $r = $r.replace(/>/g, "&gt;");
        $r = $r.replace(/"/g, "&quot;");
        return $r;
    };
    DayPilot.ci = function($M) {
        var i = $M.cellIndex;
        if (i && i > 0) return i;
        var tr = $M.parentNode;
        var $N = tr.cells.length;
        for (i = 0; i < $N; i++) {
            if (tr.cells[i] === $M) return i;
        };
        return null;
    };
    DayPilot.us = function(element) {
        if (element) {
            element.setAttribute("unselectable", "on");
            element.style.MozUserSelect = 'none';
            for (var i = 0; i < element.childNodes.length; i++) {
                if (element.childNodes[i].nodeType === 1) {
                    DayPilot.us(element.childNodes[i]);
                }
            }
        }
    };
    DayPilot.pu = function(d) {
        var a = d.attributes,
            i, l, n;
        if (a) {
            l = a.length;
            for (i = 0; i < l; i += 1) {
                if (!a[i]) {
                    continue;
                };
                n = a[i].name;
                if (typeof d[n] === 'function') {
                    d[n] = null;
                }
            }
        };
        a = d.childNodes;
        if (a) {
            l = a.length;
            for (i = 0; i < l; i += 1) {
                var $u = DayPilot.pu(d.childNodes[i]);
            }
        }
    };
    DayPilot.puc = function(d) {
        var a = d.childNodes,
            i, l;
        if (a) {
            var l = a.length;
            for (i = 0; i < l; i += 1) {
                DayPilot.pu(d.childNodes[i]);
            }
        }
    };
    DayPilot.de = function(e) {
        if (!e) {
            return;
        };
        if (!e.parentNode) {
            return;
        };
        e.parentNode.removeChild(e);
    };
    DayPilot.gr = function($M) {
        var i = 0;
        var tr = $M.parentNode;
        while (tr.previousSibling) {
            tr = tr.previousSibling;
            if (tr.tagName === "TR") {
                i++;
            }
        };
        return i;
    };
    DayPilot.fade = function(element, $O, end) {
        var $P = 50;
        var $i = element.style.display !== 'none';
        var $Q = $O > 0;
        var $R = $O < 0;
        if ($O === 0) {
            return;
        };
        if ($Q && !$i) {
            element.target = parseFloat(element.style.opacity);
            element.opacity = 0;
            element.style.opacity = 0;
            element.style.filter = "alpha(opacity=0)";
            element.style.display = '';
        } else if ($R && !element.target) {
            element.target = element.style.opacity;
        } else {
            var $e = element.opacity;
            var $S = Math.floor(10 * ($e + $O)) / 10;
            if ($Q && $S > element.target) {
                $S = element.target;
            };
            if ($R && $S < 0) {
                $S = 0;
            };
            var ie = $S * 100;
            element.opacity = $S;
            element.style.opacity = $S;
            element.style.filter = "alpha(opacity=" + ie + ")";
        };
        if (($Q && (element.opacity >= element.target || element.opacity >= 1)) || ($R && element.opacity <= 0)) {
            element.target = null;
            if ($R) {
                element.style.opacity = element.target;
                element.opacity = element.target;
                var $T = element.target ? "alpha(opacity=" + (element.target * 100) + ")" : null;
                element.style.filter = $T;
                element.style.display = 'none';
            };
            if (end && typeof end === 'function') {
                end();
            }
        } else {
            this.messageTimeout = setTimeout(function() {
                DayPilot.fade(element, $O, end);
            }, $P);
        }
    };
    DayPilot.sw = function(element) {
        if (!element) {
            return 0;
        };
        return element.offsetWidth - element.clientWidth;
    };
    DayPilot.swa = function() {
        var $b = document.createElement("div");
        $b.style.position = "absolute";
        $b.style.top = "-2000px";
        $b.style.left = "-2000px";
        $b.style.width = '200px';
        $b.style.height = '100px';
        $b.style.overflow = 'auto';
        var $U = document.createElement("div");
        $U.style.width = '300px';
        $U.style.height = '300px';
        $b.appendChild($U);
        document.body.appendChild($b);
        var sw = DayPilot.sw($b);
        document.body.removeChild($b);
        return sw;
    };
    DayPilot.sh = function(element) {
        if (!element) {
            return 0;
        };
        return element.offsetHeight - element.clientHeight;
    };
    DayPilot.guid = function() {
        var S4 = function() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return ("" + S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };
    DayPilot.ua = function($v) {
        var u = {},
            a = [];
        for (var i = 0, l = $v.length; i < l; ++i) {
            if ($v[i] in u) continue;
            a.push($v[i]);
            u[$v[i]] = 1;
        };
        return a;
    };
    (function() {
        DayPilot.pop = wave;

        function wave($b, $V) {
            var $d = {
                w: $b.offsetWidth,
                h: $b.offsetHeight,
                x: parseInt($b.style.left),
                y: parseInt($b.style.top)
            };
            $d.height = $b.style.height;
            $d.width = $b.style.width;
            $d.top = $b.style.top;
            $d.left = $b.style.left;
            $d.toString = function() {
                return "w: " + this.w + " h:" + this.h
            };
            var $W = {};
            $W.finished = null;
            $W.vertical = 'center';
            $W.horizontal = 'center';
            if ($V) {
                for (var name in $V) {
                    $W[name] = $V[name];
                }
            };
            $b.style.visibility = 'hidden';
            $b.style.display = '';
            var $X = $V.animation || "fast";
            var $Y = createPlan($X);
            $Y.div = $b;
            $Y.i = 0;
            $Y.target = $d;
            $Y.config = $W;
            doStep($Y);
        };

        function createPlan($Z) {
            var $00 = function() {
                var $Y = [];
                $Y.time = 10;
                var $01;
                var $O = 0.08;
                $01 = 0.1;
                for (var i = $01; i < 1.2; i += $O) {
                    $Y.push(i);
                    $01 = i;
                };
                $O = 0.03;
                for (var i = $01; i > 0.8; i -= $O) {
                    $Y.push(i);
                    $01 = i;
                };
                for (var i = $01; i <= 1; i += $O) {
                    $Y.push(i);
                    $01 = i;
                };
                return $Y;
            };
            var $02 = function() {
                var $Y = [];
                $Y.time = 15;
                var $01;
                var $O = 0.04;
                $01 = 0.1;
                for (var i = $01; i <= 1; i += $O) {
                    $Y.push(i);
                    $01 = i;
                };
                return $Y;
            };
            var $03 = function() {
                var $Y = [];
                $Y.time = 9;
                var $01;
                var $O = 0.04;
                $01 = 0.1;
                for (var i = $01; i <= 1; i += $O) {
                    $Y.push(i);
                    $01 = i;
                };
                return $Y;
            };
            var $04 = {
                "fast": $03,
                "slow": $02,
                "jump": $00
            };
            if (!$04[$Z]) {
                $Z = "fast";
            };
            return $04[$Z]();
        };

        function doStep($Y) {
            var $b = $Y.div;
            var $05 = $Y[$Y.i];
            var $06 = $05 * $Y.target.h;
            var top;
            switch ($Y.config.vertical) {
                case "center":
                    top = $Y.target.y - ($06 - $Y.target.h) / 2;
                    break;
                case "top":
                    top = $Y.target.y;
                    break;
                case "bottom":
                    top = $Y.target.y - ($06 - $Y.target.h);
                    break;
                default:
                    throw "Unexpected 'vertical' value.";
            };
            var $07 = $05 * $Y.target.w;
            var $j;
            switch ($Y.config.horizontal) {
                case "left":
                    $j = $Y.target.x;
                    break;
                case "center":
                    $j = $Y.target.x - ($07 - $Y.target.w) / 2;
                    break;
                case "right":
                    $j = $Y.target.x - ($07 - $Y.target.w);
                    break;
                default:
                    throw "Unexpected 'horizontal' value.";
            };
            var wd = DayPilot.wd();
            var $08 = (wd.height + wd.scrollTop) - (top + $06);
            if ($08 < 0) {
                top += $08;
            };
            var $09 = (wd.width) - ($j + $07);
            if ($09 < 0) {
                $j += $09;
            };
            $b.style.height = $06 + "px";
            $b.style.top = top + "px";
            $b.style.width = $07 + "px";
            $b.style.left = $j + "px";
            $b.style.visibility = 'visible';
            $Y.i++;
            if ($Y.i < $Y.length - 1) {
                setTimeout((function($Y) {
                    return function() {
                        doStep($Y);
                    };
                })($Y), $Y.time);
            } else {
                $b.style.width = $Y.target.width;
                $b.style.height = $Y.target.height;
                $b.style.top = $Y.target.top;
                $b.style.left = $Y.target.left;
                if (typeof $Y.config.finished === 'function') {
                    $Y.config.finished();
                }
            }
        }
    })();
    DayPilot.Util = {};
    DayPilot.Util.addClass = function($w, name) {
        if (!$w) {
            return;
        };
        if (!$w.className) {
            $w.className = name;
            return;
        };
        var $0a = new RegExp("(^|\\s)" + name + "($|\\s)");
        if (!$0a.test($w.className)) {
            $w.className = $w.className + ' ' + name;
        }
    };
    DayPilot.Util.addClassToString = function(str, name) {
        if (!str) {
            return name;
        };
        var $0a = new RegExp("(^|\\s)" + name + "($|\\s)");
        if (!$0a.test(str)) {
            return str + ' ' + name;
        } else {
            return str;
        }
    };
    DayPilot.Util.removeClassFromString = function(str, name) {
        if (!str) {
            return "";
        };
        var $0a = new RegExp("(^|\\s)" + name + "($|\\s)");
        return str.replace($0a, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    };
    DayPilot.Util.removeClass = function($w, name) {
        if (!$w) {
            return;
        };
        var $0a = new RegExp("(^|\\s)" + name + "($|\\s)");
        $w.className = $w.className.replace($0a, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    };
    DayPilot.Util.props = function(o) {
        var t = [];
        for (a in o) {
            t.push(a);
            t.push(o[a]);
        };
        return t.join("-");
    };
    DayPilot.Util.propArray = function($0b, name) {
        var $r = [];
        if (!$0b || !$0b.length) {
            return $r;
        };
        for (var i = 0; i < $0b.length; i++) {
            $r.push($0b[i][name]);
        };
        return $r;
    };
    DayPilot.Util.updatePropsFromArray = function($0b, name, $v) {
        for (var i = 0; i < $v.length; i++) {
            $0b[i][name] = $v[i];
        }
    };
    DayPilot.Util.copyProps = function($0c, $d, $0b) {
        if (!$0c) {
            return;
        };
        if (typeof $0b === 'undefined') {
            for (var name in $0c) {
                $d[name] = $0c[name];
            }
        } else {
            for (var i = 0; i < $0b.length; i++) {
                var name = $0b[i];
                $d[name] = $0c[name];
            }
        }
    };
    DayPilot.Areas = {};
    DayPilot.Areas.showAreas = function($b, e, ev) {
        if (DayPilot.Global.resizing) {
            return;
        };
        if (DayPilot.Global.moving) {
            return;
        };
        if (DayPilot.Areas.all && DayPilot.Areas.all.length > 0) {
            for (var i = 0; i < DayPilot.Areas.all.length; i++) {
                var d = DayPilot.Areas.all[i];
                if (d !== $b) {
                    DayPilot.Areas.hideAreas(d, ev);
                }
            }
        };
        if ($b.active) {
            return;
        };
        $b.active = {};
        var $0d = e.areas;
        if (!$0d && e.data && e.data.areas) {
            $0d = e.data.areas;
        };
        if (!$0d || $0d.length === 0) {
            return;
        };
        if ($b.areas && $b.areas.length > 0) {
            return;
        };
        $b.areas = [];
        for (var i = 0; i < $0d.length; i++) {
            var $0e = $0d[i];
            if ($0e.v !== 'Hover') {
                continue;
            };
            var a = DayPilot.Areas.createArea($b, e, $0e);
            $b.areas.push(a);
            $b.appendChild(a);
            DayPilot.Areas.all.push($b);
        };
        $b.active.children = DayPilot.ac($b);
    };
    DayPilot.Areas.createArea = function($b, e, $0e) {
        var a = document.createElement("div");
        a.isActiveArea = true;
        a.style.position = "absolute";
        a.setAttribute("unselectable", "on");
        if (typeof $0e.w !== 'undefined') {
            a.style.width = $0e.w + "px";
        };
        if (typeof $0e.h !== 'undefined') {
            a.style.height = $0e.h + "px";
        };
        if (typeof $0e.right !== 'undefined') {
            a.style.right = $0e.right + "px";
        };
        if (typeof $0e.top !== 'undefined') {
            a.style.top = $0e.top + "px";
        };
        if (typeof $0e.left !== 'undefined') {
            a.style.left = $0e.left + "px";
        };
        if (typeof $0e.bottom !== 'undefined') {
            a.style.bottom = $0e.bottom + "px";
        };
        if (typeof $0e.html !== 'undefined' && $0e.html) {
            a.innerHTML = $0e.html;
        };
        if ($0e.css) {
            a.className = $0e.css;
        };
        if ($0e.action === "ResizeEnd" || $0e.action === "ResizeStart" || $0e.action === "Move") {
            if (e.calendar.isCalendar) {
                switch ($0e.action) {
                    case "ResizeEnd":
                        $0e.cursor = "s-resize";
                        $0e.dpBorder = "bottom";
                        break;
                    case "ResizeStart":
                        $0e.cursor = "n-resize";
                        $0e.dpBorder = "top";
                        break;
                    case "Move":
                        $0e.cursor = "move";
                        break;
                }
            };
            if (e.calendar.isScheduler || e.calendar.isMonth) {
                switch ($0e.action) {
                    case "ResizeEnd":
                        $0e.cursor = "e-resize";
                        $0e.dpBorder = "right";
                        break;
                    case "ResizeStart":
                        $0e.cursor = "w-resize";
                        $0e.dpBorder = "left";
                        break;
                    case "Move":
                        $0e.cursor = "move";
                        break;
                }
            };
            a.onmousemove = (function($b, e, $0e) {
                return function(ev) {
                    var ev = ev || window.event;
                    $b.style.cursor = $0e.cursor;
                    if ($0e.dpBorder) $b.dpBorder = $0e.dpBorder;
                    ev.cancelBubble = true;
                };
            })($b, e, $0e);
            a.onmouseout = (function($b, e, $0e) {
                return function(ev) {
                    $b.style.cursor = '';
                };
            })($b, e, $0e);
        };
        if ($0e.action === "Bubble" && e.isEvent) {
            a.onmousemove = (function($b, e, $0e) {
                return function(ev) {
                    if (e.calendar.bubble) {
                        e.calendar.bubble.showEvent(e);
                    }
                };
            })($b, e, $0e);
            a.onmouseout = (function($b, e, $0e) {
                return function(ev) {
                    if (typeof DayPilot.Bubble !== "undefined") {
                        if (e.calendar.bubble) {
                            e.calendar.bubble.hideOnMouseOut();
                        }
                    }
                };
            })($b, e, $0e);
        };
        a.onmousedown = (function($b, e, $0e) {
            return function(ev) {
                var $0f = true;
                if ($0f) {
                    if ($0e.action === "Move" || $0e.action === "ResizeEnd" || $0e.action === "ResizeStart") {
                        return;
                    };
                    ev = ev || window.event;
                    ev.cancelBubble = true;
                }
            };
        })($b, e, $0e);
        a.onclick = (function($b, e, $0e) {
            return function(ev) {
                var ev = ev || window.event;
                switch ($0e.action) {
                    case "JavaScript":
                        var f = $0e.js;
                        if (typeof f === 'string') {
                            f = eval("0, " + $0e.js);
                        };
                        if (typeof f === 'function') {
                            f.call(this, e);
                        };
                        break;
                    case "ContextMenu":
                        var m = $0e.menu;
                        if (typeof m === 'string') {
                            m = eval(m);
                        };
                        if (m && m.show) {
                            m.show(e);
                        };
                        break;
                    case "CallBack":
                        alert("callback not implemented yet, id: " + $0e.id);
                        break;
                };
                ev.cancelBubble = true;
            };
        })($b, e, $0e);
        return a;
    };
    DayPilot.Areas.all = [];
    DayPilot.Areas.hideAreas = function($b, ev) {
        if (!$b) {
            return;
        };
        if (!$b || !$b.active) {
            return;
        };
        var $0g = $b.active;
        var $0d = $b.areas;
        if ($0g && $0g.children) {
            var ev = ev || window.event;
            if (ev) {
                var $d = ev.toElement || ev.relatedTarget;
                if (~DayPilot.indexOf($0g.children, $d)) {
                    return;
                }
            }
        };
        if (!$0d || $0d.length === 0) {
            $b.active = null;
            return;
        };
        for (var i = 0; i < $0d.length; i++) {
            var a = $0d[i];
            $b.removeChild(a);
        };
        $b.active = null;
        $b.areas = [];
        DayPilot.rfa(DayPilot.Areas.all, $b);
        $0g.children = null;
    };
    DayPilot.Areas.hideAll = function(ev) {
        if (!DayPilot.Areas.all || DayPilot.Areas.all.length === 0) {
            return;
        };
        for (var i = 0; i < DayPilot.Areas.all.length; i++) {
            DayPilot.Areas.hideAreas(DayPilot.Areas.all[i], ev);
        }
    };
    DayPilot.Action = function($C, $0h, $0i, $0j) {
        this.calendar = $C;
        this.isAction = true;
        this.action = $0h;
        this.params = $0i;
        this.data = $0j;
        this.notify = function() {
            $C.internal.invokeEvent("Immediate", this.action, this.params, this.data);
        };
        this.auto = function() {
            $C.internal.invokeEvent("Notify", this.action, this.params, this.data);
        };
        this.queue = function() {
            $C.queue.add(this);
        };
        this.toJSON = function() {
            var $0k = {};
            $0k.name = this.action;
            $0k.params = this.params;
            $0k.data = this.data;
            return $0k;
        };
    };
    DayPilot.Selection = function($0l, end, $0m, $0n) {
        this.type = 'selection';
        this.start = $0l.isDayPilotDate ? $0l : new DayPilot.Date($0l);
        this.end = end.isDayPilotDate ? end : new DayPilot.Date(end);
        this.resource = $0m;
        this.root = $0n;
        this.toJSON = function($0o) {
            var $0k = {};
            $0k.start = this.start;
            $0k.end = this.end;
            $0k.resource = this.resource;
            return $0k;
        };
    };
    DayPilot.Event = function($0j, $C, $0p) {
        var e = this;
        this.calendar = $C;
        this.data = $0j ? $0j : {};
        this.part = $0p ? $0p : {};
        if (typeof this.data.id === 'undefined') {
            this.data.id = this.data.value;
        };
        var $0q = {};
        var $0r = ["id", "text", "start", "end", "resource"];
        this.isEvent = true;
        this.temp = function() {
            if ($0q.dirty) {
                return $0q;
            };
            for (var i = 0; i < $0r.length; i++) {
                $0q[$0r[i]] = e.data[$0r[i]];
            };
            $0q.dirty = true;
            return $0q;
        };
        this.copy = function() {
            var $r = {};
            for (var i = 0; i < $0r.length; i++) {
                $r[$0r[i]] = e.data[$0r[i]];
            };
            return $r;
        };
        this.commit = function() {
            if (!$0q.dirty) {
                return;
            };
            for (var i = 0; i < $0r.length; i++) {
                e.data[$0r[i]] = $0q[$0r[i]];
            };
            $0q.dirty = false;
        };
        this.dirty = function() {
            return $0q.dirty;
        };
        this.id = function($0s) {
            if (typeof $0s === 'undefined') {
                return e.data.id;
            } else {
                this.temp().id = $0s;
            }
        };
        this.value = function($0s) {
            if (typeof $0s === 'undefined') {
                return e.id();
            } else {
                e.id($0s);
            }
        };
        this.text = function($0s) {
            if (typeof $0s === 'undefined') {
                return e.data.text;
            } else {
                this.temp().text = $0s;
                this.client.innerHTML($0s);
            }
        };
        this.start = function($0s) {
            if (typeof $0s === 'undefined') {
                return new DayPilot.Date(e.data.start);
            } else {
                this.temp().start = new DayPilot.Date($0s);
            }
        };
        this.end = function($0s) {
            if (typeof $0s === 'undefined') {
                return new DayPilot.Date(e.data.end);
            } else {
                this.temp().end = new DayPilot.Date($0s);
            }
        };
        this.partStart = function() {
            return new DayPilot.Date(this.part.start);
        };
        this.partEnd = function() {
            return new DayPilot.Date(this.part.end);
        };
        this.row = function() {
            return this.resource();
        };
        this.allday = function() {
            if (typeof $0s === 'undefined') {
                return e.data.allday;
            } else {
                this.temp().allday = $0s;
            }
        };
        this.isAllDay = this.allday;
        this.resource = function($0s) {
            if (typeof $0s === 'undefined') {
                return e.data.resource;
            } else {
                this.temp().resource = $0s;
            }
        };
        this.recurrent = function() {
            return e.data.recurrent;
        };
        this.recurrentMasterId = function() {
            return e.data.recurrentMasterId;
        };
        this.useBox = function() {
            return this.part.box;
        };
        this.staticBubbleHTML = function() {
            return this.bubbleHtml();
        };
        this.bubbleHtml = function() {
            if (e.cache) {
                return e.cache.bubbleHtml || e.data.bubbleHtml;
            };
            return e.data.bubbleHtml;
        };
        this.tag = function($0t) {
            var $0u = e.data.tag;
            if (!$0u) {
                return null;
            };
            if (typeof $0t === 'undefined') {
                return e.data.tag;
            };
            var $0v = e.calendar.tagFields;
            var $B = -1;
            for (var i = 0; i < $0v.length; i++) {
                if ($0t === $0v[i]) $B = i;
            };
            if ($B === -1) {
                throw "Field name not found.";
            };
            return $0u[$B];
        };
        this.client = {};
        this.client.innerHTML = function($0s) {
            if (typeof $0s === 'undefined') {
                if (e.cache && typeof e.cache.html !== "undefined") {
                    return e.cache.html;
                };
                if (typeof e.data.html !== "undefined") {
                    return e.data.html;
                };
                return e.data.text;
            } else {
                e.data.html = $0s;
            }
        };
        this.client.html = this.client.innerHTML;
        this.client.header = function($0s) {
            if (typeof $0s === 'undefined') {
                return e.data.header;
            } else {
                e.data.header = $0s;
            }
        };
        this.client.cssClass = function($0s) {
            if (typeof $0s === 'undefined') {
                return e.data.cssClass;
            } else {
                e.data.cssClass = $0s;
            }
        };
        this.client.toolTip = function($0s) {
            if (typeof $0s === 'undefined') {
                if (e.cache && typeof e.cache.toolTip !== "undefined") {
                    return e.cache.toolTip;
                };
                return typeof e.data.toolTip !== 'undefined' ? e.data.toolTip : e.data.text;
            } else {
                e.data.toolTip = $0s;
            }
        };
        this.client.backColor = function($0s) {
            if (typeof $0s === 'undefined') {
                if (e.cache && typeof e.cache.backColor !== "undefined") {
                    return e.cache.backColor;
                };
                return typeof e.data.backColor !== "undefined" ? e.data.backColor : e.calendar.eventBackColor;
            } else {
                e.data.backColor = $0s;
            }
        };
        this.client.borderColor = function($0s) {
            if (typeof $0s === 'undefined') {
                if (e.cache && typeof e.cache.borderColor !== "undefined") {
                    return e.cache.borderColor;
                };
                return typeof e.data.borderColor !== "undefined" ? e.data.borderColor : e.calendar.eventBorderColor;
            } else {
                e.data.borderColor = $0s;
            }
        };
        this.client.barColor = function($0s) {
            if (typeof $0s === 'undefined') {
                if (e.cache && typeof e.cache.barColor !== "undefined") {
                    return e.cache.barColor;
                };
                return typeof e.data.barColor !== "undefined" ? e.data.barColor : e.calendar.durationBarColor;
            } else {
                e.data.barColor = $0s;
            }
        };
        this.client.barVisible = function($0s) {
            if (typeof $0s === 'undefined') {
                if (e.cache && typeof e.cache.barHidden !== "undefined") {
                    return !e.cache.barHidden;
                };
                return e.calendar.durationBarVisible && !e.data.barHidden;
            } else {
                e.data.barHidden = !$0s;
            }
        };
        this.client.contextMenu = function($0s) {
            if (typeof $0s === 'undefined') {
                if (e.oContextMenu) {
                    return e.oContextMenu;
                };
                return (e.data.contextMenu) ? eval(e.data.contextMenu) : null;
            } else {
                e.oContextMenu = $0s;
            }
        };
        this.client.moveEnabled = function($0s) {
            if (typeof $0s === 'undefined') {
                if (e.cache && typeof e.cache.moveDisabled !== "undefined") {
                    return !e.cache.moveDisabled;
                };
                return e.calendar.eventMoveHandling !== 'Disabled' && !e.data.moveDisabled;
            } else {
                e.data.moveDisabled = !$0s;
            }
        };
        this.client.resizeEnabled = function($0s) {
            if (typeof $0s === 'undefined') {
                if (e.cache && typeof e.cache.resizeDisabled !== "undefined") {
                    return !e.cache.resizeDisabled;
                };
                return e.calendar.eventResizeHandling !== 'Disabled' && !e.data.resizeDisabled;
            } else {
                e.data.resizeDisabled = !$0s;
            }
        };
        this.client.rightClickEnabled = function($0s) {
            if (typeof $0s === 'undefined') {
                if (e.cache && typeof e.cache.rightClickDisabled !== "undefined") {
                    return !e.cache.rightClickDisabled;
                };
                return e.calendar.rightClickHandling !== 'Disabled' && !e.data.rightClickDisabled;
            } else {
                e.data.rightClickDisabled = !$0s;
            }
        };
        this.client.clickEnabled = function($0s) {
            if (typeof $0s === 'undefined') {
                if (e.cache && typeof e.cache.clickDisabled !== "undefined") {
                    return !e.cache.clickDisabled;
                };
                return e.calendar.clickHandling !== 'Disabled' && !e.data.clickDisabled;
            } else {
                e.data.clickDisabled = !$0s;
            }
        };
        this.client.deleteEnabled = function($0s) {
            if (typeof $0s === 'undefined') {
                if (e.cache && typeof e.cache.deleteDisabled !== "undefined") {
                    return !e.cache.deleteDisabled;
                };
                return e.calendar.eventDeleteHandling !== 'Disabled' && !e.data.deleteDisabled;
            } else {
                e.data.deleteDisabled = !$0s;
            }
        };
        this.client.doubleClickEnabled = function($0s) {
            if (typeof $0s === 'undefined') {
                if (e.cache && typeof e.cache.doubleClickDisabled !== "undefined") {
                    return !e.cache.doubleClickDisabled;
                };
                return e.calendar.doubleClickHandling !== 'Disabled' && !e.data.doubleClickDisabled;
            } else {
                e.data.doubleClickDisabled = !$0s;
            }
        };
        this.client.deleteClickEnabled = function($0s) {
            if (typeof $0s === 'undefined') {
                if (e.cache && typeof e.cache.deleteDisabled !== "undefined") {
                    return !e.cache.deleteDisabled;
                };
                return e.calendar.eventDeleteHandling !== 'Disabled' && !e.data.deleteDisabled;
            } else {
                e.data.deleteDisabled = !$0s;
            }
        };
        this.toJSON = function($0o) {
            var $0k = {};
            $0k.value = this.id();
            $0k.id = this.id();
            $0k.text = this.text();
            $0k.start = this.start().toJSON();
            $0k.end = this.end().toJSON();
            $0k.resource = this.resource();
            $0k.isAllDay = false;
            $0k.recurrentMasterId = this.recurrentMasterId();
            $0k.tag = {};
            if (e.calendar.tagFields) {
                var $0v = e.calendar.tagFields;
                for (var i = 0; i < $0v.length; i++) {
                    $0k.tag[$0v[i]] = this.tag($0v[i]);
                }
            };
            return $0k;
        };
    };
    DayPilot.EventData = function(e) {
        this.value = function() {
            return id;
        };
        this.tag = function() {
            return null;
        };
        this.start = function() {
            return new Date(0);
        };
        this.end = function() {
            return new Date($0w * 1000);
        };
        this.text = function() {
            return $G;
        };
        this.isAllDay = function() {
            return false;
        };
        this.allday = this.isAllDay;
    };
    DayPilot.request = function($0x, $0y, $0z, $0A) {
        var $0B = DayPilot.createXmlHttp();
        if (!$0B) {
            return;
        };
        $0B.open("POST", $0x, true);
        $0B.setRequestHeader('Content-type', 'text/plain');
        $0B.onreadystatechange = function() {
            if ($0B.readyState !== 4) return;
            if ($0B.status !== 200 && $0B.status !== 304) {
                if ($0A) {
                    $0A($0B);
                } else {
                    if (console) {
                        console.log('HTTP error ' + $0B.status);
                    }
                };
                return;
            };
            $0y($0B);
        };
        if ($0B.readyState === 4) {
            return;
        };
        if (typeof $0z === 'object') {
            $0z = DayPilot.JSON.stringify($0z);
        };
        $0B.send($0z);
    };
    DayPilot.createXmlHttp = function() {
        var $0C;
        try {
            $0C = new XMLHttpRequest();
        } catch (e) {
            try {
                $0C = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        };
        return $0C;
    };
    DayPilot.Date = function($0D, $0E) {
        if (typeof $0D === 'undefined') {
            this.isDayPilotDate = true;
            this.d = DayPilot.Date.fromLocal();
            this.ticks = this.d.getTime();
            this.value = this.toStringSortable();
            return;
        };
        if ($0D.isDayPilotDate) {
            return $0D;
        };
        var $0F = DayPilot.Date.Cache.Ctor;
        if ($0F[$0D]) {
            return $0F[$0D];
        };
        if (typeof $0D === "string") {
            var $r = DayPilot.Date.fromStringSortable($0D);
            $0F[$0D] = $r;
            return $r;
        };
        if (!$0D.getFullYear) {
            throw "date parameter is not a Date object: " + $0D;
        };
        if ($0E) {
            this.isDayPilotDate = true;
            this.d = DayPilot.Date.fromLocal($0D);
            this.ticks = this.d.getTime();
        } else {
            this.isDayPilotDate = true;
            this.d = $0D;
            this.ticks = this.d.getTime();
        };
        this.value = this.toStringSortable();
    };
    DayPilot.Date.Cache = {};
    DayPilot.Date.Cache.Parsing = {};
    DayPilot.Date.Cache.Ctor = {};
    DayPilot.Date.prototype.addDays = function($0G) {
        return new DayPilot.Date(DayPilot.Date.addDays(this.d, $0G));
    };
    DayPilot.Date.prototype.addHours = function($0H) {
        return this.addTime($0H * 60 * 60 * 1000);
    };
    DayPilot.Date.prototype.addMilliseconds = function($0I) {
        return this.addTime($0I);
    };
    DayPilot.Date.prototype.addMinutes = function($0J) {
        return this.addTime($0J * 60 * 1000);
    };
    DayPilot.Date.prototype.addMonths = function($0K) {
        return new DayPilot.Date(DayPilot.Date.addMonths(this.d, $0K));
    };
    DayPilot.Date.prototype.addSeconds = function($0L) {
        return this.addTime($0L * 1000);
    };
    DayPilot.Date.prototype.addTime = function($0M) {
        return new DayPilot.Date(DayPilot.Date.addTime(this.d, $0M));
    };
    DayPilot.Date.prototype.addYears = function($0N) {
        var n = this.clone();
        n.d.setUTCFullYear(this.getYear() + $0N);
        return n;
    };
    DayPilot.Date.prototype.clone = function() {
        return new DayPilot.Date(DayPilot.Date.clone(this.d));
    };
    DayPilot.Date.prototype.dayOfWeek = function() {
        return this.d.getUTCDay();
    };
    DayPilot.Date.prototype.getDayOfWeek = function() {
        return this.d.getUTCDay();
    };
    DayPilot.Date.prototype.daysInMonth = function() {
        return DayPilot.Date.daysInMonth(this.d);
    };
    DayPilot.Date.prototype.dayOfYear = function() {
        return Math.ceil((this.getDatePart().getTime() - this.firstDayOfYear().getTime()) / 86400000) + 1;
    };
    DayPilot.Date.prototype.equals = function($0O) {
        if ($0O === null) {
            return false;
        };
        if ($0O.isDayPilotDate) {
            return DayPilot.Date.equals(this.d, $0O.d);
        } else {
            throw "The parameter must be a DayPilot.Date object (DayPilot.Date.equals())";
        }
    };
    DayPilot.Date.prototype.firstDayOfMonth = function() {
        var $0P = DayPilot.Date.firstDayOfMonth(this.getYear(), this.getMonth() + 1);
        return new DayPilot.Date($0P);
    };
    DayPilot.Date.prototype.firstDayOfYear = function() {
        var $0Q = this.getYear();
        var d = new Date();
        d.setUTCFullYear($0Q, 0, 1);
        d.setUTCHours(0);
        d.setUTCMinutes(0);
        d.setUTCSeconds(0);
        d.setUTCMilliseconds(0);
        return new DayPilot.Date(d);
    };
    DayPilot.Date.prototype.firstDayOfWeek = function($0R) {
        var $0P = DayPilot.Date.firstDayOfWeek(this.d, $0R);
        return new DayPilot.Date($0P);
    };
    DayPilot.Date.prototype.getDay = function() {
        return this.d.getUTCDate();
    };
    DayPilot.Date.prototype.getDatePart = function() {
        return new DayPilot.Date(DayPilot.Date.getDate(this.d));
    };
    DayPilot.Date.prototype.getYear = function() {
        return this.d.getUTCFullYear();
    };
    DayPilot.Date.prototype.getHours = function() {
        return this.d.getUTCHours();
    };
    DayPilot.Date.prototype.getMilliseconds = function() {
        return this.d.getUTCMilliseconds();
    };
    DayPilot.Date.prototype.getMinutes = function() {
        return this.d.getUTCMinutes();
    };
    DayPilot.Date.prototype.getMonth = function() {
        return this.d.getUTCMonth();
    };
    DayPilot.Date.prototype.getSeconds = function() {
        return this.d.getUTCSeconds();
    };
    DayPilot.Date.prototype.getTotalTicks = function() {
        return this.getTime();
    };
    DayPilot.Date.prototype.getTime = function() {
        return this.ticks;
    };
    DayPilot.Date.prototype.getTimePart = function() {
        return DayPilot.Date.getTime(this.d);
    };
    DayPilot.Date.prototype.lastDayOfMonth = function() {
        var $0P = DayPilot.Date.lastDayOfMonth(this.getYear(), this.getMonth() + 1);
        return new DayPilot.Date($0P);
    };
    DayPilot.Date.prototype.weekNumber = function() {
        var $0S = this.firstDayOfYear();
        var $0G = (this.getTime() - $0S.getTime()) / 86400000;
        return Math.ceil(($0G + $0S.dayOfWeek() + 1) / 7);
    };
    DayPilot.Date.prototype.local = function() {
        if (typeof this.offset === 'undefined') {
            return new DayPilot.Date(this.d);
        };
        return this.addMinutes(this.offset);
    };
    DayPilot.Date.prototype.weekNumberISO = function() {
        var $0T = false;
        var $0U = this.dayOfYear();
        var $0V = this.firstDayOfYear().dayOfWeek();
        var $0W = this.firstDayOfYear().addYears(1).addDays(-1).dayOfWeek();
        if ($0V === 0) {
            $0V = 7;
        };
        if ($0W === 0) {
            $0W = 7;
        };
        var $0X = 8 - ($0V);
        if ($0V === 4 || $0W === 4) {
            $0T = true;
        };
        var $0Y = Math.ceil(($0U - ($0X)) / 7.0);
        var $0Z = $0Y;
        if ($0X >= 4) {
            $0Z = $0Z + 1;
        };
        if ($0Z > 52 && !$0T) {
            $0Z = 1;
        };
        if ($0Z === 0) {
            $0Z = this.firstDayOfYear().addDays(-1).weekNumberISO();
        };
        return $0Z;
    };
    DayPilot.Date.prototype.toDateLocal = function() {
        return DayPilot.Date.toLocal(this.d);
    };
    DayPilot.Date.prototype.toJSON = function() {
        return this.value;
    };
    DayPilot.Date.prototype.toString = function($10, $11) {
        if (typeof $10 === 'undefined') {
            return this.toStringSortable();
        };
        return new $12($10, $11).print(this);
    };
    DayPilot.Date.prototype.toStringSortable = function() {
        return DayPilot.Date.toStringSortable(this.d);
    };
    DayPilot.Date.parse = function(str, $10) {
        var p = new $12($10);
        return p.parse(str);
    };
    DayPilot.Date.fromStringSortable = function($13) {
        var $r;
        if (!$13) {
            throw "Can't create DayPilot.Date from empty string";
        };
        var $N = $13.length;
        var $0D = $N === 10;
        var $14 = $N = 19;
        var $15 = $N === 25;
        if (!$0D && !$14 && !$15) {
            throw "Invalid string format (use '2010-01-01', '2010-01-01T00:00:00', or '2010-01-01T00:00:00+00:00'.";
        };
        if (DayPilot.Date.Cache.Parsing[$13]) {
            return DayPilot.Date.Cache.Parsing[$13];
        };
        var $0Q = $13.substring(0, 4);
        var $16 = $13.substring(5, 7);
        var $17 = $13.substring(8, 10);
        var d = new Date();
        d.setUTCFullYear($0Q, $16 - 1, $17);
        if ($0D) {
            d.setUTCHours(0);
            d.setUTCMinutes(0);
            d.setUTCSeconds(0);
            d.setUTCMilliseconds(0);
            $r = new DayPilot.Date(d);
            DayPilot.Date.Cache.Parsing[$13] = $r;
            return $r;
        };
        var $0H = $13.substring(11, 13);
        var $0J = $13.substring(14, 16);
        var $0L = $13.substring(17, 19);
        d.setUTCHours($0H);
        d.setUTCMinutes($0J);
        d.setUTCSeconds($0L);
        d.setUTCMilliseconds(0);
        var $r = new DayPilot.Date(d);
        if ($14) {
            DayPilot.Date.Cache.Parsing[$13] = $r;
            return $r;
        };
        var $18 = $13[20];
        var $19 = $13.substring(21, 23);
        var $1a = $13.substring(24);
        var $1b = $19 * 60 + $1a;
        if ($18 === "-") {
            $1b = -$1b;
        };
        $r = $r.addMinutes(-$1b);
        $r.offset = $1c;
        DayPilot.Date.Cache.Parsing[$13] = $r;
        return $r;
    };
    DayPilot.Date.addDays = function($0D, $0G) {
        var d = new Date();
        d.setTime($0D.getTime() + $0G * 24 * 60 * 60 * 1000);
        return d;
    };
    DayPilot.Date.addMinutes = function($0D, $0J) {
        var d = new Date();
        d.setTime($0D.getTime() + $0J * 60 * 1000);
        return d;
    };
    DayPilot.Date.addMonths = function($0D, $0K) {
        if ($0K === 0) return $0D;
        var y = $0D.getUTCFullYear();
        var m = $0D.getUTCMonth() + 1;
        if ($0K > 0) {
            while ($0K >= 12) {
                $0K -= 12;
                y++;
            };
            if ($0K > 12 - m) {
                y++;
                m = $0K - (12 - m);
            } else {
                m += $0K;
            }
        } else {
            while ($0K <= -12) {
                $0K += 12;
                y--;
            };
            if (m <= $0K) {
                y--;
                m = 12 - ($0K + m);
            } else {
                m = m + $0K;
            }
        };
        var d = DayPilot.Date.clone($0D);
        d.setUTCFullYear(y);
        d.setUTCMonth(m - 1);
        return d;
    };
    DayPilot.Date.addTime = function($0D, $1d) {
        var d = new Date();
        d.setTime($0D.getTime() + $1d);
        return d;
    };
    DayPilot.Date.clone = function($1e) {
        var d = new Date();
        return DayPilot.Date.dateFromTicks($1e.getTime());
    };
    DayPilot.Date.daysDiff = function($0S, $1f) {
        if ($0S.getTime() > $1f.getTime()) {
            return null;
        };
        var i = 0;
        var $1g = DayPilot.Date.getDate($0S);
        var $1h = DayPilot.Date.getDate($1f);
        while ($1g < $1h) {
            $1g = DayPilot.Date.addDays($1g, 1);
            i++;
        };
        return i;
    };
    DayPilot.Date.daysInMonth = function($0Q, $16) {
        if ($0Q.getUTCFullYear) {
            $16 = $0Q.getUTCMonth() + 1;
            $0Q = $0Q.getUTCFullYear();
        };
        var m = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ($16 !== 2) return m[$16 - 1];
        if ($0Q % 4 !== 0) return m[1];
        if ($0Q % 100 === 0 && $0Q % 400 !== 0) return m[1];
        return m[1] + 1;
    };
    DayPilot.Date.daysSpan = function($0S, $1f) {
        if ($0S.getTime() === $1f.getTime()) {
            return 0;
        };
        var $1i = DayPilot.Date.daysDiff($0S, $1f);
        if (DayPilot.Date.equals($1f, DayPilot.Date.getDate($1f))) {
            $1i--;
        };
        return $1i;
    };
    DayPilot.Date.diff = function($0S, $1f) {
        if (!($0S && $1f && $0S.getTime && $1f.getTime)) {
            throw "Both compared objects must be Date objects (DayPilot.Date.diff).";
        };
        return $0S.getTime() - $1f.getTime();
    };
    DayPilot.Date.equals = function($0S, $1f) {
        return $0S.getTime() === $1f.getTime();
    };
    DayPilot.Date.fromLocal = function($1j) {
        if (!$1j) {
            $1j = new Date();
        };
        var d = new Date();
        d.setUTCFullYear($1j.getFullYear(), $1j.getMonth(), $1j.getDate());
        d.setUTCHours($1j.getHours());
        d.setUTCMinutes($1j.getMinutes());
        d.setUTCSeconds($1j.getSeconds());
        d.setUTCMilliseconds($1j.getMilliseconds());
        return d;
    };
    DayPilot.Date.firstDayOfMonth = function($0Q, $16) {
        var d = new Date();
        d.setUTCFullYear($0Q, $16 - 1, 1);
        d.setUTCHours(0);
        d.setUTCMinutes(0);
        d.setUTCSeconds(0);
        d.setUTCMilliseconds(0);
        return d;
    };
    DayPilot.Date.firstDayOfWeek = function(d, $0R) {
        var $17 = d.getUTCDay();
        while ($17 !== $0R) {
            d = DayPilot.Date.addDays(d, -1);
            $17 = d.getUTCDay();
        };
        return d;
    };
    DayPilot.Date.dateFromTicks = function($0M) {
        var d = new Date();
        d.setTime($0M);
        return d;
    };
    DayPilot.Date.getDate = function($1e) {
        var d = DayPilot.Date.clone($1e);
        d.setUTCHours(0);
        d.setUTCMinutes(0);
        d.setUTCSeconds(0);
        d.setUTCMilliseconds(0);
        return d;
    };
    DayPilot.Date.getStart = function($0Q, $16, $0R) {
        var $1k = DayPilot.Date.firstDayOfMonth($0Q, $16);
        d = DayPilot.Date.firstDayOfWeek($1k, $0R);
        return d;
    };
    DayPilot.Date.getTime = function($1e) {
        var $0D = DayPilot.Date.getDate($1e);
        return DayPilot.Date.diff($1e, $0D);
    };
    DayPilot.Date.hours = function($0D, $1l) {
        var $1m = $0D.getUTCMinutes();
        if ($1m < 10) $1m = "0" + $1m;
        var $1n = $0D.getUTCHours();
        if ($1l) {
            var am = $1n < 12;
            var $1n = $1n % 12;
            if ($1n === 0) {
                $1n = 12;
            };
            var $1o = am ? "AM" : "PM";
            return $1n + ':' + $1m + ' ' + $1o;
        } else {
            return $1n + ':' + $1m;
        }
    };
    DayPilot.Date.lastDayOfMonth = function($0Q, $16) {
        var d = DayPilot.Date.firstDayOfMonth($0Q, $16);
        var length = DayPilot.Date.daysInMonth($0Q, $16);
        d.setUTCDate(length);
        return d;
    };
    DayPilot.Date.max = function($0S, $1f) {
        if ($0S.getTime() > $1f.getTime()) {
            return $0S;
        } else {
            return $1f;
        }
    };
    DayPilot.Date.min = function($0S, $1f) {
        if ($0S.getTime() < $1f.getTime()) {
            return $0S;
        } else {
            return $1f;
        }
    };
    DayPilot.Date.today = function() {
        var $1p = new Date();
        var d = new Date();
        d.setUTCFullYear($1p.getFullYear());
        d.setUTCMonth($1p.getMonth());
        d.setUTCDate($1p.getDate());
        return d;
    };
    DayPilot.Date.toLocal = function($0D) {
        if (!$0D) {
            $0D = new Date();
        };
        var d = new Date();
        d.setFullYear($0D.getUTCFullYear(), $0D.getUTCMonth(), $0D.getUTCDate());
        d.setHours($0D.getUTCHours());
        d.setMinutes($0D.getUTCMinutes());
        d.setSeconds($0D.getUTCSeconds());
        d.setMilliseconds($0D.getUTCMilliseconds());
        return d;
    };
    DayPilot.Date.toStringSortable = function($0D) {
        if ($0D.isDayPilotDate) {
            return $0D.toStringSortable();
        };
        var d = $0D;
        var $1f = d.getUTCSeconds();
        if ($1f < 10) $1f = "0" + $1f;
        var $1m = d.getUTCMinutes();
        if ($1m < 10) $1m = "0" + $1m;
        var $1n = d.getUTCHours();
        if ($1n < 10) $1n = "0" + $1n;
        var $17 = d.getUTCDate();
        if ($17 < 10) $17 = "0" + $17;
        var $16 = d.getUTCMonth() + 1;
        if ($16 < 10) $16 = "0" + $16;
        var $0Q = d.getUTCFullYear();
        if ($0Q <= 0) {
            throw "The minimum year supported is 1.";
        };
        if ($0Q < 10) {
            $0Q = "000" + $0Q;
        } else if ($0Q < 100) {
            $0Q = "00" + $0Q;
        } else if ($0Q < 1000) {
            $0Q = "0" + $0Q;
        };
        return $0Q + "-" + $16 + "-" + $17 + 'T' + $1n + ":" + $1m + ":" + $1f;
    };
    var $12 = function($10, $11) {
        if (typeof $11 === "string") {
            $11 = DayPilot.Locale.find($11);
        };
        var $11 = $11 || DayPilot.Locale.US;
        var $1q = [{
            "seq": "yyyy",
            "expr": "[0-9]{4,4\u007d",
            "str": function(d) {
                return d.getYear();
            }
        }, {
            "seq": "MMMM",
            "expr": "[a-z]*",
            "str": function(d) {
                var r = $11.monthNames[d.getMonth()];
                return r;
            }
        }, {
            "seq": "MM",
            "expr": "[0-9]{2,2\u007d",
            "str": function(d) {
                var r = d.getMonth() + 1;
                return r < 10 ? "0" + r : r;
            }
        }, {
            "seq": "M",
            "expr": "[0-9]{1,2\u007d",
            "str": function(d) {
                var r = d.getMonth() + 1;
                return r;
            }
        }, {
            "seq": "dddd",
            "expr": "[a-z]*",
            "str": function(d) {
                var r = $11.dayNames[d.getDayOfWeek()];
                return r;
            }
        }, {
            "seq": "dd",
            "expr": "[0-9]{2,2\u007d",
            "str": function(d) {
                var r = d.getDay();
                return r < 10 ? "0" + r : r;
            }
        }, {
            "seq": "d",
            "expr": "[0-9]{1,2\u007d",
            "str": function(d) {
                var r = d.getDay();
                return r;
            }
        }, {
            "seq": "m",
            "expr": "[0-9]{1,2\u007d",
            "str": function(d) {
                var r = d.getMinutes();
                return r;
            }
        }, {
            "seq": "mm",
            "expr": "[0-9]{2,2\u007d",
            "str": function(d) {
                var r = d.getMinutes();
                return r < 10 ? "0" + r : r;
            }
        }, {
            "seq": "H",
            "expr": "[0-9]{1,2\u007d",
            "str": function(d) {
                var r = d.getHours();
                return r;
            }
        }, {
            "seq": "HH",
            "expr": "[0-9]{2,2\u007d",
            "str": function(d) {
                var r = d.getHours();
                return r < 10 ? "0" + r : r;
            }
        }, {
            "seq": "h",
            "expr": "[0-9]{1,2\u007d",
            "str": function(d) {
                var $1n = d.getHours();
                var $1n = $1n % 12;
                if ($1n === 0) {
                    $1n = 12;
                };
                return $1n;
            }
        }, {
            "seq": "hh",
            "expr": "[0-9]{2,2\u007d",
            "str": function(d) {
                var $1n = d.getHours();
                var $1n = $1n % 12;
                if ($1n === 0) {
                    $1n = 12;
                };
                var r = $1n;
                return r < 10 ? "0" + r : r;
            }
        }, {
            "seq": "tt",
            "expr": "(AM|PM)",
            "str": function(d) {
                var $1n = d.getHours();
                var am = $1n < 12;
                return am ? "AM" : "PM";
            }
        }, {
            "seq": "s",
            "expr": "[0-9]{1,2\u007d",
            "str": function(d) {
                var r = d.getSeconds();
                return r;
            }
        }, {
            "seq": "ss",
            "expr": "[0-9]{2,2\u007d",
            "str": function(d) {
                var r = d.getSeconds();
                return r < 10 ? "0" + r : r;
            }
        }];
        var $1r = function($G) {
            return $G.replace(/[-[\]{};()*+?.,\\^$|#\s]/g, "\\$&");
        };
        this.init = function() {
            this.year = this.findSequence("yyyy");
            this.month = this.findSequence("MM") || this.findSequence("M");
            this.day = this.findSequence("dd") || this.findSequence("d");
            this.hours = this.findSequence("HH") || this.findSequence("H");
            this.minutes = this.findSequence("mm") || this.findSequence("m");
            this.seconds = this.findSequence("ss") || this.findSequence("s");
        };
        this.findSequence = function($1s) {
            var $B = $10.indexOf($1s);
            if ($B === -1) {
                return null;
            };
            return {
                "findValue": function($1t) {
                    var $1u = $1r($10);
                    for (var i = 0; i < $1q.length; i++) {
                        var $N = $1q[i].length;
                        var $1v = ($1s === $1q[i].seq);
                        var $1w = $1q[i].expr;
                        if ($1v) {
                            $1w = "(" + $1w + ")";
                        };
                        $1u = $1u.replace($1q[i].seq, $1w);
                    };
                    try {
                        var r = new RegExp($1u);
                        var $v = r.exec($1t);
                        if (!$v) {
                            return null;
                        };
                        return parseInt($v[1]);
                    } catch (e) {
                        throw "unable to create regex from: " + $1u;
                    }
                }
            };
        };
        this.print = function($0D) {
            var find = function(t) {
                for (var i = 0; i < $1q.length; i++) {
                    if ($1q[i].seq === t) {
                        return $1q[i];
                    }
                };
                return null;
            };
            var $1x = $10.length <= 0;
            var $1y = 0;
            var $1z = [];
            while (!$1x) {
                var $1A = $10.substring($1y);
                var $1B = /(.)\1*/.exec($1A);
                if ($1B && $1B.length > 0) {
                    var $1C = $1B[0];
                    var q = find($1C);
                    if (q) {
                        $1z.push(q);
                    } else {
                        $1z.push($1C);
                    };
                    $1y += $1C.length;
                    $1x = $10.length <= $1y;
                } else {
                    $1x = true;
                }
            };
            for (var i = 0; i < $1z.length; i++) {
                var c = $1z[i];
                if (typeof c !== 'string') {
                    $1z[i] = c.str($0D);
                }
            };
            return $1z.join("");
        };
        this.parse = function($1t) {
            var $0Q = this.year.findValue($1t);
            if (!$0Q) {
                return null;
            };
            var $16 = this.month.findValue($1t);
            var $17 = this.day.findValue($1t);
            var $0H = this.hours ? this.hours.findValue($1t) : 0;
            var $0J = this.minutes ? this.minutes.findValue($1t) : 0;
            var $0L = this.seconds ? this.seconds.findValue($1t) : 0;
            var d = new Date();
            d.setUTCFullYear($0Q, $16 - 1, $17);
            d.setUTCHours($0H);
            d.setUTCMinutes($0J);
            d.setUTCSeconds($0L);
            d.setUTCMilliseconds(0);
            return new DayPilot.Date(d);
        };
        this.init();
    };
    DayPilot.Action = function($C, $0h, $0i, $0j) {
        this.calendar = $C;
        this.isAction = true;
        this.action = $0h;
        this.params = $0i;
        this.data = $0j;
        this.notify = function() {
            $C.invokeEvent("Immediate", this.action, this.params, this.data);
        };
        this.auto = function() {
            $C.invokeEvent("Notify", this.action, this.params, this.data);
        };
        this.queue = function() {
            $C.queue.add(this);
        };
        this.toJSON = function() {
            var $0k = {};
            $0k.name = this.action;
            $0k.params = this.params;
            $0k.data = this.data;
            return $0k;
        };
    };
    DayPilot.Locale = function(id, $W) {
        this.id = id;
        this.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.dayNamesShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.datePattern = "M/d/yyyy";
        this.timePattern = "H:mm";
        this.dateTimePattern = "M/d/yyyy H:mm";
        this.timeFormat = "Clock12Hours";
        this.weekStarts = 0;
        if ($W) {
            for (var name in $W) {
                this[name] = $W[name];
            }
        }
    };
    DayPilot.Locale.all = {};
    DayPilot.Locale.find = function(id) {
        if (!id) {
            return null;
        };
        var $1D = id.toLowerCase();
        if ($1D.length > 2) {
            $1D[2] = '-';
        };
        return DayPilot.Locale.all[$1D];
    };
    DayPilot.Locale.register = function($11) {
        DayPilot.Locale.all[$11.id] = $11;
    };
    DayPilot.Locale.register(new DayPilot.Locale('de-de', {
        'dayNames': ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        'dayNamesShort': ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        'monthNames': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd.MM.yyyy',
        'dateTimePattern': 'dd.MM.yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('en-au', {
        'dayNames': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'dayNamesShort': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        'monthNames': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''],
        'timePattern': 'h:mm tt',
        'datePattern': 'd/MM/yyyy',
        'dateTimePattern': 'd/MM/yyyy h:mm tt',
        'timeFormat': 'Clock12Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('en-ca', {
        'dayNames': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'dayNamesShort': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        'monthNames': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''],
        'timePattern': 'h:mm tt',
        'datePattern': 'yyyy-MM-dd',
        'dateTimePattern': 'yyyy-MM-dd h:mm tt',
        'timeFormat': 'Clock12Hours',
        'weekStarts': 0
    }));
    DayPilot.Locale.register(new DayPilot.Locale('en-gb', {
        'dayNames': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'dayNamesShort': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        'monthNames': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('en-us', {
        'dayNames': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'dayNamesShort': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        'monthNames': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''],
        'timePattern': 'h:mm tt',
        'datePattern': 'M/d/yyyy',
        'dateTimePattern': 'M/d/yyyy h:mm tt',
        'timeFormat': 'Clock12Hours',
        'weekStarts': 0
    }));
    DayPilot.Locale.register(new DayPilot.Locale('es-es', {
        'dayNames': ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        'dayNamesShort': ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        'monthNames': ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre', ''],
        'timePattern': 'H:mm',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('es-mx', {
        'dayNames': ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        'dayNamesShort': ['do.', 'lu.', 'ma.', 'mi.', 'ju.', 'vi.', 'sá.'],
        'monthNames': ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre', ''],
        'timePattern': 'hh:mm tt',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy hh:mm tt',
        'timeFormat': 'Clock12Hours',
        'weekStarts': 0
    }));
    DayPilot.Locale.register(new DayPilot.Locale('fr-fr', {
        'dayNames': ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
        'dayNamesShort': ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'],
        'monthNames': ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('it-it', {
        'dayNames': ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'],
        'dayNamesShort': ['do', 'lu', 'ma', 'me', 'gi', 've', 'sa'],
        'monthNames': ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre', ''],
        'timePattern': 'HH.mm',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy HH.mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('ja-jp', {
        'dayNames': ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
        'dayNamesShort': ['日', '月', '火', '水', '木', '金', '土'],
        'monthNames': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', ''],
        'timePattern': 'H:mm',
        'datePattern': 'yyyy/MM/dd',
        'dateTimePattern': 'yyyy/MM/dd H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 0
    }));
    DayPilot.Locale.register(new DayPilot.Locale('pt-br', {
        'dayNames': ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
        'dayNamesShort': ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        'monthNames': ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd/MM/yyyy',
        'dateTimePattern': 'dd/MM/yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 0
    }));
    DayPilot.Locale.register(new DayPilot.Locale('ru-ru', {
        'dayNames': ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        'dayNamesShort': ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        'monthNames': ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', ''],
        'timePattern': 'H:mm',
        'datePattern': 'dd.MM.yyyy',
        'dateTimePattern': 'dd.MM.yyyy H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('zh-cn', {
        'dayNames': ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        'dayNamesShort': ['日', '一', '二', '三', '四', '五', '六'],
        'monthNames': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月', ''],
        'timePattern': 'H:mm',
        'datePattern': 'yyyy/M/d',
        'dateTimePattern': 'yyyy/M/d H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('sv-se', {
        'dayNames': ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'],
        'dayNamesShort': ['sö', 'må', 'ti', 'on', 'to', 'fr', 'lö'],
        'monthNames': ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'yyyy-MM-dd',
        'dateTimePattern': 'yyyy-MM-dd HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('da-dk', {
        'dayNames': ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
        'dayNamesShort': ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø'],
        'monthNames': ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd-MM-yyyy',
        'dateTimePattern': 'dd-MM-yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('nb-no', {
        'dayNames': ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
        'dayNamesShort': ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø'],
        'monthNames': ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd.MM.yyyy',
        'dateTimePattern': 'dd.MM.yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('nn-no', {
        'dayNames': ['søndag', 'måndag', 'tysdag', 'onsdag', 'torsdag', 'fredag', 'laurdag'],
        'dayNamesShort': ['sø', 'må', 'ty', 'on', 'to', 'fr', 'la'],
        'monthNames': ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'dd.MM.yyyy',
        'dateTimePattern': 'dd.MM.yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('fi-fi', {
        'dayNames': ['sunnuntai', 'maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai'],
        'dayNamesShort': ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'],
        'monthNames': ['tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu', ''],
        'timePattern': 'H:mm',
        'datePattern': 'd.M.yyyy',
        'dateTimePattern': 'd.M.yyyy H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('nl-nl', {
        'dayNames': ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
        'dayNamesShort': ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
        'monthNames': ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december', ''],
        'timePattern': 'HH:mm',
        'datePattern': 'd-M-yyyy',
        'dateTimePattern': 'd-M-yyyy HH:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.register(new DayPilot.Locale('cs-cz', {
        'dayNames': ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'],
        'dayNamesShort': ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],
        'monthNames': ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec', ''],
        'timePattern': 'H:mm',
        'datePattern': 'd. M. yyyy',
        'dateTimePattern': 'd. M. yyyy H:mm',
        'timeFormat': 'Clock24Hours',
        'weekStarts': 1
    }));
    DayPilot.Locale.US = DayPilot.Locale.find("en-us");
    DayPilot.Switcher = function() {
        var $1E = this;
        this.views = [];
        this.switchers = [];
        this.navigator = {};
        this.selectedClass = null;
        this.active = null;
        this.day = new DayPilot.Date();
        this.navigator.updateMode = function($1F) {
            var $1G = $1E.navigator.control;
            if (!$1G) {
                return;
            };
            $1G.selectMode = $1F;
            $1G.select($1E.day);
        };
        this.addView = function($1H, $V) {
            var element;
            if (typeof $1H === 'string') {
                element = document.getElementById($1H);
                if (!element) {
                    throw "Element not found: " + $1H;
                }
            } else {
                element = $1H;
            };
            var $1G = element;
            var $1I = {};
            $1I.isView = true;
            $1I.id = $1G.id;
            $1I.control = $1G;
            $1I.options = $V || {};
            $1I.hide = function() {
                if ($1G.hide) {
                    $1G.hide();
                } else if ($1G.nav && $1G.nav.top) {
                    $1G.nav.top.style.display = 'none';
                } else {
                    $1G.style.display = 'none';
                }
            };
            $1I.sendNavigate = function($0D) {
                var $1J = (function() {
                    if ($1G.backendUrl) {
                        return true;
                    };
                    if (typeof WebForm_DoCallback === 'function' && $1G.uniqueID) {
                        return true;
                    };
                    return false;
                })();
                if ($1J) {
                    if ($1G.commandCallBack) {
                        $1G.commandCallBack("navigate", {
                            "day": $0D
                        });
                    }
                }
            };
            $1I.show = function() {
                $1E.$24();
                if ($1G.show) {
                    $1G.show();
                } else if ($1G.nav && $1G.nav.top) {
                    $1G.nav.top.style.display = '';
                } else {
                    $1G.style.display = '';
                }
            };
            $1I.selectMode = function() {
                if ($1I.options.navigatorSelectMode) {
                    return $1I.options.navigatorSelectMode;
                };
                if ($1G.isCalendar) {
                    switch ($1G.viewType) {
                        case "Day":
                            return "day";
                        case "Week":
                            return "week";
                        case "WorkWeek":
                            return "week";
                        default:
                            return "day";
                    }
                } else if ($1G.isMonth) {
                    switch ($1G.viewType) {
                        case "Month":
                            return "month";
                        case "Weeks":
                            return "week";
                        default:
                            return "day";
                    }
                };
                return "day";
            };
            this.views.push($1I);
            return $1I;
        };
        this.addButton = function(id, $1G) {
            var element;
            if (typeof id === 'string') {
                element = document.getElementById(id);
                if (!element) {
                    throw "Element not found: " + id;
                }
            } else {
                element = id;
            };
            var $1I = this.$25($1G);
            if (!$1I) {
                $1I = this.addView($1G);
            };
            var $1K = {};
            $1K.isSwitcher = true;
            $1K.element = element;
            $1K.id = element.id;
            $1K.view = $1I;
            $1K.onClick = function(ev) {
                $1E.show($1K);
                $1E.$26($1K);
                ev = ev || window.event;
                if (ev) {
                    ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
                }
            };
            DayPilot.re(element, 'click', $1K.onClick);
            this.switchers.push($1K);
            return $1K;
        };
        this.select = function(id) {
            var $1K = this.$27(id);
            if ($1K) {
                $1K.onClick();
            } else if (this.switchers.length > 0) {
                this.switchers[0].onClick();
            }
        };
        this.$27 = function(id) {
            for (var i = 0; i < this.switchers.length; i++) {
                var $1K = this.switchers[i];
                if ($1K.id === id) {
                    return $1K;
                }
            };
            return null;
        };
        this.$26 = function($1K) {
            if (!this.selectedClass) {
                return;
            };
            for (var i = 0; i < this.switchers.length; i++) {
                var s = this.switchers[i];
                DayPilot.Util.removeClass(s.element, this.selectedClass);
            };
            DayPilot.Util.addClass($1K.element, this.selectedClass);
        };
        this.addNavigator = function($1G) {
            $1E.navigator.control = $1G;
            $1G.timeRangeSelectedHandling = "JavaScript";
            $1G.onTimeRangeSelected = function() {
                var $0l, end, $17;
                if ($1G.api === 1) {
                    $0l = arguments[0];
                    end = arguments[1];
                    $17 = arguments[2];
                } else {
                    var $1L = arguments[0];
                    $0l = $1L.start;
                    end = $1L.end;
                    $17 = $1L.day;
                };
                $1E.day = $17;
                $1E.active.sendNavigate($1E.day);
                if ($1E.onTimeRangeSelected) {
                    var $1L = {};
                    $1L.start = $0l;
                    $1L.end = end;
                    $1L.day = $17;
                    $1L.target = $1E.active.control;
                    $1E.onTimeRangeSelected($1L);
                }
            };
        };
        this.show = function(el) {
            var $1I, $1K;
            if (el.isSwitcher) {
                $1K = el;
                $1I = $1K.view;
            } else {
                $1I = el.isView ? el : this.$25(el);
                if (this.active === $1I) {
                    return;
                }
            };
            if ($1E.onSelect) {
                var $1L = {};
                $1L.source = $1K ? $1K.element : null;
                $1L.target = $1I.control;
                $1E.onSelect($1L);
            };
            this.active = $1I;
            $1I.show();
            var $1F = $1I.selectMode();
            $1E.navigator.updateMode($1F);
            $1E.active.sendNavigate(this.day);
        };
        this.$25 = function($1G) {
            for (var i = 0; i < this.views.length; i++) {
                if (this.views[i].control === $1G) {
                    return this.views[i];
                }
            };
            return null;
        };
        this.$24 = function() {
            for (var i = 0; i < this.views.length; i++) {
                this.views[i].hide();
            }
        };
    };
    var $1M = function(id) {
        var $1E = this;
        this.id = id;
        this.widths = [];
        this.titles = [];
        this.height = null;
        this.splitterWidth = 3;
        this.css = {};
        this.css.title = null;
        this.css.titleInner = null;
        this.css.splitter = null;
        this.blocks = [];
        this.drag = {};
        this.updated = function() {};
        this.updating = function() {};
        this.init = function() {
            var $b;
            if (!id) {
                throw "error: id not provided";
            } else if (typeof id === 'string') {
                $b = document.getElementById(id);
            } else if (id.appendChild) {
                $b = id;
            } else {
                throw "error: invalid object provided";
            };
            this.div = $b;
            this.blocks = [];
            for (var i = 0; i < this.widths.length; i++) {
                var s = document.createElement("div");
                s.style.display = "inline-block";
                if ($1E.height !== null) {
                    s.style.height = $1E.height + "px";
                } else {
                    s.style.height = "100%";
                };
                s.style.width = (this.widths[i] - this.splitterWidth) + "px";
                s.style.display.overflow = 'hidden';
                s.style.verticalAlign = "top";
                s.style.position = "relative";
                s.setAttribute("unselectable", "on");
                s.className = this.css.title;
                $b.appendChild(s);
                var $U = document.createElement("div");
                $U.innerHTML = this.titles[i];
                $U.setAttribute("unselectable", "on");
                $U.className = this.css.titleInner;
                s.appendChild($U);
                var $1N = document.createElement("div");
                $1N.style.display = "inline-block";
                if ($1E.height !== null) {
                    $1N.style.height = $1E.height + "px";
                } else {
                    $1N.style.height = "100%";
                };
                $1N.style.width = this.splitterWidth + "px";
                $1N.style.position = "relative";
                $1N.appendChild(document.createElement("div"));
                $1N.style.cursor = "col-resize";
                $1N.setAttribute("unselectable", "on");
                $1N.className = this.css.splitter;
                var $0j = {};
                $0j.index = i;
                $0j.width = this.widths[i];
                $1N.data = $0j;
                $1N.onmousedown = function(ev) {
                    $1E.drag.start = DayPilot.page(ev);
                    $1E.drag.data = this.data;
                    $1E.div.style.cursor = "col-resize";
                    ev = ev || window.event;
                    ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
                };
                $b.appendChild($1N);
                var $1O = {};
                $1O.section = s;
                $1O.handle = $1N;
                this.blocks.push($1O);
            };
            this.registerGlobalHandlers();
        };
        this.updateWidths = function() {
            for (var i = 0; i < this.blocks.length; i++) {
                var $1O = this.blocks[i];
                var $07 = this.widths[i];
                $1O.handle.data.width = $07;
                this.$28(i);
            }
        };
        this.$28 = function(i) {
            var $1O = this.blocks[i];
            var $07 = this.widths[i];
            $1O.section.style.width = ($07 - this.splitterWidth) + "px";
        };
        this.totalWidth = function() {
            var t = 0;
            for (var i = 0; i < this.widths.length; i++) {
                t += this.widths[i];
            };
            return t;
        };
        this.gMouseMove = function(ev) {
            if (!$1E.drag.start) {
                return;
            };
            var $0j = $1E.drag.data;
            var $1P = DayPilot.page(ev);
            var $1Q = $1P.x - $1E.drag.start.x;
            var i = $0j.index;
            $1E.widths[i] = $0j.width + $1Q;
            $1E.$28(i);
            var $0i = {};
            $0i.widths = this.widths;
            $0i.index = $0j.index;
            $1E.updating($0i);
        };
        this.gMouseUp = function(ev) {
            if (!$1E.drag.start) {
                return;
            };
            $1E.drag.start = null;
            document.body.style.cursor = "";
            $1E.div.style.cursor = "";
            var $0j = $1E.drag.data;
            $0j.width = $1E.widths[$0j.index];
            var $0i = {};
            $0i.widths = this.widths;
            $0i.index = $0j.index;
            $1E.updated($0i);
        };
        this.registerGlobalHandlers = function() {
            DayPilot.re(document, 'mousemove', this.gMouseMove);
            DayPilot.re(document, 'mouseup', this.gMouseUp);
        };
    };
    DayPilot.Splitter = $1M;
})();
DayPilot.JSON = {};
(function() {
    function f(n) {
        return n < 10 ? '0' + n : n;
    };
    if (typeof Date.prototype.toJSON2 !== 'function') {
        Date.prototype.toJSON2 = function($0o) {
            return this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + '';
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function($0o) {
            return this.valueOf();
        };
    };
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        $1R = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        $1S, $1T, $1U = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        },
        $1V;

    function quote($13) {
        $1R.lastIndex = 0;
        return $1R.test($13) ? '"' + $13.replace($1R, function(a) {
            var c = $1U[a];
            if (typeof c === 'string') {
                return c;
            };
            return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + $13 + '"';
    };

    function str($0o, $1W) {
        var i, k, v, length, $1X = $1S,
            $1Y, $1Z = $1W[$0o];
        if ($1Z && typeof $1Z === 'object' && typeof $1Z.toJSON2 === 'function') {
            $1Z = $1Z.toJSON2($0o);
        } else if ($1Z && typeof $1Z === 'object' && typeof $1Z.toJSON === 'function' && !$1Z.ignoreToJSON) {
            $1Z = $1Z.toJSON($0o);
        };
        if (typeof $1V === 'function') {
            $1Z = $1V.call($1W, $0o, $1Z);
        };
        switch (typeof $1Z) {
            case 'string':
                return quote($1Z);
            case 'number':
                return isFinite($1Z) ? String($1Z) : 'null';
            case 'boolean':
            case 'null':
                return String($1Z);
            case 'object':
                if (!$1Z) {
                    return 'null';
                };
                $1S += $1T;
                $1Y = [];
                if (typeof $1Z.length === 'number' && !$1Z.propertyIsEnumerable('length')) {
                    length = $1Z.length;
                    for (i = 0; i < length; i += 1) {
                        $1Y[i] = str(i, $1Z) || 'null';
                    };
                    v = $1Y.length === 0 ? '[]' : $1S ? '[\n' + $1S + $1Y.join(',\n' + $1S) + '\n' + $1X + ']' : '[' + $1Y.join(',') + ']';
                    $1S = $1X;
                    return v;
                };
                if ($1V && typeof $1V === 'object') {
                    length = $1V.length;
                    for (i = 0; i < length; i += 1) {
                        k = $1V[i];
                        if (typeof k === 'string') {
                            v = str(k, $1Z);
                            if (v) {
                                $1Y.push(quote(k) + ($1S ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {
                    for (k in $1Z) {
                        if (Object.hasOwnProperty.call($1Z, k)) {
                            v = str(k, $1Z);
                            if (v) {
                                $1Y.push(quote(k) + ($1S ? ': ' : ':') + v);
                            }
                        }
                    }
                };
                v = ($1Y.length === 0) ? '{\u007D' : $1S ? '{\n' + $1S + $1Y.join(',\n' + $1S) + '\n' + $1X + '\u007D' : '{' + $1Y.join(',') + '\u007D';
                $1S = $1X;
                return v;
        }
    };
    if (typeof DayPilot.JSON.stringify !== 'function') {
        DayPilot.JSON.stringify = function($1Z, $20, $21) {
            var i;
            $1S = '';
            $1T = '';
            if (typeof $21 === 'number') {
                for (i = 0; i < $21; i += 1) {
                    $1T += ' ';
                }
            } else if (typeof $21 === 'string') {
                $1T = $21;
            };
            $1V = $20;
            if ($20 && typeof $20 !== 'function' && (typeof $20 !== 'object' || typeof $20.length !== 'number')) {
                throw new Error('JSON.stringify');
            };
            return str('', {
                '': $1Z
            });
        };
    };
    if (typeof Sys !== 'undefined' && Sys.Application && Sys.Application.notifyScriptLoaded) {
        Sys.Application.notifyScriptLoaded();
    }
})();


if (typeof DayPilot === 'undefined') {
    var DayPilot = {};
};
if (typeof DayPilot.Global === 'undefined') {
    DayPilot.Global = {};
};
if (typeof DayPilotBubble === 'undefined') {
    var DayPilotBubble = DayPilot.BubbleVisible = {};
};
(function() {
    if (typeof DayPilot.Bubble !== 'undefined') {
        return;
    };
    (function() {
        if (DayPilot.Global.defaultBubbleCss) {
            return;
        };
        var $a = DayPilot.sheet();
        $a.add(".bubble_default_main", "cursor: default;");
        $a.add(".bubble_default_main_inner", 'border-radius: 5px;font-size: 12px;padding: 4px;color: #666;background: #eeeeee; background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");border: 1px solid #ccc;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 5px;-moz-box-shadow:0px 2px 3px rgba(000,000,000,0.3),inset 0px 0px 2px rgba(255,255,255,0.8);-webkit-box-shadow:0px 2px 3px rgba(000,000,000,0.3),inset 0px 0px 2px rgba(255,255,255,0.8);box-shadow:0px 2px 3px rgba(000,000,000,0.3),inset 0px 0px 2px rgba(255,255,255,0.8);');
        $a.commit();
        DayPilot.Global.defaultBubbleCss = true;
    })();
    var DayPilotBubble = {};
    DayPilotBubble.mouseMove = function(ev) {
        if (typeof(DayPilotBubble) === 'undefined') {
            return;
        };
        DayPilotBubble.mouse = DayPilotBubble.mousePosition(ev);
        var b = DayPilotBubble.active;
        if (b && b.showPosition) {
            var $b = b.showPosition;
            var $c = DayPilotBubble.mouse;
            if ($b.clientX !== $c.clientX || $b.clientY !== $c.clientY) {}
        }
    };
    DayPilotBubble.mousePosition = function(e) {
        var $d = DayPilot.page(e);
        $d.clientY = e.clientY;
        $d.clientX = e.clientX;
        return $d;
    };
    DayPilot.Bubble = function($e) {
        this.v = '710';
        var $f = this;
        this.backgroundColor = "#ffffff";
        this.border = "1px solid #000000";
        this.corners = 'Rounded';
        this.cssOnly = true;
        this.hideAfter = 500;
        this.loadingText = "Loading...";
        this.animated = true;
        this.animation = "fast";
        this.position = "EventTop";
        this.showAfter = 500;
        this.showLoadingLabel = true;
        this.useShadow = true;
        this.zIndex = 10;
        this.cssClassPrefix = "bubble_default";
        this.elements = {};
        this.callBack = function($g) {
            if (this.aspnet()) {
                WebForm_DoCallback(this.uniqueID, DayPilot.JSON.stringify($g), this.updateView, this, this.callbackError, true);
            } else {
                if ($g.calendar.internal.bubbleCallBack) {
                    $g.calendar.internal.bubbleCallBack($g, this);
                } else {
                    $g.calendar.bubbleCallBack($g, this);
                }
            }
        };
        this.callbackError = function($d, $h) {
            alert($d);
        };
        this.updateView = function($d, $h) {
            if ($f !== $h) {
                throw "Callback object mismatch (internal error)";
            };
            DayPilotBubble.active = $f;
            if ($f) {
                if ($f.elements.inner) {
                    $f.elements.inner.innerHTML = $d;
                };
                $f.adjustPosition();
                if (!$f.animated) {
                    $f.addShadow();
                }
            }
        };
        this.init = function() {
            DayPilot.re(document.body, 'mousemove', DayPilotBubble.mouseMove);
        };
        this.aspnet = function() {
            return (typeof WebForm_DoCallback !== 'undefined');
        };
        this.rounded = function() {
            return this.corners === 'Rounded';
        };
        this.showEvent = function(e, $i) {
            var a = new DayPilotBubble.CallBackArgs(e.calendar || e.root, 'Event', e, e.bubbleHtml ? e.bubbleHtml() : null);
            if ($i) {
                this.show(a);
            } else {
                this.showOnMouseOver(a);
            }
        };
        this.showCell = function($j) {
            var a = new DayPilotBubble.CallBackArgs($j.calendar || $j.root, 'Cell', $j, $j.staticBubbleHTML ? $j.staticBubbleHTML() : null);
            this.showOnMouseOver(a);
        };
        this.showTime = function($k) {
            var a = new DayPilotBubble.CallBackArgs($k.calendar || $k.root, 'Time', $k, $k.staticBubbleHTML ? $k.staticBubbleHTML() : null);
            this.showOnMouseOver(a);
        };
        this.showResource = function($l) {
            var a = new DayPilotBubble.CallBackArgs($l.calendar || $l.root, 'Resource', $l, $l.staticBubbleHTML ? $l.staticBubbleHTML() : null);
            this.showOnMouseOver(a);
        };
        this.showHtml = function($m, $n) {
            var a = new DayPilotBubble.CallBackArgs(null, 'Html', null, $m);
            a.div = $n;
            this.show(a);
        };
        this.show = function($o) {
            var $p = this.animated;
            this.showPosition = DayPilotBubble.mouse;
            var id;
            try {
                id = DayPilot.JSON.stringify($o.object);
            } catch (e) {
                return;
            };
            if (DayPilotBubble.active === this && this.sourceId === id) {
                return;
            };
            if (typeof DayPilot.Menu !== 'undefined' && DayPilot.Menu.active) {
                return;
            };
            DayPilotBubble.hideActive();
            DayPilotBubble.active = this;
            this.sourceId = id;
            var $n = document.createElement("div");
            $n.setAttribute("unselectable", "on");
            if (!this.showLoadingLabel) {
                $n.style.display = 'none';
            };
            document.body.appendChild($n);
            $n.style.position = 'absolute';
            if (!this.cssOnly) {
                if (this.width) {
                    $n.style.width = this.width;
                };
                $n.style.cursor = 'default';
            } else {
                $n.className = this.$R("_main");
            };
            $n.style.top = '0px';
            $n.style.left = '0px';
            $n.style.zIndex = this.zIndex + 1;
            if ($p) {
                $n.style.visibility = 'hidden';
            };
            $n.onclick = function() {
                DayPilotBubble.hideActive();
            };
            $n.onmousemove = function(e) {
                DayPilotBubble.cancelTimeout();
                var e = e || window.event;
                e.cancelBubble = true;
            };
            $n.oncontextmenu = function() {
                return false;
            };
            $n.onmouseout = this.delayedHide;
            var $q = document.createElement("div");
            $n.appendChild($q);
            if (this.cssOnly) {
                $q.className = this.$R("_main_inner");
            } else {
                $q.style.padding = '4px';
                if (this.border) {
                    $q.style.border = this.border;
                };
                if (this.rounded()) {
                    $q.style.MozBorderRadius = "5px";
                    $q.style.webkitBorderRadius = "5px";
                    $q.style.borderRadius = "5px";
                };
                $q.style.backgroundColor = this.backgroundColor;
            };
            $q.innerHTML = this.loadingText;
            this.elements.div = $n;
            this.elements.inner = $q;
            var $n = this.getDiv($o);
            if (this.position === "EventTop" && $n) {
                var $r = 2;
                var $s = DayPilot.abs($n, true);
                this.mouse = DayPilotBubble.mouse;
                this.mouse.x = $s.x;
                this.mouse.y = $s.y;
                this.mouse.h = $s.h + $r;
                this.mouse.w = $s.w;
            } else {
                this.mouse = DayPilotBubble.mouse;
            };
            if (this.showLoadingLabel && !$p) {
                this.adjustPosition();
                this.addShadow();
            };
            if ($o.staticHTML) {
                this.updateView($o.staticHTML, this);
            } else if (typeof this.onLoad === 'function') {
                var $g = {};
                $g.source = $o.object;
                $g.async = false;
                $g.loaded = function() {
                    if (this.async) {
                        $f.updateView($g.html, $f);
                    }
                };
                this.onLoad($g);
                if (!$g.async) {
                    $f.updateView($g.html, $f);
                }
            } else {
                this.callBack($o);
            }
        };
        this.getDiv = function($o) {
            if ($o.div) {
                return $o.div;
            };
            if ($o.type === 'Event' && $o.calendar && $o.calendar.internal.findEventDiv) {
                return $o.calendar.internal.findEventDiv($o.object);
            }
        };
        this.$R = function($t) {
            var $u = this.theme || this.cssClassPrefix;
            if ($u) {
                return $u + $t;
            } else {
                return "";
            }
        };
        this.loadingElement = null;
        this.loadingStart = function($s) {};
        this.loadingStop = function() {};
        this.adjustPosition = function() {
            var $p = this.animated;
            var $v = this.position;
            var $w = 10;
            if (!this.elements.div) {
                return;
            };
            if (!this.mouse) {
                return;
            };
            if (!this.mouse.x || !this.mouse.y) {
                DayPilotBubble.hideActive();
                return;
            };
            var $n = this.elements.div;
            $n.style.display = '';
            var $x = $n.offsetHeight;
            var $y = $n.offsetWidth;
            $n.style.display = 'none';
            var wd = DayPilot.wd();
            var $z = wd.width;
            var $A = wd.height;
            if ($v === 'Mouse') {
                var $B = 22;
                var $C = 10;
                var top = 0;
                if (this.mouse.clientY > $A - $x + $w) {
                    var $D = this.mouse.clientY - ($A - $x) + $w;
                    top = (this.mouse.y - $x - $C);
                } else {
                    top = this.mouse.y + $B;
                };
                if (typeof top === 'number') {
                    $n.style.top = Math.max(top, 0) + "px";
                };
                if (this.mouse.clientX > $z - $y + $w) {
                    var $E = this.mouse.clientX - ($z - $y) + $w;
                    $n.style.left = (this.mouse.x - $E) + 'px';
                } else {
                    $n.style.left = this.mouse.x + 'px';
                }
            } else if ($v === 'EventTop') {
                var $F = 2;
                var top = this.mouse.y - $x - $F;
                var $G = wd.scrollTop;
                if (top < $G) {
                    top = this.mouse.y + this.mouse.h + $F;
                };
                if (typeof top === 'number') {
                    $n.style.top = Math.max(top, 0) + 'px';
                };
                var $H = this.mouse.x;
                if (this.mouse.x + $y + $w > $z) {
                    $H = $z - $y - $w;
                };
                $n.style.left = $H + 'px';
            };
            $n.style.display = '';
            if ($p) {
                $n.style.display = '';
                var $I = {};
                $I.color = $n.firstChild.style.color;
                $I.overflow = $n.style.overflow;
                $n.firstChild.style.color = "transparent";
                $n.style.overflow = 'hidden';
                this.removeShadow();
                DayPilot.pop($n, {
                    "finished": function() {
                        $n.firstChild.style.color = $I.color;
                        $n.style.overflow = $I.overflow;
                        $f.addShadow();
                    },
                    "vertical": "bottom",
                    "horizontal": "left",
                    "animation": $f.animation
                });
            }
        };
        this.delayedHide = function() {
            DayPilotBubble.cancelTimeout();
            if ($f.hideAfter > 0) {
                DayPilotBubble.timeout = window.setTimeout(DayPilotBubble.hideActive, $f.hideAfter);
            }
        };
        this.showOnMouseOver = function($o) {
            DayPilotBubble.cancelTimeout();
            var $J = function($K) {
                return function() {
                    $f.show($K);
                };
            };
            DayPilotBubble.timeout = window.setTimeout($J($o), this.showAfter);
        };
        this.hideOnMouseOut = function() {
            this.delayedHide();
        };
        this.addShadow = function() {
            if (!this.useShadow) {
                return;
            };
            if (this.cssOnly) {
                return;
            };
            if (!this.elements.div) {
                return;
            };
            var $n = this.elements.div;
            if (this.shadows && this.shadows.length > 0) {
                this.removeShadow();
            };
            this.shadows = [];
            for (var i = 0; i < 5; i++) {
                var $L = document.createElement('div');
                $L.setAttribute("unselectable", "on");
                $L.style.position = 'absolute';
                $L.style.width = $n.offsetWidth + 'px';
                $L.style.height = $n.offsetHeight + 'px';
                $L.style.top = $n.offsetTop + i + 'px';
                $L.style.left = $n.offsetLeft + i + 'px';
                $L.style.zIndex = this.zIndex;
                $L.style.filter = 'alpha(opacity:10)';
                $L.style.opacity = 0.1;
                $L.style.backgroundColor = '#000000';
                if (this.rounded()) {
                    $L.style.MozBorderRadius = "5px";
                    $L.style.webkitBorderRadius = "5px";
                    $L.style.borderRadius = "5px";
                };
                document.body.appendChild($L);
                this.shadows.push($L);
            }
        };
        this.removeShadow = function() {
            if (!this.shadows) {
                return;
            };
            for (var i = 0; i < this.shadows.length; i++) {
                document.body.removeChild(this.shadows[i]);
            };
            this.shadows = [];
        };
        this.removeDiv = function() {
            if (!this.elements.div) {
                return;
            };
            document.body.removeChild(this.elements.div);
            this.elements.div = null;
        };
        if ($e) {
            for (var name in $e) {
                this[name] = $e[name];
            }
        };
        this.init();
    };
    DayPilotBubble.cancelTimeout = function() {
        if (DayPilotBubble.timeout) {
            window.clearTimeout(DayPilotBubble.timeout);
        }
    };
    DayPilotBubble.hideActive = function() {
        DayPilotBubble.cancelTimeout();
        var $f = DayPilotBubble.active;
        if ($f) {
            $f.removeDiv();
            $f.removeShadow();
        };
        DayPilotBubble.active = null;
    };
    DayPilotBubble.CallBackArgs = function($M, $N, $O, $P) {
        this.calendar = $M;
        this.type = $N;
        this.object = $O;
        this.staticHTML = $P;
        this.toJSON = function() {
            var $Q = {};
            $Q.uid = this.calendar.uniqueID;
            $Q.type = this.type;
            $Q.object = $O;
            return $Q;
        };
    };
    DayPilot.BubbleVisible.Bubble = DayPilotBubble.Bubble;
    DayPilot.BubbleVisible.hideActive = DayPilotBubble.hideActive;
    DayPilot.BubbleVisible.cancelTimeout = DayPilotBubble.cancelTimeout;
    DayPilot.Bubble.hideActive = DayPilotBubble.hideActive;
    if (typeof Sys !== 'undefined' && Sys.Application && Sys.Application.notifyScriptLoaded) {
        Sys.Application.notifyScriptLoaded();
    }
})();

if (typeof DayPilot === 'undefined') {
    var DayPilot = {};
};
if (typeof DayPilot.Global === 'undefined') {
    DayPilot.Global = {};
};
if (typeof DayPilotCalendar === 'undefined') {
    var DayPilotCalendar = DayPilot.CalendarVisible = {};
};
(function() {
    if (typeof DayPilot.Calendar !== 'undefined') {
        return;
    };
    (function() {
        if (DayPilot.Global.defaultCalendarCss) {
            return;
        };
        var $a = DayPilot.sheet();
        $a.add(".calendar_default_main", "border: 1px solid #999;font-family: Tahoma, Arial, sans-serif; font-size: 12px;");
        $a.add(".calendar_default_rowheader_inner,.calendar_default_cornerright_inner,.calendar_default_corner_inner,.calendar_default_colheader_inner,.calendar_default_alldayheader_inner", "color: #666;background: #eee;");
        $a.add(".calendar_default_cornerright_inner", "position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;	border-bottom: 1px solid #999;");
        $a.add(".calendar_default_rowheader_inner", "font-size: 16pt;text-align: right; position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #999;border-bottom: 1px solid #999;");
        $a.add(".calendar_default_corner_inner", "position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #999;border-bottom: 1px solid #999;");
        $a.add(".calendar_default_rowheader_minutes", "font-size:10px;vertical-align: super;padding-left: 2px;padding-right: 2px;");
        $a.add(".calendar_default_colheader_inner", "text-align: center; position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #999;border-bottom: 1px solid #999;");
        $a.add(".calendar_default_cell_inner", "position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #ddd;border-bottom: 1px solid #ddd; background: #f9f9f9;");
        $a.add(".calendar_default_cell_business .calendar_default_cell_inner", "background: #fff");
        $a.add(".calendar_default_alldayheader_inner", "text-align: center;position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #999;border-bottom: 1px solid #999;");
        $a.add(".calendar_default_message", "opacity: 0.9;filter: alpha(opacity=90);	padding: 10px; color: #ffffff;background: #ffa216;");
        $a.add(".calendar_default_alldayevent_inner,.calendar_default_event_inner", 'color: #666; border: 1px solid #999;');
        $a.add(".calendar_default_event_bar", "top: 0px;bottom: 0px;left: 0px;width: 4px;background-color: #9dc8e8;");
        $a.add(".calendar_default_event_bar_inner", "position: absolute;width: 4px;background-color: #1066a8;");
        $a.add(".calendar_default_alldayevent_inner,.calendar_default_event_inner", 'background: #fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");');
        $a.add(".calendar_default_selected .calendar_default_event_inner", "background: #ddd;");
        $a.add(".calendar_default_alldayevent_inner", "position: absolute;top: 2px;bottom: 2px;left: 2px;right: 2px;padding: 2px;margin-right: 1px;font-size: 12px;");
        $a.add(".calendar_default_event_withheader .calendar_default_event_inner", "padding-top: 15px;");
        $a.add(".calendar_default_event", "cursor: default;");
        $a.add(".calendar_default_event_inner", "position: absolute;overflow: hidden;top: 0px;bottom: 0px;left: 0px;right: 0px;padding: 2px 2px 2px 6px;font-size: 12px;");
        $a.add(".calendar_default_shadow_inner", "background-color: #666666;	opacity: 0.5;filter: alpha(opacity=50);height: 100%;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 5px;");
        $a.commit();
        DayPilot.Global.defaultCalendarCss = true;
    })();
    DayPilot.Calendar = function(id) {
        this.v = '710';
        var $b = false;
        if (this instanceof DayPilot.Calendar && !this.$3A) {
            $b = true;
            this.$3A = true;
        };
        if (!$b) {
            throw "DayPilot.Calendar() is a constructor and must be called as 'var c = new DayPilot.Calendar(id);'";
        };
        var $c = this;
        this.uniqueID = null;
        this.id = id;
        this.isCalendar = true;
        this.api = 2;
        this.clientName = id;
        this.clientState = {};
        this.$3B = {};
        this.$3B.pixels = {};
        this.$3B.events = [];
        this.elements = {};
        this.elements.events = [];
        this.nav = {};
        this.events = {};
        this.hideUntilInit = true;
        this.fasterDispose = true;
        this.allDayEventBorderColor = "#000000";
        this.allDayEventFontFamily = 'Tahoma';
        this.allDayEventFontSize = '8pt';
        this.allDayEventFontColor = "#000000";
        this.allDayEventHeight = 25;
        this.allowEventOverlap = true;
        this.allowMultiSelect = true;
        this.autoRefreshCommand = 'refresh';
        this.autoRefreshEnabled = false;
        this.autoRefreshInterval = 60;
        this.autoRefreshMaxCount = 20;
        this.borderColor = "#000000";
        this.businessBeginsHour = 9;
        this.businessEndsHour = 18;
        this.cellBackColor = "#FFFFD5";
        this.cellBackColorNonBusiness = "#FFF4BC";
        this.cellBorderColor = "#999999";
        this.cellHeight = 20;
        this.cellDuration = 30;
        this.columnMarginRight = 5;
        this.cornerBackColor = "#ECE9D8";
        this.crosshairColor = 'Gray';
        this.crosshairOpacity = 20;
        this.crosshairType = "Header";
        this.cssOnly = true;
        this.dayBeginsHour = 0;
        this.dayEndsHour = 24;
        this.days = 1;
        this.deleteImageUrl = null;
        this.durationBarColor = 'blue';
        this.durationBarVisible = true;
        this.durationBarWidth = 5;
        this.durationBarImageUrl = null;
        this.eventArrangement = "SideBySide";
        this.eventBackColor = '#ffffff';
        this.eventBorderColor = "#000000";
        this.eventFontFamily = 'Tahoma';
        this.eventFontSize = '8pt';
        this.eventFontColor = "#000000";
        this.eventSelectColor = 'blue';
        this.headerFontSize = '10pt';
        this.headerFontFamily = 'Tahoma';
        this.headerFontColor = "#000000";
        this.headerHeight = 20;
        this.headerLevels = 1;
        this.height = 300;
        this.heightSpec = 'BusinessHours';
        this.hideFreeCells = false;
        this.hourHalfBorderColor = "#F3E4B1";
        this.hourBorderColor = "#EAD098";
        this.hourFontColor = "#000000";
        this.hourFontFamily = "Tahoma";
        this.hourFontSize = "16pt";
        this.hourNameBackColor = "#ECE9D8";
        this.hourNameBorderColor = "#ACA899";
        this.hourWidth = 45;
        this.initScrollPos = 0;
        this.loadingLabelText = "Loading...";
        this.loadingLabelVisible = true;
        this.loadingLabelBackColor = "orange";
        this.loadingLabelFontColor = "#ffffff";
        this.loadingLabelFontFamily = "Tahoma";
        this.loadingLabelFontSize = "10pt";
        this.locale = "en-us";
        this.messageHideAfter = 5000;
        this.moveBy = "Full";
        this.notifyCommit = 'Immediate';
        this.numberFormat = "0.00";
        this.roundedCorners = false;
        this.rtl = false;
        this.selectedColor = "#316AC5";
        this.shadow = 'Fill';
        this.showToolTip = true;
        this.showAllDayEvents = false;
        this.showAllDayEventStartEnd = true;
        this.showHeader = true;
        this.showHours = true;
        this.startDate = new DayPilot.Date().getDatePart();
        this.cssClassPrefix = "calendar_default";
        this.timeFormat = 'Auto';
        this.timeHeaderCellDuration = 60;
        this.useEventBoxes = 'Always';
        this.useEventSelectionBars = false;
        this.viewType = 'Days';
        this.eventClickHandling = 'Enabled';
        this.eventDoubleClickHandling = 'Enabled';
        this.eventRightClickHandling = 'ContextMenu';
        this.eventDeleteHandling = 'Disabled';
        this.eventEditHandling = 'Update';
        this.eventHoverHandling = 'Bubble';
        this.eventResizeHandling = 'Update';
        this.eventMoveHandling = 'Update';
        this.eventSelectHandling = 'Update';
        this.headerClickHandling = 'Enabled';
        this.timeRangeSelectedHandling = 'Enabled';
        this.timeRangeDoubleClickHandling = "Enabled";
        this.transparent = false;
        this.separateEventsTable = true;
        this.autoRefreshCount = 0;
        this.doubleClickTimeout = 300;
        this.$3C = {};
        this.$3C.ie = (navigator && navigator.userAgent && navigator.userAgent.indexOf("MSIE") !== -1);
        this.$3C.ie9 = (navigator && navigator.userAgent && navigator.userAgent.indexOf("MSIE 9") !== -1);
        this.$3C.ielt9 = (function() {
            var $d = document.createElement("div");
            $d.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
            var $e = ($d.getElementsByTagName("i").length === 1);
            return $e;
        })();
        this.$3C.ff = (navigator && navigator.userAgent && navigator.userAgent.indexOf("Firefox") !== -1);
        this.$3C.opera105 = (function() {
            if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
                var v = new Number(RegExp.$1);
                return v >= 10.5;
            };
            return false;
        })();
        this.$3C.webkit522 = (function() {
            if (/AppleWebKit[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
                var v = new Number(RegExp.$1);
                return v >= 522;
            };
            return false;
        })();
        this.clearSelection = function() {
            if (!this.selectedCells) {
                this.selectedCells = [];
                return;
            };
            this.$3D();
            this.selectedCells = [];
        };
        this.$3D = function() {
            if (!this.selectedCells) {
                return;
            };
            for (var j = 0; j < this.selectedCells.length; j++) {
                var $f = this.selectedCells[j];
                if ($f) {
                    if ($f.selected) {
                        $f.removeChild($f.selected);
                        $f.firstChild.style.display = '';
                        $f.selected = null;
                    }
                }
            }
        };
        this.cleanSelection = this.clearSelection;
        this.$3E = function($g, $h, $i) {
            var $j = {};
            $j.action = $g;
            $j.parameters = $i;
            $j.data = $h;
            $j.header = this.$3F();
            var $k = "JSON" + DayPilot.JSON.stringify($j);
            __doPostBack($c.uniqueID, $k);
        };
        this.$3G = function($g, $i, $h, $l) {
            if (this.callbackTimeout) {
                window.clearTimeout(this.callbackTimeout);
            };
            if (typeof $l === 'undefined') {
                $l = "CallBack";
            };
            this.callbackTimeout = window.setTimeout(function() {
                $c.$3H();
            }, 100);
            var $j = {};
            $j.action = $g;
            $j.type = $l;
            $j.parameters = $i;
            $j.data = $h;
            $j.header = this.$3F();
            var $k = "JSON" + DayPilot.JSON.stringify($j);
            if (this.backendUrl) {
                DayPilot.request(this.backendUrl, this.$3I, $k, this.$3J);
            } else if (typeof WebForm_DoCallback === 'function') {
                WebForm_DoCallback(this.uniqueID, $k, this.$3K, this.clientName, this.onCallbackError, true);
            }
        };
        this.$3J = function($m) {
            if (typeof $c.onAjaxError === 'function') {
                var $n = {};
                $n.request = $m;
                $c.onAjaxError($n);
            } else if (typeof $c.ajaxError === 'function') {
                $c.ajaxError($m);
            }
        };
        this.dispose = function() {
            var c = $c;
            if (!c.nav.top) {
                return;
            };
            c.$3L();
            c.$3M();
            if (c.nav.messageClose) {
                c.nav.messageClose.onclick = null;
            };
            if (c.nav.hourTable) c.nav.hourTable.oncontextmenu = null;
            if (c.nav.hourTable) c.nav.hourTable.onmousemove = null;
            if (c.nav.header) c.nav.header.oncontextmenu = null;
            if (c.nav.corner) c.nav.corner.oncontextmenu = null;
            c.nav.zoom.onmousemove = null;
            c.nav.scroll.onscroll = null;
            c.nav.scroll.root = null;
            DayPilot.pu(c.nav.loading);
            c.$3N();
            c.$3O();
            c.nav.select = null;
            c.nav.cornerRight = null;
            c.nav.scrollable = null;
            c.nav.bottomLeft = null;
            c.nav.bottomRight = null;
            c.nav.allday = null;
            c.nav.zoom = null;
            c.nav.loading = null;
            c.nav.events = null;
            c.nav.header = null;
            c.nav.hourTable = null;
            c.nav.scrolltop = null;
            c.nav.scroll = null;
            c.nav.vsph = null;
            c.nav.main = null;
            c.nav.message = null;
            c.nav.messageClose = null;
            c.nav.top.removeAttribute("style");
            c.nav.top.removeAttribute("class");
            c.nav.top.innerHTML = '';
            c.nav.top.dp = null;
            c.nav.top = null;
            DayPilot.ue(window, 'resize', c.$3P);
            DayPilotCalendar.unregister(c);
        };
        this.$3Q = function() {
            var $o = document.getElementById(id);
            $o.dispose = this.dispose;
        };
        this.$3I = function($p) {
            $c.$3K($p.responseText);
        };
        this.$3F = function() {
            var h = {};
            h.v = this.v;
            h.control = "dpc";
            h.id = this.id;
            h.clientState = $c.clientState;
            h.columns = this.$3R();
            h.days = $c.days;
            h.startDate = $c.startDate;
            h.cellDuration = $c.cellDuration;
            h.cssOnly = $c.cssOnly;
            h.cssClassPrefix = $c.cssClassPrefix;
            h.heightSpec = $c.heightSpec;
            h.businessBeginsHour = $c.businessBeginsHour;
            h.businessEndsHour = $c.businessEndsHour;
            h.viewType = $c.viewType;
            h.dayBeginsHour = $c.dayBeginsHour;
            h.dayEndsHour = $c.dayEndsHour;
            h.headerLevels = $c.headerLevels;
            h.backColor = $c.cellBackColor;
            h.nonBusinessBackColor = $c.cellBackColorNonBusiness;
            h.eventHeaderVisible = $c.eventHeaderVisible;
            h.timeFormat = $c.timeFormat;
            h.timeHeaderCellDuration = $c.timeHeaderCellDuration;
            h.locale = $c.locale;
            h.showAllDayEvents = $c.showAllDayEvents;
            h.tagFields = $c.tagFields;
            h.hourNameBackColor = $c.hourNameBackColor;
            h.hourFontFamily = $c.hourFontFamily;
            h.hourFontSize = $c.hourFontSize;
            h.hourFontColor = $c.hourFontColor;
            h.selected = $c.multiselect.events();
            h.hashes = $c.hashes;
            return h;
        };
        this.$3S = function() {
            this.$3T();
            DayPilot.Areas.hideAll();
        };
        this.$3R = function() {
            var $q = [];
            $q.ignoreToJSON = true;
            if (!this.columns) {
                return $q;
            };
            for (var i = 0; i < this.columns.length; i++) {
                var $r = this.columns[i];
                var $s = this.$3U($r);
                $q.push($s);
            };
            return $q;
        };
        this.$3U = function($r) {
            var $s = {};
            $s.Value = $r.id;
            $s.Name = $r.name;
            $s.ToolTip = $r.toolTip;
            $s.Date = $r.start;
            $s.Children = this.$3V($r.children);
            return $s;
        };
        this.$3V = function($t) {
            var $u = [];
            $u.ignoreToJSON = true;
            if (!$t) {
                return $u;
            };
            for (var i = 0; i < $t.length; i++) {
                $u.push(this.$3U($t[i]));
            };
            return $u;
        };
        this.$3K = function($v, $w) {
            var $v = eval("(" + $v + ")");
            if ($v.BubbleGuid) {
                var $x = $v.BubbleGuid;
                var $y = this.bubbles[$x];
                delete this.bubbles[$x];
                $c.$3W();
                if (typeof $v.Result.BubbleHTML !== 'undefined') {
                    $y.updateView($v.Result.BubbleHTML, $y);
                };
                return;
            };
            if ($v.CallBackRedirect) {
                document.location.href = $v.CallBackRedirect;
                return;
            };
            if (typeof $v.ClientState !== 'undefined') {
                $c.clientState = $v.ClientState;
            };
            if ($v.UpdateType === "None") {
                $c.$3W();
                $c.$3X($v.CallBackData, true);
                if ($v.Message) {
                    $c.message($v.Message);
                };
                return;
            };
            if ($v.VsUpdate) {
                var $z = document.createElement("input");
                $z.type = 'hidden';
                $z.name = $c.id + "_vsupdate";
                $z.id = $z.name;
                $z.value = $v.VsUpdate;
                $c.nav.vsph.innerHTML = '';
                $c.nav.vsph.appendChild($z);
            };
            $c.$3M();
            $c.multiselect.clear(true);
            $c.multiselect.$3Y = $v.SelectedEvents;
            if (typeof $v.TagFields !== 'undefined') {
                $c.tagFields = $v.TagFields;
            };
            if (typeof $v.SortDirections !== 'undefined') {
                $c.sortDirections = $v.SortDirections;
            };
            if ($v.UpdateType === "Full") {
                $c.colors = $v.Colors;
                $c.palette = $v.Palette;
                $c.dirtyColors = $v.DirtyColors;
                $c.cellProperties = $v.CellProperties;
                $c.cellConfig = $v.CellConfig;
                $c.columns = $v.Columns;
                $c.days = $v.Days;
                $c.startDate = new DayPilot.Date($v.StartDate).getDatePart();
                $c.cellDuration = $v.CellDuration;
                $c.heightSpec = $v.HeightSpec ? $v.HeightSpec : $c.heightSpec;
                $c.businessBeginsHour = $v.BusinessBeginsHour ? $v.BusinessBeginsHour : $c.businessBeginsHour;
                $c.businessEndsHour = $v.BusinessEndsHour ? $v.BusinessEndsHour : $c.businessEndsHour;
                $c.viewType = $v.ViewType;
                $c.headerLevels = $v.HeaderLevels;
                $c.backColor = $v.BackColor ? $v.BackColor : $c.backColor;
                $c.nonBusinessBackColor = $v.NonBusinessBackColor ? $v.NonBusinessBackColor : $c.nonBusinessBackColor;
                $c.eventHeaderVisible = $v.EventHeaderVisible ? $v.EventHeaderVisible : $c.eventHeaderVisible;
                $c.timeFormat = $v.TimeFormat ? $v.TimeFormat : $c.timeFormat;
                $c.timeHeaderCellDuration = typeof $v.TimeHeaderCellDuration !== 'undefined' ? $v.TimeHeaderCellDuration : $c.timeHeaderCellDuration;
                $c.locale = $v.Locale ? $v.Locale : $c.locale;
                $c.dayBeginsHour = typeof $v.DayBeginsHour !== 'undefined' ? $v.DayBeginsHour : $c.dayBeginsHour;
                $c.dayEndsHour = typeof $v.DayEndsHour !== 'undefined' ? $v.DayEndsHour : $c.dayEndsHour;
                $c.cornerBackColor = $v.CornerBackColor;
                $c.cornerHtml = $v.CornerHTML;
                $c.hours = $v.Hours;
                $c.$3Z();
                $c.$40();
            };
            if ($v.Hashes) {
                for ($A in $v.Hashes) {
                    $c.hashes[$A] = $v.Hashes[$A];
                }
            };
            $c.$41($v.Events);
            $c.$42();
            if ($v.UpdateType === "Full" || $c.hideFreeCells) {
                $c.$43();
                $c.$44();
                $c.$45();
                $c.$46();
                $c.$47();
                $c.$48();
                $c.$49();
                $c.$4a();
                $c.clearSelection();
            };
            $c.$4b();
            $c.$4c();
            $c.$4d();
            if ($c.heightSpec === "Parent100Pct") {
                $c.$3P();
            };
            if ($c.timeRangeSelectedHandling !== "HoldForever") {
                $c.clearSelection();
            };
            $c.$4e();
            if ($c.todo) {
                if ($c.todo.del) {
                    var $B = $c.todo.del;
                    $B.parentNode.removeChild($B);
                    $c.todo.del = null;
                }
            };
            $c.$3X($v.CallBackData, true);
            $c.$3W();
            $c.$4f();
            if ($v.Message) {
                $c.message($v.Message);
            }
        };
        this.$3X = function($h, $C) {
            var $D = function($h, $E) {
                return function() {
                    if ($c.$4g()) {
                        if (typeof $c.onAfterRender === 'function') {
                            var $n = {};
                            $n.isCallBack = $E;
                            $n.data = $h;
                            $c.onAfterRender($n);
                        }
                    } else {
                        if ($c.afterRender) {
                            $c.afterRender($h, $E);
                        }
                    }
                };
            };
            window.setTimeout($D($h, $C), 0);
        };
        this.$4h = function($F, $G, $l) {
            var $H = $c.nav.events;
            var $I = $H.clientWidth / $H.rows[0].cells.length;
            var i = Math.floor($c.coords.x / $I);
            if (i < 0) {
                i = 0;
            };
            if ($c.rtl) {
                i = $c.columnsBottom.length - i - 1;
            };
            var $r = $H.rows[0].cells[i];
            var $J = 0;
            if (typeof $F.duration !== 'undefined') {
                var $K = $F.duration;
                var top = Math.floor((($c.coords.y - $J) + $c.cellHeight / 2) / $c.cellHeight) * $c.cellHeight + $J;
                var $L = $K * $c.cellHeight / (60 * $c.cellDuration);
            } else {
                var e = $F.event;
                var $L = e.part.height;
                var top = e.part.top;
            };
            var $M = document.createElement('div');
            $M.setAttribute('unselectable', 'on');
            $M.style.position = 'absolute';
            $M.style.width = '100%';
            $M.style.height = $L + 'px';
            $M.style.left = '0px';
            $M.style.top = top + 'px';
            $M.style.zIndex = 101;
            $M.exclude = true;
            var $N = document.createElement("div");
            $M.appendChild($N);
            if (this.cssOnly) {
                $M.className = $c.$4i("_shadow");
                $N.className = this.$4i("_shadow_inner");
            };
            if (!this.cssOnly) {
                $N.style.position = "absolute";
                $N.style.top = "0px";
                $N.style.bottom = "0px";
                $N.style.left = "0px";
                $N.style.right = "0px";
                if ($l === 'Fill') {
                    $N.style.backgroundColor = "#aaaaaa";
                    $N.style.opacity = 0.5;
                    $N.style.filter = "alpha(opacity=50)";
                    $N.style.border = '2px solid #aaaaaa';
                } else {
                    $N.style.border = '2px dotted #666666';
                };
                if (this.roundedCorners) {
                    $N.style.MozBorderRadius = "5px";
                    $N.style.webkitBorderRadius = "5px";
                    $N.style.borderRadius = "5px";
                }
            };
            $r.firstChild.appendChild($M);
            return $M;
        };
        this.$4j = function() {
            return this.$4k() / (3600 * 1000);
        };
        this.$4l = function() {
            if (this.businessBeginsHour > this.businessEndsHour) {
                return 24 - this.businessBeginsHour + this.businessEndsHour;
            } else {
                return this.businessEndsHour - this.businessBeginsHour;
            }
        };
        this.$4m = function() {
            if (this.dayBeginsHour >= this.dayEndsHour) {
                return 24 - this.dayBeginsHour + this.dayEndsHour;
            } else {
                return this.dayEndsHour - this.dayBeginsHour;
            }
        };
        this.$4k = function($O) {
            var $P = 0;
            if (this.heightSpec === 'BusinessHoursNoScroll') {
                $P = this.$4l();
            } else if (this.hideFreeCells && !$O) {
                var $Q = (this.maxEnd - 1) * this.cellDuration / this.cellHeight;
                var $R = Math.ceil($Q / 60);
                $P = Math.max(this.dayBeginsHour + $R, this.businessEndsHour) - this.$4n();
            } else {
                $P = this.$4m();
            };
            return $P * 60 * 60 * 1000;
        };
        this.message = function($S, $T, $U, $V) {
            if (!$S) {
                return;
            };
            var $T = $T || this.messageHideAfter || 2000;
            var $U = $U || "#ffffff";
            var $V = $V || "#000000";
            var $W = 0.8;
            var $d;
            var top = this.$4o();
            var $X = this.showHours ? this.hourWidth : 0;
            var $Y = DayPilot.sw($c.nav.scroll);
            if (!this.cssOnly) {
                top += 1;
                $X += 2;
                $Y -= 2;
            };
            if ($c.rtl) {
                var $Z = $X;
                $X = $Y;
                $Y = $Z;
            };
            if (!this.nav.message) {
                $d = document.createElement("div");
                $d.style.position = "absolute";
                $d.style.left = ($X) + "px";
                $d.style.top = (top) + "px";
                $d.style.right = "0px";
                $d.style.display = 'none';
                $d.onmousemove = function() {
                    if ($c.messageTimeout) {
                        clearTimeout($c.messageTimeout);
                    }
                };
                $d.onmouseout = function() {
                    if ($c.nav.message.style.display !== 'none') {
                        $c.messageTimeout = setTimeout($c.$4p, 500);
                    }
                };
                var $N = document.createElement("div");
                $N.onclick = function() {
                    $c.nav.message.style.display = 'none';
                };
                if (!this.cssOnly) {
                    $N.style.padding = "5px";
                    $N.style.opacity = $W;
                    $N.style.filter = "alpha(opacity=" + ($W * 100) + ")";
                } else {
                    $N.className = this.$4i("_message");
                };
                $d.appendChild($N);
                var close = document.createElement("div");
                close.style.position = "absolute";
                if (!this.cssOnly) {
                    close.style.top = "5px";
                    close.style.right = (DayPilot.sw($c.nav.scroll) + 5) + "px";
                    close.style.color = $U;
                    close.style.lineHeight = "100%";
                    close.style.cursor = "pointer";
                    close.style.fontWeight = "bold";
                    close.innerHTML = "X";
                } else {
                    close.className = this.$4i("_message_close");
                };
                close.onclick = function() {
                    $c.nav.message.style.display = 'none';
                };
                $d.appendChild(close);
                this.nav.top.insertBefore($d, this.nav.loading);
                this.nav.message = $d;
                this.nav.messageClose = close;
            } else {
                this.nav.message.style.top = top + "px";
            };
            if (this.nav.cornerRight) {
                this.nav.message.style.right = $Y + "px";
            } else {
                this.nav.message.style.right = "0px";
            };
            var $00 = function() {
                var $N = $c.nav.message.firstChild;
                if (!$c.cssOnly) {
                    $N.style.padding = "5px";
                    $N.style.opacity = $W;
                    $N.style.backgroundColor = $V;
                    $N.style.color = $U;
                };
                $N.innerHTML = $S;
                var end = function() {
                    $c.messageTimeout = setTimeout($c.$4p, $T);
                };
                DayPilot.fade($c.nav.message, 0.2, end);
            };
            clearTimeout($c.messageTimeout);
            if (this.nav.message.style.display !== 'none') {
                DayPilot.fade($c.nav.message, -0.2, $00);
            } else {
                $00();
            }
        };
        this.message.show = function($S) {
            $c.message($S);
        };
        this.message.hide = function() {
            $c.$4p();
        };
        this.$4p = function() {
            var end = function() {
                $c.nav.message.style.display = 'none';
            };
            DayPilot.fade($c.nav.message, -0.2, end);
        };
        this.$46 = function() {
            if (this.nav.message) {
                this.nav.message.style.top = (this.$4o()) + "px";
            }
        };
        this.$4q = function() {
            return this.$4k() / (60 * 1000 * this.cellDuration);
        };
        this.eventClickPostBack = function(e, $h) {
            this.$3E('EventClick', $h, e);
        };
        this.eventClickCallBack = function(e, $h) {
            this.$3G('EventClick', e, $h);
        };
        this.$4r = function(e) {
            var $d = this;
            var e = e || window.event;
            var $01 = e.ctrlKey;
            if (typeof(DayPilot.Bubble) !== 'undefined') {
                DayPilot.Bubble.hideActive();
            };
            if ($c.eventDoubleClickHandling === 'Disabled') {
                $c.$4s($d, $01);
                return;
            };
            if (!$c.timeouts) {
                $c.timeouts = [];
            } else {
                for (var $02 in $c.timeouts) {
                    window.clearTimeout($c.timeouts[$02]);
                };
                $c.timeouts = [];
            };
            var $03 = function($d, $01) {
                return function() {
                    $c.$4s($d, $01);
                };
            };
            $c.timeouts.push(window.setTimeout($03(this, $01), $c.doubleClickTimeout));
        };
        this.$4s = function($04, $01) {
            var e = $04.event;
            if (!e.client.clickEnabled()) {
                return;
            };
            if ($c.$4g()) {
                var $n = {};
                $n.e = e;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onEventClick === 'function') {
                    $c.onEventClick($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($c.eventClickHandling) {
                    case 'PostBack':
                        $c.eventClickPostBack(e);
                        break;
                    case 'CallBack':
                        $c.eventClickCallBack(e);
                        break;
                    case 'JavaScript':
                        $c.onEventClick(e);
                        break;
                    case 'Edit':
                        if (!e.allday()) {
                            $c.$4t($04);
                        };
                        break;
                    case 'Select':
                        if (!e.allday()) {
                            $c.$4u($04, e, $01);
                        };
                        break;
                    case 'Bubble':
                        if ($c.bubble) {
                            $c.bubble.showEvent(e);
                        };
                        break;
                    case 'ContextMenu':
                        var $05 = e.client.contextMenu();
                        if ($05) {
                            $05.show(e);
                        } else {
                            if ($c.contextMenu) {
                                $c.contextMenu.show(e);
                            }
                        };
                        break;
                };
                if (typeof $c.onEventClicked === 'function') {
                    $c.onEventClicked($n);
                }
            } else {
                switch ($c.eventClickHandling) {
                    case 'PostBack':
                        $c.eventClickPostBack(e);
                        break;
                    case 'CallBack':
                        $c.eventClickCallBack(e);
                        break;
                    case 'JavaScript':
                        $c.onEventClick(e);
                        break;
                    case 'Edit':
                        if (!e.allday()) {
                            $c.$4t($04);
                        };
                        break;
                    case 'Select':
                        if (!e.allday()) {
                            $c.$4u($04, e, $01);
                        };
                        break;
                    case 'Bubble':
                        if ($c.bubble) {
                            $c.bubble.showEvent(e);
                        };
                        break;
                    case 'ContextMenu':
                        var $05 = e.client.contextMenu();
                        if ($05) {
                            $05.show(e);
                        } else {
                            if ($c.contextMenu) {
                                $c.contextMenu.show(e);
                            }
                        };
                        break;
                }
            }
        };
        this.eventDoubleClickPostBack = function(e, $h) {
            this.$3E('EventDoubleClick', $h, e);
        };
        this.eventDoubleClickCallBack = function(e, $h) {
            this.$3G('EventDoubleClick', e, $h);
        };
        this.$4v = function(ev) {
            if (typeof(DayPilotBubble) !== 'undefined') {
                DayPilotBubble.hideActive();
            };
            if ($c.timeouts) {
                for (var $02 in $c.timeouts) {
                    window.clearTimeout($c.timeouts[$02]);
                };
                $c.timeouts = null;
            };
            var e = this.event;
            var ev = ev || window.event;
            if ($c.$4g()) {
                var $n = {};
                $n.e = e;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onEventDoubleClick === 'function') {
                    $c.onEventDoubleClick($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($c.eventDoubleClickHandling) {
                    case 'PostBack':
                        $c.eventDoubleClickPostBack(e);
                        break;
                    case 'CallBack':
                        $c.eventDoubleClickCallBack(e);
                        break;
                    case 'Edit':
                        if (!e.allday()) {
                            $c.$4t(this);
                        };
                        break;
                    case 'Select':
                        if (!e.allday()) {
                            $c.$4u(this, e, ev.ctrlKey);
                        };
                        break;
                    case 'Bubble':
                        if ($c.bubble) {
                            $c.bubble.showEvent(e);
                        };
                        break;
                };
                if (typeof $c.onEventDoubleClicked === 'function') {
                    $c.onEventDoubleClicked($n);
                }
            } else {
                switch ($c.eventDoubleClickHandling) {
                    case 'PostBack':
                        $c.eventDoubleClickPostBack(e);
                        break;
                    case 'CallBack':
                        $c.eventDoubleClickCallBack(e);
                        break;
                    case 'JavaScript':
                        $c.onEventDoubleClick(e);
                        break;
                    case 'Edit':
                        if (!e.allday()) {
                            $c.$4t(this);
                        };
                        break;
                    case 'Select':
                        if (!e.allday()) {
                            $c.$4u(this, e, ev.ctrlKey);
                        };
                        break;
                    case 'Bubble':
                        if ($c.bubble) {
                            $c.bubble.showEvent(e);
                        };
                        break;
                }
            }
        };
        this.eventRightClickPostBack = function(e, $h) {
            this.$3E('EventRightClick', $h, e);
        };
        this.eventRightClickCallBack = function(e, $h) {
            this.$3G('EventRightClick', e, $h);
        };
        this.$4w = function() {
            var e = this.event;
            if (!e.client.rightClickEnabled()) {
                return false;
            };
            if ($c.$4g()) {
                var $n = {};
                $n.e = e;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onEventRightClick === 'function') {
                    $c.onEventRightClick($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($c.eventRightClickHandling) {
                    case 'PostBack':
                        $c.eventRightClickPostBack(e);
                        break;
                    case 'CallBack':
                        $c.eventRightClickCallBack(e);
                        break;
                    case 'ContextMenu':
                        var $05 = e.client.contextMenu();
                        if ($05) {
                            $05.show(e);
                        } else {
                            if ($c.contextMenu) {
                                $c.contextMenu.show(this.event);
                            }
                        };
                        break;
                    case 'Bubble':
                        if ($c.bubble) {
                            $c.bubble.showEvent(e);
                        };
                        break;
                };
                if (typeof $c.onEventRightClicked === 'function') {
                    $c.onEventRightClicked($n);
                }
            } else {
                switch ($c.eventRightClickHandling) {
                    case 'PostBack':
                        $c.eventRightClickPostBack(e);
                        break;
                    case 'CallBack':
                        $c.eventRightClickCallBack(e);
                        break;
                    case 'JavaScript':
                        $c.onEventRightClick(e);
                        break;
                    case 'ContextMenu':
                        var $05 = e.client.contextMenu();
                        if ($05) {
                            $05.show(e);
                        } else {
                            if ($c.contextMenu) {
                                $c.contextMenu.show(this.event);
                            }
                        };
                        break;
                    case 'Bubble':
                        if ($c.bubble) {
                            $c.bubble.showEvent(e);
                        };
                        break;
                }
            };
            return false;
        };
        this.headerClickPostBack = function(c, $h) {
            this.$3E('HeaderClick', $h, c);
        };
        this.headerClickCallBack = function(c, $h) {
            this.$3G('HeaderClick', c, $h);
        };
        this.$4x = function($F) {
            var $h = this.data;
            var c = new DayPilotCalendar.Column($h.id, $h.name, $h.start);
            if ($c.$4g()) {
                var $n = {};
                $n.header = {};
                $n.header.id = $h.id;
                $n.header.name = $h.name;
                $n.header.start = $h.start;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onHeaderClick === 'function') {
                    $c.onHeaderClick($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($c.headerClickHandling) {
                    case 'PostBack':
                        $c.headerClickPostBack(c);
                        break;
                    case 'CallBack':
                        $c.headerClickCallBack(c);
                        break;
                };
                if (typeof $c.onHeaderClicked === 'function') {
                    $c.onHeaderClicked($n);
                }
            } else {
                switch ($c.headerClickHandling) {
                    case 'PostBack':
                        $c.headerClickPostBack(c);
                        break;
                    case 'CallBack':
                        $c.headerClickCallBack(c);
                        break;
                    case 'JavaScript':
                        $c.onHeaderClick(c);
                        break;
                }
            }
        };
        this.$4y = function() {
            if (typeof(DayPilotBubble) !== 'undefined' && $c.columnBubble) {
                if ($c.viewType === "Resources") {
                    var $06 = {};
                    $06.calendar = $c;
                    $06.id = this.data.id;
                    $06.toJSON = function() {
                        var $07 = {};
                        $07.id = this.id;
                        return $07;
                    };
                    $c.columnBubble.showResource($06);
                } else {
                    var $08 = new DayPilot.Date(this.data.start);
                    var end = $08.addDays(1);
                    var $09 = {};
                    $09.calendar = $c;
                    $09.start = $08;
                    $09.end = end;
                    $09.toJSON = function() {
                        var $07 = {};
                        $07.start = this.start;
                        $07.end = this.end;
                        return $07;
                    };
                    $c.columnBubble.showTime($09);
                }
            };
            var $f = this;
            var $d = $f.firstChild;
            if (!$d.active) {
                var $h = $f.data;
                var c = new DayPilotCalendar.Column($h.id, $h.name, $h.start);
                c.areas = $f.data.areas;
                DayPilot.Areas.showAreas($d, c);
            }
        };
        this.$4z = function(ev) {
            if (typeof(DayPilotBubble) !== 'undefined' && $c.columnBubble) {
                $c.columnBubble.hideOnMouseOut();
            };
            DayPilot.Areas.hideAreas(this.firstChild, ev);
        };
        this.eventDeletePostBack = function(e, $h) {
            this.$3E('EventDelete', $h, e);
        };
        this.eventDeleteCallBack = function(e, $h) {
            this.$3G('EventDelete', e, $h);
        };
        this.$4A = function($F) {
            var e = $F.parentNode.parentNode.event;
            if ($c.$4g()) {
                var $n = {};
                $n.e = e;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onEventDelete === 'function') {
                    $c.onEventDelete($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($c.eventDeleteHandling) {
                    case 'PostBack':
                        $c.eventDeletePostBack(e);
                        break;
                    case 'CallBack':
                        $c.eventDeleteCallBack(e);
                        break;
                };
                if (typeof $c.onEventDeleted === 'function') {
                    $c.onEventDeleted($n);
                }
            } else {
                switch ($c.eventDeleteHandling) {
                    case 'PostBack':
                        $c.eventDeletePostBack(e);
                        break;
                    case 'CallBack':
                        $c.eventDeleteCallBack(e);
                        break;
                    case 'JavaScript':
                        $c.onEventDelete(e);
                        break;
                }
            }
        };
        this.eventResizePostBack = function(e, $0a, $0b, $h) {
            if (!$0a) {
                throw 'newStart is null';
            };
            if (!$0b) {
                throw 'newEnd is null';
            };
            var $0c = {};
            $0c.e = e;
            $0c.newStart = $0a;
            $0c.newEnd = $0b;
            this.$3E('EventResize', $h, $0c);
        };
        this.eventResizeCallBack = function(e, $0a, $0b, $h) {
            if (!$0a) throw 'newStart is null';
            if (!$0b) throw 'newEnd is null';
            var $0c = {};
            $0c.e = e;
            $0c.newStart = $0a;
            $0c.newEnd = $0b;
            this.$3G('EventResize', $0c, $h);
        };
        this.$4B = function($l, $g, $0c, $h) {
            if ($l === 'PostBack') {
                $c.postBack2($g, $0c, $h);
            } else if ($l === 'CallBack') {
                $c.$3G($g, $0c, $h, "CallBack");
            } else if ($l === 'Immediate') {
                $c.$3G($g, $0c, $h, "Notify");
            } else if ($l === 'Queue') {
                $c.queue.add(new DayPilot.Action(this, $g, $0c, $h));
            } else if ($l === 'Notify') {
                if ($0d.notifyType() === 'Notify') {
                    $c.$3G($g, $0c, $h, "Notify");
                } else {
                    $c.queue.add(new DayPilot.Action($c, $g, $0c, $h));
                }
            } else {
                throw "Invalid event invocation type";
            }
        };
        this.$4n = function($O) {
            if (this.heightSpec === 'BusinessHoursNoScroll') {
                return this.businessBeginsHour;
            } else if (this.hideFreeCells && !$O) {
                var $Q = (this.minStart - 1) * this.cellDuration / this.cellHeight;
                var $R = Math.floor($Q / 60);
                return Math.min(this.dayBeginsHour + $R, this.businessBeginsHour);
            } else {
                return this.dayBeginsHour;
            }
        };
        this.$4g = function() {
            return $c.api === 2;
        };
        this.$4C = function(e, $0e, $0f, $0g) {
            if (this.eventResizeHandling === 'Disabled') {
                return;
            };
            var $J = 0;
            var $0a = new Date();
            var $0b = new Date();
            var $08 = e.start();
            var end = e.end();
            var $0h = $c.cellDuration;
            if ($0g === 'top') {
                var $0i = $08.getDatePart();
                var $0j = Math.floor(($0f - $J) / $c.cellHeight);
                var $0k = $0j * $0h;
                var ts = $0k * 60 * 1000;
                var $0l = $c.$4n() * 60 * 60 * 1000;
                $0a = $0i.addTime(ts + $0l);
                $0b = e.end();
            } else if ($0g === 'bottom') {
                var $0i = end.getDatePart();
                var $0j = Math.floor(($0f + $0e - $J) / $c.cellHeight);
                var $0k = $0j * $0h;
                var ts = $0k * 60 * 1000;
                var $0l = $c.$4n() * 60 * 60 * 1000;
                $0a = $08;
                $0b = $0i.addTime(ts + $0l);
            };
            if ($c.$4g()) {
                var $n = {};
                $n.e = e;
                $n.newStart = $0a;
                $n.newEnd = $0b;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onEventResize === 'function') {
                    $c.onEventResize($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($c.eventResizeHandling) {
                    case 'PostBack':
                        $c.eventResizePostBack(e, $0a, $0b);
                        break;
                    case 'CallBack':
                        $c.eventResizeCallBack(e, $0a, $0b);
                        break;
                    case 'Notify':
                        $c.eventResizeNotify(e, $0a, $0b);
                        break;
                    case 'Update':
                        e.start($0a);
                        e.end($0b);
                        $c.events.update(e);
                        break;
                };
                if (typeof $c.onEventResized === 'function') {
                    $c.onEventResized($n);
                }
            } else {
                switch ($c.eventResizeHandling) {
                    case 'PostBack':
                        $c.eventResizePostBack(e, $0a, $0b);
                        break;
                    case 'CallBack':
                        $c.eventResizeCallBack(e, $0a, $0b);
                        break;
                    case 'JavaScript':
                        $c.onEventResize(e, $0a, $0b);
                        break;
                    case 'Notify':
                        $c.eventResizeNotify(e, $0a, $0b);
                        break;
                }
            }
        };
        this.eventResizeNotify = function(e, $0a, $0b, $h) {
            var $0m = new DayPilot.Event(e.copy(), this);
            e.start($0a);
            e.end($0b);
            e.commit();
            $c.update();
            this.$4D("Notify", $0m, $0a, $0b, $h);
        };
        this.$4D = function($l, e, $0a, $0b, $h) {
            var $0c = {};
            $0c.e = e;
            $0c.newStart = $0a;
            $0c.newEnd = $0b;
            this.$4B($l, "EventResize", $0c, $h);
        };
        this.eventMovePostBack = function(e, $0a, $0b, $0n, $h) {
            if (!$0a) throw 'newStart is null';
            if (!$0b) throw 'newEnd is null';
            var $0c = {};
            $0c.e = e;
            $0c.newStart = $0a;
            $0c.newEnd = $0b;
            $0c.newResource = $0n;
            this.$3E('EventMove', $h, $0c);
        };
        this.eventMoveCallBack = function(e, $0a, $0b, $0n, $h) {
            if (!$0a) throw 'newStart is null';
            if (!$0b) throw 'newEnd is null';
            var $0c = {};
            $0c.e = e;
            $0c.newStart = $0a;
            $0c.newEnd = $0b;
            $0c.newResource = $0n;
            this.$3G('EventMove', $0c, $h);
        };
        this.$4E = function(e, $0o, $0f, ev, $0p) {
            if ($c.eventMoveHandling === 'Disabled') {
                return;
            };
            var $J = 0;
            var $0j = Math.floor(($0f - $J) / $c.cellHeight);
            var $0h = $c.cellDuration;
            var $0q = $0j * $0h * 60 * 1000;
            var $08 = e.start();
            var end = e.end();
            var $0i = new Date();
            if ($08.isDayPilotDate) {
                $08 = $08.d;
            };
            $0i.setTime(Date.UTC($08.getUTCFullYear(), $08.getUTCMonth(), $08.getUTCDate()));
            var $0r = ($c.useEventBoxes !== 'Never') ? $08.getTime() - ($0i.getTime() + $08.getUTCHours() * 3600 * 1000 + Math.floor($08.getUTCMinutes() / $0h) * $0h * 60 * 1000) : 0;
            var length = end.getTime() - $08.getTime();
            var $0l = $c.$4n() * 3600 * 1000;
            var $0s = this.columnsBottom[$0o];
            var $0t = $0s.start.getTime();
            var $0u = new Date();
            $0u.setTime($0t + $0q + $0r + $0l);
            var $0a = new DayPilot.Date($0u);
            var $0b = $0a.addTime(length);
            var external = !!$0p;
            var $0n = $0s.id;
            if ($c.$4g()) {
                var $n = {};
                $n.e = e;
                $n.newStart = $0a;
                $n.newEnd = $0b;
                $n.newResource = $0n;
                $n.external = external;
                $n.ctrl = false;
                if (ev) {
                    $n.ctrl = ev.ctrlKey;
                };
                $n.shift = false;
                if (ev) {
                    $n.shift = ev.shiftKey;
                };
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onEventMove === 'function') {
                    $c.onEventMove($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($c.eventMoveHandling) {
                    case 'PostBack':
                        $c.eventMovePostBack(e, $0a, $0b, $0n);
                        break;
                    case 'CallBack':
                        $c.eventMoveCallBack(e, $0a, $0b, $0n);
                        break;
                    case 'Notify':
                        $c.eventMoveNotify(e, $0a, $0b, $0n);
                        break;
                    case 'Update':
                        e.start($0a);
                        e.end($0b);
                        e.resource($0n);
                        $c.events.update(e);
                        break;
                };
                if (typeof $c.onEventMoved === 'function') {
                    $c.onEventMoved($n);
                }
            } else {
                switch ($c.eventMoveHandling) {
                    case 'PostBack':
                        $c.eventMovePostBack(e, $0a, $0b, $0n);
                        break;
                    case 'CallBack':
                        $c.eventMoveCallBack(e, $0a, $0b, $0n);
                        break;
                    case 'JavaScript':
                        $c.onEventMove(e, $0a, $0b, $0n, external, ev ? ev.ctrlKey : false, ev ? ev.shiftKey : false);
                        break;
                    case 'Notify':
                        $c.eventMoveNotify(e, $0a, $0b, $0n, null);
                        break;
                }
            }
        };
        this.eventMoveNotify = function(e, $0a, $0b, $0n, $h) {
            var $0m = new DayPilot.Event(e.copy(), this);
            e.start($0a);
            e.end($0b);
            e.resource($0n);
            e.commit();
            $c.update();
            this.$4F("Notify", $0m, $0a, $0b, $0n, $h);
        };
        this.$4F = function($l, e, $0a, $0b, $0n, $h) {
            var $0c = {};
            $0c.e = e;
            $0c.newStart = $0a;
            $0c.newEnd = $0b;
            $0c.newResource = $0n;
            this.$4B($l, "EventMove", $0c, $h);
        };
        this.$4G = function($n, $y) {
            var $x = $c.$4H($y);
            var $0c = {};
            $0c.args = $n;
            $0c.guid = $x;
            $c.$3G("Bubble", $0c);
        };
        this.$4H = function($y) {
            var $x = DayPilot.guid();
            if (!this.bubbles) {
                this.bubbles = [];
            };
            this.bubbles[$x] = $y;
            return $x;
        };
        this.eventMenuClickPostBack = function(e, $0v, $h) {
            var $0c = {};
            $0c.e = e;
            $0c.command = $0v;
            this.$3E('EventMenuClick', $h, $0c);
        };
        this.eventMenuClickCallBack = function(e, $0v, $h) {
            var $0c = {};
            $0c.e = e;
            $0c.command = $0v;
            this.$3G('EventMenuClick', $0c, $h);
        };
        this.$4I = function($0v, e, $0w) {
            switch ($0w) {
                case 'PostBack':
                    $c.eventMenuClickPostBack(e, $0v);
                    break;
                case 'CallBack':
                    $c.eventMenuClickCallBack(e, $0v);
                    break;
            }
        };
        this.timeRangeMenuClickPostBack = function(e, $0v, $h) {
            var $0c = {};
            $0c.selection = e;
            $0c.command = $0v;
            this.$3E("TimeRangeMenuClick", $h, $0c);
        };
        this.timeRangeMenuClickCallBack = function(e, $0v, $h) {
            var $0c = {};
            $0c.selection = e;
            $0c.command = $0v;
            this.$3G("TimeRangeMenuClick", $0c, $h);
        };
        this.$4J = function($0v, e, $0w) {
            switch ($0w) {
                case 'PostBack':
                    $c.timeRangeMenuClickPostBack(e, $0v);
                    break;
                case 'CallBack':
                    $c.timeRangeMenuClickCallBack(e, $0v);
                    break;
            }
        };
        this.timeRangeSelectedPostBack = function($08, end, $0x, $h) {
            var $0y = {};
            $0y.start = $08;
            $0y.end = end;
            $0y.resource = $0x;
            this.$3E('TimeRangeSelected', $h, $0y);
        };
        this.timeRangeSelectedCallBack = function($08, end, $0x, $h) {
            var $0y = {};
            $0y.start = $08;
            $0y.end = end;
            $0y.resource = $0x;
            this.$3G('TimeRangeSelected', $0y, $h);
        };
        this.$4K = function($08, end, $r) {
            if (!$08.isDayPilotDate) {
                $08 = new DayPilot.Date($08);
            };
            if (!end.isDayPilotDate) {
                end = new DayPilot.Date(end);
            };
            var $0x = $r;
            if ($c.$4g()) {
                var $n = {};
                $n.start = $08;
                $n.end = end;
                $n.resource = $0x;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onTimeRangeSelect === 'function') {
                    $c.onTimeRangeSelect($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($c.timeRangeSelectedHandling) {
                    case 'PostBack':
                        $c.timeRangeSelectedPostBack($08, end, $0x);
                        break;
                    case 'CallBack':
                        $c.timeRangeSelectedCallBack($08, end, $0x);
                        break;
                };
                if (typeof $c.onTimeRangeSelected === 'function') {
                    $c.onTimeRangeSelected($n);
                }
            } else {
                switch ($c.timeRangeSelectedHandling) {
                    case 'PostBack':
                        $c.timeRangeSelectedPostBack($08, end, $r);
                        break;
                    case 'CallBack':
                        $c.timeRangeSelectedCallBack($08, end, $r);
                        break;
                    case 'JavaScript':
                        $c.onTimeRangeSelected($08, end, $r);
                        break;
                }
            }
        };
        this.timeRangeDoubleClickPostBack = function($08, end, $r, $h) {
            var $0y = {};
            $0y.start = $08;
            $0y.end = end;
            $0y.resource = $r;
            this.$3E('TimeRangeDoubleClick', $h, $0y);
        };
        this.timeRangeDoubleClickCallBack = function($08, end, $r, $h) {
            var $0y = {};
            $0y.start = $08;
            $0y.end = end;
            $0y.resource = $r;
            this.$3G('TimeRangeDoubleClick', $0y, $h);
        };
        this.$4L = function($08, end, $r) {
            if ($c.$4g()) {
                var $0x = $r;
                var $n = {};
                $n.start = $08;
                $n.end = end;
                $n.resource = $0x;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onTimeRangeDoubleClick === 'function') {
                    $c.onTimeRangeDoubleClick($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($c.timeRangeDoubleClickHandling) {
                    case 'PostBack':
                        $c.timeRangeDoubleClickPostBack($08, end, $0x);
                        break;
                    case 'CallBack':
                        $c.timeRangeDoubleClickCallBack($08, end, $0x);
                        break;
                };
                if (typeof $c.onTimeRangeDoubleClicked === 'function') {
                    $c.onTimeRangeDoubleClicked($n);
                }
            } else {
                switch ($c.timeRangeDoubleClickHandling) {
                    case 'PostBack':
                        $c.timeRangeDoubleClickPostBack($08, end, $r);
                        break;
                    case 'CallBack':
                        $c.timeRangeDoubleClickCallBack($08, end, $r);
                        break;
                    case 'JavaScript':
                        $c.onTimeRangeDoubleClick($08, end, $r);
                        break;
                }
            }
        };
        this.eventEditPostBack = function(e, $0z, $h) {
            var $0c = {};
            $0c.e = e;
            $0c.newText = $0z;
            this.$3E("EventEdit", $h, $0c);
        };
        this.eventEditCallBack = function(e, $0z, $h) {
            var $0c = {};
            $0c.e = e;
            $0c.newText = $0z;
            this.$3G("EventEdit", $0c, $h);
        };
        this.$4M = function(e, $0z) {
            if ($c.$4g()) {
                var $n = {};
                $n.e = e;
                $n.newText = $0z;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onEventEdit === 'function') {
                    $c.onEventEdit($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($c.eventEditHandling) {
                    case 'PostBack':
                        $c.eventEditPostBack(e, $0z);
                        break;
                    case 'CallBack':
                        $c.eventEditCallBack(e, $0z);
                        break;
                    case 'Update':
                        e.text($0z);
                        $c.events.update(e);
                        break;
                };
                if (typeof $c.onEventEdited === 'function') {
                    $c.onEventEdited($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                }
            } else {
                switch ($c.eventEditHandling) {
                    case 'PostBack':
                        $c.eventEditPostBack(e, $0z);
                        break;
                    case 'CallBack':
                        $c.eventEditCallBack(e, $0z);
                        break;
                    case 'JavaScript':
                        $c.onEventEdit(e, $0z);
                        break;
                }
            }
        };
        this.eventSelectPostBack = function(e, $0A, $h) {
            var $0c = {};
            $0c.e = e;
            $0c.change = $0A;
            this.$3E('EventSelect', $h, $0c);
        };
        this.eventSelectCallBack = function(e, $0A, $h) {
            var $0c = {};
            $0c.e = e;
            $0c.change = $0A;
            this.$3G('EventSelect', $0c, $h);
        };
        this.$4N = function($d, e, $01) {
            if ($c.$4g()) {
                var m = $c.multiselect;
                m.previous = m.events();
                var $n = {};
                $n.e = e;
                $n.selected = m.isSelected(e);
                $n.ctrl = $01;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onEventSelect === 'function') {
                    $c.onEventSelect($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($c.eventSelectHandling) {
                    case 'PostBack':
                        $c.eventSelectPostBack(e, $0A);
                        break;
                    case 'CallBack':
                        if (typeof WebForm_InitCallback !== 'undefined') {
                            __theFormPostData = "";
                            __theFormPostCollection = [];
                            WebForm_InitCallback();
                        };
                        $c.eventSelectCallBack(e, $0A);
                        break;
                    case 'Update':
                        m.$4O($d, $01);
                        break;
                };
                if (typeof $c.onEventSelected === 'function') {
                    $n.change = m.isSelected(e) ? "selected" : "deselected";
                    $n.selected = m.isSelected(e);
                    $c.onEventSelected($n);
                }
            } else {
                var m = $c.multiselect;
                m.previous = m.events();
                m.$4O($d, $01);
                var $0A = m.isSelected(e) ? "selected" : "deselected";
                switch ($c.eventSelectHandling) {
                    case 'PostBack':
                        $c.eventSelectPostBack(e, $0A);
                        break;
                    case 'CallBack':
                        if (typeof WebForm_InitCallback !== 'undefined') {
                            __theFormPostData = "";
                            __theFormPostCollection = [];
                            WebForm_InitCallback();
                        };
                        $c.eventSelectCallBack(e, $0A);
                        break;
                    case 'JavaScript':
                        $c.onEventSelect(e, $0A);
                        break;
                }
            }
        };
        this.commandCallBack = function($0v, $h) {
            this.$3L();
            var $0c = {};
            $0c.command = $0v;
            this.$3G('Command', $0c, $h);
        };
        this.$4P = function(ev) {
            clearTimeout(DayPilotCalendar.selectedTimeout);
            if (DayPilotCalendar.selecting) {
                return;
            };
            if (DayPilotCalendar.editing) {
                DayPilotCalendar.editing.blur();
                return;
            };
            if ($c.selectedCells && $c.timeRangeDoubleClickHandling !== 'Disabled') {
                for (var i = 0; i < $c.selectedCells.length; i++) {
                    if (this === $c.selectedCells[i]) {
                        return;
                    }
                }
            };
            if ($c.timeRangeSelectedHandling === "Disabled") {
                return;
            };
            var $0B = (window.event) ? window.event.button : ev.which;
            if ($0B !== 1 && $0B !== 0) {
                return;
            };
            DayPilotCalendar.firstMousePos = DayPilot.mc(ev || window.event);
            $c.clearSelection();
            DayPilotCalendar.topSelectedCell = this;
            DayPilotCalendar.bottomSelectedCell = this;
            DayPilotCalendar.column = DayPilotCalendar.getColumn(this);
            $c.selectedCells.push(this);
            DayPilotCalendar.firstSelected = this;
        };
        this.$4Q = function() {
            if (!this.selectedCells) {
                return;
            };
            var $0C = this.getSelection();
            if (!$0C) {
                return;
            };
            for (var j = 0; j < $c.selectedCells.length; j++) {
                var $f = $c.selectedCells[j];
                if ($f && !$f.selected) {
                    var $d = document.createElement("div");
                    $d.style.height = ($c.cellHeight - 1) + "px";
                    $d.style.backgroundColor = $c.selectedColor;
                    $f.firstChild.style.display = "none";
                    $f.insertBefore($d, $f.firstChild);
                    $f.selected = $d;
                }
            }
        };
        this.$4R = function(ev) {
            if (typeof(DayPilotBubble) !== 'undefined' && $c.cellBubble) {
                $c.cellBubble.hideOnMouseOut();
            }
        };
        this.$4S = function(ev) {
            if (typeof(DayPilotCalendar) === 'undefined') {
                return;
            };
            if (typeof(DayPilotBubble) !== 'undefined' && $c.cellBubble) {
                var $r = DayPilotCalendar.getColumn(this);
                var $06 = $c.columnsBottom[$r].id;
                var $f = {};
                $f.calendar = $c;
                $f.start = this.start;
                $f.end = this.end;
                $f.resource = $06;
                $f.toJSON = function() {
                    var $07 = {};
                    $07.start = this.start;
                    $07.end = this.end;
                    $07.resource = this.resource;
                    return $07;
                };
                $c.cellBubble.showCell($f);
            };
            if (DayPilotCalendar.firstMousePos) {
                var $0D = DayPilotCalendar.firstMousePos;
                var $0E = DayPilot.mc(ev || window.event);
                if ($0D.x !== $0E.x || $0D.y !== $0E.y) {
                    DayPilotCalendar.selecting = true;
                    $c.clearSelection();
                    $c.$4Q();
                }
            };
            if (!DayPilotCalendar.selecting) {
                return;
            };
            var $0F = DayPilot.mc(ev || window.event);
            var $0G = DayPilotCalendar.getColumn(this);
            if ($0G !== DayPilotCalendar.column) {
                return;
            };
            $c.clearSelection();
            if ($0F.y < DayPilotCalendar.firstMousePos.y) {
                $c.selectedCells = DayPilotCalendar.getCellsBelow(this);
                DayPilotCalendar.topSelectedCell = $c.selectedCells[0];
                DayPilotCalendar.bottomSelectedCell = DayPilotCalendar.firstSelected;
            } else {
                $c.selectedCells = DayPilotCalendar.getCellsAbove(this);
                DayPilotCalendar.topSelectedCell = DayPilotCalendar.firstSelected;
                DayPilotCalendar.bottomSelectedCell = $c.selectedCells[0];
            };
            $c.$4Q();
        };
        this.getSelection = function() {
            if (!DayPilotCalendar.topSelectedCell) {
                return null;
            };
            if (!DayPilotCalendar.bottomSelectedCell) {
                return null;
            };
            var $08 = DayPilotCalendar.topSelectedCell.start;
            var end = DayPilotCalendar.bottomSelectedCell.end;
            var $0H = DayPilotCalendar.topSelectedCell.resource;
            return new DayPilot.Selection($08, end, $0H, $c);
        };
        this.$4T = function(ev) {
            if (DayPilotCalendar.firstMousePos) {
                var $0I = function() {
                    DayPilotCalendar.selecting = true;
                    $c.$4Q();
                    DayPilotCalendar.firstMousePos = null;
                    DayPilotCalendar.selecting = false;
                    var $0J = $c.getSelection();
                    $c.$4K($0J.start, $0J.end, $0J.resource);
                };
                if (DayPilotCalendar.selecting && DayPilotCalendar.topSelectedCell !== null) {
                    $0I();
                } else {
                    DayPilotCalendar.selectedTimeout = setTimeout($0I, 100);
                }
            } else {
                DayPilotCalendar.selecting = false;
            }
        };
        this.$4U = function(ev) {
            if (!$c.initScrollPos) {
                return;
            };
            $c.scrollPos = $c.nav.scroll.scrollTop;
            $c.scrollHeight = $c.nav.scroll.clientHeight;
            $c.nav.scrollpos.value = $c.scrollPos;
            $c.$4e();
        };
        this.$4e = function() {
            if (!this.scrollLabelsVisible) {
                return;
            };
            if (!this.scrollLabels) {
                return;
            };
            var $0K = this.columnsBottom;
            var $0L = (this.showHours ? this.hourWidth : 0);
            var $I = this.nav.main.rows[0].cells[0].clientWidth;
            var iw = 10;
            var $0M = 1;
            for (var i = 0; i < $0K.length; i++) {
                var $0N = this.nav.scrollUp[i];
                var $0O = this.nav.scrollDown[i];
                $0N.style.left = ($0L + i * $I + $I / 2 - (iw / 2) + $0M) + "px";
                $0O.style.left = ($0L + i * $I + $I / 2 - (iw / 2) + $0M) + "px";
            };
            var $0P = this.$4V();
            for (var i = 0; i < this.nav.scrollUp.length; i++) {
                var up = this.nav.scrollUp[i];
                var $0Q = this.nav.scrollDown[i];
                var $0R = this.scrollLabels[i].minEnd - $0P;
                var $0S = this.scrollLabels[i].maxStart - $0P;
                if (up && $0Q) {
                    if ($0R <= $c.scrollPos) {
                        up.style.top = (this.$4o() + 2) + "px";
                        up.style.display = '';
                    } else {
                        up.style.display = 'none';
                    };
                    if ($0S >= $c.scrollPos + $c.scrollHeight) {
                        $0Q.style.top = (this.$4o() + this.scrollHeight - 8) + "px";
                        $0Q.style.display = '';
                    } else {
                        $0Q.style.display = 'none';
                    }
                }
            }
        };
        this.$4W = function($F) {
            var $0T = $F.parentNode;
            while ($0T && $0T.tagName !== "TD") {
                $0T = $0T.parentNode;
            };
            var $0U = document.createElement('textarea');
            $0U.style.position = 'absolute';
            $0U.style.width = ($F.parentNode.offsetWidth - 2) + 'px';
            $0U.style.height = ($F.offsetHeight - 2) + 'px';
            var $0V = DayPilot.gs($F, 'fontFamily');
            if (!$0V) $0V = DayPilot.gs($F, 'font-family');
            $0U.style.fontFamily = $0V;
            var $0W = DayPilot.gs($F, 'fontSize');
            if (!$0W) $0W = DayPilot.gs($F, 'font-size');
            $0U.style.fontSize = $0W;
            $0U.style.left = '0px';
            $0U.style.top = $F.offsetTop + 'px';
            $0U.style.border = '1px solid black';
            $0U.style.padding = '0px';
            $0U.style.marginTop = '0px';
            $0U.style.backgroundColor = 'white';
            $0U.value = DayPilot.tr($F.event.text());
            $0U.event = $F.event;
            $0T.firstChild.appendChild($0U);
            return $0U;
        };
        this.$4u = function($d, e, $01) {
            $c.$4N($d, e, $01);
        };
        this.multiselect = {};
        this.multiselect.$3Y = [];
        this.multiselect.$4X = [];
        this.multiselect.$4Y = [];
        this.multiselect.$4Z = [];
        this.multiselect.$50 = function() {
            var m = $c.multiselect;
            return DayPilot.JSON.stringify(m.events());
        };
        this.multiselect.events = function() {
            var m = $c.multiselect;
            var $0X = [];
            $0X.ignoreToJSON = true;
            for (var i = 0; i < m.$4X.length; i++) {
                $0X.push(m.$4X[i]);
            };
            return $0X;
        };
        this.multiselect.$51 = function() {
            var h = $c.nav.select;
            h.value = $c.multiselect.$50();
        };
        this.multiselect.$4O = function($d, $0Y) {
            var m = $c.multiselect;
            if (m.isSelected($d.event)) {
                if ($c.allowMultiSelect) {
                    if ($0Y) {
                        m.remove($d.event, true);
                    } else {
                        var $0Z = m.$4X.length;
                        m.clear(true);
                        if ($0Z > 1) {
                            m.add($d.event, true);
                        }
                    }
                } else {
                    m.clear(true);
                }
            } else {
                if ($c.allowMultiSelect) {
                    if ($0Y) {
                        m.add($d.event, true);
                    } else {
                        m.clear(true);
                        m.add($d.event, true);
                    }
                } else {
                    m.clear(true);
                    m.add($d.event, true);
                }
            };
            m.redraw();
            m.$51();
        };
        this.multiselect.$52 = function(ev) {
            var m = $c.multiselect;
            return m.$53(ev, m.$3Y);
        };
        this.multiselect.$54 = function() {
            var m = $c.multiselect;
            var $10 = [];
            for (var i = 0; i < m.$4X.length; i++) {
                var event = m.$4X[i];
                $10.push(event.value());
            };
            alert($10.join("\n"));
        };
        this.multiselect.add = function(ev, $11) {
            var m = $c.multiselect;
            if (m.$55(ev) === -1) {
                m.$4X.push(ev);
            };
            m.$51();
            if ($11) {
                return;
            };
            m.redraw();
        };
        this.multiselect.remove = function(ev, $11) {
            var m = $c.multiselect;
            var i = m.$55(ev);
            if (i !== -1) {
                m.$4X.splice(i, 1);
            };
            m.$51();
            if ($11) {
                return;
            };
            m.redraw();
        };
        this.multiselect.clear = function($11) {
            var m = $c.multiselect;
            m.$4X = [];
            m.$51();
            if ($11) {
                return;
            };
            m.redraw();
        };
        this.multiselect.redraw = function() {
            var m = $c.multiselect;
            for (var i = 0; i < $c.elements.events.length; i++) {
                var $d = $c.elements.events[i];
                if (m.isSelected($d.event)) {
                    m.$56($d);
                } else {
                    m.$57($d);
                }
            }
        };
        this.multiselect.$56 = function($d) {
            var m = $c.multiselect;
            var cn = $c.cssOnly ? $c.$4i("_selected") : $c.$4i("selected");
            var c = m.$58($d);
            DayPilot.Util.addClass(c, cn);
            if ($c.useEventSelectionBars) {
                m.$59($d);
            };
            m.$4Y.push($d);
        };
        this.multiselect.$58 = function($d) {
            if ($c.cssOnly) {
                return $d;
            };
            for (var i = 0; i < $d.childNodes.length; i++) {
                var c = $d.childNodes[i];
                if (c.getAttribute("c") === "1") {
                    return c;
                }
            };
            return null;
        };
        this.multiselect.$5a = function() {
            var m = $c.multiselect;
            for (var i = 0; i < m.$4Y.length; i++) {
                var $d = m.$4Y[i];
                m.$57($d, true);
            };
            m.$4Y = [];
        };
        this.multiselect.$57 = function($d, $12) {
            var m = $c.multiselect;
            var cn = $c.cssOnly ? $c.$4i("_selected") : $c.$4i("selected");
            var c = m.$58($d);
            DayPilot.Util.removeClass(c, cn);
            if ($c.useEventSelectionBars) {
                m.$5b($d);
            };
            if ($12) {
                return;
            };
            var i = DayPilot.indexOf(m.$4Y, $d);
            if (i !== -1) {
                m.$4Y.splice(i, 1);
            }
        };
        this.multiselect.isSelected = function(ev) {
            return $c.multiselect.$53(ev, $c.multiselect.$4X);
        };
        this.multiselect.$55 = function(ev) {
            return DayPilot.indexOf($c.multiselect.$4X, ev);
        };
        this.multiselect.$53 = function(e, $10) {
            if (!$10) {
                return false;
            };
            for (var i = 0; i < $10.length; i++) {
                var ei = $10[i];
                if (e === ei) {
                    return true;
                };
                if (typeof ei.value === 'function') {
                    if (ei.value() !== null && e.value() !== null && ei.value() === e.value()) {
                        return true;
                    };
                    if (ei.value() === null && e.value() === null && ei.recurrentMasterId() === e.recurrentMasterId() && e.start().toStringSortable() === ei.start()) {
                        return true;
                    }
                } else {
                    if (ei.value !== null && e.value() !== null && ei.value === e.value()) {
                        return true;
                    };
                    if (ei.value === null && e.value() === null && ei.recurrentMasterId === e.recurrentMasterId() && e.start().toStringSortable() === ei.start) {
                        return true;
                    }
                }
            };
            return false;
        };
        this.multiselect.$59 = function($13) {
            var w = 5;
            if (!$13.top) {
                var top = document.createElement("div");
                top.setAttribute("unselectable", "on");
                top.style.position = 'absolute';
                top.style.left = $13.offsetLeft + 'px';
                top.style.width = $13.offsetWidth + 'px';
                top.style.top = ($13.offsetTop - w) + 'px';
                top.style.height = w + 'px';
                top.style.backgroundColor = $c.eventSelectColor;
                top.style.zIndex = 100;
                $13.parentNode.appendChild(top);
                $13.top = top;
            };
            if (!$13.bottom) {
                var $14 = document.createElement("div");
                $14.setAttribute("unselectable", "on");
                $14.style.position = 'absolute';
                $14.style.left = $13.offsetLeft + 'px';
                $14.style.width = $13.offsetWidth + 'px';
                $14.style.top = ($13.offsetTop + $13.offsetHeight) + 'px';
                $14.style.height = w + 'px';
                $14.style.backgroundColor = $c.eventSelectColor;
                $14.style.zIndex = 100;
                $13.parentNode.appendChild($14);
                $13.bottom = $14;
            }
        };
        this.multiselect.$5b = function($13) {
            if ($13.top) {
                $13.parentNode.removeChild($13.top);
                $13.top = null;
            };
            if ($13.bottom) {
                $13.parentNode.removeChild($13.bottom);
                $13.bottom = null;
            }
        };
        this.$4t = function($F) {
            if (DayPilotCalendar.editing) {
                DayPilotCalendar.editing.blur();
                return;
            };
            var $0U = this.$4W($F);
            DayPilotCalendar.editing = $0U;
            $0U.onblur = function() {
                var id = $F.event.value();
                var $15 = $F.event.tag();
                var $16 = $F.event.text();
                var $0z = $0U.value;
                DayPilotCalendar.editing = null;
                $0U.parentNode.removeChild($0U);
                if ($16 === $0z) {
                    return;
                };
                $F.style.display = 'none';
                $c.$4M($F.event, $0z);
            };
            $0U.onkeypress = function(e) {
                var $17 = (window.event) ? event.keyCode : e.keyCode;
                if ($17 === 13) {
                    this.onblur();
                    return false;
                } else if ($17 === 27) {
                    $0U.parentNode.removeChild($0U);
                    DayPilotCalendar.editing = false;
                };
                return true;
            };
            $0U.select();
            $0U.focus();
        };
        this.$3Z = function() {
            if (!this.columns) {
                this.columnsBottom = this.$5c();
                this.$5d(this.columnsBottom);
            } else {
                this.$5d(this.columns);
                this.columnsBottom = this.$5e(this.headerLevels, true);
            }
        };
        this.$5f = function() {
            var $08 = this.startDate.getDatePart();
            var $18 = this.days;
            switch (this.viewType) {
                case "Day":
                    $18 = 1;
                    break;
                case "Week":
                    $18 = 7;
                    $08 = $08.firstDayOfWeek($0d.locale().weekStarts);
                    break;
                case "WorkWeek":
                    $18 = 5;
                    $08 = $08.firstDayOfWeek(1);
                    break;
            };
            var end = $08.addDays($18);
            var $v = {};
            $v.start = $08;
            $v.end = end;
            $v.days = $18;
            return $v;
        };
        this.$5c = function() {
            var $0K = [];
            var $19 = this.$5f();
            var $08 = $19.start;
            var $18 = $19.days;
            if (this.heightSpec === 'BusinessHoursNoScroll') {
                $08 = $08.addHours(this.businessBeginsHour);
            };
            for (var i = 0; i < $18; i++) {
                var $r = {};
                $r.start = $08.addDays(i);
                $r.name = $r.start.toString($0d.locale().datePattern);
                $r.html = $r.name;
                $0K.push($r);
            };
            return $0K;
        };
        this.$5g = function($r) {
            if ($r.Start) {
                $r.id = $r.Value;
                $r.start = $r.Start;
                $r.name = $r.Name;
                $r.html = $r.InnerHTML;
                $r.toolTip = $r.ToolTip;
                $r.backColor = $r.BackColor;
                $r.areas = $r.Areas;
                $r.children = $r.Children;
                delete $r.Value;
                delete $r.Start;
                delete $r.Name;
                delete $r.InnerHTML;
                delete $r.ToolTip;
                delete $r.BackColor;
                delete $r.Areas;
                delete $r.Children;
            };
            $r.start = $r.start || $c.startDate;
            $r.start = new DayPilot.Date($r.start);
            $r.html = $r.html || $r.name;
            $r.getChildren = function($1a, $1b) {
                var $10 = [];
                if ($1a <= 1) {
                    $10.push(this);
                    return $10;
                };
                if (!this.children || this.children.length === 0) {
                    if ($1b) {
                        $10.push(this);
                    } else {
                        $10.push("empty");
                    };
                    return $10;
                };
                for (var i = 0; i < this.children.length; i++) {
                    var $1c = this.children[i];
                    var $1d = $1c.getChildren($1a - 1, $1b);
                    for (var j = 0; j < $1d.length; j++) {
                        $10.push($1d[j]);
                    }
                };
                return $10;
            };
            $r.getChildrenCount = function($1a) {
                var $0Z = 0;
                if (!this.children || this.children.length <= 0 || $1a <= 1) {
                    return 1;
                };
                for (var i = 0; i < this.children.length; i++) {
                    $0Z += this.children[i].getChildrenCount($1a - 1);
                };
                return $0Z;
            };
            $r.putIntoBlock = function(ep) {
                for (var i = 0; i < this.blocks.length; i++) {
                    var $1e = this.blocks[i];
                    if ($1e.overlapsWith(ep.part.top, ep.part.height)) {
                        $1e.events.push(ep);
                        $1e.min = Math.min($1e.min, ep.part.top);
                        $1e.max = Math.max($1e.max, ep.part.top + ep.part.height);
                        return i;
                    }
                };
                var $1e = [];
                $1e.lines = [];
                $1e.events = [];
                $1e.overlapsWith = function($08, $1f) {
                    var end = $08 + $1f - 1;
                    if (!(end < this.min || $08 > this.max - 1)) {
                        return true;
                    };
                    return false;
                };
                $1e.putIntoLine = function(ep) {
                    var $1g = this;
                    for (var i = 0; i < this.lines.length; i++) {
                        var $1h = this.lines[i];
                        if ($1h.isFree(ep.part.top, ep.part.height)) {
                            $1h.push(ep);
                            return i;
                        }
                    };
                    var $1h = [];
                    $1h.isFree = function($08, $1f) {
                        var end = $08 + $1f - 1;
                        var $O = this.length;
                        for (var i = 0; i < $O; i++) {
                            var e = this[i];
                            if (!(end < e.part.top || $08 > e.part.top + e.part.height - 1)) {
                                return false;
                            }
                        };
                        return true;
                    };
                    $1h.push(ep);
                    this.lines.push($1h);
                    return this.lines.length - 1;
                };
                $1e.events.push(ep);
                $1e.min = ep.part.top;
                $1e.max = ep.part.top + ep.part.height;
                this.blocks.push($1e);
                return this.blocks.length - 1;
            };
            $r.putIntoLine = function(ep) {
                var $1g = this;
                for (var i = 0; i < this.lines.length; i++) {
                    var $1h = this.lines[i];
                    if ($1h.isFree(ep.part.top, ep.part.height)) {
                        $1h.push(ep);
                        return i;
                    }
                };
                var $1h = [];
                $1h.isFree = function($08, $1f) {
                    var end = $08 + $1f - 1;
                    var $O = this.length;
                    for (var i = 0; i < $O; i++) {
                        var e = this[i];
                        if (!(end < e.part.top || $08 > e.part.top + e.part.height - 1)) {
                            return false;
                        }
                    };
                    return true;
                };
                $1h.push(ep);
                this.lines.push($1h);
                return this.lines.length - 1;
            };
            if ($r.children) {
                this.$5d($r.children);
            }
        };
        this.$5d = function(cc) {
            for (var i = 0; i < cc.length; i++) {
                this.$5g(cc[i]);
            }
        };
        this.$5e = function($1a, $1b) {
            var $1i = this.columns || this.columnsBottom;
            var $10 = [];
            for (var i = 0; i < $1i.length; i++) {
                var $u = $1i[i].getChildren($1a, $1b);
                for (var j = 0; j < $u.length; j++) {
                    $10.push($u[j]);
                }
            };
            return $10;
        };
        this.$4d = function() {
            if (!this.showAllDayEvents) {
                return;
            };
            var $1j = this.nav.header;
            if (!$1j) {
                return;
            };
            $1j.style.display = 'none';
            var $0K = this.columnsBottom.length;
            for (var j = 0; j < this.allDay.lines.length; j++) {
                var $1h = this.allDay.lines[j];
                for (var i = 0; i < $1h.length; i++) {
                    var $h = $1h[i];
                    var $d = document.createElement("div");
                    $d.event = $h;
                    $d.setAttribute("unselectable", "on");
                    $d.style.position = 'absolute';
                    if ($c.rtl) {
                        $d.style.right = (100.0 * $h.part.colStart / $0K) + "%";
                    } else {
                        $d.style.left = (100.0 * $h.part.colStart / $0K) + "%";
                    };
                    $d.style.width = (100.0 * $h.part.colWidth / $0K) + "%";
                    $d.style.height = $0d.allDayEventHeight() + 'px';
                    if (!this.cssOnly) {
                        $d.style.top = (3 + this.headerLevels * $0d.headerHeight() + j * ($0d.allDayEventHeight() + 2)) + "px";
                    } else {
                        $d.className = this.$4i("_alldayevent");
                        $d.style.top = (this.headerLevels * $0d.headerHeight() + j * ($0d.allDayEventHeight())) + "px";
                    };
                    $d.style.textAlign = 'left';
                    $d.style.lineHeight = "1.2";
                    if ($h.client.clickEnabled()) {
                        $d.onclick = this.$4r;
                    };
                    if ($h.client.doubleClickEnabled()) {
                        $d.ondblclick = this.$4v;
                    };
                    $d.oncontextmenu = this.$4w;
                    $d.onmousemove = function(ev) {
                        var $d = this;
                        if (!$d.active) {
                            if ($c.cssOnly) {
                                DayPilot.Util.addClass($d, $c.$4i("_alldayevent_hover"));
                            };
                            DayPilot.Areas.showAreas($d, this.event);
                        };
                        if (typeof(DayPilotBubble) !== 'undefined' && $c.bubble && $c.eventHoverHandling !== 'Disabled') {
                            $c.bubble.showEvent(this.event);
                        }
                    };
                    $d.onmouseout = function(ev) {
                        var $d = this;
                        if ($c.cssOnly) {
                            DayPilot.Util.removeClass($d, $c.$4i("_alldayevent_hover"));
                        };
                        DayPilot.Areas.hideAreas(this, ev);
                        if ($c.bubble) {
                            $c.bubble.hideOnMouseOut();
                        }
                    };
                    if (this.showToolTip && !this.bubble) {
                        $d.title = $h.client.toolTip();
                    };
                    var $1k = $h.start().getTime() === $h.part.start.getTime();
                    var $1l = $h.end().getTime() === $h.part.end.getTime();
                    var back = $h.data.backColor;
                    if (!this.cssOnly) {
                        var $N = document.createElement("div");
                        $N.setAttribute("unselectable", "on");
                        $N.style.marginLeft = '2px';
                        $N.style.marginRight = '3px';
                        $N.style.paddingLeft = '2px';
                        $N.style.height = ($0d.allDayEventHeight() - 2) + 'px';
                        $N.style.border = '1px solid ' + this.allDayEventBorderColor;
                        $N.style.overflow = 'hidden';
                        $N.style.position = 'relative';
                        $N.style.backgroundColor = back;
                        $N.className = this.$4i("alldayevent");
                        if (this.roundedCorners) {
                            $N.style.MozBorderRadius = "5px";
                            $N.style.webkitBorderRadius = "5px";
                            $N.style.borderRadius = "5px";
                        };
                        var $1m = [];
                        var $1n = true;
                        var $1o = this.showAllDayEventStartEnd;
                        var $1p = this.showAllDayEventStartEnd;
                        var $1q = "Center";
                        var $1r = 0;
                        if ($1o) {
                            if ($1q === 'Left') {
                                $1m.push("<div unselectable='on' style='position:absolute;text-align:left;height:1px;font-size:1px;width:100%'><div unselectable='on' style='font-size:8pt;color:gray;text-align:right;");
                                $1m.push("width:");
                                $1m.push($1r - 4);
                                $1m.push("px;");
                                $1m.push("><span style='background-color:");
                            } else {
                                $1m.push("<div unselectable='on' style='position:absolute;text-align:left;height:1px;font-size:1px;width:100%'><div unselectable='on' style='font-size:8pt;color:gray'><span style='background-color:");
                            };
                            $1m.push('transparent');
                            $1m.push("' unselectable='on'>");
                            if ($1k) {
                                if ($h.start().getDatePart().getTime() !== $h.start().getTime()) {
                                    $1m.push(DayPilot.Date.hours($h.start().d, this.$5h.timeFormat() === 'Clock12Hours'));
                                }
                            } else {
                                $1m.push("~");
                            };
                            $1m.push("</span></div></div>");
                        };
                        if ($1p) {
                            $1m.push("<div unselectable='on' style='position:absolute;text-align:right;height:1px;font-size:1px;width:100%'><div unselectable='on' style='margin-right:4px;font-size:8pt;color:gray'><span style='background-color:");
                            $1m.push('transparent');
                            $1m.push("' unselectable='on'>");
                            if ($1l) {
                                if ($h.end().getDatePart().getTime() !== $h.end().getTime()) {
                                    $1m.push(DayPilot.Date.hours($h.end().d, this.$5h.timeFormat() === 'Clock12Hours'));
                                }
                            } else {
                                $1m.push("~");
                            };
                            $1m.push("</span></div></div>");
                        };
                        if ($1q === 'Left') {
                            var $X = $1o ? $1r : 0;
                            $1m.push("<div style='margin-top:0px;height:");
                            $1m.push($0d.allDayEventHeight() - 2);
                            $1m.push("px;");
                            $1m.push(";overflow:hidden;text-align:left;padding-left:");
                            $1m.push($X);
                            $1m.push("px;font-size:");
                            $1m.push(this.allDayEventFontSize);
                            $1m.push(";color:");
                            $1m.push(this.allDayEventFontColor);
                            $1m.push(";font-family:");
                            $1m.push(this.eventFontFamily);
                            $1m.push("' unselectable='on'>");
                            if ($h.client.innerHTML()) {
                                $1m.push($h.client.innerHTML());
                            } else {
                                $1m.push($h.text());
                            };
                            $1m.push("</div>");
                        } else if ($1q === 'Center') {
                            if ($1n) {
                                $1m.push("<div style='position:absolute; text-align:center; width: 98%; height:1px;'>");
                                $1m.push("<span style='background-color:");
                                $1m.push('transparent');
                                $1m.push(";font-size:");
                                $1m.push(this.allDayEventFontSize);
                                $1m.push(";color:");
                                $1m.push(this.allDayEventFontColor);
                                $1m.push(";font-family:");
                                $1m.push(this.allDayEventFontFamily);
                                $1m.push("' unselectable='on'>");
                                if ($h.client.innerHTML()) {
                                    $1m.push($h.client.innerHTML());
                                } else {
                                    $1m.push($h.text());
                                };
                                $1m.push("</span>");
                                $1m.push("</div>");
                            } else {
                                $1m.push("<div style='margin-top:0px;height:");
                                $1m.push($0d.allDayEventHeight() - 2);
                                $1m.push("px;");
                                $1m.push(";overflow:hidden;text-align:center;font-size:");
                                $1m.push(this.allDayEventFontSize);
                                $1m.push(";color:");
                                $1m.push(this.allDayEventFontColor);
                                $1m.push(";font-family:");
                                $1m.push(this.allDayEventFontFamily);
                                $1m.push("' unselectable='on'>");
                                if ($h.client.innerHTML()) {
                                    $1m.push($h.client.innerHTML());
                                } else {
                                    $1m.push($h.text());
                                };
                                $1m.push("</div>");
                            }
                        };
                        $N.innerHTML = $1m.join('');
                        $d.appendChild($N);
                    } else {
                        var $N = document.createElement("div");
                        $N.setAttribute("unselectable", "on");
                        $N.className = this.$4i("_alldayevent_inner");
                        if (back) {
                            $N.style.background = back;
                        };
                        if ($c.rtl) {
                            if (!$1k) {
                                DayPilot.Util.addClass($d, this.$4i("_alldayevent_continueright"));
                            };
                            if (!$1l) {
                                DayPilot.Util.addClass($d, this.$4i("_alldayevent_continueleft"));
                            }
                        } else {
                            if (!$1k) {
                                DayPilot.Util.addClass($d, this.$4i("_alldayevent_continueleft"));
                            };
                            if (!$1l) {
                                DayPilot.Util.addClass($d, this.$4i("_alldayevent_continueright"));
                            }
                        };
                        if ($h.client.innerHTML()) {
                            $N.innerHTML = $h.client.innerHTML();
                        } else {
                            $N.innerHTML = $h.text();
                        };
                        $d.appendChild($N);
                    };
                    if ($c.$4g()) {
                        if (typeof $c.onAfterEventRender === 'function') {
                            var $n = {};
                            $n.e = $d.event;
                            $n.div = $d;
                            $c.onAfterEventRender($n);
                        }
                    } else {
                        if ($c.afterEventRender) {
                            $c.afterEventRender($d.event, $d);
                        }
                    };
                    this.nav.allday.appendChild($d);
                    this.elements.events.push($d);
                }
            };
            $1j.style.display = '';
        };
        this.$3M = function($1s) {
            $c.multiselect.$5a();
            if (this.elements.events) {
                for (var i = 0; i < this.elements.events.length; i++) {
                    var $d = this.elements.events[i];
                    var $F = $d.event;
                    if ($F && $1s && !$F.allday()) {
                        continue;
                    };
                    if ($F) {
                        $F.div = null;
                        $F.root = null;
                    };
                    $d.onclick = null;
                    $d.onclickSave = null;
                    $d.ondblclick = null;
                    $d.oncontextmenu = null;
                    $d.onmouseover = null;
                    $d.onmouseout = null;
                    $d.onmousemove = null;
                    $d.onmousedown = null;
                    if ($d.firstChild && $d.firstChild.firstChild && $d.firstChild.firstChild.tagName && $d.firstChild.firstChild.tagName.toUpperCase() === 'IMG') {
                        var $1t = $d.firstChild.firstChild;
                        $1t.onmousedown = null;
                        $1t.onmousemove = null;
                        $1t.onclick = null;
                    };
                    $d.helper = null;
                    $d.event = null;
                    DayPilot.de($d);
                }
            };
            this.elements.events = [];
        };
        this.$5i = function($h) {
            var $H = this.nav.events;
            var $1u = this.roundedCorners;
            var $1v = this.roundedCorners && (this.$3C.ff || this.$3C.opera105 || this.$3C.webkit522 || !this.$3C.ielt9);
            var $1w = this.roundedCorners && !$1v;
            var $1x = $h.cache || $h.data;
            var $1y = $1x.borderColor || this.eventBorderColor;
            var $d = document.createElement("div");
            $d.setAttribute("unselectable", "on");
            $d.style.MozUserSelect = 'none';
            $d.style.KhtmlUserSelect = 'none';
            $d.style.WebkitUserSelect = 'none';
            $d.style.position = 'absolute';
            if (!this.cssOnly) {
                $d.style.fontFamily = this.eventFontFamily;
                $d.style.fontSize = this.eventFontSize;
                $d.style.color = $1x.fontColor || this.eventFontColor;
                if (!$1u) {
                    $d.style.backgroundColor = $1y;
                };
                if (this.transparent) {
                    $d.style.opacity = 0.6;
                    $d.style.filter = "alpha(opacity=60)";
                }
            } else {
                $d.className = this.$4i("_event");
            };
            $d.style.left = $h.part.left + '%';
            $d.style.top = ($h.part.top - this.$4V()) + 'px';
            $d.style.width = $h.part.width + '%';
            $d.style.height = Math.max($h.part.height, 2) + 'px';
            $d.style.overflow = 'hidden';
            $d.isFirst = $h.part.start.getTime() === $h.start().getTime();
            $d.isLast = $h.part.end.getTime() === $h.end().getTime();
            if ($h.client.clickEnabled()) {
                $d.onclick = this.$4r;
            };
            if ($h.client.doubleClickEnabled()) {
                $d.ondblclick = this.$4v;
            };
            $d.oncontextmenu = this.$4w;
            $d.onmousemove = this.$5j;
            $d.onmouseout = this.$5k;
            $d.onmousedown = this.$5l;
            $d.ontouchstart = this.$5m.onEventTouchStart;
            $d.ontouchmove = this.$5m.onEventTouchMove;
            $d.ontouchend = this.$5m.onEventTouchEnd;
            var $1m = [];
            if (!this.cssOnly) {
                if (this.eventDeleteHandling !== 'Disabled' && $h.client.deleteEnabled()) {
                    $1m.push("<div unselectable='on' style='position:absolute; width:100%;text-align:right;'><div style='position:absolute; width:10px; height:10px; right:2px; top: 2px; cursor:pointer;");
                    if (this.deleteImageUrl) {
                        $1m.push("background-image:url(\"" + this.deleteImageUrl + "\");");
                    };
                    $1m.push("' class='");
                    $1m.push(this.$4i("event_delete"));
                    $1m.push("' onmousemove=\"if(typeof(DayPilotBubble)!=='undefined'&&");
                    $1m.push(this.clientName);
                    $1m.push(".bubble && ");
                    $1m.push(this.clientName);
                    $1m.push(".bubble.hideAfter > 0");
                    $1m.push(") { DayPilotBubble.hideActive(); event.cancelBubble = true; };\" onmousedown=\"this.parentNode.parentNode.style.cursor='default';\" onclick='");
                    $1m.push(this.clientName);
                    $1m.push(".internal.eventDeleteDispatch(this); event.cancelBubble = true; if (event.stopPropagation) event.stopPropagation();' ></div></div>");
                };
                if ($1w) {
                    $1m.push("<div style='margin-right:2px;'>");
                    $1m.push("<div style='height:1px;line-height:1px;font-size:0px; margin-left:2px; background-color:");
                    $1m.push($1y);
                    $1m.push(";'>&nbsp;</div>");
                    $1m.push("</div>");
                    $1m.push("<div unselectable='on' style='position:absolute;width:100%;margin-top:-1px;'>");
                    $1m.push("<div style='height:1px;line-height:1px;font-size:0px;margin-left:1px;margin-top:1px; margin-right:1px;border-right:1px solid ");
                    $1m.push($1y);
                    $1m.push(";border-left:1px solid ");
                    $1m.push($1y);
                    $1m.push(";background-color:");
                    $1m.push($h.client.header() ? $1y : $h.BackgroundColor);
                    $1m.push("'>");
                    $1m.push("&nbsp;</div>");
                    $1m.push("</div>");
                } else if (!$1v) {
                    $1m.push("<div style='height:1px;line-height:1px;font-size:0px; width:1px;'>&nbsp;</div>");
                };
                $1m.push("<div");
                if (this.showToolTip && !this.bubble) {
                    $1m.push(" title='");
                    $1m.push($h.client.toolTip().replace(/'/g, "&apos;"));
                    $1m.push("'");
                };
                var $L = Math.max($h.part.height - 2, 0);
                $1m.push(" c='1'");
                $1m.push(" class='");
                $1m.push($1x.cssClass || this.$4i('event'));
                $1m.push("'");
                if ($1w) {
                    $1m.push(" style='margin-top:1px;height:");
                    $1m.push($L - 2);
                } else {
                    $1m.push(" style='margin-top:0px;height:");
                    $1m.push($L);
                };
                $1m.push("px;background-color:");
                $1m.push($h.client.backColor());
                if ($1v) {
                    $1m.push(";border:1px solid ");
                    $1m.push($1y);
                    $1m.push(";-moz-border-radius:5px;");
                    $1m.push(";-webkit-border-radius:5px;");
                    $1m.push(";border-radius:5px;");
                } else {
                    $1m.push(";border-left:1px solid ");
                    $1m.push($1y);
                    $1m.push(";border-right:1px solid ");
                    $1m.push($1y);
                };
                $1m.push(";");
                if ($h.data.backgroundImage) {
                    $1m.push("background-image:url(");
                    $1m.push($h.data.backgroundImage);
                    $1m.push(");");
                    if ($h.data.backgroundRepeat) {
                        $1m.push("background-repeat:");
                        $1m.push($h.data.backgroundRepeat);
                        $1m.push(";");
                    }
                };
                if ($c.rtl) {
                    $1m.push("direction:rtl;");
                };
                $1m.push("' unselectable='on'>");
                if (this.durationBarVisible) {
                    var $1z = $h.client.barColor() || $c.durationBarColor;
                    $1m.push("<div style='position:absolute;left:1px;top:1px;width:");
                    $1m.push($c.durationBarWidth - 1);
                    $1m.push("px;height:");
                    $1m.push($h.part.barTop);
                    $1m.push("px;background-color:white;font-size:1px' unselectable='on'></div>");
                    $1m.push("<div style='position:absolute;left:1px;top:");
                    $1m.push($h.part.barTop + $h.part.barHeight);
                    $1m.push("px;width:");
                    $1m.push($c.durationBarWidth - 1);
                    $1m.push("px;height:");
                    $1m.push($L - ($h.part.barTop + $h.part.barHeight));
                    $1m.push("px;background-color:white;font-size:1px' unselectable='on'></div>");
                    $1m.push("<div style='position:absolute;left:1px;width:");
                    $1m.push($c.durationBarWidth);
                    $1m.push("px;height:");
                    $1m.push($h.part.barHeight);
                    $1m.push("px;");
                    if ($h.data.durationBarImageUrl) {
                        $1m.push("background-image:url(");
                        $1m.push($h.data.durationBarImageUrl);
                        $1m.push(");");
                    } else if ($c.durationBarImageUrl) {
                        $1m.push("background-image:url(");
                        $1m.push($c.durationBarImageUrl);
                        $1m.push(");");
                    };
                    $1m.push("top:");
                    $1m.push($h.part.barTop + 1);
                    $1m.push("px;background-color:");
                    $1m.push($1z);
                    $1m.push(";font-size:1px' unselectable='on'></div><div style='position:absolute;left:");
                    $1m.push($c.durationBarWidth);
                    $1m.push("px;top:1px;width:1px;background-color:");
                    $1m.push($1y);
                    $1m.push(";height:100%' unselectable='on'></div>");
                };
                var $1A = $h.client.header() ? this.eventHeaderHeight : 0;
                if ($h.client.header()) {
                    $1m.push("<div unselectable='on' style='overflow:hidden;height:");
                    $1m.push(this.eventHeaderHeight);
                    $1m.push("px; background-color:");
                    $1m.push($1y);
                    $1m.push(";font-size:");
                    $1m.push(this.eventHeaderFontSize);
                    $1m.push(";color:");
                    $1m.push(this.eventHeaderFontColor);
                    $1m.push("'>");
                    $1m.push($h.client.header());
                    $1m.push("</div>");
                };
                if (this.durationBarVisible) {
                    $1m.push("<div unselectable='on' style='padding-left:");
                    $1m.push($c.durationBarWidth + 3);
                    $1m.push("px;");
                } else {
                    $1m.push("<div unselectable='on' style='overflow:hidden;padding-left:2px;height:");
                    $1m.push($L - $1A - 1);
                    $1m.push("px;");
                };
                $1m.push("'>");
                $1m.push($h.client.innerHTML());
                $1m.push("</div></div>");
                if ($1w) {
                    $1m.push("<div unselectable='on' style='margin-right:2px;'>");
                    $1m.push("<div unselectable='on' style='height:1px;line-height:1px;font-size:0px;margin-left:2px;margin-top:1px;background-color:");
                    $1m.push($1y);
                    $1m.push(";'><!-- --></div>");
                    $1m.push("</div>");
                    $1m.push("<div unselectable='on' style='margin-right:0px;margin-top:-3px;position:relative;'>");
                    $1m.push("<div unselectable='on' style='margin-right:0px;position:relative;'>");
                    $1m.push("<div unselectable='on' style='height:1px;line-height:1px;font-size:0px;margin-top:1px;margin-left:1px;margin-right:1px;border-right:1px solid ");
                    $1m.push($1y);
                    $1m.push(";border-left:1px solid ");
                    $1m.push($1y);
                    $1m.push(";background-color:");
                    $1m.push($h.client.backColor());
                    $1m.push("'>");
                    $1m.push("<!-- --></div>");
                    $1m.push("</div>");
                    $1m.push("</div>");
                };
                $d.innerHTML = $1m.join('');
            } else {
                if ($1x.cssClass) {
                    DayPilot.Util.addClass($d, $1x.cssClass);
                };
                var $N = document.createElement("div");
                $N.setAttribute("unselectable", "on");
                $N.className = $c.$4i("_event_inner");
                $N.innerHTML = $h.client.innerHTML();
                if ($1x.backColor) {
                    $N.style.background = $1x.backColor;
                };
                if ($1x.borderColor) {
                    $N.style.borderColor = $1x.borderColor;
                };
                if ($1x.backgroundImage) {
                    $N.style.backgroundImage = "url(" + $1x.backgroundImage + ")";
                    if ($1x.backgroundRepeat) {
                        $N.style.backgroundRepeat = $1x.backgroundRepeat;
                    }
                };
                $d.appendChild($N);
                if ($h.client.barVisible()) {
                    var $L = $h.part.height - 2;
                    var $1B = 100 * $h.part.barTop / $L;
                    var $1C = Math.ceil(100 * $h.part.barHeight / $L);
                    if (this.durationBarMode === "PercentComplete") {
                        $1D = 0;
                        $1E = $1x.complete;
                    };
                    var $1F = document.createElement("div");
                    $1F.setAttribute("unselectable", "on");
                    $1F.className = this.$4i("_event_bar");
                    $1F.style.position = "absolute";
                    var $1G = document.createElement("div");
                    $1G.setAttribute("unselectable", "on");
                    $1G.className = this.$4i("_event_bar_inner");
                    $1G.style.top = $1B + "%";
                    if (0 < $1C && $1C <= 1) {
                        $1G.style.height = "1px";
                    } else {
                        $1G.style.height = $1C + "%";
                    };
                    $1F.appendChild($1G);
                    $d.appendChild($1F);
                }
            };
            if ($1x.areas) {
                for (var i = 0; i < $1x.areas.length; i++) {
                    var $1H = $1x.areas[i];
                    if ($1H.v !== 'Visible') {
                        continue;
                    };
                    var a = DayPilot.Areas.createArea($d, $h, $1H);
                    $d.appendChild(a);
                }
            };
            if ($H.rows[0].cells[$h.part.dayIndex]) {
                var $1I = $H.rows[0].cells[$h.part.dayIndex].firstChild;
                $1I.appendChild($d);
                $c.$5n($d);
                $d.event = $h;
                if ($c.multiselect.$52($h)) {
                    $c.multiselect.add($d.event, true);
                };
                if ($c.$4g()) {
                    if (typeof $c.onAfterEventRender === 'function') {
                        var $n = {};
                        $n.e = $d.event;
                        $n.div = $d;
                        $c.onAfterEventRender($n);
                    }
                } else {
                    if ($c.afterEventRender) {
                        $c.afterEventRender($d.event, $d);
                    }
                }
            };
            $c.elements.events.push($d);
        };
        this.$5n = function(el) {
            var c = (el && el.childNodes) ? el.childNodes.length : 0;
            for (var i = 0; i < c; i++) {
                try {
                    var $1c = el.childNodes[i];
                    if ($1c.nodeType === 1) {
                        $1c.setAttribute("unselectable", "on");
                        this.$5n($1c);
                    }
                } catch (e) {}
            }
        };
        this.$4c = function() {
            this.multiselect.$4X = [];
            var $08 = new Date();
            for (var i = 0; i < this.columnsBottom.length; i++) {
                var $1J = this.columnsBottom[i];
                for (var m = 0; m < $1J.blocks.length; m++) {
                    var $1e = $1J.blocks[m];
                    for (var j = 0; j < $1e.lines.length; j++) {
                        var $1h = $1e.lines[j];
                        for (var k = 0; k < $1h.length; k++) {
                            var e = $1h[k];
                            e.part.width = 100 / $1e.lines.length;
                            e.part.left = e.part.width * j;
                            if (this.eventArrangement === 'Cascade') {
                                var $1K = (j === $1e.lines.length - 1);
                                if (!$1K) {
                                    e.part.width = e.part.width * 1.5;
                                }
                            };
                            if (this.eventArrangement === 'Full') {
                                e.part.left = e.part.left / 2;
                                e.part.width = 100 - e.part.left;
                            };
                            if (!e.allday()) {
                                this.$5i(e);
                            }
                        }
                    }
                }
            };
            this.multiselect.redraw();
            var end = new Date();
            var $1L = end.getTime() - $08.getTime();
        };
        this.$5o = function() {
            this.multiselect.$4X = [];
            for (var i = 0; i < this.columnsBottom.length; i++) {
                var $1J = this.columnsBottom[i];
                for (var j = 0; j < $1J.lines.length; j++) {
                    var $1h = $1J.lines[j];
                    for (var k = 0; k < $1h.length; k++) {
                        var e = $1h[k];
                        e.part.width = 100 / $1J.lines.length;
                        e.part.left = e.Width * j;
                        if (!e.allday()) {
                            this.$5i(e);
                        }
                    }
                }
            }
        };
        this.$4i = function($1M) {
            var $1N = this.theme || this.cssClassPrefix;
            if ($1N) {
                return $1N + $1M;
            } else {
                return "";
            }
        };
        this.$4b = function() {
            if (this.nav.top.style.visibility === 'hidden') {
                this.nav.top.style.visibility = 'visible';
            }
        };
        this.$5p = function() {
            var $L = this.$4o() + this.$5q();
            $c.debug.message("Getting totalHeight, headerHeight: " + this.$4o() + " scrollable: " + this.$5q());
            if ($L < 0) {
                return 0;
            };
            return $L;
        };
        this.$5r = function() {
            this.nav.top = document.getElementById(this.id);
            this.nav.top.dp = this;
            this.nav.top.innerHTML = '';
            this.nav.top.style.MozUserSelect = 'none';
            this.nav.top.style.KhtmlUserSelect = 'none';
            this.nav.top.style.WebkitUserSelect = 'none';
            this.nav.top.style.position = 'relative';
            if (this.width) {
                this.nav.top.style.width = this.width;
            };
            if (this.rtl) {
                this.nav.top.style.direction = "rtl";
            };
            if (!this.cssOnly) {
                this.nav.top.style.lineHeight = "1.2";
                this.nav.top.style.textAlign = "left";
            };
            if (this.heightSpec === "Parent100Pct") {
                this.nav.top.style.height = "100%";
            } else {
                this.nav.top.style.height = this.$5p() + "px";
            };
            if (this.hideUntilInit) {
                this.nav.top.style.visibility = 'hidden';
            };
            this.nav.scroll = document.createElement("div");
            this.nav.scroll.style.height = this.$5q() + "px";
            if (this.cssOnly) {
                DayPilot.Util.addClass(this.nav.top, this.$4i("_main"));
            };
            var $1O = this.columnWidthSpec === 'Fixed';
            if (!$1O) {
                if (this.heightSpec === "Fixed") {
                    this.nav.scroll.style.overflowY = "scroll";
                } else if (this.heightSpec === 'BusinessHours' && this.$4j() <= this.businessEndsHour - this.businessBeginsHour) {
                    this.nav.scroll.style.overflow = "hidden";
                } else if (this.heightSpec !== "Full" && this.heightSpec !== "BusinessHoursNoScroll") {
                    this.nav.scroll.style.overflow = "auto";
                } else {
                    this.nav.scroll.style.overflow = "hidden";
                }
            };
            this.nav.scroll.style.position = "relative";
            if (!this.cssOnly) {
                this.nav.scroll.style.border = "1px solid " + this.borderColor;
                this.nav.scroll.style.backgroundColor = this.hourNameBackColor;
            };
            if (this.showHeader) {
                var $1j = this.$5s();
                this.nav.top.appendChild($1j);
            };
            this.nav.scroll.style.zoom = 1;
            this.nav.scroll.setAttribute("data-id", "nav.scroll");
            this.nav.scroll.style.position = "absolute";
            this.nav.scroll.style.left = "0px";
            this.nav.scroll.style.right = "0px";
            this.nav.scroll.style.top = this.$4o() + "px";
            var $1P = this.$5t();
            this.nav.scrollable = $1P.firstChild;
            this.nav.scroll.appendChild($1P);
            this.nav.top.appendChild(this.nav.scroll);
            this.nav.vsph = document.createElement("div");
            this.nav.vsph.style.display = "none";
            this.nav.top.appendChild(this.nav.vsph);
            this.nav.scrollpos = document.createElement("input");
            this.nav.scrollpos.type = "hidden";
            this.nav.scrollpos.id = $c.id + "_scrollpos";
            this.nav.scrollpos.name = this.nav.scrollpos.id;
            this.nav.top.appendChild(this.nav.scrollpos);
            this.nav.select = document.createElement("input");
            this.nav.select.type = "hidden";
            this.nav.select.id = $c.id + "_select";
            this.nav.select.name = this.nav.select.id;
            this.nav.select.value = null;
            this.nav.top.appendChild(this.nav.select);
            this.nav.scrollLayer = document.createElement("div");
            this.nav.scrollLayer.style.position = 'absolute';
            this.nav.scrollLayer.style.top = '0px';
            this.nav.scrollLayer.style.left = '0px';
            this.nav.top.appendChild(this.nav.scrollLayer);
            this.nav.scrollUp = [];
            this.nav.scrollDown = [];
            this.nav.loading = document.createElement("div");
            this.nav.loading.style.position = 'absolute';
            this.nav.loading.style.top = '0px';
            this.nav.loading.style.left = (this.hourWidth + 5) + "px";
            this.nav.loading.style.backgroundColor = this.loadingLabelBackColor;
            this.nav.loading.style.fontSize = this.loadingLabelFontSize;
            this.nav.loading.style.fontFamily = this.loadingLabelFontFamily;
            this.nav.loading.style.color = this.loadingLabelFontColor;
            this.nav.loading.style.padding = '2px';
            this.nav.loading.innerHTML = this.loadingLabelText;
            this.nav.loading.style.display = 'none';
            this.nav.top.appendChild(this.nav.loading);
        };
        this.$48 = function() {
            if (!this.fasterDispose) {
                DayPilot.pu(this.nav.hourTable);
            } else {
                this.$5u();
            };
            if (this.nav.hoursPlaceholder) {
                this.nav.hoursPlaceholder.innerHTML = '';
                this.nav.hourTable = this.$5v();
                this.nav.hoursPlaceholder.appendChild(this.nav.hourTable);
            }
        };
        this.$5u = function() {
            if (!this.nav.hourTable) {
                return;
            };
            for (var i = 0; i < this.nav.hourTable.rows.length; i++) {
                var $1Q = this.nav.hourTable.rows[i];
                var $d = $1Q.cells[0].firstChild;
                $d.data = null;
                $d.onmousemove = null;
                $d.onmouseout = null;
            }
        };
        this.$5t = function() {
            var $1R = document.createElement("div");
            $1R.style.zoom = 1;
            $1R.style.position = 'relative';
            $1R.onmousemove = this.$5w;
            $1R.ontouchmove = this.$5m.onMainTouchMove;
            $1R.ontouchend = this.$5m.onMainTouchEnd;
            var $1S = null;
            var $1T = null;
            var $1U = null;
            var $1O = this.columnWidthSpec === 'Fixed';
            if ($1O) {
                if (this.showHours) {
                    var $X = document.createElement("div");
                    $X.style.cssFloat = "left";
                    $X.style.styleFloat = "left";
                    $X.style.width = (this.hourWidth) + "px";
                    $X.style.height = this.$5q() + "px";
                    $X.style.overflow = "hidden";
                    $1R.appendChild($X);
                    $1S = $X;
                    var $1V = 30;
                    var $L = (this.$4k() * this.cellHeight) / (60000 * this.cellDuration) + $1V;
                    $1U = document.createElement("div");
                    $1U.style.height = ($L) + "px";
                    $X.appendChild($1U);
                };
                var $Y = document.createElement("div");
                $Y.style.height = this.$5q() + "px";
                if (this.showHours) {
                    $Y.style.marginLeft = (this.hourWidth) + "px";
                };
                $Y.style.position = "relative";
                $Y.style.overflow = "auto";
                $Y.onscroll = function() {
                    $c.nav.bottomLeft.scrollTop = $c.nav.bottomRight.scrollTop;
                    $c.nav.upperRight.scrollLeft = $c.nav.bottomRight.scrollLeft;
                };
                $1R.appendChild($Y);
                $1T = $Y;
            } else {
                var $1W = document.createElement("table");
                $1W.cellSpacing = "0";
                $1W.cellPadding = "0";
                $1W.border = "0";
                $1W.style.border = "0px none";
                $1W.style.width = "100%";
                $1W.style.position = 'relative';
                var r = $1W.insertRow(-1);
                var c;
                if (this.showHours) {
                    c = r.insertCell(-1);
                    c.style.verticalAlign = "top";
                    c.style.padding = '0px';
                    c.style.border = '0px none';
                    $1U = c;
                };
                c = r.insertCell(-1);
                c.width = "100%";
                c.style.padding = '0px';
                c.style.border = '0px none';
                c.style.verticalAlign = "top";
                if (!this.cssOnly) {
                    c.style.borderLeft = "1px solid " + this.borderColor;
                };
                $1T = c;
                $1R.appendChild($1W);
            };
            if ($1U) {
                this.nav.hourTable = this.$5v();
                $1U.appendChild(this.nav.hourTable);
            };
            if (!this.cssOnly && !this.separateEventsTable) {
                $1T.appendChild(this.$5x());
            } else {
                var parent = document.createElement("div");
                parent.style.height = "0px";
                parent.style.position = "relative";
                parent.appendChild(this.$5x());
                var $1X = document.createElement("div");
                $1X.style.position = "absolute";
                $1X.style.top = "0px";
                $1X.style.left = "0px";
                $1X.style.right = "0px";
                $1X.style.height = "0px";
                parent.appendChild($1X);
                this.nav.crosshair = $1X;
                parent.appendChild(this.$5y());
                $1T.appendChild(parent);
            };
            this.nav.zoom = $1R;
            this.nav.bottomLeft = $1S;
            this.nav.bottomRight = $1T;
            this.nav.hoursPlaceholder = $1U;
            return $1R;
        };
        this.$5x = function() {
            var $1W = document.createElement("table");
            $1W.cellPadding = "0";
            $1W.cellSpacing = "0";
            $1W.border = "0";
            var $1O = this.columnWidthSpec === 'Fixed';
            if (!$1O) {
                $1W.style.width = "100%";
            };
            $1W.style.border = "0px none";
            if (!this.cssOnly) {};
            $1W.style.tableLayout = 'fixed';
            this.nav.main = $1W;
            this.nav.events = $1W;
            return $1W;
        };
        this.$5y = function() {
            var $1W = document.createElement("table");
            var $1O = this.columnWidthSpec === 'Fixed';
            $1W.style.position = "absolute";
            $1W.style.top = "0px";
            $1W.cellPadding = "0";
            $1W.cellSpacing = "0";
            $1W.border = "0";
            if (!$1O) {
                $1W.style.width = "100%";
            } else {
                $1W.style.width = (this.columnsBottom.length * this.columnWidth) + "px";
            };
            $1W.style.border = "0px none";
            $1W.style.tableLayout = 'fixed';
            this.nav.events = $1W;
            var $1Y = true;
            var $0K = this.columnsBottom;
            var cl = $0K.length;
            var r = ($1Y) ? $1W.insertRow(-1) : $1W.rows[0];
            for (var j = 0; j < cl; j++) {
                var c = ($1Y) ? r.insertCell(-1) : r.cells[j];
                if ($1Y) {
                    c.style.padding = '0px';
                    c.style.border = '0px none';
                    c.style.height = '0px';
                    c.style.overflow = 'visible';
                    if (!$c.rtl) {
                        c.style.textAlign = 'left';
                    };
                    var $d = document.createElement("div");
                    $d.style.marginRight = $c.columnMarginRight + "px";
                    $d.style.position = 'relative';
                    $d.style.height = '1px';
                    if (!this.cssOnly) {
                        $d.style.fontSize = '1px';
                        $d.style.lineHeight = '1.2';
                    };
                    $d.style.marginTop = '-1px';
                    c.appendChild($d);
                }
            };
            return $1W;
        };
        this.$5v = function() {
            var $1W = document.createElement("table");
            $1W.cellSpacing = "0";
            $1W.cellPadding = "0";
            $1W.border = "0";
            $1W.style.border = '0px none';
            $1W.style.width = this.hourWidth + "px";
            $1W.oncontextmenu = function() {
                return false;
            };
            $1W.onmousemove = function() {
                $c.$3T();
            };
            var $1Z = this.$4k() / (this.timeHeaderCellDuration * 60 * 1000);
            for (var i = 0; i < $1Z; i++) {
                this.$5z($1W, i);
            };
            return $1W;
        };
        this.$5A = function() {
            return (this.$4n() - this.$4n(true)) * (60 / this.cellDuration);
        };
        this.$5B = function() {
            return (this.$4n() - this.$4n(true));
        };
        this.$4V = function() {
            return this.$5A() * this.cellHeight;
        };
        this.$5z = function($1W, i) {
            var $L = (this.cellHeight * 60 / this.cellDuration) / (60 / this.timeHeaderCellDuration);
            var r = $1W.insertRow(-1);
            r.style.height = $L + "px";
            var c = r.insertCell(-1);
            c.valign = "bottom";
            c.setAttribute("unselectable", "on");
            if (!this.cssOnly) {
                c.className = this.$4i("rowheader");
                c.style.backgroundColor = this.hourNameBackColor;
                c.style.cursor = "default";
            };
            c.style.padding = '0px';
            c.style.border = '0px none';
            var $20 = document.createElement("div");
            if (this.cssOnly) {
                $20.className = this.$4i("_rowheader");
            };
            $20.style.position = "relative";
            $20.style.width = this.hourWidth + "px";
            $20.style.height = ($L) + "px";
            $20.style.overflow = 'hidden';
            $20.setAttribute("unselectable", "on");
            var $1e = document.createElement("div");
            if (this.cssOnly) {
                $1e.className = this.$4i("_rowheader_inner");
            };
            $1e.setAttribute("unselectable", "on");
            if (!this.cssOnly) {
                $1e.style.borderBottom = "1px solid " + this.hourNameBorderColor;
                $1e.style.textAlign = "right";
                $1e.style.height = ($L - 1) + "px";
            };
            var $S = null;
            var $h = null;
            if (this.hours) {
                $h = this.hours[i + this.$5B()];
                $S = $h.html;
            };
            var $08 = this.startDate.addHours(i + this.$4n());
            var $21 = $08.getHours();
            if (typeof $c.onBeforeTimeHeaderRender === 'function') {
                var $n = {};
                $n.header = {};
                $n.header.hours = $21;
                $n.header.minutes = $08.getMinutes();
                $n.header.start = $08.toString("HH:mm");
                $n.header.html = $S;
                $n.header.areas = $h ? $h.areas : null;
                $c.onBeforeTimeHeaderRender($n);
                if ($n.header.html !== null) {
                    $S = $n.header.html;
                };
                $h = $n.header;
            };
            if ($h) {
                $20.data = $h;
                $20.onmousemove = $c.$5C;
                $20.onmouseout = $c.$5D;
            };
            if ($S) {
                $1e.innerHTML = $S;
            } else {
                var $22 = document.createElement("div");
                $22.setAttribute("unselectable", "on");
                if (!this.cssOnly) {
                    $22.style.padding = "2px";
                    $22.style.fontFamily = this.hourFontFamily;
                    $22.style.fontSize = this.hourFontSize;
                    $22.style.color = this.hourFontColor;
                };
                var am = $21 < 12;
                if (this.$5h.timeFormat() === "Clock12Hours") {
                    $21 = $21 % 12;
                    if ($21 === 0) {
                        $21 = 12;
                    }
                };
                $22.innerHTML = $21;
                var $23 = document.createElement("span");
                $23.setAttribute("unselectable", "on");
                if (!this.cssOnly) {
                    $23.style.fontSize = "10px";
                    $23.style.verticalAlign = "super";
                } else {
                    $23.className = this.$4i("_rowheader_minutes");
                };
                var $24;
                if (this.$5h.timeFormat() === "Clock12Hours") {
                    if (am) {
                        $24 = "AM";
                    } else {
                        $24 = "PM";
                    }
                } else {
                    $24 = "00";
                };
                if (!this.cssOnly) {
                    $23.innerHTML = "&nbsp;" + $24;
                } else {
                    $23.innerHTML = $24;
                };
                $22.appendChild($23);
                $1e.appendChild($22);
            };
            $20.appendChild($1e);
            c.appendChild($20);
        };
        this.$5C = function(ev) {
            $c.$3T();
            var $d = this;
            if (!$d.active) {
                DayPilot.Areas.showAreas($d, $d.data);
            }
        };
        this.$5D = function(ev) {
            DayPilot.Areas.hideAreas(this, ev);
        };
        this.$5q = function() {
            switch (this.heightSpec) {
                case "Fixed":
                    return this.height;
                case "Parent100Pct":
                    return this.height;
                case "Full":
                    return (this.$4k() * this.cellHeight) / (60000 * this.cellDuration);
                case "BusinessHours":
                case "BusinessHoursNoScroll":
                    var $P = this.$4l();
                    return $P * this.cellHeight * 60 / this.cellDuration;
                default:
                    throw "DayPilot.Calendar: Unexpected 'heightSpec' value.";
            }
        };
        this.$4o = function() {
            if (!this.showHeader) {
                return 0;
            };
            var $25 = this.headerLevels * $0d.headerHeight() + this.headerLevels - 1;
            if (this.showAllDayEvents && $0d.allDayHeaderHeight()) {
                if (!this.cssOnly) {
                    return $25 + $0d.allDayHeaderHeight();
                } else {
                    return $25 + $0d.allDayHeaderHeight();
                }
            } else {
                return $25;
            }
        };
        this.$44 = function() {
            if (!this.headerHeightAutoFit) {
                return;
            };
            if (this.headerLevels > 1) {
                throw "Header height can't be adjusted for HeaderLevels > 1 (not implemented yet).";
                return;
            };
            var $O = 0;
            for (var i = 0; i < this.columnsBottom.length; i++) {
                var $f = this.nav.header.rows[this.headerLevels - 1].cells[i];
                var $d = $f.firstChild;
                var $N = $d.firstChild;
                var $26 = $d.style.height;
                $d.style.height = "auto";
                $N.style.position = "static";
                var h = $d.offsetHeight;
                $d.style.height = $26;
                $N.style.position = '';
                $O = Math.max($O, h);
            };
            if ($O > this.headerHeight) {
                this.$3B.headerHeight = $O;
                this.$42();
                this.$43();
            }
        };
        this.$5E = function() {
            if (this.cssOnly) {
                return DayPilot.sw($c.nav.scroll) > 0;
            } else {
                return DayPilot.sw($c.nav.scroll) > 2;
            }
        };
        this.$5s = function() {
            var $1j = document.createElement("div");
            if (!this.cssOnly) {
                $1j.style.borderLeft = "1px solid " + this.borderColor;
                $1j.style.borderRight = "1px solid " + this.borderColor;
            };
            var $1O = this.columnWidthSpec === 'Fixed';
            if (!$1O) {
                $1j.style.overflow = "auto";
            };
            $1j.style.position = "absolute";
            $1j.style.left = "0px";
            $1j.style.right = "0px";
            var $1R = document.createElement("div");
            $1R.style.position = "relative";
            $1R.style.zoom = "1";
            var $27 = null;
            var $1O = this.columnWidthSpec === 'Fixed';
            if ($1O) {
                var $X = document.createElement("div");
                $X.style.cssFloat = "left";
                $X.style.styleFloat = "left";
                $X.style.width = (this.hourWidth) + "px";
                if (this.showHours) {
                    var $28 = this.$5F();
                    this.nav.corner = $28;
                    $X.appendChild($28);
                    $1R.appendChild($X);
                    this.nav.upperLeft = $X;
                };
                var $1V = 30;
                var $Y = document.createElement("div");
                if (this.showHours) {
                    $Y.style.marginLeft = (this.hourWidth) + "px";
                };
                $Y.style.position = "relative";
                $Y.style.overflow = "hidden";
                $Y.style.height = this.$4o() + "px";
                $1R.appendChild($Y);
                this.nav.upperRight = $Y;
                $27 = document.createElement("div");
                $27.style.width = (this.columnsBottom.length * this.columnWidth + $1V) + "px";
                $Y.appendChild($27);
            } else {
                var $1W = document.createElement("table");
                $1W.cellPadding = "0";
                $1W.cellSpacing = "0";
                $1W.border = "0";
                $1W.style.width = "100%";
                $1W.style.borderCollapse = 'separate';
                $1W.style.border = "0px none";
                var r = $1W.insertRow(-1);
                this.nav.fullHeader = $1W;
                if (this.showHours) {
                    var c = r.insertCell(-1);
                    c.style.padding = '0px';
                    c.style.border = '0px none';
                    var $28 = this.$5F();
                    c.appendChild($28);
                    this.nav.corner = $28;
                };
                c = r.insertCell(-1);
                c.style.width = "100%";
                if (!this.cssOnly) {
                    c.style.backgroundColor = this.hourNameBackColor;
                };
                c.valign = "top";
                c.style.position = 'relative';
                c.style.padding = '0px';
                c.style.border = '0px none';
                $27 = document.createElement("div");
                $27.style.position = "relative";
                $27.style.height = this.$4o() + "px";
                $27.style.overflow = "hidden";
                c.appendChild($27);
                this.nav.mid = $27;
                $1R.appendChild($1W);
            };
            this.nav.headerParent = $27;
            this.$5G();
            var $29 = this.$5E();
            var $1O = this.columnWidthSpec === 'Fixed';
            if ($29 && !$1O) {
                this.$5H();
            };
            $1j.appendChild($1R);
            return $1j;
        };
        this.$5G = function() {
            this.nav.header = document.createElement("table");
            this.nav.header.cellPadding = "0";
            this.nav.header.cellSpacing = "0";
            var $1O = this.columnWidthSpec === 'Fixed';
            if (!$1O) {
                this.nav.header.width = "100%";
            };
            this.nav.header.style.tableLayout = "fixed";
            if (!this.cssOnly) {
                this.nav.header.style.borderBottom = "0px none #000000";
                this.nav.header.style.borderLeft = "1px solid " + this.borderColor;
                this.nav.header.style.borderTop = "1px solid " + this.borderColor;
            };
            this.nav.header.oncontextmenu = function() {
                return false;
            };
            var $29 = this.$5E();
            if (!this.cssOnly) {
                if ($29) {
                    this.nav.header.style.borderRight = "1px solid " + this.borderColor;
                }
            };
            this.nav.headerParent.appendChild(this.nav.header);
            if (this.nav.allday) {
                DayPilot.de(this.nav.allday);
            };
            if (this.showAllDayEvents) {
                var $2a = document.createElement("div");
                $2a.style.position = 'absolute';
                $2a.style.top = "0px";
                $2a.style.height = "0px";
                var $1O = this.columnWidthSpec === 'Fixed';
                if (!$1O) {
                    $2a.style.width = "100%";
                } else {
                    $2a.style.width = (this.columnsBottom.length * this.columnWidth) + "px";
                };
                this.nav.allday = $2a;
                this.nav.headerParent.appendChild($2a);
            }
        };
        this.$5H = function() {
            if (!this.nav.fullHeader) {
                return;
            };
            var r = this.nav.fullHeader.rows[0];
            var c = r.insertCell(-1);
            if (!this.cssOnly) {
                c.className = this.$4i('cornerright');
                c.style.backgroundColor = this.hourNameBackColor;
                c.style.borderBottom = "0px none";
                c.style.borderLeft = "1px solid " + this.borderColor;
                c.style.borderRight = "0px none";
            };
            c.style.padding = '0px';
            c.style.verticalAlign = 'top';
            c.setAttribute("unselectable", "on");
            var $1m = document.createElement("div");
            $1m.setAttribute("unselectable", "on");
            if (this.cssOnly) {
                $1m.className = this.$4i('_cornerright');
            };
            $1m.style.overflow = "hidden";
            $1m.style.position = "relative";
            $1m.style.width = "16px";
            $1m.style.height = this.$4o() + "px";
            var $N = document.createElement("div");
            if (this.cssOnly) {
                $N.className = this.$4i('_cornerright_inner');
            } else {
                $N.style.borderTop = "1px solid " + this.borderColor;
            };
            $1m.appendChild($N);
            c.appendChild($1m);
            this.nav.cornerRight = $1m;
        };
        this.$5F = function() {
            var $1P = document.createElement("div");
            $1P.style.position = 'relative';
            if (!this.cssOnly) {
                $1P.style.backgroundColor = this.cornerBackColor;
                $1P.style.fontFamily = this.headerFontFamily;
                $1P.style.fontSize = this.headerFontSize;
                $1P.style.color = this.headerFontColor;
                $1P.className = this.$4i("corner");
            } else {
                $1P.className = this.$4i("_corner");
            };
            $1P.style.width = this.hourWidth + "px";
            $1P.style.height = this.$4o() + "px";
            $1P.style.overflow = "hidden";
            $1P.oncontextmenu = function() {
                return false;
            };
            var $28 = document.createElement("div");
            if (this.cssOnly) {
                $28.className = this.$4i("_corner_inner");
            } else {
                $28.style.borderTop = "1px solid " + this.borderColor;
            };
            $28.setAttribute("unselectable", "on");
            var $S = this.cornerHTML || this.cornerHtml;
            $28.innerHTML = $S ? $S : '';
            $1P.appendChild($28);
            if (!this.numberFormat) return $1P;
            /*var $2b = document.createElement("div");
            $2b.style.position = 'absolute';
            $2b.style.padding = '2px';
            $2b.style.top = '0px';
            $2b.style.left = '1px';
            $2b.style.backgroundColor = "#FF6600";
            $2b.style.color = "white";
            $2b.innerHTML = "\u0044\u0045\u004D\u004F";
            $2b.setAttribute("unselectable", "on");
            $1P.appendChild($2b);*/
            return $1P;
        };
        this.$3N = function() {
            var $1W = this.nav.main;
            $1W.root = null;
            $1W.onmouseup = null;
            for (var y = 0; y < $1W.rows.length; y++) {
                var r = $1W.rows[y];
                for (var x = 0; x < r.cells.length; x++) {
                    var c = r.cells[x];
                    c.root = null;
                    c.onmousedown = null;
                    c.onmousemove = null;
                    c.onmouseout = null;
                    c.onmouseup = null;
                    c.onclick = null;
                    c.ondblclick = null;
                    c.oncontextmenu = null;
                }
            };
            if (!this.fasterDispose) DayPilot.pu($1W);
        };
        this.$45 = function() {
            for (var i = 0; this.nav.scrollUp && i < this.nav.scrollUp.length; i++) {
                this.nav.scrollLayer.removeChild(this.nav.scrollUp[i]);
            };
            for (var i = 0; this.nav.scrollDown && i < this.nav.scrollDown.length; i++) {
                this.nav.scrollLayer.removeChild(this.nav.scrollDown[i]);
            };
            this.nav.scrollUp = [];
            this.nav.scrollDown = [];
        };
        this.$47 = function() {
            var $1W = this.nav.main;
            var $0j = this.cellDuration * 60 * 1000;
            var $2c = this.$4q();
            var $0K = $c.columnsBottom;
            var $1Y = !this.tableCreated || $1W.rows.length === 0 || $0K.length !== $1W.rows[0].cells.length || $2c !== $1W.rows.length;
            if ($1W) {
                this.$3N();
                if ($c.$3C.ielt9 && $1Y) {
                    DayPilot.de(this.nav.scrollable.parentNode);
                    var $1P = this.$5t();
                    this.nav.scrollable = $1P.firstChild;
                    this.nav.scroll.appendChild($1P);
                    $1W = this.nav.main;
                }
            }
            while ($1W && $1W.rows && $1W.rows.length > 0 && $1Y) {
                if (!this.fasterDispose) DayPilot.pu($1W.rows[0]);
                $1W.deleteRow(0);
            };
            this.tableCreated = true;
            if (this.scrollLabelsVisible) {
                var $0K = this.columnsBottom;
                var $0L = (this.showHours ? this.hourWidth : 0);
                var $I = (this.nav.scroll.clientWidth - $0L) / $0K.length;
                for (var i = 0; i < $0K.length; i++) {
                    var $0N = document.createElement("div");
                    $0N.style.position = 'absolute';
                    $0N.style.top = '0px';
                    $0N.style.left = ($0L + 2 + i * $I + $I / 2) + "px";
                    $0N.style.display = 'none';
                    var $1t = document.createElement("div");
                    $1t.style.height = '10px';
                    $1t.style.width = '10px';
                    if (this.cssOnly) {
                        $1t.className = this.$4i("_scroll_up");
                    } else {
                        $1t.style.backgroundRepeat = "no-repeat";
                        if (this.scrollUpUrl) {
                            $1t.style.backgroundImage = "url('" + this.scrollUpUrl + "')";
                        };
                        $1t.className = this.$4i("scroll_up");
                    };
                    $0N.appendChild($1t);
                    this.nav.scrollLayer.appendChild($0N);
                    this.nav.scrollUp.push($0N);
                    var $0O = document.createElement("div");
                    $0O.style.position = 'absolute';
                    $0O.style.top = '0px';
                    $0O.style.left = ($0L + 2 + i * $I + $I / 2) + "px";
                    $0O.style.display = 'none';
                    var $1t = document.createElement("div");
                    $1t.style.height = '10px';
                    $1t.style.width = '10px';
                    if (this.cssOnly) {
                        $1t.className = this.$4i("_scroll_down");
                    } else {
                        $1t.style.backgroundRepeat = "no-repeat";
                        if (this.scrollDownUrl) {
                            $1t.style.backgroundImage = "url('" + this.scrollDownUrl + "')";
                        };
                        $1t.className = this.$4i("scroll_down");
                    };
                    $0O.appendChild($1t);
                    this.nav.scrollLayer.appendChild($0O);
                    this.nav.scrollDown.push($0O);
                }
            };
            var cl = $0K.length;
            if (this.cssOnly || this.separateEventsTable) {
                var $0X = this.nav.events;
                while ($0X && $0X.rows && $0X.rows.length > 0 && $1Y) {
                    if (!this.fasterDispose) DayPilot.pu($0X.rows[0]);
                    $0X.deleteRow(0);
                };
                var r = ($1Y) ? $0X.insertRow(-1) : $0X.rows[0];
                for (var j = 0; j < cl; j++) {
                    var c = ($1Y) ? r.insertCell(-1) : r.cells[j];
                    if ($1Y) {
                        c.style.padding = '0px';
                        c.style.border = '0px none';
                        c.style.height = '1px';
                        c.style.overflow = 'visible';
                        var $1O = this.columnWidthSpec === 'Fixed';
                        if ($1O) {
                            c.style.width = this.columnWidth + "px";
                        };
                        if (!$c.rtl) {
                            c.style.textAlign = 'left';
                        };
                        var $d = document.createElement("div");
                        $d.style.marginRight = $c.columnMarginRight + "px";
                        $d.style.position = 'relative';
                        $d.style.height = '1px';
                        if (!this.cssOnly) {
                            $d.style.fontSize = '1px';
                            $d.style.lineHeight = '1.2';
                        };
                        $d.style.marginTop = '-1px';
                        c.appendChild($d);
                    }
                }
            };
            for (var i = 0; i < $2c; i++) {
                var r = ($1Y) ? $1W.insertRow(-1) : $1W.rows[i];
                if ($1Y) {
                    r.style.MozUserSelect = 'none';
                    r.style.KhtmlUserSelect = 'none';
                    r.style.WebkitUserSelect = 'none';
                };
                for (var j = 0; j < cl; j++) {
                    var $1J = this.columnsBottom[j];
                    var c = ($1Y) ? r.insertCell(-1) : r.cells[j];
                    c.start = $1J.start.addTime(i * $0j).addHours(this.$4n());
                    c.end = c.start.addTime($0j);
                    c.resource = $1J.id;
                    if (typeof this.onBeforeCellRender === 'function') {
                        if (!this.cellProperties) {
                            this.cellProperties = [];
                        };
                        var $f = {};
                        $f.resource = c.resource;
                        $f.start = c.start;
                        $f.end = c.end;
                        var $2d = j + "_" + i;
                        $f.cssClass = null;
                        $f.html = null;
                        $f.backImage = null;
                        $f.backRepeat = null;
                        $f.backColor = null;
                        $f.business = this.$5I(c.start, c.end);
                        if (this.cellProperties[$2d]) {
                            DayPilot.Util.copyProps(this.cellProperties[$2d], $f, ['cssClass', 'html', 'backImage', 'backRepeat', 'backColor', 'business']);
                        };
                        var $n = {};
                        $n.cell = $f;
                        this.onBeforeCellRender($n);
                        this.cellProperties[$2d] = $f;
                    };
                    var $2e = $c.$5J(j, i);
                    if ($1Y) {
                        c.root = this;
                        c.style.padding = '0px';
                        c.style.border = '0px none';
                        c.style.verticalAlign = 'top';
                        c.style.height = $c.cellHeight + 'px';
                        c.style.overflow = 'hidden';
                        c.setAttribute("unselectable", "on");
                        if (!this.cssOnly) {
                            var $2f = document.createElement("div");
                            $2f.style.height = ($c.cellHeight - 1) + "px";
                            $2f.style.width = '100%';
                            $2f.style.overflow = 'hidden';
                            $2f.setAttribute("unselectable", "on");
                            c.appendChild($2f);
                            var $d = document.createElement("div");
                            $d.setAttribute("unselectable", "on");
                            $d.style.fontSize = '1px';
                            $d.style.height = '0px';
                            c.appendChild($d);
                            if ((!$c.rtl && j !== cl - 1) || $c.rtl) {
                                c.style.borderRight = '1px solid ' + $c.cellBorderColor;
                            };
                            var $2g = (c.end.getMinutes() + c.end.getSeconds() + c.end.getMilliseconds()) > 0;
                            if ($2g) {
                                if ($c.hourHalfBorderColor !== '') {
                                    $d.style.borderBottom = '1px solid ' + $c.hourHalfBorderColor;
                                };
                                $d.className = $c.$4i("hourhalfcellborder");
                            } else {
                                if ($c.hourBorderColor !== '') {
                                    $d.style.borderBottom = '1px solid ' + $c.hourBorderColor;
                                };
                                $d.className = $c.$4i("hourcellborder");
                            }
                        } else {
                            var $2f = document.createElement("div");
                            $2f.className = $c.$4i("_cell");
                            $2f.style.position = "relative";
                            $2f.style.height = ($c.cellHeight) + "px";
                            $2f.style.overflow = 'hidden';
                            $2f.setAttribute("unselectable", "on");
                            var $N = document.createElement("div");
                            $N.className = $c.$4i("_cell_inner");
                            $2f.appendChild($N);
                            c.appendChild($2f);
                        }
                    };
                    c.onmousedown = this.$4P;
                    c.onmousemove = this.$4S;
                    c.onmouseout = this.$4R;
                    c.ontouchstart = this.$5m.onCellTouchStart;
                    c.ontouchmove = this.$5m.onCellTouchMove;
                    c.ontouchend = this.$5m.onCellTouchEnd;
                    c.onmouseup = function() {
                        return false;
                    };
                    c.onclick = function() {
                        return false;
                    };
                    c.ondblclick = function() {
                        DayPilotCalendar.firstMousePos = null;
                        $c.$4Q();
                        clearTimeout(DayPilotCalendar.selectedTimeout);
                        if ($c.timeRangeDoubleClickHandling === 'Disabled') {
                            return;
                        };
                        var $0J = $c.getSelection();
                        $c.$4L($0J.start, $0J.end, $0J.resource);
                    };
                    c.oncontextmenu = function() {
                        if (!this.selected) {
                            $c.clearSelection();
                            DayPilotCalendar.column = DayPilotCalendar.getColumn(this);
                            $c.selectedCells.push(this);
                            DayPilotCalendar.firstSelected = this;
                            DayPilotCalendar.topSelectedCell = this;
                            DayPilotCalendar.bottomSelectedCell = this;
                            $c.$4Q();
                        };
                        if ($c.contextMenuSelection) {
                            $c.contextMenuSelection.show($c.getSelection());
                        };
                        return false;
                    };
                    var $V = $c.$5K(j, i);
                    $2f = c.firstChild;
                    var $1O = this.columnWidthSpec === 'Fixed';
                    if ($1O) {
                        $2f.style.width = this.columnWidth + "px";
                    };
                    if ($V) {
                        if (this.cssOnly) {
                            $2f.firstChild.style.background = $V;
                        } else {
                            $2f.style.background = $V;
                        }
                    };
                    var $2h = $2e ? $2e.business : this.$5I(c.start, c.end);
                    if ($2h && this.cssOnly) {
                        DayPilot.Util.addClass($2f, $c.$4i("_cell_business"));
                    };
                    $2f.firstChild.innerHTML = '';
                    if ($2e) {
                        if ($2e.html) {
                            $2f.firstChild.innerHTML = $2e.html;
                        };
                        if ($2e.cssClass) {
                            if (this.cssOnly) {
                                DayPilot.Util.addClass($2f, $2e.cssClass);
                            } else {
                                DayPilot.Util.addClass(c, $c.$4i($2e.cssClass));
                            }
                        };
                        if ($2e.backImage) {
                            $2f.style.backgroundImage = "url('" + $2e.backImage + "')";
                        };
                        if ($2e.backRepeat) {
                            $2f.style.backgroundRepeat = $2e.backRepeat;
                        }
                    };
                    if (!this.cssOnly) {
                        DayPilot.Util.addClass(c, $c.$4i("cellbackground"));
                    }
                }
            };
            $1W.onmouseup = this.$4T;
            $1W.root = this;
            $c.nav.scrollable.style.display = '';
        };
        this.$5I = function($08, end) {
            if (this.businessBeginsHour < this.businessEndsHour) {
                return !($08.getHours() < this.businessBeginsHour || $08.getHours() >= this.businessEndsHour || $08.getDayOfWeek() === 6 || $08.getDayOfWeek() === 0);
            };
            if ($08.getHours() >= this.businessBeginsHour) {
                return true;
            };
            if ($08.getHours() < this.businessEndsHour) {
                return true;
            };
            return false;
        };
        this.$5w = function(ev) {
            ev = ev || window.event;
            ev.insideMainD = true;
            if (window.event) {
                window.event.srcElement.inside = true;
            };
            DayPilotCalendar.activeCalendar = this;
            var $2i = $c.nav.main;
            $c.coords = DayPilot.mo3($2i, ev);
            var $0F = DayPilot.mc(ev);
            var $1X = $c.crosshairType && $c.crosshairType !== "Disabled";
            var $2j = $c.coords.x < $c.hourWidth;
            if (DayPilot.Global.moving || DayPilot.Global.resizing || DayPilotCalendar.selecting || $2j) {
                $c.$3T();
            } else if ($1X) {
                $c.$5L();
            };
            if (DayPilot.Global.resizing) {
                if (!DayPilotCalendar.resizingShadow) {
                    DayPilotCalendar.resizingShadow = $c.$4h(DayPilot.Global.resizing, false, $c.shadow);
                };
                var $2k = DayPilot.Global.resizing.event.calendar.cellHeight;
                var $J = 0;
                var $2l = ($0F.y - DayPilotCalendar.originalMouse.y);
                if (DayPilot.Global.resizing.dpBorder === 'bottom') {
                    var $2m = Math.floor(((DayPilotCalendar.originalHeight + DayPilotCalendar.originalTop + $2l) + $2k / 2) / $2k) * $2k - DayPilotCalendar.originalTop + $J;
                    if ($2m < $2k) $2m = $2k;
                    var $O = DayPilot.Global.resizing.event.calendar.nav.main.clientHeight;
                    if (DayPilotCalendar.originalTop + $2m > $O) {
                        $2m = $O - DayPilotCalendar.originalTop;
                    };
                    DayPilotCalendar.resizingShadow.style.height = ($2m) + 'px';
                } else if (DayPilot.Global.resizing.dpBorder === 'top') {
                    var $2n = Math.floor(((DayPilotCalendar.originalTop + $2l - $J) + $2k / 2) / $2k) * $2k + $J;
                    if ($2n < $J) {
                        $2n = $J;
                    };
                    if ($2n > DayPilotCalendar.originalTop + DayPilotCalendar.originalHeight - $2k) {
                        $2n = DayPilotCalendar.originalTop + DayPilotCalendar.originalHeight - $2k;
                    };
                    var $2m = DayPilotCalendar.originalHeight - ($2n - DayPilotCalendar.originalTop);
                    if ($2m < $2k) {
                        $2m = $2k;
                    } else {
                        DayPilotCalendar.resizingShadow.style.top = $2n + 'px';
                    };
                    DayPilotCalendar.resizingShadow.style.height = ($2m) + 'px';
                }
            } else if (DayPilot.Global.moving) {
                if (!DayPilotCalendar.movingShadow) {
                    var $2o = 3;
                    if (DayPilot.distance($0F, DayPilotCalendar.originalMouse) > $2o) {
                        DayPilotCalendar.movingShadow = $c.$4h(DayPilot.Global.moving, !$c.$3C.ie, $c.shadow);
                        DayPilotCalendar.movingShadow.style.width = (DayPilotCalendar.movingShadow.parentNode.offsetWidth + 1) + 'px';
                    } else {
                        return;
                    }
                };
                if (!$c.coords) {
                    return;
                };
                var $2k = $c.cellHeight;
                var $J = 0;
                var $0M = DayPilotCalendar.moveOffsetY;
                if (!$0M) {
                    $0M = $2k / 2;
                };
                if (this.moveBy === "Top") {
                    $0M = 0;
                };
                var $2n = Math.floor((($c.coords.y - $0M - $J) + $2k / 2) / $2k) * $2k + $J;
                if ($2n < $J) {
                    $2n = $J;
                };
                var $H = $c.nav.main;
                var $O = $H.clientHeight;
                var $L = parseInt(DayPilotCalendar.movingShadow.style.height);
                if ($2n + $L > $O) {
                    $2n = $O - $L;
                };
                DayPilotCalendar.movingShadow.style.top = $2n + 'px';
                var $I = $H.clientWidth / $H.rows[0].cells.length;
                var $r = Math.floor(($c.coords.x) / $I);
                if ($r < 0) {
                    $r = 0;
                };
                if ($c.rtl) {
                    $r = $c.columnsBottom.length - $r - 1;
                };
                var $0X = $c.nav.events;
                if ($r < $0X.rows[0].cells.length && $r >= 0 && DayPilotCalendar.movingShadow.column !== $r) {
                    DayPilotCalendar.movingShadow.column = $r;
                    DayPilotCalendar.moveShadow($0X.rows[0].cells[$r]);
                }
            };
            if (DayPilotCalendar.drag) {
                if (DayPilotCalendar.gShadow) {
                    document.body.removeChild(DayPilotCalendar.gShadow);
                };
                DayPilotCalendar.gShadow = null;
                if (!DayPilotCalendar.movingShadow && $c.coords) {
                    var $M = $c.$4h(DayPilotCalendar.drag, false, DayPilotCalendar.drag.shadowType);
                    if ($M) {
                        DayPilotCalendar.movingShadow = $M;
                        var $0E = new DayPilot.Date().getDatePart();
                        var ev = {
                            'value': DayPilotCalendar.drag.id,
                            'start': $0E,
                            'end': $0E.addSeconds(DayPilotCalendar.drag.duration),
                            'text': DayPilotCalendar.drag.text
                        };
                        var event = new DayPilot.Event(ev, $c);
                        event.external = true;
                        DayPilot.Global.moving = {};
                        DayPilot.Global.moving.event = event;
                        DayPilot.Global.moving.helper = {};
                    }
                };
                ev.cancelBubble = true;
            }
        };
        this.temp = {};
        this.temp.getPosition = function() {
            var $2p = $c.$5M.getCellCoords();
            if (!$2p) {
                return null;
            };
            var $r = $c.columnsBottom[$2p.x];
            var $f = {};
            $f.resource = $r.id;
            $f.start = new DayPilot.Date($r.start).addHours($c.$4n(true)).addMinutes($2p.y * $c.cellDuration);
            $f.end = $f.start.addMinutes($c.cellDuration);
            return $f;
        };
        this.$5M = {};
        this.$5M.getCellCoords = function() {
            var $v = {};
            $v.x = 0;
            $v.y = 0;
            if (!$c.coords) {
                return null;
            };
            var $H = $c.nav.main;
            var $2q = $c.coords.x;
            var i = 0;
            var $1J = this.col($H, i);
            while ($1J && $2q > $1J.left) {
                i += 1;
                $1J = this.col($H, i);
            };
            $v.x = i - 1;
            var $J = 0;
            var $1Q = Math.floor(($c.coords.y - $J) / $c.cellHeight);
            $v.y = $1Q;
            if ($v.x < 0) {
                return null;
            };
            return $v;
        };
        this.$5M.col = function($1W, x) {
            var $v = {};
            $v.left = 0;
            $v.width = 0;
            var $f = $1W.rows[0].cells[x];
            if (!$f) {
                return null;
            };
            var t = DayPilot.abs($1W);
            var c = DayPilot.abs($f);
            $v.left = c.x - t.x;
            $v.width = $f.offsetWidth;
            return $v;
        };
        this.$5L = function() {
            this.$3T();
            if (!this.elements.crosshair) {
                this.elements.crosshair = [];
            };
            var $2r = this.$5M.getCellCoords();
            if (!$2r) {
                return;
            };
            var $r = $2r.x;
            var y = Math.floor($2r.y / (60 / $c.cellDuration) * (60 / $c.timeHeaderCellDuration));
            if (y < 0) {
                return;
            };
            if (this.nav.hourTable) {
                if (y >= this.nav.hourTable.rows.length) {
                    return;
                };
                var $2s = document.createElement("div");
                $2s.style.position = "absolute";
                $2s.style.left = "0px";
                $2s.style.right = "0px";
                $2s.style.top = "0px";
                $2s.style.bottom = "0px";
                $2s.style.opacity = .5;
                $2s.style.backgroundColor = this.crosshairColor;
                $2s.style.opacity = this.crosshairOpacity / 100;
                $2s.style.filter = "alpha(opacity=" + this.crosshairOpacity + ")";
                this.nav.hourTable.rows[y].cells[0].firstChild.appendChild($2s);
                this.elements.crosshair.push($2s);
            };
            if (this.nav.header) {
                var $2t = document.createElement("div");
                $2t.style.position = "absolute";
                $2t.style.left = "0px";
                $2t.style.right = "0px";
                $2t.style.top = "0px";
                $2t.style.bottom = "0px";
                $2t.style.opacity = .5;
                $2t.style.backgroundColor = this.crosshairColor;
                $2t.style.opacity = this.crosshairOpacity / 100;
                $2t.style.filter = "alpha(opacity=" + this.crosshairOpacity + ")";
                var $1Q = this.nav.header.rows[this.headerLevels - 1];
                if ($1Q.cells[$r]) {
                    $1Q.cells[$r].firstChild.appendChild($2t);
                    this.elements.crosshair.push($2t);
                }
            };
            if (this.crosshairType === "Header") {
                return;
            };
            var $2u = this.nav.crosshair;
            var $J = 0;
            var top = Math.floor((($c.coords.y - $J)) / $c.cellHeight) * $c.cellHeight + $J;
            var $L = $c.cellHeight;
            var $2v = document.createElement("div");
            $2v.style.position = "absolute";
            $2v.style.left = "0px";
            $2v.style.right = "0px";
            $2v.style.top = top + "px";
            $2v.style.height = $L + "px";
            $2v.style.backgroundColor = this.crosshairColor;
            $2v.style.opacity = this.crosshairOpacity / 100;
            $2v.style.filter = "alpha(opacity=" + this.crosshairOpacity + ")";
            $2v.onmousedown = this.$5N;
            $2u.appendChild($2v);
            this.elements.crosshair.push($2v);
            var $1J = this.$5M.col(this.nav.main, $r);
            $L = this.nav.main.clientHeight;
            if ($1J) {
                var $2w = document.createElement("div");
                $2w.style.position = "absolute";
                $2w.style.left = $1J.left + "px";
                $2w.style.width = $1J.width + "px";
                $2w.style.top = "0px";
                $2w.style.height = $L + "px";
                $2w.style.backgroundColor = this.crosshairColor;
                $2w.style.opacity = this.crosshairOpacity / 100;
                $2w.style.filter = "alpha(opacity=" + this.crosshairOpacity + ")";
                $2w.onmousedown = this.$5N;
                $2u.appendChild($2w);
                this.elements.crosshair.push($2w);
            }
        };
        this.$5N = function(ev) {
            $c.$3T();
            var $2r = $c.$5M.getCellCoords();
            var $2x = 0;
            var $f = $c.nav.main.rows[$2r.y + $2x].cells[$2r.x];
            $c.$4P.apply($f, [ev]);
        };
        this.$3T = function() {
            if (!this.elements.crosshair || this.elements.crosshair.length === 0) {
                return;
            };
            for (var i = 0; i < this.elements.crosshair.length; i++) {
                var e = this.elements.crosshair[i];
                if (e && e.parentNode) {
                    e.parentNode.removeChild(e);
                }
            };
            this.elements.crosshair = [];
        };
        this.$40 = function() {
            if (!this.cellConfig) {
                return;
            };
            var $2y = this.cellConfig;
            if ($2y.vertical) {
                for (var x = 0; x < $2y.x; x++) {
                    var $2z = this.cellProperties[x + "_0"];
                    for (var y = 1; y < $2y.y; y++) {
                        this.cellProperties[x + "_" + y] = $2z;
                    }
                }
            };
            if ($2y.horizontal) {
                for (var y = 0; y < $2y.y; y++) {
                    var $2z = this.cellProperties["0_" + y];
                    for (var x = 1; x < $2y.x; x++) {
                        this.cellProperties[x + "_" + y] = $2z;
                    }
                }
            };
            if ($2y["default"]) {
                var $2z = $2y["default"];
                for (var y = 0; y < $2y.y; y++) {
                    for (var x = 0; x < $2y.x; x++) {
                        if (!this.cellProperties[x + "_" + y]) {
                            this.cellProperties[x + "_" + y] = $2z;
                        }
                    }
                }
            }
        };
        this.$5J = function(x, y) {
            if (!this.cellProperties) {
                return null;
            };
            return this.cellProperties[x + "_" + y];
        };
        this.$5O = function(x, y) {
            var $2d = x + '_' + y;
            if (this.cellProperties && this.cellProperties[$2d]) {
                return this.cellProperties[$2d].business;
            };
            return false;
        };
        this.$5K = function(x, y) {
            var $2d = x + '_' + y;
            if (this.cellProperties && this.cellProperties[$2d]) {
                return this.cellProperties[$2d].backColor;
            };
            return null;
        };
        this.$3O = function() {
            var $1W = this.nav.header;
            if ($1W && $1W.rows) {
                for (var y = 0; y < $1W.rows.length; y++) {
                    var r = $1W.rows[y];
                    for (var x = 0; x < r.cells.length; x++) {
                        var c = r.cells[x];
                        c.onclick = null;
                        c.onmousemove = null;
                        c.onmouseout = null;
                    }
                }
            };
            if (!this.fasterDispose) DayPilot.pu($1W);
        };
        this.$5P = function($1a, $1Y) {
            var r = ($1Y) ? this.nav.header.insertRow(-1) : this.nav.header.rows[$1a - 1];
            var $0K = this.$5e($1a);
            var $2A = $0K.length;
            var $2B = ($1a === $c.headerLevels);
            for (var i = 0; i < $2A; i++) {
                var $h = $0K[i];
                if ($c.$4g()) {
                    if (typeof $c.onBeforeHeaderRender === 'function') {
                        var $n = {};
                        $n.header = {};
                        DayPilot.Util.copyProps($h, $n.header, ['id', 'start', 'name', 'html', 'backColor', 'toolTip', 'areas', 'children']);
                        this.onBeforeHeaderRender($n);
                        DayPilot.Util.copyProps($n.header, $h, ['html', 'backColor', 'toolTip', 'areas']);
                    }
                };
                var $2C = $h.getChildren ? true : false;
                var $f = ($1Y) ? r.insertCell(-1) : r.cells[i];
                $f.data = $h;
                if ($2B) {} else {
                    var $2D = 1;
                    if ($2C) {
                        $2D = $h.getChildrenCount($c.headerLevels - $1a + 1);
                    };
                    $f.colSpan = $2D;
                };
                if ($2C) {
                    $f.onclick = this.$4x;
                    $f.onmousemove = this.$4y;
                    $f.onmouseout = this.$4z;
                    if ($h.toolTip) {
                        $f.title = $h.toolTip;
                    }
                };
                $f.style.overflow = 'hidden';
                $f.style.padding = '0px';
                $f.style.border = '0px none';
                $f.style.height = ($0d.headerHeight()) + "px";
                if (!this.cssOnly) {
                    $f.style.borderLeft = "0px none";
                    if (i !== $2A - 1) {
                        $f.style.borderRight = "1px solid " + this.borderColor;
                    }
                };
                var $d = ($1Y) ? document.createElement("div") : $f.firstChild;
                var $1O = this.columnWidthSpec === 'Fixed';
                if ($1O && $2B) {
                    $d.style.width = this.columnWidth + "px";
                };
                if ($1Y) {
                    $d.setAttribute("unselectable", "on");
                    $d.style.MozUserSelect = 'none';
                    $d.style.KhtmlUserSelect = 'none';
                    $d.style.WebkitUserSelect = 'none';
                    $d.style.position = 'relative';
                    $d.style.height = $0d.headerHeight() + "px";
                    if (!this.cssOnly) {
                        $d.className = $c.$4i('colheader');
                        $d.style.cursor = 'default';
                        $d.style.fontFamily = this.headerFontFamily;
                        $d.style.fontSize = this.headerFontSize;
                        $d.style.color = this.headerFontColor;
                        $d.style.backgroundColor = $h.backColor;
                        $d.style.textAlign = 'center';
                        var $22 = document.createElement("div");
                        $22.style.position = 'absolute';
                        $22.style.left = '0px';
                        $22.style.right = '0px';
                        $22.style.top = "0px";
                        $22.style.bottom = "0px";
                        $22.style.padding = "2px";
                        $22.setAttribute("unselectable", "on");
                        if ($1a !== 1) {
                            $22.style.borderTop = '1px solid ' + this.borderColor;
                        };
                        if (this.headerClickHandling !== "Disabled") {
                            $22.style.cursor = 'pointer';
                        };
                        $d.appendChild($22);
                    } else {
                        $d.className = $c.$4i('_colheader');
                        var $N = document.createElement("div");
                        $N.className = $c.$4i('_colheader_inner');
                        if ($h.backColor) {
                            $N.style.background = $h.backColor;
                        };
                        $d.appendChild($N);
                    };
                    $f.appendChild($d);
                } else {
                    $d.style.height = $0d.headerHeight() + "px";
                };
                this.$5Q($d, $h);
                if ($2C) {
                    $d.firstChild.innerHTML = $h.html;
                }
            }
        };
        this.$5Q = function($d, $h) {
            var $2E = [];
            for (var j = 0; j < $d.childNodes.length; j++) {
                var $s = $d.childNodes[j];
                if ($s.isActiveArea) {
                    $2E.push($s);
                }
            };
            for (var j = 0; j < $2E.length; j++) {
                var $s = $2E[j];
                DayPilot.de($s);
            };
            if ($h.areas) {
                var $2F = $h.areas;
                for (var j = 0; j < $2F.length; j++) {
                    var $1H = $2F[j];
                    if ($1H.v !== 'Visible') {
                        continue;
                    };
                    var o = new DayPilotCalendar.Column($h.id, $h.name, $h.start);
                    var a = DayPilot.Areas.createArea($d, o, $1H);
                    $d.appendChild(a);
                }
            }
        };
        this.$43 = function() {
            if (!this.showHeader) {
                return;
            };
            var $1j = this.nav.header;
            var $1Y = true;
            var $0K = this.$5e($c.headerLevels, true);
            var $2A = $0K.length;
            if (this.headerCreated && $1j && $1j.rows && $1j.rows.length > 0) {
                $1Y = $1j.rows[$1j.rows.length - 1].cells.length !== $2A;
            };
            if (this.headerCreated && $c.$3C.ielt9 && $1Y) {
                DayPilot.de(this.nav.header);
                this.$5G();
            }
            while (this.headerCreated && $1j && $1j.rows && $1j.rows.length > 0 && $1Y) {
                if (!this.fasterDispose) DayPilot.pu($1j.rows[0]);
                $1j.deleteRow(0);
            };
            this.headerCreated = true;
            var $S = $c.cornerHTML || $c.cornerHtml;
            if (!$1Y) {
                var $28 = $c.nav.corner;
                if ($28) {
                    if (!this.cssOnly) {
                        if ($c.cornerBackColor) {
                            $28.style.backgroundColor = $c.cornerBackColor;
                        } else {
                            $28.style.backgroundColor = $c.hourBackColor;
                        }
                    };
                    if (!this.fasterDispose) DayPilot.pu($28.firstChild);
                    $28.firstChild.innerHTML = $S ? $S : '';
                }
            };
            for (var i = 0; i < $c.headerLevels; i++) {
                this.$5P(i + 1, $1Y);
            };
            if (!this.showAllDayEvents) {
                return;
            };
            var r = ($1Y) ? this.nav.header.insertRow(-1) : this.nav.header.rows[$c.headerLevels];
            for (var i = 0; i < $2A; i++) {
                var $h = $0K[i];
                var $f = ($1Y) ? r.insertCell(-1) : r.cells[i];
                $f.data = $h;
                $f.style.padding = '0px';
                $f.style.border = '0px none';
                $f.style.overflow = 'hidden';
                if (!this.cssOnly) {
                    $f.style.lineHeight = '1.2';
                };
                var $d = ($1Y) ? document.createElement("div") : $f.firstChild;
                if ($1Y) {
                    $d.setAttribute("unselectable", "on");
                    $d.style.MozUserSelect = 'none';
                    $d.style.KhtmlUserSelect = 'none';
                    $d.style.WebkitUserSelect = 'none';
                    $d.style.overflow = 'hidden';
                    $d.style.position = "relative";
                    $d.style.height = $0d.allDayHeaderHeight() + "px";
                    if (!this.cssOnly) {
                        $d.className = this.$4i("alldayheader");
                        $d.style.textAlign = 'center';
                        $d.style.backgroundColor = $h.backColor;
                        $d.style.cursor = 'default';
                        var $22 = document.createElement("div");
                        $22.style.position = "absolute";
                        $22.style.left = '0px';
                        $22.style.right = '0px';
                        $22.style.top = "0px";
                        $22.style.bottom = "0px";
                        $22.setAttribute("unselectable", "on");
                        $22.style.borderTop = '1px solid ' + this.borderColor;
                        $d.appendChild($22);
                        if ($c.rtl) {
                            if (i === $2A - 1) {
                                $22.style.borderLeft = "1px solid " + $h.backColor;
                            } else {
                                $22.style.borderLeft = "1px solid " + this.borderColor;
                            }
                        } else {
                            if (i !== $2A - 1) {
                                $22.style.borderRight = "1px solid " + this.borderColor;
                            }
                        }
                    } else {
                        $d.className = this.$4i("_alldayheader");
                        var $N = document.createElement("div");
                        $N.className = this.$4i("_alldayheader_inner");
                        $d.appendChild($N);
                    };
                    $f.appendChild($d);
                };
                $d.style.height = $0d.allDayHeaderHeight() + "px";
            }
        };
        this.$3H = function() {
            if (this.loadingLabelVisible) {
                this.nav.loading.innerHTML = this.loadingLabelText;
                this.nav.loading.style.top = (this.$4o() + 5) + "px";
                this.nav.loading.style.display = '';
            }
        };
        this.$3W = function() {
            if (this.callbackTimeout) {
                window.clearTimeout(this.callbackTimeout);
            };
            this.nav.loading.style.display = 'none';
        };
        this.$5R = function() {
            var $2G = this.nav.scroll;
            if (!this.initScrollPos) return;
            $2G.root = this;
            $2G.onscroll = this.$4U;
            if ($2G.scrollTop === 0) {
                $2G.scrollTop = this.initScrollPos - this.$4V();
            } else {
                this.$4U();
            }
        };
        this.onCallbackError = function($v, $w) {
            alert("Error!\r\nResult: " + $v + "\r\nContext:" + $w);
        };
        this.scrollbarVisible = this.$5E;
        this.$4a = function() {
            var $2H = this.$5E();
            var $19 = !!this.nav.cornerRight;
            if ($2H !== $19) {
                if ($2H) {
                    this.$5H();
                } else {
                    if (this.nav.fullHeader && this.nav.fullHeader.rows[0].cells.length === 3) {
                        var c = this.nav.fullHeader.rows[0].cells[2];
                        if (c.parentNode) {
                            c.parentNode.removeChild(c);
                        }
                    };
                    this.nav.cornerRight = null;
                }
            };
            var d = this.nav.cornerRight;
            if (!d) {
                return;
            };
            var w = DayPilot.sw(this.nav.scroll);
            if (!this.cssOnly) {
                if (w >= 3) {
                    d.style.width = (w - 3) + 'px';
                }
            } else {
                if (d) {
                    d.style.width = (w) + 'px';
                }
            };
            return w;
        };
        this.$4f = function($2I) {
            if ($2I) {
                this.autoRefreshEnabled = true;
            };
            if (!this.autoRefreshEnabled) {
                return;
            };
            if (this.autoRefreshCount >= this.autoRefreshMaxCount) {
                return;
            };
            this.$3L();
            var $2J = this.autoRefreshInterval;
            if (!$2J || $2J < 10) {
                throw "The minimum autoRefreshInterval is 10 seconds";
            };
            this.autoRefreshTimeout = window.setTimeout(function() {
                $c.$5S();
            }, this.autoRefreshInterval * 1000);
        };
        this.$3L = function() {
            if (this.autoRefreshTimeout) {
                window.clearTimeout(this.autoRefreshTimeout);
            }
        };
        this.$5S = function() {
            if (!DayPilot.Global.resizing && !DayPilot.Global.moving && !DayPilotCalendar.drag && !DayPilotCalendar.selecting) {
                this.autoRefreshCount++;
                this.commandCallBack(this.autoRefreshCommand);
            };
            if (this.autoRefreshCount < this.autoRefreshMaxCount) {
                this.autoRefreshTimeout = window.setTimeout(function() {
                    $c.$5S();
                }, this.autoRefreshInterval * 1000);
            }
        };
        this.$3P = function() {
            if ($c.heightSpec === "Parent100Pct") {
                $c.setHeight(parseInt($c.nav.top.clientHeight, 10));
            };
            $c.$49();
            $c.$4e();
        };
        this.$5T = function() {
            if (!DayPilotCalendar.globalHandlers) {
                DayPilotCalendar.globalHandlers = true;
                DayPilot.re(document, 'mousemove', DayPilotCalendar.gMouseMove);
                DayPilot.re(document, 'mouseup', DayPilotCalendar.gMouseUp);
            };
            DayPilot.re(window, 'resize', this.$3P);
        };
        this.$5l = function(ev) {
            ev = ev || window.event;
            var $0B = ev.which || ev.button;
            if (typeof(DayPilotBubble) !== 'undefined') {
                DayPilotBubble.hideActive();
            };
            if ((this.style.cursor === 'n-resize' || this.style.cursor === 's-resize') && $0B === 1) {
                DayPilot.Global.resizing = this;
                DayPilotCalendar.originalMouse = DayPilot.mc(ev);
                DayPilotCalendar.originalHeight = this.offsetHeight;
                DayPilotCalendar.originalTop = this.offsetTop;
                $c.nav.top.style.cursor = this.style.cursor;
            } else if ((this.style.cursor === 'move' || $c.moveBy === 'Full') && $0B === 1) {
                DayPilot.Global.moving = this;
                var $2K = DayPilot.Global.moving.helper = {};
                $2K.oldColumn = $c.columnsBottom[this.event.part.dayIndex].id;
                DayPilotCalendar.originalMouse = DayPilot.mc(ev);
                DayPilotCalendar.originalTop = this.offsetTop;
                var $0M = DayPilot.mo3(this, ev);
                if ($0M) {
                    DayPilotCalendar.moveOffsetY = $0M.y;
                } else {
                    DayPilotCalendar.moveOffsetY = 0;
                };
                $c.nav.top.style.cursor = this.style.cursor;
            };
            return false;
        };
        this.$5U = function(i) {
            var $1x = this.$3B.events;
            var $h = this.events.list[i];
            var $2L = {};
            for (var name in $h) {
                $2L[name] = $h[name];
            };
            if (typeof this.onBeforeEventRender === 'function') {
                var $n = {};
                $n.e = $2L;
                this.onBeforeEventRender($n);
            };
            $1x[i] = $2L;
        };
        this.$5m = {};
        var $2M = $c.$5m;
        $2M.active = false;
        $2M.start = null;
        $2M.timeout = null;
        $2M.startcell = null;
        this.$5m.getCellCoords = function(x, y) {
            var $2N = DayPilot.abs($c.nav.main);
            var $2O = {
                x: x - $2N.x,
                y: y - $2N.y
            };
            var w = ($c.nav.main.clientWidth / $c.columnsBottom.length);
            var $2p = {
                x: Math.floor($2O.x / w),
                y: Math.floor($2O.y / $c.cellHeight),
                toString: function() {
                    return "x: " + this.x + " y:" + this.y;
                }
            };
            return $2p;
        };
        this.$5m.startSelecting = function($2p) {
            var $f = $c.nav.main.rows[$2p.y].cells[$2p.x];
            $2M.startcell = $2p;
            $c.clearSelection();
            DayPilotCalendar.column = DayPilotCalendar.getColumn($f);
            $c.selectedCells.push($f);
            DayPilotCalendar.firstSelected = $f;
            DayPilotCalendar.topSelectedCell = $f;
            DayPilotCalendar.bottomSelectedCell = $f;
            $c.$4Q();
        };
        this.$5m.extendSelection = function($2p) {
            var $f = $c.nav.main.rows[$2p.y].cells[$2p.x];
            $c.clearSelection();
            if ($2p.y < $2M.startcell.y) {
                $c.selectedCells = DayPilotCalendar.getCellsBelow($f);
                DayPilotCalendar.topSelectedCell = $c.selectedCells[0];
                DayPilotCalendar.bottomSelectedCell = DayPilotCalendar.firstSelected;
            } else {
                $c.selectedCells = DayPilotCalendar.getCellsAbove($f);
                DayPilotCalendar.topSelectedCell = DayPilotCalendar.firstSelected;
                DayPilotCalendar.bottomSelectedCell = $c.selectedCells[0];
            };
            $c.$4Q();
        };
        this.$5m.onCellTouchStart = function(ev) {
            if ($2M.active) {
                return;
            };
            var x = ev.touches[0].pageX;
            var y = ev.touches[0].pageY;
            var $2p = $2M.getCellCoords(x, y);
            var $2P = 500;
            $2M.timeout = window.setTimeout(function() {
                $2M.active = true;
                $2M.startSelecting($2p);
            }, $2P);
        };
        this.$5m.onCellTouchMove = function(ev) {
            if (!$2M.active) {
                window.clearTimeout($2M.timeout);
                return;
            };
            ev.preventDefault();
            if (!ev.touches[0]) {
                return;
            };
            var x = ev.touches[0].pageX;
            var y = ev.touches[0].pageY;
            var $2p = $2M.getCellCoords(x, y);
            $2M.extendSelection($2p);
        };
        this.$5m.onCellTouchEnd = function(ev) {
            if (!$2M.active) {
                window.clearTimeout($2M.timeout);
                return;
            };
            ev.preventDefault();
            $2M.startcell = null;
            var $0J = $c.getSelection();
            $0J.toString = function() {
                return "start: " + this.start + "\nend: " + this.end;
            };
            $c.$4K($0J.start, $0J.end, $0J.resource);
            window.setTimeout(function() {
                $2M.active = false;
            }, 500);
        };
        this.$5m.startMoving = function($d, $2p) {
            DayPilot.Global.moving = $d;
            var $2K = DayPilot.Global.moving.helper = {};
            $2K.oldColumn = $c.columnsBottom[$d.event.part.dayIndex].id;
            DayPilotCalendar.originalMouse = $2p;
            DayPilotCalendar.originalTop = this.offsetTop;
            var $2N = DayPilot.abs($d);
            DayPilotCalendar.moveOffsetY = $2p.y - $2N.y;
            if (!DayPilotCalendar.movingShadow) {
                DayPilotCalendar.movingShadow = $c.$4h(DayPilot.Global.moving, !$c.$3C.ie, $c.shadow);
                DayPilotCalendar.movingShadow.style.width = (DayPilotCalendar.movingShadow.parentNode.offsetWidth + 1) + 'px';
            }
        };
        this.$5m.updateMoving = function($2p) {
            var $2k = $c.cellHeight;
            var $J = 0;
            var $0M = DayPilotCalendar.moveOffsetY;
            if (!$0M) {
                $0M = $2k / 2;
            };
            var $2n = Math.floor((($2p.y - $0M - $J) + $2k / 2) / $2k) * $2k + $J;
            if ($2n < $J) {
                $2n = $J;
            };
            var $H = $c.nav.main;
            var $O = $H.clientHeight;
            var $L = parseInt(DayPilotCalendar.movingShadow.style.height);
            if ($2n + $L > $O) {
                $2n = $O - $L;
            };
            DayPilotCalendar.movingShadow.style.top = $2n + 'px';
            var $I = $H.clientWidth / $H.rows[0].cells.length;
            var $r = Math.floor($2p.x / $I);
            if ($r < 0) {
                $r = 0;
            };
            var $0X = $c.nav.events;
            if ($r < $0X.rows[0].cells.length && $r >= 0 && DayPilotCalendar.movingShadow.column !== $r) {
                DayPilotCalendar.movingShadow.column = $r;
                DayPilotCalendar.moveShadow($0X.rows[0].cells[$r]);
            }
        };
        this.$5m.onEventTouchStart = function(ev) {
            if ($2M.active) {
                return;
            };
            $2M.preventEventTap = false;
            var $d = this;
            var x = ev.touches[0].pageX;
            var y = ev.touches[0].pageY;
            var $2p = {
                x: x,
                y: y,
                $d: this
            };
            var $2N = DayPilot.abs($c.nav.scrollable);
            $c.coords = {
                x: x - $2N.x,
                y: y - $2N.y
            };
            var $2P = 500;
            $2M.timeout = window.setTimeout(function() {
                $2M.active = true;
                $2M.startMoving($d, $2p);
            }, $2P);
        };
        this.$5m.onMainTouchMove = function(ev) {
            if ($2M.timeout) {
                window.clearTimeout($c.$5m.timeout);
            };
            if (DayPilot.Global.moving) {
                ev.preventDefault();
                var x = ev.touches[0].pageX;
                var y = ev.touches[0].pageY;
                var $2N = DayPilot.abs($c.nav.main);
                var $2p = {
                    x: x - $2N.x,
                    y: y - $2N.y
                };
                $2M.updateMoving($2p);
                return;
            };
            $2M.preventEventTap = true;
        };
        this.$5m.onMainTouchEnd = function(ev) {
            if (DayPilot.Global.moving) {
                $2M.active = false;
                ev.preventDefault();
                var top = DayPilotCalendar.movingShadow.offsetTop;
                DayPilotCalendar.deleteShadow(DayPilotCalendar.movingShadow);
                var $2Q = DayPilot.Global.moving.event;
                var $0o = DayPilotCalendar.movingShadow.column;
                DayPilot.Global.moving = null;
                DayPilotCalendar.movingShadow = null;
                $2Q.calendar.$4E($2Q, $0o, top);
            }
        };
        this.$5m.onEventTouchMove = function(ev) {
            $2M.preventEventTap = true;
        };
        this.$5m.onEventTouchEnd = function(ev) {
            if (!$2M.active) {
                if ($2M.preventEventTap) {
                    return;
                };
                ev.preventDefault();
                $c.$4s(this, false);
                return;
            };
            $2M.active = false;
            if ($2M.timeout) {
                window.clearTimeout($c.$5m.timeout);
                return;
            }
        };
        this.$5j = function(ev) {
            var $2R = 5;
            var $2S = Math.max($c.durationBarWidth, 10);
            var w = 5;
            var $1j = ($c.moveBy === 'Top');
            if (typeof(DayPilotCalendar) === 'undefined') {
                return;
            };
            var $0M = DayPilot.mo3(this, ev);
            if (!$0M) {
                return;
            };
            var $d = this;
            if (!$d.active) {
                if ($c.cssOnly) {
                    DayPilot.Util.addClass($d, $c.$4i("_event_hover"));
                };
                DayPilot.Areas.showAreas($d, this.event);
            };
            if (DayPilot.Global.resizing || DayPilot.Global.moving) {
                return;
            };
            var $2T = this.isFirst;
            var $2U = this.isLast;
            if ($c.moveBy === "Disabled" || $c.moveBy === "None") {
                return;
            };
            if (!$1j && $0M.x <= $2S && this.event.client.moveEnabled()) {
                if ($2T) {
                    this.style.cursor = 'move';
                } else {
                    this.style.cursor = 'not-allowed';
                }
            } else if (!$1j && $0M.y <= $2R && this.event.client.resizeEnabled()) {
                if ($2T) {
                    this.style.cursor = "n-resize";
                    this.dpBorder = 'top';
                } else {
                    this.style.cursor = 'not-allowed';
                }
            } else if ($1j && $0M.y <= $2S && this.event.client.moveEnabled()) {
                this.style.cursor = "move";
            } else if (this.offsetHeight - $0M.y <= $2R && this.event.client.resizeEnabled()) {
                if ($2U) {
                    this.style.cursor = "s-resize";
                    this.dpBorder = 'bottom';
                } else {
                    this.style.cursor = 'not-allowed';
                }
            } else if (!DayPilot.Global.resizing && !DayPilot.Global.moving) {
                if (this.event.client.clickEnabled()) this.style.cursor = 'pointer';
                else this.style.cursor = 'default';
            };
            if (typeof(DayPilotBubble) !== 'undefined' && $c.bubble && $c.eventHoverHandling !== 'Disabled') {
                if (this.style.cursor === 'default' || this.style.cursor === 'pointer') {
                    var $2V = this.$5V && $0M.x === this.$5V.x && $0M.y === this.$5V.y;
                    if (!$2V) {
                        this.$5V = $0M;
                        $c.bubble.showEvent(this.event);
                    }
                } else {}
            }
        };
        this.$5k = function(ev) {
            if ($c.cssOnly) {
                DayPilot.Util.removeClass(this, $c.$4i("_event_hover"));
            };
            if ($c.bubble) {
                $c.bubble.hideOnMouseOut();
            };
            DayPilot.Areas.hideAreas(this, ev);
        };
        this.$41 = function($0X) {
            if (!$0X) {
                $0X = this.events.list;
            } else {
                this.events.list = $0X;
            };
            if (!$0X) {
                return;
            };
            this.allDay = {};
            this.allDay.events = [];
            this.allDay.lines = [];
            var length = $0X.length;
            var $K = this.$4k(true);
            this.$3B.pixels = {};
            var $2W = [];
            this.scrollLabels = [];
            this.minStart = 10000;
            this.maxEnd = 0;
            this.startDate = new DayPilot.Date(this.startDate);
            for (var i = 0; i < length; i++) {
                var e = $0X[i];
                e.start = new DayPilot.Date(e.start);
                e.end = new DayPilot.Date(e.end);
            };
            if (typeof this.onBeforeEventRender === 'function') {
                for (var i = 0; i < length; i++) {
                    this.$5U(i);
                }
            };
            var $2X = this.viewType === 'Resources';
            var $19 = this.$5f();
            var $2Y = $19.start;
            var $2Z = $19.end;
            for (var i = 0; i < this.columnsBottom.length; i++) {
                var scroll = {};
                scroll.minEnd = 1000000;
                scroll.maxStart = -1;
                this.scrollLabels.push(scroll);
                var $1J = this.columnsBottom[i];
                $1J.events = [];
                $1J.lines = [];
                $1J.blocks = [];
                var $30 = new DayPilot.Date($1J.start).addHours(this.$4n(true));
                var $31 = $30.getTime();
                var $32 = $30.addTime($K);
                var $33 = $32.getTime();
                if ($2X) {
                    $2Y = $30.getDatePart();
                    $2Z = $32.getDatePart();
                };
                for (var j = 0; j < length; j++) {
                    if ($2W[j]) {
                        continue;
                    };
                    var e = $0X[j];
                    var $08 = e.start;
                    var end = e.end;
                    var $34 = $08.getTime();
                    var $35 = end.getTime();
                    if ($35 < $34) {
                        continue;
                    };
                    if (e.allday) {
                        var $36 = false;
                        if ($c.allDayEnd === 'Date') {
                            $36 = !($35 < $2Y.getTime() || $34 >= $2Z.getTime());
                        } else {
                            $36 = !($35 <= $2Y.getTime() || $34 >= $2Z.getTime());
                        };
                        if ($2X) {
                            $36 = $36 && (e.resource === $1J.id || $1J.id === "*");
                        };
                        if ($36) {
                            var ep = new DayPilot.Event(e, this);
                            ep.part.start = $2Y.getTime() < $34 ? $08 : $2Y;
                            ep.part.end = $2Z.getTime() > $35 ? end : $2Z;
                            ep.part.colStart = DayPilot.Date.daysDiff($2Y.d, ep.part.start.d);
                            ep.part.colWidth = DayPilot.Date.daysSpan(ep.part.start.d, ep.part.end.d) + 1;
                            if ($2X) {
                                ep.part.colStart = i;
                                ep.part.colWidth = 1;
                            };
                            this.allDay.events.push(ep);
                            if (typeof this.onBeforeEventRender === 'function') {
                                ep.cache = this.$3B.events[j];
                            };
                            $2W[j] = true;
                            if ($2X && (ep.part.start.getTime() !== $34 || ep.part.end.getTime() !== $35)) {
                                $2W[j] = false;
                            }
                        };
                        continue;
                    };
                    var $36 = false;
                    if ($2X) {
                        $36 = ($1J.id === e.resource) && !($35 <= $31 || $34 >= $33);
                    } else {
                        $36 = !($35 <= $31 || $34 >= $33) || ($35 === $34 && $34 === $31);
                    };
                    if ($36) {
                        var ep = new DayPilot.Event(e, $c);
                        ep.part.dayIndex = i;
                        ep.part.start = $31 < $34 ? $08 : $30;
                        ep.part.end = $33 > $35 ? end : $32;
                        var $37 = this.$5W(ep.part.start, $1J.start);
                        var $38 = this.$5W(ep.part.end, $1J.start);
                        var top = $37.top;
                        var $14 = $38.top;
                        if (top === $14 && ($37.cut || $38.cut)) {
                            continue;
                        };
                        ep.part.box = $0d.useBox($35 - $34);
                        var $J = 0;
                        if (ep.part.box) {
                            var $39 = $38.boxBottom;
                            ep.part.top = Math.floor(top / this.cellHeight) * this.cellHeight + $J;
                            ep.part.height = Math.max(Math.ceil($39 / this.cellHeight) * this.cellHeight - ep.part.top, this.cellHeight - 1);
                            ep.part.barTop = Math.max(top - ep.part.top - 1, 0);
                            ep.part.barHeight = Math.max($14 - top - 2, 1);
                        } else {
                            ep.part.top = top + $J;
                            ep.part.height = Math.max($14 - top, 0);
                            ep.part.barTop = 0;
                            ep.part.barHeight = Math.max($14 - top - 2, 1);
                        };
                        var $08 = ep.part.top;
                        var end = ep.part.top + ep.part.height;
                        if ($08 > scroll.maxStart) {
                            scroll.maxStart = $08;
                        };
                        if (end < scroll.minEnd) {
                            scroll.minEnd = end;
                        };
                        if ($08 < this.minStart) {
                            this.minStart = $08;
                        };
                        if (end > this.maxEnd) {
                            this.maxEnd = end;
                        };
                        $1J.events.push(ep);
                        if (typeof this.onBeforeEventRender === 'function') {
                            ep.cache = this.$3B.events[j];
                        };
                        if (ep.part.start.getTime() === $34 && ep.part.end.getTime() === $35) {
                            $2W[j] = true;
                        }
                    }
                }
            };
            for (var i = 0; i < this.columnsBottom.length; i++) {
                var $1J = this.columnsBottom[i];
                $1J.events.sort(this.$5X);
                for (var j = 0; j < $1J.events.length; j++) {
                    var e = $1J.events[j];
                    $1J.putIntoBlock(e);
                };
                for (var j = 0; j < $1J.blocks.length; j++) {
                    var $1e = $1J.blocks[j];
                    $1e.events.sort(this.$5Y);
                    for (var k = 0; k < $1e.events.length; k++) {
                        var e = $1e.events[k];
                        $1e.putIntoLine(e);
                    }
                }
            };
            this.allDay.events.sort(this.$5Y);
            this.allDay.putIntoLine = function(ep) {
                var $1g = this;
                for (var i = 0; i < this.lines.length; i++) {
                    var $1h = this.lines[i];
                    if ($1h.isFree(ep.part.colStart, ep.part.colWidth)) {
                        $1h.push(ep);
                        return i;
                    }
                };
                var $1h = [];
                $1h.isFree = function($08, $1f) {
                    var end = $08 + $1f - 1;
                    var $O = this.length;
                    for (var i = 0; i < $O; i++) {
                        var e = this[i];
                        if (!(end < e.part.colStart || $08 > e.part.colStart + e.part.colWidth - 1)) {
                            return false;
                        }
                    };
                    return true;
                };
                $1h.push(ep);
                this.lines.push($1h);
                return this.lines.length - 1;
            };
            for (var i = 0; i < this.allDay.events.length; i++) {
                var e = this.allDay.events[i];
                this.allDay.putIntoLine(e);
            };
            var $3a = Math.max(this.allDay.lines.length, 1);
            this.$3B.allDayHeaderHeight = $3a * ($0d.allDayEventHeight() + 2) + 2;
        };
        this.$5X = function(a, b) {
            if (!a || !b || !a.start || !b.start) {
                return 0;
            };
            var $3b = a.start().ticks - b.start().ticks;
            if ($3b !== 0) {
                return $3b;
            };
            var $3c = b.end().ticks - a.end().ticks;
            return $3c;
        };
        this.$5Y = function(a, b) {
            if (!a || !b) {
                return 0;
            };
            if (!a.data || !b.data || !a.data.sort || !b.data.sort || a.data.sort.length === 0 || b.data.sort.length === 0) {
                return $c.$5X(a, b);
            };
            var $v = 0;
            var i = 0;
            while ($v === 0 && a.data.sort[i] && b.data.sort[i]) {
                if (a.data.sort[i] === b.data.sort[i]) {
                    $v = 0;
                } else {
                    $v = $c.$5Z(a.data.sort[i], b.data.sort[i], $c.sortDirections[i]);
                };
                i++;
            };
            return $v;
        };
        this.$5Z = function(a, b, $3d) {
            var $3e = ($3d !== "desc");
            var $3f = $3e ? -1 : 1;
            var $3g = -$3f;
            if (a === null && b === null) {
                return 0;
            };
            if (b === null) {
                return $3g;
            };
            if (a === null) {
                return $3f;
            };
            var ar = [];
            ar[0] = a;
            ar[1] = b;
            ar.sort();
            return a === ar[0] ? $3f : $3g;
        };
        this.$60 = function(e) {
            for (var i = 0; i < $c.elements.events.length; i++) {
                var $d = $c.elements.events[i];
                if ($d.event === e || $d.event.data === e.data) {
                    return $d;
                }
            };
            return null;
        };
        this.events.find = function(id) {
            var $2A = $c.events.list.length;
            for (var i = 0; i < $2A; i++) {
                if ($c.events.list[i].id === id) {
                    return new DayPilot.Event($c.events.list[i], $c);
                }
            };
            return null;
        };
        this.events.findRecurrent = function($3h, $09) {
            var $2A = $c.events.list.length;
            for (var i = 0; i < $2A; i++) {
                if ($c.events.list[i].recurrentMasterId === $3h && $c.events.list[i].start.getTime() === $09.getTime()) {
                    return new DayPilot.Event($c.events.list[i], $c);
                }
            };
            return null;
        };
        this.events.update = function(e, $h) {
            var $0c = {};
            $0c.oldEvent = new DayPilot.Event(e.copy(), $c);
            $0c.newEvent = new DayPilot.Event(e.temp(), $c);
            var $g = new DayPilot.Action($c, "EventUpdate", $0c, $h);
            e.commit();
            $c.update();
            return $g;
        };
        this.events.remove = function(e, $h) {
            var $0c = {};
            $0c.e = new DayPilot.Event(e.data, $c);
            var $g = new DayPilot.Action($c, "EventRemove", $0c, $h);
            var $2d = DayPilot.indexOf($c.events.list, e.data);
            $c.events.list.splice($2d, 1);
            $c.update();
            return $g;
        };
        this.events.add = function(e, $h) {
            e.calendar = $c;
            if (!$c.events.list) {
                $c.events.list = [];
            };
            $c.events.list.push(e.data);
            var $0c = {};
            $0c.e = e;
            var $g = new DayPilot.Action($c, "EventAdd", $0c, $h);
            $c.update();
            return $g;
        };
        this.queue = {};
        this.queue.list = [];
        this.queue.list.ignoreToJSON = true;
        this.queue.add = function($g) {
            if (!$g) {
                return;
            };
            if ($g.isAction) {
                $c.queue.list.push($g);
            } else {
                throw "DayPilot.Action object required for queue.add()";
            }
        };
        this.queue.notify = function($h) {
            var $0c = {};
            $0c.actions = $c.queue.list;
            $c.$3G('Notify', $0c, $h, "Notify");
            $c.queue.list = [];
        };
        this.queue.clear = function() {
            $c.queue.list = [];
        };
        this.queue.pop = function() {
            return $c.queue.list.pop();
        };
        this.update = function() {
            if (!this.columnsBottom) {
                return;
            };
            var $3i = true;
            if ($3i) {
                $c.$3M();
                this.$61();
                this.$3Z();
                this.$41();
                $c.$43();
                $c.$44();
                $c.$45();
                $c.$46();
                $c.$3D();
                $c.$47();
                $c.$4Q();
                $c.$48();
                $c.$49();
                $c.$4a();
                this.$4c();
                this.$4d();
                $c.$4e();
            } else {
                $c.$3M();
                $c.$41();
                $c.$42();
                $c.$4c();
                $c.$4d();
                $c.$4e();
            }
        };
        this.show = function() {
            $c.nav.top.style.display = '';
            $c.$4a();
        };
        this.hide = function() {
            $c.nav.top.style.display = 'none';
        };
        this.debug = new DayPilot.Debug(this);
        this.$62 = function($3j, $3k) {
            if (!this.debuggingEnabled) {
                return;
            };
            if (!$c.debugMessages) {
                $c.debugMessages = [];
            };
            $c.debugMessages.push($3j);
            if (typeof console !== 'undefined') {
                console.log($3j);
            }
        };
        this.$5W = function($0t, $08) {
            if (!$08) $08 = this.startDate;
            var $34 = $08.getTime();
            var $3l = $0t.getTime();
            var $1x = this.$3B.pixels[$3l + "_" + $34];
            if ($1x) {
                return $1x;
            };
            $34 = $08.addHours(this.$4n(true)).getTime();
            var $3m = this.cellDuration * 60 * 1000;
            var $3n = $3l - $34;
            var $3o = $3n % $3m;
            var $3p = $3n - $3o;
            var $3q = $3p + $3m;
            if ($3o === 0) {
                $3q = $3p;
            };
            var $v = {};
            $v.cut = false;
            $v.top = this.$63($3n);
            $v.boxTop = this.$63($3p);
            $v.boxBottom = this.$63($3q);
            this.$3B.pixels[$3l + "_" + $34] = $v;
            return $v;
        };
        this.$63 = function($3l) {
            return Math.floor((this.cellHeight * $3l) / (1000 * 60 * this.cellDuration));
        };
        this.$61 = function() {
            this.startDate = new DayPilot.Date(this.startDate);
            this.allDayHeaderHeight = $0d.allDayEventHeight() + 4;
        };
        this.$42 = function() {
            var $1j = this.$4o();
            var $3r = this.$5p();
            if (this.nav.corner) {
                this.nav.corner.style.height = $1j + "px";
            };
            if (this.nav.cornerRight) {
                this.nav.cornerRight.style.height = $1j + "px";
            };
            if (this.nav.mid) {
                this.nav.mid.style.height = $1j + "px";
            };
            if (this.showAllDayEvents && this.nav.header) {
                var $1Q = this.nav.header.rows[this.nav.header.rows.length - 1];
                for (var i = 0; i < $1Q.cells.length; i++) {
                    var $r = $1Q.cells[i];
                    $r.firstChild.style.height = $0d.allDayHeaderHeight() + "px";
                }
            };
            if (this.nav.upperRight) {
                this.nav.upperRight.style.height = $1j + "px";
            };
            this.nav.scroll.style.top = $1j + "px";
            this.nav.top.style.height = $3r + "px";
        };
        this.$49 = function() {
            var sh = this.$5q();
            if (this.nav.scroll && sh > 0) {
                this.nav.scroll.style.height = sh + "px";
                this.scrollHeight = $c.nav.scroll.clientHeight;
                if (this.nav.bottomLeft) {
                    this.nav.bottomLeft.style.height = sh + "px";
                };
                if (this.nav.bottomRight) {
                    this.nav.bottomRight.style.height = sh + "px";
                }
            };
            if (this.heightSpec === "Parent100Pct") {
                this.nav.top.style.height = "100%";
            } else {
                this.nav.top.style.height = this.$5p() + "px";
            }
        };
        this.setHeight = function($1w) {
            if (this.heightSpec !== "Parent100Pct") {
                this.heightSpec = "Fixed";
            };
            if (this.cssOnly) {
                this.height = $1w - (this.$4o());
            } else {
                this.height = $1w - (this.$4o() + 3);
            };
            this.$49();
        };
        this.$64 = function($3s) {
            var $d = document.createElement("div");
            $d.style.position = "absolute";
            $d.style.top = "-2000px";
            $d.style.left = "-2000px";
            $d.className = this.$4i($3s);
            document.body.appendChild($d);
            var $L = $d.offsetHeight;
            var $1f = $d.offsetWidth;
            document.body.removeChild($d);
            var $v = {};
            $v.height = $L;
            $v.width = $1f;
            return $v;
        };
        this.$5h = {};
        var $0d = this.$5h;
        $0d.locale = function() {
            return DayPilot.Locale.find($c.locale);
        };
        $0d.timeFormat = function() {
            if ($c.timeFormat !== 'Auto') {
                return $c.timeFormat;
            };
            return this.locale().timeFormat;
        };
        $0d.useBox = function($3t) {
            if ($c.useEventBoxes === 'Always') {
                return true;
            };
            if ($c.useEventBoxes === 'Never') {
                return false;
            };
            return $3t < $c.cellDuration * 60 * 1000;
        };
        $0d.notifyType = function() {
            var $l;
            if ($c.notifyCommit === 'Immediate') {
                $l = "Notify";
            } else if ($c.notifyCommit === 'Queue') {
                $l = "Queue";
            } else {
                throw "Invalid notifyCommit value: " + $c.notifyCommit;
            };
            return $l;
        };
        $0d.allDayEventHeight = function() {
            if ($c.$3B.allDayEventHeight) {
                return $c.$3B.allDayEventHeight;
            };
            var $L = $c.$64("_alldayevent_height").height;
            if (!$L) {
                $L = $c.allDayEventHeight;
            };
            $c.$3B.allDayEventHeight = $L;
            return $L;
        };
        $0d.allDayHeaderHeight = function() {
            if ($c.$3B.allDayHeaderHeight) {
                return $c.$3B.allDayHeaderHeight;
            };
            $L = $c.allDayHeaderHeight;
            $c.$3B.allDayHeaderHeight = $L;
            return $L;
        };
        $0d.headerHeight = function() {
            if ($c.$3B.headerHeight) {
                return $c.$3B.headerHeight;
            };
            var $L = $c.$64("_header_height").height;
            if (!$L) {
                $L = $c.headerHeight;
            };
            $c.$3B.headerHeight = $L;
            return $L;
        };
        this.$65 = function() {
            if (this.backendUrl || typeof WebForm_DoCallback === 'function') {
                return (typeof $c.events.list === 'undefined') || (!$c.events.list);
            } else {
                return false;
            }
        };
        this.$66 = function() {
            this.$61();
            this.$3Z();
            this.$5r();
            this.$43();
            this.$44();
            this.$47();
            this.$4a();
            this.$5R();
            this.$5T();
            this.$3Q();
            DayPilotCalendar.register(this);
            this.$3P();
            this.$4f();
            this.$3G('Init');
        };
        this.init = function() {
            this.nav.top = document.getElementById(id);
            if (this.nav.top.dp) {
                return;
            };
            var $3u = this.$65();
            if ($3u) {
                this.$66();
                this.initialized = true;
                return;
            };
            this.$61();
            this.$3Z();
            this.$40();
            if (this.events.list) {
                this.$41();
            };
            this.$5r();
            this.$43();
            this.$44();
            this.$47();
            this.$4b();
            this.$4a();
            this.$5R();
            this.$5T();
            this.$3Q();
            DayPilotCalendar.register(this);
            if (this.events.list) {
                this.$42();
                this.$4c();
                this.$4d();
            };
            this.$3P();
            if (this.messageHTML) {
                this.message(this.messageHTML);
            };
            this.$3X(null, false);
            this.$4f();
            this.initialized = true;
        };
        this.internal = {};
        this.internal.invokeEvent = this.$4B;
        this.internal.eventMenuClick = this.$4I;
        this.internal.timeRangeMenuClick = this.$4J;
        this.internal.bubbleCallBack = this.$4G;
        this.internal.findEventDiv = this.$60;
        this.internal.eventDeleteDispatch = this.$4A;
        this.Init = this.init;
    };
    var DayPilotCalendar = {};
    DayPilotCalendar.topSelectedCell = null;
    DayPilotCalendar.bottomSelectedCell = null;
    DayPilotCalendar.selecting = false;
    DayPilotCalendar.column = null;
    DayPilotCalendar.firstSelected = null;
    DayPilotCalendar.firstMousePos = null;
    DayPilotCalendar.originalMouse = null;
    DayPilotCalendar.originalHeight = null;
    DayPilotCalendar.originalTop = null;
    DayPilotCalendar.globalHandlers = false;
    DayPilotCalendar.editing = false;
    DayPilotCalendar.originalText = null;
    DayPilotCalendar.register = function($c) {
        if (!DayPilotCalendar.registered) {
            DayPilotCalendar.registered = [];
        };
        var r = DayPilotCalendar.registered;
        for (var i = 0; i < r.length; i++) {
            if (r[i] === $c) {
                return;
            }
        };
        r.push($c);
    };
    DayPilotCalendar.unregister = function($c) {
        var a = DayPilotCalendar.registered;
        if (a) {
            var i = DayPilot.indexOf(a, $c);
            if (i !== -1) {
                a.splice(i, 1);
            };
            if (a.length === 0) {
                a = null;
            }
        };
        if (!a) {
            DayPilot.ue(document, 'mousemove', DayPilotCalendar.gMouseMove);
            DayPilot.ue(document, 'mouseup', DayPilotCalendar.gMouseUp);
            DayPilotCalendar.globalHandlers = false;
        }
    };
    DayPilotCalendar.getCellsAbove = function($f) {
        var $t = [];
        var c = DayPilotCalendar.getColumn($f);
        var tr = $f.parentNode;
        var $3v = null;
        while (tr && $3v !== DayPilotCalendar.firstSelected) {
            $3v = tr.getElementsByTagName("td")[c];
            $t.push($3v);
            tr = tr.previousSibling;
            while (tr && tr.tagName !== "TR") {
                tr = tr.previousSibling;
            }
        };
        return $t;
    };
    DayPilotCalendar.getCellsBelow = function($f) {
        var $t = [];
        var c = DayPilotCalendar.getColumn($f);
        var tr = $f.parentNode;
        var $3v = null;
        while (tr && $3v !== DayPilotCalendar.firstSelected) {
            $3v = tr.getElementsByTagName("td")[c];
            $t.push($3v);
            tr = tr.nextSibling;
            while (tr && tr.tagName !== "TR") {
                tr = tr.nextSibling;
            }
        };
        return $t;
    };
    DayPilotCalendar.getColumn = function($f) {
        var i = 0;
        while ($f.previousSibling) {
            $f = $f.previousSibling;
            if ($f.tagName === "TD") {
                i++;
            }
        };
        return i;
    };
    DayPilotCalendar.getShadowColumn = function($F) {
        if (!$F) {
            return null;
        };
        var $0T = $F.parentNode;
        while ($0T && $0T.tagName !== "TD") {
            $0T = $0T.parentNode;
        };
        return $0T;
    };
    DayPilotCalendar.gMouseMove = function(ev) {
        if (typeof(DayPilotCalendar) === 'undefined') {
            return;
        };
        if (ev.insideMainD) {
            return;
        } else if (ev.srcElement) {
            if (ev.srcElement.inside) {
                return;
            }
        };
        var $0F = DayPilot.mc(ev);
        if (DayPilotCalendar.drag) {
            document.body.style.cursor = 'move';
            if (!DayPilotCalendar.gShadow) {
                DayPilotCalendar.gShadow = DayPilotCalendar.createGShadow(DayPilotCalendar.drag.shadowType);
            };
            var $M = DayPilotCalendar.gShadow;
            $M.style.left = $0F.x + 'px';
            $M.style.top = $0F.y + 'px';
            DayPilot.Global.moving = null;
            DayPilotCalendar.deleteShadow(DayPilotCalendar.movingShadow);
            DayPilotCalendar.movingShadow = null;
        };
        for (var i = 0; i < DayPilotCalendar.registered.length; i++) {
            if (DayPilotCalendar.registered[i].$3S) {
                DayPilotCalendar.registered[i].$3S();
            }
        }
    };
    DayPilotCalendar.gUnload = function(ev) {
        if (!DayPilotCalendar.registered) {
            return;
        };
        var r = DayPilotCalendar.registered;
        for (var i = 0; i < r.length; i++) {
            var c = r[i];
            DayPilotCalendar.unregister(c);
        }
    };
    DayPilotCalendar.gMouseUp = function(e) {
        var e = e || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        };
        e.cancelBubble = true;
        if (e.stopPropagation) {
            e.stopPropagation();
        };
        if (DayPilot.Global.resizing) {
            if (!DayPilotCalendar.resizingShadow) {
                DayPilot.Global.resizing.style.cursor = 'default';
                DayPilot.Global.resizing.event.calendar.nav.top.style.cursor = 'auto';
                DayPilot.Global.resizing = null;
                return;
            };
            var $2Q = DayPilot.Global.resizing.event;
            var $0g = DayPilot.Global.resizing.dpBorder;
            var $L = DayPilotCalendar.resizingShadow.clientHeight;
            var top = DayPilotCalendar.resizingShadow.offsetTop;
            DayPilotCalendar.deleteShadow(DayPilotCalendar.resizingShadow);
            DayPilotCalendar.resizingShadow = null;
            DayPilot.Global.resizing.style.cursor = 'default';
            $2Q.calendar.nav.top.style.cursor = 'auto';
            DayPilot.Global.resizing.onclick = null;
            DayPilot.Global.resizing = null;
            if ($2Q.calendar.overlap) {
                return;
            };
            $2Q.calendar.$4C($2Q, $L, top, $0g);
        } else if (DayPilot.Global.moving) {
            if (!DayPilotCalendar.movingShadow) {
                DayPilot.Global.moving.event.calendar.nav.top.style.cursor = 'auto';
                DayPilot.Global.moving = null;
                return;
            };
            var $3w = DayPilot.Global.moving.helper.oldColumn;
            var top = DayPilotCalendar.movingShadow.offsetTop;
            DayPilotCalendar.deleteShadow(DayPilotCalendar.movingShadow);
            var $2Q = DayPilot.Global.moving.event;
            var $0o = DayPilotCalendar.movingShadow.column;
            var $0p = DayPilotCalendar.drag;
            DayPilot.Global.moving.event.calendar.nav.top.style.cursor = 'auto';
            DayPilot.Global.moving = null;
            DayPilotCalendar.movingShadow = null;
            if ($0p) {
                if (!$2Q.calendar.todo) {
                    $2Q.calendar.todo = {};
                };
                $2Q.calendar.todo.del = $0p.element;
            };
            if ($2Q.calendar.overlap) {
                return;
            };
            var ev = e || window.event;
            $2Q.calendar.$4E($2Q, $0o, top, ev, $0p);
        };
        if (DayPilotCalendar.drag) {
            DayPilotCalendar.drag = null;
            document.body.style.cursor = '';
        };
        if (DayPilotCalendar.gShadow) {
            document.body.removeChild(DayPilotCalendar.gShadow);
            DayPilotCalendar.gShadow = null;
        };
        DayPilotCalendar.moveOffsetY = null;
    };
    DayPilotCalendar.dragStart = function(element, $K, id, $22, $l) {
        DayPilot.us(element);
        var $0p = DayPilotCalendar.drag = {};
        $0p.element = element;
        $0p.duration = $K;
        $0p.text = $22;
        $0p.id = id;
        $0p.shadowType = $l ? $l : 'Fill';
        return false;
    };
    DayPilotCalendar.deleteShadow = function($M) {
        if (!$M) {
            return;
        };
        if (!$M.parentNode) {
            return;
        };
        $M.parentNode.removeChild($M);
    };
    DayPilotCalendar.createGShadow = function($l) {
        var $M = document.createElement('div');
        $M.setAttribute('unselectable', 'on');
        $M.style.position = 'absolute';
        $M.style.width = '100px';
        $M.style.height = '20px';
        $M.style.border = '2px dotted #666666';
        $M.style.zIndex = 101;
        if ($l === 'Fill') {
            $M.style.backgroundColor = "#aaaaaa";
            $M.style.opacity = 0.5;
            $M.style.filter = "alpha(opacity=50)";
            $M.style.border = '2px solid #aaaaaa';
        };
        document.body.appendChild($M);
        return $M;
    };
    DayPilotCalendar.moveShadow = function($r) {
        var $M = DayPilotCalendar.movingShadow;
        $M.parentNode.removeChild($M);
        $r.firstChild.appendChild($M);
        $M.style.left = '0px';
        $M.style.width = (DayPilotCalendar.movingShadow.parentNode.offsetWidth) + 'px';
    };
    DayPilotCalendar.Column = function($3x, name, $0t) {
        this.value = $3x;
        this.id = $3x;
        this.name = name;
        this.date = new DayPilot.Date($0t);
    };
    DayPilot.CalendarVisible.dragStart = DayPilotCalendar.dragStart;
    DayPilot.CalendarVisible.Calendar = DayPilotCalendar.Calendar;
    if (typeof jQuery !== 'undefined') {
        (function($) {
            $.fn.daypilotCalendar = function($3y) {
                var $0D = null;
                var j = this.each(function() {
                    if (this.daypilot) {
                        return;
                    };
                    var $3z = new DayPilot.Calendar(this.id);
                    this.daypilot = $3z;
                    for (var name in $3y) {
                        $3z[name] = $3y[name];
                    };
                    $3z.Init();
                    if (!$0D) {
                        $0D = $3z;
                    }
                });
                if (this.length === 1) {
                    return $0D;
                } else {
                    return j;
                }
            };
        })(jQuery);
    };
    if (typeof Sys !== 'undefined' && Sys.Application && Sys.Application.notifyScriptLoaded) {
        Sys.Application.notifyScriptLoaded();
    }
})();


if (typeof DayPilot === 'undefined') {
    var DayPilot = {};
};
if (typeof DayPilot.Global === 'undefined') {
    DayPilot.Global = {};
};
(function() {
    if (typeof DayPilot.DatePicker !== 'undefined') {
        return;
    };
    DayPilot.DatePicker = function($a) {
        this.v = '710';
        var $b = "navigator_" + new Date().getTime();
        var $c = this;
        this.prepare = function() {
            this.locale = "en-us";
            this.target = null;
            this.resetTarget = true;
            this.pattern = this.$m.locale().datePattern;
            this.cssClassPrefix = null;
            this.theme = null;
            this.patterns = [];
            if ($a) {
                for (var name in $a) {
                    this[name] = $a[name];
                }
            };
            this.init();
        };
        this.init = function() {
            this.date = new DayPilot.Date(this.date);
            var $d = this.$n();
            if (this.resetTarget && !$d) {
                this.$o(this.date);
            }
        };
        this.close = function() {
            if (this.navigator) {
                this.navigator.dispose();
            };
            this.div.innerHTML = '';
            if (this.div && this.div.parentNode === document.body) {
                document.body.removeChild(this.div);
            }
        };
        this.$n = function() {
            var element = this.$p();
            if (!element) {
                return this.date;
            };
            var $d = null;
            if (element.tagName === "INPUT") {
                $d = element.value;
            } else {
                $d = element.innerText;
            };
            if (!$d) {
                return null;
            };
            var $e = DayPilot.Date.parse($d, $c.pattern);
            for (var i = 0; i < $c.patterns.length; i++) {
                if ($e) {
                    return $e;
                };
                $e = DayPilot.Date.parse($d, $c.patterns[i]);
            };
            return $e;
        };
        this.$o = function($e) {
            var element = this.$p();
            if (!element) {
                return;
            };
            var $d = $e.toString($c.pattern, $c.locale);
            if (element.tagName === "INPUT") {
                element.value = $d;
            } else {
                element.innerHTML = $d;
            }
        };
        this.$m = {};
        this.$m.locale = function() {
            return DayPilot.Locale.find($c.locale);
        };
        this.$p = function() {
            var id = this.target;
            var element = (id && id.nodeType && id.nodeType === 1) ? id : document.getElementById(id);
            return element;
        };
        this.show = function() {
            var element = this.$p();
            var navigator = this.navigator;
            var navigator = new DayPilot.Navigator($b);
            navigator.api = 2;
            navigator.cssOnly = true;
            navigator.cssClassPrefix = $c.cssClassPrefix;
            navigator.theme = $c.theme;
            navigator.weekStarts = "Auto";
            navigator.locale = $c.locale;
            navigator.onTimeRangeSelected = function($f) {
                $c.date = $f.start;
                var $g = $f.start;
                var $d = $g.toString($c.pattern, $c.locale);
                var $f = {};
                $f.start = $g;
                $f.date = $g;
                $f.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onTimeRangeSelect === 'function') {
                    $c.onTimeRangeSelect($f);
                    if ($f.preventDefault.value) {
                        return;
                    }
                };
                $c.$o($d);
                $c.close();
                if (typeof $c.onTimeRangeSelected === 'function') {
                    $c.onTimeRangeSelected($f);
                }
            };
            this.navigator = navigator;
            var $h = DayPilot.abs(element);
            var $i = element.offsetHeight;
            var $j = document.createElement("div");
            $j.style.position = "absolute";
            $j.style.left = $h.x + "px";
            $j.style.top = ($h.y + $i) + "px";
            var $k = document.createElement("div");
            $k.id = $b;
            $j.appendChild($k);
            document.body.appendChild($j);
            this.div = $j;
            var $l = $c.$n() || new DayPilot.Date().getDatePart();
            navigator.startDate = $l;
            navigator.selectionStart = $l;
            navigator.init();
        };
        this.prepare();
    };
})();

if (typeof DayPilot === 'undefined') {
    var DayPilot = {};
};
if (typeof DayPilot.Global === 'undefined') {
    DayPilot.Global = {};
};
if (typeof DayPilotMenu === 'undefined') {
    var DayPilotMenu = DayPilot.MenuVisible = {};
};
(function() {
    if (typeof DayPilot.Menu !== 'undefined') {
        return;
    };
    (function registerDefaultTheme() {
        if (DayPilot.Global.defaultMenuCss) {
            return;
        };
        var $a = DayPilot.sheet();
        $a.add(".menu_default_main", "font-family: Tahoma, Arial, Sans-Serif;font-size: 12px;border: 1px solid #dddddd;background-color: white;padding: 0px;cursor: default;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAABCAIAAABG0om7AAAAKXRFWHRDcmVhdGlvbiBUaW1lAHBvIDEwIDUgMjAxMCAyMjozMzo1OSArMDEwMGzy7+IAAAAHdElNRQfaBQoUJAesj4VUAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAABGdBTUEAALGPC/xhBQAAABVJREFUeNpj/P//PwO1weMnT2RlZAAYuwX/4oA3BgAAAABJRU5ErkJggg==);background-repeat: repeat-y;border-radius: 5px;-moz-box-shadow:0px 2px 3px rgba(000,000,000,0.3),inset 0px 0px 2px rgba(255,255,255,0.8);-webkit-box-shadow:0px 2px 3px rgba(000,000,000,0.3),inset 0px 0px 2px rgba(255,255,255,0.8);box-shadow:0px 2px 3px rgba(000,000,000,0.3),inset 0px 0px 2px rgba(255,255,255,0.8);");
        $a.add(".menu_default_title", "background-color: #f2f2f2;border-bottom: 1px solid gray;padding: 4px 4px 4px 37px;");
        $a.add(".menu_default_main a", "padding: 2px 2px 2px 35px;color: black;text-decoration: none;cursor: default;");
        $a.add(".menu_default_main a img", "margin-left: 6px;margin-top: 2px;");
        $a.add(".menu_default_main a span", "display: block;height: 20px;line-height: 20px;width: 150px; overflow:hidden;padding-left: 2px;padding-right: 20px;");
        $a.add(".menu_default_main a:hover", 'background: #eeeeee;background: -webkit-gradient(linear, left top, left bottom, from(#efefef), to(#e6e6e6));background: -webkit-linear-gradient(top, #efefef 0%, #e6e6e6);background: -moz-linear-gradient(top, #efefef 0%, #e6e6e6);background: -ms-linear-gradient(top, #efefef 0%, #e6e6e6);background: -o-linear-gradient(top, #efefef 0%, #e6e6e6);background: linear-gradient(top, #efefef 0%, #e6e6e6);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#efefef", endColorStr="#e6e6e6");');
        $a.add(".menu_default_main div div", "border-top: 1px solid #dddddd;margin-top: 2px;margin-bottom: 2px;margin-left: 28px;");
        $a.commit();
        DayPilot.Global.defaultMenuCss = true;
    })();
    var DayPilotMenu = {};
    DayPilotMenu.mouse = null;
    DayPilotMenu.menu = null;
    DayPilotMenu.clickRegistered = false;
    DayPilot.Menu = function($b) {
        var $c = this;
        this.v = '710';
        this.zIndex = 10;
        this.useShadow = true;
        this.cssClassPrefix = "menu_default";
        this.cssOnly = true;
        this.menuTitle = null;
        this.showMenuTitle = false;
        this.ref = null;
        if ($b && DayPilot.isArray($b)) {
            this.items = $b;
        };
        this.show = function(e, $d) {
            var $e = null;
            if (typeof e.id === 'string' || typeof e.id === 'number') {
                $e = e.id;
            } else if (typeof e.id === 'function') {
                $e = e.id();
            } else if (typeof e.value === 'function') {
                $e = e.value();
            };
            if (typeof(DayPilot.Bubble) !== 'undefined') {
                DayPilot.Bubble.hideActive();
            };
            if (!$d) {
                DayPilotMenu.menuClean();
            };
            this.submenu = null;
            if (DayPilotMenu.mouse === null) return;
            var $f = document.createElement("div");
            $f.style.position = "absolute";
            $f.style.top = "0px";
            $f.style.left = "0px";
            $f.style.display = 'none';
            $f.style.overflow = 'hidden';
            $f.style.zIndex = this.zIndex + 1;
            $f.className = this.applyCssClass('main');
            $f.onclick = function() {
                this.parentNode.removeChild(this);
            };
            if (!this.items || this.items.length === 0) {
                throw "No menu items defined.";
            };
            if (this.showMenuTitle) {
                var title = document.createElement("div");
                title.innerHTML = this.menuTitle;
                title.className = this.applyCssClass("title");
                $f.appendChild(title);
            };
            for (var i = 0; i < this.items.length; i++) {
                var mi = this.items[i];
                var $g = document.createElement("div");
                if (typeof mi === 'undefined') {
                    continue;
                };
                if (mi.text === '-') {
                    var $h = document.createElement("div");
                    $g.appendChild($h);
                } else {
                    var $i = document.createElement("a");
                    $i.style.position = 'relative';
                    $i.style.display = "block";
                    if (mi.href) {
                        $i.href = mi.href.replace(/\x7B0\x7D/gim, $e);
                        if (mi.target) {
                            $i.setAttribute("target", mi.target);
                        }
                    } else if (mi.onclick) {
                        $i.item = mi;
                        $i.onclick = mi.onclick;
                    } else if (mi.command) {
                        var $j = function(mi, $i) {
                            return function() {
                                var $k = $i.source;
                                var $g = mi;
                                $g.action = $g.action ? $g.action : 'CallBack';
                                var $l = $k.calendar || $k.root;
                                switch ($k.type) {
                                    case 'resource':
                                        $l.internal.resourceHeaderMenuClick($g.command, $k, $g.action);
                                        return;
                                    case 'selection':
                                        $l.internal.timeRangeMenuClick($g.command, $k, $g.action);
                                        return;
                                    default:
                                        $l.internal.eventMenuClick($g.command, $k, $g.action);
                                        return;
                                }
                            };
                        };
                        $i.onclick = $j(mi, $i);
                    };
                    $i.source = e;
                    var $m = document.createElement("span");
                    $m.innerHTML = mi.text;
                    $i.appendChild($m);
                    if (mi.image) {
                        var $n = document.createElement("img");
                        $n.src = mi.image;
                        $n.style.position = 'absolute';
                        $n.style.top = '0px';
                        $n.style.left = '0px';
                        $i.appendChild($n);
                    };
                    var $o = function(mi, $i) {
                        return function() {
                            var $k = $i.source;
                            var $g = mi;
                            setTimeout(function() {
                                if ($c.submenu && $c.submenu.item === $g) {
                                    return;
                                };
                                if ($c.submenu && $c.submenu.item !== $g) {
                                    $c.submenu.menu.hide();
                                    $c.submenu = null;
                                };
                                if (!$g.items) {
                                    return;
                                };
                                var $p = $c.cloneOptions();
                                $p.items = $g.items;
                                $c.submenu = {};
                                $c.submenu.menu = new DayPilot.Menu($p);
                                $c.submenu.menu.show($k, true);
                                $c.submenu.item = $g;
                            }, 500);
                        };
                    };
                    $i.onmouseover = $o(mi, $i);
                    $g.appendChild($i);
                };
                $f.appendChild($g);
            };
            $f.onclick = function(e) {
                window.setTimeout(function() {
                    DayPilotMenu.menuClean();
                }, 100);
            };
            $f.onmousedown = function(e) {
                if (!e) var e = window.event;
                e.cancelBubble = true;
                if (e.stopPropagation) e.stopPropagation();
            };
            $f.oncontextmenu = function() {
                return false;
            };
            document.body.appendChild($f);
            $f.style.display = '';
            var $q = $f.clientHeight;
            var $r = $f.offsetWidth;
            $f.style.display = 'none';
            var $s = document.documentElement.clientHeight;
            if (!this.ref) {
                var x = DayPilotMenu.mouse.x + 1;
                var y = DayPilotMenu.mouse.y + 1;
                if (DayPilotMenu.mouse.clientY > $s - $q && $s !== 0) {
                    var $t = DayPilotMenu.mouse.clientY - ($s - $q) + 5;
                    $f.style.top = (y - $t) + 'px';
                } else {
                    $f.style.top = y + 'px';
                };
                var $u = document.documentElement.clientWidth;
                if (DayPilotMenu.mouse.clientX > $u - $r && $u !== 0) {
                    var $v = DayPilotMenu.mouse.clientX - ($u - $r) + 5;
                    $f.style.left = (x - $v) + 'px';
                } else {
                    $f.style.left = x + 'px';
                }
            } else {
                var $w = DayPilot.abs(this.ref);
                var $q = this.ref.offsetHeight;
                $f.style.left = $w.x + "px";
                $f.style.top = ($w.y + $q) + "px";
            };
            $f.style.display = '';
            this.addShadow($f);
            this.div = $f;
            if (!$d) {
                DayPilot.Menu.active = this;
            };
            return;
        };
        this.applyCssClass = function($x) {
            var $y = this.theme || this.cssClassPrefix;
            var $z = (this.cssOnly ? "_" : "");
            if ($y) {
                return $y + $z + $x;
            } else {
                return "";
            }
        };
        this.cloneOptions = function() {
            var $p = {};
            var $A = ['cssOnly', 'cssClassPrefix', 'useShadow', 'zIndex'];
            for (var i = 0; i < $A.length; i++) {
                var p = $A[i];
                $p[p] = this[p];
            };
            return $p;
        };
        this.hide = function() {
            if (this.submenu) {
                this.submenu.menu.hide();
            };
            this.removeShadow();
            if (this.div && this.div.parentNode === document.body) {
                document.body.removeChild(this.div);
            }
        };
        this.init = function(ev) {
            DayPilotMenu.mouseMove(ev);
        };
        this.addShadow = function($B) {
            if (!this.useShadow || this.cssOnly) {
                return;
            };
            if (!$B) {
                return;
            };
            if (this.shadows && this.shadows.length > 0) {
                this.removeShadow();
            };
            this.shadows = [];
            for (var i = 0; i < 5; i++) {
                var $C = document.createElement('div');
                $C.style.position = 'absolute';
                $C.style.width = $B.offsetWidth + 'px';
                $C.style.height = $B.offsetHeight + 'px';
                $C.style.top = $B.offsetTop + i + 'px';
                $C.style.left = $B.offsetLeft + i + 'px';
                $C.style.zIndex = this.zIndex;
                $C.style.filter = 'alpha(opacity:10)';
                $C.style.opacity = 0.1;
                $C.style.backgroundColor = '#000000';
                document.body.appendChild($C);
                this.shadows.push($C);
            }
        };
        this.removeShadow = function() {
            if (!this.shadows) {
                return;
            };
            for (var i = 0; i < this.shadows.length; i++) {
                document.body.removeChild(this.shadows[i]);
            };
            this.shadows = [];
        };
        var $p = DayPilot.isArray($b) ? null : $b;
        if ($p) {
            for (var name in $p) {
                this[name] = $p[name];
            }
        };
        DayPilot.re(document.body, 'mousemove', DayPilotMenu.mouseMove);
        if (!DayPilotMenu.clickRegistered) {
            DayPilot.re(document, 'mousedown', DayPilotMenu.menuClean);
            DayPilotMenu.clickRegistered = true;
        }
    };
    DayPilotMenu.menuClean = function(ev) {
        if (typeof(DayPilot.Menu.active) === 'undefined') return;
        if (DayPilot.Menu.active) {
            DayPilot.Menu.active.hide();
            DayPilot.Menu.active = null;
        }
    };
    DayPilotMenu.mouseMove = function(ev) {
        if (typeof(DayPilotMenu) === 'undefined') return;
        DayPilotMenu.mouse = DayPilotMenu.mousePosition(ev);
    };
    DayPilotMenu.mousePosition = function(e) {
        var $D = 0;
        var $E = 0;
        if (!e) var e = window.event;
        if (e.pageX || e.pageY) {
            $D = e.pageX;
            $E = e.pageY;
        } else if (e.clientX || e.clientY) {
            $D = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            $E = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        };
        var $F = {};
        $F.x = $D;
        $F.y = $E;
        $F.clientY = e.clientY;
        $F.clientX = e.clientX;
        return $F;
    };
    DayPilot.MenuVisible.Menu = DayPilotMenu.Menu;
    if (typeof Sys !== 'undefined' && Sys.Application && Sys.Application.notifyScriptLoaded) {
        Sys.Application.notifyScriptLoaded();
    }
})();


if (typeof(DayPilot) === 'undefined') {
    DayPilot = {};
};
(function() {
    DayPilot.ModalStatic = {};
    DayPilot.ModalStatic.list = [];
    DayPilot.ModalStatic.hide = function() {
        if (this.list.length > 0) {
            var $a = this.list.pop();
            if ($a) {
                $a.hide();
            }
        }
    };
    DayPilot.ModalStatic.remove = function($b) {
        var $c = DayPilot.ModalStatic.list;
        for (var i = 0; i < $c.length; i++) {
            if ($c[i] === $b) {
                $c.splice(i, 1);
                return;
            }
        }
    };
    DayPilot.ModalStatic.close = function($d) {
        DayPilot.ModalStatic.result($d);
        DayPilot.ModalStatic.hide();
    };
    DayPilot.ModalStatic.result = function(r) {
        var $c = DayPilot.ModalStatic.list;
        if ($c.length > 0) {
            $c[$c.length - 1].result = r;
        }
    };
    DayPilot.ModalStatic.displayed = function($b) {
        var $c = DayPilot.ModalStatic.list;
        for (var i = 0; i < $c.length; i++) {
            if ($c[i] === $b) {
                return true;
            }
        };
        return false;
    };
    var $e = (navigator && navigator.userAgent && navigator.userAgent.indexOf("MSIE") !== -1);
    DayPilot.Modal = function() {
        this.autoStretch = true;
        this.autoStretchFirstLoadOnly = false;
        this.border = "10px solid #ccc";
        this.corners = 'Rounded';
        this.className = null;
        this.dragDrop = true;
        this.height = 200;
        this.maxHeight = null;
        this.opacity = 30;
        this.scrollWithPage = true;
        this.top = 20;
        this.useIframe = true;
        this.width = 500;
        this.zIndex = null;
        this.closed = null;
        var $f = this;
        this.id = '_' + new Date().getTime() + 'n' + (Math.random() * 10);
        this.registered = false;
        this.start = null;
        this.coords = null;
        this.showHtml = function($g) {
            if (DayPilot.ModalStatic.displayed(this)) {
                throw "This modal dialog is already displayed.";
            };
            if (!this.div) {
                this.create();
            };
            this.update();
            if (this.useIframe) {
                var $h = function(p, $i) {
                    return function() {
                        p.setInnerHTML(p.id + "iframe", $i);
                    };
                };
                window.setTimeout($h(this, $g), 0);
            } else {
                this.div.innerHTML = $g;
            };
            this.update();
            this.register();
        };
        this.rounded = function() {
            return this.corners && this.corners.toLowerCase() === 'rounded';
        };
        this.showUrl = function($j) {
            if (DayPilot.ModalStatic.displayed(this)) {
                throw "This modal dialog is already displayed.";
            };
            this.useIframe = true;
            if (!this.div) {
                this.create();
            };
            this.re(this.iframe, "load", this.onIframeLoad);
            this.iframe.src = $j;
            this.update();
            this.register();
        };
        this.update = function() {
            var $k = window;
            var $l = document;
            var scrollY = $k.pageYOffset ? $k.pageYOffset : (($l.documentElement && $l.documentElement.scrollTop) ? $l.documentElement.scrollTop : $l.body.scrollTop);
            var $m = function() {
                return $f.windowRect().y;
            };
            this.hideDiv.style.filter = "alpha(opacity=" + this.opacity + ")";
            this.hideDiv.style.opacity = "0." + this.opacity;
            this.hideDiv.style.backgroundColor = "black";
            if (this.zIndex) {
                this.hideDiv.style.zIndex = this.zIndex;
            };
            this.hideDiv.style.display = '';
            window.setTimeout(function() {
                $f.hideDiv.onclick = function() {
                    $f.hide();
                };
            }, 500);
            this.div.className = this.className;
            this.div.style.border = this.border;
            if (this.rounded()) {
                this.div.style.MozBorderRadius = "5px";
                this.div.style.webkitBorderRadius = "5px";
                this.div.style.borderRadius = "5px";
            };
            this.div.style.marginLeft = '-' + Math.floor(this.width / 2) + "px";
            this.div.style.position = 'absolute';
            this.div.style.top = (scrollY + this.top) + 'px';
            this.div.style.width = this.width + 'px';
            if (this.zIndex) {
                this.div.style.zIndex = this.zIndex;
            };
            if (this.height) {
                this.div.style.height = this.height + 'px';
            };
            if (this.useIframe && this.height) {
                this.iframe.style.height = (this.height) + 'px';
            };
            this.div.style.display = '';
            DayPilot.ModalStatic.list.push(this);
        };
        this.onIframeLoad = function() {
            $f.iframe.contentWindow.modal = $f;
            if ($f.autoStretch) {
                $f.stretch();
            }
        };
        this.stretch = function() {
            var $m = function() {
                return $f.windowRect().y;
            };
            var $n = this.maxHeight || $m() - 2 * this.top;
            for (var h = this.height; h < $n && this.hasScrollbar(); h += 10) {
                this.iframe.style.height = (h) + 'px';
                this.div.style.height = h + 'px';
            };
            if (this.autoStretchFirstLoadOnly) {
                this.ue(this.iframe, "load", this.onIframeLoad);
            }
        };
        this.hasScrollbar = function() {
            var document = this.iframe.contentWindow.document;
            var $o = document.compatMode === 'BackCompat' ? document.body : document.documentElement;
            var $p = $o.scrollHeight > $o.clientHeight;
            var $q = $o.scrollWidth > $o.clientWidth;
            return $p;
        };
        this.windowRect = function() {
            var $l = document;
            if ($l.compatMode === "CSS1Compat" && $l.documentElement && $l.documentElement.clientWidth) {
                var x = $l.documentElement.clientWidth;
                var y = $l.documentElement.clientHeight;
                return {
                    x: x,
                    y: y
                };
            } else {
                var x = $l.body.clientWidth;
                var y = $l.body.clientHeight;
                return {
                    x: x,
                    y: y
                };
            }
        };
        this.register = function() {
            if (this.registered) {
                return;
            };
            this.re(window, 'resize', this.resize);
            this.re(window, 'scroll', this.resize);
            if (this.dragDrop) {
                this.re(document, 'mousemove', this.drag);
                this.re(document, 'mouseup', this.drop);
            };
            this.registered = true;
        };
        this.drag = function(e) {
            if (!$f.coords) {
                return;
            };
            var e = e || window.event;
            var $r = $f.mc(e);
            var x = $r.x - $f.coords.x;
            var y = $r.y - $f.coords.y;
            $f.div.style.marginLeft = '0px';
            $f.div.style.top = ($f.start.y + y) + "px";
            $f.div.style.left = ($f.start.x + x) + "px";
        };
        this.drop = function(e) {
            if (!$f.coords) {
                return;
            };
            $f.unmaskIframe();
            $f.coords = null;
        };
        this.maskIframe = function() {
            if (!this.useIframe) {
                return;
            };
            var $s = 80;
            var $t = document.createElement("div");
            $t.style.backgroundColor = "#ffffff";
            $t.style.filter = "alpha(opacity=" + $s + ")";
            $t.style.opacity = "0." + $s;
            $t.style.width = "100%";
            $t.style.height = this.height + "px";
            $t.style.position = "absolute";
            $t.style.left = '0px';
            $t.style.top = '0px';
            this.div.appendChild($t);
            this.mask = $t;
        };
        this.unmaskIframe = function() {
            if (!this.useIframe) {
                return;
            };
            this.div.removeChild(this.mask);
            this.mask = null;
        };
        this.resize = function() {
            if (!$f.hideDiv) {
                return;
            };
            if (!$f.div) {
                return;
            };
            if ($f.hideDiv.style.display === 'none') {
                return;
            };
            if ($f.div.style.display === 'none') {
                return;
            };
            var scrollY = window.pageYOffset ? window.pageYOffset : ((document.documentElement && document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop);
            if (!$f.scrollWithPage) {
                $f.div.style.top = (scrollY + $f.top) + 'px';
            }
        };
        this.re = function(el, ev, $u) {
            if (el.addEventListener) {
                el.addEventListener(ev, $u, false);
            } else if (el.attachEvent) {
                el.attachEvent("on" + ev, $u);
            }
        };
        this.ue = function(el, ev, $u) {
            if (el.removeEventListener) {
                el.removeEventListener(ev, $u, false);
            } else if (el.detachEvent) {
                el.detachEvent("on" + ev, $u);
            }
        };
        this.mc = function(ev) {
            if (ev.pageX || ev.pageY) {
                return {
                    x: ev.pageX,
                    y: ev.pageY
                };
            };
            return {
                x: ev.clientX + document.documentElement.scrollLeft,
                y: ev.clientY + document.documentElement.scrollTop
            };
        };
        this.abs = function(element) {
            var r = {
                x: element.offsetLeft,
                y: element.offsetTop
            };
            while (element.offsetParent) {
                element = element.offsetParent;
                r.x += element.offsetLeft;
                r.y += element.offsetTop;
            };
            return r;
        };
        this.create = function() {
            var $v = document.createElement("div");
            $v.id = this.id + "hide";
            $v.style.position = 'fixed';
            $v.style.left = "0px";
            $v.style.top = "0px";
            $v.style.right = "0px";
            $v.style.bottom = "0px";
            $v.style.backgroundColor = "black";
            $v.style.opacity = 0.50;
            $v.oncontextmenu = function() {
                return false;
            };
            document.body.appendChild($v);
            var $w = document.createElement("div");
            $w.id = this.id + 'popup';
            $w.style.position = 'fixed';
            $w.style.left = '50%';
            $w.style.top = '0px';
            $w.style.backgroundColor = 'white';
            $w.style.width = "50px";
            $w.style.height = "50px";
            if (this.dragDrop) {
                $w.onmousedown = this.dragStart;
            };
            var $x = 50;
            var $y = null;
            if (this.useIframe) {
                $y = document.createElement("iframe");
                $y.id = this.id + "iframe";
                $y.name = this.id + "iframe";
                $y.frameBorder = '0';
                $y.style.width = '100%';
                $y.style.height = $x + 'px';
                $w.appendChild($y);
            };
            document.body.appendChild($w);
            this.div = $w;
            this.iframe = $y;
            this.hideDiv = $v;
        };
        this.dragStart = function(e) {
            $f.maskIframe();
            $f.coords = $f.mc(e || window.event);
            $f.start = {
                x: $f.div.offsetLeft,
                y: $f.div.offsetTop
            };
        };
        this.setInnerHTML = function(id, $i) {
            var $z = window.frames[id];
            var $l = $z.contentWindow || $z.document || $z.contentDocument;
            if ($l.document) {
                $l = $l.document;
            };
            $l.body.innerHTML = $i;
        };
        this.close = function($d) {
            this.result = $d;
            this.hide();
        };
        this.hide = function() {
            if (this.div) {
                this.div.style.display = 'none';
                this.hideDiv.style.display = 'none';
                if (!this.useIframe) {
                    this.div.innerHTML = null;
                }
            };
            DayPilot.ModalStatic.remove(this);
            if (this.closed) {
                this.closed();
            }
        };
    };
})();


if (typeof DayPilot === 'undefined') {
    var DayPilot = {};
};
if (typeof DayPilot.Global === 'undefined') {
    DayPilot.Global = {};
};
if (typeof DayPilotMonth === 'undefined') {
    var DayPilotMonth = DayPilot.MonthVisible = {};
};
(function() {
    var $a = function() {};
    if (typeof DayPilot.Month !== 'undefined') {
        return;
    };
    (function() {
        if (DayPilot.Global.defaultMonthCss) {
            return;
        };
        var $b = DayPilot.sheet();
        $b.add(".month_default_main", "border: 1px solid #aaa;font-family: Tahoma, Arial, sans-serif; font-size: 12px;color: #666;");
        $b.add(".month_default_cell_inner", "border-right: 1px solid #ddd;border-bottom: 1px solid #ddd;position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;background-color: #f9f9f9;");
        $b.add(".month_default_cell_business .month_default_cell_inner", "background-color: #fff;");
        $b.add(".month_default_cell_header", "text-align: right;padding-right: 2px;");
        $b.add(".month_default_header_inner", 'text-align: center; vertical-align: middle;position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #999;border-bottom: 1px solid #999;cursor: default;color: #666;background: #eee;');
        $b.add(".month_default_message", 'padding: 10px;opacity: 0.9;filter: alpha(opacity=90);color: #ffffff;background: #ffa216;background: -webkit-gradient(linear, left top, left bottom, from(#ffa216), to(#ff8400));background: -webkit-linear-gradient(top, #ffa216 0%, #ff8400);background: -moz-linear-gradient(top, #ffa216 0%, #ff8400);background: -ms-linear-gradient(top, #ffa216 0%, #ff8400);background: -o-linear-gradient(top, #ffa216 0%, #ff8400);background: linear-gradient(top, #ffa216 0%, #ff8400);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffa216", endColorStr="#ff8400");');
        $b.add(".month_default_event_inner", 'position: absolute;top: 0px;bottom: 0px;left: 1px;right: 1px;overflow:hidden;padding: 2px;padding-left: 5px;font-size: 12px;color: #666;background: #fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");border: 1px solid #999;border-radius: 0px;');
        $b.add(".month_default_event_continueright .month_default_event_inner", "border-top-right-radius: 0px;border-bottom-right-radius: 0px;border-right-style: dotted;");
        $b.add(".month_default_event_continueleft .month_default_event_inner", "border-top-left-radius: 0px;border-bottom-left-radius: 0px;border-left-style: dotted;");
        $b.add(".month_default_event_hover .month_default_event_inner", 'background: #fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#e8e8e8));background: -webkit-linear-gradient(top, #ffffff 0%, #e8e8e8);background: -moz-linear-gradient(top, #ffffff 0%, #e8e8e8);background: -ms-linear-gradient(top, #ffffff 0%, #e8e8e8);background: -o-linear-gradient(top, #ffffff 0%, #e8e8e8);background: linear-gradient(top, #ffffff 0%, #e8e8e8);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#e8e8e8");');
        $b.add(".month_default_selected .month_default_event_inner, .month_default_event_hover.month_default_selected .month_default_event_inner", "background: #ddd;");
        $b.add(".month_default_shadow_inner", "background-color: #666666;opacity: 0.5;filter: alpha(opacity=50);height: 100%;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 5px;");
        $b.commit();
        DayPilot.Global.defaultMonthCss = true;
    })();
    var DayPilotMonth = {};
    DayPilot.Month = function($c) {
        this.v = '710';
        this.nav = {};
        this.nav.top = document.getElementById($c);
        var $d = this;
        this.id = $c;
        this.isMonth = true;
        this.api = 2;
        this.hideUntilInit = true;
        this.startDate = new DayPilot.Date();
        this.width = '100%';
        this.cssClassPrefix = "month_default";
        this.cellHeight = 100;
        this.cellMarginBottom = 0;
        this.allowMultiSelect = true;
        this.autoRefreshCommand = 'refresh';
        this.autoRefreshEnabled = false;
        this.autoRefreshInterval = 60;
        this.autoRefreshMaxCount = 20;
        this.doubleClickTimeout = 300;
        this.eventFontColor = "#000000";
        this.eventFontFamily = "Tahoma";
        this.eventFontSize = "11px";
        this.headerBackColor = '#ECE9D8';
        this.headerFontColor = '#000000';
        this.headerFontFamily = "Tahoma";
        this.headerFontSize = "10pt";
        this.headerHeight = 20;
        this.heightSpec = "Auto";
        this.weekStarts = 1;
        this.innerBorderColor = '#cccccc';
        this.borderColor = 'black';
        this.eventHeight = 25;
        this.cellHeaderHeight = 16;
        this.numberFormat = "0.00";
        this.clientState = {};
        this.afterRender = function() {};
        this.backColor = '#FFFFD5';
        this.nonBusinessBackColor = '#FFF4BC';
        this.cellHeaderBackColor = '';
        this.cellHeaderFontColor = '#000000';
        this.cellHeaderFontFamily = 'Tahoma';
        this.cellHeaderFontSize = '10pt';
        this.cssOnly = true;
        this.eventBackColor = 'White';
        this.eventBorderColor = 'Black';
        this.eventCorners = "Regular";
        this.eventFontColor = '#000000';
        this.eventFontFamily = 'Tahoma';
        this.eventFontSize = '11px';
        this.cellWidth = 14.285;
        this.lineSpace = 1;
        this.locale = "en-us";
        this.messageHideAfter = 5000;
        this.notifyCommit = 'Immediate';
        this.eventMoveToPosition = false;
        this.eventTextLayer = 'Top';
        this.eventStartTime = true;
        this.eventEndTime = true;
        this.eventTextAlignment = 'Center';
        this.eventTextLeftIndent = 20;
        this.showWeekend = true;
        this.cellMode = false;
        this.shadowType = "Fill";
        this.eventTimeFontColor = 'gray';
        this.eventTimeFontFamily = 'Tahoma';
        this.eventTimeFontSize = '8pt';
        this.viewType = 'Month';
        this.weeks = 1;
        this.eventClickHandling = 'Enabled';
        this.eventDoubleClickHandling = 'Enabled';
        this.eventMoveHandling = 'Update';
        this.eventResizeHandling = 'Update';
        this.eventRightClickHandling = 'ContextMenu';
        this.eventSelectHandling = 'Update';
        this.headerClickHandling = "Enabled";
        this.timeRangeSelectedHandling = 'Enabled';
        this.timeRangeDoubleClickHandling = 'Enabled';
        this.backendUrl = null;
        this.cellEvents = [];
        this.elements = {};
        this.elements.events = [];
        this.$1I = {};
        this.$1I.events = {};
        this.events = {};
        this.autoRefreshCount = 0;
        this.$1J = function($e, $f) {
            var $e = eval("(" + $e + ")");
            if ($e.BubbleGuid) {
                var $g = $e.BubbleGuid;
                var $h = this.bubbles[$g];
                delete this.bubbles[$g];
                $d.$1K();
                if (typeof $e.Result.BubbleHTML !== 'undefined') {
                    $h.updateView($e.Result.BubbleHTML, $h);
                };
                return;
            };
            if ($e.CallBackRedirect) {
                document.location.href = $e.CallBackRedirect;
                return;
            };
            if (typeof $e.ClientState !== 'undefined') {
                $d.clientState = $e.ClientState;
            };
            if ($e.UpdateType === "None") {
                $d.$1L($e.CallBackData, true);
                if ($e.Message) {
                    $d.message($e.Message);
                };
                return;
            };
            if ($e.VsUpdate) {
                var $i = document.createElement("input");
                $i.type = 'hidden';
                $i.name = $d.id + "_vsupdate";
                $i.id = $i.name;
                $i.value = $e.VsUpdate;
                $d.vsph.innerHTML = '';
                $d.vsph.appendChild($i);
            };
            $d.events.list = $e.Events;
            if (typeof $e.TagFields !== 'undefined') {
                $d.tagFields = $e.TagFields;
            };
            if (typeof $e.SortDirections !== 'undefined') {
                $d.sortDirections = $e.SortDirections;
            };
            if ($e.UpdateType === "Full") {
                $d.cellProperties = $e.CellProperties;
                $d.headerProperties = $e.HeaderProperties;
                $d.startDate = $e.StartDate;
                if (typeof $e.ShowWeekend !== 'undefined') {
                    $d.showWeekend = $e.ShowWeekend;
                };
                $d.headerBackColor = $e.HeaderBackColor ? $e.HeaderBackColor : $d.headerBackColor;
                $d.backColor = $e.BackColor ? $e.BackColor : $d.backColor;
                $d.nonBusinessBackColor = $e.NonBusinessBackColor ? $e.NonBusinessBackColor : $d.nonBusinessBackColor;
                $d.locale = $e.Locale ? $e.Locale : $d.locale;
                $d.timeFormat = $e.TimeFormat ? $e.TimeFormat : $d.timeFormat;
                if (typeof $e.WeekStarts !== 'undefined') {
                    $d.weekStarts = $e.WeekStarts;
                };
                $d.hashes = $e.Hashes;
            };
            $d.multiselect.clear(true);
            $d.multiselect.initList = $e.SelectedEvents;
            $d.$1M();
            $d.$1N();
            $d.$1O();
            if ($e.UpdateType === "Full") {
                $d.$1P();
                $d.$1Q();
            };
            $d.$1R();
            $d.$1S();
            $d.$1T();
            $d.$1L($e.CallBackData, true);
            $d.$1U();
            if ($e.Message) {
                $d.message($e.Message);
            }
        };
        this.$1L = function($j, $k) {
            var $l = function($j, $m) {
                return function() {
                    if ($d.$1V()) {
                        if (typeof $d.onAfterRender === 'function') {
                            var $n = {};
                            $n.isCallBack = $m;
                            $n.data = $j;
                            $d.onAfterRender($n);
                        }
                    } else {
                        if ($d.afterRender) {
                            $d.afterRender($j, $m);
                        }
                    }
                };
            };
            window.setTimeout($l($j, $k), 0);
        };
        this.$1V = function() {
            return $d.api === 2;
        };
        this.$1W = function($o) {
            var $p = this.theme || this.cssClassPrefix;
            if ($p) {
                return $p + $o;
            } else {
                return "";
            }
        };
        this.$1O = function() {
            if (!this.events.list) {
                return;
            };
            if (typeof this.onBeforeEventRender === 'function') {
                var length = this.events.list.length;
                for (var i = 0; i < length; i++) {
                    this.$1X(i);
                }
            };
            if (this.cellMode) {
                this.$1Y();
            } else {
                this.$1Z();
            }
        };
        this.$1K = function() {};
        this.$1Z = function() {
            if (!this.events.list) {
                return;
            };
            for (var x = 0; x < this.events.list.length; x++) {
                var e = this.events.list[x];
                e.start = new DayPilot.Date(e.start).d;
                e.end = new DayPilot.Date(e.end).d;
                if (e.start.getTime() > e.end.getTime()) {
                    continue;
                };
                for (var i = 0; i < this.rows.length; i++) {
                    var $q = this.rows[i];
                    if ($q.belongsHere(e)) {
                        var ep = new DayPilot.Event(e, $d);
                        $q.events.push(ep);
                        if (typeof this.onBeforeEventRender === 'function') {
                            ep.cache = this.$1I.events[x];
                        }
                    }
                }
            };
            for (var ri = 0; ri < this.rows.length; ri++) {
                var $q = this.rows[ri];
                $q.events.sort(this.$20);
                for (var ei = 0; ei < this.rows[ri].events.length; ei++) {
                    var ev = $q.events[ei];
                    var $r = $q.getStartColumn(ev);
                    var $s = $q.getWidth(ev);
                    $q.putIntoLine(ev, $r, $s, ri);
                }
            }
        };
        this.$1Y = function() {
            this.cellEvents = [];
            for (var x = 0; x < this.$21(); x++) {
                this.cellEvents[x] = [];
                for (var y = 0; y < this.rows.length; y++) {
                    var $t = {};
                    var d = DayPilot.Date.addDays(this.firstDate, y * 7 + x);
                    $t.start = d;
                    $t.end = DayPilot.Date.addDays(d, 1);
                    $t.events = [];
                    this.cellEvents[x][y] = $t;
                }
            };
            for (var i = 0; i < this.events.list.length; i++) {
                var e = this.events.list[i];
                e.start = new DayPilot.Date(e.start);
                e.end = new DayPilot.Date(e.start);
                if (e.start.getTime() > e.end.getTime()) {
                    continue;
                };
                for (var x = 0; x < this.$21(); x++) {
                    for (var y = 0; y < this.rows.length; y++) {
                        var $t = this.cellEvents[x][y];
                        if (e.start.getTime() >= $t.start.getTime() && e.start.getTime() < $t.end.getTime()) {
                            var ep = new DayPilot.Event(e, $d);
                            $t.events.push(ep);
                            if (typeof this.onBeforeEventRender === 'function') {
                                ep.cache = this.$1I.events[i];
                            }
                        }
                    }
                }
            };
            for (var x = 0; x < this.$21(); x++) {
                for (var y = 0; y < this.rows.length; y++) {
                    var $t = this.cellEvents[x][y];
                    $t.events.sort(this.$20);
                }
            }
        };
        this.$1M = function() {
            for (var i = 0; i < this.elements.events.length; i++) {
                var e = this.elements.events[i];
                e.event = null;
                e.click = null;
                e.parentNode.removeChild(e);
            };
            this.elements.events = [];
        };
        this.$1T = function() {
            this.$1I.events = {};
            if (this.cellMode) {
                this.$22();
            } else {
                this.$23();
            };
            this.multiselect.redraw();
        };
        this.$22 = function() {
            this.elements.events = [];
            for (var x = 0; x < this.$21(); x++) {
                for (var y = 0; y < this.rows.length; y++) {
                    var $t = this.cellEvents[x][y];
                    var $u = this.cells[x][y];
                    for (var i = 0; i < $t.events.length; i++) {
                        var ep = $t.events[i];
                        ep.part.colStart = x;
                        ep.part.colWidth = 1;
                        ep.part.row = y;
                        ep.part.line = i;
                        ep.part.startsHere = true;
                        ep.part.endsHere = true;
                        this.$24(ep);
                    }
                }
            }
        };
        this.$23 = function() {
            this.elements.events = [];
            for (var ri = 0; ri < this.rows.length; ri++) {
                var $q = this.rows[ri];
                for (var li = 0; li < $q.lines.length; li++) {
                    var $v = $q.lines[li];
                    for (var pi = 0; pi < $v.length; pi++) {
                        this.$24($v[pi]);
                    }
                }
            }
        };
        this.$25 = function(a, b) {
            if (!a || !b || !a.start || !b.start) {
                return 0;
            };
            var $w = a.start().ticks - b.start().ticks;
            if ($w !== 0) {
                return $w;
            };
            var $x = b.end().ticks - a.end().ticks;
            return $x;
        };
        this.$20 = function(a, b) {
            if (!a || !b) {
                return 0;
            };
            if (!a.data || !b.data || !a.data.sort || !b.data.sort || a.data.sort.length === 0 || b.data.sort.length === 0) {
                return $d.$25(a, b);
            };
            var $e = 0;
            var i = 0;
            while ($e === 0 && a.data.sort[i] && b.data.sort[i]) {
                if (a.data.sort[i] === b.data.sort[i]) {
                    $e = 0;
                } else {
                    $e = $d.$26(a.data.sort[i], b.data.sort[i], $d.sortDirections[i]);
                };
                i++;
            };
            return $e;
        };
        this.$26 = function(a, b, $y) {
            var $z = ($y !== "desc");
            var $A = $z ? -1 : 1;
            var $B = -$A;
            if (a === null && b === null) {
                return 0;
            };
            if (b === null) {
                return $B;
            };
            if (a === null) {
                return $A;
            };
            var ar = [];
            ar[0] = a;
            ar[1] = b;
            ar.sort();
            return a === ar[0] ? $A : $B;
        };
        this.$27 = function(x, y, $v, $C, $D, e) {
            if (!$D) {
                $D = 0;
            };
            var $E = $C;
            this.shadow = {};
            this.shadow.list = [];
            this.shadow.start = {
                x: x,
                y: y
            };
            this.shadow.width = $C;
            if (this.eventMoveToPosition) {
                $E = 1;
                this.shadow.position = $v;
            };
            var $F = y * 7 + x - $D;
            if ($F < 0) {
                $E += $F;
                x = 0;
                y = 0;
            };
            var $G = $D;
            while ($G >= 7) {
                y--;
                $G -= 7;
            };
            if ($G > x) {
                var $H = 7 - this.$21();
                if ($G > (x + $H)) {
                    y--;
                    x = x + 7 - $G;
                } else {
                    $E = $E - $G + x;
                    x = 0;
                }
            } else {
                x -= $G;
            };
            if (y < 0) {
                y = 0;
                x = 0;
            };
            var $I = null;
            if (DayPilotMonth.resizingEvent) {
                $I = 'w-resize';
            } else if (DayPilotMonth.movingEvent) {
                $I = "move";
            };
            this.nav.top.style.cursor = $I;
            while ($E > 0 && y < this.rows.length) {
                var $J = Math.min(this.$21() - x, $E);
                var $q = this.rows[y];
                var top = this.$28(y);
                var $K = $q.getHeight();
                if (this.eventMoveToPosition) {
                    top = this.$29(y, $v);
                    $K = 2;
                };
                var $L = document.createElement("div");
                $L.setAttribute("unselectable", "on");
                $L.style.position = 'absolute';
                $L.style.left = (this.$2a() * x) + '%';
                $L.style.width = (this.$2a() * $J) + '%';
                $L.style.top = (top) + 'px';
                $L.style.height = ($K) + 'px';
                $L.style.cursor = $I;
                var $M = document.createElement("div");
                $M.setAttribute("unselectable", "on");
                $L.appendChild($M);
                if (this.cssOnly) {
                    $L.className = this.$1W("_shadow");
                    $M.className = this.$1W("_shadow_inner");
                };
                if (!this.cssOnly) {
                    $M.style.position = "absolute";
                    $M.style.top = "0px";
                    $M.style.right = "0px";
                    $M.style.left = "0px";
                    $M.style.bottom = "0px";
                    if (this.shadowType === 'Fill') {
                        $M.style.backgroundColor = "#aaaaaa";
                        $M.style.opacity = 0.5;
                        $M.style.filter = "alpha(opacity=50)";
                        if (e && e.event) {
                            $M.style.overflow = 'hidden';
                            $M.style.fontSize = this.eventFontSize;
                            $M.style.fontFamily = this.eventFontFamily;
                            $M.style.color = this.eventFontColor;
                            $M.innerHTML = e.event.client.innerHTML() ? e.event.client.innerHTML() : e.event.text();
                        }
                    } else {
                        $M.style.border = '2px dotted #666666';
                    }
                };
                var $N = this.nav.events;
                $N.appendChild($L);
                this.shadow.list.push($L);
                $E -= ($J + 7 - this.$21());
                x = 0;
                y++;
            }
        };
        this.$2b = function() {
            if (this.shadow) {
                var $N = this.nav.events;
                for (var i = 0; i < this.shadow.list.length; i++) {
                    $N.removeChild(this.shadow.list[i]);
                };
                this.shadow = null;
                this.nav.top.style.cursor = '';
            }
        };
        this.$29 = function($q, $v) {
            var top = 0;
            for (var i = 0; i < $q; i++) {
                top += this.rows[i].getHeight();
            };
            top += this.cellHeaderHeight;
            top += $v * $O.lineHeight();
            return top;
        };
        this.$2c = function(x, y) {
            return DayPilot.Date.addDays(this.firstDate, y * 7 + x);
        };
        this.$1X = function(i) {
            var $P = this.$1I.events;
            var $j = this.events.list[i];
            var $Q = {};
            for (var name in $j) {
                $Q[name] = $j[name];
            };
            if (typeof this.onBeforeEventRender === 'function') {
                var $n = {};
                $n.e = $Q;
                this.onBeforeEventRender($n);
            };
            $P[i] = $Q;
        };
        this.$24 = function(ep, $R) {
            var $R = this.cellMode;
            var $q = ep.part.row;
            var $v = ep.part.line;
            var $r = ep.part.colStart;
            var $s = ep.part.colWidth;
            var $P = ep.cache || ep.data;
            var $S = $R ? 0 : this.$2a() * ($r);
            var $C = $R ? 100 : this.$2a() * ($s);
            var top = $R ? $v * $O.lineHeight() : this.$29($q, $v);
            var e = document.createElement("div");
            e.setAttribute("unselectable", "on");
            e.style.height = $O.eventHeight() + 'px';
            if (!this.cssOnly) {
                e.style.fontFamily = this.eventFontFamily;
            } else {
                e.style.position = "relative";
                e.style.overflow = "hidden";
                e.className = this.$1W("_event");
            };
            if ($P.cssClass) {
                DayPilot.Util.addClass(e, $P.cssClass);
            };
            e.event = ep;
            if ($R) {
                e.style.marginRight = "2px";
                e.style.marginBottom = "2px";
            } else {
                e.style.width = $C + '%';
                e.style.position = 'absolute';
                e.style.left = $S + '%';
                e.style.top = top + 'px';
            };
            if (this.showToolTip && $P.toolTip && !this.bubble) {
                e.title = $P.toolTip;
            };
            e.onclick = this.$2d;;
            e.ondblclick = this.$2e;
            e.oncontextmenu = this.$2f;
            e.onmousedown = this.$2g;
            e.onmousemove = this.$2h;
            e.onmouseout = this.$2i;
            e.ontouchstart = $T.onEventTouchStart;
            e.ontouchmove = $T.onEventTouchMove;
            e.ontouchend = $T.onEventTouchEnd;
            if (!this.cssOnly) {
                var back = (ep.client.backColor()) ? ep.client.backColor() : this.eventBackColor;
                var $U = document.createElement("div");
                $U.setAttribute("unselectable", "on");
                $U.style.height = ($O.eventHeight() - 2) + 'px';
                $U.style.overflow = 'hidden';
                $U.style.position = "absolute";
                $U.style.left = "2px";
                $U.style.right = "2px";
                $U.style.paddingLeft = '2px';
                $U.style.border = '1px solid ' + $d.eventBorderColor;
                $U.style.backgroundColor = back;
                $U.style.fontFamily = "";
                $U.className = this.$1W("event");
                if ($O.rounded()) {
                    $U.style.MozBorderRadius = "5px";
                    $U.style.webkitBorderRadius = "5px";
                    $U.style.borderRadius = "5px";
                };
                var $M = [];
                var $V = this.eventTextLayer === 'Top';
                var $W = this.eventStartTime;
                var $X = this.eventEndTime;
                var $Y = this.eventTextAlignment;
                var $Z = this.eventTextLeftIndent;
                var $00 = this.eventTextLayer === 'Floats';
                if ($00) {
                    if ($W) {
                        $M.push("<div unselectable='on' style='float:left; font-size:");
                        $M.push(this.eventTimeFontSize);
                        $M.push(";color:");
                        $M.push(this.eventTimeFontColor);
                        $M.push(";font-family:");
                        $M.push(this.eventTimeFontFamily);
                        $M.push("'>");
                        $M.push(DayPilot.Date.hours(ep.start().d, $d.timeFormat === 'Clock12Hours'));
                        $M.push("</div>");
                    };
                    if ($X) {
                        $M.push("<div unselectable='on' style='float:right;font-size:");
                        $M.push(this.eventTimeFontSize);
                        $M.push(";color:");
                        $M.push(this.eventTimeFontColor);
                        $M.push(";font-family:");
                        $M.push(this.eventTimeFontFamily);
                        $M.push("'>");
                        $M.push(DayPilot.Date.hours(ep.end().d, $d.timeFormat === 'Clock12Hours'));
                        $M.push("</div>");
                    };
                    $M.push("<div unselectable='on' style='");
                    $M.push("font-size:");
                    $M.push(this.eventFontSize);
                    $M.push(";color:");
                    $M.push(this.eventFontColor);
                    $M.push(";font-family:");
                    $M.push(this.eventFontFamily);
                    if ($Y === 'Center') {
                        $M.push(";text-align:center;");
                    };
                    $M.push("'>");
                    if (ep.client.innerHTML()) {
                        $M.push(ep.client.innerHTML());
                    } else {
                        $M.push(ep.text());
                    };
                    $M.push("</div>");
                } else {
                    if ($W) {
                        if ($Y === 'Left') {
                            $M.push("<div unselectable='on' style='position:absolute;text-align:left;height:1px;font-size:1px;width:100%'><div unselectable='on' style='font-size:");
                            $M.push(this.eventTimeFontSize);
                            $M.push(";color:");
                            $M.push(this.eventTimeFontColor);
                            $M.push(";font-family:");
                            $M.push(this.eventTimeFontFamily);
                            $M.push(";text-align:right;");
                            $M.push("width:");
                            $M.push($Z - 4);
                            $M.push("px;");
                            $M.push("><span style='background-color:");
                        } else {
                            $M.push("<div unselectable='on' style='position:absolute;text-align:left;height:1px;font-size:1px;width:100%'><div unselectable='on' style='font-size:");
                            $M.push(this.eventTimeFontSize);
                            $M.push(";color:");
                            $M.push(this.eventTimeFontColor);
                            $M.push(";font-family:");
                            $M.push(this.eventTimeFontFamily);
                            $M.push(";'><span style='background-color:");
                        };
                        $M.push(back);
                        $M.push("' unselectable='on'>");
                        if (ep.part.startsHere) {
                            $M.push(DayPilot.Date.hours(ep.start().d, $d.timeFormat === 'Clock12Hours'));
                        } else {
                            $M.push("~");
                        };
                        $M.push("</span></div></div>");
                    };
                    if ($X) {
                        $M.push("<div unselectable='on' style='position:absolute;text-align:right;height:1px;font-size:1px;width:100%'><div unselectable='on' style='margin-right:4px;font-size:");
                        $M.push(this.eventTimeFontSize);
                        $M.push(";color:");
                        $M.push(this.eventTimeFontColor);
                        $M.push(";font-family:");
                        $M.push(this.eventTimeFontFamily);
                        $M.push(";'><span style='background-color:");
                        $M.push(back);
                        $M.push("' unselectable='on'>");
                        if (ep.part.endsHere) {
                            $M.push(DayPilot.Date.hours(ep.end().d, $d.timeFormat === 'Clock12Hours'));
                        } else {
                            $M.push("~");
                        };
                        $M.push("</span></div></div>");
                    };
                    if ($Y === 'Left') {
                        var $S = $W ? $Z : 0;
                        $M.push("<div style='margin-top:0px;height:");
                        $M.push($O.eventHeight() - 2);
                        $M.push("px;");
                        $M.push(";overflow:hidden;text-align:left;padding-left:");
                        $M.push($S);
                        $M.push("px;font-size:");
                        $M.push(this.eventFontSize);
                        $M.push(";color:");
                        $M.push(this.eventFontColor);
                        $M.push(";font-family:");
                        $M.push(this.eventFontFamily);
                        $M.push("' unselectable='on'>");
                        if (ep.client.innerHTML()) {
                            $M.push(ep.client.innerHTML());
                        } else {
                            $M.push(ep.text());
                        };
                        $M.push("</div>");
                    } else if ($Y === 'Center') {
                        if ($V) {
                            $M.push("<div style='position:absolute; text-align:center; width: 98%; height:1px; font-size: 1px;'>");
                            $M.push("<span style='background-color:");
                            $M.push(back);
                            $M.push(";font-size:");
                            $M.push(this.eventFontSize);
                            $M.push(";color:");
                            $M.push(this.eventFontColor);
                            $M.push(";font-family:");
                            $M.push(this.eventFontFamily);
                            $M.push("' unselectable='on'>");
                            if (ep.client.innerHTML()) {
                                $M.push(ep.client.innerHTML());
                            } else {
                                $M.push(ep.text());
                            };
                            $M.push("</span>");
                            $M.push("</div>");
                        } else {
                            $M.push("<div style='margin-top:0px;height:");
                            $M.push($O.eventHeight() - 2);
                            $M.push("px;");
                            $M.push(";overflow:hidden;text-align:center;font-size:");
                            $M.push(this.eventFontSize);
                            $M.push(";color:");
                            $M.push(this.eventFontColor);
                            $M.push(";font-family:");
                            $M.push(this.eventFontFamily);
                            $M.push("' unselectable='on'>");
                            if (ep.client.innerHTML()) {
                                $M.push(ep.client.innerHTML());
                            } else {
                                $M.push(ep.text());
                            };
                            $M.push("</div>");
                        }
                    }
                };
                $U.innerHTML = $M.join('');
                e.appendChild($U);
            } else {
                if (!ep.part.startsHere) {
                    DayPilot.Util.addClass(e, this.$1W("_event_continueleft"));
                };
                if (!ep.part.endsHere) {
                    DayPilot.Util.addClass(e, this.$1W("_event_continueright"));
                };
                var $U = document.createElement("div");
                $U.setAttribute("unselectable", "on");
                $U.className = this.$1W("_event_inner");
                if (ep.client.innerHTML()) {
                    $U.innerHTML = ep.client.innerHTML();
                } else {
                    $U.innerHTML = ep.text();
                };
                if ($P.backColor) {
                    $U.style.background = $P.backColor;
                };
                e.appendChild($U);
            };
            if ($P.areas) {
                var $01 = $P.areas;
                for (var i = 0; i < $01.length; i++) {
                    var $02 = $01[i];
                    if ($02.v !== 'Visible') {
                        continue;
                    };
                    var a = DayPilot.Areas.createArea(e, ep, $02);
                    e.appendChild(a);
                }
            };
            this.elements.events.push(e);
            if ($R) {
                this.cells[$r][$q].body.appendChild(e);
            } else {
                this.nav.events.appendChild(e);
            };
            if ($d.multiselect.$2j(e.event)) {
                $d.multiselect.add(e.event, true);
            };
            var $u = e;
            if ($d.$1V()) {
                if (typeof $d.onAfterEventRender === 'function') {
                    var $n = {};
                    $n.e = $u.event;
                    $n.div = $u;
                    $d.onAfterEventRender($n);
                }
            } else {
                if ($d.afterEventRender) {
                    $d.afterEventRender($u.event, $u);
                }
            }
        };
        this.$2d = function(ev) {
            if ($T.start) {
                return;
            };
            $d.$2k(this, ev);
        };
        this.$2e = function(ev) {
            $d.$2l(this, ev);
        };
        this.$2h = function(ev) {
            var e = this;
            var ep = e.event;
            if (typeof(DayPilotMonth) === 'undefined') {
                return;
            };
            if (DayPilotMonth.movingEvent || DayPilotMonth.resizingEvent) {
                return;
            };
            var $D = DayPilot.mo3(e, ev);
            if (!$D) {
                return;
            };
            DayPilot.Areas.showAreas(e, e.event);
            if ($d.cssOnly) {
                $d.$2m(e.event).each(function($u) {
                    DayPilot.Util.addClass($u, $d.$1W("_event_hover"));
                });
            };
            var $03 = 6;
            if (!$d.cellMode && $D.x <= $03 && ep.client.resizeEnabled()) {
                if (ep.part.startsHere) {
                    e.style.cursor = "w-resize";
                    e.dpBorder = 'left';
                } else {
                    e.style.cursor = 'not-allowed';
                }
            } else if (!$d.cellMode && e.clientWidth - $D.x <= $03 && ep.client.resizeEnabled()) {
                if (ep.part.endsHere) {
                    e.style.cursor = "e-resize";
                    e.dpBorder = 'right';
                } else {
                    e.style.cursor = 'not-allowed';
                }
            } else {
                e.style.cursor = 'default';
            };
            if (typeof(DayPilotBubble) !== 'undefined' && $d.bubble && $d.eventHoverHandling !== 'Disabled') {
                if (!DayPilotMonth.movingEvent && !DayPilotMonth.resizingEvent) {
                    var $04 = this.$2n && $D.x === this.$2n.x && $D.y === this.$2n.y;
                    if (!$04) {
                        this.$2n = $D;
                        $d.bubble.showEvent(e.event);
                    }
                } else {
                    DayPilotBubble.hideActive();
                }
            }
        };
        this.$2i = function(ev) {
            var e = this;
            if (typeof(DayPilotBubble) !== 'undefined' && $d.bubble) {
                $d.bubble.hideOnMouseOut();
            };
            e.style.cursor = '';
            if ($d.cssOnly) {
                $d.$2m(e.event).each(function($u) {
                    DayPilot.Util.removeClass($u, $d.$1W("_event_hover"));
                });
            };
            DayPilot.Areas.hideAreas(e, ev);
        };
        this.$2f = function() {
            var e = this;
            $d.$2o(e.event);
            return false;
        };
        this.$2g = function(ev) {
            if ($T.start) {
                return;
            };
            var e = this;
            var ep = e.event;
            var $q = ep.part.row;
            var $r = ep.part.colStart;
            var $v = ep.part.line;
            var $s = ep.part.colWidth;
            ev = ev || window.event;
            var $05 = ev.which || ev.button;
            ev.cancelBubble = true;
            if (ev.stopPropagation) {
                ev.stopPropagation();
            };
            if ($05 === 1) {
                if (typeof(DayPilotBubble) !== 'undefined' && $d.bubble) {
                    DayPilotBubble.hideActive();
                };
                DayPilotMonth.movingEvent = null;
                if (this.style.cursor === 'w-resize' || this.style.cursor === 'e-resize') {
                    var $06 = {};
                    $06.start = {};
                    $06.start.x = $r;
                    $06.start.y = $q;
                    $06.event = e.event;
                    $06.width = DayPilot.Date.daysSpan($06.event.start().d, $06.event.end().d) + 1;
                    $06.direction = this.style.cursor;
                    DayPilotMonth.resizingEvent = $06;
                } else if (this.style.cursor === 'move' || ep.client.moveEnabled()) {
                    $d.$2b();
                    var $07 = DayPilot.mo3($d.nav.events, ev);
                    if (!$07) {
                        return;
                    };
                    var $t = $d.$2p($07.x, $07.y);
                    if (!$t) {
                        return;
                    };
                    var $F = DayPilot.Date.daysDiff(ep.start(), $d.rows[$q].start);
                    var $D = ($t.y * 7 + $t.x) - ($q * 7 + $r);
                    if ($F) {
                        $D += $F;
                    };
                    var $08 = {};
                    $08.start = {};
                    $08.start.x = $r;
                    $08.start.y = $q;
                    $08.start.line = $v;
                    $08.offset = $d.eventMoveToPosition ? 0 : $D;
                    $08.colWidth = $s;
                    $08.event = e.event;
                    $08.coords = $07;
                    DayPilotMonth.movingEvent = $08;
                }
            }
        };
        this.temp = {};
        this.temp.getPosition = function() {
            if (!$d.coords) {
                return null;
            };
            var $t = $d.$2p($d.coords.x, $d.coords.y);
            if (!$t) {
                return null;
            };
            var d = new DayPilot.Date($d.$2c($t.x, $t.y));
            var $t = {};
            $t.start = d;
            $t.end = d.addDays(1);
            return $t;
        };
        this.$2q = {};
        var $T = $d.$2q;
        $T.active = false;
        $T.start = false;
        $T.timeouts = [];
        $T.onEventTouchStart = function(ev) {
            if ($T.active || $T.start) {
                return;
            };
            $T.clearTimeouts();
            $T.start = true;
            $T.active = false;
            var $u = this;
            var $09 = 500;
            $T.timeouts.push(window.setTimeout(function() {
                $T.active = true;
                $T.start = false;
                var $07 = $T.relativeCoords(ev);
                $T.startMoving($u, $07);
                ev.preventDefault();
            }, $09));
            ev.stopPropagation();
        };
        $T.onEventTouchMove = function(ev) {
            $T.clearTimeouts();
            $T.start = false;
        };
        $T.onEventTouchEnd = function(ev) {
            $T.clearTimeouts();
            if ($T.start) {
                $d.$2r(this, false);
            };
            window.setTimeout(function() {
                $T.start = false;
                $T.active = false;
            }, 500);
        };
        $T.onMainTouchStart = function(ev) {
            if ($T.active || $T.start) {
                return;
            };
            $T.clearTimeouts();
            $T.start = true;
            $T.active = false;
            var $09 = 500;
            $T.timeouts.push(window.setTimeout(function() {
                $T.active = true;
                $T.start = false;
                ev.preventDefault();
                var $07 = $T.relativeCoords(ev);
                $T.startRange($07);
            }, $09));
        };
        $T.onMainTouchMove = function(ev) {
            $T.clearTimeouts();
            $T.start = false;
            if ($T.active) {
                ev.preventDefault();
                var $07 = $T.relativeCoords(ev);
                if ($T.moving) {
                    $T.updateMoving($07);
                    return;
                };
                if ($T.range) {
                    $T.updateRange($07);
                }
            }
        };
        $T.onMainTouchEnd = function(ev) {
            $T.clearTimeouts();
            if ($T.active) {
                if ($T.moving) {
                    var $0a = $T.moving;
                    var e = $T.moving.event;
                    var $0b = $d.shadow.start;
                    var $0c = $d.shadow.position;
                    var $D = $T.moving.offset;
                    $d.$2b();
                    $T.moving = null;
                    $d.$2s(e, $0b.x, $0b.y, $D, ev, $0c);
                };
                if ($T.range) {
                    var $0d = $T.range;
                    var $0b = new DayPilot.Date($d.$2c($0d.from.x, $0d.from.y));
                    var end = $0b.addDays($0d.width);
                    $T.range = null;
                    $d.$2t($0b, end);
                }
            };
            window.setTimeout(function() {
                $T.start = false;
                $T.active = false;
            }, 500);
        };
        $T.clearTimeouts = function() {
            for (var i = 0; i < $T.timeouts.length; i++) {
                clearTimeout($T.timeouts[i]);
            };
            $T.timeouts = [];
        };
        $T.relativeCoords = function(ev) {
            var $N = $d.nav.events;
            var x = ev.touches[0].pageX;
            var y = ev.touches[0].pageY;
            var $07 = {
                x: x,
                y: y
            };
            var $0e = DayPilot.abs($N);
            var $07 = {
                x: x - $0e.x,
                y: y - $0e.y,
                toString: function() {
                    return "x: " + this.x + ", y:" + this.y;
                }
            };
            return $07;
        };
        $T.startMoving = function($u, $07) {
            $d.$2b();
            ep = $u.event;
            var $t = $d.$2p($07.x, $07.y);
            if (!$t) {
                return;
            };
            var $F = DayPilot.Date.daysDiff(ep.start(), $d.rows[ep.part.row].start);
            var $D = ($t.y * 7 + $t.x) - (ep.part.row * 7 + ep.part.colStart);
            if ($F) {
                $D += $F;
            };
            var $08 = {};
            $08.start = {};
            $08.start.x = ep.part.colStart;
            $08.start.y = ep.part.row;
            $08.start.line = ep.part.line;
            $08.offset = $d.eventMoveToPosition ? 0 : $D;
            $08.colWidth = ep.part.colWidth;
            $08.event = ep;
            $08.coords = $07;
            $T.moving = $08;
            $T.updateMoving($07);
        };
        $T.updateMoving = function($07) {
            var $t = $d.$2p($07.x, $07.y);
            if (!$t) {
                return;
            };
            var $0f = $d.$2u($t);
            $d.$2b();
            var event = $T.moving.event;
            var $D = $T.moving.offset;
            var $C = $d.cellMode ? 1 : DayPilot.Date.daysSpan(event.start().d, event.end().d) + 1;
            if ($C < 1) {
                $C = 1;
            };
            $d.$27($t.x, $t.y, $0f, $C, $D, event);
        };
        $T.startRange = function($07) {
            var $t = $d.$2p($07.x, $07.y);
            if (!$t) {
                return;
            };
            $d.$2b();
            var $0g = {};
            $0g.start = {};
            $0g.start.x = $t.x;
            $0g.start.y = $t.y;
            $0g.x = $t.x;
            $0g.y = $t.y;
            $0g.width = 1;
            $T.range = $0g;
            $T.updateRange($07);
        };
        $T.updateRange = function($07) {
            var $t = $d.$2p($07.x, $07.y);
            if (!$t) {
                return;
            };
            $d.$2b();
            var $0b = $T.range.start;
            var $0h = $0b.y * 7 + $0b.x;
            var $0i = $t.y * 7 + $t.x;
            var $C = Math.abs($0i - $0h) + 1;
            if ($C < 1) {
                $C = 1;
            };
            var $0j = $0h < $0i ? $0b : $t;
            $T.range.width = $C;
            $T.range.from = {
                x: $0j.x,
                y: $0j.y
            };
            $d.$27($0j.x, $0j.y, 0, $C, 0, null);
        };
        this.isWeekend = function($0k) {
            var $0l = 0;
            var $0m = 6;
            if ($0k.dayOfWeek() === $0l) {
                return true;
            };
            if ($0k.dayOfWeek() === $0m) {
                return true;
            };
            return false;
        };
        this.$2v = function() {
            var $0n = this.startDate.lastDayOfMonth();
            if (this.showWeekend) {
                return $0n;
            }
            while (this.isWeekend($0n)) {
                $0n = $0n.addDays(-1);
            };
            return $0n;
        };
        this.$1N = function() {
            if (typeof this.startDate === 'string') {
                this.startDate = DayPilot.Date.fromStringSortable(this.startDate);
            };
            if (this.viewType === 'Month') {
                this.startDate = this.startDate.firstDayOfMonth();
            } else {
                this.startDate = this.startDate.getDatePart();
            };
            this.firstDate = this.startDate.firstDayOfWeek($O.getWeekStart());
            if (!this.showWeekend) {
                var $0o = this.startDate.addMonths(-1).getMonth();
                var $0p = new DayPilot.Date(this.firstDate).addDays(6);
                while (this.isWeekend($0p)) {
                    $0p = $0p.addDays(-1);
                };
                if ($0p.getMonth() === $0o) {
                    this.firstDate = DayPilot.Date.addDays(this.firstDate, 7);
                }
            };
            var $0q = this.startDate;
            var $0r;
            if (this.viewType === 'Month') {
                var $0s = this.$2v().d;
                var $0t = DayPilot.Date.daysDiff(this.firstDate, $0s) + 1;
                $0r = Math.ceil($0t / 7);
            } else {
                $0r = this.weeks;
            };
            this.days = $0r * 7;
            this.rows = [];
            for (var x = 0; x < $0r; x++) {
                var r = {};
                r.start = DayPilot.Date.addDays(this.firstDate, x * 7);
                r.end = DayPilot.Date.addDays(r.start, this.$21());
                r.events = [];
                r.lines = [];
                r.index = x;
                r.minHeight = this.cellHeight;
                r.calendar = this;
                r.belongsHere = function(ev) {
                    if (ev.end.getTime() === ev.start.getTime() && ev.start.getTime() === this.start.getTime()) {
                        return true;
                    };
                    return !(ev.end.getTime() <= this.start.getTime() || ev.start.getTime() >= this.end.getTime());
                };
                r.getPartStart = function(ep) {
                    return DayPilot.Date.max(this.start, ep.start());
                };
                r.getPartEnd = function(ep) {
                    return DayPilot.Date.min(this.end, ep.end());
                };
                r.getStartColumn = function(ep) {
                    var $0u = this.getPartStart(ep);
                    return DayPilot.Date.daysDiff(this.start, $0u);
                };
                r.getWidth = function(ep) {
                    return DayPilot.Date.daysSpan(this.getPartStart(ep), this.getPartEnd(ep)) + 1;
                };
                r.putIntoLine = function(ep, $r, $s, $q) {
                    var $0v = this;
                    for (var i = 0; i < this.lines.length; i++) {
                        var $v = this.lines[i];
                        if ($v.isFree($r, $s)) {
                            $v.addEvent(ep, $r, $s, $q, i);
                            return i;
                        }
                    };
                    var $v = [];
                    $v.isFree = function($r, $s) {
                        var $0w = true;
                        for (var i = 0; i < this.length; i++) {
                            var ep = this[i];
                            if (!($r + $s - 1 < ep.part.colStart || $r > ep.part.colStart + ep.part.colWidth - 1)) {
                                $0w = false;
                            }
                        };
                        return $0w;
                    };
                    $v.addEvent = function(ep, $r, $s, $q, $0x) {
                        ep.part.colStart = $r;
                        ep.part.colWidth = $s;
                        ep.part.row = $q;
                        ep.part.line = $0x;
                        ep.part.startsHere = $0v.start.getTime() <= ep.start().getTime();
                        ep.part.endsHere = $0v.end.getTime() >= ep.end().getTime();
                        this.push(ep);
                    };
                    $v.addEvent(ep, $r, $s, $q, this.lines.length);
                    this.lines.push($v);
                    return this.lines.length - 1;
                };
                r.getStart = function() {
                    var $0b = 0;
                    for (var i = 0; i < $d.rows.length && i < this.index; i++) {
                        $0b += $d.rows[i].getHeight();
                    }
                };
                r.getHeight = function() {
                    return Math.max(this.lines.length * $O.lineHeight() + $d.cellHeaderHeight + $d.cellMarginBottom, this.calendar.cellHeight);
                };
                this.rows.push(r);
            };
            this.endDate = DayPilot.Date.addDays(this.firstDate, $0r * 7);
        };
        this.$2w = function() {
            switch (this.heightSpec) {
                case "Auto":
                    var $K = $O.headerHeight();
                    for (var i = 0; i < this.rows.length; i++) {
                        $K += this.rows[i].getHeight();
                    };
                    return $K;
                case "Fixed":
                    return this.height;
            }
        };
        this.$2x = function($0b, end) {
            var $0y = (end.y * 7 + end.x) - ($0b.y * 7 + $0b.x);
            return $0y + 1;
        };
        this.debug = new DayPilot.Debug(this);
        this.$2y = function() {
            var $0z = this.nav.top;
            this.nav.top.dp = this;
            $0z.setAttribute("unselectable", "on");
            $0z.style.MozUserSelect = 'none';
            $0z.style.KhtmlUserSelect = 'none';
            $0z.style.WebkitUserSelect = 'none';
            $0z.style.position = 'relative';
            if (this.width) {
                $0z.style.width = this.width;
            };
            $0z.onselectstart = function(e) {
                return false;
            };
            if (this.cssOnly) {
                $0z.className = this.$1W("_main");
            } else {
                $0z.style.border = "1px solid " + this.borderColor;
            };
            if (this.hideUntilInit) {
                $0z.style.visibility = 'hidden';
            };
            $0z.onmousemove = this.$2z;
            $0z.ontouchstart = $T.onMainTouchStart;
            $0z.ontouchmove = $T.onMainTouchMove;
            $0z.ontouchend = $T.onMainTouchEnd;
            this.vsph = document.createElement("div");
            this.vsph.style.display = 'none';
            this.nav.top.appendChild(this.vsph);
            var $0A = document.createElement("div");
            $0A.style.position = "relative";
            $0A.style.height = $O.headerHeight() + "px";
            $0A.oncontextmenu = function() {
                return false;
            };
            this.nav.top.appendChild($0A);
            this.nav.header = $0A;
            var $0B = document.createElement("div");
            $0B.style.position = "relative";
            $0B.style.zoom = "1";
            if (this.heightSpec === "Parent100Pct" || this.heightSpec === 'Fixed') {
                $0B.style.overflow = "auto";
            };
            var $0C = document.createElement("div");
            $0C.style.position = "relative";
            $0B.appendChild($0C);
            this.nav.top.appendChild($0B);
            this.nav.scrollable = $0B;
            this.nav.events = $0C;
        };
        this.$2z = function(ev) {
            $d.coords = DayPilot.mo3($d.nav.events, ev);
            var $07 = $d.coords;
            if (!$07) {
                return;
            };
            var $t = $d.$2p($07.x, $07.y);
            if (!$t) {
                return;
            };
            if (DayPilotMonth.resizingEvent) {
                $d.$2b();
                var $06 = DayPilotMonth.resizingEvent;
                var $0D = $06.start;
                var $C, $0b;
                if ($06.direction === 'w-resize') {
                    $0b = $t;
                    var $0E = $06.event.end().d;
                    if (DayPilot.Date.getDate($0E).getTime() === $0E.getTime()) {
                        $0E = DayPilot.Date.addDays($0E, -1);
                    };
                    var end = $d.$2A($0E);
                    $C = $d.$2x($t, end);
                } else {
                    $0b = $d.$2A($06.event.start().d);
                    $C = $d.$2x($0b, $t);
                };
                if ($C < 1) {
                    $C = 1;
                };
                $d.$27($0b.x, $0b.y, 0, $C);
            } else if (DayPilotMonth.movingEvent) {
                $d.debug.message("mousemove/moving start coords: " + DayPilotMonth.movingEvent.coords.x + " " + DayPilotMonth.movingEvent.coords.y);
                $d.debug.message("mousemove/current coords: " + $07.x + " " + $07.y);
                if ($07.x === DayPilotMonth.movingEvent.coords.x && $07.y === DayPilotMonth.movingEvent.coords.y) {
                    return;
                };
                var $0f = $d.$2u($t);
                $d.$2b();
                var event = DayPilotMonth.movingEvent.event;
                var $D = DayPilotMonth.movingEvent.offset;
                var $C = $d.cellMode ? 1 : DayPilot.Date.daysSpan(event.start().d, event.end().d) + 1;
                if ($C < 1) {
                    $C = 1;
                };
                $d.$27($t.x, $t.y, $0f, $C, $D, event);
            } else if (DayPilotMonth.timeRangeSelecting) {
                DayPilotMonth.cancelCellClick = true;
                $d.$2b();
                var $0b = DayPilotMonth.timeRangeSelecting;
                var $0h = $0b.y * 7 + $0b.x;
                var $0i = $t.y * 7 + $t.x;
                var $C = Math.abs($0i - $0h) + 1;
                if ($C < 1) {
                    $C = 1;
                };
                var $0j = $0h < $0i ? $0b : $t;
                DayPilotMonth.timeRangeSelecting.from = {
                    x: $0j.x,
                    y: $0j.y
                };
                DayPilotMonth.timeRangeSelecting.width = $C;
                DayPilotMonth.timeRangeSelecting.moved = true;
                $d.$27($0j.x, $0j.y, 0, $C, 0, null);
            }
        };
        this.$2u = function($t) {
            var y = $t.relativeY;
            var $q = $d.rows[$t.y];
            var top = $d.cellHeaderHeight;
            var lh = $O.lineHeight();
            var $0F = $q.lines.length;
            for (var i = 0; i < $q.lines.length; i++) {
                var $v = $q.lines[i];
                if ($v.isFree($t.x, 1)) {
                    $0F = i;
                    break;
                }
            };
            var $0G = Math.floor((y - top + lh / 2) / lh);
            var $0G = Math.min($0F, $0G);
            var $0G = Math.max(0, $0G);
            return $0G;
        };
        this.message = function($0H, $0I, $0J, $0K) {
            if ($0H === null) {
                return;
            };
            var $0I = $0I || this.messageHideAfter || 2000;
            var $0J = $0J || "#ffffff";
            var $0K = $0K || "#000000";
            var $0L = 0.8;
            var top = $O.headerHeight();
            var $S = 1;
            var $0M = 0;
            var $u;
            if (!this.nav.message) {
                $u = document.createElement("div");
                $u.setAttribute("unselectable", "on");
                $u.style.position = "absolute";
                $u.style.right = "0px";
                $u.style.left = "0px";
                $u.style.top = top + "px";
                $u.style.opacity = $0L;
                $u.style.filter = "alpha(opacity=" + ($0L * 100) + ")";
                $u.style.display = 'none';
                $u.onmousemove = function() {
                    if ($d.messageTimeout) {
                        clearTimeout($d.messageTimeout);
                    }
                };
                $u.onmouseout = function() {
                    if ($d.nav.message.style.display !== 'none') {
                        $d.messageTimeout = setTimeout($d.$2B, 500);
                    }
                };
                if (!this.cssOnly) {
                    $u.style.textAlign = "left";
                };
                var $U = document.createElement("div");
                $U.setAttribute("unselectable", "on");
                $U.onclick = function() {
                    $d.nav.message.style.display = 'none';
                };
                if (!this.cssOnly) {
                    $U.style.padding = "5px";
                } else {
                    $U.className = this.$1W("_message");
                };
                $u.appendChild($U);
                var close = document.createElement("div");
                close.setAttribute("unselectable", "on");
                close.style.position = "absolute";
                if (!this.cssOnly) {
                    close.style.top = "5px";
                    close.style.right = (DayPilot.sw($d.nav.scroll) + 5) + "px";
                    close.style.color = $0J;
                    close.style.lineHeight = "100%";
                    close.style.cursor = "pointer";
                    close.style.fontWeight = "bold";
                    close.innerHTML = "X";
                } else {
                    close.className = this.$1W("_message_close");
                };
                close.onclick = function() {
                    $d.nav.message.style.display = 'none';
                };
                $u.appendChild(close);
                this.nav.top.appendChild($u);
                this.nav.message = $u;
            };
            var $0N = function() {
                $d.nav.message.style.opacity = $0L;
                var $U = $d.nav.message.firstChild;
                if (!$d.cssOnly) {
                    $U.style.backgroundColor = $0K;
                    $U.style.color = $0J;
                };
                $U.innerHTML = $0H;
                var end = function() {
                    $d.messageTimeout = setTimeout($d.$2B, $0I);
                };
                DayPilot.fade($d.nav.message, 0.2, end);
            };
            clearTimeout($d.messageTimeout);
            if (this.nav.message.style.display !== 'none') {
                DayPilot.fade($d.nav.message, -0.2, $0N);
            } else {
                $0N();
            }
        };
        this.message.show = function($0H) {
            $d.message($0H);
        };
        this.message.hide = function() {
            $d.$2B();
        };
        this.$2B = function() {
            var end = function() {
                $d.nav.message.style.display = 'none';
            };
            DayPilot.fade($d.nav.message, -0.2, end);
        };
        this.$2C = function(ev) {
            if ($d.heightSpec === "Parent100Pct") {
                $d.$1R();
            }
        };
        this.$1R = function() {
            if (this.heightSpec === 'Parent100Pct') {
                this.nav.top.style.height = "100%";
                var $K = this.nav.top.clientHeight;
                this.nav.scrollable.style.height = ($K - $O.headerHeight()) + "px";
            } else {
                this.nav.top.style.height = this.$2w() + 'px';
            };
            for (var x = 0; x < this.cells.length; x++) {
                for (var y = 0; y < this.cells[x].length; y++) {
                    this.cells[x][y].style.top = this.$28(y) + 'px';
                    this.cells[x][y].style.height = this.rows[y].getHeight() + 'px';
                }
            };
            this.$2D();
        };
        this.$2p = function(x, y) {
            var $0O = Math.floor(this.nav.top.clientWidth / this.$21());
            var $0P = Math.min(Math.floor(x / $0O), this.$21() - 1);
            var $q = null;
            var $0Q = 0;
            var $K = 0;
            var $0R = 0;
            for (var i = 0; i < this.rows.length; i++) {
                $K += this.rows[i].getHeight();
                if (y < $K) {
                    $0Q = y - $0R;
                    $q = i;
                    break;
                };
                $0R = $K;
            };
            if ($q === null) {
                $q = this.rows.length - 1;
            };
            var $t = {};
            $t.x = $0P;
            $t.y = $q;
            $t.relativeY = $0Q;
            return $t;
        };
        this.$2A = function($0k) {
            var $C = DayPilot.Date.daysDiff(this.firstDate, $0k);
            var $t = {
                x: 0,
                y: 0
            };
            while ($C >= 7) {
                $t.y++;
                $C -= 7;
            };
            $t.x = $C;
            return $t;
        };
        this.$2D = function() {
            var $C = DayPilot.sw(this.nav.scrollable);
            this.nav.header.style.marginRight = $C + "px";
        };
        this.$1Q = function() {
            var $0A = this.nav.header;
            var $0C = this.nav.events;
            this.cells = [];
            for (var x = 0; x < this.$21(); x++) {
                this.cells[x] = [];
                var $0S = this.headerProperties ? this.headerProperties[x] : null;
                var $0T = x + $O.getWeekStart();
                if ($0T > 6) {
                    $0T -= 7;
                };
                if (!$0S) {
                    var $0S = {};
                    $0S.html = $O.locale().dayNames[$0T];
                    if (!this.cssOnly) {
                        $0S.backColor = this.headerBackColor;
                    }
                };
                if (typeof $d.onBeforeHeaderRender === 'function') {
                    var $n = {};
                    $n.header = {};
                    $n.header.dayOfWeek = $0T;
                    DayPilot.Util.copyProps($0S, $n.header, ['html', 'backColor']);
                    $d.onBeforeHeaderRender($n);
                    DayPilot.Util.copyProps($n.header, $0S, ['html', 'backColor']);
                };
                var $0U = document.createElement("div");
                $0U.setAttribute("unselectable", "on");
                $0U.style.position = 'absolute';
                $0U.style.left = (this.$2a() * x) + '%';
                $0U.style.width = (this.$2a()) + '%';
                $0U.style.top = '0px';
                $0U.style.height = ($O.headerHeight()) + 'px';
                (function(x) {
                    $0U.onclick = function() {
                        $d.$2E(x);
                    };
                })($0T);
                var $U = document.createElement("div");
                $U.setAttribute("unselectable", "on");
                $U.className = this.$1W("_header_inner");
                $U.innerHTML = $0S.html;
                $0U.appendChild($U);
                if (!this.cssOnly) {
                    $U.style.position = "absolute";
                    $U.style.top = "0px";
                    $U.style.bottom = "0px";
                    $U.style.left = "0px";
                    $U.style.right = "0px";
                    $U.style.backgroundColor = $0S.backColor;
                    $U.style.fontFamily = this.headerFontFamily;
                    $U.style.fontSize = this.headerFontSize;
                    $U.style.color = this.headerFontColor;
                    $U.style.textAlign = 'center';
                    $U.style.cursor = 'default';
                    $U.className = this.$1W("header");
                    if (x !== this.$21() - 1) {
                        $U.style.borderRight = '1px solid ' + this.borderColor;
                    }
                } else {
                    $0U.className = this.$1W("_header");
                    if ($0S && $0S.backColor) {
                        $U.style.background = $0S.backColor;
                    }
                };
                $0A.appendChild($0U);
                for (var y = 0; y < this.rows.length; y++) {
                    this.$2F(x, y, $0C);
                }
            };
            /*var $u = document.createElement("div");
            $u.style.position = 'absolute';
            $u.style.padding = '2px';
            $u.style.top = '0px';
            $u.style.left = '0px';
            $u.style.backgroundColor = "#FF6600";
            $u.style.color = "white";
            $u.innerHTML = "\u0044\u0045\u004D\u004F";
            if (this.numberFormat) this.nav.top.appendChild($u);*/
        };
        this.$1P = function() {
            for (var x = 0; x < this.cells.length; x++) {
                for (var y = 0; y < this.cells[x].length; y++) {
                    this.cells[x][y].onclick = null;
                }
            };
            this.nav.header.innerHTML = '';
            this.nav.events.innerHTML = '';
        };
        this.$2F = function(x, y, $0A) {
            var $q = this.rows[y];
            var d = new DayPilot.Date(DayPilot.Date.addDays(this.firstDate, y * 7 + x));
            var $0V = this.cellProperties ? this.cellProperties[y * this.$21() + x] : null;
            var $0W = null;
            if ($0V) {
                $0W = $0V["headerHtml"];
            } else {
                var $0k = d.getDay();
                if ($0k === 1) {
                    $0W = $O.locale().monthNames[d.getMonth()] + ' ' + $0k;
                } else {
                    $0W = $0k + "";
                }
            };
            if (!$0V) {
                var $0V = {};
                $0V.business = !$d.isWeekend(d);
            };
            if (typeof $d.onBeforeCellRender === 'function') {
                var $n = {};
                $n.cell = {};
                $n.cell.areas = null;
                $n.cell.backColor = null;
                $n.cell.backImage = null;
                $n.cell.backRepeat = null;
                $n.cell.business = $d.isWeekend(d);
                $n.cell.headerHtml = $0W;
                $n.cell.headerBackColor = null;
                $n.cell.cssClass = null;
                $n.cell.html = null;
                $n.cell.start = d;
                $n.cell.end = $n.cell.start.addDays(1);
                DayPilot.Util.copyProps($0V, $n.cell);
                $d.onBeforeCellRender($n);
                DayPilot.Util.copyProps($n.cell, $0V, ['areas', 'backColor', 'backImage', 'backRepeat', 'business', 'headerHtml', 'headerBackColor', 'cssClass', 'html']);
            };
            var $t = document.createElement("div");
            $t.setAttribute("unselectable", "on");
            $t.style.position = 'absolute';
            $t.style.cursor = 'default';
            $t.style.left = (this.$2a() * x) + '%';
            $t.style.width = (this.$2a()) + '%';
            $t.style.top = (this.$28(y)) + 'px';
            $t.style.height = ($q.getHeight()) + 'px';
            $t.d = d;
            $t.x = x;
            $t.y = y;
            $t.properties = $0V;
            var $0o = this.startDate.addMonths(-1).getMonth();
            var $0X = this.startDate.addMonths(1).getMonth();
            var $0Y = this.startDate.getMonth();
            var $U = document.createElement("div");
            $U.setAttribute("unselectable", "on");
            $t.appendChild($U);
            if (this.cssOnly) {
                $U.className = this.$1W("_cell_inner");
            };
            if (!this.cssOnly) {
                $U.style.position = "absolute";
                $U.style.left = "0px";
                $U.style.right = "0px";
                $U.style.top = "0px";
                $U.style.bottom = "0px";
                if (d.getMonth() === $0Y) {
                    $t.className = this.$1W("cell");
                } else if (d.getMonth() === $0o) {
                    $t.className = this.$1W("cell") + " " + this.$1W("previous");
                } else if (d.getMonth() === $0X) {
                    $t.className = this.$1W("cell") + " " + this.$1W("next");
                };
                if ($0V) {
                    if ($0V["backColor"]) {
                        $U.style.background = $0V["backColor"];
                    };
                    if ($0V["cssClass"]) {
                        $U.className += " " + this.$1W($0V["cssClass"]);
                    };
                    if ($0V["backImage"]) {
                        $U.style.backgroundImage = "url('" + $0V["backImage"] + "')";
                    };
                    if ($0V["backRepeat"]) {
                        $U.style.backgroundRepeat = $0V["backRepeat"];
                    }
                } else {
                    $U.style.background = this.$2G(d);
                };
                if (x !== this.$21() - 1) {
                    $U.style.borderRight = '1px solid ' + this.innerBorderColor;
                };
                if (y === 0) {
                    $U.style.borderTop = '1px solid ' + this.borderColor;
                };
                $U.style.borderBottom = '1px solid ' + this.innerBorderColor;
            } else {
                $U.className = this.$1W("_cell_inner");
                if (d.getMonth() === $0Y) {
                    $t.className = this.$1W("_cell");
                } else if (d.getMonth() === $0o) {
                    $t.className = this.$1W("_cell") + " " + this.$1W("_previous");
                } else if (d.getMonth() === $0X) {
                    $t.className = this.$1W("_cell") + " " + this.$1W("_next");
                } else {
                    $a();
                };
                if ($0V) {
                    if ($0V["cssClass"]) {
                        DayPilot.Util.addClass($t, $0V.cssClass);
                    };
                    if ($0V["business"]) {
                        DayPilot.Util.addClass($t, this.$1W("_cell_business"));
                    };
                    if ($0V["backColor"]) {
                        $U.style.backgroundColor = $0V["backColor"];
                    };
                    if ($0V["backImage"]) {
                        $U.style.backgroundImage = "url('" + $0V["backImage"] + "')";
                    };
                    if ($0V["backRepeat"]) {
                        $U.style.backgroundRepeat = $0V["backRepeat"];
                    }
                }
            };
            $t.onmousedown = this.$2H;
            $t.onmousemove = this.$2I;
            $t.onmouseout = this.$2J;
            $t.oncontextmenu = this.$2K;
            $t.onclick = this.$2L;
            $t.ondblclick = this.$2M;
            var $0Z = document.createElement("div");
            $0Z.setAttribute("unselectable", "on");
            $0Z.style.height = this.cellHeaderHeight + "px";
            if (!this.cssOnly) {
                if ($0V && $0V["headerBackColor"]) {
                    $0Z.style.backgroundColor = $0V["headerBackColor"];
                } else if (this.cellHeaderBackColor) {
                    $0Z.style.backgroundColor = this.cellHeaderBackColor;
                };
                $0Z.style.paddingRight = '2px';
                $0Z.style.textAlign = "right";
                $0Z.style.fontFamily = this.cellHeaderFontFamily;
                $0Z.style.fontSize = this.cellHeaderFontSize;
                $0Z.style.color = this.cellHeaderFontColor;
                $0Z.className = this.$1W("cellheader");
            } else {
                if ($0V && $0V["headerBackColor"]) {
                    $0Z.style.background = $0V["headerBackColor"];
                };
                $0Z.className = this.$1W("_cell_header");
            };
            $0Z.innerHTML = $0W;
            $U.appendChild($0Z);
            if ($0V && $0V["html"]) {
                var $0H = document.createElement("div");
                $0H.setAttribute("unselectable", "on");
                $0H.style.height = ($q.getHeight() - this.cellHeaderHeight) + 'px';
                $0H.style.overflow = 'hidden';
                $0H.innerHTML = $0V["html"];
                $U.appendChild($0H);
            };
            if (this.cellMode) {
                var $10 = document.createElement("div");
                $10.setAttribute("unselectable", "on");
                $10.style.height = (this.cellHeight - this.cellHeaderHeight) + "px";
                $10.style.overflow = 'auto';
                $10.style.position = 'relative';
                var $M = document.createElement('div');
                $M.setAttribute("unselectable", "on");
                $M.style.paddingTop = "1px";
                $M.style.paddingBottom = "1px";
                $10.appendChild($M);
                $U.appendChild($10);
                $t.body = $M;
                $t.scrolling = $10;
            };
            if ($t.properties) {
                var $01 = $t.properties.areas || [];
                for (var i = 0; i < $01.length; i++) {
                    var $02 = $01[i];
                    if ($02.v !== 'Visible') {
                        continue;
                    };
                    var a = DayPilot.Areas.createArea($t, $t.properties, $02);
                    $t.appendChild(a);
                }
            };
            this.cells[x][y] = $t;
            $0A.appendChild($t);
        };
        this.$2I = function() {
            var c = this;
            if (c.properties) {
                DayPilot.Areas.showAreas(c, c.properties);
            }
        };
        this.$2J = function(ev) {
            var c = this;
            if (c.properties) {
                DayPilot.Areas.hideAreas(c, ev);
            }
        };
        this.$2K = function() {
            var d = this.d;
            var go = function(d) {
                var $0b = new DayPilot.Date(d);
                var end = $0b.addDays(1);
                var $11 = new DayPilot.Selection($0b, end, null, $d);
                if ($d.contextMenuSelection) {
                    $d.contextMenuSelection.show($11);
                }
            };
            go(d);
        };
        this.$2M = function() {
            var d = this.d;
            if ($d.timeouts) {
                for (var $12 in $d.timeouts) {
                    window.clearTimeout($d.timeouts[$12]);
                };
                $d.timeouts = null;
            };
            if ($d.timeRangeDoubleClickHandling !== 'Disabled') {
                var $0b = new DayPilot.Date(d);
                var end = $0b.addDays(1);
                $d.$2N($0b, end);
            }
        };
        this.$2L = function() {
            if (DayPilotMonth.cancelCellClick) {
                return;
            };
            var d = this.d;
            var $13 = function(d) {
                var $0b = new DayPilot.Date(d);
                var end = $0b.addDays(1);
                $d.$2t($0b, end);
            };
            if ($d.timeRangeSelectedHandling !== 'Disabled' && $d.timeRangeDoubleClickHandling === 'Disabled') {
                $13(d);
                return;
            };
            if (!$d.timeouts) {
                $d.timeouts = [];
            };
            var $14 = function(d) {
                return function() {
                    $13(d);
                };
            };
            $d.timeouts.push(window.setTimeout($14(d), $d.doubleClickTimeout));
        };
        this.$2H = function(e) {
            var $t = this;
            var x = $t.x;
            var y = $t.y;
            DayPilotMonth.cancelCellClick = false;
            if ($t.scrolling) {
                var $D = DayPilot.mo3($t.scrolling, e);
                var sw = DayPilot.sw($t.scrolling);
                var $C = $t.scrolling.offsetWidth;
                if ($D.x > $C - sw) {
                    return;
                }
            };
            if ($d.timeRangeSelectedHandling !== 'Disabled') {
                $d.$2b();
                DayPilotMonth.timeRangeSelecting = {
                    "root": $d,
                    "x": x,
                    "y": y,
                    "from": {
                        x: x,
                        y: y
                    },
                    "width": 1
                };
            }
        };
        this.$21 = function() {
            if (this.showWeekend) {
                return 7;
            } else {
                return 5;
            }
        };
        this.$2a = function() {
            if (this.showWeekend) {
                return 14.285;
            } else {
                return 20;
            }
        };
        this.$2G = function(d) {
            if (d.getUTCDay() === 6 || d.getUTCDay() === 0) {
                return this.nonBusinessBackColor;
            };
            return this.backColor;
        };
        this.$28 = function($0x) {
            var top = 0;
            for (var i = 0; i < $0x; i++) {
                top += this.rows[i].getHeight();
            };
            return top;
        };
        this.clearSelection = function() {
            this.$2b();
        };
        this.$2O = function($15, $j, $16) {
            var $17 = {};
            $17.action = $15;
            $17.parameters = $16;
            $17.data = $j;
            $17.header = this.$2P();
            var $18 = "JSON" + DayPilot.JSON.stringify($17);
            __doPostBack($d.uniqueID, $18);
        };
        this.$2Q = function($15, $16, $j, $19) {
            if (typeof $19 === 'undefined') {
                $19 = "CallBack";
            };
            var $17 = {};
            $17.action = $15;
            $17.type = $19;
            $17.parameters = $16;
            $17.data = $j;
            $17.header = this.$2P();
            var $18 = "JSON" + DayPilot.JSON.stringify($17);
            if (this.backendUrl) {
                DayPilot.request(this.backendUrl, this.$2R, $18, this.$2S);
            } else if (typeof WebForm_DoCallback === 'function') {
                WebForm_DoCallback(this.uniqueID, $18, this.$1J, null, this.callbackError, true);
            }
        };
        this.$2S = function($1a) {
            if (typeof $d.onAjaxError === 'function') {
                var $n = {};
                $n.request = $1a;
                $d.onAjaxError($n);
            } else if (typeof $d.ajaxError === 'function') {
                $d.ajaxError($1a);
            }
        };
        this.$2R = function($1b) {
            $d.$1J($1b.responseText);
        };
        this.$2P = function() {
            var h = {};
            h.v = this.v;
            h.control = "dpm";
            h.id = this.id;
            h.visibleStart = new DayPilot.Date(this.firstDate);
            h.visibleEnd = h.visibleStart.addDays(this.days);
            h.clientState = this.clientState;
            h.cssOnly = $d.cssOnly;
            h.cssClassPrefix = $d.cssClassPrefix;
            h.startDate = $d.startDate;
            h.showWeekend = this.showWeekend;
            h.headerBackColor = this.headerBackColor;
            h.backColor = this.backColor;
            h.nonBusinessBackColor = this.nonBusinessBackColor;
            h.locale = this.locale;
            h.timeFormat = this.timeFormat;
            h.weekStarts = this.weekStarts;
            h.viewType = this.viewType;
            h.weeks = this.weeks;
            h.selected = $d.multiselect.events();
            h.hashes = $d.hashes;
            return h;
        };
        this.$2T = function($19, $15, $1c, $j) {
            if ($19 === 'PostBack') {
                $d.postBack2($15, $1c, $j);
            } else if ($19 === 'CallBack') {
                $d.$2Q($15, $1c, $j, "CallBack");
            } else if ($19 === 'Immediate') {
                $d.$2Q($15, $1c, $j, "Notify");
            } else if ($19 === 'Queue') {
                $d.queue.add(new DayPilot.Action(this, $15, $1c, $j));
            } else if ($19 === 'Notify') {
                if ($O.notifyType() === 'Notify') {
                    $d.$2Q($15, $1c, $j, "Notify");
                } else {
                    $d.queue.add(new DayPilot.Action($d, $15, $1c, $j));
                }
            } else {
                throw "Invalid event invocation type";
            }
        };
        this.$2U = function($n, $h) {
            var $g = $d.$2V($h);
            var $1c = {};
            $1c.args = $n;
            $1c.guid = $g;
            $d.$2Q("Bubble", $1c);
        };
        this.$2V = function($h) {
            var $g = DayPilot.guid();
            if (!this.bubbles) {
                this.bubbles = [];
            };
            this.bubbles[$g] = $h;
            return $g;
        };
        this.eventClickPostBack = function(e, $j) {
            this.$2O("EventClick", $j, e);
        };
        this.eventClickCallBack = function(e, $j) {
            this.$2Q('EventClick', e, $j);
        };
        this.$2k = function($u, e) {
            DayPilotMonth.movingEvent = null;
            DayPilotMonth.resizingEvent = null;
            var e = e || window.event;
            var $1d = e.ctrlKey;
            e.cancelBubble = true;
            if (e.stopPropagation) {
                e.stopPropagation();
            };
            if (typeof(DayPilotBubble) !== 'undefined') {
                DayPilotBubble.hideActive();
            };
            if ($d.eventDoubleClickHandling === 'Disabled') {
                $d.$2r($u, $1d);
                return;
            };
            if (!$d.timeouts) {
                $d.timeouts = [];
            } else {
                for (var $12 in $d.timeouts) {
                    window.clearTimeout($d.timeouts[$12]);
                };
                $d.timeouts = [];
            };
            var $1e = function($u, $1d) {
                return function() {
                    $d.$2r($u, $1d);
                };
            };
            $d.timeouts.push(window.setTimeout($1e($u, $1d), $d.doubleClickTimeout));
        };
        this.$2r = function($u, $1d) {
            var e = $u.event;
            if (!e.client.clickEnabled()) {
                return;
            };
            if ($d.$1V()) {
                var $n = {};
                $n.e = e;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $d.onEventClick === 'function') {
                    $d.onEventClick($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($d.eventClickHandling) {
                    case 'PostBack':
                        $d.eventClickPostBack(e);
                        break;
                    case 'CallBack':
                        $d.eventClickCallBack(e);
                        break;
                    case 'Select':
                        $d.$2W($u, e, $1d);
                        break;
                    case 'ContextMenu':
                        var $1f = e.client.contextMenu();
                        if ($1f) {
                            $1f.show(e);
                        } else {
                            if ($d.contextMenu) {
                                $d.contextMenu.show(e);
                            }
                        };
                        break;
                    case 'Bubble':
                        if ($d.bubble) {
                            $d.bubble.showEvent(e);
                        };
                        break;
                };
                if (typeof $d.onEventClicked === 'function') {
                    $d.onEventClicked($n);
                }
            } else {
                switch ($d.eventClickHandling) {
                    case 'PostBack':
                        $d.eventClickPostBack(e);
                        break;
                    case 'CallBack':
                        $d.eventClickCallBack(e);
                        break;
                    case 'JavaScript':
                        $d.onEventClick(e);
                        break;
                    case 'Select':
                        $d.$2W($u, e, $1d);
                        break;
                    case 'ContextMenu':
                        var $1f = e.client.contextMenu();
                        if ($1f) {
                            $1f.show(e);
                        } else {
                            if ($d.contextMenu) {
                                $d.contextMenu.show(e);
                            }
                        };
                        break;
                    case 'Bubble':
                        if ($d.bubble) {
                            $d.bubble.showEvent(e);
                        };
                        break;
                }
            }
        };
        this.eventDoubleClickPostBack = function(e, $j) {
            this.$2O('EventDoubleClick', $j, e);
        };
        this.eventDoubleClickCallBack = function(e, $j) {
            this.$2Q('EventDoubleClick', e, $j);
        };
        this.$2l = function($u, ev) {
            if (typeof(DayPilotBubble) !== 'undefined') {
                DayPilotBubble.hideActive();
            };
            if ($d.timeouts) {
                for (var $12 in $d.timeouts) {
                    window.clearTimeout($d.timeouts[$12]);
                };
                $d.timeouts = null;
            };
            var ev = ev || window.event;
            var e = $u.event;
            if ($d.$1V()) {
                var $n = {};
                $n.e = e;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $d.onEventDoubleClick === 'function') {
                    $d.onEventDoubleClick($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($d.eventDoubleClickHandling) {
                    case 'PostBack':
                        $d.eventDoubleClickPostBack(e);
                        break;
                    case 'CallBack':
                        $d.eventDoubleClickCallBack(e);
                        break;
                    case 'Select':
                        $d.$2W($u, e, ev.ctrlKey);
                        break;
                    case 'Bubble':
                        if ($d.bubble) {
                            $d.bubble.showEvent(e);
                        };
                        break;
                };
                if (typeof $d.onEventDoubleClicked === 'function') {
                    $d.onEventDoubleClicked($n);
                }
            } else {
                switch ($d.eventDoubleClickHandling) {
                    case 'PostBack':
                        $d.eventDoubleClickPostBack(e);
                        break;
                    case 'CallBack':
                        $d.eventDoubleClickCallBack(e);
                        break;
                    case 'JavaScript':
                        $d.onEventDoubleClick(e);
                        break;
                    case 'Select':
                        $d.$2W($u, e, ev.ctrlKey);
                        break;
                    case 'Bubble':
                        if ($d.bubble) {
                            $d.bubble.showEvent(e);
                        };
                        break;
                }
            }
        };
        this.$2W = function($u, e, $1d) {
            $d.$2X($u, e, $1d);
        };
        this.eventSelectPostBack = function(e, $1g, $j) {
            var $1c = {};
            $1c.e = e;
            $1c.change = $1g;
            this.$2O('EventSelect', $j, $1c);
        };
        this.eventSelectCallBack = function(e, $1g, $j) {
            var $1c = {};
            $1c.e = e;
            $1c.change = $1g;
            this.$2Q('EventSelect', $1c, $j);
        };
        this.$2X = function($u, e, $1d) {
            if ($d.$1V()) {
                var m = $d.multiselect;
                m.previous = m.events();
                var $n = {};
                $n.e = e;
                $n.selected = m.isSelected(e);
                $n.ctrl = $1d;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $d.onEventSelect === 'function') {
                    $d.onEventSelect($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($d.eventSelectHandling) {
                    case 'PostBack':
                        $d.eventSelectPostBack(e, $1g);
                        break;
                    case 'CallBack':
                        if (typeof WebForm_InitCallback !== 'undefined') {
                            __theFormPostData = "";
                            __theFormPostCollection = [];
                            WebForm_InitCallback();
                        };
                        $d.eventSelectCallBack(e, $1g);
                        break;
                    case 'Update':
                        m.$2Y($u, $1d);
                        break;
                };
                if (typeof $d.onEventSelected === 'function') {
                    $n.change = m.isSelected(e) ? "selected" : "deselected";
                    $n.selected = m.isSelected(e);
                    $d.onEventSelected($n);
                }
            } else {
                var m = $d.multiselect;
                m.previous = m.events();
                m.$2Y($u, $1d);
                var $1g = m.isSelected(e) ? "selected" : "deselected";
                switch ($d.eventSelectHandling) {
                    case 'PostBack':
                        $d.eventSelectPostBack(e, $1g);
                        break;
                    case 'CallBack':
                        if (typeof WebForm_InitCallback !== 'undefined') {
                            __theFormPostData = "";
                            __theFormPostCollection = [];
                            WebForm_InitCallback();
                        };
                        $d.eventSelectCallBack(e, $1g);
                        break;
                    case 'JavaScript':
                        $d.onEventSelect(e, $1g);
                        break;
                }
            }
        };
        this.eventRightClickPostBack = function(e, $j) {
            this.$2O("EventRightClick", $j, e);
        };
        this.eventRightClickCallBack = function(e, $j) {
            this.$2Q('EventRightClick', e, $j);
        };
        this.$2o = function(e) {
            this.event = e;
            if (!e.client.rightClickEnabled()) {
                return false;
            };
            if ($d.$1V()) {
                var $n = {};
                $n.e = e;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $d.onEventRightClick === 'function') {
                    $d.onEventRightClick($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($d.eventRightClickHandling) {
                    case 'PostBack':
                        $d.eventRightClickPostBack(e);
                        break;
                    case 'CallBack':
                        $d.eventRightClickCallBack(e);
                        break;
                    case 'ContextMenu':
                        var $1f = e.client.contextMenu();
                        if ($1f) {
                            $1f.show(e);
                        } else {
                            if ($d.contextMenu) {
                                $d.contextMenu.show(this.event);
                            }
                        };
                        break;
                    case 'Bubble':
                        if ($d.bubble) {
                            $d.bubble.showEvent(e);
                        };
                        break;
                };
                if (typeof $d.onEventRightClicked === 'function') {
                    $d.onEventRightClicked($n);
                }
            } else {
                switch ($d.eventRightClickHandling) {
                    case 'PostBack':
                        $d.eventRightClickPostBack(e);
                        break;
                    case 'CallBack':
                        $d.eventRightClickCallBack(e);
                        break;
                    case 'JavaScript':
                        $d.onEventRightClick(e);
                        break;
                    case 'ContextMenu':
                        var $1f = e.client.contextMenu();
                        if ($1f) {
                            $1f.show(e);
                        } else {
                            if ($d.contextMenu) {
                                $d.contextMenu.show(this.event);
                            }
                        };
                        break;
                    case 'Bubble':
                        if ($d.bubble) {
                            $d.bubble.showEvent(e);
                        };
                        break;
                }
            };
            return false;
        };
        this.eventMenuClickPostBack = function(e, $1h, $j) {
            var $1c = {};
            $1c.e = e;
            $1c.command = $1h;
            this.$2O('EventMenuClick', $j, $1c);
        };
        this.eventMenuClickCallBack = function(e, $1h, $j) {
            var $1c = {};
            $1c.e = e;
            $1c.command = $1h;
            this.$2Q('EventMenuClick', $1c, $j);
        };
        this.$2Z = function($1h, e, $1i) {
            switch ($1i) {
                case 'PostBack':
                    $d.eventMenuClickPostBack(e, $1h);
                    break;
                case 'CallBack':
                    $d.eventMenuClickCallBack(e, $1h);
                    break;
            }
        };
        this.eventMovePostBack = function(e, $1j, $1k, $j, $0c) {
            if (!$1j) throw 'newStart is null';
            if (!$1k) throw 'newEnd is null';
            var $1c = {};
            $1c.e = e;
            $1c.newStart = $1j;
            $1c.newEnd = $1k;
            $1c.position = $0c;
            this.$2O('EventMove', $j, $1c);
        };
        this.eventMoveCallBack = function(e, $1j, $1k, $j, $0c) {
            if (!$1j) throw 'newStart is null';
            if (!$1k) throw 'newEnd is null';
            var $1c = {};
            $1c.e = e;
            $1c.newStart = $1j;
            $1c.newEnd = $1k;
            $1c.position = $0c;
            this.$2Q('EventMove', $1c, $j);
        };
        this.$2s = function(e, x, y, $D, ev, $0c) {
            var $1l = DayPilot.Date.getTime(e.start().d);
            var $0E = DayPilot.Date.getDate(e.end().d);
            if ($0E.getTime() !== e.end().d.getTime()) {
                $0E = DayPilot.Date.addDays($0E, 1);
            };
            var $1m = DayPilot.Date.diff(e.end().d, $0E);
            var $1n = this.$2c(x, y);
            $1n = DayPilot.Date.addDays($1n, -$D);
            var $C = DayPilot.Date.daysSpan(e.start().d, e.end().d) + 1;
            var $1o = DayPilot.Date.addDays($1n, $C);
            var $1j = new DayPilot.Date(DayPilot.Date.addTime($1n, $1l));
            var $1k = new DayPilot.Date(DayPilot.Date.addTime($1o, $1m));
            if ($d.$1V()) {
                var $n = {};
                $n.e = e;
                $n.newStart = $1j;
                $n.newEnd = $1k;
                $n.position = $0c;
                $n.ctrl = false;
                if (ev) {
                    $n.ctrl = ev.ctrlKey;
                };
                $n.shift = false;
                if (ev) {
                    $n.shift = ev.shiftKey;
                };
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $d.onEventMove === 'function') {
                    $d.onEventMove($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($d.eventMoveHandling) {
                    case 'PostBack':
                        $d.eventMovePostBack(e, $1j, $1k, null, $0c);
                        break;
                    case 'CallBack':
                        $d.eventMoveCallBack(e, $1j, $1k, null, $0c);
                        break;
                    case 'Notify':
                        $d.eventMoveNotify(e, $1j, $1k, null, $0c);
                        break;
                    case 'Update':
                        e.start($1j);
                        e.end($1k);
                        $d.events.update(e);
                        break;
                };
                if (typeof $d.onEventMoved === 'function') {
                    $d.onEventMoved($n);
                }
            } else {
                switch ($d.eventMoveHandling) {
                    case 'PostBack':
                        $d.eventMovePostBack(e, $1j, $1k, null, $0c);
                        break;
                    case 'CallBack':
                        $d.eventMoveCallBack(e, $1j, $1k, null, $0c);
                        break;
                    case 'JavaScript':
                        $d.onEventMove(e, $1j, $1k, ev.ctrlKey, ev.shiftKey, $0c);
                        break;
                    case 'Notify':
                        $d.eventMoveNotify(e, $1j, $1k, null, $0c);
                        break;
                }
            }
        };
        this.eventMoveNotify = function(e, $1j, $1k, $j, $v) {
            var $1p = new DayPilot.Event(e.copy(), this);
            e.start($1j);
            e.end($1k);
            e.commit();
            $d.update();
            this.$30("Notify", $1p, $1j, $1k, $j, $v);
        };
        this.$30 = function($19, e, $1j, $1k, $j, $v) {
            var $1c = {};
            $1c.e = e;
            $1c.newStart = $1j;
            $1c.newEnd = $1k;
            $1c.position = $v;
            this.$2T($19, "EventMove", $1c, $j);
        };
        this.eventResizePostBack = function(e, $1j, $1k, $j) {
            if (!$1j) throw 'newStart is null';
            if (!$1k) throw 'newEnd is null';
            var $1c = {};
            $1c.e = e;
            $1c.newStart = $1j;
            $1c.newEnd = $1k;
            this.$2O('EventResize', $j, $1c);
        };
        this.eventResizeCallBack = function(e, $1j, $1k, $j) {
            if (!$1j) throw 'newStart is null';
            if (!$1k) throw 'newEnd is null';
            var $1c = {};
            $1c.e = e;
            $1c.newStart = $1j;
            $1c.newEnd = $1k;
            this.$2Q('EventResize', $1c, $j);
        };
        this.$31 = function(e, $0b, $C) {
            var $1l = DayPilot.Date.getTime(e.start().d);
            var $0E = DayPilot.Date.getDate(e.end().d);
            if (!DayPilot.Date.equals($0E, e.end().d)) {
                $0E = DayPilot.Date.addDays($0E, 1);
            };
            var $1m = DayPilot.Date.diff(e.end().d, $0E);
            var $1n = this.$2c($0b.x, $0b.y);
            var $1o = DayPilot.Date.addDays($1n, $C);
            var $1j = new DayPilot.Date(DayPilot.Date.addTime($1n, $1l));
            var $1k = new DayPilot.Date(DayPilot.Date.addTime($1o, $1m));
            if ($d.$1V()) {
                var $n = {};
                $n.e = e;
                $n.newStart = $1j;
                $n.newEnd = $1k;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $d.onEventResize === 'function') {
                    $d.onEventResize($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($d.eventResizeHandling) {
                    case 'PostBack':
                        $d.eventResizePostBack(e, $1j, $1k);
                        break;
                    case 'CallBack':
                        $d.eventResizeCallBack(e, $1j, $1k);
                        break;
                    case 'Notify':
                        $d.eventResizeNotify(e, $1j, $1k);
                        break;
                    case 'Update':
                        e.start($1j);
                        e.end($1k);
                        $d.events.update(e);
                        break;
                };
                if (typeof $d.onEventResized === 'function') {
                    $d.onEventResized($n);
                }
            } else {
                switch ($d.eventResizeHandling) {
                    case 'PostBack':
                        $d.eventResizePostBack(e, $1j, $1k);
                        break;
                    case 'CallBack':
                        $d.eventResizeCallBack(e, $1j, $1k);
                        break;
                    case 'JavaScript':
                        $d.onEventResize(e, $1j, $1k);
                        break;
                    case 'Notify':
                        $d.eventResizeNotify(e, $1j, $1k);
                        break;
                }
            }
        };
        this.eventResizeNotify = function(e, $1j, $1k, $j) {
            var $1p = new DayPilot.Event(e.copy(), this);
            e.start($1j);
            e.end($1k);
            e.commit();
            $d.update();
            this.$32("Notify", $1p, $1j, $1k, $j);
        };
        this.$32 = function($19, e, $1j, $1k, $j) {
            var $1c = {};
            $1c.e = e;
            $1c.newStart = $1j;
            $1c.newEnd = $1k;
            this.$2T($19, "EventResize", $1c, $j);
        };
        this.timeRangeSelectedPostBack = function($0b, end, $j) {
            var $0g = {};
            $0g.start = $0b;
            $0g.end = end;
            this.$2O('TimeRangeSelected', $j, $0g);
        };
        this.timeRangeSelectedCallBack = function($0b, end, $j) {
            var $0g = {};
            $0g.start = $0b;
            $0g.end = end;
            this.$2Q('TimeRangeSelected', $0g, $j);
        };
        this.$2t = function($0b, end) {
            if ($d.$1V()) {
                var $n = {};
                $n.start = $0b;
                $n.end = end;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $d.onTimeRangeSelect === 'function') {
                    $d.onTimeRangeSelect($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($d.timeRangeSelectedHandling) {
                    case 'PostBack':
                        $d.timeRangeSelectedPostBack($0b, end);
                        $d.clearSelection();
                        break;
                    case 'CallBack':
                        $d.timeRangeSelectedCallBack($0b, end);
                        $d.clearSelection();
                        break;
                };
                if (typeof $d.onTimeRangeSelected === 'function') {
                    $d.onTimeRangeSelected($n);
                }
            } else {
                switch ($d.timeRangeSelectedHandling) {
                    case 'PostBack':
                        $d.timeRangeSelectedPostBack($0b, end);
                        $d.clearSelection();
                        break;
                    case 'CallBack':
                        $d.timeRangeSelectedCallBack($0b, end);
                        $d.clearSelection();
                        break;
                    case 'JavaScript':
                        $d.onTimeRangeSelected($0b, end);
                        break;
                }
            }
        };
        this.timeRangeMenuClickPostBack = function(e, $1h, $j) {
            var $1c = {};
            $1c.selection = e;
            $1c.command = $1h;
            this.$2O("TimeRangeMenuClick", $j, $1c);
        };
        this.timeRangeMenuClickCallBack = function(e, $1h, $j) {
            var $1c = {};
            $1c.selection = e;
            $1c.command = $1h;
            this.$2Q("TimeRangeMenuClick", $1c, $j);
        };
        this.$33 = function($1h, e, $1i) {
            switch ($1i) {
                case 'PostBack':
                    $d.timeRangeMenuClickPostBack(e, $1h);
                    break;
                case 'CallBack':
                    $d.timeRangeMenuClickCallBack(e, $1h);
                    break;
            }
        };
        this.headerClickPostBack = function(c, $j) {
            this.$2O('HeaderClick', $j, c);
        };
        this.headerClickCallBack = function(c, $j) {
            this.$2Q('HeaderClick', c, $j);
        };
        this.$2E = function(x) {
            var $j = this.data;
            var c = {
                $0Z: x
            };
            if ($d.$1V()) {
                var $n = {};
                $n.header = {};
                $n.header.dayOfWeek = x;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $d.onHeaderClick === 'function') {
                    $d.onHeaderClick($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($d.headerClickHandling) {
                    case 'PostBack':
                        $d.headerClickPostBack(c);
                        break;
                    case 'CallBack':
                        $d.headerClickCallBack(c);
                        break;
                };
                if (typeof $d.onHeaderClicked === 'function') {
                    $d.onHeaderClicked($n);
                }
            } else {
                switch ($d.headerClickHandling) {
                    case 'PostBack':
                        $d.headerClickPostBack(c);
                        break;
                    case 'CallBack':
                        $d.headerClickCallBack(c);
                        break;
                    case 'JavaScript':
                        $d.onHeaderClick(c);
                        break;
                }
            }
        };
        this.timeRangeDoubleClickPostBack = function($0b, end, $j) {
            var $0g = {};
            $0g.start = $0b;
            $0g.end = end;
            this.$2O('TimeRangeDoubleClick', $j, $0g);
        };
        this.timeRangeDoubleClickCallBack = function($0b, end, $j) {
            var $0g = {};
            $0g.start = $0b;
            $0g.end = end;
            this.$2Q('TimeRangeDoubleClick', $0g, $j);
        };
        this.$2N = function($0b, end) {
            if ($d.$1V()) {
                var $n = {};
                $n.start = $0b;
                $n.end = end;
                $n.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $d.onTimeRangeDoubleClick === 'function') {
                    $d.onTimeRangeDoubleClick($n);
                    if ($n.preventDefault.value) {
                        return;
                    }
                };
                switch ($d.timeRangeDoubleClickHandling) {
                    case 'PostBack':
                        $d.timeRangeDoubleClickPostBack($0b, end);
                        break;
                    case 'CallBack':
                        $d.timeRangeDoubleClickCallBack($0b, end);
                        break;
                };
                if (typeof $d.onTimeRangeDoubleClicked === 'function') {
                    $d.onTimeRangeDoubleClicked($n);
                }
            } else {
                switch ($d.timeRangeDoubleClickHandling) {
                    case 'PostBack':
                        $d.timeRangeDoubleClickPostBack($0b, end);
                        break;
                    case 'CallBack':
                        $d.timeRangeDoubleClickCallBack($0b, end);
                        break;
                    case 'JavaScript':
                        $d.onTimeRangeDoubleClick($0b, end);
                        break;
                }
            }
        };
        this.commandCallBack = function($1h, $j) {
            this.$34();
            var $1c = {};
            $1c.command = $1h;
            this.$2Q('Command', $1c, $j);
        };
        this.$35 = function(e) {
            for (var i = 0; i < $d.elements.events.length; i++) {
                var $u = $d.elements.events[i];
                if ($u.event === e || $u.event.data === e.data) {
                    return $u;
                }
            };
            return null;
        };
        this.$2m = function(e) {
            var $e = {};
            $e.list = [];
            $e.each = function(m) {
                if (!m) {
                    return;
                };
                for (var i = 0; i < this.list.length; i++) {
                    m(this.list[i]);
                }
            };
            for (var i = 0; i < this.elements.events.length; i++) {
                var $u = this.elements.events[i];
                if ($u.event.data === e.data) {
                    $e.list.push($u);
                }
            };
            return $e;
        };
        this.$36 = function($1q) {
            var $u = document.createElement("div");
            $u.style.position = "absolute";
            $u.style.top = "-2000px";
            $u.style.left = "-2000px";
            $u.className = this.$1W($1q);
            document.body.appendChild($u);
            var $K = $u.offsetHeight;
            var $C = $u.offsetWidth;
            document.body.removeChild($u);
            var $e = {};
            $e.height = $K;
            $e.width = $C;
            return $e;
        };
        this.$37 = {};
        var $O = this.$37;
        $O.lineHeight = function() {
            return $O.eventHeight() + $d.lineSpace;
        };
        $O.rounded = function() {
            return $d.eventCorners === "Rounded";
        };
        $O.loadFromServer = function() {
            if ($d.backendUrl || typeof WebForm_DoCallback === 'function') {
                return (typeof $d.events.list === 'undefined') || (!$d.events.list);
            } else {
                return false;
            }
        };
        $O.locale = function() {
            return DayPilot.Locale.find($d.locale);
        };
        $O.getWeekStart = function() {
            if ($d.showWeekend) {
                return $d.weekStarts;
            } else {
                return 1;
            }
        };
        $O.notifyType = function() {
            var $19;
            if ($d.notifyCommit === 'Immediate') {
                $19 = "Notify";
            } else if ($d.notifyCommit === 'Queue') {
                $19 = "Queue";
            } else {
                throw "Invalid notifyCommit value: " + $d.notifyCommit;
            };
            return $19;
        };
        $O.eventHeight = function() {
            if ($d.$1I.eventHeight) {
                return $d.$1I.eventHeight;
            };
            var $K = $d.$36("_event_height").height;
            if (!$K) {
                $K = $d.eventHeight;
            };
            $d.$1I.eventHeight = $K;
            return $K;
        };
        $O.headerHeight = function() {
            if ($d.$1I.headerHeight) {
                return $d.$1I.headerHeight;
            };
            var $K = $d.$36("_header_height").height;
            if (!$K) {
                $K = $d.headerHeight;
            };
            $d.$1I.headerHeight = $K;
            return $K;
        };
        this.multiselect = {};
        this.multiselect.initList = [];
        this.multiselect.list = [];
        this.multiselect.divs = [];
        this.multiselect.previous = [];
        this.multiselect.$38 = function() {
            var m = $d.multiselect;
            return DayPilot.JSON.stringify(m.events());
        };
        this.multiselect.events = function() {
            var m = $d.multiselect;
            var $1r = [];
            $1r.ignoreToJSON = true;
            for (var i = 0; i < m.list.length; i++) {
                $1r.push(m.list[i]);
            };
            return $1r;
        };
        this.multiselect.$39 = function() {};
        this.multiselect.$2Y = function($u, $1s) {
            var m = $d.multiselect;
            if (m.isSelected($u.event)) {
                if ($d.allowMultiSelect) {
                    if ($1s) {
                        m.remove($u.event, true);
                    } else {
                        var $0t = m.list.length;
                        m.clear(true);
                        if ($0t > 1) {
                            m.add($u.event, true);
                        }
                    }
                } else {
                    m.clear(true);
                }
            } else {
                if ($d.allowMultiSelect) {
                    if ($1s) {
                        m.add($u.event, true);
                    } else {
                        m.clear(true);
                        m.add($u.event, true);
                    }
                } else {
                    m.clear(true);
                    m.add($u.event, true);
                }
            };
            m.redraw();
            m.$39();
        };
        this.multiselect.$2j = function(ev) {
            var m = $d.multiselect;
            return m.$3a(ev, m.initList);
        };
        this.multiselect.$3b = function() {
            var m = $d.multiselect;
            var $1t = [];
            for (var i = 0; i < m.list.length; i++) {
                var event = m.list[i];
                $1t.push(event.value());
            };
            alert($1t.join("\n"));
        };
        this.multiselect.add = function(ev, $1u) {
            var m = $d.multiselect;
            if (m.indexOf(ev) === -1) {
                m.list.push(ev);
            };
            if ($1u) {
                return;
            };
            m.redraw();
        };
        this.multiselect.remove = function(ev, $1u) {
            var m = $d.multiselect;
            var i = m.indexOf(ev);
            if (i !== -1) {
                m.list.splice(i, 1);
            }
        };
        this.multiselect.clear = function($1u) {
            var m = $d.multiselect;
            m.list = [];
            if ($1u) {
                return;
            };
            m.redraw();
        };
        this.multiselect.redraw = function() {
            var m = $d.multiselect;
            for (var i = 0; i < $d.elements.events.length; i++) {
                var $u = $d.elements.events[i];
                if (m.isSelected($u.event)) {
                    m.$3c($u);
                } else {
                    m.$3d($u);
                }
            }
        };
        this.multiselect.$3c = function($u) {
            var m = $d.multiselect;
            var cn = $d.cssOnly ? $d.$1W("_selected") : $d.$1W("selected");
            var $u = m.$3e($u);
            DayPilot.Util.addClass($u, cn);
            m.divs.push($u);
        };
        this.multiselect.$3e = function($u) {
            if ($d.cssOnly) {
                return $u;
            };
            return $u.firstChild;
        };
        this.multiselect.$3f = function() {
            var m = $d.multiselect;
            for (var i = 0; i < m.divs.length; i++) {
                var $u = m.divs[i];
                m.$3d($u, true);
            };
            m.divs = [];
        };
        this.multiselect.$3d = function($u, $1v) {
            var m = $d.multiselect;
            var cn = $d.cssOnly ? $d.$1W("_selected") : $d.$1W("selected");
            var c = m.$3e($u);
            if (c && c.className && c.className.indexOf(cn) !== -1) {
                c.className = c.className.replace(cn, "");
            };
            if ($1v) {
                return;
            };
            var i = DayPilot.indexOf(m.divs, $u);
            if (i !== -1) {
                m.divs.splice(i, 1);
            }
        };
        this.multiselect.isSelected = function(ev) {
            return $d.multiselect.$3a(ev, $d.multiselect.list);
        };
        this.multiselect.indexOf = function(ev) {
            return DayPilot.indexOf($d.multiselect.list, ev);
        };
        this.multiselect.$3a = function(e, $1t) {
            if (!$1t) {
                return false;
            };
            for (var i = 0; i < $1t.length; i++) {
                var ei = $1t[i];
                if (e === ei) {
                    return true;
                };
                if (typeof ei.value === 'function') {
                    if (ei.value() !== null && e.value() !== null && ei.value() === e.value()) {
                        return true;
                    };
                    if (ei.value() === null && e.value() === null && ei.recurrentMasterId() === e.recurrentMasterId() && e.start().toStringSortable() === ei.start()) {
                        return true;
                    }
                } else {
                    if (ei.value !== null && e.value() !== null && ei.value === e.value()) {
                        return true;
                    };
                    if (ei.value === null && e.value() === null && ei.recurrentMasterId === e.recurrentMasterId() && e.start().toStringSortable() === ei.start) {
                        return true;
                    }
                }
            };
            return false;
        };
        this.events.find = function(id) {
            var $1w = $d.events.list.length;
            for (var i = 0; i < $1w; i++) {
                if ($d.events.list[i].id === id) {
                    return new DayPilot.Event($d.events.list[i], $d);
                }
            };
            return null;
        };
        this.events.findRecurrent = function($1x, $1y) {
            var $1w = $d.events.list.length;
            for (var i = 0; i < $1w; i++) {
                if ($d.events.list[i].recurrentMasterId === $1x && $d.events.list[i].start.getTime() === $1y.getTime()) {
                    return new DayPilot.Event($d.events.list[i], $d);
                }
            };
            return null;
        };
        this.events.update = function(e, $j) {
            var $1c = {};
            $1c.oldEvent = new DayPilot.Event(e.copy(), $d);
            $1c.newEvent = new DayPilot.Event(e.temp(), $d);
            var $15 = new DayPilot.Action($d, "EventUpdate", $1c, $j);
            e.commit();
            $d.update();
            return $15;
        };
        this.events.remove = function(e, $j) {
            var $1c = {};
            $1c.e = new DayPilot.Event(e.data, $d);
            var $15 = new DayPilot.Action($d, "EventRemove", $1c, $j);
            var $0x = DayPilot.indexOf($d.events.list, e.data);
            $d.events.list.splice($0x, 1);
            $d.update();
            return $15;
        };
        this.events.add = function(e, $j) {
            e.calendar = $d;
            if (!$d.events.list) {
                $d.events.list = [];
            };
            $d.events.list.push(e.data);
            var $1c = {};
            $1c.e = e;
            var $15 = new DayPilot.Action($d, "EventAdd", $1c, $j);
            $d.update();
            return $15;
        };
        this.queue = {};
        this.queue.list = [];
        this.queue.list.ignoreToJSON = true;
        this.queue.add = function($15) {
            if (!$15) {
                return;
            };
            if ($15.isAction) {
                $d.queue.list.push($15);
            } else {
                throw "DayPilot.Action object required for queue.add()";
            }
        };
        this.queue.notify = function($j) {
            var $1c = {};
            $1c.actions = $d.queue.list;
            $d.$2Q('Notify', $1c, $j, "Notify");
            $d.queue.list = [];
        };
        this.queue.clear = function() {
            $d.queue.list = [];
        };
        this.queue.pop = function() {
            return $d.queue.list.pop();
        };
        this.$1U = function($1z) {
            if ($1z) {
                this.autoRefreshEnabled = true;
            };
            if (!this.autoRefreshEnabled) {
                return;
            };
            if (this.autoRefreshCount >= this.autoRefreshMaxCount) {
                return;
            };
            this.$34();
            var $1A = this.autoRefreshInterval;
            if (!$1A || $1A < 10) {
                throw "The minimum autoRefreshInterval is 10 seconds";
            };
            this.autoRefreshTimeout = window.setTimeout(function() {
                $d.$3g();
            }, this.autoRefreshInterval * 1000);
        };
        this.$34 = function() {
            if (this.autoRefreshTimeout) {
                window.clearTimeout(this.autoRefreshTimeout);
            }
        };
        this.$3g = function() {
            if (!DayPilotMonth.eventResizing && !DayPilotMonth.eventMoving && !DayPilotMonth.timeRangeSelecting) {
                this.autoRefreshCount++;
                this.commandCallBack(this.autoRefreshCommand);
            };
            if (this.autoRefreshCount < this.autoRefreshMaxCount) {
                this.autoRefreshTimeout = window.setTimeout(function() {
                    $d.$3g();
                }, this.autoRefreshInterval * 1000);
            }
        };
        this.$3h = function($1B, $1C) {
            if (!this.debuggingEnabled) {
                return;
            };
            if (!$d.debugMessages) {
                $d.debugMessages = [];
            };
            $d.debugMessages.push($1B);
            if (typeof console !== 'undefined') {
                console.log($1B);
            }
        };
        this.update = function() {
            if (!this.cells) {
                return;
            };
            var $1D = true;
            $d.$1M();
            $d.$1N();
            $d.$1O();
            if ($1D) {
                $d.$1P();
                $d.$1Q();
            };
            $d.$1R();
            $d.$1S();
            $d.$1T();
        };
        this.dispose = function() {
            var c = $d;
            if (!c.nav.top) {
                return;
            };
            c.$34();
            c.$1M();
            c.nav.top.removeAttribute("style");
            c.nav.top.removeAttribute("class");
            c.nav.top.innerHTML = '';
            c.nav.top.dp = null;
            c.nav.top = null;
            DayPilotMonth.unregister(c);
        };
        this.$3i = function() {
            if (!DayPilotMonth.globalHandlers) {
                DayPilotMonth.globalHandlers = true;
                DayPilot.re(document, 'mouseup', DayPilotMonth.gMouseUp);
            };
            DayPilot.re(window, 'resize', this.$2C);
        };
        this.$1S = function() {
            if (this.nav.top.style.visibility === 'hidden') {
                this.nav.top.style.visibility = 'visible';
            }
        };
        this.show = function() {
            $d.nav.top.style.display = '';
        };
        this.hide = function() {
            $d.nav.top.style.display = 'none';
        };
        this.$3j = function() {
            this.$1N();
            this.$2y();
            this.$1Q();
            this.$3i();
            this.$1U();
            this.$2Q('Init');
            DayPilotMonth.register(this);
        };
        this.init = function() {
            this.nav.top = document.getElementById($c);
            if (this.nav.top.dp) {
                return;
            };
            var $1E = $O.loadFromServer();
            if ($1E) {
                this.$3j();
                this.initialized = true;
                return;
            };
            this.$1N();
            this.$1O();
            this.$2y();
            this.$1Q();
            this.$1S();
            this.$1T();
            this.$1R();
            this.$3i();
            if (this.messageHTML) {
                this.message(this.messageHTML);
            };
            this.$1L(null, false);
            this.$1U();
            DayPilotMonth.register(this);
            this.initialized = true;
        };
        this.internal = {};
        this.internal.invokeEvent = this.$2T;
        this.internal.eventMenuClick = this.$2Z;
        this.internal.timeRangeMenuClick = this.$33;
        this.internal.bubbleCallBack = this.$2U;
        this.internal.findEventDiv = this.$35;
        this.Init = this.init;
    };
    DayPilotMonth.register = function($d) {
        if (!DayPilotMonth.registered) {
            DayPilotMonth.registered = [];
        };
        for (var i = 0; i < DayPilotMonth.registered.length; i++) {
            if (DayPilotMonth.registered[i] === $d) {
                return;
            }
        };
        DayPilotMonth.registered.push($d);
    };
    DayPilotMonth.unregister = function($d) {
        var a = DayPilotMonth.registered;
        if (a) {
            var i = DayPilot.indexOf(a, $d);
            if (i !== -1) {
                a.splice(i, 1);
            };
            if (a.length === 0) {
                a = null;
            }
        };
        if (!a) {
            DayPilot.ue(document, 'mouseup', DayPilotMonth.gMouseUp);
            DayPilotMonth.globalHandlers = false;
        }
    };
    DayPilotMonth.gMouseUp = function(ev) {
        if (DayPilotMonth.movingEvent) {
            var $0a = DayPilotMonth.movingEvent;
            DayPilotMonth.movingEvent = null;
            if (!$0a.event || !$0a.event.calendar || !$0a.event.calendar.shadow || !$0a.event.calendar.shadow.start) {
                return;
            };
            var $d = $0a.event.calendar;
            var e = $0a.event;
            var $0b = $d.shadow.start;
            var $0c = $d.shadow.position;
            var $D = $0a.offset;
            $d.$2b();
            var ev = ev || window.event;
            $d.$2s(e, $0b.x, $0b.y, $D, ev, $0c);
            ev.cancelBubble = true;
            if (ev.stopPropagation) {
                ev.stopPropagation();
            };
            return false;
        } else if (DayPilotMonth.resizingEvent) {
            var $0a = DayPilotMonth.resizingEvent;
            DayPilotMonth.resizingEvent = null;
            if (!$0a.event || !$0a.event.calendar || !$0a.event.calendar.shadow || !$0a.event.calendar.shadow.start) {
                return;
            };
            var $d = $0a.event.calendar;
            var e = $0a.event;
            var $0b = $d.shadow.start;
            var $C = $d.shadow.width;
            $d.$2b();
            $d.$31(e, $0b, $C);
            ev.cancelBubble = true;
            return false;
        } else if (DayPilotMonth.timeRangeSelecting) {
            if (DayPilotMonth.timeRangeSelecting.moved) {
                var $0d = DayPilotMonth.timeRangeSelecting;
                var $d = $0d.root;
                var $0b = new DayPilot.Date($d.$2c($0d.from.x, $0d.from.y));
                var end = $0b.addDays($0d.width);
                $d.$2t($0b, end);
            };
            DayPilotMonth.timeRangeSelecting = null;
        }
    };
    DayPilot.MonthVisible.Month = DayPilotMonth.Month;
    if (typeof jQuery !== 'undefined') {
        (function($) {
            $.fn.daypilotMonth = function($1F) {
                var $1G = null;
                var j = this.each(function() {
                    if (this.daypilot) {
                        return;
                    };
                    var $1H = new DayPilot.Month(this.id);
                    this.daypilot = $1H;
                    for (var name in $1F) {
                        $1H[name] = $1F[name];
                    };
                    $1H.Init();
                    if (!$1G) {
                        $1G = $1H;
                    }
                });
                if (this.length === 1) {
                    return $1G;
                } else {
                    return j;
                }
            };
        })(jQuery);
    };
    if (typeof Sys !== 'undefined' && Sys.Application && Sys.Application.notifyScriptLoaded) {
        Sys.Application.notifyScriptLoaded();
    }
})();

if (typeof DayPilot === 'undefined') {
    var DayPilot = {};
};
if (typeof DayPilot.Global === 'undefined') {
    DayPilot.Global = {};
};
if (typeof DayPilotNavigator === 'undefined') {
    var DayPilotNavigator = DayPilot.NavigatorVisible = {};
};
(function() {
    if (typeof DayPilot.Navigator !== 'undefined') {
        return;
    };
    (function registerDefaultTheme() {
        if (DayPilot.Global.defaultNavigatorCss) {
            return;
        };
        var $a = DayPilot.sheet();
        $a.add(".navigator_default_main", "border-left: 1px solid #A0A0A0;border-right: 1px solid #A0A0A0;border-bottom: 1px solid #A0A0A0;background-color: white;color: #000000;");
        $a.add(".navigator_default_month", "font-family: Tahoma;font-size: 11px;");
        $a.add(".navigator_default_day", "color: black;");
        $a.add(".navigator_default_weekend", "background-color: #f0f0f0;");
        $a.add(".navigator_default_dayheader", "color: black;");
        $a.add(".navigator_default_line", "border-bottom: 1px solid #A0A0A0;");
        $a.add(".navigator_default_dayother", "color: gray;");
        $a.add(".navigator_default_todaybox", "border: 1px solid red;");
        $a.add(".navigator_default_select, .navigator_default_weekend.navigator_default_select", "background-color: #FFE794;");
        $a.add(".navigator_default_title, .navigator_default_titleleft, .navigator_default_titleright", 'border-top: 1px solid #A0A0A0;color: #666;background: #eee;background: -webkit-gradient(linear, left top, left bottom, from(#eeeeee), to(#dddddd));background: -webkit-linear-gradient(top, #eeeeee 0%, #dddddd);background: -moz-linear-gradient(top, #eeeeee 0%, #dddddd);background: -ms-linear-gradient(top, #eeeeee 0%, #dddddd);background: -o-linear-gradient(top, #eeeeee 0%, #dddddd);background: linear-gradient(top, #eeeeee 0%, #dddddd);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#eeeeee", endColorStr="#dddddd");');
        $a.add(".navigator_default_busy", "font-weight: bold;");
        $a.commit();
        DayPilot.Global.defaultNavigatorCss = true;
    })();
    DayPilotNavigator = {};
    DayPilot.Navigator = function(id, $b) {
        this.v = '710';
        var $c = this;
        this.id = id;
        this.api = 2;
        this.isNavigator = true;
        this.weekStarts = 'Auto';
        this.selectMode = 'day';
        this.titleHeight = 20;
        this.dayHeaderHeight = 20;
        this.cellWidth = 20;
        this.cellHeight = 20;
        this.cssOnly = true;
        this.cssClassPrefix = "navigator_default";
        this.selectionStart = new DayPilot.Date().getDatePart();
        this.selectionEnd = null;
        this.selectionDay = null;
        this.showMonths = 1;
        this.skipMonths = 1;
        this.command = "navigate";
        this.year = new DayPilot.Date().getYear();
        this.month = new DayPilot.Date().getMonth() + 1;
        this.showWeekNumbers = false;
        this.weekNumberAlgorithm = 'Auto';
        this.rowsPerMonth = 'Six';
        this.orientation = "Vertical";
        this.locale = "en-us";
        this.timeRangeSelectedHandling = "Bind";
        this.visibleRangeChangedHandling = "Enabled";
        this.$0a = function() {
            this.root.dp = this;
            if (this.cssOnly) {
                this.root.className = this.$0b('_main');
            } else {
                this.root.className = this.$0b('main');
            };
            if (this.orientation === "Horizontal") {
                this.root.style.width = this.showMonths * (this.cellWidth * 7 + this.$0c()) + 'px';
                this.root.style.height = (this.cellHeight * 6 + this.titleHeight + this.dayHeaderHeight) + 'px';
            } else {
                this.root.style.width = (this.cellWidth * 7 + this.$0c()) + 'px';
            };
            this.root.style.position = "relative";
            var $d = document.createElement("input");
            $d.type = 'hidden';
            $d.name = $c.id + "_state";
            $d.id = $d.name;
            this.root.appendChild($d);
            this.state = $d;
            if (!this.startDate) {
                this.startDate = new DayPilot.Date(DayPilot.Date.firstDayOfMonth(this.year, this.month));
            } else {
                this.startDate = new DayPilot.Date(this.startDate).firstDayOfMonth();
            };
            this.calendars = [];
            this.selected = [];
            this.months = [];
        };
        this.$0d = function() {
            return $c.api === 2;
        };
        this.$0e = function() {
            this.root.innerHTML = '';
        };
        this.$0b = function($e) {
            var $f = this.theme || this.cssClassPrefix;
            if ($f) {
                return $f + $e;
            } else {
                return "";
            }
        };
        this.$0f = function($g, name) {
            var $h = this.cssOnly ? this.$0b("_" + name) : this.$0b(name);
            DayPilot.Util.addClass($g, $h);
        };
        this.$0g = function($g, name) {
            var $h = this.cssOnly ? this.$0b("_" + name) : this.$0b(name);
            DayPilot.Util.removeClass($g, $h);
        };
        this.$0h = function(j, $i) {
            var $j = {};
            $j.cells = [];
            $j.days = [];
            $j.weeks = [];
            var $k = this.startDate.addMonths(j);
            var $l = $i.before;
            var $m = $i.after;
            var $n = $k.firstDayOfMonth();
            var $o = $n.firstDayOfWeek($p.weekStarts());
            var $q = $n.addMonths(1);
            var $r = DayPilot.Date.daysDiff($o.d, $q.d);
            var $s = (this.rowsPerMonth === "Auto") ? Math.ceil($r / 7) : 6;
            $j.rowCount = $s;
            var $t = (new DayPilot.Date()).getDatePart();
            var $u = this.cellWidth * 7 + this.$0c();
            var $v = this.cellHeight * $s + this.titleHeight + this.dayHeaderHeight;
            $j.height = $v;
            var $w = document.createElement("div");
            $w.style.width = ($u) + 'px';
            $w.style.height = ($v) + 'px';
            if (this.orientation === "Horizontal") {
                $w.style.position = "absolute";
                $w.style.left = ($u * j) + "px";
                $w.style.top = "0px";
            } else {
                $w.style.position = 'relative';
            };
            if (this.cssOnly) {
                $w.className = this.$0b('_month');
            } else {
                $w.className = this.$0b('month');
            };
            $w.style.cursor = 'default';
            $w.style.MozUserSelect = 'none';
            $w.style.KhtmlUserSelect = 'none';
            $w.style.WebkitUserSelect = 'none';
            $w.month = $j;
            this.root.appendChild($w);
            var $x = this.titleHeight + this.dayHeaderHeight;
            var tl = document.createElement("div");
            tl.style.position = 'absolute';
            tl.style.left = '0px';
            tl.style.top = '0px';
            tl.style.width = this.cellWidth + 'px';
            tl.style.height = this.titleHeight + 'px';
            tl.style.lineHeight = this.titleHeight + 'px';
            tl.style.textAlign = 'left';
            tl.setAttribute("unselectable", "on");
            if (this.cssOnly) {
                tl.className = this.$0b('_titleleft');
            } else {
                tl.className = this.$0b('titleleft');
            };
            if ($i.left) {
                tl.style.cursor = 'pointer';
                tl.innerHTML = "<span style='margin-left:2px;'>&lt;</span>";
                tl.onclick = this.$0i;
            };
            $w.appendChild(tl);
            this.tl = tl;
            var ti = document.createElement("div");
            ti.style.position = 'absolute';
            ti.style.left = this.cellWidth + 'px';
            ti.style.top = '0px';
            ti.style.width = (this.cellWidth * 5 + this.$0c()) + 'px';
            ti.style.height = this.titleHeight + 'px';
            ti.style.lineHeight = this.titleHeight + 'px';
            ti.style.textAlign = 'center';
            ti.setAttribute("unselectable", "on");
            if (this.cssOnly) {
                ti.className = this.$0b('_title');
            } else {
                ti.className = this.$0b('title');
            };
            ti.innerHTML = $p.locale().monthNames[$k.getMonth()] + ' ' + $k.getYear();
            $w.appendChild(ti);
            this.ti = ti;
            var tr = document.createElement("div");
            tr.style.position = 'absolute';
            tr.style.left = (this.cellWidth * 6 + this.$0c()) + 'px';
            tr.style.top = '0px';
            tr.style.width = this.cellWidth + 'px';
            tr.style.height = this.titleHeight + 'px';
            tr.style.lineHeight = this.titleHeight + 'px';
            tr.style.textAlign = 'right';
            tr.setAttribute("unselectable", "on");
            if (this.cssOnly) {
                tr.className = this.$0b('_titleright');
            } else {
                tr.className = this.$0b('titleright');
            };
            if ($i.right) {
                tr.style.cursor = 'pointer';
                tr.innerHTML = "<span style='margin-right:2px;'>&gt;</span>";
                tr.onclick = this.$0j;
            };
            $w.appendChild(tr);
            this.tr = tr;
            var $y = this.$0c();
            if (this.showWeekNumbers) {
                for (var y = 0; y < $s; y++) {
                    var $z = $o.addDays(y * 7);
                    var $A = null;
                    switch (this.weekNumberAlgorithm) {
                        case "Auto":
                            $A = ($p.weekStarts() === 0) ? $z.weekNumber() : $z.weekNumberISO();
                            break;
                        case "US":
                            $A = $z.weekNumber();
                            break;
                        case "ISO8601":
                            $A = $z.weekNumberISO();
                            break;
                        default:
                            throw "Unknown weekNumberAlgorithm value.";
                    };
                    var dh = document.createElement("div");
                    dh.style.position = 'absolute';
                    dh.style.left = (0) + 'px';
                    dh.style.top = (y * this.cellHeight + $x) + 'px';
                    dh.style.width = this.cellWidth + 'px';
                    dh.style.height = this.cellHeight + 'px';
                    dh.style.lineHeight = this.cellHeight + 'px';
                    dh.style.textAlign = 'right';
                    dh.setAttribute("unselectable", "on");
                    if (this.cssOnly) {
                        dh.className = this.$0b('_weeknumber');
                    } else {
                        dh.className = this.$0b('weeknumber');
                    };
                    dh.innerHTML = "<span style='margin-right: 2px'>" + $A + "</span>";
                    $w.appendChild(dh);
                    $j.weeks.push(dh);
                }
            };
            for (var x = 0; x < 7; x++) {
                $j.cells[x] = [];
                var dh = document.createElement("div");
                dh.style.position = 'absolute';
                dh.style.left = (x * this.cellWidth + $y) + 'px';
                dh.style.top = this.titleHeight + 'px';
                dh.style.width = this.cellWidth + 'px';
                dh.style.height = this.dayHeaderHeight + 'px';
                dh.style.lineHeight = this.dayHeaderHeight + 'px';
                dh.style.textAlign = 'right';
                dh.setAttribute("unselectable", "on");
                if (this.cssOnly) {
                    dh.className = this.$0b('_dayheader');
                } else {
                    dh.className = this.$0b('dayheader');
                };
                dh.innerHTML = "<span style='margin-right: 2px'>" + this.$0k(x) + "</span>";
                $w.appendChild(dh);
                $j.days.push(dh);
                for (var y = 0; y < $s; y++) {
                    var $z = $o.addDays(y * 7 + x);
                    var $B = this.$0l($z) && this.selectMode !== 'none';
                    var $C = $z.getMonth() === $k.getMonth();
                    var $D = $z.getTime() < $k.getTime();
                    var $E = $z.getTime() > $k.getTime();
                    var $F;
                    var dc = document.createElement("div");
                    dc.day = $z;
                    dc.x = x;
                    dc.y = y;
                    dc.isCurrentMonth = $C;
                    if (this.cssOnly) {
                        dc.className = this.$0b(($C ? '_day' : '_dayother'));
                    } else {
                        dc.className = this.$0b(($C ? 'day' : 'dayother'));
                    };
                    if ($z.getTime() === $t.getTime() && $C) {
                        this.$0f(dc, 'today');
                    };
                    if ($z.dayOfWeek() === 0 || $z.dayOfWeek() === 6) {
                        this.$0f(dc, 'weekend');
                    };
                    dc.style.position = 'absolute';
                    dc.style.left = (x * this.cellWidth + $y) + 'px';
                    dc.style.top = (y * this.cellHeight + $x) + 'px';
                    dc.style.width = this.cellWidth + 'px';
                    dc.style.height = this.cellHeight + 'px';
                    dc.style.lineHeight = this.cellHeight + 'px';
                    dc.style.textAlign = 'right';
                    var $G = document.createElement("div");
                    $G.style.position = 'absolute';
                    if (this.cssOnly) {
                        $G.className = ($z.getTime() === $t.getTime() && $C) ? this.$0b('_todaybox') : this.$0b('_daybox');
                    } else {
                        $G.className = ($z.getTime() === $t.getTime() && $C) ? this.$0b('todaybox') : this.$0b('daybox');
                    };
                    $G.style.left = '0px';
                    $G.style.top = '0px';
                    $G.style.width = (this.cellWidth - 2) + 'px';
                    $G.style.height = (this.cellHeight - 2) + 'px';
                    dc.appendChild($G);
                    var $H = null;
                    if (this.cells && this.cells[$z.toStringSortable()]) {
                        $H = this.cells[$z.toStringSortable()];
                        if ($H.css) {
                            this.$0f(dc, $H.css);
                        }
                    };
                    var $I = null;
                    if ($C || ($l && $D) || ($m && $E)) {
                        $I = document.createElement("span");
                        $I.innerHTML = $z.getDay();
                        dc.style.cursor = 'pointer';
                        dc.isClickable = true;
                        if ($B) {
                            this.$0f(dc, 'select');
                        };
                        if ($H && $H.html) {
                            $I.innerHTML = $H.html;
                        };
                        $I.style.marginRight = '2px';
                        dc.appendChild($I);
                    };
                    dc.setAttribute("unselectable", "on");
                    dc.onclick = this.$0m;
                    dc.onmousedown = this.$0n;
                    dc.onmousemove = this.$0o;
                    if ($B) {
                        this.selected.push(dc);
                    };
                    $w.appendChild(dc);
                    $j.cells[x][y] = dc;
                }
            };
            var $J = document.createElement("div");
            $J.style.position = 'absolute';
            $J.style.left = '0px';
            $J.style.top = ($x - 2) + 'px';
            $J.style.width = (this.cellWidth * 7 + this.$0c()) + 'px';
            $J.style.height = '1px';
            $J.style.fontSize = '1px';
            $J.style.lineHeight = '1px';
            if (this.cssOnly) {
                $J.className = this.$0b("_line");
            } else {
                $J.className = this.$0b("line");
            };
            $w.appendChild($J);
            this.months.push($j);
        };
        this.$0c = function() {
            if (this.showWeekNumbers) {
                return this.cellWidth;
            };
            return 0;
        };
        this.$0p = function() {
            if (!this.items) {
                return;
            };
            for (var j = 0; j < this.showMonths; j++) {
                for (var x = 0; x < 7; x++) {
                    for (var y = 0; y < 6; y++) {
                        var $H = this.months[j].cells[x][y];
                        if (!$H) {
                            continue;
                        };
                        if (this.items[$H.day.toStringSortable()] === 1) {
                            this.$0f($H, 'busy');
                        } else {
                            this.$0g($H, 'busy');
                        }
                    }
                }
            }
        };
        this.$0q = function() {
            var s = {};
            s.startDate = $c.startDate;
            s.selectionStart = $c.selectionStart;
            s.selectionEnd = $c.selectionEnd.addDays(1);
            $c.state.value = DayPilot.JSON.stringify(s);
        };
        this.$0r = function() {
            switch (this.selectMode) {
                case 'day':
                    this.selectionEnd = this.selectionStart;
                    break;
                case 'week':
                    this.selectionStart = this.selectionStart.firstDayOfWeek($p.weekStarts());
                    this.selectionEnd = this.selectionStart.addDays(6);
                    break;
                case 'month':
                    this.selectionStart = this.selectionStart.firstDayOfMonth();
                    this.selectionEnd = this.selectionStart.lastDayOfMonth();
                    break;
                case 'none':
                    this.selectionEnd = this.selectionStart;
                    break;
                default:
                    throw "Unkown selectMode value.";
            }
        };
        this.select = function($K) {
            var $L = true;
            var $M = this.selectionStart;
            var $N = this.selectionEnd;
            this.selectionStart = new DayPilot.Date($K).getDatePart();
            this.selectionDay = this.selectionStart;
            var $O = false;
            if ($L) {
                var $P = this.startDate;
                if (this.selectionStart.getTime() < this.visibleStart().getTime() || this.selectionStart.getTime() > this.visibleEnd().getTime()) {
                    $P = this.selectionStart.firstDayOfMonth();
                };
                if ($P.toStringSortable() !== this.startDate.toStringSortable()) {
                    $O = true;
                };
                this.startDate = $P;
            };
            this.$0r();
            this.$0e();
            this.$0a();
            this.$0s();
            this.$0p();
            this.$0q();
            if (!$M.equals(this.selectionStart) || !$N.equals(this.selectionEnd)) {
                this.$0t();
            };
            if ($O) {
                this.$0u();
            }
        };
        this.update = function() {
            this.$0e();
            this.$0a();
            this.$0s();
            this.$0v();
            this.$0p();
            this.$0q();
        };
        this.$0w = function($Q, $R, $S) {
            var $T = {};
            $T.action = $Q;
            $T.parameters = $S;
            $T.data = $R;
            $T.header = this.$0x();
            var $U = "JSON" + DayPilot.JSON.stringify($T);
            var $V = null;
            if (this.backendUrl) {
                DayPilot.request(this.backendUrl, this.$0y, $U, this.$0z);
            } else {
                WebForm_DoCallback(this.uniqueID, $U, this.$0A, $V, this.callbackError, true);
            }
        };
        this.$0z = function($W) {
            if (typeof $c.onAjaxError === 'function') {
                var $X = {};
                $X.request = $W;
                $c.onAjaxError($X);
            } else if (typeof $c.ajaxError === 'function') {
                $c.ajaxError($W);
            }
        };
        this.$0y = function($Y) {
            $c.$0A($Y.responseText);
        };
        this.$0B = function($Q, $R, $S) {
            var $T = {};
            $T.action = $Q;
            $T.parameters = $S;
            $T.data = $R;
            $T.header = this.$0x();
            var $U = "JSON" + DayPilot.JSON.stringify($T);
            __doPostBack($c.uniqueID, $U);
        };
        this.$0x = function() {
            var h = {};
            h.v = this.v;
            h.startDate = this.startDate;
            h.selectionStart = this.selectionStart;
            return h;
        };
        this.$0C = function($Q, $R) {
            if ($Q === 'refresh') {
                this.$0u();
            }
        };
        this.$0k = function(i) {
            var x = i + $p.weekStarts();
            if (x > 6) {
                x -= 7;
            };
            return $p.locale().dayNamesShort[x];
        };
        this.$0l = function($K) {
            if (this.selectionStart === null || this.selectionEnd === null) {
                return false;
            };
            if (this.selectionStart.getTime() <= $K.getTime() && $K.getTime() <= this.selectionEnd.getTime()) {
                return true;
            };
            return false;
        };
        this.$0n = function(ev) {};
        this.$0o = function(ev) {};
        this.$0m = function(ev) {
            var $j = this.parentNode.month;
            var x = this.x;
            var y = this.y;
            var $z = $j.cells[x][y].day;
            if (!$j.cells[x][y].isClickable) {
                return;
            };
            $c.clearSelection();
            $c.selectionDay = $z;
            var $z = $c.selectionDay;
            switch ($c.selectMode) {
                case 'none':
                    $c.selectionStart = $z;
                    $c.selectionEnd = $z;
                    break;
                case 'day':
                    var s = $j.cells[x][y];
                    $c.$0f(s, 'select');
                    $c.selected.push(s);
                    $c.selectionStart = s.day;
                    $c.selectionEnd = s.day;
                    break;
                case 'week':
                    for (var j = 0; j < 7; j++) {
                        $c.$0f($j.cells[j][y], 'select');
                        $c.selected.push($j.cells[j][y]);
                    };
                    $c.selectionStart = $j.cells[0][y].day;
                    $c.selectionEnd = $j.cells[6][y].day;
                    break;
                case 'month':
                    var $Z = null;
                    var end = null;
                    for (var y = 0; y < 6; y++) {
                        for (var x = 0; x < 7; x++) {
                            var s = $j.cells[x][y];
                            if (!s) {
                                continue;
                            };
                            if (s.day.getYear() === $z.getYear() && s.day.getMonth() === $z.getMonth()) {
                                $c.$0f(s, 'select');
                                $c.selected.push(s);
                                if ($Z === null) {
                                    $Z = s.day;
                                };
                                end = s.day;
                            }
                        }
                    };
                    $c.selectionStart = $Z;
                    $c.selectionEnd = end;
                    break;
                default:
                    throw 'unknown selectMode';
            };
            $c.$0q();
            $c.$0t();
        };
        this.$0t = function() {
            var $Z = $c.selectionStart;
            var end = $c.selectionEnd.addDays(1);
            var $r = DayPilot.Date.daysDiff($Z.d, end.d);
            var $z = $c.selectionDay;
            if ($c.$0d()) {
                var $X = {};
                $X.start = $Z;
                $X.end = end;
                $X.day = $z;
                $X.days = $r;
                $X.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onTimeRangeSelect === 'function') {
                    $c.onTimeRangeSelect($X);
                    if ($X.preventDefault.value) {
                        return;
                    }
                };
                switch ($c.timeRangeSelectedHandling) {
                    case 'Bind':
                        var $00 = eval($c.bound);
                        if ($00) {
                            var $01 = {};
                            $01.start = $Z;
                            $01.end = end;
                            $01.days = $r;
                            $01.day = $z;
                            $00.commandCallBack($c.command, $01);
                        };
                        break;
                    case 'None':
                        break;
                    case 'PostBack':
                        $c.timeRangeSelectedPostBack($Z, end, $z);
                        break;
                };
                if (typeof $c.onTimeRangeSelected === 'function') {
                    $c.onTimeRangeSelected($X);
                }
            } else {
                switch ($c.timeRangeSelectedHandling) {
                    case 'Bind':
                        var $00 = eval($c.bound);
                        if ($00) {
                            var $01 = {};
                            $01.start = $Z;
                            $01.end = end;
                            $01.days = $r;
                            $01.day = $z;
                            $00.commandCallBack($c.command, $01);
                        };
                        break;
                    case 'JavaScript':
                        $c.onTimeRangeSelected($Z, end, $z);
                        break;
                    case 'None':
                        break;
                    case 'PostBack':
                        $c.timeRangeSelectedPostBack($Z, end, $z);
                        break;
                }
            }
        };
        this.timeRangeSelectedPostBack = function($Z, end, $R, $z) {
            var $02 = {};
            $02.start = $Z;
            $02.end = end;
            $02.day = $z;
            this.$0B('TimeRangeSelected', $R, $02);
        };
        this.$0j = function(ev) {
            $c.$0D($c.skipMonths);
        };
        this.$0i = function(ev) {
            $c.$0D(-$c.skipMonths);
        };
        this.$0D = function(i) {
            this.startDate = this.startDate.addMonths(i);
            this.$0e();
            this.$0a();
            this.$0s();
            this.$0q();
            this.$0u();
            this.$0p();
        };
        this.visibleStart = function() {
            return $c.startDate.firstDayOfMonth().firstDayOfWeek($p.weekStarts());
        };
        this.visibleEnd = function() {
            return $c.startDate.firstDayOfMonth().addMonths(this.showMonths - 1).firstDayOfWeek($p.weekStarts()).addDays(42);
        };
        this.$0u = function() {
            var $Z = this.visibleStart();
            var end = this.visibleEnd();
            if ($c.$0d()) {
                var $X = {};
                $X.start = $Z;
                $X.end = end;
                $X.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $c.onVisibleRangeChange === 'function') {
                    $c.onVisibleRangeChange($X);
                    if ($X.preventDefault.value) {
                        return;
                    }
                };
                switch (this.visibleRangeChangedHandling) {
                    case "CallBack":
                        this.visibleRangeChangedCallBack(null);
                        break;
                    case "PostBack":
                        this.visibleRangeChangedPostBack(null);
                        break;
                    case "Disabled":
                        break;
                };
                if (typeof $c.onVisibleRangeChanged === 'function') {
                    $c.onVisibleRangeChanged($X);
                }
            } else {
                switch (this.visibleRangeChangedHandling) {
                    case "CallBack":
                        this.visibleRangeChangedCallBack(null);
                        break;
                    case "PostBack":
                        this.visibleRangeChangedPostBack(null);
                        break;
                    case "JavaScript":
                        this.onVisibleRangeChanged($Z, end);
                        break;
                    case "Disabled":
                        break;
                }
            }
        };
        this.visibleRangeChangedCallBack = function($R) {
            var $S = {};
            this.$0w("Visible", $R, $S);
        };
        this.visibleRangeChangedPostBack = function($R) {
            var $S = {};
            this.$0B("Visible", $R, $S);
        };
        this.$0A = function($03, $V) {
            var $03 = eval("(" + $03 + ")");
            $c.items = $03.Items;
            $c.cells = $03.Cells;
            $c.$0p();
        };
        this.$0s = function() {
            for (var j = 0; j < this.showMonths; j++) {
                var $i = this.$0E(j);
                this.$0h(j, $i);
            };
            this.root.style.height = this.$0F() + "px";
        };
        this.$0F = function() {
            if (this.orientation === "Horizontal") {
                var $04 = 0;
                for (var i = 0; i < this.months.length; i++) {
                    var $j = this.months[i];
                    if ($j.height > $04) {
                        $04 = $j.height;
                    }
                };
                return $04;
            } else {
                var $05 = 0;
                for (var i = 0; i < this.months.length; i++) {
                    var $j = this.months[i];
                    $05 += $j.height;
                };
                return $05;
            }
        };
        this.$0E = function(j) {
            if (this.internal.showLinks) {
                return this.internal.showLinks;
            };
            var $i = {};
            $i.left = (j === 0);
            $i.right = (j === 0);
            $i.before = j === 0;
            $i.after = j === this.showMonths - 1;
            if (this.orientation === "Horizontal") {
                $i.right = (j === this.showMonths - 1);
            };
            return $i;
        };
        this.internal = {};
        this.$0G = {};
        var $p = this.$0G;
        $p.locale = function() {
            return DayPilot.Locale.find($c.locale);
        };
        $p.weekStarts = function() {
            if ($c.weekStarts === 'Auto') {
                var $06 = $p.locale();
                if ($06) {
                    return $06.weekStarts;
                } else {
                    return 0;
                }
            } else {
                return $c.weekStarts;
            }
        };
        this.clearSelection = function() {
            for (var j = 0; j < this.selected.length; j++) {
                this.$0g(this.selected[j], 'select');
            };
            this.selected = [];
        };
        this.$0H = function() {
            if (this.backendUrl || typeof WebForm_DoCallback === 'function') {
                return (typeof $c.items === 'undefined') || (!$c.items);
            } else {
                return false;
            }
        };
        this.events = {};
        this.$0v = function() {
            if (!DayPilot.isArray(this.events.list)) {
                return;
            };
            this.items = {};
            for (var i = 0; i < this.events.list.length; i++) {
                var e = this.events.list[i];
                var $r = this.$0I(e);
                for (var name in $r) {
                    this.items[name] = 1;
                }
            }
        };
        this.$0I = function(e) {
            var $Z = new DayPilot.Date(e.start);
            var end = new DayPilot.Date(e.end);
            var $r = {};
            var d = $Z.getDatePart();
            while (d.getTime() < end.getTime()) {
                $r[d.toStringSortable()] = 1;
                d = d.addDays(1);
            };
            return $r;
        };
        this.init = function() {
            this.root = document.getElementById(id);
            if (this.root.dp) {
                return;
            };
            this.$0r();
            this.$0a();
            this.$0s();
            this.$0v();
            this.$0p();
            this.$0J();
            var $07 = this.$0H();
            if ($07) {
                this.$0u();
            };
            this.initialized = true;
        };
        this.dispose = function() {
            var c = $c;
            if (!c.root) {
                return;
            };
            c.root.removeAttribute("style");
            c.root.removeAttribute("class");
            c.root.dp = null;
            c.root.innerHTML = null;
            c.root = null;
        };
        this.$0J = function() {
            var $08 = document.getElementById(id);
            $08.dispose = this.dispose;
        };
        this.Init = this.init;
    };
    DayPilot.NavigatorVisible.Navigator = DayPilotNavigator.Navigator;
    if (typeof jQuery !== 'undefined') {
        (function($) {
            $.fn.daypilotNavigator = function($b) {
                var $o = null;
                var j = this.each(function() {
                    if (this.daypilot) {
                        return;
                    };
                    var $09 = new DayPilot.Navigator(this.id);
                    this.daypilot = $09;
                    for (var name in $b) {
                        $09[name] = $b[name];
                    };
                    $09.Init();
                    if (!$o) {
                        $o = $09;
                    }
                });
                if (this.length === 1) {
                    return $o;
                } else {
                    return j;
                }
            };
        })(jQuery);
    };
    if (typeof Sys !== 'undefined' && Sys.Application && Sys.Application.notifyScriptLoaded) {
        Sys.Application.notifyScriptLoaded();
    }
})();


if (typeof DayPilot === 'undefined') {
    var DayPilot = {};
};
if (typeof DayPilot.Global === 'undefined') {
    DayPilot.Global = {};
};
if (typeof DayPilotScheduler === 'undefined') {
    var DayPilotScheduler = DayPilot.SchedulerVisible = {};
};
(function() {
    if (typeof DayPilot.Scheduler !== 'undefined') {
        return;
    };
    var $a = (function() {
        var $b = navigator.userAgent;
        return (($b.indexOf('Mozilla/5.0') > -1 && $b.indexOf('Android ') > -1 && $b.indexOf('AppleWebKit') > -1) && !($b.indexOf('Chrome') > -1));
    })();
    var DayPilotScheduler = {};
    var $c = function() {};
    (function() {
        if (DayPilot.Global.defaultSchedulerCss) {
            return;
        };
        var $d = DayPilot.sheet();
        $d.add(".scheduler_default_selected .scheduler_default_event_inner", "background: #ddd;");
        $d.add(".scheduler_default_main", "border: 1px solid #aaa;font-family: Tahoma, Arial, Helvetica, sans-serif; font-size: 12px;");
        $d.add(".scheduler_default_timeheader", "cursor: default;color: #666;");
        $d.add(".scheduler_default_message", "opacity: 0.9;filter: alpha(opacity=90);padding: 10px; color: #ffffff;background: #ffa216;");
        $d.add(".scheduler_default_timeheadergroup,.scheduler_default_timeheadercol", "color: #666;background: #eee;");
        $d.add(".scheduler_default_rowheader,.scheduler_default_corner", "color: #666;background: #eee;");
        $d.add(".scheduler_default_rowheader_inner", "position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;border-right: 1px solid #eee;padding: 2px;");
        $d.add(".scheduler_default_timeheadergroup, .scheduler_default_timeheadercol", "text-align: center;");
        $d.add(".scheduler_default_timeheadergroup_inner", "position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;border-right: 1px solid #aaa;border-bottom: 1px solid #aaa;");
        $d.add(".scheduler_default_timeheadercol_inner", "position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;border-right: 1px solid #aaa;");
        $d.add(".scheduler_default_divider", "background-color: #aaa;");
        $d.add(".scheduler_default_divider_horizontal", "background-color: #aaa;");
        $d.add(".scheduler_default_matrix_vertical_line", "background-color: #eee;");
        $d.add(".scheduler_default_matrix_vertical_break", "background-color: #000;");
        $d.add(".scheduler_default_matrix_horizontal_line", "background-color: #eee;");
        $d.add(".scheduler_default_resourcedivider", "background-color: #aaa;");
        $d.add(".scheduler_default_shadow_inner", "background-color: #666666;opacity: 0.5;filter: alpha(opacity=50);height: 100%;xborder-radius: 5px;");
        $d.add(".scheduler_default_event", "font-size:12px;color:#666;");
        $d.add(".scheduler_default_event_inner", "position:absolute;top:0px;left:0px;right:0px;bottom:0px;padding:5px 2px 2px 2px;overflow:hidden;border:1px solid #ccc;");
        $d.add(".scheduler_default_event_bar", "top:0px;left:0px;right:0px;height:4px;background-color:#9dc8e8;");
        $d.add(".scheduler_default_event_bar_inner", "position:absolute;height:4px;background-color:#1066a8;");
        $d.add(".scheduler_default_event_inner", 'background:#fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");');
        $d.add(".scheduler_default_event_float_inner", "padding:6px 2px 2px 8px;");
        $d.add(".scheduler_default_event_float_inner:after", 'content:"";border-color: transparent #666 transparent transparent;border-style:solid;border-width:5px;width:0;height:0;position:absolute;top:8px;left:-4px;');
        $d.add(".scheduler_default_columnheader_inner", "font-weight: bold;");
        $d.add(".scheduler_default_columnheader_splitter", "background-color: #666;opacity: 0.5;filter: alpha(opacity=50);");
        $d.add(".scheduler_default_columnheader_cell_inner", "padding: 2px;");
        $d.add(".scheduler_default_cell", "background-color: #f9f9f9;");
        $d.add(".scheduler_default_cell.scheduler_default_cell_business", "background-color: #fff;");
        $d.add(".scheduler_default_tree_image_no_children", "background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABv85FHAAAAKXRFWHRDcmVhdGlvbiBUaW1lAHDhIDMwIEkgMjAwOSAwODo0NjozMSArMDEwMClDkt4AAAAHdElNRQfZAR4HLzEyzsCJAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAABGdBTUEAALGPC/xhBQAAADBJREFUeNpjrK6s5uTl/P75OybJ0NLW8h8bAIozgeSxAaA4E1A7VjmgOL31MeLxHwCeXUT0WkFMKAAAAABJRU5ErkJggg==);");
        $d.add(".scheduler_default_tree_image_expand", "background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABv85FHAAAAKXRFWHRDcmVhdGlvbiBUaW1lAHDhIDMwIEkgMjAwOSAwODo0NjozMSArMDEwMClDkt4AAAAHdElNRQfZAR4HLyUoFBT0AAAACXBIWXMAAA7CAAAOwgEVKEqAAAAABGdBTUEAALGPC/xhBQAAAFJJREFUeNpjrK6s5uTl/P75OybJ0NLW8h8bAIozgeRhgJGREc4GijMBtTNgA0BxFog+uA4IA2gmUJwFog/IgUhAGBB9KPYhA3T74Jog+hjx+A8A1KRQ+AN5vcwAAAAASUVORK5CYII=);");
        $d.add(".scheduler_default_tree_image_collapse", "background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABv85FHAAAAKXRFWHRDcmVhdGlvbiBUaW1lAHDhIDMwIEkgMjAwOSAwODo0NjozMSArMDEwMClDkt4AAAAHdElNRQfZAR4HLxB+p9DXAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAABGdBTUEAALGPC/xhBQAAAENJREFUeNpjrK6s5uTl/P75OybJ0NLW8h8bAIozgeSxAaA4E1A7VjmgOAtEHyMjI7IE0EygOAtEH5CDqY9c+xjx+A8ANndK9WaZlP4AAAAASUVORK5CYII=);");
        $d.commit();
        DayPilot.Global.defaultSchedulerCss = true;
    })();
    DayPilot.Scheduler = function(id) {
        this.v = '710';
        var $e = this;
        this.id = id;
        this.isScheduler = true;
        this.hideUntilInit = true;
        this.api = 2;
        this.allowMultiSelect = true;
        this.autoRefreshCommand = 'refresh';
        this.autoRefreshEnabled = false;
        this.autoRefreshInterval = 60;
        this.autoRefreshMaxCount = 20;
        this.autoScroll = "Drag";
        this.borderColor = "#000000";
        this.businessBeginsHour = 9;
        this.businessEndsHour = 18;
        this.cellBackColor = "#FFFFD5";
        this.cellBackColorNonBusiness = "#FFF4BC";
        this.cellBorderColor = "#EAD098";
        this.cellDuration = 60;
        this.cellGroupBy = 'Day';
        this.cellSelectColor = "#316AC5";
        this.cellWidth = 40;
        this.cellWidthSpec = "Fixed";
        this.clientSide = true;
        this.crosshairColor = 'Gray';
        this.crosshairOpacity = 20;
        this.crosshairType = 'Header';
        this.debuggingEnabled = false;
        this.doubleClickTimeout = 300;
        this.dragOutAllowed = false;
        this.durationBarColor = 'blue';
        this.durationBarHeight = 3;
        this.durationBarVisible = true;
        this.durationBarMode = "Duration";
        this.durationBarDetached = false;
        this.days = 1;
        this.drawBlankCells = true;
        this.dynamicEventRendering = 'Progressive';
        this.dynamicEventRenderingMargin = 50;
        this.dynamicLoading = false;
        this.eventBorderColor = "#000000";
        this.eventBorderVisible = true;
        this.eventBackColor = "#FFFFFF";
        this.eventFontFamily = "Tahoma, Arial";
        this.eventFontSize = '8pt';
        this.eventFontColor = '#000000';
        this.eventHeight = 25;
        this.eventMoveMargin = 5;
        this.eventMoveToPosition = false;
        this.eventResizeMargin = 5;
        this.ganttAppendToResources = false;
        this.headerFontColor = "#000000";
        this.headerFontFamily = "Tahoma, Arial";
        this.headerFontSize = '8pt';
        this.headerHeight = 20;
        this.heightSpec = 'Auto';
        this.hourFontFamily = "Tahoma, Arial";
        this.hourFontSize = '10pt';
        this.hourNameBackColor = "#ECE9D8";
        this.hourNameBorderColor = "#ACA899";
        this.layout = 'Auto';
        this.locale = "en-us";
        this.loadingLabelText = "Loading...";
        this.loadingLabelVisible = true;
        this.loadingLabelBackColor = "orange";
        this.loadingLabelFontColor = "#ffffff";
        this.loadingLabelFontFamily = "Tahoma";
        this.loadingLabelFontSize = "10pt";
        this.messageHideAfter = 5000;
        this.moveBy = 'Full';
        this.notifyCommit = 'Immediate';
        this.numberFormat = "0.00";
        this.treePreventParentUsage = false;
        this.rowHeaderWidth = 80;
        this.rowHeaderWidthAutoFit = true;
        this.rowHeaderCols = null;
        this.rowMarginBottom = 0;
        this.rowMinHeight = 0;
        this.scale = "CellDuration";
        this.scrollX = 0;
        this.scrollY = 0;
        this.shadow = "Fill";
        this.showBaseTimeHeader = true;
        this.showNonBusiness = true;
        this.showToolTip = true;
        this.snapToGrid = true;
        this.startDate = new DayPilot.Date().getDatePart();
        this.syncResourceTree = true;
        this.timeBreakColor = '#000000';
        this.treeEnabled = false;
        this.treeIndent = 20;
        this.treeImageMarginLeft = 2;
        this.treeImageMarginTop = 2;
        this.timeFormat = "Auto";
        this.useEventBoxes = 'Always';
        this.viewType = 'Resources';
        this.weekStarts = 'Auto';
        this.width = null;
        this.floatingEvents = true;
        this.floatingTimeHeaders = true;
        this.eventCorners = 'Regular';;
        this.separators = [];
        this.afterRender = function() {};
        this.cornerHtml = '';
        this.crosshairLastY = -1;
        this.crosshairLastX = -1;
        this.eventClickHandling = 'Enabled';
        this.eventHoverHandling = 'Bubble';
        this.eventDoubleClickHandling = 'Enabled';
        this.eventEditHandling = 'Update';
        this.eventMoveHandling = 'Update';
        this.eventResizeHandling = 'Update';
        this.eventRightClickHandling = 'ContextMenu';
        this.eventSelectHandling = 'Update';
        this.resourceHeaderClickHandling = 'Enabled';
        this.timeRangeDoubleClickHandling = 'Enabled';
        this.timeRangeSelectedHandling = 'Enabled';
        this.cssOnly = true;
        this.cssClassPrefix = "scheduler_default";
        this.backendUrl = null;
        if ($e.api === 1) {
            this.onEventMove = function() {};
            this.onEventResize = function() {};
            this.onResourceExpand = function() {};
            this.onResourceCollapse = function() {};
        };
        this.debugMessages = [];
        this.autoRefreshCount = 0;
        this.innerHeightTree = 0;
        this.rows = [];
        this.itline = [];
        this.timeline = null;
        this.status = {};
        this.events = {};
        this.cells = {};
        this.elements = {};
        this.elements.events = [];
        this.elements.bars = [];
        this.elements.cells = [];
        this.elements.linesVertical = [];
        this.elements.separators = [];
        this.elements.range = [];
        this.elements.breaks = [];
        this.$51 = {};
        this.$51.cells = [];
        this.$51.linesVertical = [];
        this.$51.linesHorizontal = [];
        this.$51.timeHeaderGroups = [];
        this.$51.pixels = [];
        this.$51.breaks = [];
        this.$51.events = [];
        this.clientState = {};
        this.nav = {};
        this.$52 = function($f, $g) {
            var $f = eval("(" + $f + ")");
            if ($f.BubbleGuid) {
                var $h = $f.BubbleGuid;
                var $i = this.bubbles[$h];
                delete this.bubbles[$h];
                $e.$53();
                if (typeof $f.Result.BubbleHTML !== 'undefined') {
                    $i.updateView($f.Result.BubbleHTML, $i);
                };
                return;
            };
            if ($f.CallBackRedirect) {
                document.location.href = $f.CallBackRedirect;
                return;
            };
            if (typeof DayPilot.Bubble !== "undefined") {
                DayPilot.Bubble.hideActive();
            };
            if (typeof $f.ClientState !== 'undefined') {
                $e.clientState = $f.ClientState;
            };
            if ($f.UpdateType === "None") {
                $e.$53();
                if ($f.Message) {
                    $e.message($f.Message);
                };
                $e.$54($f.CallBackData, true);
                return;
            };
            if ($f.VsUpdate) {
                var $j = document.createElement("input");
                $j.type = 'hidden';
                $j.name = $e.id + "_vsupdate";
                $j.id = $j.name;
                $j.value = $f.VsUpdate;
                $e.vsph.innerHTML = '';
                $e.vsph.appendChild($j);
            };
            if (typeof $f.TagFields !== 'undefined') {
                $e.tagFields = $f.TagFields;
            };
            if (typeof $f.SortDirections !== 'undefined') {
                $e.sortDirections = $f.SortDirections;
            };
            if ($f.UpdateType === "Full") {
                $e.resources = $f.Resources;
                $e.colors = $f.Colors;
                $e.palette = $f.Palette;
                $e.dirtyColors = $f.DirtyColors;
                $e.cellProperties = $f.CellProperties;
                $e.cellConfig = $f.CellConfig;
                $e.separators = $f.Separators;
                $e.timeline = $f.Timeline;
                $e.timeHeader = $f.TimeHeader;
                $e.timeHeaders = $f.TimeHeaders;
                if (typeof $f.RowHeaderColumns !== 'undefined') $e.rowHeaderColumns = $f.RowHeaderColumns;
                $e.startDate = $f.StartDate ? new DayPilot.Date($f.StartDate) : $e.startDate;
                $e.days = $f.Days ? $f.Days : $e.days;
                $e.cellDuration = $f.CellDuration ? $f.CellDuration : $e.cellDuration;
                $e.cellGroupBy = $f.CellGroupBy ? $f.CellGroupBy : $e.cellGroupBy;
                $e.cellWidth = $f.CellWidth ? $f.CellWidth : $e.cellWidth;
                $e.viewType = $f.ViewType ? $f.ViewType : $e.viewType;
                $e.hourNameBackColor = $f.HourNameBackColor ? $f.HourNameBackColor : $e.hourNameBackColor;
                $e.showNonBusiness = $f.ShowNonBusiness ? $f.ShowNonBusiness : $e.showNonBusiness;
                $e.businessBeginsHour = $f.BusinessBeginsHour ? $f.BusinessBeginsHour : $e.businessBeginsHour;
                $e.businessEndsHour = $f.BusinessEndsHour ? $f.BusinessEndsHour : $e.businessEndsHour;
                if (typeof $f.DynamicLoading !== 'undefined') $e.dynamicLoading = $f.DynamicLoading;
                if (typeof $f.TreeEnabled !== 'undefined') $e.treeEnabled = $f.TreeEnabled;
                $e.backColor = $f.BackColor ? $f.BackColor : $e.backColor;
                $e.nonBusinessBackColor = $f.NonBusinessBackColor ? $f.NonBusinessBackColor : $e.nonBusinessBackColor;
                $e.locale = $f.Locale ? $f.Locale : $e.locale;
                if (typeof $f.TimeZone !== 'undefined') $e.timeZone = $f.TimeZone;
                $e.timeFormat = $f.TimeFormat ? $f.TimeFormat : $e.timeFormat;
                $e.rowHeaderCols = $f.RowHeaderCols ? $f.RowHeaderCols : $e.rowHeaderCols;
                if (typeof $f.DurationBarMode !== "undefined") $e.durationBarMode = $f.DurationBarMode;
                if (typeof $f.ShowBaseTimeHeader !== "undefined") $e.showBaseTimeHeader = $f.ShowBaseTimeHeader;
                $e.cornerBackColor = $f.CornerBackColor ? $f.CornerBackColor : $e.cornerBackColor;
                if (typeof $f.CornerHTML !== 'undefined') {
                    $e.cornerHtml = $f.CornerHTML;
                };
                $e.hashes = $f.Hashes;
                $e.$55();
                $e.$56();
                $e.$57();
                $e.$58();
            };
            var $k = $e.$59($f.Events, $f.Action === "Scroll");
            if ($f.UpdateType === 'Full') {
                $e.$5a();
                $e.$5b();
            };
            $e.$5c();
            $e.$5d();
            if ($f.Action !== "Scroll") {
                $e.$5e();
                $e.$5f();
                if ($e.heightSpec === 'Auto' || $e.heightSpec === 'Max') {
                    $e.$5g();
                };
                $e.$5h();
                $e.$5i();
                $e.$5j();
                $e.multiselect.clear(true);
                $e.multiselect.initList = $f.SelectedEvents;
                $e.$5k();
                $e.$5l();
                $e.$5m();
            } else {
                $e.multiselect.clear(true);
                $e.multiselect.initList = $f.SelectedEvents;
                $e.$5n($k, true);
                $e.$5k();
            };
            if ($e.timeRangeSelectedHandling !== "HoldForever") {
                $e.$5o();
            };
            if ($f.UpdateType === "Full") {
                $e.setScroll($f.ScrollX, $f.ScrollY);
                $e.$5p();
            };
            $e.$5q();
            $e.$53();
            if ($f.UpdateType === 'Full' && navigator.appVersion.indexOf("MSIE 7.") !== -1) {
                window.setTimeout(function() {
                    $e.$5a();
                    $e.$5g();
                }, 0);
            };
            $e.$5r();
            if ($f.Message) {
                if ($e.message) {
                    $e.message($f.Message);
                }
            };
            $e.$54($f.CallBackData, true);
            $e.$5s();
        };
        this.$5q = function() {
            if ($e.todo) {
                if ($e.todo.del) {
                    var $l = $e.todo.del;
                    $l.parentNode.removeChild($l);
                    $e.todo.del = null;
                }
            }
        };
        this.$54 = function($m, $n) {
            var $o = function($m, $p) {
                return function() {
                    if ($e.$5t()) {
                        if (typeof $e.onAfterRender === 'function') {
                            var $q = {};
                            $q.isCallBack = $p;
                            $q.data = $m;
                            $e.onAfterRender($q);
                        }
                    } else {
                        if ($e.afterRender) {
                            $e.afterRender($m, $p);
                        }
                    }
                };
            };
            window.setTimeout($o($m, $n), 0);
        };
        this.scrollTo = function($r) {
            var $s = this.getPixels(new DayPilot.Date($r)).left;
            this.setScrollX($s);
        };
        this.scrollToResource = function(id) {
            DayPilot.complete(function() {
                var $t = $e.$5u(id);
                if (!$t) {
                    return;
                };
                setTimeout(function() {
                    var scrollY = $t.Top;
                    $e.nav.scroll.scrollTop = scrollY;
                }, 100);
            });
        };
        this.$5v = function() {
            if (!this.cssOnly) {
                return;
            };
            if (!this.floatingTimeHeaders) {
                return;
            };
            this.$5w();
            var $u = this.$5x();
            var $v = $u.pixels.left;
            var end = $u.pixels.right;
            var $w = [];
            for (var y = 0; y < this.timeHeader.length; y++) {
                for (var x = 0; x < this.timeHeader[y].length; x++) {
                    var h = this.timeHeader[y][x];
                    var $x = h.left;
                    var $y = h.left + h.width;
                    var $z = null;
                    if ($x < $v && $v < $y) {
                        $z = {};
                        $z.x = x;
                        $z.y = y;
                        $z.marginLeft = $v - $x;
                        $z.marginRight = 0;
                        $z.div = this.$51.timeHeader[x + "_" + y];
                        $w.push($z);
                    };
                    if ($x < end && end < $y) {
                        if (!$z) {
                            $z = {};
                            $z.x = x;
                            $z.y = y;
                            $z.marginLeft = 0;
                            $z.div = this.$51.timeHeader[x + "_" + y];
                            $w.push($z);
                        };
                        $z.marginRight = $y - end;
                        break;
                    }
                }
            };
            for (var i = 0; i < $w.length; i++) {
                var $z = $w[i];
                this.$5y($z.div, $z.marginLeft, $z.marginRight);
            }
        };
        this.$5z = function() {
            this.$5v();
            this.$5A();
        };
        this.$5A = function() {
            if (!this.cssOnly) {
                return;
            };
            if (!this.floatingEvents) {
                return;
            };
            var $u = this.$5x();
            var $v = $u.pixels.left;
            var end = $u.pixels.right;
            this.$5B();
            for (var i = 0; i < $e.elements.events.length; i++) {
                var e = $e.elements.events[i];
                var $m = e.event;
                var $x = $m.part.left;
                var $y = $m.part.left + $m.part.width;
                if ($x < $v && $v < $y) {
                    var $A = $v - $x;
                    this.$5C(e, $A, 0);
                }
            }
        };
        this.elements.sections = [];
        this.elements.hsections = [];
        this.$5y = function($B, $A, $C) {
            var $D = document.createElement("div");
            $D.setAttribute("unselectable", "on");
            $D.className = this.$5D("_timeheader_float");
            $D.style.position = "absolute";
            $D.style.left = $A + "px";
            $D.style.right = $C + "px";
            $D.style.top = "0px";
            $D.style.bottom = "0px";
            $D.style.overflow = "hidden";
            var $E = document.createElement("div");
            $E.className = this.$5D("_timeheader_float_inner");
            $E.setAttribute("unselectable", "on");
            $E.innerHTML = $B.cell.th.innerHTML;
            $D.appendChild($E);
            $B.section = $D;
            $B.insertBefore($D, $B.firstChild.nextSibling);
            $B.firstChild.innerHTML = '';
            this.elements.hsections.push($B);
        };
        this.$5w = function() {
            for (var i = 0; i < this.elements.hsections.length; i++) {
                var e = this.elements.hsections[i];
                var $m = e.cell;
                if ($m && e.firstChild) {
                    e.firstChild.innerHTML = $m.th.innerHTML;
                };
                DayPilot.de(e.section);
                e.section = null;
            };
            this.elements.hsections = [];
        };
        this.$5C = function($B, $A, $C) {
            var $D = document.createElement("div");
            $D.setAttribute("unselectable", "on");
            $D.className = this.$5D("_event_float");
            $D.style.position = "absolute";
            $D.style.left = $A + "px";
            $D.style.right = $C + "px";
            $D.style.top = "0px";
            $D.style.bottom = "0px";
            $D.style.overflow = "hidden";
            var $E = document.createElement("div");
            $E.className = this.$5D("_event_float_inner");
            $E.setAttribute("unselectable", "on");
            $E.innerHTML = $B.event.client.html();
            $D.appendChild($E);
            $B.section = $D;
            $B.insertBefore($D, $B.firstChild.nextSibling);
            $B.firstChild.innerHTML = '';
            this.elements.sections.push($B);
        };
        this.$5B = function() {
            for (var i = 0; i < this.elements.sections.length; i++) {
                var e = this.elements.sections[i];
                var $m = e.event;
                if ($m) {
                    e.firstChild.innerHTML = $m.client.html();
                };
                DayPilot.de(e.section);
                e.section = null;
            };
            this.elements.sections = [];
        };
        this.setScrollX = function(scrollX) {
            this.setScroll(scrollX, $e.scrollY);
        };
        this.setScrollY = function(scrollY) {
            this.setScroll($e.scrollX, scrollY);
        };
        this.setScroll = function(scrollX, scrollY) {
            var scroll = $e.nav.scroll;
            var $F = $e.innerHeightTree;
            var $G = $e.$5E() * $e.cellWidth;
            if (scroll.clientWidth + scrollX > $G) {
                scrollX = $G - scroll.clientWidth;
            };
            if (scroll.clientHeight + scrollY > $F) {
                scrollY = $F - scroll.clientHeight;
            };
            $e.divTimeScroll.scrollLeft = scrollX;
            $e.divResScroll.scrollTop = scrollY;
            scroll.scrollLeft = scrollX;
            scroll.scrollTop = scrollY;
        };
        this.message = function($H, $I, $J, $K) {
            if ($H === null) {
                return;
            };
            var $I = $I || this.messageHideAfter || 2000;
            var $J = $J || "#ffffff";
            var $K = $K || "#000000";
            var $L = 0.8;
            var top = this.$5F() + 1;
            var $x = this.$5G() + 1;
            var $y = DayPilot.sw($e.nav.scroll) + 1;
            var $M = DayPilot.sh($e.nav.scroll) + 1;
            var $B;
            if (!this.nav.message) {
                $B = document.createElement("div");
                $B.style.position = "absolute";
                $B.style.left = $x + "px";
                $B.style.right = $y + "px";
                $B.style.display = 'none';
                $B.onmousemove = function() {
                    if ($e.messageTimeout) {
                        clearTimeout($e.messageTimeout);
                    }
                };
                $B.onmouseout = function() {
                    if ($e.nav.message.style.display !== 'none') {
                        $e.messageTimeout = setTimeout($e.$5H, 500);
                    }
                };
                var $E = document.createElement("div");
                $E.onclick = function() {
                    $e.nav.message.style.display = 'none';
                };
                if (!this.cssOnly) {
                    $E.style.padding = "5px";
                    $E.style.opacity = $L;
                    $E.style.filter = "alpha(opacity=" + ($L * 100) + ")";
                } else {
                    $E.className = this.$5D("_message");
                };
                $B.appendChild($E);
                var close = document.createElement("div");
                close.style.position = "absolute";
                if (!this.cssOnly) {
                    close.style.top = "5px";
                    close.style.right = (DayPilot.sw($e.nav.scroll) + 5) + "px";
                    close.style.color = $J;
                    close.style.lineHeight = "100%";
                    close.style.cursor = "pointer";
                    close.style.fontWeight = "bold";
                    close.innerHTML = "X";
                } else {
                    close.className = this.$5D("_message_close");
                };
                close.onclick = function() {
                    $e.nav.message.style.display = 'none';
                };
                $B.appendChild(close);
                this.nav.top.appendChild($B);
                this.nav.message = $B;
            };
            var $N = function() {
                var $E = $e.nav.message.firstChild;
                if (!$e.cssOnly) {
                    $E.style.backgroundColor = $K;
                    $E.style.color = $J;
                };
                $E.innerHTML = $H;
                var $y = DayPilot.sw($e.nav.scroll) + 1;
                $e.nav.message.style.right = $y + "px";
                var $O = $e.messageBarPosition || "Top";
                if ($O === "Bottom") {
                    $e.nav.message.style.bottom = $M + "px";
                    $e.nav.message.style.top = "";
                } else if ($O === "Top") {
                    $e.nav.message.style.bottom = "";
                    $e.nav.message.style.top = top + "px";
                };
                var end = function() {
                    $e.messageTimeout = setTimeout($e.$5H, $I);
                };
                DayPilot.fade($e.nav.message, 0.2, end);
            };
            clearTimeout($e.messageTimeout);
            if (this.nav.message.style.display !== 'none') {
                DayPilot.fade($e.nav.message, -0.2, $N);
            } else {
                $N();
            }
        };
        this.$5H = function() {
            var end = function() {
                $e.nav.message.style.display = 'none';
            };
            DayPilot.fade($e.nav.message, -0.2, end);
        };
        this.message.show = function($H) {
            $e.message($H);
        };
        this.message.hide = function() {
            $e.$5H();
        };
        this.$5g = function() {
            if (this.nav.scroll) {
                if (this.heightSpec === 'Parent100Pct') {
                    this.height = parseInt(this.nav.top.clientHeight, 10) - (this.$5F() + 2);
                };
                var $P = this.$5I();
                var $Q = 1;
                var $R = $P + this.$5F() + $Q;
                if ($P > 0) {
                    this.nav.scroll.style.height = ($P) + 'px';
                    this.scrollRes.style.height = ($P) + 'px';
                };
                if (this.nav.divider) {
                    if (!$R || isNaN($R) || $R < 0) {
                        $R = 0;
                    };
                    this.nav.divider.style.height = ($R) + "px";
                };
                if (this.heightSpec !== "Parent100Pct") {
                    this.nav.top.style.height = ($R) + "px";
                };
                for (var i = 0; i < this.elements.separators.length; i++) {
                    this.elements.separators[i].style.height = this.innerHeightTree + 'px';
                };
                for (var i = 0; i < this.elements.linesVertical.length; i++) {
                    this.elements.linesVertical[i].style.height = this.innerHeightTree + 'px';
                }
            }
        };
        this.$56 = function() {
            this.endDate = (this.viewType !== 'Days') ? this.startDate.addDays(this.days) : this.startDate.addDays(1);
            this.$51.pixels = [];
            this.itline = [];
            var $S = this.cellWidthSpec === "Auto";
            var $T = function() {
                if (!$S) {
                    return;
                };
                var $U = 0;
                if ($e.timeHeader) {
                    if ($e.timeline) {
                        $U = $e.timeline.length;
                    } else {
                        var $t = $e.timeHeader[$e.timeHeader.length - 1];
                        $U = $t.length;
                    }
                } else {
                    if ($e.scale === "Manual") {
                        $U = $e.timeline.length;
                    } else {
                        $e.$5J();
                        $U = $e.itline.length;
                        $e.itline = [];
                    }
                };
                $e.cellWidth = $e.$5K() / $U;
                $e.debug.message("updated cellWidth: " + $e.cellWidth);
            };
            $T();
            if (this.$5L()) {
                if (this.timeline) {
                    $e.debug.message("timeline received from server");
                    this.itline = [];
                    var $V = null;
                    var $x = 0;
                    for (var i = 0; i < this.timeline.length; i++) {
                        var $W = this.timeline[i];
                        var $z = {};
                        $z.start = new DayPilot.Date($W.start);
                        $z.end = $W.end ? new DayPilot.Date($W.end) : $z.start.addMinutes(this.cellDuration);
                        if (!$W.width) {
                            var $y = Math.floor($x + this.cellWidth);
                            var $X = $y - Math.floor($x);
                            $z.left = Math.floor($x);
                            $z.width = $X;
                            $x += this.cellWidth;
                        } else {
                            $z.left = $W.left || $x;
                            $z.width = $W.width || this.cellWidth;
                            $x += $z.width;
                        };
                        $z.breakBefore = $V && $V.ticks !== $z.start.ticks;
                        $V = $z.end;
                        this.itline.push($z);
                    }
                };
                if ($S) {
                    this.$5M();
                }
            } else {
                this.timeHeader = [];
                if (this.scale === "Manual") {
                    this.itline = [];
                    var $x = 0;
                    var $V = null;
                    for (var i = 0; i < this.timeline.length; i++) {
                        var $W = this.timeline[i];
                        var $z = {};
                        $z.start = new DayPilot.Date($W.start);
                        $z.end = $W.end ? new DayPilot.Date($W.end) : $z.start.addMinutes(this.cellDuration);
                        $z.left = Math.floor($x);
                        $z.width = Math.floor($W.width || this.cellWidth);
                        $z.breakBefore = $V && $V.ticks !== $z.start.ticks;
                        $V = $z.end;
                        this.itline.push($z);
                        $x += $z.width;
                    }
                } else {
                    this.$5J();
                };
                this.$5N();
            }
        };
        this.$5J = function() {
            var $v = this.startDate;
            var end = this.$5O($v);
            var $Y = false;
            var $Z = this.timeHeaders;
            var $x = 0;
            while (end.ticks <= this.endDate.ticks && end.ticks > $v.ticks) {
                if (this.$5P($v, end)) {
                    var $y = Math.floor($x + this.cellWidth);
                    var $X = $y - Math.floor($x);
                    var $00 = {};
                    $00.start = $v;
                    $00.end = end;
                    $00.left = Math.floor($x);
                    $00.width = $X;
                    $00.breakBefore = $Y;
                    this.itline.push($00);
                    $x += this.cellWidth;
                    $Y = false;
                } else {
                    $Y = true;
                };
                $v = end;
                end = this.$5O($v);
            }
        };
        this.$5M = function() {
            $e.debug.message("updateHeaderGroupDimensions");
            if (!this.timeHeader) {
                return;
            };
            for (var y = 0; y < this.timeHeader.length; y++) {
                var $t = this.timeHeader[y];
                for (var x = 0; x < $t.length; x++) {
                    var h = $t[x];
                    h.left = this.getPixels(new DayPilot.Date(h.start)).left;
                    var $y = this.getPixels(new DayPilot.Date(h.end)).left;
                    var $X = $y - h.left;
                    h.width = $X;
                }
            }
        };
        this.$5N = function() {
            var $Z = this.timeHeaders;
            if (!$Z) {
                $Z = [{
                    "groupBy": this.cellGroupBy
                }, {
                    "groupBy": "Cell"
                }];
            };
            for (var i = 0; i < $Z.length; i++) {
                var $01 = $Z[i].groupBy;
                var $02 = $Z[i].format;
                var $v = this.startDate;
                var $03 = [];
                var $v = this.startDate;
                while ($v.ticks < this.endDate.ticks) {
                    var h = {};
                    h.start = $v;
                    h.end = this.$5Q(h.start, $01);
                    if (h.start.ticks === h.end.ticks) {
                        break;
                    };
                    h.left = this.getPixels(h.start).left;
                    var $y = this.getPixels(h.end).left;
                    var $X = $y - h.left;
                    h.width = $X;
                    h.colspan = Math.ceil($X / (1.0 * this.cellWidth));
                    if ($02) {
                        h.innerHTML = h.start.toString($02, $04.locale());
                    } else {
                        h.innerHTML = this.$5R(h, $01);
                    };
                    if ($X > 0) {
                        if (typeof this.onBeforeTimeHeaderRender === 'function') {
                            var $z = {};
                            $z.start = h.start;
                            $z.end = h.end;
                            $z.html = h.innerHTML;
                            $z.toolTip = h.innerHTML;
                            $z.backColor = null;
                            if (!this.cssOnly) {
                                $z.backColor = this.hourNameBackColor;
                            };
                            $z.level = this.timeHeader.length;
                            var $q = {};
                            $q.header = $z;
                            this.onBeforeTimeHeaderRender($q);
                            h.innerHTML = $z.html;
                            h.backColor = $z.backColor;
                            h.toolTip = $z.toolTip;
                        };
                        $03.push(h);
                    };
                    $v = h.end;
                };
                this.timeHeader.push($03);
            }
        };
        this.$5P = function($v, end) {
            if (typeof this.onIncludeTimeCell === 'function') {
                var $z = {};
                $z.start = $v;
                $z.end = end;
                $z.visible = true;
                var $q = {};
                $q.cell = $z;
                this.onIncludeTimeCell($q);
                return $z.visible;
            };
            if (this.showNonBusiness) {
                return true;
            };
            if ($v.d.getUTCDay() === 0) {
                return false;
            };
            if ($v.d.getUTCDay() === 6) {
                return false;
            };
            var $05 = (end.getTime() - $v.getTime()) / (1000 * 60);
            if ($05 < 60 * 24) {
                var $06 = $v.d.getUTCHours();
                $06 += $v.d.getUTCMinutes() / 60.0;
                $06 += $v.d.getUTCSeconds() / 3600.0;
                $06 += $v.d.getUTCMilliseconds() / 3600000.0;
                if ($06 < this.businessBeginsHour) {
                    return false;
                };
                if (this.businessEndsHour >= 24) {
                    return true;
                };
                if ($06 >= this.businessEndsHour) {
                    return false;
                }
            };
            return true;
        };
        this.getPixels = function($r) {
            var $07 = $r.ticks;
            var $08 = this.$51.pixels[$07];
            if ($08) {
                return $08;
            };
            var $09 = null;
            var $0a = 221876841600000;
            if (this.itline.length === 0 || $07 < this.itline[0].start.ticks) {
                var $f = {};
                $f.cut = false;
                $f.left = 0;
                $f.boxLeft = $f.left;
                $f.boxRight = $f.left;
                $f.i = null;
                return $f;
            };
            for (var i = 0; i < this.itline.length; i++) {
                var $0b = false;
                var $z = this.itline[i];
                var $0c = $z.start.ticks;
                var $0d = $z.end.ticks;
                if ($0c < $07 && $07 < $0d) {
                    var $0e = $07 - $0c;
                    var $f = {};
                    $f.cut = false;
                    $f.left = $z.left + this.$5S($z, $0e);
                    $f.boxLeft = $z.left;
                    $f.boxRight = $z.left + $z.width;
                    $f.i = i;
                    break;
                } else if ($0c === $07) {
                    var $f = {};
                    $f.cut = false;
                    $f.left = $z.left;
                    $f.boxLeft = $f.left;
                    $f.boxRight = $f.left + $z.width;
                    $f.i = i;
                    break;
                } else if ($0d === $07) {
                    var $f = {};
                    $f.cut = false;
                    $f.left = $z.left + $z.width;
                    $f.boxLeft = $f.left;
                    $f.boxRight = $f.left;
                    $f.i = i + 1;
                    break;
                } else if ($07 < $0c && $07 > $0a) {
                    var $f = {};
                    $f.cut = true;
                    $f.left = $z.left;
                    $f.boxLeft = $f.left;
                    $f.boxRight = $f.left;
                    $f.i = i;
                    break;
                };
                $0a = $0d;
            };
            if (!$f) {
                var $0f = this.itline[this.itline.length - 1];
                var $f = {};
                $f.cut = true;
                $f.left = $0f.left + $0f.width;
                $f.boxLeft = $f.left;
                $f.boxRight = $f.left;
                $f.i = null;
            };
            this.$51.pixels[$07] = $f;
            return $f;
        };
        this.getDate = function($x, $0g, $0h) {
            var $O = this.$5T($x, $0h);
            if (!$O) {
                return null;
            };
            var x = $O.x;
            var $0i = this.itline[x];
            if (!$0i) {
                return null;
            };
            var $v = ($0h && !$0g) ? $0i.end : $0i.start;
            if (!$0g) {
                return $v;
            } else {
                return $v.addTime(this.$5U($O.cell, $O.offset));
            }
        };
        this.$5T = function($s, $0h) {
            var $0j = 0;
            var $09 = 0;
            for (var i = 0; i < this.itline.length; i++) {
                var $z = this.itline[i];
                var $X = $z.width || this.cellWidth;
                $0j += $X;
                if (($s < $0j) || ($0h && $s === $0j)) {
                    var $f = {};
                    $f.x = i;
                    $f.offset = $s - $09;
                    $f.cell = $z;
                    return $f;
                };
                $09 = $0j;
            };
            var $z = this.itline[this.itline.length - 1];
            var $f = {};
            $f.x = this.itline.length - 1;
            $f.offset = $z.width || this.cellWidth;
            $f.cell = $z;
            return $f;
        };
        this.$5V = function($0k) {
            var $0j = new DayPilot.Date($0k);
            var $09 = 0;
            for (var i = 0; i < this.itline.length; i++) {
                var $z = this.itline[i];
                if ($z.start.ticks <= $0j.ticks && $0j.ticks < $z.end.ticks) {
                    return $z;
                };
                if ($0j.ticks < $z.start.ticks) {
                    return null;
                }
            };
            var $z = this.itline[this.itline.length - 1];
            return $z;
        };
        this.$5S = function($z, $07) {
            var $X = $z.width || this.cellWidth;
            var $0l = $z.end.ticks - $z.start.ticks;
            return Math.floor(($X * $07) / ($0l));
        };
        this.$5U = function($z, $s) {
            var $0l = $z.end.ticks - $z.start.ticks;
            var $X = $z.width || this.cellWidth;
            return Math.floor($s / $X * $0l);
        };
        this.$5W = function(ev) {
            if ($0m.start) {
                return;
            };
            $0n = {};
            $e.$5X(this, ev);
        };
        this.eventClickPostBack = function(e, $m) {
            this.$5Y('EventClick', e, $m);
        };
        this.eventClickCallBack = function(e, $m) {
            this.$5Z('EventClick', e, $m);
        };
        this.$5X = function($B, ev) {
            var e = $B.event;
            var ev = ev || window.event;
            if (typeof(DayPilotBubble) !== 'undefined') {
                DayPilotBubble.hideActive();
            };
            if (!e.client.doubleClickEnabled()) {
                $e.$60($B, ev.ctrlKey);
                return;
            };
            if (!$e.timeouts.click) {
                $e.timeouts.click = [];
            };
            var $0o = function($B, $0p) {
                return function() {
                    $e.$60($B, $0p);
                };
            };
            $e.timeouts.click.push(window.setTimeout($0o($B, ev.ctrlKey), $e.doubleClickTimeout));
        };
        this.$60 = function($B, $0p) {
            var e = $B.event;
            if (!e.client.clickEnabled()) {
                return;
            };
            if ($e.$5t()) {
                var $q = {};
                $q.e = e;
                $q.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $e.onEventClick === 'function') {
                    $e.onEventClick($q);
                    if ($q.preventDefault.value) {
                        return;
                    }
                };
                switch ($e.eventClickHandling) {
                    case 'PostBack':
                        $e.eventClickPostBack(e);
                        break;
                    case 'CallBack':
                        $e.eventClickCallBack(e);
                        break;
                    case 'Edit':
                        $e.$61($B);
                        break;
                    case 'Select':
                        $e.$62($B, e, $0p);
                        break;
                    case 'ContextMenu':
                        var $0q = e.client.contextMenu();
                        if ($0q) {
                            $0q.show(e);
                        } else {
                            if ($e.contextMenu) {
                                $e.contextMenu.show(e);
                            }
                        };
                        break;
                    case 'Bubble':
                        if ($e.bubble) {
                            $e.bubble.showEvent(e);
                        };
                        break;
                };
                if (typeof $e.onEventClicked === 'function') {
                    $e.onEventClicked($q);
                }
            } else {
                switch ($e.eventClickHandling) {
                    case 'PostBack':
                        $e.eventClickPostBack(e);
                        break;
                    case 'CallBack':
                        $e.eventClickCallBack(e);
                        break;
                    case 'JavaScript':
                        $e.onEventClick(e);
                        break;
                    case 'Edit':
                        $e.$61($B);
                        break;
                    case 'Select':
                        $e.$62($B, e, $0p);
                        break;
                    case 'ContextMenu':
                        var $0q = e.client.contextMenu();
                        if ($0q) {
                            $0q.show(e);
                        } else {
                            if ($e.contextMenu) {
                                $e.contextMenu.show(e);
                            }
                        };
                        break;
                    case 'Bubble':
                        if ($e.bubble) {
                            $e.bubble.showEvent(e);
                        };
                        break;
                }
            }
        };
        this.setHScrollPosition = function($s) {
            this.nav.scroll.scrollLeft = $s;
        };
        this.getScrollX = function() {
            return this.nav.scroll.scrollLeft;
        };
        this.getHScrollPosition = this.getScrollX;
        this.getScrollY = function() {
            return this.nav.scroll.scrollTop;
        };
        this.$62 = function($B, e, $0p) {
            $e.$63($B, e, $0p);
        };
        this.eventSelectPostBack = function(e, $0r, $m) {
            var $0s = {};
            $0s.e = e;
            $0s.change = $0r;
            this.$5Y('EventSelect', $0s, $m);
        };
        this.eventSelectCallBack = function(e, $0r, $m) {
            var $0s = {};
            $0s.e = e;
            $0s.change = $0r;
            this.$5Z('EventSelect', $0s, $m);
        };
        this.$63 = function($B, e, $0p) {
            if ($e.$5t()) {
                var m = $e.multiselect;
                m.previous = m.events();
                var $q = {};
                $q.e = e;
                $q.selected = m.isSelected(e);
                $q.ctrl = $0p;
                $q.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $e.onEventSelect === 'function') {
                    $e.onEventSelect($q);
                    if ($q.preventDefault.value) {
                        return;
                    }
                };
                switch ($e.eventSelectHandling) {
                    case 'PostBack':
                        $e.eventSelectPostBack(e, $0r);
                        break;
                    case 'CallBack':
                        if (typeof WebForm_InitCallback !== 'undefined') {
                            __theFormPostData = "";
                            __theFormPostCollection = [];
                            WebForm_InitCallback();
                        };
                        $e.eventSelectCallBack(e, $0r);
                        break;
                    case 'Update':
                        m.$64($B, $0p);
                        break;
                };
                if (typeof $e.onEventSelected === 'function') {
                    $q.change = m.isSelected(e) ? "selected" : "deselected";
                    $q.selected = m.isSelected(e);
                    $e.onEventSelected($q);
                }
            } else {
                var m = $e.multiselect;
                m.previous = m.events();
                m.$64($B, $0p);
                var $0r = m.isSelected(e) ? "selected" : "deselected";
                switch ($e.eventSelectHandling) {
                    case 'PostBack':
                        $e.eventSelectPostBack(e, $0r);
                        break;
                    case 'CallBack':
                        if (typeof WebForm_InitCallback !== 'undefined') {
                            __theFormPostData = "";
                            __theFormPostCollection = [];
                            WebForm_InitCallback();
                        };
                        $e.eventSelectCallBack(e, $0r);
                        break;
                    case 'JavaScript':
                        $e.onEventSelect(e, $0r);
                        break;
                }
            }
        };
        this.eventRightClickPostBack = function(e, $m) {
            this.$5Y('EventRightClick', e, $m);
        };
        this.eventRightClickCallBack = function(e, $m) {
            this.$5Z('EventRightClick', e, $m);
        };
        this.$65 = function(ev) {
            var e = this.event;
            ev = ev || window.event;
            ev.cancelBubble = true;
            if (!this.event.client.rightClickEnabled()) {
                return false;
            };
            if ($e.$5t()) {
                var $q = {};
                $q.e = e;
                $q.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $e.onEventRightClick === 'function') {
                    $e.onEventRightClick($q);
                    if ($q.preventDefault.value) {
                        return;
                    }
                };
                switch ($e.eventRightClickHandling) {
                    case 'PostBack':
                        $e.eventRightClickPostBack(e);
                        break;
                    case 'CallBack':
                        $e.eventRightClickCallBack(e);
                        break;
                    case 'ContextMenu':
                        var $0q = e.client.contextMenu();
                        if ($0q) {
                            $0q.show(e);
                        } else {
                            if ($e.contextMenu) {
                                $e.contextMenu.show(this.event);
                            }
                        };
                        break;
                    case 'Bubble':
                        if ($e.bubble) {
                            $e.bubble.showEvent(e);
                        };
                        break;
                };
                if (typeof $e.onEventRightClicked === 'function') {
                    $e.onEventRightClicked($q);
                }
            } else {
                switch ($e.eventRightClickHandling) {
                    case 'PostBack':
                        $e.eventRightClickPostBack(e);
                        break;
                    case 'CallBack':
                        $e.eventRightClickCallBack(e);
                        break;
                    case 'JavaScript':
                        $e.onEventRightClick(e);
                        break;
                    case 'ContextMenu':
                        var $0q = e.client.contextMenu();
                        if ($0q) {
                            $0q.show(e);
                        } else {
                            if ($e.contextMenu) {
                                $e.contextMenu.show(this.event);
                            }
                        };
                        break;
                    case 'Bubble':
                        if ($e.bubble) {
                            $e.bubble.showEvent(e);
                        };
                        break;
                }
            };
            return false;
        };
        this.eventDoubleClickPostBack = function(e, $m) {
            this.$5Y('EventDoubleClick', e, $m);
        };
        this.eventDoubleClickCallBack = function(e, $m) {
            this.$5Z('EventDoubleClick', e, $m);
        };
        this.$66 = function(ev) {
            if (typeof(DayPilotBubble) !== 'undefined') {
                DayPilotBubble.hideActive();
            };
            if ($e.timeouts.click) {
                for (var $0t in $e.timeouts.click) {
                    window.clearTimeout($e.timeouts.click[$0t]);
                };
                $e.timeouts.click = null;
            };
            var ev = ev || window.event;
            var e = this.event;
            if ($e.$5t()) {
                var $q = {};
                $q.e = e;
                $q.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $e.onEventDoubleClick === 'function') {
                    $e.onEventDoubleClick($q);
                    if ($q.preventDefault.value) {
                        return;
                    }
                };
                switch ($e.eventDoubleClickHandling) {
                    case 'PostBack':
                        $e.eventDoubleClickPostBack(e);
                        break;
                    case 'CallBack':
                        $e.eventDoubleClickCallBack(e);
                        break;
                    case 'Edit':
                        $e.$61(this);
                        break;
                    case 'Select':
                        $e.$62($B, e, ev.ctrlKey);
                        break;
                    case 'Bubble':
                        if ($e.bubble) {
                            $e.bubble.showEvent(e);
                        };
                        break;
                };
                if (typeof $e.onEventDoubleClicked === 'function') {
                    $e.onEventDoubleClicked($q);
                }
            } else {
                switch ($e.eventDoubleClickHandling) {
                    case 'PostBack':
                        $e.eventDoubleClickPostBack(e);
                        break;
                    case 'CallBack':
                        $e.eventDoubleClickCallBack(e);
                        break;
                    case 'JavaScript':
                        $e.onEventDoubleClick(e);
                        break;
                    case 'Edit':
                        $e.$61(this);
                        break;
                    case 'Select':
                        $e.$62($B, e, ev.ctrlKey);
                        break;
                    case 'Bubble':
                        if ($e.bubble) {
                            $e.bubble.showEvent(e);
                        };
                        break;
                }
            }
        };
        this.eventResizePostBack = function(e, $0u, $0v, $m) {
            this.$67("PostBack", e, $0u, $0v, $m);
        };
        this.eventResizeCallBack = function(e, $0u, $0v, $m) {
            this.$67("CallBack", e, $0u, $0v, $m);
        };
        this.$67 = function($0w, e, $0u, $0v, $m) {
            var $0s = {};
            $0s.e = e;
            $0s.newStart = $0u;
            $0s.newEnd = $0v;
            this.$68($0w, "EventResize", $0s, $m);
        };
        this.$69 = function(e, $0u, $0v) {
            if (this.eventResizeHandling === 'Disabled') {
                return;
            };
            if ($e.$5t()) {
                var $q = {};
                $q.e = e;
                $q.newStart = $0u;
                $q.newEnd = $0v;
                $q.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $e.onEventResize === 'function') {
                    $e.onEventResize($q);
                    if ($q.preventDefault.value) {
                        return;
                    }
                };
                switch ($e.eventResizeHandling) {
                    case 'PostBack':
                        $e.eventResizePostBack(e, $0u, $0v);
                        break;
                    case 'CallBack':
                        $e.eventResizeCallBack(e, $0u, $0v);
                        break;
                    case 'Notify':
                        $e.eventResizeNotify(e, $0u, $0v);
                        break;
                    case 'Update':
                        e.start($0u);
                        e.end($0v);
                        $e.events.update(e);
                        break;
                };
                if (typeof $e.onEventResized === 'function') {
                    $e.onEventResized($q);
                }
            } else {
                switch ($e.eventResizeHandling) {
                    case 'PostBack':
                        $e.eventResizePostBack(e, $0u, $0v);
                        break;
                    case 'CallBack':
                        $e.eventResizeCallBack(e, $0u, $0v);
                        break;
                    case 'JavaScript':
                        $e.onEventResize(e, $0u, $0v);
                        break;
                    case 'Notify':
                        $e.eventResizeNotify(e, $0u, $0v);
                        break;
                    case 'Update':
                        e.start($0u);
                        e.end($0v);
                        $e.events.update(e);
                        break;
                }
            }
        };
        this.eventMovePostBack = function(e, $0u, $0v, $0x, $m, $03) {
            this.$6a("PostBack", e, $0u, $0v, $0x, $m, $03);
        };
        this.eventMoveCallBack = function(e, $0u, $0v, $0x, $m, $03) {
            this.$6a("CallBack", e, $0u, $0v, $0x, $m, $03);
        };
        this.$6a = function($0w, e, $0u, $0v, $0x, $m, $03) {
            var $0s = {};
            $0s.e = e;
            $0s.newStart = $0u;
            $0s.newEnd = $0v;
            $0s.newResource = $0x;
            $0s.position = $03;
            this.$68($0w, "EventMove", $0s, $m);
        };
        this.$68 = function($0w, $0y, $0s, $m) {
            if ($0w === 'PostBack') {
                $e.$5Y($0y, $0s, $m);
            } else if ($0w === 'CallBack') {
                $e.$5Z($0y, $0s, $m, "CallBack");
            } else if ($0w === 'Immediate') {
                $e.$5Z($0y, $0s, $m, "Notify");
            } else if ($0w === 'Queue') {
                $e.queue.add(new DayPilot.Action(this, $0y, $0s, $m));
            } else if ($0w === 'Notify') {
                if ($04.notifyType() === 'Notify') {
                    $e.$5Z($0y, $0s, $m, "Notify");
                } else {
                    $e.queue.add(new DayPilot.Action($e, $0y, $0s, $m));
                }
            } else {
                throw "Invalid event invocation type";
            }
        };
        this.eventMoveNotify = function(e, $0u, $0v, $0x, $m, $03) {
            var $0z = new DayPilot.Event(e.copy(), this);
            var $0A = $e.events.$6b(e.data);
            e.start($0u);
            e.end($0v);
            e.resource($0x);
            e.commit();
            $0A = $0A.concat($e.events.$6c(e.data));
            $e.$6d($0A);
            $e.$6e();
            $e.$5n($0A);
            this.$6a("Notify", $0z, $0u, $0v, $0x, $m, $03);
        };
        this.eventResizeNotify = function(e, $0u, $0v, $m) {
            var $0z = new DayPilot.Event(e.copy(), this);
            var $0A = $e.events.$6b(e.data);
            e.start($0u);
            e.end($0v);
            e.commit();
            $0A = $0A.concat($e.events.$6c(e.data));
            $e.$6d($0A);
            $e.$6e();
            $e.$5n($0A);
            this.$67("Notify", $0z, $0u, $0v, $m);
        };
        this.multiselect = {};
        this.multiselect.initList = [];
        this.multiselect.list = [];
        this.multiselect.divs = [];
        this.multiselect.previous = [];
        this.multiselect.$6f = function() {
            var m = $e.multiselect;
            return DayPilot.JSON.stringify(m.events());
        };
        this.multiselect.events = function() {
            var m = $e.multiselect;
            var $0B = [];
            $0B.ignoreToJSON = true;
            for (var i = 0; i < m.list.length; i++) {
                $0B.push(m.list[i]);
            };
            return $0B;
        };
        this.multiselect.$6g = function() {};
        this.multiselect.$64 = function($B, $0C) {
            var m = $e.multiselect;
            if (m.isSelected($B.event)) {
                if ($e.allowMultiSelect) {
                    if ($0C) {
                        m.remove($B.event, true);
                    } else {
                        var $U = m.list.length;
                        m.clear();
                        if ($U > 1) {
                            m.add($B.event, true);
                        }
                    }
                } else {
                    m.clear();
                }
            } else {
                if ($e.allowMultiSelect) {
                    if ($0C) {
                        m.add($B.event, true);
                    } else {
                        m.clear();
                        m.add($B.event, true);
                    }
                } else {
                    m.clear();
                    m.add($B.event, true);
                }
            };
            m.$6h($B);
            m.$6g();
        };
        this.multiselect.$6i = function(ev) {
            var m = $e.multiselect;
            return m.$6j(ev, m.initList);
        };
        this.multiselect.$6k = function() {
            var m = $e.multiselect;
            var $0D = [];
            for (var i = 0; i < m.list.length; i++) {
                var event = m.list[i];
                $0D.push(event.value());
            };
            alert($0D.join("\n"));
        };
        this.multiselect.add = function(ev, $0E) {
            var m = $e.multiselect;
            if (m.indexOf(ev) === -1) {
                m.list.push(ev);
            };
            if ($0E) {
                return;
            };
            m.redraw();
        };
        this.multiselect.remove = function(ev, $0E) {
            var m = $e.multiselect;
            var i = m.indexOf(ev);
            if (i !== -1) {
                m.list.splice(i, 1);
            };
            if ($0E) {
                return;
            };
            m.redraw();
        };
        this.multiselect.clear = function($0E) {
            var m = $e.multiselect;
            m.list = [];
            if ($0E) {
                return;
            };
            m.redraw();
        };
        this.multiselect.redraw = function() {
            var m = $e.multiselect;
            for (var i = 0; i < $e.elements.events.length; i++) {
                var $B = $e.elements.events[i];
                if (m.isSelected($B.event)) {
                    m.$6l($B);
                } else {
                    m.$6m($B);
                }
            }
        };
        this.multiselect.$6n = function(ev) {
            var m = $e.multiselect;
            var $B = null;
            for (var i = 0; i < $e.elements.events.length; i++) {
                if (m.isSelected($e.elements.events[i].event)) {
                    $B = $e.elements.events[i];
                    break;
                }
            };
            m.$6h($B);
        };
        this.multiselect.$6h = function($B) {
            if (!$B) {
                return;
            };
            var m = $e.multiselect;
            if (m.isSelected($B.event)) {
                m.$6l($B);
            } else {
                m.$6m($B);
            }
        };
        this.multiselect.$6l = function($B) {
            var m = $e.multiselect;
            var cn = $e.cssOnly ? $e.$5D("_selected") : $e.$5D("selected");
            var $B = m.$6o($B);
            DayPilot.Util.addClass($B, cn);
            m.divs.push($B);
        };
        this.multiselect.$6o = function($B) {
            return $B;
        };
        this.multiselect.$6p = function() {
            var m = $e.multiselect;
            for (var i = 0; i < m.divs.length; i++) {
                var $B = m.divs[i];
                m.$6m($B, true);
            };
            m.divs = [];
        };
        this.multiselect.$6m = function($B, $0F) {
            var m = $e.multiselect;
            var cn = $e.cssOnly ? $e.$5D("_selected") : $e.$5D("selected");
            DayPilot.Util.removeClass($B, cn);
            if ($0F) {
                return;
            };
            var i = DayPilot.indexOf(m.divs, $B);
            if (i !== -1) {
                m.divs.splice(i, 1);
            }
        };
        this.multiselect.isSelected = function(ev) {
            return $e.multiselect.$6j(ev, $e.multiselect.list);
        };
        this.multiselect.indexOf = function(ev) {
            return DayPilot.indexOf($e.multiselect.list, ev);
        };
        this.multiselect.$6j = function(e, $0D) {
            if (!$0D) {
                return false;
            };
            for (var i = 0; i < $0D.length; i++) {
                var ei = $0D[i];
                if (e === ei) {
                    return true;
                };
                if (typeof ei.id === 'function') {
                    if (ei.id() !== null && e.id() !== null && ei.id() === e.id()) {
                        return true;
                    };
                    if (ei.id() === null && e.id() === null && ei.recurrentMasterId() === e.recurrentMasterId() && e.start().toStringSortable() === ei.start().toStringSortable()) {
                        return true;
                    }
                } else {
                    if (ei.id !== null && e.id() !== null && ei.id === e.id()) {
                        return true;
                    };
                    if (ei.id === null && e.id() === null && ei.recurrentMasterId === e.recurrentMasterId() && e.start().toStringSortable() === ei.start) {
                        return true;
                    }
                }
            };
            return false;
        };
        this.update = function() {
            var $0G = true;
            if ($0G) {
                if (!this.$5L()) {
                    $e.timeHeader = null;
                    $e.cellProperties = {};
                };
                $e.$55();
                $e.$56();
                $e.$57();
            };
            this.$59();
            if ($0G) {
                $e.$5a();
                $e.$5b();
                $e.$6q();
            };
            $e.$5c();
            $e.$5e();
            $e.$5f();
            if ($e.heightSpec === 'Auto' || $e.heightSpec === 'Max') {
                $e.$5g();
            };
            this.$5i();
            this.$5j();
            this.$5h();
            this.$5s();
            this.$5k();
            this.$5l();
            this.$5m();
            this.$5z();
        };
        this.$5n = function($0A, $0H, $0I) {
            var $v, end;
            $0A = DayPilot.ua($0A);
            if (this.rowsDirty) {
                var $0J = this.$5e();
                this.$5c();
                this.$5h();
                this.$5j();
                for (var i = 0; i < $0A.length; i++) {
                    var ri = $0A[i];
                    this.$6r(ri);
                };
                for (var i = 0; i < $0A.length; i++) {
                    var ri = $0A[i];
                    this.$6s(ri);
                };
                this.$5k();
                this.$5l();
                this.$6t();
                if ($0I) {
                    $0I();
                }
            } else {
                var $0K = true;
                if ($0K) {
                    var $0L = function(i) {
                        if (i >= $0A.length) {
                            return;
                        };
                        var ri = $0A[i];
                        if (!$0H) {
                            $e.$6r(ri);
                        };
                        $e.$6s(ri);
                        if (i + 1 < $0A.length) {
                            setTimeout(function() {
                                $0L(i + 1);
                            }, 10);
                        } else {
                            if ($0I) {
                                $0I();
                            }
                        }
                    };
                    $0L(0);
                } else {
                    for (var i = 0; i < $0A.length; i++) {
                        var ri = $0A[i];
                        if (!$0H) {
                            this.$6r(ri);
                        };
                        this.$6s(ri);
                    };
                    if ($0I) {
                        $0I();
                    }
                }
            };
            this.$5s();
        };
        this.$6u = function(e, $0u, $0v, $0x, external, ev, $03) {
            if ($e.eventMoveHandling === 'Disabled') {
                return;
            };
            if ($e.$5t()) {
                var $q = {};
                $q.e = e;
                $q.newStart = $0u;
                $q.newEnd = $0v;
                $q.newResource = $0x;
                $q.external = external;
                $q.ctrl = false;
                if (ev) {
                    $q.ctrl = ev.ctrlKey;
                };
                $q.shift = false;
                if (ev) {
                    $q.shift = ev.shiftKey;
                };
                $q.position = $03;
                $q.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $e.onEventMove === 'function') {
                    $e.onEventMove($q);
                    if ($q.preventDefault.value) {
                        return;
                    }
                };
                switch ($e.eventMoveHandling) {
                    case 'PostBack':
                        $e.eventMovePostBack(e, $0u, $0v, $0x, null, $03);
                        break;
                    case 'CallBack':
                        $e.eventMoveCallBack(e, $0u, $0v, $0x, null, $03);
                        break;
                    case 'Notify':
                        $e.eventMoveNotify(e, $0u, $0v, $0x, null, $03);
                        break;
                    case 'Update':
                        e.start($0u);
                        e.end($0v);
                        e.resource($0x);
                        if (external) {
                            e.commit();
                            $e.events.add(e);
                        } else {
                            $e.events.update(e);
                        };
                        $e.$5q();
                        break;
                };
                if (typeof $e.onEventMoved === 'function') {
                    $e.onEventMoved($q);
                }
            } else {
                switch ($e.eventMoveHandling) {
                    case 'PostBack':
                        $e.eventMovePostBack(e, $0u, $0v, $0x, null, $03);
                        break;
                    case 'CallBack':
                        $e.eventMoveCallBack(e, $0u, $0v, $0x, null, $03);
                        break;
                    case 'JavaScript':
                        $e.onEventMove(e, $0u, $0v, $0x, external, ev ? ev.ctrlKey : false, ev ? ev.shiftKey : false, $03);
                        break;
                    case 'Notify':
                        $e.eventMoveNotify(e, $0u, $0v, $0x, null, $03);
                        break;
                    case 'Update':
                        e.start($0u);
                        e.end($0v);
                        e.resource($0x);
                        $e.events.update(e);
                        break;
                }
            }
        };
        this.$6v = function($q, $i) {
            var $h = $e.$6w($i);
            var $0s = {};
            $0s.args = $q;
            $0s.guid = $h;
            $e.$5Z("Bubble", $0s);
        };
        this.$6w = function($i) {
            var $h = DayPilot.guid();
            if (!this.bubbles) {
                this.bubbles = [];
            };
            this.bubbles[$h] = $i;
            return $h;
        };
        this.eventMenuClickPostBack = function(e, $0M, $m) {
            var $0s = {};
            $0s.e = e;
            $0s.command = $0M;
            this.$5Y('EventMenuClick', $0s, $m);
        };
        this.eventMenuClickCallBack = function(e, $0M, $m) {
            var $0s = {};
            $0s.e = e;
            $0s.command = $0M;
            this.$5Z('EventMenuClick', $0s, $m);
        };
        this.$6x = function($0M, e, $0N) {
            switch ($0N) {
                case 'PostBack':
                    $e.eventMenuClickPostBack(e, $0M);
                    break;
                case 'CallBack':
                    $e.eventMenuClickCallBack(e, $0M);
                    break;
            }
        };
        this.timeRangeSelectedPostBack = function($v, end, $0O, $m) {
            var $0P = {};
            $0P.start = $v;
            $0P.end = end;
            $0P.resource = $0O;
            this.$5Y('TimeRangeSelected', $0P, $m);
        };
        this.timeRangeSelectedCallBack = function($v, end, $0O, $m) {
            var $0P = {};
            $0P.start = $v;
            $0P.end = end;
            $0P.resource = $0O;
            this.$5Z('TimeRangeSelected', $0P, $m);
        };
        this.$6y = function($v, end, $0O) {
            if ($e.timeRangeSelectedHandling === 'Disabled') {
                return;
            };
            if ($e.$5t()) {
                var $q = {};
                $q.start = $v;
                $q.end = end;
                $q.resource = $0O;
                $q.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $e.onTimeRangeSelect === 'function') {
                    $e.onTimeRangeSelect($q);
                    if ($q.preventDefault.value) {
                        return;
                    }
                };
                switch ($e.timeRangeSelectedHandling) {
                    case 'PostBack':
                        $e.timeRangeSelectedPostBack($v, end, $0O);
                        break;
                    case 'CallBack':
                        $e.timeRangeSelectedCallBack($v, end, $0O);
                        break;
                };
                if (typeof $e.onTimeRangeSelected === 'function') {
                    $e.onTimeRangeSelected($q);
                }
            } else {
                switch ($e.timeRangeSelectedHandling) {
                    case 'PostBack':
                        $e.timeRangeSelectedPostBack($v, end, $0O);
                        break;
                    case 'CallBack':
                        $e.timeRangeSelectedCallBack($v, end, $0O);
                        break;
                    case 'JavaScript':
                        $e.onTimeRangeSelected($v, end, $0O);
                        break;
                    case 'Hold':
                        break;
                }
            }
        };
        this.timeRangeDoubleClickPostBack = function($v, end, $0O, $m) {
            var $0P = {};
            $0P.start = $v;
            $0P.end = end;
            $0P.resource = $0O;
            this.$5Y('TimeRangeDoubleClick', $0P, $m);
        };
        this.timeRangeDoubleClickCallBack = function($v, end, $0O, $m) {
            var $0P = {};
            $0P.start = $v;
            $0P.end = end;
            $0P.resource = $0O;
            this.$5Z('TimeRangeDoubleClick', $0P, $m);
        };
        this.$6z = function($v, end, $0O) {
            if ($e.$5t()) {
                var $q = {};
                $q.start = $v;
                $q.end = end;
                $q.resource = $0O;
                $q.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $e.onTimeRangeDoubleClick === 'function') {
                    $e.onTimeRangeDoubleClick($q);
                    if ($q.preventDefault.value) {
                        return;
                    }
                };
                switch ($e.timeRangeDoubleClickHandling) {
                    case 'PostBack':
                        $e.timeRangeDoubleClickPostBack($v, end, $0O);
                        break;
                    case 'CallBack':
                        $e.timeRangeDoubleClickCallBack($v, end, $0O);
                        break;
                };
                if (typeof $e.onTimeRangeDoubleClicked === 'function') {
                    $e.onTimeRangeDoubleClicked($q);
                }
            } else {
                switch ($e.timeRangeDoubleClickHandling) {
                    case 'PostBack':
                        $e.timeRangeDoubleClickPostBack($v, end, $0O);
                        break;
                    case 'CallBack':
                        $e.timeRangeDoubleClickCallBack($v, end, $0O);
                        break;
                    case 'JavaScript':
                        $e.onTimeRangeDoubleClick($v, end, $0O);
                        break;
                }
            }
        };
        this.timeRangeMenuClickPostBack = function(e, $0M, $m) {
            var $0s = {};
            $0s.selection = e;
            $0s.command = $0M;
            this.$5Y("TimeRangeMenuClick", $0s, $m);
        };
        this.timeRangeMenuClickCallBack = function(e, $0M, $m) {
            var $0s = {};
            $0s.selection = e;
            $0s.command = $0M;
            this.$5Z("TimeRangeMenuClick", $0s, $m);
        };
        this.$6A = function($0M, e, $0N) {
            switch ($0N) {
                case 'PostBack':
                    $e.timeRangeMenuClickPostBack(e, $0M);
                    break;
                case 'CallBack':
                    $e.timeRangeMenuClickCallBack(e, $0M);
                    break;
            }
        };
        this.resourceHeaderMenuClickPostBack = function(e, $0M, $m) {
            var $0s = {};
            $0s.resource = e;
            $0s.command = $0M;
            this.$5Y("ResourceHeaderMenuClick", $0s, $m);
        };
        this.resourceHeaderMenuClickCallBack = function(e, $0M, $m) {
            var $0s = {};
            $0s.resource = e;
            $0s.command = $0M;
            this.$5Z("ResourceHeaderMenuClick", $0s, $m);
        };
        this.$6B = function($0M, e, $0N) {
            switch ($0N) {
                case 'PostBack':
                    $e.resourceHeaderMenuClickPostBack(e, $0M);
                    break;
                case 'CallBack':
                    $e.resourceHeaderMenuClickCallBack(e, $0M);
                    break;
            }
        };
        this.resourceHeaderClickPostBack = function(e, $m) {
            var $0s = {};
            $0s.resource = e;
            this.$5Y("ResourceHeaderClick", $0s, $m);
        };
        this.resourceHeaderClickCallBack = function(e, $m) {
            var $0s = {};
            $0s.resource = e;
            this.$5Z("ResourceHeaderClick", $0s, $m);
        };
        this.$6C = function(e) {
            if ($e.$5t()) {
                var $q = {};
                $q.resource = e;
                $q.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $e.onResourceHeaderClick === 'function') {
                    $e.onResourceHeaderClick($q);
                    if ($q.preventDefault.value) {
                        return;
                    }
                };
                switch (this.resourceHeaderClickHandling) {
                    case 'PostBack':
                        $e.resourceHeaderClickPostBack(e);
                        break;
                    case 'CallBack':
                        $e.resourceHeaderClickCallBack(e);
                        break;
                };
                if (typeof $e.onResourceHeaderClicked === 'function') {
                    $e.onResourceHeaderClicked($q);
                }
            } else {
                switch (this.resourceHeaderClickHandling) {
                    case 'PostBack':
                        $e.resourceHeaderClickPostBack(e);
                        break;
                    case 'CallBack':
                        $e.resourceHeaderClickCallBack(e);
                        break;
                    case 'JavaScript':
                        $e.onResourceHeaderClick(e);
                        break;
                }
            }
        };
        this.timeHeaderClickPostBack = function(e, $m) {
            var $0s = {};
            $0s.header = e;
            this.$5Y("TimeHeaderClick", $0s, $m);
        };
        this.timeHeaderClickCallBack = function(e, $m) {
            var $0s = {};
            $0s.header = e;
            this.$5Z("TimeHeaderClick", $0s, $m);
        };
        this.$6D = function(e) {
            if ($e.$5t()) {
                var $q = {};
                $q.header = e;
                $q.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $e.onTimeHeaderClick === 'function') {
                    $e.onTimeHeaderClick($q);
                    if ($q.preventDefault.value) {
                        return;
                    }
                };
                switch (this.timeHeaderClickHandling) {
                    case 'PostBack':
                        $e.timeHeaderClickPostBack(e);
                        break;
                    case 'CallBack':
                        $e.timeHeaderClickCallBack(e);
                        break;
                };
                if (typeof $e.onTimeHeaderClicked === 'function') {
                    $e.onTimeHeaderClicked($q);
                }
            } else {
                switch (this.timeHeaderClickHandling) {
                    case 'PostBack':
                        $e.timeHeaderClickPostBack(e);
                        break;
                    case 'CallBack':
                        $e.timeHeaderClickCallBack(e);
                        break;
                    case 'JavaScript':
                        $e.onTimeHeaderClick(e);
                        break;
                }
            }
        };
        this.resourceCollapsePostBack = function(e, $m) {
            var $0s = {};
            $0s.resource = e;
            this.$5Y("ResourceCollapse", $0s, $m);
        };
        this.resourceCollapseCallBack = function(e, $m) {
            var $0s = {};
            $0s.resource = e;
            this.$5Z("ResourceCollapse", $0s, $m);
        };
        this.$6E = function(e) {
            if ($e.$5t()) {
                var $q = {};
                $q.resource = e;
                $q.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $e.onResourceCollapse === 'function') {
                    $e.onResourceCollapse($q);
                    if ($q.preventDefault.value) {
                        return;
                    }
                };
                switch (this.resourceCollapseHandling) {
                    case 'PostBack':
                        $e.resourceCollapsePostBack(e);
                        break;
                    case 'CallBack':
                        $e.resourceCollapseCallBack(e);
                        break;
                }
            } else {
                switch (this.resourceCollapseHandling) {
                    case 'PostBack':
                        $e.resourceCollapsePostBack(e);
                        break;
                    case 'CallBack':
                        $e.resourceCollapseCallBack(e);
                        break;
                    case 'JavaScript':
                        $e.onResourceCollapse(e);
                        break;
                }
            }
        };
        this.resourceExpandPostBack = function(e, $m) {
            var $0s = {};
            $0s.resource = e;
            this.$5Y("ResourceExpand", $0s, $m);
        };
        this.resourceExpandCallBack = function(e, $m) {
            var $0s = {};
            $0s.resource = e;
            this.$5Z("ResourceExpand", $0s, $m);
        };
        this.$6F = function(e) {
            if ($e.$5t()) {
                var $q = {};
                $q.resource = e;
                $q.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $e.onResourceExpand === 'function') {
                    $e.onResourceExpand($q);
                    if ($q.preventDefault.value) {
                        return;
                    }
                };
                switch (this.resourceExpandHandling) {
                    case 'PostBack':
                        $e.resourceExpandPostBack(e);
                        break;
                    case 'CallBack':
                        $e.resourceExpandCallBack(e);
                        break;
                }
            } else {
                switch (this.resourceExpandHandling) {
                    case 'PostBack':
                        $e.resourceExpandPostBack(e);
                        break;
                    case 'CallBack':
                        $e.resourceExpandCallBack(e);
                        break;
                    case 'JavaScript':
                        $e.onResourceExpand(e);
                        break;
                }
            }
        };
        this.eventEditPostBack = function(e, $0Q, $m) {
            var $0s = {};
            $0s.e = e;
            $0s.newText = $0Q;
            this.$5Y("EventEdit", $0s, $m);
        };
        this.eventEditCallBack = function(e, $0Q, $m) {
            var $0s = {};
            $0s.e = e;
            $0s.newText = $0Q;
            this.$5Z("EventEdit", $0s, $m);
        };
        this.$6G = function(e, $0Q) {
            if ($e.$5t()) {
                var $q = {};
                $q.e = e;
                $q.newText = $0Q;
                $q.preventDefault = function() {
                    this.preventDefault.value = true;
                };
                if (typeof $e.onEventEdit === 'function') {
                    $e.onEventEdit($q);
                    if ($q.preventDefault.value) {
                        return;
                    }
                };
                switch ($e.eventEditHandling) {
                    case 'PostBack':
                        $e.eventEditPostBack(e, $0Q);
                        break;
                    case 'CallBack':
                        $e.eventEditCallBack(e, $0Q);
                        break;
                    case 'Update':
                        e.text($0Q);
                        $e.events.update(e);
                        break;
                };
                if (typeof $e.onEventEdited === 'function') {
                    $e.onEventEdited($q);
                    if ($q.preventDefault.value) {
                        return;
                    }
                }
            } else {
                switch ($e.eventEditHandling) {
                    case 'PostBack':
                        $e.eventEditPostBack(e, $0Q);
                        break;
                    case 'CallBack':
                        $e.eventEditCallBack(e, $0Q);
                        break;
                    case 'JavaScript':
                        $e.onEventEdit(e, $0Q);
                        break;
                }
            }
        };
        this.commandCallBack = function($0M, $m) {
            this.$6H("CallBack", $0M, $m);
        };
        this.commandPostBack = function($0M, $m) {
            this.$6H("PostBack", $0M, $m);
        };
        this.$6H = function($0w, $0M, $m) {
            var $0s = {};
            $0s.command = $0M;
            this.$68($0w, "Command", $0s, $m);
        };
        this.$5Y = function($0y, $0R, $m) {
            var $0S = {};
            $0S.action = $0y;
            $0S.type = "PostBack";
            $0S.parameters = $0R;
            $0S.data = $m;
            $0S.header = this.$6I();
            var $0T = "JSON" + DayPilot.JSON.stringify($0S);
            __doPostBack($e.uniqueID, $0T);
        };
        this.$5Z = function($0y, $0R, $m, $0w) {
            if (this.callbackTimeout) {
                window.clearTimeout(this.callbackTimeout);
            };
            if (typeof $0w === 'undefined') {
                $0w = "CallBack";
            };
            this.$6J();
            this.callbackTimeout = window.setTimeout(function() {
                $e.$6K();
            }, 100);
            var $0S = {};
            $0S.action = $0y;
            $0S.type = $0w;
            $0S.parameters = $0R;
            $0S.data = $m;
            $0S.header = this.$6I();
            var $0U = DayPilot.JSON.stringify($0S);
            var $0T;
            if (typeof Iuppiter !== 'undefined' && Iuppiter.compress) {
                $0T = "LZJB" + Iuppiter.Base64.encode(Iuppiter.compress($0U));
            } else {
                $0T = "JSON" + $0U;
            };
            var $g = null;
            if (this.backendUrl) {
                DayPilot.request(this.backendUrl, this.$6L, $0T, this.$6M);
            } else if (typeof WebForm_DoCallback === 'function') {
                WebForm_DoCallback(this.uniqueID, $0T, this.$52, $g, this.callbackError, true);
            }
        };
        this.$5L = function() {
            if (this.backendUrl) {
                return true;
            };
            if (typeof WebForm_DoCallback === 'function' && this.uniqueID) {
                return true;
            };
            return false;
        };
        this.$6M = function($0V) {
            if (typeof $e.onAjaxError === 'function') {
                var $q = {};
                $q.request = $0V;
                $e.onAjaxError($q);
            } else if (typeof $e.ajaxError === 'function') {
                $e.ajaxError($0V);
            }
        };
        this.$6L = function($0W) {
            $e.$52($0W.responseText);
        };
        this.$6I = function() {
            var h = {};
            h.v = this.v;
            h.control = "dps";
            h.id = this.id;
            h.startDate = $e.startDate;
            h.days = $e.days;
            h.cellDuration = $e.cellDuration;
            h.cellGroupBy = $e.cellGroupBy;
            h.cellWidth = $e.cellWidth;
            h.cellWidthSpec = $e.cellWidthSpec;
            h.viewType = $e.viewType;
            h.hourNameBackColor = $e.hourNameBackColor;
            h.showNonBusiness = $e.showNonBusiness;
            h.businessBeginsHour = $e.businessBeginsHour;
            h.businessEndsHour = $e.businessEndsHour;
            h.weekStarts = $e.weekStarts;
            h.treeEnabled = $e.treeEnabled;
            h.backColor = $e.cellBackColor;
            h.nonBusinessBackColor = $e.cellBackColorNonBusiness;
            h.locale = $e.locale;
            h.timeZone = $e.timeZone;
            h.tagFields = $e.tagFields;
            h.timeHeaders = $e.timeHeaders;
            h.cssOnly = $e.cssOnly;
            h.cssClassPrefix = $e.cssClassPrefix;
            h.durationBarMode = $e.durationBarMode;
            h.showBaseTimeHeader = $e.showBaseTimeHeader;
            h.rowHeaderColumns = $e.rowHeaderColumns;
            h.scale = $e.scale;
            h.clientState = $e.clientState;
            if (this.nav.scroll) {
                h.scrollX = this.nav.scroll.scrollLeft;
                h.scrollY = this.nav.scroll.scrollTop;
            };
            h.selected = $e.multiselect.events();
            h.hashes = $e.hashes;
            var $u = $e.$6N(h.scrollX, h.scrollY);
            var $0P = $e.$6O($u);
            var $0X = $e.$6P($u);
            h.rangeStart = $0P.start;
            h.rangeEnd = $0P.end;
            h.resources = $0X;
            h.dynamicLoading = $e.dynamicLoading;
            if (this.syncResourceTree) {
                h.tree = this.$6Q();
            };
            return h;
        };
        this.getViewPort = function() {
            var scrollX = this.nav.scroll.scrollLeft;
            var scrollY = this.nav.scroll.scrollTop;
            var $u = this.$6N(scrollX, scrollY);
            var $0P = this.$6O($u);
            var $0Y = this.$6P($u);
            var $f = {};
            $f.start = $0P.start;
            $f.end = $0P.end;
            $f.resources = $0Y;
            return $f;
        };
        this.$6N = function(scrollX, scrollY) {
            var $u = {};
            $u.start = {};
            $u.end = {};
            $u.start.x = Math.floor(scrollX / $e.cellWidth);
            $u.end.x = Math.floor((scrollX + $e.nav.scroll.clientWidth) / $e.cellWidth);
            $u.start.y = $e.$6R(scrollY).i;
            $u.end.y = $e.$6R(scrollY + $e.nav.scroll.clientHeight).i;
            var $0Z = this.itline.length;
            if ($u.end.x >= $0Z) {
                $u.end.x = $0Z - 1;
            };
            return $u;
        };
        this.$6O = function($u) {
            var $f = {};
            if (this.itline.length <= 0) {
                $f.start = this.startDate;
                $f.end = this.startDate;
                return $f;
            };
            if (!this.itline[$u.start.x]) {
                throw 'Internal error: area.start.x is null.';
            };
            $f.start = this.itline[$u.start.x].start;
            $f.end = this.itline[$u.end.x].end;
            return $f;
        };
        this.$6P = function($u) {
            if (!$u) {
                var $u = this.$6N(this.nav.scroll.scrollLeft, this.nav.scroll.scrollTop);
            };
            var $0X = [];
            $0X.ignoreToJSON = true;
            for (var i = $u.start.y; i <= $u.end.y; i++) {
                var r = $e.rows[i];
                if (r && !r.Hidden) {
                    $0X.push(r.Value);
                }
            };
            return $0X;
        };
        this.$6Q = function() {
            var $10 = [];
            $10.ignoreToJSON = true;
            for (var i = 0; i < this.rows.length; i++) {
                if (this.rows[i].Level > 0) {
                    continue;
                };
                var $11 = this.$6S(i);
                $10.push($11);
            };
            return $10;
        };
        this.$6T = function($12) {
            var $13 = [];
            $13.ignoreToJSON = true;
            for (var i = 0; i < $12.length; i++) {
                $13.push(this.$6S($12[i]));
            };
            return $13;
        };
        this.$6S = function(i) {
            var $t = this.rows[i];
            var $11 = {};
            $11.Value = $t.Value;
            $11.BackColor = $t.BackColor;
            $11.Name = $t.Name;
            $11.InnerHTML = $t.InnerHTML;
            $11.ToolTip = $t.ToolTip;
            $11.Expanded = $t.Expanded;
            $11.Children = this.$6T($t.Children);
            $11.Loaded = $t.Loaded;
            $11.IsParent = $t.IsParent;
            $11.Columns = this.$6U($t);
            if ($t.MinHeight !== $e.rowMinHeight) {
                $11.MinHeight = $t.MinHeight;
            };
            if ($t.MarginBottom !== $e.rowMarginBottom) {
                $11.MarginBottom = $t.MarginBottom;
            };
            return $11;
        };
        this.$6U = function($t) {
            if (!$t.Columns || $t.Columns.length === 0) {
                return null;
            };
            var $14 = [];
            $14.ignoreToJSON = true;
            for (var i = 0; i < $t.Columns.length; i++) {
                var c = {};
                c.InnerHTML = $t.Columns[i].html;
                $14.push(c);
            };
            return $14;
        };
        this.$5D = function($15) {
            var $16 = this.theme || this.cssClassPrefix;
            if ($16) {
                return $16 + $15;
            } else {
                return "";
            }
        };
        this.$6V = function() {
            var $17 = document.getElementById(id);
            $17.dispose = this.dispose;
        };
        this.dispose = function() {
            var c = $e;
            if (!c.nav.top) {
                return;
            };
            c.$6J();
            c.$5i();
            c.divBreaks = null;
            c.divCells = null;
            c.divCorner = null;
            c.divCrosshair = null;
            c.divEvents = null;
            c.divHeader = null;
            c.divLines = null;
            c.divNorth = null;
            c.divRange = null;
            c.divResScroll = null;
            c.divSeparators = null;
            c.divSeparatorsAbove = null;
            c.divStretch = null;
            c.divTimeScroll = null;
            c.scrollRes = null;
            c.vsph = null;
            c.maind = null;
            c.nav.loading = null;
            c.nav.top.onmousemove = null;
            c.nav.top.dispose = null;
            c.nav.top.ontouchstart = null;
            c.nav.top.ontouchmove = null;
            c.nav.top.ontouchend = null;
            c.nav.top.removeAttribute('style');
            c.nav.top.removeAttribute('class');
            c.nav.top.innerHTML = "";
            c.nav.top.dp = null;
            c.nav.top = null;
            c.nav.scroll.onscroll = null;
            c.nav.scroll.root = null;
            c.nav.scroll = null;
            DayPilot.ue(window, 'resize', c.$6W);
            DayPilotScheduler.unregister(c);
        };
        this.$6X = function($18, $0w) {
            var $19 = $e.maind;
            var $1a = $e.$6Y($18);
            var event = $18.event;
            var $P = event.part.height || $e.$6Z.eventHeight();
            var top = (event.part && event.part.top) ? (event.part.top + $e.rows[event.part.dayIndex].Top) : $1a.top;
            var $1b = document.createElement('div');
            $1b.setAttribute('unselectable', 'on');
            $1b.style.position = 'absolute';
            $1b.style.width = ($1a.width) + 'px';
            $1b.style.height = $P + 'px';
            $1b.style.left = $1a.left + 'px';
            $1b.style.top = top + 'px';
            $1b.style.zIndex = 101;
            $1b.style.overflow = 'hidden';
            var $E = document.createElement("div");
            $1b.appendChild($E);
            if (this.cssOnly) {
                $1b.className = this.$5D("_shadow");
                $E.className = this.$5D("_shadow_inner");
            };
            if (!this.cssOnly) {
                if ($0w === 'Fill') {
                    $E.style.backgroundColor = "#aaaaaa";
                    $E.style.opacity = 0.5;
                    $E.style.filter = "alpha(opacity=50)";
                    $E.style.height = "100%";
                    if ($18 && $18.event && $18.style) {
                        $E.style.fontSize = $18.style.fontSize;
                        $E.style.fontFamily = $18.style.fontFamily;
                        $E.style.color = $18.style.color;
                        $E.innerHTML = $18.event.client.innerHTML();
                    }
                } else {
                    $1b.style.paddingTop = "2px";
                    $E.style.border = '2px dotted #666666';
                }
            };
            $19.appendChild($1b);
            $1b.calendar = $e;
            return $1b;
        };
        this.$6R = function(y) {
            var $f = {};
            var element;
            var top = 0;
            var $1c = 0;
            var $1d = this.rows.length;
            for (var i = 0; i < $1d; i++) {
                var $t = this.rows[i];
                if ($t.Hidden) {
                    continue;
                };
                $1c += $t.Height;
                if (y < $1c || i === $1d - 1) {
                    top = $1c - $t.Height;
                    element = $t;
                    break;
                }
            };
            $f.top = top;
            $f.bottom = $1c;
            $f.i = i;
            $f.element = element;
            return $f;
        };
        this.$70 = function(i) {
            var top = 0;
            var $M = 0;
            var $1e = 0;
            if (i > this.rows.length - 1) {
                throw "Row index too high (DayPilotScheduler._getRowByIndex)";
            };
            for (var j = 0; j <= i; j++) {
                var $t = this.rows[j];
                if ($t.Hidden) {
                    continue;
                };
                $M += $t.Height;
                $1e++;
            };
            top = $M - $t.Height;
            var $f = {};
            $f.top = top;
            $f.height = $t.Height;
            $f.bottom = $M;
            $f.i = $1e - 1;
            return $f;
        };
        this.$71 = function() {
            if (this.backendUrl || typeof WebForm_DoCallback === 'function') {
                return (typeof $e.events.list === 'undefined') || (!$e.events.list);
            } else {
                return false;
            }
        };
        this.events.find = function(id) {
            var $1f = $e.events.list.length;
            for (var i = 0; i < $1f; i++) {
                if ($e.events.list[i].id === id) {
                    return new DayPilot.Event($e.events.list[i], $e);
                }
            };
            return null;
        };
        this.events.findRecurrent = function($1g, $0k) {
            var $1f = $e.events.list.length;
            for (var i = 0; i < $1f; i++) {
                if ($e.events.list[i].recurrentMasterId === $1g && $e.events.list[i].start.getTime() === $0k.getTime()) {
                    return new DayPilot.Event($e.events.list[i], $e);
                }
            };
            return null;
        };
        this.events.$6b = function($m) {
            var $0A = [];
            for (var i = 0; i < $e.rows.length; i++) {
                var $t = $e.rows[i];
                for (var r = 0; r < $t.events.length; r++) {
                    if ($t.events[r].data === $m) {
                        $0A.push(i);
                        $t.events.splice(r, 1);
                        break;
                    }
                }
            };
            return $0A;
        };
        this.events.$6c = function($m) {
            var $0A = [];
            for (var i = 0; i < $e.rows.length; i++) {
                var $t = $e.rows[i];
                var ep = $e.$72($m, $t);
                if (ep) {
                    var $1e = DayPilot.indexOf($e.events.list, ep.data);
                    $e.$73($1e);
                    if (typeof $e.onBeforeEventRender === 'function') {
                        ep.cache = $e.$51.events[$1e];
                    };
                    $0A.push(i);
                }
            };
            return $0A;
        };
        this.events.update = function(e, $m) {
            var $0s = {};
            $0s.oldEvent = new DayPilot.Event(e.copy(), $e);
            $0s.newEvent = new DayPilot.Event(e.temp(), $e);
            var $0y = new DayPilot.Action($e, "EventUpdate", $0s, $m);
            var $0A = $e.events.$6b(e.data);
            e.commit();
            $0A = $0A.concat($e.events.$6c(e.data));
            $e.$6d($0A);
            $e.$6e();
            $e.$5n($0A);
            $e.$5g();
            return $0y;
        };
        this.events.remove = function(e, $m) {
            var $0s = {};
            $0s.e = new DayPilot.Event(e.data, $e);
            var $0y = new DayPilot.Action($e, "EventRemove", $0s, $m);
            var $1e = DayPilot.indexOf($e.events.list, e.data);
            $e.events.list.splice($1e, 1);
            var $0A = $e.events.$6b(e.data);
            $e.$6d($0A);
            $e.$6e();
            $e.$5n($0A);
            return $0y;
        };
        this.events.add = function(e, $m) {
            e.calendar = $e;
            if (!$e.events.list) {
                $e.events.list = [];
            };
            $e.events.list.push(e.data);
            var $0s = {};
            $0s.e = e;
            var $0y = new DayPilot.Action($e, "EventAdd", $0s, $m);
            var ri = DayPilot.indexOf($e.rows, $e.$5u(e.resource()));
            var $t = $e.rows[ri];
            var $0A = $e.events.$6c(e.data);
            $e.$6d($0A);
            $e.$6e();
            $e.$5n($0A);
            if ($e.viewType === "Gantt" && $e.initialized) {
                $e.update();
            };
            return $0y;
        };
        this.queue = {};
        this.queue.list = [];
        this.queue.list.ignoreToJSON = true;
        this.queue.add = function($0y) {
            if (!$0y) {
                return;
            };
            if ($0y.isAction) {
                $e.queue.list.push($0y);
            } else {
                throw "DayPilot.Action object required for queue.add()";
            }
        };
        this.queue.notify = function($m) {
            var $0s = {};
            $0s.actions = $e.queue.list;
            $e.$5Z('Notify', $0s, $m, "Notify");
            $e.queue.list = [];
        };
        this.queue.clear = function() {
            $e.queue.list = [];
        };
        this.queue.pop = function() {
            return $e.queue.list.pop();
        };
        this.cells.find = function($v, $0O) {
            var $s = $e.getPixels(new DayPilot.Date($v));
            if (!$s) {
                return $1h();
            };
            var x = $s.i;
            var $t = $e.$5u($0O);
            if (!$t) {
                return $1h();
            };
            var top = $t.Top;
            var y = $e.$6R(top).i;
            return this.findXy(x, y);
        };
        this.cells.findByPixels = function(x, y) {
            var $0i = $e.$5T(x);
            if (!$0i) {
                return $1h();
            };
            var x = $0i.x;
            var $t = $e.$6R(y);
            if (!$t) {
                return $1h();
            };
            var y = $t.i;
            return this.findXy(x, y);
        };
        this.cells.all = function() {
            var $0D = [];
            var $0Z = $e.itline.length;
            var $1i = $e.rows.length;
            for (var x = 0; x < $0Z; x++) {
                for (var y = 0; y < $1i; y++) {
                    var $z = $e.cells.findXy(x, y);
                    $0D.push($z[0]);
                }
            };
            return $1h($0D);
        };
        this.cells.findXy = function(x, y) {
            if (x === null || y === null) {
                return $1h();
            };
            var $0i = $e.itline[x];
            var $z = {};
            $z.x = x;
            $z.y = y;
            $z.i = x + "_" + y;
            $z.resource = $e.rows[y].Value;
            $z.start = $0i.start;
            $z.end = $0i.end;
            $z.update = function() {
                if (!$e.rows[$z.y].Hidden) {
                    var $u = $e.$5x();
                    if ($u.xStart <= $z.x && $z.x <= $u.xEnd) {
                        if ($u.yStart <= $z.y && $z.y <= $u.yEnd) {
                            var $0z = $e.$51.cells[$z.i];
                            $e.$74($0z);
                            $e.$75($z.x, $z.y);
                        }
                    }
                }
            };
            $z.div = $e.$51.cells[$z.i];
            if (!$e.cellProperties) {
                $e.cellProperties = [];
            };
            if ($e.cellProperties) {
                var p = $e.$76(x, y);
                if (!p) {
                    p = {};
                    $e.cellProperties[$z.i] = p;
                };
                $z.properties = p;
            };
            return $1h($z);
        };
        var $1h = function(a) {
            var $0D = [];
            if (DayPilot.isArray(a)) {
                for (var i = 0; i < a.length; i++) {
                    $0D.push(a[i]);
                }
            } else if (typeof a === 'object') {
                $0D.push(a);
            };
            $0D.cssClass = function($1j) {
                this.each(function($1k) {
                    $1k.properties.cssClass = DayPilot.Util.addClassToString($1k.properties.cssClass, $1j);
                    $1k.update();
                });
                return this;
            };
            $0D.removeClass = function($1j) {
                this.each(function($1k) {
                    $1k.properties.cssClass = DayPilot.Util.removeClassFromString($1k.properties.cssClass, $1j);
                    $1k.update();
                });
                return this;
            };
            $0D.addClass = $0D.cssClass;
            $0D.html = function($H) {
                this.each(function($1k) {
                    $1k.properties.html = $H;
                    $1k.update();
                });
                return this;
            };
            $0D.each = function(f) {
                if (!f) {
                    return;
                };
                for (var i = 0; i < this.length; i++) {
                    f($0D[i]);
                }
            };
            return $0D;
        };
        this.$77 = function($1l, $1m) {
            if (!this.debuggingEnabled) {
                return;
            };
            if (!$e.debugMessages) {
                $e.debugMessages = [];
            };
            $e.debugMessages.push($1l);
        };
        this.showDebugMessages = function() {
            alert("Log:\n" + $e.debugMessages.join("\n"));
        };
        this.debug = new DayPilot.Debug(this);
        this.$78 = function($r) {
            if ($r.ticks === this.startDate.ticks) {
                return $r;
            };
            var $1n = this.startDate;
            if ($r.ticks < this.startDate.ticks) {
                var $1o = this.itline[0].end.ticks - this.itline[0].start.ticks;
                while ($1n.ticks > $r.ticks) {
                    $1n = $1n.addTime(-$1o);
                };
                return $1n;
            };
            $1n = $r;
            var $z = null;
            while ($z === null) {
                $z = this.$5V($1n);
                $1n = $1n.addMinutes(1);
            };
            return $z.start;
        };
        this.$6Y = function($18) {
            var $t = this.$6R($e.coords.y);
            var e = $18.event;
            if (typeof e.end !== 'function') {
                alert("e.end function is not defined");
            };
            if (!e.end()) {
                alert("e.end() returns null");
            };
            var $0l = DayPilot.Date.diff(e.end().d, e.start().d);
            var $1p = $04.useBox($0l);
            var $1q = e.start().getDatePart();
            var $1r = 0;
            var x = $e.coords.x;
            if ($e.scale === "Manual") {
                var $1s = (function() {
                    var end = $e.getDate($e.coords.x, true, true);
                    var $v = end.addTime(-$0l);
                    var $1t = $e.getPixels($v).boxLeft;
                    var $1u = $e.getPixels(end).boxRight;
                    var end = Math.min($1u, $e.coords.x);
                    return end - $1t;
                })();
                var $0e = Math.min(DayPilotScheduler.moveOffsetX, $1s);
                x = $e.coords.x - $0e;
            };
            if ($1p) {
                var $1v = !!$e.$5V(e.start());
                $1r = e.start().getTime() - this.$78(e.start()).getTime();
                if ($1v) {
                    $1r = (function($1w, $0e) {
                        var $1x = $e.$79($e.$5V($1w));
                        var $1y = $e.$79($e.$5T(x).cell);
                        if ($1x > $1y * 1.2) {
                            var $1z = $0e > 0 ? 1 : -1;
                            var $0e = Math.abs($0e);
                            while ($0e >= $1y) {
                                $0e -= $1y;
                            };
                            $0e *= $1z;
                        };
                        return $0e;
                    })(e.start(), $1r);
                }
            };
            var $1A = 0;
            if (DayPilotScheduler.moveDragStart && $e.scale !== "Manual") {
                if ($1p) {
                    $1A = DayPilotScheduler.moveDragStart.getTime() - this.$78(e.start()).getTime();
                    var $1B = $e.cellDuration * 60 * 1000;
                    $1A = Math.floor($1A / $1B) * $1B;
                } else {
                    $1A = DayPilotScheduler.moveDragStart.getTime() - e.start().getTime();
                }
            } else {
                $1A = 0;
            };
            if (this.eventMoveToPosition) {
                $1A = 0;
            };
            var $v = this.getDate(x, true).addTime(-$1A);
            if (DayPilotScheduler.resizing) {
                $v = e.start();
            };
            if (this.snapToGrid) {
                $v = this.$78($v);
            };
            $v = $v.addTime($1r);
            var end = $v.addTime($0l);
            var $1C = $v;
            var $1D = end;
            if (this.viewType === 'Days') {
                var $1E = this.rows[e.part.dayIndex].Start.getTime() - this.startDate.getTime();
                var $1C = $v.addTime(-$1E);
                var $1D = $1C.addTime($0l);
                var $1F = $t.element.Start.getTime() - this.startDate.getTime();
                $v = $1C.addTime($1F);
                end = $v.addTime($0l);
            };
            var $1G = this.getPixels($1C);
            var $1H = this.getPixels($1D);
            var $x = ($1p) ? $1G.boxLeft : $1G.left;
            var $X = ($1p) ? ($1H.boxRight - $x) : ($1H.left - $x);
            var $1a = {};
            $1a.top = $t.top;
            $1a.left = $x;
            $1a.row = $t.element;
            $1a.rowIndex = $t.i;
            $1a.width = $X;
            $1a.start = $v;
            $1a.end = end;
            $1a.relativeY = $e.coords.y - $t.top;
            return $1a;
        };
        this.$79 = function($0i) {
            return $0i.end.ticks - $0i.start.ticks;
        };
        this.$7a = function(y) {
            return this.treePreventParentUsage && this.$7b(y);
        };
        this.$7b = function(y) {
            var $t = this.rows[y];
            if ($t.IsParent) {
                return true;
            };
            if (this.treeEnabled) {
                if ($t.Children && $t.Children.length > 0) {
                    return true;
                }
            };
            return false;
        };
        this.$7c = {};
        this.$7d = function() {
            var $1a = this.$6Y(DayPilotScheduler.moving);
            var y = $1a.rowIndex;
            var $1I = this.$7b(y);
            var $1J = this.$7c;
            if ($1J.timeout && $1J.y !== y) {
                clearTimeout($1J.timeout);
                $1J.timeout = null;
            };
            if ($1I) {
                $1J.y = y;
                if (!$1J.timeout) {
                    $1J.timeout = setTimeout(function() {
                        var $1K = !$e.rows[$1J.y].Expanded;
                        if ($1K) {
                            $e.$7e($1J.y);
                            $e.$7f();
                        };
                        $1J.timeout = null;
                    }, 500);
                }
            }
        };
        this.$7f = function() {
            var scroll = this.nav.scroll;
            if (!$e.coords) {
                return;
            };
            var $1b = DayPilotScheduler.movingShadow;
            var $1a = this.$6Y(DayPilotScheduler.moving);
            var ev = DayPilotScheduler.moving.event;
            var $1L = 0;
            (function() {
                var y = $1a.relativeY;
                var $t = $1a.row;
                var $1M = $t.lines.length;
                var top = 0;
                var lh = $e.$6Z.eventHeight();
                var $1N = $t.lines.length;
                for (var i = 0; i < $t.lines.length; i++) {
                    var $03 = $t.lines[i];
                    if ($03.isFree($1a.left, $e.cellWidth)) {
                        $1N = i;
                        break;
                    }
                };
                var $0j = Math.floor((y - top + lh / 2) / lh);
                var $0j = Math.min($1N, $0j);
                var $0j = Math.max(0, $0j);
                $1L = $0j;
            })();
            var $1O = (ev.cache && typeof ev.cache.moveVDisabled !== 'undefined') ? !ev.cache.moveVDisabled : !ev.data.moveVDisabled;
            var $1P = (ev.cache && typeof ev.cache.moveHDisabled !== 'undefined') ? !ev.cache.moveHDisabled : !ev.data.moveHDisabled;
            var $1Q = $1L * $e.$6Z.eventHeight();
            if ($1Q > 0) {
                $1Q -= 3;
            };
            if ($1O) {
                if (!this.$7a($1a.rowIndex)) {
                    $1b.row = $1a.row;
                    $1b.style.height = Math.max($1a.row.Height, 0) + 'px';
                    $1b.style.top = ($1a.top) + 'px';
                    if ($e.eventMoveToPosition) {
                        $1b.style.top = ($1a.top + $1Q) + "px";
                        $1b.style.height = "3px";
                        $1b.line = $1L;
                    }
                } else {
                    var $1R = $1b.row;
                    var $1S = $1a.rowIndex < $1R.Index ? 1 : -1;
                    for (var i = $1a.rowIndex; i !== $1R.Index; i += $1S) {
                        var $t = this.rows[i];
                        if (!this.$7a(i) && !$t.Hidden) {
                            $1b.style.top = ($t.Top) + 'px';
                            $1b.style.height = Math.max($t.Height, 0) + 'px';
                            $1b.row = $t;
                            if ($e.eventMoveToPosition) {
                                $1L = $1S > 0 ? 0 : $t.lines.length - 1;
                                $1b.style.top = ($1a.top + $1Q) + "px";
                                $1b.style.height = "3px";
                                $1b.line = $1L;
                            };
                            break;
                        }
                    }
                }
            } else {
                var $1R = this.rows[this.$6R(parseInt($1b.style.top)).i];
                var $1N = $1R.lines.length;
                for (var i = 0; i < $1R.lines.length; i++) {
                    var $03 = $1R.lines[i];
                    if ($03.isFree($1a.left, $e.cellWidth)) {
                        $1N = i;
                        break;
                    }
                };
                $1b.style.height = Math.max($1R.Height, 0) + 'px';
                $1b.style.top = ($1R.Top) + 'px';
                $1b.row = $1R;
                if ($e.eventMoveToPosition) {
                    if ($1a.row === $1R) {
                        $1b.style.top = ($1R.Top + $1Q) + "px";
                        $1b.style.height = "3px";
                        $1b.line = $1L;
                    } else {
                        var $0j = ($1a.rowIndex > $1R.Index && $1N > 0) ? $1N * $e.$6Z.eventHeight() - 3 : 0;
                        $1b.style.top = ($1R.Top + $0j) + "px";
                        $1b.style.height = "3px";
                        $1b.line = 0;
                    }
                }
            };
            if ($1P) {
                $1b.style.left = $1a.left + 'px';
                if ($e.eventMoveToPosition) {
                    $1b.style.width = ($e.cellWidth) + 'px';
                } else {
                    $1b.style.width = ($1a.width) + 'px';
                };
                $1b.start = $1a.start;
                $1b.end = $1a.end;
            } else {
                $1b.start = ev.start();
                $1b.end = ev.end();
            }
        };
        this.$7g = function() {
            if (this.rowHeaderColumns) {
                this.rowHeaderCols = DayPilot.Util.propArray(this.rowHeaderColumns, "width");
            }
        };
        this.$5G = function() {
            var $1T = 0;
            this.$7g();
            if (this.rowHeaderCols) {
                for (var i = 0; i < this.rowHeaderCols.length; i++) {
                    $1T += this.rowHeaderCols[i];
                }
            } else {
                $1T = this.rowHeaderWidth;
            };
            return $1T;
        };
        this.$7h = function() {
            if (!this.$7i()) {
                return;
            };
            var $1U = this.divHeader;
            var $1N = [];
            for (var i = 0; i < $1U.rows.length; i++) {
                for (var j = 0; j < $1U.rows[i].cells.length; j++) {
                    var $E = $1U.rows[i].cells[j].firstChild.firstChild;
                    if (!$E || !$E.style) {
                        continue;
                    };
                    var $1V = $E.style.width;
                    var $1W = $E.style.right;
                    $E.style.position = "absolute";
                    $E.style.width = "auto";
                    $E.style.right = "auto";
                    $E.style.whiteSpace = "nowrap";
                    var w = $E.offsetWidth + 2;
                    $E.style.position = "";
                    $E.style.width = $1V;
                    $E.style.right = $1W;
                    $E.style.whiteSpace = "";
                    if (typeof $1N[j] === 'undefined') {
                        $1N[j] = 0;
                    };
                    $1N[j] = Math.max($1N[j], w);
                }
            };
            var $1X = 0;
            var $1Y = false;
            this.$7g();
            if (this.rowHeaderCols) {
                for (var i = 0; i < $1N.length; i++) {
                    if (this.rowHeaderCols[i]) {
                        if ($1N[i] > this.rowHeaderCols[i]) {
                            this.rowHeaderCols[i] = $1N[i];
                            $1Y = true;
                        };
                        $1X += this.rowHeaderCols[i];
                    }
                }
            } else {
                if (this.rowHeaderWidth < $1N[0]) {
                    $1X = $1N[0];
                    $1Y = true;
                }
            };
            if ($1Y) {
                if (this.$7j) {
                    this.$7j.widths = this.rowHeaderCols;
                    this.$7j.updateWidths();
                    DayPilot.Util.updatePropsFromArray(this.rowHeaderColumns, "width", this.rowHeaderCols);
                };
                this.rowHeaderWidth = $1X;
                this.$7k();
                this.$7l();
            }
        };
        this.$5a = function() {
            var parent = this.divResScroll;
            DayPilot.puc(parent);
            parent.innerHTML = '';
            this.$7g();
            var $1Z = this.rowHeaderCols;
            var $14 = $1Z ? this.rowHeaderCols.length : 0;
            var $1T = this.$5G();
            var $1U = document.createElement("table");
            $1U.style.borderCollapse = "collapse";
            $1U.style.KhtmlUserSelect = "none";
            $1U.style.MozUserSelect = "none";
            $1U.style.webkitUserSelect = "none";
            $1U.style.width = $1T + "px";
            $1U.style.border = "0px none";
            $1U.cellSpacing = 0;
            $1U.cellPadding = 0;
            $1U.onmousemove = function() {
                $e.$7m();
                $e.$7n();
            };
            if (!this.cssOnly) {
                $1U.className = this.$5D("resourceheader");
            };
            this.divHeader = $1U;
            var m = this.rows.length;
            for (var i = 0; i < m; i++) {
                var $t = this.rows[i];
                if ($t.Hidden) {
                    continue;
                };
                var r = $1U.insertRow(-1);
                var c = r.insertCell(-1);
                c.row = $t;
                c.index = i;
                var $X = $1Z ? $1Z[0] : this.rowHeaderWidth;
                c.style.width = ($X) + "px";
                c.style.border = "0px none";
                if (!this.cssOnly) {
                    c.style.borderRight = "1px solid " + this.borderColor;
                    c.style.backgroundColor = typeof $t.BackColor === 'undefined' ? $e.hourNameBackColor : $t.BackColor;
                    c.style.fontFamily = this.headerFontFamily;
                    c.style.fontSize = this.headerFontSize;
                    c.style.color = this.headerFontColor;
                    c.style.cursor = 'default';
                    c.style.padding = '0px';
                };
                if ($t.ToolTip) {
                    c.title = $t.ToolTip;
                };
                c.setAttribute("unselectable", "on");
                c.setAttribute('resource', $t.Value);
                c.onmousemove = $e.$7o;
                c.onmouseout = $e.$7p;
                c.oncontextmenu = $e.$7q;
                c.onclick = $e.$7r;
                var $B = document.createElement("div");
                $B.style.width = ($X) + "px";
                $B.setAttribute("unselectable", "on");
                $B.className = this.cssOnly ? this.$5D('_rowheader') : this.$5D('rowheader');
                if ($t.CssClass) {
                    DayPilot.Util.addClass($B, $t.CssClass);
                };
                if ($t.BackColor) {
                    $B.style.background = $t.BackColor;
                };
                $B.style.height = ($t.Height) + "px";
                $B.style.overflow = 'hidden';
                $B.style.position = 'relative';
                var $E = document.createElement("div");
                $E.setAttribute("unselectable", "on");
                $E.className = this.cssOnly ? this.$5D('_rowheader_inner') : "";
                $B.appendChild($E);
                var $20 = document.createElement("div");
                $20.style.position = "absolute";
                $20.style.bottom = "0px";
                $20.style.width = "100%";
                $20.style.height = "1px";
                if (this.cssOnly) {
                    $20.className = this.$5D("_resourcedivider");
                } else {
                    $20.style.backgroundColor = this.borderColor;
                };
                $B.appendChild($20);
                if (this.treeEnabled) {
                    var $1J = document.createElement("div");
                    $1J.style.width = "10px";
                    $1J.style.height = "10px";
                    $1J.style.backgroundRepeat = "no-repeat";
                    $1J.style.position = 'absolute';
                    $1J.style.left = ($t.Level * this.treeIndent + this.treeImageMarginLeft) + 'px';
                    $1J.style.top = this.treeImageMarginTop + "px";
                    if (!$t.Loaded && $t.Children.length === 0) {
                        if (this.treeImageExpand && !this.cssOnly) {
                            $1J.style.backgroundImage = "url('" + this.treeImageExpand + "')";
                        };
                        $1J.className = this.cssOnly ? this.$5D('_tree_image_expand') : this.$5D('tree_image_expand');
                        $1J.style.cursor = 'pointer';
                        $1J.index = i;
                        $1J.onclick = function(ev) {
                            $e.$7s(this.index);
                            ev = ev || window.event;
                            ev.cancelBubble = true;
                        };
                    } else if ($t.Children.length > 0) {
                        if ($t.Expanded) {
                            if (this.treeImageCollapse && !this.cssOnly) {
                                $1J.style.backgroundImage = "url('" + this.treeImageCollapse + "')";
                            };
                            $1J.className = this.cssOnly ? this.$5D('_tree_image_collapse') : this.$5D('tree_image_collapse');
                        } else {
                            if (this.treeImageExpand && !this.cssOnly) {
                                $1J.style.backgroundImage = "url('" + this.treeImageExpand + "')";
                            };
                            $1J.className = this.cssOnly ? this.$5D('_tree_image_expand') : this.$5D('tree_image_expand');
                        };
                        $1J.style.cursor = 'pointer';
                        $1J.index = i;
                        $1J.onclick = function(ev) {
                            $e.$7e(this.index);
                            ev = ev || window.event;
                            ev.cancelBubble = true;
                        };
                    } else {
                        if (this.treeImageNoChildren && !this.cssOnly) {
                            $1J.style.backgroundImage = "url('" + this.treeImageNoChildren + "')";
                        };
                        $1J.className = this.cssOnly ? this.$5D('_tree_image_no_children') : this.$5D('tree_image_no_children');
                    };
                    $E.appendChild($1J);
                };
                var $21 = document.createElement("div");
                if (this.treeEnabled) {
                    $21.style.marginLeft = (($t.Level + 1) * this.treeIndent) + 'px';
                } else if (!this.cssOnly) {
                    $21.style.marginLeft = "4px";
                };
                $21.innerHTML = $t.InnerHTML;
                $E.appendChild($21);
                c.appendChild($B);
                if ($t.areas) {
                    for (var j = 0; j < $t.areas.length; j++) {
                        var $u = $t.areas[j];
                        if ($u.v !== 'Visible') {
                            continue;
                        };
                        var a = DayPilot.Areas.createArea($B, $t, $u);
                        $B.appendChild(a);
                    }
                };
                if (!$t.Columns || $t.Columns.length === 0) {
                    c.colSpan = $14 > 0 ? $14 : 1;
                    $B.style.width = $1T + "px";
                } else {
                    for (var j = 1; j < $14; j++) {
                        var c = r.insertCell(-1);
                        c.row = $t;
                        c.index = i;
                        if (!this.cssOnly) {
                            c.style.borderRight = "1px solid " + this.borderColor;
                            c.style.backgroundColor = $t.BackColor;
                            c.style.fontFamily = this.headerFontFamily;
                            c.style.fontSize = this.headerFontSize;
                            c.style.color = this.headerFontColor;
                            c.style.cursor = 'default';
                            c.style.padding = '0px';
                        };
                        if ($t.ToolTip) {
                            c.title = $t.ToolTip;
                        };
                        c.setAttribute("unselectable", "on");
                        if (!this.cssOnly) {
                            c.className = this.$5D('rowheader');
                        };
                        c.setAttribute('resource', $t.Value);
                        c.onmousemove = $e.$7o;
                        c.onmouseout = $e.$7p;
                        c.oncontextmenu = $e.$7q;
                        c.onclick = $e.$7r;
                        var $B = document.createElement("div");
                        var w = this.cssOnly ? $1Z[j] : $1Z[j] - 1;
                        if ($t.BackColor) {
                            $B.style.backgroundColor = $t.BackColor;
                        };
                        $B.style.width = w + "px";
                        $B.style.height = ($t.Height) + "px";
                        $B.style.overflow = 'hidden';
                        $B.style.position = 'relative';
                        $B.setAttribute("unselectable", "on");
                        if (this.cssOnly) {
                            DayPilot.Util.addClass($B, this.$5D("_rowheader"));
                            DayPilot.Util.addClass($B, this.$5D("_rowheadercol"));
                            DayPilot.Util.addClass($B, this.$5D("_rowheadercol" + j));
                        };
                        if ($t.CssClass) {
                            DayPilot.Util.addClass($B, $t.CssClass);
                        };
                        var $E = document.createElement("div");
                        $E.setAttribute("unselectable", "on");
                        if (this.cssOnly) {
                            $E.className = this.$5D("_rowheader_inner");
                        };
                        $B.appendChild($E);
                        var $20 = document.createElement("div");
                        $20.style.position = "absolute";
                        $20.style.bottom = "0px";
                        $20.style.width = ($1Z[j] - 1) + "px";
                        $20.style.height = "1px";
                        $20.className = this.$5D("_resourcedivider");
                        if (!this.cssOnly) {
                            $20.style.backgroundColor = this.borderColor;
                        };
                        $B.appendChild($20);
                        var $21 = document.createElement("div");
                        if (!this.cssOnly) {
                            $21.style.marginLeft = '4px';
                        };
                        var $22 = $t.Columns[j - 1] ? $t.Columns[j - 1].html : "";
                        $21.innerHTML = $22;
                        $E.appendChild($21);
                        c.appendChild($B);
                    }
                }
            };
            var r = $1U.insertRow(-1);
            var c = r.insertCell(-1);
            c.colSpan = $14 + 1;
            c.style.width = $1T + "px";
            c.style.height = (parent.clientHeight + 20) + "px";
            if (!this.cssOnly) {
                c.style.backgroundColor = this.hourNameBackColor;
                c.style.cursor = 'default';
            };
            c.setAttribute("unselectable", "on");
            if (!this.cssOnly) {
                c.className = this.$5D('rowheader');
                c.style.fontSize = "1px";
                c.innerHTML = "&nbsp;";
            };
            if (this.cssOnly) {
                var $B = document.createElement("div");
                $B.style.position = "relative";
                $B.style.height = "100%";
                $B.className = this.$5D('_rowheader');
                c.appendChild($B);
            };
            parent.appendChild($1U);
            if (this.rowHeaderWidthAutoFit) {
                this.$7h();
            }
        };
        this.$7q = function() {
            var $t = this.row;
            var r = {};
            r.type = 'resource';
            r.start = $t.Start;
            r.name = $t.Name;
            r.value = $t.Value;
            r.id = $t.Value;
            r.index = this.index;
            r.root = $e;
            r.toJSON = function($23) {
                var $0U = {};
                $0U.start = this.start;
                $0U.name = this.name;
                $0U.value = this.value;
                $0U.index = this.index;
                return $0U;
            };
            if ($t.contextMenu) {
                $t.contextMenu.show(r);
            };
            return false;
        };
        this.$7r = function(ev) {
            var $t = this.row;
            var r = $e.$7t($t, this.index);
            $e.$6C(r);
        };
        this.$7u = function(ev) {
            var $z = {};
            $z.start = this.cell.start;
            $z.level = this.cell.level;
            if (!$z.end) {
                $z.end = new DayPilot.Date($z.start).addMinutes($e.cellDuration);
            };
            $e.$6D($z);
        };
        this.$7t = function($t, $1e) {
            var r = {};
            r.type = 'resource';
            r.start = $t.Start;
            r.name = $t.Name;
            r.value = $t.Value;
            r.id = $t.Value;
            r.index = $1e;
            r.root = $e;
            r.toJSON = function($23) {
                var $0U = {};
                $0U.start = this.start;
                $0U.name = this.name;
                $0U.value = this.value;
                $0U.id = this.id;
                $0U.index = this.index;
                return $0U;
            };
            return r;
        };
        this.$59 = function($0B, $24) {
            var $25 = [];
            var $1m = null;
            if ($0B && $24) {
                var $26 = $0B;
                var $1m = [];
                for (var i = 0; i < $26.length; i++) {
                    var e = $26[i];
                    var $0b = false;
                    for (var j = 0; j < this.events.list.length; j++) {
                        var ex = this.events.list[j];
                        if (ex.id === e.id && ex.start.toString() === e.start.toString() && ex.resource === e.resource) {
                            this.events.list[j] = e;
                            $0b = true;
                            break;
                        }
                    };
                    if (!$0b) {
                        $1m.push(e);
                    }
                };
                this.events.list = this.events.list.concat($1m);
            } else if ($0B) {
                this.events.list = $0B;
            } else if (!this.events.list) {
                this.events.list = [];
            };
            var $0D = $1m || this.events.list;
            var $27 = $0D.length;
            if (typeof this.onBeforeEventRender === 'function') {
                var $v = $1m ? this.events.list.length - $1m.length : 0;
                var end = this.events.list.length;
                for (var i = $v; i < end; i++) {
                    this.$73(i);
                }
            };
            var $k = [];
            for (var i = 0; i < this.rows.length; i++) {
                var $t = this.rows[i];
                if (!$1m || typeof $t.events === "undefined") {
                    $t.events = [];
                };
                $t.data = {};
                $t.data.start = new DayPilot.Date($t.Start);
                $t.data.startTicks = $t.data.start.getTime();
                $t.data.end = $04.isResourcesView() ? this.$7v() : $t.data.start.addDays(1);
                $t.data.endTicks = $t.data.end.getTime();
                $t.data.offset = $t.Start.getTime() - this.$7w().getTime();
                $t.data.i = i;
                if (this.$7a(i)) {
                    continue;
                };
                for (var j = 0; $0D && j < $27; j++) {
                    if ($25[j]) {
                        continue;
                    };
                    var e = $0D[j];
                    var ep = this.$72(e, $t);
                    if (!ep) {
                        continue;
                    };
                    if (typeof this.onBeforeEventRender === 'function') {
                        ep.cache = this.$51.events[j + $v];
                    };
                    $k.push(i);
                    if (ep.data.resource !== "*" && ep.part.start.getTime() === ep.start().getTime() && ep.part.end.getTime() === ep.end().getTime()) {
                        $25[j] = true;
                    }
                }
            };
            for (var i = 0; i < this.rows.length; i++) {
                var $t = this.rows[i];
                this.$7x($t);
            };
            this.$6e();
            return DayPilot.ua($k);
        };
        this.$73 = function(i) {
            var $08 = this.$51.events;
            var $m = this.events.list[i];
            var $28 = {};
            for (var name in $m) {
                $28[name] = $m[name];
            };
            if (typeof this.onBeforeEventRender === 'function') {
                var $q = {};
                $q.e = $28;
                this.onBeforeEventRender($q);
            };
            $08[i] = $28;
        };
        this.$7x = function($t) {
            $t.lines = [];
            if (this.sortDirections) {
                $t.events.sort(this.$7y);
            } else {
                $t.events.sort(this.$7z);
            };
            for (var j = 0; j < $t.events.length; j++) {
                var e = $t.events[j];
                $t.putIntoLine(e);
            }
        };
        this.$6d = function($0A) {
            $0A = DayPilot.ua($0A);
            for (var i = 0; i < $0A.length; i++) {
                var ri = $0A[i];
                $e.$7x($e.rows[ri]);
            }
        };
        this.$72 = function(e, $t) {
            var $v = new DayPilot.Date(e.start);
            var end = new DayPilot.Date(e.end);
            var $29 = $v.getTime();
            var $2a = end.getTime();
            if ($2a < $29) {
                return null;
            };
            var $2b = false;
            switch (this.viewType) {
                case 'Days':
                    $2b = !($2a <= $t.data.startTicks || $29 >= $t.data.endTicks) || ($29 === $2a && $29 === $t.data.startTicks);
                    break;
                case 'Resources':
                    $2b = ($t.Value === e.resource || $t.Value === "*" || e.resource === "*") && (!($2a <= $t.data.startTicks || $29 >= $t.data.endTicks) || ($29 === $2a && $29 === $t.data.startTicks));
                    break;
                case 'Gantt':
                    $2b = ($t.Value === e.id) && !($2a <= $t.data.startTicks || $29 >= $t.data.endTicks);
                    break;
            };
            if (!$2b) {
                return null;
            };
            var ep = new DayPilot.Event(e, $e);
            ep.part.dayIndex = $t.data.i;
            ep.part.start = $t.data.startTicks < $29 ? ep.start() : $t.data.start;
            ep.part.end = $t.data.endTicks > $2a ? ep.end() : $t.data.end;
            var $2c = this.getPixels(ep.part.start.addTime(-$t.data.offset));
            var $2d = this.getPixels(ep.part.end.addTime(-$t.data.offset));
            var $x = $2c.left;
            var $y = $2d.left;
            if ($x === $y && ($2c.cut || $2d.cut)) {
                return null;
            };
            ep.part.box = $04.useBox($2a - $29);
            if (ep.part.box) {
                var $2e = $2c.boxLeft;
                var $2f = $2d.boxRight;
                ep.part.left = $2e;
                ep.part.width = $2f - $2e;
                ep.part.barLeft = Math.max($x - ep.part.left, 0);
                ep.part.barWidth = Math.max($y - $x, 1);
            } else {
                ep.part.left = $x;
                ep.part.width = Math.max($y - $x, 0);
                ep.part.barLeft = 0;
                ep.part.barWidth = Math.max($y - $x - 1, 1);
            };
            $t.events.push(ep);
            return ep;
        };
        this.$7z = function(a, b) {
            if (!a || !b || !a.start || !b.start) {
                return 0;
            };
            var $2g = a.start().ticks - b.start().ticks;
            if ($2g !== 0) {
                return $2g;
            };
            var $2h = b.end().ticks - a.end().ticks;
            return $2h;
        };
        this.$7y = function(a, b) {
            if (!a || !b) {
                return 0;
            };
            if (!a.data || !b.data || !a.data.sort || !b.data.sort || a.data.sort.length === 0 || b.data.sort.length === 0) {
                return $e.$7z(a, b);
            };
            var $f = 0;
            var i = 0;
            while ($f === 0 && a.data.sort[i] && b.data.sort[i]) {
                if (a.data.sort[i] === b.data.sort[i]) {
                    $f = 0;
                } else {
                    $f = $e.$7A(a.data.sort[i], b.data.sort[i], $e.sortDirections[i]);
                };
                i++;
            };
            return $f;
        };
        this.$7A = function(a, b, $2i) {
            var $2j = ($2i !== "desc");
            var $2k = $2j ? -1 : 1;
            var $2l = -$2k;
            if (a === null && b === null) {
                return 0;
            };
            if (b === null) {
                return $2l;
            };
            if (a === null) {
                return $2k;
            };
            var ar = [];
            ar[0] = a;
            ar[1] = b;
            ar.sort();
            return a === ar[0] ? $2k : $2l;
        };
        this.$57 = function() {
            this.rows = [];
            this.hasChildren = false;
            var $0Y = this.resources;
            var $2m = this.$5L();
            if (!$2m) {
                if (this.viewType === "Gantt") {
                    $0Y = this.$7B();
                } else if (this.viewType === "Days") {
                    $0Y = this.$7C();
                }
            };
            var $1e = {};
            $1e.i = 0;
            this.$7D($0Y, $1e, 0, null, this.treeEnabled, false);
        };
        this.$7B = function() {
            var $0D = [];
            if (this.ganttAppendToResources && this.resources) {
                for (var i = 0; i < this.resources.length; i++) {
                    $0D.push(this.resources[i]);
                }
            };
            if (!this.events.list) {
                return;
            };
            for (var i = 0; i < this.events.list.length; i++) {
                var e = this.events.list[i];
                var r = {};
                r.id = e.id;
                r.name = e.text;
                $0D.push(r);
            };
            return $0D;
        };
        this.$7C = function() {
            var $0D = [];
            var $2n = this.$6Z.locale();
            for (var i = 0; i < this.days; i++) {
                var d = this.startDate.addDays(i);
                var r = {};
                r.name = d.toString($2n.datePattern, $2n);
                r.start = d;
                $0D.push(r);
            };
            return $0D;
        };
        this.$7w = function() {
            if (this.itline && this.itline.length > 0) {
                return this.itline[0].start;
            };
            return this.startDate;
        };
        this.$7v = function() {
            if (this.itline && this.itline.length > 0) {
                return this.itline[this.itline.length - 1].end;
            };
            return this.startDate.addDays(this.days);
        };
        this.$7D = function($0Y, $1e, $2o, parent, $2p, $2q) {
            if (!$0Y) {
                return;
            };
            for (var i = 0; i < $0Y.length; i++) {
                if (!$0Y[i]) {
                    continue;
                };
                var $2r = {};
                $2r.level = $2o;
                $2r.hidden = $2q;
                $2r.index = $1e.i;
                var $0X = this.$7E($0Y[i], $2r);
                var $t = {};
                $t.BackColor = $0X.backColor;
                $t.CssClass = $0X.cssClass;
                $t.Expanded = $0X.expanded;
                $t.Name = $0X.name;
                $t.InnerHTML = $0X.html ? $0X.html : $t.Name;
                $t.MinHeight = typeof $0X.minHeight !== 'undefined' ? $0X.minHeight : $e.rowMinHeight;
                $t.MarginBottom = typeof $0X.marginBottom !== 'undefined' ? $0X.marginBottom : $e.rowMarginBottom;
                $t.Loaded = !$0X.dynamicChildren;
                $t.Value = $0X.id || $0X.value;
                $t.ToolTip = $0X.toolTip;
                $t.Children = [];
                $t.Columns = [];
                $t.Start = $0X.start ? new DayPilot.Date($0X.start) : this.$7w();
                $t.IsParent = $0X.isParent;
                $t.contextMenu = $0X.contextMenu ? eval($0X.contextMenu) : this.contextMenuResource;
                $t.areas = $0X.areas;
                $t.Height = this.$6Z.eventHeight();
                $t.Hidden = $2q;
                $t.Level = $2o;
                $t.Index = $1e.i;
                $t.Resource = $0Y[i];
                $t.lines = [];
                $t.isRow = true;
                $t.height = function() {
                    var $2s = Math.max(1, this.lines.length);
                    var $2t = $e.durationBarDetached ? ($e.$6Z.eventHeight() + 10) : $e.$6Z.eventHeight();
                    var $P = $2s * $2t + this.MarginBottom;
                    return ($P > this.MinHeight) ? $P : this.MinHeight;
                };
                $t.putIntoLine = function(ep) {
                    var $2u = this;
                    for (var i = 0; i < this.lines.length; i++) {
                        var $03 = this.lines[i];
                        if ($03.isFree(ep.part.left, ep.part.width)) {
                            $03.push(ep);
                            return i;
                        }
                    };
                    var $03 = [];
                    $03.isFree = function($2v, $2w) {
                        var end = $2v + $2w - 1;
                        var $1N = this.length;
                        for (var i = 0; i < $1N; i++) {
                            var e = this[i];
                            if (!(end < e.part.left || $2v > e.part.left + e.part.width - 1)) {
                                return false;
                            }
                        };
                        return true;
                    };
                    $03.push(ep);
                    this.lines.push($03);
                    return this.lines.length - 1;
                };
                this.rows.push($t);
                if (parent !== null) {
                    parent.Children.push($1e.i);
                };
                if ($0X.columns) {
                    for (var j = 0; j < $0X.columns.length; j++) {
                        $t.Columns.push($0X.columns[j]);
                    }
                };
                $1e.i++;
                if ($2p && $0X.children && $0X.children.length) {
                    this.hasChildren = true;
                    var $2x = $2q || !$t.Expanded;
                    this.$7D($0X.children, $1e, $2o + 1, $t, true, $2x);
                }
            }
        };
        this.$7E = function($0X, $2r) {
            var r = {};
            for (var name in $0X) {
                r[name] = $0X[name];
            };
            if (typeof $0X.html === 'undefined') {
                r.html = $0X.name;
            };
            for (var name in $2r) {
                r[name] = $2r[name];
            };
            if (typeof this.onBeforeResHeaderRender === 'function') {
                var $q = {};
                $q.resource = r;
                this.onBeforeResHeaderRender($q);
            };
            return r;
        };
        this.$7F = function() {
            this.nav.top = document.getElementById(this.id);
            this.nav.top.dp = this;
            this.nav.top.innerHTML = "";
            if (!this.cssOnly) {
                this.nav.top.style.border = "1px solid " + this.borderColor;
            } else {
                DayPilot.Util.addClass(this.nav.top, this.$5D("_main"));
            };
            this.nav.top.style.MozUserSelect = 'none';
            this.nav.top.style.KhtmlUserSelect = 'none';
            this.nav.top.style.webkitUserSelect = 'none';
            if (this.width) {
                this.nav.top.style.width = this.width;
            };
            if (this.heightSpec === "Parent100Pct") {
                this.nav.top.style.height = "100%";
            };
            this.nav.top.style.lineHeight = "1.2";
            this.nav.top.style.position = "relative";
            this.nav.top.onmousemove = function(ev) {
                ev = ev || window.event;
                ev.insideMainD = true;
                if (window.event) {
                    window.event.srcElement.inside = true;
                }
            };
            this.nav.top.ontouchstart = $0m.onMainTouchStart;
            this.nav.top.ontouchmove = $0m.onMainTouchMove;
            this.nav.top.ontouchend = $0m.onMainTouchEnd;
            if (this.hideUntilInit) {
                this.nav.top.style.visibility = 'hidden';
            };
            var $2y = this.$5G();
            var $2z = this.$6Z.layout();
            if ($2z === 'DivBased') {
                var $x = document.createElement("div");
                $x.style.position = "absolute";
                $x.style.left = "0px";
                $x.style.width = ($2y) + "px";
                $x.appendChild(this.$7G());
                var $2A = document.createElement("div");
                $2A.style.height = "1px";
                $2A.className = this.$5D("_divider_horizontal");
                if (!this.cssOnly) {
                    $2A.style.backgroundColor = this.borderColor;
                };
                $x.appendChild($2A);
                this.nav.dh1 = $2A;
                $x.appendChild(this.$7H());
                this.nav.left = $x;
                var $2B = document.createElement("div");
                $2B.style.position = "absolute";
                $2B.style.left = ($2y) + "px";
                $2B.style.width = "1px";
                $2B.style.height = (this.$5F() + this.$5I()) + "px";
                $2B.className = this.$5D("_divider");
                if (!this.cssOnly) {
                    $2B.style.backgroundColor = this.borderColor;
                };
                this.nav.divider = $2B;
                var $y = document.createElement("div");
                $y.style.marginLeft = ($2y + 1) + "px";
                $y.style.marginRight = '1px';
                $y.style.position = 'relative';
                $y.appendChild(this.$7I());
                this.nav.right = $y;
                var $2C = document.createElement("div");
                $2C.style.height = "1px";
                $2C.style.position = "absolute";
                $2C.style.top = this.$5F() + "px";
                $2C.style.width = "100%";
                $2C.className = this.$5D("_divider_horizontal");
                if (!this.cssOnly) {
                    $2C.style.backgroundColor = this.borderColor;
                };
                $y.appendChild($2C);
                this.nav.dh2 = $2C;
                $y.appendChild(this.$7J());
                var $2D = document.createElement("div");
                $2D.style.clear = 'left';
                this.nav.top.appendChild($x);
                this.nav.top.appendChild($2B);
                this.nav.top.appendChild($y);
                this.nav.top.appendChild($2D);
            } else {
                var $1U = document.createElement("table");
                $1U.cellPadding = 0;
                $1U.cellSpacing = 0;
                $1U.border = 0;
                $1U.style.position = 'absolute';
                if (!this.cssOnly) {
                    $1U.style.backgroundColor = this.hourNameBackColor;
                };
                var $2E = $1U.insertRow(-1);
                var $2F = $2E.insertCell(-1);
                $2F.appendChild(this.$7G());
                var $2G = $2E.insertCell(-1);
                $2G.appendChild(this.$7I());
                var $2H = $1U.insertRow(-1);
                var $2I = $2H.insertCell(-1);
                $2I.appendChild(this.$7H());
                var $2J = $2H.insertCell(-1);
                $2J.appendChild(this.$7J());
                this.nav.top.appendChild($1U);
            };
            this.vsph = document.createElement("div");
            this.vsph.style.display = "none";
            this.nav.top.appendChild(this.vsph);
            var $2K = document.createElement("input");
            $2K.type = "hidden";
            $2K.id = this.id + "_state";
            $2K.name = this.id + "_state";
            this.nav.state = $2K;
            this.nav.top.appendChild($2K);
            var loading = document.createElement("div");
            loading.style.position = 'absolute';
            loading.style.left = (this.$5G() + 5) + "px";
            loading.style.top = (this.$5F() + 5) + "px";
            loading.style.display = 'none';
            if (!this.cssOnly) {
                loading.style.backgroundColor = this.loadingLabelBackColor;
                loading.style.fontSize = this.loadingLabelFontSize;
                loading.style.fontFamily = this.loadingLabelFontFamily;
                loading.style.color = this.loadingLabelFontColor;
                loading.style.padding = '2px';
            };
            loading.innerHTML = this.loadingLabelText;
            DayPilot.Util.addClass(loading, this.$5D("_loading"));
            this.nav.loading = loading;
            this.nav.top.appendChild(loading);
        };
        this.$5f = function() {
            var $P = this.$5F();
            this.nav.corner.style.height = ($P) + "px";
            this.divTimeScroll.style.height = $P + "px";
            this.divNorth.style.height = $P + "px";
            if (this.nav.dh1 && this.nav.dh2) {
                this.nav.dh1.style.top = $P + "px";
                this.nav.dh2.style.top = $P + "px";
            };
            this.nav.loading.style.top = ($P + 5) + "px";
            this.nav.scroll.style.top = ($P + 1) + "px";
        };
        this.$7k = function() {
            this.$7g();
            var $X = this.$5G();
            var $R = $X;
            this.nav.corner.style.width = $X + "px";
            this.divCorner.style.width = $X + "px";
            this.divResScroll.style.width = $X + "px";
            this.nav.left.style.width = ($X) + "px";
            this.nav.divider.style.left = ($X) + "px";
            this.nav.right.style.marginLeft = ($X + 1) + "px";
            if (this.nav.message) {
                this.nav.message.style.paddingLeft = $X + "px";
            };
            if (this.nav.loading) {
                this.nav.loading.style.left = ($X + 5) + "px";
            };
            var $2L = function($E, $X) {
                if (!$E || !$E.style) {
                    return;
                };
                $z.style.width = $X + "px";
                $E.style.width = $X + "px";
                var $2B = $E.lastChild;
                if ($2B) {
                    $2B.style.width = $X + "px";
                }
            };
            var $1U = this.divHeader;
            $1U.style.width = $X + "px";
            for (var i = 0; i < $1U.rows.length; i++) {
                var $z = $1U.rows[i].cells[0];
                if ($z.colSpan > 1) {
                    var $E = $1U.rows[i].cells[0].firstChild;
                    $2L($E, $R);
                } else {
                    if (this.rowHeaderCols) {
                        for (var j = 0; j < $1U.rows[i].cells.length; j++) {
                            var $X = this.rowHeaderCols[j];
                            var $E = $1U.rows[i].cells[j].firstChild;
                            $2L($E, $X);
                        }
                    } else {
                        var $X = this.rowHeaderWidth;
                        var $E = $1U.rows[i].cells[0].firstChild;
                        $2L($E, $X);
                    }
                }
            };
            this.$7m();
        };
        this.$7K = function() {
            var $B = $e.nav.corner;
            var $2M = this.rowHeaderColumns;
            var $t = document.createElement("div");
            $t.style.position = "absolute";
            $t.style.bottom = "0px";
            $t.style.left = "0px";
            $t.style.width = "5000px";
            $t.style.height = $04.headerHeight() + "px";
            $t.style.overflow = "hidden";
            $t.className = this.$5D("_columnheader");
            $B.appendChild($t);
            var $E = document.createElement("div");
            $E.style.position = "absolute";
            $E.style.top = "0px";
            $E.style.bottom = "0px";
            $E.style.left = "0px";
            $E.style.right = "0px";
            $E.className = this.$5D("_columnheader_inner");
            $t.appendChild($E);
            var $2N = new DayPilot.Splitter($E);
            $2N.widths = DayPilot.Util.propArray($2M, "width");
            $2N.height = $04.headerHeight();
            $2N.css.title = this.$5D("_columnheader_cell");
            $2N.css.titleInner = this.$5D("_columnheader_cell_inner");
            $2N.css.splitter = this.$5D("_columnheader_splitter");
            $2N.titles = DayPilot.Util.propArray($2M, "title");
            $2N.updating = function($q) {
                DayPilot.Util.updatePropsFromArray($e.rowHeaderColumns, "width", this.widths);
                $e.$7k();
            };
            $2N.color = '#000000';
            $2N.opacity = 30;
            $2N.init();
            this.$7j = $2N;
        };
        this.$6q = function() {
            var $B = this.nav.corner;
            $B.innerHTML = '';
            $B.className = this.cssOnly ? this.$5D('_corner') : this.$5D('corner');
            if (!this.cssOnly) {
                $B.style.backgroundColor = this.hourNameBackColor;
                $B.style.fontFamily = this.hourFontFamily;
                $B.style.fontSize = this.hourFontSize;
                $B.style.cursor = 'default';
            };
            var $E = document.createElement("div");
            $E.style.position = "absolute";
            $E.style.top = "0px";
            $E.style.left = "0px";
            $E.style.right = "0px";
            $E.style.bottom = "0px";
            if (this.cssOnly) {
                $E.className = this.$5D('_corner_inner');
            };
            this.divCorner = $E;
            $E.innerHTML = '&nbsp;';
            if (this.rowHeaderColumns && this.rowHeaderColumns.length > 0) {
                var $2O = document.createElement("div");
                $2O.style.position = "absolute";
                $2O.style.top = "0px";
                $2O.style.left = "0px";
                $2O.style.right = "0px";
                $2O.style.bottom = ($04.headerHeight() + 1) + "px";
                $B.appendChild($2O);
                var $2B = document.createElement("div");
                $2B.style.position = "absolute";
                $2B.style.left = "0px";
                $2B.style.right = "0px";
                $2B.style.height = "1px";
                $2B.style.bottom = ($04.headerHeight()) + "px";
                $2B.className = this.$5D("_divider");
                $B.appendChild($2B);
                $2O.appendChild($E);
                this.$7K();
            } else {
                $B.appendChild($E);
            };
            var $2P = document.createElement("div");
            $2P.style.position = 'absolute';
            $2P.style.padding = '2px';
            $2P.style.top = '0px';
            $2P.style.left = '1px';
            $2P.style.backgroundColor = "#FF6600";
            $2P.style.color = "white";
            $2P.innerHTML = "\u0044\u0045\u004D\u004F";
            if (this.numberFormat) $B.appendChild($2P);
        };
        this.$7G = function() {
            var $2y = this.$5G();
            var $B = document.createElement("div");
            $e.nav.corner = $B;
            $B.style.width = $2y + "px";
            $B.style.height = (this.$5F()) + "px";
            $B.style.overflow = 'hidden';
            $B.style.position = 'relative';
            $B.setAttribute("unselectable", "on");
            $B.onmousemove = function() {
                $e.$7m();
                $e.$7n();
            };
            $B.oncontextmenu = function() {
                return false;
            };
            this.$6q();
            return $B;
        };
        this.$5F = function() {
            if (this.timeHeader) {
                var $2Q = this.timeHeader.length;
                if (!this.showBaseTimeHeader) {
                    $2Q -= 1;
                };
                return $2Q * $04.headerHeight();
            };
            return 2 * $04.headerHeight();
        };
        this.$7H = function() {
            var $B = document.createElement("div");
            if (!this.cssOnly) {
                $B.style.backgroundColor = this.hourNameBackColor;
            };
            $B.style.width = (this.$5G()) + "px";
            $B.style.height = this.$5I() + "px";
            $B.style.overflow = 'hidden';
            $B.style.position = 'relative';
            $B.onmousemove = function() {
                $e.$7m();
                $e.$7n();
            };
            $B.oncontextmenu = function() {
                return false;
            };
            this.divResScroll = $B;
            this.scrollRes = $B;
            return $B;
        };
        this.$7L = function($B) {
            if ($04.layout() === 'TableBased') {
                var $X = parseInt(this.width, 10);
                var $2R = (this.width.indexOf("%") !== -1);
                var $2S = /MSIE/i.test(navigator.userAgent);
                var $2y = this.$5G();
                if ($2R) {
                    if (this.nav.top && this.nav.top.offsetWidth > 0) {
                        $B.style.width = (this.nav.top.offsetWidth - 6 - $2y) + "px";
                    }
                } else {
                    $B.style.width = ($X - $2y) + "px";
                }
            }
        };
        this.$6W = function() {
            if ($e.$6Z.layout() === 'TableBased') {
                $e.$7L($e.nav.scroll);
                $e.$7L($e.divTimeScroll);
            };
            $e.$5g();
            $e.$7l();
        };
        this.$7l = function() {
            if ($e.cellWidthSpec !== 'Auto') {
                return;
            };
            $e.debug.message("cell width recalc in _resize");
            $e.$55();
            $e.$56();
            $e.$5b();
            $e.$5h();
            $e.$5k();
            $e.$5j();
            $e.$5l();
            $e.$5i();
            $e.$59();
            $e.$5m();
        };
        this.$55 = function() {
            return;
            if (this.cellWidthSpec !== 'Auto') {
                return;
            };
            var $R = this.nav.top.clientWidth;
            var $2T = this.$5G();
            var $0G = $R - $2T;
            var $z = $0G / this.$5E();
            this.cellWidth = Math.floor($z);
            $e.debug.message("AutoCellWidth: " + this.cellWidth);
        };
        this.$5K = function() {
            var $R = this.nav.top.clientWidth;
            var $2T = this.$5G();
            var $2U = 2;
            var $P = this.$5I();
            var innerHeight = this.$7M();
            var $2V = 0;
            if (innerHeight > $P) {
                $2V = DayPilot.swa();
            };
            var $0G = $R - $2T - $2U - $2V;
            this.debug.message("scrollableWidth: " + $0G);
            return $0G;
        };
        this.$7I = function() {
            var $B = document.createElement("div");
            $B.style.overflow = 'hidden';
            if (!this.cssOnly) {
                $B.style.backgroundColor = this.hourNameBackColor;
            };
            $B.style.position = 'absolute';
            $B.style.display = 'block';
            $B.style.top = "0px";
            $B.style.width = "100%";
            $B.style.height = this.$5F() + "px";
            $B.style.overflow = "hidden";
            $B.onmousemove = function() {
                $e.$7m();
                $e.$7n();
                if ($e.cellBubble) {
                    $e.cellBubble.delayedHide();
                }
            };
            this.$7L($B);
            this.divTimeScroll = $B;
            var $E = document.createElement("div");
            $E.style.width = (this.$5E() * this.cellWidth + 5000) + "px";
            this.divNorth = $E;
            $B.appendChild($E);
            return $B;
        };
        this.$5I = function() {
            var $P = 0;
            if (this.heightSpec === 'Fixed' || this.heightSpec === "Parent100Pct") {
                return this.height ? this.height : 0;
            } else {
                $P = this.$7M();
            };
            if (this.heightSpec === 'Max' && $P > this.height) {
                return this.height;
            };
            return $P;
        };
        this.$7M = function() {
            var $P;
            if (this.innerHeightTree) {
                var $2W = DayPilot.sh($e.nav.scroll);
                if ($2W === 0) {
                    $P = this.innerHeightTree;
                } else {
                    $P = this.innerHeightTree + $2W;
                }
            } else {
                $P = this.rows.length * this.$6Z.eventHeight();
            };
            return $P;
        };
        this.$7N = function() {
            this.$7m();
            this.$7n();
        };
        this.$7J = function() {
            var $B = document.createElement("div");
            $B.style.overflow = "auto";
            $B.style.overflowX = "auto";
            $B.style.overflowY = "auto";
            $B.style.position = "absolute";
            $B.style.height = (this.$5I()) + "px";
            $B.style.top = (this.$5F() + 1) + "px";
            $B.style.width = "100%";
            if (!this.cssOnly) {
                $B.style.backgroundColor = this.emptyBackColor;
            };
            $B.className = this.$5D("_scrollable");
            $B.oncontextmenu = function() {
                return false;
            };
            this.$7L($B);
            this.nav.scroll = $B;
            this.maind = document.createElement("div");
            this.maind.style.MozUserSelect = "none";
            this.maind.style.KhtmlUserSelect = "none";
            this.maind.style.webkitUserSelect = "none";
            if ($a) {
                this.maind.style.webkitTransform = "translateZ(0px)";
            };
            this.maind.style.position = 'absolute';
            this.maind.style.width = (this.$7O()) + "px";
            this.maind.setAttribute("unselectable", "on");
            this.maind.onmousedown = this.$7P;
            this.maind.onmousemove = this.$7Q;
            this.maind.oncontextmenu = this.$7R;
            this.maind.ondblclick = this.$7S;
            this.maind.className = this.$5D("_matrix");
            this.divStretch = document.createElement("div");
            this.divStretch.style.position = 'absolute';
            this.divStretch.style.height = '1px';
            this.maind.appendChild(this.divStretch);
            this.divCells = document.createElement("div");
            this.divCells.style.position = 'absolute';
            this.divCells.oncontextmenu = this.$7R;
            this.maind.appendChild(this.divCells);
            this.divLines = document.createElement("div");
            this.divLines.style.position = 'absolute';
            this.divLines.oncontextmenu = this.$7R;
            this.maind.appendChild(this.divLines);
            this.divBreaks = document.createElement("div");
            this.divBreaks.style.position = 'absolute';
            this.divBreaks.oncontextmenu = this.$7R;
            this.maind.appendChild(this.divBreaks);
            this.divSeparators = document.createElement("div");
            this.divSeparators.style.position = 'absolute';
            this.divSeparators.oncontextmenu = this.$7R;
            this.maind.appendChild(this.divSeparators);
            this.divCrosshair = document.createElement("div");
            this.divCrosshair.style.position = 'absolute';
            this.divCrosshair.ondblclick = this.$7S;
            this.maind.appendChild(this.divCrosshair);
            this.divRange = document.createElement("div");
            this.divRange.style.position = 'absolute';
            this.divRange.oncontextmenu = this.$7R;
            this.maind.appendChild(this.divRange);
            this.divEvents = document.createElement("div");
            this.divEvents.style.position = 'absolute';
            this.maind.appendChild(this.divEvents);
            this.divSeparatorsAbove = document.createElement("div");
            this.divSeparatorsAbove.style.position = 'absolute';
            this.divSeparatorsAbove.oncontextmenu = this.$7R;
            this.maind.appendChild(this.divSeparatorsAbove);
            $B.appendChild(this.maind);
            return $B;
        };
        this.$6K = function() {
            if (this.loadingLabelVisible) {
                $e.nav.loading.innerHTML = this.loadingLabelText;
                $e.nav.loading.style.display = '';
            }
        };
        this.$53 = function($1l) {
            $e.status.loadingEvents = false;
            if (this.callbackTimeout) {
                window.clearTimeout(this.callbackTimeout);
            };
            if ($1l) {
                this.nav.loading.innerHTML = $1l;
                window.setTimeout(function() {
                    $e.$53();
                }, 1000);
            } else {
                this.nav.loading.style.display = 'none';
            }
        };
        this.$7T = function() {
            this.startDate = new DayPilot.Date(this.startDate).getDatePart();
        };
        this.$7U = function($2X) {
            var $B = document.createElement("div");
            $B.style.position = "absolute";
            $B.style.top = "-2000px";
            $B.style.left = "-2000px";
            $B.className = this.$5D($2X);
            document.body.appendChild($B);
            var $P = $B.offsetHeight;
            var $X = $B.offsetWidth;
            document.body.removeChild($B);
            var $f = {};
            $f.height = $P;
            $f.width = $X;
            return $f;
        };
        this.$5r = function($2Y) {
            if ($2Y) {
                this.autoRefreshEnabled = true;
            };
            if (!this.autoRefreshEnabled) {
                return;
            };
            if (this.autoRefreshCount >= this.autoRefreshMaxCount) {
                return;
            };
            this.$6J();
            var $2Z = this.autoRefreshInterval;
            if (!$2Z || $2Z < 10) {
                throw "The minimum autoRefreshInterval is 10 seconds";
            };
            this.autoRefreshTimeout = window.setTimeout(function() {
                $e.$7V();
            }, this.autoRefreshInterval * 1000);
        };
        this.$6J = function() {
            if (this.autoRefreshTimeout) {
                window.clearTimeout(this.autoRefreshTimeout);
            }
        };
        this.$7V = function() {
            if (!DayPilotScheduler.resizing && !DayPilotScheduler.moving && !DayPilotScheduler.drag && !DayPilotScheduler.range) {
                var $30 = false;
                if (typeof this.onAutoRefresh === 'function') {
                    var $q = {};
                    $q.i = this.autoRefreshCount;
                    $q.preventDefault = function() {
                        this.preventDefault.value = true;
                    };
                    $e.onAutoRefresh($q);
                    if ($q.preventDefault.value) {
                        $30 = true;
                    }
                };
                if (!$30) {
                    this.commandCallBack(this.autoRefreshCommand);
                };
                this.autoRefreshCount++;
            };
            if (this.autoRefreshCount < this.autoRefreshMaxCount) {
                this.autoRefreshTimeout = window.setTimeout(function() {
                    $e.$7V();
                }, this.autoRefreshInterval * 1000);
            }
        };
        this.$7W = function() {
            if (!DayPilotScheduler.globalHandlers) {
                DayPilotScheduler.globalHandlers = true;
                DayPilot.re(document, 'mousemove', DayPilotScheduler.gMouseMove);
                DayPilot.re(document, 'mouseup', DayPilotScheduler.gMouseUp);
            };
            DayPilot.re(window, 'resize', this.$6W);
        };
        this.$7X = function() {
            this.nav.scroll.root = this;
            this.nav.scroll.onscroll = this.$7Y;
            $e.scrollPos = this.nav.scroll.scrollLeft;
            $e.scrollTop = this.nav.scroll.scrollTop;
            $e.scrollWidth = this.divNorth.clientWidth;
        };
        this.$5p = function() {
            var $v = new Date();
            var $31 = {};
            $31.scrollX = this.nav.scroll.scrollLeft;
            $31.scrollY = this.nav.scroll.scrollTop;
            if (this.syncResourceTree) {
                $31.tree = this.$6Q();
            };
            this.nav.state.value = DayPilot.he(DayPilot.JSON.stringify($31));
            var end = new Date();
        };
        this.$5l = function() {
            if (!this.separators) {
                return;
            };
            for (var i = 0; i < this.separators.length; i++) {
                this.$7Z(i);
            }
        };
        this.batch = {};
        this.batch.step = 300;
        this.batch.delay = 10;
        this.batch.mode = "display";
        this.batch.layers = true;
        this.$5m = function($0K) {
            var $32 = this.batch.step;
            var $33 = this.batch.layers;
            if ($33) {
                $e.divEvents = document.createElement("div");
                $e.divEvents.style.position = 'absolute';
                $e.maind.appendChild(this.divEvents);
            } else {};
            if (this.batch.mode === 'display') {
                this.divEvents.style.display = 'none';
            } else if (this.batch.mode === 'visibility') {
                this.divEvents.style.visibility = 'hidden';
            };
            var $34 = this.dynamicEventRendering === 'Progressive';
            var $u = this.$5x();
            var top = $u.pixels.top;
            var $M = $u.pixels.bottom;
            var $35 = this.durationBarDetached ? 10 : 0;
            if (this.clientSide) {
                for (var i = 0; i < this.rows.length; i++) {
                    var $t = this.rows[i];
                    var $36 = $t.Top - this.dynamicEventRenderingMargin;
                    var $37 = $36 + $t.Height + 2 * this.dynamicEventRenderingMargin;
                    if ($34 && ($M <= $36 || top >= $37)) {
                        continue;
                    };
                    for (var j = 0; j < $t.lines.length; j++) {
                        var $03 = $t.lines[j];
                        for (var k = 0; k < $03.length; k++) {
                            var e = $03[k];
                            if (!e.part.top) {
                                e.part.line = j;
                                e.part.top = j * (this.$6Z.eventHeight() + $35) + $35;
                                e.part.detachedBarTop = e.part.top - $35;
                                e.part.height = this.$6Z.eventHeight();
                                e.part.right = e.part.left + e.part.width;
                                e.part.fullTop = this.rows[e.part.dayIndex].Top + e.Top;
                                e.part.fullBottom = e.part.fullTop + e.part.height;
                            };
                            var $38 = this.$80(e);
                            if ($0K && $38) {
                                $32--;
                                if ($32 <= 0) {
                                    this.divEvents.style.visibility = '';
                                    this.divEvents.style.display = '';
                                    window.setTimeout(function() {
                                        $e.$5m($0K);
                                    }, $e.batch.delay);
                                    return;
                                }
                            }
                        }
                    }
                }
            } else {
                var $39 = this.events.list.length;
                for (var i = 0; i < $39; i++) {
                    this.$80(this.events.list[i]);
                }
            };
            this.divEvents.style.display = '';
            this.$5A();
            this.$53();
        };
        this.$6s = function($3a) {
            var $t = this.rows[$3a];
            this.divEvents = document.createElement("div");
            this.divEvents.style.position = 'absolute';
            this.divEvents.style.display = 'none';
            this.maind.appendChild(this.divEvents);
            var $35 = this.durationBarDetached ? 10 : 0;
            for (var j = 0; j < $t.lines.length; j++) {
                var $03 = $t.lines[j];
                for (var k = 0; k < $03.length; k++) {
                    var e = $03[k];
                    e.part.line = j;
                    e.part.top = j * (this.$6Z.eventHeight() + $35) + $35;
                    e.part.detachedBarTop = e.part.top - $35;
                    e.part.height = this.$6Z.eventHeight();
                    e.part.right = e.part.left + e.part.width;
                    e.part.fullTop = this.rows[e.part.dayIndex].Top + e.Top;
                    e.part.fullBottom = e.part.fullTop + e.part.height;
                    this.$80(e);
                }
            };
            this.divEvents.style.display = '';
            this.$5A();
        };
        this.$5i = function() {
            if (this.elements.events) {
                var length = this.elements.events.length;
                for (var i = 0; i < length; i++) {
                    var $B = this.elements.events[i];
                    this.$81($B);
                }
            };
            this.elements.events = [];
        };
        this.$6r = function($3a) {
            if (this.elements.events) {
                var length = this.elements.events.length;
                var $3b = [];
                for (var i = 0; i < length; i++) {
                    var $B = this.elements.events[i];
                    if ($B.row === $3a) {
                        this.$81($B);
                        $3b.push(i);
                    }
                };
                for (var i = $3b.length - 1; i >= 0; i--) {
                    this.elements.events.splice($3b[i], 1);
                }
            }
        };
        this.$81 = function($B) {
            $B.onclick = null;
            $B.oncontextmenu = null;
            $B.onmouseover = null;
            $B.onmouseout = null;
            $B.onmousemove = null;
            $B.onmousedown = null;
            $B.ondblclick = null;
            if ($B.event) {
                if (!$B.isBar) {
                    $B.event.rendered = null;
                };
                $B.event = null;
            };
            if ($B.bar) {
                DayPilot.de($B.bar);
            };
            if ($B.parentNode) {
                $B.parentNode.removeChild($B);
            }
        };
        this.$82 = function($3c) {
            if (!$3c) {
                $3c = 0;
            };
            if (this.dynamicEventRendering !== 'Progressive') {
                return;
            };
            this.divEvents.style.display = 'none';
            var $0J = [];
            var $3d = 0;
            var length = this.elements.events.length;
            for (var i = length - 1; i >= 0; i--) {
                var $B = this.elements.events[i];
                if (this.$83($B.event)) {
                    if ($3c > 0) {
                        $3c--;
                        $0J.unshift($B);
                    } else {
                        this.$81($B);
                        $3d++;
                    }
                } else {
                    $0J.unshift($B);
                }
            };
            this.elements.events = $0J;
            this.divEvents.style.display = '';
        };
        this.$84 = function($3c) {
            var $0J = [];
            var $3d = 0;
            var $u = this.$5x();
            var length = this.elements.cells.length;
            for (var i = length - 1; i >= 0; i--) {
                var $B = this.elements.cells[i];
                var $3e = ($u.xStart < $B.coords.x && $B.coords.x <= $u.xEnd) && ($u.yStart < $B.coords.y && $B.coords.y <= $u.yEnd);
                if (!$3e) {
                    if ($3c > 0) {
                        $3c--;
                        $0J.unshift($B);
                    } else {
                        this.$74($B);
                        $3d++;
                    }
                } else {
                    $0J.unshift($B);
                }
            }
        };
        this.$74 = function($B) {
            if (!$B) {
                return;
            };
            var x = $B.coords.x;
            var y = $B.coords.y;
            var $1e = DayPilot.indexOf($e.elements.cells, $B);
            $e.elements.cells.splice($1e, 1);
            if ($B.parentNode) {
                $B.parentNode.removeChild($B);
            };
            $e.$51.cells[x + "_" + y] = null;
        };
        this.$5j = function() {
            if (this.elements.separators) {
                for (var i = 0; i < this.elements.separators.length; i++) {
                    var $B = this.elements.separators[i];
                    DayPilot.pu($B);
                    $B.parentNode.removeChild($B);
                }
            };
            this.elements.separators = [];
        };
        this.$85 = function() {
            var $34 = this.dynamicEventRendering === 'Progressive';
            if (!this.nav.scroll) {
                return false;
            };
            var top = this.nav.scroll.scrollTop;
            var $M = top + this.nav.scroll.clientHeight;
            for (var i = 0; i < this.rows.length; i++) {
                var $t = this.rows[i];
                var $36 = $t.Top;
                var $37 = $t.Top + $t.Height;
                if ($34 && ($M <= $36 || top >= $37)) {
                    continue;
                };
                for (var j = 0; j < $t.lines.length; j++) {
                    var $03 = $t.lines[j];
                    for (var k = 0; k < $03.length; k++) {
                        var e = $03[k];
                        if (this.$86(e)) {
                            return true;
                        }
                    }
                }
            };
            return false;
        };
        this.$86 = function($m) {
            if ($m.rendered) {
                return false;
            };
            var $34 = this.dynamicEventRendering === 'Progressive';
            var $x = this.nav.scroll.scrollLeft;
            var $y = $x + this.nav.scroll.clientWidth;
            var $3f = $m.Left;
            var $3g = $m.Left + $m.Width;
            if ($34 && ($y <= $3f || $x >= $3g)) {
                return false;
            };
            return true;
        };
        this.$83 = function(ev) {
            if (!ev.rendered) {
                return true;
            };
            var top = this.nav.scroll.scrollTop;
            var $M = top + this.nav.scroll.clientHeight;
            var $x = this.nav.scroll.scrollLeft;
            var $y = $x + this.nav.scroll.clientWidth;
            var $3f = ev.part.left;
            var $3g = ev.part.right;
            var $3h = ev.part.fullTop;
            var $3i = ev.part.fullBottom;
            if ($y <= $3f || $x >= $3g) {
                return true;
            };
            if ($M <= $3h || top >= $3i) {
                return true;
            };
            return false;
        };
        this.$80 = function($m) {
            if ($m.rendered) {
                return false;
            };
            var $34 = this.dynamicEventRendering === 'Progressive' && !this.dynamicLoading;
            var $u = this.$5x();
            var $x = $u.pixels.left;
            var $y = $u.pixels.right;
            var $3f = $m.part.left;
            var $3g = $m.part.left + $m.part.width;
            if ($34 && ($y <= $3f || $x >= $3g)) {
                return false;
            };
            var $3a = $m.part.dayIndex;
            var $3j = !this.cssOnly && this.eventBorderVisible;
            var $X = $m.part.width;
            var $P = $m.part.height;
            if ($3j) {
                $X -= 2;
                $P -= 2;
            };
            var $08 = $m.cache || $m.data;
            $X = Math.max(0, $X);
            $P = Math.max(0, $P);
            var $t = this.rows[$3a];
            if ($t.Hidden) {
                return false;
            };
            var $36 = $t.Top;
            var $B = document.createElement("div");
            var $3k = this.durationBarDetached;
            if ($3k) {
                var $3l = document.createElement("div");
                $3l.style.position = 'absolute';
                $3l.style.left = ($m.part.left + $m.part.barLeft) + 'px';
                $3l.style.top = ($36 + $m.part.detachedBarTop) + 'px';
                $3l.style.width = $m.part.barWidth + 'px';
                $3l.style.height = 5 + 'px';
                $3l.style.backgroundColor = "red";
                $B.bar = $3l;
                this.elements.bars.push($3l);
                this.divEvents.appendChild($3l);
            };
            var top = $36 + $m.part.top;
            $B.style.position = 'absolute';
            $B.style.left = $m.part.left + 'px';
            $B.style.top = ($36 + $m.part.top) + 'px';
            $B.style.width = $X + 'px';
            $B.style.height = $P + 'px';
            if (!this.cssOnly) {
                if ($e.eventBorderVisible) {
                    $B.style.border = '1px solid ' + ($08.borderColor || this.eventBorderColor);
                };
                $B.style.backgroundColor = $m.client.backColor();
                $B.style.fontSize = this.eventFontSize;
                $B.style.cursor = 'default';
                $B.style.fontFamily = this.eventFontFamily;
                $B.style.color = $08.fontColor || this.eventFontColor;
                if ($08.backImage && !this.durationBarVisible) {
                    $B.style.backgroundImage = "url(" + $08.backImage + ")";
                    if ($08.backRepeat) {
                        $B.style.backgroundRepeat = $08.backRepeat;
                    }
                };
                if (this.$6Z.rounded()) {
                    $B.style.MozBorderRadius = "5px";
                    $B.style.webkitBorderRadius = "5px";
                    $B.style.borderRadius = "5px";
                }
            };
            $B.style.whiteSpace = 'nowrap';
            $B.style.overflow = 'hidden';
            $B.className = this.cssOnly ? this.$5D("_event") : this.$5D("event");
            if ($08.cssClass) {
                DayPilot.Util.addClass($B, $08.cssClass);
            };
            var $3m = true;
            if ($3m) {
                DayPilot.Util.addClass($B, this.$5D("_event_line" + $m.part.line));
            };
            $B.setAttribute("unselectable", "on");
            if (this.showToolTip && !this.bubble) {
                $B.title = $m.client.toolTip();
            };
            $B.onmousemove = this.$87;
            $B.onmouseout = this.$88;
            $B.onmousedown = this.$89;
            $B.ontouchstart = $0m.onEventTouchStart;
            $B.ontouchmove = $0m.onEventTouchMove;
            $B.ontouchend = $0m.onEventTouchEnd;
            if ($m.client.clickEnabled()) {
                $B.onclick = this.$5W;
            };
            if ($m.client.doubleClickEnabled()) {
                $B.ondblclick = this.$66;
            };
            $B.oncontextmenu = this.$65;
            var $3n = [];
            var $3o = 0;
            if (this.cssOnly) {
                var $E = document.createElement("div");
                $E.setAttribute("unselectable", "on");
                $E.className = $e.$5D("_event_inner");
                $E.innerHTML = $m.client.innerHTML();
                if ($08.backColor) {
                    $E.style.background = $08.backColor;
                    if (DayPilot.browser.ie9 || DayPilot.browser.ielt9) {
                        $E.style.filter = '';
                    }
                };
                if ($08.fontColor) {
                    $E.style.color = $08.fontColor;
                };
                if ($08.borderColor) {
                    $E.style.borderColor = $08.borderColor;
                };
                if ($08.backImage) {
                    $E.style.backgroundImage = "url(" + $08.backImage + ")";
                    if ($08.backRepeat) {
                        $E.style.backgroundRepeat = $08.backRepeat;
                    }
                };
                $B.appendChild($E);
                var $3p = $m.start().getTime() === $m.part.start.getTime();
                var $3q = $m.end().getTime() === $m.part.end.getTime();
                if (!$3p) {
                    DayPilot.Util.addClass($B, this.$5D("_event_continueleft"));
                };
                if (!$3q) {
                    DayPilot.Util.addClass($B, this.$5D("_event_continueright"));
                };
                if ($m.client.barVisible() && $X > 0) {
                    var $3r = 100 * $m.part.barLeft / ($X);
                    var $3s = Math.ceil(100 * $m.part.barWidth / ($X));
                    if (this.durationBarMode === "PercentComplete") {
                        $3r = 0;
                        $3s = $08.complete;
                    };
                    var $3l = document.createElement("div");
                    $3l.setAttribute("unselectable", "on");
                    $3l.className = this.$5D("_event_bar");
                    $3l.style.position = "absolute";
                    var $3t = document.createElement("div");
                    $3t.setAttribute("unselectable", "on");
                    $3t.className = this.$5D("_event_bar_inner");
                    $3t.style.left = $3r + "%";
                    if (0 < $3s && $3s <= 1) {
                        $3t.style.width = "1px";
                    } else {
                        $3t.style.width = $3s + "%";
                    };
                    if ($08.barColor) {
                        $3t.style.backgroundColor = $08.barColor;
                    };
                    $3l.appendChild($3t);
                    $B.appendChild($3l);
                }
            } else {
                if ($m.client.barVisible()) {
                    $3o = $e.durationBarHeight;
                    $3n.push("<div unselectable='on' style='left:0px;background-color:white;width:");
                    $3n.push($m.part.barLeft);
                    $3n.push("px;height:2px;font-size:1px;position:absolute'></div>");
                    $3n.push("<div unselectable='on' style='left:");
                    $3n.push($m.part.barLeft + $m.part.barWidth);
                    $3n.push("px;background-color:white;width:");
                    $3n.push($X - ($m.part.barLeft + $m.part.barWidth));
                    $3n.push("px;height:2px;font-size:1px;position:absolute'></div>");
                    if (this.durationBarMode === "Duration") {
                        $3n.push("<div unselectable='on' style='width:");
                        $3n.push($m.part.barWidth);
                        $3n.push("px;margin-left:");
                        $3n.push($m.part.barLeft);
                        $3n.push("px;height:");
                    } else {
                        $3n.push("<div unselectable='on' style='width:");
                        $3n.push($08.complete);
                        $3n.push("%;margin-left:0px;height:");
                    };
                    $3n.push($3o - 1);
                    $3n.push("px;background-color:");
                    $3n.push($m.client.barColor());
                    if ($08.barImageUrl) {
                        $3n.push(";background-image:url(");
                        $3n.push($08.barImageUrl);
                        $3n.push(")");
                    };
                    $3n.push(";font-size:1px;position:relative'></div>");
                    $3n.push("<div unselectable='on' style='width:");
                    $3n.push($X);
                    $3n.push("px;height:1px;background-color:");
                    $3n.push(($08.borderColor || this.eventBorderColor));
                    $3n.push(";font-size:1px;overflow:hidden;position:relative'></div>");
                };
                $3n.push("<div unselectable='on' style='padding-left:1px;width:");
                $3n.push($X - 1);
                $3n.push("px;height:");
                $3n.push($P - $3o);
                $3n.push("px;");
                if ($e.rtl) {
                    $3n.push("direction:rtl;");
                };
                if ($08.backImage && this.durationBarVisible) {
                    $3n.push("background-image:url(");
                    $3n.push($08.backImage);
                    $3n.push(");");
                    if ($08.backRepeat) {
                        $3n.push("background-repeat:");
                        $3n.push($08.backRepeat);
                        $3n.push(";");
                    }
                };
                $3n.push("'>");
                $3n.push($m.client.innerHTML());
                $3n.push("</div>");
                $B.innerHTML = $3n.join('');
            };
            $B.row = $3a;
            if ($08.areas) {
                for (var i = 0; i < $08.areas.length; i++) {
                    var $u = $08.areas[i];
                    if ($u.v !== 'Visible') {
                        continue;
                    };
                    var a = DayPilot.Areas.createArea($B, $m, $u);
                    $B.appendChild(a);
                }
            };
            this.elements.events.push($B);
            this.divEvents.appendChild($B);
            $m.rendered = true;
            $B.event = $m;
            if ($e.multiselect.$6i($B.event)) {
                $e.multiselect.add($B.event, true);
                $e.multiselect.$6h($B);
            };
            if ($e.$5t()) {
                if (typeof $e.onAfterEventRender === 'function') {
                    var $q = {};
                    $q.e = $B.event;
                    $q.div = $B;
                    $e.onAfterEventRender($q);
                }
            } else {
                if ($e.afterEventRender) {
                    $e.afterEventRender($B.event, $B);
                }
            };
            return true;
        };
        this.$5t = function() {
            return $e.api === 2;
        };
        this.$6t = function() {
            for (var i = 0; i < this.elements.events.length; i++) {
                var $B = this.elements.events[i];
                var event = $B.event;
                var $3a = event.part.dayIndex;
                var $t = this.rows[$3a];
                var $36 = $t.Top;
                $B.style.top = ($36 + event.part.top) + 'px';
            }
        };
        this.$8a = function(e) {
            for (var i = 0; i < $e.elements.events.length; i++) {
                var $B = $e.elements.events[i];
                if ($B.event === e || $B.event.data === e.data) {
                    return $B;
                }
            };
            return null;
        };
        this.$88 = function(ev) {
            var $B = this;
            DayPilot.Areas.hideAreas($B, ev);
            if ($e.cssOnly) {
                DayPilot.Util.removeClass($B, $e.$5D("_event_hover"));
            };
            if ($e.bubble && $e.eventHoverHandling === 'Bubble') {
                $e.bubble.hideOnMouseOut();
            }
        };
        this.$87 = function(ev) {
            ev = ev || window.event;
            if ($e.cellBubble) {
                $e.cellBubble.delayedHide();
            };
            var $B = this;
            while ($B && !$B.event) {
                $B = $B.parentNode;
            };
            $e.$8b($B, ev);
            if (!$B.active) {
                DayPilot.Areas.showAreas($B, $B.event);
                if ($e.cssOnly) {
                    DayPilot.Util.addClass($B, $e.$5D("_event_hover"));
                }
            };
            if (ev.srcElement) {
                ev.srcElement.insideEvent = true;
            } else {
                ev.insideEvent = true;
            }
        };
        this.$8c = {};
        var $0n = this.$8c;
        this.$89 = function(ev) {
            $e.$7m();
            $e.$7n();
            if (typeof DayPilot.Bubble !== 'undefined') {
                DayPilot.Bubble.hideActive();
            };
            ev = ev || window.event;
            var $3u = ev.which || ev.button;
            if ($3u === 1) {
                if (this.style.cursor === 'w-resize' || this.style.cursor === 'e-resize') {
                    DayPilotScheduler.resizing = this;
                    DayPilotScheduler.originalMouse = DayPilot.mc(ev);
                    document.body.style.cursor = this.style.cursor;
                } else if (this.style.cursor === 'move') {
                    DayPilotScheduler.moving = this;
                    DayPilotScheduler.originalMouse = DayPilot.mc(ev);
                    DayPilotScheduler.moveOffsetX = DayPilot.mo3(this, ev).x;
                    DayPilotScheduler.moveDragStart = $e.getDate($e.coords.x, true);
                    document.body.style.cursor = 'move';
                } else if ($e.moveBy === 'Full' && this.event.client.moveEnabled()) {
                    $0n.start = true;
                    $0n.moving = this;
                    $0n.originalMouse = DayPilot.mc(ev);
                    $0n.moveOffsetX = DayPilot.mo3(this, ev).x;
                    $0n.moveDragStart = $e.getDate($e.coords.x, true);
                }
            };
            ev.cancelBubble = true;
            return false;
        };
        this.$8d = {};
        var $0m = $e.$8d;
        $0m.active = false;
        $0m.start = false;
        $0m.timeouts = [];
        $0m.onEventTouchStart = function(ev) {
            if ($0m.active || $0m.start) {
                return;
            };
            $0m.clearTimeouts();
            $0m.start = true;
            $0m.active = false;
            var $B = this;
            var $3v = 500;
            $0m.timeouts.push(window.setTimeout(function() {
                $0m.active = true;
                $0m.start = false;
                $e.coords = $0m.relativeCoords(ev);
                $0m.startMoving($B, ev);
                ev.preventDefault();
            }, $3v));
            ev.stopPropagation();
        };
        $0m.onEventTouchMove = function(ev) {
            $0m.clearTimeouts();
            $0m.start = false;
        };
        $0m.onEventTouchEnd = function(ev) {
            $0m.clearTimeouts();
            if ($0m.start) {
                $e.$60(this, false);
            };
            window.setTimeout(function() {
                $0m.start = false;
                $0m.active = false;
            }, 500);
        };
        $0m.onMainTouchStart = function(ev) {
            if ($0m.active || $0m.start) {
                return;
            };
            $0m.clearTimeouts();
            $0m.start = true;
            $0m.active = false;
            var $3v = 500;
            $0m.timeouts.push(window.setTimeout(function() {
                $0m.active = true;
                $0m.start = false;
                ev.preventDefault();
                $e.coords = $0m.relativeCoords(ev);
                $0m.range = $e.$8e();
            }, $3v));
        };
        $0m.onMainTouchMove = function(ev) {
            $0m.clearTimeouts();
            $0m.start = false;
            if ($0m.active) {
                ev.preventDefault();
                $e.coords = $0m.relativeCoords(ev);
                if (DayPilotScheduler.moving) {
                    $0m.updateMoving();
                    return;
                };
                if ($0m.range) {
                    var $0P = $0m.range;
                    $0P.end = {
                        x: Math.floor($e.coords.x / $e.cellWidth)
                    };
                    $e.$8f($0P);
                }
            }
        };
        $0m.onMainTouchEnd = function(ev) {
            $0m.clearTimeouts();
            if ($0m.active) {
                if (DayPilotScheduler.moving) {
                    ev.preventDefault();
                    var e = DayPilotScheduler.moving.event;
                    var $0u = DayPilotScheduler.movingShadow.start;
                    var $0v = DayPilotScheduler.movingShadow.end;
                    var $0x = ($e.viewType !== 'Days') ? DayPilotScheduler.movingShadow.row.Value : null;
                    var external = DayPilotScheduler.drag ? true : false;
                    DayPilot.de(DayPilotScheduler.movingShadow);
                    DayPilotScheduler.movingShadow.calendar = null;
                    document.body.style.cursor = '';
                    DayPilotScheduler.moving = null;
                    DayPilotScheduler.movingShadow = null;
                    $e.$6u(e, $0u, $0v, $0x, external);
                };
                if ($0m.range) {
                    var $3w = $e.$8g($0m.range);
                    $0m.range = null;
                    $e.$6y($3w.start, $3w.end, $3w.resource);
                }
            };
            window.setTimeout(function() {
                $0m.start = false;
                $0m.active = false;
            }, 500);
        };
        $0m.clearTimeouts = function() {
            for (var i = 0; i < $0m.timeouts.length; i++) {
                clearTimeout($0m.timeouts[i]);
            };
            $0m.timeouts = [];
        };
        $0m.relativeCoords = function(ev) {
            var $3x = $e.maind;
            var x = ev.touches[0].pageX;
            var y = ev.touches[0].pageY;
            var $3y = DayPilot.abs($3x);
            var $1a = {
                x: x - $3y.x,
                y: y - $3y.y,
                toString: function() {
                    return "x: " + this.x + ", y:" + this.y;
                }
            };
            return $1a;
        };
        $0m.startMoving = function($B, ev) {
            var $1a = {
                x: ev.touches[0].pageX,
                y: ev.touches[0].pageY
            };
            DayPilotScheduler.moving = $B;
            DayPilotScheduler.originalMouse = $1a;
            var $3z = DayPilot.abs($B);
            DayPilotScheduler.moveOffsetX = $1a.x - $3z.x;
            DayPilotScheduler.moveDragStart = $e.getDate($e.coords.x, true);
            DayPilotScheduler.movingShadow = $e.$6X($B, $e.shadow);
            $e.$7f();
        };
        $0m.updateMoving = function() {
            if (DayPilotScheduler.movingShadow && DayPilotScheduler.movingShadow.calendar !== $e) {
                DayPilotScheduler.movingShadow.calendar = null;
                DayPilot.de(DayPilotScheduler.movingShadow);
                DayPilotScheduler.movingShadow = null;
            };
            if (!DayPilotScheduler.movingShadow) {
                var mv = DayPilotScheduler.moving;
                DayPilotScheduler.movingShadow = $e.$6X(mv, $e.shadow);
            };
            DayPilotScheduler.moving.target = $e;
            $e.$7f();
        };
        this.$8b = function($B, ev) {
            var $3A = this.eventResizeMargin;
            var $3B = this.eventMoveMargin;
            var $18 = $B;
            if (typeof(DayPilotScheduler) === 'undefined') {
                return;
            };
            var $0e = DayPilot.mo3($B, ev);
            if (!$0e) {
                return;
            };
            $e.eventOffset = $0e;
            if (DayPilotScheduler.resizing) {
                return;
            };
            var $3C = $B.getAttribute("dpStart") === $B.getAttribute("dpPartStart");
            var $3D = $B.getAttribute("dpEnd") === $B.getAttribute("dpPartEnd");
            if ($e.moveBy === 'Top' && $0e.y <= $3B && $18.event.client.moveEnabled() && $e.eventMoveHandling !== 'Disabled') {
                if ($3C) {
                    $B.style.cursor = 'move';
                } else {
                    $B.style.cursor = 'not-allowed';
                }
            } else if ($e.moveBy === 'Top' && $0e.x <= $3A && $18.event.client.resizeEnabled() && $e.eventResizeHandling !== 'Disabled') {
                if ($3C) {
                    $B.style.cursor = "w-resize";
                    $B.dpBorder = 'left';
                } else {
                    $B.style.cursor = 'not-allowed';
                }
            } else if ($e.moveBy === 'Left' && $0e.x <= $3B && $18.event.client.moveEnabled() && $e.eventMoveHandling !== 'Disabled') {
                if ($3C) {
                    $B.style.cursor = "move";
                } else {
                    $B.style.cursor = 'not-allowed';
                }
            } else if ($B.offsetWidth - $0e.x <= $3A && $18.event.client.resizeEnabled() && $e.eventResizeHandling !== 'Disabled') {
                if ($3D) {
                    $B.style.cursor = "e-resize";
                    $B.dpBorder = 'right';
                } else {
                    $B.style.cursor = 'not-allowed';
                }
            } else if (!DayPilotScheduler.resizing && !DayPilotScheduler.moving) {
                if ($18.event.client.clickEnabled() && $e.eventClickHandling !== 'Disabled') {
                    $B.style.cursor = 'pointer';
                } else {
                    $B.style.cursor = 'default';
                }
            };
            if (typeof(DayPilotBubble) !== 'undefined' && $e.bubble && $e.eventHoverHandling === 'Bubble') {
                if ($B.style.cursor === 'default' || $B.style.cursor === 'pointer') {
                    var $3E = this.$8h && $0e.x === this.$8h.x && $0e.y === this.$8h.y;
                    if (!$3E) {
                        this.$8h = $0e;
                        $e.bubble.showEvent($B.event);
                    }
                } else {}
            }
        };
        this.$5E = function() {
            if (this.viewType !== 'Days') {
                return this.itline.length;
            } else {
                return Math.floor(24 * 60 / this.cellDuration);
            }
        };
        this.$8g = function($0P) {
            var $0P = $0P || DayPilotScheduler.range || DayPilotScheduler.rangeHold;
            if (!$0P) {
                return null;
            };
            var $t = $e.rows[$0P.start.y];
            if (!$t) {
                return null;
            };
            var $0O = $t.Value;
            var $3F = $0P.end.x > $0P.start.x ? $0P.start.x : $0P.end.x;
            var $3G = ($0P.end.x > $0P.start.x ? $0P.end.x : $0P.start.x);
            var $1E = $t.Start.getTime() - this.$7w().getTime();
            var $v = this.itline[$3F].start.addTime($1E);
            var end = this.itline[$3G].end.addTime($1E);
            return new DayPilot.Selection($v, end, $0O, $e);
        };
        this.$8i = function($18) {
            var $3H = $18.parentNode;
            var $3I = document.createElement('textarea');
            $3I.style.position = 'absolute';
            $3I.style.width = (($18.offsetWidth < 100) ? 100 : ($18.offsetWidth - 2)) + 'px';
            $3I.style.height = ($18.offsetHeight - 2) + 'px';
            $3I.style.fontFamily = DayPilot.gs($18, 'fontFamily') || DayPilot.gs($18, 'font-family');
            $3I.style.fontSize = DayPilot.gs($18, 'fontSize') || DayPilot.gs($18, 'font-size');
            $3I.style.left = $18.offsetLeft + 'px';
            $3I.style.top = $18.offsetTop + 'px';
            $3I.style.border = '1px solid black';
            $3I.style.padding = '0px';
            $3I.style.marginTop = '0px';
            $3I.style.backgroundColor = 'white';
            $3I.value = DayPilot.tr($18.event.text());
            $3I.event = $18.event;
            $3H.appendChild($3I);
            return $3I;
        };
        this.$61 = function($18) {
            if (DayPilotScheduler.editing) {
                DayPilotScheduler.editing.blur();
                return;
            };
            var $3I = this.$8i($18);
            DayPilotScheduler.editing = $3I;
            $3I.onblur = function() {
                var $3J = $18.event.text();
                var $0Q = $3I.value;
                DayPilotScheduler.editing = null;
                if ($3I.parentNode) {
                    $3I.parentNode.removeChild($3I);
                };
                if ($3J === $0Q) {
                    return;
                };
                $18.style.display = 'none';
                $e.$6G($18.event, $0Q);
            };
            $3I.onkeypress = function(e) {
                var $3K = (window.event) ? event.keyCode : e.keyCode;
                if ($3K === 13) {
                    this.onblur();
                    return false;
                } else if ($3K === 27) {
                    $3I.parentNode.removeChild($3I);
                    DayPilotScheduler.editing = false;
                };
                return true;
            };
            $3I.select();
            $3I.focus();
        };
        this.$7o = function(ev) {
            var td = this;
            if (typeof(DayPilotBubble) !== 'undefined') {
                if ($e.cellBubble) {
                    $e.cellBubble.hideOnMouseOut();
                };
                if ($e.resourceBubble) {
                    var $0X = {};
                    $0X.calendar = $e;
                    $0X.id = td.getAttribute("resource");
                    $0X.toJSON = function() {
                        var $0U = {};
                        $0U.id = this.id;
                        return $0U;
                    };
                    $e.resourceBubble.showResource($0X);
                }
            };
            var $B = td.firstChild;
            if (!$B.active) {
                DayPilot.Areas.showAreas($B, $e.rows[td.index]);
            }
        };
        this.$7p = function(ev) {
            var td = this;
            if (typeof(DayPilotBubble) !== 'undefined' && $e.resourceBubble) {
                $e.resourceBubble.hideOnMouseOut();
            };
            var $B = td.firstChild;
            DayPilot.Areas.hideAreas($B, ev);
            $B.data = null;
        };
        this.$5b = function() {
            this.$8j();
            return;
        };
        this.$8j = function() {
            if (!this.timeHeader) {
                $e.debug.message("drawTimeHeader: timeHeader not available");
                return;
            };
            this.$51.timeHeader = {};
            var $2T = document.createElement("div");
            $2T.style.position = "relative";
            this.nav.timeHeader = $2T;
            for (var y = 0; y < this.timeHeader.length; y++) {
                var $t = this.timeHeader[y];
                for (var x = 0; x < $t.length; x++) {
                    this.$8k(x, y);
                }
            };
            var $3L = this.divNorth;
            DayPilot.puc($3L);
            $3L.innerHTML = '';
            $3L.appendChild($2T);
            $3L.style.width = (this.$5E() * this.cellWidth + 5000) + "px";
            var $3M = this.divCorner;
            if (!this.cssOnly) {
                $3M.style.backgroundColor = this.cornerBackColor;
            };
            if (this.cornerHtml) {
                $3M.innerHTML = this.cornerHtml;
            } else {
                $3M.innerHTML = '';
            };
            this.divStretch.style.width = (this.$7O()) + "px";
        };
        this.$5R = function(h, $3N) {
            var $H = null;
            var $2n = this.$6Z.locale();
            var $3N = $3N || this.cellGroupBy;
            var $3O = h.start;
            var to = h.end;
            var $2n = this.$6Z.locale();
            switch ($3N) {
                case 'Hour':
                    $H = $3O.toString("H");
                    break;
                case 'Day':
                    $H = $3O.toString($2n.datePattern);
                    break;
                case 'Week':
                    $H = $04.weekStarts() === 1 ? $3O.weekNumberISO() : $3O.weekNumber();
                    break;
                case 'Month':
                    $H = $3O.toString("MMMM yyyy", $2n);
                    break;
                case 'Year':
                    $H = $3O.toString("yyyy");
                    break;
                case 'None':
                    $H = '';
                    break;
                case 'Cell':
                    if (this.scale === 'Manual' || this.scale === 'CellDuration') {
                        var $0l = (h.end.ticks - h.start.ticks) / 60000;
                        $H = this.$8l($3O, $0l);
                    } else {
                        $H = this.$5R(h, this.scale);
                    };
                    break;
                default:
                    throw 'Invalid cellGroupBy value';
            };
            return $H;
        };
        this.$8l = function($v, $0l) {
            var $2n = this.$6Z.locale();
            var $0l = $0l || this.cellDuration;
            if ($0l < 60) {
                return $v.toString("mm");
            } else if ($0l < 1440) {
                return $e.$6Z.timeFormat() === 'Clock12Hours' ? $v.toString("H tt", $2n) : $v.toString("H", $2n);
            } else if ($0l < 10080) {
                return $v.toString("d");
            } else if ($0l === 10080) {
                return $04.weekStarts() === 1 ? $v.weekNumberISO() : $v.weekNumber();
            } else {
                return $v.toString("MMMM yyyy", $2n);
            }
        };
        this.$5O = function($3O) {
            var $3P = this.scale;
            switch ($3P) {
                case "Cell":
                    throw "Invalid scale: Cell";
                case "Manual":
                    throw "Internal error (addScaleSize in Manual mode)";
                case "Minute":
                    return $3O.addMinutes(1);
                case "CellDuration":
                    return $3O.addMinutes(this.cellDuration);
                default:
                    return this.$5Q($3O, $3P);
            }
        };
        this.$5Q = function($3O, $3N) {
            var $3Q = this.viewType !== 'Days' ? this.days : 1;
            var $3R = this.startDate.addDays($3Q);
            var $3N = $3N || this.cellGroupBy;
            var $05 = 60;
            switch ($3N) {
                case 'Hour':
                    to = $3O.addHours(1);
                    break;
                case 'Day':
                    to = $3O.addDays(1);
                    break;
                case 'Week':
                    to = $3O.addDays(1);
                    while (to.dayOfWeek() !== $04.weekStarts()) {
                        to = to.addDays(1);
                    };
                    break;
                case 'Month':
                    to = $3O.addMonths(1);
                    to = to.firstDayOfMonth();
                    var $3S = (DayPilot.Date.diff(to.d, $3O.d) / (1000.0 * 60)) % $05 === 0;
                    while (!$3S) {
                        to = to.addHours(1);
                        $3S = (DayPilot.Date.diff(to.d, $3O.d) / (1000.0 * 60)) % $05 === 0;
                    };
                    break;
                case 'Year':
                    to = $3O.addYears(1);
                    to = to.firstDayOfYear();
                    var $3S = (DayPilot.Date.diff(to.d, $3O.d) / (1000.0 * 60)) % $05 === 0;
                    while (!$3S) {
                        to = to.addHours(1);
                        $3S = (DayPilot.Date.diff(to.d, $3O.d) / (1000.0 * 60)) % $05 === 0;
                    };
                    break;
                case 'None':
                    to = $3R;
                    break;
                case 'Cell':
                    var $z = this.$5V($3O);
                    if ($z !== null) {
                        to = $z.end;
                    } else {
                        var $1n = $3O;
                        while ($z === null) {
                            $1n = $1n.addMinutes(1);
                            $z = this.$5V($1n);
                        };
                        to = $z.start;
                    };
                    break;
                default:
                    throw 'Invalid cellGroupBy value';
            };
            if (to.getTime() > $3R.getTime()) {
                to = $3R;
            };
            return to;
        };
        this.$8k = function(x, y) {
            var $2T = this.nav.timeHeader;
            var p = this.timeHeader[y][x];
            var $3T = y < this.timeHeader.length - 1;
            var top = y * $04.headerHeight();
            var $x = p.left;
            var $X = p.width;
            var $P = $04.headerHeight();
            var $z = document.createElement("div");
            $z.style.position = "absolute";
            $z.style.top = top + "px";
            $z.style.left = $x + "px";
            $z.style.width = $X + "px";
            $z.style.height = $P + "px";
            if (p.toolTip) {
                $z.title = p.toolTip;
            };
            $z.setAttribute("unselectable", "on");
            $z.style.KhtmlUserSelect = 'none';
            $z.style.MozUserSelect = 'none';
            $z.style.webkitUserSelect = 'none';
            $z.oncontextmenu = function() {
                return false;
            };
            $z.cell = {};
            $z.cell.start = p.start;
            $z.cell.end = p.end;
            $z.cell.level = y;
            $z.cell.th = p;
            $z.onclick = this.$7u;
            $z.style.overflow = 'hidden';
            if (!this.cssOnly) {
                var $3U = y === this.timeHeader.length - 1;
                $z.style.textAlign = "center";
                $z.style.backgroundColor = (typeof $z.backColor === 'undefined') ? $e.hourNameBackColor : $z.backColor;
                $z.style.fontFamily = this.hourFontFamily;
                $z.style.fontSize = this.hourFontSize;
                $z.style.color = this.headerFontColor;
                $z.style.cursor = 'default';
                $z.style.border = '0px none';
                if (!$3U) {
                    $z.style.height = ($P - 1) + "px";
                    $z.style.borderBottom = "1px solid " + this.borderColor;
                };
                $z.style.width = ($X - 1) + "px";
                $z.style.borderRight = "1px solid " + this.hourNameBorderColor;
                $z.style.whiteSpace = 'nowrap';
                $z.className = this.$5D('timeheadergroup');
            };
            var $E = document.createElement("div");
            $E.setAttribute("unselectable", "on");
            $E.innerHTML = p.innerHTML;
            if (p.backColor) {
                $E.style.background = p.backColor;
            };
            if (this.cssOnly) {
                var cl = this.$5D("_timeheadercol");
                var $3V = this.$5D("_timeheadercol_inner");
                if ($3T) {
                    cl = this.$5D("_timeheadergroup");
                    $3V = this.$5D("_timeheadergroup_inner");
                };
                DayPilot.Util.addClass($z, cl);
                DayPilot.Util.addClass($E, $3V);
            };
            $z.appendChild($E);
            this.$51.timeHeader[x + "_" + y] = $z;
            $2T.appendChild($z);
        };
        this.$6e = function() {
            for (var i = 0; i < this.rows.length; i++) {
                var $t = this.rows[i];
                var $0J = $t.height() + $t.MarginBottom;
                if ($t.Height !== $0J) {
                    this.rowsDirty = true;
                };
                $t.Height = $0J;
            }
        };
        this.$5e = function() {
            var $2T = this.divHeader;
            if (!$2T) {
                return false;
            };
            var $1f = this.rows.length;
            var $14 = this.rowHeaderCols ? this.rowHeaderCols.length : 1;
            var j = 0;
            for (var i = 0; i < $1f; i++) {
                var $t = this.rows[i];
                if ($t.Hidden) {
                    continue;
                };
                for (var c = 0; c < $2T.rows[j].cells.length; c++) {
                    var $3W = $2T.rows[j].cells[c];
                    var $3X = $t.Height;
                    if ($3W && $3W.firstChild && parseInt($3W.firstChild.style.height, 10) !== $3X) {
                        $3W.firstChild.style.height = $3X + "px";
                    }
                };
                j++;
            }
        };
        this.$7Z = function($1e) {
            var s = this.separators[$1e];
            s.location = s.location || s.Location;
            s.color = s.color || s.Color;
            s.layer = s.layer || s.Layer;
            s.width = s.width || s.Width;
            s.opacity = s.opacity || s.Opacity;
            var $0k = new DayPilot.Date(s.location);
            var $3Y = s.color;
            var $X = s.width ? s.width : 1;
            var $3Z = s.layer ? s.layer === 'AboveEvents' : false;
            var $L = s.opacity ? s.opacity : 100;
            if ($0k.getTime() < this.startDate.getTime()) {
                return;
            };
            if ($0k.getTime() >= this.startDate.addDays(this.days).getTime()) {
                return;
            };
            var $s = this.getPixels($0k);
            if ($s.cut) {
                return;
            };
            if ($s.left < 0) {
                return;
            };
            if ($s.left > this.$5E() * this.cellWidth) {
                return;
            };
            var $03 = document.createElement("div");
            $03.style.width = $X + 'px';
            $03.style.height = $e.innerHeightTree + 'px';
            $03.style.position = 'absolute';
            $03.style.left = ($s.left - 1) + 'px';
            $03.style.top = '0px';
            $03.style.backgroundColor = $3Y;
            $03.style.opacity = $L / 100;
            $03.style.filter = "alpha(opacity=" + $L + ")";
            if ($3Z) {
                this.divSeparatorsAbove.appendChild($03);
            } else {
                this.divSeparators.appendChild($03);
            };
            this.elements.separators.push($03);
        };
        this.$7S = function(ev) {
            if ($e.timeRangeDoubleClickHandling === 'Disabled') {
                return false;
            };
            if (DayPilotScheduler.timeRangeTimeout) {
                clearTimeout(DayPilotScheduler.timeRangeTimeout);
                DayPilotScheduler.timeRangeTimeout = null;
            };
            var $0P = {};
            if (!$e.coords) {
                var $3x = $e.maind;
                $e.coords = DayPilot.mo3($3x, ev);
            };
            ev = ev || window.event;
            if ($e.$8m($e.coords)) {
                var $3w = $e.$8g(DayPilotScheduler.rangeHold);
                $e.$6z($3w.start, $3w.end, $3w.resource);
            } else {
                DayPilotScheduler.range = $e.$8e();
                var $3w = $e.$8g(DayPilotScheduler.range);
                $e.$6z($3w.start, $3w.end, $3w.resource);
            };
            DayPilotScheduler.rangeHold = DayPilotScheduler.range;
            DayPilotScheduler.range = null;
        };
        this.$7P = function(ev) {
            if ($0m.start) {
                return;
            };
            if (DayPilotScheduler.timeRangeTimeout && false) {
                clearTimeout(DayPilotScheduler.timeRangeTimeout);
                DayPilotScheduler.timeRangeTimeout = null;
            };
            $e.$7m();
            $e.$7n();
            if (!$e.coords) {
                var $3x = $e.maind;
                $e.coords = DayPilot.mo3($3x, ev);
            };
            ev = ev || window.event;
            var $3u = ev.which || ev.button;
            if ($3u === 2 || ($3u === 3 && $e.$8m($e.coords))) {
                return false;
            };
            if ($e.timeRangeSelectedHandling === 'Disabled') {
                return false;
            };
            DayPilotScheduler.range = $e.$8e();
            return false;
        };
        this.$8e = function() {
            var $0P = {};
            var cx = this.$5T($e.coords.x).x;
            $0P.start = {
                y: $e.$6R($e.coords.y).i,
                x: cx
            };
            $0P.end = {
                x: cx
            };
            if (this.$7a($e.$6R($e.coords.y).i)) {
                return;
            };
            $0P.calendar = $e;
            $e.$8f($0P);
            return $0P;
        };
        this.$7Q = function(ev) {
            if ($0m.active) {
                return;
            };
            DayPilotScheduler.activeCalendar = $e;
            ev = ev || window.event;
            var $40 = DayPilot.mc(ev);
            $e.coords = DayPilot.mo3($e.maind, ev);
            if ($0n.start) {
                if ($0n.originalMouse.x !== $40.x || $0n.originalMouse.y !== $40.y) {
                    DayPilot.Util.copyProps($0n, DayPilotScheduler);
                    document.body.style.cursor = 'move';
                    $0n = {};
                }
            };
            if (DayPilotScheduler.resizing) {
                if (!DayPilotScheduler.resizingShadow) {
                    DayPilotScheduler.resizingShadow = $e.$6X(DayPilotScheduler.resizing, $e.shadow);
                };
                var $41 = DayPilotScheduler.resizing.event.calendar.cellWidth;
                var $42 = DayPilotScheduler.resizing.event.part.width;
                var $43 = DayPilotScheduler.resizing.event.part.left;
                var $44 = 0;
                var $45 = ($40.x - DayPilotScheduler.originalMouse.x);
                if (DayPilotScheduler.resizing.dpBorder === 'right') {
                    var $46;
                    if ($e.snapToGrid) {
                        var $0i = $e.$5T($42 + $43 + $45).cell;
                        var $47 = $0i.left + $0i.width;
                        $46 = $47 - $43;
                        if ($46 < $41) {
                            $46 = $41;
                        }
                    } else {
                        $46 = $42 + $45;
                    };
                    var $1N = $e.$7O();
                    if ($43 + $46 > $1N) {
                        $46 = $1N - $43;
                    };
                    DayPilotScheduler.resizingShadow.style.width = ($46) + 'px';
                } else if (DayPilotScheduler.resizing.dpBorder === 'left') {
                    var $48;
                    if ($e.snapToGrid) {
                        $48 = Math.floor((($43 + $45) + 0) / $41) * $41;
                        if ($48 < $44) {
                            $48 = $44;
                        }
                    } else {
                        $48 = $43 + $45;
                    };
                    var $46 = $42 - ($48 - $43);
                    var $y = $43 + $42;
                    if ($e.snapToGrid) {
                        if ($46 < $41) {
                            $46 = $41;
                            $48 = $y - $46;
                        }
                    };
                    DayPilotScheduler.resizingShadow.style.left = $48 + 'px';
                    DayPilotScheduler.resizingShadow.style.width = ($46) + 'px';
                }
            } else if (DayPilotScheduler.moving) {
                if (DayPilotScheduler.movingShadow && DayPilotScheduler.movingShadow.calendar !== $e) {
                    DayPilotScheduler.movingShadow.calendar = null;
                    DayPilot.de(DayPilotScheduler.movingShadow);
                    DayPilotScheduler.movingShadow = null;
                };
                if (!DayPilotScheduler.movingShadow) {
                    var mv = DayPilotScheduler.moving;
                    DayPilotScheduler.movingShadow = $e.$6X(mv, $e.shadow);
                };
                $e.$7d();
                DayPilotScheduler.moving.target = $e;
                $e.$7f();
            } else if (DayPilotScheduler.range) {
                var $0P = DayPilotScheduler.range;
                $0P.end = {
                    x: $e.$5T($e.coords.x).x
                };
                $e.$8f($0P);
            } else if ($e.crosshairType !== 'Disabled') {
                $e.$8n();
            };
            var $49 = ev.insideEvent;
            if (window.event) {
                $49 = window.event.srcElement.insideEvent;
            };
            if ($e.cellBubble && $e.coords && $e.rows && $e.rows.length > 0 && !$49) {
                var x = Math.floor($e.coords.x / $e.cellWidth);
                var y = $e.$6R($e.coords.y).i;
                if (y < $e.rows.length) {
                    var $z = {};
                    $z.calendar = $e;
                    $z.start = $e.itline[x].start;
                    $z.end = $e.itline[x].end;
                    $z.resource = $e.rows[y].Value;
                    $z.toJSON = function() {
                        var $0U = {};
                        $0U.start = this.start;
                        $0U.end = this.end;
                        $0U.resource = this.resource;
                        return $0U;
                    };
                    $e.cellBubble.showCell($z);
                }
            };
            if (DayPilotScheduler.drag) {
                $e.$7m();
                if (DayPilotScheduler.gShadow) {
                    document.body.removeChild(DayPilotScheduler.gShadow);
                };
                DayPilotScheduler.gShadow = null;
                if (!DayPilotScheduler.movingShadow && $e.coords && $e.rows.length > 0) {
                    if (!DayPilotScheduler.moving) {
                        DayPilotScheduler.moving = {};
                        var event = DayPilotScheduler.drag.event;
                        if (!event) {
                            var $4a = $e.itline[0].start;
                            $e.debug.message("external start:" + $4a);
                            var ev = {
                                'id': DayPilotScheduler.drag.id,
                                'start': $4a,
                                'end': $4a.addSeconds(DayPilotScheduler.drag.duration),
                                'text': DayPilotScheduler.drag.text
                            };
                            event = new DayPilot.Event(ev);
                            event.calendar = $e;
                        };
                        DayPilotScheduler.moving.event = event;
                    };
                    DayPilotScheduler.movingShadow = $e.$6X(DayPilotScheduler.moving, DayPilotScheduler.drag.shadowType);
                };
                ev.cancelBubble = true;
            };
            if ($e.autoScroll === "Always" || ($e.autoScroll === "Drag" && (DayPilotScheduler.moving || DayPilotScheduler.resizing || DayPilotScheduler.range))) {
                var $4b = $e.nav.scroll;
                var $1a = {
                    x: $e.coords.x,
                    y: $e.coords.y
                };
                $1a.x -= $4b.scrollLeft;
                $1a.y -= $4b.scrollTop;
                var $X = $4b.clientWidth;
                var $P = $4b.clientHeight;
                var $20 = 20;
                var $x = $1a.x < $20;
                var $y = $X - $1a.x < $20;
                var top = $1a.y < $20;
                var $M = $P - $1a.y < $20;
                var x = 0;
                var y = 0;
                if ($x) {
                    x = -5;
                };
                if ($y) {
                    x = 5;
                };
                if (top) {
                    y = -5;
                };
                if ($M) {
                    y = 5;
                };
                if (x || y) {
                    $e.$8o(x, y);
                } else {
                    $e.$7n();
                }
            }
        };
        this.$8n = function() {
            this.$8p();
        };
        this.$7m = function() {
            this.divCrosshair.innerHTML = '';
            this.crosshairVertical = null;
            this.crosshairHorizontal = null;
            if (this.crosshairTop && this.crosshairTop.parentNode) {
                this.crosshairTop.parentNode.removeChild(this.crosshairTop);
                this.crosshairTop = null;
            };
            if (this.crosshairLeft) {
                for (var i = 0; i < this.crosshairLeft.length; i++) {
                    var ch = this.crosshairLeft[i];
                    if (ch.parentNode) {
                        ch.parentNode.removeChild(ch);
                    }
                };
                this.crosshairLeft = null;
            };
            this.crosshairLastX = -1;
            this.crosshairLastY = -1;
        };
        this.$8p = function() {
            var x, y;
            if ($e.coords && $e.rows && $e.rows.length > 0) {
                x = $e.$5T($e.coords.x).x;
                y = $e.$6R($e.coords.y).i;
                if (y >= $e.rows.length) {
                    return;
                }
            } else {
                return;
            };
            var $0w = this.crosshairType;
            var $t = this.$70(y);
            if ($0w === 'Full') {
                var $0i = this.itline[x];
                var $x = $0i.left;
                var $03 = this.crosshairVertical;
                if (!$03) {
                    var $03 = document.createElement("div");
                    $03.style.height = $e.innerHeightTree + 'px';
                    $03.style.position = 'absolute';
                    $03.style.top = '0px';
                    $03.style.backgroundColor = this.crosshairColor;
                    $03.style.opacity = this.crosshairOpacity / 100;
                    $03.style.filter = "alpha(opacity=" + this.crosshairOpacity + ")";
                    this.crosshairVertical = $03;
                    this.divCrosshair.appendChild($03);
                };
                $03.style.left = $x + 'px';
                $03.style.width = $0i.width + 'px';
                var top = $t.top;
                var $P = $t.height;
                var $X = this.$7O();
                var $03 = this.crosshairHorizontal;
                if (!$03) {
                    var $03 = document.createElement("div");
                    $03.style.width = $X + 'px';
                    $03.style.height = $P + 'px';
                    $03.style.position = 'absolute';
                    $03.style.top = top + 'px';
                    $03.style.left = '0px';
                    $03.style.backgroundColor = this.crosshairColor;
                    $03.style.opacity = this.crosshairOpacity / 100;
                    $03.style.filter = "alpha(opacity=" + this.crosshairOpacity + ")";
                    this.crosshairHorizontal = $03;
                    this.divCrosshair.appendChild($03);
                };
                $03.style.top = top + 'px';
                $03.style.height = $P + 'px';
            };
            var $4c = this.$8q(this.coords.x);
            if ($4c && this.crosshairLastX !== $4c.x) {
                if (this.crosshairTop && this.crosshairTop.parentNode) {
                    this.crosshairTop.parentNode.removeChild(this.crosshairTop);
                    this.crosshairTop = null;
                };
                var $03 = document.createElement("div");
                $03.style.width = $4c.cell.width + "px";
                $03.style.height = $04.headerHeight() + "px";
                $03.style.left = '0px';
                $03.style.top = '0px';
                $03.style.position = 'absolute';
                $03.style.backgroundColor = this.crosshairColor;
                $03.style.opacity = this.crosshairOpacity / 100;
                $03.style.filter = "alpha(opacity=" + this.crosshairOpacity + ")";
                this.crosshairTop = $03;
                var $3L = this.divNorth;
                var $4d = this.timeHeader ? this.timeHeader.length - 1 : 1;
                if (this.nav.timeHeader) {
                    this.$51.timeHeader[$4c.x + "_" + $4d].appendChild($03);
                } else {
                    if ($3L.firstChild.rows[$4d].cells[x]) {
                        $3L.firstChild.rows[$4d].cells[x].firstChild.appendChild($03);
                    }
                }
            };
            if (this.crosshairLastY !== y) {
                if (this.crosshairLeft) {
                    for (var i = 0; i < this.crosshairLeft.length; i++) {
                        var ch = this.crosshairLeft[i];
                        if (ch.parentNode) {
                            ch.parentNode.removeChild(ch);
                        }
                    };
                    this.crosshairLeft = null;
                };
                var $14 = this.rowHeaderCols ? this.rowHeaderCols.length : 1;
                this.crosshairLeft = [];
                for (var i = 0; i < this.divHeader.rows[$t.i].cells.length; i++) {
                    var $X = this.divHeader.rows[$t.i].cells[i].clientWidth;
                    var $03 = document.createElement("div");
                    $03.style.width = $X + "px";
                    $03.style.height = $t.height + "px";
                    $03.style.left = '0px';
                    $03.style.top = '0px';
                    $03.style.position = 'absolute';
                    $03.style.backgroundColor = this.crosshairColor;
                    $03.style.opacity = this.crosshairOpacity / 100;
                    $03.style.filter = "alpha(opacity=" + this.crosshairOpacity + ")";
                    this.crosshairLeft.push($03);
                    this.divHeader.rows[$t.i].cells[i].firstChild.appendChild($03);
                }
            };
            if ($4c) {
                this.crosshairLastX = $4c.x;
            };
            this.crosshairLastY = y;
        };
        this.$8q = function($s) {
            var $0f = this.timeHeader[this.timeHeader.length - 1];
            for (var i = 0; i < $0f.length; i++) {
                var $z = $0f[i];
                if ($s >= $z.left && $s < $z.left + $z.width) {
                    var $f = {};
                    $f.cell = $z;
                    $f.x = i;
                    return $f;
                }
            };
            return null;
        };
        this.$7R = function(ev) {
            ev = ev || window.event;
            if ($e.timeRangeSelectedHandling === 'Disabled') {
                return false;
            };
            if (!$e.$8m($e.coords)) {
                $e.$8r(ev);
            };
            if ($e.contextMenuSelection) {
                var $4e = $e.$8g(DayPilotScheduler.rangeHold);
                $e.contextMenuSelection.show($4e);
            };
            ev.cancelBubble = true;
            if (!$e.allowDefaultContextMenu) {
                return false;
            }
        };
        this.$8m = function($1a) {
            var $0P = DayPilotScheduler.rangeHold;
            if (!$0P || !$0P.start || !$0P.end) {
                return false;
            };
            var $t = this.$70($0P.start.y);
            var $4f = $0P.start.x < $0P.end.x;
            var $4g = ($4f ? $0P.start.x : $0P.end.x) * this.cellWidth;
            var $4h = ($4f ? $0P.end.x : $0P.start.x) * this.cellWidth + this.cellWidth;
            var $4i = $t.top;
            var $4j = $t.bottom;
            if ($1a.x >= $4g && $1a.x <= $4h && $1a.y >= $4i && $1a.y <= $4j) {
                return true;
            };
            return false;
        };
        this.$8f = function($0P) {
            var $0P = $0P || DayPilotScheduler.range;
            var $3F = $0P.end.x > $0P.start.x ? $0P.start.x : $0P.end.x;
            var $3G = ($0P.end.x > $0P.start.x ? $0P.end.x : $0P.start.x) + 1;
            this.$5o();
            for (var x = $3F; x < $3G; x++) {
                this.$8s(x, $0P.start.y);
            }
        };
        this.$8r = function(ev) {
            if ($e.timeRangeSelectedHandling === 'Disabled') {
                return false;
            };
            ev = ev || window.event;
            var $3u = ev.which || ev.button;
            if (DayPilotScheduler.range) {
                return;
            };
            if (DayPilotScheduler.rangeHold && $e.$8m($e.coords) && ($3u === 3 || $3u === 2)) {
                return;
            };
            var $0P = {};
            var cx = this.$5T($e.coords.x).x;
            $0P.start = {
                y: $e.$6R($e.coords.y).i,
                x: cx
            };
            $0P.end = {
                x: cx
            };
            $e.$8f($0P);
            var $3w = $e.$8g($0P);
            $e.$6y($3w.start, $3w.end, $3w.resource);
            DayPilotScheduler.rangeHold = $0P;
        };
        this.timeouts = {};
        this.timeouts.drawEvents = null;
        this.timeouts.drawCells = null;
        this.timeouts.click = null;
        this.$7Y = function(ev) {
            $e.$5s();
            if ($e.dynamicLoading) {
                $e.$8t();
                return;
            };
            var $4k = $e.nav.scroll;
            $e.scrollPos = $4k.scrollLeft;
            $e.scrollTop = $4k.scrollTop;
            $e.scrollWidth = $4k.clientWidth;
            $e.divTimeScroll.scrollLeft = $e.scrollPos;
            $e.divResScroll.scrollTop = $e.scrollTop;
            if ($e.timeouts.drawEvents) {
                clearTimeout($e.timeouts.drawEvents);
            };
            $e.timeouts.drawEvents = setTimeout($e.$8u(), 200);
            $e.$5p();
            $e.$5k();
            $e.$5z();
            $e.onScrollCalled = true;
        };
        this.$8v = function() {
            return function() {
                $e.$5p();
                $e.$5k();
                $e.refreshTimeout = window.setTimeout($e.$8u(), 200);
            };
        };
        this.$8w = function() {
            return function() {
                $e.$5p();
                $e.$5k();
            };
        };
        this.$8u = function() {
            var $0K = true;
            var $4l = $e.dynamicEventRenderingCacheSweeping;
            var $4m = $e.dynamicEventRenderingCacheSize;
            return function() {
                if ($e.$85()) {
                    $e.$6K();
                    window.setTimeout(function() {
                        if ($4l) $e.$82($4m);
                        window.setTimeout(function() {
                            $e.$5m($0K);
                        }, 50);
                    }, 50);
                } else {
                    $e.$5A();
                }
            };
        };
        this.$5s = function() {
            this.$51.eventHeight = null;
            this.$51.drawArea = null;
        };
        this.show = function() {
            $e.nav.top.style.display = '';
            this.$6W();
            $e.$7Y();
        };
        this.hide = function() {
            $e.nav.top.style.display = 'none';
        };
        this.$8t = function() {
            var $4k = $e.nav.scroll;
            $e.scrollPos = $4k.scrollLeft;
            $e.scrollTop = $4k.scrollTop;
            $e.scrollWidth = $4k.clientWidth;
            $e.divTimeScroll.scrollLeft = $e.scrollPos;
            $e.divResScroll.scrollTop = $e.scrollTop;
            if ($e.refreshTimeout) {
                window.clearTimeout($e.refreshTimeout);
            };
            var $I = $e.scrollDelay || 500;
            $e.refreshTimeout = window.setTimeout($e.$8x($4k.scrollLeft, $4k.scrollTop), $I);
        };
        this.$8x = function(scrollX, scrollY) {
            if (!$e.$5L()) {
                return function() {
                    if (typeof $e.onScroll === 'function') {
                        $e.$5k();
                        var $4n = function($0B) {
                            var $k = $e.$59($0B, true);
                            var $4o = function() {
                                if ($e.$5t()) {
                                    if (typeof $e.onAfterRender === 'function') {
                                        var $q = {};
                                        $q.isCallBack = false;
                                        $q.isScroll = true;
                                        $q.data = null;
                                        $e.onAfterRender($q);
                                    }
                                }
                            };
                            $e.$5g();
                            $e.$5n($k, true, $4o);
                        };
                        var $u = $e.$6N(scrollX, scrollY);
                        var $0P = $e.$6O($u);
                        var $0X = $e.$6P($u);
                        var $q = {};
                        $q.viewport = {};
                        $q.viewport.start = $0P.start;
                        $q.viewport.end = $0P.end;
                        $q.viewport.resources = $0X;
                        $q.async = false;
                        $q.events = [];
                        $q.loaded = function() {
                            if (this.async) {
                                $4n(this.events);
                            }
                        };
                        $e.onScroll($q);
                        if (!$q.async) {
                            $4n($q.events);
                        }
                    }
                };
            } else {
                return function() {
                    $e.scrollX = scrollX;
                    $e.scrollY = scrollY;
                    $e.$5Z('Scroll');
                };
            }
        };
        this.$8y = function() {
            var $u = this.$5x();
            var $4p = $u.xStart;
            var $4q = $u.xEnd - $u.xStart;
            var $4r = $u.yStart;
            var $4s = $u.yEnd - $u.yStart;
            if (!this.cellProperties) {
                this.cellProperties = [];
            };
            for (var i = 0; i < $4q; i++) {
                var x = $4p + i;
                for (var j = 0; j < $4s; j++) {
                    var y = $4r + j;
                    if (!this.rows[y].Hidden) {
                        this.$75(x, y);
                    }
                };
                this.$8z(x);
            };
            for (var y = 0; y < this.rows.length; y++) {
                if (!this.rows[y].Hidden) {
                    this.$8A(y);
                }
            }
        };
        this.sweepCells = true;
        this.$5k = function() {
            if (this.rows !== null && this.rows.length > 0) {
                if (this.sweepCells) {
                    var $4m = 0;
                    this.$84($4m);
                };
                this.$8y();
                this.$8B();
            };
            var $X = this.$5E() * this.cellWidth;
            this.maind.style.height = this.innerHeightTree + "px";
            this.maind.style.width = $X + "px";
            this.rowsDirty = false;
        };
        this.$8B = function() {
            var $u = this.$5x();
            for (var x = $u.xStart; x < $u.xEnd; x++) {
                var $4t = (x < this.itline.length - 1) ? this.itline[x + 1].breakBefore : false;
                if ($4t) {
                    this.$8C(x);
                }
            }
        };
        this.$8C = function(x) {
            var $1e = "x" + x;
            if (this.$51.breaks[$1e]) {
                return;
            };
            var $x = x * this.cellWidth + this.cellWidth - 1;
            var $P = this.innerHeightTree;
            var $03 = document.createElement("div");
            $03.style.left = $x + "px";
            $03.style.top = "0px";
            $03.style.width = "1px";
            $03.style.height = $P + "px";
            $03.style.fontSize = '1px';
            $03.style.lineHeight = '1px';
            $03.style.overflow = 'hidden';
            $03.style.position = 'absolute';
            $03.setAttribute("unselectable", "on");
            if (this.cssOnly) {
                $03.className = this.$5D("_matrix_vertical_break");
            } else {
                $03.style.backgroundColor = this.timeBreakColor;
            };
            this.divBreaks.appendChild($03);
            this.elements.breaks.push($03);
            this.$51.breaks[$1e] = $03;
        };
        this.$5x = function() {
            if ($e.$51.drawArea) {
                return $e.$51.drawArea;
            };
            var $4u = 30;
            var $4v = $e.scrollTop;
            var $u = {};
            var $4w = Math.floor(this.scrollPos / this.cellWidth);
            var $4x = Math.ceil(this.scrollWidth / this.cellWidth) + 1;
            var $1T = this.$5E();
            var $v = $4w - $4u;
            var end = $v + 2 * $4u + $4x;
            end = Math.min(end, $1T);
            $v = Math.max($v, 0);
            var $4r = this.$6R($4v).i;
            var $4y = this.$6R($4v + this.nav.scroll.offsetHeight).i;
            if ($4y < this.rows.length) {
                $4y++;
            };
            var $4s = $4y - $4r;
            $u.xStart = $v;
            $u.xEnd = end;
            $u.yStart = $4r;
            $u.yEnd = $4y;
            $u.pixels = {};
            $u.pixels.left = this.nav.scroll.scrollLeft;
            $u.pixels.right = this.nav.scroll.scrollLeft + this.nav.scroll.clientWidth;
            $u.pixels.top = this.nav.scroll.scrollTop;
            $u.pixels.bottom = this.nav.scroll.scrollTop + this.nav.scroll.clientHeight;
            $u.pixels.width = this.nav.scroll.scrollWidth;
            $e.$51.drawArea = $u;
            return $u;
        };
        this.$7O = function() {
            if (this.viewType === "Days") {
                return 24 * 60 / this.cellDuration * this.cellWidth;
            } else {
                var $0f = this.itline[this.itline.length - 1];
                if (!$0f) {
                    return 0;
                };
                return $0f.left + $0f.width;
            }
        };
        this.$8A = function(y) {
            var $1e = "y" + y;
            if (this.$51.linesHorizontal[y]) {
                $e.debug.message("skiping horiz line: " + y);
                return;
            };
            var top = this.rows[y].Top + this.rows[y].Height - 1;
            var $X = this.$7O();
            var $03 = document.createElement("div");
            $03.style.left = "0px";
            $03.style.top = top + "px";
            $03.style.width = $X + "px";
            $03.style.height = "1px";
            $03.style.fontSize = '1px';
            $03.style.lineHeight = '1px';
            $03.style.overflow = 'hidden';
            $03.style.position = 'absolute';
            if (!this.cssOnly) {
                $03.style.backgroundColor = this.cellBorderColor;
            };
            $03.setAttribute("unselectable", "on");
            if (this.cssOnly) {
                $03.className = this.$5D("_matrix_horizontal_line");
            };
            this.divLines.appendChild($03);
            this.$51.linesHorizontal[$1e] = $03;
        };
        this.$8z = function(x) {
            var $0i = this.itline[x];
            if (!$0i) {
                return;
            };
            var $1e = "x" + x;
            if (this.$51.linesVertical[$1e]) {
                return;
            };
            var $x = $0i.left + $0i.width - 1;
            var $03 = document.createElement("div");
            $03.style.left = $x + "px";
            $03.style.top = "0px";
            $03.style.width = "1px";
            $03.style.height = $e.innerHeightTree + "px";
            $03.style.fontSize = '1px';
            $03.style.lineHeight = '1px';
            $03.style.overflow = 'hidden';
            $03.style.position = 'absolute';
            if (!this.cssOnly) {
                $03.style.backgroundColor = this.cellBorderColor;
            };
            $03.setAttribute("unselectable", "on");
            if (this.cssOnly) {
                $03.className = this.$5D("_matrix_vertical_line");
            };
            this.divLines.appendChild($03);
            this.elements.linesVertical.push($03);
            this.$51.linesVertical[$1e] = $03;
        };
        this.$8D = function(x) {
            var $1e = "x" + x;
            var $P = this.innerHeightTree;
            if (this.$51.cells[$1e]) {
                return;
            };
            var $3Y = this.$8E(x, 0);
            var $4t = (x < this.itline.length - 1) ? this.itline[x + 1].breakBefore : false;
            var $z = document.createElement("div");
            $z.style.left = (x * this.cellWidth) + "px";
            $z.style.top = "0px";
            $z.style.width = (this.cellWidth) + "px";
            $z.style.height = $P + "px";
            $z.style.position = 'absolute';
            $z.style.backgroundColor = $3Y;
            $z.setAttribute("unselectable", "on");
            $z.className = this.cssOnly ? this.$5D('_cellcolumn') : this.$5D('cellbackground');
            $z.onclick = this.$8r;
            this.divCells.appendChild($z);
            this.elements.cells.push($z);
            this.$51.cells[$1e] = '1';
        };
        this.$7e = function($1e) {
            var $t = this.rows[$1e];
            var $4z = !$t.Expanded;
            this.rows[$1e].Expanded = $4z;
            var $0A = this.$8F($1e, $t.Expanded);
            if (!$4z) {
                for (var i = 0; i < $0A.length; i++) {
                    var ri = $0A[i];
                    this.$6r(ri);
                }
            };
            this.$5c();
            this.$5a();
            this.$5g();
            this.$5h();
            this.$5k();
            if ($4z) {
                for (var i = 0; i < $0A.length; i++) {
                    var ri = $0A[i];
                    this.$6s(ri);
                }
            };
            this.$6t();
            this.$5p();
            var r = this.$7t($t, $1e);
            if ($4z) {
                this.$6F(r);
            } else {
                this.$6E(r);
            };
            this.$5s();
        };
        this.$7s = function(i) {
            var $0s = {};
            $0s.index = i;
            if (typeof this.onLoadNode === 'function') {
                var $q = {};
                var $0O = this.rows[i].Resource;
                $q.resource = $0O;
                $q.async = false;
                $q.loaded = function() {
                    if (this.async) {
                        $0O.dynamicChildren = false;
                        $0O.expanded = true;
                        $e.update();
                    }
                };
                this.onLoadNode($q);
                if (!$q.async) {
                    $0O.dynamicChildren = false;
                    $0O.expanded = true;
                    this.update();
                }
            } else {
                this.$5Z('LoadNode', $0s);
            }
        };
        this.$8F = function(i, $4A) {
            var $t = this.rows[i];
            var $4B = [];
            if ($t.Children === null || $t.Children.length === 0) {
                return $4B;
            };
            for (var k = 0; k < $t.Children.length; k++) {
                var $1e = $t.Children[k];
                this.rows[$1e].Hidden = $4A ? !$t.Expanded : true;
                if ($4A === !this.rows[$1e].Hidden) {
                    $4B.push($1e);
                };
                var $4C = this.$8F($1e, $4A);
                if ($4C.length > 0) {
                    $4B = $4B.concat($4C);
                }
            };
            return $4B;
        };
        this.$8o = function($4D, $4E) {
            this.$7n();
            this.$8G($4D, $4E);
        };
        this.$8H = function($32) {
            if (!$32) {
                return false;
            };
            var $R = this.nav.scroll.scrollWidth;
            var $v = this.nav.scroll.scrollLeft;
            var $X = this.nav.scroll.clientWidth;
            var $y = $v + $X;
            if ($32 < 0 && $v <= 0) {
                return false;
            };
            if ($32 > 0 && $y >= $R) {
                return false;
            };
            this.nav.scroll.scrollLeft += $32;
            return true;
        };
        this.$8I = function($32) {
            if (!$32) {
                return false;
            };
            var $R = this.nav.scroll.scrollHeight;
            var $v = this.nav.scroll.scrollTop;
            var $P = this.nav.scroll.clientHeight;
            var $M = $v + $P;
            if ($32 < 0 && $v <= 0) {
                return false;
            };
            if ($32 > 0 && $M >= $R) {
                return false;
            };
            this.nav.scroll.scrollTop += $32;
            return true;
        };
        this.$8G = function($4D, $4E) {
            var $4F = this.$8H($4D) || this.$8I($4E);
            if (!$4F) {
                return;
            };
            var $4G = function($4D, $4E) {
                return function() {
                    $e.$8G($4D, $4E);
                };
            };
            this.scrolling = window.setTimeout($4G($4D, $4E), 100);
        };
        this.$7n = function() {
            if (this.scrolling) {
                window.clearTimeout(this.scrolling);
                this.scrolling = null;
            }
        };
        this.$5c = function() {
            var top = 0;
            for (var i = 0; i < this.rows.length; i++) {
                var $t = this.rows[i];
                if (!$t.Hidden) {
                    $t.Top = top;
                    top += $t.Height;
                }
            };
            this.innerHeightTree = top;
        };
        this.$5h = function() {
            this.elements.cells = [];
            this.elements.linesVertical = [];
            this.elements.breaks = [];
            this.$51.cells = [];
            this.$51.linesVertical = [];
            this.$51.linesHorizontal = [];
            this.$51.breaks = [];
            this.divCells.innerHTML = '';
            this.divLines.innerHTML = '';
            this.divBreaks.innerHTML = '';
        };
        this.$75 = function(x, y) {
            var $0i = this.itline[x];
            if (!$0i) {
                return;
            };
            var $1e = x + '_' + y;
            if (this.$51.cells[$1e]) {
                return;
            };
            if (typeof this.onBeforeCellRender === 'function') {
                var $t = $e.rows[y];
                var $0O = $t.Value;
                var $1E = $t.Start.getTime() - this.startDate.getTime();
                var $v = $0i.start.addTime($1E);
                var end = $0i.end.addTime($1E);
                var $z = this.cellProperties[$1e];
                if (!$z) {
                    $z = {};
                    var $4H = {};
                    $4H.start = $v;
                    $4H.end = end;
                    $4H.resource = $0O;
                    $z.cssClass = null;
                    $z.html = null;
                    $z.backImage = null;
                    $z.backRepeat = null;
                    $z.backColor = null;
                    $z.business = this.isBusiness($4H);
                    if (!this.cssOnly) {
                        $z.backColor = $z.business ? this.cellBackColor : this.cellBackColorNonBusiness;
                    };
                    this.cellProperties[$1e] = $z;
                };
                $z.resource = $0O;
                $z.start = $v;
                $z.end = end;
                var $q = {};
                $q.cell = $z;
                this.onBeforeCellRender($q);
            };
            if (!this.cellProperties[$1e]) {
                var $t = $e.rows[y];
                var $0O = $t.Value;
                var $1E = $t.Start.getTime() - this.startDate.getTime();
                var $v = $0i.start.addTime($1E);
                var end = $0i.end.addTime($1E);
                var $4I = {};
                $4I.start = $v;
                $4I.end = end;
                $4I.resource = $0O;
                var $z = {};
                $z.business = this.isBusiness($4I);
                if (!this.cssOnly) {
                    $z.backColor = $z.business ? this.cellBackColor : this.cellBackColorNonBusiness;
                };
                this.cellProperties[$1e] = $z;
            };
            var p = this.$76(x, y);
            if (!this.drawBlankCells) {
                var $4J = false;
                if (this.cssOnly && this.$7b(y)) {
                    $4J = false;
                } else if (!this.$8J(p, ['html', 'cssClass', 'backColor', 'backImage', 'backRepeat'])) {
                    $4J = true;
                };
                if ($4J) {
                    return;
                }
            };
            var $z = document.createElement("div");
            $z.style.left = ($0i.left) + "px";
            $z.style.top = this.rows[y].Top + "px";
            $z.style.width = ($0i.width) + "px";
            $z.style.height = (this.rows[y].Height) + "px";
            $z.style.position = 'absolute';
            if (p && p.backColor) {
                $z.style.backgroundColor = p.backColor;
            };
            $z.setAttribute("unselectable", "on");
            $z.className = this.cssOnly ? this.$5D('_cell') : this.$5D('cellbackground');
            $z.coords = {};
            $z.coords.x = x;
            $z.coords.y = y;
            if (this.cssOnly && this.$7b(y)) {
                DayPilot.Util.addClass($z, this.$5D("_cellparent"));
            };
            if (p) {
                if (p.cssClass) {
                    if (this.cssOnly) {
                        DayPilot.Util.addClass($z, p.cssClass);
                    } else {
                        DayPilot.Util.addClass($z, $e.$5D(p.cssClass));
                    }
                };
                if (p.html) {
                    $z.innerHTML = p.html;
                };
                if (p.backImage) {
                    $z.style.backgroundImage = "url(\"" + p.backImage + "\")";
                };
                if (p.backRepeat) {
                    $z.style.backgroundRepeat = p.backRepeat;
                };
                if (p.business) {
                    DayPilot.Util.addClass($z, $e.$5D("_cell_business"));
                }
            };
            $z.onclick = this.$8r;
            this.divCells.appendChild($z);
            this.elements.cells.push($z);
            this.$51.cells[$1e] = $z;
        };
        this.$8J = function($18, $2M) {
            if ($2M) {
                for (var i = 0; i < $2M.length; i++) {
                    if ($18[$2M[i]]) {
                        return true;
                    }
                }
            } else {
                for (var name in $18) {
                    if ($18[name]) {
                        return true;
                    }
                }
            };
            return false;
        };
        this.$8s = function(x, y) {
            var $0i = this.itline[x];
            var $z = document.createElement("div");
            $z.style.left = ($0i.left) + "px";
            $z.style.top = this.rows[y].Top + "px";
            $z.style.width = ($0i.width - 1) + "px";
            $z.style.height = (this.rows[y].Height - 1) + "px";
            $z.style.position = 'absolute';
            $z.style.backgroundColor = $e.cellSelectColor;
            $z.setAttribute("unselectable", "on");
            this.divRange.appendChild($z);
            this.elements.range.push($z);
        };
        this.clearSelection = function() {
            this.$5o();
        };
        this.cleanSelection = this.clearSelection;
        this.$5o = function() {
            this.divRange.innerHTML = '<div style="position:absolute; left:0px; top:0px; width:0px; height:0px;"></div>';
            this.elements.range = [];
            DayPilotScheduler.rangeHold = null;
        };
        this.$6Z = {};
        var $04 = this.$6Z;
        $04.locale = function() {
            return DayPilot.Locale.find($e.locale);
        };
        $04.timeFormat = function() {
            if ($e.timeFormat !== 'Auto') {
                return $e.timeFormat;
            };
            return $04.locale().timeFormat;
        };
        $04.weekStarts = function() {
            if ($e.weekStarts === 'Auto') {
                var $2n = $04.locale();
                if ($2n) {
                    return $2n.weekStarts;
                } else {
                    return 0;
                }
            } else {
                return $e.weekStarts;
            }
        };
        $04.rounded = function() {
            return $e.eventCorners === 'Rounded';
        };
        $04.layout = function() {
            var $4K = /MSIE 6/i.test(navigator.userAgent);
            if ($e.layout === 'Auto') {
                if ($4K) {
                    return 'TableBased';
                } else {
                    return 'DivBased';
                }
            };
            return $e.layout;
        };
        $04.notifyType = function() {
            var $0w;
            if ($e.notifyCommit === 'Immediate') {
                $0w = "Notify";
            } else if ($e.notifyCommit === 'Queue') {
                $0w = "Queue";
            } else {
                throw "Invalid notifyCommit value: " + $e.notifyCommit;
            };
            return $0w;
        };
        $04.isResourcesView = function() {
            return $e.viewType !== 'Days';
        };
        $04.useBox = function($4L) {
            if ($e.useEventBoxes === 'Always') {
                return true;
            };
            if ($e.useEventBoxes === 'Never') {
                return false;
            };
            return $4L < $e.cellDuration * 60 * 1000;
        };
        $04.eventHeight = function() {
            if ($e.$51.eventHeight) {
                return $e.$51.eventHeight;
            };
            var $P = $e.$7U("_event_height").height;
            if (!$P) {
                $P = $e.eventHeight;
            };
            $e.$51.eventHeight = $P;
            return $P;
        };
        $04.headerHeight = function() {
            if ($e.$51.headerHeight) {
                return $e.$51.headerHeight;
            };
            var $P = $e.$7U("_header_height").height;
            if (!$P) {
                $P = $e.headerHeight;
            };
            $e.$51.headerHeight = $P;
            return $P;
        };
        this.$8E = function(x, y) {
            var $1e = x + '_' + y;
            if (this.cellProperties && this.cellProperties[$1e]) {
                return this.cellProperties[$1e].backColor;
            };
            return null;
        };
        this.$76 = function(x, y) {
            var $1e = x + '_' + y;
            if (this.cellProperties && this.cellProperties[$1e]) {
                return this.cellProperties[$1e];
            };
            return null;
        };
        this.$8K = function($4M, x, y) {
            var $1e = x + '_' + y;
            this.cellProperties[$1e] = {};
            DayPilot.Util.copyProps($4M, this.cellProperties[$1e], ['html', 'cssClass', 'backColor', 'backImage', 'backRepeat', 'business']);
            return this.cellProperties[$1e];
        };
        this.$8L = function(x, y) {
            if (!this.cellConfig) {
                return;
            };
            var $4N = this.cellConfig;
            if ($4N.vertical) {
                return this.cellProperties[x + "_0"];
            };
            if ($4N.horizontal) {
                return this.cellProperties["0_" + y];
            };
            if ($4N["default"]) {
                return $4N["default"];
            }
        };
        this.$58 = function() {
            if (!this.cellConfig) {
                return;
            };
            var $4N = this.cellConfig;
            if ($4N.vertical) {
                for (var x = 0; x < $4N.x; x++) {
                    var $4O = this.cellProperties[x + "_0"];
                    if (!$4O) {
                        continue;
                    };
                    for (var y = 1; y < $4N.y; y++) {
                        this.$8K($4O, x, y);
                    }
                }
            };
            if ($4N.horizontal) {
                for (var y = 0; y < $4N.y; y++) {
                    var $4O = this.cellProperties["0_" + y];
                    if (!$4O) {
                        continue;
                    };
                    for (var x = 1; x < $4N.x; x++) {
                        this.$8K($4O, x, y);
                    }
                }
            };
            if ($4N["default"]) {
                var $4O = $4N["default"];
                for (var y = 0; y < $4N.y; y++) {
                    for (var x = 0; x < $4N.x; x++) {
                        if (!this.cellProperties[x + "_" + y]) {
                            this.$8K($4O, x, y);
                        }
                    }
                }
            }
        };
        this.isBusiness = function($z) {
            if ($z.start.dayOfWeek() === 0 || $z.start.dayOfWeek() === 6) {
                return false;
            };
            var $v = $z.start;
            var end = $z.end;
            var $05 = (end.getTime() - $v.getTime()) / (1000 * 60);
            if ($05 < 720) {
                if ($z.start.getHours() < this.businessBeginsHour || $z.start.getHours() >= this.businessEndsHour) {
                    return false;
                } else {
                    return true;
                }
            };
            return true;
        };
        this.$5d = function() {
            if (this.nav.top.style.visibility === 'hidden') {
                this.nav.top.style.visibility = 'visible';
            }
        };
        this.$7i = function() {
            var el = $e.nav.top;
            return el.offsetWidth > 0 && el.offsetHeight > 0;
        };
        this.$8M = function() {
            var $3e = $e.$7i;
            if (!$3e()) {
                $e.debug.message("Not visible during init, starting visibilityInterval");
                $e.$8N = setInterval(function() {
                    if ($3e()) {
                        $e.debug.message("Made visible, calling .show()");
                        $e.show();
                        $e.$7h();
                        clearInterval($e.$8N);
                    }
                }, 100);
            }
        };
        this.$8O = function($s) {
            if (this.heightSpec !== "Parent100Pct") {
                this.heightSpec = "Fixed";
            };
            this.height = $s - (this.$5F() + 2);
            this.$5g();
        };
        this.setHeight = this.$8O;
        this.$5u = function(id) {
            for (var i = 0; i < this.rows.length; i++) {
                if (this.rows[i].Value === id) {
                    return this.rows[i];
                }
            };
            return null;
        };
        this.$8P = function() {
            this.$7T();
            this.$57();
            this.$7F();
            this.$6W();
            this.$7W();
            this.$6V();
            DayPilotScheduler.register(this);
            this.$54(null, false);
            this.$7X();
            this.$8M();
            this.$5r();
            this.$5Z('Init');
        };
        this.init = function() {
            this.nav.top = document.getElementById(id);
            if (this.nav.top.dp) {
                return;
            };
            var $4P = this.$71();
            var $4Q = this.events.list !== null;
            if ($4P) {
                this.$8P();
                this.initialized = true;
                this.$5s();
                return;
            };
            this.$7T();
            this.$56();
            this.$57();
            this.$58();
            this.$7F();
            this.$55();
            this.$5b();
            this.$6K();
            if ($4Q) {
                this.$59();
            } else {
                this.events.list = [];
            };
            this.$5c();
            this.$5a();
            this.$5g();
            this.$5l();
            this.$6W();
            this.$5d();
            this.$7W();
            this.$6V();
            DayPilotScheduler.register(this);
            this.$7X();
            this.$53();
            if ($e.scrollToDate) {
                $e.scrollTo($e.scrollToDate);
            } else {
                $e.setScroll($e.scrollX, $e.scrollY);
            };
            if (!$e.onScrollCalled) {
                $e.$7Y();
            };
            var $4R = function() {
                if ($e.scrollY) {
                    $e.setScroll($e.scrollX, $e.scrollY);
                }
            };
            window.setTimeout($4R, 200);
            if (this.messageHTML) {
                var $4S = function($1l) {
                    return function() {
                        $e.message($1l);
                    };
                };
                window.setTimeout($4S(this.messageHTML), 100);
            };
            this.$8M();
            this.$5r();
            this.initialized = true;
            this.$5s();
            this.$54(null, false);
            this.debug.message("Init complete.");
        };
        this.temp = {};
        this.temp.getPosition = function() {
            var x = Math.floor($e.coords.x / $e.cellWidth);
            var y = $e.$6R($e.coords.y).i;
            if (y < $e.rows.length) {
                var $z = {};
                $z.start = $e.itline[x].start;
                $z.end = $e.itline[x].end;
                $z.resource = $e.rows[y].Value;
                return $z;
            } else {
                return null;
            }
        };
        this.internal = {};
        this.internal.invokeEvent = this.$68;
        this.internal.eventMenuClick = this.$6x;
        this.internal.timeRangeMenuClick = this.$6A;
        this.internal.resourceHeaderMenuClick = this.$6B;
        this.internal.bubbleCallBack = this.$6v;
        this.internal.findEventDiv = this.$8a;
        this.Init = this.init;
    };
    DayPilotScheduler.moving = null;
    DayPilotScheduler.originalMouse = null;
    DayPilotScheduler.resizing = null;
    DayPilotScheduler.globalHandlers = false;
    DayPilotScheduler.timeRangeTimeout = null;
    DayPilotScheduler.selectedCells = null;
    DayPilotScheduler.dragStart = function(element, $0l, id, $21, $0w) {
        DayPilot.us(element);
        var $4T = DayPilotScheduler.drag = {};
        $4T.element = element;
        $4T.duration = $0l;
        $4T.text = $21;
        $4T.id = id;
        $4T.shadowType = $0w ? $0w : 'Fill';
        return false;
    };
    DayPilotScheduler.dragStop = function() {
        if (DayPilotScheduler.gShadow) {
            document.body.removeChild(DayPilotScheduler.gShadow);
            DayPilotScheduler.gShadow = null;
        };
        DayPilotScheduler.drag = null;
    };
    DayPilotScheduler.register = function($e) {
        if (!DayPilotScheduler.registered) {
            DayPilotScheduler.registered = [];
        };
        for (var i = 0; i < DayPilotScheduler.registered.length; i++) {
            if (DayPilotScheduler.registered[i] === $e) {
                return;
            }
        };
        DayPilotScheduler.registered.push($e);
    };
    DayPilotScheduler.unregister = function($e) {
        var a = DayPilotScheduler.registered;
        if (a) {
            var i = DayPilot.indexOf(a, $e);
            if (i !== -1) {
                a.splice(i, 1);
            };
            if (a.length === 0) {
                a = null;
            }
        };
        if (!a) {
            DayPilot.ue(document, 'mousemove', DayPilotScheduler.gMouseMove);
            DayPilot.ue(document, 'mouseup', DayPilotScheduler.gMouseUp);
            DayPilotScheduler.globalHandlers = false;
        }
    };
    DayPilotScheduler.gMouseMove = function(ev) {
        if (typeof(DayPilotScheduler) === 'undefined') {
            return;
        };
        ev = ev || window.event;
        if (ev.insideMainD) {
            return;
        } else if (ev.srcElement) {
            if (ev.srcElement.inside) {
                return;
            }
        };
        var $40 = DayPilot.mc(ev);
        if (DayPilotScheduler.drag) {
            document.body.style.cursor = 'move';
            if (!DayPilotScheduler.gShadow) {
                DayPilotScheduler.gShadow = DayPilotScheduler.createGShadow(DayPilotScheduler.drag.shadowType);
            };
            var $1b = DayPilotScheduler.gShadow;
            $1b.style.left = $40.x + 'px';
            $1b.style.top = $40.y + 'px';
            DayPilotScheduler.moving = null;
            if (DayPilotScheduler.movingShadow) {
                DayPilotScheduler.movingShadow.calendar = null;
                DayPilot.de(DayPilotScheduler.movingShadow);
                DayPilotScheduler.movingShadow = null;
            }
        } else if (DayPilotScheduler.moving && DayPilotScheduler.moving.event.calendar.dragOutAllowed && !DayPilotScheduler.drag) {
            var $4U = DayPilotScheduler.moving.event.calendar;
            var ev = DayPilotScheduler.moving.event;
            DayPilotScheduler.moving.target = null;
            document.body.style.cursor = 'move';
            if (!DayPilotScheduler.gShadow) {
                DayPilotScheduler.gShadow = DayPilotScheduler.createGShadow($4U.shadow);
            };
            var $1b = DayPilotScheduler.gShadow;
            $1b.style.left = $40.x + 'px';
            $1b.style.top = $40.y + 'px';
            DayPilotScheduler.drag = {};
            var $4T = DayPilotScheduler.drag;
            $4T.element = null;
            $4T.duration = (ev.end().getTime() - ev.start().getTime()) / 1000;
            $4T.text = ev.text();
            $4T.id = ev.value();
            $4T.shadowType = $4U.shadow;
            $4T.event = ev;
            DayPilot.de(DayPilotScheduler.movingShadow);
            DayPilotScheduler.movingShadow.calendar = null;
            DayPilotScheduler.movingShadow = null;
        };
        for (var i = 0; i < DayPilotScheduler.registered.length; i++) {
            if (DayPilotScheduler.registered[i].$7N) {
                DayPilotScheduler.registered[i].$7N();
            }
        }
    };
    DayPilotScheduler.gUnload = function(ev) {
        if (!DayPilotScheduler.registered) {
            return;
        };
        for (var i = 0; i < DayPilotScheduler.registered.length; i++) {
            var c = DayPilotScheduler.registered[i];
            DayPilotScheduler.unregister(c);
        }
    };
    DayPilotScheduler.gMouseUp = function(ev) {
        if (DayPilotScheduler.resizing) {
            if (!DayPilotScheduler.resizingShadow) {
                document.body.style.cursor = '';
                DayPilotScheduler.resizing = null;
                return;
            };
            var e = DayPilotScheduler.resizing.event;
            var $e = e.calendar;
            var $4V = DayPilotScheduler.resizingShadow.clientWidth;
            var $4W = DayPilotScheduler.resizingShadow.offsetLeft;
            var $20 = DayPilotScheduler.resizing.dpBorder;
            var $t = $e.rows[DayPilotScheduler.resizing.event.part.dayIndex];
            var $1E = $t.Start.getTime() - $e.$7w().getTime();
            var $0u = null;
            var $0v = null;
            var $4X = !$e.snapToGrid;
            if ($20 === 'left') {
                $0u = $e.getDate($4W, $4X).addTime($1E);
                $0v = e.end();
            } else if ($20 === 'right') {
                $0u = e.start();
                $0v = $e.getDate($4W + $4V, $4X, true).addTime($1E);
            };
            DayPilot.de(DayPilotScheduler.resizingShadow);
            DayPilotScheduler.resizing = null;
            DayPilotScheduler.resizingShadow = null;
            document.body.style.cursor = '';
            $e.$69(e, $0u, $0v);
        } else if (DayPilotScheduler.moving) {
            if (!DayPilotScheduler.movingShadow) {
                document.body.style.cursor = '';
                DayPilotScheduler.moving = null;
                return;
            };
            var e = DayPilotScheduler.moving.event;
            var $e = DayPilotScheduler.moving.target;
            if (!$e) {
                DayPilot.de(DayPilotScheduler.movingShadow);
                DayPilotScheduler.movingShadow.calendar = null;
                document.body.style.cursor = '';
                DayPilotScheduler.moving = null;
                return;
            };
            var $0u = DayPilotScheduler.movingShadow.start;
            var $0v = DayPilotScheduler.movingShadow.end;
            var $0x = ($e.viewType !== 'Days') ? DayPilotScheduler.movingShadow.row.Value : null;
            var external = DayPilotScheduler.drag ? true : false;
            var $03 = DayPilotScheduler.movingShadow.line;
            if (DayPilotScheduler.drag) {
                if (!$e.todo) {
                    $e.todo = {};
                };
                $e.todo.del = DayPilotScheduler.drag.element;
                DayPilotScheduler.drag = null;
            };
            DayPilot.de(DayPilotScheduler.movingShadow);
            DayPilotScheduler.movingShadow.calendar = null;
            document.body.style.cursor = '';
            DayPilotScheduler.moving = null;
            DayPilotScheduler.movingShadow = null;
            var ev = ev || window.event;
            $e.$6u(e, $0u, $0v, $0x, external, ev, $03);
        } else if (DayPilotScheduler.range) {
            ev = ev || window.event;
            var $3u = ev.which || ev.button;
            var $0P = DayPilotScheduler.range;
            var $e = $0P.calendar;
            if (DayPilotScheduler.timeRangeTimeout) {
                clearTimeout(DayPilotScheduler.timeRangeTimeout);
                DayPilotScheduler.timeRangeTimeout = null;
                $e.$7S(ev);
                return;
            };
            DayPilotScheduler.rangeHold = $0P;
            DayPilotScheduler.range = null;
            var $4G = function($3w) {
                return function() {
                    DayPilotScheduler.timeRangeTimeout = null;
                    $e.$6y($3w.start, $3w.end, $3w.resource);
                    if ($e.timeRangeSelectedHandling !== "Hold" && $e.timeRangeSelectedHandling !== "HoldForever") {
                        $c();
                    } else {
                        DayPilotScheduler.rangeHold = $0P;
                    }
                };
            };
            var $3w = $e.$8g($0P);
            if ($3u !== 1) {
                DayPilotScheduler.timeRangeTimeout = null;
                return;
            };
            if ($e.timeRangeDoubleClickHandling === 'Disabled') {
                $4G($3w)();
                var ev = ev || window.event;
                ev.cancelBubble = true;
                return false;
            } else {
                DayPilotScheduler.timeRangeTimeout = setTimeout($4G($3w), $e.doubleClickTimeout);
            }
        };
        if (DayPilotScheduler.drag) {
            DayPilotScheduler.drag = null;
            document.body.style.cursor = '';
        };
        if (DayPilotScheduler.gShadow) {
            document.body.removeChild(DayPilotScheduler.gShadow);
            DayPilotScheduler.gShadow = null;
        };
        DayPilotScheduler.moveOffsetX = null;
        DayPilotScheduler.moveDragStart = null;
    };
    DayPilotScheduler.createGShadow = function($0w) {
        var $1b = document.createElement('div');
        $1b.setAttribute('unselectable', 'on');
        $1b.style.position = 'absolute';
        $1b.style.width = '100px';
        $1b.style.height = '20px';
        $1b.style.border = '2px dotted #666666';
        $1b.style.zIndex = 101;
        if ($0w === 'Fill') {
            $1b.style.backgroundColor = "#aaaaaa";
            $1b.style.opacity = 0.5;
            $1b.style.filter = "alpha(opacity=50)";
            $1b.style.border = '2px solid #aaaaaa';
        };
        document.body.appendChild($1b);
        return $1b;
    };
    DayPilot.SchedulerVisible.dragStart = DayPilotScheduler.dragStart;
    DayPilot.SchedulerVisible.dragStop = DayPilotScheduler.dragStop;
    DayPilot.SchedulerVisible.Scheduler = DayPilotScheduler.Scheduler;
    DayPilot.SchedulerVisible.globalHandlers = DayPilotScheduler.globalHandlers;
    if (typeof jQuery !== 'undefined') {
        (function($) {
            $.fn.daypilotScheduler = function($4Y) {
                var $4Z = null;
                var j = this.each(function() {
                    if (this.daypilot) {
                        return;
                    };
                    var $50 = new DayPilot.Scheduler(this.id);
                    this.daypilot = $50;
                    for (var name in $4Y) {
                        $50[name] = $4Y[name];
                    };
                    $50.Init();
                    if (!$4Z) {
                        $4Z = $50;
                    }
                });
                if (this.length === 1) {
                    return $4Z;
                } else {
                    return j;
                }
            };
        })(jQuery);
    };
    if (typeof Sys !== 'undefined' && Sys.Application && Sys.Application.notifyScriptLoaded) {
        Sys.Application.notifyScriptLoaded();
    }
})();

if (typeof DayPilot === 'undefined') {
    var DayPilot = {};
};
if (typeof DayPilot.Global === 'undefined') {
    DayPilot.Global = {};
};
(function() {
    if (typeof DayPilot.Year !== 'undefined') {
        return;
    };
    DayPilot.Year = function(id, $a) {
        this.v = '710';
        var $b = this;
        this.startDate = new DayPilot.Date();
        this.cssOnly = true;
        this.cssClassPrefix = null;
        this.columns = 4;
        this.cellWidth = 20;
        this.showWeekNumbers = false;
        this.$i = [];
        this.$j = function() {
            this.root.dp = this;
            this.$k = new DayPilot.Date(this.startDate.toString("yyyy-01-01", "en-us"));
        };
        this.$l = function($c) {
            if (this.cssClassPrefix) {
                return this.cssClassPrefix + $c;
            } else {
                return "";
            }
        };
        this.$m = function() {
            if (this.showWeekNumbers) {
                return this.cellWidth;
            };
            return 0;
        };
        this.$n = function() {
            this.$i = [];
            var $d = this.columns;
            var $e = 12 / $d;
            this.root.className = this.$l('_main');
            this.root.style.width = $d * (this.cellWidth * 7 + this.$m()) + 'px';
            for (var y = 0; y < $e; y++) {
                for (var x = 0; x < $d; x++) {
                    var m = y * $d + x;
                    var id = id + "_nav_" + m;
                    var $f = document.createElement("div");
                    $f.id = id;
                    $f.style.float = 'left';
                    this.root.appendChild($f);
                    var navigator = new DayPilot.Navigator(id);
                    navigator.startDate = this.$k.addMonths(m);
                    navigator.cssOnly = this.cssOnly;
                    navigator.cssClassPrefix = this.cssClassPrefix;
                    navigator.cellWidth = this.cellWidth;
                    navigator.showWeekNumbers = this.showWeekNumbers;
                    navigator.internal.showLinks = {};
                    navigator.selectMode = 'none';
                    navigator.timeRangeSelectedHandling = "JavaScript";
                    navigator.onTimeRangeSelected = this.$o;
                    navigator.init();
                    navigator.root.className = '';
                    this.$i.push(navigator);
                };
                var $g = document.createElement("div");
                $g.style.clear = 'left';
                this.root.appendChild($g);
            }
        };
        this.$o = function($h) {
            alert("clicked: " + $h.day);
        };
        this.init = function() {
            this.root = document.getElementById(id);
            if (this.root.dp) {
                return;
            };
            this.$j();
            this.$n();
        };
    };
})();