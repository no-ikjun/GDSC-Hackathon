import styles from "../../styles/Answer.module.css";

export default function Answer() {
  return (
    <div className={styles.answer_div}>
      <div className={styles.container}>
        <h1 className={styles.title}>나의 답변 기록</h1>
      </div>
    </div>
  );
}
