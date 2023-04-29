import NavBar from "@/components/NavBar";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";

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
          <p className={styles.main_ment}>질문은 여기에 입력하면 됩니다</p>
          <button className={styles.login_btn}>답변하기 →</button>
        </div>
        <div className={styles.bottom_arrow_div} onClick={scroll_force}>
          <Image src="/down-arrow.png" width={45} height={45} alt="arrow" />
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
