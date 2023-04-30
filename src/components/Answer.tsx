import Image from "next/image";
import styles from "../styles/Group.module.css";

interface GroupInfoProps {
  name: string;
  answer: string;
}

export default function Answer({ name, answer }: GroupInfoProps) {
  return (
    <div className={styles.answer_content_div}>
      <div className={styles.answer_profile_div}>
        <div className={styles.answer_profile_img_div}>
          <Image src="/profile.png" width={50} height={50} alt="profile" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", height: 40 }}>
          <p className={styles.answer_profile_name}>{name}의 답변</p>
        </div>
      </div>
      <p className={styles.answer_content_main}>{answer}</p>
    </div>
  );
}
