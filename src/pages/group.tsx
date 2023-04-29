import styles from "../styles/Group.module.css";
import Image from "next/image";
import Link from "next/link";
import GroupInfo from "@/components/GroupInfo";

export default function Group() {
  return (
    <div className={styles.group_div}>
      <div className={styles.container}>
        <h1 className={styles.title}>나의 그룹</h1>
        <GroupInfo name="그루비룸" date="2023.04.29" members={["최익준", "오다현", "이호성", "이호성"]} code="af34dD" />
        <GroupInfo name="새 그룹" date="2022.01.01" members={["최익준"]} code="af34dD" />
        <GroupInfo name="그루비룸" date="2023.04.29" members={["최익준", "오다현", "이호성", "이호성"]} code="af34dD" />
        <GroupInfo name="그루비룸" date="2023.04.29" members={["최익준", "오다현", "이호성", "이호성"]} code="af34dD" />
      </div>
      <div className={styles.new_group_div}>
        <Link href="/join_group" className={styles.group_create_btn}>
          + 그룹 추가하기
        </Link>
      </div>
    </div>
  );
}
