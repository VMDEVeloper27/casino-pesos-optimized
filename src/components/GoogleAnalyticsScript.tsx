import Script from 'next/script';

const GoogleAnalyticsScript = () => {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-EF14LWF4P0"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EF14LWF4P0');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalyticsScript;