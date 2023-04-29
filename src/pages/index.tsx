import NavBar from "@/components/NavBar";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [windowSize, setWindowSize] = useState(0);
  useEffect(() => {
    setWindowSize(window.innerHeight);
  }, []);
  const scroll_force = () => {
    window.scrollTo(0, windowSize);
  };
  return (
    <div>
      <div className={["main-div", styles.main_first_div].join(" ")} style={{ backgroundColor: "#FFF" }}>
        <div className={styles.main_ment_div}>
          <p className={styles.main_ment_sub}>오늘의 질문</p>
          <p className={styles.main_ment}>살면서 가장 행복했던 순간은?</p>
          <Link href="/answer/input" className={styles.login_btn}>
            답변하기 →
          </Link>
        </div>
        <div className={styles.bottom_arrow_div}>
          <Image src="/down-arrow.png" width={45} height={45} alt="arrow" onClick={scroll_force} style={{ cursor: "pointer" }} />
        </div>
      </div>
      <div className="main-div">
        <div className={styles.intro_div}>
          <p className={styles.intro_ment} style={{ marginTop: 80 }}>
            우리 서비스는 이런 서비스이다..
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .main-div {
            height: ${windowSize}px;
            width: 100%;
            align-item: center;
            justify-content: center;
          }
        `}
      </style>
    </div>
  );
}
