import "src/styles/globals.css";
import "src/styles/globals.scss";
import type { AppProps } from "next/app";
import { MainProvider } from "src/context/mainContext"; // Correct import

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainProvider>
      <Component {...pageProps} />
    </MainProvider>
  );
}
