import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import AuthNotFound from "../components/authNotfound.js";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, []);

  return (
    <>
      <Script 
          id="marker-io-script"
          strategy="afterInteractive" 
          dangerouslySetInnerHTML={{
              __html: `
                  window.markerConfig = {
                      project: '6581f04c741aa8a5a4cdf173', 
                      source: 'snippet'
                  };
                  !function(e,r,a){if(!e.__Marker){e.__Marker={};var t=[],n={__cs:t};["show","hide","isVisible","capture","cancelCapture","unload","reload","isExtensionInstalled","setReporter","setCustomData","on","off"].forEach(function(e){n[e]=function(){var r=Array.prototype.slice.call(arguments);r.unshift(e),t.push(r)}}),e.Marker=n;var s=r.createElement("script");s.async=1,s.src="https://edge.marker.io/latest/shim.js";var i=r.getElementsByTagName("script")[0];i.parentNode.insertBefore(s,i)}}(window,document);
              `,
          }}
      />
    </>
  );
}
