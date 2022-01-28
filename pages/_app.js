import "../styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { wrapper } from "../redux/reducer";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
