import { useState } from "react";
import type { AppProps } from "next/app";
import Router from "next/router";
import Loader from "../src/components/Loader";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isPageLoading, setIsPageLoading] = useState(false);

  Router.events.on("routeChangeStart", () => setIsPageLoading(true));
  Router.events.on("routeChangeComplete", () => setIsPageLoading(false));
  Router.events.on("routeChangeError", () => setIsPageLoading(false));

  return (
    <>
      {isPageLoading && <Loader />}
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
