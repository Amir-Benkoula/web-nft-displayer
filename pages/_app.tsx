import { useEffect, useState } from "react";
import { UserContext } from "../lib/context";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { Backdrop, CircularProgress } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // To show backdrop when page is loading
  useEffect(() => {
    const handleStart = (url: any) => url !== router.asPath && setOpen(true);
    const handleComplete = (url: any) =>
      url !== router.asPath && setOpen(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
  });

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <Navbar />
      {!open ? (
        <Component {...pageProps} />
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </UserContext.Provider>
  );
}
