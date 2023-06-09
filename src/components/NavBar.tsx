import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/NavBar.module.css";
import { getCookie } from "./Cookie";
import { sign } from "crypto";

export default function NavBar() {
  const router = useRouter();
  // const [themeMode, setThemeMode] = useState<"dark" | "light">("light");
  // const { theme, setTheme } = useTheme();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (getCookie("token")) {
      setIsLogin(true);
    }
  }, []);
  return (
    <nav className={styles.navbar}>
      <Link href="/" style={{ textDecoration: "none", marginRight: 70 }}>
        <Image src="/main.png" width={50} height={50} alt="logo" className={styles.nav_logo_img} />
        <span style={{ color: "#f49d95", position: "absolute", top: "23px", fontSize: 20, fontFamily: "sunshine_Bold" }}>어스</span>
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
          <span className={styles.nav_link_btn_text}>{isLogin ? "로그아웃" : "로그인"}</span>
        </Link>
        <Link href="/signup" className={styles.signup_btn} style={{ display: `${isLogin ? "none" : "block"}` }}>
          <span className={styles.nav_link_btn_text} style={{ color: "white" }}>
            처음이신가요?
          </span>
        </Link>
      </div>
    </nav>
  );
}
