import WalletButton from "./WalletButton";
import styles from "../styles/components/Navbar.module.css";
import Link from "next/link";
import { ContractContext } from "../lib/context";
import { useContext, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = `/contract/${searchTerm}`;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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
          <li className={styles.logoText}>
            <Link href="/">
              <h2>Home</h2>
            </Link>
          </li>
          <li>
          <form onSubmit={handleSubmit}>
            <label htmlFor="searchTerm"><SearchOutlined /></label>
            <input
              id="searchTerm"
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Enter a contract id"
            />
            <button type="submit">Submit</button>
          </form>
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
