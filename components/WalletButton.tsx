import React, { useEffect, useState } from "react";
import MetaMaskSDK from "@metamask/sdk";

export default function WalletButton() {
  const [connection, setConnection] = useState(false);
  const [walletId, setWalletId] = useState("");

  useEffect(() => {
    async function initialize() {
      const accounts: any = await window.ethereum?.request({
        method: "eth_accounts",
      });
      console.log(accounts);
      if (typeof window.ethereum !== "undefined" && accounts.length > 0) {
        setConnection(true);
        setWalletId(accounts[0]);
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
            }
            setWalletId(accounts[0]);
          })
          .catch((err) => {
            console.log(err);
          });
      });

    return () => {
      window.removeEventListener("load", initialize);
    };
  }, []);

  return (
    <button id="connect-button">
      {connection ? walletId : "Connect Metamask"}
    </button>
  );
}
