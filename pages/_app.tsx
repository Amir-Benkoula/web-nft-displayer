import { useState } from "react";
import { UserContext } from "../lib/context";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  const [userId, setUserId] = useState("");

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <Navbar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
