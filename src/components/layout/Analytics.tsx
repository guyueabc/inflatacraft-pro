"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const GOOGLE_ADS_ID = "AW-18234377845";

function GoogleAdsGlobalTag() {
  return (
    <>
      <Script id="google-ads-gtag-src" strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} async />
      <Script id="google-ads-gtag-config" strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: [
          `window.dataLayer=window.dataLayer||[];`,
          `function gtag(){dataLayer.push(arguments);}`,
          `gtag("js",new Date());`,
          `gtag("config","${GOOGLE_ADS_ID}");`,
          `function gtag_report_conversion(url){`,
          `  var callback=function(){if(typeof(url)!="undefined"){window.location=url;}};`,
          `  gtag("event","conversion",{`,
          `    "send_to":"${GOOGLE_ADS_ID}/TYNLCJu0_70cEPWM6vZD",`,
          `    "value":1.0,`,
          `    "currency":"CNY",`,
          `    "event_callback":callback`,
          `  });`,
          `  return false;`,
          `}`,
        ].join("\n"),
      }} />
    </>
  );
}

function GTM() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  if (!gtmId) return null;
  return (
    <>
      <Script id="gtm-head" strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer","${gtmId}");`,
      }} />
      <noscript>
        <iframe src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
      </noscript>
    </>
  );
}

function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!pixelId) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{
      __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init","${pixelId}");fbq("track","PageView");`,
    }} />
  );
}

function Tracker() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => { setReady(true); }, []);

  useEffect(() => {
    if (!ready) return;
    const sp = new URLSearchParams(window.location.search);
    const adParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "fbclid"];
    const hasAd = adParams.some((p) => sp.has(p));
    if (hasAd) {
      const captured: Record<string, string> = {};
      adParams.forEach((p) => {
        const val = sp.get(p);
        if (val) { try { sessionStorage.setItem(p, val); } catch {} captured[p] = val; }
      });
      (window as any).dataLayer?.push({ event: "ad_params_captured", ...captured });
    }
  }, [pathname, ready]);

  useEffect(() => {
    if (!ready) return;
    if (pathname === "/get-quote" && sessionStorage.getItem("quote_submitted") === "true") {
      (window as any).dataLayer?.push({ event: "conversion_quote_submitted" });
      if (typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/quote_submit` });
      }
      sessionStorage.removeItem("quote_submitted");
    }
  }, [pathname, ready]);

  return null;
}

export function Analytics() {
  return (
    <>
      <GoogleAdsGlobalTag />
      <GTM />
      <MetaPixel />
      <Tracker />
    </>
  );
}