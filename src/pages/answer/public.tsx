import styles from "../../styles/Group.module.css";
import Link from "next/link";
import Image from "next/image";
import Answer from "@/components/Answer";

export default function Public() {
  return (
    <div className={styles.group_div}>
      <div className={styles.container}>
        <h1 className={styles.title}>구웃</h1>
        <div className={styles.question_div}>
          <div className={styles.question_info_div} style={{ width: "100%" }}>
            <p className={styles.question_date}>오늘의 질문</p>
            <p className={styles.question_content}>살면서 가장 행복했던 순간은 언제인가요?</p>
          </div>
        </div>
        <Answer name="최익준" age="30대" time="3분" answer="아니 프엔 개발을 혼자 하는게 말이 된다고 생각함?" />
        <hr className={styles.answer_hr} />
        <Answer name="오다현" age="20대" time="3시간" answer="아 자고싶다" />
        <hr className={styles.answer_hr} />
        <Answer name="이호성" age="10대" time="6시간" answer="저기서 데이터가 빈 칸일 경우에는 changed date에서 ... " />
        <hr className={styles.answer_hr} />
      </div>
    </div>
  );
}
