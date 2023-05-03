import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import MetaMaskSDK from "@metamask/sdk";
import { UserContext } from "../lib/context";

export default function WalletButton() {
  const [connection, setConnection] = useState(false);
  const { userId, setUserId } = useContext(UserContext);

  useEffect(() => {
    async function initialize() {
      const accounts: any = await window.ethereum?.request({
        method: "eth_accounts",
      });
      if (typeof window.ethereum == "undefined" || accounts.length == 0) {
        console.log("disconnected");
        window.localStorage.setItem('userId', JSON.stringify(""));
        setUserId("");
      } else {
        const localUserId = JSON.parse(window.localStorage.getItem('userId') || "");
        setConnection(true);
        setUserId(localUserId);
      }
    }

    initialize();
    window.addEventListener("load", initialize);

    document
      .getElementById("connect-button")
      ?.addEventListener("click", (e) => {
        window.ethereum
          ?.request({ method: "eth_requestAccounts" })
          .then((accounts: any) => {
            if (accounts && accounts.length > 0) {
              setConnection(true);
              window.localStorage.setItem('userId', JSON.stringify(accounts[0]));
              setUserId(accounts[0]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });

    return () => {
      window.removeEventListener("load", initialize);
    };
  }, [setUserId]);

  return (
    <button className={styles.button} id="connect-button">
      {connection ? userId : "Connect Metamask"}
    </button>
  );
}
