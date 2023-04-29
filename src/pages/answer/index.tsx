import { useState } from "react";
import styles from "../../styles/Answer.module.css";
import Link from "next/link";
import IndexPage from "@/components/Head";

export default function Answer() {
  const [answer, setAnswer] = useState("");
  return (
    <div className={styles.answer_div}>
      <div className={styles.container}>
        <h1 className={styles.title}>나의 답변 기록</h1>
        <h2 className={styles.answer_month}>4월</h2>
        <div className={styles.answer_list_div}>
          <div className={styles.answer_list}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span className={styles.answer_list_date}>29일</span>
                <p
                  className={styles.answer_list_question}
                  onClick={() => {
                    answer !== "1" ? setAnswer("1") : setAnswer("");
                  }}
                >
                  Q. 오늘 먹은 음식은 무엇인가요?
                </p>
              </div>
              <p className={styles.answer_list_answer} style={{ display: `${answer === "1" ? "block" : "none"}` }}>
                A. 오늘은 이것과 저것을 먹었습니다. 정말 맛있었습니다.
              </p>
            </div>
            <Link href="/answer/public?question=adfasdf" className={styles.answer_list_range}>
              다른 의견 보기 →
            </Link>
          </div>
          <hr className={styles.answer_list_hr} />
          <div className={styles.answer_list}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span className={styles.answer_list_date}>29일</span>
                <p
                  className={styles.answer_list_question}
                  onClick={() => {
                    answer !== "2" ? setAnswer("2") : setAnswer("");
                  }}
                >
                  Q. 오늘 먹은 음식은 무엇인가요?
                </p>
              </div>
              <p className={styles.answer_list_answer} style={{ display: `${answer === "2" ? "block" : "none"}` }}>
                A. 오늘은 이것과 저것을 먹었습니다. 정말 맛있었습니다.
              </p>
            </div>
          </div>
          <hr className={styles.answer_list_hr} />
          <div className={styles.answer_list}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span className={styles.answer_list_date}>29일</span>
                <p
                  className={styles.answer_list_question}
                  onClick={() => {
                    answer !== "3" ? setAnswer("3") : setAnswer("");
                  }}
                >
                  Q. 오늘 먹은 음식은 무엇인가요?
                </p>
              </div>
              <p className={styles.answer_list_answer} style={{ display: `${answer === "3" ? "block" : "none"}` }}>
                A. 오늘은 이것과 저것을 먹었습니다. 정말 맛있었습니다.
              </p>
            </div>
          </div>
          <hr className={styles.answer_list_hr} />
          <div className={styles.answer_list}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span className={styles.answer_list_date}>29일</span>
                <p
                  className={styles.answer_list_question}
                  onClick={() => {
                    answer !== "4" ? setAnswer("4") : setAnswer("");
                  }}
                >
                  Q. 오늘 먹은 음식은 무엇인가요?
                </p>
              </div>
              <p className={styles.answer_list_answer} style={{ display: `${answer === "4" ? "block" : "none"}` }}>
                A. 오늘은 이것과 저것을 먹었습니다. 정말 맛있었습니다.
              </p>
            </div>
          </div>
          <hr className={styles.answer_list_hr} />
        </div>
      </div>
    </div>
  );
}
