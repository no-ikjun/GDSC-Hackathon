import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { ThemeProvider } from "next-themes";
import { CookiesProvider } from "react-cookie";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Layout>
        <Analytics />
        <Component {...pageProps} />
      </Layout>
    </CookiesProvider>
  );
}
