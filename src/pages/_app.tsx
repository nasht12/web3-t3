import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { WagmiConfig, createClient } from "wagmi";  
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";

import { api } from "../utils/api";

import "../styles/globals.css";

const alchemyId = process.env.ALCHEMY_ID;
const client = createClient(
  getDefaultClient({
    appName: "Your App Name",
    alchemyId,
  }),
);

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
    </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default api.withTRPC(MyApp);
