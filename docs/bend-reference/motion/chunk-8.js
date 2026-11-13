(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  38720,
  (t) => {
    "use strict";
    var e = t.i(43476),
      i = t.i(71645),
      n = t.i(89970),
      r = t.i(83495);
    n.gsap.registerPlugin(r.ScrollTrigger);
    let s = [140, 70, 0];
    function a({ pillars: t }) {
      let r = (0, i.useRef)(null);
      return (
        (0, i.useEffect)(() => {
          let t = r.current;
          if (
            !t ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
          )
            return;
          let e = n.gsap.context(() => {
            let e = Array.from(t.querySelectorAll(".bend-pillar"));
            e.length &&
              (n.gsap.set(e, { y: (t) => s[t] ?? 0 }),
              n.gsap.to(e, {
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: t,
                  start: "top 95%",
                  end: "center 60%",
                  scrub: 0.8,
                  invalidateOnRefresh: !0,
                },
              }));
          }, t);
          return () => e.revert();
        }, [t.length]),
        (0, e.jsx)("div", {
          className: "grid gap-10 sm:gap-12 lg:grid-cols-3 lg:gap-8",
          ref: r,
          children: t.map((t) =>
            (0, e.jsxs)(
              "article",
              {
                className: "bend-pillar flex flex-col gap-5",
                children: [
                  (0, e.jsx)("div", {
                    "aria-label": t.alt,
                    className: "aspect-[3/4] w-full bg-cover bg-center",
                    role: "img",
                    style: { backgroundImage: `url(${t.image})` },
                  }),
                  (0, e.jsxs)("div", {
                    className:
                      "flex flex-col gap-2 border-t border-[var(--line)] pt-4",
                    children: [
                      (0, e.jsx)("p", {
                        className:
                          "font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.22em] text-[var(--soft-ink)]",
                        children: t.eyebrow,
                      }),
                      (0, e.jsx)("h3", {
                        className:
                          "font-[family-name:var(--font-display)] text-[clamp(1.35rem,2.2vw,1.9rem)] font-medium leading-[1.1] tracking-[-0.012em] text-[var(--ink)]",
                        children: t.title,
                      }),
                    ],
                  }),
                ],
              },
              t.title,
            ),
          ),
        })
      );
    }
    t.s(["BendClubPillars", () => a]);
  },
  33128,
  (t) => {
    "use strict";
    var e = t.i(43476),
      i = t.i(71645);
    function n({
      autoComplete: t,
      dark: i = !1,
      label: n,
      multiline: r = !1,
      name: s,
      required: a = !1,
      type: o = "text",
    }) {
      let l = i
        ? "w-full border-0 border-b border-white/25 bg-transparent pb-2 pt-1 text-base text-white outline-none transition placeholder:text-white/40 focus:border-white"
        : "w-full border-0 border-b border-[var(--line)] bg-transparent pb-2 pt-1 text-base text-[var(--ink)] outline-none transition placeholder:text-[var(--soft-ink)]/60 focus:border-[var(--ink)]";
      return (0, e.jsxs)("label", {
        className: "grid gap-2",
        children: [
          (0, e.jsx)("span", {
            className: i
              ? "text-xs uppercase tracking-[0.24em] text-white/55"
              : "text-xs uppercase tracking-[0.24em] text-[var(--soft-ink)]",
            children: n,
          }),
          r
            ? (0, e.jsx)("textarea", {
                className: `${l} min-h-24 resize-y`,
                name: s,
                required: a,
              })
            : (0, e.jsx)("input", {
                autoComplete: t,
                className: l,
                name: s,
                required: a,
                type: o,
              }),
        ],
      });
    }
    function r() {
      let [t, r] = (0, i.useState)("idle");
      async function s(t) {
        (t.preventDefault(), r("loading"));
        let e = t.currentTarget,
          i = {
            firstName: e.elements.namedItem("first-name").value,
            lastName: e.elements.namedItem("last-name").value,
            email: e.elements.namedItem("email").value,
            message: e.elements.namedItem("message").value,
          };
        r(
          (
            await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(i),
            })
          ).ok
            ? "success"
            : "error",
        );
      }
      return "success" === t
        ? (0, e.jsxs)("div", {
            className: "flex h-full flex-col justify-center gap-3 py-8",
            children: [
              (0, e.jsx)("p", {
                className:
                  "font-[family-name:var(--font-display)] text-[clamp(1.4rem,2.5vw,2rem)] font-medium text-white",
                children: "Thank you.",
              }),
              (0, e.jsx)("p", {
                className: "text-[0.92rem] leading-[1.6] text-white/70",
                children: "We'll be in touch within two business days.",
              }),
            ],
          })
        : (0, e.jsxs)("form", {
            className: "grid gap-6",
            onSubmit: s,
            children: [
              (0, e.jsxs)("div", {
                className: "grid gap-6 sm:grid-cols-2",
                children: [
                  (0, e.jsx)(n, {
                    autoComplete: "given-name",
                    label: "First name",
                    name: "first-name",
                    required: !0,
                    dark: !0,
                  }),
                  (0, e.jsx)(n, {
                    autoComplete: "family-name",
                    label: "Last name",
                    name: "last-name",
                    required: !0,
                    dark: !0,
                  }),
                ],
              }),
              (0, e.jsx)(n, {
                autoComplete: "email",
                label: "Email",
                name: "email",
                required: !0,
                type: "email",
                dark: !0,
              }),
              (0, e.jsx)(n, {
                label: "Message",
                name: "message",
                required: !0,
                multiline: !0,
                dark: !0,
              }),
              (0, e.jsxs)("div", {
                className:
                  "flex flex-wrap items-end justify-between gap-4 pt-1",
                children: [
                  (0, e.jsxs)("button", {
                    className:
                      "link-underline group inline-flex w-fit items-center gap-3 text-sm uppercase tracking-[0.24em] text-white transition disabled:opacity-50",
                    disabled: "loading" === t,
                    type: "submit",
                    children: [
                      (0, e.jsx)("span", {
                        children: "loading" === t ? "Sending…" : "Send inquiry",
                      }),
                      "loading" !== t &&
                        (0, e.jsx)("span", {
                          "aria-hidden": "true",
                          className:
                            "inline-block transition-transform duration-500 group-hover:translate-x-1",
                          children: "→",
                        }),
                    ],
                  }),
                  "error" === t &&
                    (0, e.jsx)("p", {
                      className: "text-xs text-red-400",
                      children: "Something went wrong — please try again.",
                    }),
                  "idle" === t &&
                    (0, e.jsx)("p", {
                      className: "text-xs leading-6 text-white/55",
                      children: "Replies within two business days.",
                    }),
                ],
              }),
            ],
          });
    }
    t.s(["ContactForm", () => r], 33128);
  },
  98183,
  (t, e, i) => {
    "use strict";
    Object.defineProperty(i, "__esModule", { value: !0 });
    var n = {
      assign: function () {
        return l;
      },
      searchParamsToUrlQuery: function () {
        return s;
      },
      urlQueryToSearchParams: function () {
        return o;
      },
    };
    for (var r in n) Object.defineProperty(i, r, { enumerable: !0, get: n[r] });
    function s(t) {
      let e = {};
      for (let [i, n] of t.entries()) {
        let t = e[i];
        void 0 === t
          ? (e[i] = n)
          : Array.isArray(t)
            ? t.push(n)
            : (e[i] = [t, n]);
      }
      return e;
    }
    function a(t) {
      return "string" == typeof t
        ? t
        : ("number" != typeof t || isNaN(t)) && "boolean" != typeof t
          ? ""
          : String(t);
    }
    function o(t) {
      let e = new URLSearchParams();
      for (let [i, n] of Object.entries(t))
        if (Array.isArray(n)) for (let t of n) e.append(i, a(t));
        else e.set(i, a(n));
      return e;
    }
    function l(t, ...e) {
      for (let i of e) {
        for (let e of i.keys()) t.delete(e);
        for (let [e, n] of i.entries()) t.append(e, n);
      }
      return t;
    }
  },
  95057,
  (t, e, i) => {
    "use strict";
    Object.defineProperty(i, "__esModule", { value: !0 });
    var n = {
      formatUrl: function () {
        return o;
      },
      formatWithValidation: function () {
        return u;
      },
      urlObjectKeys: function () {
        return l;
      },
    };
    for (var r in n) Object.defineProperty(i, r, { enumerable: !0, get: n[r] });
    let s = t.r(90809)._(t.r(98183)),
      a = /https?|ftp|gopher|file/;
    function o(t) {
      let { auth: e, hostname: i } = t,
        n = t.protocol || "",
        r = t.pathname || "",
        o = t.hash || "",
        l = t.query || "",
        u = !1;
      ((e = e ? encodeURIComponent(e).replace(/%3A/i, ":") + "@" : ""),
        t.host
          ? (u = e + t.host)
          : i &&
            ((u = e + (~i.indexOf(":") ? `[${i}]` : i)),
            t.port && (u += ":" + t.port)),
        l && "object" == typeof l && (l = String(s.urlQueryToSearchParams(l))));
      let h = t.search || (l && `?${l}`) || "";
      return (
        n && !n.endsWith(":") && (n += ":"),
        t.slashes || ((!n || a.test(n)) && !1 !== u)
          ? ((u = "//" + (u || "")), r && "/" !== r[0] && (r = "/" + r))
          : u || (u = ""),
        o && "#" !== o[0] && (o = "#" + o),
        h && "?" !== h[0] && (h = "?" + h),
        (r = r.replace(/[?#]/g, encodeURIComponent)),
        (h = h.replace("#", "%23")),
        `${n}${u}${r}${h}${o}`
      );
    }
    let l = [
      "auth",
      "hash",
      "host",
      "hostname",
      "href",
      "path",
      "pathname",
      "port",
      "protocol",
      "query",
      "search",
      "slashes",
    ];
    function u(t) {
      return o(t);
    }
  },
  18581,
  (t, e, i) => {
    "use strict";
    (Object.defineProperty(i, "__esModule", { value: !0 }),
      Object.defineProperty(i, "useMergedRef", {
        enumerable: !0,
        get: function () {
          return r;
        },
      }));
    let n = t.r(71645);
    function r(t, e) {
      let i = (0, n.useRef)(null),
        r = (0, n.useRef)(null);
      return (0, n.useCallback)(
        (n) => {
          if (null === n) {
            let t = i.current;
            t && ((i.current = null), t());
            let e = r.current;
            e && ((r.current = null), e());
          } else (t && (i.current = s(t, n)), e && (r.current = s(e, n)));
        },
        [t, e],
      );
    }
    function s(t, e) {
      if ("function" != typeof t)
        return (
          (t.current = e),
          () => {
            t.current = null;
          }
        );
      {
        let i = t(e);
        return "function" == typeof i ? i : () => t(null);
      }
    }
    ("function" == typeof i.default ||
      ("object" == typeof i.default && null !== i.default)) &&
      void 0 === i.default.__esModule &&
      (Object.defineProperty(i.default, "__esModule", { value: !0 }),
      Object.assign(i.default, i),
      (e.exports = i.default));
  },
  18967,
  (t, e, i) => {
    "use strict";
    Object.defineProperty(i, "__esModule", { value: !0 });
    var n = {
      DecodeError: function () {
        return y;
      },
      MiddlewareNotFoundError: function () {
        return b;
      },
      MissingStaticPage: function () {
        return w;
      },
      NormalizeError: function () {
        return v;
      },
      PageNotFoundError: function () {
        return x;
      },
      SP: function () {
        return f;
      },
      ST: function () {
        return g;
      },
      WEB_VITALS: function () {
        return s;
      },
      execOnce: function () {
        return a;
      },
      getDisplayName: function () {
        return c;
      },
      getLocationOrigin: function () {
        return u;
      },
      getURL: function () {
        return h;
      },
      isAbsoluteUrl: function () {
        return l;
      },
      isResSent: function () {
        return d;
      },
      loadGetInitialProps: function () {
        return m;
      },
      normalizeRepeatedSlashes: function () {
        return p;
      },
      stringifyError: function () {
        return T;
      },
    };
    for (var r in n) Object.defineProperty(i, r, { enumerable: !0, get: n[r] });
    let s = ["CLS", "FCP", "FID", "INP", "LCP", "TTFB"];
    function a(t) {
      let e,
        i = !1;
      return (...n) => (i || ((i = !0), (e = t(...n))), e);
    }
    let o = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/,
      l = (t) => o.test(t);
    function u() {
      let { protocol: t, hostname: e, port: i } = window.location;
      return `${t}//${e}${i ? ":" + i : ""}`;
    }
    function h() {
      let { href: t } = window.location,
        e = u();
      return t.substring(e.length);
    }
    function c(t) {
      return "string" == typeof t ? t : t.displayName || t.name || "Unknown";
    }
    function d(t) {
      return t.finished || t.headersSent;
    }
    function p(t) {
      let e = t.split("?");
      return (
        e[0].replace(/\\/g, "/").replace(/\/\/+/g, "/") +
        (e[1] ? `?${e.slice(1).join("?")}` : "")
      );
    }
    async function m(t, e) {
      let i = e.res || (e.ctx && e.ctx.res);
      if (!t.getInitialProps)
        return e.ctx && e.Component
          ? { pageProps: await m(e.Component, e.ctx) }
          : {};
      let n = await t.getInitialProps(e);
      if (i && d(i)) return n;
      if (!n)
        throw Object.defineProperty(
          Error(
            `"${c(t)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`,
          ),
          "__NEXT_ERROR_CODE",
          { value: "E394", enumerable: !1, configurable: !0 },
        );
      return n;
    }
    let f = "u" > typeof performance,
      g =
        f &&
        ["mark", "measure", "getEntriesByName"].every(
          (t) => "function" == typeof performance[t],
        );
    class y extends Error {}
    class v extends Error {}
    class x extends Error {
      constructor(t) {
        (super(),
          (this.code = "ENOENT"),
          (this.name = "PageNotFoundError"),
          (this.message = `Cannot find module for page: ${t}`));
      }
    }
    class w extends Error {
      constructor(t, e) {
        (super(),
          (this.message = `Failed to load static file for page: ${t} ${e}`));
      }
    }
    class b extends Error {
      constructor() {
        (super(),
          (this.code = "ENOENT"),
          (this.message = "Cannot find the middleware module"));
      }
    }
    function T(t) {
      return JSON.stringify({ message: t.message, stack: t.stack });
    }
  },
  73668,
  (t, e, i) => {
    "use strict";
    (Object.defineProperty(i, "__esModule", { value: !0 }),
      Object.defineProperty(i, "isLocalURL", {
        enumerable: !0,
        get: function () {
          return s;
        },
      }));
    let n = t.r(18967),
      r = t.r(52817);
    function s(t) {
      if (!(0, n.isAbsoluteUrl)(t)) return !0;
      try {
        let e = (0, n.getLocationOrigin)(),
          i = new URL(t, e);
        return i.origin === e && (0, r.hasBasePath)(i.pathname);
      } catch (t) {
        return !1;
      }
    }
  },
  84508,
  (t, e, i) => {
    "use strict";
    (Object.defineProperty(i, "__esModule", { value: !0 }),
      Object.defineProperty(i, "errorOnce", {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    let n = (t) => {};
  },
  22016,
  (t, e, i) => {
    "use strict";
    Object.defineProperty(i, "__esModule", { value: !0 });
    var n = {
      default: function () {
        return y;
      },
      useLinkStatus: function () {
        return x;
      },
    };
    for (var r in n) Object.defineProperty(i, r, { enumerable: !0, get: n[r] });
    let s = t.r(90809),
      a = t.r(43476),
      o = s._(t.r(71645)),
      l = t.r(95057),
      u = t.r(8372),
      h = t.r(18581),
      c = t.r(18967),
      d = t.r(5550);
    t.r(33525);
    let p = t.r(91949),
      m = t.r(73668),
      f = t.r(9396);
    function g(t) {
      return "string" == typeof t ? t : (0, l.formatUrl)(t);
    }
    function y(e) {
      var i;
      let n,
        r,
        s,
        [l, y] = (0, o.useOptimistic)(p.IDLE_LINK_STATUS),
        x = (0, o.useRef)(null),
        {
          href: w,
          as: b,
          children: T,
          prefetch: P = null,
          passHref: S,
          replace: k,
          shallow: A,
          scroll: E,
          onClick: j,
          onMouseEnter: M,
          onTouchStart: C,
          legacyBehavior: V = !1,
          onNavigate: R,
          ref: D,
          unstable_dynamicOnHover: L,
          ...N
        } = e;
      ((n = T),
        V &&
          ("string" == typeof n || "number" == typeof n) &&
          (n = (0, a.jsx)("a", { children: n })));
      let B = o.default.useContext(u.AppRouterContext),
        F = !1 !== P,
        O =
          !1 !== P
            ? null === (i = P) || "auto" === i
              ? f.FetchStrategy.PPR
              : f.FetchStrategy.Full
            : f.FetchStrategy.PPR,
        { href: I, as: _ } = o.default.useMemo(() => {
          let t = g(w);
          return { href: t, as: b ? g(b) : t };
        }, [w, b]);
      if (V) {
        if (n?.$$typeof === Symbol.for("react.lazy"))
          throw Object.defineProperty(
            Error(
              "`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag.",
            ),
            "__NEXT_ERROR_CODE",
            { value: "E863", enumerable: !1, configurable: !0 },
          );
        r = o.default.Children.only(n);
      }
      let $ = V ? r && "object" == typeof r && r.ref : D,
        U = o.default.useCallback(
          (t) => (
            null !== B &&
              (x.current = (0, p.mountLinkInstance)(t, I, B, O, F, y)),
            () => {
              (x.current &&
                ((0, p.unmountLinkForCurrentNavigation)(x.current),
                (x.current = null)),
                (0, p.unmountPrefetchableInstance)(t));
            }
          ),
          [F, I, B, O, y],
        ),
        W = {
          ref: (0, h.useMergedRef)(U, $),
          onClick(e) {
            (V || "function" != typeof j || j(e),
              V &&
                r.props &&
                "function" == typeof r.props.onClick &&
                r.props.onClick(e),
              !B ||
                e.defaultPrevented ||
                (function (e, i, n, r, s, a, l) {
                  if ("u" > typeof window) {
                    let u,
                      { nodeName: h } = e.currentTarget;
                    if (
                      ("A" === h.toUpperCase() &&
                        (((u = e.currentTarget.getAttribute("target")) &&
                          "_self" !== u) ||
                          e.metaKey ||
                          e.ctrlKey ||
                          e.shiftKey ||
                          e.altKey ||
                          (e.nativeEvent && 2 === e.nativeEvent.which))) ||
                      e.currentTarget.hasAttribute("download")
                    )
                      return;
                    if (!(0, m.isLocalURL)(i)) {
                      s && (e.preventDefault(), location.replace(i));
                      return;
                    }
                    if ((e.preventDefault(), l)) {
                      let t = !1;
                      if (
                        (l({
                          preventDefault: () => {
                            t = !0;
                          },
                        }),
                        t)
                      )
                        return;
                    }
                    let { dispatchNavigateAction: c } = t.r(99781);
                    o.default.startTransition(() => {
                      c(n || i, s ? "replace" : "push", a ?? !0, r.current);
                    });
                  }
                })(e, I, _, x, k, E, R));
          },
          onMouseEnter(t) {
            (V || "function" != typeof M || M(t),
              V &&
                r.props &&
                "function" == typeof r.props.onMouseEnter &&
                r.props.onMouseEnter(t),
              B && F && (0, p.onNavigationIntent)(t.currentTarget, !0 === L));
          },
          onTouchStart: function (t) {
            (V || "function" != typeof C || C(t),
              V &&
                r.props &&
                "function" == typeof r.props.onTouchStart &&
                r.props.onTouchStart(t),
              B && F && (0, p.onNavigationIntent)(t.currentTarget, !0 === L));
          },
        };
      return (
        (0, c.isAbsoluteUrl)(_)
          ? (W.href = _)
          : (V && !S && ("a" !== r.type || "href" in r.props)) ||
            (W.href = (0, d.addBasePath)(_)),
        (s = V
          ? o.default.cloneElement(r, W)
          : (0, a.jsx)("a", { ...N, ...W, children: n })),
        (0, a.jsx)(v.Provider, { value: l, children: s })
      );
    }
    t.r(84508);
    let v = (0, o.createContext)(p.IDLE_LINK_STATUS),
      x = () => (0, o.useContext)(v);
    ("function" == typeof i.default ||
      ("object" == typeof i.default && null !== i.default)) &&
      void 0 === i.default.__esModule &&
      (Object.defineProperty(i.default, "__esModule", { value: !0 }),
      Object.assign(i.default, i),
      (e.exports = i.default));
  },
  92349,
  (t) => {
    "use strict";
    let e, i, n;
    var r,
      s = t.i(43476),
      a = t.i(71645),
      o = t.i(89970),
      l = t.i(22016),
      u = t.i(74080),
      h = t.i(47167);
    let c = (0, a.createContext)({});
    function d(t) {
      let e = (0, a.useRef)(null);
      return (null === e.current && (e.current = t()), e.current);
    }
    let p = "u" > typeof window ? a.useLayoutEffect : a.useEffect,
      m = (0, a.createContext)(null),
      f = (t) => "object" == typeof t && null !== t;
    function g(t) {
      return f(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
    }
    var y = a;
    let v = (0, a.createContext)({
      transformPagePoint: (t) => t,
      isStatic: !1,
      reducedMotion: "never",
    });
    function x(t, e) {
      if ("function" == typeof t) return t(e);
      null != t && (t.current = e);
    }
    class w extends y.Component {
      getSnapshotBeforeUpdate(t) {
        let e = this.props.childRef.current;
        if (
          g(e) &&
          t.isPresent &&
          !this.props.isPresent &&
          !1 !== this.props.pop
        ) {
          let t = e.offsetParent,
            i = (g(t) && t.offsetWidth) || 0,
            n = (g(t) && t.offsetHeight) || 0,
            r = getComputedStyle(e),
            s = this.props.sizeRef.current;
          ((s.height = parseFloat(r.height)),
            (s.width = parseFloat(r.width)),
            (s.top = e.offsetTop),
            (s.left = e.offsetLeft),
            (s.right = i - s.width - s.left),
            (s.bottom = n - s.height - s.top),
            (s.direction = r.direction));
        }
        return null;
      }
      componentDidUpdate() {}
      render() {
        return this.props.children;
      }
    }
    function b({
      children: t,
      isPresent: e,
      anchorX: i,
      anchorY: n,
      root: r,
      pop: o,
    }) {
      let l = (0, y.useId)(),
        u = (0, y.useRef)(null),
        h = (0, y.useRef)({
          width: 0,
          height: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          direction: "ltr",
        }),
        { nonce: c } = (0, y.useContext)(v),
        d = (function (...t) {
          return a.useCallback(
            (function (...t) {
              return (e) => {
                let i = !1,
                  n = t.map((t) => {
                    let n = x(t, e);
                    return (i || "function" != typeof n || (i = !0), n);
                  });
                if (i)
                  return () => {
                    for (let e = 0; e < n.length; e++) {
                      let i = n[e];
                      "function" == typeof i ? i() : x(t[e], null);
                    }
                  };
              };
            })(...t),
            t,
          );
        })(u, t.props?.ref ?? t?.ref);
      return (
        (0, y.useInsertionEffect)(() => {
          let {
            width: t,
            height: s,
            top: a,
            left: d,
            right: p,
            bottom: m,
            direction: f,
          } = h.current;
          if (e || !1 === o || !u.current || !t || !s) return;
          let g = "rtl" === f,
            y =
              "left" === i
                ? g
                  ? `right: ${p}`
                  : `left: ${d}`
                : g
                  ? `left: ${d}`
                  : `right: ${p}`,
            v = "bottom" === n ? `bottom: ${m}` : `top: ${a}`;
          u.current.dataset.motionPopId = l;
          let x = document.createElement("style");
          c && (x.nonce = c);
          let w = r ?? document.head;
          return (
            w.appendChild(x),
            x.sheet &&
              x.sheet.insertRule(`
          [data-motion-pop-id="${l}"] {
            position: absolute !important;
            width: ${t}px !important;
            height: ${s}px !important;
            ${y}px !important;
            ${v}px !important;
          }
        `),
            () => {
              (u.current?.removeAttribute("data-motion-pop-id"),
                w.contains(x) && w.removeChild(x));
            }
          );
        }, [e]),
        (0, s.jsx)(w, {
          isPresent: e,
          childRef: u,
          sizeRef: h,
          pop: o,
          children: !1 === o ? t : y.cloneElement(t, { ref: d }),
        })
      );
    }
    let T = ({
      children: t,
      initial: e,
      isPresent: i,
      onExitComplete: n,
      custom: r,
      presenceAffectsLayout: o,
      mode: l,
      anchorX: u,
      anchorY: h,
      root: c,
    }) => {
      let p = d(P),
        f = (0, a.useId)(),
        g = !0,
        y = (0, a.useMemo)(
          () => (
            (g = !1),
            {
              id: f,
              initial: e,
              isPresent: i,
              custom: r,
              onExitComplete: (t) => {
                for (let e of (p.set(t, !0), p.values())) if (!e) return;
                n && n();
              },
              register: (t) => (p.set(t, !1), () => p.delete(t)),
            }
          ),
          [i, p, n],
        );
      return (
        o && g && (y = { ...y }),
        (0, a.useMemo)(() => {
          p.forEach((t, e) => p.set(e, !1));
        }, [i]),
        a.useEffect(() => {
          i || p.size || !n || n();
        }, [i]),
        (t = (0, s.jsx)(b, {
          pop: "popLayout" === l,
          isPresent: i,
          anchorX: u,
          anchorY: h,
          root: c,
          children: t,
        })),
        (0, s.jsx)(m.Provider, { value: y, children: t })
      );
    };
    function P() {
      return new Map();
    }
    function S(t = !0) {
      let e = (0, a.useContext)(m);
      if (null === e) return [!0, null];
      let { isPresent: i, onExitComplete: n, register: r } = e,
        s = (0, a.useId)();
      (0, a.useEffect)(() => {
        if (t) return r(s);
      }, [t]);
      let o = (0, a.useCallback)(() => t && n && n(s), [s, n, t]);
      return !i && n ? [!1, o] : [!0];
    }
    let k = (t) => t.key || "";
    function A(t) {
      let e = [];
      return (
        a.Children.forEach(t, (t) => {
          (0, a.isValidElement)(t) && e.push(t);
        }),
        e
      );
    }
    let E = ({
        children: t,
        custom: e,
        initial: i = !0,
        onExitComplete: n,
        presenceAffectsLayout: r = !0,
        mode: o = "sync",
        propagate: l = !1,
        anchorX: u = "left",
        anchorY: h = "top",
        root: m,
      }) => {
        let [f, g] = S(l),
          y = (0, a.useMemo)(() => A(t), [t]),
          v = l && !f ? [] : y.map(k),
          x = (0, a.useRef)(!0),
          w = (0, a.useRef)(y),
          b = d(() => new Map()),
          P = (0, a.useRef)(new Set()),
          [E, j] = (0, a.useState)(y),
          [M, C] = (0, a.useState)(y);
        p(() => {
          ((x.current = !1), (w.current = y));
          for (let t = 0; t < M.length; t++) {
            let e = k(M[t]);
            v.includes(e)
              ? (b.delete(e), P.current.delete(e))
              : !0 !== b.get(e) && b.set(e, !1);
          }
        }, [M, v.length, v.join("-")]);
        let V = [];
        if (y !== E) {
          let t = [...y];
          for (let e = 0; e < M.length; e++) {
            let i = M[e],
              n = k(i);
            v.includes(n) || (t.splice(e, 0, i), V.push(i));
          }
          return ("wait" === o && V.length && (t = V), C(A(t)), j(y), null);
        }
        let { forceRender: R } = (0, a.useContext)(c);
        return (0, s.jsx)(s.Fragment, {
          children: M.map((t) => {
            let a = k(t),
              c = (!l || !!f) && (y === M || v.includes(a));
            return (0, s.jsx)(
              T,
              {
                isPresent: c,
                initial: (!x.current || !!i) && void 0,
                custom: e,
                presenceAffectsLayout: r,
                mode: o,
                root: m,
                onExitComplete: c
                  ? void 0
                  : () => {
                      if (P.current.has(a) || !b.has(a)) return;
                      (P.current.add(a), b.set(a, !0));
                      let t = !0;
                      (b.forEach((e) => {
                        e || (t = !1);
                      }),
                        t && (R?.(), C(w.current), l && g?.(), n && n()));
                    },
                anchorX: u,
                anchorY: h,
                children: t,
              },
              a,
            );
          }),
        });
      },
      j = [
        "transformPerspective",
        "x",
        "y",
        "z",
        "translateX",
        "translateY",
        "translateZ",
        "scale",
        "scaleX",
        "scaleY",
        "rotate",
        "rotateX",
        "rotateY",
        "rotateZ",
        "skew",
        "skewX",
        "skewY",
      ],
      M = new Set([...j, "pathRotation"]),
      C = (t, e, i) => (i > e ? e : i < t ? t : i),
      V = {
        test: (t) => "number" == typeof t,
        parse: parseFloat,
        transform: (t) => t,
      },
      R = { ...V, transform: (t) => C(0, 1, t) },
      D = { ...V, default: 1 },
      L = (t) => Math.round(1e5 * t) / 1e5,
      N = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu,
      B =
        /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
      F = (t, e) => (i) =>
        !!(
          ("string" == typeof i && B.test(i) && i.startsWith(t)) ||
          (e && null != i && Object.prototype.hasOwnProperty.call(i, e))
        ),
      O = (t, e, i) => (n) => {
        if ("string" != typeof n) return n;
        let [r, s, a, o] = n.match(N);
        return {
          [t]: parseFloat(r),
          [e]: parseFloat(s),
          [i]: parseFloat(a),
          alpha: void 0 !== o ? parseFloat(o) : 1,
        };
      },
      I = { ...V, transform: (t) => Math.round(C(0, 255, t)) },
      _ = {
        test: F("rgb", "red"),
        parse: O("red", "green", "blue"),
        transform: ({ red: t, green: e, blue: i, alpha: n = 1 }) =>
          "rgba(" +
          I.transform(t) +
          ", " +
          I.transform(e) +
          ", " +
          I.transform(i) +
          ", " +
          L(R.transform(n)) +
          ")",
      },
      $ = {
        test: F("#"),
        parse: function (t) {
          let e = "",
            i = "",
            n = "",
            r = "";
          return (
            t.length > 5
              ? ((e = t.substring(1, 3)),
                (i = t.substring(3, 5)),
                (n = t.substring(5, 7)),
                (r = t.substring(7, 9)))
              : ((e = t.substring(1, 2)),
                (i = t.substring(2, 3)),
                (n = t.substring(3, 4)),
                (r = t.substring(4, 5)),
                (e += e),
                (i += i),
                (n += n),
                (r += r)),
            {
              red: parseInt(e, 16),
              green: parseInt(i, 16),
              blue: parseInt(n, 16),
              alpha: r ? parseInt(r, 16) / 255 : 1,
            }
          );
        },
        transform: _.transform,
      },
      U = (t) => ({
        test: (e) =>
          "string" == typeof e && e.endsWith(t) && 1 === e.split(" ").length,
        parse: parseFloat,
        transform: (e) => `${e}${t}`,
      }),
      W = U("deg"),
      z = U("%"),
      X = U("px"),
      H = U("vh"),
      Y = U("vw"),
      q = {
        ...z,
        parse: (t) => z.parse(t) / 100,
        transform: (t) => z.transform(100 * t),
      },
      K = {
        test: F("hsl", "hue"),
        parse: O("hue", "saturation", "lightness"),
        transform: ({ hue: t, saturation: e, lightness: i, alpha: n = 1 }) =>
          "hsla(" +
          Math.round(t) +
          ", " +
          z.transform(L(e)) +
          ", " +
          z.transform(L(i)) +
          ", " +
          L(R.transform(n)) +
          ")",
      },
      G = {
        test: (t) => _.test(t) || $.test(t) || K.test(t),
        parse: (t) =>
          _.test(t) ? _.parse(t) : K.test(t) ? K.parse(t) : $.parse(t),
        transform: (t) =>
          "string" == typeof t
            ? t
            : t.hasOwnProperty("red")
              ? _.transform(t)
              : K.transform(t),
        getAnimatableNone: (t) => {
          let e = G.parse(t);
          return ((e.alpha = 0), G.transform(e));
        },
      },
      Z =
        /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu,
      J = "number",
      Q = "color",
      tt =
        /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
    function te(t) {
      let e = t.toString(),
        i = [],
        n = { color: [], number: [], var: [] },
        r = [],
        s = 0,
        a = e
          .replace(
            tt,
            (t) => (
              G.test(t)
                ? (n.color.push(s), r.push(Q), i.push(G.parse(t)))
                : t.startsWith("var(")
                  ? (n.var.push(s), r.push("var"), i.push(t))
                  : (n.number.push(s), r.push(J), i.push(parseFloat(t))),
              ++s,
              "${}"
            ),
          )
          .split("${}");
      return { values: i, split: a, indexes: n, types: r };
    }
    function ti({ split: t, types: e }) {
      let i = t.length;
      return (n) => {
        let r = "";
        for (let s = 0; s < i; s++)
          if (((r += t[s]), void 0 !== n[s])) {
            let t = e[s];
            t === J
              ? (r += L(n[s]))
              : t === Q
                ? (r += G.transform(n[s]))
                : (r += n[s]);
          }
        return r;
      };
    }
    let tn = {
        test: function (t) {
          return (
            isNaN(t) &&
            "string" == typeof t &&
            (t.match(N)?.length || 0) + (t.match(Z)?.length || 0) > 0
          );
        },
        parse: function (t) {
          return te(t).values;
        },
        createTransformer: function (t) {
          return ti(te(t));
        },
        getAnimatableNone: function (t) {
          let e = te(t);
          return ti(e)(
            e.values.map((t, i) =>
              ((t, e) =>
                "number" == typeof t
                  ? e?.trim().endsWith("/")
                    ? t
                    : 0
                  : "number" == typeof t
                    ? 0
                    : G.test(t)
                      ? G.getAnimatableNone(t)
                      : t)(t, e.split[i]),
            ),
          );
        },
      },
      tr = new Set(["brightness", "contrast", "saturate", "opacity"]);
    function ts(t) {
      let [e, i] = t.slice(0, -1).split("(");
      if ("drop-shadow" === e) return t;
      let [n] = i.match(N) || [];
      if (!n) return t;
      let r = i.replace(n, ""),
        s = +!!tr.has(e);
      return (n !== i && (s *= 100), e + "(" + s + r + ")");
    }
    let ta = /\b([a-z-]*)\(.*?\)/gu,
      to = {
        ...tn,
        getAnimatableNone: (t) => {
          let e = t.match(ta);
          return e ? e.map(ts).join(" ") : t;
        },
      },
      tl = {
        ...tn,
        getAnimatableNone: (t) => {
          let e = tn.parse(t);
          return tn.createTransformer(t)(
            e.map((t) =>
              "number" == typeof t
                ? 0
                : "object" == typeof t
                  ? { ...t, alpha: 1 }
                  : t,
            ),
          );
        },
      },
      tu = { ...V, transform: Math.round },
      th = {
        borderWidth: X,
        borderTopWidth: X,
        borderRightWidth: X,
        borderBottomWidth: X,
        borderLeftWidth: X,
        borderRadius: X,
        borderTopLeftRadius: X,
        borderTopRightRadius: X,
        borderBottomRightRadius: X,
        borderBottomLeftRadius: X,
        width: X,
        maxWidth: X,
        height: X,
        maxHeight: X,
        top: X,
        right: X,
        bottom: X,
        left: X,
        inset: X,
        insetBlock: X,
        insetBlockStart: X,
        insetBlockEnd: X,
        insetInline: X,
        insetInlineStart: X,
        insetInlineEnd: X,
        padding: X,
        paddingTop: X,
        paddingRight: X,
        paddingBottom: X,
        paddingLeft: X,
        paddingBlock: X,
        paddingBlockStart: X,
        paddingBlockEnd: X,
        paddingInline: X,
        paddingInlineStart: X,
        paddingInlineEnd: X,
        margin: X,
        marginTop: X,
        marginRight: X,
        marginBottom: X,
        marginLeft: X,
        marginBlock: X,
        marginBlockStart: X,
        marginBlockEnd: X,
        marginInline: X,
        marginInlineStart: X,
        marginInlineEnd: X,
        fontSize: X,
        backgroundPositionX: X,
        backgroundPositionY: X,
        rotate: W,
        pathRotation: W,
        rotateX: W,
        rotateY: W,
        rotateZ: W,
        scale: D,
        scaleX: D,
        scaleY: D,
        scaleZ: D,
        skew: W,
        skewX: W,
        skewY: W,
        distance: X,
        translateX: X,
        translateY: X,
        translateZ: X,
        x: X,
        y: X,
        z: X,
        perspective: X,
        transformPerspective: X,
        opacity: R,
        originX: q,
        originY: q,
        originZ: X,
        zIndex: tu,
        fillOpacity: R,
        strokeOpacity: R,
        numOctaves: tu,
      },
      tc = {
        ...th,
        color: G,
        backgroundColor: G,
        outlineColor: G,
        fill: G,
        stroke: G,
        borderColor: G,
        borderTopColor: G,
        borderRightColor: G,
        borderBottomColor: G,
        borderLeftColor: G,
        filter: to,
        WebkitFilter: to,
        mask: tl,
        WebkitMask: tl,
      },
      td = (t) => tc[t],
      tp = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
      tm = () => ({ x: tp(), y: tp() }),
      tf = () => ({ min: 0, max: 0 }),
      tg = () => ({ x: tf(), y: tf() }),
      ty = (t) => !!(t && t.getVelocity),
      tv = new Set(["width", "height", "top", "left", "right", "bottom", ...j]),
      tx = (t) => (e) => e.test(t),
      tw = [V, X, z, W, Y, H, { test: (t) => "auto" === t, parse: (t) => t }],
      tb = (t) => tw.find(tx(t)),
      tT = () => {},
      tP = () => {};
    h.default;
    let tS = (t) => (e) => "string" == typeof e && e.startsWith(t),
      tk = tS("--"),
      tA = tS("var(--"),
      tE = (t) => !!tA(t) && tj.test(t.split("/*")[0].trim()),
      tj =
        /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
    function tM(t) {
      return "string" == typeof t && t.split("/*")[0].includes("var(--");
    }
    let tC = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u,
      tV = (t) => (180 * t) / Math.PI,
      tR = (t) => tL(tV(Math.atan2(t[1], t[0]))),
      tD = {
        x: 4,
        y: 5,
        translateX: 4,
        translateY: 5,
        scaleX: 0,
        scaleY: 3,
        scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
        rotate: tR,
        rotateZ: tR,
        skewX: (t) => tV(Math.atan(t[1])),
        skewY: (t) => tV(Math.atan(t[2])),
        skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2,
      },
      tL = (t) => ((t %= 360) < 0 && (t += 360), t),
      tN = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]),
      tB = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]),
      tF = {
        x: 12,
        y: 13,
        z: 14,
        translateX: 12,
        translateY: 13,
        translateZ: 14,
        scaleX: tN,
        scaleY: tB,
        scale: (t) => (tN(t) + tB(t)) / 2,
        rotateX: (t) => tL(tV(Math.atan2(t[6], t[5]))),
        rotateY: (t) => tL(tV(Math.atan2(-t[2], t[0]))),
        rotateZ: tR,
        rotate: tR,
        skewX: (t) => tV(Math.atan(t[4])),
        skewY: (t) => tV(Math.atan(t[1])),
        skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2,
      };
    function tO(t) {
      return +!!t.includes("scale");
    }
    function tI(t, e) {
      let i, n;
      if (!t || "none" === t) return tO(e);
      let r = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
      if (r) ((i = tF), (n = r));
      else {
        let e = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
        ((i = tD), (n = e));
      }
      if (!n) return tO(e);
      let s = i[e],
        a = n[1].split(",").map(t_);
      return "function" == typeof s ? s(a) : a[s];
    }
    function t_(t) {
      return parseFloat(t.trim());
    }
    let t$ = (t) => t === V || t === X,
      tU = new Set(["x", "y", "z"]),
      tW = j.filter((t) => !tU.has(t)),
      tz = {
        width: (
          { x: t },
          { paddingLeft: e = "0", paddingRight: i = "0", boxSizing: n },
        ) => {
          let r = t.max - t.min;
          return "border-box" === n ? r : r - parseFloat(e) - parseFloat(i);
        },
        height: (
          { y: t },
          { paddingTop: e = "0", paddingBottom: i = "0", boxSizing: n },
        ) => {
          let r = t.max - t.min;
          return "border-box" === n ? r : r - parseFloat(e) - parseFloat(i);
        },
        top: (t, { top: e }) => parseFloat(e),
        left: (t, { left: e }) => parseFloat(e),
        bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
        right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
        x: (t, { transform: e }) => tI(e, "x"),
        y: (t, { transform: e }) => tI(e, "y"),
      };
    ((tz.translateX = tz.x), (tz.translateY = tz.y));
    let tX = (t) => t,
      tH = {},
      tY = [
        "setup",
        "read",
        "resolveKeyframes",
        "preUpdate",
        "update",
        "preRender",
        "render",
        "postRender",
      ];
    function tq(t, e) {
      let i = !1,
        n = !0,
        r = { delta: 0, timestamp: 0, isProcessing: !1 },
        s = () => (i = !0),
        a = tY.reduce(
          (t, i) => (
            (t[i] = (function (t, e) {
              let i = new Set(),
                n = new Set(),
                r = !1,
                s = !1,
                a = new WeakSet(),
                o = { delta: 0, timestamp: 0, isProcessing: !1 },
                l = 0;
              function u(e) {
                (a.has(e) && (h.schedule(e), t()), l++, e(o));
              }
              let h = {
                schedule: (t, e = !1, s = !1) => {
                  let o = s && r ? i : n;
                  return (e && a.add(t), o.add(t), t);
                },
                cancel: (t) => {
                  (n.delete(t), a.delete(t));
                },
                process: (t) => {
                  if (((o = t), r)) {
                    s = !0;
                    return;
                  }
                  r = !0;
                  let a = i;
                  ((i = n),
                    (n = a),
                    i.forEach(u),
                    e,
                    (l = 0),
                    i.clear(),
                    (r = !1),
                    s && ((s = !1), h.process(t)));
                },
              };
              return h;
            })(s, e ? i : void 0)),
            t
          ),
          {},
        ),
        {
          setup: o,
          read: l,
          resolveKeyframes: u,
          preUpdate: h,
          update: c,
          preRender: d,
          render: p,
          postRender: m,
        } = a,
        f = () => {
          let s = tH.useManualTiming,
            a = s ? r.timestamp : performance.now();
          ((i = !1),
            s ||
              (r.delta = n
                ? 1e3 / 60
                : Math.max(Math.min(a - r.timestamp, 40), 1)),
            (r.timestamp = a),
            (r.isProcessing = !0),
            o.process(r),
            l.process(r),
            u.process(r),
            h.process(r),
            c.process(r),
            d.process(r),
            p.process(r),
            m.process(r),
            (r.isProcessing = !1),
            i && e && ((n = !1), t(f)));
        };
      return {
        schedule: tY.reduce((e, s) => {
          let o = a[s];
          return (
            (e[s] = (e, s = !1, a = !1) => (
              !i && ((i = !0), (n = !0), r.isProcessing || t(f)),
              o.schedule(e, s, a)
            )),
            e
          );
        }, {}),
        cancel: (t) => {
          for (let e = 0; e < tY.length; e++) a[tY[e]].cancel(t);
        },
        state: r,
        steps: a,
      };
    }
    let {
        schedule: tK,
        cancel: tG,
        state: tZ,
        steps: tJ,
      } = tq(
        "u" > typeof requestAnimationFrame ? requestAnimationFrame : tX,
        !0,
      ),
      tQ = new Set(),
      t0 = !1,
      t1 = !1,
      t5 = !1;
    function t2() {
      if (t1) {
        let t = Array.from(tQ).filter((t) => t.needsMeasurement),
          e = new Set(t.map((t) => t.element)),
          i = new Map();
        (e.forEach((t) => {
          let e,
            n =
              ((e = []),
              tW.forEach((i) => {
                let n = t.getValue(i);
                void 0 !== n &&
                  (e.push([i, n.get()]), n.set(+!!i.startsWith("scale")));
              }),
              e);
          n.length && (i.set(t, n), t.render());
        }),
          t.forEach((t) => t.measureInitialState()),
          e.forEach((t) => {
            t.render();
            let e = i.get(t);
            e &&
              e.forEach(([e, i]) => {
                t.getValue(e)?.set(i);
              });
          }),
          t.forEach((t) => t.measureEndState()),
          t.forEach((t) => {
            void 0 !== t.suspendedScrollY &&
              window.scrollTo(0, t.suspendedScrollY);
          }));
      }
      ((t1 = !1), (t0 = !1), tQ.forEach((t) => t.complete(t5)), tQ.clear());
    }
    function t3() {
      tQ.forEach((t) => {
        (t.readKeyframes(), t.needsMeasurement && (t1 = !0));
      });
    }
    class t4 {
      constructor(t, e, i, n, r, s = !1) {
        ((this.state = "pending"),
          (this.isAsync = !1),
          (this.needsMeasurement = !1),
          (this.unresolvedKeyframes = [...t]),
          (this.onComplete = e),
          (this.name = i),
          (this.motionValue = n),
          (this.element = r),
          (this.isAsync = s));
      }
      scheduleResolve() {
        ((this.state = "scheduled"),
          this.isAsync
            ? (tQ.add(this),
              t0 || ((t0 = !0), tK.read(t3), tK.resolveKeyframes(t2)))
            : (this.readKeyframes(), this.complete()));
      }
      readKeyframes() {
        let {
          unresolvedKeyframes: t,
          name: e,
          element: i,
          motionValue: n,
        } = this;
        if (null === t[0]) {
          let r = n?.get(),
            s = t[t.length - 1];
          if (void 0 !== r) t[0] = r;
          else if (i && e) {
            let n = i.readValue(e, s);
            null != n && (t[0] = n);
          }
          (void 0 === t[0] && (t[0] = s), n && void 0 === r && n.set(t[0]));
        }
        for (let e = 1; e < t.length; e++) t[e] ?? (t[e] = t[e - 1]);
      }
      setFinalKeyframe() {}
      measureInitialState() {}
      renderEndStyles() {}
      measureEndState() {}
      complete(t = !1) {
        ((this.state = "complete"),
          this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t),
          tQ.delete(this));
      }
      cancel() {
        "scheduled" === this.state &&
          (tQ.delete(this), (this.state = "pending"));
      }
      resume() {
        "pending" === this.state && this.scheduleResolve();
      }
    }
    let t9 = new Set([to, tl]);
    function t6(t, e) {
      let i = td(t);
      return (
        t9.has(i) || (i = tn),
        i.getAnimatableNone ? i.getAnimatableNone(e) : void 0
      );
    }
    let t8 = new Set(["auto", "none", "0"]);
    class t7 extends t4 {
      constructor(t, e, i, n, r) {
        super(t, e, i, n, r, !0);
      }
      readKeyframes() {
        let { unresolvedKeyframes: t, element: e, name: i } = this;
        if (!e || !e.current) return;
        super.readKeyframes();
        for (let i = 0; i < t.length; i++) {
          let n = t[i];
          if ("string" == typeof n && tE((n = n.trim()))) {
            let r = (function t(e, i, n = 1) {
              tP(
                n <= 4,
                `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`,
                "max-css-var-depth",
              );
              let [r, s] = (function (t) {
                let e = tC.exec(t);
                if (!e) return [,];
                let [, i, n, r] = e;
                return [`--${i ?? n}`, r];
              })(e);
              if (!r) return;
              let a = window.getComputedStyle(i).getPropertyValue(r);
              if (a) {
                let t = a.trim();
                return /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t)
                  ? parseFloat(t)
                  : t;
              }
              return tE(s) ? t(s, i, n + 1) : s;
            })(n, e.current);
            (void 0 !== r && (t[i] = r),
              i === t.length - 1 && (this.finalKeyframe = n));
          }
        }
        if ((this.resolveNoneKeyframes(), !tv.has(i) || 2 !== t.length)) return;
        let [n, r] = t,
          s = tb(n),
          a = tb(r);
        if (tM(n) !== tM(r) && tz[i]) {
          this.needsMeasurement = !0;
          return;
        }
        if (s !== a)
          if (t$(s) && t$(a))
            for (let e = 0; e < t.length; e++) {
              let i = t[e];
              "string" == typeof i && (t[e] = parseFloat(i));
            }
          else tz[i] && (this.needsMeasurement = !0);
      }
      resolveNoneKeyframes() {
        let { unresolvedKeyframes: t, name: e } = this,
          i = [];
        for (let e = 0; e < t.length; e++)
          (null === t[e] ||
            (function (t) {
              if ("number" == typeof t) return 0 === t;
              if (null === t) return !0;
              return "none" === t || "0" === t || /^0[^.\s]+$/u.test(t);
            })(t[e])) &&
            i.push(e);
        i.length &&
          (function (t, e, i) {
            let n,
              r = 0;
            for (; r < t.length && !n;) {
              let e = t[r];
              ("string" == typeof e &&
                !t8.has(e) &&
                te(e).values.length &&
                (n = t[r]),
                r++);
            }
            if (n && i) for (let r of e) t[r] = t6(i, n);
          })(t, i, e);
      }
      measureInitialState() {
        let { element: t, unresolvedKeyframes: e, name: i } = this;
        if (!t || !t.current) return;
        ("height" === i && (this.suspendedScrollY = window.pageYOffset),
          (this.measuredOrigin = tz[i](
            t.measureViewportBox(),
            window.getComputedStyle(t.current),
          )),
          (e[0] = this.measuredOrigin));
        let n = e[e.length - 1];
        void 0 !== n && t.getValue(i, n).jump(n, !1);
      }
      measureEndState() {
        let { element: t, name: e, unresolvedKeyframes: i } = this;
        if (!t || !t.current) return;
        let n = t.getValue(e);
        n && n.jump(this.measuredOrigin, !1);
        let r = i.length - 1,
          s = i[r];
        ((i[r] = tz[e](
          t.measureViewportBox(),
          window.getComputedStyle(t.current),
        )),
          null !== s &&
            void 0 === this.finalKeyframe &&
            (this.finalKeyframe = s),
          this.removedTransforms?.length &&
            this.removedTransforms.forEach(([e, i]) => {
              t.getValue(e).set(i);
            }),
          this.resolveNoneKeyframes());
      }
    }
    let et = (t) => 1e3 * t;
    function ee(t, e) {
      -1 === t.indexOf(e) && t.push(e);
    }
    function ei(t, e) {
      let i = t.indexOf(e);
      i > -1 && t.splice(i, 1);
    }
    class en {
      constructor() {
        this.subscriptions = [];
      }
      add(t) {
        return (ee(this.subscriptions, t), () => ei(this.subscriptions, t));
      }
      notify(t, e, i) {
        let n = this.subscriptions.length;
        if (n)
          if (1 === n) this.subscriptions[0](t, e, i);
          else
            for (let r = 0; r < n; r++) {
              let n = this.subscriptions[r];
              n && n(t, e, i);
            }
      }
      getSize() {
        return this.subscriptions.length;
      }
      clear() {
        this.subscriptions.length = 0;
      }
    }
    function er(t, e, i) {
      e.startsWith("--") ? t.style.setProperty(e, i) : (t.style[e] = i);
    }
    function es(t) {
      let e;
      return () => (void 0 === e && (e = t()), e);
    }
    let ea = {};
    function eo(t, e) {
      let i = es(t);
      return () => ea[e] ?? i();
    }
    let el = eo(() => void 0 !== window.ScrollTimeline, "scrollTimeline"),
      eu = (t) => null !== t;
    function eh(t, { repeat: e, repeatType: i = "loop" }, n, r = 1) {
      let s = t.filter(eu),
        a = r < 0 || (e && "loop" !== i && e % 2 == 1) ? 0 : s.length - 1;
      return a && void 0 !== n ? n : s[a];
    }
    class ec {
      constructor() {
        this.updateFinished();
      }
      get finished() {
        return this._finished;
      }
      updateFinished() {
        this._finished = new Promise((t) => {
          this.resolve = t;
        });
      }
      notifyFinished() {
        this.resolve();
      }
      then(t, e) {
        return this.finished.then(t, e);
      }
    }
    let ed = { layout: 0, mainThread: 0, waapi: 0 },
      ep = (t) => Array.isArray(t) && "number" == typeof t[0],
      em = eo(() => {
        try {
          document
            .createElement("div")
            .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
        } catch (t) {
          return !1;
        }
        return !0;
      }, "linearEasing"),
      ef = (t, e, i = 10) => {
        let n = "",
          r = Math.max(Math.round(e / i), 2);
        for (let e = 0; e < r; e++)
          n += Math.round(1e4 * t(e / (r - 1))) / 1e4 + ", ";
        return `linear(${n.substring(0, n.length - 2)})`;
      },
      eg = ([t, e, i, n]) => `cubic-bezier(${t}, ${e}, ${i}, ${n})`,
      ey = {
        linear: "linear",
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
        circIn: eg([0, 0.65, 0.55, 1]),
        circOut: eg([0.55, 0, 1, 0.45]),
        backIn: eg([0.31, 0.01, 0.66, -0.59]),
        backOut: eg([0.33, 1.53, 0.69, 0.99]),
      };
    function ev(t) {
      return "function" == typeof t && "applyToOptions" in t;
    }
    class ex extends ec {
      constructor(t) {
        if (
          (super(),
          (this.finishedTime = null),
          (this.isStopped = !1),
          (this.manualStartTime = null),
          !t)
        )
          return;
        const {
          element: e,
          name: i,
          keyframes: n,
          pseudoElement: r,
          allowFlatten: s = !1,
          finalKeyframe: a,
          onComplete: o,
        } = t;
        ((this.isPseudoElement = !!r),
          (this.allowFlatten = s),
          (this.options = t),
          tP(
            "string" != typeof t.type,
            'Mini animate() doesn\'t support "type" as a string.',
            "mini-spring",
          ));
        const l = (function ({ type: t, ...e }) {
          return ev(t) && em()
            ? t.applyToOptions(e)
            : (e.duration ?? (e.duration = 300),
              e.ease ?? (e.ease = "easeOut"),
              e);
        })(t);
        ((this.animation = (function (
          t,
          e,
          i,
          {
            delay: n = 0,
            duration: r = 300,
            repeat: s = 0,
            repeatType: a = "loop",
            ease: o = "easeOut",
            times: l,
          } = {},
          u,
        ) {
          let h = { [e]: i };
          l && (h.offset = l);
          let c = (function t(e, i) {
            if (e)
              return "function" == typeof e
                ? em()
                  ? ef(e, i)
                  : "ease-out"
                : ep(e)
                  ? eg(e)
                  : Array.isArray(e)
                    ? e.map((e) => t(e, i) || ey.easeOut)
                    : ey[e];
          })(o, r);
          Array.isArray(c) && (h.easing = c);
          let d = {
            delay: n,
            duration: r,
            easing: Array.isArray(c) ? "linear" : c,
            fill: "both",
            iterations: s + 1,
            direction: "reverse" === a ? "alternate" : "normal",
          };
          u && (d.pseudoElement = u);
          let p = t.animate(h, d);
          return p;
        })(e, i, n, l, r)),
          !1 === l.autoplay && this.animation.pause(),
          (this.animation.onfinish = () => {
            if (((this.finishedTime = this.time), !r)) {
              let t = eh(n, this.options, a, this.speed);
              (this.updateMotionValue && this.updateMotionValue(t),
                er(e, i, t),
                this.animation.cancel());
            }
            (o?.(), this.notifyFinished());
          }));
      }
      play() {
        this.isStopped ||
          ((this.manualStartTime = null),
          this.animation.play(),
          "finished" === this.state && this.updateFinished());
      }
      pause() {
        this.animation.pause();
      }
      complete() {
        this.animation.finish?.();
      }
      cancel() {
        try {
          this.animation.cancel();
        } catch (t) {}
      }
      stop() {
        if (this.isStopped) return;
        this.isStopped = !0;
        let { state: t } = this;
        "idle" !== t &&
          "finished" !== t &&
          (this.updateMotionValue
            ? this.updateMotionValue()
            : this.commitStyles(),
          this.isPseudoElement || this.cancel());
      }
      commitStyles() {
        let t = this.options?.element;
        !this.isPseudoElement &&
          t?.isConnected &&
          this.animation.commitStyles?.();
      }
      get duration() {
        return (
          Number(this.animation.effect?.getComputedTiming?.().duration || 0) /
          1e3
        );
      }
      get iterationDuration() {
        let { delay: t = 0 } = this.options || {};
        return this.duration + t / 1e3;
      }
      get time() {
        return (Number(this.animation.currentTime) || 0) / 1e3;
      }
      set time(t) {
        let e = null !== this.finishedTime;
        ((this.manualStartTime = null),
          (this.finishedTime = null),
          (this.animation.currentTime = et(t)),
          e && this.animation.pause());
      }
      get speed() {
        return this.animation.playbackRate;
      }
      set speed(t) {
        (t < 0 && (this.finishedTime = null),
          (this.animation.playbackRate = t));
      }
      get state() {
        return null !== this.finishedTime
          ? "finished"
          : this.animation.playState;
      }
      get startTime() {
        return this.manualStartTime ?? Number(this.animation.startTime);
      }
      set startTime(t) {
        this.manualStartTime = this.animation.startTime = t;
      }
      attachTimeline({ timeline: t, rangeStart: e, rangeEnd: i, observe: n }) {
        return (this.allowFlatten &&
          this.animation.effect?.updateTiming({ easing: "linear" }),
        (this.animation.onfinish = null),
        t && el())
          ? ((this.animation.timeline = t),
            e && (this.animation.rangeStart = e),
            i && (this.animation.rangeEnd = i),
            tX)
          : n(this);
      }
    }
    let ew = new Set(["opacity", "clipPath", "filter", "transform"]),
      { schedule: eb } = tq(queueMicrotask, !1);
    function eT() {
      e = void 0;
    }
    let eP = {
        now: () => (
          void 0 === e &&
            eP.set(
              tZ.isProcessing || tH.useManualTiming
                ? tZ.timestamp
                : performance.now(),
            ),
          e
        ),
        set: (t) => {
          ((e = t), queueMicrotask(eT));
        },
      },
      eS = (t, e) => (e ? (1e3 / e) * t : 0),
      ek;
    class eA {
      constructor(t, e = {}) {
        ((this.canTrackVelocity = null),
          (this.events = {}),
          (this.updateAndNotify = (t) => {
            let e = eP.now();
            if (
              (this.updatedAt !== e && this.setPrevFrameValue(),
              (this.prev = this.current),
              this.setCurrent(t),
              this.current !== this.prev &&
                (this.events.change?.notify(this.current), this.dependents))
            )
              for (let t of this.dependents) t.dirty();
          }),
          (this.hasAnimated = !1),
          this.setCurrent(t),
          (this.owner = e.owner));
      }
      setCurrent(t) {
        ((this.current = t),
          (this.updatedAt = eP.now()),
          null === this.canTrackVelocity &&
            void 0 !== t &&
            (this.canTrackVelocity = !isNaN(parseFloat(this.current))));
      }
      setPrevFrameValue(t = this.current) {
        ((this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt));
      }
      onChange(t) {
        return this.on("change", t);
      }
      on(t, e) {
        this.events[t] || (this.events[t] = new en());
        let i = this.events[t].add(e);
        return "change" === t
          ? () => {
              (i(),
                tK.read(() => {
                  this.events.change.getSize() || this.stop();
                }));
            }
          : i;
      }
      clearListeners() {
        for (let t in this.events) this.events[t].clear();
      }
      attach(t, e) {
        ((this.passiveEffect = t), (this.stopPassiveEffect = e));
      }
      set(t) {
        this.passiveEffect
          ? this.passiveEffect(t, this.updateAndNotify)
          : this.updateAndNotify(t);
      }
      setWithVelocity(t, e, i) {
        (this.set(e),
          (this.prev = void 0),
          (this.prevFrameValue = t),
          (this.prevUpdatedAt = this.updatedAt - i));
      }
      jump(t, e = !0) {
        (this.updateAndNotify(t),
          (this.prev = t),
          (this.prevUpdatedAt = this.prevFrameValue = void 0),
          e && this.stop(),
          this.stopPassiveEffect && this.stopPassiveEffect());
      }
      dirty() {
        this.events.change?.notify(this.current);
      }
      addDependent(t) {
        (this.dependents || (this.dependents = new Set()),
          this.dependents.add(t));
      }
      removeDependent(t) {
        this.dependents && this.dependents.delete(t);
      }
      get() {
        return (ek && ek.push(this), this.current);
      }
      getPrevious() {
        return this.prev;
      }
      getVelocity() {
        let t = eP.now();
        if (
          !this.canTrackVelocity ||
          void 0 === this.prevFrameValue ||
          t - this.updatedAt > 30
        )
          return 0;
        let e = Math.min(this.updatedAt - this.prevUpdatedAt, 30);
        return eS(
          parseFloat(this.current) - parseFloat(this.prevFrameValue),
          e,
        );
      }
      start(t) {
        return (
          this.stop(),
          new Promise((e) => {
            ((this.hasAnimated = !0),
              (this.animation = t(e)),
              this.events.animationStart &&
                this.events.animationStart.notify());
          }).then(() => {
            (this.events.animationComplete &&
              this.events.animationComplete.notify(),
              this.clearAnimation());
          })
        );
      }
      stop() {
        (this.animation &&
          (this.animation.stop(),
          this.events.animationCancel && this.events.animationCancel.notify()),
          this.clearAnimation());
      }
      isAnimating() {
        return !!this.animation;
      }
      clearAnimation() {
        delete this.animation;
      }
      destroy() {
        (this.dependents?.clear(),
          this.events.destroy?.notify(),
          this.clearListeners(),
          this.stop(),
          this.stopPassiveEffect && this.stopPassiveEffect());
      }
    }
    function eE(t, e) {
      return new eA(t, e);
    }
    let ej = [...tw, G, tn],
      eM = new WeakMap();
    function eC(t) {
      return null !== t && "object" == typeof t && "function" == typeof t.start;
    }
    function eV(t) {
      return "string" == typeof t || Array.isArray(t);
    }
    let eR = [
        "animate",
        "whileInView",
        "whileFocus",
        "whileHover",
        "whileTap",
        "whileDrag",
        "exit",
      ],
      eD = ["initial", ...eR];
    function eL(t) {
      return eC(t.animate) || eD.some((e) => eV(t[e]));
    }
    function eN(t) {
      return !!(eL(t) || t.variants);
    }
    let eB = { current: null },
      eF = { current: !1 },
      eO = "u" > typeof window;
    function eI(t) {
      let e = [{}, {}];
      return (
        t?.values.forEach((t, i) => {
          ((e[0][i] = t.get()), (e[1][i] = t.getVelocity()));
        }),
        e
      );
    }
    function e_(t, e, i, n) {
      if ("function" == typeof e) {
        let [r, s] = eI(n);
        e = e(void 0 !== i ? i : t.custom, r, s);
      }
      if (
        ("string" == typeof e && (e = t.variants && t.variants[e]),
        "function" == typeof e)
      ) {
        let [r, s] = eI(n);
        e = e(void 0 !== i ? i : t.custom, r, s);
      }
      return e;
    }
    let e$ = [
        "AnimationStart",
        "AnimationComplete",
        "Update",
        "BeforeLayoutMeasure",
        "LayoutMeasure",
        "LayoutAnimationStart",
        "LayoutAnimationComplete",
      ],
      eU = {};
    class eW {
      scrapeMotionValuesFromProps(t, e, i) {
        return {};
      }
      constructor(
        {
          parent: t,
          props: e,
          presenceContext: i,
          reducedMotionConfig: n,
          skipAnimations: r,
          blockInitialAnimation: s,
          visualState: a,
        },
        o = {},
      ) {
        ((this.current = null),
          (this.children = new Set()),
          (this.isVariantNode = !1),
          (this.isControllingVariants = !1),
          (this.shouldReduceMotion = null),
          (this.shouldSkipAnimations = !1),
          (this.values = new Map()),
          (this.KeyframeResolver = t4),
          (this.features = {}),
          (this.valueSubscriptions = new Map()),
          (this.prevMotionValues = {}),
          (this.hasBeenMounted = !1),
          (this.events = {}),
          (this.propEventSubscriptions = {}),
          (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
          (this.render = () => {
            this.current &&
              (this.triggerBuild(),
              this.renderInstance(
                this.current,
                this.renderState,
                this.props.style,
                this.projection,
              ));
          }),
          (this.renderScheduledAt = 0),
          (this.scheduleRender = () => {
            let t = eP.now();
            this.renderScheduledAt < t &&
              ((this.renderScheduledAt = t), tK.render(this.render, !1, !0));
          }));
        const { latestValues: l, renderState: u } = a;
        ((this.latestValues = l),
          (this.baseTarget = { ...l }),
          (this.initialValues = e.initial ? { ...l } : {}),
          (this.renderState = u),
          (this.parent = t),
          (this.props = e),
          (this.presenceContext = i),
          (this.depth = t ? t.depth + 1 : 0),
          (this.reducedMotionConfig = n),
          (this.skipAnimationsConfig = r),
          (this.options = o),
          (this.blockInitialAnimation = !!s),
          (this.isControllingVariants = eL(e)),
          (this.isVariantNode = eN(e)),
          this.isVariantNode && (this.variantChildren = new Set()),
          (this.manuallyAnimateOnMount = !!(t && t.current)));
        const { willChange: h, ...c } = this.scrapeMotionValuesFromProps(
          e,
          {},
          this,
        );
        for (const t in c) {
          const e = c[t];
          void 0 !== l[t] && ty(e) && e.set(l[t]);
        }
      }
      mount(t) {
        if (this.hasBeenMounted)
          for (let t in this.initialValues)
            (this.values.get(t)?.jump(this.initialValues[t]),
              (this.latestValues[t] = this.initialValues[t]));
        ((this.current = t),
          eM.set(t, this),
          this.projection &&
            !this.projection.instance &&
            this.projection.mount(t),
          this.parent &&
            this.isVariantNode &&
            !this.isControllingVariants &&
            (this.removeFromVariantTree = this.parent.addVariantChild(this)),
          this.values.forEach((t, e) => this.bindToMotionValue(e, t)),
          "never" === this.reducedMotionConfig
            ? (this.shouldReduceMotion = !1)
            : "always" === this.reducedMotionConfig
              ? (this.shouldReduceMotion = !0)
              : (eF.current ||
                  (function () {
                    if (((eF.current = !0), eO))
                      if (window.matchMedia) {
                        let t = window.matchMedia("(prefers-reduced-motion)"),
                          e = () => (eB.current = t.matches);
                        (t.addEventListener("change", e), e());
                      } else eB.current = !1;
                  })(),
                (this.shouldReduceMotion = eB.current)),
          (this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1),
          this.parent?.addChild(this),
          this.update(this.props, this.presenceContext),
          (this.hasBeenMounted = !0));
      }
      unmount() {
        for (let t in (this.projection && this.projection.unmount(),
        tG(this.notifyUpdate),
        tG(this.render),
        this.valueSubscriptions.forEach((t) => t()),
        this.valueSubscriptions.clear(),
        this.removeFromVariantTree && this.removeFromVariantTree(),
        this.parent?.removeChild(this),
        this.events))
          this.events[t].clear();
        for (let t in this.features) {
          let e = this.features[t];
          e && (e.unmount(), (e.isMounted = !1));
        }
        this.current = null;
      }
      addChild(t) {
        (this.children.add(t),
          this.enteringChildren ?? (this.enteringChildren = new Set()),
          this.enteringChildren.add(t));
      }
      removeChild(t) {
        (this.children.delete(t),
          this.enteringChildren && this.enteringChildren.delete(t));
      }
      bindToMotionValue(t, e) {
        let i;
        if (
          (this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)(),
          e.accelerate && ew.has(t) && this.current instanceof HTMLElement)
        ) {
          let {
              factory: i,
              keyframes: n,
              times: r,
              ease: s,
              duration: a,
            } = e.accelerate,
            o = new ex({
              element: this.current,
              name: t,
              keyframes: n,
              times: r,
              ease: s,
              duration: et(a),
            }),
            l = i(o);
          this.valueSubscriptions.set(t, () => {
            (l(), o.cancel());
          });
          return;
        }
        let n = M.has(t);
        n && this.onBindTransform && this.onBindTransform();
        let r = e.on("change", (e) => {
          ((this.latestValues[t] = e),
            this.props.onUpdate && tK.preRender(this.notifyUpdate),
            n && this.projection && (this.projection.isTransformDirty = !0),
            this.scheduleRender());
        });
        ("u" > typeof window &&
          window.MotionCheckAppearSync &&
          (i = window.MotionCheckAppearSync(this, t, e)),
          this.valueSubscriptions.set(t, () => {
            (r(), i && i());
          }));
      }
      sortNodePosition(t) {
        return this.current &&
          this.sortInstanceNodePosition &&
          this.type === t.type
          ? this.sortInstanceNodePosition(this.current, t.current)
          : 0;
      }
      updateFeatures() {
        let t = "animation";
        for (t in eU) {
          let e = eU[t];
          if (!e) continue;
          let { isEnabled: i, Feature: n } = e;
          if (
            (!this.features[t] &&
              n &&
              i(this.props) &&
              (this.features[t] = new n(this)),
            this.features[t])
          ) {
            let e = this.features[t];
            e.isMounted ? e.update() : (e.mount(), (e.isMounted = !0));
          }
        }
      }
      triggerBuild() {
        this.build(this.renderState, this.latestValues, this.props);
      }
      measureViewportBox() {
        return this.current
          ? this.measureInstanceViewportBox(this.current, this.props)
          : tg();
      }
      getStaticValue(t) {
        return this.latestValues[t];
      }
      setStaticValue(t, e) {
        this.latestValues[t] = e;
      }
      update(t, e) {
        ((t.transformTemplate || this.props.transformTemplate) &&
          this.scheduleRender(),
          (this.prevProps = this.props),
          (this.props = t),
          (this.prevPresenceContext = this.presenceContext),
          (this.presenceContext = e));
        for (let e = 0; e < e$.length; e++) {
          let i = e$[e];
          this.propEventSubscriptions[i] &&
            (this.propEventSubscriptions[i](),
            delete this.propEventSubscriptions[i]);
          let n = t["on" + i];
          n && (this.propEventSubscriptions[i] = this.on(i, n));
        }
        ((this.prevMotionValues = (function (t, e, i) {
          for (let n in e) {
            let r = e[n],
              s = i[n];
            if (ty(r)) t.addValue(n, r);
            else if (ty(s)) t.addValue(n, eE(r, { owner: t }));
            else if (s !== r)
              if (t.hasValue(n)) {
                let e = t.getValue(n);
                !0 === e.liveStyle ? e.jump(r) : e.hasAnimated || e.set(r);
              } else {
                let e = t.getStaticValue(n);
                t.addValue(n, eE(void 0 !== e ? e : r, { owner: t }));
              }
          }
          for (let n in i) void 0 === e[n] && t.removeValue(n);
          return e;
        })(
          this,
          this.scrapeMotionValuesFromProps(t, this.prevProps || {}, this),
          this.prevMotionValues,
        )),
          this.handleChildMotionValue && this.handleChildMotionValue());
      }
      getProps() {
        return this.props;
      }
      getVariant(t) {
        return this.props.variants ? this.props.variants[t] : void 0;
      }
      getDefaultTransition() {
        return this.props.transition;
      }
      getTransformPagePoint() {
        return this.props.transformPagePoint;
      }
      getClosestVariantNode() {
        return this.isVariantNode
          ? this
          : this.parent
            ? this.parent.getClosestVariantNode()
            : void 0;
      }
      addVariantChild(t) {
        let e = this.getClosestVariantNode();
        if (e)
          return (
            e.variantChildren && e.variantChildren.add(t),
            () => e.variantChildren.delete(t)
          );
      }
      addValue(t, e) {
        let i = this.values.get(t);
        e !== i &&
          (i && this.removeValue(t),
          this.bindToMotionValue(t, e),
          this.values.set(t, e),
          (this.latestValues[t] = e.get()));
      }
      removeValue(t) {
        this.values.delete(t);
        let e = this.valueSubscriptions.get(t);
        (e && (e(), this.valueSubscriptions.delete(t)),
          delete this.latestValues[t],
          this.removeValueFromRenderState(t, this.renderState));
      }
      hasValue(t) {
        return this.values.has(t);
      }
      getValue(t, e) {
        if (this.props.values && this.props.values[t])
          return this.props.values[t];
        let i = this.values.get(t);
        return (
          void 0 === i &&
            void 0 !== e &&
            ((i = eE(null === e ? void 0 : e, { owner: this })),
            this.addValue(t, i)),
          i
        );
      }
      readValue(t, e) {
        let i =
          void 0 === this.latestValues[t] && this.current
            ? (this.getBaseTargetFromProps(this.props, t) ??
              this.readValueFromInstance(this.current, t, this.options))
            : this.latestValues[t];
        if (null != i) {
          let n, r;
          if (
            "string" == typeof i &&
            ((n = i),
            /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n) ||
              ((r = i), /^0[^.\s]+$/u.test(r)))
          )
            i = parseFloat(i);
          else {
            let n;
            ((n = i), !ej.find(tx(n)) && tn.test(e) && (i = t6(t, e)));
          }
          this.setBaseTarget(t, ty(i) ? i.get() : i);
        }
        return ty(i) ? i.get() : i;
      }
      setBaseTarget(t, e) {
        this.baseTarget[t] = e;
      }
      getBaseTarget(t) {
        let e,
          { initial: i } = this.props;
        if ("string" == typeof i || "object" == typeof i) {
          let n = e_(this.props, i, this.presenceContext?.custom);
          n && (e = n[t]);
        }
        if (i && void 0 !== e) return e;
        let n = this.getBaseTargetFromProps(this.props, t);
        return void 0 === n || ty(n)
          ? void 0 !== this.initialValues[t] && void 0 === e
            ? void 0
            : this.baseTarget[t]
          : n;
      }
      on(t, e) {
        return (
          this.events[t] || (this.events[t] = new en()),
          this.events[t].add(e)
        );
      }
      notify(t, ...e) {
        this.events[t] && this.events[t].notify(...e);
      }
      scheduleRenderMicrotask() {
        eb.render(this.render);
      }
    }
    class ez extends eW {
      constructor() {
        (super(...arguments), (this.KeyframeResolver = t7));
      }
      sortInstanceNodePosition(t, e) {
        return 2 & t.compareDocumentPosition(e) ? 1 : -1;
      }
      getBaseTargetFromProps(t, e) {
        let i = t.style;
        return i ? i[e] : void 0;
      }
      removeValueFromRenderState(t, { vars: e, style: i }) {
        (delete e[t], delete i[t]);
      }
      handleChildMotionValue() {
        this.childSubscription &&
          (this.childSubscription(), delete this.childSubscription);
        let { children: t } = this.props;
        ty(t) &&
          (this.childSubscription = t.on("change", (t) => {
            this.current && (this.current.textContent = `${t}`);
          }));
      }
    }
    function eX(t) {
      return t.replace(/([A-Z])/g, (t) => `-${t.toLowerCase()}`);
    }
    let eH = (t, e) => (e && "number" == typeof t ? e.transform(t) : t),
      eY = {
        x: "translateX",
        y: "translateY",
        z: "translateZ",
        transformPerspective: "perspective",
      },
      eq = j.length;
    function eK(t, e, i) {
      let { style: n, vars: r, transformOrigin: s } = t,
        a = !1,
        o = !1;
      for (let t in e) {
        let i = e[t];
        if (M.has(t)) {
          a = !0;
          continue;
        }
        if (tk(t)) {
          r[t] = i;
          continue;
        }
        {
          let e = eH(i, th[t]);
          t.startsWith("origin") ? ((o = !0), (s[t] = e)) : (n[t] = e);
        }
      }
      if (
        (!e.transform &&
          (a || i
            ? (n.transform = (function (t, e, i) {
                let n = "",
                  r = !0;
                for (let s = 0; s < eq; s++) {
                  let a = j[s],
                    o = t[a];
                  if (void 0 === o) continue;
                  let l = !0;
                  if ("number" == typeof o) l = o === +!!a.startsWith("scale");
                  else {
                    let t = parseFloat(o);
                    l = a.startsWith("scale") ? 1 === t : 0 === t;
                  }
                  if (!l || i) {
                    let t = eH(o, th[a]);
                    if (!l) {
                      r = !1;
                      let e = eY[a] || a;
                      n += `${e}(${t}) `;
                    }
                    i && (e[a] = t);
                  }
                }
                let s = t.pathRotation;
                return (
                  s && ((r = !1), (n += `rotate(${eH(s, th.pathRotation)}) `)),
                  (n = n.trim()),
                  i ? (n = i(e, r ? "" : n)) : r && (n = "none"),
                  n
                );
              })(e, t.transform, i))
            : n.transform && (n.transform = "none")),
        o)
      ) {
        let { originX: t = "50%", originY: e = "50%", originZ: i = 0 } = s;
        n.transformOrigin = `${t} ${e} ${i}`;
      }
    }
    let eG = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
      eZ = { offset: "strokeDashoffset", array: "strokeDasharray" },
      eJ = ["offsetDistance", "offsetPath", "offsetRotate", "offsetAnchor"];
    function eQ(
      t,
      {
        attrX: e,
        attrY: i,
        attrScale: n,
        pathLength: r,
        pathSpacing: s = 1,
        pathOffset: a = 0,
        ...o
      },
      l,
      u,
      h,
    ) {
      if ((eK(t, o, u), l)) {
        t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
        return;
      }
      ((t.attrs = t.style), (t.style = {}));
      let { attrs: c, style: d } = t;
      for (let t of (c.transform &&
        ((d.transform = c.transform), delete c.transform),
      (d.transform || c.transformOrigin) &&
        ((d.transformOrigin = c.transformOrigin ?? "50% 50%"),
        delete c.transformOrigin),
      d.transform &&
        ((d.transformBox = h?.transformBox ?? "fill-box"),
        delete c.transformBox),
      eJ))
        void 0 !== c[t] && ((d[t] = c[t]), delete c[t]);
      (void 0 !== e && (c.x = e),
        void 0 !== i && (c.y = i),
        void 0 !== n && (c.scale = n),
        void 0 !== r &&
          (function (t, e, i = 1, n = 0, r = !0) {
            t.pathLength = 1;
            let s = r ? eG : eZ;
            ((t[s.offset] = `${-n}`), (t[s.array] = `${e} ${i}`));
          })(c, r, s, a, !1));
    }
    let e0 = new Set([
        "baseFrequency",
        "diffuseConstant",
        "kernelMatrix",
        "kernelUnitLength",
        "keySplines",
        "keyTimes",
        "limitingConeAngle",
        "markerHeight",
        "markerWidth",
        "numOctaves",
        "targetX",
        "targetY",
        "surfaceScale",
        "specularConstant",
        "specularExponent",
        "stdDeviation",
        "tableValues",
        "viewBox",
        "gradientTransform",
        "pathLength",
        "startOffset",
        "textLength",
        "lengthAdjust",
      ]),
      e1 = (t) => "string" == typeof t && "svg" === t.toLowerCase();
    function e5(t, { style: e, vars: i }, n, r) {
      let s,
        a = t.style;
      for (s in e) a[s] = e[s];
      for (s in (r?.applyProjectionStyles(a, n), i)) a.setProperty(s, i[s]);
    }
    function e2(t, e) {
      return e.max === e.min ? 0 : (t / (e.max - e.min)) * 100;
    }
    let e3 = {
        correct: (t, e) => {
          if (!e.target) return t;
          if ("string" == typeof t)
            if (!X.test(t)) return t;
            else t = parseFloat(t);
          let i = e2(t, e.target.x),
            n = e2(t, e.target.y);
          return `${i}% ${n}%`;
        },
      },
      e4 = (t, e, i) => t + (e - t) * i,
      e9 = {
        borderRadius: {
          ...e3,
          applyTo: [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomLeftRadius",
            "borderBottomRightRadius",
          ],
        },
        borderTopLeftRadius: e3,
        borderTopRightRadius: e3,
        borderBottomLeftRadius: e3,
        borderBottomRightRadius: e3,
        boxShadow: {
          correct: (t, { treeScale: e, projectionDelta: i }) => {
            let n = tn.parse(t);
            if (n.length > 5) return t;
            let r = tn.createTransformer(t),
              s = +("number" != typeof n[0]),
              a = i.x.scale * e.x,
              o = i.y.scale * e.y;
            ((n[0 + s] /= a), (n[1 + s] /= o));
            let l = e4(a, o, 0.5);
            return (
              "number" == typeof n[2 + s] && (n[2 + s] /= l),
              "number" == typeof n[3 + s] && (n[3 + s] /= l),
              r(n)
            );
          },
        },
      };
    function e6(t, { layout: e, layoutId: i }) {
      return (
        M.has(t) ||
        t.startsWith("origin") ||
        ((e || void 0 !== i) && (!!e9[t] || "opacity" === t))
      );
    }
    function e8(t, e, i) {
      let n = t.style,
        r = e?.style,
        s = {};
      if (!n) return s;
      for (let e in n)
        (ty(n[e]) ||
          (r && ty(r[e])) ||
          e6(e, t) ||
          i?.getValue(e)?.liveStyle !== void 0) &&
          (s[e] = n[e]);
      return s;
    }
    function e7(t, e, i) {
      let n = e8(t, e, i);
      for (let i in t)
        (ty(t[i]) || ty(e[i])) &&
          (n[
            -1 !== j.indexOf(i)
              ? "attr" + i.charAt(0).toUpperCase() + i.substring(1)
              : i
          ] = t[i]);
      return n;
    }
    class it extends ez {
      constructor() {
        (super(...arguments),
          (this.type = "svg"),
          (this.isSVGTag = !1),
          (this.measureInstanceViewportBox = tg));
      }
      getBaseTargetFromProps(t, e) {
        return t[e];
      }
      readValueFromInstance(t, e) {
        if (M.has(e)) {
          let t = td(e);
          return (t && t.default) || 0;
        }
        return ((e = e0.has(e) ? e : eX(e)), t.getAttribute(e));
      }
      scrapeMotionValuesFromProps(t, e, i) {
        return e7(t, e, i);
      }
      build(t, e, i) {
        eQ(t, e, this.isSVGTag, i.transformTemplate, i.style);
      }
      renderInstance(t, e, i, n) {
        for (let i in (e5(t, e, void 0, n), e.attrs))
          t.setAttribute(e0.has(i) ? i : eX(i), e.attrs[i]);
      }
      mount(t) {
        ((this.isSVGTag = e1(t.tagName)), super.mount(t));
      }
    }
    function ie({ top: t, left: e, right: i, bottom: n }) {
      return { x: { min: e, max: i }, y: { min: t, max: n } };
    }
    function ii(t) {
      return void 0 === t || 1 === t;
    }
    function ir({ scale: t, scaleX: e, scaleY: i }) {
      return !ii(t) || !ii(e) || !ii(i);
    }
    function is(t) {
      return (
        ir(t) ||
        ia(t) ||
        t.z ||
        t.rotate ||
        t.rotateX ||
        t.rotateY ||
        t.skewX ||
        t.skewY
      );
    }
    function ia(t) {
      var e, i;
      return ((e = t.x) && "0%" !== e) || ((i = t.y) && "0%" !== i);
    }
    function io(t, e, i, n, r) {
      return (void 0 !== r && (t = n + r * (t - n)), n + i * (t - n) + e);
    }
    function il(t, e = 0, i = 1, n, r) {
      ((t.min = io(t.min, e, i, n, r)), (t.max = io(t.max, e, i, n, r)));
    }
    function iu(t, { x: e, y: i }) {
      (il(t.x, e.translate, e.scale, e.originPoint),
        il(t.y, i.translate, i.scale, i.originPoint));
    }
    function ih(t, e) {
      ((t.min += e), (t.max += e));
    }
    function ic(t, e, i, n, r = 0.5) {
      let s = e4(t.min, t.max, r);
      il(t, e, i, s, n);
    }
    function id(t, e) {
      return "string" == typeof t ? (parseFloat(t) / 100) * (e.max - e.min) : t;
    }
    function ip(t, e, i) {
      let n = i ?? t;
      (ic(t.x, id(e.x, n.x), e.scaleX, e.scale, e.originX),
        ic(t.y, id(e.y, n.y), e.scaleY, e.scale, e.originY));
    }
    function im(t, e) {
      return ie(
        (function (t, e) {
          if (!e) return t;
          let i = e({ x: t.left, y: t.top }),
            n = e({ x: t.right, y: t.bottom });
          return { top: i.y, left: i.x, bottom: n.y, right: n.x };
        })(t.getBoundingClientRect(), e),
      );
    }
    class ig extends ez {
      constructor() {
        (super(...arguments), (this.type = "html"), (this.renderInstance = e5));
      }
      readValueFromInstance(t, e) {
        if (M.has(e))
          return this.projection?.isProjecting
            ? tO(e)
            : ((t, e) => {
                let { transform: i = "none" } = getComputedStyle(t);
                return tI(i, e);
              })(t, e);
        {
          let i = window.getComputedStyle(t),
            n = (tk(e) ? i.getPropertyValue(e) : i[e]) || 0;
          return "string" == typeof n ? n.trim() : n;
        }
      }
      measureInstanceViewportBox(t, { transformPagePoint: e }) {
        return im(t, e);
      }
      build(t, e, i) {
        eK(t, e, i.transformTemplate);
      }
      scrapeMotionValuesFromProps(t, e, i) {
        return e8(t, e, i);
      }
    }
    let iy = [
      "animate",
      "circle",
      "defs",
      "desc",
      "ellipse",
      "g",
      "image",
      "line",
      "filter",
      "marker",
      "mask",
      "metadata",
      "path",
      "pattern",
      "polygon",
      "polyline",
      "rect",
      "stop",
      "switch",
      "symbol",
      "svg",
      "text",
      "tspan",
      "use",
      "view",
    ];
    function iv(t) {
      if ("string" != typeof t || t.includes("-"));
      else if (iy.indexOf(t) > -1 || /[A-Z]/u.test(t)) return !0;
      return !1;
    }
    let ix = (0, a.createContext)({ strict: !1 }),
      iw = (0, a.createContext)({});
    function ib(t) {
      return Array.isArray(t) ? t.join(" ") : t;
    }
    let iT = () => ({
      style: {},
      transform: {},
      transformOrigin: {},
      vars: {},
    });
    function iP(t, e, i) {
      for (let n in e) ty(e[n]) || e6(n, i) || (t[n] = e[n]);
    }
    let iS = () => ({ ...iT(), attrs: {} }),
      ik = new Set([
        "animate",
        "exit",
        "variants",
        "initial",
        "style",
        "values",
        "variants",
        "transition",
        "transformTemplate",
        "custom",
        "inherit",
        "onBeforeLayoutMeasure",
        "onAnimationStart",
        "onAnimationComplete",
        "onUpdate",
        "onDragStart",
        "onDrag",
        "onDragEnd",
        "onMeasureDragConstraints",
        "onDirectionLock",
        "onDragTransitionEnd",
        "_dragX",
        "_dragY",
        "onHoverStart",
        "onHoverEnd",
        "onViewportEnter",
        "onViewportLeave",
        "globalTapTarget",
        "propagate",
        "ignoreStrict",
        "viewport",
      ]);
    function iA(t) {
      return (
        t.startsWith("while") ||
        (t.startsWith("drag") && "draggable" !== t) ||
        t.startsWith("layout") ||
        t.startsWith("onTap") ||
        t.startsWith("onPan") ||
        t.startsWith("onLayout") ||
        ik.has(t)
      );
    }
    let iE = (t) => !iA(t);
    try {
      ((r = (() => {
        let t = Error("Cannot find module '@emotion/is-prop-valid'");
        throw ((t.code = "MODULE_NOT_FOUND"), t);
      })().default),
        "function" == typeof r &&
          (iE = (t) => (t.startsWith("on") ? !iA(t) : r(t))));
    } catch {}
    function ij(t) {
      return ty(t) ? t.get() : t;
    }
    let iM = (t) => (e, i) => {
        let n = (0, a.useContext)(iw),
          r = (0, a.useContext)(m),
          s = () =>
            (function (
              { scrapeMotionValuesFromProps: t, createRenderState: e },
              i,
              n,
              r,
            ) {
              return {
                latestValues: (function (t, e, i, n) {
                  let r = {},
                    s = n(t, {});
                  for (let t in s) r[t] = ij(s[t]);
                  let { initial: a, animate: o } = t,
                    l = eL(t),
                    u = eN(t);
                  e &&
                    u &&
                    !l &&
                    !1 !== t.inherit &&
                    (void 0 === a && (a = e.initial),
                    void 0 === o && (o = e.animate));
                  let h = !!i && !1 === i.initial,
                    c = (h = h || !1 === a) ? o : a;
                  if (c && "boolean" != typeof c && !eC(c)) {
                    let e = Array.isArray(c) ? c : [c];
                    for (let i = 0; i < e.length; i++) {
                      let n = e_(t, e[i]);
                      if (n) {
                        let { transitionEnd: t, transition: e, ...i } = n;
                        for (let t in i) {
                          let e = i[t];
                          if (Array.isArray(e)) {
                            let t = h ? e.length - 1 : 0;
                            e = e[t];
                          }
                          null !== e && (r[t] = e);
                        }
                        for (let e in t) r[e] = t[e];
                      }
                    }
                  }
                  return r;
                })(i, n, r, t),
                renderState: e(),
              };
            })(t, e, n, r);
        return i ? s() : d(s);
      },
      iC = iM({ scrapeMotionValuesFromProps: e8, createRenderState: iT }),
      iV = iM({ scrapeMotionValuesFromProps: e7, createRenderState: iS }),
      iR = {
        animation: [
          "animate",
          "variants",
          "whileHover",
          "whileTap",
          "exit",
          "whileInView",
          "whileFocus",
          "whileDrag",
        ],
        exit: ["exit"],
        drag: ["drag", "dragControls"],
        focus: ["whileFocus"],
        hover: ["whileHover", "onHoverStart", "onHoverEnd"],
        tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
        pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
        inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
        layout: ["layout", "layoutId"],
      },
      iD = !1;
    function iL() {
      return (
        !(function () {
          if (iD) return;
          let t = {};
          for (let e in iR)
            t[e] = { isEnabled: (t) => iR[e].some((e) => !!t[e]) };
          ((eU = t), (iD = !0));
        })(),
        eU
      );
    }
    let iN = Symbol.for("motionComponentSymbol"),
      iB = "data-" + eX("framerAppearId"),
      iF = (0, a.createContext)({});
    function iO(t) {
      return (
        t &&
        "object" == typeof t &&
        Object.prototype.hasOwnProperty.call(t, "current")
      );
    }
    function iI(t, { forwardMotionProps: e = !1, type: i } = {}, n, r) {
      n &&
        (function (t) {
          let e = iL();
          for (let i in t) e[i] = { ...e[i], ...t[i] };
          eU = e;
        })(n);
      let o = i ? "svg" === i : iv(t),
        l = o ? iV : iC;
      function u(i, n) {
        var u;
        let h,
          d,
          f,
          g = {
            ...(0, a.useContext)(v),
            ...i,
            layoutId: (function ({ layoutId: t }) {
              let e = (0, a.useContext)(c).id;
              return e && void 0 !== t ? e + "-" + t : t;
            })(i),
          },
          { isStatic: y } = g,
          x = (function (t) {
            let { initial: e, animate: i } = (function (t, e) {
              if (eL(t)) {
                let { initial: e, animate: i } = t;
                return {
                  initial: !1 === e || eV(e) ? e : void 0,
                  animate: eV(i) ? i : void 0,
                };
              }
              return !1 !== t.inherit ? e : {};
            })(t, (0, a.useContext)(iw));
            return (0, a.useMemo)(
              () => ({ initial: e, animate: i }),
              [ib(e), ib(i)],
            );
          })(i),
          w = l(i, y);
        if (!y && "u" > typeof window) {
          (0, a.useContext)(ix).strict;
          let e = (function (t) {
            let { drag: e, layout: i } = iL();
            if (!e && !i) return {};
            let n = { ...e, ...i };
            return {
              MeasureLayout:
                e?.isEnabled(t) || i?.isEnabled(t) ? n.MeasureLayout : void 0,
              ProjectionNode: n.ProjectionNode,
            };
          })(g);
          ((h = e.MeasureLayout),
            (x.visualElement = (function (t, e, i, n, r, s) {
              let { visualElement: o } = (0, a.useContext)(iw),
                l = (0, a.useContext)(ix),
                u = (0, a.useContext)(m),
                h = (0, a.useContext)(v),
                c = h.reducedMotion,
                d = h.skipAnimations,
                f = (0, a.useRef)(null),
                g = (0, a.useRef)(!1);
              ((n = n || l.renderer),
                !f.current &&
                  n &&
                  ((f.current = n(t, {
                    visualState: e,
                    parent: o,
                    props: i,
                    presenceContext: u,
                    blockInitialAnimation: !!u && !1 === u.initial,
                    reducedMotionConfig: c,
                    skipAnimations: d,
                    isSVG: s,
                  })),
                  g.current &&
                    f.current &&
                    (f.current.manuallyAnimateOnMount = !0)));
              let y = f.current,
                x = (0, a.useContext)(iF);
              y &&
                !y.projection &&
                r &&
                ("html" === y.type || "svg" === y.type) &&
                (function (t, e, i, n) {
                  let {
                    layoutId: r,
                    layout: s,
                    drag: a,
                    dragConstraints: o,
                    layoutScroll: l,
                    layoutRoot: u,
                    layoutAnchor: h,
                    layoutCrossfade: c,
                  } = e;
                  ((t.projection = new i(
                    t.latestValues,
                    e["data-framer-portal-id"]
                      ? void 0
                      : (function t(e) {
                          if (e)
                            return !1 !== e.options.allowProjection
                              ? e.projection
                              : t(e.parent);
                        })(t.parent),
                  )),
                    t.projection.setOptions({
                      layoutId: r,
                      layout: s,
                      alwaysMeasureLayout: !!a || (o && iO(o)),
                      visualElement: t,
                      animationType: "string" == typeof s ? s : "both",
                      initialPromotionConfig: n,
                      crossfade: c,
                      layoutScroll: l,
                      layoutRoot: u,
                      layoutAnchor: h,
                    }));
                })(f.current, i, r, x);
              let w = (0, a.useRef)(!1);
              (0, a.useInsertionEffect)(() => {
                y && w.current && y.update(i, u);
              });
              let b = i[iB],
                T = (0, a.useRef)(
                  !!b &&
                    "u" > typeof window &&
                    !window.MotionHandoffIsComplete?.(b) &&
                    window.MotionHasOptimisedAnimation?.(b),
                );
              return (
                p(() => {
                  ((g.current = !0),
                    y &&
                      ((w.current = !0),
                      (window.MotionIsMounted = !0),
                      y.updateFeatures(),
                      y.scheduleRenderMicrotask(),
                      T.current &&
                        y.animationState &&
                        y.animationState.animateChanges()));
                }),
                (0, a.useEffect)(() => {
                  y &&
                    (!T.current &&
                      y.animationState &&
                      y.animationState.animateChanges(),
                    T.current &&
                      (queueMicrotask(() => {
                        window.MotionHandoffMarkAsComplete?.(b);
                      }),
                      (T.current = !1)),
                    (y.enteringChildren = void 0));
                }),
                y
              );
            })(t, w, g, r, e.ProjectionNode, o)));
        }
        return (0, s.jsxs)(iw.Provider, {
          value: x,
          children: [
            h && x.visualElement
              ? (0, s.jsx)(h, { visualElement: x.visualElement, ...g })
              : null,
            (function (t, e, i, { latestValues: n }, r, s = !1, o) {
              let l = (
                  (o ?? iv(t))
                    ? function (t, e, i, n) {
                        let r = (0, a.useMemo)(() => {
                          let i = iS();
                          return (
                            eQ(i, e, e1(n), t.transformTemplate, t.style),
                            { ...i.attrs, style: { ...i.style } }
                          );
                        }, [e]);
                        if (t.style) {
                          let e = {};
                          (iP(e, t.style, t), (r.style = { ...e, ...r.style }));
                        }
                        return r;
                      }
                    : function (t, e) {
                        let i,
                          n,
                          r = {},
                          s =
                            ((i = t.style || {}),
                            iP((n = {}), i, t),
                            Object.assign(
                              n,
                              (function ({ transformTemplate: t }, e) {
                                return (0, a.useMemo)(() => {
                                  let i = iT();
                                  return (
                                    eK(i, e, t),
                                    Object.assign({}, i.vars, i.style)
                                  );
                                }, [e]);
                              })(t, e),
                            ),
                            n);
                        return (
                          t.drag &&
                            !1 !== t.dragListener &&
                            ((r.draggable = !1),
                            (s.userSelect =
                              s.WebkitUserSelect =
                              s.WebkitTouchCallout =
                                "none"),
                            (s.touchAction =
                              !0 === t.drag
                                ? "none"
                                : `pan-${"x" === t.drag ? "y" : "x"}`)),
                          void 0 === t.tabIndex &&
                            (t.onTap || t.onTapStart || t.whileTap) &&
                            (r.tabIndex = 0),
                          (r.style = s),
                          r
                        );
                      }
                )(e, n, r, t),
                u = (function (t, e, i) {
                  let n = {};
                  for (let r in t)
                    ("values" !== r || "object" != typeof t.values) &&
                      !ty(t[r]) &&
                      (iE(r) ||
                        (!0 === i && iA(r)) ||
                        (!e && !iA(r)) ||
                        (t.draggable && r.startsWith("onDrag"))) &&
                      (n[r] = t[r]);
                  return n;
                })(e, "string" == typeof t, s),
                h = t !== a.Fragment ? { ...u, ...l, ref: i } : {},
                { children: c } = e,
                d = (0, a.useMemo)(() => (ty(c) ? c.get() : c), [c]);
              return (0, a.createElement)(t, { ...h, children: d });
            })(
              t,
              i,
              ((u = x.visualElement),
              (d = (0, a.useRef)(n)),
              (0, a.useInsertionEffect)(() => {
                d.current = n;
              }),
              (f = (0, a.useRef)(null)),
              (0, a.useCallback)(
                (t) => {
                  (t && w.onMount?.(t), u && (t ? u.mount(t) : u.unmount()));
                  let e = d.current;
                  if ("function" == typeof e)
                    if (t) {
                      let i = e(t);
                      "function" == typeof i && (f.current = i);
                    } else f.current ? (f.current(), (f.current = null)) : e(t);
                  else e && (e.current = t);
                },
                [u],
              )),
              w,
              y,
              e,
              o,
            ),
          ],
        });
      }
      u.displayName = `motion.${"string" == typeof t ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
      let h = (0, a.forwardRef)(u);
      return ((h[iN] = t), h);
    }
    class i_ {
      constructor(t) {
        ((this.isMounted = !1), (this.node = t));
      }
      update() {}
    }
    function i$(t, e, i) {
      let n = t.getProps();
      return e_(n, e, void 0 !== i ? i : n.custom, t);
    }
    function iU(t, e) {
      if (t?.inherit && e) {
        let { inherit: i, ...n } = t;
        return { ...e, ...n };
      }
      return t;
    }
    function iW(t, e) {
      let i = t?.[e] ?? t?.default ?? t;
      return i !== t ? iU(i, t) : i;
    }
    let iz = (t) => Array.isArray(t);
    function iX(t, e) {
      let i = t.getValue("willChange");
      if (ty(i) && i.add) return i.add(e);
      if (!i && tH.WillChange) {
        let i = new tH.WillChange("auto");
        (t.addValue("willChange", i), i.add(e));
      }
    }
    let iH = (...t) => t.reduce((t, e) => (i) => e(t(i)));
    function iY(t, e, i) {
      return (i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6)
        ? t + (e - t) * 6 * i
        : i < 0.5
          ? e
          : i < 2 / 3
            ? t + (e - t) * (2 / 3 - i) * 6
            : t;
    }
    function iq(t, e) {
      return (i) => (i > 0 ? e : t);
    }
    let iK = (t, e, i) => {
        let n = t * t,
          r = i * (e * e - n) + n;
        return r < 0 ? 0 : Math.sqrt(r);
      },
      iG = [$, _, K];
    function iZ(t) {
      let e = iG.find((e) => e.test(t));
      if (
        (tT(
          !!e,
          `'${t}' is not an animatable color. Use the equivalent color code instead.`,
          "color-not-animatable",
        ),
        !e)
      )
        return !1;
      let i = e.parse(t);
      return (
        e === K &&
          (i = (function ({ hue: t, saturation: e, lightness: i, alpha: n }) {
            ((t /= 360), (i /= 100));
            let r = 0,
              s = 0,
              a = 0;
            if ((e /= 100)) {
              let n = i < 0.5 ? i * (1 + e) : i + e - i * e,
                o = 2 * i - n;
              ((r = iY(o, n, t + 1 / 3)),
                (s = iY(o, n, t)),
                (a = iY(o, n, t - 1 / 3)));
            } else r = s = a = i;
            return {
              red: Math.round(255 * r),
              green: Math.round(255 * s),
              blue: Math.round(255 * a),
              alpha: n,
            };
          })(i)),
        i
      );
    }
    let iJ = (t, e) => {
        let i = iZ(t),
          n = iZ(e);
        if (!i || !n) return iq(t, e);
        let r = { ...i };
        return (t) => (
          (r.red = iK(i.red, n.red, t)),
          (r.green = iK(i.green, n.green, t)),
          (r.blue = iK(i.blue, n.blue, t)),
          (r.alpha = e4(i.alpha, n.alpha, t)),
          _.transform(r)
        );
      },
      iQ = new Set(["none", "hidden"]);
    function i0(t, e) {
      return (i) => e4(t, e, i);
    }
    function i1(t) {
      return "number" == typeof t
        ? i0
        : "string" == typeof t
          ? tE(t)
            ? iq
            : G.test(t)
              ? iJ
              : i3
          : Array.isArray(t)
            ? i5
            : "object" == typeof t
              ? G.test(t)
                ? iJ
                : i2
              : iq;
    }
    function i5(t, e) {
      let i = [...t],
        n = i.length,
        r = t.map((t, i) => i1(t)(t, e[i]));
      return (t) => {
        for (let e = 0; e < n; e++) i[e] = r[e](t);
        return i;
      };
    }
    function i2(t, e) {
      let i = { ...t, ...e },
        n = {};
      for (let r in i)
        void 0 !== t[r] && void 0 !== e[r] && (n[r] = i1(t[r])(t[r], e[r]));
      return (t) => {
        for (let e in n) i[e] = n[e](t);
        return i;
      };
    }
    let i3 = (t, e) => {
      let i = tn.createTransformer(e),
        n = te(t),
        r = te(e);
      if (!(
        n.indexes.var.length === r.indexes.var.length &&
        n.indexes.color.length === r.indexes.color.length &&
        n.indexes.number.length >= r.indexes.number.length
      ))
        return (
          tT(
            !0,
            `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`,
            "complex-values-different",
          ),
          iq(t, e)
        );
      if ((iQ.has(t) && !r.values.length) || (iQ.has(e) && !n.values.length))
        return iQ.has(t) ? (i) => (i <= 0 ? t : e) : (i) => (i >= 1 ? e : t);
      return iH(
        i5(
          (function (t, e) {
            let i = [],
              n = { color: 0, var: 0, number: 0 };
            for (let r = 0; r < e.values.length; r++) {
              let s = e.types[r],
                a = t.indexes[s][n[s]],
                o = t.values[a] ?? 0;
              ((i[r] = o), n[s]++);
            }
            return i;
          })(n, r),
          r.values,
        ),
        i,
      );
    };
    function i4(t, e, i) {
      return "number" == typeof t &&
        "number" == typeof e &&
        "number" == typeof i
        ? e4(t, e, i)
        : i1(t)(t, e);
    }
    let i9 = (t) => {
      let e = ({ timestamp: e }) => t(e);
      return {
        start: (t = !0) => tK.update(e, t),
        stop: () => tG(e),
        now: () => (tZ.isProcessing ? tZ.timestamp : eP.now()),
      };
    };
    function i6(t) {
      let e = 0,
        i = t.next(e);
      for (; !i.done && e < 2e4;) ((e += 50), (i = t.next(e)));
      return e >= 2e4 ? 1 / 0 : e;
    }
    let i8 = 0.01,
      i7 = 2,
      nt = 0.005,
      ne = 0.5;
    function ni(t, e) {
      return t * Math.sqrt(1 - e * e);
    }
    let nn = ["duration", "bounce"],
      nr = ["stiffness", "damping", "mass"];
    function ns(t, e) {
      return e.some((e) => void 0 !== t[e]);
    }
    function na(t = 0.3, e = 0.3) {
      let i,
        n,
        r,
        s,
        a,
        o,
        l =
          "object" != typeof t
            ? { visualDuration: t, keyframes: [0, 1], bounce: e }
            : t,
        { restSpeed: u, restDelta: h } = l,
        c = l.keyframes[0],
        d = l.keyframes[l.keyframes.length - 1],
        p = { done: !1, value: c },
        {
          stiffness: m,
          damping: f,
          mass: g,
          duration: y,
          velocity: v,
          isResolvedFromDuration: x,
        } = (function (t) {
          let e = {
            velocity: 0,
            stiffness: 100,
            damping: 10,
            mass: 1,
            isResolvedFromDuration: !1,
            ...t,
          };
          if (!ns(t, nr) && ns(t, nn))
            if (((e.velocity = 0), t.visualDuration)) {
              let i = (2 * Math.PI) / (1.2 * t.visualDuration),
                n = i * i,
                r = 2 * C(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(n);
              e = { ...e, mass: 1, stiffness: n, damping: r };
            } else {
              let i = (function ({
                duration: t = 800,
                bounce: e = 0.3,
                velocity: i = 0,
                mass: n = 1,
              }) {
                let r, s;
                tT(
                  t <= et(10),
                  "Spring duration must be 10 seconds or less",
                  "spring-duration-limit",
                );
                let a = 1 - e;
                ((a = C(0.05, 1, a)),
                  (t = C(0.01, 10, t / 1e3)),
                  a < 1
                    ? ((r = (e) => {
                        let n = e * a,
                          r = n * t;
                        return 0.001 - ((n - i) / ni(e, a)) * Math.exp(-r);
                      }),
                      (s = (e) => {
                        let n = e * a * t,
                          s = Math.pow(a, 2) * Math.pow(e, 2) * t,
                          o = Math.exp(-n),
                          l = ni(Math.pow(e, 2), a);
                        return (
                          ((n * i + i - s) * o * (-r(e) + 0.001 > 0 ? -1 : 1)) /
                          l
                        );
                      }))
                    : ((r = (e) =>
                        -0.001 + Math.exp(-e * t) * ((e - i) * t + 1)),
                      (s = (e) => t * t * (i - e) * Math.exp(-e * t))));
                let o = (function (t, e, i) {
                  let n = i;
                  for (let i = 1; i < 12; i++) n -= t(n) / e(n);
                  return n;
                })(r, s, 5 / t);
                if (((t = et(t)), isNaN(o)))
                  return { stiffness: 100, damping: 10, duration: t };
                {
                  let e = Math.pow(o, 2) * n;
                  return {
                    stiffness: e,
                    damping: 2 * a * Math.sqrt(n * e),
                    duration: t,
                  };
                }
              })({ ...t, velocity: 0 });
              (e = { ...e, ...i, mass: 1 }).isResolvedFromDuration = !0;
            }
          return e;
        })({ ...l, velocity: -((l.velocity || 0) / 1e3) }),
        w = v || 0,
        b = f / (2 * Math.sqrt(m * g)),
        T = d - c,
        P = Math.sqrt(m / g) / 1e3,
        S = 5 > Math.abs(T);
      if ((u || (u = S ? i8 : i7), h || (h = S ? nt : ne), b < 1))
        ((r = ni(P, b)),
          (s = (w + b * P * T) / r),
          (i = (t) =>
            d -
            Math.exp(-b * P * t) * (s * Math.sin(r * t) + T * Math.cos(r * t))),
          (a = b * P * s + T * r),
          (o = b * P * T - s * r),
          (n = (t) =>
            Math.exp(-b * P * t) *
            (a * Math.sin(r * t) + o * Math.cos(r * t))));
      else if (1 === b) {
        i = (t) => d - Math.exp(-P * t) * (T + (w + P * T) * t);
        let t = w + P * T;
        n = (e) => Math.exp(-P * e) * (P * t * e - w);
      } else {
        let t = P * Math.sqrt(b * b - 1);
        i = (e) => {
          let i = Math.exp(-b * P * e),
            n = Math.min(t * e, 300);
          return (
            d -
            (i * ((w + b * P * T) * Math.sinh(n) + t * T * Math.cosh(n))) / t
          );
        };
        let e = (w + b * P * T) / t,
          r = b * P * e - T * t,
          s = b * P * T - e * t;
        n = (e) => {
          let i = Math.exp(-b * P * e),
            n = Math.min(t * e, 300);
          return i * (r * Math.sinh(n) + s * Math.cosh(n));
        };
      }
      let k = {
        calculatedDuration: (x && y) || null,
        velocity: (t) => et(n(t)),
        next: (t) => {
          if (!x && b < 1) {
            let e = Math.exp(-b * P * t),
              i = Math.sin(r * t),
              n = Math.cos(r * t),
              l = d - e * (s * i + T * n);
            return (
              (p.done =
                Math.abs(et(e * (a * i + o * n))) <= u && Math.abs(d - l) <= h),
              (p.value = p.done ? d : l),
              p
            );
          }
          let e = i(t);
          return (
            x
              ? (p.done = t >= y)
              : (p.done = Math.abs(et(n(t))) <= u && Math.abs(d - e) <= h),
            (p.value = p.done ? d : e),
            p
          );
        },
        toString: () => {
          let t = Math.min(i6(k), 2e4),
            e = ef((e) => k.next(t * e).value, t, 30);
          return t + "ms " + e;
        },
        toTransition: () => {},
      };
      return k;
    }
    function no(t, e, i) {
      let n = Math.max(e - 5, 0);
      return eS(i - t(n), e - n);
    }
    function nl({
      keyframes: t,
      velocity: e = 0,
      power: i = 0.8,
      timeConstant: n = 325,
      bounceDamping: r = 10,
      bounceStiffness: s = 500,
      modifyTarget: a,
      min: o,
      max: l,
      restDelta: u = 0.5,
      restSpeed: h,
    }) {
      let c,
        d,
        p = t[0],
        m = { done: !1, value: p },
        f = i * e,
        g = p + f,
        y = void 0 === a ? g : a(g);
      y !== g && (f = y - p);
      let v = (t) => -f * Math.exp(-t / n),
        x = (t) => y + v(t),
        w = (t) => {
          let e = v(t),
            i = x(t);
          ((m.done = Math.abs(e) <= u), (m.value = m.done ? y : i));
        },
        b = (t) => {
          let e;
          if (
            ((e = m.value), (void 0 !== o && e < o) || (void 0 !== l && e > l))
          ) {
            var i;
            ((c = t),
              (d = na({
                keyframes: [
                  m.value,
                  ((i = m.value),
                  void 0 === o
                    ? l
                    : void 0 === l || Math.abs(o - i) < Math.abs(l - i)
                      ? o
                      : l),
                ],
                velocity: no(x, t, m.value),
                damping: r,
                stiffness: s,
                restDelta: u,
                restSpeed: h,
              })));
          }
        };
      return (
        b(0),
        {
          calculatedDuration: null,
          next: (t) => {
            let e = !1;
            return (d || void 0 !== c || ((e = !0), w(t), b(t)),
            void 0 !== c && t >= c)
              ? d.next(t - c)
              : (e || w(t), m);
          },
        }
      );
    }
    na.applyToOptions = (t) => {
      let e = (function (t, e = 100, i) {
        let n = i({ ...t, keyframes: [0, e] }),
          r = Math.min(i6(n), 2e4);
        return {
          type: "keyframes",
          ease: (t) => n.next(r * t).value / e,
          duration: r / 1e3,
        };
      })(t, 100, na);
      return (
        (t.ease = e.ease),
        (t.duration = et(e.duration)),
        (t.type = "keyframes"),
        t
      );
    };
    let nu = (t, e, i) =>
      (((1 - 3 * i + 3 * e) * t + (3 * i - 6 * e)) * t + 3 * e) * t;
    function nh(t, e, i, n) {
      return t === e && i === n
        ? tX
        : (r) =>
            0 === r || 1 === r
              ? r
              : nu(
                  (function (t, e, i, n, r) {
                    let s,
                      a,
                      o = 0;
                    do
                      (s = nu((a = e + (i - e) / 2), n, r) - t) > 0
                        ? (i = a)
                        : (e = a);
                    while (Math.abs(s) > 1e-7 && ++o < 12);
                    return a;
                  })(r, 0, 1, t, i),
                  e,
                  n,
                );
    }
    let nc = nh(0.42, 0, 1, 1),
      nd = nh(0, 0, 0.58, 1),
      np = nh(0.42, 0, 0.58, 1),
      nm = (t) => (e) => (e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2),
      nf = (t) => (e) => 1 - t(1 - e),
      ng = nh(0.33, 1.53, 0.69, 0.99),
      ny = nf(ng),
      nv = nm(ny),
      nx = (t) =>
        t >= 1
          ? 1
          : (t *= 2) < 1
            ? 0.5 * ny(t)
            : 0.5 * (2 - Math.pow(2, -10 * (t - 1))),
      nw = (t) => 1 - Math.sin(Math.acos(t)),
      nb = nf(nw),
      nT = nm(nw),
      nP = {
        linear: tX,
        easeIn: nc,
        easeInOut: np,
        easeOut: nd,
        circIn: nw,
        circInOut: nT,
        circOut: nb,
        backIn: ny,
        backInOut: nv,
        backOut: ng,
        anticipate: nx,
      },
      nS = (t) => {
        if (ep(t)) {
          tP(
            4 === t.length,
            "Cubic bezier arrays must contain four numerical values.",
            "cubic-bezier-length",
          );
          let [e, i, n, r] = t;
          return nh(e, i, n, r);
        }
        return "string" == typeof t
          ? (tP(
              void 0 !== nP[t],
              `Invalid easing type '${t}'`,
              "invalid-easing-type",
            ),
            nP[t])
          : t;
      },
      nk = (t, e, i) => {
        let n = e - t;
        return n ? (i - t) / n : 1;
      };
    function nA({
      duration: t = 300,
      keyframes: e,
      times: i,
      ease: n = "easeInOut",
    }) {
      var r;
      let s,
        a = Array.isArray(n) && "number" != typeof n[0] ? n.map(nS) : nS(n),
        o = { done: !1, value: e[0] },
        l = (function (t, e, { clamp: i = !0, ease: n, mixer: r } = {}) {
          let s = t.length;
          if (
            (tP(
              s === e.length,
              "Both input and output ranges must be the same length",
              "range-length",
            ),
            1 === s)
          )
            return () => e[0];
          if (2 === s && e[0] === e[1]) return () => e[1];
          let a = t[0] === t[1];
          t[0] > t[s - 1] && ((t = [...t].reverse()), (e = [...e].reverse()));
          let o = (function (t, e, i) {
              let n = [],
                r = i || tH.mix || i4,
                s = t.length - 1;
              for (let i = 0; i < s; i++) {
                let s = r(t[i], t[i + 1]);
                (e && (s = iH(Array.isArray(e) ? e[i] || tX : e, s)),
                  n.push(s));
              }
              return n;
            })(e, n, r),
            l = o.length,
            u = (i) => {
              if (a && i < t[0]) return e[0];
              let n = 0;
              if (l > 1) for (; n < t.length - 2 && !(i < t[n + 1]); n++);
              let r = nk(t[n], t[n + 1], i);
              return o[n](r);
            };
          return i ? (e) => u(C(t[0], t[s - 1], e)) : u;
        })(
          ((r =
            i && i.length === e.length
              ? i
              : (!(function (t, e) {
                  let i = t[t.length - 1];
                  for (let n = 1; n <= e; n++) {
                    let r = nk(0, e, n);
                    t.push(e4(i, 1, r));
                  }
                })((s = [0]), e.length - 1),
                s)),
          r.map((e) => e * t)),
          e,
          {
            ease: Array.isArray(a)
              ? a
              : e.map(() => a || np).splice(0, e.length - 1),
          },
        );
      return {
        calculatedDuration: t,
        next: (e) => ((o.value = l(e)), (o.done = e >= t), o),
      };
    }
    let nE = { decay: nl, inertia: nl, tween: nA, keyframes: nA, spring: na };
    function nj(t) {
      "string" == typeof t.type && (t.type = nE[t.type]);
    }
    let nM = (t) => t / 100;
    class nC extends ec {
      constructor(t) {
        (super(),
          (this.state = "idle"),
          (this.startTime = null),
          (this.isStopped = !1),
          (this.currentTime = 0),
          (this.holdTime = null),
          (this.playbackSpeed = 1),
          (this.delayState = { done: !1, value: void 0 }),
          (this.stop = () => {
            let { motionValue: t } = this.options;
            (t && t.updatedAt !== eP.now() && this.tick(eP.now()),
              (this.isStopped = !0),
              "idle" !== this.state &&
                (this.teardown(), this.options.onStop?.()));
          }),
          ed.mainThread++,
          (this.options = t),
          this.initAnimation(),
          this.play(),
          !1 === t.autoplay && this.pause());
      }
      initAnimation() {
        let { options: t } = this;
        nj(t);
        let {
            type: e = nA,
            repeat: i = 0,
            repeatDelay: n = 0,
            repeatType: r,
            velocity: s = 0,
          } = t,
          { keyframes: a } = t,
          o = e || nA;
        o !== nA &&
          "number" != typeof a[0] &&
          ((this.mixKeyframes = iH(nM, i4(a[0], a[1]))), (a = [0, 100]));
        let l = o({ ...t, keyframes: a });
        ("mirror" === r &&
          (this.mirroredGenerator = o({
            ...t,
            keyframes: [...a].reverse(),
            velocity: -s,
          })),
          null === l.calculatedDuration && (l.calculatedDuration = i6(l)));
        let { calculatedDuration: u } = l;
        ((this.calculatedDuration = u),
          (this.resolvedDuration = u + n),
          (this.totalDuration = this.resolvedDuration * (i + 1) - n),
          (this.generator = l));
      }
      updateTime(t) {
        let e = Math.round(t - this.startTime) * this.playbackSpeed;
        null !== this.holdTime
          ? (this.currentTime = this.holdTime)
          : (this.currentTime = e);
      }
      tick(t, e = !1) {
        let i,
          {
            generator: n,
            totalDuration: r,
            mixKeyframes: s,
            mirroredGenerator: a,
            resolvedDuration: o,
            calculatedDuration: l,
          } = this;
        if (null === this.startTime) return n.next(0);
        let {
          delay: u = 0,
          keyframes: h,
          repeat: c,
          repeatType: d,
          repeatDelay: p,
          type: m,
          onUpdate: f,
          finalKeyframe: g,
        } = this.options;
        (this.speed > 0
          ? (this.startTime = Math.min(this.startTime, t))
          : this.speed < 0 &&
            (this.startTime = Math.min(t - r / this.speed, this.startTime)),
          e ? (this.currentTime = t) : this.updateTime(t));
        let y = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1),
          v = this.playbackSpeed >= 0 ? y < 0 : y > r;
        ((this.currentTime = Math.max(y, 0)),
          "finished" === this.state &&
            null === this.holdTime &&
            (this.currentTime = r));
        let x = this.currentTime,
          w = n;
        if (c) {
          let t = Math.min(this.currentTime, r) / o,
            e = Math.floor(t),
            i = t % 1;
          (!i && t >= 1 && (i = 1),
            1 === i && e--,
            (e = Math.min(e, c + 1)) % 2 &&
              ("reverse" === d
                ? ((i = 1 - i), p && (i -= p / o))
                : "mirror" === d && (w = a)),
            (x = C(0, 1, i) * o));
        }
        (v
          ? ((this.delayState.value = h[0]), (i = this.delayState))
          : (i = w.next(x)),
          s && !v && (i.value = s(i.value)));
        let { done: b } = i;
        v ||
          null === l ||
          (b =
            this.playbackSpeed >= 0
              ? this.currentTime >= r
              : this.currentTime <= 0);
        let T =
          null === this.holdTime &&
          ("finished" === this.state || ("running" === this.state && b));
        return (
          T && m !== nl && (i.value = eh(h, this.options, g, this.speed)),
          f && f(i.value),
          T && this.finish(),
          i
        );
      }
      then(t, e) {
        return this.finished.then(t, e);
      }
      get duration() {
        return this.calculatedDuration / 1e3;
      }
      get iterationDuration() {
        let { delay: t = 0 } = this.options || {};
        return this.duration + t / 1e3;
      }
      get time() {
        return this.currentTime / 1e3;
      }
      set time(t) {
        ((t = et(t)),
          (this.currentTime = t),
          null === this.startTime ||
          null !== this.holdTime ||
          0 === this.playbackSpeed
            ? (this.holdTime = t)
            : this.driver &&
              (this.startTime = this.driver.now() - t / this.playbackSpeed),
          this.driver
            ? this.driver.start(!1)
            : ((this.startTime = 0),
              (this.state = "paused"),
              (this.holdTime = t),
              this.tick(t)));
      }
      getGeneratorVelocity() {
        let t = this.currentTime;
        if (t <= 0) return this.options.velocity || 0;
        if (this.generator.velocity) return this.generator.velocity(t);
        let e = this.generator.next(t).value;
        return no((t) => this.generator.next(t).value, t, e);
      }
      get speed() {
        return this.playbackSpeed;
      }
      set speed(t) {
        let e = this.playbackSpeed !== t;
        (e && this.driver && this.updateTime(eP.now()),
          (this.playbackSpeed = t),
          e && this.driver && (this.time = this.currentTime / 1e3));
      }
      play() {
        if (this.isStopped) return;
        let { driver: t = i9, startTime: e } = this.options;
        (this.driver || (this.driver = t((t) => this.tick(t))),
          this.options.onPlay?.());
        let i = this.driver.now();
        ("finished" === this.state
          ? (this.updateFinished(), (this.startTime = i))
          : null !== this.holdTime
            ? (this.startTime = i - this.holdTime)
            : this.startTime || (this.startTime = e ?? i),
          "finished" === this.state &&
            this.speed < 0 &&
            (this.startTime += this.calculatedDuration),
          (this.holdTime = null),
          (this.state = "running"),
          this.driver.start());
      }
      pause() {
        ((this.state = "paused"),
          this.updateTime(eP.now()),
          (this.holdTime = this.currentTime));
      }
      complete() {
        ("running" !== this.state && this.play(),
          (this.state = "finished"),
          (this.holdTime = null));
      }
      finish() {
        (this.notifyFinished(),
          this.teardown(),
          (this.state = "finished"),
          this.options.onComplete?.());
      }
      cancel() {
        ((this.holdTime = null),
          (this.startTime = 0),
          this.tick(0),
          this.teardown(),
          this.options.onCancel?.());
      }
      teardown() {
        ((this.state = "idle"),
          this.stopDriver(),
          (this.startTime = this.holdTime = null),
          ed.mainThread--);
      }
      stopDriver() {
        this.driver && (this.driver.stop(), (this.driver = void 0));
      }
      sample(t) {
        return ((this.startTime = 0), this.tick(t, !0));
      }
      attachTimeline(t) {
        return (
          this.options.allowFlatten &&
            ((this.options.type = "keyframes"),
            (this.options.ease = "linear"),
            this.initAnimation()),
          this.driver?.stop(),
          t.observe(this)
        );
      }
    }
    let nV = { anticipate: nx, backInOut: nv, circInOut: nT };
    class nR extends ex {
      constructor(t) {
        (!(function (t) {
          "string" == typeof t.ease && t.ease in nV && (t.ease = nV[t.ease]);
        })(t),
          nj(t),
          super(t),
          void 0 !== t.startTime &&
            !1 !== t.autoplay &&
            (this.startTime = t.startTime),
          (this.options = t));
      }
      updateMotionValue(t) {
        let {
          motionValue: e,
          onUpdate: i,
          onComplete: n,
          element: r,
          ...s
        } = this.options;
        if (!e) return;
        if (void 0 !== t) return void e.set(t);
        let a = new nC({ ...s, autoplay: !1 }),
          o = Math.max(10, eP.now() - this.startTime),
          l = C(0, 10, o - 10),
          u = a.sample(o).value,
          { name: h } = this.options;
        (r && h && er(r, h, u),
          e.setWithVelocity(a.sample(Math.max(0, o - l)).value, u, l),
          a.stop());
      }
    }
    let nD = (t, e) =>
      "zIndex" !== e &&
      !!(
        "number" == typeof t ||
        Array.isArray(t) ||
        ("string" == typeof t &&
          (tn.test(t) || "0" === t) &&
          !t.startsWith("url("))
      );
    function nL(t) {
      ((t.duration = 0), (t.type = "keyframes"));
    }
    let nN = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/,
      nB = new Set([
        "color",
        "backgroundColor",
        "outlineColor",
        "fill",
        "stroke",
        "borderColor",
        "borderTopColor",
        "borderRightColor",
        "borderBottomColor",
        "borderLeftColor",
      ]),
      nF = es(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
    class nO extends ec {
      constructor({
        autoplay: t = !0,
        delay: e = 0,
        type: i = "keyframes",
        repeat: n = 0,
        repeatDelay: r = 0,
        repeatType: s = "loop",
        keyframes: a,
        name: o,
        motionValue: l,
        element: u,
        ...h
      }) {
        (super(),
          (this.stop = () => {
            (this._animation && (this._animation.stop(), this.stopTimeline?.()),
              this.keyframeResolver?.cancel());
          }),
          (this.createdAt = eP.now()));
        const c = {
            autoplay: t,
            delay: e,
            type: i,
            repeat: n,
            repeatDelay: r,
            repeatType: s,
            name: o,
            motionValue: l,
            element: u,
            ...h,
          },
          d = u?.KeyframeResolver || t4;
        ((this.keyframeResolver = new d(
          a,
          (t, e, i) => this.onKeyframesResolved(t, e, c, !i),
          o,
          l,
          u,
        )),
          this.keyframeResolver?.scheduleResolve());
      }
      onKeyframesResolved(t, e, i, n) {
        let r;
        this.keyframeResolver = void 0;
        let {
          name: s,
          type: a,
          velocity: o,
          delay: l,
          isHandoff: u,
          onUpdate: h,
        } = i;
        this.resolvedAt = eP.now();
        let c = !0;
        !(function (t, e, i, n) {
          let r = t[0];
          if (null === r) return !1;
          if ("display" === e || "visibility" === e) return !0;
          let s = t[t.length - 1],
            a = nD(r, e),
            o = nD(s, e);
          return (
            tT(
              a === o,
              `You are trying to animate ${e} from "${r}" to "${s}". "${a ? s : r}" is not an animatable value.`,
              "value-not-animatable",
            ),
            !!a &&
              !!o &&
              ((function (t) {
                let e = t[0];
                if (1 === t.length) return !0;
                for (let i = 0; i < t.length; i++) if (t[i] !== e) return !0;
              })(t) ||
                (("spring" === i || ev(i)) && n))
          );
        })(t, s, a, o) &&
          ((c = !1),
          (tH.instantAnimations || !l) && h?.(eh(t, i, e)),
          (t[0] = t[t.length - 1]),
          nL(i),
          (i.repeat = 0));
        let d = {
            startTime: n
              ? this.resolvedAt && this.resolvedAt - this.createdAt > 40
                ? this.resolvedAt
                : this.createdAt
              : void 0,
            finalKeyframe: e,
            ...i,
            keyframes: t,
          },
          p =
            c &&
            !u &&
            (function (t) {
              let {
                motionValue: e,
                name: i,
                repeatDelay: n,
                repeatType: r,
                damping: s,
                type: a,
                keyframes: o,
              } = t;
              if (!(e?.owner?.current instanceof HTMLElement)) return !1;
              let { onUpdate: l, transformTemplate: u } = e.owner.getProps();
              return (
                nF() &&
                i &&
                (ew.has(i) ||
                  (nB.has(i) &&
                    (function (t) {
                      for (let e = 0; e < t.length; e++)
                        if ("string" == typeof t[e] && nN.test(t[e])) return !0;
                      return !1;
                    })(o))) &&
                ("transform" !== i || !u) &&
                !l &&
                !n &&
                "mirror" !== r &&
                0 !== s &&
                "inertia" !== a
              );
            })(d),
          m = d.motionValue?.owner?.current;
        if (p)
          try {
            r = new nR({ ...d, element: m });
          } catch {
            r = new nC(d);
          }
        else r = new nC(d);
        (r.finished
          .then(() => {
            this.notifyFinished();
          })
          .catch(tX),
          this.pendingTimeline &&
            ((this.stopTimeline = r.attachTimeline(this.pendingTimeline)),
            (this.pendingTimeline = void 0)),
          (this._animation = r));
      }
      get finished() {
        return this._animation ? this.animation.finished : this._finished;
      }
      then(t, e) {
        return this.finished.finally(t).then(() => {});
      }
      get animation() {
        return (
          this._animation ||
            (this.keyframeResolver?.resume(), (t5 = !0), t3(), t2(), (t5 = !1)),
          this._animation
        );
      }
      get duration() {
        return this.animation.duration;
      }
      get iterationDuration() {
        return this.animation.iterationDuration;
      }
      get time() {
        return this.animation.time;
      }
      set time(t) {
        this.animation.time = t;
      }
      get speed() {
        return this.animation.speed;
      }
      get state() {
        return this.animation.state;
      }
      set speed(t) {
        this.animation.speed = t;
      }
      get startTime() {
        return this.animation.startTime;
      }
      attachTimeline(t) {
        return (
          this._animation
            ? (this.stopTimeline = this.animation.attachTimeline(t))
            : (this.pendingTimeline = t),
          () => this.stop()
        );
      }
      play() {
        this.animation.play();
      }
      pause() {
        this.animation.pause();
      }
      complete() {
        this.animation.complete();
      }
      cancel() {
        (this._animation && this.animation.cancel(),
          this.keyframeResolver?.cancel());
      }
    }
    let nI = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
      n_ = { type: "keyframes", duration: 0.8 },
      n$ = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
      nU = new Set([
        "when",
        "delay",
        "delayChildren",
        "staggerChildren",
        "staggerDirection",
        "repeat",
        "repeatType",
        "repeatDelay",
        "from",
        "elapsed",
      ]),
      nW =
        (t, e, i, n = {}, r, s) =>
        (a) => {
          let o = iW(n, t) || {},
            l = o.delay || n.delay || 0,
            { elapsed: u = 0 } = n;
          u -= et(l);
          let h = {
            keyframes: Array.isArray(i) ? i : [null, i],
            ease: "easeOut",
            velocity: e.getVelocity(),
            ...o,
            delay: -u,
            onUpdate: (t) => {
              (e.set(t), o.onUpdate && o.onUpdate(t));
            },
            onComplete: () => {
              (a(), o.onComplete && o.onComplete());
            },
            name: t,
            motionValue: e,
            element: s ? void 0 : r,
          };
          (!(function (t) {
            for (let e in t) if (!nU.has(e)) return !0;
            return !1;
          })(o) &&
            Object.assign(
              h,
              ((t, { keyframes: e }) =>
                e.length > 2
                  ? n_
                  : M.has(t)
                    ? t.startsWith("scale")
                      ? {
                          type: "spring",
                          stiffness: 550,
                          damping: 0 === e[1] ? 2 * Math.sqrt(550) : 30,
                          restSpeed: 10,
                        }
                      : nI
                    : n$)(t, h),
            ),
            h.duration && (h.duration = et(h.duration)),
            h.repeatDelay && (h.repeatDelay = et(h.repeatDelay)),
            void 0 !== h.from && (h.keyframes[0] = h.from));
          let c = !1;
          if (
            ((!1 !== h.type && (0 !== h.duration || h.repeatDelay)) ||
              (nL(h), 0 === h.delay && (c = !0)),
            (tH.instantAnimations ||
              tH.skipAnimations ||
              r?.shouldSkipAnimations ||
              o.skipAnimations) &&
              ((c = !0), nL(h), (h.delay = 0)),
            (h.allowFlatten = !o.type && !o.ease),
            c && !s && void 0 !== e.get())
          ) {
            let t = eh(h.keyframes, o);
            if (void 0 !== t)
              return void tK.update(() => {
                (h.onUpdate(t), h.onComplete());
              });
          }
          return o.isSync ? new nC(h) : new nO(h);
        };
    function nz(t, e, { delay: i = 0, transitionOverride: n, type: r } = {}) {
      let { transition: s, transitionEnd: a, ...o } = e,
        l = t.getDefaultTransition();
      s = s ? iU(s, l) : l;
      let u = s?.reduceMotion,
        h = s?.skipAnimations;
      n && (s = n);
      let c = [],
        d = r && t.animationState && t.animationState.getState()[r],
        p = s?.path;
      for (let e in (p && p.animateVisualElement(t, o, s, i, c), o)) {
        let n = t.getValue(e, t.latestValues[e] ?? null),
          r = o[e];
        if (
          void 0 === r ||
          (d &&
            (function ({ protectedKeys: t, needsAnimating: e }, i) {
              let n = t.hasOwnProperty(i) && !0 !== e[i];
              return ((e[i] = !1), n);
            })(d, e))
        )
          continue;
        let a = { delay: i, ...iW(s || {}, e) };
        h && (a.skipAnimations = !0);
        let l = n.get();
        if (
          void 0 !== l &&
          !n.isAnimating() &&
          !Array.isArray(r) &&
          r === l &&
          !a.velocity
        ) {
          tK.update(() => n.set(r));
          continue;
        }
        let p = !1;
        if (window.MotionHandoffAnimation) {
          let i = t.props[iB];
          if (i) {
            let t = window.MotionHandoffAnimation(i, e, tK);
            null !== t && ((a.startTime = t), (p = !0));
          }
        }
        iX(t, e);
        let m = u ?? t.shouldReduceMotion;
        n.start(nW(e, n, r, m && tv.has(e) ? { type: !1 } : a, t, p));
        let f = n.animation;
        f && c.push(f);
      }
      if (a) {
        let e = () =>
          tK.update(() => {
            a &&
              (function (t, e) {
                let {
                  transitionEnd: i = {},
                  transition: n = {},
                  ...r
                } = i$(t, e) || {};
                for (let e in (r = { ...r, ...i })) {
                  var s;
                  let i = iz((s = r[e])) ? s[s.length - 1] || 0 : s;
                  t.hasValue(e) ? t.getValue(e).set(i) : t.addValue(e, eE(i));
                }
              })(t, a);
          });
        c.length ? Promise.all(c).then(e) : e();
      }
      return c;
    }
    function nX(t, e, i, n = 0, r = 1) {
      let s = Array.from(t)
          .sort((t, e) => t.sortNodePosition(e))
          .indexOf(e),
        a = t.size,
        o = (a - 1) * n;
      return "function" == typeof i ? i(s, a) : 1 === r ? s * n : o - s * n;
    }
    function nH(t, e, i = {}) {
      let n = i$(t, e, "exit" === i.type ? t.presenceContext?.custom : void 0),
        { transition: r = t.getDefaultTransition() || {} } = n || {};
      i.transitionOverride && (r = i.transitionOverride);
      let s = n ? () => Promise.all(nz(t, n, i)) : () => Promise.resolve(),
        a =
          t.variantChildren && t.variantChildren.size
            ? (n = 0) => {
                let {
                  delayChildren: s = 0,
                  staggerChildren: a,
                  staggerDirection: o,
                } = r;
                return (function (t, e, i = 0, n = 0, r = 0, s = 1, a) {
                  let o = [];
                  for (let l of t.variantChildren)
                    (l.notify("AnimationStart", e),
                      o.push(
                        nH(l, e, {
                          ...a,
                          delay:
                            i +
                            ("function" == typeof n ? 0 : n) +
                            nX(t.variantChildren, l, n, r, s),
                        }).then(() => l.notify("AnimationComplete", e)),
                      ));
                  return Promise.all(o);
                })(t, e, n, s, a, o, i);
              }
            : () => Promise.resolve(),
        { when: o } = r;
      if (!o) return Promise.all([s(), a(i.delay)]);
      {
        let [t, e] = "beforeChildren" === o ? [s, a] : [a, s];
        return t().then(() => e());
      }
    }
    let nY = eD.length;
    function nq(t, e) {
      if (!Array.isArray(e)) return !1;
      let i = e.length;
      if (i !== t.length) return !1;
      for (let n = 0; n < i; n++) if (e[n] !== t[n]) return !1;
      return !0;
    }
    let nK = [...eR].reverse(),
      nG = eR.length;
    function nZ(t = !1) {
      return {
        isActive: t,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {},
      };
    }
    function nJ() {
      return {
        animate: nZ(!0),
        whileInView: nZ(),
        whileHover: nZ(),
        whileTap: nZ(),
        whileDrag: nZ(),
        whileFocus: nZ(),
        exit: nZ(),
      };
    }
    let nQ = 0;
    function n0(t) {
      return [t("x"), t("y")];
    }
    function n1(t, e, i, n = { passive: !0 }) {
      return (t.addEventListener(e, i, n), () => t.removeEventListener(e, i));
    }
    let n5 = { x: !1, y: !1 };
    function n2(t) {
      return t.max - t.min;
    }
    function n3(t, e, i, n = 0.5) {
      ((t.origin = n),
        (t.originPoint = e4(e.min, e.max, t.origin)),
        (t.scale = n2(i) / n2(e)),
        (t.translate = e4(i.min, i.max, t.origin) - t.originPoint),
        ((t.scale >= 0.9999 && t.scale <= 1.0001) || isNaN(t.scale)) &&
          (t.scale = 1),
        ((t.translate >= -0.01 && t.translate <= 0.01) || isNaN(t.translate)) &&
          (t.translate = 0));
    }
    function n4(t, e, i, n) {
      (n3(t.x, e.x, i.x, n ? n.originX : void 0),
        n3(t.y, e.y, i.y, n ? n.originY : void 0));
    }
    function n9(t, e, i, n = 0) {
      ((t.min = (n ? e4(i.min, i.max, n) : i.min) + e.min),
        (t.max = t.min + n2(e)));
    }
    function n6(t, e, i, n = 0) {
      let r = n ? e4(i.min, i.max, n) : i.min;
      ((t.min = e.min - r), (t.max = t.min + n2(e)));
    }
    function n8(t, e, i, n) {
      (n6(t.x, e.x, i.x, n?.x), n6(t.y, e.y, i.y, n?.y));
    }
    function n7(t) {
      return f(t) && "ownerSVGElement" in t;
    }
    function rt(t, e, i) {
      if (null == t) return [];
      if (t instanceof EventTarget) return [t];
      if ("string" == typeof t) {
        let n = document;
        e && (n = e.current);
        let r = i?.[t] ?? n.querySelectorAll(t);
        return r ? Array.from(r) : [];
      }
      return Array.from(t).filter((t) => null != t);
    }
    let re = new WeakMap(),
      ri = (t, e, i) => (n, r) =>
        r && r[0]
          ? r[0][t + "Size"]
          : n7(n) && "getBBox" in n
            ? n.getBBox()[e]
            : n[i],
      rn = ri("inline", "width", "offsetWidth"),
      rr = ri("block", "height", "offsetHeight");
    function rs({ target: t, borderBoxSize: e }) {
      re.get(t)?.forEach((i) => {
        i(t, {
          get width() {
            return rn(t, e);
          },
          get height() {
            return rr(t, e);
          },
        });
      });
    }
    function ra(t) {
      t.forEach(rs);
    }
    let ro = new Set();
    function rl(t, e) {
      let r;
      return "function" == typeof t
        ? (ro.add(t),
          n ||
            ((n = () => {
              let t = {
                get width() {
                  return window.innerWidth;
                },
                get height() {
                  return window.innerHeight;
                },
              };
              ro.forEach((e) => e(t));
            }),
            window.addEventListener("resize", n)),
          () => {
            (ro.delete(t),
              ro.size ||
                "function" != typeof n ||
                (window.removeEventListener("resize", n), (n = void 0)));
          })
        : (!i && "u" > typeof ResizeObserver && (i = new ResizeObserver(ra)),
          (r = rt(t)).forEach((t) => {
            let n = re.get(t);
            (n || ((n = new Set()), re.set(t, n)), n.add(e), i?.observe(t));
          }),
          () => {
            r.forEach((t) => {
              let n = re.get(t);
              (n?.delete(e), n?.size || i?.unobserve(t));
            });
          });
    }
    let ru = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]),
      rh = new Set(["INPUT", "SELECT", "TEXTAREA"]),
      rc = (t) =>
        "mouse" === t.pointerType
          ? "number" != typeof t.button || t.button <= 0
          : !1 !== t.isPrimary;
    function rd(t) {
      return { point: { x: t.pageX, y: t.pageY } };
    }
    function rp(t, e, i, n) {
      return n1(t, e, (t) => rc(t) && i(t, rd(t)), n);
    }
    let rm = ({ current: t }) => (t ? t.ownerDocument.defaultView : null),
      rf = (t, e) => Math.abs(t - e),
      rg = new Set(["auto", "scroll"]);
    class ry {
      constructor(
        t,
        e,
        {
          transformPagePoint: i,
          contextWindow: n = window,
          dragSnapToOrigin: r = !1,
          distanceThreshold: s = 3,
          element: a,
        } = {},
      ) {
        if (
          ((this.startEvent = null),
          (this.lastMoveEvent = null),
          (this.lastMoveEventInfo = null),
          (this.lastRawMoveEventInfo = null),
          (this.handlers = {}),
          (this.contextWindow = window),
          (this.scrollPositions = new Map()),
          (this.removeScrollListeners = null),
          (this.onElementScroll = (t) => {
            this.handleScroll(t.target);
          }),
          (this.onWindowScroll = () => {
            this.handleScroll(window);
          }),
          (this.updatePoint = () => {
            var t, e;
            if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
            this.lastRawMoveEventInfo &&
              (this.lastMoveEventInfo = rv(
                this.lastRawMoveEventInfo,
                this.transformPagePoint,
              ));
            let i = rw(this.lastMoveEventInfo, this.history),
              n = null !== this.startEvent,
              r =
                ((t = i.offset),
                (e = { x: 0, y: 0 }),
                Math.sqrt(rf(t.x, e.x) ** 2 + rf(t.y, e.y) ** 2) >=
                  this.distanceThreshold);
            if (!n && !r) return;
            let { point: s } = i,
              { timestamp: a } = tZ;
            this.history.push({ ...s, timestamp: a });
            let { onStart: o, onMove: l } = this.handlers;
            (n ||
              (o && o(this.lastMoveEvent, i),
              (this.startEvent = this.lastMoveEvent)),
              l && l(this.lastMoveEvent, i));
          }),
          (this.handlePointerMove = (t, e) => {
            ((this.lastMoveEvent = t),
              (this.lastRawMoveEventInfo = e),
              (this.lastMoveEventInfo = rv(e, this.transformPagePoint)),
              tK.update(this.updatePoint, !0));
          }),
          (this.handlePointerUp = (t, e) => {
            this.end();
            let {
              onEnd: i,
              onSessionEnd: n,
              resumeAnimation: r,
            } = this.handlers;
            if (
              ((this.dragSnapToOrigin || !this.startEvent) && r && r(),
              !(this.lastMoveEvent && this.lastMoveEventInfo))
            )
              return;
            let s = rw(
              "pointercancel" === t.type
                ? this.lastMoveEventInfo
                : rv(e, this.transformPagePoint),
              this.history,
            );
            (this.startEvent && i && i(t, s), n && n(t, s));
          }),
          !rc(t))
        )
          return;
        ((this.dragSnapToOrigin = r),
          (this.handlers = e),
          (this.transformPagePoint = i),
          (this.distanceThreshold = s),
          (this.contextWindow = n || window));
        const o = rv(rd(t), this.transformPagePoint),
          { point: l } = o,
          { timestamp: u } = tZ;
        this.history = [{ ...l, timestamp: u }];
        const { onSessionStart: h } = e;
        (h && h(t, rw(o, this.history)),
          (this.removeListeners = iH(
            rp(this.contextWindow, "pointermove", this.handlePointerMove),
            rp(this.contextWindow, "pointerup", this.handlePointerUp),
            rp(this.contextWindow, "pointercancel", this.handlePointerUp),
          )),
          a && this.startScrollTracking(a));
      }
      startScrollTracking(t) {
        let e = t.parentElement;
        for (; e;) {
          let t = getComputedStyle(e);
          ((rg.has(t.overflowX) || rg.has(t.overflowY)) &&
            this.scrollPositions.set(e, { x: e.scrollLeft, y: e.scrollTop }),
            (e = e.parentElement));
        }
        (this.scrollPositions.set(window, {
          x: window.scrollX,
          y: window.scrollY,
        }),
          window.addEventListener("scroll", this.onElementScroll, {
            capture: !0,
          }),
          window.addEventListener("scroll", this.onWindowScroll),
          (this.removeScrollListeners = () => {
            (window.removeEventListener("scroll", this.onElementScroll, {
              capture: !0,
            }),
              window.removeEventListener("scroll", this.onWindowScroll));
          }));
      }
      handleScroll(t) {
        let e = this.scrollPositions.get(t);
        if (!e) return;
        let i = t === window,
          n = i
            ? { x: window.scrollX, y: window.scrollY }
            : { x: t.scrollLeft, y: t.scrollTop },
          r = { x: n.x - e.x, y: n.y - e.y };
        (0 !== r.x || 0 !== r.y) &&
          (i
            ? this.lastMoveEventInfo &&
              ((this.lastMoveEventInfo.point.x += r.x),
              (this.lastMoveEventInfo.point.y += r.y))
            : this.history.length > 0 &&
              ((this.history[0].x -= r.x), (this.history[0].y -= r.y)),
          this.scrollPositions.set(t, n),
          tK.update(this.updatePoint, !0));
      }
      updateHandlers(t) {
        this.handlers = t;
      }
      end() {
        (this.removeListeners && this.removeListeners(),
          this.removeScrollListeners && this.removeScrollListeners(),
          this.scrollPositions.clear(),
          tG(this.updatePoint));
      }
    }
    function rv(t, e) {
      return e ? { point: e(t.point) } : t;
    }
    function rx(t, e) {
      return { x: t.x - e.x, y: t.y - e.y };
    }
    function rw({ point: t }, e) {
      return {
        point: t,
        delta: rx(t, rb(e)),
        offset: rx(t, e[0]),
        velocity: (function (t, e) {
          if (t.length < 2) return { x: 0, y: 0 };
          let i = t.length - 1,
            n = null,
            r = rb(t);
          for (
            ;
            i >= 0 && ((n = t[i]), !(r.timestamp - n.timestamp > et(0.1)));
          )
            i--;
          if (!n) return { x: 0, y: 0 };
          n === t[0] &&
            t.length > 2 &&
            r.timestamp - n.timestamp > 2 * et(0.1) &&
            (n = t[1]);
          let s = (r.timestamp - n.timestamp) / 1e3;
          if (0 === s) return { x: 0, y: 0 };
          let a = { x: (r.x - n.x) / s, y: (r.y - n.y) / s };
          return (a.x === 1 / 0 && (a.x = 0), a.y === 1 / 0 && (a.y = 0), a);
        })(e, 0.1),
      };
    }
    function rb(t) {
      return t[t.length - 1];
    }
    function rT(t, e, i) {
      return {
        min: void 0 !== e ? t.min + e : void 0,
        max: void 0 !== i ? t.max + i - (t.max - t.min) : void 0,
      };
    }
    function rP(t, e) {
      let i = e.min - t.min,
        n = e.max - t.max;
      return (
        e.max - e.min < t.max - t.min && ([i, n] = [n, i]),
        { min: i, max: n }
      );
    }
    function rS(t, e, i) {
      return { min: rk(t, e), max: rk(t, i) };
    }
    function rk(t, e) {
      return "number" == typeof t ? t : t[e] || 0;
    }
    let rA = new WeakMap();
    class rE {
      constructor(t) {
        ((this.openDragLock = null),
          (this.isDragging = !1),
          (this.currentDirection = null),
          (this.originPoint = { x: 0, y: 0 }),
          (this.constraints = !1),
          (this.hasMutatedConstraints = !1),
          (this.elastic = tg()),
          (this.latestPointerEvent = null),
          (this.latestPanInfo = null),
          (this.visualElement = t));
      }
      start(t, { snapToCursor: e = !1, distanceThreshold: i } = {}) {
        let { presenceContext: n } = this.visualElement;
        if (n && !1 === n.isPresent) return;
        let r = (t) => {
            (e && this.snapToCursor(rd(t).point), this.stopAnimation());
          },
          s = (t, e) => {
            let {
              drag: i,
              dragPropagation: n,
              onDragStart: r,
            } = this.getProps();
            if (
              i &&
              !n &&
              (this.openDragLock && this.openDragLock(),
              (this.openDragLock = (function (t) {
                if ("x" === t || "y" === t)
                  if (n5[t]) return null;
                  else
                    return (
                      (n5[t] = !0),
                      () => {
                        n5[t] = !1;
                      }
                    );
                return n5.x || n5.y
                  ? null
                  : ((n5.x = n5.y = !0),
                    () => {
                      n5.x = n5.y = !1;
                    });
              })(i)),
              !this.openDragLock)
            )
              return;
            ((this.latestPointerEvent = t),
              (this.latestPanInfo = e),
              (this.isDragging = !0),
              (this.currentDirection = null),
              this.resolveConstraints(),
              this.visualElement.projection &&
                ((this.visualElement.projection.isAnimationBlocked = !0),
                (this.visualElement.projection.target = void 0)),
              n0((t) => {
                let e = this.getAxisMotionValue(t).get() || 0;
                if (z.test(e)) {
                  let { projection: i } = this.visualElement;
                  if (i && i.layout) {
                    let n = i.layout.layoutBox[t];
                    n && (e = n2(n) * (parseFloat(e) / 100));
                  }
                }
                this.originPoint[t] = e;
              }),
              r && tK.update(() => r(t, e), !1, !0),
              iX(this.visualElement, "transform"));
            let { animationState: s } = this.visualElement;
            s && s.setActive("whileDrag", !0);
          },
          a = (t, e) => {
            ((this.latestPointerEvent = t), (this.latestPanInfo = e));
            let {
              dragPropagation: i,
              dragDirectionLock: n,
              onDirectionLock: r,
              onDrag: s,
            } = this.getProps();
            if (!i && !this.openDragLock) return;
            let { offset: a } = e;
            if (n && null === this.currentDirection) {
              ((this.currentDirection = (function (t, e = 10) {
                let i = null;
                return (
                  Math.abs(t.y) > e
                    ? (i = "y")
                    : Math.abs(t.x) > e && (i = "x"),
                  i
                );
              })(a)),
                null !== this.currentDirection &&
                  r &&
                  r(this.currentDirection));
              return;
            }
            (this.updateAxis("x", e.point, a),
              this.updateAxis("y", e.point, a),
              this.visualElement.render(),
              s && tK.update(() => s(t, e), !1, !0));
          },
          o = (t, e) => {
            ((this.latestPointerEvent = t),
              (this.latestPanInfo = e),
              this.stop(t, e),
              (this.latestPointerEvent = null),
              (this.latestPanInfo = null));
          },
          l = () => {
            let { dragSnapToOrigin: t } = this.getProps();
            (t || this.constraints) && this.startAnimation({ x: 0, y: 0 });
          },
          { dragSnapToOrigin: u } = this.getProps();
        this.panSession = new ry(
          t,
          {
            onSessionStart: r,
            onStart: s,
            onMove: a,
            onSessionEnd: o,
            resumeAnimation: l,
          },
          {
            transformPagePoint: this.visualElement.getTransformPagePoint(),
            dragSnapToOrigin: u,
            distanceThreshold: i,
            contextWindow: rm(this.visualElement),
            element: this.visualElement.current,
          },
        );
      }
      stop(t, e) {
        let i = t || this.latestPointerEvent,
          n = e || this.latestPanInfo,
          r = this.isDragging;
        if ((this.cancel(), !r || !n || !i)) return;
        let { velocity: s } = n;
        this.startAnimation(s);
        let { onDragEnd: a } = this.getProps();
        a && tK.postRender(() => a(i, n));
      }
      cancel() {
        this.isDragging = !1;
        let { projection: t, animationState: e } = this.visualElement;
        (t && (t.isAnimationBlocked = !1), this.endPanSession());
        let { dragPropagation: i } = this.getProps();
        (!i &&
          this.openDragLock &&
          (this.openDragLock(), (this.openDragLock = null)),
          e && e.setActive("whileDrag", !1));
      }
      endPanSession() {
        (this.panSession && this.panSession.end(), (this.panSession = void 0));
      }
      updateAxis(t, e, i) {
        let { drag: n } = this.getProps();
        if (!i || !rM(t, n, this.currentDirection)) return;
        let r = this.getAxisMotionValue(t),
          s = this.originPoint[t] + i[t];
        (this.constraints &&
          this.constraints[t] &&
          (s = (function (t, { min: e, max: i }, n) {
            return (
              void 0 !== e && t < e
                ? (t = n ? e4(e, t, n.min) : Math.max(t, e))
                : void 0 !== i &&
                  t > i &&
                  (t = n ? e4(i, t, n.max) : Math.min(t, i)),
              t
            );
          })(s, this.constraints[t], this.elastic[t])),
          r.set(s));
      }
      resolveConstraints() {
        let { dragConstraints: t, dragElastic: e } = this.getProps(),
          i =
            this.visualElement.projection &&
            !this.visualElement.projection.layout
              ? this.visualElement.projection.measure(!1)
              : this.visualElement.projection?.layout,
          n = this.constraints;
        (t && iO(t)
          ? this.constraints ||
            (this.constraints = this.resolveRefConstraints())
          : t && i
            ? (this.constraints = (function (
                t,
                { top: e, left: i, bottom: n, right: r },
              ) {
                return { x: rT(t.x, i, r), y: rT(t.y, e, n) };
              })(i.layoutBox, t))
            : (this.constraints = !1),
          (this.elastic = (function (t = 0.35) {
            return (
              !1 === t ? (t = 0) : !0 === t && (t = 0.35),
              { x: rS(t, "left", "right"), y: rS(t, "top", "bottom") }
            );
          })(e)),
          n !== this.constraints &&
            !iO(t) &&
            i &&
            this.constraints &&
            !this.hasMutatedConstraints &&
            n0((t) => {
              var e, n;
              let r;
              !1 !== this.constraints &&
                this.getAxisMotionValue(t) &&
                (this.constraints[t] =
                  ((e = i.layoutBox[t]),
                  (n = this.constraints[t]),
                  (r = {}),
                  void 0 !== n.min && (r.min = n.min - e.min),
                  void 0 !== n.max && (r.max = n.max - e.min),
                  r));
            }));
      }
      resolveRefConstraints() {
        var t;
        let { dragConstraints: e, onMeasureDragConstraints: i } =
          this.getProps();
        if (!e || !iO(e)) return !1;
        let n = e.current;
        tP(
          null !== n,
          "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.",
          "drag-constraints-ref",
        );
        let { projection: r } = this.visualElement;
        if (!r || !r.layout) return !1;
        r.root && ((r.root.scroll = void 0), r.root.updateScroll());
        let s = (function (t, e, i) {
            let n = im(t, i),
              { scroll: r } = e;
            return (r && (ih(n.x, r.offset.x), ih(n.y, r.offset.y)), n);
          })(n, r.root, this.visualElement.getTransformPagePoint()),
          a = ((t = r.layout.layoutBox), { x: rP(t.x, s.x), y: rP(t.y, s.y) });
        if (i) {
          let t = i(
            (function ({ x: t, y: e }) {
              return { top: e.min, right: t.max, bottom: e.max, left: t.min };
            })(a),
          );
          ((this.hasMutatedConstraints = !!t), t && (a = ie(t)));
        }
        return a;
      }
      startAnimation(t) {
        let {
            drag: e,
            dragMomentum: i,
            dragElastic: n,
            dragTransition: r,
            dragSnapToOrigin: s,
            onDragTransitionEnd: a,
          } = this.getProps(),
          o = this.constraints || {};
        return Promise.all(
          n0((a) => {
            if (!rM(a, e, this.currentDirection)) return;
            let l = (o && o[a]) || {};
            (!0 === s || s === a) && (l = { min: 0, max: 0 });
            let u = {
              type: "inertia",
              velocity: i ? t[a] : 0,
              bounceStiffness: n ? 200 : 1e6,
              bounceDamping: n ? 40 : 1e7,
              timeConstant: 750,
              restDelta: 1,
              restSpeed: 10,
              ...r,
              ...l,
            };
            return this.startAxisValueAnimation(a, u);
          }),
        ).then(a);
      }
      startAxisValueAnimation(t, e) {
        let i = this.getAxisMotionValue(t);
        return (
          iX(this.visualElement, t),
          i.start(nW(t, i, 0, e, this.visualElement, !1))
        );
      }
      stopAnimation() {
        n0((t) => this.getAxisMotionValue(t).stop());
      }
      getAxisMotionValue(t) {
        let e = `_drag${t.toUpperCase()}`;
        return (
          this.visualElement.getProps()[e] ||
          this.visualElement.getValue(
            t,
            this.visualElement.latestValues[t] ?? 0,
          )
        );
      }
      snapToCursor(t) {
        n0((e) => {
          let { drag: i } = this.getProps();
          if (!rM(e, i, this.currentDirection)) return;
          let { projection: n } = this.visualElement,
            r = this.getAxisMotionValue(e);
          if (n && n.layout) {
            let { min: i, max: s } = n.layout.layoutBox[e],
              a = r.get() || 0;
            r.set(t[e] - e4(i, s, 0.5) + a);
          }
        });
      }
      scalePositionWithinConstraints() {
        if (!this.visualElement.current) return;
        let { drag: t, dragConstraints: e } = this.getProps(),
          { projection: i } = this.visualElement;
        if (!iO(e) || !i || !this.constraints) return;
        this.stopAnimation();
        let n = { x: 0, y: 0 };
        n0((t) => {
          let e = this.getAxisMotionValue(t);
          if (e && !1 !== this.constraints) {
            var i, r;
            let s,
              a,
              o,
              l = e.get();
            n[t] =
              ((i = { min: l, max: l }),
              (r = this.constraints[t]),
              (s = 0.5),
              (a = n2(i)),
              (o = n2(r)) > a
                ? (s = nk(r.min, r.max - a, i.min))
                : a > o && (s = nk(i.min, i.max - o, r.min)),
              C(0, 1, s));
          }
        });
        let { transformTemplate: r } = this.visualElement.getProps();
        ((this.visualElement.current.style.transform = r ? r({}, "") : "none"),
          i.root && i.root.updateScroll(),
          i.updateLayout(),
          (this.constraints = !1),
          this.resolveConstraints(),
          n0((e) => {
            if (!rM(e, t, null)) return;
            let i = this.getAxisMotionValue(e),
              { min: r, max: s } = this.constraints[e];
            i.set(e4(r, s, n[e]));
          }),
          this.visualElement.render());
      }
      addListeners() {
        let t;
        if (!this.visualElement.current) return;
        rA.set(this.visualElement, this);
        let e = this.visualElement.current,
          i = rp(e, "pointerdown", (t) => {
            let { drag: i, dragListener: n = !0 } = this.getProps(),
              r = t.target,
              s = r !== e && (rh.has(r.tagName) || !0 === r.isContentEditable);
            i && n && !s && this.start(t);
          }),
          n = () => {
            var i, n, r;
            let s,
              a,
              { dragConstraints: o } = this.getProps();
            iO(o) &&
              o.current &&
              ((this.constraints = this.resolveRefConstraints()),
              t ||
                ((i = e),
                (n = o.current),
                (s = rl(
                  i,
                  rj((r = () => this.scalePositionWithinConstraints())),
                )),
                (a = rl(n, rj(r))),
                (t = () => {
                  (s(), a());
                })));
          },
          { projection: r } = this.visualElement,
          s = r.addEventListener("measure", n);
        (r && !r.layout && (r.root && r.root.updateScroll(), r.updateLayout()),
          tK.read(n));
        let a = n1(window, "resize", () =>
            this.scalePositionWithinConstraints(),
          ),
          o = r.addEventListener(
            "didUpdate",
            ({ delta: t, hasLayoutChanged: e }) => {
              this.isDragging &&
                e &&
                (n0((e) => {
                  let i = this.getAxisMotionValue(e);
                  i &&
                    ((this.originPoint[e] += t[e].translate),
                    i.set(i.get() + t[e].translate));
                }),
                this.visualElement.render());
            },
          );
        return () => {
          (a(), i(), s(), o && o(), t && t());
        };
      }
      getProps() {
        let t = this.visualElement.getProps(),
          {
            drag: e = !1,
            dragDirectionLock: i = !1,
            dragPropagation: n = !1,
            dragConstraints: r = !1,
            dragElastic: s = 0.35,
            dragMomentum: a = !0,
          } = t;
        return {
          ...t,
          drag: e,
          dragDirectionLock: i,
          dragPropagation: n,
          dragConstraints: r,
          dragElastic: s,
          dragMomentum: a,
        };
      }
    }
    function rj(t) {
      let e = !0;
      return () => {
        if (e) {
          e = !1;
          return;
        }
        t();
      };
    }
    function rM(t, e, i) {
      return (!0 === e || e === t) && (null === i || i === t);
    }
    let rC = (t) => (e, i) => {
        t && tK.update(() => t(e, i), !1, !0);
      },
      rV = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
    var rR = a;
    let rD = !1;
    class rL extends rR.Component {
      componentDidMount() {
        let {
            visualElement: t,
            layoutGroup: e,
            switchLayoutGroup: i,
            layoutId: n,
          } = this.props,
          { projection: r } = t;
        (r &&
          (e.group && e.group.add(r),
          i && i.register && n && i.register(r),
          rD && r.root.didUpdate(),
          r.addEventListener("animationComplete", () => {
            this.safeToRemove();
          }),
          r.setOptions({
            ...r.options,
            layoutDependency: this.props.layoutDependency,
            onExitComplete: () => this.safeToRemove(),
          })),
          (rV.hasEverUpdated = !0));
      }
      getSnapshotBeforeUpdate(t) {
        let {
            layoutDependency: e,
            visualElement: i,
            drag: n,
            isPresent: r,
          } = this.props,
          { projection: s } = i;
        return (
          s &&
            ((s.isPresent = r),
            t.layoutDependency !== e &&
              s.setOptions({ ...s.options, layoutDependency: e }),
            (rD = !0),
            n || t.layoutDependency !== e || void 0 === e || t.isPresent !== r
              ? s.willUpdate()
              : this.safeToRemove(),
            t.isPresent !== r &&
              (r
                ? s.promote()
                : s.relegate() ||
                  tK.postRender(() => {
                    let t = s.getStack();
                    (t && t.members.length) || this.safeToRemove();
                  }))),
          null
        );
      }
      componentDidUpdate() {
        let { visualElement: t, layoutAnchor: e } = this.props,
          { projection: i } = t;
        i &&
          ((i.options.layoutAnchor = e),
          i.root.didUpdate(),
          eb.postRender(() => {
            !i.currentAnimation && i.isLead() && this.safeToRemove();
          }));
      }
      componentWillUnmount() {
        let {
            visualElement: t,
            layoutGroup: e,
            switchLayoutGroup: i,
          } = this.props,
          { projection: n } = t;
        ((rD = !0),
          n &&
            (n.scheduleCheckAfterUnmount(),
            e && e.group && e.group.remove(n),
            i && i.deregister && i.deregister(n)));
      }
      safeToRemove() {
        let { safeToRemove: t } = this.props;
        t && t();
      }
      render() {
        return null;
      }
    }
    function rN(t) {
      let [e, i] = S(),
        n = (0, rR.useContext)(c);
      return (0, s.jsx)(rL, {
        ...t,
        layoutGroup: n,
        switchLayoutGroup: (0, rR.useContext)(iF),
        isPresent: e,
        safeToRemove: i,
      });
    }
    let rB = [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
      ],
      rF = rB.length,
      rO = (t) => ("string" == typeof t ? parseFloat(t) : t),
      rI = (t) => "number" == typeof t || X.test(t);
    function r_(t, e) {
      return void 0 !== t[e] ? t[e] : t.borderRadius;
    }
    let r$ = rW(0, 0.5, nb),
      rU = rW(0.5, 0.95, tX);
    function rW(t, e, i) {
      return (n) => (n < t ? 0 : n > e ? 1 : i(nk(t, e, n)));
    }
    function rz(t, e) {
      ((t.min = e.min), (t.max = e.max));
    }
    function rX(t, e) {
      (rz(t.x, e.x), rz(t.y, e.y));
    }
    function rH(t, e) {
      ((t.translate = e.translate),
        (t.scale = e.scale),
        (t.originPoint = e.originPoint),
        (t.origin = e.origin));
    }
    function rY(t, e, i, n, r) {
      return (
        (t -= e),
        (t = n + (1 / i) * (t - n)),
        void 0 !== r && (t = n + (1 / r) * (t - n)),
        t
      );
    }
    function rq(t, e, [i, n, r], s, a) {
      !(function (t, e = 0, i = 1, n = 0.5, r, s = t, a = t) {
        if (
          (z.test(e) &&
            ((e = parseFloat(e)), (e = e4(a.min, a.max, e / 100) - a.min)),
          "number" != typeof e)
        )
          return;
        let o = e4(s.min, s.max, n);
        (t === s && (o -= e),
          (t.min = rY(t.min, e, i, o, r)),
          (t.max = rY(t.max, e, i, o, r)));
      })(t, e[i], e[n], e[r], e.scale, s, a);
    }
    let rK = ["x", "scaleX", "originX"],
      rG = ["y", "scaleY", "originY"];
    function rZ(t, e, i, n) {
      (rq(t.x, e, rK, i ? i.x : void 0, n ? n.x : void 0),
        rq(t.y, e, rG, i ? i.y : void 0, n ? n.y : void 0));
    }
    function rJ(t) {
      return 0 === t.translate && 1 === t.scale;
    }
    function rQ(t) {
      return rJ(t.x) && rJ(t.y);
    }
    function r0(t, e) {
      return t.min === e.min && t.max === e.max;
    }
    function r1(t, e) {
      return (
        Math.round(t.min) === Math.round(e.min) &&
        Math.round(t.max) === Math.round(e.max)
      );
    }
    function r5(t, e) {
      return r1(t.x, e.x) && r1(t.y, e.y);
    }
    function r2(t) {
      return n2(t.x) / n2(t.y);
    }
    function r3(t, e) {
      return (
        t.translate === e.translate &&
        t.scale === e.scale &&
        t.originPoint === e.originPoint
      );
    }
    class r4 {
      constructor() {
        this.members = [];
      }
      add(t) {
        ee(this.members, t);
        for (let e = this.members.length - 1; e >= 0; e--) {
          let i = this.members[e];
          if (i === t || i === this.lead || i === this.prevLead) continue;
          let n = i.instance;
          (n && !1 !== n.isConnected) ||
            i.snapshot ||
            (ei(this.members, i), i.unmount());
        }
        t.scheduleRender();
      }
      remove(t) {
        if (
          (ei(this.members, t),
          t === this.prevLead && (this.prevLead = void 0),
          t === this.lead)
        ) {
          let t = this.members[this.members.length - 1];
          t && this.promote(t);
        }
      }
      relegate(t) {
        for (let e = this.members.indexOf(t) - 1; e >= 0; e--) {
          let t = this.members[e];
          if (!1 !== t.isPresent && t.instance?.isConnected !== !1)
            return (this.promote(t), !0);
        }
        return !1;
      }
      promote(t, e) {
        let i = this.lead;
        if (t !== i && ((this.prevLead = i), (this.lead = t), t.show(), i)) {
          (i.updateSnapshot(), t.scheduleRender());
          let { layoutDependency: n } = i.options,
            { layoutDependency: r } = t.options;
          ((void 0 === n || n !== r) &&
            ((t.resumeFrom = i),
            e && (i.preserveOpacity = !0),
            i.snapshot &&
              ((t.snapshot = i.snapshot),
              (t.snapshot.latestValues = i.animationValues || i.latestValues)),
            t.root?.isUpdating && (t.isLayoutDirty = !0)),
            !1 === t.options.crossfade && i.hide());
        }
      }
      exitAnimationComplete() {
        this.members.forEach((t) => {
          (t.options.onExitComplete?.(),
            t.resumingFrom?.options.onExitComplete?.());
        });
      }
      scheduleRender() {
        this.members.forEach((t) => t.instance && t.scheduleRender(!1));
      }
      removeLeadSnapshot() {
        this.lead?.snapshot && (this.lead.snapshot = void 0);
      }
    }
    let r9 = (t, e) => t.depth - e.depth;
    class r6 {
      constructor() {
        ((this.children = []), (this.isDirty = !1));
      }
      add(t) {
        (ee(this.children, t), (this.isDirty = !0));
      }
      remove(t) {
        (ei(this.children, t), (this.isDirty = !0));
      }
      forEach(t) {
        (this.isDirty && this.children.sort(r9),
          (this.isDirty = !1),
          this.children.forEach(t));
      }
    }
    let r8 = ["", "X", "Y", "Z"],
      r7 = 0;
    function st(t, e, i, n) {
      let { latestValues: r } = e;
      r[t] && ((i[t] = r[t]), e.setStaticValue(t, 0), n && (n[t] = 0));
    }
    function se({
      attachResizeListener: t,
      defaultParent: e,
      measureScroll: i,
      checkIsScrollRoot: n,
      resetTransform: r,
    }) {
      return class {
        constructor(t = {}, i = e?.()) {
          ((this.id = r7++),
            (this.animationId = 0),
            (this.animationCommitId = 0),
            (this.children = new Set()),
            (this.options = {}),
            (this.isTreeAnimating = !1),
            (this.isAnimationBlocked = !1),
            (this.isLayoutDirty = !1),
            (this.isProjectionDirty = !1),
            (this.isSharedProjectionDirty = !1),
            (this.isTransformDirty = !1),
            (this.updateManuallyBlocked = !1),
            (this.updateBlockedByResize = !1),
            (this.isUpdating = !1),
            (this.isSVG = !1),
            (this.needsReset = !1),
            (this.shouldResetTransform = !1),
            (this.hasCheckedOptimisedAppear = !1),
            (this.treeScale = { x: 1, y: 1 }),
            (this.eventHandlers = new Map()),
            (this.hasTreeAnimated = !1),
            (this.layoutVersion = 0),
            (this.updateScheduled = !1),
            (this.scheduleUpdate = () => this.update()),
            (this.projectionUpdateScheduled = !1),
            (this.checkUpdateFailed = () => {
              this.isUpdating &&
                ((this.isUpdating = !1), this.clearAllSnapshots());
            }),
            (this.updateProjection = () => {
              ((this.projectionUpdateScheduled = !1),
                this.nodes.forEach(sr),
                this.nodes.forEach(sp),
                this.nodes.forEach(sm),
                this.nodes.forEach(ss));
            }),
            (this.resolvedRelativeTargetAt = 0),
            (this.linkedParentVersion = 0),
            (this.hasProjected = !1),
            (this.isVisible = !0),
            (this.animationProgress = 0),
            (this.sharedNodes = new Map()),
            (this.latestValues = t),
            (this.root = i ? i.root || i : this),
            (this.path = i ? [...i.path, i] : []),
            (this.parent = i),
            (this.depth = i ? i.depth + 1 : 0));
          for (let t = 0; t < this.path.length; t++)
            this.path[t].shouldResetTransform = !0;
          this.root === this && (this.nodes = new r6());
        }
        addEventListener(t, e) {
          return (
            this.eventHandlers.has(t) || this.eventHandlers.set(t, new en()),
            this.eventHandlers.get(t).add(e)
          );
        }
        notifyListeners(t, ...e) {
          let i = this.eventHandlers.get(t);
          i && i.notify(...e);
        }
        hasListeners(t) {
          return this.eventHandlers.has(t);
        }
        mount(e) {
          if (this.instance) return;
          ((this.isSVG = n7(e) && !(n7(e) && "svg" === e.tagName)),
            (this.instance = e));
          let { layoutId: i, layout: n, visualElement: r } = this.options;
          if (
            (r && !r.current && r.mount(e),
            this.root.nodes.add(this),
            this.parent && this.parent.children.add(this),
            this.root.hasTreeAnimated && (n || i) && (this.isLayoutDirty = !0),
            t)
          ) {
            let i,
              n = 0,
              r = () => (this.root.updateBlockedByResize = !1);
            (tK.read(() => {
              n = window.innerWidth;
            }),
              t(e, () => {
                let t = window.innerWidth;
                if (t !== n) {
                  let e, s;
                  ((n = t),
                    (this.root.updateBlockedByResize = !0),
                    i && i(),
                    (e = eP.now()),
                    (s = ({ timestamp: t }) => {
                      let i = t - e;
                      i >= 250 && (tG(s), r(i - 250));
                    }),
                    tK.setup(s, !0),
                    (i = () => tG(s)),
                    rV.hasAnimatedSinceResize &&
                      ((rV.hasAnimatedSinceResize = !1),
                      this.nodes.forEach(sd)));
                }
              }));
          }
          (i && this.root.registerSharedNode(i, this),
            !1 !== this.options.animate &&
              r &&
              (i || n) &&
              this.addEventListener(
                "didUpdate",
                ({
                  delta: t,
                  hasLayoutChanged: e,
                  hasRelativeLayoutChanged: i,
                  layout: n,
                }) => {
                  if (this.isTreeAnimationBlocked()) {
                    ((this.target = void 0), (this.relativeTarget = void 0));
                    return;
                  }
                  let s =
                      this.options.transition || r.getDefaultTransition() || sw,
                    {
                      onLayoutAnimationStart: a,
                      onLayoutAnimationComplete: o,
                    } = r.getProps(),
                    l = !this.targetLayout || !r5(this.targetLayout, n),
                    u = !e && i;
                  if (
                    this.options.layoutRoot ||
                    this.resumeFrom ||
                    u ||
                    (e && (l || !this.currentAnimation))
                  ) {
                    this.resumeFrom &&
                      ((this.resumingFrom = this.resumeFrom),
                      (this.resumingFrom.resumingFrom = void 0));
                    let e = { ...iW(s, "layout"), onPlay: a, onComplete: o };
                    ((r.shouldReduceMotion || this.options.layoutRoot) &&
                      ((e.delay = 0), (e.type = !1)),
                      this.startAnimation(e),
                      this.setAnimationOrigin(t, u, e.path));
                  } else
                    (e || sd(this),
                      this.isLead() &&
                        this.options.onExitComplete &&
                        this.options.onExitComplete());
                  this.targetLayout = n;
                },
              ));
        }
        unmount() {
          (this.options.layoutId && this.willUpdate(),
            this.root.nodes.remove(this));
          let t = this.getStack();
          (t && t.remove(this),
            this.parent && this.parent.children.delete(this),
            (this.instance = void 0),
            this.eventHandlers.clear(),
            tG(this.updateProjection));
        }
        blockUpdate() {
          this.updateManuallyBlocked = !0;
        }
        unblockUpdate() {
          this.updateManuallyBlocked = !1;
        }
        isUpdateBlocked() {
          return this.updateManuallyBlocked || this.updateBlockedByResize;
        }
        isTreeAnimationBlocked() {
          return (
            this.isAnimationBlocked ||
            (this.parent && this.parent.isTreeAnimationBlocked()) ||
            !1
          );
        }
        startUpdate() {
          !this.isUpdateBlocked() &&
            ((this.isUpdating = !0),
            this.nodes && this.nodes.forEach(sf),
            this.animationId++);
        }
        getTransformTemplate() {
          let { visualElement: t } = this.options;
          return t && t.getProps().transformTemplate;
        }
        willUpdate(t = !0) {
          if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
            this.options.onExitComplete && this.options.onExitComplete();
            return;
          }
          if (
            (window.MotionCancelOptimisedAnimation &&
              !this.hasCheckedOptimisedAppear &&
              (function t(e) {
                if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return;
                let { visualElement: i } = e.options;
                if (!i) return;
                let n = i.props[iB];
                if (window.MotionHasOptimisedAnimation(n, "transform")) {
                  let { layout: t, layoutId: i } = e.options;
                  window.MotionCancelOptimisedAnimation(
                    n,
                    "transform",
                    tK,
                    !(t || i),
                  );
                }
                let { parent: r } = e;
                r && !r.hasCheckedOptimisedAppear && t(r);
              })(this),
            this.root.isUpdating || this.root.startUpdate(),
            this.isLayoutDirty)
          )
            return;
          this.isLayoutDirty = !0;
          for (let t = 0; t < this.path.length; t++) {
            let e = this.path[t];
            ((e.shouldResetTransform = !0),
              ("string" == typeof e.latestValues.x ||
                "string" == typeof e.latestValues.y) &&
                (e.isLayoutDirty = !0),
              e.updateScroll("snapshot"),
              e.options.layoutRoot && e.willUpdate(!1));
          }
          let { layoutId: e, layout: i } = this.options;
          if (void 0 === e && !i) return;
          let n = this.getTransformTemplate();
          ((this.prevTransformTemplateValue = n
            ? n(this.latestValues, "")
            : void 0),
            this.updateSnapshot(),
            t && this.notifyListeners("willUpdate"));
        }
        update() {
          if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
            let t = this.updateBlockedByResize;
            (this.unblockUpdate(),
              (this.updateBlockedByResize = !1),
              this.clearAllSnapshots(),
              t && this.nodes.forEach(sl),
              this.nodes.forEach(so));
            return;
          }
          if (this.animationId <= this.animationCommitId)
            return void this.nodes.forEach(su);
          ((this.animationCommitId = this.animationId),
            this.isUpdating
              ? ((this.isUpdating = !1),
                this.nodes.forEach(sh),
                this.nodes.forEach(sc),
                this.nodes.forEach(si),
                this.nodes.forEach(sn))
              : this.nodes.forEach(su),
            this.clearAllSnapshots());
          let t = eP.now();
          ((tZ.delta = C(0, 1e3 / 60, t - tZ.timestamp)),
            (tZ.timestamp = t),
            (tZ.isProcessing = !0),
            tJ.update.process(tZ),
            tJ.preRender.process(tZ),
            tJ.render.process(tZ),
            (tZ.isProcessing = !1));
        }
        didUpdate() {
          this.updateScheduled ||
            ((this.updateScheduled = !0), eb.read(this.scheduleUpdate));
        }
        clearAllSnapshots() {
          (this.nodes.forEach(sa), this.sharedNodes.forEach(sg));
        }
        scheduleUpdateProjection() {
          this.projectionUpdateScheduled ||
            ((this.projectionUpdateScheduled = !0),
            tK.preRender(this.updateProjection, !1, !0));
        }
        scheduleCheckAfterUnmount() {
          tK.postRender(() => {
            this.isLayoutDirty
              ? this.root.didUpdate()
              : this.root.checkUpdateFailed();
          });
        }
        updateSnapshot() {
          !this.snapshot &&
            this.instance &&
            ((this.snapshot = this.measure()),
            !this.snapshot ||
              n2(this.snapshot.measuredBox.x) ||
              n2(this.snapshot.measuredBox.y) ||
              (this.snapshot = void 0));
        }
        updateLayout() {
          if (
            !this.instance ||
            (this.updateScroll(),
            !(this.options.alwaysMeasureLayout && this.isLead()) &&
              !this.isLayoutDirty)
          )
            return;
          if (this.resumeFrom && !this.resumeFrom.instance)
            for (let t = 0; t < this.path.length; t++)
              this.path[t].updateScroll();
          let t = this.layout;
          ((this.layout = this.measure(!1)),
            this.layoutVersion++,
            this.layoutCorrected || (this.layoutCorrected = tg()),
            (this.isLayoutDirty = !1),
            (this.projectionDelta = void 0),
            this.notifyListeners("measure", this.layout.layoutBox));
          let { visualElement: e } = this.options;
          e &&
            e.notify(
              "LayoutMeasure",
              this.layout.layoutBox,
              t ? t.layoutBox : void 0,
            );
        }
        updateScroll(t = "measure") {
          let e = !!(this.options.layoutScroll && this.instance);
          if (
            (this.scroll &&
              this.scroll.animationId === this.root.animationId &&
              this.scroll.phase === t &&
              (e = !1),
            e && this.instance)
          ) {
            let e = n(this.instance);
            this.scroll = {
              animationId: this.root.animationId,
              phase: t,
              isRoot: e,
              offset: i(this.instance),
              wasRoot: this.scroll ? this.scroll.isRoot : e,
            };
          }
        }
        resetTransform() {
          if (!r) return;
          let t =
              this.isLayoutDirty ||
              this.shouldResetTransform ||
              this.options.alwaysMeasureLayout,
            e = this.projectionDelta && !rQ(this.projectionDelta),
            i = this.getTransformTemplate(),
            n = i ? i(this.latestValues, "") : void 0,
            s = n !== this.prevTransformTemplateValue;
          t &&
            this.instance &&
            (e || is(this.latestValues) || s) &&
            (r(this.instance, n),
            (this.shouldResetTransform = !1),
            this.scheduleRender());
        }
        measure(t = !0) {
          var e;
          let i = this.measurePageBox(),
            n = this.removeElementScroll(i);
          return (
            t && (n = this.removeTransform(n)),
            sP((e = n).x),
            sP(e.y),
            {
              animationId: this.root.animationId,
              measuredBox: i,
              layoutBox: n,
              latestValues: {},
              source: this.id,
            }
          );
        }
        measurePageBox() {
          let { visualElement: t } = this.options;
          if (!t) return tg();
          let e = t.measureViewportBox();
          if (!(this.scroll?.wasRoot || this.path.some(sk))) {
            let { scroll: t } = this.root;
            t && (ih(e.x, t.offset.x), ih(e.y, t.offset.y));
          }
          return e;
        }
        removeElementScroll(t) {
          let e = tg();
          if ((rX(e, t), this.scroll?.wasRoot)) return e;
          for (let i = 0; i < this.path.length; i++) {
            let n = this.path[i],
              { scroll: r, options: s } = n;
            n !== this.root &&
              r &&
              s.layoutScroll &&
              (r.wasRoot && rX(e, t), ih(e.x, r.offset.x), ih(e.y, r.offset.y));
          }
          return e;
        }
        applyTransform(t, e = !1, i) {
          let n = i || tg();
          rX(n, t);
          for (let t = 0; t < this.path.length; t++) {
            let i = this.path[t];
            (!e &&
              i.options.layoutScroll &&
              i.scroll &&
              i !== i.root &&
              (ih(n.x, -i.scroll.offset.x), ih(n.y, -i.scroll.offset.y)),
              is(i.latestValues) && ip(n, i.latestValues, i.layout?.layoutBox));
          }
          return (
            is(this.latestValues) &&
              ip(n, this.latestValues, this.layout?.layoutBox),
            n
          );
        }
        removeTransform(t) {
          let e = tg();
          rX(e, t);
          for (let t = 0; t < this.path.length; t++) {
            let i,
              n = this.path[t];
            is(n.latestValues) &&
              (n.instance &&
                (ir(n.latestValues) && n.updateSnapshot(),
                rX((i = tg()), n.measurePageBox())),
              rZ(e, n.latestValues, n.snapshot?.layoutBox, i));
          }
          return (is(this.latestValues) && rZ(e, this.latestValues), e);
        }
        setTargetDelta(t) {
          ((this.targetDelta = t),
            this.root.scheduleUpdateProjection(),
            (this.isProjectionDirty = !0));
        }
        setOptions(t) {
          this.options = {
            ...this.options,
            ...t,
            crossfade: void 0 === t.crossfade || t.crossfade,
          };
        }
        clearMeasurements() {
          ((this.scroll = void 0),
            (this.layout = void 0),
            (this.snapshot = void 0),
            (this.prevTransformTemplateValue = void 0),
            (this.targetDelta = void 0),
            (this.target = void 0),
            (this.isLayoutDirty = !1));
        }
        forceRelativeParentToResolveTarget() {
          this.relativeParent &&
            this.relativeParent.resolvedRelativeTargetAt !== tZ.timestamp &&
            this.relativeParent.resolveTargetDelta(!0);
        }
        resolveTargetDelta(t = !1) {
          let e = this.getLead();
          (this.isProjectionDirty ||
            (this.isProjectionDirty = e.isProjectionDirty),
            this.isTransformDirty ||
              (this.isTransformDirty = e.isTransformDirty),
            this.isSharedProjectionDirty ||
              (this.isSharedProjectionDirty = e.isSharedProjectionDirty));
          let i = !!this.resumingFrom || this !== e;
          if (!(
            t ||
            (i && this.isSharedProjectionDirty) ||
            this.isProjectionDirty ||
            this.parent?.isProjectionDirty ||
            this.attemptToResolveRelativeTarget ||
            this.root.updateBlockedByResize
          ))
            return;
          let { layout: n, layoutId: r } = this.options;
          if (!this.layout || !(n || r)) return;
          this.resolvedRelativeTargetAt = tZ.timestamp;
          let s = this.getClosestProjectingParent();
          if (
            (s &&
              this.linkedParentVersion !== s.layoutVersion &&
              !s.options.layoutRoot &&
              this.removeRelativeTarget(),
            this.targetDelta ||
              this.relativeTarget ||
              (!1 !== this.options.layoutAnchor && s && s.layout
                ? this.createRelativeTarget(
                    s,
                    this.layout.layoutBox,
                    s.layout.layoutBox,
                  )
                : this.removeRelativeTarget()),
            this.relativeTarget || this.targetDelta)
          ) {
            if (
              (this.target ||
                ((this.target = tg()), (this.targetWithTransforms = tg())),
              this.relativeTarget &&
                this.relativeTargetOrigin &&
                this.relativeParent &&
                this.relativeParent.target)
            ) {
              var a, o, l, u;
              (this.forceRelativeParentToResolveTarget(),
                (a = this.target),
                (o = this.relativeTarget),
                (l = this.relativeParent.target),
                (u = this.options.layoutAnchor || void 0),
                n9(a.x, o.x, l.x, u?.x),
                n9(a.y, o.y, l.y, u?.y));
            } else
              this.targetDelta
                ? (this.resumingFrom
                    ? this.applyTransform(
                        this.layout.layoutBox,
                        !1,
                        this.target,
                      )
                    : rX(this.target, this.layout.layoutBox),
                  iu(this.target, this.targetDelta))
                : rX(this.target, this.layout.layoutBox);
            this.attemptToResolveRelativeTarget &&
              ((this.attemptToResolveRelativeTarget = !1),
              !1 !== this.options.layoutAnchor &&
              s &&
              !!s.resumingFrom == !!this.resumingFrom &&
              !s.options.layoutScroll &&
              s.target &&
              1 !== this.animationProgress
                ? this.createRelativeTarget(s, this.target, s.target)
                : (this.relativeParent = this.relativeTarget = void 0));
          }
        }
        getClosestProjectingParent() {
          if (!(
            !this.parent ||
            ir(this.parent.latestValues) ||
            ia(this.parent.latestValues)
          ))
            if (this.parent.isProjecting()) return this.parent;
            else return this.parent.getClosestProjectingParent();
        }
        isProjecting() {
          return !!(
            (this.relativeTarget ||
              this.targetDelta ||
              this.options.layoutRoot) &&
            this.layout
          );
        }
        createRelativeTarget(t, e, i) {
          ((this.relativeParent = t),
            (this.linkedParentVersion = t.layoutVersion),
            this.forceRelativeParentToResolveTarget(),
            (this.relativeTarget = tg()),
            (this.relativeTargetOrigin = tg()),
            n8(
              this.relativeTargetOrigin,
              e,
              i,
              this.options.layoutAnchor || void 0,
            ),
            rX(this.relativeTarget, this.relativeTargetOrigin));
        }
        removeRelativeTarget() {
          this.relativeParent = this.relativeTarget = void 0;
        }
        calcProjection() {
          let t = this.getLead(),
            e = !!this.resumingFrom || this !== t,
            i = !0;
          if (
            ((this.isProjectionDirty || this.parent?.isProjectionDirty) &&
              (i = !1),
            e &&
              (this.isSharedProjectionDirty || this.isTransformDirty) &&
              (i = !1),
            this.resolvedRelativeTargetAt === tZ.timestamp && (i = !1),
            i)
          )
            return;
          let { layout: n, layoutId: r } = this.options;
          if (
            ((this.isTreeAnimating = !!(
              (this.parent && this.parent.isTreeAnimating) ||
              this.currentAnimation ||
              this.pendingAnimation
            )),
            this.isTreeAnimating ||
              (this.targetDelta = this.relativeTarget = void 0),
            !this.layout || !(n || r))
          )
            return;
          rX(this.layoutCorrected, this.layout.layoutBox);
          let s = this.treeScale.x,
            a = this.treeScale.y;
          (!(function (t, e, i, n = !1) {
            let r,
              s,
              a = i.length;
            if (a) {
              e.x = e.y = 1;
              for (let o = 0; o < a; o++) {
                s = (r = i[o]).projectionDelta;
                let { visualElement: a } = r.options;
                (!a ||
                  !a.props.style ||
                  "contents" !== a.props.style.display) &&
                  (n &&
                    r.options.layoutScroll &&
                    r.scroll &&
                    r !== r.root &&
                    (ih(t.x, -r.scroll.offset.x), ih(t.y, -r.scroll.offset.y)),
                  s && ((e.x *= s.x.scale), (e.y *= s.y.scale), iu(t, s)),
                  n &&
                    is(r.latestValues) &&
                    ip(t, r.latestValues, r.layout?.layoutBox));
              }
              (e.x < 1.0000000000001 && e.x > 0.999999999999 && (e.x = 1),
                e.y < 1.0000000000001 && e.y > 0.999999999999 && (e.y = 1));
            }
          })(this.layoutCorrected, this.treeScale, this.path, e),
            t.layout &&
              !t.target &&
              (1 !== this.treeScale.x || 1 !== this.treeScale.y) &&
              ((t.target = t.layout.layoutBox),
              (t.targetWithTransforms = tg())));
          let { target: o } = t;
          if (!o) {
            this.prevProjectionDelta &&
              (this.createProjectionDeltas(), this.scheduleRender());
            return;
          }
          (this.projectionDelta && this.prevProjectionDelta
            ? (rH(this.prevProjectionDelta.x, this.projectionDelta.x),
              rH(this.prevProjectionDelta.y, this.projectionDelta.y))
            : this.createProjectionDeltas(),
            n4(
              this.projectionDelta,
              this.layoutCorrected,
              o,
              this.latestValues,
            ),
            (this.treeScale.x === s &&
              this.treeScale.y === a &&
              r3(this.projectionDelta.x, this.prevProjectionDelta.x) &&
              r3(this.projectionDelta.y, this.prevProjectionDelta.y)) ||
              ((this.hasProjected = !0),
              this.scheduleRender(),
              this.notifyListeners("projectionUpdate", o)));
        }
        hide() {
          this.isVisible = !1;
        }
        show() {
          this.isVisible = !0;
        }
        scheduleRender(t = !0) {
          if ((this.options.visualElement?.scheduleRender(), t)) {
            let t = this.getStack();
            t && t.scheduleRender();
          }
          this.resumingFrom &&
            !this.resumingFrom.instance &&
            (this.resumingFrom = void 0);
        }
        createProjectionDeltas() {
          ((this.prevProjectionDelta = tm()),
            (this.projectionDelta = tm()),
            (this.projectionDeltaWithTransform = tm()));
        }
        setAnimationOrigin(t, e = !1, i) {
          let n,
            r = this.snapshot,
            s = r ? r.latestValues : {},
            a = { ...this.latestValues },
            o = tm();
          ((this.relativeParent && this.relativeParent.options.layoutRoot) ||
            (this.relativeTarget = this.relativeTargetOrigin = void 0),
            (this.attemptToResolveRelativeTarget = !e));
          let l = tg(),
            u =
              (r ? r.source : void 0) !==
              (this.layout ? this.layout.source : void 0),
            h = this.getStack(),
            c = !h || h.members.length <= 1,
            d = !!(
              u &&
              !c &&
              !0 === this.options.crossfade &&
              !this.path.some(sx)
            );
          this.animationProgress = 0;
          let p = i?.interpolateProjection(t);
          ((this.mixTargetDelta = (e) => {
            let i = e / 1e3,
              r = p?.(i);
            if (
              (r
                ? ((o.x.translate = r.x),
                  (o.x.scale = e4(t.x.scale, 1, i)),
                  (o.x.origin = t.x.origin),
                  (o.x.originPoint = t.x.originPoint),
                  (o.y.translate = r.y),
                  (o.y.scale = e4(t.y.scale, 1, i)),
                  (o.y.origin = t.y.origin),
                  (o.y.originPoint = t.y.originPoint))
                : (sy(o.x, t.x, i), sy(o.y, t.y, i)),
              this.setTargetDelta(o),
              this.relativeTarget &&
                this.relativeTargetOrigin &&
                this.layout &&
                this.relativeParent &&
                this.relativeParent.layout)
            ) {
              var h, m, f, g, y, v;
              (n8(
                l,
                this.layout.layoutBox,
                this.relativeParent.layout.layoutBox,
                this.options.layoutAnchor || void 0,
              ),
                (f = this.relativeTarget),
                (g = this.relativeTargetOrigin),
                (y = l),
                (v = i),
                sv(f.x, g.x, y.x, v),
                sv(f.y, g.y, y.y, v),
                n &&
                  ((h = this.relativeTarget),
                  (m = n),
                  r0(h.x, m.x) && r0(h.y, m.y)) &&
                  (this.isProjectionDirty = !1),
                n || (n = tg()),
                rX(n, this.relativeTarget));
            }
            (u &&
              ((this.animationValues = a),
              (function (t, e, i, n, r, s) {
                r
                  ? ((t.opacity = e4(0, i.opacity ?? 1, r$(n))),
                    (t.opacityExit = e4(e.opacity ?? 1, 0, rU(n))))
                  : s && (t.opacity = e4(e.opacity ?? 1, i.opacity ?? 1, n));
                for (let r = 0; r < rF; r++) {
                  let s = rB[r],
                    a = r_(e, s),
                    o = r_(i, s);
                  (void 0 !== a || void 0 !== o) &&
                    (a || (a = 0),
                    o || (o = 0),
                    0 === a || 0 === o || rI(a) === rI(o)
                      ? ((t[s] = Math.max(e4(rO(a), rO(o), n), 0)),
                        (z.test(o) || z.test(a)) && (t[s] += "%"))
                      : (t[s] = o));
                }
                (e.rotate || i.rotate) &&
                  (t.rotate = e4(e.rotate || 0, i.rotate || 0, n));
              })(a, s, this.latestValues, i, d, c)),
              r &&
                void 0 !== r.rotate &&
                (this.animationValues || (this.animationValues = a),
                (this.animationValues.pathRotation = r.rotate)),
              this.root.scheduleUpdateProjection(),
              this.scheduleRender(),
              (this.animationProgress = i));
          }),
            this.mixTargetDelta(1e3 * !!this.options.layoutRoot));
        }
        startAnimation(t) {
          (this.notifyListeners("animationStart"),
            this.currentAnimation?.stop(),
            this.resumingFrom?.currentAnimation?.stop(),
            this.pendingAnimation &&
              (tG(this.pendingAnimation), (this.pendingAnimation = void 0)),
            (this.pendingAnimation = tK.update(() => {
              var e, i, n;
              let r;
              ((rV.hasAnimatedSinceResize = !0),
                ed.layout++,
                this.motionValue || (this.motionValue = eE(0)),
                this.motionValue.jump(0, !1),
                (this.currentAnimation =
                  ((e = this.motionValue),
                  (i = [0, 1e3]),
                  (n = {
                    ...t,
                    velocity: 0,
                    isSync: !0,
                    onUpdate: (e) => {
                      (this.mixTargetDelta(e), t.onUpdate && t.onUpdate(e));
                    },
                    onStop: () => {
                      ed.layout--;
                    },
                    onComplete: () => {
                      (ed.layout--,
                        t.onComplete && t.onComplete(),
                        this.completeAnimation());
                    },
                  }),
                  (r = ty(e) ? e : eE(e)).start(nW("", r, i, n)),
                  r.animation)),
                this.resumingFrom &&
                  (this.resumingFrom.currentAnimation = this.currentAnimation),
                (this.pendingAnimation = void 0));
            })));
        }
        completeAnimation() {
          this.resumingFrom &&
            ((this.resumingFrom.currentAnimation = void 0),
            (this.resumingFrom.preserveOpacity = void 0));
          let t = this.getStack();
          (t && t.exitAnimationComplete(),
            (this.resumingFrom =
              this.currentAnimation =
              this.animationValues =
                void 0),
            this.notifyListeners("animationComplete"));
        }
        finishAnimation() {
          (this.currentAnimation &&
            (this.mixTargetDelta && this.mixTargetDelta(1e3),
            this.currentAnimation.stop()),
            this.completeAnimation());
        }
        applyTransformsToTarget() {
          let t = this.getLead(),
            {
              targetWithTransforms: e,
              target: i,
              layout: n,
              latestValues: r,
            } = t;
          if (e && i && n) {
            if (
              this !== t &&
              this.layout &&
              n &&
              sS(this.options.animationType, this.layout.layoutBox, n.layoutBox)
            ) {
              i = this.target || tg();
              let e = n2(this.layout.layoutBox.x);
              ((i.x.min = t.target.x.min), (i.x.max = i.x.min + e));
              let n = n2(this.layout.layoutBox.y);
              ((i.y.min = t.target.y.min), (i.y.max = i.y.min + n));
            }
            (rX(e, i),
              ip(e, r),
              n4(
                this.projectionDeltaWithTransform,
                this.layoutCorrected,
                e,
                r,
              ));
          }
        }
        registerSharedNode(t, e) {
          (this.sharedNodes.has(t) || this.sharedNodes.set(t, new r4()),
            this.sharedNodes.get(t).add(e));
          let i = e.options.initialPromotionConfig;
          e.promote({
            transition: i ? i.transition : void 0,
            preserveFollowOpacity:
              i && i.shouldPreserveFollowOpacity
                ? i.shouldPreserveFollowOpacity(e)
                : void 0,
          });
        }
        isLead() {
          let t = this.getStack();
          return !t || t.lead === this;
        }
        getLead() {
          let { layoutId: t } = this.options;
          return (t && this.getStack()?.lead) || this;
        }
        getPrevLead() {
          let { layoutId: t } = this.options;
          return t ? this.getStack()?.prevLead : void 0;
        }
        getStack() {
          let { layoutId: t } = this.options;
          if (t) return this.root.sharedNodes.get(t);
        }
        promote({
          needsReset: t,
          transition: e,
          preserveFollowOpacity: i,
        } = {}) {
          let n = this.getStack();
          (n && n.promote(this, i),
            t && ((this.projectionDelta = void 0), (this.needsReset = !0)),
            e && this.setOptions({ transition: e }));
        }
        relegate() {
          let t = this.getStack();
          return !!t && t.relegate(this);
        }
        resetSkewAndRotation() {
          let { visualElement: t } = this.options;
          if (!t) return;
          let e = !1,
            { latestValues: i } = t;
          if (
            ((i.z ||
              i.rotate ||
              i.rotateX ||
              i.rotateY ||
              i.rotateZ ||
              i.skewX ||
              i.skewY) &&
              (e = !0),
            !e)
          )
            return;
          let n = {};
          i.z && st("z", t, n, this.animationValues);
          for (let e = 0; e < r8.length; e++)
            (st(`rotate${r8[e]}`, t, n, this.animationValues),
              st(`skew${r8[e]}`, t, n, this.animationValues));
          for (let e in (t.render(), n))
            (t.setStaticValue(e, n[e]),
              this.animationValues && (this.animationValues[e] = n[e]));
          t.scheduleRender();
        }
        applyProjectionStyles(t, e) {
          if (!this.instance || this.isSVG) return;
          if (!this.isVisible) {
            t.visibility = "hidden";
            return;
          }
          let i = this.getTransformTemplate();
          if (this.needsReset) {
            ((this.needsReset = !1),
              (t.visibility = ""),
              (t.opacity = ""),
              (t.pointerEvents = ij(e?.pointerEvents) || ""),
              (t.transform = i ? i(this.latestValues, "") : "none"));
            return;
          }
          let n = this.getLead();
          if (!this.projectionDelta || !this.layout || !n.target) {
            (this.options.layoutId &&
              ((t.opacity =
                void 0 !== this.latestValues.opacity
                  ? this.latestValues.opacity
                  : 1),
              (t.pointerEvents = ij(e?.pointerEvents) || "")),
              this.hasProjected &&
                !is(this.latestValues) &&
                ((t.transform = i ? i({}, "") : "none"),
                (this.hasProjected = !1)));
            return;
          }
          t.visibility = "";
          let r = n.animationValues || n.latestValues;
          this.applyTransformsToTarget();
          let s = (function (t, e, i) {
            let n = "",
              r = t.x.translate / e.x,
              s = t.y.translate / e.y,
              a = i?.z || 0;
            if (
              ((r || s || a) && (n = `translate3d(${r}px, ${s}px, ${a}px) `),
              (1 !== e.x || 1 !== e.y) &&
                (n += `scale(${1 / e.x}, ${1 / e.y}) `),
              i)
            ) {
              let {
                transformPerspective: t,
                rotate: e,
                pathRotation: r,
                rotateX: s,
                rotateY: a,
                skewX: o,
                skewY: l,
              } = i;
              (t && (n = `perspective(${t}px) ${n}`),
                e && (n += `rotate(${e}deg) `),
                r && (n += `rotate(${r}deg) `),
                s && (n += `rotateX(${s}deg) `),
                a && (n += `rotateY(${a}deg) `),
                o && (n += `skewX(${o}deg) `),
                l && (n += `skewY(${l}deg) `));
            }
            let o = t.x.scale * e.x,
              l = t.y.scale * e.y;
            return (
              (1 !== o || 1 !== l) && (n += `scale(${o}, ${l})`),
              n || "none"
            );
          })(this.projectionDeltaWithTransform, this.treeScale, r);
          (i && (s = i(r, s)), (t.transform = s));
          let { x: a, y: o } = this.projectionDelta;
          for (let e in ((t.transformOrigin = `${100 * a.origin}% ${100 * o.origin}% 0`),
          n.animationValues
            ? (t.opacity =
                n === this
                  ? (r.opacity ?? this.latestValues.opacity ?? 1)
                  : this.preserveOpacity
                    ? this.latestValues.opacity
                    : r.opacityExit)
            : (t.opacity =
                n === this
                  ? void 0 !== r.opacity
                    ? r.opacity
                    : ""
                  : void 0 !== r.opacityExit
                    ? r.opacityExit
                    : 0),
          e9)) {
            if (void 0 === r[e]) continue;
            let { correct: i, applyTo: a, isCSSVariable: o } = e9[e],
              l = "none" === s ? r[e] : i(r[e], n);
            if (a) {
              let e = a.length;
              for (let i = 0; i < e; i++) t[a[i]] = l;
            } else
              o
                ? (this.options.visualElement.renderState.vars[e] = l)
                : (t[e] = l);
          }
          this.options.layoutId &&
            (t.pointerEvents =
              n === this ? ij(e?.pointerEvents) || "" : "none");
        }
        clearSnapshot() {
          this.resumeFrom = this.snapshot = void 0;
        }
        resetTree() {
          (this.root.nodes.forEach((t) => t.currentAnimation?.stop()),
            this.root.nodes.forEach(so),
            this.root.sharedNodes.clear());
        }
      };
    }
    function si(t) {
      t.updateLayout();
    }
    function sn(t) {
      let e = t.resumeFrom?.snapshot || t.snapshot;
      if (t.isLead() && t.layout && e && t.hasListeners("didUpdate")) {
        let { layoutBox: i, measuredBox: n } = t.layout,
          { animationType: r } = t.options,
          s = e.source !== t.layout.source;
        if ("size" === r)
          n0((t) => {
            let n = s ? e.measuredBox[t] : e.layoutBox[t],
              r = n2(n);
            ((n.min = i[t].min), (n.max = n.min + r));
          });
        else if ("x" === r || "y" === r) {
          let t = "x" === r ? "y" : "x";
          rz(s ? e.measuredBox[t] : e.layoutBox[t], i[t]);
        } else
          sS(r, e.layoutBox, i) &&
            n0((n) => {
              let r = s ? e.measuredBox[n] : e.layoutBox[n],
                a = n2(i[n]);
              ((r.max = r.min + a),
                t.relativeTarget &&
                  !t.currentAnimation &&
                  ((t.isProjectionDirty = !0),
                  (t.relativeTarget[n].max = t.relativeTarget[n].min + a)));
            });
        let a = tm();
        n4(a, i, e.layoutBox);
        let o = tm();
        s
          ? n4(o, t.applyTransform(n, !0), e.measuredBox)
          : n4(o, i, e.layoutBox);
        let l = !rQ(a),
          u = !1;
        if (!t.resumeFrom) {
          let n = t.getClosestProjectingParent();
          if (n && !n.resumeFrom) {
            let { snapshot: r, layout: s } = n;
            if (r && s) {
              let a = t.options.layoutAnchor || void 0,
                o = tg();
              n8(o, e.layoutBox, r.layoutBox, a);
              let l = tg();
              (n8(l, i, s.layoutBox, a),
                r5(o, l) || (u = !0),
                n.options.layoutRoot &&
                  ((t.relativeTarget = l),
                  (t.relativeTargetOrigin = o),
                  (t.relativeParent = n)));
            }
          }
        }
        t.notifyListeners("didUpdate", {
          layout: i,
          snapshot: e,
          delta: o,
          layoutDelta: a,
          hasLayoutChanged: l,
          hasRelativeLayoutChanged: u,
        });
      } else if (t.isLead()) {
        let { onExitComplete: e } = t.options;
        e && e();
      }
      t.options.transition = void 0;
    }
    function sr(t) {
      t.parent &&
        (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty),
        t.isSharedProjectionDirty ||
          (t.isSharedProjectionDirty = !!(
            t.isProjectionDirty ||
            t.parent.isProjectionDirty ||
            t.parent.isSharedProjectionDirty
          )),
        t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
    }
    function ss(t) {
      t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
    }
    function sa(t) {
      t.clearSnapshot();
    }
    function so(t) {
      t.clearMeasurements();
    }
    function sl(t) {
      ((t.isLayoutDirty = !0), t.updateLayout());
    }
    function su(t) {
      t.isLayoutDirty = !1;
    }
    function sh(t) {
      t.isAnimationBlocked &&
        t.layout &&
        !t.isLayoutDirty &&
        ((t.snapshot = t.layout), (t.isLayoutDirty = !0));
    }
    function sc(t) {
      let { visualElement: e } = t.options;
      (e &&
        e.getProps().onBeforeLayoutMeasure &&
        e.notify("BeforeLayoutMeasure"),
        t.resetTransform());
    }
    function sd(t) {
      (t.finishAnimation(),
        (t.targetDelta = t.relativeTarget = t.target = void 0),
        (t.isProjectionDirty = !0));
    }
    function sp(t) {
      t.resolveTargetDelta();
    }
    function sm(t) {
      t.calcProjection();
    }
    function sf(t) {
      t.resetSkewAndRotation();
    }
    function sg(t) {
      t.removeLeadSnapshot();
    }
    function sy(t, e, i) {
      ((t.translate = e4(e.translate, 0, i)),
        (t.scale = e4(e.scale, 1, i)),
        (t.origin = e.origin),
        (t.originPoint = e.originPoint));
    }
    function sv(t, e, i, n) {
      ((t.min = e4(e.min, i.min, n)), (t.max = e4(e.max, i.max, n)));
    }
    function sx(t) {
      return t.animationValues && void 0 !== t.animationValues.opacityExit;
    }
    let sw = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
      sb = (t) =>
        "u" > typeof navigator &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().includes(t),
      sT = sb("applewebkit/") && !sb("chrome/") ? Math.round : tX;
    function sP(t) {
      ((t.min = sT(t.min)), (t.max = sT(t.max)));
    }
    function sS(t, e, i) {
      return (
        "position" === t ||
        ("preserve-aspect" === t && !(0.2 >= Math.abs(r2(e) - r2(i))))
      );
    }
    function sk(t) {
      return t !== t.root && t.scroll?.wasRoot;
    }
    let sA = se({
        attachResizeListener: (t, e) => n1(t, "resize", e),
        measureScroll: () => ({
          x:
            document.documentElement.scrollLeft ||
            document.body?.scrollLeft ||
            0,
          y:
            document.documentElement.scrollTop || document.body?.scrollTop || 0,
        }),
        checkIsScrollRoot: () => !0,
      }),
      sE = { current: void 0 },
      sj = se({
        measureScroll: (t) => ({ x: t.scrollLeft, y: t.scrollTop }),
        defaultParent: () => {
          if (!sE.current) {
            let t = new sA({});
            (t.mount(window),
              t.setOptions({ layoutScroll: !0 }),
              (sE.current = t));
          }
          return sE.current;
        },
        resetTransform: (t, e) => {
          t.style.transform = void 0 !== e ? e : "none";
        },
        checkIsScrollRoot: (t) =>
          "fixed" === window.getComputedStyle(t).position,
      });
    function sM(t, e) {
      let i = rt(t),
        n = new AbortController();
      return [i, { passive: !0, ...e, signal: n.signal }, () => n.abort()];
    }
    function sC(t, e, i) {
      let { props: n } = t;
      t.animationState &&
        n.whileHover &&
        t.animationState.setActive("whileHover", "Start" === i);
      let r = n["onHover" + i];
      r && tK.postRender(() => r(e, rd(e)));
    }
    let sV = (t, e) => !!e && (t === e || sV(t, e.parentElement)),
      sR = new WeakSet();
    function sD(t) {
      return (e) => {
        "Enter" === e.key && t(e);
      };
    }
    function sL(t, e) {
      t.dispatchEvent(
        new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }),
      );
    }
    function sN(t) {
      return rc(t) && !(n5.x || n5.y);
    }
    let sB = new WeakSet();
    function sF(t, e, i) {
      let { props: n } = t;
      if (t.current instanceof HTMLButtonElement && t.current.disabled) return;
      t.animationState &&
        n.whileTap &&
        t.animationState.setActive("whileTap", "Start" === i);
      let r = n["onTap" + ("End" === i ? "" : i)];
      r && tK.postRender(() => r(e, rd(e)));
    }
    let sO = new WeakMap(),
      sI = new WeakMap(),
      s_ = (t) => {
        let e = sO.get(t.target);
        e && e(t);
      },
      s$ = (t) => {
        t.forEach(s_);
      },
      sU = { some: 0, all: 1 },
      sW = (function (t, e) {
        if ("u" < typeof Proxy) return iI;
        let i = new Map(),
          n = (i, n) => iI(i, n, t, e);
        return new Proxy((t, e) => n(t, e), {
          get: (r, s) =>
            "create" === s
              ? n
              : (i.has(s) || i.set(s, iI(s, void 0, t, e)), i.get(s)),
        });
      })(
        {
          animation: {
            Feature: class extends i_ {
              constructor(t) {
                (super(t),
                  t.animationState ||
                    (t.animationState = (function (t) {
                      let e = (e) =>
                          Promise.all(
                            e.map(({ animation: e, options: i }) =>
                              (function (t, e, i = {}) {
                                let n;
                                if (
                                  (t.notify("AnimationStart", e),
                                  Array.isArray(e))
                                )
                                  n = Promise.all(e.map((e) => nH(t, e, i)));
                                else if ("string" == typeof e) n = nH(t, e, i);
                                else {
                                  let r =
                                    "function" == typeof e
                                      ? i$(t, e, i.custom)
                                      : e;
                                  n = Promise.all(nz(t, r, i));
                                }
                                return n.then(() => {
                                  t.notify("AnimationComplete", e);
                                });
                              })(t, e, i),
                            ),
                          ),
                        i = nJ(),
                        n = !0,
                        r = !1,
                        s = (e) => (i, n) => {
                          let r = i$(
                            t,
                            n,
                            "exit" === e ? t.presenceContext?.custom : void 0,
                          );
                          if (r) {
                            let { transition: t, transitionEnd: e, ...n } = r;
                            i = { ...i, ...n, ...e };
                          }
                          return i;
                        };
                      function a(a) {
                        let { props: o } = t,
                          l =
                            (function t(e) {
                              if (!e) return;
                              if (!e.isControllingVariants) {
                                let i = (e.parent && t(e.parent)) || {};
                                return (
                                  void 0 !== e.props.initial &&
                                    (i.initial = e.props.initial),
                                  i
                                );
                              }
                              let i = {};
                              for (let t = 0; t < nY; t++) {
                                let n = eD[t],
                                  r = e.props[n];
                                (eV(r) || !1 === r) && (i[n] = r);
                              }
                              return i;
                            })(t.parent) || {},
                          u = [],
                          h = new Set(),
                          c = {},
                          d = 1 / 0;
                        for (let e = 0; e < nG; e++) {
                          var p, m;
                          let f = nK[e],
                            g = i[f],
                            y = void 0 !== o[f] ? o[f] : l[f],
                            v = eV(y),
                            x = f === a ? g.isActive : null;
                          !1 === x && (d = e);
                          let w = y === l[f] && y !== o[f] && v;
                          if (
                            (w &&
                              (n || r) &&
                              t.manuallyAnimateOnMount &&
                              (w = !1),
                            (g.protectedKeys = { ...c }),
                            (!g.isActive && null === x) ||
                              (!y && !g.prevProp) ||
                              eC(y) ||
                              "boolean" == typeof y)
                          )
                            continue;
                          if ("exit" === f && g.isActive && !0 !== x) {
                            g.prevResolvedValues &&
                              (c = { ...c, ...g.prevResolvedValues });
                            continue;
                          }
                          let b =
                              ((p = g.prevProp),
                              "string" == typeof (m = y)
                                ? m !== p
                                : !!Array.isArray(m) && !nq(m, p)),
                            T =
                              b ||
                              (f === a && g.isActive && !w && v) ||
                              (e > d && v),
                            P = !1,
                            S = Array.isArray(y) ? y : [y],
                            k = S.reduce(s(f), {});
                          !1 === x && (k = {});
                          let { prevResolvedValues: A = {} } = g,
                            E = { ...A, ...k },
                            j = (e) => {
                              ((T = !0),
                                h.has(e) && ((P = !0), h.delete(e)),
                                (g.needsAnimating[e] = !0));
                              let i = t.getValue(e);
                              i && (i.liveStyle = !1);
                            };
                          for (let t in E) {
                            let e = k[t],
                              i = A[t];
                            if (!c.hasOwnProperty(t))
                              (iz(e) && iz(i) ? !nq(e, i) || b : e !== i)
                                ? null != e
                                  ? j(t)
                                  : h.add(t)
                                : void 0 !== e && h.has(t)
                                  ? j(t)
                                  : (g.protectedKeys[t] = !0);
                          }
                          ((g.prevProp = y),
                            (g.prevResolvedValues = k),
                            g.isActive && (c = { ...c, ...k }),
                            (n || r) && t.blockInitialAnimation && (T = !1));
                          let M = w && b,
                            C = !M || P;
                          T &&
                            C &&
                            u.push(
                              ...S.map((e) => {
                                let i = { type: f };
                                if (
                                  "string" == typeof e &&
                                  (n || r) &&
                                  !M &&
                                  t.manuallyAnimateOnMount &&
                                  t.parent
                                ) {
                                  let { parent: n } = t,
                                    r = i$(n, e);
                                  if (n.enteringChildren && r) {
                                    let { delayChildren: e } =
                                      r.transition || {};
                                    i.delay = nX(n.enteringChildren, t, e);
                                  }
                                }
                                return { animation: e, options: i };
                              }),
                            );
                        }
                        if (h.size) {
                          let e = {};
                          if ("boolean" != typeof o.initial) {
                            let i = i$(
                              t,
                              Array.isArray(o.initial)
                                ? o.initial[0]
                                : o.initial,
                            );
                            i && i.transition && (e.transition = i.transition);
                          }
                          (h.forEach((i) => {
                            let n = t.getBaseTarget(i),
                              r = t.getValue(i);
                            (r && (r.liveStyle = !0), (e[i] = n ?? null));
                          }),
                            u.push({ animation: e }));
                        }
                        let f = !!u.length;
                        return (
                          n &&
                            (!1 === o.initial || o.initial === o.animate) &&
                            !t.manuallyAnimateOnMount &&
                            (f = !1),
                          (n = !1),
                          (r = !1),
                          f ? e(u) : Promise.resolve()
                        );
                      }
                      return {
                        animateChanges: a,
                        setActive: function (e, n) {
                          if (i[e].isActive === n) return Promise.resolve();
                          (t.variantChildren?.forEach((t) =>
                            t.animationState?.setActive(e, n),
                          ),
                            (i[e].isActive = n));
                          let r = a(e);
                          for (let t in i) i[t].protectedKeys = {};
                          return r;
                        },
                        setAnimateFunction: function (i) {
                          e = i(t);
                        },
                        getState: () => i,
                        reset: () => {
                          ((i = nJ()), (r = !0));
                        },
                      };
                    })(t)));
              }
              updateAnimationControlsSubscription() {
                let { animate: t } = this.node.getProps();
                eC(t) && (this.unmountControls = t.subscribe(this.node));
              }
              mount() {
                this.updateAnimationControlsSubscription();
              }
              update() {
                let { animate: t } = this.node.getProps(),
                  { animate: e } = this.node.prevProps || {};
                t !== e && this.updateAnimationControlsSubscription();
              }
              unmount() {
                (this.node.animationState.reset(), this.unmountControls?.());
              }
            },
          },
          exit: {
            Feature: class extends i_ {
              constructor() {
                (super(...arguments),
                  (this.id = nQ++),
                  (this.isExitComplete = !1));
              }
              update() {
                if (!this.node.presenceContext) return;
                let { isPresent: t, onExitComplete: e } =
                    this.node.presenceContext,
                  { isPresent: i } = this.node.prevPresenceContext || {};
                if (!this.node.animationState || t === i) return;
                if (t && !1 === i) {
                  if (this.isExitComplete) {
                    let { initial: t, custom: e } = this.node.getProps();
                    if (
                      "string" == typeof t ||
                      ("object" == typeof t && null !== t && !Array.isArray(t))
                    ) {
                      let i = i$(this.node, t, e);
                      if (i) {
                        let { transition: t, transitionEnd: e, ...n } = i;
                        for (let t in n) this.node.getValue(t)?.jump(n[t]);
                      }
                    }
                    (this.node.animationState.reset(),
                      this.node.animationState.animateChanges());
                  } else this.node.animationState.setActive("exit", !1);
                  this.isExitComplete = !1;
                  return;
                }
                let n = this.node.animationState.setActive("exit", !t);
                e &&
                  !t &&
                  n.then(() => {
                    ((this.isExitComplete = !0), e(this.id));
                  });
              }
              mount() {
                let { register: t, onExitComplete: e } =
                  this.node.presenceContext || {};
                (e && e(this.id), t && (this.unmount = t(this.id)));
              }
              unmount() {}
            },
          },
          inView: {
            Feature: class extends i_ {
              constructor() {
                (super(...arguments),
                  (this.hasEnteredView = !1),
                  (this.isInView = !1));
              }
              startObserver() {
                var t;
                let e;
                this.stopObserver?.();
                let { viewport: i = {} } = this.node.getProps(),
                  { root: n, margin: r, amount: s = "some", once: a } = i,
                  o = {
                    root: n ? n.current : void 0,
                    rootMargin: r,
                    threshold: "number" == typeof s ? s : sU[s],
                  },
                  l = (t) => {
                    let { isIntersecting: e } = t;
                    if (
                      this.isInView === e ||
                      ((this.isInView = e), a && !e && this.hasEnteredView)
                    )
                      return;
                    (e && (this.hasEnteredView = !0),
                      this.node.animationState &&
                        this.node.animationState.setActive("whileInView", e));
                    let { onViewportEnter: i, onViewportLeave: n } =
                        this.node.getProps(),
                      r = e ? i : n;
                    r && r(t);
                  };
                this.stopObserver =
                  ((t = this.node.current),
                  (e = (function ({ root: t, ...e }) {
                    let i = t || document;
                    sI.has(i) || sI.set(i, {});
                    let n = sI.get(i),
                      r = JSON.stringify(e);
                    return (
                      n[r] ||
                        (n[r] = new IntersectionObserver(s$, {
                          root: t,
                          ...e,
                        })),
                      n[r]
                    );
                  })(o)),
                  sO.set(t, l),
                  e.observe(t),
                  () => {
                    (sO.delete(t), e.unobserve(t));
                  });
              }
              mount() {
                this.startObserver();
              }
              update() {
                if ("u" < typeof IntersectionObserver) return;
                let { props: t, prevProps: e } = this.node;
                ["amount", "margin", "root"].some(
                  (function ({ viewport: t = {} }, { viewport: e = {} } = {}) {
                    return (i) => t[i] !== e[i];
                  })(t, e),
                ) && this.startObserver();
              }
              unmount() {
                (this.stopObserver?.(),
                  (this.hasEnteredView = !1),
                  (this.isInView = !1));
              }
            },
          },
          tap: {
            Feature: class extends i_ {
              mount() {
                let { current: t } = this.node;
                if (!t) return;
                let { globalTapTarget: e, propagate: i } = this.node.props;
                this.unmount = (function (t, e, i = {}) {
                  let [n, r, s] = sM(t, i),
                    a = (t) => {
                      let n = t.currentTarget;
                      if (!sN(t) || sB.has(t)) return;
                      (sR.add(n), i.stopPropagation && sB.add(t));
                      let s = e(n, t),
                        a = (t, e) => {
                          (window.removeEventListener("pointerup", o),
                            window.removeEventListener("pointercancel", l),
                            sR.has(n) && sR.delete(n),
                            sN(t) &&
                              "function" == typeof s &&
                              s(t, { success: e }));
                        },
                        o = (t) => {
                          a(
                            t,
                            n === window ||
                              n === document ||
                              i.useGlobalTarget ||
                              sV(n, t.target),
                          );
                        },
                        l = (t) => {
                          a(t, !1);
                        };
                      (window.addEventListener("pointerup", o, r),
                        window.addEventListener("pointercancel", l, r));
                    };
                  return (
                    n.forEach((t) => {
                      ((i.useGlobalTarget ? window : t).addEventListener(
                        "pointerdown",
                        a,
                        r,
                      ),
                      g(t)) &&
                        (t.addEventListener("focus", (t) =>
                          ((t, e) => {
                            let i = t.currentTarget;
                            if (!i) return;
                            let n = sD(() => {
                              if (sR.has(i)) return;
                              sL(i, "down");
                              let t = sD(() => {
                                sL(i, "up");
                              });
                              (i.addEventListener("keyup", t, e),
                                i.addEventListener(
                                  "blur",
                                  () => sL(i, "cancel"),
                                  e,
                                ));
                            });
                            (i.addEventListener("keydown", n, e),
                              i.addEventListener(
                                "blur",
                                () => i.removeEventListener("keydown", n),
                                e,
                              ));
                          })(t, r),
                        ),
                        ru.has(t.tagName) ||
                          !0 === t.isContentEditable ||
                          t.hasAttribute("tabindex") ||
                          (t.tabIndex = 0));
                    }),
                    s
                  );
                })(
                  t,
                  (t, e) => (
                    sF(this.node, e, "Start"),
                    (t, { success: e }) =>
                      sF(this.node, t, e ? "End" : "Cancel")
                  ),
                  { useGlobalTarget: e, stopPropagation: i?.tap === !1 },
                );
              }
              unmount() {}
            },
          },
          focus: {
            Feature: class extends i_ {
              constructor() {
                (super(...arguments), (this.isActive = !1));
              }
              onFocus() {
                let t = !1;
                try {
                  t = this.node.current.matches(":focus-visible");
                } catch (e) {
                  t = !0;
                }
                t &&
                  this.node.animationState &&
                  (this.node.animationState.setActive("whileFocus", !0),
                  (this.isActive = !0));
              }
              onBlur() {
                this.isActive &&
                  this.node.animationState &&
                  (this.node.animationState.setActive("whileFocus", !1),
                  (this.isActive = !1));
              }
              mount() {
                this.unmount = iH(
                  n1(this.node.current, "focus", () => this.onFocus()),
                  n1(this.node.current, "blur", () => this.onBlur()),
                );
              }
              unmount() {}
            },
          },
          hover: {
            Feature: class extends i_ {
              mount() {
                let { current: t } = this.node;
                t &&
                  (this.unmount = (function (t, e, i = {}) {
                    let [n, r, s] = sM(t, i);
                    return (
                      n.forEach((t) => {
                        let i,
                          n = !1,
                          s = !1,
                          a = (e) => {
                            (i && (i(e), (i = void 0)),
                              t.removeEventListener("pointerleave", l));
                          },
                          o = (t) => {
                            ((n = !1),
                              window.removeEventListener("pointerup", o),
                              window.removeEventListener("pointercancel", o),
                              s && ((s = !1), a(t)));
                          },
                          l = (t) => {
                            if ("touch" !== t.pointerType) {
                              if (n) {
                                s = !0;
                                return;
                              }
                              a(t);
                            }
                          };
                        (t.addEventListener(
                          "pointerenter",
                          (n) => {
                            if ("touch" === n.pointerType || n5.x || n5.y)
                              return;
                            s = !1;
                            let a = e(t, n);
                            "function" == typeof a &&
                              ((i = a),
                              t.addEventListener("pointerleave", l, r));
                          },
                          r,
                        ),
                          t.addEventListener(
                            "pointerdown",
                            () => {
                              ((n = !0),
                                window.addEventListener("pointerup", o, r),
                                window.addEventListener("pointercancel", o, r));
                            },
                            r,
                          ));
                      }),
                      s
                    );
                  })(
                    t,
                    (t, e) => (
                      sC(this.node, e, "Start"),
                      (t) => sC(this.node, t, "End")
                    ),
                  ));
              }
              unmount() {}
            },
          },
          pan: {
            Feature: class extends i_ {
              constructor() {
                (super(...arguments), (this.removePointerDownListener = tX));
              }
              onPointerDown(t) {
                this.session = new ry(t, this.createPanHandlers(), {
                  transformPagePoint: this.node.getTransformPagePoint(),
                  contextWindow: rm(this.node),
                });
              }
              createPanHandlers() {
                let {
                  onPanSessionStart: t,
                  onPanStart: e,
                  onPan: i,
                  onPanEnd: n,
                } = this.node.getProps();
                return {
                  onSessionStart: rC(t),
                  onStart: rC(e),
                  onMove: rC(i),
                  onEnd: (t, e) => {
                    (delete this.session, n && tK.postRender(() => n(t, e)));
                  },
                };
              }
              mount() {
                this.removePointerDownListener = rp(
                  this.node.current,
                  "pointerdown",
                  (t) => this.onPointerDown(t),
                );
              }
              update() {
                this.session &&
                  this.session.updateHandlers(this.createPanHandlers());
              }
              unmount() {
                (this.removePointerDownListener(),
                  this.session && this.session.end());
              }
            },
          },
          drag: {
            Feature: class extends i_ {
              constructor(t) {
                (super(t),
                  (this.removeGroupControls = tX),
                  (this.removeListeners = tX),
                  (this.controls = new rE(t)));
              }
              mount() {
                let { dragControls: t } = this.node.getProps();
                (t && (this.removeGroupControls = t.subscribe(this.controls)),
                  (this.removeListeners = this.controls.addListeners() || tX));
              }
              update() {
                let { dragControls: t } = this.node.getProps(),
                  { dragControls: e } = this.node.prevProps || {};
                t !== e &&
                  (this.removeGroupControls(),
                  t && (this.removeGroupControls = t.subscribe(this.controls)));
              }
              unmount() {
                (this.removeGroupControls(),
                  this.removeListeners(),
                  this.controls.isDragging || this.controls.endPanSession());
              }
            },
            ProjectionNode: sj,
            MeasureLayout: rN,
          },
          layout: { ProjectionNode: sj, MeasureLayout: rN },
        },
        (t, e) =>
          (e.isSVG ?? iv(t))
            ? new it(e)
            : new ig(e, { allowProjection: t !== a.Fragment }),
      ),
      sz = [
        { label: "Concept", href: "#opportunity" },
        { label: "Stay", href: "#stay" },
        { label: "Place", href: "#place" },
      ];
    function sX({ variant: t = "light" } = {}) {
      let [e, i] = (0, a.useState)(!1),
        [n, r] = (0, a.useState)(!1);
      (0, a.useEffect)(() => {
        r(!0);
      }, []);
      let o = "dark" === t,
        h = o ? "hover:text-[var(--champagne)]" : "hover:text-[var(--clay)]",
        c = o ? "" : "invert",
        d = o ? "bg-white" : "bg-[var(--ink)]";
      return (0, s.jsxs)(s.Fragment, {
        children: [
          (0, s.jsx)("header", {
            className: `relative z-20 px-5 pt-6 pb-5 sm:px-8 lg:px-12 ${o ? "text-white" : "text-[var(--ink)]"}`,
            children: (0, s.jsxs)("div", {
              className:
                "mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-6 md:grid-cols-[1fr_auto_1fr]",
              children: [
                (0, s.jsx)(l.default, {
                  "aria-label": "The Bend Club home",
                  className: "flex items-center justify-self-start",
                  href: "/",
                  children: (0, s.jsx)("img", {
                    alt: "The Bend Club",
                    className: `h-10 w-auto sm:h-12 ${c}`,
                    src: "/logo/the-bend-club.svg",
                  }),
                }),
                (0, s.jsx)("nav", {
                  "aria-label": "Primary",
                  className: "hidden justify-self-center text-sm md:block",
                  children: (0, s.jsx)("ul", {
                    className: "flex items-center gap-x-3 sm:gap-x-4",
                    children: sz.map((t, e) =>
                      (0, s.jsxs)(
                        "li",
                        {
                          className: "flex items-center gap-x-3 sm:gap-x-4",
                          children: [
                            (0, s.jsx)("a", {
                              className: `font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.22em] transition ${h}`,
                              href: t.href,
                              children: t.label,
                            }),
                            e < sz.length - 1 &&
                              (0, s.jsx)("img", {
                                alt: "",
                                "aria-hidden": "true",
                                className: `h-2 w-auto opacity-70 ${c}`,
                                src: "/logo/star-icon.svg",
                              }),
                          ],
                        },
                        t.href,
                      ),
                    ),
                  }),
                }),
                (0, s.jsxs)("div", {
                  className: "flex items-center justify-self-end gap-4",
                  children: [
                    (0, s.jsx)("a", {
                      className: `hidden font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.22em] underline underline-offset-4 transition md:block ${o ? "decoration-white/40 hover:decoration-white" : "decoration-[var(--ink)]/30 hover:decoration-[var(--ink)]"}`,
                      href: "#contact",
                      children: "Contact",
                    }),
                    (0, s.jsxs)("button", {
                      "aria-label": e ? "Close menu" : "Open menu",
                      className:
                        "flex flex-col justify-center gap-[5px] md:hidden",
                      onClick: () => i((t) => !t),
                      children: [
                        (0, s.jsx)(sW.span, {
                          animate: e
                            ? { rotate: 45, y: 7 }
                            : { rotate: 0, y: 0 },
                          className: `block h-px w-6 origin-center ${d}`,
                          transition: { duration: 0.25 },
                        }),
                        (0, s.jsx)(sW.span, {
                          animate: e ? { opacity: 0 } : { opacity: 1 },
                          className: `block h-px w-6 ${d}`,
                          transition: { duration: 0.15 },
                        }),
                        (0, s.jsx)(sW.span, {
                          animate: e
                            ? { rotate: -45, y: -7 }
                            : { rotate: 0, y: 0 },
                          className: `block h-px w-6 origin-center ${d}`,
                          transition: { duration: 0.25 },
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          n &&
            (0, u.createPortal)(
              (0, s.jsx)(E, {
                children:
                  e &&
                  (0, s.jsxs)(sW.div, {
                    animate: { opacity: 1 },
                    className: "fixed inset-0 z-[100] flex flex-col px-8 py-6",
                    exit: { opacity: 0 },
                    initial: { opacity: 0 },
                    style: { backgroundColor: "#101f1a" },
                    transition: { duration: 0.25 },
                    children: [
                      (0, s.jsxs)("div", {
                        className: "flex items-center justify-between",
                        children: [
                          (0, s.jsx)(l.default, {
                            href: "/",
                            onClick: () => i(!1),
                            children: (0, s.jsx)("img", {
                              alt: "The Bend Club",
                              className: "h-10 w-auto sm:h-12",
                              src: "/logo/the-bend-club.svg",
                            }),
                          }),
                          (0, s.jsxs)("button", {
                            "aria-label": "Close menu",
                            className: "relative h-6 w-6",
                            onClick: () => i(!1),
                            children: [
                              (0, s.jsx)("span", {
                                className:
                                  "absolute inset-0 m-auto block h-px w-full rotate-45 bg-white",
                              }),
                              (0, s.jsx)("span", {
                                className:
                                  "absolute inset-0 m-auto block h-px w-full -rotate-45 bg-white",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, s.jsx)(sW.nav, {
                        animate: "show",
                        className:
                          "flex flex-1 flex-col items-center justify-center gap-8",
                        initial: "hidden",
                        variants: {
                          hidden: {},
                          show: {
                            transition: {
                              staggerChildren: 0.09,
                              delayChildren: 0.12,
                            },
                          },
                        },
                        children: [
                          ...sz,
                          { label: "Contact", href: "#contact" },
                        ].map((t) =>
                          (0, s.jsx)(
                            sW.a,
                            {
                              className:
                                "font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium uppercase tracking-[0.15em] text-white transition hover:text-[var(--champagne)]",
                              href: t.href,
                              variants: {
                                hidden: { opacity: 0, scale: 0.97 },
                                show: {
                                  opacity: 1,
                                  scale: 1,
                                  transition: {
                                    duration: 0.5,
                                    ease: [0.16, 1, 0.3, 1],
                                  },
                                },
                              },
                              onClick: () => i(!1),
                              children: t.label,
                            },
                            t.href,
                          ),
                        ),
                      }),
                      (0, s.jsx)("div", {
                        className: "flex justify-center pb-2",
                        children: (0, s.jsx)("img", {
                          alt: "",
                          "aria-hidden": "true",
                          className: "h-3 w-auto opacity-30",
                          src: "/logo/star-icon.svg",
                        }),
                      }),
                    ],
                  }),
              }),
              document.body,
            ),
        ],
      });
    }
    let sH =
      "linear-gradient(180deg, rgba(16, 31, 26, 0.25) 0%, rgba(16, 31, 26, 0.1) 35%, rgba(16, 31, 26, 0.55) 75%, rgba(16, 31, 26, 0.92) 100%)";
    function sY({ slides: t }) {
      let [e, i] = (0, a.useState)(0),
        n = (0, a.useRef)(null),
        r = (0, a.useRef)(!1),
        l = t[0],
        u = t.slice(1);
      (0, a.useEffect)(() => {
        let t = n.current;
        if (!t) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          (o.gsap.set(
            t.querySelectorAll(".hero-loader__word, .hero-loader__cover-extra"),
            { autoAlpha: 0 },
          ),
            o.gsap.set(t.querySelectorAll(".hero-loader__growing-image"), {
              width: "100vw",
              height: "100dvh",
            }),
            o.gsap.set(t.querySelectorAll(".hero-fade-word, .hero-fade-in"), {
              autoAlpha: 1,
              y: 0,
            }),
            (r.current = !0));
          return;
        }
        let e = o.gsap.context(() => {
          let t = o.gsap.timeline({ defaults: { ease: "expo.inOut" } });
          (t.fromTo(
            ".hero-loader__word-svg",
            { y: 0, yPercent: 100 },
            { y: 0, yPercent: 0, duration: 1.25, stagger: 0.12 },
          ),
            t.fromTo(
              ".hero-loader__box",
              { width: "0em" },
              { width: "1em", duration: 1.25 },
              "<1.05",
            ),
            t.fromTo(
              ".hero-loader__growing-image",
              { width: "0%" },
              { width: "100%", duration: 1.25 },
              "<",
            ),
            t.fromTo(
              ".hero-loader__word--start",
              { x: "0em" },
              { x: "-0.05em", duration: 1.25 },
              "<",
            ),
            t.fromTo(
              ".hero-loader__word--end",
              { x: "0em" },
              { x: "0.05em", duration: 1.25 },
              "<",
            ),
            t.fromTo(
              ".hero-loader__cover-extra",
              { opacity: 1 },
              { opacity: 0, duration: 0.05, ease: "none", stagger: 0.55 },
              "-=0.05",
            ),
            t.to(
              ".hero-loader__growing-image",
              { width: "100vw", height: "100dvh", duration: 1.7 },
              "<1.25",
            ),
            t.to(".hero-loader__box", { width: "110vw", duration: 1.7 }, "<"),
            t.to(
              ".hero-loader__word",
              { autoAlpha: 0, duration: 0.45, ease: "power2.out" },
              "<0.35",
            ),
            t.fromTo(
              ".hero-fade-word",
              { autoAlpha: 0, y: "0.55em" },
              {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: "expo.out",
                stagger: 0.06,
              },
              ">0.2",
            ),
            t.fromTo(
              ".hero-fade-in",
              { autoAlpha: 0, y: 28 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.95,
                ease: "expo.out",
                stagger: 0.08,
              },
              "<0.1",
            ),
            t.add(() => {
              r.current = !0;
            }));
        }, t);
        return () => e.revert();
      }, []);
      let h = (0, a.useRef)(void 0),
        c = (0, a.useCallback)(() => {
          window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            (void 0 !== h.current && window.clearInterval(h.current),
            (h.current = window.setInterval(() => {
              i((e) => (e + 1) % t.length);
            }, 6e3)));
        }, [t.length]),
        d = (0, a.useCallback)(
          (t) => {
            (i(t), c());
          },
          [c],
        );
      return (
        (0, a.useEffect)(() => {
          let t = 0,
            e = () => {
              r.current ? c() : (t = requestAnimationFrame(e));
            };
          return (
            (t = requestAnimationFrame(e)),
            () => {
              (cancelAnimationFrame(t),
                void 0 !== h.current && window.clearInterval(h.current));
            }
          );
        }, [c]),
        (0, s.jsxs)("section", {
          "aria-label": "Hero",
          className:
            "relative isolate flex min-h-svh flex-col overflow-hidden bg-[var(--ink)] text-white",
          "data-surface": "dark",
          id: "imagery",
          ref: n,
          children: [
            (0, s.jsx)("div", {
              "aria-hidden": "true",
              className:
                "hero-loader pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden bg-[var(--background)]",
              children: (0, s.jsxs)("div", {
                className:
                  "flex items-end justify-center font-medium leading-none",
                style: { fontSize: "clamp(3.5rem, 11vw, 10em)", height: "1em" },
                children: [
                  (0, s.jsx)("div", {
                    className:
                      "hero-loader__word hero-loader__word--start flex justify-end overflow-hidden",
                    style: { width: "3.555em" },
                    children: (0, s.jsx)("img", {
                      alt: "",
                      className: "hero-loader__word-svg block w-auto invert",
                      src: "/logo/the-bend.svg",
                      style: { height: "1.83em" },
                    }),
                  }),
                  (0, s.jsx)("div", {
                    className:
                      "hero-loader__box relative flex flex-col items-center justify-center",
                    style: { width: 0, height: "1em", margin: "0 0.08em" },
                    children: (0, s.jsx)("div", {
                      className: "relative flex items-center justify-center",
                      style: { minWidth: "1em", height: "100%" },
                      children: (0, s.jsx)("div", {
                        className:
                          "hero-loader__growing-image absolute flex items-center justify-center overflow-hidden",
                        style: { width: "0%", height: "100%" },
                        children: (0, s.jsxs)("div", {
                          className: "absolute",
                          style: {
                            width: "100%",
                            minWidth: "1em",
                            height: "100%",
                          },
                          children: [
                            (0, s.jsx)("div", {
                              className:
                                "hero-loader__cover-extra absolute inset-0 h-full w-full bg-cover bg-center",
                              style: {
                                backgroundImage:
                                  "url(/images/tbc-interior-02.jpg)",
                                zIndex: 3,
                              },
                            }),
                            (0, s.jsx)("div", {
                              className:
                                "hero-loader__cover-extra absolute inset-0 h-full w-full bg-cover bg-center",
                              style: {
                                backgroundImage:
                                  "url(/images/tbc-exterior-04.jpg)",
                                zIndex: 2,
                              },
                            }),
                            (0, s.jsx)("div", {
                              className:
                                "hero-loader__cover-image absolute inset-0 h-full w-full bg-cover bg-center",
                              style: {
                                backgroundImage: `${sH}, url(${l.image})`,
                                zIndex: 1,
                              },
                            }),
                          ],
                        }),
                      }),
                    }),
                  }),
                  (0, s.jsx)("div", {
                    className:
                      "hero-loader__word hero-loader__word--end flex justify-start overflow-hidden",
                    style: { width: "3.555em" },
                    children: (0, s.jsx)("img", {
                      alt: "",
                      className: "hero-loader__word-svg block w-auto invert",
                      src: "/logo/club.svg",
                      style: { height: "1em" },
                    }),
                  }),
                ],
              }),
            }),
            (0, s.jsx)("div", {
              "aria-hidden": "true",
              className: "pointer-events-none absolute inset-0 z-20",
              children: u.map((t, i) =>
                (0, s.jsx)(
                  "div",
                  {
                    "aria-label": t.alt,
                    className: `absolute inset-0 bg-cover bg-center transition-opacity duration-[1400ms] ease-out ${e === i + 1 ? "opacity-100" : "opacity-0"}`,
                    role: "img",
                    style: { backgroundImage: `${sH}, url(${t.image})` },
                  },
                  t.image,
                ),
              ),
            }),
            (0, s.jsx)("div", {
              className: "hero-fade-in relative z-30",
              children: (0, s.jsx)(sX, { variant: "dark" }),
            }),
            (0, s.jsx)("div", {
              className:
                "relative z-30 flex flex-1 flex-col justify-end px-5 pb-10 pt-24 sm:px-8 sm:pb-14 sm:pt-28 lg:px-12 lg:pb-16",
              children: (0, s.jsxs)("div", {
                className: "mx-auto w-full max-w-7xl",
                children: [
                  (0, s.jsx)("p", {
                    className:
                      "hero-fade-in font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.22em] text-white/70",
                    children:
                      "Discover a Luxury Residence Club in the Heart of Bend",
                  }),
                  (0, s.jsxs)("div", {
                    className: "mt-5 sm:mt-6 lg:flex lg:items-end lg:gap-10",
                    children: [
                      (0, s.jsxs)("h1", {
                        className:
                          "font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,6.5rem)] font-medium leading-[0.96] tracking-[-0.012em] text-white lg:flex-1",
                        children: [
                          ["Where", "the", "River"].map((t, e, i) =>
                            (0, s.jsxs)(
                              a.Fragment,
                              {
                                children: [
                                  (0, s.jsx)("span", {
                                    className: "hero-fade-word inline-block",
                                    children: t,
                                  }),
                                  e < i.length - 1 ? " " : "",
                                ],
                              },
                              `r1-${t}`,
                            ),
                          ),
                          (0, s.jsx)("br", {}),
                          ["Meets", "Everything"].map((t, e, i) =>
                            (0, s.jsxs)(
                              a.Fragment,
                              {
                                children: [
                                  (0, s.jsx)("span", {
                                    className: "hero-fade-word inline-block",
                                    children: t,
                                  }),
                                  e < i.length - 1 ? " " : "",
                                ],
                              },
                              `r2-${t}`,
                            ),
                          ),
                        ],
                      }),
                      (0, s.jsxs)("div", {
                        className:
                          "hero-fade-in mt-8 flex w-full justify-between gap-5 sm:mt-10 lg:mt-0 lg:w-auto lg:shrink-0 lg:justify-start",
                        children: [
                          (0, s.jsx)("button", {
                            type: "button",
                            "aria-label": "Previous slide",
                            onClick: () => d((e - 1 + t.length) % t.length),
                            className:
                              "cursor-pointer text-white/50 transition-colors duration-300 hover:text-white",
                            children: (0, s.jsx)("svg", {
                              fill: "none",
                              height: "26",
                              viewBox: "0 0 18 18",
                              width: "26",
                              children: (0, s.jsx)("path", {
                                d: "M11 4L6 9L11 14",
                                stroke: "currentColor",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "1.5",
                              }),
                            }),
                          }),
                          (0, s.jsx)("button", {
                            type: "button",
                            "aria-label": "Next slide",
                            onClick: () => d((e + 1) % t.length),
                            className:
                              "cursor-pointer text-white/50 transition-colors duration-300 hover:text-white",
                            children: (0, s.jsx)("svg", {
                              fill: "none",
                              height: "26",
                              viewBox: "0 0 18 18",
                              width: "26",
                              children: (0, s.jsx)("path", {
                                d: "M7 4L12 9L7 14",
                                stroke: "currentColor",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "1.5",
                              }),
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, s.jsx)("div", {
                    className:
                      "hero-fade-in mt-6 border-t border-white/22 sm:mt-8",
                  }),
                ],
              }),
            }),
          ],
        })
      );
    }
    t.s(["Hero", () => sY], 92349);
  },
  59095,
  (t) => {
    "use strict";
    var e = t.i(43476),
      i = t.i(71645);
    function n({
      children: t,
      className: n = "",
      delay: r = 0,
      threshold: s = 0.16,
      variant: a = "rise",
    }) {
      let o = (0, i.useRef)(null),
        [l, u] = (0, i.useState)(!1);
      return ((0, i.useEffect)(() => {
        let t = o.current;
        if (!t || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
          return;
        let e = new IntersectionObserver(
          (t) => {
            t.forEach((t) => {
              t.isIntersecting && (u(!0), e.disconnect());
            });
          },
          { threshold: s, rootMargin: "0px 0px -8% 0px" },
        );
        return (e.observe(t), () => e.disconnect());
      }, [s]),
      "mask" === a)
        ? (0, e.jsx)("div", {
            ref: o,
            className: n,
            children: (0, e.jsx)("div", {
              className: `reveal-mask ${l ? "reveal-in" : ""}`,
              style: { transitionDelay: `${r}ms` },
              children: t,
            }),
          })
        : (0, e.jsx)("div", {
            ref: o,
            className: `reveal ${l ? "reveal-in" : ""} ${n}`,
            style: { transitionDelay: `${r}ms` },
            children: t,
          });
    }
    t.s(["Reveal", () => n]);
  },
  39383,
  (t) => {
    "use strict";
    var e = t.i(43476),
      i = t.i(71645),
      n = t.i(89970),
      r = t.i(83495);
    n.gsap.registerPlugin(r.ScrollTrigger);
    let s = "#f4f1ea";
    function a() {
      let t = (0, i.useRef)(null);
      return (
        (0, i.useEffect)(() => {
          let e = t.current;
          if (!e) return;
          let i = () =>
              n.gsap.to(e, {
                backgroundColor: "#17231f",
                duration: 0.9,
                ease: "power2.out",
                overwrite: "auto",
              }),
            a = () =>
              n.gsap.to(e, {
                backgroundColor: s,
                duration: 0.9,
                ease: "power2.out",
                overwrite: "auto",
              }),
            o = null,
            l = () => {
              let t = r.ScrollTrigger.getById("sticky-features-pin");
              return (
                !!t &&
                (o?.kill(),
                (o = r.ScrollTrigger.create({
                  start: () => t.start - 220,
                  end: () => t.end + 220,
                  invalidateOnRefresh: !0,
                  onEnter: i,
                  onLeave: a,
                  onEnterBack: i,
                  onLeaveBack: a,
                })),
                !0)
              );
            },
            u = 0,
            h = !1,
            c = () => {
              (h = l()) || (u = requestAnimationFrame(c));
            };
          u = requestAnimationFrame(c);
          let d = () => {
            h || (h = l());
          };
          return (
            r.ScrollTrigger.addEventListener("refreshInit", d),
            () => {
              (cancelAnimationFrame(u),
                r.ScrollTrigger.removeEventListener("refreshInit", d),
                o?.kill());
            }
          );
        }, []),
        (0, e.jsx)("div", {
          "aria-hidden": "true",
          className: "has-grain pointer-events-none fixed inset-0",
          ref: t,
          style: { backgroundColor: s, zIndex: -1 },
        })
      );
    }
    t.s(["ScrollBackground", () => a]);
  },
  22389,
  (t) => {
    "use strict";
    var e = t.i(43476),
      i = t.i(71645),
      n = t.i(89970),
      r = t.i(83495);
    function s() {
      let t = (0, i.useRef)(null);
      (0, i.useEffect)(() => {
        let e = t.current;
        if (!e || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
          return;
        let i = n.gsap.context(() => {
          (n.gsap.set(".statement-word", { opacity: 0.12, y: 0 }),
            n.gsap.to(".statement-word", {
              opacity: 1,
              ease: "none",
              stagger: { each: 0.05, from: "start" },
              scrollTrigger: {
                trigger: e,
                start: "top 75%",
                end: "bottom 60%",
                scrub: 0.8,
              },
            }),
            n.gsap.fromTo(
              ".statement-star",
              { opacity: 0, scale: 0.4, rotate: -120 },
              {
                opacity: 1,
                scale: 1,
                rotate: 0,
                duration: 1.4,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: e,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              },
            ));
        }, e);
        return () => i.revert();
      }, []);
      let r =
        "Centrally situated in Bend's Old Mill District, steps from the Deschutes River and Hayden Homes Amphitheater, The Bend Club offers 16 luxury townhome residences with concierge programming year-round.".split(
          " ",
        );
      return (0, e.jsx)("section", {
        "aria-label": "The Bend Club statement",
        className: "relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-44",
        id: "opportunity",
        ref: t,
        children: (0, e.jsxs)("div", {
          className: "mx-auto flex max-w-5xl flex-col items-start",
          children: [
            (0, e.jsx)("img", {
              alt: "",
              "aria-hidden": "true",
              className:
                "statement-star invert mb-8 h-6 w-auto animate-[spin_18s_linear_infinite] sm:mb-10 sm:h-7 lg:h-8",
              src: "/logo/star-icon.svg",
            }),
            (0, e.jsx)("p", {
              className:
                "text-left font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.4vw,3rem)] font-medium leading-[1.18] tracking-[-0.008em] text-[var(--ink)]",
              children: r.map((t, i) =>
                (0, e.jsxs)(
                  "span",
                  {
                    className: "statement-word inline-block",
                    children: [t, i < r.length - 1 ? " " : ""],
                  },
                  `${t}-${i}`,
                ),
              ),
            }),
          ],
        }),
      });
    }
    (n.gsap.registerPlugin(r.ScrollTrigger), t.s(["Statement", () => s]));
  },
  79495,
  (t) => {
    "use strict";
    var e = t.i(43476),
      i = t.i(71645),
      n = t.i(89970),
      r = t.i(83495);
    function s({ features: t }) {
      let s = (0, i.useRef)(null);
      return (
        (0, i.useEffect)(() => {
          let t = s.current;
          if (!t) return;
          let e = Array.from(
              t.querySelectorAll("[data-sticky-feature-visual-wrap]"),
            ),
            i = Array.from(t.querySelectorAll("[data-sticky-feature-item]")),
            a = t.querySelector("[data-sticky-feature-progress]"),
            o = Math.min(e.length, i.length);
          if (o < 1) return;
          let l = window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? 0.01
              : 0.75,
            u = "power4.inOut",
            h = (t) =>
              Array.from(t.querySelectorAll("[data-sticky-feature-text]"));
          (e[0] && n.gsap.set(e[0], { clipPath: "inset(0% round 0.75em)" }),
            n.gsap.set(i[0], { autoAlpha: 1 }));
          let c = 0,
            d = Math.max(1, o - 1),
            p = r.ScrollTrigger.create({
              id: "sticky-features-pin",
              trigger: t,
              start: "center center",
              end: () => `+=${100 * d}%`,
              pin: !0,
              scrub: !0,
              invalidateOnRefresh: !0,
              onUpdate: (t) => {
                let r = Math.floor(
                  (Math.min(t.progress, 0.7) / 0.7) * d + 1e-6,
                );
                ((r = Math.max(0, Math.min(d, r))),
                  a && n.gsap.to(a, { scaleX: t.progress, ease: "none" }),
                  r !== c &&
                    (((t, r) => {
                      var s, a;
                      let o, c;
                      if (t === r) return;
                      let d = n.gsap.timeline({
                        defaults: { overwrite: "auto" },
                      });
                      (t < r
                        ? d.to(
                            e[r],
                            {
                              clipPath: "inset(0% round 0.75em)",
                              duration: l,
                              ease: u,
                            },
                            0,
                          )
                        : d.to(
                            e[t],
                            {
                              clipPath: "inset(50% round 0.75em)",
                              duration: l,
                              ease: u,
                            },
                            0,
                          ),
                        (o = h((s = i[t]))),
                        n.gsap.to(o, {
                          autoAlpha: 0,
                          y: -30,
                          ease: "power4.out",
                          duration: 0.4,
                          onComplete: () => n.gsap.set(s, { autoAlpha: 0 }),
                        }),
                        (c = h((a = i[r]))),
                        n.gsap.set(a, { autoAlpha: 1 }),
                        n.gsap.fromTo(
                          c,
                          { autoAlpha: 0, y: 30 },
                          {
                            autoAlpha: 1,
                            y: 0,
                            ease: "power4.out",
                            duration: l,
                            stagger: 0.1,
                          },
                        ));
                    })(c, r),
                    (c = r)));
              },
            });
          return () => {
            p.kill();
          };
        }, [t.length]),
        (0, e.jsx)("div", {
          className:
            "sticky-features__wrap relative w-full px-5 text-white sm:px-8 lg:px-12",
          "data-bg-zone": "dark",
          "data-surface": "dark",
          "data-sticky-feature-wrap": "",
          id: "stay",
          ref: s,
          children: (0, e.jsx)("div", {
            className:
              "sticky-features__scroll flex h-screen items-center justify-center",
            children: (0, e.jsxs)("div", {
              className:
                "sticky-features__container mx-auto flex w-full max-w-7xl items-stretch justify-center gap-6 lg:gap-10",
              children: [
                (0, e.jsxs)("div", {
                  className:
                    "sticky-feaures__col is--img relative flex-1 overflow-hidden rounded-[0.75em]",
                  children: [
                    (0, e.jsx)("div", {
                      className: "sticky-features__img-collection w-full",
                      children: (0, e.jsx)("div", {
                        className:
                          "sticky-features__img-list relative aspect-[1/1.3] w-full",
                        children: t.map((t) =>
                          (0, e.jsx)(
                            "div",
                            {
                              className:
                                "sticky-features__img-item absolute inset-0 h-full w-full",
                              "data-sticky-feature-visual-wrap": "",
                              style: { clipPath: "inset(50% round 0.75em)" },
                              children: (0, e.jsx)("img", {
                                alt: t.alt,
                                className:
                                  "sticky-features__img h-full w-full object-cover",
                                src: t.image,
                              }),
                            },
                            t.image,
                          ),
                        ),
                      }),
                    }),
                    (0, e.jsx)("div", {
                      className:
                        "sticky-features__progress-w absolute bottom-0 left-0 right-0 h-1 bg-white/15",
                      children: (0, e.jsx)("div", {
                        className:
                          "sticky-features__progress-bar h-full w-full origin-left bg-white",
                        "data-sticky-feature-progress": "",
                        style: { transform: "scale3d(0, 1, 1)" },
                      }),
                    }),
                  ],
                }),
                (0, e.jsx)("div", {
                  className: "sticky-feaures__col relative flex-1",
                  children: (0, e.jsx)("div", {
                    className: "sticky-features__text-collection h-full",
                    children: (0, e.jsx)("div", {
                      className:
                        "sticky-features__text-list relative flex h-full max-h-full flex-col items-start justify-center",
                      children: t.map((t, i) =>
                        (0, e.jsxs)(
                          "div",
                          {
                            className:
                              "sticky-features__text-item absolute right-0 ml-auto flex w-full max-w-[27.5em] flex-col items-start gap-5",
                            "data-sticky-feature-item": "",
                            style: {
                              visibility: 0 === i ? "visible" : "hidden",
                            },
                            children: [
                              (0, e.jsx)("p", {
                                className:
                                  "font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.22em] text-white/70",
                                "data-sticky-feature-text": "",
                                children: t.eyebrow,
                              }),
                              (0, e.jsx)("h3", {
                                className:
                                  "font-[family-name:var(--font-display)] text-[clamp(2rem,4.4vw,3.75em)] font-medium leading-[1.02] tracking-[-0.012em]",
                                "data-sticky-feature-text": "",
                                children: t.title,
                              }),
                            ],
                          },
                          t.title,
                        ),
                      ),
                    }),
                  }),
                }),
              ],
            }),
          }),
        })
      );
    }
    (n.gsap.registerPlugin(r.ScrollTrigger), t.s(["StickyFeatures", () => s]));
  },
]);
