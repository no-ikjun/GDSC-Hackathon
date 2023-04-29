import styles from "../../styles/JoinGroup.module.css";
import Link from "next/link";

export default function CreateGroup() {
  return (
    <div className={styles.group_div}>
      <div className={[styles.container, "group-div"].join(" ")}>
        <h1 className={styles.title}>그룹 생성하기</h1>
        <div className={styles.join_div}>
          <div className={styles.join_input_div}>
            <input type="text" placeholder="그룹의 이름을 입력하세요!" className={styles.join_input} />
          </div>
          <button className={styles.group_join_btn}>생성하기</button>
        </div>
      </div>
    </div>
  );
}
