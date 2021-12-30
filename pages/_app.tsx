import "../styles/globals.css";
import { useRouter } from "next/router";
import type { AppProps /*, AppContext */ } from "next/app";
import Transition from "./transition";
import Header from "./shared_components/Header";
import Stars from "./shared_components/stars";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <div>
      <Header />
      <Transition location={router.pathname}>
        <Component {...pageProps} key={router.route} />
      </Transition>
      <Stars />
    </div>
  );
}
export default MyApp;
