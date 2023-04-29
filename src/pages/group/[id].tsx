import { useRouter } from "next/router";
import styles from "../../styles/Group.module.css";
import Image from "next/image";
import Answer from "@/components/Answer";

export default function GroupHistory() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className={styles.group_div}>
      <div className={styles.container}>
        <h1 className={styles.title}>{id}</h1>
        <div className={styles.question_div}>
          <div className={styles.arrow_div}>
            <Image src="/left-arrow.png" width={30} height={30} alt="arrow" className={styles.decrease_date} />
          </div>
          <div className={styles.question_info_div}>
            <p className={styles.question_date}>오늘의 질문</p>
            <p className={styles.question_content}>살면서 가장 행복했던 순간은 언제인가요?</p>
          </div>
          <div className={styles.arrow_div}>
            <Image src="/right-arrow.png" width={30} height={30} alt="arrow" className={styles.increase_date} />
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
