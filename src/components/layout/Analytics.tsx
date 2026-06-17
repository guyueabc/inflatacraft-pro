"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

// ── Google Tag Manager ───────────────────────────────────────────────────────

function GTM() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  if (!gtmId) return null;

  return (
    <>
      {/* GTM 头部脚本 */}
      <Script
        id="gtm-head"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
        }}
      />
      {/* GTM noscript 回退 */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0" width="0" style={{ display: "none", visibility: "hidden" }}
        />
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

// ── UTM 参数持久化 (用于广告归因) ────────────────────────────────────────────

function UTMTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    const hasUtm = utmParams.some((p) => searchParams?.has(p));
    if (!hasUtm) return;

    // 存储 UTM 到 sessionStorage 以便在表单提交时携带
    utmParams.forEach((p) => {
      const val = searchParams?.get(p);
      if (val) sessionStorage.setItem(p, val);
    });

    // 推送到 dataLayer (GTM 可用)
    const utmData: Record<string, string> = {};
    utmParams.forEach((p) => {
      const val = searchParams?.get(p);
      if (val) utmData[p] = val;
    });
    (window as any).dataLayer?.push({ event: "utm_captured", ...utmData });
  }, [pathname, searchParams]);

  return null;
}

function UTMTrackerWrapper() {
  return (
    <Suspense fallback={null}>
      <UTMTracker />
    </Suspense>
  );
}

// ── Exports ──────────────────────────────────────────────────────────────────

export function Analytics() {
  return (
    <>
      <GTM />
      <MetaPixel />
      <UTMTrackerWrapper />
    </>
  );
}
