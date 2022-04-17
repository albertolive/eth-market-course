import { ToastContainer } from "react-toastify";
import "@styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Web3Provider } from "@components/providers";

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <ToastContainer />
      <Component {...pageProps} />
    </Web3Provider>
  );
}

export default MyApp;
