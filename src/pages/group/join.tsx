import styles from "../../styles/JoinGroup.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function JoinGroup() {
  return (
    <div className={styles.group_div}>
      <div className={[styles.container, "group-div"].join(" ")}>
        <h1 className={styles.title}>그룹 가입하기</h1>
        <div className={styles.join_div}>
          <div className={styles.join_input_div}>
            <input type="text" placeholder="그룹 코드를 입력하세요!" className={styles.join_input} />
          </div>
          <button className={styles.group_join_btn}>가입하기</button>
          <p className={styles.group_create_ment}>혹은</p>
          <Link href="/group/create" className={styles.group_create_btn}>
            새로운 그룹 생성하기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
