import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/NavBar.module.css";

export default function NavBar() {
  const router = useRouter();
  // const [themeMode, setThemeMode] = useState<"dark" | "light">("light");
  // const { theme, setTheme } = useTheme();

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <Image src="/logo.png" width={90} height={50} alt="logo" className={styles.nav_logo_img} />
      </Link>
      <Link href="/group" className={styles.nav_link_a}>
        <span className={styles.nav_link}>그룹</span>
      </Link>
      <Link href="/answer" className={styles.nav_link_a}>
        <span className={styles.nav_link}>기록</span>
      </Link>
      <Link href="/info" className={styles.nav_link_a}>
        <span className={styles.nav_link}>정보</span>
      </Link>
      <div style={{ marginLeft: "auto", display: `${router.pathname === "/" ? "flex" : "none"}` }}>
        <Link href="/login" className={styles.nav_link_btn}>
          <span className={styles.nav_link_btn_text}>로그인</span>
        </Link>
        <Link href="/signup" className={styles.signup_btn}>
          <span className={styles.nav_link_btn_text} style={{ color: "white" }}>
            처음이신가요?
          </span>
        </Link>
      </div>
    </nav>
  );
}
