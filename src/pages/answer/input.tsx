import styles from "../../styles/AnswerInput.module.css";
import Link from "next/link";

export default function InputAnswer() {
  return (
    <div className={styles.input_div_main}>
      <div className={styles.container}>
        <h1 className={styles.title}>답변하기</h1>
        <div className={styles.input_div_sub}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <p className={styles.ment_sub}>오늘의 질문</p>
            <p className={styles.ment}>살면서 가장 행복했던 순간은?</p>
          </div>
          <div className={styles.input_div}>
            <input type="text" placeholder="오늘의 질문에 답변을 입력하세요!" className={styles.input} />
          </div>
          <button className={styles.input_btn}>제출하기</button>
        </div>
      </div>
    </div>
  );
}
