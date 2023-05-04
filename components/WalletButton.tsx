import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import MetaMaskSDK from "@metamask/sdk";
import { UserContext } from "../lib/context";

export default function WalletButton() {
  const [connection, setConnection] = useState(false);
  const { userId, setUserId } = useContext(UserContext);

  const shortUserId = userId.slice(0, 5) + "..." + userId.slice(-4);

  useEffect(() => {
    // Getting the state of the conection to metamask wallet at each reload
    async function initialize() {
      const accounts: any = await window.ethereum?.request({
        method: "eth_accounts",
      });
      // If not connected sets the user id to an empty string, else, sets the id to the wallet id
      if (typeof window.ethereum == "undefined" || accounts.length == 0) {
        window.localStorage.setItem("userId", JSON.stringify(""));
        setUserId("");
      } else {
        const localUserId = JSON.parse(
          window.localStorage.getItem("userId") || ""
        );
        setConnection(true);
        setUserId(localUserId);
      }
    }

    initialize();
    window.addEventListener("load", initialize);

    // The connection button, sets the userId in localStorage to use it later
    document
      .getElementById("connect-button")
      ?.addEventListener("click", (e) => {
        window.ethereum
          ?.request({ method: "eth_requestAccounts" })
          .then((accounts: any) => {
            if (accounts && accounts.length > 0) {
              setConnection(true);
              window.localStorage.setItem(
                "userId",
                JSON.stringify(accounts[0])
              );
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
      {connection ? shortUserId : "Connect Metamask"}
    </button>
  );
}
