"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

// Google Ads 账号 ID
const GOOGLE_ADS_ID = "AW-18234377845";

// ── Google Ads 全局代码 (gtag.js) ────────────────────────────────────────────

function GoogleAdsGlobalTag() {
  return (
    <>
      <Script
        id="google-ads-gtag-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        async
      />
      <Script
        id="google-ads-gtag-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: [
            `window.dataLayer=window.dataLayer||[];`,
            `function gtag(){dataLayer.push(arguments);}`,
            `gtag('js',new Date());`,
            `gtag('config','${GOOGLE_ADS_ID}');`,
            `// 转化追踪函数 — 表单提交时调用`,
            `function gtag_report_conversion(url){`,
            `  var callback=function(){if(typeof(url)!='undefined'){window.location=url;}};`,
            `  gtag('event','conversion',{`,
            `    'send_to':'${GOOGLE_ADS_ID}/TYNLCJu0_70cEPWM6vZD',`,
            `    'value':1.0,`,
            `    'currency':'CNY',`,
            `    'event_callback':callback`,
            `  });`,
            `  return false;`,
            `}`,
          ].join("\n"),
        }}
      />
    </>
  );
}

// ── Google Tag Manager (可选) ────────────────────────────────────────────────

function GTM() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  if (!gtmId) return null;

  return (
    <>
      <Script
        id="gtm-head"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
        }}
      />
      <noscript>
        <iframe src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
      </noscript>
    </>
  );
}

// ── Meta Pixel ───────────────────────────────────────────────────────────────

function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!pixelId) return null;

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`,
      }}
    />
  );
}

// ── UTM + GCLID 参数持久化 ───────────────────────────────────────────────────

function UTMTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const adParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "fbclid"];
    const hasAdParam = adParams.some((p) => searchParams?.has(p));
    if (!hasAdParam) return;

    adParams.forEach((p) => {
      const val = searchParams?.get(p);
      if (val) sessionStorage.setItem(p, val);
    });

    const captured: Record<string, string> = {};
    adParams.forEach((p) => {
      const val = searchParams?.get(p);
      if (val) captured[p] = val;
    });
    (window as any).dataLayer?.push({ event: "ad_params_captured", ...captured });
  }, [pathname, searchParams]);

  return null;
}

// ── 转化事件追踪 ─────────────────────────────────────────────────────────────

function ConversionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // 报价页成功提交后触发转化
    if (pathname === "/get-quote" && sessionStorage.getItem("quote_submitted") === "true") {
      (window as any).dataLayer?.push({ event: "conversion_quote_submitted" });
      if (typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/quote_submit` });
      }
      sessionStorage.removeItem("quote_submitted");
    }

    // 电话点击追踪
    document.querySelectorAll('a[href^="tel:"]').forEach((el) => {
      if (el.hasAttribute("data-tracked")) return;
      el.setAttribute("data-tracked", "true");
      el.addEventListener("click", () => {
        (window as any).dataLayer?.push({ event: "phone_click", phone_href: el.getAttribute("href") });
        (window as any).gtag?.("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/phone_call` });
      });
    });

    // WhatsApp 点击追踪
    document.querySelectorAll('a[href*="wa.me"]').forEach((el) => {
      if (el.hasAttribute("data-tracked")) return;
      el.setAttribute("data-tracked", "true");
      el.addEventListener("click", () => {
        (window as any).dataLayer?.push({ event: "whatsapp_click" });
        (window as any).gtag?.("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/whatsapp_chat` });
      });
    });
  }, [pathname]);

  return null;
}

function UTMTrackerWrapper() {
  return (
    <Suspense fallback={null}>
      <UTMTracker />
      <ConversionTracker />
    </Suspense>
  );
}

// ── Exports ──────────────────────────────────────────────────────────────────

export function Analytics() {
  return (
    <>
      <GoogleAdsGlobalTag />
      <GTM />
      <MetaPixel />
      <UTMTrackerWrapper />
    </>
  );
}
