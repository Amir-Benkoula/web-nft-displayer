import { useEffect, useState } from "react";
import { UserContext } from "../lib/context";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { Backdrop, CircularProgress } from "@mui/material";
import CardCarousel from "../components/CardCarousel";

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

    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach(scroller => {
        scroller.setAttribute("data-animated", "true");

        const scrollerInner = scroller.querySelector(".scroller__inner");

        if (scrollerInner) {
          const scrollerContent = Array.from(scrollerInner.children);
          scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true) as HTMLElement;
            duplicatedItem.setAttribute('aria-hidden', "true");
            scrollerInner?.appendChild(duplicatedItem);
          })
        } else {
          console.error("Element with class '.scroller__inner' not found in 'scroller'");
        }
      });
    }
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
      <div className="home-container">
        <h1 className="title">Explore and save your favorite nft's</h1>
        <CardCarousel />
      </div>
    </UserContext.Provider>
  );
}
