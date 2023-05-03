import WalletButton from "./WalletButton";
import styles from "../styles/Home.module.css";

export default function Navbar() {
    return (
    <div>
        <nav className={styles.navbar}>
            <ul>
                {/* <li className="logo">
                    <Link href="/">Feed</Link>
                </li> */}

                <li>
                    <WalletButton/>
                </li>
            </ul>
        </nav>
    </div>
    )
}
