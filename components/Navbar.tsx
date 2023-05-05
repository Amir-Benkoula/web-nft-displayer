import WalletButton from "./WalletButton";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import ccl_logo from "../public/ccl_logo.svg";

export default function Navbar() {
  return (
    <div>
      <nav className={styles.navbar}>
        <ul>
          <li className={styles.logo}>
            <Link href="/">
              <Image src={ccl_logo} alt={`Hello :D`} width={45} height={45} />
            </Link>
          </li>
          <li className={styles.logoText}>
            <Link href="/">
              <h2>20 Mint Typewriter</h2>
            </Link>
          </li>
          <li>
            <Link href="/top-nfts">
              <button className={styles.button}>Top Nfts</button>
            </Link>
          </li>
          <li>
            <WalletButton />
          </li>
        </ul>
      </nav>
    </div>
  );
}
