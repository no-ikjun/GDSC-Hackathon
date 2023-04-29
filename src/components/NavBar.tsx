import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/NavBar.module.css";

export default function NavBar() {
  const router = useRouter();
  const [themeMode, setThemeMode] = useState<"dark" | "light">("light");
  const { theme, setTheme } = useTheme();

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <Image src="/logo.png" width={90} height={50} alt="logo" className={styles.nav_logo_img} />
      </Link>
      <div></div>
    </nav>
  );
}
