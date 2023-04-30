import NavBar from "@/components/NavBar";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const [windowSize, setWindowSize] = useState(0);
  const [widthHeight, setWidthHeight] = useState(0);

  const [question, setQuestion] = useState("");

  const getTodayQuestion = async () => {
    const date = undefined;
    const question_uuid = undefined;
    const response = await axios.get(`https://controlz-test.com/qna/random`);
    setQuestion(response.data.question);
  };

  useEffect(() => {
    setWindowSize(window.innerHeight);
    setWidthHeight(window.innerWidth);
    getTodayQuestion();
  }, []);

  const scroll_force = () => {
    window.scrollTo(0, windowSize);
  };
  return (
    <div>
      <div className={["main-div", styles.main_first_div].join(" ")} style={{ backgroundColor: "#FFF" }}>
        <div className={styles.main_ment_div}>
          <p className={styles.main_ment_sub}>오늘의 질문</p>
          <p className={styles.main_ment}>{question}</p>
          <Link href="/answer/input" className={styles.login_btn}>
            답변하기 →
          </Link>
        </div>
        <div className={styles.bottom_arrow_div}>
          <Image src="/down-arrow.png" width={45} height={45} alt="arrow" onClick={scroll_force} style={{ cursor: "pointer" }} />
        </div>
      </div>
      <div className={["main-div", styles.main_intro].join(" ")}>
        <div className={styles.intro_div}>
          <Image src="/background_with_ment.png" className={styles.main_intro_img} width={widthHeight + 300} height={windowSize} alt="main_background" />
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
