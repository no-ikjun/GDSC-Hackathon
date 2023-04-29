import { useRouter } from "next/router";
import styles from "../../styles/Group.module.css";
import Image from "next/image";

export default function GroupHistory() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className={styles.group_div}>
      <div className={styles.container}>
        <h1 className={styles.title}>{id}</h1>
        <div className={styles.question_div}>
          <div className={styles.arrow_div}>
            <Image src="/left-arrow.png" width={30} height={30} alt="arrow" />
          </div>
          <div className={styles.question_info_div}>
            <p className={styles.question_p}>lsdjflasdjkfsalkdf?</p>
          </div>
          <div className={styles.arrow_div}>
            <Image src="/right-arrow.png" width={30} height={30} alt="arrow" />
          </div>
        </div>
      </div>
    </div>
  );
}
