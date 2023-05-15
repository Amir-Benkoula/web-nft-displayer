import WalletButton from "./WalletButton";
import styles from "../styles/components/Navbar.module.css";
import Link from "next/link";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

export default function Navbar() {
  const [collectionAddress, setCollectionAddress] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = `/contract/${collectionAddress}`;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCollectionAddress(event.target.value);
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <ul>
          {/* <li className={styles.logo}>
            <Link href="/">
              <Image src={ccl_logo} alt={`Hello :D`} width={45} height={45} />
              Home
            </Link>
          </li> */}
          <li className={styles.logo}>
            <Link href="/">
              <h2>Home</h2>
            </Link>
          </li>
          <li className={styles.search}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="collectionAddress"><SearchOutlined /></label>
              <input
                id="collectionAddress"
                type="text"
                value={collectionAddress}
                onChange={handleInputChange}
                placeholder="Enter a contract id"
              />
              <button type="submit">Submit</button>
            </form>
          </li>
          {/* <li>
            <Link href="/top-nfts">
              <button className={styles.button}>Top Nfts</button>
            </Link>
          </li> */}
          <li>
            <WalletButton />
          </li>
        </ul>
      </nav>
    </div>
  );
}
